var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        JSONAppender = logging.appenders.JSONAppender;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A JSONAppender");

var MockWriteStream = {
    writable : true,
    on : function() {
    },
    destroySoon : function() {
    },
    write : function(str) {
        return str;
    }
};

var logger = logging.Logger.getLogger("JSONAppenderTest"), appender;
suite.addBatch({
            "when adding a json appender " : {
                topic : function() {
                    appender = new JSONAppender({writeStream : MockWriteStream});
                    logger.addAppender(appender);
                    return appender;
                },

                "the logger should contain the appender " : function(topic) {
                    assert.isTrue(logger.isAppenderAttached("JSONAppender"));
                    assert.deepEqual(logger.appenders, [topic]);
                },

                "the logger should log all events to the appender " : function(topic) {
                    var count = 0;
                    var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
                    var conn = comb.connect(MockWriteStream, "write", function(str) {
                        if (!str.match(/^\[|\]$/)) {
                            str = str.replace(/^,/, "")
                            var obj = JSON.parse(str);
                            assert.isTrue(obj.message.match(levels[count]) != null);
                            count++;
                        }
                    });
                    levels.forEach(function(l) {
                        logger[l](l);
                    });
                    assert.equal(count, 6);
                    comb.disconnect(conn);

                },

                "the logger should log no events to the appender " : function(topic) {
                    logger.level = logging.Level.OFF;
                    var count = 0;
                    var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
                    var conn = comb.connect(MockWriteStream, "write", function(str) {
                        count++;
                    });
                    levels.forEach(function(l) {
                        logger[l](l);
                    });
                    assert.equal(count, 0);
                    comb.disconnect(conn);

                }
            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));