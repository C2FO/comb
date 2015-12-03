"use strict";
var base = require("../base"),
    array = base.array,
    string = base.string,
    utils = require("./utils"),
    extend = utils.extend;

var stringMethods = ["style"];
var methods = ["forEach", "map", "filter", "reduce", "reduceRight", "some", "every", "indexOf", "lastIndexOf",
    "zip", "sum", "avg", "sort", "min", "max", "difference", "removeDuplicates", "unique", "rotate",
    "permutations", "transpose", "valuesAt", "union", "intersect", "powerSet", "cartesian", "compact",
    "multiply", "flatten", "pluck", "invoke", "partition"];


module.exports = function (o) {
    extend(o, methods, array);
    extend(o, stringMethods, string);
    return o;
};



