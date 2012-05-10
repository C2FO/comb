"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch,
    Broadcaster = comb;


it.describe("comb/base/functions.js", function (it) {


    it.should("test if something is a function", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isFunction(function () {
        }));
        assert.isFalse(comb.isFunction("hello"));
        assert.isFalse(comb.isFunction({}));
        assert.isFalse(comb.isFunction(new Date()));
        assert.isFalse(comb.isFunction(true));

    });

    it.describe("#hitch", function (it) {
        it.should("execute in the right scope", function (next) {
            var c = comb.hitch({test:true}, function () {
                assert.isTrue(this.test);
                next();
            });
            c();
        });

        it.should("curry arguments", function (next) {
            var c = comb.hitch({test:true}, function (testStr, testStr2) {
                assert.isTrue(this.test);
                assert.equal(testStr, "HELLO");
                assert.equal(testStr2, "test");
                next();
            }, "HELLO");
            c("test");
        })

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.hitch(comb, "someFunction");
            })
        });


    });

    it.describe("#hitchIgnore", function (it) {
        it.should("execute in the right scope ignoring extra arguments", function (next) {
            var c = comb.hitchIgnore({test:true}, function () {
                var args = comb.argsToArray(arguments);
                assert.lengthOf(args, 1);
                assert.equal(args[0], "hello");
                next();
            }, "hello");
            c("world");
        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.hitchIgnore(comb, "someFunction");
            })
        });
    });

    it.describe("#bind", function (it) {
        it.should("execute in the right scope", function (next) {
            var c = comb.bind({test:true}, function () {
                assert.isTrue(this.test);
                next();
            });
            c();
        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.bind(comb, "someFunction");
            })
        });
    });

    it.describe("#bindIgnore", function (it) {
        it.should("execute in the right scope ignoring extra arguments", function (next) {
            var c = comb.bindIgnore({test:true}, function () {
                var args = comb.argsToArray(arguments);
                assert.lengthOf(args, 1);
                assert.equal(args[0], "hello");
                next();
            }, "hello");
            c("world");
        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.bindIgnore(comb, "someFunction");
            })
        });
    });

    it.describe("#partial", function (it) {
        it.should("not change the execution scope", function () {
            var c = comb.partial(function (test) {
                assert[test ? "isTrue" : "isUndefined"](this.test);
            });
            c();
            c.call({test:true}, true);
        });

        it.should("curry extra parameters", function () {
            var c = comb.partial(function (hello, world) {
                assert.equal(hello, "hello");
                assert.equal(world, "world");
            }, "hello");
            c("world");
        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.partial(comb, "someFunction");
            })
        });
    });

    it.describe("#curry", function (it) {
        it.should("force invocation for the specified number of times", function () {
            var curried = comb.curry(4, function (a, b, c, d) {
                assert.equal(a, "a");
                assert.equal(b, "b");
                assert.equal(c, "c");
                assert.equal(d, "d");
            });
            curried("a")("b")("c")("d");
        });

        it.should("accecpt an execution scope", function () {
            var curried = comb.curry(4, function (a, b, c, d) {
                assert.isTrue(this.test);
                assert.equal(a, "a");
                assert.equal(b, "b");
                assert.equal(c, "c");
                assert.equal(d, "d");
            }, {test:true});
            curried("a")("b")("c")("d");
        });
    });
     ;
});


