"use strict";
/*
 * A port of the Rails/Sequel inflections class
 * http://sequel.rubyforge.org/rdoc/classes/Sequel/Inflections.html
 */

var array = require("./array").array, misc = require("./misc");

var comb = exports;

var CAMELIZE_CONVERT_REGEXP = /_(.)/g;
var DASH = '-';
var UNDERSCORE = '_';
var UNDERSCORE_CONVERT_REGEXP1 = /([A-Z]+)(\d+|[A-Z][a-z])/g;
var UNDERSCORE_CONVERT_REGEXP2 = /(\d+|[a-z])(\d+|[A-Z])/g;
var UNDERSCORE_CONVERT_REPLACE = '$1_$2';

var PLURALS = [], SINGULARS = [], UNCOUNTABLES = [];


var _plural = function (rule, replacement) {
    PLURALS.unshift([rule, replacement]);
};
var _singular = function (rule, replacement) {
    SINGULARS.unshift([rule, replacement]);
};

/**
 * Specifies a new irregular that applies to both pluralization and singularization at the same time. This can only be used
 # for strings, not regular expressions. You simply pass the irregular in singular and plural form.
 #
 # Examples:
 #   irregular 'octopus', 'octopi'
 #   irregular 'person', 'people'
 * @param singular the singular version
 * @param plural  the plural version
 */
var _irregular = function (singular, plural) {
    _plural(new RegExp("(" + singular.substr(0, 1) + ")" + singular.substr(1) + "$"), "$1" + plural.substr(1));
    _singular(new RegExp("(" + plural.substr(0, 1) + ")" + plural.substr(1) + "$"), "$1" + singular.substr(1));
};
var _uncountable = function (words) {
    UNCOUNTABLES.push(misc.argsToArray(arguments));
    UNCOUNTABLES = array.flatten(UNCOUNTABLES);
};

_plural(/$/, 's');
_plural(/s$/i, 's');
_plural(/(alias|(?:stat|octop|vir|b)us)$/i, '$1es');
_plural(/(buffal|tomat)o$/i, '$1oes');
_plural(/([ti])um$/i, '$1a');
_plural(/sis$/i, 'ses');
_plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves');
_plural(/(hive)$/i, '$1s');
_plural(/([^aeiouy]|qu)y$/i, '$1ies');
_plural(/(x|ch|ss|sh)$/i, '$1es');
_plural(/(matr|vert|ind)ix|ex$/i, '$1ices');
_plural(/([m|l])ouse$/i, '$1ice');
_plural(/^(ox)$/i, "$1en");

_singular(/s$/i, '');
_singular(/([ti])a$/i, '$1um');
_singular(/(analy|ba|cri|diagno|parenthe|progno|synop|the)ses$/i, '$1sis');
_singular(/([^f])ves$/i, '$1fe');
_singular(/([h|t]ive)s$/i, '$1');
_singular(/([lr])ves$/i, '$1f');
_singular(/([^aeiouy]|qu)ies$/i, '$1y');
_singular(/(m)ovies$/i, '$1ovie');
_singular(/(x|ch|ss|sh)es$/i, '$1');
_singular(/([m|l])ice$/i, '$1ouse');
_singular(/buses$/i, 'bus');
_singular(/oes$/i, 'o');
_singular(/shoes$/i, 'shoe');
_singular(/(alias|(?:stat|octop|vir|b)us)es$/i, '$1');
_singular(/(vert|ind)ices$/i, '$1ex');
_singular(/matrices$/i, 'matrix');

_irregular('person', 'people');
_irregular('man', 'men');
_irregular('child', 'children');
_irregular('sex', 'sexes');
_irregular('move', 'moves');
_irregular('quiz', 'quizzes');
_irregular('testis', 'testes');

