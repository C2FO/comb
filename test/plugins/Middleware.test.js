"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch;


it.describe("comb.plugins.Middleware", function (it) {
//Super of other classes
    var Mammal = define(comb.plugins.Middleware, {
        instance:{

            constructor:function (options) {
                options = options || {};
                this._super(arguments);
                this._type = options.type || "mammal";
            },

            speak:function () {
                var ret = new comb.Promise();
                this._hook("pre", "speak")
                    .then(comb.hitch(this, "_hook", "post", "speak"), hitch(ret, "errback"))
                    .then(comb.hitch(ret, "callback", "speak"), comb.hitch(ret, "errback"));
                return ret;
            },

            speakAgain:function () {
                var ret = new comb.Promise();
                this._hook("pre", "speakAgain")
                    .then(comb.hitch(this, "_hook", "post", "speakAgain"), hitch(ret, "errback"))
                    .then(comb.hitch(ret, "callback", "speakAgain"), comb.hitch(ret, "errback"));
                return ret;
            },

            eat:function () {
                var ret = new comb.Promise();
                this._hook("pre", "eat")
                    .then(comb.hitch(this, "_hook", "post", "eat"), hitch(ret, "errback"))
                    .then(comb.hitch(ret, "callback", "eat"), comb.hitch(ret, "errback"));
                return ret;
            }
        }
    });

    it.should("call pre middleware", function (next) {
        Mammal.pre('speak', function (n) {
            assert.isTrue(comb.isFunction(n));
            n();
            next();
        });
        var m = new Mammal({color:"gold"});
        m.speak();
    });

    it.should("call pre middleware on an instance of middleware", function (next) {
        var m = new Mammal({color:"gold"});
        m.pre('speakAgain', function (n) {
            assert.isTrue(comb.isFunction(n));
            n();
            next();
        });
        m.speakAgain();
    });

    it.should("call post middleware", function (next) {
        Mammal.post('speak', function (n) {
            assert.isTrue(comb.isFunction(n));
            n();
            next();
        });
        var m = new Mammal({color:"gold"});
        m.speak();
    });

    it.should("call post middleware on an instance of middleware", function (next) {
        var m = new Mammal({color:"gold"});
        m.post('speakAgain', function (n) {
            assert.isTrue(comb.isFunction(n));
            n();
            next();
        });
        m.speakAgain();
    });

    it.should("callback right away if there is no middleware", function (next) {
        var m = new Mammal({color:"gold"});
        m.eat().then(comb.hitch(this, function (str) {
            next();
        }));
    });

});



