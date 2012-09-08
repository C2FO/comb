var string = require("./string"),
    isString = string.isString;

/**
 * Determines if something is a function
 * @param {Anything} obj the thing to test if it is a function
 *
 * @returns {Boolean} true if the obj is a function false otherwise
 * @static
 * @memberOf comb
 */
function isFunction(obj) {
    return typeof obj === "function";
}

/**
 * Binds a method to a particular scope
 *
 * @static
 * @memberOf comb
 *
 * @param {Object} scope the scope to bind the callback to
 * @param {String|Function} method the method to callback
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} the hitched function
 */
function hitch(scope, method, args) {
    args = Array.prototype.slice.call(arguments).slice(2);
    if ((isString(method) && !(method in scope))) {
        throw new Error(method + " property not defined in scope");
    } else if (!isString(method) && !isFunction(method)) {
        throw new Error(method + " is not a function");
    }
    if (isString(method)) {
        return function () {
            var func = scope[method];
            if (isFunction(func)) {
                var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
                return func.apply(scope, scopeArgs);
            } else {
                return func;
            }
        };
    } else {
        return function () {
            var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
            return method.apply(scope, scopeArgs);
        };
    }
}

/**
 * Binds a method to the scope of the first argument.
 *
 * This is useful if you have async actions and you just want to run a method or retrieve a property on the object.
 *
 * ```
 *  var arr = [], push = comb.applyFirst("push"), length = comb.applyFirst("length");
 *  push(arr, 1, 2,3,4);
 *  console.log(length(arr)); //4
 *  console.log(arr); //1,2,3,4
 *
 * ```
 * @static
 * @memberOf comb
 * @param {String|Function} method the method to invoke in the scope of the first arument.
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} a function that will execute the method in the scope of the first argument.
 */
function applyFirst(method, args) {
    args = Array.prototype.slice.call(arguments).slice(1);
    if (!isString(method) && !isFunction(method)) {
        throw new Error(method + " must be the name of a property or function to execute");
    }
    if (isString(method)) {
        return function () {
            var scopeArgs = Array.prototype.slice.call(arguments), scope = scopeArgs.shift();
            var func = scope[method];
            if (isFunction(func)) {
                scopeArgs = args.concat(scopeArgs);
                return func.apply(scope, scopeArgs);
            } else {
                return func;
            }
        };
    } else {
        return function () {
            var scopeArgs = Array.prototype.slice.call(arguments), scope = scopeArgs.shift();
            scopeArgs = args.concat(scopeArgs);
            return method.apply(scope, scopeArgs);
        };
    }
}
;


/**
 * @function
 * Binds a method to a particular scope
 * @static
 * @memberOf comb
 * @param {Object} scope the scope to bind the callback to
 * @param {String|Function} method the method to callback
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} the hitched function
 */
exports.bind = hitch;

/**
 * Binds a method to a particular scope ignoring any new arguments passed
 * into the function. This is useful if you want to force particular arguments and
 * ignore any new ones
 * @static
 * @memberOf comb
 * @param {Object} scope the scope to bind the callback to
 * @param {String|Function} method the method to callback
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} the hitched function
 */
function hitchIgnore(scope, method, args) {
    args = Array.prototype.slice.call(arguments).slice(2);
    if ((isString(method) && !(method in scope))) {
        throw new Error(method + " property not defined in scope");
    } else if (!isString(method) && !isFunction(method)) {
        throw new Error(method + " is not a function");
    }
    if (isString(method)) {
        return function () {
            var func = scope[method];
            if (isFunction(func)) {
                return func.apply(scope, args);
            } else {
                return func;
            }
        };
    } else {
        return function () {
            return method.apply(scope, args);
        };
    }
}

/**
 * @function
 * Binds a method to a particular scope ignoring any new arguments passed
 * into the function. This is useful if you want to force particular arguments and
 * ignore any new ones
 * @static
 * @memberOf comb
 * @param {Object} scope the scope to bind the callback to
 * @param {String|Function} method the method to callback
 * @param [args] optional args to pass to the callback
 *
 * @returns {Function} the hitched function
 */
exports.bindIgnore = hitchIgnore;


/**
 * Allows the passing of additional arguments to a function when it is called
 * especially useful for callbacks that you want to provide additional parameters to
 *
 * @static
 * @memberOf comb
 * @param {String|Function} method the method to callback
 * @param {Anything} [args] variable number of arguments to pass
 *
 * @returns {Function} partially hitched function
 */
function partial(method, args) {
    args = Array.prototype.slice.call(arguments).slice(1);
    if (!isString(method) && !isFunction(method)) {
        throw new Error(method + " must be the name of a property or function to execute");
    }
    if (isString(method)) {
        return function () {
            var func = this[method];
            if (isFunction(func)) {
                var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
                return func.apply(this, scopeArgs);
            } else {
                return func;
            }
        };
    } else {
        return function () {
            var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
            return method.apply(this, scopeArgs);
        };
    }
}
;

function curryFunc(f, execute) {
    return function (arg) {
        var args = Array.prototype.slice.call(arguments);
        return execute ? f.apply(this, arguments) : function (arg) {
            return f.apply(this, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
}

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
 * @static
 * @memberOf comb
 * @param {Number} depth the number of args you expect
 * @param {Function} cb the function to call once all args are gathered
 * @param {Object} [scope] what scope to call the function in
 *
 * @returns {Function} the curried version of the function
 * */
function curry(depth, cb, scope) {
    var f;
    if (scope) {
        f = hitch(scope, cb);
    } else {
        f = cb;
    }
    if (depth) {
        var len = depth - 1;
        for (var i = len; i >= 0; i--) {
            f = curryFunc(f, i === len);
        }
    }
    return f;
}

exports.isFunction = isFunction;
exports.hitch = hitch;
exports.hitchIgnore = hitchIgnore;
exports.partial = partial;
exports.applyFirst = applyFirst;
exports.bindFirst = applyFirst;
exports.curry = curry;

