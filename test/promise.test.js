var vows = require('vows'),
        assert = require('assert'),
        comb = require("../lib"),
        Promise = comb.Promise,
        PromiseList = comb.PromiseList;


var suite = vows.describe("A Promise");

suite.addBatch({

    "when using addCallback " : {
        topic : function() {
            var promise = new Promise();
            promise.addCallback(comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },
        "it should callback " : function(res) {
            assert.equal(res, "hello")
        }
    },

    "when using addErrback " : {
        topic : function() {
            var promise = new Promise();
            promise.addErrback(comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "errback", "error"), 1000);
        },

        "it should errback " : function(res) {
            assert.equal(res, "error");
        }
    },

    "when using then and calling back" : {
        topic : function() {
            var promise = new Promise();
            promise.then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should callback " : function(res) {
            assert.equal(res, "hello")
        }
    },

    "when using then and erring back" : {
        topic : function() {
            var promise = new Promise();
            promise.then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "errback", "error"), 1000);
        },
        "it should errback " : function(res) {
            assert.equal(res,"error")
        }
    },

    "when using chain and calling back" : {
        topic : function() {
            var promise = new Promise();
            promise.chain(
                    function(res) {
                        var promise2 = new Promise();
                        setTimeout(comb.hitch(promise2, "callback", res + " world"), 1000);
                        return promise2;
                    }, comb.hitch(this, 'callback')).chain(
                    function(res) {
                        var promise3 = new Promise();
                        setTimeout(comb.hitch(promise3, "callback", res + "!"), 1000);
                        return promise3;
                    }, comb.hitch(this, "callback")).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should callback after all are done " : function(res) {
            assert.equal(res,"hello world!")
        }
    },

    "when using chain and erroring back" : {
        topic : function() {
            var promise = new Promise();
            promise.chain(
                    function(res) {
                        var promise2 = new Promise();
                        setTimeout(comb.hitch(promise2, "callback", res + " world"), 1000);
                        return promise2;
                    }, comb.hitch(this, 'callback', null)).chain(
                    function() {
                        var promise3 = new Promise();
                        setTimeout(comb.hitch(promise3, "errback", "error"), 1000);
                        return promise3;
                    }, comb.hitch(this, "callback"))
                    .then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should errback after the third one " : function(res) {
            assert.equal(res,"error")
        }
    }
});

suite.run({reporter : require("vows/reporters/spec")});