var comb = exports;


comb.isRexExp = function(obj){
    var undef;
    return obj !== undef && obj != null && (obj instanceof RegExp);
};

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
    escapeString : function(str, except) {
        return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch) {
            if (except && except.indexOf(ch) != -1) {
                return ch;
            }
            return "\\" + ch;
        }); // String
    }
};