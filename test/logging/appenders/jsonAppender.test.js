"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    logging = comb.logging,
    JSONAppender = logging.appenders.JSONAppender;


it.describe("comb.logging.appenders.JSONAppender", function (it) {

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

    var logger = logging.Logger.getLogger("JSONAppenderTest"),
        appender = new JSONAppender({writeStream:MockWriteStream});
    logger.addAppender(appender);

    it.should("be added to the logger", function () {
        assert.isTrue(logger.isAppenderAttached("JSONAppender"));
        assert.deepEqual(logger.appenders, [appender]);
    });

    it.should("have events logged to it by the logger according to level", function () {

        var count = 0;
        var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
        var conn = comb.connect(MockWriteStream, "write", function (str) {
            if (!str.match(/^\[|\]$/)) {
                str = str.replace(/^,/, "")
                var obj = JSON.parse(str);
                assert.isTrue(obj.message.match(levels[count]) != null);
                count++;
            }
        });
        levels.forEach(function (l) {
            logger[l](l);
        });
        assert.equal(count, 6);
        comb.disconnect(conn);
        logger.level = logging.Level.OFF;
        count = 0;
        conn = comb.connect(MockWriteStream, "write", function (str) {
            count++;
        });
        levels.forEach(function (l) {
            logger[l](l);
        });
        assert.equal(count, 0);
        comb.disconnect(conn);
    });

}).as(module);


