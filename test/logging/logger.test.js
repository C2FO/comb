var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        Logger = logging.Logger,
        Level = logging.Level;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Logger");

var combLogger = Logger.getLogger("comb");
suite.addBatch({

            "it should have a root logger " : {
                topic : Logger.getRootLogger(),

                "and it should be a Logger" : function(logger){
                    assert.isTrue(comb.isInstanceOf(logger, Logger));
                    assert.equal(Logger.getLogger(), logger);
                }
            },

            "it should retrieve a logger" : {
                topic : combLogger,

                "and it should be a Logger" : function(logger) {
                    assert.isTrue(comb.isInstanceOf(logger, Logger));
                },

                "and it should be at the ALL Level" : function(logger) {
                    assert.equal(logger.level, Level.ALL);
                    assert.isFalse(logger.isOff);
                    assert.isTrue(logger.isAll);
                    assert.isTrue(logger.isDebug);
                    assert.isTrue(logger.isTrace);
                    assert.isTrue(logger.isInfo);
                    assert.isTrue(logger.isWarn);
                    assert.isTrue(logger.isError);
                    assert.isTrue(logger.isFatal);
                },

                "and it should be at the DEBUG Level" : function(logger) {
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
                },

                "and it should be at the TRACE Level" : function(logger) {
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
                },

                "and it should be at the INFO Level" : function(logger) {
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
                },

                "and it should be at the WARN Level" : function(logger) {
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
                },

                "and it should be at the ERROR Level" : function(logger) {
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
                },

                "and it should be at the FATAL Level" : function(logger) {
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
                },

                "and it should be at the OFF Level" : function(logger) {
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
                },

                "and its appenders should be empty " : function(logger) {
                    assert.isEmpty(logger.appenders);
                },

                "and its sub loggers should be empty " : function(logger) {
                    assert.isEmpty(logger.subLoggers);
                },

                "and it should be additive " : function(logger) {
                    assert.isTrue(logger.additive);
                },

                "and it should return its tree " : function(logger) {
                    assert.isObject(logger.tree);
                }
            }
        });

suite.addBatch({
            "when getting a child logger " : {
                topic : function() {
                    return  Logger.getLogger("comb.test")
                },

                "it should be a logger" : function(logger) {
                    assert.instanceOf(logger, Logger);
                },

                "its level should be OFF" : function(logger) {
                    assert.isTrue(logger.isOff);
                },

                "comb logger should have sub loggers now " : function() {
                    assert.lengthOf(combLogger.subLoggers, 1);
                },

                "and when setting combLogger level to DEBUG the topic should also change " : function(logger) {
                    combLogger.level = Level.DEBUG;
                    assert.equal(combLogger.level, Level.DEBUG);
                    assert.equal(logger.level, Level.DEBUG);
                },

                "and when setting combLogger to not be additive the topics level should not change " : function(logger){
                    combLogger.additive = false;
                    assert.isFalse(combLogger.additive);
                    combLogger.level = "OFF";
                    assert.equal(combLogger.level, Level.OFF);
                    assert.equal(logger.level, Level.DEBUG);
                    combLogger.additive = true;
                },

                "it should just have comb.test category" : function(logger){
                    assert.deepEqual(logger.categories, ["comb.test"]);
                },

                "combLogger should have two 'comb' and 'comb.test' categories" : function(){
                    assert.deepEqual(combLogger.categories, ['comb', 'comb.test']);
                }
            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));