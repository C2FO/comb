var hitch = require("./base/functions").hitch,
    define = require("./define").define,
    base = require("./base"),
    argsToArray = base.argsToArray,
    isUndefinedOrNull = base.isUndefinedOrNull,
    isArray = base.isArray,
    isFunction = base.isFunction,
    bindIgnore = base.bindIgnore,
    isInstanceOf = base.isInstanceOf;


var Promise = define(null, {
    instance:{
        /** @lends comb.Promise.prototype */
        __fired:false,

        __results:null,

        __error:null,

        __errorCbs:null,

        __cbs:null,

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
                cb.apply(this, results);
            }));
        },

        /**
         * Add a callback to the callback chain of the promise
         *
         *
         * @param {Function|comb.Promise} cb the function or promise to callback when the promise is resolved.
         *
         * @return {comb.Promise} this promise for chaining
         */
        addCallback:function (cb) {
            if (cb) {
                if (exports.isPromiseLike(cb)) {
                    cb = hitch(cb, "callback");
                }
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
         * @param {Function|comb.Promise} cb the function or promise to callback when the promise errors
         *
         * @return {comb.Promise} this promise for chaining
         */
        addErrback:function (cb) {
            if (cb) {
                if (exports.isPromiseLike(cb)) {
                    cb = hitch(cb, "errback");
                }
                if (this.__fired && this.__error) {
                    cb.apply(this, this.__error);
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
        both:function (cb) {
            this.addCallback(cb);
            if (exports.isPromiseLike(cb)) {
                this.addErrback(hitch(cb, "callback"));
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
        callback:function (args) {
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
        errback:function (args) {
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
        resolve:function (err, args) {
            if (err) {
                this.errback(err);
            } else {
                this.callback.apply(this, argsToArray(arguments, 1));
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
        then:function (callback, errback) {
            if (exports.isPromiseLike(callback)) {
                this.addCallback(callback);
                this.addErrback(callback);
            } else {
                this.addCallback(callback);
                this.addErrback(errback);
            }
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
        classic:function (cb) {
            if ("function" === typeof cb) {
                this.addErrback(function (err) {
                    cb(err);
                });
                this.addCallback(function () {
                    cb.apply(this, [null].concat(argsToArray(arguments)));
                });
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
        chain:function (callback, errback) {
            var promise = new Promise();
            this.addCallback(function () {
                try {
                    when(isFunction(callback) ? callback.apply(this, arguments) : callback).then(promise);
                } catch (e) {
                    promise.errback(e);
                }
            });

            // If no errback passed, then invoke our promise's errback to pass
            // on to next link in the chain.
            this.addErrback(errback || promise);
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
        chainBoth:function (callback) {
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
        promise:function () {
            var ret = {
                chain:this.chain.bind(this),
                chainBoth:this.chainBoth.bind(this),
                promise:function () {
                    return ret;
                }
            };
            ["addCallback", "addErrback", "then", "both", "classic"].forEach(function (action) {
                ret[action] = function () {
                    this[action].apply(this, arguments);
                    return ret;
                }.bind(this);
            }, this);

            return ret;
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
        constructor:function (defs, normalizeResults) {
            this.__errors = [];
            this.__results = [];
            this.normalizeResults = base.isBoolean(normalizeResults) ? normalizeResults : false;
            this._super(arguments);
            if (defs && defs.length) {
                this.__defLength = defs.length;
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
                var args = argsToArray(arguments);
                args.unshift(i);
                this.callback.apply(this, args);
            }));
            promise.addErrback(hitch(this, function () {
                var args = argsToArray(arguments);
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
                cb.apply(this, [results]);
            }));
        },

        addCallback:function (cb) {
            if (cb) {
                if (exports.isPromiseLike(cb)) {
                    cb = hitch(cb, "callback");
                }
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
                if (exports.isPromiseLike(cb)) {
                    cb = hitch(cb, "errback");
                }
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
            var args = argsToArray(arguments);
            if (this.normalizeResults) {
                args = args.slice(1);
                args = args.length == 1 ? args.pop() : args;
            }
            this.__results[i] = args;
            this.__firedLength++;
            if (this.__firedLength == this.__defLength) {
                this.__resolve();
            }
            return this.promise();
        },


        errback:function (i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            var args = argsToArray(arguments);
            if (this.normalizeResults) {
                args = args.slice(1);
                args = args.length == 1 ? args.pop() : args;
            }
            this.__errors[i] = args;
            this.__firedLength++;
            if (this.__firedLength == this.__defLength) {
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
    list.forEach(function (listItem) {
        ret = ret.chain(propogate ? listItem : bindIgnore(null, listItem));
        if (!propogate) {
            ret.addCallback(function (res) {
                results.push(res);
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
    return !isUndefinedOrNull(obj) && (isInstanceOf(obj, Promise) || (isFunction(obj.then)
        && isFunction(obj.addCallback) && isFunction(obj.addErrback)));
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
    var args = argsToArray(arguments), p;
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
        if (isPromiseLike(args)) {
            p = args;
        } else if (isArray(args) && args.every(isPromiseLike)) {
            p = new PromiseList(args, true);
        } else {
            p = new Promise().callback(args);
        }
    } else {
        p = new PromiseList(args.map(function (a) {
            return exports.isPromiseLike(a) ? a : new Promise().callback(a);
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
    }
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

function asyncLoop(promise, cb, scope) {
    return when(promise).chain(function (results) {
        return when((isArray(results) ? results : [results]).map(function () {
            try {
                return when(cb.apply(scope || null, arguments));
            } catch (e) {
                return new Promise().errback(e);
            }
        })).chain(function (loopResults) {
                return {loopResults:loopResults || [], arr:results};
            });
    });
}


/**
 * Loops through the results of an promise. The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.asyncForEach(asyncArr(), function(){
 *      //do something with it
 * }).then(function(arr){
 *      console.log(arr); //[1,2,3,4,5];
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * var myNewArr = [];
 *
 * comb.asyncForEach(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         myNewArr.push([item, index]);
 *         ret.callback();
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //[[1,0], [2,1], [3,2], [4,3], [5,4]]
 * });
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved with the original array.
 * @static
 * @memberof comb
 */
function asyncForEach(promise, iterator, scope) {
    return asyncLoop(promise, iterator, scope).chain(function (results) {
        return results.arr;
    });
}


/**
 * Loops through the results of an promise resolving with the return value of the iterator function.
 * The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.asyncMap(asyncArr(), function(item){
 *      return item * 2;
 * }).then(function(arr){
 *      console.log(arr); //[2,4,6,8,10];
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * comb.asyncMap(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         ret.callback(item * 2);
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //[2,4,6,8,10];
 * });
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved with the mapped array.
 * @static
 * @memberof comb
 */
function asyncMap(promise, iterator, scope) {
    return asyncLoop(promise, iterator, scope).chain(function (results) {
        return results.loopResults;
    });
}


/**
 * Loops through the results of an promise resolving with the filtered array.
 * The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.asyncFilter(asyncArr(), function(item){
 *      return item % 2;
 * }).then(function(arr){
 *      console.log(arr); //[1,3,5];
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * comb.asyncFilter(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         ret.callback(item % 2);
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //[1,3,5];
 * })
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved with the filtered array.
 * @static
 * @memberof comb
 */
function asyncFilter(promise, iterator, scope) {
    return asyncLoop(promise, iterator, scope).chain(function (results) {
        var loopResults = results.loopResults, resultArr = results.arr;
        return (isArray(resultArr) ? resultArr : [resultArr]).filter(function (res, i) {
            return loopResults[i];
        });
    });
}


/**
 * Loops through the results of an promise resolving with true if every item passed, false otherwise.
 * The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.asyncEvery(asyncArr(), function(item){
 *      return item <= 5;
 * }).then(function(every){
 *      console.log(every); //true
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * comb.asyncEvery(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         ret.callback(item == 1);
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //false;
 * })
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved true if every item passed false otherwise.
 * @static
 * @memberof comb
 */
function asyncEvery(promise, iterator, scope) {
    return asyncLoop(promise, iterator, scope).chain(function (results) {
        return results.loopResults.every(function (res) {
            return !!res;
        });
    });
}

/**
 * Loops through the results of an promise resolving with true if some items passed, false otherwise.
 * The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.asyncSome(asyncArr(), function(item){
 *      return item == 1;
 * }).then(function(every){
 *      console.log(every); //true
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * comb.asyncSome(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         ret.callback(item > 5);
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //false;
 * })
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved with true if some items passed false otherwise.
 * @static
 * @memberof comb
 */
function asyncSome(promise, iterator, scope) {
    return asyncLoop(promise, iterator, scope).chain(function (results) {
        return results.loopResults.some(function (res) {
            return !!res;
        });
    });
}


base.merge(exports, {
    isPromiseLike:isPromiseLike,
    when:when,
    wrap:wrap,
    serial:serial,
    chain:chain,
    Promise:Promise,
    PromiseList:PromiseList,
    asyncForEach:asyncForEach,
    asyncMap:asyncMap,
    asyncFilter:asyncFilter,
    asyncEvery:asyncEvery,
    asyncSome:asyncSome
});








