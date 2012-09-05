var comb = exports, date,
    misc = require("./misc"),
    object = require("./object"),
    isHash = object.isHash;

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
    var undef;
    return obj != undef && (typeof obj == "string" || obj instanceof String);
}

comb.isString = isString;

var FORMAT_REGEX = /%((?:-?\+?.?\d*)?|(?:\[[^\[|\]]*\]))?([sjdDZ])/g;
var INTERP_REGEX = /{(?:\[([^\[|\]]*)\])?(\w+)}/g;
var STR_FORMAT = /(-?)(\+?)([A-Z|a-z|\W]?)([1-9][0-9]*)?$/;
var OBJECT_FORMAT = /([1-9][0-9]*)$/g;

var formatString = function (string, format) {
    var match = format.match(STR_FORMAT), ret = string, cString = comb.string;
    if (match) {
        var isLeftJustified = match[1], padChar = match[3], width = match[4];
        if (width) {
            width = parseInt(width);
            if (ret.length < width) {
                ret = cString.pad(ret, width, padChar, isLeftJustified);
            } else {
                ret = cString.truncate(ret, width);
            }
        }
    }
    return ret;
};

var formatNumber = function (number, format) {
    if (typeof number == "number") {
        var cString = comb.string, ret = "" + number;
        var match = format.match(STR_FORMAT);
        if (match) {
            var isLeftJustified = match[1], signed = match[2], padChar = match[3], width = match[4];
            if (signed) {
                ret = (number > 0 ? "+" : "") + ret;
            }
            if (width) {
                width = parseInt(width);
                if (ret.length < width) {
                    ret = cString.pad(ret, width, padChar || "0", isLeftJustified);
                } else {
                    ret = cString.truncate(ret, width);
                }
            }

        }
    } else {
        throw new Error("comb.string.format : when using %d the parameter must be a number!");
    }
    return ret;
};

var formatObject = function (object, format) {
    var ret, match = format.match(OBJECT_FORMAT), spacing = 0;
    if (match) {
        spacing = parseInt(match[0]);
        if (isNaN(spacing)) spacing = 0;
    }
    try {
        ret = JSON.stringify(object, null, spacing);
    } catch (e) {
        throw new Error("comb.string.format : Unable to parse json from ", object);
    }
    return ret;
};


var styles = {
    //styles
    bold:1,
    bright:1,
    italic:3,
    underline:4,
    blink:5,
    inverse:7,
    crossedOut:9,

    red:31,
    green:32,
    yellow:33,
    blue:34,
    magenta:35,
    cyan:36,
    white:37,

    redBackground:41,
    greenBackground:42,
    yellowBackground:43,
    blueBackground:44,
    magentaBackground:45,
    cyanBackground:46,
    whiteBackground:47,

    encircled:52,
    overlined:53,
    grey:90,
    black:90
};

