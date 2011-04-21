/**
 * @private
 */
var base = require("./base/object");

var classCounter = 0;

var callSuper = function(args, a, count) {
    var f = "", u;
    var name, callee, m, meta = this.__meta;
    count = count || 0;
    if (typeof args == "string") {
        f = args;
        args = a;
    } else {
        callee = args.callee;
        f = callee._name;
        u = callee._unique || "define-1";
    }
    if (!f) {
        throw new Error("can't deduce a name to call super()");
    } else if (f != meta.superName) {
        //if the inheritance stopped early last time then we need to reset;
        meta.superPos = 0;
        meta.superName = f;
    }
    var supers = meta.supers, l = meta.supers.length;
    for (var i = meta.superPos; i < l; i++) {
        var sup = supers[i];
        if (sup && sup[f] && sup[f]._unique != u) {
            m = sup[f];
            break;
        }
    }

    meta.superPos = i == 0 ? 1 : i;
    if (meta.superPos >= l) {
        meta.superPos = 0;
    }
    if (m) {
        return m.apply(this, args);
    } else {
        meta.superPos = 0;
        return null;
    }
};

var defineMixinProps = function(child, proto, unique) {
    if (proto) {
        var operations = proto.setters;
        if (operations) {
            for (var i in operations) {
                if (!child.__lookupSetter__(i)) {  //make sure that the setter isnt already there
                    child.__defineSetter__(i, operations[i]);
                }
            }
        }
        operations = proto.getters;
        if (operations) {
            for (i in operations) {
                if (!child.__lookupGetter__(i)) {
                    //define the getter if the child does not already have it
                    child.__defineGetter__(i, operations[i]);
                }
            }
        }
        if (proto) {
            for (j in proto) {
                if (j != "getters" && j != "setters") {
                    if (!child[j] || (child[j]._unique != unique)) {
                        child[j] = proto[j];
                    }
                }
            }
        }
    }
};

var mixin = function() {
    var args = Array.prototype.slice.call(arguments);
    var child = this.prototype, bases = child.__meta.bases, staticBases = bases.slice(), constructor = child.constructor;
    for (var i = 0; i < args.length; i++) {
        var m = args[i];
        var proto = m.prototype.__meta.proto;
        defineMixinProps(child, proto.instance, constructor._unique);
        defineMixinProps(this, proto.static, constructor._unique);
        //copy the bases for static,
        var staticSupers = this.__meta.supers, supers = child.__meta.supers;
        child.__meta.supers = mixinSupers(m.prototype, bases).concat(supers);
        this.__meta.supers = mixinStaticSupers(m, staticBases).concat(staticSupers);
    }
    return this;
};

var mixinSupers = function(sup, bases) {
    var arr = [], unique = sup.constructor._unique;
    //check it we already have this super mixed into our prototype chain
    //if true then we have already looped their supers!
    if (bases.indexOf(unique) == -1) {
        arr.push(sup);
        //add their id to our bases
        bases.push(unique);
        var supers = sup.__meta.supers, l = supers.length;
        if (supers && l) {
            for (var i = 0; i < l; i++) {
                arr = arr.concat(mixinSupers(supers[i], bases));
            }
        }
    }
    return arr;
};

var mixinStaticSupers = function(sup, bases) {
    var arr = [], unique = sup.prototype.constructor._unique;
    if (bases.indexOf(unique) == -1) {
        arr.push(sup);
        bases.push(unique);
        var supers = sup.__meta.supers, l = supers.length;
        if (supers && supers.length) {
            for (var i = 0; i < l; i++) {
                arr = arr.concat(mixinStaticSupers(supers[i], bases));
            }
        }
    }
    return arr;
};

var defineProps = function(child, proto) {
    if (proto) {
        var operations = proto.setters;
        if (operations) {
            for (var i in operations) {
                child.__defineSetter__(i, operations[i]);
            }
        }
        operations = proto.getters;
        if (operations) {
            for (i in operations) {
                child.__defineGetter__(i, operations[i]);
            }
        }
        for (i in proto) {
            if (i != "getters" && i != "setters") {
                var f = proto[i];
                if (typeof f == "function") {
                    f._name = i;
                    f._unique = "define" + classCounter;
                }
                child[i] = f;
            }
        }
    }
};

var __define = function(child, sup, proto) {
    proto = proto || {};
    var childProto = child.prototype, supers = [];
    if (sup instanceof Array) {
        supers = sup;
        sup = supers.shift();
    }
    var bases = [], meta, staticMeta;
    if (sup) {
        child.__proto__ = sup;
        childProto.__proto__ = sup.prototype;
        meta = childProto.__meta = {
            supers : mixinSupers(sup.prototype, bases),
            superPos : 0,
            superName : ""
        };
        staticMeta = child.__meta = {
            supers : mixinStaticSupers(sup, []),
            superPos : 0,
            superName : ""
        };
    } else {
        meta = childProto.__meta = {
            supers : [],
            superPos : 0,
            superName : ""
        };
        staticMeta = child.__meta = {
            supers : [],
            superPos : 0,
            superName : ""
        };
    }
    meta.proto = proto;
    defineProps(childProto, proto.instance);
    defineProps(child, proto.static)
    meta.bases = bases;
    staticMeta.bases = bases;
    //childProto.constructor._unique = "define" + classCounter;
    if (supers.length) {
        mixin.apply(child, supers);
    }
    child.mixin = mixin;
    child.super = callSuper;
    childProto.super = callSuper;
    classCounter++;
    return child;
};

/**
 * Defines a new class to be used
 *
 * @param {Array|Class} super the supers of this class
 * @param {Object} proto the object used to define this class
 * @param {Object} proto.instance the instance methods of this class
 * @param {Object} proto.getters the getters for this class
 * @param {Object} proto.setters the setters for this class
 * @param {Object} proto.static the Class level methods of this class
 */
exports.define = function(super, proto) {
    var child = function() {
        //if a unique wasn't defined then the
        //child didn't define one!
        var instance = this.__meta.proto.instance;
        if (instance && instance.constructor._unique) {
            instance.constructor.apply(this, arguments);
        } else {
            this.super("constructor", arguments);
        }

    };
    return __define(child, super, proto);
};

/**
 * defines a singleton instance of a Class
 *
 * @see comb.define
 */
exports.singleton = function(super, proto) {
    var retInstance;
    var child = function() {
        if (!retInstance) {
            //if a unique wasn't defined then the
            //child didn't define one!
            var instance = this.__meta.proto.instance;
            if (instance && instance.constructor._unique) {
                instance.constructor.apply(this, arguments);
            } else {
                this.super("constructor", arguments);
            }
            retInstance = this;
        }
        return retInstance;
    };
    return __define(child, super, proto);
};