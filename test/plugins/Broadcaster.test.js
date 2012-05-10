"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch;


it.describe("comb.plugins.Broadcaster", function (it) {
//Super of other classes
    var Mammal = define(comb.plugins.Broadcaster, {
        instance:{

            constructor:function (options) {
                options = options || {};
                this._super(arguments);
                this._type = options.type || "mammal";
            },

            speak:function () {
                var str = "A mammal of type " + this._type + " sounds like";
                this.broadcast("speak", str);
                this.onSpeak(str);
                return str;
            },

            onSpeak:function () {

            }
        }
    });

    it.should("broadcast a speak event", function (next) {
        var m = new Mammal({color:"gold"});
        m.listen("speak", function (str) {
            assert.equal(str, "A mammal of type mammal sounds like");
            next();
        });
        m.speak();
    });

    it.should("should unListen a listener", function (next) {
        var m = new Mammal({color:"gold"});
        var han = m.listen("speak", function () {
            next("SHould not have called")
        });
        m.unListen(han);
        m.listen("speak", hitch(this, function (str) {
            assert.equal(str, "A mammal of type mammal sounds like");
            next();
        }));
        m.speak();
    });


});



