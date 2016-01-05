"use strict";
var base = require("../base"),
    define = require("../define").define,
    utils = require("./utils"),
    extend = utils.extend,
    hash = base.hash,
    argsToArray = base.argsToArray,
    comb;

var methods = [
    "hitch",
    "hitchIgnore",
    "bind",
    "bindIgnore",
    "merge",
    "extend",
    "deepMerge"
];
var lastMethod = ["curry"];
var hashMethods = [
    "forEach",
    "filter",
    "invert",
    "values",
    "toArray",
    "omit",
    "pick",
    "keys"
];

module.exports = function (o) {
    comb = comb || (require("../index"));
    extend(o, methods, base);
    extend(o, hashMethods, hash);
    extend(o, lastMethod, base, function (name, func) {
        return function () {
            return comb(func.apply(null, argsToArray(arguments).concat([this])));
        };
    });
    return o;
};

