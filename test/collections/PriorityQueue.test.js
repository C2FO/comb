var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        PriorityQueue = comb.collections.PriorityQueue;
var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A PriorityQueue colleciton");
suite.addBatch({
    "when using a PriorityQueue and getting its count" : {
        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(0, 'a');
            q.enqueue(1, 'b');
            q.enqueue(2, 'c');
            q.enqueue(3, 'd');
            return q;
        },

        "it should know its count" : function(q) {
            assert.equal(q.count, 4);
            q.dequeue();
            assert.equal(q.count, 3);
            q.dequeue();
            q.dequeue();
            q.dequeue();
            assert.equal(q.count, 0);
        }
    },

    "when using a PriorityQueue and getting its keys" : {
        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(0, 'a');
            q.enqueue(1, 'b');
            q.enqueue(2, 'c');
            q.enqueue(3, 'd');
            return q;
        },

        "it should return keys" : function(q) {
            var keys = q.keys;
            for (var i = 0; i < 4; i++) {
                assert.isTrue(keys.indexOf(i) != -1);
            }
        },

        "it should know if it contains a key " : function(q) {
            for (var i = 0; i < 4; i++) {
                assert.isTrue(q.containsKey(i));
            }
            assert.isFalse(q.containsKey(4));
        }
    },

    "when using a PriorityQueue and getting its values" : {
        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(0, 'a');
            q.enqueue(1, 'b');
            q.enqueue(2, 'c');
            q.enqueue(3, 'd');
            return q;
        },

        "it should return values" : function(q) {
            var vals = q.values;
            assert.isTrue(vals.indexOf("a") != -1);
            assert.isTrue(vals.indexOf("b") != -1);
            assert.isTrue(vals.indexOf("c") != -1);
            assert.isTrue(vals.indexOf("d") != -1);
        },

        "it should know if it contains a value" : function(q) {
            var vals = q.values;
            assert.isTrue(q.containsValue("a"));
            assert.isTrue(q.containsValue("b"));
            assert.isTrue(q.containsValue("c"));
            assert.isTrue(q.containsValue("d"));
            assert.isFalse(q.containsValue("e"));
        }
    },

    "when using a PriorityQueue and dequeueing items " : {
        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(0, 'a');
            q.enqueue(1, 'b');
            q.enqueue(2, 'c');
            q.enqueue(3, 'd');
            return q;
        },

        "it should know when it is empty" : function(q) {
            assert.isFalse(q.isEmpty);
            q.dequeue();
            assert.isFalse(q.isEmpty);
            q.dequeue();
            assert.isFalse(q.isEmpty);
            q.dequeue();
            assert.isFalse(q.isEmpty);
            q.dequeue();
            assert.isTrue(q.isEmpty);
        }
    },

    "when using a PriorityQueue and clearing it " : {
        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(0, 'a');
            q.enqueue(1, 'b');
            q.enqueue(2, 'c');
            q.enqueue(3, 'd');
            return q;
        },

        "it should be empty" : function(q) {
            q.clear();
            assert.isTrue(q.isEmpty);
            assert.equal(q.count, 0, 'count, should be 4');
        }
    },

    "when peeking on a PriorityQueue enqueued in order " : {
        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(0, 'a');
            q.enqueue(1, 'b');
            q.enqueue(2, 'c');
            q.enqueue(3, 'd');
            return q;
        },

        "it should return the right value" : function(q) {
            assert.equal(q.peek(), "a");
        },

        "after clearing it should be undefined" : function(q) {
            q.clear();
            assert.isUndefined(q.peek());
        }
    },

    "when peeking on a PriorityQueue enqueued out of order " : {
        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(1, 'b');
            q.enqueue(3, 'd');
            q.enqueue(0, 'a');
            q.enqueue(2, 'c');
            return q;
        },

        "it should return the right value" : function(q) {
            assert.equal(q.peek(), "a");
        }
    },

    "when removing elements from a PriorityQueue enqueued in order " : {

        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(0, 'a');
            q.enqueue(1, 'b');
            q.enqueue(2, 'c');
            q.enqueue(3, 'd');
            return q;
        },

        "they should be removed in order" : function(q) {
            assert.equal(q.dequeue(), "a");
            assert.equal(q.dequeue(), "b");
            assert.equal(q.dequeue(), "c");
            assert.equal(q.dequeue(), "d");
        }
    },

    "when removing elements from a PriorityQueue enqueued out of order " : {

        topic : function() {
            var q = new PriorityQueue();
            q.enqueue(1, 'b');
            q.enqueue(3, 'd');
            q.enqueue(0, 'a');
            q.enqueue(2, 'c');
            return q;
        },

        "they should be removed in order" : function(q) {
            assert.equal(q.dequeue(), "a");
            assert.equal(q.dequeue(), "b");
            assert.equal(q.dequeue(), "c");
            assert.equal(q.dequeue(), "d");
        }
    },

    "when peeking as enqueued " : {
        topic : new PriorityQueue(),

        "it should peek correctly " : function(q) {
            q.enqueue(3, 'd');
            assert.equal(q.peek(), 'd');
            q.enqueue(2, 'c');
            assert.equal(q.peek(), 'c');
            q.enqueue(1, 'b');
            assert.equal(q.peek(), 'b');
            q.enqueue(0, 'a');
            assert.equal(q.peek(), 'a');
            q.clear();
            q.enqueue(1, 'b');
            assert.equal(q.peek(), 'b');
            q.enqueue(3, 'd');
            assert.equal(q.peek(), 'b');
            q.enqueue(0, 'a');
            assert.equal(q.peek(), 'a');
            q.enqueue(2, 'c');
            assert.equal(q.peek(), 'a');
        }
    }

});

suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret,"callback"));
