"use strict";
var comb = exports;


/**
 * Tests if something is a regular expression.
 *
 * @example
 *
 * comb.isRegExp(/hello/); //true
 * comb.isRegExp("hello"); //false
 *
 * @param obj the thing to test.
 * @return {Boolean}
 * @static
 * @memberOf comb
 *
 */
function isRegExp(obj) {
    var undef;
    return obj !== undef && obj != null && (obj instanceof RegExp);
}

comb.isRexExp = isRegExp;
comb.isRegExp = isRegExp;

/**
 * @namespace Regeular expression utilities
 *
 */
comb.regexp = {
    /**@lends comb.regexp*/
    /**
     * Escapes a string
     *
     * @param {String} str the string to escape
     * @param {String} [except] characters to ignore
     *
     * @returns {String} the escaped string
     */
    escapeString:function (str, except) {
        return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function (ch) {
            if (except && except.indexOf(ch) !== -1) {
                return ch;
            }
            return "\\" + ch;
        }); // String
    }
};