"use strict";
var it = require('it'),
        assert = require('assert'),
        comb = require("index"),
        logging = comb.logging,
        Level = logging.Level;


it.describe("comb.logging.Level", function(it){

    it.should("have an ALL level defined", function() {
        assert.instanceOf(Level.ALL, Level);
        assert.equal(Level.ALL.level, -100000);
        assert.equal(Level.ALL.name, "ALL");
    });

    it.should("have a DEBUG level defined ", function() {
        assert.instanceOf(Level.DEBUG, Level);
        assert.equal(Level.DEBUG.level, 1);
        assert.equal(Level.DEBUG.name, "DEBUG");
    });

    it.should("have a TRACE level defined ", function() {
        assert.instanceOf(Level.TRACE, Level);
        assert.equal(Level.TRACE.level, 2);
        assert.equal(Level.TRACE.name, "TRACE");
    });

    it.should("have an INFO level defined ", function() {
        assert.instanceOf(Level.INFO, Level);
        assert.equal(Level.INFO.level, 3);
        assert.equal(Level.INFO.name, "INFO");
    });

    it.should("have a WARN level defined ", function() {
        assert.instanceOf(Level.WARN, Level);
        assert.equal(Level.WARN.level, 4);
        assert.equal(Level.WARN.name, "WARN");
    });

    it.should("have an ERROR level defined ", function() {
        assert.instanceOf(Level.ERROR, Level);
        assert.equal(Level.ERROR.level, 5);
        assert.equal(Level.ERROR.name, "ERROR");
    });

    it.should("have an FATAL level defined ", function() {
        assert.instanceOf(Level.FATAL, Level);
        assert.equal(Level.FATAL.level, 6);
        assert.equal(Level.FATAL.name, "FATAL");
    });

    it.should("have an OFF level defined ", function() {
        assert.instanceOf(Level.OFF, Level);
        assert.equal(Level.OFF.level, 100000);
        assert.equal(Level.OFF.name, "OFF");
    });
    
    it.should("compare level properly", function(){
        var level = Level.ALL;
        assert.isTrue(level.isGreaterOrEqualToo(Level.ALL));
        assert.isFalse(level.isGreaterOrEqualToo(Level.DEBUG));
        assert.isFalse(level.isGreaterOrEqualToo(Level.TRACE));
        assert.isFalse(level.isGreaterOrEqualToo(Level.INFO));
        assert.isFalse(level.isGreaterOrEqualToo(Level.WARN));
        assert.isFalse(level.isGreaterOrEqualToo(Level.ERROR));
        assert.isFalse(level.isGreaterOrEqualToo(Level.FATAL));
        assert.isFalse(level.isGreaterOrEqualToo(Level.OFF));

        level = Level.DEBUG;
        assert.isTrue(level.isGreaterOrEqualToo(Level.ALL));
        assert.isTrue(level.isGreaterOrEqualToo(Level.DEBUG));
        assert.isFalse(level.isGreaterOrEqualToo(Level.TRACE));
        assert.isFalse(level.isGreaterOrEqualToo(Level.INFO));
        assert.isFalse(level.isGreaterOrEqualToo(Level.WARN));
        assert.isFalse(level.isGreaterOrEqualToo(Level.ERROR));
        assert.isFalse(level.isGreaterOrEqualToo(Level.FATAL));
        assert.isFalse(level.isGreaterOrEqualToo(Level.OFF));

        level = Level.TRACE;
        assert.isTrue(level.isGreaterOrEqualToo(Level.ALL));
        assert.isTrue(level.isGreaterOrEqualToo(Level.DEBUG));
        assert.isTrue(level.isGreaterOrEqualToo(Level.TRACE));
        assert.isFalse(level.isGreaterOrEqualToo(Level.INFO));
        assert.isFalse(level.isGreaterOrEqualToo(Level.WARN));
        assert.isFalse(level.isGreaterOrEqualToo(Level.ERROR));
        assert.isFalse(level.isGreaterOrEqualToo(Level.FATAL));
        assert.isFalse(level.isGreaterOrEqualToo(Level.OFF));

        level = Level.INFO;
        assert.isTrue(level.isGreaterOrEqualToo(Level.ALL));
        assert.isTrue(level.isGreaterOrEqualToo(Level.DEBUG));
        assert.isTrue(level.isGreaterOrEqualToo(Level.TRACE));
        assert.isTrue(level.isGreaterOrEqualToo(Level.INFO));
        assert.isFalse(level.isGreaterOrEqualToo(Level.WARN));
        assert.isFalse(level.isGreaterOrEqualToo(Level.ERROR));
        assert.isFalse(level.isGreaterOrEqualToo(Level.FATAL));
        assert.isFalse(level.isGreaterOrEqualToo(Level.OFF));

        level = Level.WARN;
        assert.isTrue(level.isGreaterOrEqualToo(Level.ALL));
        assert.isTrue(level.isGreaterOrEqualToo(Level.DEBUG));
        assert.isTrue(level.isGreaterOrEqualToo(Level.TRACE));
        assert.isTrue(level.isGreaterOrEqualToo(Level.INFO));
        assert.isTrue(level.isGreaterOrEqualToo(Level.WARN));
        assert.isFalse(level.isGreaterOrEqualToo(Level.ERROR));
        assert.isFalse(level.isGreaterOrEqualToo(Level.FATAL));
        assert.isFalse(level.isGreaterOrEqualToo(Level.OFF));

        level = Level.ERROR;
        assert.isTrue(level.isGreaterOrEqualToo(Level.ALL));
        assert.isTrue(level.isGreaterOrEqualToo(Level.DEBUG));
        assert.isTrue(level.isGreaterOrEqualToo(Level.TRACE));
        assert.isTrue(level.isGreaterOrEqualToo(Level.INFO));
        assert.isTrue(level.isGreaterOrEqualToo(Level.WARN));
        assert.isTrue(level.isGreaterOrEqualToo(Level.ERROR));
        assert.isFalse(level.isGreaterOrEqualToo(Level.FATAL));
        assert.isFalse(level.isGreaterOrEqualToo(Level.OFF));

        level = Level.FATAL;
        assert.isTrue(level.isGreaterOrEqualToo(Level.ALL));
        assert.isTrue(level.isGreaterOrEqualToo(Level.DEBUG));
        assert.isTrue(level.isGreaterOrEqualToo(Level.TRACE));
        assert.isTrue(level.isGreaterOrEqualToo(Level.INFO));
        assert.isTrue(level.isGreaterOrEqualToo(Level.WARN));
        assert.isTrue(level.isGreaterOrEqualToo(Level.ERROR));
        assert.isTrue(level.isGreaterOrEqualToo(Level.FATAL));
        assert.isFalse(level.isGreaterOrEqualToo(Level.OFF));

        level = Level.OFF;
        assert.isTrue(level.isGreaterOrEqualToo(Level.ALL));
        assert.isTrue(level.isGreaterOrEqualToo(Level.DEBUG));
        assert.isTrue(level.isGreaterOrEqualToo(Level.TRACE));
        assert.isTrue(level.isGreaterOrEqualToo(Level.INFO));
        assert.isTrue(level.isGreaterOrEqualToo(Level.WARN));
        assert.isTrue(level.isGreaterOrEqualToo(Level.ERROR));
        assert.isTrue(level.isGreaterOrEqualToo(Level.FATAL));
        assert.isTrue(level.isGreaterOrEqualToo(Level.OFF));
        
    });

    it.should("convert primatives to levels", function(){
        assert.equal(Level.toLevel("all"), Level.ALL);
        assert.equal(Level.toLevel("ALL"), Level.ALL);
        assert.equal(Level.toLevel(-100000), Level.ALL);
        assert.equal(Level.toLevel(Level.ALL), Level.ALL);

        assert.equal(Level.toLevel("debug"), Level.DEBUG);
        assert.equal(Level.toLevel("DEBUG"), Level.DEBUG);
        assert.equal(Level.toLevel(1), Level.DEBUG);
        assert.equal(Level.toLevel(Level.DEBUG), Level.DEBUG);

        assert.equal(Level.toLevel("trace"), Level.TRACE);
        assert.equal(Level.toLevel("TRACE"), Level.TRACE);
        assert.equal(Level.toLevel(2), Level.TRACE);
        assert.equal(Level.toLevel(Level.TRACE), Level.TRACE);

        assert.equal(Level.toLevel("info"), Level.INFO);
        assert.equal(Level.toLevel("INFO"), Level.INFO);
        assert.equal(Level.toLevel(3), Level.INFO);
        assert.equal(Level.toLevel(Level.INFO), Level.INFO);

        assert.equal(Level.toLevel("warn"), Level.WARN);
        assert.equal(Level.toLevel("WARN"), Level.WARN);
        assert.equal(Level.toLevel(4), Level.WARN);
        assert.equal(Level.toLevel(Level.WARN), Level.WARN);

        assert.equal(Level.toLevel("error"), Level.ERROR);
        assert.equal(Level.toLevel("ERROR"), Level.ERROR);
        assert.equal(Level.toLevel(5), Level.ERROR);
        assert.equal(Level.toLevel(Level.ERROR), Level.ERROR);

        assert.equal(Level.toLevel("fatal"), Level.FATAL);
        assert.equal(Level.toLevel("FATAL"), Level.FATAL);
        assert.equal(Level.toLevel(6), Level.FATAL);
        assert.equal(Level.toLevel(Level.FATAL), Level.FATAL);

        assert.equal(Level.toLevel("off"), Level.OFF);
        assert.equal(Level.toLevel("OFF"), Level.OFF);
        assert.equal(Level.toLevel(100000), Level.OFF);
        assert.equal(Level.toLevel(Level.OFF), Level.OFF);

        assert.equal(Level.toLevel('off', Level.INFO), Level.OFF);
        assert.equal(Level.toLevel('offf', Level.INFO), Level.INFO);
    });

    it.should("create custom levels", function(){
        var myLevel = Level.addLevel("my_level", 0);
        assert.equal(Level.toLevel("my_level"), myLevel);
        assert.equal(Level.toLevel("MY_LEVEL"), myLevel);
        assert.equal(Level.toLevel(0), myLevel);
        assert.equal(Level.toLevel(Level.MY_LEVEL), myLevel);
    });




}).as(module);