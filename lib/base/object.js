"use strict";
var comb = exports,
    misc = require("./misc.js"),
    compare = process.binding('buffer').compare,
    util = require('util'),
    isUndefinedOrNull = misc.isUndefinedOrNull,
    isArguments = misc.isArguments,
    pSlice = Array.prototype.slice,
    pToString = Object.prototype.toString,
    _baseArray, _baseString;

function baseArray() {
    return _baseArray || (_baseArray = require("./array").array);
}

function baseString() {
    return _baseString || (_baseString = require("./string"));
}

//taken from node js assert.js
//https://github.com/nodejs/node/blob/master/lib/assert.js
function _deepEqual(actual, expected, strict) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
        return true;
    } else if (actual instanceof Buffer && expected instanceof Buffer) {
        return compare(actual, expected) === 0;

        // 7.2. If the expected value is a Date object, the actual value is
        // equivalent if it is also a Date object that refers to the same time.
    } else if (util.isDate(actual) && util.isDate(expected)) {
        return actual.getTime() === expected.getTime();

        // 7.3 If the expected value is a RegExp object, the actual value is
        // equivalent if it is also a RegExp object with the same source and
        // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
    } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
        return actual.source === expected.source &&
            actual.global === expected.global &&
            actual.multiline === expected.multiline &&
            actual.lastIndex === expected.lastIndex &&
            actual.ignoreCase === expected.ignoreCase;

        // 7.4. Other pairs that do not both pass typeof value == 'object',
        // equivalence is determined by ==.
    } else if ((actual === null || typeof actual !== 'object') &&
        (expected === null || typeof expected !== 'object')) {
        /*jshint -W116*/
        return strict ? actual === expected : actual == expected;

        // 7.5 For all other Object pairs, including Array objects, equivalence is
        // determined by having the same number of owned properties (as verified
        // with Object.prototype.hasOwnProperty.call), the same set of keys
        // (although not necessarily the same order), equivalent values for every
        // corresponding key, and an identical 'prototype' property. Note: this
        // accounts for both named and indexed properties on Arrays.
    } else {
        return objEquiv(actual, expected, strict);
    }
}

function objEquiv(a, b, strict) {
    if (a === null || a === undefined || b === null || b === undefined) {
        return false;
    }
    // if one is a primitive, the other must be same
    if (util.isPrimitive(a) || util.isPrimitive(b)) {
        return a === b;
    }
    if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
        return false;
    }
    var aIsArgs = isArguments(a),
        bIsArgs = isArguments(b);
    if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs)) {
        return false;
    }
    if (aIsArgs) {
        a = pSlice.call(a);
        b = pSlice.call(b);
        return _deepEqual(a, b, strict);
    }
    var ka = Object.keys(a),
        kb = Object.keys(b),
        key, i;
    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length !== kb.length) {
        return false;
    }
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] !== kb[i]) {
            return false;
        }
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!_deepEqual(a[key], b[key], strict)) {
            return false;
        }
    }
    return true;
}

function merge(target, source) {
    var name, s;
    for (name in source) {
        s = source[name];
        if (!(name in target) || (target[name] !== s)) {
            target[name] = s;
        }
    }
    return target;
}

function deepMerge(target, source) {
    var name, s, t;
    for (name in source) {
        s = source[name];
        t = target[name];
        if (!_deepEqual(t, s, true) ) {
            if (comb.isHash(t) && comb.isHash(s)) {
                target[name] = deepMerge(t, s);
            } else if (comb.isHash(s)) {
                target[name] = deepMerge({}, s);
            } else {
                target[name] = s;
            }
        }
    }
    return target;
}

