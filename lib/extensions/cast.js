"use strict";
var base = require("../base"),
    define = require("../define").define,
    utils = require("./utils"),
    extend = utils.extend,
    arrayExtension = require("./array"),
    argumentsExtension = require("./arguments"),
    dateExtension = require("./date"),
    functionExtension = require("./function"),
    numberExtension = require("./number"),
    objectExtension = require("./object"),
    stringExtension = require("./string");

var methods = {
    array:function () {
        return arrayExtension(this);
    },

    date:function () {
        return dateExtension(this);
    },
    args:function () {
        return argumentsExtension(this);
    },
    func:function () {
        return functionExtension(this);
    },
    number:function () {
        return numberExtension(this);
    },

    string:function () {
        return stringExtension(this);
    },

    object:function () {
        return objectExtension(this);
    }
};

module.exports = function (o) {
    extend(o, Object.keys(methods), methods, function (name, func) {
        return base.partial(func);
    });
    return o;
};