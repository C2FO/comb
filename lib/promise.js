var hitch = require("./base/functions").hitch,
    define = require("./define").define, base = require("./base");

var Promise = define(null, {
    instance:{
        /** @lends comb.Promise.prototype */
        __fired:false,

        __results:null,

        __error:null,

        __errorCbs:null,

        __cbs:null,

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
        constructor:function () {
            this.__errorCbs = [];
            this.__cbs = [];
        },
        /**
         * @private
         */
        __resolve:function () {
            if (!this.__fired) {
                this.__fired = true;
                var cbs = this.__error ? this.__errorCbs : this.__cbs,
                    len = cbs.length, i,
                    results = this.__error || this.__results;
                for (i = 0; i < len; i++) {
                    this.__callNextTick(cbs[i], results);
                }
            }
        },

        __callNextTick:function (cb, results) {
            process.nextTick(hitch(this, function () {
                try {
                    cb.apply(this, results);
                } catch (e) {
                    console.error(e);
                    throw e;
                }
            }));
        },

        /**
         * Add a callback to the callback chain of the promise
         *
         *
         * @param {Function} cb the function to callback when the promise is resolved
         */
        addCallback:function (cb) {
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
        addErrback:function (cb) {
            if (cb) {
                if (this.__fired && this.__error) {
                    cb.apply(this, this.__error);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
        },

        both:function (cb) {
            this.addCallback(cb);
            this.addErrback(cb);
            return this;
        },

        /**
         * When called all functions registered as callbacks are called with the passed in results.
         *
         * @param anything variable number of results to pass back to listeners of the promise
         */
        callback:function () {
            var args = base.argsToArray(arguments);
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
        errback:function (i) {
            if (this.__fired) {
                throw i || new Error("Already fired");
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
        then:function (callback, errback) {
            this.addCallback(callback);
            this.addErrback(errback);
            return this;
        },

        /**
         * Call to chaining of promises
         * @param callback method to call that returns a promise to call after this one completes.
         * @param errback method to call if this promise errors.
         */
        chain:function (callback, errback) {
            var promise = new Promise();
            this.addCallback(function (results) {
                callback.call(this, results).then(hitch(promise, "callback"), hitch(promise, "errback"));
            });
            this.addErrback(errback);
            return promise;
        },

        /**
         * Applies the same function that returns a promise to both the callback and errback.
         *
         * @param {Function} callback function to call. This function must return a Promise
         *
         * @return {comb.Promise} a promise to continue chaining or to resolve with.
         *
         */
        chainBoth:function (callback) {
            var p = this.chain(callback);
            this.addErrback(function (results) {
                callback.call(this, results).then(hitch(p, "callback"), hitch(p, "errback"));
            });
            return p;
        }


    }
});


var PromiseList = define(Promise, {
    instance:{
        /** @lends comb.PromiseList.prototype */

        /*@private*/
        __results:null,

        /*@private*/
        __errors:null,

        /*@private*/
        __promiseLength:0,

        /*@private*/
        __defLength:0,

        /*@private*/
        __firedLength:0,

        normalizeResults:false,

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
        constructor:function (defs, normalizeResults) {
            this.__defLength = defs.length;
            this.__errors = [];
            this.__results = [];
            this.normalizeResults = base.isBoolean(normalizeResults) ? normalizeResults : false;
            this._super(arguments);
            if (defs.length) {
                defs.forEach(this.__addPromise, this);
            } else {
                this.__resolve();
            }
        },

        /**
         * Add a promise to our chain
         * @private
         * @param promise the promise to add to our chain
         * @param i the index of the promise in our chain
         */
        __addPromise:function (promise, i) {
            promise.addCallback(hitch(this, function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(i);
                this.callback.apply(this, args);
            }));
            promise.addErrback(hitch(this, function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(i);
                this.errback.apply(this, args);
            }));
        },

        /**
         * Resolves the promise
         * @private
         */
        __resolve:function () {
            if (!this.__fired) {
                this.__fired = true;
                var cbs = this.__errors.length ? this.__errorCbs : this.__cbs,
                    len = cbs.length, i,
                    results = this.__errors.length ? this.__errors : this.__results;
                for (i = 0; i < len; i++) {
                    this.__callNextTick(cbs[i], results);
                }
            }
        },

        __callNextTick:function (cb, results) {
            process.nextTick(hitch(this, function () {
                try {
                    cb.apply(this, [results]);
                } catch (e) {
                    console.error(e);
                    throw e;
                }
            }));
        },

        addCallback:function (cb) {
            if (cb) {
                if (this.__fired && !this.__errors.length) {
                    cb.call(this, this.__results);
                } else {
                    this.__cbs.push(cb);
                }
            }
            return this;
        },

        addErrback:function (cb) {
            if (cb) {
                if (this.__fired && this.__errors.length) {
                    cb.call(this, this.__errors);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
            return this;
        },


        callback:function (i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            var args = base.argsToArray(arguments);
            if (this.normalizeResults) {
                args = args.slice(1);
                args = args.length == 1 ? args.pop() : args;
            }
            this.__results[i] = args;
            this.__firedLength++;
            if (this.__firedLength == this.__defLength) {
                this.__resolve();
            }
            return this;
        },


        errback:function (i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            var args = base.argsToArray(arguments);
            if (this.normalizeResults) {
                args = args.slice(1);
                args = args.length == 1 ? args.pop() : args;
            }
            this.__errors[i] = args;
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


var createHandler = function (obj, stack) {
    return {

        delete:function (name) {
            stack.push([obj, ["__delete__", [name]], [], obj]);
            return true;
        },
        get:function (receiver, name) {
            var newStack = [];
            var handle = getHandler({}, newStack);
            var wrapper = base.createFunctionWrapper(handle, function (m) {
                var i = stack[stack.indexOf(item)];
                var args = base.argsToArray(arguments);
                i[1].push(name === "__apply__" || name === "__new__" ? base.array.flatten(args) : args);
                return wrapper;
            });
            var item = [obj, [name], newStack, wrapper];
            stack.push(item);
            return wrapper;
        },
        set:function (receiver, name, val) {
            stack.push([obj, ["__set__", [name, val]], [], obj]);
            return true;
        }, // bad behavior when set fails in non-strict mode
        enumerate:function () {
            stack.push([obj, ["__enumerate__"], [], obj]);
            return [];
        }

    }
};

var functionHandler = function (handle, stack) {
    var wrapper = base.createFunctionWrapper(handle, function (m) {
        return handle.__apply__(base.argsToArray(arguments));
    }, function () {
        return handle.__new__(base.argsToArray(arguments));
    });
    return wrapper;
};

var getHandler = function (obj, stack) {
    var prox = base.isObject(obj) || base.isFunction(obj) ? base.handlerProxy({}, createHandler(obj, stack)) : obj, ret;
    if (base.isFunction(obj)) {
        return functionHandler(prox, stack);
    } else {
        ret = prox;
    }
    return ret;
};

var getValueFromArrayMap = function (arg, pMap, handles) {
    var result;
    if (base.isProxy(arg)) {
        var results = pMap.filter(function (p) {
            return p[0] === arg;
        });
        if (results.length) {
            result = results[0][1];
        } else {
            !results.length && (results = handles.filter(function (h) {
                return h[1] === arg;
            }));
            if (results.length) {
                result = results[0][0];
            }
        }
    } else if (base.isHash(arg) || base.isArray(arg)) {
        result = arg;
        for (var i in arg) {
            var a = arg[i];
            arg[i] = getValueFromArrayMap(a, pMap, handles);
        }
    } else {
        result = arg;
    }
    return result;
};

var executeStack = function (stack, handles, pMap) {
    var ret = new Promise(), l = stack.length, results = [];
    pMap = pMap || [];
    var errored = false;
    if (l) {
        var exec = function (i) {
            if (i < l) {
                var curr = stack[i], obj = getValueFromArrayMap(curr[0], pMap,
                    handles), m = curr[1], name = m[0], args = m[1], subStack = curr[2], handle = curr[3];
                var p;
                try {
                    if (name === "__set__") {
                        p = (obj[args[0]] = getValueFromArrayMap(args[1], pMap, handles));
                    } else if (name === "__delete__") {
                        p = delete obj[args[0]];
                    } else if (name === "__keys__" || name === "__enumerate__") {
                        throw new Error(name.replace(/^__|__$/g, "") + " is not supported");
                    } else if (name === "__apply__") {
                        p = (obj.apply(obj, getValueFromArrayMap(args, pMap, handles)));
                    } else if (name === "__new__") {
                        try {
                            p = new obj();
                        } catch (ignore) {
                        }
                        obj.apply(p, getValueFromArrayMap(args, pMap, handles));
                    } else if (base.isUndefined(args)) {
                        p = obj[name];
                    } else {
                        var f;
                        if (!base.isUndefined((f = obj[name])) && base.isFunction(f)) {
                            p = f.apply(obj, args.map(function (arg) {
                                return getValueFromArrayMap(arg, pMap, handles);
                            }));
                        } else {
                            //Purposely call to throw an ERROR!!!!
                            obj[name]();
                        }
                    }
                } catch (e) {
                    errored = true;
                    return ret.errback(e);
                }
                exports.when(p, hitch(this, function (res) {
                    if (subStack.length) {
                        subStack.forEach(function (ss) {
                            ss[0] = res;
                        });
                        executeStack(subStack, handles, pMap).then(hitch(this, function (sres) {
                            pMap.push([handle, res]);
                            results.push(sres);
                            !errored && exec(++i);
                        }), hitch(ret, "errback"));
                    } else {
                        pMap.push([handle, res]);
                        results.push(res);
                        !errored && exec(++i);
                    }
                }), hitch(ret, "errback"))
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
     *     <p>
     *         <b>
     *             Using Object.define[rest of name] on objects passed will result in unexpected behavior.</br>
     *             Enumerating passed in object keys is not currently supported. i.e for in loops on objects.
     *             using array enumeration methods will work though!!
     *         </b>
     *     </p>
     *
     * @example
     *
     * var staticValueFunction = function (value) {
     *      return comb.argsToArray(arguments).join(" ");
     * };
     *
     * var promiseValueFunction = function (value) {
     *      var ret = new comb.Promise();
     *      setTimeout(comb.hitch(ret, "callback", comb.argsToArray(arguments).join(" ")), 100);
     *      return ret;
     * };
     *
     * var hash = {
     *      staticValueFunction:staticValueFunction,
     *      promiseValueFunction:promiseValueFunction
     * };
     *
     * var p = comb.executeInOrder(hash, staticValueFunction, promiseValueFunction, function (hash, staticValueFunction, promiseValueFunction) {
     *     var toBe = staticValueFunction(promiseValueFunction("to"), "be");
     *     var notToBe = hash.promiseValueFunction("or", hash.staticValueFunction("not", toBe));
     *     return hash.promiseValueFunction(toBe, notToBe);
     * });
     * p.addCallback(function(ret){
     *     console.log(ret); //=>"to be or not to be"
     * });
     * @param {Object...} args variable number of objects.
     * @param {Function} cb the function to callback to execute in order
     * @returns comb.Promise
     *
     */
    executeInOrder:function (args, cb) {
        args = base.argsToArray(arguments);
        cb = base.isFunction(args[args.length - 1]) ? args.pop() : null;
        var ret = new Promise();
        if (cb) {
            var stack = [];
            var newArgs = args.map(function (a) {
                return [a, getHandler(a, stack)];
            });
            var cbRet = cb.apply(null, newArgs.map(function (h) {
                return h[1];
            }));
            executeStack(stack, newArgs).then(function (results, pMap) {
                if (base.isUndefined(cbRet)) {
                    ret.callback(results);
                }
                else {
                    var cbResults;
                    if (base.isArray(cbRet)) {
                        cbResults = cbRet.map(
                            function (arg) {
                                return getValueFromArrayMap(arg, pMap, newArgs);
                            }).filter(function (r) {
                                return !base.isUndefined(r)
                            });
                    } else if (base.isHash(cbRet)) {
                        cbResults = {};
                        for (var i in cbRet) {
                            cbResults[i] = getValueFromArrayMap(cbRet[i], pMap, newArgs);
                        }
                    } else if (base.isProxy(cbRet)) {
                        cbResults = getValueFromArrayMap(cbRet, pMap, newArgs);
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
    },

    /**
     * Tests if an object is like a promise (i.e. it contains then, addCallback, addErrback)
     * @param obj object to test
     */
    isPromiseLike:function (obj) {
        return !base.isUndefinedOrNull(obj) && (base.isInstanceOf(obj, Promise) || (base.isFunction(obj.then)
            && base.isFunction(obj.addCallback) && base.isFunction(obj.addErrback)));
    },

    /**
     * Waits for promise and non promise values to resolve and fires callback or errback appropriately.
     *
     * @example
     *  var a = "hello";
     *  var b = new comb.Promise().callback(world);
     *  comb.when(a, b) => called back with ["hello", "world"];
     *
     * @param {Anything...} args variable number of arguments to wait for
     * @param {Function} cb the callback function
     * @param {Function} eb the errback function
     * @returns {comb.Promise} a promise that is fired when all values have resolved
     */
    when:function (args, cb, eb) {
        var args = base.argsToArray(arguments), p;
        eb = base.isFunction(args[args.length - 1]) ? args.pop() : null;
        cb = base.isFunction(args[args.length - 1]) ? args.pop() : null;
        if (eb && !cb) {
            cb = eb;
            eb = null;
        }
        if (!args.length) {
            p = new Promise().callback(args);
        } else if (args.length == 1) {
            args = args.pop();
            p = exports.isPromiseLike(args) ? args : new Promise().callback(args);
        } else {
            var p = new PromiseList(args.map(function (a) {
                return exports.isPromiseLike(a) ? a : new Promise().callback(a);
            }), true);
        }
        if (cb) {
            p.addCallback(cb);
        }
        if (eb) {
            p.addErrback(eb);
        }
        return p;

    },

    /**
     * Wraps traditional node style functions with a promise.
     * @example
     *
     * var fs = require("fs");
     * var readFile = comb.wrap(fs.readFile, fs);
     * readFile(__dirname + "/test.json").then(
     *      function(buffer){
     *          console.log(contents);
     *      },
     *      funciton(err){
     *
     *      }  console.error(err);
     * );
     *
     *
     * @param {Function} fn function to wrap
     * @param {Object} scope scope to call the function in
     *
     * @return {Funciton} a wrapped function
     */
    wrap:function (fn, scope) {
        return function () {
            var ret = new comb.Promise();
            var args = base.argsToArray(arguments);
            args.push(function (err, res) {
                var args = base.argsToArray(arguments);
                if (err) {
                    ret.errback(err);
                } else {
                    args.shift();
                    ret.callback.apply(ret, args);
                }
            });
            return fn.apply(scope || this, args);
            return ret;
        }
    },

    /**
     * Executes a list of items in a serial manner. If the list contains promises then each promise
     * will be executed in a serial manner, if the list contains non async items then the next item in the list
     * is called.
     *
     * @example
     *
     * var asyncAction = function(item, timeout){
     *    var ret = new comb.Promise();
     *    setTimeout(comb.hitchIgnore(ret, "callback", item), timeout);
     *    return ret;
     * };
     *
     * comb.serial([
     *     comb.partial(asyncAction, 1, 1000),
     *     comb.partial(asyncAction, 2, 900),
     *     comb.partial(asyncAction, 3, 800),
     *     comb.partial(asyncAction, 4, 700),
     *     comb.partial(asyncAction, 5, 600),
     *     comb.partial(asyncAction, 6, 500)
     * ]).then(function(results){
     *     console.log(results); // [1,2,3,4,5,6];
     * });
     *
     *
     *
     * @param list
     * @param callback
     * @param errback
     */
    serial:function (list, callback, errback) {
        var ret = new Promise(), results = [], isErrored = false;
        if (base.isArray(list)) {
            (function next(index) {
                if (index < list.length) {
                    var item = list[index];
                    try {
                        exports.when(base.isFunction(item) ? item() : item,
                            function () {
                                //store results
                                var args = base.argsToArray(arguments);
                                results.push(args.length == 1 ? args[0] : args);
                                process.nextTick(base.partial(next, index + 1));
                            },
                            function (err) {
                                //errback
                                if (!isErrored) {
                                    isErrored = true;
                                    ret.errback.apply(ret, arguments);
                                }
                            });
                    } catch (e) {
                        if (!isErrored) {
                            isErrored = true;
                            ret.errback(e);
                        }
                    }
                } else {
                    ret.callback(results);
                }
            })(0);
        } else {
            throw new Error("When calling comb.serial the first argument must be an array");
        }
        ret.then(callback, errback);
        return ret;
    }

});


