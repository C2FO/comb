var define = require("../define.js").define, base = require("../base"), fs = require('fs');

var logging, Logger, Level, appenders;

var parseProperties = function(properties) {
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
				var appenderProps = appenderArr[j], type = appenderProps.type;
				appenderProps.type = null;
				if (type) {
					var appender;
					switch (type.toLowerCase()) {
						case "consoleappender":
							appender = appenders.ConsoleAppender;
							break;
						case "jsonappender":
							appender = appenders.JSONAppender;
							break;
						case "fileappender":
							appender = appenders.FileAppender;
							break;
						case "rollingfileappender":
							appender = appenders.RollingFileAppender;
							break;
						default :
							appender = appenders.ConsoleAppender;
							break;
					}
					if (appender) {
						logger.addAppender(new appender(appenderProps));
					}
				}
			}
		}
	}
};

var BasicConfigurator = (exports.BasicConfigurator = define(null, {
			instance : {
				constructor : function() {
					if (!Logger) {
						logging = require("./index").logging;
						Logger = logging.Logger;
						Level = logging.Level;
						appenders = logging.appenders;
					}
					this.__configured = false;
				},

				configure : function(appender) {
					var rootLogger = Logger.getRootLogger();
					if (!appender || !(appender instanceof appenders.Appender) && !this.__configured) {
						rootLogger.addAppender(new appenders.ConsoleAppender());
						this.__configured = true;
					} else {
						rootLogger.addAppender(appender);
					}
				}
			}
		}));

exports.PropertyConfigurator = define(BasicConfigurator, {
			instance : {
				/**
				 * Configures comb.Logger with the properties or properties contained within a file
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
				 *                 pattern : "{[EEEE, MMMM dd, yyyy h:m a]timeStamp} {[5]level} {[- 5]levelName} {[-20]name} : {message}",
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
				 * @param {Object|String} properties Object containing configuration or string containing a file name with the configuration.
				 */
				configure : function(properties) {
					if (base.isObject(properties)) {
						parseProperties(properties);
					} else {
						fs.readFile(properties, function(err, res) {
							if (err) {
								console.error(err.stack);
							} else {
								try {
									parseProperties(JSON.parse(res));
								} catch(e) {
									console.error("comb.logging.PropertiesConfigurator : ERROR parsing properties from " + properties);
									console.error(e.stack);
								}
							}
						})
					}
				}
			}
		});