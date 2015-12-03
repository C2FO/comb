"use strict";
var base = require("../base"),
    define = require("../define").define,
    utils = require("./utils"),
    extend = utils.extend,
    date = base.date,
    string = base.string;

var methods = [
    "add",
    "compare",
    "difference",
    "format",
    "getDaysInMonth",
    "getTimezoneName",
    "isLeapYear",
    "isWeekend"
];

module.exports = function (o) {
    extend(o, methods, date);
    return o;
};




