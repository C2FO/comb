"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Iterable = comb.collections.Iterable;


it.describe("comb.collections.Iterable", function (it) {

    var iter = new Iterable();
        ["filter", "forEach", "every", "map", "some", "reduce", "reduceRight"].forEach(function (m) {
        it.describe("#" + m, function (it) {

            it.should("be a function", function () {
                assert.isFunction(iter[m]);
            });

            it.should("throw an error if invoked", function () {
                assert.throws(function () {
                    iter[m]();
                });
            })

        });
    });

}).as(module);
