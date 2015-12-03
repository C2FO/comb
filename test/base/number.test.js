"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("../../index");


it.describe("comb/base/number.js", function (it) {
    /*jshint -W053 */
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
            assert.equal(comb.number.roundHalfUp(-7.6, 0), -8);
            assert.equal(comb.number.roundHalfUp(-7.4, 0), -7);
            assert.equal(comb.number.roundHalfUp(-3.515, 2), -3.51);
            assert.equal(comb.number.roundHalfUp(-0.515, 1), -0.5);
            assert.equal(comb.number.roundHalfUp(-0.515, 2), -0.51);
            assert.equal(comb.number.roundHalfUp(-0.515, 3), -0.515);
            assert.equal(comb.number.roundHalfUp(-0.5155, 4), -0.5155);
            assert.equal(comb.number.roundHalfUp(-0.51551, 5), -0.51551);
            assert.equal(comb.number.roundHalfUp(-2.384, 2), -2.38);
            assert.equal(comb.number.roundHalfUp(-2.385, 2), -2.38);
            assert.equal(comb.number.roundHalfUp(-2.386, 2), -2.39);
            assert.equal(comb.number.roundHalfUp(-0.185, 2), -0.18);
            assert.equal(comb.number.roundHalfUp(-0.385, 2), -0.38);
            assert.equal(comb.number.roundHalfUp(-1.385, 2), -1.38);
            assert.equal(comb.number.roundHalfUp(-3.385, 2), -3.38);
            assert.equal(comb.number.roundHalfUp(-4.385, 2), -4.38);
            assert.equal(comb.number.roundHalfUp(-3.475, 2), -3.47);
            assert.equal(comb.number.roundHalfUp(-2.3845, 3), -2.384);
            assert.equal(comb.number.roundHalfUp(-2.3841, 3), -2.384);
            assert.equal(comb.number.roundHalfUp(-2.3846, 3), -2.385);
            assert.equal(comb.number.roundHalfUp(-2.38485, 4), -2.3848);
            assert.equal(comb.number.roundHalfUp(-2.38481, 4), -2.3848);
            assert.equal(comb.number.roundHalfUp(-2.38486, 4), -2.3849);
            assert.equal(comb.number.roundHalfUp(-2.384855, 5), -2.38485);
            assert.equal(comb.number.roundHalfUp(-2.384851, 5), -2.38485);
            assert.equal(comb.number.roundHalfUp(-2.384856, 5), -2.38486);
            assert.equal(comb.number.roundHalfUp(-2.3848525, 6), -2.384852);
            assert.equal(comb.number.roundHalfUp(-2.3848521, 6), -2.384852);
            assert.equal(comb.number.roundHalfUp(-2.3848526, 6), -2.384853);
            assert.equal(comb.number.roundHalfUp(-2.38485255, 7), -2.3848525);
            assert.equal(comb.number.roundHalfUp(-2.38485251, 7), -2.3848525);
            assert.equal(comb.number.roundHalfUp(-2.38485256, 7), -2.3848526);
            assert.equal(comb.number.roundHalfUp(-3.285151515, 8), -3.28515151);
            assert.equal(comb.number.roundHalfUp(-3.285151514, 8), -3.28515151);
            assert.equal(comb.number.roundHalfUp(-3.285151516, 8), -3.28515152);
            assert.equal(comb.number.roundHalfUp(-3.2851515155, 9), -3.285151515);
            assert.equal(comb.number.roundHalfUp(-3.2851515154, 9), -3.285151515);
            assert.equal(comb.number.roundHalfUp(-3.2851515156, 9), -3.285151516);
            assert.equal(comb.number.roundHalfUp(-3.28515151515, 10), -3.2851515151);
            assert.equal(comb.number.roundHalfUp(-3.28515151514, 10), -3.2851515151);
            assert.equal(comb.number.roundHalfUp(-3.28515151516, 10), -3.2851515152);
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
            assert.equal(comb.number.roundHalfUp(0.995, 2), 1);
            assert.equal(comb.number.roundHalfUp(0.535, 2), 0.54);
            assert.equal(comb.number.roundHalfUp(0.225, 2), 0.23);
            assert.equal(comb.number.roundHalfUp(0.185, 2), 0.19);
            assert.equal(comb.number.roundHalfUp(0.385, 2), 0.39);
            assert.equal(comb.number.roundHalfUp(1.385, 2), 1.39);
            assert.equal(comb.number.roundHalfUp(3.385, 2), 3.39);
            assert.equal(comb.number.roundHalfUp(4.385, 2), 4.39);
            assert.equal(comb.number.roundHalfUp(3.475, 2), 3.48);
            assert.equal(comb.number.roundHalfUp(2.3845, 3), 2.385);
            assert.equal(comb.number.roundHalfUp(2.3841, 3), 2.384);
            assert.equal(comb.number.roundHalfUp(2.3846, 3), 2.385);
            assert.equal(comb.number.roundHalfUp(2.38485, 4), 2.3849);
            assert.equal(comb.number.roundHalfUp(2.38481, 4), 2.3848);
            assert.equal(comb.number.roundHalfUp(2.38486, 4), 2.3849);
            assert.equal(comb.number.roundHalfUp(2.384855, 5), 2.38486);
            assert.equal(comb.number.roundHalfUp(2.384851, 5), 2.38485);
            assert.equal(comb.number.roundHalfUp(2.384856, 5), 2.38486);
            assert.equal(comb.number.roundHalfUp(2.3848525, 6), 2.384853);
            assert.equal(comb.number.roundHalfUp(2.3848521, 6), 2.384852);
            assert.equal(comb.number.roundHalfUp(2.3848526, 6), 2.384853);
            assert.equal(comb.number.roundHalfUp(2.38485255, 7), 2.3848526);
            assert.equal(comb.number.roundHalfUp(2.38485251, 7), 2.3848525);
            assert.equal(comb.number.roundHalfUp(2.38485256, 7), 2.3848526);

            assert.equal(comb(-7.6).roundHalfUp(0), -8);
            assert.equal(comb(-7.4).roundHalfUp(0), -7);
            assert.equal(comb(-3.515).roundHalfUp(2), -3.51);
            assert.equal(comb(-0.515).roundHalfUp(1), -0.5);
            assert.equal(comb(-0.515).roundHalfUp(2), -0.51);
            assert.equal(comb(-0.515).roundHalfUp(3), -0.515);
            assert.equal(comb(-0.5155).roundHalfUp(4), -0.5155);
            assert.equal(comb(-0.51551).roundHalfUp(5), -0.51551);
            assert.equal(comb(-2.384).roundHalfUp(2), -2.38);
            assert.equal(comb(-2.385).roundHalfUp(2), -2.38);
            assert.equal(comb(-2.386).roundHalfUp(2), -2.39);
            assert.equal(comb(-0.185).roundHalfUp(2), -0.18);
            assert.equal(comb(-0.385).roundHalfUp(2), -0.38);
            assert.equal(comb(-1.385).roundHalfUp(2), -1.38);
            assert.equal(comb(-3.385).roundHalfUp(2), -3.38);
            assert.equal(comb(-4.385).roundHalfUp(2), -4.38);
            assert.equal(comb(-3.475).roundHalfUp(2), -3.47);
            assert.equal(comb(-2.3845).roundHalfUp(3), -2.384);
            assert.equal(comb(-2.3841).roundHalfUp(3), -2.384);
            assert.equal(comb(-2.3846).roundHalfUp(3), -2.385);
            assert.equal(comb(-2.38485).roundHalfUp(4), -2.3848);
            assert.equal(comb(-2.38481).roundHalfUp(4), -2.3848);
            assert.equal(comb(-2.38486).roundHalfUp(4), -2.3849);
            assert.equal(comb(-2.384855).roundHalfUp(5), -2.38485);
            assert.equal(comb(-2.384851).roundHalfUp(5), -2.38485);
            assert.equal(comb(-2.384856).roundHalfUp(5), -2.38486);
            assert.equal(comb(-2.3848525).roundHalfUp(6), -2.384852);
            assert.equal(comb(-2.3848521).roundHalfUp(6), -2.384852);
            assert.equal(comb(-2.3848526).roundHalfUp(6), -2.384853);
            assert.equal(comb(-2.38485255).roundHalfUp(7), -2.3848525);
            assert.equal(comb(-2.38485251).roundHalfUp(7), -2.3848525);
            assert.equal(comb(-2.38485256).roundHalfUp(7), -2.3848526);
            assert.equal(comb(-3.285151515).roundHalfUp(8), -3.28515151);
            assert.equal(comb(-3.285151514).roundHalfUp(8), -3.28515151);
            assert.equal(comb(-3.285151516).roundHalfUp(8), -3.28515152);
            assert.equal(comb(-3.2851515155).roundHalfUp(9), -3.285151515);
            assert.equal(comb(-3.2851515154).roundHalfUp(9), -3.285151515);
            assert.equal(comb(-3.2851515156).roundHalfUp(9), -3.285151516);
            assert.equal(comb(-3.28515151515).roundHalfUp(10), -3.2851515151);
            assert.equal(comb(-3.28515151514).roundHalfUp(10), -3.2851515151);
            assert.equal(comb(-3.28515151516).roundHalfUp(10), -3.2851515152);
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
            assert.equal(comb(0.995).roundHalfUp(2), 1);
            assert.equal(comb(0.535).roundHalfUp(2), 0.54);
            assert.equal(comb(0.225).roundHalfUp(2), 0.23);
            assert.equal(comb(0.185).roundHalfUp(2), 0.19);
            assert.equal(comb(0.385).roundHalfUp(2), 0.39);
            assert.equal(comb(1.385).roundHalfUp(2), 1.39);
            assert.equal(comb(3.385).roundHalfUp(2), 3.39);
            assert.equal(comb(4.385).roundHalfUp(2), 4.39);
            assert.equal(comb(3.475).roundHalfUp(2), 3.48);
            assert.equal(comb(2.3845).roundHalfUp(3), 2.385);
            assert.equal(comb(2.3841).roundHalfUp(3), 2.384);
            assert.equal(comb(2.3846).roundHalfUp(3), 2.385);
            assert.equal(comb(2.38485).roundHalfUp(4), 2.3849);
            assert.equal(comb(2.38481).roundHalfUp(4), 2.3848);
            assert.equal(comb(2.38486).roundHalfUp(4), 2.3849);
            assert.equal(comb(2.384855).roundHalfUp(5), 2.38486);
            assert.equal(comb(2.384851).roundHalfUp(5), 2.38485);
            assert.equal(comb(2.384856).roundHalfUp(5), 2.38486);
            assert.equal(comb(2.3848525).roundHalfUp(6), 2.384853);
            assert.equal(comb(2.3848521).roundHalfUp(6), 2.384852);
            assert.equal(comb(2.3848526).roundHalfUp(6), 2.384853);
            assert.equal(comb(2.38485255).roundHalfUp(7), 2.3848526);
            assert.equal(comb(2.38485251).roundHalfUp(7), 2.3848525);
            assert.equal(comb(2.38485256).roundHalfUp(7), 2.3848526);


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
