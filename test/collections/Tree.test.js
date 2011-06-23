var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        Tree = comb.collections.Tree;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Tree interface");
 var methods = ["insert","remove"];
suite.addBatch({
            "when calling the collection interface" : {
                topic : function(){
                    return new Tree();
                },

                "the insert, and remove methods should be abstract" : function(topic){
                    for(var i in methods){
                        assert.throws(function(){
                            topic[methods[i]]();
                        });
                    }
                }
            }
        });

suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret,"callback"));