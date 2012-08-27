"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");

it.describe("comb/base/misc.js", function (it) {
//Super of other classes
    it.should("#isBoolean", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isBoolean(true));
        assert.isFalse(comb.isBoolean(function () {
        }));
        assert.isFalse(comb.isBoolean("hello"));
        assert.isFalse(comb.isBoolean({}));
        assert.isFalse(comb.isBoolean(new Date()));
        assert.isFalse(comb.isBoolean(1));
    });

    it.should("#isArguments", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isArguments(arguments));
        assert.isFalse(comb.isArguments(function () {
        }));
        assert.isFalse(comb.isArguments("hello"));
        assert.isFalse(comb.isArguments({}));
        assert.isFalse(comb.isArguments(new Date()));
        assert.isFalse(comb.isArguments(1));
    });

    it.should("#isUndefined", function () {
        assert.isTrue(comb.isUndefined(undefined));
        assert.isFalse(comb.isUndefined(null));
        assert.isFalse(comb.isUndefined(true));
        assert.isFalse(comb.isUndefined(function () {
        }));
        assert.isFalse(comb.isUndefined("hello"));
        assert.isFalse(comb.isUndefined({}));
        assert.isFalse(comb.isUndefined(new Date()));
        assert.isFalse(comb.isUndefined(1));
    });

    it.should("#isNull", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isNull(null));
        assert.isFalse(comb.isNull(undefined));
        assert.isFalse(comb.isNull(true));
        assert.isFalse(comb.isNull(function () {
        }));
        assert.isFalse(comb.isNull("hello"));
        assert.isFalse(comb.isNull({}));
        assert.isFalse(comb.isNull(new Date()));
        assert.isFalse(comb.isNull(1));
    });

    it.should("#isDefined", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isDefined(null));
        assert.isFalse(comb.isDefined(undefined));
        assert.isTrue(comb.isDefined(true));
        assert.isTrue(comb.isDefined(function () {
        }));
        assert.isTrue(comb.isDefined("hello"));
        assert.isTrue(comb.isDefined({}));
        assert.isTrue(comb.isDefined(new Date()));
        assert.isTrue(comb.isDefined(1));
    });

    it.should("#isInstanceOf", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isInstanceOf(new Date(), Date));
        assert.isTrue(comb.isInstanceOf(new Number(1), Number));
        assert.isTrue(comb.isInstanceOf(new String(1), String));
        assert.isFalse(comb.isInstanceOf(undefined, String));
        assert.isFalse(comb.isInstanceOf(undefined, 1));
    });
}).as(module);

