var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        Iterable = comb.collections.Iterable;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Iterable interface");

 var methods = ["filter","forEach","every","map","some","reduce", "reduceRight"];
suite.addBatch({
            "when calling the Iterable interface" : {
                topic : function(){
                    return new Iterable();
                },

                "it should contain the iterable methods" : function(topic){
                    for(var i in methods){
                        assert.isFunction(topic[methods[i]]);
                    }
                },

                "the iterable methods should be abstract" : function(topic){
                    for(var i in methods){
                        assert.throws(function(){
                            topic[methods[i]]();
                        });
                    }
                }
            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret,"callback"));