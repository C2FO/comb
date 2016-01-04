"use strict";
var define = require("../define").define,
    Heap = require("./Heap"),
    base = require("../base");

var floor = Math.floor, MinHeap;
/**
 * @class <p> Min Heap implementation, lowest value in heap is always at the root.</p>
 * </br>
 * <b>Performance</b>
 * <table>
 *     <tr><td></td><td>Best</td><td>Worst</td></tr>
 *     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Remove</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Peek</td><td>O(1)</td><td>O(1)</td></tr>
 *     <tr><td>Contains</td><td>O(n)</td><td>O(n)</td></tr>
 * <table>
 * @name MinHeap
 * @augments comb.collections.Heap
 * @memberOf comb.collections
 * @ignoreCode
 */
module.exports = exports = define(Heap, {
    instance: {

        __upHeap: function (index) {
            var heap = this.__heap;
            var node = heap[index], key = node.key, gpi = this.__getParentIndex;
            while (index >= 0) {
                var parentIndex = gpi(index), parent = heap[parentIndex];
                if (parent && parent.key > key) {
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
            var node = heap[index], key = node.key, length = heap.length, max = floor(length / 2), glci = this.__getLeftChildIndex, grci = this.__getRightChildIndex;
            while (index < max) {
                var leftIndex = glci(index),
                    rightIndex = grci(index), left = heap[leftIndex], right = heap[rightIndex], child, childIndex;
                if (rightIndex < length && right.key < left.key) {
                    childIndex = rightIndex;
                    child = right;
                } else {
                    childIndex = leftIndex;
                    child = left;
                }
                if (child.key < key) {
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

