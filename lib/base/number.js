/**
 * Determines if obj is a number
 *
 * @param {Anything} obj the thing to test if it is a Number
 *
 * @returns {Boolean} true if it is a number false otherwise
 */
exports.isNumber = function(obj) {
    return typeof obj == "number";
};

/**
 * @private
 */
var round = Math.round, pow = Math.pow;
exports.number = {
    /**
     * Rounds a number to the specified places.
     * @augments comb.number
     * @param {Number} num the number to round.
     * @param {Number} places the number of places to round to.
     */
    round : function(num, places) {
        places = (places || 0);
        places = round((places > 5 ? 5 : (places < -5 ? -5 : places)));
        var factor = pow(places, 10);
        return round(number * factor) / factor;
    }
};