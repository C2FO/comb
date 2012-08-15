var define = require("../../define.js").define, base = require("../../base"), string = base.string, style = string.style, format = string.format, Appender = require("./appender"), Level = require("../level");

/**
 * @class Appends messages to the console.
 *
 * @name ConsoleAppender
 * @augments comb.logging.appenders.Appender
 * @memberOf comb.logging.appenders
 */
define(Appender, {
    instance:{

        constructor:function (options) {
            options = options || {};
            !options.name && (options.name = "consoleAppender");
            this._super(arguments, [options]);
        },

        append:function (event) {
            if (this._canAppend(event)) {
                var message = format(this.__pattern, event);
                var level = event.level;
                if (Level.ERROR.equals(level) || Level.FATAL.equals(level)) {
                    console.log(style(message, "red"));
                } else if (Level.WARN.equals(level)) {
                    console.log(style(message, "yellow"));
                } else if (Level.DEBUG.equals(level)) {
                    console.log(style(message, "magenta"));
                } else if (Level.TRACE.equals(level)) {
                    console.log(style(message, "cyan"));
                } else {
                    console.log(message);
                }
            }
        }
    }
}).registerType("ConsoleAppender").as(module);