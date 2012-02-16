"use strict";
var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        Appender = logging.appenders.Appender;

var MyAppender = comb.define(Appender, {
            instance : {
                append : function(event) {
                    if (this._canAppend(event)) {
                        this.onAppend(comb.string.format(this.__pattern, event));
                    }
                },

                onAppend : function() {

                }
            }
        })
var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Appender");

var logger1 = logging.Logger.getLogger("AppenderTest"),
        logger2 = logging.Logger.getLogger("AppenderTest.one"),
logger3 = logging.Logger.getLogger("AppenderTest.one.two");
suite.addBatch({
            "when adding an appender " : {
                topic : function() {
                    var appender = new Appender({name : "myAppender1"});
                    logger1.addAppender(appender);
                    return appender;
                },

                "all sublogger should contain the appender " : function(topic) {
                    assert.isTrue(logger1.isAppenderAttached(topic.name));
                    assert.isTrue(logger2.isAppenderAttached(topic.name));
                    assert.isTrue(logger3.isAppenderAttached(topic.name));
                },

                "and its level should be Level.ALL" : function(topic) {
                    assert.equal(topic.level, logging.Level.ALL);
                },

                "and when setting the level it should set it" : function(topic) {
                    topic.level = "info";
                    assert.equal(topic.level, logging.Level.INFO);
                },

                "and when setting the pattern it should set it" : function(topic) {
                    topic.pattern = "{message}";
                    assert.equal(topic.pattern, "{message}");
                },

                "and when removing all appenders it should be removed from all loggers" : function(topic) {
                    logger1.removeAppender(topic.name);
                    assert.isFalse(logger1.isAppenderAttached(topic.name));
                    assert.isFalse(logger2.isAppenderAttached(topic.name));
                    assert.isFalse(logger3.isAppenderAttached(topic.name));
                    logger2.addAppenders([topic]);
                    assert.isFalse(logger1.isAppenderAttached(topic.name));
                    assert.isTrue(logger2.isAppenderAttached(topic.name));
                    assert.isTrue(logger3.isAppenderAttached(topic.name));
                    logger2.removeAppenders([topic.name]);
                    assert.isFalse(logger1.isAppenderAttached(topic.name));
                    assert.isFalse(logger2.isAppenderAttached(topic.name));
                    assert.isFalse(logger3.isAppenderAttached(topic.name));
                    logger3.addAppender(topic);
                    assert.isFalse(logger1.isAppenderAttached(topic.name));
                    assert.isFalse(logger2.isAppenderAttached(topic.name));
                    assert.isTrue(logger3.isAppenderAttached(topic.name));
                    logger3.removeAllAppenders();
                    assert.isFalse(logger1.isAppenderAttached(topic.name));
                    assert.isFalse(logger2.isAppenderAttached(topic.name));
                    assert.isFalse(logger3.isAppenderAttached(topic.name));
                },

                "and it should throw an error if append is called " : function(topic){
                    assert.throws(function(){topic.append()});
                }
            }
        });

suite.addBatch({
            "when adding an appender and setting the level " : {
                topic : new MyAppender({level : 6}),

                "its level should be FATAL" : function(topic) {
                    assert.equal(topic.level, logging.Level.FATAL);
                },

                "it should only log fatal messages ": function(topic) {
                    logger1.addAppender(topic);
                    topic.level = 6;
                    var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
                    var count = 0;
                    comb.connect(topic, "onAppend", function() {
                        count++;
                    });
                    levels.forEach(function(l) {
                        logger1[l](l);
                        logger2[l](l);
                        logger3[l](l);
                    });
                    assert.equal(count, 3);

                }

            }
        });


suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));