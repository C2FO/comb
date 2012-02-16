"use strict";
var vows = require('vows'),
    assert = require('assert'),
    comb = require("index");

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("String utilities");
//Super of other classes
suite.addBatch({
    "when determing if something is a string" : {
        topic : comb,

        "it should determine correctly" : function(topic) {
            assert.isTrue(topic.isString(""));
            assert.isTrue(topic.isString(new String("")));
            assert.isTrue(topic.isString(String(1)));
            assert.isFalse(topic.isString(1));
            assert.isFalse(topic.isString(new Date()));
            assert.isFalse(topic.isString(true));
            assert.isFalse(topic.isString(false));
            assert.isFalse(topic.isString());
            assert.isFalse(topic.isString(null));
        }
    },

    "when padding a string of 3 chars with 2 spaces " :{
        topic : function() {
            return comb.string.pad("STR", 5, " ");
        },

        "it should have 2 spaces on the front" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "  STR");
        }
    },

    "when padding a string of 3 chars with 2 spaces at the end " :{
        topic : function() {
            return comb.string.pad("STR", 5, " ", true);
        },

        "it should have 2 ' '  at the end" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "STR  ");
        }
    },

    "when padding a string of 3 chars with 2 '$' " :{
        topic : function() {
            return comb.string.pad("STR", 5, "$");
        },

        "it should have two '$' on the front " : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "$$STR");
        }
    },

    "when padding a string of 3 chars with 2 '$' at the end " :{
        topic : function() {
            return comb.string.pad("STR", 5, "$", true);
        },

        "it should have 2 '$' at the end" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "STR$$");
        }
    },

    "when replacing a string with an object " : {
        topic : comb.string.format("{apple}, {orange}, {notthere} and {number}", {apple : "apple", orange : "orange", number : 10}),

        "it should equal 'apple and orange'" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "apple, orange, {notthere} and 10");
        }
    },

    "when replacing a string with an object and flags " : {
        topic : comb.string.format("{[-s10]apple}, {[%#10]orange}, {[10]banana} and {[-10]watermelons}", {apple : "apple", orange : "orange", banana : "bananas", watermelons : "watermelons"}),

        "it should equal 'apple and orange'" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "applesssss, ####orange,    bananas and watermelon");
        }
    },

    "when replacing a string with an object and flags and types other than string" : {
        topic : comb.string.format("{[- 10]number}, {[yyyy]date}, and {[4]object}", {number : 1, date : new Date(1970, 1, 1), object : {a : "b"}}),

        "it should equal '1         , 1970, and {\n    \"a\": \"b\"\n}'" : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, '1         , 1970, and {\n    "a": "b"\n}');
        }
    },


    "when replacing a string with an array " : {
        topic : comb.string.format("%s and %s", ["apple", "orange"]),

        "it should equal 'apple and orange'"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "apple and orange");
        }

    },

    "when replacing a string with an array and an extra %s" : {
        topic : comb.string.format("%s and %s and %s", ["apple", "orange"]),

        "it should equal 'apple and orange and %s'"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "apple and orange and %s");
        }

    },

    "when replacing a string with arguments " : {
        topic : comb.string.format("%s and %s", "apple", "orange"),

        "it should equal 'apple and orange'"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "apple and orange");
        }

    },

    "when formatting a string with flags " : {
        topic : comb.string.format("%-s10s, %#10s, %10s and %-10s", "apple", "orange", "bananas", "watermelons"),

        "it should equal 'apple!!!!!, ####orange,    bananas and watermelon'"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "applesssss, ####orange,    bananas and watermelon");
        }

    },

    "when formatting a string with numbers" : {
        topic : comb.string.format("%d and %d", 1, 2),

        "it should equal '1 and 2'"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, "1 and 2");
        }

    },

    "when formatting a string with invalid numbers" : {
        topic : comb.string,

        "it should throw an error"  : function(topic) {
            //This is true because they inherit from eachother!
            assert.throws(function() {
                topic.format("%-10d", "a");
            });
        }

    },

    "when formatting a string with numbers and flags" : {
        topic : comb.string.format("%+d, %+d, %10d, %-10d, %-+#10d, %10d", 1, -2, 1, 2, 3, 100000000000),

        "it should equal '+1, -2, 0000000001, 2000000000, +3########, 1000000000'"  : function(topic) {
            assert.equal(topic, "+1, -2, 0000000001, 2000000000, +3########, 1000000000");
        }

    },

    "when formatting a string with objects" : {
        topic : comb.string.format("%j", [
            {a : "b"}
        ]),

        'it should equal \'{"a":"b"}\''  : function(topic) {
            //This is true because they inherit from eachother!
            assert.equal(topic, '{"a":"b"}');
        }

    },

    "when formatting a string with invalid objects" : {
        topic : comb.string,

        'it should throw an error'  : function(topic) {
            //This is true because they inherit from eachother!
            var test = {};
            assert.throws(function() {
                topic.format("%j", [comb.merge(test, {a : test})]);
            });
            assert.throws(function() {
                topic.format("%4j", [comb.merge(test, {a : test})]);
            })
        }

    },

    "when formatting a string with dates" : {
        topic : comb.string.format("%D", [new Date(-1)]),

        'it should equal \'Wed Dec 31 1969 17:59:59 GMT-0600 (CST)\''  : function(topic) {
            assert.equal(topic, 'Wed Dec 31 1969 17:59:59 GMT-0600 (CST)');
        }

    },

    "when formatting a string with dates and flags" : {
        topic : function() {
            var date = new Date(2006, 7, 11, 0, 55, 12, 345);
            return comb.string.format("%[yyyy]D %[EEEE, MMMM dd, yyyy]D %[M/dd/yy]D %[H:m:s.SS]D", [date, date, date, date])
        },

        'it should equal "2006 Friday, August 11, 2006 8/11/06 0:55:12.35"'  : function(topic) {
            assert.equal(topic, '2006 Friday, August 11, 2006 8/11/06 0:55:12.35');
        }

    },

    "when formatting a string with UTC dates" : {
        topic : comb.string.format("%Z", [new Date(-1)]),

        'it should equal \'Wed Dec 31 1969 23:59:59 GMT\''  : function(topic) {
            assert.equal(topic, 'Wed, 31 Dec 1969 23:59:59 GMT');
        }

    },

    "when formatting a string with UTC dates and flags" : {
        topic : function() {
            var date = new Date(2006, 7, 11, 0, 55, 12, 345);
            return comb.string.format("%[yyyy]Z %[EEEE, MMMM dd, yyyy]Z %[M/dd/yy]Z %[H:m:s.SS]Z", [date, date, date, date])
        },

        'it should equal "2006 Friday, August 11, 2006 8/11/06 5:55:12.35"'  : function(topic) {
            assert.equal(topic, '2006 Friday, August 11, 2006 8/11/06 5:55:12.35');
        }

    },

    "when formatting a string with objects and flags" : {
        topic : comb.string.format("%1j,\n%4j", [
            {a : "b"},
            {a : "b"}
        ]),

        'it should equal \'{\n "a": "b"\n},\n{\n    "a": "b"\n}\''  : function(topic) {
            assert.equal(topic, '{\n "a": "b"\n},\n{\n    "a": "b"\n}');
        }

    },

    "when parsing a string to an array" : {
        topic : comb.string,

        "it should split the string " : function(topic) {
            assert.deepEqual(topic.toArray("a|b|c|d", "|"), ["a","b","c","d"]);
            assert.deepEqual(topic.toArray("a", "|"), ["a"]);
            assert.deepEqual(topic.toArray("", "|"), []);
        }
    },

    "when styling a string" : {
        topic : comb.string,

        "it style properly" : function(topic) {
            var styles = {
                bold      : 1,
                bright    : 1,
                italic    : 3,
                underline : 4,
                blink     : 5,
                inverse   : 7,
                crossedOut : 9,

                red       : 31,
                green     : 32,
                yellow    : 33,
                blue      : 34,
                magenta   : 35,
                cyan      : 36,
                white     : 37,

                redBackground       : 41,
                greenBackground     : 42,
                yellowBackground    : 43,
                blueBackground      : 44,
                magentaBackground   : 45,
                cyanBackground      : 46,
                whiteBackground     : 47,

                encircled : 52,
                overlined : 53,
                grey      : 90,
                black     : 90  };
            for (var i in styles) {
                assert.equal(topic.style(i, i), '\x1B[' + styles[i] + 'm' + i + '\x1B[0m');
            }
        },

        "it style multiple props properly" : function(topic) {
            assert.equal(topic.style("string", ["bold", "red", "redBackground"]), '\x1B[41m\x1B[31m\x1B[1mstring\x1B[0m\x1B[0m\x1B[0m');
        },

        "it style multiple strings properly" : function(topic) {
            assert.deepEqual(topic.style(["string1", "string2", "string3"], ["bold", "red", "redBackground"]),
                [
                    '\x1B[41m\x1B[31m\x1B[1mstring1\x1B[0m\x1B[0m\x1B[0m',
                    '\x1B[41m\x1B[31m\x1B[1mstring2\x1B[0m\x1B[0m\x1B[0m',
                    '\x1B[41m\x1B[31m\x1B[1mstring3\x1B[0m\x1B[0m\x1B[0m']
            );
        }
    },

    "when multiplying a string " : {
        topic : comb.string,

        "it should multiple the string properly" : function(topic) {
            assert.equal(topic.multiply("a"), "");
            assert.equal(topic.multiply("a", 1), "a");
            assert.equal(topic.multiply("a", 2), "aa");
            assert.equal(topic.multiply("a", 3), "aaa");
        }
    },

    "when trucating a string " : {
        topic : comb.string,

        "it should trucate properly" : function(topic) {
            assert.equal(topic.truncate("abcdefg", 3), "abc");
            assert.equal(topic.truncate("abcdefg", 3, true), "efg");
            assert.equal(topic.truncate(new Date(1970, 1, 1), 3), "Sun");
            assert.equal(topic.truncate(123, 1), "1");
        }
    }
});


suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));
