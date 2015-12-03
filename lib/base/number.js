"use strict";
var comb = exports;

/**
 * Determines if obj is a number
 *
 * @param {Anything} obj the thing to test if it is a Number
 *
 * @returns {Boolean} true if it is a number false otherwise
 */
comb.isNumber = function(obj) {
    var undef;
    return obj !== undef && obj != null && (typeof obj === "number" || obj instanceof Number);
};

/**
 * @private
 */
var round = Math.round, pow = Math.pow;


/**
 * Rounds a number to the specified places, rounding up.
 *
 * @example
 * comb.number.roundCeil(10.000001, 2); //10.01
 * comb.number.roundCeil(10.000002, 5); //10.00001
 * comb.number.roundCeil(10.0003, 3); //10.001
 * comb.number.roundCeil(10.0004, 2); //10.01
 * comb.number.roundCeil(10.0005, 3); //10.001
 * comb.number.roundCeil(10.0002, 2); //10.01
 *
 * @param {Number} num the number to round.
 * @param {Number} precision the number of places to round to.
 * @static
 * @memberOf comb.number
 */
function roundCeil(num, precision){
    return Math.ceil(num * Math.pow(10, precision))/Math.pow(10, precision);
}


/**
 * Rounds a number half down to the specified places.
 * @example
 *
 * comb.number.roundHalfDown(0.225, 2);     //0.22
 * comb.number.roundHalfDown(10.384, 2);    //10.38
 * comb.number.roundHalfDown(10.386, 2);    //10.38
 * comb.number.roundHalfDown(10.3869, 3);   //10.386
 * comb.number.roundHalfDown(10.3861, 3);   //10.386
 * comb.number.roundHalfDown(10.269019, 5); //10.26901
 *
 * @param {Number} num the number to round.
 * @param {Number} precision the number of places to round to.
 * @static
 * @memberOf comb.number
 */
function roundHalfDown(num, precision) {
    var multiplier = pow(10, precision);
    return Math.floor(num * multiplier) / multiplier;
}


/**
 * Rounds a number half up to the specified places.
 * @example
 *
 * comb.number.roundHalfUp(0.225, 2);     //0.23
 * comb.number.roundHalfUp(10.384, 2);    //10.38
 * comb.number.roundHalfUp(10.386, 2);    //10.39
 * comb.number.roundHalfUp(10.3869, 3);   //10.387
 * comb.number.roundHalfUp(10.3861, 3);   //10.386
 * comb.number.roundHalfUp(10.269019, 5); //10.26902
 * comb.number.roundHalfUp(-2.384, 2);    //-2.38
 * comb.number.roundHalfUp(-2.385, 2);    //-2.38
 * comb.number.roundHalfUp(-2.386, 2);    //-2.39
 *
 * @param {Number} num the number to round.
 * @param {Number} precision the number of places to round to.
 * @static
 * @memberOf comb.number
 */
function roundHalfUp(num, precision) {
    var multiplier = pow(10, precision),
        numMod = parseInt((num * multiplier), 10),
        lastDigit = parseInt(num * (multiplier * 10), 10) - (numMod * 10);
    if (lastDigit < -5) {
        numMod -= 1;
    } else if (lastDigit >= 5) {
        numMod += 1;
    }
    return numMod / multiplier;
}


/**
 * @namespace Utilities for numbers
 *
 * The `comb.number` namespace can be used to decorate numbers with additional chainable functionality
 * @ignoreCode
 */
comb.number = {
    round: roundHalfUp,
    roundCeil: roundCeil,
    roundHalfDown: roundHalfDown,
    roundHalfUp: roundHalfUp
};