"use strict";
var define = require("../../define.js").define,
    base = require("../../base"),
    string = base.string,
    style = string.style,
    format = string.format,
    Appender = require("./appender"),
    Level = require("../level");

/**
 * @class Appends messages to the console.
 *
 * @name ConsoleAppender
 * @augments comb.logging.appenders.Appender
 * @memberOf comb.logging.appenders
 */

Appender.extend({
    instance: {

        constructor: function (options) {
            options = options || {};
            !options.name && (options.name = "consoleAppender");
            this.__wrapStyle = options.wrapStyle;
            if (!("wrapStyle" in options)) {
                this.__wrapStyle = true;
            }
            this._super(arguments, [options]);
        },

        getLevelColor: function (level) {
            if (Level.ERROR.equals(level) || Level.FATAL.equals(level)) {
                return "red";
            } else if (Level.WARN.equals(level)) {
                return "yellow";
            } else if (Level.DEBUG.equals(level)) {
                return "cyan";
            } else if (Level.TRACE.equals(level)) {
                return "magenta";
            } else if (Level.INFO.equals(level)) {
                return "blue";
            }
            return null;
        },

        extraEventData: function (event) {
            var level = event.level,
                color = this.getLevelColor(level);
            return base.merge({
                levelNameColored: color ? style(level.name, color) : level,
            }, event);
        },

        append: function (event) {
            if (this._canAppend(event)) {
                var level = event.level,
                    message = format(this.__pattern, this.extraEventData(event));
                if (this.__wrapStyle) {
                    console.log(style(message, this.getLevelColor(level)));
                } else {
                    console.log(message);
                }
            }
        }
    }
}).registerType("ConsoleAppender").as(module);