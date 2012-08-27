"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch,
    Broadcaster = comb;


it.describe("comb/base/broadcast.js",function (it) {

    //Super of other classes
    var Mammal = define(null, {
        instance:{

            constructor:function (options) {
                options = options || {};
                this._super(arguments);
                this._type = options.type || "mammal";
            },

            speak:function () {
                var str = "A mammal of type " + this._type + " sounds like";
                comb.broadcast("speak", str);
                this.onSpeak(str);
                return str;
            },

            onSpeak:function () {

            }
        }
    });


    it.should("#listen", function (next) {
        var m = new Mammal({color:"gold"}), h;
        h = comb.listen("speak", hitch(this, function (str) {
            assert.equal(str, "A mammal of type mammal sounds like");
            comb.unListen(h);
            next();
        }));
        m.speak();
    });

    it.should("#unlisten", function (next) {
        var m = new Mammal({color:"gold"});
        var han = comb.listen("speak", next);
        comb.unListen(han);
        comb.listen("speak", hitch(this, function () {
            next();
        }));
        m.speak();
    })

    it.should("#connect", function (next) {
        var m = new Mammal({color:"gold"}), h;
        h = comb.connect(m, "speak", hitch(this, function (str) {
            comb.disconnect(h);
            next();
        }));
        m.speak();
    });

    it.should("#disconnect", function (next) {
        var m = new Mammal({color:"gold"});
        var han = comb.connect(m, "speak", next);
        comb.disconnect(han);
        comb.connect(m, "speak", hitch(this, function () {
            next();
        }));
        m.speak();
    });

    it.should("throw an error on #connect if the function does not exist", function () {
        var m = new Mammal({color:"gold"});
        assert.throws(function () {
            comb.connect(m, "someMethod", function () {
            });
        })
    });

    it.should("throw an error on #disconnect if an invalid handler is passed in", function () {
        assert.throws(function () {
            comb.disconnect();
        });

        assert.throws(function () {
            comb.disconnect([comb, "someMethod", function () {
            }]);
        });
    });

}).as(module);





