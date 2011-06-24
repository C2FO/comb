var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        Stack = comb.collections.Stack;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Stack colleciton");
suite.addBatch({
            "when using a Stack " : {
                topic : new Stack(),

                "it should push" : function(stack) {
                    stack.push("test");
                    assert.isTrue(stack.contains("test"));
                },

                "it should pop" : function(stack) {
                    assert.equal(stack.pop(), "test");
                    assert.isFalse(stack.contains("test"));
                },

                "it should peek" : function(stack) {
                    stack.push("test");
                    assert.equal(stack.peek(), "test");
                    assert.isTrue(stack.contains("test"));
                },

                "it should know if it is empty" : function(stack) {
                    assert.isFalse(stack.isEmpty);
                    stack.pop();
                    assert.isTrue(stack.isEmpty);
                },

                "it should know its element count" : function(stack) {
                    stack.push("test");
                    stack.push("test1");
                    stack.push("test2");
                    stack.push("test3");
                    stack.push("test4");
                    stack.push("test5");
                    stack.push("test6");
                    assert.equal(stack.count, 7);
                },

                "it pop values" : function(stack) {
                    assert.equal(stack.pop(), "test6");
                    assert.equal(stack.pop(), "test5");
                    assert.equal(stack.pop(), "test4");
                    assert.equal(stack.pop(), "test3");
                    assert.equal(stack.pop(), "test2");
                    assert.equal(stack.pop(), "test1");
                    assert.equal(stack.pop(), "test");
                    assert.equal(stack.count, 0);
                },

                "it should return all values" : function(stack) {
                    stack.push("test");
                    stack.push("test1");
                    stack.push("test2");
                    stack.push("test3");
                    stack.push("test4");
                    stack.push("test5");
                    stack.push("test6");
                    var vals = ["test", "test1", "test2", "test3", "test4", "test5", "test6"].reverse();
                    assert.isTrue(stack.values.every(function(v, i) {
                        return v == vals[i]
                    }));
                },

                "it should remove values" : function(stack) {
                    stack.remove("test");
                    stack.remove("test1");
                    stack.remove("test2");
                    stack.remove("test3");
                    stack.remove("test4");
                    stack.remove("test5");
                    stack.remove("test6");
                    assert.isTrue(stack.isEmpty);
                },

                "it clear all elements" : function(stack) {
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
                },

                "it should return undefined if empty and dequeue is called" : function(stack) {
                    assert.isUndefined(stack.pop());
                }
            }
        });
suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret, "callback"));