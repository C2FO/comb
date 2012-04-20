var base = require("./base");

/**
 * Utilities for javascript, optimized for the server environment.
 *
 *
 * @namespace
 */
var comb = exports;
base.merge(exports, base, require("./define"), require("./promise"), require("./plugins"), require("./collections"), require("./logging"));


comb.definePlugin = function (obj) {
    if (comb.isHash(obj)) {
        comb.deepMerge(comb, obj);
    }
    return comb;
};



