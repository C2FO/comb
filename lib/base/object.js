var comb = exports,
    misc = require("./misc.js"),
    isUndefinedOrNull = misc.isUndefined,
    isArguments = misc.isArguments,
    pSlice = Array.prototype.slice;

//taken from node js assert.js
//https://github.com/joyent/node/blob/master/lib/assert.js
var _deepEqual = function (actual, expected) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
        return true;

    } else if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
        if (actual.length != expected.length) return false;

        for (var i = 0; i < actual.length; i++) {
            if (actual[i] !== expected[i]) return false;
        }

        return true;

        // 7.2. If the expected value is a Date object, the actual value is
        // equivalent if it is also a Date object that refers to the same time.
    } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();

        // 7.3 If the expected value is a RegExp object, the actual value is
        // equivalent if it is also a RegExp object with the same source and
        // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
    } else if (actual instanceof RegExp && expected instanceof RegExp) {
        return actual.source === expected.source &&
            actual.global === expected.global &&
            actual.multiline === expected.multiline &&
            actual.lastIndex === expected.lastIndex &&
            actual.ignoreCase === expected.ignoreCase;

        // 7.4. Other pairs that do not both pass typeof value == 'object',
        // equivalence is determined by ==.
    } else if (typeof actual != 'object' && typeof expected != 'object') {
        return actual == expected;

        // 7.5 For all other Object pairs, including Array objects, equivalence is
        // determined by having the same number of owned properties (as verified
        // with Object.prototype.hasOwnProperty.call), the same set of keys
        // (although not necessarily the same order), equivalent values for every
        // corresponding key, and an identical 'prototype' property. Note: this
        // accounts for both named and indexed properties on Arrays.
    } else {
        return objEquiv(actual, expected);
    }
};


var objEquiv = function (a, b) {
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
        return false;
    // an identical 'prototype' property.
    if (a.prototype !== b.prototype) return false;
    //~~~I've managed to break Object.keys through screwy arguments passing.
    //   Converting to array solves the problem.
    if (isArguments(a)) {
        if (!isArguments(b)) {
            return false;
        }
        a = pSlice.call(a);
        b = pSlice.call(b);
        return _deepEqual(a, b);
    }
    try {
        var ka = Object.keys(a),
            kb = Object.keys(b),
            key, i;
    } catch (e) {//happens when one is a string literal and the other isn't
        return false;
    }
    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length != kb.length)
        return false;
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i])
            return false;
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!_deepEqual(a[key], b[key])) return false;
    }
    return true;
}

var merge = function (target, source) {
    var name, s;
    for (name in source) {
        s = source[name];
        if (!(name in target) || (target[name] !== s)) {
            target[name] = s;
        }
    }
    return target;
};

var deepMerge = function (target, source) {
    var name, s, t;
    for (name in source) {
        s = source[name], t = target[name];
        if (!_deepEqual(t, s)) {
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
};

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
 */
comb.merge = function (obj, props) {
    if (!obj) {
        obj = {};
    }
    for (var i = 1, l = arguments.length; i < l; i++) {
        merge(obj, arguments[i]);
    }
    return obj; // Object
};

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
 */
comb.deepMerge = function (obj, props) {
    if (!obj) {
        obj = {};
    }
    for (var i = 1, l = arguments.length; i < l; i++) {
        deepMerge(obj, arguments[i]);
    }
    return obj; // Object
};

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
 */
comb.extend = function (parent, extend) {
    var proto = parent.prototype || parent;
    return exports.merge(proto, extend);
};

/**
 * Determines if obj is an object
 *
 * @param {Anything} obj the thing to test if it is an object
 *
 * @returns {Boolean} true if it is an object false otherwise
 */
comb.isObject = function (obj) {
    var undef;
    return obj != null && obj != undef && typeof obj == "object";
};

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
 */
comb.isHash = function (obj) {
    var ret = comb.isObject(obj);
    return ret && obj.constructor === Object;
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
 */
comb.isEmpty = function (object) {
    if (comb.isObject(object)) {
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                return false;
            }
        }
    }
    return true;
};

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
 */
comb.deepEqual = function (o1, o2) {
    return  _deepEqual(o1, o2);
}




