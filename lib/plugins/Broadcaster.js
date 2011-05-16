var func = require("../base/functions"),
        define = require("../define").define;


var Broadcaster = define(null, {
    instance : {
    /** @lends comb.plugins.Broadcaster.prototype */
        /**
         * Plugin to allow a class to easily broadcast events
         *
         * @example
         *
         * var Mammal = define(comb.plugins.Broadcaster, {
         *   instance : {
         *
         *      constructor: function(options) {
         *          options = options || {};
         *          this.super(arguments);
         *          this._type = options.type || "mammal";
         *      },
         *
         *      speak : function() {
         *          var str = "A mammal of type " + this._type + " sounds like";
         *          this.broadcast("speak", str);
         *          this.onSpeak(str);
         *          return str;
         *      },
         *
         *      onSpeak : function(){}
         *    }
         * });
         *
         *
         * var m = new Mammal({color : "gold"});
         * m.listen("speak", function(str){
         *      //called back from the broadcast event
         *       console.log(str);
         * });
         * m.speak();
         *
         * @constructs
         */
        constructor : function() {
            this.__listeners = {};
        },

        /**
         * Broadcasts an event from an object
         *
         * @param name the name of the event to broadcast
         * @param {Object|String|Function|Date|Number} [args]  variable number of arguments to pass to listeners, can be anything
         */
        broadcast : function(name, args) {
            var args = Array.prototype.slice.call(arguments);
            var topic = args.splice(0, 1)[0];
            if (topic) {
                var list = this.__listeners[topic];
                if (list) {
                    for (var i = list.length - 1; i >= 0; i--) {
                        var han = list[i], cb = han.cb;
                        if (cb) {
                            cb.apply(this, args);
                        }
                    }
                }
            }
        },

        /**
         * Listens to a broadcasted event
         * Simimlar to {@link comb.listen}
         *
         * @param {String} topic the topic to listen to
         * @param {Function} callback the function to callback on event publish
         *
         * @returns {Array} handle to disconnect a topic
         */
        listen : function(topic, callback) {
            if (!func.isFunction(callback)) throw new Error("callback must be a function");
            var handle = {
                topic : topic,
                cb : callback,
                pos : null
            };
            var list = this.__listeners[topic];
            if (!list) {
                list = (this.__listeners[topic] = []);
            }
            list.push(handle);
            handle.pos = list.length - 1;
            return handle;
        },

        /**
         * Disconnects a listener
         * Similar to {@link comb.unListen}
         *
         * @param  handle disconnect a handle returned from Broadcaster.listen
         */
        unListen : function(handle) {
            if (handle) {
                var listeners = this.__listeners;
                var topic = handle.topic, list = listeners[topic];
                if (list) {
                    for (var i = list.length - 1; i >= 0; i--) {
                        if (list[i] == handle) {
                            list.splice(i, 1);
                        }
                    }
                    if (!list.length) {
                        delete listeners[topic];
                    }
                }
            }
        }
    }
});

exports = module.exports = Broadcaster;