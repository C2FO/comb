"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("../../index");

it.describe("comb/base/misc.js", function (it) {
//Super of other classes
    it.should("#isBoolean", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isBoolean(true));
        assert.isTrue(comb(true).isBoolean());
        assert.isFalse(comb.isBoolean(function () {
        }));

        assert.isFalse(comb(function () {
        }).isBoolean());

        assert.isFalse(comb.isBoolean("hello"));
        assert.isFalse(comb("hello").isBoolean());
        assert.isFalse(comb.isBoolean({}));
        assert.isFalse(comb({}).isBoolean());
        assert.isFalse(comb(new Date()).isBoolean());
        assert.isFalse(comb(1).isBoolean());
    });

    it.should("#isArguments", function () {
        assert.isTrue(comb.isArguments(arguments));
        assert.isTrue(comb(arguments).isArguments());
        assert.isFalse(comb.isArguments(function () {
        }));

        assert.isFalse(comb(function () {
        }).isArguments());
        assert.isFalse(comb.isArguments("hello"));
        assert.isFalse(comb("hello").isArguments());
        assert.isFalse(comb({}).isArguments());
        assert.isFalse(comb(new Date()).isArguments());
        assert.isFalse(comb(1).isArguments());
    });

    it.should("#isUndefined", function () {
        assert.isTrue(comb.isUndefined(undefined));
        assert.isFalse(comb.isUndefined(null));
        assert.isFalse(comb.isUndefined(true));
        assert.isFalse(comb(true).isUndefined());
        assert.isFalse(comb.isUndefined(function () {
        }));
        assert.isFalse(comb(function () {
        }).isUndefined());
        assert.isFalse(comb("hello").isUndefined());
        assert.isFalse(comb({}).isUndefined());
        assert.isFalse(comb(new Date()).isUndefined());
        assert.isFalse(comb(1).isUndefined());
    });

    it.should("#isNull", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isNull(null));
        assert.isFalse(comb.isNull(undefined));
        assert.isFalse(comb.isNull(true));
        assert.isFalse(comb(true).isNull());
        assert.isFalse(comb.isNull(function () {
        }));
        assert.isFalse(comb(function () {
        }).isNull());
        assert.isFalse(comb("hello").isNull());
        assert.isFalse(comb({}).isNull());
        assert.isFalse(comb(new Date()).isNull());
        assert.isFalse(comb(1).isNull());
    });

    it.should("#isDefined", function () {
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isDefined(null));
        assert.isFalse(comb.isDefined(undefined));
        assert.isTrue(comb.isDefined(true));
        assert.isTrue(comb(true).isDefined());
        assert.isTrue(comb.isDefined(function () {
        }));
        assert.isTrue(comb(function () {
        }).isDefined());
        assert.isTrue(comb("hello").isDefined());
        assert.isTrue(comb({}).isDefined());
        assert.isTrue(comb(new Date()).isDefined());
        assert.isTrue(comb(1).isDefined());
    });

    it.should("#isInstanceOf", function () {
        /*jshint -W053 */
        //This is true because they inherit from eachother!
        assert.isTrue(comb.isInstanceOf(new Date(), Date));
        assert.isTrue(comb(new Date()).isInstanceOf(Date));
        assert.isTrue(comb(new Number(1)).isInstanceOf(Number));
        assert.isTrue(comb(new String(1)).isInstanceOf(String));
        assert.isFalse(comb.isInstanceOf(undefined, String));
        assert.isFalse(comb.isInstanceOf(undefined, 1));
    });

    it.should("convert arumgents to array", function () {

        (function () {
            assert.deepEqual(comb.argsToArray(arguments), [1, 2, 3]);
            assert.deepEqual(comb(arguments).toArray(), [1, 2, 3]);
            assert.deepEqual(comb.argsToArray(arguments, 1), [2, 3]);
            assert.deepEqual(comb(arguments).toArray(1), [2, 3]);
        })(1, 2, 3);

    });
}).as(module);

