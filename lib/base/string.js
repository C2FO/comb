"use strict";
var comb = exports, date,
    misc = require("./misc"),
    object = require("./object"),
    round = require("./number").number.round,
    isHash = object.isHash,
    pSlice = Array.prototype.slice,
    toStr = Object.prototype.toString,
    abs = Math.abs;

function getDate() {
    return (date || (date = require("./date")));
}

/**
 * Truncates a string to the specified length.
 * @example
 *
 * //from the beginning
 * comb.string.truncate("abcdefg", 3) => "abc";
 * //from the end
 * comb.string.truncate("abcdefg", 3,true) => "efg"
 * //omit the length
 * comb.string.truncate("abcdefg") => "abcdefg"
 *
 * @param {String} string the string to truncate
 * @param {Number} [length = -1] the max length of the string, if the string is
 *                              shorter than the length then the string is returned.
 * @param {Boolean} [end=false] truncate starting at the end of the string
 *
 * @return {String} the truncated string.
 * @memberOf comb.string
 * @static
 */
function truncate(string, length, end) {
    var ret = string;
    if (comb.isString(ret)) {
        if (string.length > length) {
            if (end) {
                var l = string.length;
                ret = string.substring(l - length, l);
            } else {
                ret = string.substring(0, length);
            }
        }
    } else {
        ret = truncate("" + ret, length);
    }
    return ret;
}

/**
 * Escapes an HTML string by replacing <>&" characters.
 *
 * @example
 * comb.string.escapeHtml('<script>alert("test")</script>'); // &lt;script&gt;alert("test")&lt;/script&gt;
 *
 * @param {String} str The string to escape.
 * @memberOf comb.string
 * @static
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

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
 * @param {String} [ch= " "] character to pad the string with
 * @param {Boolean} [end=false] if true then the padding is added to the end
 *
 * @returns {String} the padded string
 * @memberOf comb.string
 * @static
 */
function pad(string, length, ch, end) {
    string = "" + string; //check for numbers
    ch = ch || " ";
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
}

/**
 * Tests if something is a string.
 *
 * @example
 *
 * comb.isString("true") //true
 * comb.isString(true) //false
 *
 * @param obj the thing to test
 * @return {Boolean} returns true if the argument is a string.
 * @static
 * @memberOf comb
 */
function isString(obj) {
    return toStr.call(obj) === '[object String]';
}

comb.isString = isString;

var FORMAT_REGEX = /%((?:-?[\+| ]?.?\d*(?:\.\d+)*)?|(?:\[[^\[|\]]*\]))?([sjdDZ])/g;
var INTERP_REGEX = /{(?:\[([^\[|\]]*)\])?(\w+)}/g;
var STR_FORMAT = /(-?)(\+?)([A-Z|a-z|\W]?)([1-9][0-9]*)?$/;
var NUMBER_FORMAT = /(-?)([\+| ]?)([^\.1-9])?([1-9][0-9]*)?(\.[1-9][0-9]*)?$/;
var OBJECT_FORMAT = /([1-9][0-9]*)$/g;

function formatString(string, format) {
    var match = format.match(STR_FORMAT), ret = string;
    if (match) {
        var isLeftJustified = match[1], padChar = match[3], width = match[4];
        if (width) {
            width = parseInt(width, 10);
            if (ret.length < width) {
                ret = pad(ret, width, padChar, isLeftJustified);
            } else {
                ret = truncate(ret, width);
            }
        }
    }
    return ret;
}

function formatNumber(number, format) {
    var ret = "";
    if (typeof number === "number") {
        ret = "" + abs(number);
        var match = format.match(NUMBER_FORMAT);
        if (match) {
            var isLeftJustified = match[1], signed = (number < 0 ? '-' : match[2]), padChar = match[3] || ' ', width = match[4], precision = match[5];
            if (precision) {
                precision = parseInt(precision.replace(/^\./, ""), 10);
                ret = round(abs(number), precision) + "";
                //check and ensure we have padding zeros
                var split = ret.split(".");
                if (split.length === 1) {
                    ret = [split[0], pad("0", precision, "0", true)].join(".");
                } else if (split[1].length < precision) {
                    ret = [split[0], pad(split[1], precision, "0", true)].join(".");
                }
            }
            if (padChar === ' ') {
                ret = signed + ret;
                signed = false;
            }
            if (width) {
                width = parseInt(width, 10);
                if (signed) {
                    width--;
                }
                if (ret.length < width) {
                    ret = pad(ret, width, padChar || " ", isLeftJustified);
                } else {
                    ret = truncate(ret, width);
                }
            }
            if (signed) {
                ret = signed + ret;
            }

        }
    } else {
        throw new Error("comb.string.format : when using %d the parameter must be a number!");
    }
    return ret;
}

function formatObject(object, format) {
    var ret, match = format.match(OBJECT_FORMAT), spacing = 0;
    if (match) {
        spacing = parseInt(match[0], 10);
        if (isNaN(spacing)) {
            spacing = 0;
        }
    }
    try {
        ret = JSON.stringify(object, null, spacing);
    } catch (e) {
        throw new Error("comb.string.format : Unable to parse json from ", object);
    }
    return ret;
}

