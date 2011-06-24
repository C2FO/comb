var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        ConsoleAppender = logging.appenders.ConsoleAppender;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A ConsoleAppender");

var logger = logging.Logger.getLogger("ConsoleLoggerTest"), appender;
suite.addBatch({
            "when adding a console appender " : {
                topic : function(){
                    appender = new ConsoleAppender();
                    logger.addAppender(appender);
                    return appender;
                },

                "the logger should contain the appender " : function(topic){
                    assert.isTrue(logger.isAppenderAttached("consoleAppender"));
                    assert.deepEqual(logger.appenders, [topic]);
                },

                "the logger should log all events to the appender " : function(topic){
                    var orig = console.log;
                    var count = 0;
                    var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
                    console.log = function(str){
                        assert.isTrue(str.match(levels[count]) != null);
                        count++;
                    };
                    levels.forEach(function(l){
                        logger[l](l);
                    });
                    assert.equal(count, 6);
                    console.log = orig;

                },

                 "the logger should log no events to the appender " : function(topic){
                    var orig = console.log;
                     logger.level = logging.Level.OFF;
                    var count = 0;
                    var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
                    console.log = function(str){
                        assert.isTrue(str.match(levels[count]) != null);
                        count++;
                    };
                    levels.forEach(function(l){
                        logger[l](l);
                    });
                    assert.equal(count, 0);
                    console.log = orig;

                }
            }
        });

suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret, "callback"));