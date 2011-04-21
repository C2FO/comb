var vows = require('vows'),
        assert = require('assert'),
        comb = require("../lib"),
        Promise = comb.Promise,
        PromiseList = comb.PromiseList;


var suite = vows.describe("A PromiseList");

suite.addBatch({

    "when using a promise list " : {
        topic : function() {
            var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
            setTimeout(comb.hitch(promise2, "callback", "world"), 1500);
            setTimeout(comb.hitch(promise3, "callback", "!"), 2000);
            new PromiseList([promise, promise2, promise3]).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },
        "it should callback after all have fired" : function(res) {
            var expected = ["hello", "world", "!"];
            res.forEach(function(r, i) {
                assert.equal(r[1], expected[i]);
            });
        }
    },

    "when using a promise list out of order" : {
        topic : function() {
            var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
            setTimeout(comb.hitch(promise, "callback", "hello"), 2000);
            setTimeout(comb.hitch(promise2, "callback", "world"), 1500);
            setTimeout(comb.hitch(promise3, "callback", "!"), 1000);
            new PromiseList([promise, promise2, promise3]).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },
        "it should callback after all have fired" : function(res) {
            var expected = ["hello", "world", "!"];
            res.forEach(function(res, i) {
                assert.equal(res[1], expected[i]);
            });
        }
    },

    "when using a promise list with an error " : {
        topic : function() {
            var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
            setTimeout(comb.hitch(promise2, "callback", "world"), 1500);
            setTimeout(comb.hitch(promise3, "errback", "error"), 2000);
            new PromiseList([promise, promise2, promise3]).then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
        },
        "it should errback after all have fired" : function(res) {
            res.forEach(function(res) {
                assert.equal(res[1], "error");
            });
        }
    }
});

suite.run({reporter : require("vows/reporters/spec")});