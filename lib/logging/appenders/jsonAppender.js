"use strict";
var define = require("../../define.js").define,
    base = require("../../base"),
    string = base.string,
    escape = base.regexp.escapeString,
    FileAppender = require("./fileAppender"),
    format = string.format,
    Level = require("../level"),
    fs = require("fs");


/**
 * @class Appends messages to a file in JSON format. The messages are logged to an array in a JSON file
 * <b>The file is always overwritten</b>
 *
 * @example
 * //example log.json
 * [
 *    {
 *      "timestamp" : "Wed Jun 08 2011 11:16:20 GMT-0500 (CDT)",
 *      "level" : "INFO",
 *      "name" : "comb",
 *      "message" :  "INFO MESSAGE!!!!"
 *    }
 *  ]
 *
 *
 * @name JSONAppender
 * @augments comb.logging.appenders.FileAppender
 * @memberOf comb.logging.appenders
 *
 * @param {Object} [options] options to assign to this Appender
 * @param {String} [options.name="appender"] the name of this Appender. If you want two of the same type of appender
 *                                           on a logger it must have a different name.
 * @param {String} [options.pattern="{"timestamp" : "{timeStamp}", "level" : "{levelName}", "name" : "{name}", "message" :  "{message}"}"]
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
 *      appenders level is lower than the logger is will not recieve any messages.</p>
 *
 * @param {String} [options.file="./log.json"] the file to log events to.
 * @param {String} [options.encoding="utf8"] the encoding of the file.
 *
 * @ignoreCode
 */
FileAppender.extend({
    instance:{

        constructor:function (options) {
            options = options || {};
            this.name = options.name || "JSONAppender";
            this.__count = 0;
            this.__file = options.file || "./log.json";
            this.__encoding = options.encoding || "utf8";
            this.__writeStream = options.writeStream || fs.createWriteStream(this.__file, { flags:"w", encoding:this.__encoding});
            this.__writeStream.write("[\n");
            this.level = options.level;
            //explicit overwrite of patter
            this.__pattern = '{"timestamp" : "{timeStamp}", "level" : "{levelName}", "name" : "{name}", "message" :  "{message}"}';
            base.listenForExit(base.hitch(this, "__onExit"));
        },

        append:function (event) {
            if (this._canAppend(event)) {
                event.message = event.message.replace(/\n+/g, "\\n");
                var message = (this.__count ? ",\n" : "\n") + format(this.__pattern, event);
                this.__writeStream.write(message);
                this.__count++;
            }
        },


        __onExit:function () {
            this.__writeStream.write("]");
            this._super(arguments);
        }
    }
}).registerType("JSONAppender").as(module);