
var appenders = {
	Appender : require("./appender"),
	ConsoleAppender : require("./consoleAppender"),
	FileAppender : require("./fileAppender"),
	JSONAppender : require("./jsonAppender"),
	RollingFileAppender : require("./rollingFileAppender")
};

exports = appenders;