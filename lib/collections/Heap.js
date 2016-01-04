"use strict";
var define = require("../define").define,
    Collection = require("./Collection"),
    base = require("../base");

function padding(char, numSpaces) {
    var ret = [];
    for (var i = 0; i < numSpaces; i++) {
        ret.push(char);
    }
    return ret.join("");
}

module.exports = exports = define(Collection, {
    instance: {
        /**@lends comb.collections.Heap.prototype*/
        __getParentIndex: function (index) {
            return Math.floor((index - 1) / 2);
        },

        __getLeftChildIndex: function (index) {
            return (index * 2) + 1;
        },

        __getRightChildIndex: function (index) {
            return (index * 2) + 2;
        },

        __makeNode: function (key, value) {
            return {key: key, value: value};
        },


        /**
         * Base class for Heap Implementations.
         *
         *
         * @constructs
         * @augments comb.collections.Collection
         * @memberOf comb.collections
         *
         * @property {Number} count the current number of elements.
         * @property {Array} keys the keys of all items in the heap.
         * @property {Array} values the values contained in the heap.
         * @property {Boolean} isEmpty true if the Heap is empty.
         */
        constructor: function () {
            this.__heap = [];
        },

        /**
         * Insert a key value into the key
         * @param key
         * @param value
         */
        insert: function (key, value) {
            if (!base.isString(key)) {
                var l = this.__heap.push(this.__makeNode(key, value));
                this.__upHeap(l - 1);
            } else {
                throw new TypeError("Invalid key");
            }
        },

        /**
         * Removes the root from the heap
         *
         * @returns the value of the root
         */
        remove: function () {
            var heap = this.__heap,
                l = heap.length,
                ret;
            if (l) {
                ret = heap[0];
                if (l === 1) {
                    heap.length = 0;
                } else {
                    heap[0] = heap.pop();
                    this.__downHeap(0);
                }
            }
            return ret ? ret.value : ret;
        },

        /**
         * Gets he value of the root node with out removing it.
         *
         * @returns the value of the root
         */
        peek: function () {
            var heap = this.__heap,
                l = heap.length,
                ret;
            if (l) {
                ret = heap[0];
            }
            return ret ? ret.value : ret;
        },

        /**
         * Gets the key of the root node without removing it.
         *
         * @returns the key of the root
         */
        peekKey: function () {
            var heap = this.__heap,
                l = heap.length,
                ret;
            if (l) {
                ret = heap[0];
            }
            return ret ? ret.key : ret;
        },

        /**
         * Perform the heapify operation after the an
         * item as been added to the bottom of the heap.
         *
         * @param index the index in which the new item was added
         */
        __upHeap: function (index) {
            throw new Error("NOT IMPLEMENTED");
        },

        /**
         * Heapify the heap after the root has been removed
         *
         * @param index the index of the root
         */
        __downHeap: function (index) {
            throw new Error("NOT IMPLEMENTED");
        },

        /**
         *
         * Determine if the heap contains a particular key.
         *
         * @param key key to test.
         *
         * @returns {Boolean} true if the key is contained in this heap.
         */
        containsKey: function (key) {
            var heap = this.__heap;
            for (var i = heap.length - 1; i >= 0; i--) {
                if (heap[i].key === key) {
                    return true;
                }
            }
            return false;
        },

        /**
         *
         * Determine if the heap contains a particular value.
         *
         * @param value value to test.
         *
         * @returns {Boolean} true if the value is contained in this heap.
         */
        containsValue: function (value) {
            var heap = this.__heap;
            for (var i = heap.length - 1; i >= 0; i--) {
                if (heap[i].value === value) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Empty the heap.
         */
        clear: function () {
            this.__heap.length = 0;
        },

        __printNode: function (index, level) {
            //console.log(level);
            var str = [], node = this.__heap[index];
            if (node == null || node === undefined) {
                str.push(padding('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(this.__getRightChildIndex(index), level + 1);
                str.push(padding('\t', level));
                str.push(node.key + " : " + node.value + "\n");
                console.log(str.join(""));
                this.__printNode(this.__getLeftChildIndex(index), level + 1);
            }
        },

        /**
         * Print the heap.
         */
        print: function () {
            this.__printNode(0, 0);
        },

        getters: {

            count: function () {
                return this.__heap.length;
            },

            keys: function () {
                return this.__heap.map(function (n) {
                    return n.key;
                });
            },

            values: function () {
                return this.__heap.map(function (n) {
                    return n.value;
                });
            },

            isEmpty: function () {
                return this.__heap.length === 0;
            }
        }


    }
});