"use strict";
/**
 * Used to keep track of classes and to create unique ids
 * @ignore
 */
var classCounter = 0, Base,
    _base = require("./base"),
    isHash = _base.isHash,
    isArray = _base.isArray,
    SUPER_REGEXP = /(super)/ig,
    invoke = _base.__spreadArgs;


function callSuper(args, a) {
    /*jshint validthis:true*/
    var meta = this.__meta,
        supers = meta.supers,
        l = supers.length, superMeta = meta.superMeta, pos = superMeta.pos;
    if (l > pos) {
        a && (args = a);
        var name = superMeta.name, f = superMeta.f, m;
        do {
            m = supers[pos][name];
            if ("function" === typeof m && (m = m._f || m) !== f) {
                superMeta.pos = 1 + pos;
                return invoke(m, args, this);
            }
        } while (l > ++pos);
    }
    return null;
}

function getSuper() {
    /*jshint validthis:true*/
    var meta = this.__meta,
        supers = meta.supers,
        l = supers.length, superMeta = meta.superMeta, pos = superMeta.pos;
    if (l > pos) {
        var name = superMeta.name, f = superMeta.f, m;
        do {
            m = supers[pos][name];
            if ("function" === typeof m && (m = m._f || m) !== f) {
                superMeta.pos = 1 + pos;
                return m.bind(this);
            }
        } while (l > ++pos);
    }
    return null;
}


function defaultFunction() {
    /*jshint validthis:true*/
    var meta = this.__meta || {},
        supers = meta.supers,
        l = supers.length, superMeta = meta.superMeta, pos = superMeta.pos;
    if (l > pos) {
        var name = superMeta.name, f = superMeta.f, m;
        do {
            m = supers[pos][name];
            if ("function" === typeof m && (m = m._f || m) !== f) {
                superMeta.pos = 1 + pos;
                return invoke(m, arguments, this);
            }
        } while (l > ++pos);
    }
    return null;
}


function functionWrapper(f, name) {
    if (f.toString().match(SUPER_REGEXP)) {
        var wrapper = function () {
            var ret, meta = this.__meta || {};
            var orig = meta.superMeta;
            meta.superMeta = {f: f, pos: 0, name: name};
            ret = invoke(f, arguments, this);
            meta.superMeta = orig;
            return ret;
        };
        wrapper._f = f;
        return wrapper;
    } else {
        f._f = f;
        return f;
    }
}


/**
 * @ignore
 */
function defineMixinProps(child, proto) {

    var operations = proto.setters || {};
    for (var i in operations) {
        if (!child["__lookupSetter__"](i)) {  //make sure that the setter isnt already there
            child["__defineSetter__"](i, operations[i]);
        }
    }
    operations = proto.getters || {};
    for (i in operations) {
        if (!child["__lookupGetter__"](i)) {
            //define the getter if the child does not already have it
            child["__defineGetter__"](i, operations[i]);
        }
    }
    for (var j in proto) {
        if (j !== "getters" && j !== "setters") {
            var p = proto[j];
            if ("function" === typeof p) {
                if (!child.hasOwnProperty(j)) {
                    child[j] = functionWrapper(defaultFunction, j);
                }
            } else {
                child[j] = p;
            }
        }
    }
}


/**
 * @ignore
 */
function mixin() {
    /*jshint validthis:true*/
    var args = Array.prototype.slice.call(arguments), l = args.length;
    var child = this.prototype, childMeta = child.__meta, thisMeta = this.__meta, bases = child.__meta.bases, staticBases = bases.slice(),
        staticSupers = thisMeta.supers || [], supers = childMeta.supers || [];
    for (var i = 0; i < l; i++) {
        var m = args[i], mProto = m.prototype;
        var protoMeta = mProto.__meta, meta = m.__meta;
        if (!protoMeta) {
            protoMeta = {proto: mProto || {}};
            Object.defineProperty(mProto, "__meta", {
                enumerable: false,
                value: protoMeta
            });
        }
        if (!meta) {
            meta = {proto: m["__proto__"] || {}};
            Object.defineProperty(m, "__meta", {
                enumerable: false,
                value: protoMeta
            });
        }
        defineMixinProps(child, protoMeta.proto || {});
        defineMixinProps(this, meta.proto || {});
        //copy the bases for static,

        mixinSupers(m.prototype, supers, bases);
        mixinSupers(m, staticSupers, staticBases);
    }
    return this;
}