/**
 * Formats a string with the specified format
 *
 * Format `String`s
 *
 * ```
 * comb.string.format("%s", "Hello"); // "Hello"
 * comb.string.format("%10s", "Hello"); // "     Hello"
 * comb.string.format("%-10s", "Hello"); // ""Hello     ""
 * comb.string.format('%.10s', "Hello"); //".....Hello"
 * comb.string.format('%-!10s', "Hello"); //"Hello!!!!!"
 * comb.string.format("%-.10s%s!", "Hello", "World"); //"Hello.....World!"
 * ```
 *
 * Formatting Numbers
 *
 * ```
 * comb.string.format('%d', 10); //"10"
 *
 * //setting precision
 * comb.string.format('%.2d', 10); //"10.00"
 *
 * //specifying width
 * comb.string.format('%5d', 10); //"   10"
 *
 * //Signed
 * comb.string.format('%+d', 10);  //"+10"
 * comb.string.format('%+d', -10); //"-10"
 *
 * comb.string.format('% d', 10);  //" 10"
 * comb.string.format('% d', -10); //"-10"
 *
 * //width
 * comb.string.format('%5d', 10); //"   10"
 *
 * //width and precision
 * comb.string.format('%6.2d', 10); //" 10.00"
 *
 * //signed, width and precision
 * comb.string.format('%+ 7.2d', 10);  //" +10.00"
 * comb.string.format('%+ 7.2d', -10); //" -10.00"
 * comb.string.format('%+07.2d', 10);  //"+010.00"
 * comb.string.format('%+07.2d', -10); //"-010.00"
 * comb.string.format('%  7.2d', 10);  //"  10.00"
 * comb.string.format('%  7.2d', -10); //" -10.00"
 * comb.string.format('% 7.2d', 10);   //"  10.00"
 * comb.string.format('% 7.2d', -10);  //" -10.00"
 *
 * //use a 0 as padding
 * comb.string.format('%010d', 10); //"0000000010"
 *
 * //use an ! as padding
 * comb.string.format('%!10d', 10); //"!!!!!!!!10"
 *
 * //left justify signed ! as padding and a width of 10
 * comb.string.format('%-+!10d', 10); //"+10!!!!!!!"
 *
 * ```
 *
 * Formatting dates
 *
 * ```
 * comb.string.format("%[h:mm a]D", new Date(2014, 05, 04, 7,6,1)); // 7:06 AM - local -
 * comb.string.format("%[h:mm a]Z", new Date(2014, 05, 04, 7,6,1)); //12:06 PM - UTC
 * comb.string.format("%[yyyy-MM-dd]D", new Date(2014, 05, 04, 7,6,1)); // 2014-06-04 - local
 * comb.string.format("%[yyyy-MM-dd]Z", new Date(2014, 05, 04, 7,6,1)); // 2014-06-04 - UTC
 * ```
 *
 * Formatting Objects
 *
 * ```
 * //When using object formats they must be in an array otherwise
 * //format will try to interpolate the properties into the string.
 * comb.string.format("%j", [{a : "b"}]) // '{"a":"b"}'
 *
 * //Specifying spacing
 * comb.string.format("%4j", [{a : "b"}]) // '{\n    "a": "b"\n}'
 *
 * ```
 *
 * String interpolation
 *
 * ```
 * comb.string.format("{hello}, {world}", {hello : "Hello", world : "World"); //"Hello, World";
 * comb.string.format("{[.2]min}...{[.2]max}", {min: 1, max: 10}); //"1.00...10.00"
 * ```
 *
 * @param {String} str the string to format, if you want to use a spacing character as padding (other than \\s) then put your format in brackets.
 *  <ol>
 *      <li>String Formats %[options]s</li>
 *          <ul>
 *              <li>- : left justified</li>
 *              <li>Char : padding character <b>Excludes d,j,s</b></li>
 *              <li>Number : width</li>
 *          </ul>
 *      </li>
 *      <li>Number Formats %[options]d</li>
 *          <ul>
 *              <li>`-` : left justified</li>
 *              <li>`+` or `<space>` : signed number if space is used the number will use a extra `<space>` instead of a `+`</li>
 *              <li>`<Char>` : padding character <b>Excludes d,j,s</b></li>
 *              <li>`Number` : width</li>
 *              <li>`.Number`: specify the precision of the number</li>
 *          </ul>
 *      </li>
 *      <li>Object Formats %[options]j</li>
 *          <ul>
 *              <li>Number : spacing for object properties.</li>
 *          </ul>
 *      </li>
 *  </ol>
 *
 *
 * @param {Object|Array|Arguments...} obj the parameters to replace in the string
 *                                    if an array is passed then the array is used sequentially
 *                                    if an object is passed then the object keys are used
 *                                    if a variable number of args are passed then they are used like an array
 *
 * @returns {String} the formatted string
 * @memberOf comb.string
 * @static
 */
