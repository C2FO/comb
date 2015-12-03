"use strict";
var define = require("../../define.js").define,
    base = require("../../base"),
    Level = require("../level");


var APPENDER_TYPES = {};

/**
 * @class Base class for all appenders
 *
 * @name Appender
 * @memberOf comb.logging.appenders
 *
 * @param {Object} [options] options to assign to this Appender
 * @param {String} [options.name="appender"] the name of this Appender. If you want two of the same type of appender
 *                                           on a logger it must have a different name.
 * @param {String} [options.pattern="[{[yyyy-MM-ddTHH:mm:ss:SSS (z)]timeStamp}] {[- 5]levelName} {[-20]name} - {message}"]
 *  <p>Available Options for formatting see {@link comb.string.format} for formatting options</p>
 *  <ul>
 *      <li>timeStamp - the timestamp of the event being logged</li>
 *      <li>level - the {@link comb.logging.Level} of the event</li>
 *      <li>levelName - the name of the level being logged</li>
 *      <li>name - the name of the logger logging the event</li>
 *      <li>message - the message being logged</li>
 * </ul>
 * @param {comb.logging.Level|String} [options.level=comb.logging.Level.INFO] the logging level of this appender
 *      <p><b>Note:</b> the level can be different from the logger in the case that you want a particular logger
 *      to only log particular event of a level. For example an appender that only logs errors. BEWARE that if the
 *      appenders level is lower than the logger is will not receive any messages.</p>
 *
 * @property {String} name the name of this Appender.
 * @property {String} pattern the pattern for this Appender.
 * @property {comb.logging.Level} level the level of this Appender.
 * @ignoreCode
 */
define(null, {
    instance:{
        /**@lends comb.logging.appenders.Appender.prototype*/

        constructor:function (options) {
            options = options || {};
            this.name = options.name || "appender";
            this.pattern = options.pattern || "[{[yyyy-MM-ddTHH:mm:ss:SSS (z)]timeStamp}] {[- 5]levelName} {[-20]name} - {message}";
            var level = options.level;
            if (options.level && (level = Level.toLevel(level))) {
                this.__level = level;
            }
        },

        /**
         * Appends a message to a log.
         * <b>This method is abstract and must be implemented in subclasses</b>
         * @param {Object} event the logging event to log.
         * @param {Date} event.timeStamp the timeStamp of the event.
         * @param {comb.logging.Level} level the level of the event.
         * @param {String} name the name of the logger the event was emitted from.
         * @param {String} message the message that is being logged.
         *
         */
        append:function (event) {
            throw new Error("abstract method");
        },

        _canAppend:function (event) {
            return !base.isUndefinedOrNull(this.__level) && event.level.isGreaterOrEqualToo(this.__level);
        },

        /**@ignore*/
        setters:{
            /**@ignore*/

            level:function (level) {
                if (level && level instanceof Level) {
                    this.__level = level;
                } else {
                    //try to get the level
                    level = Level.toLevel(level);
                    if (level) {
                        this.__level = level;
                    }
                }
            },

            pattern:function (patt) {
                if (base.isString(patt)) {
                    this.__pattern = patt;
                }
            },

            name:function (name) {
                if (base.isString(name)) {
                    this.__name = name;
                }
            }
        },

        /**@ignore*/
        getters:{
            /**@ignore*/

            level:function () {
                return this.__level;
            },

            name:function () {
                return this.__name;
            },

            pattern:function () {
                return this.__pattern;
            }
        }
    },

    "static":{
        /**@lends comb.logging.appenders.Appender*/

        /**
         * Register an appender so it can be used with {@link comb.logging.PropertyConfigurator}
         *
         * @example
         *
         * var Appender = comb.logging.appenders.Appender;
         * comb.define(Appender, {
         *      instance : {
         *          append : function(event){
         *              //log the message
         *          }
         *      }
         * }).registerType("MyAppender").as(module);
         *
         * @param {String} type the identifier for your appender type.
         * @return returns the Appender class for chaining.
         */
        registerType:function (type) {
            if (base.isString(type)) {
                APPENDER_TYPES[type.toLowerCase()] = this;
            }
            return this;
        },

        /**
         * Acts as a factory for appenders.
         *
         * @example
         *
         * var logging = comb.logging,
         *     Logger = logging.Logger,
         *     Appender = logging.appenders.Appender;
         *
         * var logger = comb.logging.Logger.getLogger("my.logger");
         * logger.addAppender(Appender.createAppender("consoleAppender"));
         *
         * @param {String} type the type of appender to create.
         * @param {Object} [options={}] additional options to pass to the appender.
         * @return {comb.logging.appenders.Appender} an appender to add to a logger.
         */
        createAppender:function (type, options) {
            var caseType = type.toLowerCase();
            if (caseType in APPENDER_TYPES) {
                return new APPENDER_TYPES[caseType](options);
            } else {
                throw new Error(type + " appender is not registered!");
            }

        }
    }

}).as(module);