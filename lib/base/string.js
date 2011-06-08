var comb = exports, date;

comb.isString = function(obj) {
	var undef;
	return obj != undef && (typeof obj == "string" || obj instanceof String);
};

var FORMAT_REGEX = /%([^%|\s]*|(?:\[[^\[|\]]*\]))([sjdD])/g;
var INTERP_REGEX = /{(?:\[([^\[|\]]*)\])?(\w+)}/g;
var STR_FORMAT = /(-?)(\+?)(\w|\W|\s?)([1-9][0-9]*)?$/;
var OBJECT_FORMAT = /([1-9][0-9]*)$/g;

var formatString = function(string, format) {
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

var formatNumber = function(number, format) {
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

var formatObject = function(object, format) {
	var ret,  match = format.match(OBJECT_FORMAT), spacing = 0;
	if (match) {
		spacing = parseInt(match[0]);
		if (isNaN(spacing)) spacing = 0;
	}
	try {
		ret = JSON.stringify(object, null, spacing);
	} catch(e) {
		throw new Error("comb.string.format : Unable to parse json from ", object);
	}
	return ret;
};


var styles = {
	//styles
	bold      : [1,  22],
	bright    : [1,  22],
	italic    : [3,  23],
	underline : [4,  24],
	blink     : [5,  25],
	inverse   : [7,  27],
	crossedOut : [9, 29],

	red       : [31, 39],
	green     : [32, 39],
	yellow    : [33, 39],
	blue      : [34, 39],
	magenta   : [35, 39],
	cyan      : [36, 39],
	white     : [37, 39],

	redBackground       : [41, 49],
	greenBackground     : [42, 49],
	yellowBackground    : [43, 49],
	blueBackground      : [44, 49],
	magentaBackground   : [45, 49],
	cyanBackground      : [46, 49],
	whiteBackground     : [47, 49],

	encircled : [52, 54],
	overlined : [53,55],
	grey      : [90, 39],
	black     : [90, 39]
};

var style = function(str, option) {

};

comb.characters = {
	SMILEY : "☺",
	SOLID_SMILEY : "☻",
	HEART:"♥",
	DIAMOND : "♦",
	CLOVE : "♣",
	SPADE : "♠",
	DOT: "•",
	SQUARE_CIRCLE: "◘",
	CIRCLE: "○",
	FILLED_SQUARE_CIRCLE: "◙",
	MALE : "♂",
	FEMALE : "♀",
	EIGHT_NOTE: "♪",
	DOUBLE_EIGHT_NOTE: "♫",
	SUN : "☼",
	PLAY : "►",
	REWIND : "◄",
	UP_DOWN : "↕",
	PILCROW : "¶",
	SECTION : "§",
	THICK_MINUS : "▬",
	SMALL_UP_DOWN : "↨",
	UP_ARROW : "↑",
	DOWN_ARROW: "↓",
	RIGHT_ARROW : "→",
	LEFT_ARROW: "←",
	RIGHT_ANGLE: "∟",
	LEFT_RIGHT_ARROW: "↔",
	TRIANGLE: "▲",
	DOWN_TRIANGLE: "▼",

	HOUSE : "⌂",
	C_CEDILLA: "Ç",
	U_UMLAUT: "ü",
	E_ACCENT: "é",
	A_LOWER_CIRCUMFLEX: "â",
	A_LOWER_UMLAUT: "ä",
	A_LOWER_GRAVE_ACCENT: "à",
	A_LOWER_CIRCLE_OVER: "å",
	C_LOWER_CIRCUMFLEX: "ç",
	E_LOWER_CIRCUMFLEX: "ê",
	E_LOWER_UMLAUT: "ë",
	E_LOWER_GRAVE_ACCENT: "è",
	I_LOWER_UMLAUT: "ï",
	I_LOWER_CIRCUMFLEX: "î",
	I_LOWER_GRAVE_ACCENT: "ì",
	A_UPPER_UMLAUT: "Ä",
	A_UPPER_CIRCLE: "Å",
	E_UPPER_ACCENT: "É",
	A_E_LOWER: "æ",
	A_E_UPPER: "Æ",
	O_LOWER_CIRCUMFLEX: "ô",
	O_LOWER_UMLAUT: "ö",
	O_LOWER_GRAVE_ACCENT: "ò",
	U_LOWER_CIRCUMFLEX: "û",
	U_LOWER_GRAVE_ACCENT: "ù",
	Y_LOWER_UMLAUT: "ÿ",
	O_UPPER_UMLAUT: "Ö",
	U_UPPER_UMLAUT: "Ü",

	CENTS: "¢",
	POUND: "£",
	YEN: "¥",
	CURRENCY : "¤",

	PTS: "₧",
	FUNCTION: "ƒ",
	A_LOWER_ACCENT: "á",
	I_LOWER_ACCENT: "í",
	O_LOWER_ACCENT: "ó",
	U_LOWER_ACCENT: "ú",
	N_LOWER_TILDE: "ñ",
	N_UPPER_TILDE: "Ñ",
	A_SUPER: "ª",
	O_SUPER: "º",
	UPSIDEDOWN_QUESTION: "¿",
	SIDEWAYS_L : "⌐",
	NEGATION: "¬",
	ONE_HALF : "½",
	ONE_QUARTER: "¼",
	UPSIDEDOWN_EXCLAMATION: "¡",
	DOUBLE_LEFT: "«",
	DOUBLE_RIGHT: "»",
	LIGHT_SHADED_BOX: "░",
	MEDIUM_SHADED_BOX: "▒",
	DARK_SHADED_BOX: "▓",
	VERTICAL_LINE: "│",

	MAZE__SINGLE_RIGHT_T: "┤",
	MAZE_SINGLE_RIGHT_TOP: "┐",
	MAZE_SINGLE_RIGHT_BOTTOM_SMALL: "┘",
	MAZE_SINGLE_LEFT_TOP_SMALL: "┌",
	MAZE_SINGLE_LEFT_BOTTOM_SMALL: "└",
	MAZE_SINGLE_LEFT_T: "├",
	MAZE_SINGLE_BOTTOM_T: "┴",
	MAZE_SINGLE_TOP_T: "┬",
	MAZE_SINGLE_CENTER: "┼",
	MAZE_SINGLE_HORIZONTAL_LINE: "─",

	MAZE_SINGLE_RIGHT_DOUBLECENTER_T: "╡",
	MAZE_SINGLE_RIGHT_DOUBLE_BL: "╛",
	MAZE_SINGLE_RIGHT_DOUBLE_T: "╢",
	MAZE_SINGLE_RIGHT_DOUBLEBOTTOM_TOP: "╖",
	MAZE_SINGLE_RIGHT_DOUBLELEFT_TOP: "╕",
	MAZE_SINGLE_LEFT_DOUBLE_T: "╞",


	MAZE_SINGLE_BOTTOM_DOUBLE_T: "╧",
	MAZE_SINGLE_TOP_DOUBLE_T: "╤",
	MAZE_SINGLE_TOP_DOUBLECENTER_T: "╥",
	MAZE_SINGLE_BOTTOM_DOUBLECENTER_T: "╨",
	MAZE_SINGLE_LEFT_DOUBLERIGHT_BOTTOM: "╘",
	MAZE_SINGLE_LEFT_DOUBLERIGHT_TOP: "╒",
	MAZE_SINGLE_LEFT_DOUBLEBOTTOM_TOP: "╓",
	MAZE_SINGLE_LEFT_DOUBLETOP_BOTTOM: "╙",
	MAZE_SINGLE_LEFT_TOP: "Γ",
	MAZE_SINGLE_RIGHT_BOTTOM: "╜",
	MAZE_SINGLE_LEFT_CENTER: "╟",
	MAZE_SINGLE_DOUBLECENTER_CENTER: "╫",
	MAZE_SINGLE_DOUBLECROSS_CENTER: "╪",



	MAZE_DOUBLE_LEFT_CENTER: "╣",
	MAZE_DOUBLE_VERTICAL: "║",
	MAZE_DOUBLE_RIGHT_TOP: "╗",
	MAZE_DOUBLE_RIGHT_BOTTOM: "╝",
	MAZE_DOUBLE_LEFT_BOTTOM: "╚",
	MAZE_DOUBLE_LEFT_TOP: "╔",
	MAZE_DOUBLE_BOTTOM_T: "╩",
	MAZE_DOUBLE_TOP_T : "╦",
	MAZE_DOUBLE_LEFT_T: "╠",
	MAZE_DOUBLE_HORIZONTAL: "═",
	MAZE_DOUBLE_CROSS: "╬",

	SOLID_RECTANGLE: "█",
	THICK_LEFT_VERTICAL: "▌",
	THICK_RIGHT_VERTICAL: "▐",
	SOLID_SMALL_RECTANGLE_BOTTOM: "▄",
	SOLID_SMALL_RECTANGLE_TOP: "▀",

	PHI_UPPER: "Φ",

	INFINITY: "∞",
	INTERSECTION: "∩",
	DEFINITION: "≡",
	PLUS_MINUS: "±",
	GT_EQ: "≥",
	LT_EQ: "≤",
	THEREFORE: "⌠",
	SINCE : "∵",
	DOESNOT_EXIST : "∄",
	EXISTS : "∃",
	FOR_ALL :"∀",
	EXCLUSIVE_OR : "⊕",
	BECAUSE: "⌡",
	DIVIDE: "÷",
	APPROX: "≈",

	DEGREE: "°",
	BOLD_DOT: "∙",
	DOT_SMALL: "·",
	CHECK: "√",
	ITALIC_X : "✗",
	SUPER_N: "ⁿ",
	SQUARED: "²",
	CUBED : "³",
	SOLID_BOX: "■",
	PERMILE : "‰",

	REGISTERED_TM : "®",
	COPYRIGHT : "©",
	TRADEMARK : "™",


	BETA: "β",
	GAMMA: "γ",
	ZETA: "ζ",
	ETA: "η",
	IOTA: "ι",
	KAPPA: "κ",
	LAMBDA: "λ",
	NU: "ν",
	XI: "ξ",
	OMICRON: "ο",
	RHO: "ρ",
	UPSILON: "υ",
	CHI_LOWER: "φ",
	CHI_UPPER: "χ",
	PSI : "ψ",
	ALPHA: "α",
	ESZETT: "ß",
	PI: "π",
	SIGMA_UPPER: "Σ",
	SIGMA_LOWER: "σ",
	MU: "µ",
	TAU: "τ",
	THETA: "Θ",
	OMEGA: "Ω",
	DELTA: "δ",
	PHI_LOWER: "φ",
	EPSILON: "ε"


}

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
	 * @param {String} [ch= " "] character to pad the string with
	 * @param {Boolean} [end=false] if true then the padding is added to the end
	 *
	 * @returns {String} the padded string
	 */
	pad : function(string, length, ch, end) {
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
	truncate : function(string, length, end) {
		var ret = string;
		if (comb.isString(ret)) {
			if (string.length > length) {
				if (end) {
					var l = string.length;
					ret = string.substring(l - length, l);
				} else {
					;
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
	 *  comb.string.format("%s, %s", ["Hello", "World"]) => "Hello, World";
	 *  comb.string.format("%-!10s, %#10s, %10s and %-10s", "apple", "orange", "bananas", "watermelons")
	 *      => "apple!!!!!, ####orange,    bananas and watermelon"
	 *  comb.string.format("%+d, %+d, %10d, %-10d, %-+#10d, %10d", 1,-2, 1, 2, 3, 100000000000)
	 *      => "+1, -2, 0000000001, 2000000000, +3########, 1000000000"
	 *
	 *  //When using object formats they must be in an array otherwise
	 *  //format will try to interpolate the properties into the string.
	 *  comb.string.format("%j", [{a : "b"}])
	 *      => '{"a":"b"}'
	 *  comb.string.format("%1j, %4j", [{a : "b"}, {a : "b"}])
	 *      => '{\n "a": "b"\n},\n{\n    "a": "b"\n}'
	 *  comb.string.format("{hello}, {world}", {hello : "Hello", world : "World")
	 *      => "Hello, World";
	 *
	 * @param {String} str the string to format
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
	format : function(str, obj) {
		!date && (date = require("./date"));
		if (obj instanceof Array) {
			var i = 0, len = obj.length;
			//find the matches
			return str.replace(FORMAT_REGEX, function(m, format, type) {
				var replacer, ret;
				if (i < len) {
					replacer = obj[i++] || "";
				} else {
					//we are out of things to replace with so
					//just return the match?
					return m;
				}
				if (m == "%s" || m == "%d" || m == "%D") {
					//fast path!
					ret = replacer;
				} else if (m == "%j") {
					try {
						ret = JSON.stringify(replacer);
					} catch(e) {
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
								console.log(format);
								ret = date.date.format(replacer, format);
							break;
					}
				}
				return ret;
			});
		} else if (typeof obj == "object") {
			return str.replace(INTERP_REGEX, function(m, format, value) {
				value = obj[value];
				if(format){
					if(comb.isString(value)){
						return formatString(value, format);
					}else if(typeof value == "number"){
						return formatNumber(value, format);
					}else if(date.isDate(value)){
						return date.date.format(value, format);
					}else if(typeof value == "object"){
						return formatObject(value, format);
					}
				}else{
					return "" + value;
				}
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
	multiply : function(str, times) {
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
	style : function(str, options) {
		var ret = str;
		if (options) {
			if (ret instanceof Array) {
				ret = ret.map(function(s) {
					return comb.string.style(s, options);
				})
			} else if (options instanceof Array) {
				options.forEach(function(option) {
					ret = comb.string.style(ret, option);
				});
			} else if (options in styles) {
				ret = '\033[' + styles[options][0] + 'm' + str + '\033[' + styles[options][1] + 'm';
			}
		}
		return ret;
	}
};


