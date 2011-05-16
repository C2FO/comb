var comb = exports;

comb.isString = function(obj) {
    var undef;
    return obj != undef && (typeof obj == "string" || obj instanceof String);
};

/**@namespace String utilities*/
comb.string = {
    /**
     * Pads a string
     *
     * @example
     *
     * comb.string.pad("STR", 5, " ", true) => "STR  "
     * comb.string.pad("STR", 5, "$") => "$$STR"
     *
     * @param {String} string the string to pad
     * @param {Number} length the length of the string when padded
     * @param {String} ch character to pad the string with
     * @param {Boolean} [end=false] if true then the padding is added to the end
     *
     * @returns {String} the padded string
     */
    pad : function(string, length, ch, end) {
        string = "" + string; //check for numbers
        var strLen = string.length;
        while (strLen < length) {
            if (end) {
                string += ch;
            } else {
                string = ch + string;
            }
            strLen++;
        }
        return string;
    },

    /**
     * Formats a string with the specified format
     *
     * @example
     *
     *  comb.string.format("%s, %s", ["Hello", "World"]);
     *  comb.string.format("%s, %s", "Hello", "World");
     *  comb.string.format("{hello}, {world}", {hello : "Hello", world : {"World"});
     *
     * @param {String} str the string to format
     * @param {Object|Array|Arguments...} obj the parameters to replace in the string
     *                                    if an array is passed then the array is used sequentially
     *                                    if an object is passed then the object keys are used
     *                                    if a variable number of args are passed then they are used like an array
     *
     * @returns {String} the formatted string
     */
    format : function(str, obj) {
        if (obj instanceof Array) {
            var i = 0, len = obj.length;
            return str.replace(/%s/g, function() {
                if (i < len) {
                    return obj[i++] || "";
                } else {
                    return "%s";
                }
            });
        } else if (typeof obj == "object") {
            return str.replace(/{(\w+)}/g, function(m, g) {
                return obj[g] || "";
            });
        } else {
            var args = Array.prototype.slice.call(arguments).slice(1);
            return exports.string.format(str, args);
        }
    },

    /**
     * Converts a string to an array
     *
     * @example
     *
     * comb.string.toArray("a|b|c|d", "|") => ["a","b","c","d"]
     * comb.string.toArray("a", "|") => ["a"]
     * comb.string.toArray("", "|") => []
     *
     * @param {String} str the string to parse
     * @param {String} delimeter the delimeter to use
     */
    toArray : function(testStr, delim) {
        var ret = [];
        if (testStr) {
            if (testStr.indexOf(delim) > 0) return testStr.replace(/\s+/g, "").split(delim);
            else return [testStr];
        }
        return ret;
    }
};


