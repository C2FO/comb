var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        MaxHeap = comb.collections.MaxHeap;

var suite = vows.describe("A MaxHeap colleciton");
suite.addBatch({
    "when using a heap and getting its count" : {
        topic : function() {
            var h = new MaxHeap();
            h.insert(0, 'a');
            h.insert(1, 'b');
            h.insert(2, 'c');
            h.insert(3, 'd');
            return h;
        },

        "it should know its count" : function(h) {
            assert.equal(h.count, 4);
            h.remove();
            assert.equal(h.count, 3);
            h.remove();
            h.remove();
            h.remove();
            assert.equal(h.count, 0);
        }
    },

    "when using a heap and getting its keys" : {
        topic : function() {
            var h = new MaxHeap();
            h.insert(0, 'a');
            h.insert(1, 'b');
            h.insert(2, 'c');
            h.insert(3, 'd');
            return h;
        },

        "it should return keys" : function(h) {
            var keys = h.keys;
            for (var i = 0; i < 4; i++) {
                assert.isTrue(keys.indexOf(i) != -1);
            }
        },

        "it should know if it contains a key " : function(h) {
            for (var i = 0; i < 4; i++) {
                assert.isTrue(h.containsKey(i));
            }
            assert.isFalse(h.containsKey(4));
        }
    },

    "when using a heap and getting its values" : {
        topic : function() {
            var h = new MaxHeap();
            h.insert(0, 'a');
            h.insert(1, 'b');
            h.insert(2, 'c');
            h.insert(3, 'd');
            return h;
        },

        "it should return values" : function(h) {
            var vals = h.values;
            assert.isTrue(vals.indexOf("a") != -1);
            assert.isTrue(vals.indexOf("b") != -1);
            assert.isTrue(vals.indexOf("c") != -1);
            assert.isTrue(vals.indexOf("d") != -1);
        },

        "it should know if it contains a value" : function(h) {
            var vals = h.values;
            assert.isTrue(h.containsValue("a"));
            assert.isTrue(h.containsValue("b"));
            assert.isTrue(h.containsValue("c"));
            assert.isTrue(h.containsValue("d"));
            assert.isFalse(h.containsValue("e"));
        }
    },

    "when using a heap and removing items " : {
        topic : function() {
            var h = new MaxHeap();
            h.insert(0, 'a');
            h.insert(1, 'b');
            h.insert(2, 'c');
            h.insert(3, 'd');
            return h;
        },

        "it should know when it is empty" : function(h) {
            assert.isFalse(h.isEmpty);
            h.remove();
            assert.isFalse(h.isEmpty);
            h.remove();
            assert.isFalse(h.isEmpty);
            h.remove();
            assert.isFalse(h.isEmpty);
            h.remove();
            assert.isTrue(h.isEmpty);
        }
    },

    "when using a heap and clearing it " : {
        topic : function() {
            var h = new MaxHeap();
            h.insert(0, 'a');
            h.insert(1, 'b');
            h.insert(2, 'c');
            h.insert(3, 'd');
            return h;
        },

        "it should be empty" : function(h) {
            h.clear();
            assert.isTrue(h.isEmpty);
            assert.equal(h.count, 0, 'count, should be 4');
        }
    },

    "when peeking on a heap inserted in order " : {
        topic : function() {
            var h = new MaxHeap();
            h.insert(0, 'a');
            h.insert(1, 'b');
            h.insert(2, 'c');
            h.insert(3, 'd');
            return h;
        },

        "it should return the right value" : function(h) {
            assert.equal(h.peek(), "d");
        },

        "after clearing it should be undefined" : function(h) {
            h.clear();
            assert.isUndefined(h.peek());
        }
    },

    "when peeking on a heap inserted out of order " : {
        topic : function() {
            var h = new MaxHeap();
            h.insert(1, 'b');
            h.insert(3, 'd');
            h.insert(0, 'a');
            h.insert(2, 'c');
            return h;
        },

        "it should return the right value" : function(h) {
            assert.equal(h.peek(), "d");
        }
    },

    "when removing elements from a min heap inserted in order " : {

        topic : function() {
            var h = new MaxHeap();
            h.insert(0, 'a');
            h.insert(1, 'b');
            h.insert(2, 'c');
            h.insert(3, 'd');
            return h;
        },

        "they should be removed in order" : function(h) {
            assert.equal(h.remove(), "d");
            assert.equal(h.remove(), "c");
            assert.equal(h.remove(), "b");
            assert.equal(h.remove(), "a");
        }
    },

    "when removing elements from a min heap inserted out of order " : {

        topic : function() {
            var h = new MaxHeap();
            h.insert(1, 'b');
            h.insert(3, 'd');
            h.insert(0, 'a');
            h.insert(2, 'c');
            return h;
        },

        "they should be removed in order" : function(h) {
            assert.equal(h.remove(), "d");
            assert.equal(h.remove(), "c");
            assert.equal(h.remove(), "b");
            assert.equal(h.remove(), "a");
        }
    },

    "when peeking as inserted " : {
        topic : new MaxHeap(),

        "it should peek correctly " : function(h) {
            h.insert(3, 'c');
            assert.equal(h.peek(), 'c');
            h.insert(2, 'b');
            assert.equal(h.peek(), 'c');
            h.insert(1, 'd');
            assert.equal(h.peek(), 'c');
            h.insert(0, 'a');
            assert.equal(h.peek(), 'c');
            h.clear();
            h.insert(1, 'a');
            assert.equal(h.peek(), 'a');
            h.insert(3, 'b');
            assert.equal(h.peek(), 'b');
            h.insert(0, 'c');
            assert.equal(h.peek(), 'b');
            h.insert(2, 'd');
            assert.equal(h.peek(), 'b');
        }
    }

});

suite.run({reporter : require("vows/reporters/spec")});
