"use strict";
var base = require("../base"),
    argsToArray = base.argsToArray,
    utils = require("./utils"),
    array = base.array,
    extend = utils.extend,
    comb;

var methods = [
    "hitch",
    "bind",
    "hitchIgnore",
    "bindIgnore",
    "partial",
    "applyFirst",
    "bindFirst",
    "curry",
    "extend"
];
var baseMethods = ["extend"];

module.exports = function (o) {
    comb = comb || (require("../index"));
    extend(o, methods, base, function (name, func) {
        var ret;
        if (name !== 'partial' && name !== "applyFirst") {
            ret = function (arg1) {
                var args = argsToArray(arguments, 1);
                return comb(func.apply(null, [arg1, this].concat(args)));
            };
        } else {
            ret = function (arg1) {
                return comb(func.apply(null, [this].concat(argsToArray(arguments))));
            };
        }
        return ret;

    });
    extend(o, baseMethods, base);
    return o;
};


