var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        define = comb.define,
        hitch = comb.hitch;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Broadcaster");
//Super of other classes
var Missing = define(comb.plugins.MethodMissing, {
    instance : {

        constructor: function(options) {
            this._super(arguments);
            this._attributes = {};
        },

        setMissingProperty : function(name, val){
            this._attributes[name] = val;
        },

        getMissingProperty : function(name){
            return this._attributes[name];
        }
    }
});

var MissingInherit = define(Missing);

suite.addBatch({
    "MethodMissing Pluging " :{
        topic : function() {
            return new comb.plugins.MethodMissing();
        },

        "should use default JS behavior of the methods are not overridden " : function(o) {
            //This is true because they inherit from eachother!
            assert.isUndefined(o.name);
            o.name = "hello";
            assert.equal(o.name, "hello");
            assert.throws(function(){
                o.random();
            });
        }
    }
});

suite.addBatch({
    "a Mammal " :{
        topic : function() {
            return new Missing();
        },

        "should maintain type" : function(o){
            assert.instanceOf(o, Missing);
            assert.instanceOf(o, comb.plugins.MethodMissing);
            var inherit = new MissingInherit();
            assert.instanceOf(inherit, MissingInherit);
            assert.instanceOf(inherit, Missing);
            assert.instanceOf(inherit, comb.plugins.MethodMissing);

        },

        "should call the setPropertiesMethod when setting a property" : function(o) {
            //This is true because they inherit from eachother!
            o.name = "hello";
            assert.equal(o._attributes.name, "hello");
        },

        "should call the getPropertiesMethod when setting a property" : function(o) {
            //This is true because they inherit from eachother!
            o.name = "hello";
            assert.equal(o.name, "hello");
        }
    }
});




suite.run({reporter : vows.reporter.spec}, comb.hitch(ret,"callback"));

