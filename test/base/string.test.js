var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        define = comb.define,
        hitch = comb.hitch,
        Broadcaster = comb;

var suite = vows.describe("Object utilities");
//Super of other classes
suite.addBatch({
    "when padding a string of 3 chars with 2 spaces " :{
        topic : function() {
            return comb.string.pad("STR", 5, " ");
        },

        "it should have 2 spaces on the front" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "  STR");
        }
    },

    "when padding a string of 3 chars with 2 spaces at the end " :{
        topic : function() {
            return comb.string.pad("STR", 5, " ", true);
        },

        "it should have 2 ' '  at the end" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "STR  ");
        }
    },

    "when padding a string of 3 chars with 2 '$' " :{
        topic : function() {
            return comb.string.pad("STR", 5, "$");
        },

        "it should have two '$' on the front " : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "$$STR");
        }
    },

    "when padding a string of 3 chars with 2 '$' at the end " :{
        topic : function() {
            return comb.string.pad("STR", 5, "$", true);
        },

        "it should have 2 '$' at the end" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "STR$$");
        }
    },

    "when replacing a string with an object " : {
        topic : comb.string.format("{apple} and {orange}", {apple : "apple", orange : "orange"}),

        "it should equal 'apple and orange'" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "apple and orange");
        }
    },

    "when replacing a string with an array " : {
        topic : comb.string.format("%s and %s", ["apple", "orange"]),

        "it should equal 'apple and orange'"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "apple and orange");
        }

    },

    "when replacing a string with an array and an extra %s" : {
        topic : comb.string.format("%s and %s and %s", ["apple", "orange"]),

        "it should equal 'apple and orange and %s'"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "apple and orange and %s");
        }

    },

    "when replacing a string with arguments " : {
        topic : comb.string.format("%s and %s", "apple", "orange"),

        "it should equal 'apple and orange'"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "apple and orange");
        }

    }
});


suite.run({reporter : require("vows/reporters/spec")});
