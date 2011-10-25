var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        Heap = comb.collections.Heap;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Heap abstract class");

suite.addBatch({
            "when calling the Heap interface" : {
                topic : function(){
                    return new Heap();
                },

                "it should throw an error when calling insert and remove methods" : function(heap){
                    assert.throws(function(){
                          heap.insert(1, "hello");
                    })
                    assert.throws(function(){
                        heap.__downHeap();
                    })
                },

                "it should throw an error when using an invalid key" : function(heap){
                    assert.throws(function(){
                        heap.insert("1", 2);
                    })
                }
            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret,"callback"));