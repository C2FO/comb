var comb = exports;

/**
 * Determines if something is a function
 * @param {Anything} obj the thing to test if it is a function
 *
 * @returns {Boolean} true if the obj is a function false otherwise
 */
comb.isFunction = function (obj) {
    return typeof obj == "function";
};

/**
 * Binds a method to a particular scope
 *
 * @param {Object} scope the scope to bind the callback to
 * @param {String|Function} method the method to callback
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} the hitched function
 */
comb.hitch = function (scope, method, args) {
    var args = Array.prototype.slice.call(arguments).slice(2);
    if (typeof method == "string") {
        method = scope[method];
    }
    if (method) {
        return function () {
            var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
            return method.apply(scope, scopeArgs);
        };
    } else {
        throw new Error(method + "Method not defined");
    }
};


/**
 * @function
 * Binds a method to a particular scope
 *
 * @param {Object} scope the scope to bind the callback to
 * @param {String|Function} method the method to callback
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} the hitched function
 */
comb.bind = comb.hitch;

/**
 * Binds a method to a particular scope ignoring any new arguments passed
 * into the function. This is useful if you want to force particular arguments and
 * ignore any new ones
 *
 * @param {Object} scope the scope to bind the callback to
 * @param {String|Function} method the method to callback
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} the hitched function
 */
comb.hitchIgnore = function (scope, method, args) {
    var args = Array.prototype.slice.call(arguments).slice(2);
    if (typeof method == "string") {
        method = scope[method];
    }
    if (method) {
        return function () {
            return method.apply(scope, args);
        };
    } else {
        throw new Error(method + "Method not defined");
    }
};

/**
 * @function
 * Binds a method to a particular scope ignoring any new arguments passed
 * into the function. This is useful if you want to force particular arguments and
 * ignore any new ones
 *
 * @param {Object} scope the scope to bind the callback to
 * @param {String|Function} method the method to callback
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} the hitched function
 */
comb.bindIgnore = comb.hitchIgnore;


/**
 * Allows the passing of additional arguments to a function when it is called
 * especially useful for callbacks that you want to provide additional parameters to
 *
 * @param {String|Function} method the method to callback
 * @param {Anything} [args] variable number of arguments to pass
 *
 * @returns {Function} partially hitched function
 */
comb.partial = function (method, args) {
    var args = Array.prototype.slice.call(arguments).slice(1);
    if (typeof method == "function") {
        return function () {
            var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
            return method.apply(this, scopeArgs);
        };
    } else {
        throw new Error(method + "Method not defined");
    }
};

var curry = function (f, execute) {
    return function (arg) {
        var args = Array.prototype.slice.call(arguments);
        return execute ? f.apply(this, arguments) : function (arg) {
            return f.apply(this, args.concat(Array.prototype.slice.call(arguments)));
        };
    }
};

/**
 * Curries a function
 * @example
 * var curried = comb.curry(4, function(a,b,c,d){
 *     return [a,b,c,d].join(",");
 * }
 *  curried("a");
 *  curried("b");
 *  curried("c");
 *  curried("d") => "a,b,c,d"
 *
 *  //OR
 *
 *  curried("a")("b")("c")("d") => "a,b,c,d"
 *
 *
 * @param {Number} depth the number of args you expect
 * @param {Function} cb the function to call once all args are gathered
 * @param {Object} [scope] what scope to call the function in
 *
 * @returns {Function} the curried version of the function
 * */
comb.curry = function (depth, cb, scope) {
    var f;
    if (scope) {
        f = comb.hitch(scope, cb);
    } else {
        f = cb;
    }
    if (depth) {
        var len = depth - 1;
        for (var i = len; i >= 0; i--) {
            f = curry(f, i == len);
        }
    }
    return f;
};

