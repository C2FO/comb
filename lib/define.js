var base = require("./base/object");

/**
 * Used to keep track of classes and to create unique ids
 * @ignore
 */
var classCounter = 0;

/**
 * Alias to call the super method of a particular class
 *
 * @ignore
 */
var callSuper = function(args, a) {
    var f = "", u;
    var callee, m, meta = this.__meta || {}, pos, supers, l;
    if (typeof args == "string") {
        f = args;
        args = a;
    }
    callee = args.callee;
    !f && (f = callee._name);
    u = callee._unique;
    if (!f) {
        throw new Error("can't find the super");
    }
    pos = meta.pos,supers = meta.supers,l = meta.supers.length;
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
            if (sm) {
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
                if (sm) {
                    m = sm;
                    break;
                }
            }
        }
    }
    meta.callee = m;
    meta.pos = m ? ++pos : -1;
    if (m) {
        return m.apply(this, args);
    } else {
        return null;
    }
};

/**
 * @ignore
 */
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

/**
 * @ignore
 */
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
        this.__meta.supers = mixinSupers(m, staticBases).concat(staticSupers);
    }
    return this;
};

/**
 * @ignore
 */
var mixinSupers = function(sup, bases) {
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
                if (i != "constructor") {
                    child[i] = f;
                }
            }
        }
    }
};

/**
 * @ignore
 */
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
            superName : "",
            unique : "define" + classCounter
        };
        staticMeta = child.__meta = {
            supers : mixinSupers(sup, []),
            superPos : 0,
            superName : "",
            unique : "define" + classCounter
        };
    } else {
        meta = childProto.__meta = {
            supers : [],
            superPos : 0,
            superName : "",
            unique : "define" + classCounter
        };
        staticMeta = child.__meta = {
            supers : [],
            superPos : 0,
            superName : "",
            unique : "define" + classCounter
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


base.merge(exports, {
/**@lends comb*/

    /**
     * Defines a new class to be used
     *
     * @example
     *  //Class without a super class
     * var Mammal = comb.define(null, {
     *      instance : {
     *
     *          constructor: function(options) {
     *              options = options || {};
     *              this.super(arguments);
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
     *          this.super(arguments);
     *          this._sound = "growl";
     *          this._color = options.color || "grey";
     *      },
     *
     *      speak : function() {
     *          //override my super classes speak
     *          //Should return "A mammal of type mammal sounds like a growl"
     *          return this.super(arguments) + " a " + this._sound;
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
     *          return this.super(arguments) + " that growls";
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
     *            this.super(arguments);
     *            //override Wolfs initialization of sound to woof.
     *            this._sound = "woof";
     *
     *        },
     *
     *        speak : function() {
     *            //Should return "A mammal of type mammal sounds like a growl thats domesticated"
     *            return this.super(arguments) + " thats domesticated";
     *        }
     *    },
     *
     *    static : {
     *        soundOff : function() {
     *            //should return "I'm a mammal!! that growls but now barks"
     *            return this.super(arguments) + " but now barks";
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
     *            this.super(arguments);
     *            this.breed = options.breed || "lab";
     *        },
     *
     *        speak : function() {
     *            //Should return "A mammal of type mammal sounds like a
     *            //growl thats domesticated with a high pitch!"
     *            return this.super(arguments) + " with a " + this._pitch + " pitch!";
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
     *            return this.super(arguments).toUpperCase() + "!";
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
    define : function(super, proto) {
        var child = function() {
            //if a unique wasn't defined then the
            //child didn't define one!
            var instance = this.__meta.proto.instance;
            if (instance && instance.constructor && instance.constructor._unique) {
                instance.constructor.apply(this, arguments);
            } else {
                var supers = this.__meta.supers, l = supers.length;
                for (var i = 0; i < l; i++) {
                    var protoInstance = supers[i].__meta.proto.instance;
                    if (protoInstance && protoInstance.hasOwnProperty("constructor")) {
                        protoInstance.constructor.apply(this, arguments);
                        break;
                    }
                }
                //this.super("constructor", arguments);
            }

        };
        return __define(child, super, proto);
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
    singleton : function(super, proto) {
        var retInstance;
        var child = function() {
            if (!retInstance) {
                //if a unique wasn't defined then the
                //child didn't define one!
                var instance = this.__meta.proto.instance;
                if (instance && instance.constructor._unique) {
                    instance.constructor.apply(this, arguments);
                } else {
                    var supers = this.__meta.supers, l = supers.length;
                    for (var i = 0; i < l; i++) {
                        var protoInstance = supers[i].__meta.proto.instance;
                        if (protoInstance && protoInstance.hasOwnProperty("constructor")) {
                            protoInstance.constructor.apply(this, arguments);
                            break;
                        }
                    }
                }
                retInstance = this;
            }
            return retInstance;
        };
        return __define(child, super, proto);
    }
});
