var define = require("../../define.js").define,
		base = require("../../base"),
		string = base.string,
		escape = base.regexp.escapeString,
		FileAppender = require("./FileAppender"),
		format = string.format,
		Level = require("../level"),
		fs = require("fs");



exports = module.exports = define(FileAppender, {
			instance : {

				constructor : function(options) {
					options = options || {};
					this.__count = 0;
					this.__file = options.file || "./log.json";
					this.__encoding = options.encoding || "utf8";
					this.__writeStream = options.writeStream || fs.createWriteStream(this.__file, { flags: "w", encoding: this.__encoding});
					this.__writeStream.write("[\n");
					this.__level = options.level;
					//explicit overwrite of patter
					this.__pattern = '{"timestamp" : "{timeStamp}", "level" : "{levelName}", "name" : "{name}", "message" :  "{message}"}';
					process.addListener("exit", base.hitch(this, "__onExit"));
				},

				append : function(event) {
					if (this._canAppend(event)) {
						event.message = event.message.replace(/\n+/g, "\\n");
						var message = (this.__count ? ",\n" : "\n") + format(this.__pattern, event);
						var level = event.level;
						if (Level.ERROR.equals(level) || Level.FATAL.equals(level)) {
							this.__writeStream.write(message);
						} else if (Level.WARN.equals(level)) {
							this.__writeStream.write(message);
						} else if (Level.DEBUG.equals(level)) {
							this.__writeStream.write(message);
						} else if (Level.TRACE.equals(level)) {
							this.__writeStream.write(message);
						} else {
							this.__writeStream.write(message);
						}
						this.__count++;
					}
				},


				__onExit : function() {
					this.__writeStream.write("]");
					this.super(arguments);
				},

				getters : {
					name : function() {
						return "JSONAppender";
					}
				}
			}
		});