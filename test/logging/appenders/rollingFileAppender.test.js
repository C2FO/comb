var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        RollingFileAppender = logging.appenders.RollingFileAppender,
        fs = require("fs");


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A RollingFileAppender");

var origWatch = fs.watchFile;
var origStat = fs.stat;
var origCreateWriteStream = fs.createWriteStream;
var origReadDir = fs.readdir;
var origUnlink = fs.unlink;
var origRename = fs.rename;

var size = 0, interval;
var setUpFS = function() {
    fs.watchFile = function(name, cb) {
        interval = setInterval(function() {
            cb({size : size++ % 2 ? 1024 : 0});
        }, 100);
    };

    fs.stat = function(name, cb) {
        setTimeout(comb.partial(cb, null, {size : size++ % 2 ? 1024 : 0}), 10);
    };

    fs.createWriteStream = function() {
        return MockWriteStream;
    };

    fs.readdir = function(dir, cb) {
        var ret = ["log.log.3", "noMatch.log.3", "log.log", "log.log.1", "log.log.2"];
        setTimeout(comb.partial(cb, null, ret), 10);
    };

    fs.unlink = function(str, cb) {
        setTimeout(cb, 10);
    };

    fs.rename = function(str, str2, cb) {
        setTimeout(cb, 10);
    };
};

var resetFs = function() {
    clearInterval(interval);
    fs.watchFile = origWatch;
    fs.stat = origStat;
    fs.createWriteStream = origCreateWriteStream;
    fs.readdir = origReadDir;
    fs.unlink = origUnlink;
    fs.rename = origRename;
};

var MockWriteStream = {
    writable : true,
    on : function(str, cb) {
        cb();
    },
    destroySoon : function() {
    },
    write : function(str) {
        return str;
    }
};

var logger = logging.Logger.getLogger("RollingFileAppenderTest"), appender;
suite.addBatch({
            "when adding a rolling file appender " : {
                topic : function() {
                    setUpFS();
                    appender = new RollingFileAppender({maxSize : "1KB", maxBackupIndex : 3});
                    logger.addAppender(appender);
                    return appender;
                },

                "the logger should contain the appender " : function(topic) {
                    assert.isTrue(logger.isAppenderAttached("rollingFileAppender"));
                    assert.deepEqual(logger.appenders, [topic]);
                },

                "the logger should log all events to the appender " : function(topic) {
                    var count = 0;
                    var levels = ["debug", "trace", "info", "warn", "error", "fatal"];
                    var conn = comb.connect(MockWriteStream, "write", function(str) {
                        assert.isTrue(str.match(levels[count]) != null);
                        count++;
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

                },

                "the appender should rollover files " :  {
                    topic : function(topic) {
                        logger.level = logging.Level.INFO;
                        var renameLogs = [
                            {name : "./log.log.2", newName : "./log.log.3"},
                            {name : "./log.log.1", newName : "./log.log.2"},
                            {name : "./log.log", newName : "./log.log.1"}
                        ];
                        var unlinkCount = 0, renameCount = 0, logCount = 0;
                        var unlinkConn = comb.connect(fs, "unlink", comb.hitch(this, function(name) {
                            assert.isTrue(name == "./log.log.3");
                            unlinkCount++;
                        }));
                        var conn = comb.connect(MockWriteStream, "write", function(str) {
                            logCount++;
                        });
                        var renameConn = comb.connect(fs, "rename", comb.hitch(this, function(name, newName) {
                            var o = renameLogs[renameCount];
                            assert.isTrue(name == o.name);
                            assert.isTrue(newName == o.newName);
                            renameCount++;
                        }));
                        var called = false;
                        //max sure that the callback is called right away
                        topic.__checkFile({size : 1023}).then(comb.hitch(this, function() {
                            called = true;
                        }));
                        assert.isTrue(called);
                        //set the next state
                        called = false;
                        topic.__inRollover = true;
                        topic.__checkFile({size : 1025}).then(comb.hitch(this, function() {
                            called = true;
                        }));

                        assert.isTrue(called);
                        topic.__inRollover = false;
                        called = false;
                        //now make sure it just creates a new write stream;
                        topic.maxBackupIndex = 0;
                        topic.__checkFile({size : 1025}).then(comb.hitch(this, function() {
                            called = true;
                        }));
                        assert.isTrue(called);
                        topic.maxBackupIndex = 3;
                        called = false;
                        //now make sure it acutally rolls over
                        topic.__checkFile({size : 1025}).then(comb.hitch(this, function() {
                            called = true;
                            this.callback(null, {renameCount : renameCount, unlinkCount : unlinkCount, logCount : logCount});
                        }));
                        assert.isFalse(called);
                        logger.info("hello");
                        logger.info("hello2");
                        logger.info("hello3");
                    },

                    "it should have renamed and removed the proper files " : function(res) {
                        assert.equal(res.unlinkCount, 1);
                        assert.equal(res.renameCount, 3);
                        assert.equal(res.logCount, 3);
                    }
                }
            }
        });

suite.run({reporter : require("vows/reporters/spec")}, function() {
    resetFs();
    ret.callback.apply(ret, arguments);
});