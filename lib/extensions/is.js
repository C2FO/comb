"use strict";
var base = require("../base"),
    define = require("../define").define,
    utils = require("./utils"),
    extend = utils.extend;

var methods = [
    "isDefined",
    "isUndefined",
    "isNull",
    "isUndefinedOrNull",
    "isArguments",
    "isObject",
    "isHash",
    "isBoolean",
    "isDate",
    "isEmpty",
    "isArray",
    "isFunction",
    "isInstanceOf",
    "isNumber",
    "isPromiseLike",
    "isRegExp",
    "isString",
    "deepEqual"
];

module.exports = function (o) {
    var valueOf = false, val;
    if (!base.isInstanceOf(o, Object)) {
        /*jshint -W053 */
        if (base.isBoolean(o)) {
            val = new Boolean(o);
            valueOf = true;
        } else if (base.isNumber(o)) {
            val = new Number(o);
            valueOf = true;
        } else if (base.isString(o)) {
            val = new String(o);
            valueOf = true;
        }
    } else {
        val = o;
    }
    var ret = extend(val, methods, base, null, valueOf);
    if (valueOf) {
        Object.defineProperty(ret, "valueOf", {
            value: function () {
                return o;
            },
            writable: false,
            enumerable: false,
            configurable: true
        });
    }
    Object.defineProperty(ret, "eq", {
        value: function (other) {
            return o === other;
        },
        writable: false,
        enumerable: false,
        configurable: true
    });

    Object.defineProperty(ret, "neq", {
        value: function (other) {
            return o !== other;
        },
        writable: false,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ret, "print", {
        value: function () {
            console.log(o);
            return val;
        },
        writable: false,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ret, "__isExtended__", {
        value: true,
        writable: false,
        enumerable: false,
        configurable: true
    });
    return ret;
};