function format(str, obj) {

    if (obj instanceof Array) {
        var i = 0, len = obj.length;
        //find the matches
        return str.replace(FORMAT_REGEX, function (m, format, type) {
            var replacer, ret;
            if (i < len) {
                replacer = obj[i++];
            } else {
                //we are out of things to replace with so
                //just return the match?
                return m;
            }
            if (m === "%s" || m === "%d" || m === "%D") {
                //fast path!
                ret = replacer + "";
            } else if (m === "%Z") {
                ret = replacer.toUTCString();
            } else if (m === "%j") {
                try {
                    ret = JSON.stringify(replacer);
                } catch (e) {
                    throw new Error("comb.string.format : Unable to parse json from ", replacer);
                }
            } else {
                format = format.replace(/^\[|\]$/g, "");
                switch (type) {
                case "s":
                    ret = formatString(replacer, format);
                    break;
                case "d":
                    ret = formatNumber(replacer, format);
                    break;
                case "j":
                    ret = formatObject(replacer, format);
                    break;
                case "D":
                    ret = getDate().date.format(replacer, format);
                    break;
                case "Z":
                    ret = getDate().date.format(replacer, format, true);
                    break;
                }
            }
            return ret;
        });
    } else if (isHash(obj)) {
        return str.replace(INTERP_REGEX, function (m, format, value) {
            value = obj[value];
            if (!misc.isUndefined(value)) {
                if (format) {
                    if (comb.isString(value)) {
                        return formatString(value, format);
                    } else if (typeof value === "number") {
                        return formatNumber(value, format);
                    } else if (getDate().isDate(value)) {
                        return getDate().date.format(value, format);
                    } else if (typeof value === "object") {
                        return formatObject(value, format);
                    }
                } else {
                    return "" + value;
                }
            }
            return m;
        });
    } else {
        var args = pSlice.call(arguments).slice(1);
        return format(str, args);
    }
}


var styles = {
    //styles
    bold: 1,
    bright: 1,
    italic: 3,
    underline: 4,
    blink: 5,
    inverse: 7,
    crossedOut: 9,

    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,

    redBackground: 41,
    greenBackground: 42,
    yellowBackground: 43,
    blueBackground: 44,
    magentaBackground: 45,
    cyanBackground: 46,
    whiteBackground: 47,

    encircled: 52,
    overlined: 53,
    grey: 90,
    black: 90
};

/**
 * Styles a string according to the specified styles.
 *
 * @example
 * //style a string red
 * comb.string.style('myStr', 'red');
 * //style a string red and bold
 * comb.string.style('myStr', ['red', bold]);
 *
 * @param {String} str The string to style.
 * @param {String|Array} styles the style or styles to apply to a string.
 *          options include :
 *          <ul>
 *             <li>bold</li>
 *             <li>bright</li>
 *             <li>italic</li>
 *             <li>underline</li>
 *             <li>inverse</li>
 *             <li>crossedOut</li>
 *             <li>blink</li>
 *             <li>red</li>
 *             <li>green</li>
 *             <li>yellow</li>
 *             <li>blue</li>
 *             <li>magenta</li>
 *             <li>cyan</li>
 *             <li>white</li>
 *             <li>redBackground</li>
 *             <li>greenBackground</li>
 *             <li>yellowBackground</li>
 *             <li>blueBackground</li>
 *             <li>magentaBackground</li>
 *             <li>cyanBackground</li>
 *             <li>whiteBackground</li>
 *             <li>grey</li>
 *             <li>black</li>
 *
 *          </ul>
 * @memberOf comb.string
 * @static
 */
function style(str, options) {
    var ret = str;
    if (options) {
        if (ret instanceof Array) {
            ret = ret.map(function (s) {
                return style(s, options);
            });
        } else if (options instanceof Array) {
            options.forEach(function (option) {
                ret = style(ret, option);
            });
        } else if (options in styles) {
            ret = '\x1B[' + styles[options] + 'm' + str + '\x1B[0m';
        }
    }
    return ret;
}

/**
 * Returns a string duplicated n times;
 *
 * @example
 *
 * comb.string.multiply("HELLO", 5) => "HELLOHELLOHELLOHELLOHELLO"
 *
 * @memberOf comb.string
 * @static
 */
function multiply(str, times) {
    var ret = [];
    if (times) {
        for (var i = 0; i < times; i++) {
            ret.push(str);
        }
    }
    return ret.join("");
}

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
 * @memberOf comb.string
 * @static
 */
function toArray(testStr, delim) {
    var ret = [];
    if (testStr) {
        if (testStr.indexOf(delim) > 0) {
            ret = testStr.replace(/\s+/g, "").split(delim);
        } else {
            ret = [testStr];
        }
    }
    return ret;
}


/**@namespace String utilities*/
comb.string = {
    pad: pad,
    truncate: truncate,
    format: format,
    toArray: toArray,
    multiply: multiply,
    style: style,
    escapeHtml: escapeHtml
};