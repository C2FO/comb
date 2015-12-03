"use strict";
var func = require("../base/functions"),
    obj = require("../base/object"),
    Promise = require("../promise").Promise,
    define = require("../define").define;

var nextTick;
if (typeof setImmediate === "function") {
    // In IE10, or use https://github.com/NobleJS/setImmediate
    nextTick = setImmediate;
} else {
    nextTick = function (cb) {
        process.nextTick(cb);
    };
}

var Middleware = define(null, {
    instance: {
        /** @lends comb.plugins.Middleware.prototype */


        __hooks: {pre: {}, post: {}},


        /**
         * @class Plugin to enable middleware on a class
         *
         * @example
         *
         * var Mammal = define(comb.plugins.Middleware, {
         *  instance : {
         *
         *    constructor: function(options) {
         *        options = options || {};
         *        this.super(arguments);
         *        this._type = options.type || "mammal";
         *    },
         *
         *    speak : function() {
         *        var ret = new comb.Promise();
         *        this._hook("pre", "speak")
         *                .then(comb.hitch(this, "_hook", "post", "speak"), hitch(ret, "errback"))
         *                .then(comb.hitch(ret, "callback"), comb.hitch(ret, "errback"));
         *        return ret;
         *    }
         *  }
         *});
         *
         *  Mammal.pre('speak', function(next){
         *     //do something meaningful
         *     next();
         *  });
         *  var m = new Mammal({color : "gold"});
         *  m.speak();
         *
         * @constructs
         */
        constructor: function () {
            this.__hooks = obj.merge({}, this.__hooks);
            this._super(arguments);
        },

        /**
         * <p>Protected!</p>
         *
         * <p>Call to initiate middleware for the topic</p>
         * <p><b>NOTE:</b> this function takes a variable number of arguments
         *       whatever comes after the op param will be passed into
         *       the listening function, with the last argument to the listenting
         *       function being the next function</p>
         *
         *
         * @public
         * @param {"pre"|"post"} state the state in which the hook should be called
         * @param {String} op the operation that is being acted upong
         * @param args arguments to be passed into the listening functions.
         * @returns {comb.Promise} a promise to use after middleware chain completes
         *
         */
        _hook: function (state, op, args) {
            args = args || [];
            var promise = new Promise();
            var funcs, length;
            if (this.__hooks[state] && (funcs = this.__hooks[state][op]) != null && (length = funcs.length) > 0) {
                var count = 0;
                var next = func.hitch(this, function (err) {
                    if (err) {
                        promise.errback(err);
                    } else {
                        nextTick(func.hitch(this, function () {
                            //if Ive looped through all of them callback
                            if (count === length) {
                                promise.callback();
                            } else {
                                //call next
                                var nextArgs = args.slice(0);
                                nextArgs.unshift(next);
                                funcs[count++].apply(this, nextArgs);
                            }
                        }));
                    }
                });
                next();
            } else {
                promise.callback();
            }
            return promise.promise();
        },

        /**
         * Use to listen to before an event occurred i.e. pre save
         *
         * <b>NOTE:</b></br>
         * <ul>
         *     <li>You must call next in order for the middleware chain to complete</li>
         *      <li>This connects to events on the instance of an object, not all instances!</li>
         *      <li>Hooks are called in the order they are received!</li>
         *      <li> When connecting your callback will be called in the scope of the class</br>if you want a certain scope use {@link comb.hitch}</li>
         *  </ul>
         *
         * @example
         *      instance.pre("save", function(args,...., next){
         *          //do something...
         *          //you have to call next!!!!!
         *          next();
         *      });
         *
         * */
        pre: function (fun, callback) {
            var hook = this.__hooks.pre[fun];
            if (!hook) {
                hook = this.__hooks.pre[fun] = [];
            }
            hook.push(callback);
        },

        /**
         * <p>Use to listen to after an event has occurred i.e. post save</p>
         * <b>NOTE:</b></br>
         * <ul>
         *     <li>You must call next in order for the middleware chain to complete</li>
         *      <li>This connects to events on the instance of an object, NOT all instances!</li>
         *      <li>Hooks are called in the order they are received!</li>
         *      <li>When connecting your callback will be called in the scope of the class</br>if you want a certain scope use {@link comb.hitch}</li>
         *  </ul>
         * @example
         *
         * instance.post("save", function(next){
         *                //do something...
         *                 //you have to call next!!!!!
         *                 next();
         *          });
         * */
        post: function (fun, callback) {
            var hook = this.__hooks.post[fun];
            //if I havent initialized it create it;
            if (hook === undefined) {
                hook = this.__hooks.post[fun] = [];
            }
            hook.push(callback);
        }
    },

    static: {
        /** @lends comb.plugins.Middleware */

        /**
         *<p> Use to listen to after an event has occurred i.e. post save</p>
         *
         * <b>NOTE:</b></br>
         * <ul>
         *     <li>You must call next in order for the middleware chain to complete</li>
         *      <li>This connects to events on ALL instances of an object</li>
         *      <li>Hooks are called in the order they are received!</li>
         *      <li>When connecting your callback will be called in the scope of the class</br>if you want a certain scope use {@link comb.hitch}</li>
         *  </ul>
         *
         * @example
         * Class.pre("save", function(next){
         *               ...
         *               //you must call next
         *          });
         * */
        pre: function (name, cb) {
            var hooks = this.prototype.__hooks;
            var hook = hooks.pre[name];
            if (!hook) {
                hook = hooks.pre[name] = [];
            }
            hook.push(cb);
        },

        /**
         *<p>Use to listen to after an event has occurred i.e. post save</p>
         *
         *<b>NOTE:</b></br>
         * <ul>
         *     <li>You must call next in order for the middleware chain to complete</li>
         *      <li>This connects to events on ALL instances of an object</li>
         *      <li>Hooks are called in the order they are received!</li>
         *      <li>When connecting your callback will be called in the scope of the class</br>if you want a certain scope use {@link comb.hitch}</li>
         *  </ul>
         *
         * @example
         * Class.post("save", function(next){
         *               ...
         *               //you must call next
         *          });
         * */
        post: function (name, cb) {
            var hooks = this.prototype.__hooks;
            var hook = hooks.post[name];
            if (!hook) {
                hook = hooks.post[name] = [];
            }
            hook.push(cb);
        }
    }

});

module.exports = exports = Middleware;