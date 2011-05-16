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
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__fired = true;
            var cbs = this.__error ? this.__errorCbs : this.__cbs,
                    len = cbs.length, i,
                    results = this.__error || this.__results;
            for (i = 0; i < len; i++) {
                cbs[i].apply(this, results);
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
                if (this.__fired) {
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
            this.super(arguments);
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
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__fired = true;
            var cbs = this.__errors.length ? this.__errorCbs : this.__cbs,
                    len = cbs.length, i,
                    results = this.__errors.length ? this.__errors : this.__results;
            for (i = 0; i < len; i++) {
                cbs[i].call(this, results);
            }
        },

        addCallback : function(cb) {
            if (cb) {
                if (this.__fired) {
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