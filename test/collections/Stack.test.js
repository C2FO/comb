"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Stack = comb.collections.Stack;

it.describe("comb.collections.Stack", function (it) {
    var stack = new Stack();

    it.should("push", function () {
        stack.push("test");
        assert.isTrue(stack.contains("test"));
        assert.equal("test", stack.toString());
    });

    it.should("pop", function () {
        assert.equal(stack.pop(), "test");
        assert.isFalse(stack.contains("test"));
    });

    it.should("peek", function () {
        stack.push("test");
        assert.equal(stack.peek(), "test");
        assert.isTrue(stack.contains("test"));
    });

    it.should("know if it is empty", function () {
        assert.isFalse(stack.isEmpty);
        stack.pop();
        assert.isTrue(stack.isEmpty);
    });

    it.should("know its element count", function () {
        stack.push("test");
        stack.push("test1");
        stack.push("test2");
        stack.push("test3");
        stack.push("test4");
        stack.push("test5");
        stack.push("test6");
        assert.equal(stack.count, 7);
        assert.equal("test,test1,test2,test3,test4,test5,test6", stack.toString());
    });

    it.should("pop values", function () {
        assert.equal(stack.pop(), "test6");
        assert.equal(stack.pop(), "test5");
        assert.equal(stack.pop(), "test4");
        assert.equal(stack.pop(), "test3");
        assert.equal(stack.pop(), "test2");
        assert.equal(stack.pop(), "test1");
        assert.equal(stack.pop(), "test");
        assert.equal(stack.count, 0);
    });

    it.should("return all values", function () {
        stack.push("test");
        stack.push("test1");
        stack.push("test2");
        stack.push("test3");
        stack.push("test4");
        stack.push("test5");
        stack.push("test6");
        var vals = ["test", "test1", "test2", "test3", "test4", "test5", "test6"].reverse();
        assert.isTrue(stack.values.every(function (v, i) {
            return v == vals[i]
        }));
        assert.equal("test,test1,test2,test3,test4,test5,test6", stack.toString());
    });

    it.should("remove values", function () {
        stack.remove("test");
        stack.remove("test1");
        stack.remove("test2");
        stack.remove("test3");
        stack.remove("test4");
        stack.remove("test5");
        stack.remove("test6");
        assert.isTrue(stack.isEmpty);
    });

    it.should("clear all elements", function () {
        stack.push("test");
        stack.push("test1");
        stack.push("test2");
        stack.push("test3");
        stack.push("test4");
        stack.push("test5");
        stack.push("test6");
        assert.isFalse(stack.isEmpty);
        stack.clear();
        assert.isTrue(stack.isEmpty);
        assert.equal(stack.count, 0);
    });

    it.should("return undefined if empty and dequeue is called", function () {
        assert.isUndefined(stack.pop());
    });

});
