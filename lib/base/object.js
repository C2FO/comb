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
 * @param {Object} obj the object to merge into
 * @param {Obejct} props variable number of objects to merge into the obj
 *
 * @returns {Object} the merged object
 */
exports.merge = function(obj, props) {
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
 * @param {Object} parent the parent object to extend
 * @param {Object} extend the extension object to mixin to the parent
 *
 * @returns {Object} returns the extended object
 */
exports.extend = function(parent, extend){
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
exports.isObject = function(obj) {
    return typeof obj == "object";
};
