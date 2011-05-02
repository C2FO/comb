var func = require("../base/functions"),
        obj = require("../base/object"),
        Promise = require("../promise").Promise,
        define = require("../define").define;

module.exports = exports = define(null, {
    instance : {

        /*
         * private
         *
         * Object containing the hook methods
         * */
        __hooks : {pre : {}, post : {}},

        constructor : function(){
            this.__hooks = obj.merge({}, this.__hooks);
            this.super(arguments);
        },

        /*
         * protected
         *
         * Call my hooks
         * */
        _hook : function(state, op, args) {
            args = args || [];
            var promise = new Promise();
            if (this.__hooks[state] && this.__hooks[state][op]) {
                var funcs = this.__hooks[state][op], length = funcs.length;
                if (length) {
                    var count = 0;
                    var next = func.hitch(this, function() {
                        //if Ive looped through all of them callback
                        if (count == length) {
                            promise.callback();
                        } else {
                            //call next
                            var nextArgs = args.slice(0);
                            nextArgs.unshift(next);
                            funcs[count++].apply(this, nextArgs);
                        }
                    });
                    next();
                } else {
                    promise.callback();
                }
            } else {
                promise.callback();
            }
            return promise;
        },

        /*
         * public
         *
         * Use to listen to before an event occurred i.e. pre save
         * for Example instance.post("save", callback);
         *
         * NOTE : Hooks are called in the order they are received!
         *
         * When connecting your callback will be called in the scope of the model.
         *
         * example : instance.pre("save", function(next){
         *                 this.updated = new Date();
         *                 //you have to call next!!!!!
         *                 next();
         *          });
         * */
        pre : function(fun, callback) {
            var hook = this.__hooks.pre[fun];
            if (!hook) {
                hook = this.__hooks.pre[fun] = [];
            }
            hook.push(callback);
        },

        /*
         * public
         *
         * Use to listen to after an event has occurred i.e. post save
         * for Example instance.post("save", callback);
         *
         * NOTE : Hooks are called in the order they are received!
         *
         * When connecting your callback will be called in the scope of the model.
         *
         * example : instance.post("save", function(next){
         *                 this.__isNew = false;
         *                 //you have to call next!!!!!
         *                 next();
         *          });
         * */
        post : function(fun, callback) {
            var hook = this.__hooks.post[fun];
            //if I havent initialized it create it;
            if (hook == undefined) {
                hook = this.__hooks.post[fun] = [];
            }
            hook.push(callback);
        }
    },

    static : {

        /*
         * public
         *
         * Use to listen to after an event on all instances of this class
         *
         * NOTE : Hooks are called in the order they are received!
         *
         * When connecting your callback will be called in the scope of the model.
         *
         * example : Class.pre("save", function(next){
         *               ...
         *          });
         * */
        pre : function(name, cb) {
            var hooks = this.prototype.__hooks;
            var hook = hooks.pre[name];
            if (!hook) {
                hook = hooks.pre[name] = [];
            }
            hook.push(cb);
        },

        /*
         * public
         *
         * Use to listen to after an event on all instances of this class
         *
         * NOTE : Hooks are called in the order they are received!
         *
         * When connecting your callback will be called in the scope of the model.
         *
         * example : Class.post("save", function(next){
         *               ...
         *          });
         * */
        post : function(name, cb) {
            var hooks = this.prototype.__hooks;
            var hook = hooks.post[name];
            if (!hook) {
                hook = hooks.post[name] = [];
            }
            hook.push(cb);
        }
    }

});