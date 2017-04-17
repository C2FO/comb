## Logging.

`comb`'s logging api is fairly straight forward.

### The logger

```
var logger = comb.logger("logger");
```

The `comb.logger` function simply creates a logger that can be used to log different **events**. The logging api allows one retrive the same logger anywhere in your module. For example, suppose you have the following two files.

`a.js`

```

var logger = comb.logger("logger");

```

`b.js`

```
var logger = comb.logger("logger");
```

Both of the previous loggers are one and the same.

### Logger inheritance

As with other logging APIs loggers can inherit from eachother, through a **dot** notation.

```
                         rootLogger - ""
                                 /         \
                              "my"      "myOther"
                              /               \
                        "my.logger"       "myOther.logger"
                           /                     \
                      "my.logger.Log"        "myOther.logger.Log"

```

The above configuration shows six loggers the **rootLogger**, two children `my` and `myOther`, and sub loggers.

So what does this inheritance mean?

Well it has to do with logging `levels` and `appenders`.

#### Levels
In the above examples we could define a level of `INFO` to the logger `my` and a level of `ERROR` to `myOther` and all sub loggers would inherit the respective `level`. The same applies for `appender`s  any appenders added to a logger will be propogated down. So lets look at an example.

```
//lets grab two loggers
var logger = comb.logger("my"),
    logger2 = comb.logger("myOther"),
    logger3 = comb.logger("my.logger"),
    logger4 = comb.logger("myOther.logger");

//set the log level on my
logger.level = 'DEBUG';

console.log(logger.level.name); //'DEBUG'
console.log(logger2.level.name); //'ALL'
console.log(logger3.level.name); //'DEBUG'
console.log(logger4.level.name); //'ALL'

logger2.level = 'INFO';

console.log(logger.level.name); //'DEBUG'
console.log(logger2.level.name); //'INFO'
console.log(logger3.level.name); //'DEBUG'
console.log(logger4.level.name); //'INFO'

logger3.level = 'WARN';
console.log(logger.level.name); //'DEBUG'
console.log(logger2.level.name); //'INFO'
console.log(logger3.level.name); //'WARN'
console.log(logger4.level.name); //'INFO'
console.log(comb.logger('my.logger.log').level.name); //'WARN'

```

Above you can see that as we change levels the loggers that inherit from the parents levels change also. This is a powerful concept especially when handling loggers accross a large application and you do not want to configure every logger but have enough control to log only the information you need at the time.

#### `.timer()`

The comb logger also has a `timer()` method that will append a duration to the end of your log message

```
var timer = LOGGER.timer();
setTimeout(function(){
    timer.info("HELLO TIMERS!!!"); //HELLO TIMERS!!! [Duration: 5000ms]
}, 5000);
```

#### Appenders

Appenders are the objects that handle events and deliver them to where they need to go. `comb` supports a few types of appenders out of the box.

* `ConsoleAppender` : Logs **events** to the console the.
* `FileAppender` : Logs **events** to a specified file.
* `RollingFileAppender` : Logs **events** to a specified file up to a certain size. Once the max size has been reached it is renamed and a new log file is created.
* `JSONAppender` : Similar to the FileAppenders but logs json rather than formatted log messages.


```
var myLogger = comb.logger("my.logger")
    .addAppender("ConsoleAppender")
    .addAppender("FileAppender", {file:'/var/log/my.log'})
    .addAppender("RollingFileAppender", {file:'/var/log/myRolling.log'})
    .addAppender("JSONAppender", {file:'/var/log/myJson.log'});        
```

## Configuring your loggers

Ok so now that we have an idea of the different aspects of a logger, lets look at configuring your loggers.

To configure your loggers just call `comb.logger.configure`

### Default configuration

If you call `comb.logger.configure` without any arguments then a [ConsoleAppender](./comb_logging_appenders_ConsoleAppender.html) will be added to all loggers.

```
comb.logger.configure();

//myLogger will have a ConsoleAppender
var myLogger = comb.logger("my.logger");
```

If you pass in an [Appender](./comb_logging_appenders_Appender.html) then that appender will be added to all loggers.

```
comb.logger.configure(comb.logger.appender("FileAppender", {file : '/var/log/my.log'}));

//myLogger will have the FileAppender
var myLogger = comb.logger("my.logger");

```

### Configuring with JSON or a File

You can also pass in either the location of a log configuration or an object with your configuration.

A sample configuration can look like the following


```
comb.logger.configure({
    "my.logger":{
        level:"INFO",
        appenders:[
            {
                //default file appender
                type:"FileAppender",
                file:"/var/log/myApp.log",
            },
            {
                //default JSON appender
                type:"JSONAppender",
                file:"/var/log/myApp.json",
            },
            {
                type:"FileAppender",
                //override default patter
                pattern:"{[EEEE, MMMM dd, yyyy h:m a]timeStamp} {[5]level} {[- 5]levelName} {[-20]name} : {message}",
                //location of my log file
                file:"/var/log/myApp-errors.log",
                //override name so it will get added to the log
                name:"errorFileAppender",
                //overwrite each time
                overwrite:true,
                //explicity set the appender to only accept errors
                level:"ERROR"
            },
            {
                type:"JSONAppender",
                file:"/var/log/myApp-error.json",
                //explicity set the appender to only accept errors
                level:"ERROR"
            }
        ]
    }
})                                                                                               
```

## Log Line Format

[ConsoleAppender](./comb_logging_appenders_ConsoleAppender.html), [FileAppender](./comb_logging_appenders_FileAppender.html), and [RollingFileAppender](./comb_logging_appenders_RollingFileAppender.html) all support custom formatting for writing out log lines. 

By default they all use the following format.

```
[{[yyyy-MM-ddTHH:mm:ss:SSS (z)]timeStamp}] {[- 5]levelName} {[-20]name} - {message}
```

However you can override the format of the message by providing your own. The fields avaiable to use are:

* `level` : the level object 
* `levelName` : the name of the level
* `message` : the message being logged.
* `timeStamp`: the timestamp of the log event
* `name` : the name of the logger logging the event.
* `pid` : the process pid.
* `gid` : the group id of the process.
* `hostname` : the hostname.
* `processTitle` : the title of the process

To override the default pattern just provide it in the options. 

```
var myLogger = comb.logger("my.logger")
	.addAppender("ConsoleAppender", {pattern : "{[- 5]levelName} {[-20]name} - {message}"});	
```

For more information on formatting syntax see [comb.string.format](./comb_string.html#.format).

## Logging Messages

To log messages you can use [log](./comb_logging_Logger.html#log).

```
var logger = comb.logger("logger");

logger.log("info", "my message");

```

Or you can use [debug](./comb_logging_Logger.html#debug),[trace](./comb_logging_Logger.html#trace),[info](./comb_logging_Logger.html#info),[warn](./comb_logging_Logger.html#warn),[error](./comb_logging_Logger.html#error), or [fatal](./comb_logging_Logger.html#fatal) functions.

```
var logger = comb.logger("logger");

logger.debug("debug message");
logger.trace("trace message");
logger.info("info message");
logger.warn("warn message");
logger.error("error message");
logger.fatal("fatal message");

```

When logging messages you may also provided a format string with extra arguments.

```
var logger = comb.logger("logger");

logger.debug("%s message", "debug");
logger.trace("trace message %d", 1);
logger.info("info message %D", new Date());
logger.warn("%[ 10]s message", warn);
logger.error("%+d, %+d, %10d, %-10d, %-+#10d, %10d", 1,-2, 1, 2, 3, 100000000000);
logger.info("{name} DIED!", {name : "FRED"});

```




