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
    /**@lends comb.number*/


    /**
     * Rounds a number to the specified places.
     *
     * @example
     *
     * comb.number.round(10.000009, 2); //10
     * comb.number.round(10.000009, 5); //10.00001
     * comb.number.round(10.0009, 3); //10.001
     * comb.number.round(10.0009, 2); //10
     * comb.number.round(10.0009, 3); //10.001
     *
     * @param {Number} num the number to round.
     * @param {Number} places the number of places to round to.
     */
    round : function(number, places, increment) {
        increment = increment || 1e-20;
        var factor = 10 / (10 * (increment || 10));
        return (Math.ceil(factor * +number) / factor).toFixed(places) * 1; // Number
    },


    /**
     * Rounds a number to the specified places, rounding up.
     *
     * @example
     *
     * comb.number.roundCeil(10.000001, 2); //10.01
     * comb.number.roundCeil(10.000002, 5); //10.00001
     * comb.number.roundCeil(10.0003, 3); //10.001
     * comb.number.roundCeil(10.0004, 2); //10.01
     * comb.number.roundCeil(10.0005, 3); //10.001
     * comb.number.roundCeil(10.0002, 2); //10.01
     *
     * @param {Number} num the number to round.
     * @param {Number} places the number of places to round to.
     */
    roundCeil : function(number, places){
         return Math.ceil(number * Math.pow(10, places))/Math.pow(10, places);
    }
};