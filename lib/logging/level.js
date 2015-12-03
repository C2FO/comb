"use strict";
var define = require("../define.js").define, base = require("../base");

var LEVELS = {
    ALL: -100000,
    DEBUG: 1,
    TRACE: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
    FATAL: 6,
    OFF: 100000
};

var LEVELS_REVERSE = {
    "-100000": "ALL",
    "1": "DEBUG",
    "2": "TRACE",
    "3": "INFO",
    "4": "WARN",
    "5": "ERROR",
    "6": "FATAL",
    "100000": "OFF"
};

/**
 * @class Level class used to describe logging levels. The levels determine what types of events are logged to the appenders
 *  for example the if Level.ALL is used then all event will be logged, however if Level.INFO was used then <b>ONLY</b>
 *  INFO, WARN, ERROR, and FATAL events will be logged. To turn off logging for a logger use Level.OFF.
 *
 * <p><b>Not typically instantiated directly, but through staticly defined levels</b></p>
 * @example
 * //Levels in ascending order
 * comb.logging.Level.ALL
 * comb.logging.Level.DEBUG
 * comb.logging.Level.TRACE
 * comb.logging.Level.INFO
 * comb.logging.Level.WARN
 * comb.logging.Level.ERROR
 * comb.logging.Level.FATAL
 * comb.logging.Level.OFF
 *
 * //or
 * Level.getLevel("INFO");
 *
 * @name Level
 * @memberOf comb.logging
 *
 * @property {Number} level the numerical representation of this level.
 * @property {String} name the name of level.
 * @ignoreCode
 */
var Level = (exports = module.exports = define(null, {
    instance: {
        /**@lends comb.logging.Level.prototype*/

        constructor: function (level, name) {
            this.level = level;
            this.name = name;
        },

        /**
         * Determing if this level is >= another level
         * @param {comb.logging.Level} level the level to test against
         *
         * @returns {Boolean} true if this is >= false otherwise.
         */
        isGreaterOrEqualToo: function (level) {
            var ret = false;
            if (level && base.isNumber(level.level)) {
                if (this.level >= level.level) {
                    ret = true;
                }
            }
            return ret;
        },

        /**
         * Determing if this level is equal to another level based off of the numerical rank.
         *
         * @param {comb.logging.Level} level the level to compare
         *
         * @returns {Boolean} true if this is equal to that false otherwise.
         */
        equals: function (level) {
            return level.level === this.level;
        }
    },
    static: {
        /**@lends comb.logging.Level*/

        /**
         * Converts a numerical or string representation of a level, if a default level is provided,
         * then if a level cannot be determined then the default level is used.
         *
         * @param {Number|String|comb.logging.Level} level the level to try to convert
         * @param {comb.logging.Level} [defaultLevel] default level to use if one cannot be determined,
         *
         * @returns {comb.logging.Level|null} returns a level if one can be determined null otherwise.
         */
        toLevel: function (level, defaultLevel) {
            var ret = null;
            var args = base.argsToArray(arguments);
            if (args.length === 1) {
                level = args[0];
                if (base.isNumber(level)) {
                    var strLevel = LEVELS_REVERSE[level];
                    ret = Level[strLevel];
                } else if (base.isString(level)) {
                    ret = Level[level.toUpperCase()];
                } else {
                    ret = level;
                }
            } else {
                ret = (Level.toLevel(args[0]) || args[1]);
            }
            return ret;
        },

        /**
         * Adds a new level to the Level object.
         *
         * @example
         *
         * logger = Logger.getLogger("my.logger");
         *
         * //create the custom level
         * Level.addLevel("custom_Level", 20);
         *
         * //now set the level on a logger
         * logger.level = Level.CUSTOM_LEVEL;
         *
         * @param {string} label the label of the level, <b>Note:</b> the label will be coverted to uppercase.
         * @param {number} level the level of the level
         *
         * @return {undefined|comb.logging.Level} the level that was created.
         *
         */
        addLevel: function (label, level) {
            var ret;
            if (base.isString(label) && base.isNumber(level)) {
                label = label.toUpperCase();
                LEVELS_REVERSE[level] = label;
                LEVELS[label] = level;
                ret = (this[label] = new Level(level, label));
            }
            return ret;
        },

        /**
         * Level to allow logging of all events.
         */
        ALL: null,
        /**
         * Logs only events debug or greater.
         */
        DEBUG: null,
        /**
         * Like debug but provides a finer level of detail
         */
        TRACE: null,
        /**
         * Only info, or error related events
         */
        INFO: null,
        /**
         * Only warn or error related events
         */
        WARN: null,
        /**
         * Error or fatal events
         */
        ERROR: null,
        /**
         * Only fatal events
         */
        FATAL: null,
        /**
         * No events will be logged.
         */
        OFF: null

    }
}));

for (var i in LEVELS_REVERSE) {
    Level[LEVELS_REVERSE[i]] = new Level(parseInt(i, 10), LEVELS_REVERSE[i]);
}