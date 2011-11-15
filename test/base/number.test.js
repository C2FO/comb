var vows = require('vows'),
		assert = require('assert'),
		comb = require("index");

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Number utilities");
//Super of other classes
suite.addBatch({

            "when testing if something is a number" : {
                topic : comb,

                "it should test properly" : function(topic){
                    assert.isTrue(comb.isNumber(1));
                    assert.isTrue(comb.isNumber(new Number(1)));
                    assert.isFalse(comb.isNumber("1"));
                    assert.isFalse(comb.isNumber(new Date()));
                    assert.isFalse(comb.isNumber(true));
                    assert.isFalse(comb.isNumber(false));
                }
            },

            "when rounding a number " : {
                topic : comb.number,

                "it should round properly" : function(topic){
                    assert.equal(topic.round(10.000009, 2), 10);
                    assert.equal(topic.round(10.000009, 5), 10.00001);
                    assert.equal(topic.round(10.0009, 3), 10.001);
                    assert.equal(topic.round(10.0009, 2), 10);
                    assert.equal(topic.round(10.0009, 3), 10.001);
                    assert.equal(topic.round(10.0009, 2, 1), 11);
                }
            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret,"callback"));