var comb = exports;

/**
 *
 * Converts an arguments object to an array
 * @function
 * @param {Arguments} args the arguments object to convert
 * @memberOf comb
 * @returns {Array} array version of the arguments object
 */
var argsToArray = comb.argsToArray = function(args) {
    return Array.prototype.slice.call(args);
};

/**
 * Determines if obj is a boolean
 *
 * @param {Anything} obj the thing to test if it is a boolean
 *
 * @returns {Boolean} true if it is a boolean false otherwise
 */
comb.isBoolean = function(obj) {
    var undef, type = typeof obj;
    return obj != undef && type == "boolean" || type == "Boolean";
};

/**
 * Determines if obj is undefined
 *
 * @param {Anything} obj the thing to test if it is undefined
 * @returns {Boolean} true if it is undefined false otherwise
 */
comb.isUndefined = function(obj) {
    var undef;
    return obj !== null && obj === undef;
};


/**
 * Determins if the obj is not undefined
 *
 * @param obj the thing to test if it is not undefined
 *
 * @return {Boolean} true if it is defined false otherwise
 */
comb.isDefined = function(obj){
    return !comb.isUndefined(obj);
}

/**
 * Determines if obj is undefined or null
 *
 * @param {Anything} obj the thing to test if it is undefined or null
 * @returns {Boolean} true if it is undefined or null false otherwise
 */
comb.isUndefinedOrNull = function(obj) {
    return comb.isUndefined(obj) || comb.isNull(obj);
}

/**
 * Determines if obj is null
 *
 * @param {Anything} obj the thing to test if it is null
 *
 * @returns {Boolean} true if it is null false otherwise
 */
comb.isNull = function(obj) {
    var undef;
    return obj !== undef && obj == null;
};

/**
 * Determines if obj is an Arguments object;
 *
 * @param {Anything} obj the thing to test if it is null
 *
 * @returns {Boolean} true if it is an Arguments Object false otherwise
 */
comb.isArguments = function(object) {
    return !comb.isUndefinedOrNull(object) && Object.prototype.toString.call(object) == '[object Arguments]';
};


var isInstance = function(obj, clazz) {
    if (typeof clazz == "function") {
        return obj instanceof clazz;
    } else {
        return false;
    }
};

/**
 * Determines if obj is an instance of a particular class
 *
 * @param {Anything} obj the thing to test if it and instnace of a class
 * @param {Object} Clazz used to determine if the object is an instance of
 *
 * @returns {Boolean} true if it is an instance of the clazz false otherwise
 */
comb.isInstanceOf = function(obj, clazz) {
    return argsToArray(arguments).slice(1).some(function(c) {
        return isInstance(obj, c);
    });
};