"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");

it.describe("comb/base/string.js", function (it) {
//Super of other classes
    it.should("determine if something is a String", function () {
        assert.isTrue(comb.isString(""));
        assert.isTrue(comb.isString(new String("")));
        assert.isTrue(comb.isString(String(1)));
        assert.isFalse(comb.isString(1));
        assert.isFalse(comb.isString(new Date()));
        assert.isFalse(comb.isString(true));
        assert.isFalse(comb.isString(false));
        assert.isFalse(comb.isString());
        assert.isFalse(comb.isString(null));
    });

    it.describe("comb.string", function (it) {


        it.should("pad correctly", function () {
            assert.equal(comb.string.pad("STR", 5, " "), "  STR");
            assert.equal(comb.string.pad("STR", 5, " ", true), "STR  ");
            assert.equal(comb.string.pad("STR", 5, "$"), "$$STR");
            assert.equal(comb.string.pad("STR", 5, "$", true), "STR$$");
        })


        it.should("format strings properly", function () {
            assert.equal(comb.string.format("{apple}, {orange}, {notthere} and {number}", {apple:"apple", orange:"orange", number:10}), "apple, orange, {notthere} and 10");
            assert.equal(comb.string.format("{[-s10]apple}, {[%#10]orange}, {[10]banana} and {[-10]watermelons}", {apple:"apple", orange:"orange", banana:"bananas", watermelons:"watermelons"}), "applesssss, ####orange,    bananas and watermelon");
            assert.equal(comb.string.format("{[- 10]number}, {[yyyy]date}, and {[4]object}", {number:1, date:new Date(1970, 1, 1), object:{a:"b"}}), '1         , 1970, and {\n    "a": "b"\n}');
            assert.equal(comb.string.format("%s and %s", ["apple", "orange"]), "apple and orange");
            assert.equal(comb.string.format("%s and %s and %s", ["apple", "orange"]), "apple and orange and %s");
            assert.equal(comb.string.format("%s and %s", "apple", "orange"), "apple and orange");
            assert.equal(comb.string.format("%-s10s, %#10s, %10s and %-10s", "apple", "orange", "bananas", "watermelons"), "applesssss, ####orange,    bananas and watermelon");
            assert.equal(comb.string.format("%d and %d", 1, 2), "1 and 2");
            assert.throws(function () {
                comb.string.format("%-10d", "a");
            });
            assert.equal(comb.string.format("%+d, %+d, %10d, %-10d, %-+#10d, %10d", 1, -2, 1, 2, 3, 100000000000), "+1, -2, 0000000001, 2000000000, +3########, 1000000000");
            assert.equal(comb.string.format("%j", [
                {a:"b"}
            ]), '{"a":"b"}');

            var test = {};
            assert.throws(function () {
                comb.string.format("%j", [comb.merge(test, {a:test})]);
            });
            assert.throws(function () {
                comb.string.format("%4j", [comb.merge(test, {a:test})]);
            });
            assert.equal(comb.string.format("%D", [new Date(-1)]), 'Wed Dec 31 1969 17:59:59 GMT-0600 (CST)');
            var date = new Date(2006, 7, 11, 0, 55, 12, 345);
            assert.equal(comb.string.format("%[yyyy]D %[EEEE, MMMM dd, yyyy]D %[M/dd/yy]D %[H:m:s.SS]D", [date, date, date, date]), '2006 Friday, August 11, 2006 8/11/06 0:55:12.35');
            assert.equal(comb.string.format("%[yyyy]Z %[EEEE, MMMM dd, yyyy]Z %[M/dd/yy]Z %[H:m:s.SS]Z", [date, date, date, date]), '2006 Friday, August 11, 2006 8/11/06 5:55:12.35');
            assert.equal(comb.string.format("%Z", [new Date(-1)]), 'Wed, 31 Dec 1969 23:59:59 GMT');
            assert.equal(comb.string.format("%1j,\n%4j", [
                {a:"b"},
                {a:"b"}
            ]), '{\n "a": "b"\n},\n{\n    "a": "b"\n}');

        });

        it.should("convert strings to arrays", function () {
            assert.deepEqual(comb.string.toArray("a|b|c|d", "|"), ["a", "b", "c", "d"]);
            assert.deepEqual(comb.string.toArray("a", "|"), ["a"]);
            assert.deepEqual(comb.string.toArray("", "|"), []);
        });

        it.should("style strings properly", function () {
            var styles = {
                bold:1,
                bright:1,
                italic:3,
                underline:4,
                blink:5,
                inverse:7,
                crossedOut:9,

                red:31,
                green:32,
                yellow:33,
                blue:34,
                magenta:35,
                cyan:36,
                white:37,

                redBackground:41,
                greenBackground:42,
                yellowBackground:43,
                blueBackground:44,
                magentaBackground:45,
                cyanBackground:46,
                whiteBackground:47,

                encircled:52,
                overlined:53,
                grey:90,
                black:90  };
            for (var i in styles) {
                assert.equal(comb.string.style(i, i), '\x1B[' + styles[i] + 'm' + i + '\x1B[0m');
            }
            assert.equal(comb.string.style("string", ["bold", "red", "redBackground"]), '\x1B[41m\x1B[31m\x1B[1mstring\x1B[0m\x1B[0m\x1B[0m');
            assert.deepEqual(comb.string.style(["string1", "string2", "string3"], ["bold", "red", "redBackground"]),
                [
                    '\x1B[41m\x1B[31m\x1B[1mstring1\x1B[0m\x1B[0m\x1B[0m',
                    '\x1B[41m\x1B[31m\x1B[1mstring2\x1B[0m\x1B[0m\x1B[0m',
                    '\x1B[41m\x1B[31m\x1B[1mstring3\x1B[0m\x1B[0m\x1B[0m']
            );
        });

        it.should("multiply strings properly", function () {
            assert.equal(comb.string.multiply("a"), "");
            assert.equal(comb.string.multiply("a", 1), "a");
            assert.equal(comb.string.multiply("a", 2), "aa");
            assert.equal(comb.string.multiply("a", 3), "aaa");
        });

        it.should("truncate strings properly", function () {
            assert.equal(comb.string.truncate("abcdefg", 3), "abc");
            assert.equal(comb.string.truncate("abcdefg", 3, true), "efg");
            assert.equal(comb.string.truncate(new Date(1970, 1, 1), 3), "Sun");
            assert.equal(comb.string.truncate(123, 1), "1");
        });
    });


});
