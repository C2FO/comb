"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    MinHeap = comb.collections.MinHeap;

it.describe("comb.collections.MinHeap", function (it) {

    it.should("know its count", function () {
        var h = new MinHeap();
        h.insert(0, 'a');
        h.insert(1, 'b');
        h.insert(2, 'c');
        h.insert(3, 'd');
        assert.equal(h.count, 4);
        h.remove();
        assert.equal(h.count, 3);
        h.remove();
        h.remove();
        h.remove();
        assert.equal(h.count, 0);
    });

    it.should("know its keys", function () {
        var h = new MinHeap();
        h.insert(0, 'a');
        h.insert(1, 'b');
        h.insert(2, 'c');
        h.insert(3, 'd');
        var keys = h.keys;
        for (var i = 0; i < 4; i++) {
            assert.isTrue(keys.indexOf(i) != -1);
        }
        for (var i = 0; i < 4; i++) {
            assert.isTrue(h.containsKey(i));
        }
        assert.isFalse(h.containsKey(4));
    });

    it.should("know its values", function () {
        var h = new MinHeap();
        h.insert(0, 'a');
        h.insert(1, 'b');
        h.insert(2, 'c');
        h.insert(3, 'd');
        var vals = h.values;
        assert.isTrue(vals.indexOf("a") != -1);
        assert.isTrue(vals.indexOf("b") != -1);
        assert.isTrue(vals.indexOf("c") != -1);
        assert.isTrue(vals.indexOf("d") != -1);
        assert.isTrue(h.containsValue("a"));
        assert.isTrue(h.containsValue("b"));
        assert.isTrue(h.containsValue("c"));
        assert.isTrue(h.containsValue("d"));
        assert.isFalse(h.containsValue("e"));
    });

    it.should("remove items ", function () {
        var h = new MinHeap();
        h.insert(0, 'a');
        h.insert(1, 'b');
        h.insert(2, 'c');
        h.insert(3, 'd');
        assert.isFalse(h.isEmpty);
        h.remove();
        assert.isFalse(h.isEmpty);
        h.remove();
        assert.isFalse(h.isEmpty);
        h.remove();
        assert.isFalse(h.isEmpty);
        h.remove();
        assert.isTrue(h.isEmpty);
    });

    it.should("clear all values", function () {
        var h = new MinHeap();
        h.insert(0, 'a');
        h.insert(1, 'b');
        h.insert(2, 'c');
        h.insert(3, 'd');
        h.clear();
        assert.isTrue(h.isEmpty);
        assert.equal(h.count, 0, 'count, should be 4');
    });

    it.should("peek in order ", function () {
        var h = new MinHeap();
        h.insert(0, 'a');
        h.insert(1, 'b');
        h.insert(2, 'c');
        h.insert(3, 'd');
        assert.equal(h.peekKey(), 0);
        assert.equal(h.peek(), "a");
        h.clear();
        assert.isUndefined(h.peek());
        assert.isUndefined(h.peekKey());
        h = new MinHeap();
        h.insert(1, 'b');
        h.insert(3, 'd');
        h.insert(0, 'a');
        h.insert(2, 'c');
        assert.equal(h.peekKey(), 0);
        assert.equal(h.peek(), "a");

    });

    it.should("remove elements in order", function () {
        var h = new MinHeap();
        h.insert(0, 'a');
        h.insert(1, 'b');
        h.insert(2, 'c');
        h.insert(3, 'd');
        assert.equal(h.remove(), "a");
        assert.equal(h.remove(), "b");
        assert.equal(h.remove(), "c");
        assert.equal(h.remove(), "d");
        h = new MinHeap();
        h.insert(1, 'b');
        h.insert(3, 'd');
        h.insert(0, 'a');
        h.insert(2, 'c');
        assert.equal(h.remove(), "a");
        assert.equal(h.remove(), "b");
        assert.equal(h.remove(), "c");
        assert.equal(h.remove(), "d");
    });


    it.should("peek as items are inserted ", function () {
        var h = new MinHeap();
        h.insert(3, 'd');
        assert.equal(h.peek(), 'd');
        h.insert(2, 'c');
        assert.equal(h.peek(), 'c');
        h.insert(1, 'b');
        assert.equal(h.peek(), 'b');
        h.insert(0, 'a');
        assert.equal(h.peek(), 'a');
        h.clear();
        h.insert(1, 'b');
        assert.equal(h.peek(), 'b');
        h.insert(3, 'd');
        assert.equal(h.peek(), 'b');
        h.insert(0, 'a');
        assert.equal(h.peek(), 'a');
        h.insert(2, 'c');
        assert.equal(h.peek(), 'a');
    });


});

