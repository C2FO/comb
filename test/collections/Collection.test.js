var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        Collection = comb.collections.Collection;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Colleciton interface");
 var methods = ["concat","join","slice","toString","indexOf","lastIndexOf"];
suite.addBatch({
            "when calling the collection interface" : {
                topic : function(){
                    return new Collection();
                },

                "it should contain the collection methods" : function(topic){
                    for(var i in methods){
                        assert.isFunction(topic[methods[i]]);
                    }
                },

                "the collection methods should be abstract" : function(topic){
                    for(var i in methods){
                        assert.throws(function(){
                            topic[methods[i]]();
                        });
                    }
                }
            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret,"callback"));