var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        define = comb.define,
        singleton = comb.singleton;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Define");


//Super of other classes
var Mammal = define(null, {
    instance : {

        constructor: function(options) {
            options = options || {};
            this._super(arguments);
            this._type = options.type || "mammal";
        },

        speak : function() {
            return  "A mammal of type " + this._type + " sounds like";
        },

        //Define your getters
        getters : {
            type : function() {
                return this._type;
            }
        },

        setters : {
            type : function(type) {
                this._type = type;
            }
        }
    },

    //Define your static methods
    static : {
        soundOff : function() {
            return "Im a mammal!!";
        }
    }
});

//Show singular inheritance
var Wolf = define(Mammal, {
    instance: {
        constructor: function(options) {
            options = options || {};
            //call your super constructor you can call this after you initialize or not
            //call it at all to prevent the supers from initilizing things
            this._super(arguments);
            this._sound = "growl";
            this._color = options.color || "grey";
        },

        speak : function() {
            return this._super(arguments) + " a " + this._sound;
        },

        getters : {
            color : function() {
                return this._color;
            },

            sound : function() {
                return this._sound;
            }
        },

        setters : {
            color : function(color) {
                this._color = color;
            },

            sound : function(sound) {
                this._sound = sound;
            }
        }
    },

    static : {
        soundOff : function() {
            //You can even call super in your statics!!!
            return this._super(arguments) + " that growls";
        }
    }
});


//Typical heirachical inheritance
// Mammal->Wolf->Dog
var Dog = define(Wolf, {
    instance: {
        constructor: function(options) {
            options = options || {};
            this._super(arguments);
            this._sound = "woof";

        },

        speak : function() {
            return this._super(arguments) + " thats domesticated";
        }
    },

    static : {
        soundOff : function() {
            return this._super(arguments) + " but now barks";
        }
    }
});

// Mammal->Wolf->Dog->Breed
var Breed = define(Dog, {
    instance: {

        _pitch : "high",

        constructor: function(options) {
            options = options || {};
            this._super(arguments);
            this.breed = options.breed || "lab";
        },

        speak : function() {
            return this._super(arguments) + " with a " + this._pitch + " pitch!";
        },

        getters : {
            pitch : function() {
                return this._pitch;
            }
        },

        setters : {
            pitch : function(pitch) {
                this._pitch = pitch;
            }
        }
    },

    static : {
        soundOff : function() {
            return this._super(arguments).toUpperCase() + "!";
        }
    }
});

//Example of multiple inheritace
//What really happens is you mixin Wold, Dog, and Breed
//However you are only truely an instance of Mammal
//However the inheritance chain will look like
//Mammal->Wolf->Dog->Breed
//So if you call this._super, it will check breed then dog then wolf then mammal
//be found through inheritance
var Lab = define([Mammal, Wolf, Dog, Breed]);

var MyLab = singleton(Lab);

var MyLabWithConstructor = singleton([Mammal, Wolf, Dog, Breed], {
    instance : {
        constructor : function() {
            this._super(arguments);
        }
    }
});

suite.addBatch({
    "a dog " :{
        topic : new Dog({color : "gold"}),

        "should sound like a dog" : function(dog) {
            //This is true because they inherit from eachother!
            assert.isTrue(dog instanceof Wolf);
            assert.isTrue(dog instanceof Mammal);
            assert.equal(dog.speak(), "A mammal of type mammal sounds like a woof thats domesticated");
            assert.equal(dog.type, "mammal");
            assert.equal(dog.color, "gold");
            assert.equal(dog.sound, "woof");
            assert.equal(Dog.soundOff(), "Im a mammal!! that growls but now barks");
        },

        "but after setting type it should be a dog" : function(dog) {
            dog.type = "DOG";
            assert.equal(dog.speak(), "A mammal of type DOG sounds like a woof thats domesticated");
            assert.equal(dog.type, "DOG");
            assert.equal(dog.color, "gold");
            assert.equal(dog.sound, "woof");
            assert.equal(Dog.soundOff(), "Im a mammal!! that growls but now barks");
        }
    }
});

