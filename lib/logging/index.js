var define = require("../define.js"),
		base = require("../base"),
		Level = require("./level"),
		appenders = require("./appenders");
var rootTree;
var LoggerTree = define.define(null, {
			instance : {

				constructor : function(root) {
					this.__root = root;
					this.__name = root.name;
					this.__level = root.level;
					this.__parent = root._parent;
					this.__map = {};
				},

				exists : function(name) {
					var ret = false;
					if (name) {
						var parts = name.split(".");
						if (parts.length) {
							var category = parts.shift();
							var lNode = this.__map[category];
							if (lNode) {
								if (parts.length) {
									//keep searching
									ret = lNode.tree.exists(parts.join("."));
								} else {
									ret = true;
								}
							}
						}
					} else {
						ret = true;
					}
					return ret;
				},

				__getLoggers : function(root) {
					var map = this.__map, ret = [this.__root], n;
					for (var i in map) {
						n = map[i];
						if (n) {
							ret = ret.concat(n.subLoggers);
						}
					}
					return ret;
				},

				getCurrentLoggers : function() {
					return this.__getLoggers(this.__root);
				},

				getLogger : function(name) {
					var ret;
					if (name) {
						var parts = name.split(".");
						if (parts.length) {
							var category = parts.shift();
							var lNode = this.__map[category];
							if (!lNode) {
								lNode = this.__map[category] = new Logger(category, this);
							}
							ret = lNode;
							if (parts.length) {
								//keep searching
								name = parts.join(".");
								ret = lNode.tree.getLogger(name);
							}
						}
					} else {
						ret = this.__root;
					}
					return ret;
				},

				getRootLogger : function() {
					return this.__root;
				},

				isDisabled : function(level) {
				},

				resetConfiguration : function() {
				},

				/**
				 * level = string|Level
				 */

				addAppender : function(appender) {
					var map = this.__map;
					for (var i in map) {
						console.log(i, appender.name);
						map[i].addAppender(appender);
					}
				},

				removeAppender : function(name) {
					var map = this.__map;
					for (var i in map) {
						map[i].removeAppender(name);
					}
				},

				shutdown : function() {
					this.getCurrentLoggers().forEach(function(l) {
						return l.shutdown();
					});
				},

				setters : {
					level : function(level) {
						this.__level = level;
						if (level) {
							if (!(level instanceof Level)) {
								level = Level.toLevel(level);
							}
							var map = this.__map;
							for (var i in map) {
								map[i].level = level;
							}

						}
					},

				},

				getters : {
					categories : function() {
						return this.getCurrentLoggers().map(function(l) {
							return l.name;
						});
					},

					name : function() {
						var ret = this.__name;
						if (this.__parent) {
							var pName = this.__parent.name;
							if (pName) {
								ret = pName + "." + ret;
							}
						}
						return ret;
					},

					level : function() {
						return this.__level;
					}
				}
			}
		});


var Logger = (exports = module.export = define.define(null, {

			instance: {

				constructor : function(name, parent) {
					this.__additive = true;
					this.__name = name;
					this._parent = parent;
					this._tree = new LoggerTree(this);
					this.fullName = this._tree.name;
					if (!parent) {
						this.level = Level.ALL;
					} else {
						this.level = parent.level;
					}
					this.__appenders = {};
					this.addAppender(new appenders.ConsoleAppender());
				},

				info : function(message) {
					this.log(Level.INFO, message);
				},
				debug : function(message) {
					this.log(Level.DEBUG, message);
				},
				error : function(message) {
					this.log(Level.ERROR, message);
				},
				warn : function(message) {
					this.log(Level.WARN, message);
				},
				trace : function(message) {
					this.log(Level.TRACE, message);
				},
				fatal : function(message) {
					this.log(Level.FATAL, message);
				},

				log : function(level, message) {
					if (level.isGreaterOrEqualToo(this.level)) {
						if (Level.TRACE.equals(level)) {
							var err = new Error;
							err.name = "Trace";
							err.message = message || '';
							Error.captureStackTrace(err, arguments.callee);
							message = err.stack;
						}
						var type = level.name.toLowerCase(), appenders = this.__appenders;
						var event = {
							level : level,
							levelName : level.name,
							message : message,
							timeStamp : new Date(),
							name : this.fullName
						};
						for (var i in appenders) {
							appenders[i].append(event);
						}
					}
				},

				addAppender : function(appender) {
					if (appender) {
						var name = appender.name;
						console.log(name);
						if (!(name in this.__appenders)) {
							this.__appenders[name] = appender;
							appender.level = this.level;
							this._tree.addAppender(appender);
						}
					}
				},

				addAppenders : function(appenders) {
					appenders.forEach(this.addAppender, this);
				},

				removeAppender : function(name) {
					if (name in this.__appenders) {
						delete this.__appenders[name];
						this._tree.removeAppender(appender);
					}
				},

				removeAppenders : function(appenders) {
					appenders.forEach(this.removeAppender, this);
				},

				removeAllAppenders : function() {
					for (var i in this.__appenders) {
						this.removeAppender(i);
					}
				},

				isAppenderAttached : function(name) {
					return (name in this.__appenders);
				},

				setters : {
					level : function(level) {
						if (this.__additive) {
							this.__level = level;
							var appenders = this.__appenders;
							for (var i in appenders) {
								appenders[i].level = level;
							}
							this._tree.level = level;
						} else {
							this.__level = level;
						}
					},

					additive : function(additive) {
						this.__additive = additive;
					}
				},

				getters : {

					subLoggers : function() {
						return this._tree.getCurrentLoggers();
					},

					level : function() {
						return this.__level;
					},
					additive : function() {
						return this.__additive;
					},
					isDebug : function() {
						return Level.DEBUG.isGreaterOrEqualToo(this.level);
					},
					isTrace : function() {
						return Level.TRACE.isGreaterOrEqualToo(this.level);
					},
					isInfo : function() {
						return Level.INFO.isGreaterOrEqualToo(this.level);
					},
					isWarn : function() {
						return Level.WARN.isGreaterOrEqualToo(this.level);
					},
					isError : function() {
						return Level.ERROR.isGreaterOrEqualToo(this.level);
					},
					isFatal : function() {
						return Level.FATAL.isGreaterOrEqualToo(this.level);
					},
					isOff : function() {
						return Level.OFF.isGreaterOrEqualToo(this.level);
					},

					name : function() {
						return this.__name;
					},

					tree : function() {
						return this._tree;
					},

					appenders : function() {
						var ret = [];
						for (var i in this.__appenders) {
							ret.push(this.__appenders[i]);
						}
						return ret;
					}
				}
			},

			static : {
				// Creation & retrieval methods:
				getRootLogger : function() {
					return rootTree.getRootLogger();
				},
				getLogger : function(name) {
					return rootTree.getLogger(name);
				}
			}
		}));
rootTree = new LoggerTree(new Logger(""));


