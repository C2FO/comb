"use strict";
var define = require("../define").define,
    base = require("../base"),
    array = base.array,
    isBoolean = base.isBoolean,
    argsToArray = base.argsToArray,
    comb;

function proxyFunc(name, func, valueOf, scope) {
    return function proxy() {
        comb || (comb = require("../index"));
        var ret = func.apply(scope, [valueOf ? this.valueOf() : this].concat(argsToArray(arguments)));
        if (ret && !base.isBoolean(ret) && ret !== this && !ret["__isExtended__"]) {
            ret = comb(ret);
        }
        return ret;
    };
}


function extend(obj, methods, base, creator, valueOf) {
    valueOf = isBoolean(valueOf) ? valueOf : false;
    array.forEach(methods, function (method) {
        var newFunc, func, m, name;
        if (Array.isArray(method) && method.length === 2) {
            m = method[0];
            name = method[1];
        } else {
            m = name = method;
        }
        Object.defineProperty(obj, name, {
            value: (creator || proxyFunc)(name, base[m], valueOf, base),
            writable: false,
            enumerable: false,
            configurable: true
        });

    });
    return obj;
}


module.exports = {
    proxyFunc: proxyFunc,
    extend: extend
};