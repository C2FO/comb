var define = require("../../define.js").define,
		base = require("../../base"),
		promise = require("../../promise"),
		string = base.string,
		Promise = promise.Promise,
		PromiseList = promise.PromiseList,
		style = string.style,
		format = string.format,
		Appender = require("./Appender"),
		Level = require("../Level"),
		fs = require("fs");

exports = module.exports = define(Appender, {
			instance : {

				constructor : function(options) {
					options = options || {};
					!options.name && (options.name = "fileAppender");
					this.__file = options.file || "./log.log";
					this.__encoding = options.encoding || "utf8";
					this.__overwrite = options.overwrite || false;
					this.__writeStream = options.writeStream || fs.createWriteStream(this.__file, { flags: this.__overwrite ? "w" : 'a', encoding: this.__encoding});
					this.super(arguments, [options]);
					this.__pattern += "\n";
					process.addListener("exit", base.hitch(this, "__onExit"));
				},

				__onExit : function() {
					var ret = new Promise();
					var ws = this.__writeStream;
					this.__writeStream = null;
					ws.on("close", base.hitch(ret, "callback"));
					ws.destroySoon();
					return ret;
				},

				append : function(event) {
					var ws = this.__writeStream;
					if (this._canAppend(event) && ws && ws.writable) {
						var message = format(this.__pattern, event);
						var level = event.level;
						ws.write(message);
					}
				}
			}
		});