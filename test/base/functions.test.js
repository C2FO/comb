"use strict";
var vows = require('vows'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch,
    Broadcaster = comb;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Function utilities");

suite.addBatch({

    "comb ":{
        topic:comb,

        "should test if something is a function":function (topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.isFunction(function () {
            }));
            assert.isFalse(topic.isFunction("hello"));
            assert.isFalse(topic.isFunction({}));
            assert.isFalse(topic.isFunction(new Date()));
            assert.isFalse(topic.isFunction(true));

        }
    },

    "when hitching a function ":{
        topic:function () {
            return comb.hitch({test:true}, function () {
                assert.isTrue(this.test);
            });
        },

        "it should be in the right scope":function (topic) {
            topic();
        }
    },

    "when hitching an invalid function ":{
        topic:comb,

        "it should throw an error":function (topic) {
            assert.throws(function () {
                topic.hitch(topic, "someFunction");
            })
        }
    },

    "when hitchIgnoring a function ":{
        topic:function () {
            return comb.hitchIgnore({test:true}, function () {
                var args = comb.argsToArray(arguments);
                assert.lengthOf(args, 1);
                assert.equal(args[0], "hello");
            }, "hello");
        },

        "it should be in the right scope":function (topic) {
            topic("world");
        }
    },

    "when hitchIgnoring an invalid function ":{
        topic:comb,

        "it should throw an error":function (topic) {
            assert.throws(function () {
                topic.hitchIgnore(topic, "someFunction");
            })
        }
    },

    "when binding a function ":{
        topic:function () {
            return comb.bind({test:true}, function () {
                assert.isTrue(this.test);
            });
        },

        "it should be in the right scope":function (topic) {
            topic();
        }
    },

    "when binding an invalid function ":{
        topic:comb,

        "it should throw an error":function (topic) {
            assert.throws(function () {
                topic.bind(topic, "someFunction");
            })
        }
    },

    "when bindIgnoring a function ":{
        topic:function () {
            return comb.bindIgnore({test:true}, function () {
                var args = comb.argsToArray(arguments);
                assert.lengthOf(args, 1);
                assert.equal(args[0], "hello");
            }, "hello");
        },

        "it should be in the right scope":function (topic) {
            topic("world");
        }
    },

    "when bindIgnoring an invalid function ":{
        topic:comb,

        "it should throw an error":function (topic) {
            assert.throws(function () {
                topic.bindIgnore(topic, "someFunction");
            })
        }
    },


    "when hitching a function with extra parameters ":{
        topic:function () {
            return comb.hitch({test:true}, function (testStr) {
                assert.isTrue(this.test);
                assert.equal(testStr, "HELLO");
            }, "HELLO");
        },

        "it should have that extra param first":function (topic) {
            topic("test");
        }
    },

    "when partial hitch ":{
        topic:function () {
            return comb.partial(function () {
                assert.isUndefined(this.test);
            });
        },

        "it should be in the right scope":function (topic) {
            topic();
        }
    },

    "when partial hitch with an invalid function":{
        topic:comb,

        "it should throw an error":function (topic) {
            assert.throws(function () {
                topic.partial("invalid");
            })
        }
    },

    "when partially hitching a function with extra parameters ":{
        topic:function () {
            return comb.partial(function (testStr) {
                assert.isUndefined(this.test);
                assert.equal(testStr, "HELLO");
            }, "HELLO");
        },

        "it should have that extra param first":function (topic) {
            topic("test");
        }
    },

    "when currying a function ":{
        topic:function () {
            var curried = comb.curry(4, comb.hitch(this, "callback", null));
            curried("a")("b")("c")("d");
        },

        "a,b,c,d, should be passed back":function (err, a, b, c, d) {
            assert.equal(a, "a");
            assert.equal(b, "b");
            assert.equal(c, "c");
            assert.equal(d, "d");
        }
    },

    "when currying a with a scope ":{
        topic:function () {
            var curried = comb.curry(4, function (a, b, c, d) {
                this.callback(null, a, b, c, d);
            }, this);
            curried("a")("b")("c")("d");
        },

        "a,b,c,d, should be passed back":function (err, a, b, c, d) {
            assert.equal(a, "a");
            assert.equal(b, "b");
            assert.equal(c, "c");
            assert.equal(d, "d");
        }
    }
});

suite.run({reporter:vows.reporter.spec}, comb.hitch(ret, "callback"));

