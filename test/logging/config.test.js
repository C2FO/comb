var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        Logger = comb.logging.Logger,
        Level = logging.Level,
        appenders = logging.appenders,
        BasicConfigurator = logging.BasicConfigurator,
        PropertyConfigurator = logging.PropertyConfigurator,
        fs = require("fs"),
        cwd = process.cwd();


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Logging Configuration");
var config = {
    "combConfigTest" : {
        "level" : "INFO",
        "appenders" : [
            {
                //default file appender
                "type" : "FileAppender",
                "file" : __dirname + "/myApp.log"
            },
            {
                //default file appender
                "type" : "ConsoleAppender"
            },
            {
                //default file appender
                "name" : "myConsoleAppender"
            },
            {
                //default file appender
                "type" : "RollingFileAppender"
            },
            {
                //default JSON appender
                "type" : "JSONAppender",
                "file" : __dirname + "/myApp.json"
            }
        ]
    }
};

var config2 = {
    "combConfigTest.other" : {
        "level" : "ERROR",
        "appenders" : [
            {
                "type" : "FileAppender",
                //override default patter
                "pattern" : "{[EEEE, MMMM dd, yyyy h:m a]timeStamp} {[5]level} {[- 5]levelName} {[-20]name} : {message}",
                //location of my log file
                "file" : __dirname + "/myApp-errors.log",
                //override name so it will get added to the log
                "name" : "errorFileAppender",
                //overwrite each time
                "overwrite" : true,
                //explicity set the appender to only accept errors
                "level" : "ERROR"
            },
            {
                "type" : "JSONAppender",
                "name" : "JSONErrorAppender",
                "file" : __dirname + "/myApp-error.json",
                //explicity set the appender to only accept errors
                "level" : "ERROR"
            }
        ]
    }
};

var fsReadFileOrig = fs.readFile;
var origWatch = fs.watchFile;
var origStat = fs.stat;
var origCreateWriteStream = fs.createWriteStream;
var origReadDir = fs.readdir;
var origUnlink = fs.unlink;
var origRename = fs.rename;
var interval, size = 0;

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

var setupFS = function() {
    fs.readFile = function(name, cb) {
        cb(null, JSON.stringify(config2));
    }

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

var resetFS = function() {
    clearInterval(interval);
    fs.readFile = fsReadFileOrig;
    fs.watchFile = origWatch;
    fs.stat = origStat;
    fs.createWriteStream = origCreateWriteStream;
    fs.readdir = origReadDir;
    fs.unlink = origUnlink;
    fs.rename = origRename;
}

var logger = Logger.getLogger();
suite.addBatch({
            "when using the basic configurator" : {
                topic : new BasicConfigurator(),

                "it should configure the root logger with a console logger" : function(topic) {
                    topic.configure();
                    assert.isTrue(logger.isAppenderAttached("consoleAppender"));
                },

                "it should configure the root logger with the specified logger" : function(topic) {
                    topic.configure(new appenders.ConsoleAppender({name : "myConsoleAppender"}));
                    assert.isTrue(logger.isAppenderAttached("myConsoleAppender"));
                    logger.removeAllAppenders();
                }
            }
        });

suite.addBatch({
            "when using the property configurator" : {
                topic : new PropertyConfigurator(),

                "it should configure with an object" : function(topic) {
                    //override default fs functionality
                    setupFS();
                    topic.configure(config);
                    var combLogger = Logger.getLogger("combConfigTest");
                    assert.instanceOf(combLogger, Logger);
                    assert.isTrue(combLogger.isAppenderAttached("consoleAppender"));
                    assert.isTrue(combLogger.isAppenderAttached("rollingFileAppender"));
                    assert.isTrue(combLogger.isAppenderAttached("fileAppender"));
                    var appender = combLogger.getAppender("fileAppender");
                    assert.equal(appender.__file, __dirname + "/myApp.log");

                    assert.isTrue(combLogger.isAppenderAttached("JSONAppender"));
                    appender = combLogger.getAppender("JSONAppender");
                    assert.equal(appender.__file, __dirname + "/myApp.json");
                },

                "it should configure with a file" : function(topic) {
                    //override default fs functionality
                    topic.configure("./myProps.json");
                    var combLogger = Logger.getLogger("combConfigTest.other");
                    assert.instanceOf(combLogger, Logger);

                    assert.isTrue(combLogger.isAppenderAttached("errorFileAppender"));
                    var appender = combLogger.getAppender("errorFileAppender");
                    assert.equal(appender.__file, __dirname + "/myApp-errors.log");
                    assert.isTrue(appender.__overwrite);
                    assert.equal("{[EEEE, MMMM dd, yyyy h:m a]timeStamp} {[5]level} {[- 5]levelName} {[-20]name} : {message}\n", appender.pattern);
                    assert.equal(appender.level, Level.ERROR);

                    assert.isTrue(combLogger.isAppenderAttached("JSONErrorAppender"));
                    appender = combLogger.getAppender("JSONErrorAppender");
                    assert.equal(appender.__file, __dirname + "/myApp-error.json");
                    assert.equal(appender.level, Level.ERROR);
                },

                "it should throw an error with an invalid configuration" : function(topic) {
                    fs.readFile = function(name, cb) {
                        cb(new Error());
                    };
                    assert.throws(function() {
                        topic.configure("myLog.json")
                    });
                    fs.readFile = function(name, cb) {
                        cb(null, config);
                    }
                    assert.throws(function() {
                        topic.configure("{]")
                    })
                }
            }
        });

suite.run({reporter : vows.reporter.spec}, function() {
    resetFS();
    ret.callback.apply(ret, arguments);
});