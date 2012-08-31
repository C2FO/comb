"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    logging = comb.logging,
    RollingFileAppender = logging.appenders.RollingFileAppender,
    fs = require("fs");


it.describe("comb.logging.appenders.RollingFileAppender",function (it) {
    var origWatch = fs.watchFile;
    var origStat = fs.stat;
    var origCreateWriteStream = fs.createWriteStream;
    var origReadDir = fs.readdir;
    var origUnlink = fs.unlink;
    var origRename = fs.rename;

    var size = 0, callwatch;
    var setUpFS = function () {
        fs.watchFile = function (name, cb) {
            //do nothing
        };

        fs.stat = function (name, cb) {
            setTimeout(comb.partial(cb, null, {size:size++ % 2 ? 1024 : 0}), 10);
        };

        fs.createWriteStream = function () {
            return MockWriteStream;
        };

        fs.readdir = function (dir, cb) {
            var ret = ["log.log.3", "noMatch.log.3", "log.log", "log.log.1", "log.log.2"];
            setTimeout(comb.partial(cb, null, ret), 10);
        };

        fs.unlink = function (str, cb) {
            setTimeout(cb, 10);
        };

        fs.rename = function (str, str2, cb) {
            setTimeout(cb, 10);
        };
    };

    var resetFs = function () {
        fs.watchFile = origWatch;
        fs.stat = origStat;
        fs.createWriteStream = origCreateWriteStream;
        fs.readdir = origReadDir;
        fs.unlink = origUnlink;
        fs.rename = origRename;
    };

    var MockWriteStream = {
        writable:true,
        on:function (str, cb) {
            cb();
        },
        destroySoon:function () {
        },
        write:function (str) {
            return str;
        }
    };
    var appender, logger;
    it.beforeAll(function () {
        logger = logging.Logger.getLogger("RollingFileAppenderTest")
        setUpFS();
        appender = new RollingFileAppender({writeStream:MockWriteStream, maxSize:"1KB", maxBackupIndex:3});
        logger.addAppender(appender);
    });


    it.should("be added to the logger", function () {
        assert.isTrue(logger.isAppenderAttached("rollingFileAppender"));
        assert.deepEqual(logger.appenders, [appender]);
    });

    it.should("have events logged to it", function () {
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
        conn = comb.connect(MockWriteStream, "write", function (str) {
            count++;
        });
        levels.forEach(function (l) {
            logger[l](l);
        });
        assert.equal(count, 0);
        comb.disconnect(conn);

    });


    it.should("rollover files ", function (next) {

        logger.level = logging.Level.INFO;
        var renameLogs = [
            {name:"./log.log.2", newName:"./log.log.3"},
            {name:"./log.log.1", newName:"./log.log.2"},
            {name:"./log.log", newName:"./log.log.1"}
        ];
        var unlinkCount = 0, renameCount = 0, logCount = 0;
        var unlinkConn = comb.connect(fs, "unlink", comb.hitch(this, function (name) {
            assert.isTrue(name == "./log.log.3");
            unlinkCount++;
        }));
        var conn = comb.connect(MockWriteStream, "write", function (str) {
            logCount++;
        });
        var renameConn = comb.connect(fs, "rename", comb.hitch(this, function (name, newName) {
            var o = renameLogs[renameCount];
            assert.isTrue(name == o.name);
            assert.isTrue(newName == o.newName);
            renameCount++;
        }));
        var called = false;
        //max sure that the callback is called right away
        appender.__checkFile({size:1023}).then(comb.hitch(this, function () {
            called = true;
        }));
        process.nextTick(function () {
            assert.isTrue(called);
            //set the next state
            called = false;
            appender.__inRollover = true;
            appender.__checkFile({size:1025}).then(comb.hitch(this, function () {
                called = true;
            }));

            process.nextTick(function () {
                assert.isTrue(called);
                appender.__inRollover = false;
                called = false;
                //now make sure it just creates a new write stream;
                appender.maxBackupIndex = 0;
                appender.__checkFile({size:1025}).then(comb.hitch(this, function () {
                    called = true;
                }));
                process.nextTick(function () {
                    assert.isTrue(called);
                    appender.maxBackupIndex = 3;
                    called = false;
                    //now make sure it acutally rolls over
                    appender.__checkFile({size:1025}).then(comb.hitch(this, function () {
                        called = true;

                        assert.equal(unlinkCount, 1);
                        assert.equal(renameCount, 3);
                        assert.equal(logCount, 3);
                        next();
                    }));
                    process.nextTick(function () {
                        assert.isFalse(called);
                        logger.info("hello");
                        logger.info("hello2");
                        logger.info("hello3");
                    });
                });
            });
        });
    });


    it.afterAll(resetFs);


}).as(module);

