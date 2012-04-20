"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");

it.describe("comb/base/number.js", function (it) {
//Super of other classes
    it.should("test if something is a number", function () {
        assert.isTrue(comb.isNumber(1));
        assert.isTrue(comb.isNumber(new Number(1)));
        assert.isFalse(comb.isNumber("1"));
        assert.isFalse(comb.isNumber(new Date()));
        assert.isFalse(comb.isNumber(true));
        assert.isFalse(comb.isNumber(false));

    });

    it.describe("comb.number", function (it) {
        it.should("round properly", function () {
            assert.equal(comb.number.round(10.000009, 2), 10);
            assert.equal(comb.number.round(10.000009, 5), 10.00001);
            assert.equal(comb.number.round(10.0009, 3), 10.001);
            assert.equal(comb.number.round(10.0009, 2), 10);
            assert.equal(comb.number.round(10.0009, 3), 10.001);
            assert.equal(comb.number.round(10.0009, 2, 1), 11);
        });


        it.should("roundCeil properly", function () {
            assert.equal(comb.number.roundCeil(10.000001, 2), 10.01);
            assert.equal(comb.number.roundCeil(10.000002, 5), 10.00001);
            assert.equal(comb.number.roundCeil(10.0003, 3), 10.001);
            assert.equal(comb.number.roundCeil(10.0004, 2), 10.01);
            assert.equal(comb.number.roundCeil(10.0005, 3), 10.001);
            assert.equal(comb.number.roundCeil(10.0002, 2), 10.01);
        });
    });


});

