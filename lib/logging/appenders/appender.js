var define = require("../../define.js").define, base = require("../../base"), Level = require("../level");

var Appender = (exports = module.exports = define(null, {
			instance : {
				constructor : function(options) {
					options = options || {};
					this.__pattern = options.pattern || "[{[yyyy-MM-ddTHH:mm:ss:SS (z)]timeStamp}] {[- 5]levelName} {[-20]name} - {message}";
					this.__level = options.level;
				},

				append : function(event) {
					throw new Error("abstract method");
				},

				_canAppend : function(event) {
					return event.level.isGreaterOrEqualToo(this.__level);
				},

				setters : {
					level : function(level) {
						if (level && level instanceof Level) {
							this.__level = level;
						} else {
							//try to get the level
							level = Level.toLevel(level);
							if (level) {
								this.__level = level;
							}
						}
					}
				},

				getters : {
					level : function() {
						return this.__level;
					},

					name : function() {
						return "appender";
					}
				}
			}

		}));