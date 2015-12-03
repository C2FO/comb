"use strict";
var base = require("../base"),
    string = base.string,
    date = base.date,
    utils = require("./utils"),
    extend = utils.extend,
    regexp = base.regexp,
    array = base.array,
    argsToArray = base.argsToArray,
    comb;


var methods = ["style", "multiply", "toArray", "format", "truncate", "pad"];
var baseMethods = ["camelize", "underscore", "classify", "pluralize", "singularize", "applyFirst", "bindFirst", "partial"];
var functionMethods = ["hitch", "bind", "hitchIgnore", "bindIgnore","curry"];
var arrayMethods = ["pluck", "invoke"];
var dateMethods = [
    ["parse", "parseDate"]
];
var regexpMethods = [
    ["escapeString", "escape"]
];

module.exports = function (o) {
    comb = comb || (require("../index"));
    extend(o, methods, string, null, true);
    extend(o, baseMethods, base, null, true);
    extend(o, dateMethods, date, null, true);
    extend(o, regexpMethods, regexp, null, true);
    extend(o, arrayMethods, array, function (name, func) {
        return function () {
            return comb(func.apply(null, argsToArray(arguments).concat([this.valueOf()])));
        };
    }, true);
    extend(o, functionMethods, base, function (name, func) {
        return function (arg1) {
            var args = argsToArray(arguments, 1);
            return comb(func.apply(null, [arg1, this.valueOf()].concat(args)));
        };
    });

    return o;
};



