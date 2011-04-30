var vows = require('vows'),
        assert = require('assert'),
        comb = require("../lib"),
        define = comb.define,
        singleton = comb.singleton;


var suite = vows.describe("Define");


//Super of other classes
var Mammal = define(null, {
    instance : {

        constructor: function(options) {
            options = options || {};
            this.super(arguments);
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
            this.super(arguments);
            this._sound = "growl";
            this._color = options.color || "grey";
        },

        speak : function() {
            return this.super(arguments) + " a " + this._sound;
        },

        getters : {
            color : function() {
                return this._color;
            },

            sound : function() {
                return this._sound;
            }
        }
    },

    static : {
        soundOff : function() {
            //You can even call super in your statics!!!
            return this.super(arguments) + " that growls";
        }
    }
});


//Typical heirachical inheritance
// Mammal->Wolf->Dog
var Dog = define(Wolf, {
    instance: {
        constructor: function(options) {
            options = options || {};
            this.super(arguments);
            this._sound = "woof";

        },

        speak : function() {
            return this.super(arguments) + " thats domesticated";
        }
    },

    static : {
        soundOff : function() {
            return this.super(arguments) + " but now barks";
        }
    }
});

// Mammal->Wolf->Dog->Breed
var Breed = define(Dog, {
    instance: {

        _pitch : "high",

        constructor: function(options) {
            options = options || {};
            this.super(arguments);
            this.breed = options.breed || "lab";
        },

        speak : function() {
            return this.super(arguments) + " with a " + this._pitch + " pitch!";
        },

        getters : {
            pitch : function() {
                return this._pitch;
            }
        }
    },

    static : {
        soundOff : function() {
            return this.super(arguments).toUpperCase() + "!";
        }
    }
});

//Example of multiple inheritace
//What really happens is you mixin Wold, Dog, and Breed
//However you are only truely an instance of Mammal
//However the inheritance chain will look like
//Mammal->Wolf->Dog->Breed
//So if you call this.super, it will check breed then dog then wolf then mammal
//be found through inheritance
var Lab = define([Mammal, Wolf, Dog, Breed]);

var MyLab = singleton([Mammal, Wolf, Dog, Breed]);

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
        }
    }
});

suite.addBatch({
    "a Breed " :{
        topic : new Breed({color : "gold", type : "lab"}),

        "should sound like a lab" : function(dog) {
            //the next three are true because they inherit from each other
            assert.isTrue(dog instanceof Dog);
            assert.isTrue(dog instanceof Wolf);
            assert.isTrue(dog instanceof Mammal);
            assert.equal(dog.speak(), "A mammal of type lab sounds like a woof thats domesticated with a high pitch!");
            assert.equal(dog.type, "lab");
            assert.equal(dog.color, "gold");
            assert.equal(dog.sound, "woof");
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
    "when in creating my lab" : {
        topic : new MyLab({type : "dog"}),

        "should still be a dog" : function(topic) {
            var myLab = new MyLab();
            assert.isTrue(topic == myLab);
            assert.equal(topic.type, "dog");
            assert.equal(myLab.type, "dog");
        }
    }
});

suite.run({reporter : require("vows/reporters/spec")});
