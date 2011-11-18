var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        define = comb.define,
        hitch = comb.hitch,
        Broadcaster = comb;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Broadcaster");
//Super of other classes
var Mammal = define(null, {
    instance : {

        constructor: function(options) {
            options = options || {};
            this._super(arguments);
            this._type = options.type || "mammal";
        },

        speak : function() {
            var str = "A mammal of type " + this._type + " sounds like";
            comb.broadcast("speak", str);
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
            var m = new Mammal({color : "gold"}), h;
            h = comb.listen("speak", hitch(this, function(str){
                this.callback(null, {handle : h, str : str});
            }));
            m.speak();
        },

        "listen for speak events" : function(obj) {
            //This is true because they inherit from eachother!
            assert.equal(obj.str, "A mammal of type mammal sounds like");
            comb.unListen(obj.handle);
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
            var m = new Mammal({color : "gold"}), h;
            h = comb.connect(m, "onSpeak", hitch(this, function(str){
                this.callback(null, {handle : h, str : str});
            }));
            m.speak();
        },

        "should connect to listener" : function(ret) {
             //This is true because they inherit from eachother!
            assert.equal(ret.str, "A mammal of type mammal sounds like");
            comb.disconnect(ret.handle);

        }
    }
});


suite.addBatch({
    "comb " :{
        topic : function() {
            return new Mammal({color : "gold"});
        },

        "should throw an error if the method does not exist connect to listener" : function(topic) {
            assert.throws(function(){
                comb.connect(topic, "someMethod", function(){});
            })
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

suite.addBatch({
    "comb " :{
        topic : comb,

        "should throw an error disconnect with invalid handles a listener" : function(topic) {
            //This is true because they inherit from eachother!
            assert.throws(function(){
                topic.disconnect();
            });

            assert.throws(function(){
                topic.disconnect([topic, "someMethod", function(){}]);
            });
        }
    }
});



suite.run({reporter : vows.reporter.spec}, comb.hitch(ret,"callback"));

