"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");


it.describe("comb/base/object.js",function (it) {

    it.should("determine if someting is an objecct", function () {
        assert.isTrue(comb.isObject(new Date()));
        assert.isTrue(comb.isObject(new String()));
        assert.isTrue(comb.isObject(new Number()));
        assert.isTrue(comb.isObject(new Boolean()));
        assert.isTrue(comb.isObject({}));
        assert.isFalse(comb.isObject());
        assert.isFalse(comb.isObject(""));
        assert.isFalse(comb.isObject(1));
        assert.isFalse(comb.isObject(false));
        assert.isFalse(comb.isObject(true));

        assert.isTrue(comb(new Date()).isObject());
        assert.isTrue(comb(new String()).isObject());
        assert.isTrue(comb(new Number()).isObject());
        assert.isTrue(comb(new Boolean()).isObject());
        assert.isTrue(comb({}).isObject());
        assert.isFalse(comb("").isObject());
        assert.isFalse(comb(1).isObject());
        assert.isFalse(comb(false).isObject());
        assert.isFalse(comb(true).isObject());
    });

    it.should("determine if something is a hash", function () {
        assert.isTrue(comb.isHash({}));
        assert.isTrue(comb.isHash({1:2, a:"b"}));
        assert.isFalse(comb.isHash(new Date()));
        assert.isFalse(comb.isHash(new String()));
        assert.isFalse(comb.isHash(new Number()));
        assert.isFalse(comb.isHash(new Boolean()));
        assert.isFalse(comb.isHash());
        assert.isFalse(comb.isHash(""));
        assert.isFalse(comb.isHash(1));
        assert.isFalse(comb.isHash(false));
        assert.isFalse(comb.isHash(true));

        assert.isTrue(comb({}).isHash());
        assert.isTrue(comb({1:2, a:"b"}).isHash());
        assert.isFalse(comb(new Date()).isHash());
        assert.isFalse(comb(new String()).isHash());
        assert.isFalse(comb(new Number()).isHash());
        assert.isFalse(comb(new Boolean()).isHash());
        assert.isFalse(comb("").isHash());
        assert.isFalse(comb(1).isHash());
        assert.isFalse(comb(false).isHash());
        assert.isFalse(comb(true).isHash());
    });

    it.should("determine in an object is empty", function () {
        assert.isTrue(comb.isEmpty());
        assert.isTrue(comb.isEmpty({}));
        assert.isTrue(comb.isEmpty([]));
        assert.isFalse(comb.isEmpty({A:"b"}));
        assert.isFalse(comb.isEmpty([
            {A:"b"}
        ]));

        assert.isTrue(comb({}).isEmpty());
        assert.isTrue(comb([]).isEmpty());
        assert.isFalse(comb({A:"b"}).isEmpty());
        assert.isFalse(comb([
            {A:"b"}
        ]).isEmpty());
    });

    it.describe("#merge", function (it) {


        it.should("merge all properties", function () {
            //This is true because they inherit from eachother!
            var ret = {};
            comb.merge(ret, {test:true}, {test2:false}, {test3:"hello", test4:"world"});
            assert.isTrue(ret.test);
            assert.isFalse(ret.test2);
            assert.equal(ret.test3, "hello");
            assert.equal(ret.test4, "world");


            var ret2 = comb({});
            ret2.merge({test:true}, {test2:false}, {test3:"hello", test4:"world"});
            assert.isTrue(ret2.test);
            assert.isFalse(ret2.test2);
            assert.equal(ret2.test3, "hello");
            assert.equal(ret2.test4, "world");
        });

        it.should("merge objects if a start object is not provided", function () {
            //This is true because they inherit from eachother!
            var ret = comb.merge(null, {test:true}, {test2:false}, {test3:"hello", test4:"world"});
            assert.isTrue(ret.test);
            assert.isFalse(ret.test2);
            assert.equal(ret.test3, "hello");
            assert.equal(ret.test4, "world");
        });
    });

    it.describe("#deepMerge", function (it) {
        it.should("merge all nested objects", function () {
            var ret = comb.deepMerge(null, {test:true, a:{b:4}},
                {test2:false, a:{c:3}},
                {test3:"hello", test4:"world", a:{d:{e:2}}},
                {a:{d:{f:{g:1}}}});
            assert.isTrue(ret.test);
            assert.isFalse(ret.test2);
            assert.equal(ret.test3, "hello");
            assert.equal(ret.test4, "world");
            assert.deepEqual(ret.a, {b:4, c:3, d:{e:2, f:{g:1}}});

            var ret2 = comb({}).deepMerge({test:true, a:{b:4}},
                {test2:false, a:{c:3}},
                {test3:"hello", test4:"world", a:{d:{e:2}}},
                {a:{d:{f:{g:1}}}});
            assert.isTrue(ret2.test);
            assert.isFalse(ret2.test2);
            assert.equal(ret2.test3, "hello");
            assert.equal(ret2.test4, "world");
            assert.deepEqual(ret2.a, {b:4, c:3, d:{e:2, f:{g:1}}});
        });
    });

    it.describe("#extend", function (it) {
        it.should("extend a class properly", function () {
            var MyObj = function () {
            };
            MyObj.prototype.test = true;
            comb.extend(MyObj, {test2:false, test3:"hello", test4:"world"});
            var m = new MyObj();
            assert.isTrue(m.test);
            assert.isFalse(m.test2);
            assert.equal(m.test3, "hello");
            assert.equal(m.test4, "world");

            var MyObj2 = function () {
            };
            MyObj2.prototype.test = true;
            comb(MyObj2).extend({test2:false, test3:"hello", test4:"world"});
            var m2 = new MyObj2();
            assert.isTrue(m2.test);
            assert.isFalse(m2.test2);
            assert.equal(m2.test3, "hello");
            assert.equal(m2.test4, "world");
        });

        it.should("extend a objects properly", function () {
            var m = {};
            m.test = true;
            comb.extend(m, {test2:false, test3:"hello", test4:"world"});
            assert.isTrue(m.test);
            assert.isFalse(m.test2);
            assert.equal(m.test3, "hello");
            assert.equal(m.test4, "world");

            var m2 = comb({test:true}).extend({test2:false, test3:"hello", test4:"world"});
            assert.isTrue(m2.test);
            assert.isFalse(m2.test2);
            assert.equal(m2.test3, "hello");
            assert.equal(m2.test4, "world");
        })
    });

    it.should("determine if objects are deepEqual properly", function () {
        assert.isTrue(comb.deepEqual({a:"a"}, {a:"a"}));
        assert.isFalse(comb.deepEqual({a:"b"}, {a:"a"}));
        assert.isFalse(comb.deepEqual("a", new String("a")));
        assert.isTrue(comb.deepEqual(/a|b/ig, /a|b/ig));
        assert.isFalse(comb.deepEqual(/a|b/ig, /a|b/g));
        assert.isTrue(comb.deepEqual(new Date(2000, 2, 2, 2, 2, 2), new Date(2000, 2, 2, 2, 2, 2)));
        assert.isFalse(comb.deepEqual(new Date(2000, 2, 2, 2, 2, 2), new Date(2000, 2, 2, 2, 2, 1)));
        assert.isTrue(comb.deepEqual([
            {a:"a"}
        ], [
            {a:"a"}
        ]));
        assert.isTrue(comb(new Buffer("abc")).deepEqual(new Buffer("abc")))
        assert.isFalse(comb([
            {a:"b"}
        ]).deepEqual([
            {a:"a"}
        ]));
        (function () {
            var argsA = arguments;
            (function () {
                assert.isTrue(comb(argsA).deepEqual(arguments));
                assert.isFalse(comb(argsA).deepEqual('a'));
            })(["a"]);
        })(["a"]);


        assert.isTrue(comb({a:"a"}).deepEqual({a:"a"}));
        assert.isFalse(comb({a:"b"}).deepEqual({a:"a"}));
        assert.isFalse(comb("a").deepEqual(new String("a")));
        assert.isTrue(comb(/a|b/ig).deepEqual(/a|b/ig));
        assert.isFalse(comb(/a|b/ig).deepEqual(/a|b/g));
        assert.isTrue(comb(new Date(2000, 2, 2, 2, 2, 2)).deepEqual(new Date(2000, 2, 2, 2, 2, 2)));
        assert.isFalse(comb(new Date(2000, 2, 2, 2, 2, 2)).deepEqual(new Date(2000, 2, 2, 2, 2, 1)));
        assert.isTrue(comb([
            {a:"a"}
        ]).deepEqual([
            {a:"a"}
        ]));
        assert.isTrue(comb(new Buffer("abc")).deepEqual(new Buffer("abc")))
        assert.isFalse(comb([
            {a:"b"}
        ]).deepEqual([
            {a:"a"}
        ]));
        (function () {
            var argsA = arguments;
            (function () {
                assert.isTrue(comb(argsA).deepEqual(arguments));
                assert.isFalse(comb(argsA).deepEqual('a'));
            })(["a"]);
        })(["a"]);

    });

    it.describe(".hash", function (it) {

        it.should("loop through k/v pairs in a hash", function () {
            var obj = {a:"b", c:"d", e:"f"}, keys = Object.keys(obj), i = 0;
            assert.deepEqual(comb(obj).forEach(function (value, key) {
                assert.equal(keys[i], key);
                assert.equal(obj[keys[i++]], value);
            }), obj);
            i = 0;
            assert.deepEqual(comb.hash.forEach(obj, function (value, key) {
                assert.equal(keys[i], key);
                assert.equal(obj[keys[i++]], value);
            }), obj);
            assert.throws(function () {
                comb.hash.forEach();
            });
            assert.throws(function () {
                comb.hash.forEach(1);
            });
            assert.throws(function () {
                comb.hash.forEach({});
            });
            assert.throws(function () {
                comb.hash.forEach({}, "hello");
            });
        });
        it.should("filter k/v pairs in a hash", function () {

            var obj = {a:"b", c:"d", e:"f"};
            assert.deepEqual(comb(obj).filter(function (value, key) {
                return value === "b" || key === "e";
            }), {a:"b", e:"f"});
            assert.deepEqual(comb.hash.filter(obj, function (value, key) {
                return value === "b" || key === "e";
            }), {a:"b", e:"f"});
            assert.throws(function () {
                comb.hash.filter();
            });
            assert.throws(function () {
                comb.hash.filter(1);
            });
            assert.throws(function () {
                comb.hash.filter({});
            });
            assert.throws(function () {
                comb.hash.filter({}, "hello");
            });

        });
        it.should("retrieve values", function () {
            var obj = {a:"b", c:"d", e:"f"}, values = ["b", "d", "f"];
            assert.deepEqual(comb(obj).values(), values);
            assert.deepEqual(comb.hash.values(obj), values);
            assert.throws(function () {
                comb.hash.values();
            });
            assert.throws(function () {
                comb.hash.values(1);
            });
            assert.throws(function () {
                comb.hash.values("hello");
            });
        });
        it.should("invert a hash", function () {
            var obj = {a:"b", c:"d", e:"f"}, inverted = {b:"a", d:"c", f:"e"};
            assert.deepEqual(comb(obj).invert(), inverted);
            assert.deepEqual(comb.hash.invert(obj), inverted);
            assert.throws(function () {
                comb.hash.invert();
            });
            assert.throws(function () {
                comb.hash.invert(1);
            });
            assert.throws(function () {
                comb.hash.invert("hello");
            });
        });
        it.should("convert a hash to an array", function () {
            var obj = {a:"b", c:"d", e:"f"}, arr = [
                ["a", "b"],
                ["c", "d"],
                ["e", "f"]
            ];
            assert.deepEqual(comb(obj).toArray(), arr);
            assert.deepEqual(comb.hash.toArray(obj), arr);
            assert.throws(function () {
                comb.hash.toArray();
            });
            assert.throws(function () {
                comb.hash.toArray(1);
            });
            assert.throws(function () {
                comb.hash.toArray("hello");
            });
        });

    });
}).as(module);


