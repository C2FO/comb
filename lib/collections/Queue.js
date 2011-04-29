var define = require("../define").define,
        Collection = require("./Collection"),
        base = require("../base");

module.exports = exports = define(Collection, {
    instance : {
        constructor : function() {
            this.__queue = [];
            this.__next = 0;
            this.__last = 0;
        },

        enqueue : function(data) {
            this.__queue[this.__last++] = data;
        },

        dequeue : function() {
            var ret = undefined,next = this.__next, queue;
            if (next != this.__last) {
                queue = this.__queue;
                ret = queue[next];
                queue[this.__next++] = undefined;
            }
            return ret;
        },

        peek : function() {
            var ret = undefined, next = this.__next;
            if (next != this.__last) {
                ret = this.__queue[next];
            }
            return ret;
        },

        clear : function() {
            this.__queue.length = 0;
            this.__next = 0;
            this.__last = 0;
        },

        contains : function(obj) {
            return this.__queue.indexOf(obj) != -1;
        },

        remove : function(obj) {
            var index = this.__queue.indexOf(obj), ret = false;
            if (index != -1) {
                if (index == this.__next) {
                    this.dequeue();
                } else {
                    this.__queue.splice(index, 1);
                    this.__last--;
                }
                ret = true;
            }
            return ret;
        },

        getters : {
            count : function() {
                return this.__last - this.__next;
            },

            isEmpty : function() {
                return this.__last - this.__next == 0;
            },

            values : function(){
                return this.__queue.slice(this.__next, this.__last);
            }
        }
    }
});