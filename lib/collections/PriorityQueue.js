var define = require("../define").define,
        MinHeap = require("./MinHeap"),
        base = require("../base");

module.exports = exports = define(MinHeap, {
    instance : {
        enqueue : function(priority, value) {
            return this.insert(priority, value);
        },

        dequeue : function() {
            return this.remove();
        }
    }
});