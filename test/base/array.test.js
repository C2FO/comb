"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");

it.describe("comb.array", function (it) {

    it.should("convert values to arrays", function () {
        assert.deepEqual(comb.array.toArray(), []);
        assert.deepEqual(comb.array.toArray(1), [1]);
        assert.deepEqual(comb.array.toArray([1]), [1]);
        assert.deepEqual(comb.array.toArray({a:"b", c:"c"}), [
            ["a", "b"],
            ["c", "c"]
        ]);
        assert.deepEqual(comb.array.toArray("a", {a:"b"}), ["a", ["a", "b"]]);
        var date = new Date();
        assert.deepEqual(comb.array.toArray(date), [date]);
        assert.deepEqual(comb.array.toArray(true), [true]);
        assert.deepEqual(comb.array.toArray(false), [false]);
    });


    it.should("should sum values of an array", function () {
        assert.equal(comb.array.sum(), 0);
        assert.equal(comb.array.sum([]), 0);
        assert.equal(comb.array.sum([1, 2, 3]), 6);
        assert.equal(comb.array.sum(["A", "B", "C"]), "ABC");
        var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
        assert.equal(comb.array.sum([d1, d2, d3]), d1.toString() + d2.toString() + d3.toString());
        assert.equal(comb.array.sum([
            {},
            {},
            {}
        ]), "[object Object][object Object][object Object]");
    });

    it.should("flatten properly", function () {
        assert.deepEqual(comb.array.flatten([1, 2, 3]), [1, 2, 3]);
        assert.deepEqual(comb.array.flatten([1, 2], [2, 3], [3, 4]), [1, 2, 2, 3, 3, 4]);
        assert.deepEqual(comb.array.flatten([
            [1, 2],
            2
        ], [2, 3], [3, 4]), [
            [1, 2],
            2,
            2,
            3,
            3,
            4
        ]);
        assert.deepEqual(comb.array.flatten([1, "A"], [2, "B"], [3, "C"]), [1, "A", 2, "B", 3, "C"]);
    });

    it.should("intersect properly", function () {
        assert.deepEqual(comb.array.intersect([1, 2], [2, 3], [2, 3, 5]), [2]);
        assert.deepEqual(comb.array.intersect([1, 2, 3], [2, 3, 4, 5], [2, 3, 5]), [2, 3]);
        assert.deepEqual(comb.array.intersect([1, 2, 3, 4], [2, 3, 4, 5], [2, 3, 4, 5]), [2, 3, 4]);
        assert.deepEqual(comb.array.intersect([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3]), [1, 2, 3]);
        assert.deepEqual(comb.array.intersect([
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3]
        ]), [1, 2, 3]);
    });


    it.should("find the powerset", function () {
        assert.deepEqual(comb.array.powerSet([1, 2]), [
            [],
            [ 1 ],
            [ 2 ],
            [ 1, 2 ]
        ]);
        assert.deepEqual(comb.array.powerSet([1, 2, 3]), [
            [],
            [ 1 ],
            [ 2 ],
            [ 1, 2 ],
            [ 3 ],
            [ 1, 3 ],
            [ 2, 3 ],
            [ 1, 2, 3 ]
        ]);
        assert.deepEqual(comb.array.powerSet([1, 2, 3, 4]), [
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
        assert.deepEqual(comb.array.cartesian([1, 2], [2, 3]), [
            [1, 2],
            [1, 3],
            [2, 2],
            [2, 3]
        ]);
        assert.deepEqual(comb.array.cartesian([1, 2], [2, 3, 4]), [
            [1, 2],
            [1, 3],
            [1, 4] ,
            [2, 2],
            [2, 3],
            [2, 4]
        ]);
        assert.deepEqual(comb.array.cartesian([1, 2, 3], [2, 3, 4]), [
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
        var arr = ["a", "b", "c", "d"];
        assert.deepEqual(comb.array.rotate(arr), ["b", "c", "d", "a"]);
        assert.deepEqual(comb.array.rotate(arr, 2), ["c", "d", "a", "b"]);
        assert.deepEqual(comb.array.rotate(arr, 3), ["d", "a", "b", "c"]);
        assert.deepEqual(comb.array.rotate(arr, 4), ["a", "b", "c", "d"]);
        assert.deepEqual(comb.array.rotate(arr, -1), ["d", "a", "b", "c"]);
        assert.deepEqual(comb.array.rotate(arr, -2), ["c", "d", "a", "b"]);
        assert.deepEqual(comb.array.rotate(arr, -3), ["b", "c", "d", "a"]);
        assert.deepEqual(comb.array.rotate(arr, -4), ["a", "b", "c", "d"]);
    });

    it.should("find permutations of an array ", function () {
        var arr = [1, 2, 3];
        assert.deepEqual(comb.array.permutations(arr), [
            [ 1, 2, 3 ],
            [ 1, 3, 2 ],
            [ 2, 3, 1 ],
            [ 2, 1, 3 ],
            [ 3, 1, 2 ],
            [ 3, 2, 1 ]

        ]);
        assert.deepEqual(comb.array.permutations(arr, 2), [
            [ 1, 2],
            [ 1, 3],
            [ 2, 3],
            [ 2, 1],
            [ 3, 1],
            [ 3, 2]
        ]);
        assert.deepEqual(comb.array.permutations(arr, 1), [
            [1],
            [2],
            [3]
        ]);
        assert.deepEqual(comb.array.permutations(arr, 0), [
            []
        ]);
        assert.deepEqual(comb.array.permutations(arr, 4), []);
    });

    it.should("zip an arrays ", function () {
        var arr1 = [1, 2], arr2 = [2], arr3 = [3];
        assert.deepEqual(comb.array.zip([1], [2], [3]), [
            [ 1, 2, 3 ]
        ]);
        assert.deepEqual(comb.array.zip([1, 2], [2], [3]), [
            [ 1, 2, 3 ],
            [2, null, null]
        ]);
        var a = [ 4, 5, 6 ];
        var b = [ 7, 8, 9 ];
        assert.deepEqual(comb.array.zip([1, 2, 3], a, b), [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ]);
        assert.deepEqual(comb.array.zip([1, 2], a, b), [
            [1, 4, 7],
            [2, 5, 8]
        ]);
        assert.deepEqual(comb.array.zip(a, [1, 2], [8]), [
            [4, 1, 8],
            [5, 2, null],
            [6, null, null]
        ]);
    });

    it.should("union arrays", function () {
        assert.deepEqual(comb.array.union(["a", "b", "c"], ["b", "c", "d"]), ["a", "b", "c", "d"]);
        assert.deepEqual(comb.array.union(["a"], ["b"], ["c"], ["d"], ["c"]), ["a", "b", "c", "d"]);
    });

    it.should("find values at particular indexes", function () {
        var arr = ["a", "b", "c", "d"];
        assert.deepEqual(comb.array.valuesAt(arr, 1, 2, 3), ["b", "c", "d"]);
        assert.deepEqual(comb.array.valuesAt(arr, 1, 2, 3, 4), ["b", "c", "d", null]);
        assert.deepEqual(comb.array.valuesAt(arr, 0, 3), ["a", "d"]);
    });

    it.should("transpose an array of arrays", function () {
        assert.deepEqual(comb.array.transpose([
            [1, 2, 3],
            [4, 5, 6]
        ]), [
            [ 1, 4 ],
            [ 2, 5 ],
            [ 3, 6 ]
        ]);
        assert.deepEqual(comb.array.transpose([
            [1, 2],
            [3, 4],
            [5, 6]
        ]), [
            [ 1, 3, 5 ],
            [ 2, 4, 6 ]
        ]);
        assert.deepEqual(comb.array.transpose([
            [1],
            [3, 4],
            [5, 6]
        ]), [
            [1]
        ]);
    });

    it.should("compact an array ", function () {
        var x;
        assert.deepEqual(comb.array.compact([1, null, null, x, 2]), [1, 2]);
        assert.deepEqual(comb.array.compact([1, 2]), [1, 2]);
    });

    it.should("multiply an array", function () {
        assert.deepEqual(comb.array.multiply([1, 2, 3]), [1, 2, 3]);
        assert.deepEqual(comb.array.multiply([1, 2, 3], 0), [1, 2, 3]);
        assert.deepEqual(comb.array.multiply([1, 2, 3], 1), [1, 2, 3]);
        assert.deepEqual(comb.array.multiply([1, 2, 3], 2), [1, 2, 3, 1, 2, 3]);
    });

    it.should("find the min value of an array", function () {
        var arr1 = [ 3, -3, -2, -1, 1, 2],
            arr2 = ["b", "c", "a"],
            arr3 = [
                {a:1},
                {a:2},
                {a:-2}
            ],
            arr4 = [
                {a:"c"},
                {a:"b"},
                {a:"a"}
            ],
            minDate = comb.daysFromNow(3),
            arr5 = [
                comb.daysFromNow(5),
                comb.daysFromNow(4),
                minDate
            ],
            arr6 = [
                {a:comb.daysFromNow(5)},
                {a:comb.daysFromNow(4)},
                {a:minDate}
            ],
            arr7 = [true, false];
        assert.equal(comb.array.min(arr1), -3);
        assert.equal(comb.array.min(arr2), "a");
        assert.isFalse(comb.array.min(arr7));
        assert.deepEqual(comb.array.min(arr3, "a"), {a:-2});
        assert.deepEqual(comb.array.min(arr4, "a"), {a:"a"});
        assert.deepEqual(comb.array.min(arr5), minDate);
        assert.deepEqual(comb.array.min(arr6, "a"), {a:minDate});

    });
    it.should("find the max value of an array", function () {
        var arr1 = [ 3, -3, -2, -1, 1, 2],
            arr2 = ["b", "c", "a"],
            arr3 = [
                {a:1},
                {a:2},
                {a:-2}
            ],
            arr4 = [
                {a:"c"},
                {a:"b"},
                {a:"a"}
            ],
            maxDate = comb.daysFromNow(5),
            arr5 = [
                maxDate,
                comb.daysFromNow(4),
                comb.daysFromNow(3)
            ],
            arr6 = [
                {a:maxDate},
                {a:comb.daysFromNow(4)},
                {a:comb.daysFromNow(3)}
            ],
            arr7 = [true, false];
        assert.equal(comb.array.max(arr1), 3);
        assert.equal(comb.array.max(arr2), "c");
        assert.isTrue(comb.array.max(arr7));
        assert.deepEqual(comb.array.max(arr3, "a"), {a:2});
        assert.deepEqual(comb.array.max(arr4, "a"), {a:"c"});
        assert.deepEqual(comb.array.max(arr5), maxDate);
        assert.deepEqual(comb.array.max(arr6, "a"), {a:maxDate});
    });

    it.should("sort an array", function () {
        var arr1 = [ 3, -3, -2, -1, 1, 2],
            arr2 = ["b", "c", "a"],

            arr3 = [
                {a:1},
                {a:2},
                {a:-2}
            ],
            arr4 = [
                {a:"c"},
                {a:"b"},
                {a:"a"}
            ],
            fiveDays = comb.daysFromNow(5),
            fourDays = comb.daysFromNow(4),
            threeDays = comb.daysFromNow(3),
            arr5 = [
                fiveDays,
                fourDays,
                threeDays
            ],
            arr6 = [
                {a:fiveDays},
                {a:fourDays},
                {a:threeDays}
            ],
            arr7 = [true, false];
        assert.deepEqual(comb.array.sort(arr1), [-3, -2, -1, 1, 2, 3]);
        assert.deepEqual(arr1, [ 3, -3, -2, -1, 1, 2]);
        assert.deepEqual(comb.array.sort(arr2), ["a", "b", "c"]);
        assert.deepEqual(arr2, ["b", "c", "a"]);

        assert.deepEqual(comb.array.sort(arr7), [false, true]);
        assert.deepEqual(arr7, [true, false]);

        assert.deepEqual(comb.array.sort(arr3, "a"), [
            {a:-2},
            {a:1},
            {a:2}
        ]);
        assert.deepEqual(arr3, [
            {a:1},
            {a:2},
            {a:-2}
        ]);

        assert.deepEqual(comb.array.sort(arr4, "a"), [
            {a:"a"},
            {a:"b"},
            {a:"c"}
        ]);
        assert.deepEqual(arr4, [
            {a:"c"},
            {a:"b"},
            {a:"a"}
        ]);


        assert.deepEqual(comb.array.sort(arr5), [
            threeDays,
            fourDays,
            fiveDays
        ]);
        assert.deepEqual(arr5, [
            fiveDays,
            fourDays,
            threeDays
        ]);

        assert.deepEqual(comb.array.sort(arr6, "a"), [
            {a:threeDays},
            {a:fourDays},
            {a:fiveDays}
        ]);
        assert.deepEqual(comb.array.sort(arr6, function (a, b) {
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
        var diff = comb.array.difference;
        assert.deepEqual(diff([true, false], [false]), [true]);
        assert.deepEqual(diff([1, 2, 3], [2]), [1, 3]);
        assert.deepEqual(diff([1, 2, 3], [2], [3]), [1]);
        assert.deepEqual(diff(["a", "b", 3], [3]), ["a", "b"]);
        var a = {a:1}, b = {a:2}, c = {a:3};
        assert.deepEqual(diff([a, b, c], [b, c]), [a]);
    });


    it.should("average an array", function () {
        assert.equal(comb.array.avg(), 0);
        assert.equal(comb.array.avg([]), 0);
        assert.equal(comb.array.avg([1, 2, 3]), 2);
        assert.throws(function () {
            comb.array.avg(["A", "B", "C"]);
        });
        var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
        assert.throws(function () {
            comb.array.avg([d1, d2, d3]);
        });
        assert.throws(function () {
            comb.array.avg([
                {},
                {},
                {}
            ]);
        });
    });

    it.should("remove duplicates", function () {
        var remove = comb.array.removeDuplicates;
        assert.deepEqual(remove([1, 2, 2, 3, 3, 3, 4, 4, 4]), [1, 2, 3, 4]);
        assert.deepEqual(remove(["a", "b", "b"]), ["a", "b"]);
        remove = comb.array.unique;
        assert.deepEqual(remove([1, 2, 2, 3, 3, 3, 4, 4, 4]), [1, 2, 3, 4]);
        assert.deepEqual(remove(["a", "b", "b"]), ["a", "b"]);
    });
});

