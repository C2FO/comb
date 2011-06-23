var vows = require('vows'),
		assert = require('assert'),
		comb = require("index");

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Regex utilities");
//Super of other classes
suite.addBatch({
            "when escaping a string " : {
                topic : comb.regexp,

                "it should escape it properly" : function(topic){
                    var chars = [".", "$", "?", "*", "|", "{", "}", "(", ")", "[", "]", "\\", "/", "+", "^"];
                    chars.forEach(function(c){
                        assert.equal(topic.escapeString(c), "\\" + c);
                    });
                     chars.forEach(function(c){
                        assert.equal(topic.escapeString(c, [c]), c);
                    });
                }
            }
        });

suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret,"callback"));