suite.addBatch({
    "a Breed " :{
        topic : new Breed({color : "gold", type : "lab"}),

        "should sound like a lab" : function(breed) {
            //the next three are true because they inherit from each other
            assert.isTrue(breed instanceof Dog);
            assert.isTrue(breed instanceof Wolf);
            assert.isTrue(breed instanceof Mammal);
            assert.equal(breed.speak(), "A mammal of type lab sounds like a woof thats domesticated with a high pitch!");
            assert.equal(breed.type, "lab");
            assert.equal(breed.color, "gold");
            assert.equal(breed.sound, "woof");
            assert.equal(breed.pitch, "high");
            assert.equal(Breed.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        },

        "but after setting the type it should be a collie" : function(breed) {
            breed.type = "collie"
            assert.isTrue(breed instanceof Dog);
            assert.isTrue(breed instanceof Wolf);
            assert.isTrue(breed instanceof Mammal);
            assert.equal(breed.speak(), "A mammal of type collie sounds like a woof thats domesticated with a high pitch!");
            assert.equal(breed.type, "collie");
            assert.equal(breed.color, "gold");
            assert.equal(breed.sound, "woof");
            assert.equal(breed.pitch, "high");
            assert.equal(Breed.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        },

        "but after setting the color it should be grey" : function(breed) {
            breed.color = "grey"
            assert.isTrue(breed instanceof Dog);
            assert.isTrue(breed instanceof Wolf);
            assert.isTrue(breed instanceof Mammal);
            assert.equal(breed.speak(), "A mammal of type collie sounds like a woof thats domesticated with a high pitch!");
            assert.equal(breed.type, "collie");
            assert.equal(breed.color, "grey");
            assert.equal(breed.sound, "woof");
            assert.equal(breed.pitch, "high");
            assert.equal(Breed.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        },

        "but after setting the sound it should sound like a bark" : function(breed) {
            breed.sound = "bark"
            assert.isTrue(breed instanceof Dog);
            assert.isTrue(breed instanceof Wolf);
            assert.isTrue(breed instanceof Mammal);
            assert.equal(breed.speak(), "A mammal of type collie sounds like a bark thats domesticated with a high pitch!");
            assert.equal(breed.type, "collie");
            assert.equal(breed.color, "grey");
            assert.equal(breed.sound, "bark");
            assert.equal(breed.pitch, "high");
            assert.equal(Breed.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        },

        "but after setting the pitch it should be low pitched" : function(breed) {
            breed.pitch = "low"
            assert.isTrue(breed instanceof Dog);
            assert.isTrue(breed instanceof Wolf);
            assert.isTrue(breed instanceof Mammal);
            assert.equal(breed.speak(), "A mammal of type collie sounds like a bark thats domesticated with a low pitch!");
            assert.equal(breed.type, "collie");
            assert.equal(breed.color, "grey");
            assert.equal(breed.sound, "bark");
            assert.equal(breed.pitch, "low");
            assert.equal(Breed.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        }
    }
});

suite.addBatch({
    "a LAB " :{
        topic : new Lab(),

        "should sound like a lab" : function(dog) {
            //the next three are false because they are mixins
            assert.isFalse(dog instanceof Breed);
            assert.isFalse(dog instanceof Dog);
            assert.isFalse(dog instanceof Wolf);
            assert.isTrue(dog instanceof Mammal);
            assert.equal(dog.speak(), "A mammal of type mammal sounds like a woof thats domesticated with a high pitch!");
            assert.equal(dog.type, "mammal");
            assert.equal(dog.color, "grey");
            assert.equal(dog.sound, "woof");
            assert.equal(Lab.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        }
    }
});

suite.addBatch({
    "when in creating my lab singleton" : {
        topic : new MyLab({type : "dog"}),

        "should still be a dog" : function(topic) {
            var myLab = new MyLab();
            assert.isTrue(topic == myLab);
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
            assert.equal(topic.speak(), "A mammal of type dog sounds like a woof thats domesticated with a high pitch!");
            assert.equal(myLab.speak(), "A mammal of type dog sounds like a woof thats domesticated with a high pitch!");
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
            assert.equal(topic.color, "grey");
            assert.equal(myLab.color, "grey");
            assert.equal(topic.sound, "woof");
            assert.equal(myLab.sound, "woof");
            assert.equal(MyLab.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        }
    }
});

suite.addBatch({
    "when in creating my lab singleton with a constructor" : {
        topic : new MyLabWithConstructor({type : "dog"}),

        "should still be a dog" : function(topic) {
            var myLab = new MyLabWithConstructor();
            assert.isTrue(topic == myLab);
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
            assert.equal(topic.speak(), "A mammal of type dog sounds like a woof thats domesticated with a high pitch!");
            assert.equal(myLab.speak(), "A mammal of type dog sounds like a woof thats domesticated with a high pitch!");
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
            assert.equal(topic.color, "grey");
            assert.equal(myLab.color, "grey");
            assert.equal(topic.sound, "woof");
            assert.equal(myLab.sound, "woof");
            assert.equal(MyLab.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        }
    }
});

suite.addBatch({
    "when in creating my lab singleton with params" : {
        topic : new MyLab(),

        "it should still be a dog" : function(topic) {
            var myLab = new MyLab();
            assert.isTrue(topic == myLab);
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
            assert.equal(topic.speak(), "A mammal of type dog sounds like a woof thats domesticated with a high pitch!");
            assert.equal(myLab.speak(), "A mammal of type dog sounds like a woof thats domesticated with a high pitch!");
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
            assert.equal(topic.color, "grey");
            assert.equal(myLab.color, "grey");
            assert.equal(topic.sound, "woof");
            assert.equal(myLab.sound, "woof");
            assert.equal(MyLab.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        }
    }
});

suite.addBatch({
    "when in creating my lab singleton with a constructor" : {
        topic : new MyLabWithConstructor(),

        "it should still be a dog" : function(topic) {
            var myLab = new MyLabWithConstructor();
            assert.isTrue(topic == myLab);
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
            assert.equal(topic.speak(), "A mammal of type dog sounds like a woof thats domesticated with a high pitch!");
            assert.equal(myLab.speak(), "A mammal of type dog sounds like a woof thats domesticated with a high pitch!");
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
            assert.equal(topic.color, "grey");
            assert.equal(myLab.color, "grey");
            assert.equal(topic.sound, "woof");
            assert.equal(myLab.sound, "woof");
            assert.equal(MyLab.soundOff(), "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!");
        }
    }
});

suite.addBatch({
    "when in creating a class that calls _super without arguments" : {
        topic : function() {
            return define([Mammal, Wolf, Dog, Breed], {
                instance : {
                    speak : function() {
                        this._super();
                    }
                }
            });
        },

        "it should throw an error" : function(ErrorMammal) {
            var err = new ErrorMammal();
            assert.throws(function() {
                err.speak();
            });
        }
    }
});

suite.addBatch({
    "when in creating a class that calls _super with improper arguments" : {
        topic : function() {
            return define([Mammal, Wolf, Dog, Breed], {
                instance : {
                    speak : function() {
                        this._super([]);
                    }
                }
            });
        },

        "it should throw an error" : function(ErrorMammal) {
            var err = new ErrorMammal();
            assert.throws(function() {
                err.speak();
            });
        }
    }
});

suite.addBatch({
    "when in creating a class that calls _super with improper arguments" : {
        topic : function() {
            return define([Mammal, Wolf, Dog, Breed], {
                instance : {
                    speak : function() {
                        this._super(arguments);
                    }
                }
            });
        },

        "it should throw an error" : function(ErrorMammal) {
            var err = new ErrorMammal();
            assert.throws(function() {
                err.speak.call(this);
            });
        }
    }
});

suite.addBatch({
    "When using as to export an object to exports" : {
        topic : function() {
            Mammal.as(exports, "Mammal");
            return Mammal;
        },

        "it should as to the exports " : function(topic) {
            assert.equal(exports.Mammal, topic);
        }
    },

    "When using as to export an object to an object" : {
        topic : function() {
            return Mammal.as(module);
        },

        "it should as to the module " : function(topic) {
            assert.equal(module.exports, Mammal);
        }
    }
});


suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));
