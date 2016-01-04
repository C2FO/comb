"use strict";
var base = require("../base"),
    utils = require("./utils"),
    extend = utils.extend,
    array = base.array;

var methods = [
    ["argsToArray", "toArray"]
];

module.exports = function (o) {
    return extend(o, methods, base);
};


