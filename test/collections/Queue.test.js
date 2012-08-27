"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Queue = comb.collections.Queue;


it.describe("comb.collections.Queue", function (it) {
    var queue = new Queue();

    it.should("enqueue", function () {
        queue.enqueue("test");
        assert.isTrue(queue.contains("test"));
        assert.equal("test", queue.toString());
    });
    it.should("dequeue", function () {
        assert.equal(queue.dequeue(), "test");
        assert.isFalse(queue.contains("test"));
    });
    it.should("peek", function () {
        queue.enqueue("test");
        assert.equal(queue.peek(), "test");
        assert.isTrue(queue.contains("test"));
    });
    it.should("know if it is empty", function () {
        assert.isFalse(queue.isEmpty);
        queue.dequeue();
        assert.isTrue(queue.isEmpty);
    });
    it.should("know its element count", function () {
        queue.enqueue("test");
        queue.enqueue("test1");
        queue.enqueue("test2");
        queue.enqueue("test3");
        queue.enqueue("test4");
        queue.enqueue("test5");
        queue.enqueue("test6");
        assert.equal(queue.count, 7);
        assert.equal(",,test,test1,test2,test3,test4,test5,test6", queue.toString());
    });
    it.should("return all values", function () {
        var vals = ["test", "test1", "test2", "test3", "test4", "test5", "test6"];
        assert.isTrue(queue.values.every(function (v, i) {
            return v == vals[i]
        }));
    });

    it.should("remove values", function () {
        queue.remove("test6");
        queue.remove("test5");
        queue.remove("test4");
        queue.remove("test3");
        queue.remove("test2");
        queue.remove("test1");
        queue.remove("test");
        assert.isTrue(queue.isEmpty);
    });

    it.should("clear all elements", function () {
        queue.enqueue("test");
        queue.enqueue("test1");
        queue.enqueue("test2");
        queue.enqueue("test3");
        queue.enqueue("test4");
        queue.enqueue("test5");
        queue.enqueue("test6");
        assert.isFalse(queue.isEmpty);
        assert.equal(",,,test,test1,test2,test3,test4,test5,test6", queue.toString());
        queue.clear();
        assert.isTrue(queue.isEmpty);
        assert.equal(queue.count, 0);
    });
    it.should("return undefined if empty and dequeue is called", function () {
        assert.isUndefined(queue.dequeue());
    });


}).as(module);