_uncountable("equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "news");

exports.singular = _singular;
exports.plural = _plural;
exports.uncountable = _uncountable;

/**
 * Converts a string to camelcase
 *
 * @example
 *  comb.camelize('hello_world') => helloWorld
 *  comb.camelize('column_name') => columnName
 *  comb.camelize('columnName') => columnName
 *  comb.camelize(null) => null
 *  comb.camelize() => undefined
 *
 * @param {String} str the string to camelize
 * @memberOf comb
 * @returns {String} the camelized version of the string
 */
comb.camelize = function (str) {
    var ret = str;
    if (!misc.isUndefinedOrNull(str)) {
        ret = str.replace(CAMELIZE_CONVERT_REGEXP, function (a, b) {
            return b.toUpperCase();
        });
    }
    return ret;
};

/**
 * The reverse of camelize. Makes an underscored form from the expression in the string.
 *
 * @example
 *  comb.underscore('helloWorld') => hello_world
 *  comb.underscore('column_name') => column_name
 *  comb.underscore('columnName') => column_name
 *  comb.underscore(null) => null
 *  comb.underscore() => undefined
 * @param {String} str The string to underscore
 * @memberOf comb
 * @returns {String} the underscored version of the string
 *   */
comb.underscore = function (str) {
    var ret = str;
    if (!misc.isUndefinedOrNull(str)) {
        ret = str.replace(UNDERSCORE_CONVERT_REGEXP1, UNDERSCORE_CONVERT_REPLACE)
            .replace(UNDERSCORE_CONVERT_REGEXP2, UNDERSCORE_CONVERT_REPLACE)
            .replace(DASH, UNDERSCORE).toLowerCase();
    }
    return ret;
};

/**
 * Singularizes and camelizes the string.  Also strips out all characters preceding
 * and including a period (".").
 *
 * @example
 *   comb.classify('egg_and_hams') => "eggAndHam"
 *   comb.classify('post') => "post"
 *   comb.classify('schema.post') => "post"
 *
 * @param {String} str the string to classify
 * @memberOf comb
 * @returns {String} the classified version of the string
 **/
comb.classify = function (str) {
    var ret = str;
    if (!misc.isUndefinedOrNull(str)) {
        ret = comb.camelize(comb.singularize(str.replace(/.*\./g, '')));
    }
    return ret;
};
/**
 * Returns the plural form of the word in the string.
 *
 * @example
 *  comb.pluralize("post") => "posts"
 *  comb.pluralize("octopus") => "octopi"
 *  comb.pluralize("sheep") => "sheep"
 *  comb.pluralize("words") => "words"
 *  comb.pluralize("the blue mailman") => "the blue mailmen"
 *  comb.pluralize("CamelOctopus") => "CamelOctopi"
 *
 * @param {String} str the string to pluralize
 * @memberOf comb
 * @returns {String} the pluralized version of the string
 **/
comb.pluralize = function (str) {
    var ret = str;
    if (!misc.isUndefinedOrNull(str)) {
        if (UNCOUNTABLES.indexOf(str) === -1) {
            for (var i in PLURALS) {
                var s = PLURALS[i], rule = s[0], replacement = s[1];
                if ((ret = ret.replace(rule, replacement)) !== str) {
                    break;
                }
            }
        }
    }
    return ret;
};
/**
 * The reverse of pluralize, returns the singular form of a word in a string.
 *
 * @example
 *   comb.singularize("posts") => "post"
 *   comb.singularize("octopi")=> "octopus"
 *   comb.singularize("sheep") => "sheep"
 *   comb.singularize("word") => "word"
 *   comb.singularize("the blue mailmen") => "the blue mailman"
 *   comb.singularize("CamelOctopi") => "CamelOctopus"
 *
 * @param {String} str the string to singularize
 * @memberOf comb
 * @returns {String} the singularized version of the string
 * */
comb.singularize = function (str) {
    var ret = str;
    if (!misc.isUndefinedOrNull(str)) {
        if (UNCOUNTABLES.indexOf(str) === -1) {
            for (var i in SINGULARS) {
                var s = SINGULARS[i], rule = s[0], replacement = s[1];
                if ((ret = ret.replace(rule, replacement)) !== str) {
                    break;
                }
            }
        }
    }
    return ret;
};
