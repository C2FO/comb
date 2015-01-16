"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");


it.describe("comb/base/number.js",function (it) {
//Super of other classes
    it.should("test if something is a number", function () {
        assert.isTrue(comb.isNumber(1));
        assert.isTrue(comb(1).isNumber());
        assert.isTrue(comb.isNumber(new Number(1)));
        assert.isTrue(comb(new Number(1)).isNumber());
        assert.isFalse(comb.isNumber("1"));
        assert.isFalse(comb("1").isNumber());
        assert.isFalse(comb.isNumber(new Date()));
        assert.isFalse(comb(new Date()).isNumber());
        assert.isFalse(comb.isNumber(true));
        assert.isFalse(comb.isNumber(false));

        assert.isFalse(comb(true).isNumber());
        assert.isFalse(comb(false).isNumber());

    });

    it.describe("comb.number", function (it) {
        it.should("roundCeil properly", function () {
            assert.equal(comb.number.roundCeil(10.000001, 2), 10.01);
            assert.equal(comb.number.roundCeil(10.000002, 5), 10.00001);
            assert.equal(comb.number.roundCeil(10.0003, 3), 10.001);
            assert.equal(comb.number.roundCeil(10.0004, 2), 10.01);
            assert.equal(comb.number.roundCeil(10.0005, 3), 10.001);
            assert.equal(comb.number.roundCeil(10.0002, 2), 10.01);

            assert.equal(comb(10.000001).roundCeil(2), 10.01);
            assert.equal(comb(10.000002).roundCeil(5), 10.00001);
            assert.equal(comb(10.0003).roundCeil(3), 10.001);
            assert.equal(comb(10.0004).roundCeil(2), 10.01);
            assert.equal(comb(10.0005).roundCeil(3), 10.001);
            assert.equal(comb(10.0002).roundCeil(2), 10.01);
        });


        it.should("roundHalfDown properly", function () {
            assert.equal(comb.number.roundHalfDown(0.225, 2), 0.22);
            assert.equal(comb.number.roundHalfDown(10.384, 2), 10.38);
            assert.equal(comb.number.roundHalfDown(10.386, 2), 10.38);
            assert.equal(comb.number.roundHalfDown(10.3869, 3), 10.386);
            assert.equal(comb.number.roundHalfDown(10.3861, 3), 10.386);
            assert.equal(comb.number.roundHalfDown(10.269019, 5), 10.26901);

            assert.equal(comb(0.225).roundHalfDown(2), 0.22);
            assert.equal(comb(10.384).roundHalfDown(2), 10.38);
            assert.equal(comb(10.386).roundHalfDown(2), 10.38);
            assert.equal(comb(10.3869).roundHalfDown(3), 10.386);
            assert.equal(comb(10.3861).roundHalfDown(3), 10.386);
            assert.equal(comb(10.269019).roundHalfDown(5), 10.26901);
        });


        it.should("roundHalfUp properly", function () {
            assert.equal(comb.number.roundHalfUp(-0.515, 1), -0.5);
            assert.equal(comb.number.roundHalfUp(-0.515, 2), -0.51);
            assert.equal(comb.number.roundHalfUp(-0.515, 3), -0.515);
            assert.equal(comb.number.roundHalfUp(-0.5155, 4), -0.5155);
            assert.equal(comb.number.roundHalfUp(-0.51551, 5), -0.51551);
            assert.equal(comb.number.roundHalfUp(0.225, 2), 0.23);
            assert.equal(comb.number.roundHalfUp(10.384, 2), 10.38);
            assert.equal(comb.number.roundHalfUp(10.386, 2), 10.39);
            assert.equal(comb.number.roundHalfUp(10.3869, 3), 10.387);
            assert.equal(comb.number.roundHalfUp(10.3861, 3), 10.386);
            assert.equal(comb.number.roundHalfUp(10.269019, 5), 10.26902);
            assert.equal(comb.number.roundHalfUp(2.384, 2), 2.38);
            assert.equal(comb.number.roundHalfUp(2.385, 2), 2.39);
            assert.equal(comb.number.roundHalfUp(2.386, 2), 2.39);
            assert.equal(comb.number.roundHalfUp(3.285151515, 8), 3.28515152);
            assert.equal(comb.number.roundHalfUp(3.285151514, 8), 3.28515151);
            assert.equal(comb.number.roundHalfUp(3.285151516, 8), 3.28515152);
            assert.equal(comb.number.roundHalfUp(3.2851515155, 9), 3.285151516);
            assert.equal(comb.number.roundHalfUp(3.2851515154, 9), 3.285151515);
            assert.equal(comb.number.roundHalfUp(3.2851515156, 9), 3.285151516);
            assert.equal(comb.number.roundHalfUp(3.28515151515, 10), 3.2851515152);
            assert.equal(comb.number.roundHalfUp(3.28515151514, 10), 3.2851515151);
            assert.equal(comb.number.roundHalfUp(3.28515151516, 10), 3.2851515152);
            assert.equal(comb.number.roundHalfUp(0.985, 2), 0.99);
            assert.equal(comb.number.roundHalfUp(0.985, 2), 0.99);
            assert.equal(comb.number.roundHalfUp(0.985, 2), 0.99);
            assert.equal(comb.number.roundHalfUp(0.985, 2), 0.99);
            assert.equal(comb.number.roundHalfUp(0.985, 2), 0.99);
            assert.equal(comb.number.roundHalfUp(0.995, 2), 1);
            assert.equal(comb.number.roundHalfUp(0.995, 2), 1);
            assert.equal(comb.number.roundHalfUp(0.995, 2), 1);
            assert.equal(comb.number.roundHalfUp(0.535, 2), 0.54);
            assert.equal(comb.number.roundHalfUp(0.225, 2), 0.23);
            assert.equal(comb.number.roundHalfUp(0.185, 2), 0.19);
            assert.equal(comb.number.roundHalfUp(0.385, 2), 0.39);
            assert.equal(comb.number.roundHalfUp(1.385, 2), 1.39);
            assert.equal(comb.number.roundHalfUp(3.385, 2), 3.39);
            assert.equal(comb.number.roundHalfUp(4.385, 2), 4.39);
            assert.equal(comb.number.roundHalfUp(3.475, 2), 3.48);

            assert.equal(comb(-0.515).roundHalfUp(1), -0.5);
            assert.equal(comb(-0.515).roundHalfUp(2), -0.51);
            assert.equal(comb(-0.515).roundHalfUp(3), -0.515);
            assert.equal(comb(-0.5155).roundHalfUp(4), -0.5155);
            assert.equal(comb(-0.51551).roundHalfUp(5), -0.51551);
            assert.equal(comb(0.225).roundHalfUp(2), 0.23);
            assert.equal(comb(10.384).roundHalfUp(2), 10.38);
            assert.equal(comb(10.386).roundHalfUp(2), 10.39);
            assert.equal(comb(10.3869).roundHalfUp(3), 10.387);
            assert.equal(comb(10.3861).roundHalfUp(3), 10.386);
            assert.equal(comb(10.269019).roundHalfUp(5), 10.26902);
            assert.equal(comb(2.384).roundHalfUp(2), 2.38);
            assert.equal(comb(2.385).roundHalfUp(2), 2.39);
            assert.equal(comb(2.386).roundHalfUp(2), 2.39);
            assert.equal(comb(3.285151515).roundHalfUp(8), 3.28515152);
            assert.equal(comb(3.285151514).roundHalfUp(8), 3.28515151);
            assert.equal(comb(3.285151516).roundHalfUp(8), 3.28515152);
            assert.equal(comb(3.2851515155).roundHalfUp(9), 3.285151516);
            assert.equal(comb(3.2851515154).roundHalfUp(9), 3.285151515);
            assert.equal(comb(3.2851515156).roundHalfUp(9), 3.285151516);
            assert.equal(comb(3.28515151515).roundHalfUp(10), 3.2851515152);
            assert.equal(comb(3.28515151514).roundHalfUp(10), 3.2851515151);
            assert.equal(comb(3.28515151516).roundHalfUp(10), 3.2851515152);
            assert.equal(comb(0.985).roundHalfUp(2), 0.99);
            assert.equal(comb(0.985).roundHalfUp(2), 0.99);
            assert.equal(comb(0.985).roundHalfUp(2), 0.99);
            assert.equal(comb(0.985).roundHalfUp(2), 0.99);
            assert.equal(comb(0.985).roundHalfUp(2), 0.99);
            assert.equal(comb(0.995).roundHalfUp(2), 1);
            assert.equal(comb(0.995).roundHalfUp(2), 1);
            assert.equal(comb(0.995).roundHalfUp(2), 1);
            assert.equal(comb(0.535).roundHalfUp(2), 0.54);
            assert.equal(comb(0.225).roundHalfUp(2), 0.23);
            assert.equal(comb(0.185).roundHalfUp(2), 0.19);
            assert.equal(comb(0.385).roundHalfUp(2), 0.39);
            assert.equal(comb(1.385).roundHalfUp(2), 1.39);
            assert.equal(comb(3.385).roundHalfUp(2), 3.39);
            assert.equal(comb(4.385).roundHalfUp(2), 4.39);
            assert.equal(comb(3.475).roundHalfUp(2), 3.48);


            // Test to ensure round pass-through works as expected
            assert.equal(comb.number.round(0.225, 2), 0.23);
            assert.equal(comb.number.round(10.384, 2), 10.38);
            assert.equal(comb.number.round(10.386, 2), 10.39);
            assert.equal(comb.number.round(10.3869, 3), 10.387);
            assert.equal(comb.number.round(10.3861, 3), 10.386);
            assert.equal(comb.number.round(10.269019, 5), 10.26902);
            assert.equal(comb(0.225).round(2), 0.23);
            assert.equal(comb(10.384).round(2), 10.38);
            assert.equal(comb(10.386).round(2), 10.39);
            assert.equal(comb(10.3869).round(3), 10.387);
            assert.equal(comb(10.3861).round(3), 10.386);
            assert.equal(comb(10.269019).round(5), 10.26902);
        });

    });


}).as(module);

