var comb = require("index"),
    assert = require("assert"),
    when = comb.when,
    it = require("it");

it.describe("comb.async",function (it) {
    var arr = [1, 2, 3, 4, 5], array = comb.async.array;

    function asyncArr() {
        var ret = new comb.Promise();
        process.nextTick(ret.callback.bind(ret, arr));
        return ret;
    }

    function asyncIndex(index) {
        var ret = new comb.Promise();
        process.nextTick(ret.callback.bind(ret, arr[index]));
        return ret;
    }

    it.describe(".forEach", function (it) {


        it.should("loop through results of a promise return the original array", function () {
            return array(asyncArr()).forEach(function (item, index) {
                assert.equal(item, arr[index]);
            }).chain(function (results) {
                    assert.deepEqual(results, arr);
                });
        });

        it.should("Loop through each item in an array and return the results", function () {
            return array(arr).forEach(function (item, index) {
                assert.equal(item, arr[index]);
            }).chain(function (results) {
                    assert.deepEqual(results, arr);
                });
        });

        it.should("wait for inner promises to complete and return the original array", function () {
            return array(arr).forEach(function (item, index) {
                var ret = new comb.Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item * 2);
                });
                return ret;
            }).chain(function (results) {
                    assert.deepEqual(results, arr);
                });
        });

        it.should("should accept non array items but still loop and return the non array item", function () {
            return array(asyncIndex(0)).forEach(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
            }).chain(function (results) {
                    assert.deepEqual(results, 1);
                });
        });

        it.should("catch thrown errors", function (next) {
            array(asyncArr()).forEach(function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

        it.should("catch async errors", function (next) {
            array(asyncArr()).forEach(function (item, index) {
                if (index == 4) {
                    return new comb.Promise().errback(new Error("error"));
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

    });

    it.describe(".map", function (it) {

        it.should("loop through results of a promise return the results", function () {
            return array(asyncArr()).map(function (item, index) {
                assert.equal(item, arr[index]);
                return item * 2;
            }).chain(function (results) {
                    assert.deepEqual(results, arr.map(function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("Loop through each item in an array and return the results", function () {
            return array(arr).map(function (item, index) {
                assert.equal(item, arr[index]);
                return item * 2;
            }).chain(function (results) {
                    assert.deepEqual(results, arr.map(function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("wait for inner promises to complete and return the original array", function () {
            return array(arr).map(function (item, index) {
                var ret = new comb.Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item * 2);
                });
                return ret;
            }).chain(function (results) {
                    assert.deepEqual(results, arr.map(function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("should accept non array items but still loop and return the non array item", function () {
            return array(asyncIndex(0)).map(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item * 2;
            }).chain(function (results) {
                    assert.deepEqual(results, [2]);
                });
        });

        it.should("catch thrown errors", function (next) {
            array(asyncArr()).map(function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

        it.should("catch async errors", function (next) {
            array(asyncArr()).map(function (item, index) {
                if (index == 4) {
                    return new comb.Promise().errback(new Error("error"));
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

    });

    it.describe(".filter", function (it) {


        it.should("loop through results of a promise return the results", function () {
            return array(asyncArr()).filter(function (item, index) {
                assert.equal(item, arr[index]);
                return item % 2;
            }).chain(function (results) {
                    assert.deepEqual(results, [1, 3, 5]);
                });
        });

        it.should("Loop through each item in an array and return the results", function () {
            return array(arr).filter(function (item, index) {
                assert.equal(item, arr[index]);
                return item % 2;
            }).chain(function (results) {
                    assert.deepEqual(results, [1, 3, 5]);
                });
        });

        it.should("wait for inner promises to complete and return the original array", function () {
            return array(arr).filter(function (item, index) {
                var ret = new comb.Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item % 2);
                });
                return ret;
            }).chain(function (results) {
                    assert.deepEqual(results, [1, 3, 5]);
                });
        });

        it.should("should accept non array items but still loop and return the non array item", function () {
            return array(asyncIndex(0)).filter(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item % 1;
            }).chain(function (results) {
                    assert.deepEqual(results, []);
                });
        });

        it.should("catch thrown errors", function (next) {
            array(asyncArr()).filter(function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

        it.should("catch async errors", function (next) {
            array(asyncArr()).filter(function (item, index) {
                if (index == 4) {
                    return new comb.Promise().errback(new Error("error"));
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

    });

    it.describe(".every", function (it) {


        it.should("loop through results of a promise and return true if all items pass", function () {
            return array(asyncArr()).every(function (item, index) {
                assert.equal(item, arr[index]);
                return comb.isNumber(item);
            }).chain(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("loop through results of a promise and return false if all items do not pass", function () {
            return array(asyncArr()).every(function (item, index) {
                assert.equal(item, arr[index]);
                return comb.isString(item);
            }).chain(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("Loop through each item in an array and return true if all items pass", function () {
            return array(arr).every(function (item, index) {
                assert.equal(item, arr[index]);
                return comb.isNumber(item);
            }).chain(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("Loop through each item in an array and return false if all items do not pass", function () {
            return array(arr).every(function (item, index) {
                assert.equal(item, arr[index]);
                return comb.isString(item);
            }).chain(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("wait for inner promises to complete and return true if all items pass", function () {
            return array(arr).every(function (item, index) {
                var ret = new comb.Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(comb.isNumber(item));
                });
                return ret;
            }).chain(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("wait for inner promises to complete and return false if all items do not pass", function () {
            return array(arr).every(function (item, index) {
                var ret = new comb.Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(comb.isString(item));
                });
                return ret;
            }).chain(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("should accept non array items but still loop and return the non array item", function () {
            return array(asyncIndex(0)).every(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return comb.isNumber(item);
            }).chain(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("catch thrown errors", function (next) {
            array(asyncArr()).every(function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

        it.should("catch async errors", function (next) {
            array(asyncArr()).every(function (item, index) {
                if (index == 4) {
                    return new comb.Promise().errback(new Error("error"));
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

    });


    it.describe(".some", function (it) {

        it.should("loop through results of a promise and return true if some items pass", function () {
            return array(asyncArr()).some(function (item, index) {
                assert.equal(item, arr[index]);
                return item == 1;
            }).chain(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("loop through results of a promise and return false if not items pass", function () {
            return array(asyncArr()).some(function (item, index) {
                assert.equal(item, arr[index]);
                return item > 5;
            }).chain(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("Loop through each item in an array and return true if some items pass", function () {
            return array(arr).some(function (item, index) {
                assert.equal(item, arr[index]);
                return item == 1;
            }).chain(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("Loop through each item in an array and return false if no items pass", function () {
            return array(arr).some(function (item, index) {
                assert.equal(item, arr[index]);
                return item > 5;
            }).chain(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("wait for inner promises to complete and return true if some items pass", function () {
            return array(arr).some(function (item, index) {
                var ret = new comb.Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item == 1);
                });
                return ret;
            }).chain(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("wait for inner promises to complete and return false if no items pass", function () {
            return array(arr).some(function (item, index) {
                var ret = new comb.Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item > 5);
                });
                return ret;
            }).chain(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("should accept non array items but still loop and return true if the item passes", function () {
            return array(asyncIndex(0)).some(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item === 1;
            }).chain(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("should accept non array items but still loop and return false if the item does not pass", function () {
            return array(asyncIndex(0)).some(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item != 1;
            }).chain(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("catch thrown errors", function (next) {
            array(asyncArr()).some(function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

        it.should("catch async errors", function (next) {
            array(asyncArr()).some(function (item, index) {
                if (index == 4) {
                    return new comb.Promise().errback(new Error("error"));
                }
            }).then(next, function (results) {
                    assert.deepEqual(results.message, "error");
                    next();
                });
        });

    });

    it.describe(".zip", function (it) {

        it.should("zip arrays together", function (next) {
            array(asyncArr()).zip(asyncArr(), asyncArr()).then(function (zipped) {
                assert.deepEqual(zipped, [
                    [1, 1, 1],
                    [2, 2, 2],
                    [3, 3, 3],
                    [4, 4, 4],
                    [5, 5, 5]
                ]);
            }).classic(next);
        });

    });

    function asyncDeepEqual(p, expected) {
        return comb.when(p).chain(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe(".sum", function (it) {

        it.should("sum values of an array", function () {
            var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
            return when(
                asyncDeepEqual(array().sum(), 0),
                asyncDeepEqual(array([]).sum(), 0),
                asyncDeepEqual(array([1, 2, 3]).sum(), 6),
                asyncDeepEqual(array(["A", "B", "C"]).sum([]), "ABC"),
                asyncDeepEqual(array([d1, d2, d3]).sum(), d1.toString() + d2.toString() + d3.toString()),
                asyncDeepEqual(array([
                    {},
                    {},
                    {}
                ]).sum(), "[object Object][object Object][object Object]")
            );
        });
    });

    it.describe(".flatten", function (it) {
        it.should("flatten properly", function () {
            return when(
                asyncDeepEqual(array([1, 2, 3]).flatten(), [1, 2, 3]),
                asyncDeepEqual(array([1, 2]).flatten([2, 3], [3, 4]), [1, 2, 2, 3, 3, 4]),
                asyncDeepEqual(array([
                    [
                        [1, 2],
                        2
                    ],
                    [2, 3],
                    [3, 4]
                ]).flatten(), [
                    [1, 2],
                    2,
                    2,
                    3,
                    3,
                    4
                ]),
                asyncDeepEqual(array([
                    [1, "A"],
                    [2, "B"],
                    [3, "C"]
                ]).flatten(), [1, "A", 2, "B", 3, "C"])
            )
        });
    });


    it.describe(".intersect", function (it) {
        it.should("intersect properly", function () {
            return when(
                asyncDeepEqual(array([1, 2]).intersect([2, 3], [2, 3, 5]), [2]),
                asyncDeepEqual(array([1, 2, 3]).intersect(array([2, 3, 4, 5]), array([2, 3, 5])), [2, 3]),
                asyncDeepEqual(array([1, 2, 3, 4]).intersect([2, 3, 4, 5], [2, 3, 4, 5]), [2, 3, 4]),
                asyncDeepEqual(array([1, 2, 3, 4, 5]).intersect([1, 2, 3, 4, 5], array([1, 2, 3])), [1, 2, 3]),
                asyncDeepEqual(array([
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3]
                ]).intersect(), [1, 2, 3])
            );
        });
    });

    it.describe(".powerSet", function (it) {
        it.should("find the powerset", function () {
            return when(
                asyncDeepEqual(array([1, 2]).powerSet(), [
                    [],
                    [ 1 ],
                    [ 2 ],
                    [ 1, 2 ]
                ]),
                asyncDeepEqual(array([1, 2, 3]).powerSet(), [
                    [],
                    [ 1 ],
                    [ 2 ],
                    [ 1, 2 ],
                    [ 3 ],
                    [ 1, 3 ],
                    [ 2, 3 ],
                    [ 1, 2, 3 ]
                ]),
                asyncDeepEqual(array([1, 2, 3, 4]).powerSet(), [
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
                ])
            );
        });
    });

    it.describe(".cartesian", function (it) {

        it.should("find the cartesian product", function () {
            return when(
                asyncDeepEqual(array([1, 2]).cartesian([2, 3]), [
                    [1, 2],
                    [1, 3],
                    [2, 2],
                    [2, 3]
                ]),
                asyncDeepEqual(array([1, 2]).cartesian(array([2, 3, 4])), [
                    [1, 2],
                    [1, 3],
                    [1, 4] ,
                    [2, 2],
                    [2, 3],
                    [2, 4]
                ]),
                asyncDeepEqual(array([1, 2, 3]).cartesian([2, 3, 4]), [
                    [1, 2],
                    [1, 3],
                    [1, 4] ,
                    [2, 2],
                    [2, 3],
                    [2, 4] ,
                    [3, 2],
                    [3, 3],
                    [3, 4]
                ])
            );
        });
    });

    it.describe(".rotate", function (it) {
        it.should("rotate an array ", function () {
            var arr = ["a", "b", "c", "d"];
            return when(
                asyncDeepEqual(array(arr).rotate(), ["b", "c", "d", "a"]),
                asyncDeepEqual(array(arr).rotate(2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array(arr).rotate(3), ["d", "a", "b", "c"]),
                asyncDeepEqual(array(arr).rotate(4), ["a", "b", "c", "d"]),
                asyncDeepEqual(array(arr).rotate(-1), ["d", "a", "b", "c"]),
                asyncDeepEqual(array(arr).rotate(-2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array(arr).rotate(-3), ["b", "c", "d", "a"]),
                asyncDeepEqual(array(arr).rotate(-4), ["a", "b", "c", "d"])
            );
        });
    });


    it.describe(".permutations", function (it) {
        it.should("find permutations of an array ", function () {
            var arr = [1, 2, 3];
            return when(
                asyncDeepEqual(array(arr).permutations(), [
                    [ 1, 2, 3 ],
                    [ 1, 3, 2 ],
                    [ 2, 3, 1 ],
                    [ 2, 1, 3 ],
                    [ 3, 1, 2 ],
                    [ 3, 2, 1 ]

                ]),
                asyncDeepEqual(array(arr).permutations(2), [
                    [ 1, 2],
                    [ 1, 3],
                    [ 2, 3],
                    [ 2, 1],
                    [ 3, 1],
                    [ 3, 2]
                ]),
                asyncDeepEqual(array(arr).permutations(1), [
                    [1],
                    [2],
                    [3]
                ]),
                asyncDeepEqual(array(arr).permutations(0), [
                    []
                ]),
                asyncDeepEqual(array(arr).permutations(4), [])
            );
        });
    });

    it.describe(".union", function (it) {

        it.should("union arrays", function () {
            return when(
                asyncDeepEqual(array(["a", "b", "c"]).union(["b", "c", "d"]), ["a", "b", "c", "d"]),
                asyncDeepEqual(array(["a"]).union(array(["b"]), ["c"], ["d"], array(["c"])), ["a", "b", "c", "d"])
            );
        });
    });

    it.describe(".valuesAt", function (it) {

        it.should("find values at particular indexes", function () {
            var arr = ["a", "b", "c", "d"];
            return when(
                asyncDeepEqual(array(arr).valuesAt(1, 2, 3), ["b", "c", "d"]),
                asyncDeepEqual(array(arr).valuesAt(1, 2, 3, 4), ["b", "c", "d", null]),
                asyncDeepEqual(array(arr).valuesAt(0, 3), ["a", "d"])
            );
        });

    });

    it.describe(".transpose", function (it) {

        it.should("transpose an array of arrays", function () {
            return when(
                asyncDeepEqual(array([
                    [1, 2, 3],
                    [4, 5, 6]
                ]).transpose(), [
                    [ 1, 4 ],
                    [ 2, 5 ],
                    [ 3, 6 ]
                ]),
                asyncDeepEqual(array([
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ]).transpose(), [
                    [ 1, 3, 5 ],
                    [ 2, 4, 6 ]
                ]),
                asyncDeepEqual(array([
                    [1],
                    [3, 4],
                    [5, 6]
                ]).transpose(), [
                    [1]
                ])
            );
        });

    });
    it.describe(".compact", function (it) {

        it.should("compact an array ", function () {
            var x;
            return when(
                asyncDeepEqual(array([1, null, null, x, 2]).compact(), [1, 2]),
                asyncDeepEqual(array([1, 2]).compact(), [1, 2])
            );
        });
    });

    it.describe(".multiply", function (it) {
        it.should("multiply an array", function () {
            return when(
                asyncDeepEqual(array([1, 2, 3]).multiply(), [1, 2, 3]),
                asyncDeepEqual(array([1, 2, 3]).multiply(0), [1, 2, 3]),
                asyncDeepEqual(array([1, 2, 3]).multiply(1), [1, 2, 3]),
                asyncDeepEqual(array([1, 2, 3]).multiply(2), [1, 2, 3, 1, 2, 3])
            );
        });
    });

    it.describe(".min", function (it) {
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
            return when(
                asyncDeepEqual(array(arr1).min(), -3),
                asyncDeepEqual(array(arr2).min(), "a"),
                asyncDeepEqual(array(arr7).min(), false),
                asyncDeepEqual(array(arr3).min("a"), {a:-2}),
                asyncDeepEqual(array(arr4).min("a"), {a:"a"}),
                asyncDeepEqual(array(arr5).min(), minDate),
                asyncDeepEqual(array(arr6).min("a"), {a:minDate})
            );

        });

    });

    it.describe(".max", function (it) {
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
            return when(
                asyncDeepEqual(array(arr1).max(), 3),
                asyncDeepEqual(array(arr2).max(), "c"),
                asyncDeepEqual(array(arr7).max(), true),
                asyncDeepEqual(array(arr3).max("a"), {a:2}),
                asyncDeepEqual(array(arr4).max("a"), {a:"c"}),
                asyncDeepEqual(array(arr5).max(), maxDate),
                asyncDeepEqual(array(arr6).max("a"), {a:maxDate})
            );
        });

    });

    it.describe(".sort", function (it) {
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
            return when(
                asyncDeepEqual(array(arr1).sort(), [-3, -2, -1, 1, 2, 3]),
                asyncDeepEqual(array(arr2).sort(), ["a", "b", "c"]),

                asyncDeepEqual(array(arr7).sort(), [false, true]),

                asyncDeepEqual(array(arr3).sort("a"), [
                    {a:-2},
                    {a:1},
                    {a:2}
                ]),

                asyncDeepEqual(array(arr4).sort("a"), [
                    {a:"a"},
                    {a:"b"},
                    {a:"c"}
                ]),

                asyncDeepEqual(array(arr5).sort(), [
                    threeDays,
                    fourDays,
                    fiveDays
                ]),
                asyncDeepEqual(array(arr6).sort("a"), [
                    {a:threeDays},
                    {a:fourDays},
                    {a:fiveDays}
                ]),
                asyncDeepEqual(array(arr6).sort(function (a, b) {
                    return a.a - b.a;
                }), [
                    {a:threeDays},
                    {a:fourDays},
                    {a:fiveDays}
                ])
            );
        });

    });

    it.describe(".difference", function (it) {
        it.should("find the difference between two arrays", function () {
            var a = {a:1}, b = {a:2}, c = {a:3};
            asyncDeepEqual(array([true, false]).difference(array([false])), [true]);
            asyncDeepEqual(array([1, 2, 3]).difference([2]), [1, 3]);
            asyncDeepEqual(array([1, 2, 3]).difference([2], array([3])), [1]);
            asyncDeepEqual(array(["a", "b", 3]).difference([3]), ["a", "b"]);
            asyncDeepEqual(array([a, b, c]).difference([b, c]), [a]);
        });

    });

    it.describe(".avg", function (it) {
        it.should("average an array", function () {
            return when(
                asyncDeepEqual(array().avg(), 0),
                asyncDeepEqual(array([]).avg(), 0),
                asyncDeepEqual(array([1, 2, 3]).avg(), 2)
            );
        });

        it.should("throw errors for items that are not numbers", function (next) {

            array(["A", "B", "C"]).avg().then(next, function (err) {
                assert.equal(err.message, "Cannot average an array of non numbers.");
                next();
            });
        });
    });
    it.describe(".removeDuplicates", function (it) {

        it.should("remove duplicates", function () {
            return when(
                asyncDeepEqual(array([1, 2, 2, 3, 3, 3, 4, 4, 4]).removeDuplicates(), [1, 2, 3, 4]),
                asyncDeepEqual(array(["a", "b", "b"]).removeDuplicates(), ["a", "b"]),
                asyncDeepEqual(array([1, 2, 2, 3, 3, 3, 4, 4, 4]).unique(), [1, 2, 3, 4]),
                asyncDeepEqual(array(["a", "b", "b"]).unique(), ["a", "b"])
            );
        });
    });

    it.describe("pluck", function (it) {
        it.should("pluck properties", function (it) {
            var arr = [
                {name:{first:"Fred", last:"Jones"}, age:50, roles:["a", "b", "c"]},
                {name:{first:when("Bob"), last:"Yukon"}, age:when(40), roles:when(["b", "c"])},
                {name:{first:"Alice", last:"Palace"}, age:35, roles:["c"]},
                {name:{first:when("Johnny"), last:"P."}, age:56, roles:when([])}
            ];
            return when(
                asyncDeepEqual(array(arr).pluck("name.first"), ["Fred", "Bob", "Alice", "Johnny"]),
                asyncDeepEqual(array(arr).pluck("age"), [50, 40, 35, 56]),
                asyncDeepEqual(array(arr).pluck("roles.length"), [3, 2, 1, 0]),
                asyncDeepEqual(array(arr).pluck("roles.0"), ["a", "b", "c", undefined])
            );

        });
    });

    it.should("allow chaining of operations", function () {
        return asyncDeepEqual(array(asyncArr())
            .map(function (num, i) {
                return num * (i + 1);
            }).filter(function (num) {
                return num % 2;
            }).avg(), 11.666666666666666);
    });


}).as(module);