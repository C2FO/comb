var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        define = comb.define,
        hitch = comb.hitch,
        Broadcaster = comb;

var suite = vows.describe("Object utilities");
//Super of other classes
suite.addBatch({
    "when merging objects " :{
        topic : function() {
            return comb.merge({}, {test : true}, {test2 : false}, {test3 : "hello", test4 : "world"});
        },

        "is should contain all properties" : function(topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
        }
    },

    "when extending a class " :{
        topic : function() {
            var myObj = function(){};
            myObj.prototype.test = true;
            comb.extend(myObj, {test2 : false, test3 : "hello", test4 : "world"});
            return new myObj;
        },

        "is should contain all properties" : function(topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
        }
    },

    "when extending an object " :{
        topic : function() {
            var myObj = {};
            myObj.test = true;
            comb.extend(myObj, {test2 : false, test3 : "hello", test4 : "world"});
            return myObj;
        },

        "is should contain all properties" : function(topic) {
            //This is true because they inherit from eachother!
            assert.isTrue(topic.test);
            assert.isFalse(topic.test2);
            assert.equal(topic.test3, "hello");
            assert.equal(topic.test4, "world");
        }
    }
});


suite.run({reporter : require("vows/reporters/spec")});
