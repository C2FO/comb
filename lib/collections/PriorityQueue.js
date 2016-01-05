"use strict";
var define = require("../define").define,
    MinHeap = require("./MinHeap"),
    base = require("../base"),
    PriorityQueue;

/**
 * @class PriorityQueue Implementation where the value with the highest priority moves to the front
 *        Priority starts at 0, and the greatest value being the lowest priority;
 * @name PriorityQueue
 * @augments comb.collections.MinHeap
 * @memberOf comb.collections
 * @ignoreCode
 */
PriorityQueue = define(MinHeap, {
    instance: {
        /**@lends comb.collections.PriorityQueue.prototype*/

        /**
         * Adds the value with the specified priority to the queue
         *
         * @param {Number} priority the priority of the item
         *      </br>
         *      <b>0 = Highest, n = lowest</b>
         * @param value
         */
        enqueue: function (priority, value) {
            return this.insert(priority, value);
        },

        /**
         * Removes the item with the highest priority from the queue
         *
         * @returns the value of the item
         */
        dequeue: function () {
            return this.remove();
        }
    }
});

module.exports = exports = PriorityQueue;