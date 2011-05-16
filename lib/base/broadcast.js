var func = require("./functions"),
        obj = require("./object"),
        define = require("../define").define;

var comb = exports;
var __dispatcher = {

    dispatcher : function() {
        return function() {
            var c = arguments.callee, listeners = c.__listeners, target = c.target, r;
            if (target) {
                r = target.apply(this, arguments);
            }
            for (var i = 0; i < listeners.length; i++) {
                var lis = listeners[i];
                if (lis) {
                    lis.apply(this, arguments);
                }
            }
            return r;

        }
    },

    connect : function(obj, method, cb) {
        if (typeof method != "string") throw new Error("When calling connect the method must be string");
        if (!func.isFunction(cb)) throw new Error("When calling connect callback must be a string");
        var scope = obj || global, listeners, newMethod;
        if (typeof scope[method] == "function") {
            listeners = scope[method].__listeners;
            if (!listeners) {
                newMethod = this.dispatcher();
                newMethod.target = obj[method];
                listeners = (newMethod.__listeners = []);
                scope[method] = newMethod;
            }
            return listeners.push(cb);
        } else {
            throw new Error("unknow method " + method + " in object " + obj);
        }
    },

    disconnect : function(obj, method, cb) {
        if (typeof method != "string") throw new Error("When calling disconnect the method must be string");
        var scope = obj || global, ls;
        if (typeof scope[method] == "function") {
            ls = scope[method].__listeners;
            if (ls && cb-- > 0) {
                //we dont want to splice it because our indexing will get off
                delete ls[cb];
            }
        } else {
            throw new Error("unknown method " + method + " in object " + obj);
        }

    }
};

var listeners = {};
obj.merge(comb, {


    /**
     * Disconnects a listener to a function
     * @param {handle} A handle returned from comb.connect
     */
    disconnect : function(handle) {
        __dispatcher.disconnect.apply(__dispatcher, handle);
    },

    /**
     * Function to listen when other functions are called
     *
     * @example
     *
     *  comb.connect(obj, "event", myfunc);
     *  comb.connect(obj, "event", "log", console);
     *
     * @param {Object} obj the object in which the method you are connection to resides
     * @param {String} method the name of the method to connect to
     * @param {Function} cb the function to callback
     * @param {Object} [scope] the scope to call the specified cb in
     *
     * @returns {Array} handle to pass to {@link comb.disconnect}
     */
    connect : function(obj, method, cb, scope) {
        return [obj, method, __dispatcher.connect(obj, method, cb)];
    },


    /**
     * Broadcasts an event to all listeners
     * NOTE : the function takes a variable number of arguments
     *        i.e. all arguments after the topic will be passed to the listeners
     *
     * @example
     *
     *
     * comb.broadcast("hello", "hello world");
     * //the args "hello" and "world" will be passed to any listener of the topic
     * //"hello"
     * comb.broadcast("hello", "hello", "world");
     *
     * @param  {String} topic the topic to brodcast
     * @param params the information to bradcast
     */
    broadcast : function() {
        var args = Array.prototype.slice.call(arguments);
        var topic = args.splice(0, 1)[0];
        if (topic) {
            var list = listeners[topic];
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
     * Listen for the broadcast of certain events
     *
     * @example
     *  comb.listen("hello", function(arg1, arg2){
     *     console.log(arg1);
     *     console.log(arg2);
     *  });
     *
     * @param {String} topic the topic to listen for
     * @param {Function} callback the funciton to call when the topic is published
     *
     * @returns a handle to pass to {@link comb.unListen}
     */
    listen : function(topic, callback) {
        if (!func.isFunction(callback)) throw new Error("callback must be a function");
        var handle = {
            topic : topic,
            cb : callback,
            pos : null
        };
        var list = listeners[topic];
        if (!list) {
            list = (listeners[topic] = []);
        }
        list.push(handle);
        handle.pos = list.length - 1;
        return handle;
    },

    /**
     * Disconnects a listener
     *
     * @param handle a handle returned from {@link comb.listen}
     */
    unListen : function(handle) {
        if (handle) {
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

});

