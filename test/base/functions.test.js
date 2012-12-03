"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch,
    Broadcaster = comb;


it.describe("comb/base/functions.js",function (it) {


    it.should("test if something is a function", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isFunction(function () {
        }));
        assert.isTrue(comb(function () {
        }).isFunction());
        assert.isFalse(comb.isFunction("hello"));
        assert.isFalse(comb.isFunction({}));
        assert.isFalse(comb.isFunction(new Date()));
        assert.isFalse(comb.isFunction(true));

    });

    it.describe("#hitch", function (it) {
        it.should("execute in the right scope", function () {
            var a = comb.hitch({test: true}, function () {
                assert.isTrue(this.test);
            });
            a();
            var b = comb(function () {
                assert.isTrue(this.test);
            }).hitch({test: true});
            b();

            var c = comb({test: true}).hitch(function () {
                assert.isTrue(this.test);
            });
            c();
        });

        it.should("curry arguments", function () {
            var func = comb(function (testStr, testStr2) {
                assert.isTrue(this.test);
                assert.equal(testStr, "HELLO");
                assert.equal(testStr2, "test");
            });
            var obj = comb({test: true});
            comb.hitch(obj, func, "HELLO")("test");
            func.hitch(obj, "HELLO")("test");
            obj.hitch(func, "HELLO")("test");
        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.hitch(comb, "someFunction");
            });

            assert.throws(function () {
                comb.hitch(comb, new Date());
            });
        });

        it.should("work with non function properties also", function () {
            var val = comb([]),
                accessor1 = comb.hitch(val, "length"),
                accessor2 = comb(val).hitch("length"),
                accessor3 = comb("length").hitch(val);
            val.push(1);
            assert.equal(accessor1(), 1);

            val.push(3);
            assert.equal(accessor2(), 2);

            val.push(4);
            assert.equal(accessor3(), 3);

        });


    });

    it.describe("#hitchIgnore", function (it) {
        it.should("execute in the right scope ignoring extra arguments", function () {
            var func = comb(function () {
                    var args = comb.argsToArray(arguments);
                    assert.lengthOf(args, 1);
                    assert.equal(args[0], "hello");
                }),
                obj = comb({test: true});

            comb.hitchIgnore(obj, func, "hello")("world");
            func.hitchIgnore(obj, "hello")("world");
            obj.hitchIgnore(func, "hello")("world");
        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.hitchIgnore(comb, "someFunction");
            });

            assert.throws(function () {
                comb.hitchIgnore(comb, new Date());
            });
        });

        it.should("work with non function properties also", function () {
            var val = comb([]),
                prop = comb("length"),
                accessor1 = comb.hitchIgnore(val, "length"),
                accessor2 = val.hitchIgnore("length"),
                accessor3 = prop.hitchIgnore(val);
            val.push(1);
            assert.equal(accessor1(), 1);
            val.push(3);
            assert.equal(accessor2(), 2);
            val.push(4);
            assert.equal(accessor3(), 3);

        });
    });

    it.describe("#bind", function (it) {
        it.should("execute in the right scope", function () {
            var obj = comb({test: true}),
                func = comb(function () {
                    assert.isTrue(this.test);
                });
            comb.bind(obj, func)();
            obj.bind(func)();
            func.bind(obj)();
        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.bind(comb, "someFunction");
            });
        });
    });

    it.describe("#bindIgnore", function (it) {
        it.should("execute in the right scope ignoring extra arguments", function () {
            var obj = comb({test: true}),
                func = comb(function () {
                    var args = comb.argsToArray(arguments);
                    assert.lengthOf(args, 1);
                    assert.equal(args[0], "hello");
                });
            comb.bindIgnore(obj, func, "hello")();
            obj.bindIgnore(func, "hello")();
            func.bindIgnore(obj, "hello")();

        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.bindIgnore(comb, "someFunction");
            });
        });
    });

    it.describe("#hitchAll",function (it) {

        var obj;
        it.beforeEach(function () {
            obj = {
                a: "a",
                b: "b",
                c: "c",
                aFunc: function () {
                    return this.a;
                },
                bFunc: function () {
                    return this.b;
                },
                cFunc: function () {
                    return this.c;
                }
            };
        });

        it.should("hitch all functions in the object", function () {
            var newScope = {};
            comb.bindAll(obj);
            assert.equal(obj.aFunc.call(newScope), "a");
            assert.equal(obj.bFunc.call(newScope), "b");
            assert.equal(obj.cFunc.call(newScope), "c");

        });

        it.should("hitch only functions specified in an array", function () {
            var newScope = {};
            comb.bindAll(obj, ["aFunc"]);
            assert.equal(obj.aFunc.call(newScope), "a");
            assert.isUndefined(obj.bFunc.call(newScope));
            assert.isUndefined(obj.cFunc.call(newScope));
        });

        it.should("hitch only functions specified as the rest of the arguments", function () {
            var newScope = {};
            comb.bindAll(obj, "aFunc", "bFunc");
            assert.equal(obj.aFunc.call(newScope), "a");
            assert.equal(obj.bFunc.call(newScope), "b");
            assert.isUndefined(obj.cFunc.call(newScope));
        });

    });


    it.describe("#partial", function (it) {
        it.should("not change the execution scope", function () {
            var func = comb(function (test) {
                assert[test ? "isTrue" : "isUndefined"](this.test);
            });
            var c = comb.partial(func);
            c();
            func.partial()();
            c.call({test: true}, true);
            func.call({test: true}, true);
        });

        it.should("should work with strings", function () {
            var str = comb("test2");
            var c = comb.partial("test"), c2 = comb.partial("test2"), c3 = str.partial();
            assert.equal(c.call({test: true}), true);
            assert.equal(c2.call({
                test2: function () {
                    return true;
                }
            }), true);
            assert.equal(c3.call({
                test2: function () {
                    return true;
                }
            }), true);

        });

        it.should("curry extra parameters", function () {
            var c = comb.partial(function (hello, world) {
                assert.equal(hello, "hello");
                assert.equal(world, "world");
            }, "hello");
            c("world");

            comb("test2").partial("test").call({test: function (val1, val2) {
                assert.equal(val1, "test");
                assert.equal(val2, "test2");
            }}, "test2");

        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.partial({});
            });

            assert.throws(function () {
                comb.partial(1);
            });
        });
    });

    it.describe("#applyFirst", function (it) {
        it.should("execute in the right scope", function () {
            var func = comb(function () {
                assert.isTrue(this.test);
            });
            comb.applyFirst(func)({test: true});
            func.applyFirst()({test: true});
        });

        it.should("curry arguments", function () {
            var func = comb(function (testStr, testStr2) {
                assert.isTrue(this.test);
                assert.equal(testStr, "HELLO");
                assert.equal(testStr2, "test");
            });
            comb.applyFirst(func, "HELLO")({test: true}, "test");
            func.applyFirst("HELLO")({test: true}, "test");
        });

        it.should("throw an error with an invalid function", function () {
            assert.throws(function () {
                comb.applyFirst(1);
            });

            assert.throws(function () {
                comb.applyFirst(new Date());
            });
        });

        it.should("work with non function properties also", function () {
            var val = [],
                push = comb.applyFirst("push"),
                push2 = comb("push").applyFirst(),
                length = comb.applyFirst("length"),
                length2 = comb("length").applyFirst();
            push(val, 1);
            assert.equal(length(val), 1);

            push(val, 3);
            assert.equal(length(val), 2);

            push(val, 4);
            assert.equal(length(val), 3);

            push2(val, 1);
            assert.equal(length2(val), 4);

            push2(val, 3);
            assert.equal(length2(val), 5);

            push2(val, 4);
            assert.equal(length2(val), 6);

        });
    });


    it.describe("#curry", function (it) {
        it.should("force invocation for the specified number of times", function () {

            var func = comb(function (a, b, c, d) {
                assert.equal(a, "a");
                assert.equal(b, "b");
                assert.equal(c, "c");
                assert.equal(d, "d");
            });

            var curried = comb.curry(4, func);
            curried("a")("b")("c")("d");
            func.curry(4)("a")("b")("c")("d");
        });

        it.should("accept an execution scope", function () {
            var func = comb(function (a, b, c, d) {
                assert.isTrue(this.test);
                assert.equal(a, "a");
                assert.equal(b, "b");
                assert.equal(c, "c");
                assert.equal(d, "d");
            });
            var curried = comb.curry(4, func, {test: true}),
                curried2 = func.curry(4, {test: true});
            curried("a")("b")("c")("d");
            curried2("a")("b")("c")("d");
        });

        it.should("accept an a string and execution scope", function () {
            var scope = comb({
                test: true,
                curried: function (a, b, c, d) {
                    assert.isTrue(this.test);
                    assert.equal(a, "a");
                    assert.equal(b, "b");
                    assert.equal(c, "c");
                    assert.equal(d, "d");
                }
            });
            var curried = comb.curry(4, "curried", scope),
                curried2 = scope.curry(4, "curried"),
                curried3 = comb("curried").curry(4, scope);

            curried("a")("b")("c")("d");
            curried2("a")("b")("c")("d");
            curried3("a")("b")("c")("d");
        });
    });

}).as(module);


