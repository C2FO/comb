var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        define = comb.define,
        hitch = comb.hitch,
        Broadcaster = comb;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Object utilities");
//Super of other classes
suite.addBatch({
            "when testing if something is an object" : {
                topic : comb,

                "it should determine properly" : function(topic) {
                    assert.isTrue(topic.isObject(new Date()));
                    assert.isTrue(topic.isObject(new String()));
                    assert.isTrue(topic.isObject(new Number()));
                    assert.isTrue(topic.isObject(new Boolean()));
                    assert.isTrue(topic.isObject({}));
                    assert.isFalse(topic.isObject());
                    assert.isFalse(topic.isObject(""));
                    assert.isFalse(topic.isObject(1));
                    assert.isFalse(topic.isObject(false));
                    assert.isFalse(topic.isObject(true));
                }
            },

            "when testing if an object is empty" : {
                topic : comb,

                "it should determine properly" : function(topic) {
                    assert.isTrue(topic.isEmpty());
                    assert.isTrue(topic.isEmpty({}));
                    assert.isFalse(topic.isEmpty({A :"b"}));
                }
            },

            "when merging objects " :{
                topic : function() {
                    var ret = {};
                    comb.merge(ret, {test : true}, {test2 : false}, {test3 : "hello", test4 : "world"});
                    return ret;



                },

                "is should contain all properties" : function(topic) {
                    //This is true because they inherit from eachother!
                    assert.isTrue(topic.test);
                    assert.isFalse(topic.test2);
                    assert.equal(topic.test3, "hello");
                    assert.equal(topic.test4, "world");
                }
            },

            "when merging objects and not providing a start object" :{
                topic : function() {
                    return comb.merge(null, {test : true}, {test2 : false}, {test3 : "hello", test4 : "world"});
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
                    var myObj = function() {
                    };
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


suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret, "callback"));
