"use strict";
var string = require("./string"),
    object = require("./object"),
    isArray = Array.isArray,
    isObject = object.isObject,
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

function spreadArgs(f, args, scope) {
    var ret;
    switch ((args || []).length) {
    case 0:
        ret = f.call(scope);
        break;
    case 1:
        ret = f.call(scope, args[0]);
        break;
    case 2:
        ret = f.call(scope, args[0], args[1]);
        break;
    case 3:
        ret = f.call(scope, args[0], args[1], args[2]);
        break;
    default:
        ret = f.apply(scope, args);
    }
    return ret;
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
                return spreadArgs(func, scopeArgs, scope);
            } else {
                return func;
            }
        };
    } else {
        return function () {
            var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
            return spreadArgs(method, scopeArgs, scope);
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
                return spreadArgs(func, scopeArgs, scope);
            } else {
                return func;
            }
        };
    } else {
        return function () {
            var scopeArgs = Array.prototype.slice.call(arguments), scope = scopeArgs.shift();
            scopeArgs = args.concat(scopeArgs);
            return spreadArgs(method, scopeArgs, scope);
        };
    }
}


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
                return spreadArgs(func, args, scope);
            } else {
                return func;
            }
        };
    } else {
        return function () {
            return spreadArgs(method, args, scope);
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


function hitchAll(scope, methods) {
    var funcs = Array.prototype.slice.call(arguments).slice(1);
    if (!isObject(scope)) {
        throw new TypeError("scope must be an object");
    }
    if (funcs.length === 1 && isArray(funcs[0])) {
        funcs = funcs[0];
    }
    if (!funcs.length) {
        funcs = Object.keys(scope).filter(function (k) {
            return isFunction(scope[k]);
        });
    }
    for (var i = 0, l = funcs.length; i < l; i++) {
        scope[funcs[i]] = hitch(scope, scope[funcs[i]]);
    }
    return object;
}

exports.hitchAll = hitchAll;
exports.bindAll = hitchAll;


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
                return spreadArgs(func, scopeArgs, this);
            } else {
                return func;
            }
        };
    } else {
        return function () {
            var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
            return spreadArgs(method, scopeArgs, this);
        };
    }
}


function curryFunc(f, execute) {
    return function (arg) {
        var args = Array.prototype.slice.call(arguments);
        return execute ? f.apply(this, arguments) : function (arg) {
            return spreadArgs(f, args.concat(Array.prototype.slice.call(arguments)), this);
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

/**
 * Binds all methods or a specified array of function to the scope of the object
 * @example
 * var f = {
 *     a: function(){
 *         return "a";
 *     },
 *     b: function(){
 *         return "b";
 *     }
 * }
 *
 * comb.hitchAll(f, "a", "b");
 *
 * //or
 *
 * comb.hitchAll(f);
 *
 * @static
 * @memberOf comb
 * @param {Object} scope the object to bind methods on
 * @param {...} funcs varargs of methods to bind
 *
 * @returns {Object} the originally scoped object.
 * */
function hitchAll(scope) {
    var funcs = Array.prototype.slice.call(arguments, 1);
    if (!isObject(scope) && !isFunction(scope)) {
        throw new TypeError("scope must be an object");
    }
    if (funcs.length === 1 && isArray(funcs[0])) {
        funcs = funcs[0];
    }
    if (!funcs.length) {
        funcs = [];
        for (var k in scope) {
            if (scope.hasOwnProperty(k) && isFunction(scope[k])) {
                funcs.push(k);
            }
        }
    }
    for (var i = 0, l = funcs.length; i < l; i++) {
        scope[funcs[i]] = hitch(scope, scope[funcs[i]]);
    }
    return scope;
}

/**
 * Binds all methods or a specified array of function to the scope of the object
 * @example
 * var f = {
 *     a: function(){
 *         return "a";
 *     },
 *     b: function(){
 *         return "b";
 *     }
 * }
 *
 * comb.bindAll(f, "a", "b");
 *
 * //or
 *
 * comb.bindAll(f);
 *
 * @static
 * @memberOf comb
 * @param {Object} scope the object to bind methods on
 * @param {...} funcs varargs of methods to bind
 *
 * @returns {Object} the originally scoped object.
 * */
exports.bindAll = hitchAll;
exports.hitchAll = hitchAll;
exports.isFunction = isFunction;
exports.hitch = hitch;
exports.hitchIgnore = hitchIgnore;
exports.partial = partial;
exports.applyFirst = applyFirst;
exports.bindFirst = applyFirst;
exports.curry = curry;
exports.__spreadArgs = spreadArgs;

