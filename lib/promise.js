var hitch = require("./base/functions").hitch,
    define = require("./define").define, base = require("./base");

var Promise = define(null, {
    instance : {
        /** @lends comb.Promise.prototype */
        __fired : false,

        __results : null,

        __error : null,

        __errorCbs : null,

        __cbs : null,

        /**
         * Promise object used for handling a thread
         *@example
         *          var myFunc = function(){
         *              var promise = new Promise();
         *              //callback the promise after 10 Secs
         *              setTimeout(hitch(promise, "callback"), 10000);
         *              return promise;
         *          }
         *          var myFunc2 = function(){
         *              var promises =[];
         *              for(var i = 0; i < 10; i++){
         *                  promises.push(myFunc);
         *              }
         *              //create a new promise list with all 10 promises
         *              return new PromiseList(promises);
         *          }
         *
         *          myFunc.then(do something...)
         *          myFunc.addCallback(do something...)
         *          myFunc.cain(myfunc).then(do something...)
         *          myFunc.cain(myfunc).addCallback(do something...)
         *
         *          myFunc2.then(do something...)
         *          myFunc2.addCallback(do something...)
         *          myFunc2.cain(myfunc).then(do something...)
         *          myFunc2.cain(myfunc).addCallback(do something...)
         *  @memberOf comb
         * @constructs
         */
        constructor : function() {
            this.__errorCbs = [];
            this.__cbs = [];
        },
        /**
         * @private
         */
        __resolve : function() {
            if (!this.__fired) {
                this.__fired = true;
                var cbs = this.__error ? this.__errorCbs : this.__cbs,
                    len = cbs.length, i,
                    results = this.__error || this.__results;
                for (i = 0; i < len; i++) {
                    cbs[i].apply(this, results);
                }
            }
        },

        /**
         * Add a callback to the callback chain of the promise
         *
         *
         * @param {Function} cb the function to callback when the promise is resolved
         */
        addCallback : function(cb) {
            if (cb) {
                if (this.__fired && this.__results) {
                    cb.apply(this, this.__results);
                } else {
                    this.__cbs.push(cb);
                }
            }
            return this;
        },


        /**
         * Add a callback to the errback chain of the promise
         *
         * @param {Function} cb the function to callback when the promise errors
         */
        addErrback : function(cb) {
            if (cb) {
                if (this.__fired && this.__error) {
                    cb.apply(this, this.__error);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
        },

        both : function(cb) {
            this.addCallback(cb);
            this.addErrback(cb);
            return this;
        },

        /**
         * When called all functions registered as callbacks are called with the passed in results.
         *
         * @param anything variable number of results to pass back to listeners of the promise
         */
        callback : function() {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__results = Array.prototype.slice.call(arguments);
            this.__resolve();
            return this;
        },

        /**
         * When called all functions registered as errbacks are called with the passed in error(s)
         *
         * @param anything variable number of errors to pass back to listeners of the promise
         */
        errback : function(i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__error = Array.prototype.slice.call(arguments);
            this.__resolve();
            return this;
        },

        /**
         * Call to specify action to take after promise completes or errors
         *
         * @param {Function} [callback=null] function to call after the promise completes successfully
         * @param {Function} [errback=null] function to call if the promise errors
         */
        then : function(callback, errback) {
            this.addCallback(callback);
            this.addErrback(errback);
            return this;
        },

        /**
         * Call to chaining of promises
         * @param callback method to call that returns a promise to call after this one completes.
         * @param errback method to call if this promise errors.
         */
        chain : function(callback, errback) {
            var promise = new Promise();
            this.addCallback(function(results) {
                callback.call(this, results).then(hitch(promise, "callback"), hitch(promise, "errback"));
            });
            this.addErrback(errback);
            return promise;
        },

        chainBoth : function(callback) {
            var p = this.chain(callback);
            this.addErrback(function(results) {
                callback.call(this, results).then(hitch(p, "callback"), hitch(p, "errback"));
            });
            return p;
        }


    }
});


var PromiseList = define(Promise, {
    instance : {
        /** @lends comb.PromiseList.prototype */

        /*@private*/
        __results : null,

        /*@private*/
        __errors : null,

        /*@private*/
        __promiseLength : 0,

        /*@private*/
        __defLength : 0,

        /*@private*/
        __firedLength : 0,

        /**
         *
         *  PromiseList object used for handling a list of Promises
         * @example         var myFunc = function(){
         *              var promise = new Promise();
         *              //callback the promise after 10 Secs
         *              setTimeout(hitch(promise, "callback"), 10000);
         *              return promise;
         *          }
         *          var myFunc2 = function(){
         *              var promises =[];
         *              for(var i = 0; i < 10; i++){
         *                  promises.push(myFunc);
         *              }
         *              //create a new promise list with all 10 promises
         *              return new PromiseList(promises);
         *          }
         *          var pl = new comb.PomiseList([myFunc(), myFunc2()]);
         *          pl.then(do something...)
         *          pl.addCallback(do something...)
         *          pl.cain(myfunc).then(do something...)
         *          pl.cain(myfunc).addCallback(do something...)
         *
         *  @param {comb.Promise[]} [defs=[]] the list of promises
         * @constructs
         * @augments comb.Promise
         * @memberOf comb
         * */
        constructor : function(defs) {
            this.__defLength = defs.length;
            this.__errors = [];
            this.__results = [];
            this._super(arguments);
            defs.forEach(this.__addPromise, this);
        },

        /**
         * Add a promise to our chain
         * @private
         * @param promise the promise to add to our chain
         * @param i the index of the promise in our chain
         */
        __addPromise : function(promise, i) {
            promise.addCallback(hitch(this, function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(i);
                this.callback.apply(this, args);
            }));
            promise.addErrback(hitch(this, function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(i);
                this.errback.apply(this, args);
            }));
        },

        /**
         * Resolves the promise
         * @private
         */
        __resolve : function() {
            if (!this.__fired) {
                this.__fired = true;
                var cbs = this.__errors.length ? this.__errorCbs : this.__cbs,
                    len = cbs.length, i,
                    results = this.__errors.length ? this.__errors : this.__results;
                for (i = 0; i < len; i++) {
                    cbs[i].call(this, results);
                }
            }
        },

        addCallback : function(cb) {
            if (cb) {
                if (this.__fired && !this.__errors.length) {
                    cb.call(this, this.__results);
                } else {
                    this.__cbs.push(cb);
                }
            }
            return this;
        },

        addErrback : function(cb) {
            if (cb) {
                if (this.__fired && this.__errors.length) {
                    cb.call(this, this.__errors);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
            return this;
        },


        callback : function(i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__results[i] = (Array.prototype.slice.call(arguments));
            this.__firedLength++;
            if (this.__firedLength == this.__defLength) {
                this.__resolve();
            }
            return this;
        },


        errback : function(i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__errors[i] = Array.prototype.slice.call(arguments);
            this.__firedLength++;
            if (this.__firedLength == this.__defLength) {
                this.__resolve();
            }
            return this;
        }

    }
});
exports.Promise = Promise;
exports.PromiseList = PromiseList;

var createHandler = function(obj, stack) {
    return {
        getOwnPropertyDescriptor: function(name) {
            var desc = Object.getOwnPropertyDescriptor(obj, name);
            // a trapping proxy's properties must always be configurable
            if (desc !== undefined) {
                desc.configurable = true;
            }
            return desc;
        },
        getPropertyDescriptor:  function(name) {
            var desc = Object.getPropertyDescriptor(obj, name); // not in ES5
            // a trapping proxy's properties must always be configurable
            if (desc !== undefined) {
                desc.configurable = true;
            }
            return desc;
        },
        getOwnPropertyNames: function() {
            throw new Error("Cannot get own property names")
        },
        getPropertyNames: function() {
            throw new Error("Cannot get property names")
        },
        defineProperty: function(name, desc) {
            throw new Error("Cannot define property")
        },
        delete: function(name) {
            throw new Error("Cannot delete");
        },
        fix:          function() {
            throw new Error("Cannot fix");
        },

        has: function(name) {
            return name in obj;
        },
        hasOwn: function(name) {
            return ({}).hasOwnProperty.call(obj, name);
        },
        get: function(receiver, name) {
            var newStack = [];
            var handle = getHandler({}, newStack);
            var wrapper = base.createFunctionWrapper(handle, function(m) {
                var i = stack[stack.indexOf(item)];
                i[1].push(base.argsToArray(arguments));
                return wrapper;
            });
            var item = [obj, [name], newStack, wrapper];
            stack.push(item);
            return wrapper;
        },
        set: function(receiver, name, val) {
            stack.push([obj, ["__set__", [name, val]], [], {}]);
            return true;
        }, // bad behavior when set fails in non-strict mode
        enumerate:    function() {
            throw new Error("Cannot enumerate");
        },
        keys: function() {
            throw new Error("Cannot retrieve keys")
        }

    }
};

var getHandler = function(obj, stack) {
    return base.isObject(obj) ? base.handlerProxy({}, createHandler(obj, stack)) : obj;
};

var getValueFromArrayMap = function(arg, pMap) {
    var result;
    if (base.isProxy(arg)) {
        var results = pMap.filter(function(p) {
            return p[0] == arg;
        });
        if (results.length) {
            result = results[0][1];
        }
    } else {
        result = arg;
    }
    return result;
};

var executeStack = function(stack, pMap) {
    var ret = new Promise(), l = stack.length, results = [];
    pMap = pMap || [];
    var errored = false;
    if (l) {
        var exec = function(i) {
            if (i < l) {
                var curr = stack[i], obj = getValueFromArrayMap(curr[0], pMap), m = curr[1], name = m[0], args = m[1], subStack = curr[2], handle = curr[3];
                var p;
                try {
                    if (name == "__set__") {
                        p = obj[args[0]] = getValueFromArrayMap(args[1], pMap);
                    } else if (base.isUndefined(args)) {
                        p = obj[name];
                    } else {
                        var f;
                        if (!base.isUndefined((f = obj[name])) && base.isFunction(f)) {
                            p = f.apply(obj, args.map(function(arg) {
                                return getValueFromArrayMap(arg, pMap);
                            }));
                        }
                    }
                } catch(e) {
                    errored = true;
                    return ret.errback(new Error(e));
                }

                if (base.isInstanceOf(p, Promise)) {
                    p.then(hitch(this, function(res) {
                        if (subStack.length) {
                            subStack.forEach(function(ss) {
                                ss[0] = res;
                            });
                            executeStack(subStack, pMap).then(hitch(this, function(sres) {
                                pMap.push([handle, res]);
                                results.push(sres);
                                !errored && exec(++i);
                            }), hitch(ret, "errback"));
                        } else {
                            pMap.push([handle, res]);
                            results.push(res);
                            !errored && exec(++i);
                        }
                    }), hitch(ret, "errback"));
                } else {
                    if (subStack.length) {
                        subStack.forEach(function(ss) {
                            ss[0] = p;
                        });
                        executeStack(subStack, pMap).then(hitch(this, function(sres) {
                            pMap.push([handle, p]);
                            results.push(sres);
                            !errored && exec(++i);
                        }), hitch(ret, "errback"));
                    } else {
                        pMap.push([handle, p]);
                        results.push(p);
                        !errored && exec(++i);
                    }
                }
            } else {
                !errored && ret.callback(results, pMap);
            }
        };
        exec(0);
    } else {
        ret.callback(results, pMap);
    }
    return ret;
};

base.merge(exports, {
    /**
     * @lends comb
     */

    /**
     * This method allows one to code asynchronous code in a synchronous manner.
     *
     * @example
     * var a = {
     *      promiseMethod : function(){
     *          var ret = new Promise();
     *          setTimeout(comb.hitch(ret, "callback", 10), 1000);
     *          return ret;
     *      }
     * }
     *
     * var p = comb.executeInOrder(a, function(a){
     *      var x = a.promiseMethod();
     *      var y = a.promiseMethod();
     *      return [x, y];
     * });
     *
     * p.then(function(ret){
     *    console.log(ret) //=>[10, 10];
     * });
     * @param {Object...} args variable number of objects.
     * @param {Funciton} cb the function to callback to execute in order
     * @returns comb.Promise
     *
     */
    executeInOrder : function(args, cb) {
        args = base.argsToArray(arguments);
        cb = base.isFunction(args[args.length - 1]) ? args.pop() : null;
        var ret = new Promise();
        if (cb) {
            var stack = [];
            var newArgs = args.map(function(a) {
                return getHandler(a, stack);
            });
            var cbRet = cb.apply(null, newArgs);
            executeStack(stack).then(function(results, pMap) {
                if (base.isUndefined(cbRet)) {
                    ret.callback(results);
                }
                else {
                    var cbResults;
                    if (base.isArray(cbRet)) {
                        cbResults = cbRet.map(
                            function(arg) {
                                return getValueFromArrayMap(arg, pMap);
                            }).filter(function(r) {
                                return !base.isUndefined(r)
                            });
                    } else if (base.isHash(cbRet)) {
                        cbResults = {};
                        for (var i in cbRet) {
                            cbResults[i] = getValueFromArrayMap(cbRet[i], pMap);
                        }
                    } else if (base.isProxy(cbRet)) {
                        cbResults = getValueFromArrayMap(cbRet, pMap);
                    } else {
                        cbResults = cbRet;
                    }
                    ret.callback(cbResults);
                }
            }, hitch(ret, "errback"));

        } else {
            ret.callback();
        }
        return ret;
    }

});