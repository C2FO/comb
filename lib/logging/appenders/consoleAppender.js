var define = require("../../define.js").define, base = require("../../base"), string = base.string, style = string.style, format = string.format, Appender = require("./Appender"), Level = require("../Level");

exports = module.exports = define(Appender, {
			instance : {

				constructor : function(options){
					options = options || {};
					!options.name && (options.name = "consoleAppender");
					this.__log = options.log || console.log;
					this.super(arguments, [options]);
				},

				append : function(event) {
					if (this._canAppend(event)) {
						var message = format(this.__pattern, event);
						var level = event.level;
						if (Level.ERROR.equals(level) || Level.FATAL.equals(level)) {
							this.__log(style(message, "red"));
						} else if(Level.WARN.equals(level)){
							 this.__log(style(message, "yellow"));
						}else if (Level.DEBUG.equals(level)) {
							this.__log(style(message, "magenta"));
						} else if (Level.TRACE.equals(level)) {
							this.__log(style(message, "cyan"));
						} else {
							this.__log(message);
						}
					}
				}
			}
		});