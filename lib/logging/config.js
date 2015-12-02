"use strict";
var define = require("../define.js").define,
    base = require("../base"),
    fs = require('fs'),
    Appender = require("./appenders/appender.js");

var logging, Logger, Level, appenders;


var parseProperties = function (properties) {
    for (var i in properties) {
        var logger = Logger.getLogger(i);
        var props = properties[i], level = props.level, appenderArr = props.appenders;
        if (level) {
            level = Level.toLevel(level);
            if (level) {
                logger.level = level;
            }
        }
        if (appenderArr && base.isArray(appenderArr)) {
            for (var j = appenderArr.length - 1; j >= 0; j--) {
                var appenderProps = base.merge({}, appenderArr[j]), type = appenderProps.type;
                appenderProps.type = null;
                if (type) {
                    logger.addAppender(type, appenderProps);
                }
            }
        }
    }
};


/**
 * @class default configurator for logging
 *
 * @name BasicConfigurator
 * @memberOf comb.logging
 * @ignoreCode
 *
 */
var BasicConfigurator = (exports.BasicConfigurator = define(null, {
    instance: {
        /**@lends comb.logging.BasicConfigurator.prototype*/

        constructor: function () {
            if (!Logger) {
                logging = require("./index").logging;
                Logger = logging.Logger;
                Level = logging.Level;
                appenders = logging.appenders;
            }
        },

        /**
         * Configure logging.
         *
         * @param {comb.logging.Appender} [appender=null] appender to add to the root logger, by default a console logger is added.
         */
        configure: function (appender) {
            var rootLogger = Logger.getRootLogger();
            rootLogger.removeAllAppenders();
            if (base.isInstanceOf(appender, appenders.Appender)) {
                rootLogger.addAppender(appender);
            } else {
                rootLogger.addAppender(new appenders.ConsoleAppender());
            }
        }
    }
}));

/**
 * @class Configures comb.Logger with the properties or properties contained within a file
 *
 * @example
 *
 * var propertyConfigurator = new comb.logging.PropertyConfigurator();
 *
 * propertyConfigurator.configure("/location/of/combLogger.json");
 *
 * //or
 *
 * var config = {
 *     "my.logger" : {
 *         level : "INFO",
 *         appenders : [
 *             {
 *                 //default file appender
 *                 type : "FileAppender",
 *                 file : "/var/log/myApp.log",
 *             },
 *             {
 *                 //default JSON appender
 *                 type : "JSONAppender",
 *                 file : "/var/log/myApp.JSON",
 *             },
 *             {
 *                 type : "FileAppender",
 *                  //override default patter
 *                 pattern : "{[EEEE, MMMM dd, yyyy h:m a]timeStamp} {[5]level}"
 *                          + " {[- 5]levelName} {[-20]name} : {message}",
 *                 //location of my log file
 *                 file : "/var/log/myApp-errors.log",
 *                 //override name so it will get added to the log
 *                 name : "errorFileAppender",
 *                 //overwrite each time
 *                 overwrite : true,
 *                 //explicity set the appender to only accept errors
 *                 level : "ERROR"
 *             },
 *             {
 *                 type : "JSONAppender",
 *                 file : "/var/log/myApp-error.json",
 *                 //explicity set the appender to only accept errors
 *                 level : "ERROR"
 *             }
 *         ]
 *     }
 *     //repeat for more loggers
 *
 *     propertyConfigurator.configure(config);
 * }
 *
 * @name PropertyConfigurator
 * @augments comb.logging.BasicConfigurator
 * @memberOf comb.logging
 * @ignoreCode
 *
 */
exports.PropertyConfigurator = define(BasicConfigurator, {
    instance: {
        /**@lends comb.logging.PropertyConfigurator.prototype*/
        /**
         * Call to configure logging
         *
         * @example
         *
         * //Example configuration
         *  {
         *     "my.logger" : {
         *         level : "INFO",
         *         appenders : [
         *             {
         *                 //default file appender
         *                 type : "FileAppender",
         *                 file : "/var/log/myApp.log",
         *             },
         *             {
         *                 //default JSON appender
         *                 type : "JSONAppender",
         *                 file : "/var/log/myApp.JSON",
         *             },
         *             {
         *                 type : "FileAppender",
         *                  //override default patter
         *                 pattern : "{[EEEE, MMMM dd, yyyy h:m a]timeStamp} {[5]level}"
         *                          + " {[- 5]levelName} {[-20]name} : {message}",
         *                 //location of my log file
         *                 file : "/var/log/myApp-errors.log",
         *                 //override name so it will get added to the log
         *                 name : "errorFileAppender",
         *                 //overwrite each time
         *                 overwrite : true,
         *                 //explicity set the appender to only accept errors
         *                 level : "ERROR"
         *             },
         *             {
         *                 type : "JSONAppender",
         *                 file : "/var/log/myApp-error.json",
         *                 //explicity set the appender to only accept errors
         *                 level : "ERROR"
         *             }
         *         ]
         *     }
         *
         * @param {Object|String} properties Object containing configuration or string containing a file name with the configuration.
         */
        configure: function (properties) {
            var rootLogger = Logger.getRootLogger();
            rootLogger.removeAllAppenders();
            if (base.isHash(properties)) {
                parseProperties(base.deepMerge({}, properties));
            } else {
                fs.readFile(properties, function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        try {
                            parseProperties(JSON.parse(res));
                        } catch (e) {
                            throw e;
                        }
                    }
                });
            }
        }
    }
});
