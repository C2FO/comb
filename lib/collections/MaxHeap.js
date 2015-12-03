"use strict";
var define = require("../define").define,
    Heap = require("./Heap"),
    base = require("../base");

/**
 * @ignoreCode
 *
 * @class <p> Max Heap implementation, lowest value in heap is always at the root.</p>
 * </br>
 * <b>Performance</b>
 * <table>
 *     <tr><td></td><td>Best</td><td>Worst</td></tr>
 *     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Remove</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Peek</td><td>O(1)</td><td>O(1)</td></tr>
 *     <tr><td>Contains</td><td>O(n)</td><td>O(n)</td></tr>
 * <table>
 * @name MaxHeap
 * @augments comb.collections.Heap
 * @memberOf comb.collections
 */
exports = module.exports = define(Heap, {
    instance: {


        __upHeap: function (index) {
            var heap = this.__heap;
            var node = heap[index];
            while (index >= 0) {
                var parentIndex = this.__getParentIndex(index), parent = heap[parentIndex];
                if (parent && parent.key < node.key) {
                    heap[index] = parent;
                    index = parentIndex;
                } else {
                    break;
                }
            }
            heap[index] = node;
        },

        __downHeap: function (index) {
            var heap = this.__heap;
            var node = heap[index], length = heap.length;
            while (index < Math.floor(length / 2)) {
                var leftIndex = this.__getLeftChildIndex(index),
                    rightIndex = this.__getRightChildIndex(index), left = heap[leftIndex], right = heap[rightIndex], child, childIndex;
                if (rightIndex < length && right.key < left.key) {
                    childIndex = leftIndex;
                    child = left;
                } else {
                    childIndex = leftIndex;
                    child = heap[leftIndex];
                }
                if (child.key > node.key) {
                    heap[index] = child;
                    index = childIndex;
                } else {
                    break;
                }

            }
            heap[index] = node;
        }

    }
});
