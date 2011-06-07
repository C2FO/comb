var vows = require('vows'),
		assert = require('assert'),
		comb = require("../../lib"),
		define = comb.define,
		hitch = comb.hitch,
		Broadcaster = comb;

var suite = vows.describe("Object utilities");
//Super of other classes
suite.addBatch({
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
				topic : comb.string.format("{apple} and {orange}", {apple : "apple", orange : "orange"}),

				"it should equal 'apple and orange'" : function(topic) {
					//This is true because they inherit from eachother!
					assert.equal(topic, "apple and orange");
				}
			},

			"when replacing a string with an object and flags " : {
				topic : comb.string.format("{[-s10]apple}, {[%#10]orange}, {[10]banana} and {[-10]watermelons}", {apple : "apple", orange : "orange", banana : "bananas", watermelons : "watermelons"}),

				"it should equal 'apple and orange'" : function(topic) {
					//This is true because they inherit from eachother!
					assert.equal(topic, "applesssss, ####orange,    bananas and watermelon");
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
			}
		});


suite.run({reporter : require("vows/reporters/spec")});
