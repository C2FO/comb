var base = require("./base");

/**
 * Used to keep track of classes and to create unique ids
 * @ignore
 */
var classCounter = 0;

var functionWrapper = function (f) {
    var wrapper = function () {
        var supers = wrapper._supers, l = supers.length, pos = 0;
        if (l) {
            this._super = function (args, a) {
                if (a) {
                    args = a;
                }
                if (pos < l) {
                    return supers[pos++].apply(this, args);
                } else {
                    return null
                }
            };
        } else {
            this._super = function () {
                return null;
            };
        }
        var ret = f.apply(this, arguments);
        this._super = null;
        return ret;
    }
    wrapper._f = f;
    wrapper._supers = [];
    wrapper.pos = 0;
    return wrapper;
};

var constructorWrapper = function (c) {
    var wrapper = function () {
        var supers = wrapper._supers, l = supers.length, pos = 0;
        if (l) {
            this._super = function (args, a) {
                if (a) {
                    args = a;
                }
                if (pos < l) {
                    return supers[pos++].apply(this, args);
                } else {
                    return null
                }
            };
        } else {
            this._super = function () {
                return null;
            };
        }
        var ret = c.apply(this, arguments);
        this._super = null;
        return ret;
    }
    wrapper._f = c;
    wrapper._supers = [];
    return wrapper;
};


/**
 * Alias to call the super method of a particular class
 *
 * @ignore
 */
var callSuper = function (args, a) {
    if (!args && !a) {
        throw new Error("arguments must be defined.");
    }
    var f = "", u;
    var callee, m, meta = this.__meta || {}, pos, supers, l;
    if (!a) {
        a = args;
    }
    if (args.callee) {
        callee = args.callee;
        !f && (f = callee._name);
        u = callee._unique;
        pos = meta.pos, supers = meta.supers, l = meta.supers.length;
        if (f != "constructor") {
            if (meta.unique === u) {
                pos = 0;
            } else if (callee != meta.callee) {
                pos = 0;
                for (; pos < l; pos++) {
                    var sup = supers[pos], sm = sup ? sup[f] : null;
                    if (sm == callee) {
                        pos++;
                        break;
                    }
                }
            }
            for (; pos < l; pos++) {
                var sup = supers[pos], sm = sup ? sup[f] : null;
                if (sm && sm != callee) {
                    m = sm;
                    break;
                }
            }
        } else {
            if (meta.unique === u) {
                pos = 0;
            } else if (callee != meta.callee) {
                pos = 0;
                for (; pos < l; pos++) {
                    var sup = supers[pos].__meta.proto;
                    if (sup.instance && sup.instance.hasOwnProperty(f)) {
                        sm = sup.instance[f];
                        if (sm == callee) {
                            pos++;
                            break;
                        }
                    }
                }
            }
            for (; pos < l; pos++) {
                var sup = supers[pos].__meta.proto;
                if (sup.instance && sup.instance.hasOwnProperty(f)) {
                    sm = sup.instance[f];
                    if (sm && sm != callee) {
                        m = sm;
                        break;
                    }
                }
            }
        }
    } else {
        throw new Error("can't find the _super");
    }
    meta.callee = m;
    meta.pos = m ? ++pos : -1;
    if (m) {
        return m.apply(this, a);
    } else {
        return null;
    }
};

/**
 * @ignore
 */
var defineMixinProps = function (child, proto, unique) {
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
            for (var j in proto) {
                if (j != "getters" && j != "setters") {
                    var p = proto[j];
                    if (!child.hasOwnProperty(j)) {
                        if (base.isFunction(p)) {
                            var f = j == "constructor" ? constructorWrapper(p._f || p) : functionWrapper(p._f || p);
                            child[j] = f;
                        } else {
                            child[j] = p;
                        }
                    } else if (base.isFunction(p) && base.isFunction(child[j])) {
                        child[j]._supers.unshift(p._f || p);
                    }
                }
            }
        }
    }
};

/**
 * @ignore
 */
var mixin = function () {
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
        this.__meta.supers = mixinSupers(m, staticBases).concat(staticSupers);
    }
    return this;
};

/**
 * @ignore
 */
var mixinSupers = function (sup, bases) {
    var arr = [], unique = sup.__meta.unique;
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


/**
 * @ignore
 */
var defineProps = function (child, proto, isStatic) {
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
        var constructorFound = false;
        for (i in proto) {
            if (i != "getters" && i != "setters") {
                var f = proto[i];
                if (base.isFunction(f) && i != "constructor") {
                    child[i] = functionWrapper(f._f || f);
                } else {
                    child[i] = f;
                }
            }
        }
    }
};

