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
    return obj !== undef && obj != null && (typeof obj == "number" || obj instanceof Number);
};

/**
 * @private
 */
var round = Math.round, pow = Math.pow;

/**
 * @namespace Utilities for numbers
 */
comb.number = {
    /**
     * Rounds a number to the specified places.
     *
     *
     * @param {Number} num the number to round.
     * @param {Number} places the number of places to round to.
     */
    round : function(number, places, increment) {
        increment = increment || 1e-20;
        var factor = 10 / (10 * (increment || 10));
        return (Math.ceil(factor * +number) / factor).toFixed(places) * 1; // Number
    }
};