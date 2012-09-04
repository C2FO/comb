"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");


it.describe("comb/base/regexp.js",function (it) {
//Super of other classes

    it.should("escape it properly", function () {
        var chars = [".", "$", "?", "*", "|", "{", "}", "(", ")", "[", "]", "\\", "/", "+", "^"];
        chars.forEach(function (c) {
            assert.equal(comb.regexp.escapeString(c), "\\" + c);
            assert.equal(comb(c).escape(), "\\" + c);
        });
        chars.forEach(function (c) {
            assert.equal(comb(c).escape([c]), c);
        });
    });


    it.should("determine if something is a RegExp", function () {
        assert.isTrue(comb.isRexExp(/a/));
        assert.isTrue(comb.isRexExp(new RegExp("a")));
        assert.isFalse(comb.isRexExp());
        assert.isFalse(comb.isRexExp(""));
        assert.isFalse(comb.isRexExp(1));
        assert.isFalse(comb.isRexExp(false));
        assert.isFalse(comb.isRexExp(true));

        assert.isTrue(comb(/a/).isRegExp());
        assert.isTrue(comb(new RegExp("a")).isRegExp());
        assert.isFalse(comb("").isRegExp());
        assert.isFalse(comb(1).isRegExp());
        assert.isFalse(comb(false).isRegExp());
        assert.isFalse(comb(true).isRegExp());
    });


}).as(module);