var defaultConstructor = function () {
    this._super(arguments);
};

var _export = function (obj, name) {
    if (obj && name) {
        obj[name] = this;
    } else {
        obj.exports = obj = this;
    }
    return this;
};


/**
 * @ignore
 */
var __define = function (child, sup, proto) {
    var childProto = child.prototype, supers = [];
    if (sup instanceof Array) {
        supers = sup;
        sup = supers[0];
    }
    var bases = [], meta, staticMeta;
    if (sup) {
        child.__proto__ = sup;
        childProto.__proto__ = sup.prototype;
        meta = childProto.__meta = {
            supers:mixinSupers(sup.prototype, bases),
            superPos:0,
            superName:"",
            unique:"define" + classCounter
        };
        staticMeta = child.__meta = {
            supers:mixinSupers(sup, []),
            superPos:0,
            superName:"",
            unique:"define" + classCounter
        };
        defineProps(childProto, sup.__meta d, false);
        defineProps(child, sup, true);
    } else {
        meta = childProto.__meta = {
            supers:[],
            superPos:0,
            superName:"",
            unique:"define" + classCounter
        };
        staticMeta = child.__meta = {
            supers:[],
            superPos:0,
            superName:"",
            unique:"define" + classCounter
        };
    }
    meta.proto = proto;
    childProto._static = child;
    var instance = proto.instance = proto.instance || {};
    childProto.constructor = instance.constructor = instance.constructor ? constructorWrapper(instance.constructor) : constructorWrapper(defaultConstructor)
    defineProps(childProto, proto.instance, false);
    defineProps(child, proto.static, true);
    meta.bases = bases;
    staticMeta.bases = bases;
    if (supers.length) {
        mixin.apply(child, supers);
    }
    child.mixin = mixin;
    child.as = _export;
    classCounter++;
    return child;
};


base.merge(exports, {
    /**@lends comb*/

    /**
     * Defines a new class to be used
     *
     * <p>
     *     Class methods
     *     <ul>
     *         <li>as(module | bject, name): exports the object to module or the object with the name</li>
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
    define:function (sup, proto) {
        proto = proto || {};
        var child = function () {
            /proto.instance.constructor.apply(this, arguments);
            /*//if a unique wasn't defined then the
             //child didn't define one!
             var instance = this.__meta.proto.instance, c;
             if (instance && instance.constructor && instance.constructor._unique) {
             c = instance.constructor;

             } else {
             var supers = this.__meta.supers, l = supers.length;
             for (var i = 0; i < l; i++) {
             var protoInstance = supers[i].__meta.proto.instance;
             if (protoInstance && protoInstance.hasOwnProperty("constructor")) {
             c = protoInstance.constructor;
             break;
             }
             }
             }
             constructorWrapper(c).apply(this, arguments); */

        //};
        var ret = __define(function(){}, sup, proto);
        if (typeof ret.init === "function") {
            ret = ret.init() || ret;
        }
        return ret;
    },

    /**
     * Defines a singleton instance of a Class
     * @example
     *  var MyLab = comb.singleton([Mammal, Wolf, Dog, Breed]);
     *  var myLab1 = new MyLab();
     *  myLab1.type = "collie"
     *  var myLab2 = new MyLab();
     *  myLab1 === myLab2 => true
     *  myLab1.type => "collie"
     *  myLab2.type => "collie"
     * See {@link define}
     */
    singleton:function (sup, proto) {
        var retInstance;
        proto = proto || {};
       /* var child = function () {
            if (!retInstance) {
                var instance = this.__meta.proto.instance, c;
                if (instance && instance.constructor && instance.constructor._unique) {
                    c = instance.constructor;

                } else {
                    var supers = this.__meta.supers, l = supers.length;
                    for (var i = 0; i < l; i++) {
                        var protoInstance = supers[i].__meta.proto.instance;
                        if (protoInstance && protoInstance.hasOwnProperty("constructor")) {
                            c = protoInstance.constructor;
                            break;
                        }
                    }
                }
                constructorWrapper(c).apply(this, arguments);
                retInstance = this;
            }
            return retInstance;
        };*/
        var ret = __define(child, sup, proto);
        if (typeof ret.init === "function") {
            ret = ret.init() || ret;
        }
        return ret;
    }
});
