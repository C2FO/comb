var define = require("../../define.js").define,
		promise = require("../../promise"),
		Promise = promise.Promise,
		PromiseList = promise.PromiseList,
		base = require("../../base"),
		hitch = base.hitch,
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
var DEFAULT_SIZE = 10 * conversion.MB;
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
					this.maxBackupIndex = options.maxBackupIndex || 10;
					this.__queue = [];
					this.__inRollover = false;
					this.super(arguments);
					fs.watchFile(this.__file, hitch(this, "__checkFile"));
					fs.stat(this.__file, hitch(this, function(err, stat) {
						this.__checkFile(stat);
					}));
				},

				__checkFile : function(stats) {
					if (!this.__inRollover) {
						if (stats.size >= this.maxSize) {
							if (this.maxBackupIndex > 0) {
								if (!this.__inRollover) {
									this.__inRollover = true;
									this.__onExit().chain(hitch(this, "__rollover")).then(hitch(this, function() {
										var ws = fs.createWriteStream(this.__file, { flags: "w", encoding: this.__encoding});
										ws.on("open", hitch(this, function() {
											this.__writeStream = ws;
											this.__inRollover = false;
											this.__checkQueue();
										}));
									}), function() {
										throw new Error("comb.logging.appenders.RollingFileAppender : error rolling over files");
									});
								}
							} else {
								this.__writeStream = fs.createWriteStream(this.__file, { flags: "w", encoding: this.__encoding});
							}
						}
					}
				},


				append : function(event) {
					if (this._canAppend(event)) {
						var ws = this.__writeStream;
						if (!this.__inRollover && ws && ws.writable) {
							this.super(arguments);
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
					var dir = path.dirname(file), baseName = new RegExp("(" + escape(path.basename(path.basename(file))) + ")(?:\\.(\\d*))*");
					fs.readdir(dir, hitch(this, function(err, files) {
						files = files.filter(
								function(f) {
									var match = f.match(baseName);
									if (match) {
										return true;
									} else {
										return false;
									}
								});
						files = files.sort(function(a, b) {
							var ret = 0;
							if (a > b) {
								ret = 0;
							} else if (a < b) {
								ret = 1;
							}
							return ret;
						});
						var count = files.length, i = 0;
						var checkFile = hitch(this, function() {
							if (count > 0) {
								var f = dir + "/" + files[i++];
								if (count > this.maxBackupIndex) {
									//drop the file;
									fs.unlink(f, function(err) {
										if (err) {
											ret.errback(err);
										} else {
											checkFile();
										}
									});
									count--;
								} else {
									//rename the file
									var rn = this.__file + "." + count--;
									fs.rename(f, rn, function(err) {
										if (err) {
											ret.errback(err);
										} else {
											checkFile();
										}
									});
								}
							} else {
								ret.callback();
							}
						});
						checkFile();
					}));
					return ret;
				},


				getters : {
					name : function() {
						return "rollingFileAppender";
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
