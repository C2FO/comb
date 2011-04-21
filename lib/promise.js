var hitch = require("./base/functions").hitch,
        define = require("./define").define;
/**
 * Promise Objects
 *      -Promise - a promise object
 *          - callback : resolve the promise, fires all registered callback
 *          - errback : resolve with error, fires all registerd errbacks
 *          - addCallback : adds a callback to the promise
 *          - addErrback : adds an errback to the promise
 *          - then : add both errback and callback
 *          - chain : adds callback and errback and returns a new promise,
 *                  - IMPORTANT the callback and errback must return a promise!
 *      -PromiseList - promise that fires after all contained promises are done
 *                   - Initilaize with a list of promises
 *                   -SEE PROMISE
 *
 *   Example : Simple promise
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
 *
 *
 * */

var Promise = define(null, {
    instance : {
        __fired : false,

        __results : null,

        __error : null,

        __errorCbs : null,

        __cbs : null,

        constructor : function() {
            this.__errorCbs = [];
            this.__cbs = [];
        },

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

        addErrback : function(cb) {
            if (cb) {
                if (this.__fired && this.__error) {
                    cb.apply(this, this.__error);
                } else {
                    this.__errorCbs.push(cb);
                }
            }
        },

        callback : function() {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__results = Array.prototype.slice.call(arguments);
            this.__resolve();
            return this;
        },

        errback : function(i) {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__error = Array.prototype.slice.call(arguments);
            this.__resolve();
            return this;
        },

        then : function(callback, errback) {
            this.addCallback(callback);
            this.addErrback(errback);
            return this;
        },

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
        __results : null,
        __errors : null,
        __promiseLength : 0,
        __defLength : 0,
        __firedLength : 0,

        constructor : function(defs) {
            this.__defLength = defs.length;
            this.__errors = [];
            this.__results = [];
            this.super(arguments);
            defs.forEach(this.__addDef, this);
        },

        __addDef : function(def, i) {
            def.addCallback(hitch(this, function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(i);
                this.callback.apply(this, args);
            }));
            def.addErrback(hitch(this, function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(i);
                this.errback.apply(this, args);
            }));
        },

        __resolve : function() {
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__fired = true;
            var cbs = this.__errors.length ? this.__errorCbs: this.__cbs,
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