/**
 * Determines if an object is just a hash and not a qualified Object such as Number
 *
 * @example
 *    comb.isHash({}) => true
 *    comb.isHash({1 : 2, a : "b"}) => true
 *    comb.isHash(new Date()) => false
 *    comb.isHash(new String()) => false
 *    comb.isHash(new Number()) => false
 *    comb.isHash(new Boolean()) => false
 *    comb.isHash() => false
 *    comb.isHash("") => false
 *    comb.isHash(1) => false
 *    comb.isHash(false) => false
 *    comb.isHash(true) => false
 * @param {Anything} obj the thing to test if it is a hash
 *
 * @returns {Boolean} true if it is a hash false otherwise
 * @memberOf comb
 * @static
 */
function isHash(obj) {
    var ret = comb.isObject(obj);
    return ret && obj.constructor === Object;
}

/**
 * Merges objects together
 * NOTE: this function takes a variable number of objects to merge
 *
 * @example
 *
 * var myObj = {};
 * comb.merge(myObj, {test : true});
 *
 * myObj.test => true
 *
 * comb.merge(myObj, {test : false}, {test2 : false}, {test3 : "hello", test4 : "world"});
 * myObj.test => false
 * myObj.test2 => false
 * myObj.test3 => "hello"
 * myObj.test4 => "world"
 *
 *
 * @param {Object} obj the object to merge into
 * @param {Object} props variable number of objects to merge into the obj
 *
 * @returns {Object} the merged object
 * @memberOf comb
 * @name merge
 * @static
 */
function combMerge(obj, props) {
    if (!obj) {
        obj = {};
    }
    for (var i = 1, l = arguments.length; i < l; i++) {
        merge(obj, arguments[i]);
    }
    return obj; // Object
}


/**
 * Merges objects together only overriding properties that are different.
 * NOTE: this function takes a variable number of objects to merge
 *
 * @example
 *
 * var myObj = {my : {cool : {property1 : 1, property2 : 2}}};
 * comb.deepMerge(myObj, {my : {cool : {property3 : 3}}});
 *
 * myObj.my.cool.property1 => 1
 * myObj.my.cool.property2 => 2
 * myObj.my.cool.property3 => 3
 *
 *
 * @param {Object} obj the object to merge into
 * @param {Object} props variable number of objects to merge into the obj
 *
 * @returns {Object} the merged object
 * @memberOf comb
 * @name deepMerge
 * @static
 */
function combDeepMerge(obj, props) {
    if (!obj) {
        obj = {};
    }
    for (var i = 1, l = arguments.length; i < l; i++) {
        deepMerge(obj, arguments[i]);
    }
    return obj; // Object
}

/**
 * Extends the prototype of an object if it exists otherwise it extends the object.
 *
 * @example
 *
 *  var MyObj = function(){};
 *  MyObj.prototype.test = true;
 *  comb.extend(MyObj, {test2 : false, test3 : "hello", test4 : "world"});
 *
 *  var myObj = new MyObj();
 *
 *  myObj.test => true
 *  myObj.test2 => false
 *  myObj.test3 => "hello"
 *  myObj.test4 => "world"
 *
 *  var myObj2 = {};
 *  myObj2.test = true;
 *  comb.extend(myObj2, {test2 : false, test3 : "hello", test4 : "world"});
 *
 *  myObj2.test => true
 *  myObj2.test2 => false
 *  myObj2.test3 => "hello"
 *  myObj2.test4 => "world"
 *
 *
 * @param {Object} parent the parent object to extend
 * @param {Object} extend the extension object to mixin to the parent
 *
 * @returns {Object} returns the extended object
 * @memberOf comb
 * @static
 */
function extend(parent, ext) {
    var proto = parent.prototype || parent;
    merge(proto, ext);
    return parent;
}

/**
 * Determines if obj is an object
 *
 * @param {Anything} obj the thing to test if it is an object
 *
 * @returns {Boolean} true if it is an object false otherwise
 * @memberOf comb
 * @static
 */
function isObject(obj) {
    var undef;
    return obj !== null && obj !== undef && typeof obj === "object";
}


/**
 * Determines if an object is empty
 *
 * @example
 *
 * comb.isEmpty({}) => true
 * comb.isEmpty({a : 1}) => false
 *
 * @param object the object to test
 * @returns {Boolean} true if the object is empty;
 * @memberOf comb
 * @static
 */
