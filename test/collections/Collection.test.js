"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Collection = comb.collections.Collection;


it.describe("comb.collections.Collection", function (it) {


    var collection = new Collection();
    ["concat", "join", "slice", "toString", "indexOf", "lastIndexOf"].forEach(function (m) {
        it.describe("#" + m, function (it) {
            it.should("be a method", function () {
                assert.isFunction(collection[m]);
            });

            it.should("throw an error if invoked", function () {
                assert.throws(function () {
                    collection[m]();
                })
            })
        })
    });

}).as(module);
