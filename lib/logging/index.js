"use strict";
var os = require("os"),
    define = require("../define.js"),
    base = require("../base"),
    isString = base.isString,
    merge = base.merge,
    isUndefinedOrNull = base.isUndefinedOrNull,
    isHash = base.isHash,
    isInstanceOf = base.isInstanceOf,
    argsToArray = base.argsToArray,
    format = base.string.format,
    Level = require("./level"),
    appenders = require("./appenders"),
    Appender = appenders.Appender,
    configurators = require("./config"),
    Logger;

var rootTree;
var LoggerTree = define.define(null, {
    instance: {

        constructor: function (root) {
            this.__root = root;
            this.__name = root.name;
            this.__level = root.level;
            this.__parent = root._parent;
            this.__map = {};
        },

        __getSubLoggers: function () {
            var map = this.__map, ret = [], n;
            for (var i in map) {
                n = map[i];
                if (n) {
                    ret = ret.concat(n.tree.getCurrentLoggers());
                }
            }
            return ret;
        },

        __getLoggers: function () {
            return [this.__root].concat(this.__getSubLoggers());
        },

        getCurrentLoggers: function () {
            return this.__getLoggers();
        },

        getSubLoggers: function () {
            return this.__getSubLoggers();
        },

        getLogger: function (name) {
            var ret;
            if (name) {
                var parts = name.split(".");
                if (parts.length) {
                    var category = parts.shift();
                    var lNode = this.__map[category];
                    if (!lNode) {
                        lNode = this.__map[category] = new Logger(category, this);
                        lNode.addAppenders(this.__root.appenders);
                    }
                    ret = lNode;
                    if (parts.length) {
                        //keep searching
                        name = parts.join(".");
                        ret = lNode.tree.getLogger(name);
                    }
                }
            } else {
                ret = this.__root;
            }
            return ret;
        },

        getRootLogger: function () {
            return this.__root;
        },

        isDisabled: function (level) {
        },

        resetConfiguration: function () {
        },

        /**
         * level = string|Level
         */

        addAppender: function (appender) {
            var map = this.__map;
            for (var i in map) {
                map[i].addAppender(appender);
            }
        },

        removeAppender: function (name) {
            var map = this.__map;
            for (var i in map) {
                map[i].removeAppender(name);
            }
        },

        setters: {
            level: function (level) {
                this.__level = level;
                if (level && level instanceof Level) {
                    var map = this.__map;
                    for (var i in map) {
                        map[i].level = level;
                    }

                }
            }

        },

        getters: {
            categories: function () {
                return this.getCurrentLoggers().map(function (l) {
                    return l.fullName;
                });
            },

            name: function () {
                var ret = this.__name;
                if (this.__parent) {
                    var pName = this.__parent.name;
                    if (pName) {
                        ret = pName + "." + ret;
                    }
                }
                return ret;
            },

            level: function () {
                return this.__level;
            },

            additive: function () {
                return this.__root.additive;
            }
        }
    }
});

var comb = exports;
/**
 * @ignore
 * @namespace logging package*/
comb.logging = merge({
    Level: Level
}, configurators);
/**
 * @ignore
 * @namespace appenders for logging*/
comb.logging.appenders = appenders;

var logging = comb.logging, hasGetGid = process.hasOwnProperty("getgid");