/**@namespace comb characters*/
comb.characters = {
    /**@lends comb.characters*/

    /**
     * ☺
     */
    SMILEY:"☺",
    /**
     * ☻
     */
    SOLID_SMILEY:"☻",

    /**
     * ♥
     */
    HEART:"♥",
    /**
     * ♦
     */
    DIAMOND:"♦",
    /**
     * ♣
     */
    CLOVE:"♣",
    /**
     * ♠
     */
    SPADE:"♠",
    /**
     * •
     */
    DOT:"•",
    /**
     * ◘
     */
    SQUARE_CIRCLE:"◘",
    /**
     * ○
     */
    CIRCLE:"○",
    /**
     * ◙
     */
    FILLED_SQUARE_CIRCLE:"◙",
    /**
     * ♂
     */
    MALE:"♂",
    /**
     * ♀
     */
    FEMALE:"♀",
    /**
     * ♪
     */
    EIGHT_NOTE:"♪",
    /**
     * ♫
     */
    DOUBLE_EIGHT_NOTE:"♫",
    /**
     * ☼
     */
    SUN:"☼",
    /**
     * ►
     */
    PLAY:"►",
    /**
     * ◄
     */
    REWIND:"◄",
    /**
     * ↕
     */
    UP_DOWN:"↕",
    /**
     * ¶
     */
    PILCROW:"¶",
    /**
     * §
     */
    SECTION:"§",
    /**
     * ▬
     */
    THICK_MINUS:"▬",
    /**
     * ↨
     */
    SMALL_UP_DOWN:"↨",
    /**
     * ↑
     */
    UP_ARROW:"↑",
    /**
     * ↓
     */
    DOWN_ARROW:"↓",
    /**
     * →
     */
    RIGHT_ARROW:"→",
    /**
     * ←
     */
    LEFT_ARROW:"←",
    /**
     * ∟
     */
    RIGHT_ANGLE:"∟",
    /**
     * ↔
     */
    LEFT_RIGHT_ARROW:"↔",
    /**
     * ▲
     */
    TRIANGLE:"▲",
    /**
     * ▼
     */
    DOWN_TRIANGLE:"▼",

    /**
     * ⌂
     */
    HOUSE:"⌂",
    /**
     * Ç
     */
    C_CEDILLA:"Ç",
    /**
     * ü
     */
    U_UMLAUT:"ü",
    /**
     * é
     */
    E_ACCENT:"é",
    /**
     * â
     */
    A_LOWER_CIRCUMFLEX:"â",
    /**
     * ä
     */
    A_LOWER_UMLAUT:"ä",
    /**
     * à
     */
    A_LOWER_GRAVE_ACCENT:"à",
    /**
     * å
     */
    A_LOWER_CIRCLE_OVER:"å",
    /**
     * ç
     */
    C_LOWER_CIRCUMFLEX:"ç",
    /**
     * ê
     */
    E_LOWER_CIRCUMFLEX:"ê",
    /**
     * ë
     */
    E_LOWER_UMLAUT:"ë",
    /**
     * è
     */
    E_LOWER_GRAVE_ACCENT:"è",
    /**
     * ï
     */
    I_LOWER_UMLAUT:"ï",
    /**
     * î
     */
    I_LOWER_CIRCUMFLEX:"î",
    /**
     * ì
     */
    I_LOWER_GRAVE_ACCENT:"ì",
    /**
     * Ä
     */
    A_UPPER_UMLAUT:"Ä",
    /**
     * Å
     */
    A_UPPER_CIRCLE:"Å",
    /**
     * É
     */
    E_UPPER_ACCENT:"É",
    /**
     * æ
     */
    A_E_LOWER:"æ",
    /**
     * Æ
     */
    A_E_UPPER:"Æ",
    /**
     * ô
     */
    O_LOWER_CIRCUMFLEX:"ô",
    /**
     * ö
     */
    O_LOWER_UMLAUT:"ö",
    /**
     * ò
     */
    O_LOWER_GRAVE_ACCENT:"ò",
    /**
     * û
     */
    U_LOWER_CIRCUMFLEX:"û",
    /**
     * ù
     */
    U_LOWER_GRAVE_ACCENT:"ù",
    /**
     * ÿ
     */
    Y_LOWER_UMLAUT:"ÿ",
    /**
     * Ö
     */
    O_UPPER_UMLAUT:"Ö",
    /**
     * Ü
     */
    U_UPPER_UMLAUT:"Ü",

    /**
     * ¢
     */
    CENTS:"¢",
    /**
     * £
     */
    POUND:"£",
    /**
     * ¥
     */
    YEN:"¥",
    /**
     * ¤
     */
    CURRENCY:"¤",

    /**
     * ₧
     */
    PTS:"₧",
    /**
     * ƒ
     */
    FUNCTION:"ƒ",
    /**
     * á
     */
    A_LOWER_ACCENT:"á",
    /**
     * í
     */
    I_LOWER_ACCENT:"í",
    /**
     * ó
     */
    O_LOWER_ACCENT:"ó",
    /**
     * ú
     */
    U_LOWER_ACCENT:"ú",
    /**
     * ñ
     */
    N_LOWER_TILDE:"ñ",
    /**
     * Ñ
     */
    N_UPPER_TILDE:"Ñ",
    /**
     * ª
     */
    A_SUPER:"ª",
    /**
     * º
     */
    O_SUPER:"º",
    /**
     * ¿
     */
    UPSIDEDOWN_QUESTION:"¿",
    /**
     * ⌐
     */
    SIDEWAYS_L:"⌐",
    /**
     * ¬
     */
    NEGATION:"¬",
    /**
     * ½
     */
    ONE_HALF:"½",
    /**
     * ¼
     */
    ONE_FOURTH:"¼",
    /**
     * ¡
     */
    UPSIDEDOWN_EXCLAMATION:"¡",
    /**
     * «
     */
    DOUBLE_LEFT:"«",
    /**
     * »
     */
    DOUBLE_RIGHT:"»",
    /**
     * ░
     */
    LIGHT_SHADED_BOX:"░",
    /**
     * ▒
     */
    MEDIUM_SHADED_BOX:"▒",
    /**
     * ▓
     */
    DARK_SHADED_BOX:"▓",
    /**
     * │
     */
    VERTICAL_LINE:"│",

    /**
     * ┤
     */
    MAZE__SINGLE_RIGHT_T:"┤",
    /**
     * ┐
     */
    MAZE_SINGLE_RIGHT_TOP:"┐",
    /**
     * ┘
     */
    MAZE_SINGLE_RIGHT_BOTTOM_SMALL:"┘",
    /**
     * ┌
     */
    MAZE_SINGLE_LEFT_TOP_SMALL:"┌",
    /**
     * └
     */
    MAZE_SINGLE_LEFT_BOTTOM_SMALL:"└",
    /**
     * ├
     */
    MAZE_SINGLE_LEFT_T:"├",
    /**
     * ┴
     */
    MAZE_SINGLE_BOTTOM_T:"┴",
    /**
     * ┬
     */
    MAZE_SINGLE_TOP_T:"┬",
    /**
     * ┼
     */
    MAZE_SINGLE_CENTER:"┼",
    /**
     * ─
     */
    MAZE_SINGLE_HORIZONTAL_LINE:"─",

    /**
     * ╡
     */
    MAZE_SINGLE_RIGHT_DOUBLECENTER_T:"╡",
    /**
     * ╛
     */
    MAZE_SINGLE_RIGHT_DOUBLE_BL:"╛",
    /**
     * ╢
     */
    MAZE_SINGLE_RIGHT_DOUBLE_T:"╢",
    /**
     * ╖
     */
    MAZE_SINGLE_RIGHT_DOUBLEBOTTOM_TOP:"╖",
    /**
     * ╕
     */
    MAZE_SINGLE_RIGHT_DOUBLELEFT_TOP:"╕",
    /**
     * ╞
     */
    MAZE_SINGLE_LEFT_DOUBLE_T:"╞",

    /**
     * ╧
     */
    MAZE_SINGLE_BOTTOM_DOUBLE_T:"╧",
    /**
     * ╤
     */
    MAZE_SINGLE_TOP_DOUBLE_T:"╤",
    /**
     * ╥
     */
    MAZE_SINGLE_TOP_DOUBLECENTER_T:"╥",
    /**
     * ╨
     */
    MAZE_SINGLE_BOTTOM_DOUBLECENTER_T:"╨",
    /**
     * ╘
     */
    MAZE_SINGLE_LEFT_DOUBLERIGHT_BOTTOM:"╘",
    /**
     * ╒
     */
    MAZE_SINGLE_LEFT_DOUBLERIGHT_TOP:"╒",
    /**
     * ╓
     */
    MAZE_SINGLE_LEFT_DOUBLEBOTTOM_TOP:"╓",
    /**
     * ╙
     */
    MAZE_SINGLE_LEFT_DOUBLETOP_BOTTOM:"╙",
    /**
     * Γ
     */
    MAZE_SINGLE_LEFT_TOP:"Γ",
    /**
     * ╜
     */
    MAZE_SINGLE_RIGHT_BOTTOM:"╜",
    /**
     * ╟
     */
    MAZE_SINGLE_LEFT_CENTER:"╟",
    /**
     * ╫
     */
    MAZE_SINGLE_DOUBLECENTER_CENTER:"╫",
    /**
     * ╪
     */
    MAZE_SINGLE_DOUBLECROSS_CENTER:"╪",


    /**
     * ╣
     */
    MAZE_DOUBLE_LEFT_CENTER:"╣",
    /**
     * ║
     */
    MAZE_DOUBLE_VERTICAL:"║",
    /**
     * ╗
     */
    MAZE_DOUBLE_RIGHT_TOP:"╗",
    /**
     * ╝
     */
    MAZE_DOUBLE_RIGHT_BOTTOM:"╝",
    /**
     * ╚
     */
    MAZE_DOUBLE_LEFT_BOTTOM:"╚",
    /**
     * ╔
     */
    MAZE_DOUBLE_LEFT_TOP:"╔",
    /**
     * ╩
     */
    MAZE_DOUBLE_BOTTOM_T:"╩",
    /**
     * ╦
     */
    MAZE_DOUBLE_TOP_T:"╦",
    /**
     * ╠
     */
    MAZE_DOUBLE_LEFT_T:"╠",
    /**
     * ═
     */
    MAZE_DOUBLE_HORIZONTAL:"═",
    /**
     * ╬
     */
    MAZE_DOUBLE_CROSS:"╬",

    /**
     * █
     */
    SOLID_RECTANGLE:"█",
    /**
     * ▌
     */
    THICK_LEFT_VERTICAL:"▌",
    /**
     * ▐
     */
    THICK_RIGHT_VERTICAL:"▐",
    /**
     * ▄
     */
    SOLID_SMALL_RECTANGLE_BOTTOM:"▄",
    /**
     * ▀
     */
    SOLID_SMALL_RECTANGLE_TOP:"▀",

    /**
     * Φ
     */
    PHI_UPPER:"Φ",

    /**
     * ∞
     */
    INFINITY:"∞",
    /**
     * ∩
     */
    INTERSECTION:"∩",
    /**
     * ≡
     */
    DEFINITION:"≡",
    /**
     * ±
     */
    PLUS_MINUS:"±",
    /**
     * ≥
     */
    GT_EQ:"≥",
    /**
     * ≤
     */
    LT_EQ:"≤",
    /**
     * ⌠
     */
    THEREFORE:"⌠",
    /**
     * ∵
     */
    SINCE:"∵",
    /**
     * ∄
     */
    DOESNOT_EXIST:"∄",
    /**
     * ∃
     */
    EXISTS:"∃",
    /**
     * ∀
     */
    FOR_ALL:"∀",
    /**
     * ⊕
     */
    EXCLUSIVE_OR:"⊕",
    /**
     * ⌡
     */
    BECAUSE:"⌡",
    /**
     * ÷
     */
    DIVIDE:"÷",
    /**
     * ≈
     */
    APPROX:"≈",

    /**
     * °
     */
    DEGREE:"°",
    /**
     * ∙
     */
    BOLD_DOT:"∙",
    /**
     * ·
     */
    DOT_SMALL:"·",
    /**
     * √
     */
    CHECK:"√",
    /**
     * ✗
     */
    ITALIC_X:"✗",
    /**
     * ⁿ
     */
    SUPER_N:"ⁿ",
    /**
     * ²
     */
    SQUARED:"²",
    /**
     * ³
     */
    CUBED:"³",
    /**
     * ■
     */
    SOLID_BOX:"■",
    /**
     * ‰
     */
    PERMILE:"‰",
    /**
     * ®
     */
    REGISTERED_TM:"®",
    /**
     * ©
     */
    COPYRIGHT:"©",
    /**
     * ™
     */
    TRADEMARK:"™",

    /**
     * β
     */
    BETA:"β",
    /**
     * γ
     */
    GAMMA:"γ",
    /**
     * ζ
     */
    ZETA:"ζ",
    /**
     * η
     */
    ETA:"η",
    /**
     * ι
     */
    IOTA:"ι",
    /**
     * κ
     */
    KAPPA:"κ",
    /**
     * λ
     */
    LAMBDA:"λ",
    /**
     * ν
     */
    NU:"ν",
    /**
     * ξ
     */
    XI:"ξ",
    /**
     * ο
     */
    OMICRON:"ο",
    /**
     * ρ
     */
    RHO:"ρ",
    /**
     * υ
     */
    UPSILON:"υ",
    /**
     * φ
     */
    CHI_LOWER:"φ",
    /**
     * χ
     */
    CHI_UPPER:"χ",
    /**
     * ψ
     */
    PSI:"ψ",
    /**
     * α
     */
    ALPHA:"α",
    /**
     * ß
     */
    ESZETT:"ß",
    /**
     * π
     */
    PI:"π",
    /**
     * Σ
     */
    SIGMA_UPPER:"Σ",
    /**
     * σ
     */
    SIGMA_LOWER:"σ",
    /**
     * µ
     */
    MU:"µ",
    /**
     * τ
     */
    TAU:"τ",
    /**
     * Θ
     */
    THETA:"Θ",
    /**
     * Ω
     */
    OMEGA:"Ω",
    /**
     * δ
     */
    DELTA:"δ",
    /**
     * φ
     */
    PHI_LOWER:"φ",
    /**
     * ε
     */
    EPSILON:"ε"


};

