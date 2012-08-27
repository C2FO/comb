"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Heap = comb.collections.Heap;


it.describe("comb.collections.Heap", function (it) {
    var heap = new Heap();

    it.should("throw an error when calling insert and remove methods", function () {
        assert.throws(function () {
            heap.insert(1, "hello");
        })
        assert.throws(function () {
            heap.__downHeap();
        })
    });

    it.should("throw an error when using an invalid key", function () {
        assert.throws(function () {
            heap.insert("1", 2);
        })
    });


}).as(module);

