var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        define = comb.define,
        hitch = comb.hitch,
        Broadcaster = comb;

var suite = vows.describe("A Broadcaster");
//Super of other classes
var Mammal = define(null, {
    instance : {

        constructor: function(options) {
            options = options || {};
            this.super(arguments);
            this._type = options.type || "mammal";
        },

        speak : function() {
            var str = "A mammal of type " + this._type + " sounds like";
            comb.publish("speak", str);
            this.onSpeak(str);
            return str;
        },

        onSpeak : function(){

        }
    }
});

suite.addBatch({
    "comb " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            comb.listen("speak", hitch(this, "callback", null));
            m.speak();
        },

        "listen for speak events" : function(str) {
            //This is true because they inherit from eachother!
            assert.equal(str, "A mammal of type mammal sounds like");
        }
    }
});

suite.addBatch({
    "comb " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            var han = comb.listen("speak", hitch(this, "callback", null, m));
            comb.unListen(han);
            comb.listen("speak", hitch(this, function() {
                this.callback(null, "The second connection");
            }));
            m.speak();
        },

        "should unListen a listener" : function(str) {
            //This is true because they inherit from eachother!
            assert.equal(str, "The second connection");
        }
    }
});

suite.addBatch({
    "comb " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            comb.subscribe("speak", hitch(this, "callback", null));
            m.speak();
        },

        "should subscribe a speak event" : function(str) {
            //This is true because they inherit from eachother!
            assert.equal(str, "A mammal of type mammal sounds like");
        }
    }
});

suite.addBatch({
    "comb " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            var han = comb.listen("speak", hitch(this, "callback"));
            comb.unSubscribe(han);
            comb.subscribe("speak", hitch(this, function() {
                this.callback(null, "The second connection");
            }));
            m.speak();
        },

        "should unSubscribe a listener" : function(str) {
            //This is true because they inherit from eachother!
            assert.equal(str, "The second connection");
        }
    }
});

suite.addBatch({
    "comb " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            comb.connect(m, "onSpeak", hitch(this, "callback", null));
            m.speak();
        },

        "should connect to listener" : function(str) {
             //This is true because they inherit from eachother!
            assert.equal(str, "A mammal of type mammal sounds like");
        }
    }
});


suite.addBatch({
    "comb " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            var han = comb.connect(m, "onSpeak", hitch(this, "callback"));
            comb.disconnect(han);
            comb.connect(m, "onSpeak", hitch(this, function() {
                this.callback(null, "The second connection");
            }));
            m.speak();
        },

        "should disconnect a listener" : function(str) {
            //This is true because they inherit from eachother!
            assert.equal(str, "The second connection");
        }
    }
});



suite.run({reporter : require("vows/reporters/spec")});