/**@namespace String utilities*/
comb.string = {
    /**@lends comb.string*/

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
     */
    pad:function (string, length, ch, end) {
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
    },

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
     */
    truncate:function (string, length, end) {
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
            ret = comb.string.truncate("" + ret, length);
        }
        return ret;
    },

    /**
     * Formats a string with the specified format
     *
     * @example
     *
     *  var format = comb.string.format;
     *
     *  format("%s, %s", ["Hello", "World"]) => "Hello, World";
     *  format("%[ 10]s, %[- 10]s", ["Hello", "World"])
     *      => "     Hello, World     ";
     *  format("%-!10s, %#10s, %10s and %-10s",
     *                          "apple", "orange", "bananas", "watermelons")
     *      => "apple!!!!!, ####orange,    bananas and watermelon"
     *  format("%+d, %+d, %10d, %-10d, %-+#10d, %10d",
     *                          1,-2, 1, 2, 3, 100000000000)
     *      => "+1, -2, 0000000001, 2000000000, +3########, 1000000000"
     *  format("%[h:mm a]D", [date]) => 7:32 PM - local -
     *  format("%[h:mm a]Z", [date]) => 12:32 PM - UTC
     *  //When using object formats they must be in an array otherwise
     *  //format will try to interpolate the properties into the string.
     *  format("%j", [{a : "b"}])
     *      => '{"a":"b"}'
     *  format("%1j, %4j", [{a : "b"}, {a : "b"}])
     *      => '{\n "a": "b"\n},\n{\n    "a": "b"\n}'
     *  format("{hello}, {world}", {hello : "Hello", world : "World")
     *      => "Hello, World";
     *  format({[-s10]apple}, {[%#10]orange}, {[10]banana} and {[-10]watermelons}",
     *                      {
     *                          apple : "apple",
     *                          orange : "orange",
     *                          banana : "bananas",
     *                          watermelons : "watermelons"
     *        });
     *      => applesssss, ####orange,    bananas and watermelon
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
     *              <li>- : left justified</li>
     *              <li>+ : signed number</li>
     *              <li>Char : padding character <b>Excludes d,j,s</b></li>
     *              <li>Number : width</li>
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
     */
    format:function (str, obj) {
        !date && (date = require("./date"));
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
                if (m == "%s" || m == "%d" || m == "%D") {
                    //fast path!
                    ret = replacer + "";
                } else if (m == "%Z") {
                    ret = replacer.toUTCString();
                } else if (m == "%j") {
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
                            ret = date.date.format(replacer, format);
                            break;
                        case "Z":
                            ret = date.date.format(replacer, format, true);
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
                        } else if (typeof value == "number") {
                            return formatNumber(value, format);
                        } else if (date.isDate(value)) {
                            return date.date.format(value, format);
                        } else if (typeof value == "object") {
                            return formatObject(value, format);
                        }
                    } else {
                        return "" + value;
                    }
                }
                return m;
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
    toArray:function (testStr, delim) {
        var ret = [];
        if (testStr) {
            if (testStr.indexOf(delim) > 0) return testStr.replace(/\s+/g, "").split(delim);
            else return [testStr];
        }
        return ret;
    },

    /**
     * Returns a string duplicated n times;
     *
     * @example
     *
     * comb.string.multiply("HELLO", 5) => "HELLOHELLOHELLOHELLOHELLO"
     *
     *
     */
    multiply:function (str, times) {
        var ret = [];
        if (times) {
            for (var i = 0; i < times; i++) {
                ret.push(str);
            }
        }
        return ret.join("");
    },

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
     */
    style:function (str, options) {
        var ret = str;
        if (options) {
            if (ret instanceof Array) {
                ret = ret.map(function (s) {
                    return comb.string.style(s, options);
                })
            } else if (options instanceof Array) {
                options.forEach(function (option) {
                    ret = comb.string.style(ret, option);
                });
            } else if (options in styles) {
                ret = '\x1B[' + styles[options] + 'm' + str + '\x1B[0m';
            }
        }
        return ret;
    }
};

