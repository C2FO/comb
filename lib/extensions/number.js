"use strict";
var base = require("../base"),
    define = require("../define").define,
    utils = require("./utils"),
    extend = utils.extend,
    number = base.number,
    string = base.string;

var methods = [
    "round",
    "roundCeil",
    "roundHalfDown",
    "roundHalfUp"
];

module.exports = function (o) {
    extend(o, methods, number, null, true);
    return o;
};

