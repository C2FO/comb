var define = require("../define").define,
        Heap = require("./Heap"),
        base = require("../base");

var padding = function(char, numSpaces) {
    var ret = [];
    for (var i = 0; i < numSpaces; i++)
        ret.push(char);
    return ret.join("");
};

module.exports = exports = define(Heap, {
    instance : {


        __upHeap : function(index) {
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

        __downHeap : function(index) {
            var heap = this.__heap;
            var node = heap[index], length = heap.length;
            while (index < Math.floor(length / 2)) {
                var leftIndex = this.__getLeftChildIndex(index),
                        rightIndex = this.__getRightChildIndex(index), left = heap[leftIndex], right = heap[rightIndex], child, childIndex;
                if (rightIndex < length && right.key > left.key) {
                    childIndex = rightIndex;
                    child = right
                } else {
                    childIndex = leftIndex;
                    child = heap[leftIndex];
                }
                if(child.key > node.key){
                    heap[index] = child;
                    index = childIndex;
                }else{
                    break;
                }

            }
            heap[index] = node;
        }

    }
});