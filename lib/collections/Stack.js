"use strict";
var define = require("../define").define,
    Collection = require("./Collection"),
    base = require("../base");

/**
 * @class <p>LIFO Data structure</p>
 * @name Stack
 * @augments comb.collections.Collection
 * @memberOf comb.collections
 *
 * @property {Number} count the current number of elements in this queue
 * @property {Boolean} isEmpty true if this queue is empty
 * @property {Array} values a copy of the values contained in this queue
 * @ignoreCode
 */
module.exports = exports = define(Collection, {
    instance: {
        /**@lends comb.collections.Stack.prototype*/

        constructor: function () {
            this.__stack = [];
            this.__next = -1;
        },

        /**
         * Add an item to the tail of this stack
         * @param {*} data item to qppend to this stack
         *
         */
        push: function (data) {
            this.__stack[++this.__next] = data;
        },

        /**
         * Removes the tail of this static
         * @return {*} the data at the tail of this stack
         */
        pop: function () {
            var next = this.__next,
                ret,
                stack;

            if (next >= 0) {
                stack = this.__stack;
                ret = stack[next];
                stack[this.__next--] = undefined;
            }
            return ret;
        },

        /**
         * Retrieves the item at the tail of the stack without removing it
         *
         * @return {*} The element at the tail of the stack. Returns undefined if the stack is empty.
         */
        peek: function () {
            var next = this.__next,
                ret;
            if (next >= 0) {
                ret = this.__stack[next];
            }
            return ret;
        },

        /**
         * Removes all items from this stack.
         */
        clear: function () {
            this.__stack.length = 0;
            this.__next = -1;
        },

        /**
         * Determine if this stack contains the element
         * @param {*} obj the object to find
         *
         * @return {Boolean} true if this stack contains the element
         */
        contains: function (obj) {
            return this.__stack.indexOf(obj) !== -1;
        },

        /**
         * Removes an element from this stack.
         * @param {*} obj the data to remove.
         *
         * @return {Boolean} true if the element was removed, false otherwise.
         */
        remove: function (obj) {
            var index = this.__stack.indexOf(obj), ret = false;
            if (index !== -1) {
                if (index === this.__next) {
                    this.pop();
                } else {
                    this.__stack.splice(index, 1);
                    this.__next--;
                }
                ret = true;
            }
            return ret;
        },

        toString: function () {
            return this.__stack.toString();
        },

        getters: {
            count: function () {
                return this.__next + 1;
            },

            isEmpty: function () {
                return this.__next < 0;
            },

            values: function () {
                return this.__stack.slice(0, this.__next + 1).reverse();
            }
        }
    }
});