/**
 * @class This class is the entry point for all logging actions in comb.
 * <p><b>Logger should be retrieved by calling Logger.getLogger() NOT through the new keyword</b><p>
 * <p>
 *     All loggers in comb follow a heirarchy of inheritance based on a dot notation.
 *     <pre class="code">
 *                          rootLogger - ""
 *                                  /         \
 *                               "my"      "myOther"
 *                               /               \
 *                         "my.logger"       "myOther.logger"
 *                            /                     \
 *                       "my.logger.Log"        "myOther.logger.Log"
 *
 *     </pre>
 *     In the above Tree the rootLogger is the base for all logger. my and myOther inherit from rootLogger
 *     my.logger inherits from my, and myOther.logger inherits from myOther. The logs do not have to be retrieved in
 *     order. If I set rootLogger to ERROR level and added a console appender to it the appender and level will be
 *     added to all logs. However if I set my to INFO level and add a fileAppender to it the level and appender will
 *     only be added to logs in "my" subtree. If you set my.logger to not be additive then levels, and appenders will not
 *     propogate down to the rest of the tree.
 *
 * </p>
 *
 * <p>For information on levels see {@link comb.logging.Level}.</p>
 * <p>For information on appenders see
 *          <ul>
 *              <li>{@link comb.logging.appenders.Appender}</li>
 *              <li>{@link comb.logging.appenders.ConsoleAppender}</li>
 *              <li>{@link comb.logging.appenders.FileAppender}</li>
 *              <li>{@link comb.logging.appenders.JSONAppender}</li>
 *              <li>{@link comb.logging.appenders.RollingFileAppender}</li>
 *          </ul>
 * </p>
 * <p>For information on configurators see {@link comb.logging.BasicConfigurator} or {@link comb.logging.PropertyConfigurator}.</p>
 *
 * @example
 *
 * var logger = comb.logger;
 *
 * //configure you logging environement
 * logger.configure();
 *
 * //add a file appender to all loggers
 * logger.configure(logger.appender("FileAppender", {file : "/var/log/myLog.log"});
 *
 * //Retreiving a logger.
 * var combLogger = logger("comb");
 * var combCollectionLogger = logger("comb.collections");
 * var treeLogger = logger("comb.collections.Tree")
 *                      //add a JSON appender to tree logger just for fun!
 *                      .addAppender("JSONAppender", {file : "/var/log/myTreeLogger.json"})
 *
 * //set my treeLogger to DEBUG Level
 * treeLogger.level = "DEBUG";
 *
 *
 * @name Logger
 * @memberOf comb.logging
 *
 * @property {Array<comb.logging.Logger>} subLoggers all loggers this logger is the parent of.
 * @property {comb.logging.Level} level the level of this Logger
 * @property {Boolean} additive set to false to prevent changes to this logger from propogating down.
 * @property {Boolean} isDebug true if this Loggers level is DEBUG
 * @property {Boolean} isTrace true if this Loggers level is TRACE
 * @property {Boolean} isInfo true if this Loggers level is INFO
 * @property {Boolean} isWarn true if this Loggers level is WARN
 * @property {Boolean} isError true if this Loggers level is ERROR
 * @property {Boolean} isFatal true if this Loggers level is FATAL
 * @property {Boolean} isOff true if this Loggers level is OFF
 * @property {String} name the name of this logger this <b>does not</b> include the dot notated name
 * @property {String} fullName the full path name of this Logger.
 * @property {comb.logging.appenders.Appender} appenders list of appenders this logger currently contains.
 * @ignoreCode
 */
