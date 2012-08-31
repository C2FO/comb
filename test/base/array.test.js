"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");

it.describe("array",function (it) {

    var array = comb.array;

    it.should("convert values to arrays", function () {
        assert.deepEqual(array.toArray(), []);
        assert.deepEqual(array.toArray(1), [1]);
        assert.deepEqual(array.toArray([1]), [1]);
        assert.deepEqual(array.toArray({a:"b", c:"c"}), [
            ["a", "b"],
            ["c", "c"]
        ]);
        assert.deepEqual(array.toArray("a", {a:"b"}), ["a", ["a", "b"]]);
        var date = new Date();
        assert.deepEqual(array.toArray(date), [date]);
        assert.deepEqual(array.toArray(true), [true]);
        assert.deepEqual(array.toArray(false), [false]);
    });


    it.should("should sum values of an array", function () {
        assert.equal(array().sum(), 0);
        assert.equal(array([]).sum([]), 0);
        assert.equal(array([1, 2, 3]).sum(), 6);
        assert.equal(array(["A", "B", "C"]).sum(), "ABC");
        var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
        assert.equal(array([d1, d2, d3]).sum(), d1.toString() + d2.toString() + d3.toString());
        assert.equal(array([
            {},
            {},
            {}
        ]).sum(), "[object Object][object Object][object Object]");
    });

    it.should("flatten properly", function () {
        assert.deepEqual(array([1, 2, 3]).flatten(), [1, 2, 3]);
        assert.deepEqual(array([1, 2]).flatten([2, 3], [3, 4]), [1, 2, 2, 3, 3, 4]);
        assert.deepEqual(array([
            [1, 2],
            2
        ]).flatten([2, 3], [3, 4]), [
            [1, 2],
            2,
            2,
            3,
            3,
            4
        ]);
        assert.deepEqual(array([1, "A"]).flatten([2, "B"], [3, "C"]), [1, "A", 2, "B", 3, "C"]);
    });

    it.should("intersect properly", function () {
        assert.deepEqual(array([1, 2]).intersect([2, 3], [2, 3, 5]), [2]);
        assert.deepEqual(array([1, 2, 3]).intersect([2, 3, 4, 5], [2, 3, 5]), [2, 3]);
        assert.deepEqual(array([1, 2, 3, 4]).intersect([2, 3, 4, 5], [2, 3, 4, 5]), [2, 3, 4]);
        assert.deepEqual(array([1, 2, 3, 4, 5]).intersect([1, 2, 3, 4, 5], [1, 2, 3]), [1, 2, 3]);
        assert.deepEqual(array([
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3]
        ]).intersect(), [1, 2, 3]);
    });


    it.should("find the powerset", function () {
        assert.deepEqual(array([1, 2]).powerSet(), [
            [],
            [ 1 ],
            [ 2 ],
            [ 1, 2 ]
        ]);
        assert.deepEqual(array([1, 2, 3]).powerSet(), [
            [],
            [ 1 ],
            [ 2 ],
            [ 1, 2 ],
            [ 3 ],
            [ 1, 3 ],
            [ 2, 3 ],
            [ 1, 2, 3 ]
        ]);
        assert.deepEqual(array([1, 2, 3, 4]).powerSet(), [
            [],
            [ 1 ],
            [ 2 ],
            [ 1, 2 ],
            [ 3 ],
            [ 1, 3 ],
            [ 2, 3 ],
            [ 1, 2, 3 ],
            [ 4 ],
            [ 1, 4 ],
            [ 2, 4 ],
            [ 1, 2, 4 ],
            [ 3, 4 ],
            [ 1, 3, 4 ],
            [ 2, 3, 4 ],
            [ 1, 2, 3, 4 ]
        ]);
    });

    it.should("find the cartesian product", function () {
        assert.deepEqual(array([1, 2]).cartesian([2, 3]), [
            [1, 2],
            [1, 3],
            [2, 2],
            [2, 3]
        ]);
        assert.deepEqual(array([1, 2]).cartesian([2, 3, 4]), [
            [1, 2],
            [1, 3],
            [1, 4] ,
            [2, 2],
            [2, 3],
            [2, 4]
        ]);
        assert.deepEqual(array([1, 2, 3]).cartesian([2, 3, 4]), [
            [1, 2],
            [1, 3],
            [1, 4] ,
            [2, 2],
            [2, 3],
            [2, 4] ,
            [3, 2],
            [3, 3],
            [3, 4]
        ]);
    });

    it.should("rotate an array ", function () {
        var arr = array(["a", "b", "c", "d"]);
        assert.deepEqual(arr.rotate(), ["b", "c", "d", "a"]);
        assert.deepEqual(arr.rotate(2), ["c", "d", "a", "b"]);
        assert.deepEqual(arr.rotate(3), ["d", "a", "b", "c"]);
        assert.deepEqual(arr.rotate(4), ["a", "b", "c", "d"]);
        assert.deepEqual(arr.rotate(-1), ["d", "a", "b", "c"]);
        assert.deepEqual(arr.rotate(-2), ["c", "d", "a", "b"]);
        assert.deepEqual(arr.rotate(-3), ["b", "c", "d", "a"]);
        assert.deepEqual(arr.rotate(-4), ["a", "b", "c", "d"]);
    });

    it.should("find permutations of an array ", function () {
        var arr = array([1, 2, 3]);
        assert.deepEqual(arr.permutations(), [
            [ 1, 2, 3 ],
            [ 1, 3, 2 ],
            [ 2, 3, 1 ],
            [ 2, 1, 3 ],
            [ 3, 1, 2 ],
            [ 3, 2, 1 ]

        ]);
        assert.deepEqual(arr.permutations(2), [
            [ 1, 2],
            [ 1, 3],
            [ 2, 3],
            [ 2, 1],
            [ 3, 1],
            [ 3, 2]
        ]);
        assert.deepEqual(arr.permutations(1), [
            [1],
            [2],
            [3]
        ]);
        assert.deepEqual(arr.permutations(0), [
            []
        ]);
        assert.deepEqual(arr.permutations(4), []);
    });

    it.should("zip an arrays ", function () {
        assert.deepEqual(array([1]).zip([2], [3]), [
            [ 1, 2, 3 ]
        ]);
        assert.deepEqual(array([1, 2]).zip([2], [3]), [
            [ 1, 2, 3 ],
            [2, null, null]
        ]);
        var a = [ 4, 5, 6 ];
        var b = [ 7, 8, 9 ];
        assert.deepEqual(array([1, 2, 3]).zip(a, b), [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ]);
        assert.deepEqual(array([1, 2]).zip(a, b), [
            [1, 4, 7],
            [2, 5, 8]
        ]);
        assert.deepEqual(array(a).zip([1, 2], [8]), [
            [4, 1, 8],
            [5, 2, null],
            [6, null, null]
        ]);
    });

    it.should("union arrays", function () {
        assert.deepEqual(array(["a", "b", "c"]).union(["b", "c", "d"]), ["a", "b", "c", "d"]);
        assert.deepEqual(array(["a"]).union(["b"], ["c"], ["d"], ["c"]), ["a", "b", "c", "d"]);
    });

    it.should("find values at particular indexes", function () {
        var arr = array(["a", "b", "c", "d"]);
        assert.deepEqual(arr.valuesAt(1, 2, 3), ["b", "c", "d"]);
        assert.deepEqual(arr.valuesAt(1, 2, 3, 4), ["b", "c", "d", null]);
        assert.deepEqual(arr.valuesAt(0, 3), ["a", "d"]);
    });

    it.should("transpose an array of arrays", function () {
        assert.deepEqual(array([
            [1, 2, 3],
            [4, 5, 6]
        ]).transpose(), [
            [ 1, 4 ],
            [ 2, 5 ],
            [ 3, 6 ]
        ]);
        assert.deepEqual(array([
            [1, 2],
            [3, 4],
            [5, 6]
        ]).transpose(), [
            [ 1, 3, 5 ],
            [ 2, 4, 6 ]
        ]);
        assert.deepEqual(array([
            [1],
            [3, 4],
            [5, 6]
        ]).transpose(), [
            [1]
        ]);
    });

    it.should("compact an array ", function () {
        var x;
        assert.deepEqual(array([1, null, null, x, 2]).compact(), [1, 2]);
        assert.deepEqual(array([1, 2]).compact(), [1, 2]);
    });

    it.should("multiply an array", function () {
        assert.deepEqual(array([1, 2, 3]).multiply(), [1, 2, 3]);
        assert.deepEqual(array([1, 2, 3]).multiply(0), [1, 2, 3]);
        assert.deepEqual(array([1, 2, 3]).multiply(1), [1, 2, 3]);
        assert.deepEqual(array([1, 2, 3]).multiply(2), [1, 2, 3, 1, 2, 3]);
    });

    it.should("find the min value of an array", function () {
        var arr1 = array([ 3, -3, -2, -1, 1, 2]),
            arr2 = array(["b", "c", "a"]),
            arr3 = array([
                {a:1},
                {a:2},
                {a:-2}
            ]),
            arr4 = array([
                {a:"c"},
                {a:"b"},
                {a:"a"}
            ]),
            minDate = comb.daysFromNow(3),
            arr5 = array([
                comb.daysFromNow(5),
                comb.daysFromNow(4),
                minDate
            ]),
            arr6 = array([
                {a:comb.daysFromNow(5)},
                {a:comb.daysFromNow(4)},
                {a:minDate}
            ]),
            arr7 = array([true, false]);
        assert.equal(arr1.min(), -3);
        assert.equal(arr2.min(), "a");
        assert.isFalse(arr7.min());
        assert.deepEqual(arr3.min("a"), {a:-2});
        assert.deepEqual(arr4.min("a"), {a:"a"});
        assert.deepEqual(arr5.min(), minDate);
        assert.deepEqual(arr6.min("a"), {a:minDate});

    });
    it.should("find the max value of an array", function () {
        var arr1 = array([ 3, -3, -2, -1, 1, 2]),
            arr2 = array(["b", "c", "a"]),
            arr3 = array([
                {a:1},
                {a:2},
                {a:-2}
            ]),
            arr4 = array([
                {a:"c"},
                {a:"b"},
                {a:"a"}
            ]),
            maxDate = comb.daysFromNow(5),
            arr5 = array([
                maxDate,
                comb.daysFromNow(4),
                comb.daysFromNow(3)
            ]),
            arr6 = array([
                {a:maxDate},
                {a:comb.daysFromNow(4)},
                {a:comb.daysFromNow(3)}
            ]),
            arr7 = array([true, false]);
        assert.equal(arr1.max(), 3);
        assert.equal(arr2.max(), "c");
        assert.isTrue(arr7.max());
        assert.deepEqual(arr3.max("a"), {a:2});
        assert.deepEqual(arr4.max("a"), {a:"c"});
        assert.deepEqual(arr5.max(), maxDate);
        assert.deepEqual(arr6.max("a"), {a:maxDate});
    });

    it.should("sort an array", function () {
        var arr1 = array([ 3, -3, -2, -1, 1, 2]),
            arr2 = array(["b", "c", "a"]),

            arr3 = array([
                {a:1},
                {a:2},
                {a:-2}
            ]),
            arr4 = array([
                {a:"c"},
                {a:"b"},
                {a:"a"}
            ]),
            fiveDays = comb.daysFromNow(5),
            fourDays = comb.daysFromNow(4),
            threeDays = comb.daysFromNow(3),
            arr5 = array([
                fiveDays,
                fourDays,
                threeDays
            ]),
            arr6 = array([
                {a:fiveDays},
                {a:fourDays},
                {a:threeDays}
            ]),
            arr7 = array([true, false]);
        assert.deepEqual(arr1.sort(), [-3, -2, -1, 1, 2, 3]);
        assert.deepEqual(arr1, [ 3, -3, -2, -1, 1, 2]);
        assert.deepEqual(arr2.sort(), ["a", "b", "c"]);
        assert.deepEqual(arr2, ["b", "c", "a"]);

        assert.deepEqual(arr7.sort(), [false, true]);
        assert.deepEqual(arr7, [true, false]);

        assert.deepEqual(arr3.sort("a"), [
            {a:-2},
            {a:1},
            {a:2}
        ]);
        assert.deepEqual(arr3, [
            {a:1},
            {a:2},
            {a:-2}
        ]);

        assert.deepEqual(arr4.sort("a"), [
            {a:"a"},
            {a:"b"},
            {a:"c"}
        ]);
        assert.deepEqual(arr4, [
            {a:"c"},
            {a:"b"},
            {a:"a"}
        ]);


        assert.deepEqual(arr5.sort(), [
            threeDays,
            fourDays,
            fiveDays
        ]);
        assert.deepEqual(arr5, [
            fiveDays,
            fourDays,
            threeDays
        ]);

        assert.deepEqual(arr6.sort("a"), [
            {a:threeDays},
            {a:fourDays},
            {a:fiveDays}
        ]);
        assert.deepEqual(arr6.sort(function (a, b) {
            return a.a - b.a;
        }), [
            {a:threeDays},
            {a:fourDays},
            {a:fiveDays}
        ]);
        assert.deepEqual(arr6, [
            {a:fiveDays},
            {a:fourDays},
            {a:threeDays}
        ]);
    });

    it.should("find the difference between two arrays", function () {
        assert.deepEqual(array([true, false]).difference([false]), [true]);
        assert.deepEqual(array([1, 2, 3]).difference([2]), [1, 3]);
        assert.deepEqual(array([1, 2, 3]).difference([2], [3]), [1]);
        assert.deepEqual(array(["a", "b", 3]).difference([3]), ["a", "b"]);
        var a = {a:1}, b = {a:2}, c = {a:3};
        assert.deepEqual(array([a, b, c]).difference([b, c]), [a]);
    });


    it.should("average an array", function () {
        assert.equal(array.avg(), 0);
        assert.equal(array.avg([]), 0);
        assert.equal(array.avg([1, 2, 3]), 2);
        assert.throws(function () {
            array.avg(["A", "B", "C"]);
        });
        var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
        assert.throws(function () {
            array.avg([d1, d2, d3]);
        });
        assert.throws(function () {
            array.avg([
                {},
                {},
                {}
            ]);
        });
    });

    it.should("remove duplicates", function () {
        assert.deepEqual(array([1, 2, 2, 3, 3, 3, 4, 4, 4]).removeDuplicates(), [1, 2, 3, 4]);
        assert.deepEqual(array(["a", "b", "b"]).removeDuplicates(), ["a", "b"]);
        assert.deepEqual(array([1, 2, 2, 3, 3, 3, 4, 4, 4]).unique(), [1, 2, 3, 4]);
        assert.deepEqual(array(["a", "b", "b"]).unique(), ["a", "b"]);
    });

    it.should("support pluck", function () {

        var arr = array([
            {name:{first:"Fred", last:"Jones"}, age:50, roles:["a", "b", "c"]},
            {name:{first:"Bob", last:"Yukon"}, age:40, roles:["b", "c"]},
            {name:{first:"Alice", last:"Palace"}, age:35, roles:["c"]},
            {name:{first:"Johnny", last:"P."}, age:56, roles:[]}
        ]);

        assert.deepEqual(arr.pluck("name.first"), ["Fred", "Bob", "Alice", "Johnny"]);
        assert.deepEqual(arr.pluck("age"), [50, 40, 35, 56]);
        assert.deepEqual(arr.pluck("roles.length"), [3, 2, 1, 0]);
        assert.deepEqual(arr.pluck("roles.0"), ["a", "b", "c", undefined]);

    });
}).as(module);

