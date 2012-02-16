var define = require("../define.js"),
        base = require("../base"),
        Level = require("./level"),
        appenders = require("./appenders"),
        configurators = require("./config");
var rootTree;
var LoggerTree = define.define(null, {
    instance:{

        constructor:function (root) {
            this.__root = root;
            this.__name = root.name;
            this.__level = root.level;
            this.__parent = root._parent;
            this.__map = {};
        },

        __getSubLoggers:function () {
            var map = this.__map, ret = [], n;
            for (var i in map) {
                n = map[i];
                if (n) {
                    ret = ret.concat(n.tree.getCurrentLoggers());
                }
            }
            return ret;
        },

        __getLoggers:function () {
            return [this.__root].concat(this.__getSubLoggers())
        },

        getCurrentLoggers:function () {
            return this.__getLoggers();
        },

        getSubLoggers:function () {
            return this.__getSubLoggers();
        },

        getLogger:function (name) {
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

        getRootLogger:function () {
            return this.__root;
        },

        isDisabled:function (level) {
        },

        resetConfiguration:function () {
        },

        /**
         * level = string|Level
         */

        addAppender:function (appender) {
            var map = this.__map;
            for (var i in map) {
                map[i].addAppender(appender);
            }
        },

        removeAppender:function (name) {
            var map = this.__map;
            for (var i in map) {
                map[i].removeAppender(name);
            }
        },

        setters:{
            level:function (level) {
                this.__level = level;
                if (level && level instanceof Level) {
                    var map = this.__map;
                    for (var i in map) {
                        map[i].level = level;
                    }

                }
            }

        },

        getters:{
            categories:function () {
                return this.getCurrentLoggers().map(function (l) {
                    return l.fullName;
                });
            },

            name:function () {
                var ret = this.__name;
                if (this.__parent) {
                    var pName = this.__parent.name;
                    if (pName) {
                        ret = pName + "." + ret;
                    }
                }
                return ret;
            },

            level:function () {
                return this.__level;
            },

            additive:function () {
                return this.__root.additive;
            }
        }
    }
});

var comb = exports;
/**@namespace logging package*/
comb.logging = base.merge({
    Level:Level
}, configurators);
/**@namespace appenders for logging*/
comb.logging.appenders = appenders;

var logging = comb.logging;

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
 * var logging = comb.logging,
 *     Logger = logging.Logger,
 *     appenders = logging.appenders,
 *     Level = logging.Level;
 *
 * //configure you logging environement
 *
 * var bc = logging.BasicConfigurator();
 * //add console appender to all loggers
 * bc.configure();
 * //add a file appender to all loggers
 * bc.configure(new appenders.FileAppender({file : "/var/log/myLog.log"}));
 *
 * //Retreiving a logger.
 * var combLogger = Logger.getLogger("comb");
 * var combCollectionLogger = Logger.getLogger("comb.collections");
 * var treeLogger = Logger.getLogger("comb.collections.Tree");
 *
 * //set my treeLogger to DEBUG Level
 * treeLogger.level = Level.DEBUG;
 * //add a JSON appender to tree logger just for fun!
 * treeLogger.addAppender(new appenders.JSONAppender({file : "/var/log/myTreeLogger.json"}));
 *
 * //NOW USE THEM
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
 */
var Logger = (logging.Logger = define.define(null, {

    instance:{
        /**@lends comb.logging.Logger.prototype*/

        constructor:function (name, parent) {
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
         */
        info:function (message) {
            this.log(Level.INFO, message);
        },

        /**
         * Log an debug level message
         *
         * @param {String} message the message to log.
         */
        debug:function (message) {
            this.log(Level.DEBUG, message);
        },

        /**
         * Log an error level message
         *
         * @param {String} message the message to log.
         */
        error:function (message) {
            this.log(Level.ERROR, message);
        },

        /**
         * Log an warn level message
         *
         * @param {String} message the message to log.
         */
        warn:function (message) {
            this.log(Level.WARN, message);
        },

        /**
         * Log an trace level message
         *
         * @param {String} message the message to log.
         */
        trace:function (message) {
            this.log(Level.TRACE, message);
        },

        /**
         * Log an fatal level message
         *
         * @param {String} message the message to log.
         */
        fatal:function (message) {
            this.log(Level.FATAL, message);
        },

        /**
         * Log a message
         *
         * @param {comb.logging.Level} level the level the message is
         * @param {String} message the message to log.
         */
        log:function (level, message) {
            if (level.isGreaterOrEqualToo(this.level)) {
                if (Level.TRACE.equals(level)) {
                    var err = new Error;
                    err.name = "Trace";
                    err.message = message || '';
                    Error.captureStackTrace(err, arguments.callee);
                    message = err.stack;
                } else if (Level.ERROR.equals(level) && base.isInstanceOf(message, Error)) {
                    message = message.stack;
                }
                var type = level.name.toLowerCase(), appenders = this.__appenders;
                var event = {
                    level:level,
                    levelName:level.name,
                    message:message,
                    timeStamp:new Date(),
                    name:this.fullName
                };
                for (var i in appenders) {
                    appenders[i].append(event);
                }
            }
        },

        /**
         * Add an appender to this logger. If this is additive then the appender is added to all subloggers.
         * @param {comb.logging.Appender} appender the appender to add.
         */
        addAppender:function (appender) {
            if (!base.isUndefinedOrNull(appender)) {
                var name = appender.name;
                if (!(name in this.__appenders)) {
                    this.__appenders[name] = appender;
                    if (!appender.level) {
                        appender.level = this.level;
                    }
                    this._tree.addAppender(appender);
                }
            }
        },

        /**
         * Short cut to add a list of appenders to this Logger
         * @param {Array<comb.logging.Appender>} appenders
         */
        addAppenders:function (appenders) {
            appenders.forEach(base.hitch(this, "addAppender"));
        },

        /**
         * Removes and appender from this logger.
         * @param {String} name the name of the appender
         */
        removeAppender:function (name) {
            if (name in this.__appenders) {
                delete this.__appenders[name];
                this._tree.removeAppender(name);
            }
        },

        /**
         * Removes a list of appenders from this logger.
         *
         * @param {Array<String>} appenders a list of names of appenders to remove
         */
        removeAppenders:function (appenders) {
            appenders.forEach(this.removeAppender, this);
        },

        /**
         * Removes all appenders from this logger and sub loggers if this Logger is additive.
         */
        removeAllAppenders:function () {
            for (var i in this.__appenders) {
                this.removeAppender(i);
            }
        },

        /**
         * Determines if an appender is attached.
         *
         * @param {String} name the name of the appender.
         */
        isAppenderAttached:function (name) {
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
        getAppender:function (name) {
            var ret;
            if (name in this.__appenders) {
                ret = this.__appenders[name];
            }
            return ret;
        },

        /**
         * @ignore
         * */
        setters:{

            level:function (level) {
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

            additive:function (additive) {
                this.__additive = additive;
            }
        },

        /**@ignore*/
        getters:{
            /**@ignore*/

            /**@ignore*/
            subLoggers:function () {
                return this._tree.getSubLoggers();
            },

            /**@ignore*/
            level:function () {
                return this.__level;
            },

            /**@ignore*/
            additive:function () {
                return this.__additive;
            },

            isAll:function () {
                return Level.ALL.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isDebug:function () {
                return Level.DEBUG.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isTrace:function () {
                return Level.TRACE.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isInfo:function () {
                return Level.INFO.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isWarn:function () {
                return Level.WARN.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isError:function () {
                return Level.ERROR.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isFatal:function () {
                return Level.FATAL.isGreaterOrEqualToo(this.level);
            },

            /**@ignore*/
            isOff:function () {
                return Level.OFF.equals(this.level);
            },

            /**@ignore*/
            name:function () {
                return this.__name;
            },

            /**@ignore*/
            tree:function () {
                return this._tree;
            },

            /**@ignore*/
            appenders:function () {
                var ret = [];
                for (var i in this.__appenders) {
                    ret.push(this.__appenders[i]);
                }
                return ret;
            },

            categories:function () {
                return this._tree.categories;
            }
        }
    },

    static:{
        /**@lends comb.logging.Logger*/

        /**
         * Return the root of all loggers
         */
        getRootLogger:function () {
            return rootTree.getRootLogger();
        },

        /**
         * Retrieves/Creates a logger based on the name passed in
         *
         * @param {String} name the name of the logger
         */
        getLogger:function (name) {
            return rootTree.getLogger(name);
        }
    }
}));

var rootLogger = new Logger("");
rootTree = rootLogger._tree;


