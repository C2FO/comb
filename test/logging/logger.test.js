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
        })

        it.should("retrieve a logger", function () {
            var logger = Logger.getLogger("comb");
            assert.isTrue(comb.isInstanceOf(logger, Logger));

        })
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
    });


});