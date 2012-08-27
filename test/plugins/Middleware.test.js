"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch;


it.describe("comb.plugins.Middleware",function (it) {
//Super of other classes
    function valWrapper(val) {
        return function () {
            return val;
        };
    }

    var Mammal = define(comb.plugins.Middleware, {
        instance:{

            constructor:function (options) {
                options = options || {};
                this._super(arguments);
                this._type = options.type || "mammal";
            },

            speak:function () {
                return this._hook("pre", "speak")
                    .chain(comb.hitch(this, "_hook", "post", "speak"))
                    .chain(valWrapper("speak")).promise();
            },

            speakAgain:function () {
                return this._hook("pre", "speakAgain")
                    .chain(comb.hitch(this, "_hook", "post", "speakAgain"))
                    .chain(valWrapper("speakAgain")).promise();

            },

            eat:function () {
                return this._hook("pre", "eat")
                    .chain(comb.hitch(this, "_hook", "post", "eat"))
                    .chain(valWrapper("eat")).promise();
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
            assert.equal(str, "eat");
            next();
        }));
    });

    it.should("errback if the first argument to next is not null/undefined", function (next) {
        Mammal.pre('speak', function (n) {
            assert.isTrue(comb.isFunction(n));
            n("error");
        });
        var m = new Mammal({color:"gold"});
        m.speak().then(next, function (err) {
            assert.equal(err, "error");
            next();
        });
    });

}).as(module);



