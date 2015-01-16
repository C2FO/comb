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
     * Rounds a number half up to the specified places.
     *
     * @example
     *
     * comb.number.round(0.225, 2);     //0.23
     * comb.number.round(10.384, 2);    //10.38
     * comb.number.round(10.386, 2);    //10.39
     * comb.number.round(10.3869, 3);   //10.387
     * comb.number.round(10.3861, 3);   //10.386
     * comb.number.round(10.269019, 5); //10.26902
     *
     * @param {Number} num the number to round.
     * @param {Number} places the number of places to round to.
     */
    round : function(number, places) {
        return this.roundHalfUp(number, places);
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
    },


    /**
     * Rounds a number down up to the specified places.
     *
     * @example
     *
     * comb.number.roundHalfDown(0.225, 2);     //0.22
     * comb.number.roundHalfDown(10.384, 2);    //10.38
     * comb.number.roundHalfDown(10.386, 2);    //10.38
     * comb.number.roundHalfDown(10.3869, 3);   //10.386
     * comb.number.roundHalfDown(10.3861, 3);   //10.386
     * comb.number.roundHalfDown(10.269019, 5); //10.26901
     *
     *
     *
     * @param {Number} num the number to round.
     * @param {Number} places the number of places to round to.
     */
    roundHalfDown: function(num, precision) {
        var multiplier = pow(10, precision);
        return Math.floor(num * multiplier) / multiplier;
    },


    /**
     * Rounds a number half up to the specified places.
     *
     * @example
     *
     * comb.number.roundHalfUp(0.225, 2);     //0.23
     * comb.number.roundHalfUp(10.384, 2);    //10.38
     * comb.number.roundHalfUp(10.386, 2);    //10.39
     * comb.number.roundHalfUp(10.3869, 3);   //10.387
     * comb.number.roundHalfUp(10.3861, 3);   //10.386
     * comb.number.roundHalfUp(10.269019, 5); //10.26902
     *
     * @param {Number} num the number to round.
     * @param {Number} places the number of places to round to.
     */
    roundHalfUp: function(num, precision) {
        var multiplier = pow(10, precision),
            numMod = parseInt((num * multiplier), 10),
            lastDigit = parseInt(num * (multiplier * 10), 10) - (numMod * 10);
        if (lastDigit >= 5) {
            numMod += 1;
        }
        return numMod / multiplier;
    }
};