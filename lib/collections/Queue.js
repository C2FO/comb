"use strict";
var define = require("../define").define,
    Collection = require("./Collection"),
    base = require("../base");

/**
 * @class <p>FIFO Data structure</p>
 * @name Queue
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
        /**@lends comb.collections.Queue.prototype*/

        constructor: function () {
            this.__queue = [];
            this.__next = 0;
            this.__last = 0;
        },

        /**
         * Add data to this queue
         * @param {*} data element to add
         */
        enqueue: function (data) {
            this.__queue[this.__last++] = data;
        },

        /**
         * Removes first item from the head of the queue
         *
         * @return {*} The element removed from this queue. Returns undefined if the queue is empty.
         */
        dequeue: function () {
            var next = this.__next,
                ret,
                queue;
            if (next !== this.__last) {
                queue = this.__queue;
                ret = queue[next];
                queue[this.__next++] = undefined;
            }
            return ret;
        },

        /**
         * Retrieves the item at the head of the queue without removing it
         *
         * @return {*} The element at the head of the queue. Returns undefined if the queue is empty.
         */
        peek: function () {
            var next = this.__next,
                ret;
            if (next !== this.__last) {
                ret = this.__queue[next];
            }
            return ret;
        },

        /**
         * Removes all items from this queue
         */
        clear: function () {
            this.__queue.length = 0;
            this.__next = 0;
            this.__last = 0;
        },

        /**
         * Determine if this queue contains the element
         * @param {*} obj the object to find
         *
         * @return {Boolean} true if this queue contains the element
         */
        contains: function (obj) {
            return this.__queue.indexOf(obj) !== -1;
        },
        /**
         * Removes an element from this queue.
         * @param {*} obj the data to remove.
         *
         * @return {Boolean} true if the element was removed, false otherwise.
         */
        remove: function (obj) {
            var index = this.__queue.indexOf(obj), ret = false;
            if (index !== -1) {
                if (index === this.__next) {
                    this.dequeue();
                } else {
                    this.__queue.splice(index, 1);
                    this.__last--;
                }
                ret = true;
            }
            return ret;
        },

        toString: function () {
            return this.__queue.toString();
        },

        getters: {

            count: function () {
                return this.__last - this.__next;
            },

            isEmpty: function () {
                return this.__last - this.__next === 0;
            },

            values: function () {
                return this.__queue.slice(this.__next, this.__last);
            }
        }
    }
});