var define = require("../../define.js").define,
		base = require("../../base"),
		string = base.string,
		style = string.style,
		format = string.format,
		Appender = require("./Appender"),
		Level = require("../Level"),
		fs = require("fs");

exports = module.exports = define(Appender, {
			instance : {

				constructor : function(options) {
					options = options || {};
					this.__file = options.file || "./log.log";
					this.__encoding = options.encoding || "utf8";
					this.__overwrite = options.overwrite || false;
					this.__writeStream = options.writeStream || fs.createWriteStream(this.__file, { flags: this.__overwrite ? "w" : 'a', encoding: this.__encoding});
					this.super(arguments);
					this.__pattern += "\n";
					process.addListener("exit", base.hitch(this, "__onExit"));
				},

				__onExit : function(){
					this.__writeStream.destroy();
					this.__writeStream = null;
				},

				append : function(event) {
					if (this._canAppend(event)) {
						console.log("FILE APPEND")
						var message = format(this.__pattern, event);
						var level = event.level;
						this.__writeStream.write(message);
					}
				},


				getters : {
					name : function() {
						return "fileAppender";
					}
				}
			}
		});