/**
 * @ignore
 */
function mixinSupers(sup, arr, bases) {
    var meta = sup.__meta;
    if (!meta) {
        meta = {};
        Object.defineProperty(sup, "__meta", {
            enumerable: false,
            value: meta
        });
    }
    var unique = sup.__meta.unique;
    !unique && (meta.unique = "define" + (++classCounter));
    //check it we already have this super mixed into our prototype chain
    //if true then we have already looped their supers!
    if (bases.indexOf(unique) === -1) {
        //add their id to our bases
        bases.push(unique);
        var supers = sup.__meta.supers || [], i = supers.length - 1 || 0;
        while (i >= 0) {
            mixinSupers(supers[i--], arr, bases);
        }
        arr.unshift(sup);
    }
}


/**
 * @ignore
 */
function defineProps(child, proto) {
    var operations = proto.setters, i;
    if (operations) {
        for (i in operations) {
            child["__defineSetter__"](i, operations[i]);
        }
    }
    operations = proto.getters || {};
    if (operations) {
        for (i in operations) {
            child["__defineGetter__"](i, operations[i]);
        }
    }
    for (i in proto) {
        if (i !== "getters" && i !== "setters") {
            var f = proto[i];
            if ("function" === typeof f) {
                var meta = f.__meta || {};
                if (!meta.isConstructor) {
                    child[i] = functionWrapper(f, i);
                } else {
                    child[i] = f;
                }
            } else {
                child[i] = f;
            }
        }
    }

}

function _export(obj, name) {
    /*jshint validthis:true*/
    if (obj && name) {
        obj[name] = this;
    } else {
        obj.exports = obj = this;
    }
    return this;
}

function extend(proto) {
    /*jshint validthis:true*/
    return define(this, proto);
}


/**
 * @ignore
 */
function __define(child, sup, proto) {
    var childProto = child.prototype, supers = [];
    var unique = "define" + (++classCounter), bases = [], staticBases = [];
    var instanceSupers = [], staticSupers = [];
    var meta = {
        supers: instanceSupers,
        unique: unique,
        bases: bases,
        superMeta: {
            f: null,
            pos: 0,
            name: null
        }
    };
    Object.defineProperty(childProto, "__meta", {
        enumerable: false,
        value: meta
    });
    var childMeta = {
        supers: staticSupers,
        unique: unique,
        bases: staticBases,
        isConstructor: true,
        superMeta: {
            f: null,
            pos: 0,
            name: null
        }
    };
    Object.defineProperty(child, "__meta", {
        enumerable: false,
        value: childMeta
    });
    if ((isHash(sup) && !proto)) {
        proto = sup;
        sup = Base;
    } else if ((!sup && isHash(proto))) {
        sup = Base;
    }

    if ("function" === typeof sup || isArray(sup)) {
        /*jshint proto:true*/
        supers = isArray(sup) ? sup : [sup];
        sup = supers.shift();
        child["__proto__"] = sup;
        childProto["__proto__"] = sup.prototype;
        mixinSupers(sup.prototype, instanceSupers, bases);
        mixinSupers(sup, staticSupers, staticBases);
    }
    if (proto) {
        var instance = meta.proto = proto.instance || {};
        !instance.hasOwnProperty("constructor") && (instance.constructor = defaultFunction);
        var stat = childMeta.proto = proto.static || {};
        stat.init = stat.init || defaultFunction;
        defineProps(childProto, instance, false);
        defineProps(child, stat, true);
    } else {
        meta.proto = {};
        childMeta.proto = {};
        child.init = functionWrapper(defaultFunction, "init");
        childProto.constructor = functionWrapper(defaultFunction, "constructor");
    }
    if (supers.length) {
        invoke(mixin, supers, child);
    }
    Object.defineProperty(childProto, "_super", {
        enumerable: false,
        value: callSuper
    });
    Object.defineProperty(child, "_super", {
        enumerable: false,
        value: callSuper
    });
    Object.defineProperty(child, "_getSuper", {
        enumerable: false,
        value: getSuper
    });
    Object.defineProperty(childProto, "_getSuper", {
        enumerable: false,
        value: getSuper
    });
    Object.defineProperty(childProto, "_static", {
        enumerable: false,
        value: child
    });
}

