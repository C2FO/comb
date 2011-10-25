var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        define = comb.define,
        hitch = comb.hitch;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Middleware");
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
                    .then(comb.hitch(ret, "callback", "speak"), comb.hitch(ret, "errback"));
            return ret;
        },

        eat : function() {
            var ret = new comb.Promise();
            this._hook("pre", "eat")
                    .then(comb.hitch(this, "_hook", "post", "eat"), hitch(ret, "errback"))
                    .then(comb.hitch(ret, "callback", "eat"), comb.hitch(ret, "errback"));
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
            m.eat().then(comb.hitch(this, function(str){
                this.callback(null, str);
            }));
        },

        "should callback right away" : function(str) {
            assert.equal(str, "eat");
        }
    }
});

suite.addBatch({
    "a Mammal instance" :{
        topic : function() {
            var m = new Mammal({color : "gold"});
            m.pre("eat", hitch(this, "callback", null));
            m.eat();
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
            m.post("eat", hitch(this, "callback", null));
            m.eat();
        },

        "should call post middleware" : function(next) {
            assert.isTrue(comb.isFunction(next));
            next();
        }
    }
});


suite.run({reporter : vows.reporter.spec}, comb.hitch(ret,"callback"));

