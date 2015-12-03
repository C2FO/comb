"use strict";
var define = require("../../define.js").define,
    base = require("../../base"),
    promise = require("../../promise"),
    string = base.string,
    Promise = promise.Promise,
    PromiseList = promise.PromiseList,
    style = string.style,
    format = string.format,
    Appender = require("./appender"),
    Level = require("../level"),
    fs = require("fs");


/**
 * @class Appends messages to a file.
 *
 * @example
 * var fileAppender = new comb.logging.appenders.FileAppender({
 *      file : "/var/log/myLog.log"
 * });
 *
 *
 * @name FileAppender
 * @augments comb.logging.appenders.Appender
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
 *      appenders level is lower than the logger is will not recieve any messages.</p>
 *
 * @param {String} [options.file="./log.log"] the file to log events to.
 * @param {String} [options.encoding="utf8"] the encoding of the file.
 * @param {Boolean} [options.overwrite=false] if true the log file is overwritten otherwise it is appended to.
 * @ignoreCode
 */
Appender.extend({
    instance: {

        constructor: function (options) {
            options = options || {};
            !options.name && (options.name = "fileAppender");
            this.__file = options.file || "./log.log";
            this.__encoding = options.encoding || "utf8";
            this.__overwrite = options.overwrite || false;
            this.__writeStream = options.writeStream || fs.createWriteStream(this.__file, {
                flags: this.__overwrite ? "w" : 'a',
                encoding: this.__encoding
            });
            this._super([options]);
            this.__pattern += "\n";
            base.listenForExit(base.hitch(this, "__onExit"));
        },


        __onExit: function () {
            var ret = new Promise();
            var ws = this.__writeStream;
            this.__writeStream = null;
            ws.on("close", base.hitch(ret, "callback"));
            ws.destroySoon();
            return ret.promise();
        },

        append: function (event) {
            var ws = this.__writeStream;
            if (this._canAppend(event) && ws && ws.writable) {
                var message = format(this.__pattern, event);
                var level = event.level;
                ws.write(message);
            }
        }
    }
}).registerType("FileAppender").as(module);