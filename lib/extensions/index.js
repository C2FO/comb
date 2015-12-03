"use strict";
var base = require("../base"),
    stringExtension = require("./string"),
    functionExtension = require("./function"),
    objectExtension = require("./object"),
    argumentsExtension = require("./arguments"),
    dateExtension = require("./date"),
    isExtension = require("./is"),
    castExtension = require("./cast.js"),
    numberExtension = require("./number"),
    arrayExtension = require("./array");

var TRUE = isExtension(true),
    FALSE = isExtension(false);

function createExtension(obj) {
    if (base.isBoolean(obj)) {
        return obj ? TRUE : FALSE;
    }
    if (!base.isUndefinedOrNull(obj) && !obj.__isExtended__) {
        obj = isExtension(obj);
        obj = castExtension(obj);
        if (obj.isObject()) {
            obj.object();
        }
        if (obj.isArguments()) {
            obj.args();
        }
        if (obj.isArray()) {
            obj.array();
        }
        if (obj.isFunction()) {
            obj.func();
        }
        if (obj.isString()) {
            obj.string();
        }
        if (obj.isDate()) {
            obj.date();
        }
        if (obj.isNumber()) {
            obj.number();
        }
    }
    return obj;
}

exports.createExtension = createExtension;