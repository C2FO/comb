var define = require("../define").define,
        Collection = require("./Collection"),
        base = require("../base");

module.exports = exports = define(Collection, {
    instance : {
        constructor : function() {
            this.__stack = [];
            this.__next = -1;
        },

        push : function(data) {
            this.__stack[++this.__next] = data;
        },

        pop : function() {
            var ret = undefined, stack, next = this.__next;
            if (next >= 0) {
                stack = this.__stack;
                ret = stack[next];
                stack[this.__next--] = undefined;
            }
            return ret;
        },

        peek : function() {
            var ret = undefined,next = this.__next;
            if (next >= 0) {
                ret = this.__stack[next];
            }
            return ret;
        },

        clear : function() {
            this.__stack.length = 0;
            this.__next = -1;
        },

        contains : function(obj) {
            return this.__stack.indexOf(obj) != -1;
        },

        remove : function(obj) {
            var index = this.__stack.indexOf(obj), ret = false;
            if (index != -1) {
                if (index == this.__next) {
                    this.pop();
                } else {
                    this.__stack.splice(index, 1);
                    this.__next--;
                }
                ret = true;
            }
            return ret;
        },

        getters : {
            count : function() {
                return this.__next + 1;
            },

            isEmpty : function() {
                return this.__next < 0;
            },

            values : function(){
                return this.__stack.slice(0, this.__next+1).reverse();
            }
        }
    }
});