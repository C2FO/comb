"use strict";
var vows = require('vows'),
    assert = require('assert'),
    comb = require("../../index"),
    define = comb.define,
    hitch = comb.hitch,
    Broadcaster = comb;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Object utilities");
//Super of other classes
suite.addBatch({
    "when testing if something is an object":{
        topic:comb,

        "it should determine properly":function (topic) {
            assert.isTrue(topic.isObject(new Date()));
            assert.isTrue(topic.isObject(new String()));
            assert.isTrue(topic.isObject(new Number()));
            assert.isTrue(topic.isObject(new Boolean()));
            assert.isTrue(topic.isObject({}));
            assert.isFalse(topic.isObject());
            assert.isFalse(topic.isObject(""));
            assert.isFalse(topic.isObject(1));
            assert.isFalse(topic.isObject(false));
            assert.isFalse(topic.isObject(true));
        }
    },

    "when testing if something is a hash":{
        topic:comb,

        "it should determine properly":function (topic) {
            assert.isTrue(topic.isHash({}));
            assert.isTrue(topic.isHash({1:2, a:"b"}));
            assert.isFalse(topic.isHash(new Date()));
            assert.isFalse(topic.isHash(new String()));
            assert.isFalse(topic.isHash(new Number()));
            assert.isFalse(topic.isHash(new Boolean()));
            assert.isFalse(topic.isHash());
            assert.isFalse(topic.isHash(""));
            assert.isFalse(topic.isHash(1));
            assert.isFalse(topic.isHash(false));
            assert.isFalse(topic.isHash(true));
        }
    },

    "when testing if an object is empty":{
        topic:comb,

        "it should determine properly":function (topic) {
            assert.isTrue(topic.isEmpty());
            assert.isTrue(topic.isEmpty({}));
            assert.isFalse(topic.isEmpty({A:"b"}));
        }
    },

    "when merging objects ":{
        topic:function () {
            var ret = {};
            comb.merge(ret, {test:true}, {test2:false}, {test3:"hello", test4:"world"});
            return ret;


        },

        "is should contain all properties":function (topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
        }
    },

    "when merging objects and not providing a start object":{
        topic:function () {
            return comb.merge(null, {test:true}, {test2:false}, {test3:"hello", test4:"world"});
        },

        "is should contain all properties":function (topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
        }
    },

    "when deepMerging objects and not providing a start object":{
        topic:function () {
            return comb.merge(null, {test:true, a:{b:4}},
                {test2:false, a:{c:3}},
                {test3:"hello", test4:"world", a:{d:{e:2}}},
                {a:{d:{f:{g:1}}}});
        },

        "is should contain all properties":function (topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
        }
    },

    "when deepMerging objects ":{
        topic:function () {
            var ret = {a:{b:1, c:2, d:{e:3, f:{g:4}}}};
            comb.deepMerge(ret,
                {test:true, a:{b:4}},
                {test2:false, a:{c:3}},
                {test3:"hello", test4:"world", a:{d:{e:2}}},
                {a:{d:{f:{g:1}}}});
            return ret;


        },

        "is should contain all properties":function (topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
            assert.deepEqual(topic.a, {b:4, c:3, d:{e:2, f:{g:1}}});
        }
    },

    "when extending a class ":{
        topic:function () {
            var myObj = function () {
            };
            myObj.prototype.test = true;
            comb.extend(myObj, {test2:false, test3:"hello", test4:"world"});
            return new myObj;
        },

        "is should contain all properties":function (topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
        }
    },

    "when extending an object ":{
        topic:function () {
            var myObj = {};
            myObj.test = true;
            comb.extend(myObj, {test2:false, test3:"hello", test4:"world"});
            return myObj;
        },

        "is should contain all properties":function (topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
        }
    },

    "when using deepEqual":{
        topic:comb.deepEqual,

        "it should determine correctly":function () {
            assert.isTrue(comb.deepEqual({a:"a"}, {a:"a"}));
            assert.isFalse(comb.deepEqual({a:"b"}, {a:"a"}));
            assert.isTrue(comb.deepEqual(new Date(2000, 2, 2, 2, 2, 2), new Date(2000, 2, 2, 2, 2, 2)));
            assert.isFalse(comb.deepEqual(new Date(2000, 2, 2, 2, 2, 2), new Date(2000, 2, 2, 2, 2, 1)));
            assert.isTrue(comb.deepEqual([
                {a:"a"}
            ], [
                {a:"a"}
            ]));
            assert.isFalse(comb.deepEqual([
                {a:"b"}
            ], [
                {a:"a"}
            ]));

        }
    }
});


suite.run({reporter:vows.reporter.spec}, comb.hitch(ret, "callback"));
