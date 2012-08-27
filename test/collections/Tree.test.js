"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Tree = comb.collections.Tree;


it.describe("A Tree interface", function (it) {
    var methods = ["insert", "remove"];

    var tree = new Tree();
    methods.forEach(function (m) {
        it.describe("#" + m, function (it) {
            it.should("be abstract", function () {
                assert.throws(function () {
                    tree[m]();
                });
            })
        })
    });

}).as(module);

