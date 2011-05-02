exports.isString = function(obj) {
    var undef;
    return obj != undef && (typeof obj == "string" || obj instanceof String);
};

exports.string = {
    /**
     * Pads a string
     * @param {String} string the string to pad
     * @param {Number} length the length of the string when padded
     * @param {String} ch character to pad the string with
     * @param {Boolean} [end=false] wether or not to pad at the end
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
     * Formats a string
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

    toArray : function(testStr, delim) {
        if (testStr)
            if (testStr.indexOf(delim) > 0) return testStr.replace(/\s+/g, "").split(delim);
            else return [testStr];
    }
};


