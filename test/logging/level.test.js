var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        Level = logging.Level;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Level");

suite.addBatch({
            "When using Level" : {
                topic : function(){
                    return Level;
                },
               "it should have an ALL level defined " : function(topic) {
                    assert.instanceOf(topic.ALL, topic);
                    assert.equal(topic.ALL.level, -100000);
                    assert.equal(topic.ALL.name, "ALL");
                },

                "it should have a DEBUG level defined " : function(topic) {
                    assert.instanceOf(topic.DEBUG, topic);
                    assert.equal(topic.DEBUG.level, 1);
                    assert.equal(topic.DEBUG.name, "DEBUG");
                },

                "it should have a TRACE level defined " : function(topic) {
                    assert.instanceOf(topic.TRACE, Level);
                    assert.equal(topic.TRACE.level, 2);
                    assert.equal(topic.TRACE.name, "TRACE");
                },

                "it should have an INFO level defined " : function(topic) {
                    assert.instanceOf(topic.INFO, Level);
                    assert.equal(topic.INFO.level, 3);
                    assert.equal(topic.INFO.name, "INFO");
                },

                "it should have a WARN level defined " : function(topic) {
                    assert.instanceOf(topic.WARN, Level);
                    assert.equal(topic.WARN.level, 4);
                    assert.equal(topic.WARN.name, "WARN");
                },

                "it should have an ERROR level defined " : function(topic) {
                    assert.instanceOf(topic.ERROR, Level);
                    assert.equal(topic.ERROR.level, 5);
                    assert.equal(topic.ERROR.name, "ERROR");
                },

                 "it should have an FATAL level defined " : function(topic) {
                    assert.instanceOf(topic.FATAL, Level);
                    assert.equal(topic.FATAL.level, 6);
                    assert.equal(topic.FATAL.name, "FATAL");
                },

                "it should have an OFF level defined " : function(topic) {
                    assert.instanceOf(topic.OFF, Level);
                    assert.equal(topic.OFF.level, 100000);
                    assert.equal(topic.OFF.name, "OFF");
                }
            },

            "when comparing levels " : {
                topic : function(){
                    return Level;
                },

                "Level.ALL should be lower than all other levels" : function(topic){
                    var level = topic.ALL;
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ALL));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.DEBUG));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.TRACE));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.INFO));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.WARN));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.ERROR));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.FATAL));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.OFF));
                },

                "Level.DEBUG should determine if it is >= than other levels" : function(topic){
                    var level = topic.DEBUG;
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ALL));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.DEBUG));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.TRACE));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.INFO));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.WARN));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.ERROR));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.FATAL));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.OFF));
                },

                "Level.TRACE should determine if it is >= than other levels" : function(topic){
                    var level = topic.TRACE;
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ALL));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.DEBUG));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.TRACE));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.INFO));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.WARN));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.ERROR));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.FATAL));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.OFF));
                },

                "Level.INFO should determine if it is >= than other levels" : function(topic){
                    var level = topic.INFO;
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ALL));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.DEBUG));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.TRACE));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.INFO));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.WARN));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.ERROR));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.FATAL));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.OFF));
                },

                "Level.WARN should determine if it is >= than other levels" : function(topic){
                    var level = topic.WARN;
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ALL));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.DEBUG));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.TRACE));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.INFO));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.WARN));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.ERROR));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.FATAL));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.OFF));
                },

                "Level.ERROR should determine if it is >= than other levels" : function(topic){
                    var level = topic.ERROR;
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ALL));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.DEBUG));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.TRACE));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.INFO));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.WARN));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ERROR));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.FATAL));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.OFF));
                },

                "Level.FATAL should determine if it is >= than other levels" : function(topic){
                    var level = topic.FATAL;
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ALL));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.DEBUG));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.TRACE));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.INFO));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.WARN));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ERROR));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.FATAL));
                    assert.isFalse(level.isGreaterOrEqualToo(topic.OFF));
                },

                "Level.OFF should be greater than all other levels" : function(topic){
                    var level = topic.OFF;
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ALL));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.DEBUG));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.TRACE));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.INFO));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.WARN));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.ERROR));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.FATAL));
                    assert.isTrue(level.isGreaterOrEqualToo(topic.OFF));
                }
            },

            "when coverting primitives to Levels " : {
                topic : function(){
                    return Level;
                },

                "'all' and -100000 should covert to Level.ALL" : function(topic){
                    assert.equal(topic.toLevel("all"), Level.ALL);
                    assert.equal(topic.toLevel("ALL"), Level.ALL);
                    assert.equal(topic.toLevel(-100000), Level.ALL);
                    assert.equal(topic.toLevel(Level.ALL), Level.ALL);
                },

                "'debug' and 1 should covert to Level.DEBUG" : function(topic){
                    assert.equal(topic.toLevel("debug"), Level.DEBUG);
                    assert.equal(topic.toLevel("DEBUG"), Level.DEBUG);
                    assert.equal(topic.toLevel(1), Level.DEBUG);
                    assert.equal(topic.toLevel(Level.DEBUG), Level.DEBUG);
                },

                "'trace' and 2 should covert to Level.TRACE" : function(topic){
                    assert.equal(topic.toLevel("trace"), Level.TRACE);
                    assert.equal(topic.toLevel("TRACE"), Level.TRACE);
                    assert.equal(topic.toLevel(2), Level.TRACE);
                    assert.equal(topic.toLevel(Level.TRACE), Level.TRACE);
                },

                "'info' and 3 should covert to Level.INFO" : function(topic){
                    assert.equal(topic.toLevel("info"), Level.INFO);
                    assert.equal(topic.toLevel("INFO"), Level.INFO);
                    assert.equal(topic.toLevel(3), Level.INFO);
                    assert.equal(topic.toLevel(Level.INFO), Level.INFO);
                },

                "'warn' and 4 should covert to Level.WARN" : function(topic){
                    assert.equal(topic.toLevel("warn"), Level.WARN);
                    assert.equal(topic.toLevel("WARN"), Level.WARN);
                    assert.equal(topic.toLevel(4), Level.WARN);
                    assert.equal(topic.toLevel(Level.WARN), Level.WARN);
                },

                 "'error' and 5 should covert to Level.ERROR" : function(topic){
                    assert.equal(topic.toLevel("error"), Level.ERROR);
                    assert.equal(topic.toLevel("ERROR"), Level.ERROR);
                    assert.equal(topic.toLevel(5), Level.ERROR);
                    assert.equal(topic.toLevel(Level.ERROR), Level.ERROR);
                },

                 "'fatal' and 6 should covert to Level.FATAL" : function(topic){
                    assert.equal(topic.toLevel("fatal"), Level.FATAL);
                    assert.equal(topic.toLevel("FATAL"), Level.FATAL);
                    assert.equal(topic.toLevel(6), Level.FATAL);
                    assert.equal(topic.toLevel(Level.FATAL), Level.FATAL);
                },

                "'off' and 100000 should covert to Level.OFF" : function(topic){
                    assert.equal(topic.toLevel("off"), Level.OFF);
                    assert.equal(topic.toLevel("OFF"), Level.OFF);
                    assert.equal(topic.toLevel(100000), Level.OFF);
                    assert.equal(topic.toLevel(Level.OFF), Level.OFF);
                },

                "if a default level is provided it should be used " : function(topic){
                    assert.equal(topic.toLevel('off', topic.INFO), topic.OFF);
                    assert.equal(topic.toLevel('offf', topic.INFO), topic.INFO);
                }

            },

            "when adding a custom level " : {
                topic : function(){
                    return Level;
                },

                "it should create a level" : function(topic){
                    var myLevel = topic.addLevel("my_level", 0);
                    assert.equal(topic.toLevel("my_level"), myLevel);
                    assert.equal(topic.toLevel("MY_LEVEL"), myLevel);
                    assert.equal(topic.toLevel(0), myLevel);
                    assert.equal(topic.toLevel(topic.MY_LEVEL), myLevel);
                }
            }
        });


suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));