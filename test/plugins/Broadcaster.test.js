var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        define = comb.define,
        hitch = comb.hitch;

var suite = vows.describe("A Broadcaster");
//Super of other classes
var Mammal = define(comb.plugins.Broadcaster, {
    instance : {

        constructor: function(options) {
            options = options || {};
            this.super(arguments);
            this._type = options.type || "mammal";
        },

        speak : function() {
            var str = "A mammal of type " + this._type + " sounds like";
            this.publish("speak", str);
            this.onSpeak(str);
            return str;
        },

        onSpeak : function(){

        }
    }
});

suite.addBatch({
    "a Mammal " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            m.listen("speak", hitch(this, "callback", null));
            m.speak();
        },

        "should broadcast a speak event" : function(str) {
            //This is true because they inherit from eachother!
            assert.equal(str, "A mammal of type mammal sounds like");
        }
    }
});

suite.addBatch({
    "a Mammal " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            var han = m.listen("speak", hitch(this, "callback", null, m));
            m.unListen(han);
            m.listen("speak", hitch(this, function() {
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
    "a Mammal " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            m.subscribe("speak", hitch(this, "callback", null));
            m.speak();
        },

        "should publish a speak event" : function(str) {
            //This is true because they inherit from eachother!
            assert.equal(str, "A mammal of type mammal sounds like");
        }
    }
});

suite.addBatch({
    "a Mammal " :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            var han = m.listen("speak", hitch(this, "callback"));
            m.unSubscribe(han);
            m.subscribe("speak", hitch(this, function() {
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



suite.run({reporter : require("vows/reporters/spec")});

