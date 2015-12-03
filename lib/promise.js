"use strict";
var define = require("./define").define,
    base = require("./base"),
    isObject = base.isObject,
    hitch = base.hitch,
    hitchAll = base.hitchAll,
    partial = base.partial,
    argsToArray = base.argsToArray,
    array = base.array,
    forEach = array.forEach,
    zip = array.zip,
    flatten = array.flatten,
    isUndefinedOrNull = base.isUndefinedOrNull,
    isArray = base.isArray,
    isFunction = base.isFunction,
    bindIgnore = base.bindIgnore,
    isInstanceOf = base.isInstanceOf,
    spreadArgs = base.__spreadArgs;

var nextTick;
if (typeof setImmediate === "function") {
    // In IE10, or use https://github.com/NobleJS/setImmediate
    nextTick = setImmediate;
} else {
    nextTick = function (cb) {
        process.nextTick(cb);
    };
}
function reject(e) {
    return new Promise().errback(e);
}

function promiseWrapper(wrapper, promise, action) {
    var m = promise[action];
    wrapper[action] = hitch(promise, function () {
        spreadArgs(m, arguments, this);
        return wrapper;
    });
}


var Promise = define(null, {
    instance: {
        /** @lends comb.Promise.prototype */
        __fired: false,

        __results: null,

        __error: null,

        __errorCbs: null,

        __cbs: null,

        /**
         * Promise object used to provide seperation of success and error resolution paths for async operations.
         *
         * @example
         * var myFunc = function(){
         *     var promise = new Promise();
         *     //callback the promise after 10 Secs
         *     setTimeout(hitch(promise, "callback"), 10000);
         *     return promise.promise();
         * }
         * var myFunc2 = function(){
         *     var promises =[];
         *     for(var i = 0; i < 10; i++){
         *         promises.push(myFunc);
         *     }
         *     //create a new promise list with all 10 promises
         *     return new PromiseList(promises).promise();
         * }
         *
         * myFunc.then(function(success){}, function(error){})
         * //chain promise operations
         * myFunc.chain(myfunc).then(function(success){}, function(error){})
         *
         * myFunc2.then(function(success){}, function(error){})
         * //chain promise operations
         * myFunc2.chain(myfunc).then(function(success){}, function(error){})
         * @constructs
         */
        constructor: function () {
            this.__errorCbs = [];
            this.__cbs = [];
            this.callback = hitch(this, this.callback);
            this.errback = hitch(this, this.errback);
        },
        /**
         * @private
         */
        __resolve: function () {
            var self = this;
            if (!self.__fired) {
                self.__fired = true;
                nextTick(function () {
                    var cbs = self.__error ? self.__errorCbs : self.__cbs,
                        res = self.__error || self.__results,
                        i = -1, l = cbs.length;
                    while (++i < l) {
                        spreadArgs(cbs[i], res);
                    }
                    self.__errorCbs.length = self.__cbs.length = 0;
                    self = null;
                });
            }
        },

        __callNextTick: function (cb, results) {
            nextTick(function () {
                spreadArgs(cb, results);
                cb = results = null;
            });
        },

        /**
         * Add a callback to the callback chain of the promise
         *
         *
         * @param {Function|comb.Promise} cb the function or promise to callback when the promise is resolved.
         *
         * @return {comb.Promise} this promise for chaining
         */
        addCallback: function (cb) {
            if (cb) {
                if (isPromise(cb)) {
                    cb = cb.callback;
                }
                if (this.__fired && this.__results) {
                    this.__callNextTick(cb, this.__results);
                } else {
                    this.__cbs.push(cb);
                }
            }
            return this;
        },


        /**
         * Add a callback to the errback chain of the promise
         *
         * @param {Function|comb.Promise} cb the function or promise to callback when the promise errors
         *
         * @return {comb.Promise} this promise for chaining
         */
        addErrback: function (cb) {
            if (cb) {
                if (isPromise(cb)) {
                    cb = cb.errback;
                }
                if (this.__fired && this.__error) {
                    this.__callNextTick(cb, this.__error);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
            return this;
        },

        /**
         *
         * Adds a callback or promise to be resolved for both success
         * and error.
         *
         * @param {Function|comb.Promise} cb callback or promise to be resolved for both success
         * and error.
         * @return {comb.Promise} this promise for chaining
         */
        both: function (cb) {
            this.addCallback(cb);
            if (isPromise(cb)) {
                this.addErrback(cb.callback);
            } else {
                this.addErrback(cb);
            }

            return this;
        },

        /**
         * When called all functions registered as callbacks are called with the passed in results.
         *
         * @param {*} args variable number of results to pass back to listeners of the promise
         */
        callback: function (args) {
            args = argsToArray(arguments);
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__results = args;
            this.__resolve();
            return this.promise();
        },


        /**
         * When called all functions registered as errbacks are called with the passed in error(s)
         *
         * @param {*} args  number of errors to pass back to listeners of the promise
         */
        errback: function (args) {
            if (this.__fired) {
                throw args || new Error("Already fired");
            }
            this.__error = argsToArray(arguments);
            this.__resolve();
            return this.promise();
        },

        /**
         * Resolved a promise using the node style callback.
         *
         * @example
         *
         * var promise = new Promise();
         * fs.readFile("file.txt", "utf8", promise.resolve.bind(promise));
         * promise.then(function(file){
         *     console.log(file);
         * });
         *
         * @param {Error} [err=null] If specified then the promise will error out
         * @param {...} [args] if err is null then the aruments will be used to resolve the promise.
         *
         * @return {comb.Promise} for chaining.
         */
        resolve: function (err, args) {
            if (err) {
                this.errback(err);
            } else {
                spreadArgs(this.callback, argsToArray(arguments, 1), this);
            }
            return this;
        },

        /**
         * Call to specify action to take after promise completes or errors
         *
         * @param {Function} [callback=null] function to call after the promise completes successfully
         * @param {Function} [errback=null] function to call if the promise errors
         *
         * @return {comb.Promise} this promise for chaining
         */
        then: function (callback, errback) {
            if (isPromise(callback)) {
                errback = callback.errback;
                callback = callback.callback;
            }
            this.addCallback(callback);
            this.addErrback(errback);

            return this;
        },

        /**
         * Call this function as a classic node callback where the first argument
         * will be an error, or null if no error occured. The other arugments will
         * be the result from the promise.
         *
         * @example
         *
         * promise.classic(function(err, res){
         *      if(err){
         *          console.log(err);
         *      }else{
         *          console.log(res);
         *      }
         * });
         *
         * @param cb callback where the first argument
         * will be an error, or null if no error occured. The other arugments will
         * be the result from the promise.
         * @return {comb.Promise} the promise to chain
         */
        classic: function (cb) {
            if ("function" === typeof cb) {
                this.addErrback(cb);
                this.addCallback(partial(cb, null));
            }
            return this;
        },

        /**
         * Call to chaining of promises
         *
         * ```
         * new Promise()
         *  .callback("hello")
         *  .chain(function(previousPromiseResults){
         *      return previousPromiseResults + " world";
         * }, errorHandler)
         *  .chain(function(previousPromiseResults){
         *    return when(dbCall());
         *  }).classic(function(err, results){
         *      //all promises are done
         *  });
         *
         *  ```
         *
         *  You can also use static values
         *
         *  ```
         * new Promise().callback()
         *     .chain("hello")
         *     .chain(function(prev){
         *         return prev + " world!"
         *     }).then(function(str){
         *         console.log(str); //"hello world!"
         *     });
         * ```
         *
         * If you do not provide an `errback` for each chain then it will be propogated to the final promise
         *
         *
         * ```
         * new Promise()
         *     .chain(function(){
         *         return new comb.Promise().errback(new Error("error"));
         *     })
         *     .chain(function(){
         *         return prev + " world!"
         *     })
         *     .classic(function(err, str){
         *         console.log(err.message); //"error"
         *     });
         * ```
         *
         *
         * @param callback method to call this one completes. If you return a promise the execution will delay until the returned promise has resolved.
         * @param [errback=null] method to call if this promise errors. If errback is not specified then the returned promises
         * errback method will be used.
         *
         * @return {comb.Promise} A new that wraps the promise for chaining
         */
        chain: function (callback, errback) {
            var promise = new Promise(),
                self = this;

            function _errback(e) {
                if (isFunction(errback)) {
                    try {
                        var res = spreadArgs(errback, [e]);
                        isPromiseLike(res) ? res.then(promise.callback, promise.errback) : promise.callback(res);
                    } catch (e) {
                        promise.errback(e);
                    }
                } else {
                    promise.errback(e);
                }
            }

            function _callback() {
                try {
                    var res = isFunction(callback) ? spreadArgs(callback, arguments) : callback;
                    if (isPromiseLike(res)) {
                        res.then(promise.callback, _errback);
                    } else {
                        promise.callback(res);
                        promise = null;
                    }
                    callback = res = null;
                } catch (e) {
                    _errback(e);
                }
            }

            self.addCallback(_callback);
            self.addErrback(_errback);
            return promise.promise();
        },

        /**
         * Applies the same function that returns a promise to both the callback and errback.
         *
         * @param {Function} callback function to call. This function must return a Promise
         *
         * @return {comb.Promise} a promise to continue chaining or to resolve with.
         *
         */
        chainBoth: function (callback) {
            var promise = new Promise();
            this.addCallback(function () {
                try {
                    when(isFunction(callback) ? callback.apply(this, arguments) : callback).then(promise);
                } catch (e) {
                    promise.errback(e);
                }
            });

            this.addErrback(function () {
                try {
                    when(isFunction(callback) ? callback.apply(this, arguments) : callback).then(promise);
                } catch (e) {
                    promise.errback(e);
                }
            });
            return promise.promise();
        },

        /**
         * Creates an object to that contains methods to listen to resolution but not the "callback" or "errback" methods.
         *
         * @example
         *
         * var asyncMethod = function(){
         *     var ret = new comb.Promise();
         *     process.nextTick(ret.callback.bind(ret, "hello"));
         *     return ret.promise();
         * }
         *
         * asyncMethod().callback() //throws error
         *
         * @return {Object} an object containing "chain", "chainBoth", "promise", "addCallback", "addErrback", "then", "both".
         */
        promise: function () {
            var ret = {
                promise: function () {
                    return ret;
                }
            };
            var self = this;
            ret["chain"] = function () {
                return spreadArgs(self["chain"], arguments, self);
            };
            ret["chainBoth"] = function () {
                return spreadArgs(self["chainBoth"], arguments, self);
            };
            ret["addCallback"] = function () {
                spreadArgs(self["addCallback"], arguments, self);
                return ret;
            };
            ret["addErrback"] = function () {
                spreadArgs(self["addErrback"], arguments, self);
                return ret;
            };
            ret["then"] = function () {
                spreadArgs(self["then"], arguments, self);
                return ret;
            };
            ret["both"] = function () {
                spreadArgs(self["both"], arguments, self);
                return ret;
            };
            ret["classic"] = function () {
                spreadArgs(self["classic"], arguments, self);
                return ret;
            };
            return ret;
        }


    }
});


var PromiseList = define(Promise, {
    instance: {
        /** @lends comb.PromiseList.prototype */

        /*@private*/
        __results: null,

        /*@private*/
        __errors: null,

        /*@private*/
        __promiseLength: 0,

        /*@private*/
        __defLength: 0,

        /*@private*/
        __firedLength: 0,

        normalizeResults: false,

        /**
         * PromiseList object used for handling a list of Promises
         *
         * @example
         * var myFunc = function(){
         *     var promise = new Promise();
         *     //callback the promise after 10 Secs
         *     setTimeout(hitch(promise, "callback"), 10000);
         *     return promise.promise();
         * }
         * var myFunc2 = function(){
         *     var promises =[];
         *     for(var i = 0; i < 10; i++){
         *         promises.push(myFunc);
         *     }
         *     //create a new promise list with all 10 promises
         *     return new PromiseList(promises).promise();
         * }
         *
         * myFunc.then(function(success){}, function(error){})
         * //chain promise operations
         * myFunc.chain(myfunc).then(function(success){}, function(error){})
         *
         * myFunc2.then(function(success){}, function(error){})
         * //chain promise operations
         * myFunc2.chain(myfunc).then(function(success){}, function(error){})
         *
         *  @param {comb.Promise[]} [defs=[]] the list of promises
         * @constructs
         * @augments comb.Promise
         * @memberOf comb
         * */
        constructor: function (defs, normalizeResults) {
            this.__errors = [];
            this.__results = [];
            this.normalizeResults = base.isBoolean(normalizeResults) ? normalizeResults : false;
            this._super(arguments);
            if (defs && defs.length) {
                this.__defLength = defs.length;
                forEach(defs, this.__addPromise, this);
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
        __addPromise: function (promise, i) {
            var self = this;
            promise.then(
                function () {
                    var args = argsToArray(arguments);
                    args.unshift(i);
                    spreadArgs(self.callback, args, self);
                    promise = i = self = null;
                },
                function () {
                    var args = argsToArray(arguments);
                    args.unshift(i);
                    spreadArgs(self.errback, args, self);
                    promise = i = self = null;
                });
        },

        /**
         * Resolves the promise
         * @private
         */
        __resolve: function () {
            if (!this.__fired) {
                this.__fired = true;
                var self = this;
                nextTick(function () {
                    var cbs = self.__errors.length ? self.__errorCbs : self.__cbs,
                        len = cbs.length, i,
                        results = self.__errors.length ? self.__errors : self.__results;
                    for (i = 0; i < len; i++) {
                        spreadArgs(cbs[i], [results]);
                    }
                });
            }
        },

        __callNextTick: function (cb, results) {
            nextTick(function () {
                spreadArgs(cb, [results]);
                cb = results = null;
            });
        },

        addCallback: function (cb) {
            if (cb) {
                if (isPromise(cb)) {
                    cb = cb.callback;
                }
                if (this.__fired && !this.__errors.length) {
                    this.__callNextTick(cb, this.__results);
                } else {
                    this.__cbs.push(cb);
                }
            }
            return this;
        },

        addErrback: function (cb) {
            if (cb) {
                if (isPromise(cb)) {
                    cb = cb.errback;
                }
                if (this.__fired && this.__errors.length) {
                    this.__callNextTick(cb, this.__errors);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
            return this;
        },


        callback: function (i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            var args = argsToArray(arguments);
            if (this.normalizeResults) {
                args = args.slice(1);
                args = args.length === 1 ? args.pop() : args;
            }
            this.__results[i] = args;
            this.__firedLength++;
            if (this.__firedLength === this.__defLength) {
                this.__resolve();
            }
            return this.promise();
        },


        errback: function (i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            var args = argsToArray(arguments);
            if (this.normalizeResults) {
                args = args.slice(1);
                args = args.length === 1 ? args.pop() : args;
            }
            this.__errors[i] = args;
            this.__firedLength++;
            if (this.__firedLength === this.__defLength) {
                this.__resolve();
            }
            return this.promise();
        }

    }
});


/**
 * Creates the promise chain
 * @ignore
 * @private
 */
function callNext(list, results, propogate) {
    var ret = new Promise().callback();
    forEach(list, function (listItem) {
        ret = ret.chain(propogate ? listItem : bindIgnore(null, listItem));
        if (!propogate) {
            ret.addCallback(function (res) {
                results.push(res);
                res = null;
            });
        }
    });
    return propogate ? ret.promise() : ret.chain(results);
}

/**
 * Tests if an object is like a promise (i.e. it contains then, addCallback, addErrback)
 * @param obj object to test
 * @function
 * @static
 * @memberOf comb
 */
function isPromiseLike(obj) {
    return isObject(obj, Promise) && typeof obj.then === "function";
}

function isPromise(obj) {
    return obj instanceof Promise;
}

/**
 * Waits for promise and non promise values to resolve and fires callback or errback appropriately. If you pass in an array of promises
 * then it will wait for all promises in the list to resolve.
 *
 * @example
 *  var a = "hello";
 *  var b = new comb.Promise().callback(world);
 *  comb.when(a, b) => called back with ["hello", "world"];
 *
 * @param {Anything...} args variable number of arguments to wait for.
 * @param {Function} cb the callback function
 * @param {Function} eb the errback function
 * @returns {comb.Promise} a promise that is fired when all values have resolved
 * @static
 * @memberOf comb
 */
function when(args, cb, eb) {
    var p;
    args = argsToArray(arguments);
    eb = base.isFunction(args[args.length - 1]) ? args.pop() : null;
    cb = base.isFunction(args[args.length - 1]) ? args.pop() : null;
    if (eb && !cb) {
        cb = eb;
        eb = null;
    }
    if (!args.length) {
        p = new Promise().callback(args);
    } else if (args.length === 1) {
        args = args.pop();
        if (isPromiseLike(args)) {
            p = args;
        } else if (isArray(args) && array.every(args, isPromiseLike)) {
            p = new PromiseList(args, true);
        } else {
            p = new Promise().callback(args);
        }
    } else {
        p = new PromiseList(args.map(function (a) {
            return isPromiseLike(a) ? a : new Promise().callback(a);
        }), true);
    }
    if (cb) {
        p.addCallback(cb);
    }
    if (eb) {
        p.addErrback(eb);
    }
    return p.promise();

}

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
 *      function(err){
 *
 *      }  console.error(err);
 * );
 *
 *
 * @param {Function} fn function to wrap
 * @param {Object} scope scope to call the function in
 *
 * @return {Funciton} a wrapped function
 * @static
 * @memberOf comb
 */
function wrap(fn, scope) {
    return function () {
        var ret = new Promise();
        var args = argsToArray(arguments);
        args.push(ret.resolve.bind(ret));
        fn.apply(scope || this, args);
        return ret.promise();
    };
}

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
 *    return ret.promise();
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
 * @static
 * @memberOf comb
 */
function serial(list, callback, errback) {
    if (base.isArray(list)) {
        return callNext(list, [], false);
    } else {
        throw new Error("When calling comb.serial the first argument must be an array");
    }
}


/**
 * Works just like {@link comb.Promise#chain} method, allowing you to propogate results from one funciton to another.
 * This is different than {@link comb.serial} in that it propogates results from one promise to the next, where
 * {@link comb.serial} does not.
 *
 * @example
 *
 * function asyncAction(add, timeout) {
 *      return function (num) {
 *          num = num || 0;
 *          var ret = new comb.Promise();
 *          setTimeout(function () {
 *               ret.callback(num + add);
 *          }, timeout);
 *          return ret;
 *      }
 * }
 *
 * comb.chain([
 *      asyncAction(1, 100),
 *      asyncAction(2, 100),
 *      asyncAction(3, 100),
 *      asyncAction(4, 100),
 *      asyncAction(5, 100),
 * ]).then(function(results){
 *      console.log(results); //15
 * });
 *
 * @param {function[]} list an array of function to call.
 * @return {comb.Promise} a promise that will resolve with the results of the last function in the list.
 * @static
 * @memberOf comb
 */
function chain(list) {
    if (base.isArray(list)) {
        return callNext(list, [], true);
    } else {
        throw new Error("When calling comb.serial the first argument must be an array");
    }
}


/**
 * Ensures that a promise is resolved before a the function can be run.
 *
 * For example suppose you have to ensure that you are connected to a database before you execute a function.
 *
 * ```
 * var findUser = comb.wait(connect(), function findUser(id){
 *      //this wont execute until we are connected
 *      return User.findById(id);
 * });
 *
 *  comb.when(findUser(1), findUser(2)).then(function(users){
 *      var user1 = users[0], user2 = users[1];
 *  });
 *
 * ```
 *
 * @param args variable number of arguments to wait on. See {@link comb.when}.
 * @param {Function} fn function that will wait.
 * @return {Function} a function that will wait on the args to resolve.
 * @memberOf comb
 * @static
 */
function wait(args, fn) {
    var resolved = false;
    args = argsToArray(arguments);
    fn = args.pop();
    var p = when(args);
    return function waiter() {
        if (!resolved) {
            var args = arguments;
            return p.chain(function () {
                resolved = true;
                p = null;
                return fn.apply(this, args);
            }.bind(this));
        } else {
            return when(fn.apply(this, arguments));
        }
    };
}


/**
 * Wraps a stream in a promise waiting for either the `"end"` or `"error"` event to be triggered.
 *
 * ```
 * comb.promisfyStream(fs.createdReadStream("my.file")).chain(function(){
 *      console.log("done reading!");
 * });
 *
 * ```
 *
 * @param stream stream to wrap
 * @return {comb.Promise} a Promise is resolved if `"end"` is triggered before `"error"` or rejected if `"error"` is triggered.
 * @memberOf comb
 * @static
 */
function promisfyStream(stream) {
    var ret = new Promise(), called;

    function errorHandler() {
        if (!called) {
            called = true;
            spreadArgs(ret.errback, arguments, ret);
            stream.removeListener("error", endHandler);
            stream.removeListener("end", endHandler);
            stream = ret = null;
        }
    }

    function endHandler() {
        if (!called) {
            called = true;
            spreadArgs(ret.callback, arguments, ret);
            stream.removeListener("error", endHandler);
            stream.removeListener("end", endHandler);
            stream = ret = null;
        }
    }

    stream.on("error", errorHandler).on("end", endHandler);
    return ret.promise();
}

/**
 * Creates a new {@link comb.Promise} that is resolved with the given value.
 *
 * ```
 * comb.resolved(1).chain(function(val){
 *      //val === 1
 * });
 * ```
 *
 * If you give it a promise it will wait for the promise to resolve or error.
 *
 * ```
 * comb.resolved(new comb.Promise().callback(1)).chain(function(val){
 *      //val === 1
 * });
 * ```
 *
 * @param val - val to resolve with
 * @returns {comb.Promise} a promisfied version of the value.
 * @memberOf comb
 * @static
 */
function resolved(val) {
    var ret = new Promise();
    when(val).chain(ret.callback, ret.errback);
    return ret.promise();
}

/**
 * Creates a new {@link comb.Promise} that is rejected with the given value.
 *
 * ```
 * comb.resolved(new Error("error!")).chain(null, function(err){
 *      console.error(err.stack);
 * });
 * ```
 *
 * If you give it a promise it will wait for the promise to resolve or error but with reject either way.
 *
 * ```
 * comb.resolved(new comb.Promise().callback(1)).chain(null, function(err){
 *      //err === 1
 * });
 * ```
 *
 * @param val - val to reject with
 * @returns {comb.Promise} a rejected promise with the specified value.
 * @memberOf comb
 * @static
 */
function rejected(val) {
    var ret = new Promise();
    when(val).chain(ret.errback, ret.errback);
    return ret.promise();
}


base.merge(exports, {
    isPromiseLike: isPromiseLike,
    when: when,
    wrap: wrap,
    wait: wait,
    serial: serial,
    chain: chain,
    promisfyStream: promisfyStream,
    resolved: resolved,
    rejected: rejected,
    Promise: Promise,
    PromiseList: PromiseList
});








