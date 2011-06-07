var define = require("../define.js").define, base = require("../base");

var LEVELS = {
	ALL : -100000,
	DEBUG : 1,
	TRACE : 2,
	INFO : 3,
	WARN :4,
	ERROR : 5,
	FATAL:6,
	OFF : 100000
};

var LEVELS_REVERSE = {
	"-100000" : "ALL",
	"1" : "DEBUG",
	"2" : "TRACE",
	"3" : "INFO",
	"4": "WARN",
	"5" : "ERROR",
	"6" : "FATAL",
	"100000" : "OFF"
}
var Level = (exports = module.exports = define(null, {
			instance : {

				constructor : function(level, name) {
					this.level = level;
					this.name = name;
				},

				isGreaterOrEqualToo : function(level) {
					var ret = false;
					if (level && level instanceof Level) {
						if (this.level >= level.level) {
							ret = true;
						}
					}
					return ret;
				},

				equals : function(level){
					return level.level == this.level;
				}
			},
			static : {

				toLevel : function(level) {
					var ret = null;
					var args = base.argsToArray(arguments);
					if (args.length === 1) {
						var level = args[0];
						if (base.isNumber(level)) {
							var strLevel = LEVELS_REVERSE[level];
						} else if (base.isString(level)) {
							strLevel = level,level = LEVELS[level];
						}
						if (strLevel && level) {
							ret = new Level(level, strLevel);
						}
					} else {
						ret = (Level.toLevel(args[0]) || args[1]);
					}
					return ret;
				}

			}
		}));

for (var i in LEVELS) {
	Level[i] = Level.toLevel(i);
}