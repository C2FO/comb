"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("../../index"),
    PriorityQueue = comb.collections.PriorityQueue;

it.describe("comb.collections.PriorityQueue", function (it) {

    it.should("know its count", function () {
        var q = new PriorityQueue();
        q.enqueue(0, 'a');
        q.enqueue(1, 'b');
        q.enqueue(2, 'c');
        q.enqueue(3, 'd');
        assert.equal(q.count, 4);
        q.dequeue();
        assert.equal(q.count, 3);
        q.dequeue();
        q.dequeue();
        q.dequeue();
        assert.equal(q.count, 0);
    });

    it.should("know its keys", function () {
        var q = new PriorityQueue();
        q.enqueue(0, 'a');
        q.enqueue(1, 'b');
        q.enqueue(2, 'c');
        q.enqueue(3, 'd');

        var keys = q.keys;
        for (var i = 0; i < 4; i++) {
            assert.isTrue(keys.indexOf(i) !== -1);
        }
        for (i = 0; i < 4; i++) {
            assert.isTrue(q.containsKey(i));
        }
        assert.isFalse(q.containsKey(4));

    });

    it.should("know its values", function () {
        var q = new PriorityQueue();
        q.enqueue(0, 'a');
        q.enqueue(1, 'b');
        q.enqueue(2, 'c');
        q.enqueue(3, 'd');
        var vals = q.values;
        assert.isTrue(vals.indexOf("a") !== -1);
        assert.isTrue(vals.indexOf("b") !== -1);
        assert.isTrue(vals.indexOf("c") !== -1);
        assert.isTrue(vals.indexOf("d") !== -1);
        assert.isTrue(q.containsValue("a"));
        assert.isTrue(q.containsValue("b"));
        assert.isTrue(q.containsValue("c"));
        assert.isTrue(q.containsValue("d"));
        assert.isFalse(q.containsValue("e"));
    });

    it.should("dequeue items ", function () {
        var q = new PriorityQueue();
        q.enqueue(0, 'a');
        q.enqueue(1, 'b');
        q.enqueue(2, 'c');
        q.enqueue(3, 'd');
        assert.isFalse(q.isEmpty);
        q.dequeue();
        assert.isFalse(q.isEmpty);
        q.dequeue();
        assert.isFalse(q.isEmpty);
        q.dequeue();
        assert.isFalse(q.isEmpty);
        q.dequeue();
        assert.isTrue(q.isEmpty);
    });

    it.should("clear its items", function () {

        var q = new PriorityQueue();
        q.enqueue(0, 'a');
        q.enqueue(1, 'b');
        q.enqueue(2, 'c');
        q.enqueue(3, 'd');
        q.clear();
        assert.isTrue(q.isEmpty);
        assert.equal(q.count, 0, 'count, should be 4');
    });

    it.should("peek items in order ", function () {
        var q = new PriorityQueue();
        q.enqueue(0, 'a');
        q.enqueue(1, 'b');
        q.enqueue(2, 'c');
        q.enqueue(3, 'd');
        assert.equal(q.peek(), "a");
        q.clear();
        assert.isUndefined(q.peek());
        q = new PriorityQueue();
        q.enqueue(1, 'b');
        q.enqueue(3, 'd');
        q.enqueue(0, 'a');
        q.enqueue(2, 'c');
        assert.equal(q.peek(), "a");
    });

    it.should("dequeue in order", function () {
        var q = new PriorityQueue();
        q.enqueue(0, 'a');
        q.enqueue(1, 'b');
        q.enqueue(2, 'c');
        q.enqueue(3, 'd');
        assert.equal(q.dequeue(), "a");
        assert.equal(q.dequeue(), "b");
        assert.equal(q.dequeue(), "c");
        assert.equal(q.dequeue(), "d");
        q = new PriorityQueue();
        q.enqueue(1, 'b');
        q.enqueue(3, 'd');
        q.enqueue(0, 'a');
        q.enqueue(2, 'c');
        assert.equal(q.dequeue(), "a");
        assert.equal(q.dequeue(), "b");
        assert.equal(q.dequeue(), "c");
        assert.equal(q.dequeue(), "d");
    });

    it.should("peek as enqueued properly", function () {
        var q = new PriorityQueue();
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
    });

}).as(module);


