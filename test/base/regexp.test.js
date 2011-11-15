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
            },

             "when testing if something is an regexp" : {
                topic : comb,

                "it should determine properly" : function(topic) {
                    assert.isTrue(topic.isRexExp(/a/));
                    assert.isTrue(topic.isRexExp(new RegExp("a")));
                    assert.isFalse(topic.isRexExp());
                    assert.isFalse(topic.isRexExp(""));
                    assert.isFalse(topic.isRexExp(1));
                    assert.isFalse(topic.isRexExp(false));
                    assert.isFalse(topic.isRexExp(true));
                }
            },
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret,"callback"));