function isEmpty(object) {
    if (comb.isObject(object)) {
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Determines if two things are deep equal.
 *
 * @example
 *
 * comb.deepEqual({a : 1, b : 2}, {a : 1, b : 2}) => true
 * comb.deepEqual({a : 1}, {a : 1, b : 2}) => false
 *
 * @param o1 the first thing to compare
 * @param o3 the second thing to compare
 * @return {Boolean}
 * @memberOf comb
 * @static
 */
function deepEqual(o1, o2) {
    return _deepEqual(o1, o2);
}

comb.isHash = isHash;
comb.isEmpty = isEmpty;
comb.deepEqual = deepEqual;
comb.isObject = isObject;
comb.extend = extend;
comb.deepMerge = combDeepMerge;
comb.merge = combMerge;

/**
 * Returns a new hash with the specified keys omitted from the hash.
 *
 * ```
 * var obj = {a: "a", b: "b", c: "c"};
 *
 * //as a function
 * comb.hash.omit(obj, ["a", "b"]); //{c: "c"}
 * comb.hash.omit(obj, "c"); //{a: "a", b: "b"};
 *
 * //as a monad
 * comb(obj).omit(["a", "b"]); //{c: "c"}
 * comb(obj).omit("c"); //{a: "a", b: "b"};
 *
 * ```
 *
 * @param {Object} hash The hash to omit values from
 * @param {Array|String} omitted the keys to omit.
 * @returns {Object} a new Object with the keys omitted
 * @memberOf comb.hash
 */
function omit(hash, omitted) {
    if (!isHash(hash)) {
        throw new TypeError("expected object got ", pToString.call(hash));
    }
    if (baseString().isString(omitted)) {
        omitted = [omitted];
    }
    var objKeys = baseArray().difference(Object.keys(hash), omitted), key, ret = {};
    for (var i = 0, len = objKeys.length; i < len; ++i) {
        key = objKeys[i];
        ret[key] = hash[key];
    }
    return ret;
}

/**
 * Returns a new hash with the specified keys omitted from the hash.
 *
 * ```
 * var obj = {a: "a", b: "b", c: "c"};
 *
 * //as a function
 * comb.hash.pick(obj, ["a", "b"]); //{a: "a", b:'b'}
 * comb.hash.pick(obj, "c"); //{c: "c"};
 *
 * //as a monad
 * comb(obj).pick(["a", "b"]); //{a: "a", b:'b'}
 * comb(obj).pick("c"); //{c: "c"};
 *
 * ```
 *
 * @param {Object} hash The hash to pick values from
 * @param {Array|String} picked the keys to pick.
 * @returns {Object} a new Object with only the keys specified
 * @memberOf comb.hash
 */
function pick(hash, picked) {
    if (!isHash(hash)) {
        throw new TypeError("expected object got ", pToString.call(hash));
    }
    if (baseString().isString(picked)) {
        picked = [picked];
    }
    var objKeys = baseArray().intersect(Object.keys(hash), picked), key, ret = {};
    for (var i = 0, len = objKeys.length; i < len; ++i) {
        key = objKeys[i];
        ret[key] = hash[key];
    }
    return ret;
}


/**
 * Loops through each k/v in a hash.
 *
 * ```
 * var obj = {a : "b", c : "d", e : "f"};
 * comb(obj).forEach(function(value, key){
 *     console.log(value, key);
 * });
 *
 * comb.hash.forEach(obj, function(){
 *    console.log(value, key);
 * });
 *
 * ```
 * @param {Object} hash the hash to iterate
 * @param {Function} iterator the interator function. Called with (key, value, hash).
 * @param {Object} [scope=hash] the scope to invoke the interator in.
 * @return {Object} the original hash.
 * @memberOf comb.hash
 */
function forEach(hash, iterator, scope) {
    if (!isHash(hash) || typeof iterator !== "function") {
        throw new TypeError();
    }
    var keys = Object.keys(hash), key;
    for (var i = 0, len = keys.length; i < len; ++i) {
        key = keys[i];
        iterator.call(scope || hash, hash[key], key, hash);
    }
    return hash;
}

/**
 * Filters out key/value pairs in an object. Filters out key/value pairs that return a falsey value from the iterator.
 *
 * ```
 * var obj = {a : "b", c : "d", e : "f"};
 * comb(obj).filter(function(value, key){
 *     return value == "b" || key === "e";
 * }); //{a : "b", e : "f"};
 *
 * comb.hash.filter(obj, function(){
 *    return value == "b" || key === "e";
 * }); //{a : "b", e : "f"};
 *
 * ```
 * @param {Object} hash the hash to filter.
 * @param {Function} iterator the interator function. Called with (key, value, hash).
 * @param {Object} [scope=hash] the scope to invoke the interator in.
 * @return {Object} a new object with the values that returned true..
 * @memberOf comb.hash
 */
function filter(hash, iterator, scope) {
    if (!isHash(hash) || typeof iterator !== "function") {
        throw new TypeError();
    }
    var keys = Object.keys(hash), key, value, ret = {};
    for (var i = 0, len = keys.length; i < len; ++i) {
        key = keys[i];
        value = hash[key];
        if (iterator.call(scope || hash, value, key, hash)) {
            ret[key] = value;
        }
    }
    return ret;
}

/**
 * Returns the values of a hash.
 *
 * ```
 * var obj = {a : "b", c : "d", e : "f"};
 * comb(obj).values(); //["b", "d", "f"]
 *
 * comb.hash.values(obj); //["b", "d", "f"]
 *
 * ```
 *
 * @param {Object} hash the object to retrieve the values of.
 * @return {Array} array of values.
 * @memberOf comb.hash
 */
function values(hash) {
    if (!isHash(hash)) {
        throw new TypeError();
    }
    var keys = Object.keys(hash), ret = [];
    for (var i = 0, len = keys.length; i < len; ++i) {
        ret.push(hash[keys[i]]);
    }
    return ret;
}

/**
 * Returns a new hash that is the invert of the hash.
 *
 * ```
 * var obj = {a : "b", c : "d", e : "f"};
 * comb(obj).invert(); //{b : "a", d : "c", f : "e"}
 *
 * comb.hash.invert(obj); //{b : "a", d : "c", f : "e"}
 * ```
 *
 * @param {Object} hash the hash to invert.
 * @return {Object} A new hash that is the invert of hash.
 * @memberOf comb.hash
 */
function invert(hash) {
    if (!isHash(hash)) {
        throw new TypeError();
    }
    var keys = Object.keys(hash), key, ret = {};
    for (var i = 0, len = keys.length; i < len; ++i) {
        key = keys[i];
        ret[hash[key]] = key;
    }
    return ret;
}

/**
 * Converts a hash to an array.
 *
 * ```
 * var obj = {a : "b", c : "d", e : "f"};
 * comb(obj).toArray(); //[["a", "b"], ["c", "d"], ["e", "f"]]
 *
 * comb.hash.toArray(obj); //[["a", "b"], ["c", "d"], ["e", "f"]]
 * ```
 *
 * @param {Object} hash the hash to convert to an array.
 * @return {Array} a two dimensional array representing the hash.
 * @memberOf comb.hash
 */
function toArray(hash) {
    if (!isHash(hash)) {
        throw new TypeError();
    }
    var keys = Object.keys(hash), key, ret = [];
    for (var i = 0, len = keys.length; i < len; ++i) {
        key = keys[i];
        ret.push([key, hash[key]]);
    }
    return ret;
}


/**
 * @namespace utilities for working with hases i.e. {}
 * @ignoreCode
 */
comb.hash = {
    forEach: forEach,
    omit: omit,
    pick: pick,
    filter: filter,
    invert: invert,
    values: values,
    toArray: toArray
};
