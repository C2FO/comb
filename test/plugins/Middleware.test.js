var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        define = comb.define,
        hitch = comb.hitch;

var suite = vows.describe("A Broadcaster");
//Super of other classes
var Mammal = define(comb.plugins.Middleware, {
    instance : {

        constructor: function(options) {
            options = options || {};
            this.super(arguments);
            this._type = options.type || "mammal";
        },

        speak : function() {
            var ret = new comb.Promise();
            this._hook("pre", "speak")
                    .then(comb.hitch(this, "_hook", "post", "speak"), hitch(ret, "errback"))
                    .then(comb.hitch(ret, "callback"), comb.hitch(ret, "errback"));
            return ret;
        }
    }
});

suite.addBatch({
    "a Mammal class" :{
        topic : function() {
            Mammal.pre('speak', hitch(this, "callback", null));
            var m = new Mammal({color : "gold"});
            m.speak();
        },

        "should call pre middleware" : function(next) {
            assert.isTrue(comb.isFunction(next));
            next();
        }
    }
});

suite.addBatch({
    "a Mammal instance" :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            m.pre("speak", hitch(this, "callback", null));
            m.speak();
        },

        "should call pre middleware" : function(next) {
            assert.isTrue(comb.isFunction(next));
            next();
        }
    }
});

suite.addBatch({
    "a Mammal class" :{
        topic : function() {
            Mammal.post('speak', hitch(this, "callback", null));
            var m = new Mammal({color : "gold"});
            m.speak();
        },

        "should call post middleware" : function(next) {
            assert.isTrue(comb.isFunction(next));
            next();
        }
    }
});

suite.addBatch({
    "a Mammal instance" :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            m.post("speak", hitch(this, "callback", null));
            m.speak();
        },

        "should call post middleware" : function(next) {
            assert.isTrue(comb.isFunction(next));
            next();
        }
    }
});


suite.run({reporter : require("vows/reporters/spec")});

