var func = require("../base/functions"),
        define = require("../define").define;
/**
 * Broadcast mixin for objects that publish events, this allows events
 * to be namespaces accordingly otherwise, use comb.subscribe
 **/
module.exports = exports = define(null, {
    instance : {

        /**
         * Default constructor
         */
        constructor : function() {
            this.__listeners = {};
        },

        /**
         * Broadcasts an event from an object
         *
         * @param name the name of the event to broadcast
         * @param {Object|String|Function|Date|Number} [args]  variable number of arguments to pass to listners, can be anything
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
         *
         * @param {Object} handle the handle to disconnect
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
        },

        /**
         * @see broadcast
         */
        publish : function() {
            return this.broadcast.apply(this, arguments);
        },

        /**
         * @see Listen
         */
        subscribe : function() {
            return this.listen.apply(this, arguments);
        },

        /**
         * @see unListen
         */
        unSubscribe : function() {
            return this.unListen.apply(this, arguments);
        }
    }
});