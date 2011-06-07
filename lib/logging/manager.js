var define = require("../define.js").define, base = require("../base"), Level = require("./level");

var Manager = (exports = module.exports = define(null, {
			instance : {

				constructor : function() {
					this.__loggerMap = {};
				},

				addLogger : function(logger) {
					if (logger) {
						this.__loggerMap[logger.name] = logger;
					}
				},

				getLogger : function(name) {
					return this.__loggerMap[name];
				},

				shutdown : function() {
					var map = this.__loggerMap;
					for (var i in map) {
						var logger = map[i];
						if (logger) {
							logger.shutdown();
						}
					}
				},

				getters : {
					loggers : function() {
						var ret = [];
						for (var i in map) {
							var logger = map[i];
							if (logger) {
								ret.push(logger);
							}
						}
					}
				}


			}
		}));