function define(sup, proto) {
    function defineConstructor() {
        /*jshint validthis:true*/
        invoke(this.constructor, arguments, this);
        sup = proto = null;
    }

    __define(defineConstructor, sup, proto);
    return defineConstructor.init() || defineConstructor;
}

function singleton(sup, proto) {
    var retInstance;

    function singletonConstructor() {
        /*jshint validthis:true*/
        if (!retInstance) {
            invoke(this.constructor, arguments, this);
            retInstance = this;
        }
        return retInstance;
    }

    __define(singletonConstructor, sup, proto);
    return singletonConstructor.init() || singletonConstructor;
}

Base = define({
    instance: {},

    "static": {
        mixin: mixin,
        extend: extend,
        as: _export
    }
});


/**
 * Defines a new class to be used
 *
 * <p>
 *     Class methods
 *     <ul>
 *         <li>as(module | object, name): exports the object to module or the object with the name</li>
 *         <li>mixin(mixin) : mixes in an object</li>
 *     </ul>
 *     </br>
 *     Instance methods
 *     <ul>
 *         <li>_super(argumnents, [?newargs]): calls the super of the current method</li>
 *     </ul>
 *
 *      </br>
 *     Instance properties
 *     <ul>
 *         <li>_static: use to reference class properties and methods</li>
 *     </ul>
 *
 * </p>
 *
 *
 * @example
 *  //Class without a super class
 * var Mammal = comb.define(null, {
 *      instance : {
 *
 *          constructor: function(options) {
 *              options = options || {};
 *              this._super(arguments);
 *              this._type = options.type || "mammal";
 *          },
 *
 *          speak : function() {
 *              return  "A mammal of type " + this._type + " sounds like";
 *          },
 *
 *          //Define your getters
 *          getters : {
 *              type : function() {
 *                  return this._type;
 *              }
 *          },
 *
 *           //Define your setters
 *          setters : {
 *              type : function(t) {
 *                  this._type = t;
 *              }
 *          }
 *      },
 *
 *      //Define your static methods
 *      static : {
 *          soundOff : function() {
 *              return "Im a mammal!!";
 *          }
 *      }
 * });
 *
 * //Show singular inheritance
 *var Wolf = comb.define(Mammal, {
 *   instance: {
 *       constructor: function(options) {
 *          options = options || {};
 *          //You can call your super constructor, or you may not
 *          //call it to prevent the super initializing parameters
 *          this._super(arguments);
 *          this._sound = "growl";
 *          this._color = options.color || "grey";
 *      },
 *
 *      speak : function() {
 *          //override my super classes speak
 *          //Should return "A mammal of type mammal sounds like a growl"
 *          return this._super(arguments) + " a " + this._sound;
 *      },
 *
 *      //add new getters for sound and color
 *      getters : {
 *
 *          color : function() {
 *              return this._color;
 *          },
 *
 *          sound : function() {
 *              return this._sound;
 *          }
 *      },
 *
 *      setters : {
 *
 *          //NOTE color is read only except on initialization
 *
 *          sound : function(s) {
 *              this._sound = s;
 *          }
 *      }
 *
 *  },
 *
 *  static : {
 *      //override my satic soundOff
 *      soundOff : function() {
 *          //You can even call super in your statics!!!
 *          //should return "I'm a mammal!! that growls"
 *          return this._super(arguments) + " that growls";
 *      }
 *  }
 *});
 *
 *
 * //Typical hierarchical inheritance
 * // Mammal->Wolf->Dog
 * var Dog = comb.define(Wolf, {
 *    instance: {
 *        constructor: function(options) {
 *            options = options || {};
 *            this._super(arguments);
 *            //override Wolfs initialization of sound to woof.
 *            this._sound = "woof";
 *
 *        },
 *
 *        speak : function() {
 *            //Should return "A mammal of type mammal sounds like a growl thats domesticated"
 *            return this._super(arguments) + " thats domesticated";
 *        }
 *    },
 *
 *    static : {
 *        soundOff : function() {
 *            //should return "I'm a mammal!! that growls but now barks"
 *            return this._super(arguments) + " but now barks";
 *        }
 *    }
 *});
 *
 *
 *
 * dog instanceof Wolf => true
 * dog instanceof Mammal => true
 * dog.speak() => "A mammal of type mammal sounds like a woof thats domesticated"
 * dog.type => "mammal"
 * dog.color => "gold"
 * dog.sound => "woof"
 * Dog.soundOff() => "Im a mammal!! that growls but now barks"
 *
 * // Mammal->Wolf->Dog->Breed
 *var Breed = comb.define(Dog, {
 *    instance: {
 *
 *        //initialize outside of constructor
 *        _pitch : "high",
 *
 *        constructor: function(options) {
 *            options = options || {};
 *            this._super(arguments);
 *            this.breed = options.breed || "lab";
 *        },
 *
 *        speak : function() {
 *            //Should return "A mammal of type mammal sounds like a
 *            //growl thats domesticated with a high pitch!"
 *            return this._super(arguments) + " with a " + this._pitch + " pitch!";
 *        },
 *
 *        getters : {
 *            pitch : function() {
 *                return this._pitch;
 *            }
 *        }
 *    },
 *
 *    static : {
 *        soundOff : function() {
 *            //should return "I'M A MAMMAL!! THAT GROWLS BUT NOW BARKS!"
 *            return this._super(arguments).toUpperCase() + "!";
 *        }
 *    }
 * });
 *
 *
 * var breed = new Breed({color : "gold", type : "lab"}),
 *
 *
 *
 * breed instanceof Dog => true
 * breed instanceof Wolf => true
 * breed instanceof Mammal => true
 * breed.speak() => "A mammal of type lab sounds like a woof "
 *                  + "thats domesticated with a high pitch!"
 * breed.type => "lab"
 * breed.color => "gold"
 * breed.sound => "woof"
 * breed.soundOff() => "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!"
 *
 *
 *  //Example of multiple inheritance
 *  //NOTE proto is optional
 *
 *  //Mammal is super class
 *  //Wolf Dog and Breed inject functionality into the prototype
 * var Lab = comb.define([Mammal, Wolf, Dog, Breed]);
 *
 * var lab = new Lab();
 * lab instanceof Wolf => false
 * lab instanceof Dog => false
 * lab instanceof Breed => false
 * lab instanceof Mammal => true
 * lab.speak() => "A mammal of type mammal sounds like a"
 *                + " woof thats domesticated with a high pitch!"
 * Lab.soundOff() => "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!"
 *
 * @name define
 * @memberOf comb
 *
 * @param {Array|Class} super the supers of this class
 * @param {Object} [proto] the object used to define this class
 * @param {Object} [proto.instance] the instance methods of the class
 * @param {Object} [proto.instance.getters] the getters for the class
 * @param {Object} [proto.instance.setters] the setters for the class
 * @param {Object} [proto.static] the Class level methods of this class
 * @param {Object} [proto.static.getters] static getters for the object
 * @param {Object} [proto.static.setters] static setters for the object
 *
 * @returns {Object} the constructor of the class to be used with new keyword
 */
exports.define = define;

/**
 * Defines a singleton instance of a Class. See {@link define}
 * @example
 *  var MyLab = comb.singleton([Mammal, Wolf, Dog, Breed]);
 *  var myLab1 = new MyLab();
 *  myLab1.type = "collie"
 *  var myLab2 = new MyLab();
 *  myLab1 === myLab2 => true
 *  myLab1.type => "collie"
 *  myLab2.type => "collie"
 *
 *
 * @name singleton
 * @memberOf comb

 */
exports.singleton = singleton;
