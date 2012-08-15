"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    logging = comb.logging,
    Appender = logging.appenders.Appender;

it.describe("comb.logging.appenders.Appender", function (it) {

    var MyAppender = comb.define(Appender, {
        instance:{
            append:function (event) {
                if (this._canAppend(event)) {
                    this.onAppend(comb.string.format(this.__pattern, event));
                }
            },

            onAppend:function () {

            }
        }
    }).registerType("MyAppender");


    var logger1 = logging.Logger.getLogger("AppenderTest"),
        logger2 = logging.Logger.getLogger("AppenderTest.one"),
        logger3 = logging.Logger.getLogger("AppenderTest.one.two");
    it.describe("adding appender to loggers", function (it) {
        var appender;
        it.beforeAll(function () {
            appender = new Appender({name:"myAppender1"});
            logger1.addAppender(appender);
        });

        it.should("be added to all subloggers", function () {
            assert.isTrue(logger1.isAppenderAttached(appender.name));
            assert.isTrue(logger2.isAppenderAttached(appender.name));
            assert.isTrue(logger3.isAppenderAttached(appender.name));
        });

        it.should("have it level defaulted to all", function () {
            assert.equal(appender.level, logging.Level.ALL);
        });

        it.should("allow its level to be set", function () {
            appender.level = "info";
            assert.equal(appender.level, logging.Level.INFO);
        });

        it.should("allow its level to be set", function () {
            appender.pattern = "{message}";
            assert.equal(appender.pattern, "{message}");
        });

        it.should("be removed from loggers if removeAllAppenders is called", function () {
            logger1.removeAppender(appender.name);
            assert.isFalse(logger1.isAppenderAttached(appender.name));
            assert.isFalse(logger2.isAppenderAttached(appender.name));
            assert.isFalse(logger3.isAppenderAttached(appender.name));
            logger2.addAppenders([appender]);
            assert.isFalse(logger1.isAppenderAttached(appender.name));
            assert.isTrue(logger2.isAppenderAttached(appender.name));
            assert.isTrue(logger3.isAppenderAttached(appender.name));
            logger2.removeAppenders([appender.name]);
            assert.isFalse(logger1.isAppenderAttached(appender.name));
            assert.isFalse(logger2.isAppenderAttached(appender.name));
            assert.isFalse(logger3.isAppenderAttached(appender.name));
            logger3.addAppender(appender);
            assert.isFalse(logger1.isAppenderAttached(appender.name));
            assert.isFalse(logger2.isAppenderAttached(appender.name));
            assert.isTrue(logger3.isAppenderAttached(appender.name));
            logger3.removeAllAppenders();
            assert.isFalse(logger1.isAppenderAttached(appender.name));
            assert.isFalse(logger2.isAppenderAttached(appender.name));
            assert.isFalse(logger3.isAppenderAttached(appender.name));
        });

        it.should("throw an error if append is called", function () {
            assert.throws(function () {
                appender.append()
            });
        })
    });

    it.describe("adding an appender and setting the level ", function (it) {
        var topic;
        it.beforeAll(function () {
            topic = new MyAppender({level:6})
        });

        it.should("have its level set to FATAL", function () {
            assert.equal(topic.level, logging.Level.FATAL);
        });

        it.should("only log fatal messages ", function () {
            logger1.addAppender(topic);
            topic.level = 6;
            var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
            var count = 0;
            comb.connect(topic, "onAppend", function () {
                count++;
            });
            levels.forEach(function (l) {
                logger1[l](l);
                logger2[l](l);
                logger3[l](l);
            });
            assert.equal(count, 3);

        });

    });

    it.describe(".createAppender", function (it) {
        it.should("create an appender from a type", function () {
            var appender = Appender.createAppender("MyAppender");
            assert.instanceOf(appender, MyAppender);
        });

        it.should("throw an error if an appender is not registered", function () {
            assert.throws(function () {
                Appender.createAppender("nonexistentappender");
            });
        });
    });

});



