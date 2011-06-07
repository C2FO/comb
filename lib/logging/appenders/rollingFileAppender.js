var define = require("../../define.js").define,
		promise = require("../../promise"),
		Promise = promise.Promise,
		PromiseList = promise.PromiseList,
		base = require("../../base"),
		string = base.string,
		escape = base.regexp.escapeString,
		style = string.style,
		format = string.format,
		FileAppender = require("./fileAppender"),
		Level = require("../Level"),
		fs = require("fs"),
		path = require("path");

var conversion = {
	MB : 1048576,
	KB : 1024,
	GB : 1073741824
};
var DEFAULT_SIZE = 10 * conversion.KB;
var convertToBytes = function(str) {
	var ret = DEFAULT_SIZE;
	var match = str.match(/(\d+)(MB|KB|GB)$/);
	if (match && match.length == 3) {
		var size = parseInt(match[1], 10);
		ret = size * conversion[match[2]];
	}
	return ret;
}
exports = module.exports = define(FileAppender, {
			instance : {

				constructor : function(options) {
					this.maxSize = options.maxSize;
					this.maxBackupIndex = options.maxBackupIndex || 100;
					this.__queue = [];
					this.__inRollover = false;
					this.super(arguments);
				},


				append : function(event) {
					var args = arguments;
					if (this._canAppend(event)) {
						if (!this.__inRollover) {
							console.log("ROLL APPEND");
							fs.stat(this.__file, base.hitch(this, function(err, stats) {
								console.log(stats.size, this.maxSize);
								if (err) {
									throw new Error("comb.logging.appenders.RollingFileAppender : Error reading file size " + this.__file);
								} else if (stats.size >= this.maxSize) {
									if (this.maxBackupIndex > 0) {
										if (!this.__inRollover) {
											this.__rollover().then(base.hitch(this, function() {
												this.super(args);
												this.__checkQueue();
											}), function() {
												throw new Error("comb.logging.appenders.RollingFileAppender : error rolling over files");
											});
										}else{
											this.__queue.push(event);
										}
									} else {
										this.__writeStream = fs.createWriteStream(this.__file, { flags: "w", encoding: this.__encoding});
										this.super(args);
									}
								} else {
									this.super(args);
								}
							}));
						} else {
							this.__queue.push(event);
						}
					}
				},

				__checkQueue : function() {
					this.__queue.forEach(this.append, this);
					this.__queue.length = 0;
				},

				__rollover : function() {
					var ret = new Promise(), file = this.__file;
					if (!this.__inRollover) {
						this.__inRollover = true;
						console.log("+++++++++++++++++ROLLOVER+++++++++++++++");
						this.__onExit();
						var dir = path.dirname(file), baseName = new RegExp("(" + escape(path.basename(path.basename(file))) + ")(?:\\.(\\d*))*");
						fs.readdir(dir, base.hitch(this, function(err, files) {
							var ps = files.map(function(f) {
								var p = new Promise();
								var match = f.match(baseName);
								console.log(baseName);
								console.log(f);
								if (match) {
									var file = match[1], ext = match[2] || "0";
									ext = parseInt(ext, 10);
									if (++ext > this.maxBackupIndex) {
										fs.unlink(f, function(err) {
											if (err) {
												p.errback(err);
											}
										})
									} else {
										fs.rename(dir + "/" + f, dir + "/" + file + "." + ext, function(err) {
											if (err) {
												console.log(err);
												p.errback(err);
											} else {
												p.callback();
											}
										});
									}
								} else {
									p.callback();
								}
								return p;
							});
							var pl = new PromiseList(ps);
							pl.then(base.hitch(this, function() {
								this.__writeStream = fs.createWriteStream(this.__file, { flags: this.__overwrite ? "w" : 'a', encoding: this.__encoding});
								this.__inRollover = false;
								ret.callback();
							}), base.hitch(ret, "errback"));
						}));
					} else {
						ret.callback();
					}

					return ret;
				},


				getters : {
					name : function() {
						return "fileAppender";
					},

					maxSize : function() {
						return this.__maxSize;
					}
				},

				setters : {
					maxSize : function(size) {
						this.__maxSize = size ? convertToBytes(size) : DEFAULT_SIZE;
					}
				}
			}
		});
