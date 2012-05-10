"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    logging = comb.logging,
    FileAppender = logging.appenders.FileAppender;


it.describe("comb.logging.appenders.FileAppender", function (it) {

    var MockWriteStream = {
        writable:true,
        on:function () {
        },
        destroySoon:function () {
        },
        write:function (str) {
            return str;
        }
    };

    var logger = logging.Logger.getLogger("FilerAppenderTest"),
        appender = new FileAppender({writeStream:MockWriteStream});
    logger.addAppender(appender);

    it.should("be added to the logger", function () {
        assert.isTrue(logger.isAppenderAttached("fileAppender"));
        assert.deepEqual(logger.appenders, [appender]);
    });

    it.should("have events logged to it by the logger according to level", function () {

        var count = 0;
        var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
        var conn = comb.connect(MockWriteStream, "write", function (str) {
            assert.isTrue(str.match(levels[count]) != null);
            count++;
        });
        levels.forEach(function (l) {
            logger[l](l);
        });
        assert.equal(count, 6);
        comb.disconnect(conn);


        logger.level = logging.Level.OFF;
        count = 0;
        var conn = comb.connect(MockWriteStream, "write", function (str) {
            assert.isTrue(str.match(levels[count]) != null);
            count++;
        });
        levels.forEach(function (l) {
            logger[l](l);
        });
        assert.equal(count, 0);
        comb.disconnect(conn);


    });


});
