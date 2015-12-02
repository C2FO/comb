"use strict";
var comb = exports,
    arraySlice = Array.prototype.slice;

/**
 *
 * Converts an arguments object to an array
 *
 * @example
 *
 * function test(){
 *     return comb.argsToArray(arguments);
 * }
 *
 * function testSlice(){
 *     return comb.argsToArray(arguments, 3);
 * }
 *
 * console.log(test(1,2,3)); //[1,2,3]
 * console.log(test(1,2,3,4,5,6)); //[4,5,6]
 *
 * @function
 * @param {Arguments} args the arguments object to convert
 * @param {Number} [slice=0] the number of arguments to slice.
 * @memberOf comb
 * @static
 * @returns {Array} array version of the arguments object
 */
function argsToArray(args, slice) {
    slice = slice || 0;
    return arraySlice.call(args, slice);
}

/**
 * Determines if obj is a boolean
 *
 * @param {Anything} obj the thing to test if it is a boolean
 *
 * @returns {Boolean} true if it is a boolean false otherwise
 * @memberOf comb
 * @static
 */
function isBoolean(obj) {
    var undef, type = typeof obj;
    return obj !== undef && type === "boolean" || type === "Boolean";
}

/**
 * Determines if obj is undefined
 *
 * @param {Anything} obj the thing to test if it is undefined
 * @returns {Boolean} true if it is undefined false otherwise
 * @memberOf comb
 * @static
 */
function isUndefined(obj) {
    var undef;
    return obj !== null && obj === undef;
}


/**
 * Determins if the obj is not undefined
 *
 * @param obj the thing to test if it is not undefined
 *
 * @return {Boolean} true if it is defined false otherwise
 * @memberOf comb
 * @static
 */
function isDefined(obj) {
    return !isUndefined(obj);
}

/**
 * Determines if obj is undefined or null
 *
 * @param {Anything} obj the thing to test if it is undefined or null
 * @returns {Boolean} true if it is undefined or null false otherwise
 * @memberOf comb
 * @static
 */
function isUndefinedOrNull(obj) {
    return isUndefined(obj) || isNull(obj);
}

/**
 * Determines if obj is null
 *
 * @param {Anything} obj the thing to test if it is null
 *
 * @returns {Boolean} true if it is null false otherwise
 * @memberOf comb
 * @static
 */
function isNull(obj) {
    var undef;
    return obj !== undef && obj == null;
}

/**
 * Determines if obj is an Arguments object;
 *
 * @param {Anything} obj the thing to test if it is null
 *
 * @returns {Boolean} true if it is an Arguments Object false otherwise
 * @memberOf comb
 * @static
 */
function isArguments(object) {
    return !isUndefinedOrNull(object) && Object.prototype.toString.call(object) === '[object Arguments]';
}


function isInstance(obj, clazz) {
    if (typeof clazz === "function") {
        return obj instanceof clazz;
    } else {
        return false;
    }
}

/**
 * Determines if obj is an instance of a particular class
 *
 * @param {Anything} obj the thing to test if it and instance of a class
 * @param {Object} Clazz used to determine if the object is an instance of
 *
 * @returns {Boolean} true if it is an instance of the clazz false otherwise
 * @memberOf comb
 * @static
 */
function isInstanceOf(obj, clazz) {
    return argsToArray(arguments, 1).some(function (c) {
        return isInstance(obj, c);
    });
}

(function () {

    var listeners = [];
    var setup = false;

    function setupListener() {
        if (!setup) {
            var orig = process.emit;
            process.emit = function (event) {
                try {
                    if (event === 'exit') {
                        listeners.forEach(function (cb) {
                            cb();
                        });
                    }
                } finally {
                    orig.apply(this, arguments);
                }
            };
            setup = true;
        }
    }

    /**
     * Adds listeners to process.exit without having to change setMaxListeners useful if you
     * are writing a library and do not want to change core setting.
     *
     * @param {Funciton} cb funciton to call when process is exiting
     * @memberOf comb
     * @static
     */
    function listenForExit(cb) {
        setupListener();
        listeners.push(cb);
    }

    comb.listenForExit = listenForExit;
})();

comb.argsToArray = argsToArray;
comb.isBoolean = isBoolean;
comb.isUndefined = isUndefined;
comb.isDefined = isDefined;
comb.isUndefinedOrNull = isUndefinedOrNull;
comb.isNull = isNull;
comb.isArguments = isArguments;
comb.isInstanceOf = isInstanceOf;



