var Proxy = require("node-proxy"), object = require("./object"), merge = object.merge, functions = require("./functions"), misc = require("./misc");

var comb = exports;
var handlerMaker = function (obj) {
    return {
        getOwnPropertyDescriptor:function (name) {
            var desc = Object.getOwnPropertyDescriptor(obj, name);
            // a trapping proxy's properties must always be configurable
            if (desc !== undefined) {
                desc.configurable = true;
            }
            return desc;
        },
        getPropertyDescriptor:function (name) {
            var desc = Object.getPropertyDescriptor(obj, name); // not in ES5
            // a trapping proxy's properties must always be configurable
            if (desc !== undefined) {
                desc.configurable = true;
            }
            return desc;
        },
        getOwnPropertyNames:function () {
            return Object.getOwnPropertyNames(obj);
        },
        getPropertyNames:function () {
            return Object.getPropertyNames(obj);                // not in ES5
        },
        defineProperty:function (name, desc) {
            Object.defineProperty(obj, name, desc);
        },
        delete:function (name) {
            return delete obj[name];
        },
        fix:function () {
            if (Object.isFrozen(obj)) {
                var result = {};
                Object.getOwnPropertyNames(obj).forEach(function (name) {
                    result[name] = Object.getOwnPropertyDescriptor(obj, name);
                });
                return result;
            }
            // As long as obj is not frozen, the proxy won't allow itself to be fixed
            return undefined; // will cause a TypeError to be thrown
        },

        has:function (name) {
            return name in obj;
        },
        hasOwn:function (name) {
            return ({}).hasOwnProperty.call(obj, name);
        },
        get:function (receiver, name) {
            return obj[name];
        },
        set:function (receiver, name, val) {
            obj[name] = val;
            return true;
        }, // bad behavior when set fails in non-strict mode
        enumerate:function () {
            var result = [];
            for (var name in obj) {
                result.push(name);
            }
            return result;
        },
        keys:function () {
            return Object.keys(obj);
        }

    };
};

var noSuchMethodHandler = function (obj, handler) {
    return {
        get:function (receiver, name) {
            return obj[name] ? obj[name] : handler.call(obj, name);
        }
    }
};

/**
 * Creates a proxy for an object.
 * @param obj object to proxy
 * @param {Object} opts object with methods to define on the handler.
 * @memberOf comb
 */
comb.handlerProxy = function (obj, opts, proto) {
    opts = opts || {};
    if (misc.isUndefined(proto)) {
        return  Proxy.create(merge(handlerMaker(obj), opts));
    } else {
        return  Proxy.create(merge(handlerMaker(obj), opts), object.isHash(proto) ? proto : proto.prototype);
    }
};

/**
 * Creates a method missing proxy for an object.
 * <b>NOTE:</b> This method does not gurantee that the property will be used as a function call.
 *
 * @example
 *
 *  var x = {hello:function () {return "hello"}, world:"world"};
 *  var xHandler = comb.methodMissing(x, function (m) {
 *              //you can do more interesting stuff in here!
 *               return function () {
 *                   return [m].concat(comb.argsToArray(arguments));
 *               }
 *   });
 *  xHandler.hello(); //=> "hello"
 *  xHandler.world //=> "world"
 *  xHandler.someMethod("hello", "world"); //=> [ 'someMethod', 'hello', 'world' ]
 *
 * @param {Object} obj object to wrap with a method missing proxy
 * @param {Function} handler handle to call when a property is missing
 * @param {Object} opts prototype to assign to the proxy
 * @memberOf comb
 * @returns {Proxy} a proxy
 */
comb.methodMissing = function (obj, handler, proto) {
    proto = proto || {};
    return  Proxy.create(merge(handlerMaker(obj), noSuchMethodHandler(obj, handler)), object.isHash(proto) ? proto : proto.prototype);
};

/**
 *  Determines if the object is a proxy or not.
 *
 * @param {Anything} obj object to test
 * @memberOf comb
 * @returns {Boolean} true if it is a proxy false otherwise
 */
comb.isProxy = function (obj) {
    var undef;
    return obj !== undef && obj !== null && Proxy.isProxy(obj);
}

/**
 * Creates a function proxy for an object.
 *
 * @example
 *
 * //create an object that can use properties or as a function through the new operator
 * var MyObject = comb.define(null, {
 *     instance : {
 *         hello : "hello",
 *         constructor : function(){
 *             this.args = comb.argsToArray(arguments);
 *         }
 *     }
 * });
 *
 * //NOTE: this will not work properly for native objects like Date.
 * var createNewMyObject = function(){
 *    try {
 *      p = new MyObject();
 *     } catch (ignore) {
 *          //ignore the error because its probably from missing arguments
 *     }
 *     //Now lets take care of arguments supplied!!!
 *     return MyObject.apply(p, comb.argsToArray(arguments));
 * };
 *
 * //This example creates an object with a world property but its not a function!
 * var handle = comb.createFunctionWrapper({world : "world"}, createNewMyObject, createNewMyObject);
 *
 * handle.world //=> "world"
 * var a = handle(1);
 * a.hello;  //=>"hello"
 * a.args; //=> [1];
 * a = new handle(1,2);
 * a.hello; //=>"hello"
 * a.args; //=> [1,2];
 * @param obj the object to proxy
 * @param {Function} handler the handler to call when the object is used as a function
 * @param {Function} constructTrap the funciton to use when using new on the object
 * @param {Object} opts the prototype of the object.
 * @memberOf comb
 */
comb.createFunctionWrapper = function (obj, handler, constructTrap, opts) {
    var args = misc.argsToArray(arguments), ret;
    if (args.length != 4) {
        opts = object.isHash(args[args.length - 1]) ? args.pop() : null;
        constructTrap = functions.isFunction(args[args.length - 1]) ? args.pop() : null;
        handler = functions.isFunction(args[args.length - 1]) ? args.pop() : null;
    }
    if (misc.isUndefined(obj)) throw new Error("obj required when using create function wrapper");
    if (functions.isFunction(constructTrap) && !functions.isFunction(handler)) {
        ret = Proxy.createFunction(handlerMaker(obj), constructTrap);
    } else {
        ret = Proxy.createFunction(handlerMaker(obj), handler, constructTrap);
    }


    if (opts) {
        Proxy.setPrototype(ret, object.isHash(opts) ? opts : opts.prototype);
    }
    return ret;
};


comb.Proxy = Proxy;