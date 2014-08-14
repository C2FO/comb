"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    logging = comb.logging,
    Logger = logging.Logger,
    Level = logging.Level;


it.describe("comb.logging.Logger", function (it) {


    it.describe("static methods", function (it) {

        it.should("have a root logger", function () {
            var logger = Logger.getRootLogger();
            assert.isTrue(comb.isInstanceOf(logger, Logger));
            assert.equal(Logger.getLogger(), logger);
        });

        it.should("retrieve a logger", function () {
            var logger = Logger.getLogger("comb");
            assert.isTrue(comb.isInstanceOf(logger, Logger));

        });
    });

    it.describe("instance methods", function (it) {

        var logger = Logger.getLogger("comb");

        it.should("set level properly", function () {
            assert.equal(logger.level, Level.ALL);
            assert.isFalse(logger.isOff);
            assert.isTrue(logger.isAll);
            assert.isTrue(logger.isDebug);
            assert.isTrue(logger.isTrace);
            assert.isTrue(logger.isInfo);
            assert.isTrue(logger.isWarn);
            assert.isTrue(logger.isError);
            assert.isTrue(logger.isFatal);

            logger.level = Level.DEBUG;
            assert.equal(logger.level, Level.DEBUG);
            assert.isFalse(logger.isOff);
            assert.isFalse(logger.isAll);
            assert.isTrue(logger.isDebug);
            assert.isTrue(logger.isTrace);
            assert.isTrue(logger.isInfo);
            assert.isTrue(logger.isWarn);
            assert.isTrue(logger.isError);
            assert.isTrue(logger.isFatal);

            logger.level = Level.TRACE;
            assert.equal(logger.level, Level.TRACE);
            assert.isFalse(logger.isOff);
            assert.isFalse(logger.isAll);
            assert.isFalse(logger.isDebug);
            assert.isTrue(logger.isTrace);
            assert.isTrue(logger.isInfo);
            assert.isTrue(logger.isWarn);
            assert.isTrue(logger.isError);
            assert.isTrue(logger.isFatal);

            logger.level = Level.INFO;
            assert.equal(logger.level, Level.INFO);
            assert.isFalse(logger.isOff);
            assert.isFalse(logger.isAll);
            assert.isFalse(logger.isDebug);
            assert.isFalse(logger.isTrace);
            assert.isTrue(logger.isInfo);
            assert.isTrue(logger.isWarn);
            assert.isTrue(logger.isError);
            assert.isTrue(logger.isFatal);

            logger.level = Level.WARN;
            assert.equal(logger.level, Level.WARN);
            assert.isFalse(logger.isOff);
            assert.isFalse(logger.isAll);
            assert.isFalse(logger.isDebug);
            assert.isFalse(logger.isTrace);
            assert.isFalse(logger.isInfo);
            assert.isTrue(logger.isWarn);
            assert.isTrue(logger.isError);
            assert.isTrue(logger.isFatal);

            logger.level = Level.ERROR;
            assert.equal(logger.level, Level.ERROR);
            assert.isFalse(logger.isOff);
            assert.isFalse(logger.isAll);
            assert.isFalse(logger.isDebug);
            assert.isFalse(logger.isTrace);
            assert.isFalse(logger.isInfo);
            assert.isFalse(logger.isWarn);
            assert.isTrue(logger.isError);
            assert.isTrue(logger.isFatal);

            logger.level = Level.FATAL;
            assert.equal(logger.level, Level.FATAL);
            assert.isFalse(logger.isOff);
            assert.isFalse(logger.isAll);
            assert.isFalse(logger.isDebug);
            assert.isFalse(logger.isTrace);
            assert.isFalse(logger.isInfo);
            assert.isFalse(logger.isWarn);
            assert.isFalse(logger.isError);
            assert.isTrue(logger.isFatal);

            logger.level = Level.OFF;
            assert.equal(logger.level, Level.OFF);
            assert.isFalse(logger.isAll);
            assert.isFalse(logger.isDebug);
            assert.isFalse(logger.isTrace);
            assert.isFalse(logger.isInfo);
            assert.isFalse(logger.isWarn);
            assert.isFalse(logger.isError);
            assert.isFalse(logger.isFatal);
            assert.isTrue(logger.isOff);

        });

        it.should("have create log events", function () {
            var event = logger.getLogEvent(Level.INFO, "hello");
            assert.equal(event.hostname, require("os").hostname());
            assert.equal(event.pid, process.pid);
            assert.equal(event.gid, process.getgid());
            assert.equal(event.processTitle, process.title);
            assert.deepEqual(event.level, Level.INFO);
            assert.equal(event.levelName, Level.INFO.name);
            assert.equal(event.message, "hello");
            assert.isDate(event.timeStamp);
            assert.equal(event.name, "comb");
        });

        it.should("not have an appenders by default", function () {
            assert.isEmpty(logger.appenders);
        })

        it.should("not have an child loggers by default", function () {
            assert.isEmpty(logger.subLoggers);
        });

        it.should("be additive by default", function () {
            assert.isTrue(logger.additive);
        });

        it.should("have a logger tree", function () {
            assert.isObject(logger.tree);
        });

        it.describe("child loggers", function (it) {
            var childLogger;

            it.beforeAll(function () {
                //defer initialization
                childLogger = Logger.getLogger("comb.test");
            });

            it.should("be a Logger", function () {
                assert.instanceOf(childLogger, Logger);
            });

            it.should("be the same level as the parent logger", function () {
                assert.isTrue(childLogger.isOff);
            });

            it.should("add child loggers to the parent logger", function () {
                assert.lengthOf(logger.subLoggers, 1);
            });

            it.should("have its level propogated to it", function () {
                logger.level = Level.DEBUG;
                assert.equal(childLogger.level, Level.DEBUG);
                assert.equal(logger.level, Level.DEBUG);
            });

            it.should("not have its level propogated to it if the parent is not additive", function () {
                logger.additive = false;
                assert.isFalse(logger.additive);
                logger.level = "OFF";
                assert.equal(logger.level, Level.OFF);
                assert.equal(childLogger.level, Level.DEBUG);
                logger.additive = true;
            });

            it.should("have categories", function () {
                assert.deepEqual(childLogger.categories, ["comb.test"]);
            });

            it.should("have it category added to the parent logger", function () {
                assert.deepEqual(logger.categories, ['comb', 'comb.test']);
            });
        });

        it.context(function (it) {

            var MyAppender = comb.define(logging.appenders.Appender, {

                instance: {

                    name: "myAppender",

                    append: function (event) {
                        if (this._canAppend(event)) {
                            this._static.messages.push({message: event.message, levelName: event.levelName});
                        }
                    }
                },

                "static": {
                    messages: []
                }

            });
            var logger;
            it.beforeAll(function () {
                logger = comb.logger("comb.logger.logTests").addAppender(new MyAppender());
            });

            it.beforeEach(function () {
                logger.level = "ALL";
                MyAppender.messages.length = 0;
            });


            it.should("log debug messages", function () {
                logger.debug("hello");
                logger.debug("Hello %s", "world");
                logger.log("debug", "Hello %s", "world");
                logger.level = "INFO";
                logger.debug("Hello %s", "world");
                assert.deepEqual(MyAppender.messages, [
                    {message: "hello", levelName: "DEBUG"},
                    {message: "Hello world", levelName: "DEBUG"},
                    {message: "Hello world", levelName: "DEBUG"}
                ]);
            });

            it.should("log trace messages", function () {
                logger.trace("hello");
                logger.trace("Hello %s", "world");
                logger.log("trace", "Hello %s", "world");
                logger.level = "INFO";
                logger.trace("Hello %s", "world");
                var messageMatchers = [/^Trace: hello/, /^Trace: Hello world/, /^Trace: Hello world/];
                assert.isTrue(MyAppender.messages.every(function (message, i) {
                    return messageMatchers[i].test(message.message) && message.levelName === "TRACE";
                }));
            });

            it.should("log info messages", function () {
                logger.info("hello");
                logger.info("Hello %s", "world");
                logger.log("info", "Hello %s", "world");
                logger.level = "WARN";
                logger.info("Hello %s", "world");
                assert.deepEqual(MyAppender.messages, [
                    {message: "hello", levelName: "INFO"},
                    {message: "Hello world", levelName: "INFO"},
                    {message: "Hello world", levelName: "INFO"}
                ]);

            });
            it.should("log warn messages", function () {
                logger.warn("hello");
                logger.warn("Hello %s", "world");
                logger.log("warn", "Hello %s", "world");
                logger.level = "ERROR";
                logger.warn("Hello %s", "world");
                assert.deepEqual(MyAppender.messages, [
                    {message: "hello", levelName: "WARN"},
                    {message: "Hello world", levelName: "WARN"},
                    {message: "Hello world", levelName: "WARN"}
                ]);

            });
            it.should("log error messages", function () {
                logger.error("hello");
                logger.error("Hello %s", "world");
                logger.log("error", "Hello %s", "world");
                logger.level = "FATAL";
                logger.error("Hello %s", "world");
                assert.deepEqual(MyAppender.messages, [
                    {message: "hello", levelName: "ERROR"},
                    {message: "Hello world", levelName: "ERROR"},
                    {message: "Hello world", levelName: "ERROR"}
                ]);

            });
            it.should("log fatal messages", function () {
                logger.fatal("hello");
                logger.fatal("Hello %s", "world");
                logger.log("fatal", "Hello %s", "world");
                logger.level = "OFF";
                logger.fatal("Hello %s", "world");
                assert.deepEqual(MyAppender.messages, [
                    {message: "hello", levelName: "FATAL"},
                    {message: "Hello world", levelName: "FATAL"},
                    {message: "Hello world", levelName: "FATAL"}
                ]);
            });

            it.describe(".timer", function (it) {

                function checkMessages(level) {
                    var messageMatchers = [/^hello \[Duration: \d+ms]/, /^Hello world \[Duration: \d+ms]/, /^Hello world \[Duration: \d+ms]/];
                    assert.isTrue(MyAppender.messages.every(function (message, i) {
                        return messageMatchers[i].test(message.message) && message.levelName === level;
                    }));
                }

                it.should("log debug messages", function () {
                    var timer = logger.timer();
                    timer.debug("hello");
                    timer.debug("Hello %s", "world");
                    timer.log("debug", "Hello %s", "world");
                    logger.level = "INFO";
                    timer.debug("Hello %s", "world");
                    checkMessages("DEBUG");
                });

                it.should("log trace messages", function () {
                    var timer = logger.timer();
                    timer.trace("hello");
                    timer.trace("Hello %s", "world");
                    timer.log("trace", "Hello %s", "world");
                    logger.level = "INFO";
                    timer.trace("Hello %s", "world");
                    var messageMatchers = [/^Trace: hello \[Duration: \d+ms]/, /^Trace: Hello world \[Duration: \d+ms]/, /^Trace: Hello world \[Duration: \d+ms]/];
                    assert.isTrue(MyAppender.messages.every(function (message, i) {
                        return messageMatchers[i].test(message.message) && message.levelName === "TRACE";
                    }));
                });

                it.should("log info messages", function () {
                    var timer = logger.timer();
                    timer.info("hello");
                    timer.info("Hello %s", "world");
                    timer.log("info", "Hello %s", "world");
                    logger.level = "WARN";
                    timer.info("Hello %s", "world");
                    checkMessages("INFO");
                });
                it.should("log warn messages", function () {
                    var timer = logger.timer();
                    timer.warn("hello");
                    timer.warn("Hello %s", "world");
                    timer.log("warn", "Hello %s", "world");
                    logger.level = "ERROR";
                    timer.warn("Hello %s", "world");
                    checkMessages("WARN");

                });
                it.should("log error messages", function () {
                    var timer = logger.timer();
                    timer.error("hello");
                    timer.error("Hello %s", "world");
                    timer.log("error", "Hello %s", "world");
                    logger.level = "FATAL";
                    timer.error("Hello %s", "world");
                    checkMessages("ERROR");

                });
                it.should("log fatal messages", function () {
                    var timer = logger.timer();
                    timer.fatal("hello");
                    timer.fatal("Hello %s", "world");
                    timer.log("fatal", "Hello %s", "world");
                    logger.level = "OFF";
                    timer.fatal("Hello %s", "world");
                    checkMessages("FATAL");
                });
            });
        });
    });
});