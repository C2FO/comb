var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        FileAppender = logging.appenders.FileAppender;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A FileAppender");

var MockWriteStream = {
    writable : true,
    on : function(){},
    destroySoon : function(){},
    write : function(str){
        return str;
    }
};

var logger = logging.Logger.getLogger("FilerAppenderTest"), appender;
suite.addBatch({
            "when adding a file appender " : {
                topic : function(){
                    appender = new FileAppender({writeStream : MockWriteStream});
                    logger.addAppender(appender);
                    return appender;
                },

                "the logger should contain the appender " : function(topic){
                    assert.isTrue(logger.isAppenderAttached("fileAppender"));
                    assert.deepEqual(logger.appenders, [topic]);
                },

                "the logger should log all events to the appender " : function(topic){
                    var count = 0;
                    var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
                    var conn = comb.connect(MockWriteStream, "write", function(str){
                        assert.isTrue(str.match(levels[count]) != null);
                        count++;
                    });
                    levels.forEach(function(l){
                        logger[l](l);
                    });
                    assert.equal(count, 6);
                    comb.disconnect(conn);

                },

                 "the logger should log no events to the appender " : function(topic){
                     logger.level = logging.Level.OFF;
                      var count = 0;
                    var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
                    var conn = comb.connect(MockWriteStream, "write", function(str){
                        assert.isTrue(str.match(levels[count]) != null);
                        count++;
                    });
                    levels.forEach(function(l){
                        logger[l](l);
                    });
                    assert.equal(count, 0);
                    comb.disconnect(conn);

                }
            }
        });

suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret, "callback"));