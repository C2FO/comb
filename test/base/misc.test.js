var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        define = comb.define,
        hitch = comb.hitch,
        Broadcaster = comb;

var suite = vows.describe("Misc utilities");
//Super of other classes
suite.addBatch({
    "comb " :{
        topic : function() {
            return comb
        },

        "should test if something is a number" : function(topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.isNumber(1));
            assert.isFalse(topic.isNumber(function() {
            }));
            assert.isFalse(topic.isNumber("hello"));
            assert.isFalse(topic.isNumber({}));
            assert.isFalse(topic.isNumber(new Date()));
            assert.isFalse(topic.isNumber(true));

        },


        "should test if something is a boolean" : function(topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.isBoolean(true));
            assert.isFalse(topic.isBoolean(function() {
            }));
            assert.isFalse(topic.isBoolean("hello"));
            assert.isFalse(topic.isBoolean({}));
            assert.isFalse(topic.isBoolean(new Date()));
            assert.isFalse(topic.isBoolean(1));

        },

        "should test if something is undefined" : function(topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.isUndefined(undefined));
            assert.isFalse(topic.isUndefined(true));
            assert.isFalse(topic.isUndefined(function() {
            }));
            assert.isFalse(topic.isUndefined("hello"));
            assert.isFalse(topic.isUndefined({}));
            assert.isFalse(topic.isUndefined(new Date()));
            assert.isFalse(topic.isUndefined(1));

        },

        "should test if something is null" : function(topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.isNull(null));
            assert.isFalse(topic.isNull(undefined));
            assert.isFalse(topic.isNull(true));
            assert.isFalse(topic.isNull(function() {
            }));
            assert.isFalse(topic.isNull("hello"));
            assert.isFalse(topic.isNull({}));
            assert.isFalse(topic.isNull(new Date()));
            assert.isFalse(topic.isNull(1));

        },

        "should test if something is an instanceof" : function(topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.isInstanceOf(new Date(), Date));
            assert.isTrue(topic.isInstanceOf(new Number(1), Number));
            assert.isTrue(topic.isInstanceOf(new String(1), String));
            assert.isFalse(topic.isInstanceOf(undefined, String));

        }
    }
});


suite.run({reporter : require("vows/reporters/spec")});