Logger = (logging.Logger = define.define(null, {

    instance: {
        /**@lends comb.logging.Logger.prototype*/

        constructor: function (name, parent) {
            this.__additive = true;
            this.__name = name;
            this._parent = parent;
            this._tree = new LoggerTree(this);
            this.fullName = this._tree.name;
            if (!parent || !parent.additive) {
                this.level = Level.ALL;
            } else {
                this.level = parent.level;
            }
            this.__appenders = {};
        },

        /**
         * Log an info level message
         *
         * @param {String} message the message to log.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        info: function (message) {
            return this.log.apply(this, [Level.INFO].concat(argsToArray(arguments)));
        },

        /**
         * Log an debug level message
         *
         * @param {String} message the message to log.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        debug: function (message) {
            return this.log.apply(this, [Level.DEBUG].concat(argsToArray(arguments)));
        },

        /**
         * Log an error level message
         *
         * @param {String} message the message to log.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        error: function (message) {
            return this.log.apply(this, [Level.ERROR].concat(argsToArray(arguments)));
        },

        /**
         * Log an warn level message
         *
         * @param {String} message the message to log.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        warn: function (message) {
            return this.log.apply(this, [Level.WARN].concat(argsToArray(arguments)));
        },

        /**
         * Log an trace level message
         *
         * @param {String} message the message to log.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        trace: function (message) {
            return this.log.apply(this, [Level.TRACE].concat(argsToArray(arguments)));
        },

        /**
         * Log an fatal level message
         *
         * @param {String} message the message to log.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        fatal: function (message) {
            return this.log.apply(this, [Level.FATAL].concat(argsToArray(arguments)));
        },

        /**
         * Create a timer that can be used to log statements with a duration at the send.
         *
         * ```
         * var timer = LOGGER.timer();
         * setTimeout(function(){
         *      timer.info("HELLO TIMERS!!!"); //HELLO TIMERS!!! [Duration: 5000ms]
         * }, 5000);
         * ```
         *
         * @param timerFormat
         * @returns {{info: Function, debug: Function, error: Function, warn: Function, trace: Function, fatal: Function, end: Function}}
         */
        timer: function (timerFormat) {
            timerFormat = timerFormat || " [Duration: %dms]";
            function timerLog(level, start) {
                return function (message) {
                    var args = argsToArray(arguments, 1);
                    message += timerFormat;
                    args.push(new Date() - start);
                    self.log.apply(self, [level, message].concat(args));
                    return ret;
                };
            }

            var start = new Date(),
                self = this,
                ret = {
                    info: timerLog(Level.INFO, start),
                    debug: timerLog(Level.DEBUG, start),
                    error: timerLog(Level.ERROR, start),
                    warn: timerLog(Level.WARN, start),
                    trace: timerLog(Level.TRACE, start),
                    fatal: timerLog(Level.FATAL, start),
                    log: function (level) {
                        return timerLog(level, start).apply(this, argsToArray(arguments, 1));
                    },
                    end: function () {
                        start = self = null;
                    }
                };
            return ret;
        },

        /**
         * Creates a log event to be passed to appenders
         *
         * @param {comb.logging.Level} level the level of the logging event
         * @param {String} message the message to be logged
         * @return {Object} the logging event
         */
        getLogEvent: function getLogEvent(level, message, rawMessage) {
            return {
                hostname: os.hostname(),
                pid: process.pid,
                gid: hasGetGid ? process.getgid() : null,
                processTitle: process.title,
                level: level,
                levelName: level.name,
                message: message,
                timeStamp: new Date(),
                name: this.fullName,
                rawMessage: rawMessage
            };
        },

        /**
         * Log a message
         *
         * @param {comb.logging.Level} level the level the message is
         * @param {String} message the message to log.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        log: function log(level, message) {
            var rawMessage = message;
            level = Level.toLevel(level);

            if (this.hasLevelGt(level)) {
                var args = argsToArray(arguments, 1);
                if (args.length > 1) {
                    message = format.apply(null, args);
                }
                if (Level.TRACE.equals(level)) {
                    var err = new Error;
                    err.name = "Trace";
                    err.message = message || '';
                    Error.captureStackTrace(err, log);
                    message = err.stack;
                } else if (Level.ERROR.equals(level) && isInstanceOf(message, Error)) {
                    message = message.stack;
                }
                var type = level.name.toLowerCase(), appenders = this.__appenders;
                var event = this.getLogEvent(level, message, rawMessage);
                Object.keys(appenders).forEach(function (i) {
                    appenders[i].append(event);
                });
            }
            return this;
        },

        /**
         * Add an appender to this logger. If this is additive then the appender is added to all subloggers.
         *
         * @example
         * comb.logger("my.logger")
         *  .addAppender("ConsoleAppender")
         *  .addAppender("FileAppender", {file:'/var/log/my.log'})
         *  .addAppender("RollingFileAppender", {file:'/var/log/myRolling.log'})
         *  .addAppender("JSONAppender", {file:'/var/log/myJson.log'});
         *
         * @param {comb.logging.Appender|String} If the appender is an {@link comb.logging.appenders.Appender} then it is added.
         * If the appender is a string then {@link comb.logging.appenders.Appender.createAppender} will be called to create it.
         *
         * @param {Object} [opts = null] If the first argument is a string then the opts will be used as constructor arguments for
         * creating the appender.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        addAppender: function (appender, opts) {
            var args = argsToArray(arguments);
            if (isString(appender)) {
                this.addAppender(Appender.createAppender(appender, opts));
            } else {
                if (!isUndefinedOrNull(appender)) {

                    var name = appender.name;
                    if (!(name in this.__appenders)) {
                        this.__appenders[name] = appender;
                        if (!appender.level) {
                            appender.level = this.level;
                        }
                        this._tree.addAppender(appender);
                    }
                }
            }
            return this;
        },

        /**
         * Short cut to add a list of appenders to this Logger
         * @param {Array<comb.logging.Appender>} appenders
         *
         * @return {comb.logging.Logger} for chaining.
         */
        addAppenders: function (appenders) {
            appenders.forEach(this.addAppender.bind(this));
            return this;
        },

        /**
         * Removes and appender from this logger.
         * @param {String} name the name of the appender
         * @return {comb.logging.Logger} for chaining.
         */
        removeAppender: function (name) {
            if (name in this.__appenders) {
                delete this.__appenders[name];
                this._tree.removeAppender(name);
            }
            return this;
        },

        /**
         * Removes a list of appenders from this logger.
         *
         * @param {String[]} appenders a list of names of appenders to remove
         * @return {comb.logging.Logger} for chaining.
         */
        removeAppenders: function (appenders) {
            appenders.forEach(this.removeAppender, this);
            return this;
        },

        /**
         * Removes all appenders from this logger and sub loggers if this Logger is additive.
         *
         * @return {comb.logging.Logger} for chaining.
         */
        removeAllAppenders: function () {
            Object.keys(this.__appenders).forEach(this.removeAppender.bind(this));
            return this;
        },

        /**
         * Determines if an appender is attached.
         *
         * @param {String} name the name of the appender.
         */
        isAppenderAttached: function (name) {
            return (name in this.__appenders);
        },

        /**
         * Gets an appender from this logger
         *
         * @param {String} name the name of the appender.
         *
         * @return {comb.logging.Appender|undefined} returns the appender with the specified name or
         *                                          undefined if it is not found.
         */
        getAppender: function (name) {
            var ret;
            if (name in this.__appenders) {
                ret = this.__appenders[name];
            }
            return ret;
        },

        hasLevelGt: function (level) {
            var ret = level.isGreaterOrEqualToo(this.level), i, appenders, keys, l;
            if (!ret) {
                appenders = this.__appenders;
                keys = Object.keys(appenders);
                l = keys.length;
                i = -1;

                while (++i < l && !ret) {
                    ret = level.isGreaterOrEqualToo(appenders[keys[i]].level);
                }
            }
            return ret;
        },

        /**
         * @ignore
         * */
        setters: {

            level: function (level) {
                level = Level.toLevel(level);
                if (this.__additive) {
                    this.__level = level;
                    var appenders = this.__appenders;
                    for (var i in appenders) {
                        appenders[i].level = level;
                    }
                    this._tree.level = level;
                } else {
                    this.__level = level;
                }
            },

            additive: function (additive) {
                this.__additive = additive;
            }
        },

        /**@ignore*/
        getters: {
            /**@ignore*/

            /**@ignore*/
            subLoggers: function () {
                return this._tree.getSubLoggers();
            },

            /**@ignore*/
            level: function () {
                return this.__level;
            },

            /**@ignore*/
            additive: function () {
                return this.__additive;
            },

            isAll: function () {
                return Level.ALL.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isDebug: function () {
                return Level.DEBUG.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isTrace: function () {
                return Level.TRACE.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isInfo: function () {
                return Level.INFO.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isWarn: function () {
                return Level.WARN.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isError: function () {
                return Level.ERROR.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isFatal: function () {
                return Level.FATAL.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isOff: function () {
                return Level.OFF.equals(this.level);
            },

            /**@ignore*/
            name: function () {
                return this.__name;
            },

            /**@ignore*/
            tree: function () {
                return this._tree;
            },

            /**@ignore*/
            appenders: function () {
                var ret = [];
                for (var i in this.__appenders) {
                    ret.push(this.__appenders[i]);
                }
                return ret;
            },

            categories: function () {
                return this._tree.categories;
            }
        }
    },

    static: {
        /**@lends comb.logging.Logger*/

        /**
         * Return the root of all loggers
         */
        getRootLogger: function () {
            return rootTree.getRootLogger();
        },

        /**
         * Retrieves/Creates a logger based on the name passed in
         *
         * @param {String} name the name of the logger
         */
        getLogger: function (name) {
            return rootTree.getLogger(name);
        }
    }
}));

/**
 *
 * @function
 * @description Alias to {@link comb.logging.Logger.getLogger}.  See {@link comb.logging.Logger} for more information.
 *
 * @example
 *
 * comb.logger("my.logger");
 *
 * @memberOf comb
 * @namespace
 */
exports.logger = Logger.getLogger.bind(Logger);

/**
 * @function
 * @description Shortcut to configure loggers.
 *
 * @example
 *
 * //same as new comb.logging.BasicConfigurator().configure();
 * comb.logger.configure();
 *
 * //new comb.logging.PropertyConfigurator().configure("/location/to/logger/configuration.json");
 * comb.logger.configure("/location/to/logger/configuration.json");
 *
 * @memberOf comb.logger
 */
exports.logger.configure = function configure() {
    var args = argsToArray(arguments), configurator;
    if (!args.length) {
        configurator = new configurators.BasicConfigurator();
    } else {
        var first = args[0];
        if (isHash(first) || isString(first)) {
            configurator = new configurators.PropertyConfigurator();
        } else {
            configurator = new configurators.BasicConfigurator();
        }
    }
    configurator.configure.apply(configurator, args);
    return this;
};

/**
 * @function
 * @description Factory method for creating appenders. See {@link comb.logging.appenders.Appender.createAppender} for
 * arguments.
 *
 * @example
 *
 * var appender = comb.logger.appender("ConsoleAppender");
 * comb.logger("my.logger").addAppender(appender);
 *
 * @memberOf comb.logger
 *
 */
exports.logger.appender = Appender.createAppender.bind(Appender);

var rootLogger = new Logger("");
rootTree = rootLogger._tree;

/**
 * The root for all loggers.
 * @memberOf comb.logger
 * @type comb.logging.Logger
 */
exports.logger.rootLogger = rootLogger;
