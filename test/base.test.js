"use strict";
var it = require("it"),
    assert = require("assert"),
    comb = require("../index");

it.describe("comb", function(it){
    it.should("define a plugin", function(){
        comb.definePlugin({a : true});
        assert.isTrue(comb.a);
    });
}).as(module);