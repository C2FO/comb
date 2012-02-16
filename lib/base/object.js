var comb = exports;

var merge = function(target, source) {
    var name, s;
    for (name in source) {
        s = source[name];
        if (!(name in target) || (target[name] !== s)) {
            target[name] = s;
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
comb.merge = function(obj, props) {
    if (!obj) {
        obj = {};
    }
    for (var i = 1, l = arguments.length; i < l; i++) {
        merge(obj, arguments[i]);
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
comb.extend = function(parent, extend){
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
comb.isObject = function(obj) {
    var undef;
    return obj != null && obj != undef && typeof obj == "object";
};

/**
 * Determins if an object is just a hash and not a qualified Object such as number
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
comb.isHash = function(obj){
    var ret = comb.isObject(obj);
    return ret && obj.constructor === Object;
}

/**
 * Determines if an object is empty
 *
 * @example
 *
 * comb.isEmpty({}) => true
 * comg.isEmpty({a : 1}) => false
 *
 * @param object the object to test
 */
comb.isEmpty = function(object) {
    if (object) {
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                return false;
            }
        }
    }
    return true;
}
