"use strict";
var obj = require("./object"),
    merge = obj.merge,
    misc = require("./misc"),
    argsToArray = misc.argsToArray,
    string = require("./string"),
    isString = string.isString,
    number = require("./number.js"),
    floor = Math.floor,
    abs = Math.abs,
    mathMax = Math.max,
    mathMin = Math.min;


var isArray = exports.isArray = function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};

function isDate(obj) {
    var undef;
    return (obj !== undef && typeof obj === "object" && obj instanceof Date);
}

function cross(num, cros) {
    return reduceRight(cros, function (a, b) {
        if (!isArray(b)) {
            b = [b];
        }
        b.unshift(num);
        a.unshift(b);
        return a;
    }, []);
}

function permute(num, cross, length) {
    var ret = [];
    for (var i = 0; i < cross.length; i++) {
        ret.push([num].concat(rotate(cross, i)).slice(0, length));
    }
    return ret;
}


function intersection(a, b) {
    var ret = [], aOne;
    if (isArray(a) && isArray(b) && a.length && b.length) {
        for (var i = 0, l = a.length; i < l; i++) {
            aOne = a[i];
            if (indexOf(b, aOne) !== -1) {
                ret.push(aOne);
            }
        }
    }
    return ret;
}


var _sort = (function () {

    var isAll = function (arr, test) {
        return every(arr, test);
    };

    var defaultCmp = function (a, b) {
        return a - b;
    };

    var dateSort = function (a, b) {
        return a.getTime() - b.getTime();
    };

    return function _sort(arr, property) {
        var ret = [];
        if (isArray(arr)) {
            ret = arr.slice();
            if (property) {
                if (typeof property === "function") {
                    ret.sort(property);
                } else {
                    ret.sort(function (a, b) {
                        var aProp = a[property], bProp = b[property];
                        if (isString(aProp) && isString(bProp)) {
                            return aProp > bProp ? 1 : aProp < bProp ? -1 : 0;
                        } else if (isDate(aProp) && isDate(bProp)) {
                            return aProp.getTime() - bProp.getTime();
                        } else {
                            return aProp - bProp;
                        }
                    });
                }
            } else {
                if (isAll(ret, isString)) {
                    ret.sort();
                } else if (isAll(ret, isDate)) {
                    ret.sort(dateSort);
                } else {
                    ret.sort(defaultCmp);
                }
            }
        }
        return ret;
    };

})();

function indexOf(arr, searchElement, fromIndex) {
    if (!isArray(arr)) {
        throw new TypeError();
    }
    var t = Object(arr);
    var len = t.length >>> 0;
    if (len === 0) {
        return -1;
    }
    var n = 0;
    if (arguments.length > 2) {
        n = Number(arguments[2]);
        if (n !== n) { // shortcut for verifying if it's NaN
            n = 0;
        } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
            n = (n > 0 || -1) * floor(abs(n));
        }
    }
    if (n >= len) {
        return -1;
    }
    var k = n >= 0 ? n : mathMax(len - abs(n), 0);
    for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
            return k;
        }
    }
    return -1;
}

function lastIndexOf(arr, searchElement, fromIndex) {
    if (!isArray(arr)) {
        throw new TypeError();
    }

    var t = Object(arr);
    var len = t.length >>> 0;
    if (len === 0) {
        return -1;
    }

    var n = len;
    if (arguments.length > 2) {
        n = Number(arguments[2]);
        if (n !== n) {
            n = 0;
        } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
            n = (n > 0 || -1) * floor(abs(n));
        }
    }

    var k = n >= 0 ? mathMin(n, len - 1) : len - abs(n);

    for (; k >= 0; k--) {
        if (k in t && t[k] === searchElement) {
            return k;
        }
    }
    return -1;
}

function filter(arr, iterator, scope) {
    if (!isArray(arr) || typeof iterator !== "function") {
        throw new TypeError();
    }

    var t = Object(arr);
    var len = t.length >>> 0;
    var res = [];
    for (var i = 0; i < len; i++) {
        if (i in t) {
            var val = t[i]; // in case fun mutates this
            if (iterator.call(scope, val, i, t)) {
                res.push(val);
            }
        }
    }
    return res;
}

function forEach(arr, iterator, scope) {
    if (!isArray(arr) || typeof iterator !== "function") {
        throw new TypeError();
    }
    for (var i = 0, len = arr.length; i < len; ++i) {
        iterator.call(scope || arr, arr[i], i, arr);
    }
    return arr;
}

function every(arr, iterator, scope) {
    if (!isArray(arr) || typeof iterator !== "function") {
        throw new TypeError();
    }
    var t = Object(arr);
    var len = t.length >>> 0;
    for (var i = 0; i < len; i++) {
        if (i in t && !iterator.call(scope, t[i], i, t)) {
            return false;
        }
    }
    return true;
}

function some(arr, iterator, scope) {
    if (!isArray(arr) || typeof iterator !== "function") {
        throw new TypeError();
    }
    var t = Object(arr);
    var len = t.length >>> 0;
    for (var i = 0; i < len; i++) {
        if (i in t && iterator.call(scope, t[i], i, t)) {
            return true;
        }
    }
    return false;
}

function map(arr, iterator, scope) {
    if (!isArray(arr) || typeof iterator !== "function") {
        throw new TypeError();
    }

    var t = Object(arr);
    var len = t.length >>> 0;
    var res = [];
    for (var i = 0; i < len; i++) {
        if (i in t) {
            res.push(iterator.call(scope, t[i], i, t));
        }
    }
    return res;
}

function reduce(arr, accumulator, curr) {
    if (!isArray(arr) || typeof accumulator !== "function") {
        throw new TypeError();
    }
    var i = 0, l = arr.length >> 0;
    if (arguments.length < 3) {
        if (l === 0) {
            throw new TypeError("Array length is 0 and no second argument");
        }
        curr = arr[0];
        i = 1; // start accumulating at the second element
    } else {
        curr = arguments[2];
    }
    while (i < l) {
        if (i in arr) {
            curr = accumulator.call(undefined, curr, arr[i], i, arr);
        }
        ++i;
    }
    return curr;
}

function reduceRight(arr, accumulator, curr) {
    if (!isArray(arr) || typeof accumulator !== "function") {
        throw new TypeError();
    }

    var t = Object(arr);
    var len = t.length >>> 0;

    // no value to return if no initial value, empty array
    if (len === 0 && arguments.length === 2) {
        throw new TypeError();
    }

    var k = len - 1;
    if (arguments.length >= 3) {
        curr = arguments[2];
    } else {
        do {
            if (k in arr) {
                curr = arr[k--];
                break;
            }
        }
        while (true);
    }
    while (k >= 0) {
        if (k in t) {
            curr = accumulator.call(undefined, curr, t[k], k, t);
        }
        k--;
    }
    return curr;
}


/**
 * converts anything to an array
 *
 * @example
 *  comb.array.toArray({a : "b", b : "c"}) => [["a","b"], ["b","c"]];
 *  comb.array.toArray("a") => ["a"]
 *  comb.array.toArray(["a"]) =>  ["a"];
 *  comb.array.toArray() => [];
 *  comb.array.toArray("a", {a : "b"}) => ["a", ["a", "b"]];
 *
 * @static
 * @memberOf comb.array
 */
function toArray(o) {
    var ret = [];
    if (o != null) {
        var args = argsToArray(arguments);
        if (args.length === 1) {
            if (isArray(o)) {
                ret = o;
            } else if (obj.isHash(o)) {
                for (var i in o) {
                    if (o.hasOwnProperty(i)) {
                        ret.push([i, o[i]]);
                    }
                }
            } else {
                ret.push(o);
            }
        } else {
            forEach(args, function (a) {
                ret = ret.concat(toArray(a));
            });
        }
    }
    return ret;
}

/**
 * Sums all items in an array
 *
 * @example
 *
 *  comb.array.sum([1,2,3]) => 6
 *  comb.array.sum(["A","B","C"]) => "ABC";
 *  var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
 *  comb.array.sum([d1,d2,d3]) => "Wed Dec 31 1969 18:00:01 GMT-0600 (CST)"
 *                              + "Wed Dec 31 1969"  18:00:02 GMT-0600 (CST)"
 *                              + "Wed Dec 31 1969 18:00:03 GMT-0600 (CST)"
 *  comb.array.sum([{},{},{}]) => "[object Object][object Object][object Object]";
 *
 * @param {Number[]} array the array of numbers to sum
 * @static
 * @memberOf comb.array
 */
function sum(array) {
    array = array || [];
    if (array.length) {
        return reduce(array, function (a, b) {
            return a + b;
        });
    } else {
        return 0;
    }
}

/**
 * Averages an array of numbers.
 * @example
 *
 * comb.array.avg([1,2,3]); //2
 *
 * @param {Number[]} array - an array of numbers
 * @return {Number} the average of all the numbers in the array.
 * @throws {Error} if the array is not all numbers.
 * @static
 * @memberOf comb.array
 */
function avg(arr) {
    arr = arr || [];
    if (arr.length) {
        var total = sum(arr);
        if (number.isNumber(total)) {
            return total / arr.length;
        } else {
            throw new Error("Cannot average an array of non numbers.");
        }
    } else {
        return 0;
    }
}

/**
 * Allows the sorting of an array based on a property name instead. This can also
 * act as a sort that does not change the original array.
 *
 * <b>NOTE:</b> this does not change the original array!
 *
 * @example
 * comb.array.sort([{a : 1}, {a : 2}, {a : -2}], "a"); //[{a : -2}, {a : 1}, {a : 2}];
 * @param {Array} arr the array to sort
 * @param {String|Function} cmp the property to sort on. Or a function used to compare.
 * @return {Array} a copy of the original array that is sorted.
 *
 * @static
 * @memberOf comb.array
 */
function sort(arr, cmp) {
    return _sort(arr, cmp);
}

/**
 * Finds that min value of an array. If a second argument is provided and it is a function
 * it will be used as a comparator function. If the second argument is a string then it will be used
 * as a property look up on each item.
 *
 * @example
 * comb.array.min([{a : 1}, {a : 2}, {a : -2}], "a"); //{a : -2}
 * comb.array.min([{a : 1}, {a : 2}, {a : -2}], function(a,b){
 *      return a.a - b.a
 * }); //{a : -2}
 *
 * @param {Array} arr the array to find the min value on
 * @param {String|Function} cmp the property to sort on. Or a function used to compare.
 * @return {*}
 *
 * @static
 * @memberOf comb.array
 */
function min(arr, cmp) {
    return _sort(arr, cmp)[0];
}

/**
 * Finds that max value of an array. If a second argument is provided and it is a function
 * it will be used as a comparator function. If the second argument is a string then it will be used
 * as a property look up on each item.
 *
 * @example
 * comb.array.max([{a : 1}, {a : 2}, {a : -2}], "a"); //{a : 2}
 * comb.array.max([{a : 1}, {a : 2}, {a : -2}], function(a,b){
 *      return a.a - b.a
 * }); //{a : 2}
 *
 * @param arr the array to find the max value on
 * @param {String|Function} cmp the property to sort on. Or a function used to compare.
 * @return {*} the maximum value of the array based on the provided cmp.
 *
 * @static
 * @memberOf comb.array
 */
function max(arr, cmp) {
    return _sort(arr, cmp)[arr.length - 1];
}

/**
 * Finds the difference of the two arrays.
 *
 * @example
 *
 * comb.array.difference([1,2,3], [2,3]); //[1]
 * comb.array.difference(["a","b",3], [3]); //["a","b"]
 *
 * @param {Array} arr1 the array we are subtracting from
 * @param {Array} arr2 the array we are subtracting from arr1
 * @return {*} the difference of the arrays.
 *
 * @static
 * @memberOf comb.array
 */
function difference(arr1, arr2) {
    var ret = arr1, args = flatten(argsToArray(arguments, 1));
    if (isArray(arr1)) {
        ret = filter(arr1, function (a) {
            return indexOf(args, a) === -1;
        });
    }
    return ret;
}


/**
 * Removes duplicates from an array
 *
 * @example
 *
 * comb.array.removeDuplicates([1,1,1]) => [1]
 * comb.array.removeDuplicates([1,2,3,2]) => [1,2,3]
 *
 * @param {Aray} array the array of elements to remove duplicates from
 *
 * @static
 * @memberOf comb.array
 */
function removeDuplicates(arr) {
    if (isArray(arr)) {
        return reduce(arr, function (a, b) {
            if (indexOf(a, b) === -1) {
                return a.concat(b);
            } else {
                return a;
            }
        }, []);
    }
}

/**
 *
 * See {@link comb.array.removeDuplicates}
 *
 * @static
 * @memberOf comb.array
 */
function unique(arr) {
    return removeDuplicates(arr);
}

/**
 * Rotates an array the number of specified positions
 *
 * @example
 * var arr = ["a", "b", "c", "d"];
 * comb.array.rotate(arr)     => ["b", "c", "d", "a"]
 * comb.array.rotate(arr, 2)  => ["c", "d", "a", "b"]);
 * comb.array.rotate(arr, 3)  => ["d", "a", "b", "c"]);
 * comb.array.rotate(arr, 4)  => ["a", "b", "c", "d"]);
 * comb.array.rotate(arr, -1) => ["d", "a", "b", "c"]);
 * comb.array.rotate(arr, -2) => ["c", "d", "a", "b"]);
 * comb.array.rotate(arr, -3) => ["b", "c", "d", "a"]);
 * comb.array.rotate(arr, -4) => ["a", "b", "c", "d"]);
 *
 * @param {Array} array the array of elements to remove duplicates from
 * @param {Number} numberOfTimes the number of times to rotate the array
 *
 * @static
 * @memberOf comb.array
 */
function rotate(arr, numberOfTimes) {
    var ret = arr.slice();
    if (typeof numberOfTimes !== "number") {
        numberOfTimes = 1;
    }
    if (numberOfTimes && isArray(arr)) {
        if (numberOfTimes > 0) {
            ret.push(ret.shift());
            numberOfTimes--;
        } else {
            ret.unshift(ret.pop());
            numberOfTimes++;
        }
        return rotate(ret, numberOfTimes);
    } else {
        return ret;
    }
}

/**
 * Finds all permutations of an array
 *
 * @example
 * var arr = [1,2,3];
 * comb.array.permutations(arr)    => [[ 1, 2, 3 ],[ 1, 3, 2 ],[ 2, 3, 1 ],
 *                                     [ 2, 1, 3 ],[ 3, 1, 2 ],[ 3, 2, 1 ]]
 * comb.array.permutations(arr, 2) => [[ 1, 2],[ 1, 3],[ 2, 3],[ 2, 1],[ 3, 1],[ 3, 2]]
 * comb.array.permutations(arr, 1) => [[1],[2],[3]]
 * comb.array.permutations(arr, 0) => [[]]
 * comb.array.permutations(arr, 4) => []
 *
 * @param {Array} arr the array to permute.
 * @param {Number} length the number of elements to permute.
 * @static
 * @memberOf comb.array
 */
function permutations(arr, length) {
    var ret = [];
    if (isArray(arr)) {
        var copy = arr.slice(0);
        if (typeof length !== "number") {
            length = arr.length;
        }
        if (!length) {
            ret = [
                []
            ];
        } else if (length <= arr.length) {
            ret = reduce(arr, function (a, b, i) {
                var ret;
                if (length > 1) {
                    ret = permute(b, rotate(copy, i).slice(1), length);
                } else {
                    ret = [
                        [b]
                    ];
                }
                return a.concat(ret);
            }, []);
        }
    }
    return ret;
}

/**
 * Zips to arrays together
 *
 * @example
 *  var a = [ 4, 5, 6 ], b = [ 7, 8, 9 ]
 *  comb.array.zip([1], [2], [3]) => [[ 1, 2, 3 ]]);
 *  comb.array.zip([1,2], [2], [3]) => [[ 1, 2, 3 ],[2, null, null]]
 *  comb.array.zip([1,2,3], a, b) => [[1, 4, 7],[2, 5, 8],[3, 6, 9]]
 *  comb.array.zip([1,2], a, b) => [[1, 4, 7],[2, 5, 8]]
 *  comb.array.zip(a, [1,2], [8]) => [[4,1,8],[5,2,null],[6,null,null]]
 *
 * @param arrays variable number of arrays to zip together
 *
 * @static
 * @memberOf comb.array
 */
function zip() {
    var ret = [];
    var arrs = argsToArray(arguments);
    if (arrs.length > 1) {
        var arr1 = arrs.shift();
        if (isArray(arr1)) {
            ret = reduce(arr1, function (a, b, i) {
                var curr = [b];
                for (var j = 0; j < arrs.length; j++) {
                    var currArr = arrs[j];
                    if (isArray(currArr) && !misc.isUndefined(currArr[i])) {
                        curr.push(currArr[i]);
                    } else {
                        curr.push(null);
                    }
                }
                a.push(curr);
                return a;
            }, []);
        }
    }
    return ret;
}

/**
 * Transposes an array of arrays
 * @example
 *
 * comb.array.transpose([[1,2,3], [4,5,6]]) => [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
 * comb.array.transpose([[1,2], [3,4], [5,6]]) => [ [ 1, 3, 5 ], [ 2, 4, 6 ] ]
 * comb.array.transpose([[1], [3,4], [5,6]]) => [[1]])
 *
 * @param [Array[Array[]]] arr Array of arrays
 *
 * @static
 * @memberOf comb.array
 */
function transpose(arr) {
    var ret = [];
    if (isArray(arr) && arr.length) {
        var last;
        forEach(arr, function (a) {
            if (isArray(a) && (!last || a.length === last.length)) {
                forEach(a, function (b, i) {
                    if (!ret[i]) {
                        ret[i] = [];
                    }
                    ret[i].push(b);
                });
                last = a;
            }
        });
    }
    return ret;
}


/**
 * Retrieves values at specified indexes in the array
 *
 * @example
 *
 *  var arr =["a", "b", "c", "d"]
 *   comb.array.valuesAt(arr, 1,2,3) => ["b", "c", "d"];
 *   comb.array.valuesAt(arr, 1,2,3, 4) => ["b", "c", "d", null];
 *   comb.array.valuesAt(arr, 0,3) => ["a", "d"];
 *
 * @param {Array} arr the array to retrieve values from
 * @param {Number} indexes variable number of indexes to retrieve
 *
 * @static
 * @memberOf comb.array
 */
function valuesAt(arr, indexes) {
    var ret = [];
    indexes = argsToArray(arguments);
    arr = indexes.shift();
    var l = arr.length;
    if (isArray(arr) && indexes.length) {
        for (var i = 0; i < indexes.length; i++) {
            ret.push(arr[indexes[i]] || null);
        }
    }
    return ret;
}

/**
 * Union a variable number of arrays together
 *
 * @example
 *
 * comb.array.union(['a','b','c'], ['b','c', 'd']) => ["a", "b", "c", "d"]
 * comb.array.union(["a"], ["b"], ["c"], ["d"], ["c"]) => ["a", "b", "c", "d"]
 *
 * @param arrs variable number of arrays to union
 *
 * @static
 * @memberOf comb.array
 */
function union() {
    var ret = [];
    var arrs = argsToArray(arguments);
    if (arrs.length > 1) {
        ret = removeDuplicates(reduce(arrs, function (a, b) {
            return a.concat(b);
        }, []));
    }
    return ret;
}

/**
 * Finds the intersection of arrays
 * NOTE : this function accepts an arbitrary number of arrays
 *
 * @example
 * comb.array.intersect([1,2], [2,3], [2,3,5]) => [2]
 * comb.array.intersect([1,2,3], [2,3,4,5], [2,3,5]) => [2,3]
 * comb.array.intersect([1,2,3,4], [2,3,4,5], [2,3,4,5]) => [2,3,4]
 * comb.array.intersect([1,2,3,4,5], [1,2,3,4,5], [1,2,3]) => [1,2,3]
 * comb.array.intersect([[1,2,3,4,5],[1,2,3,4,5],[1,2,3]]) => [1,2,3]
 *
 * @param {Array} a
 * @param {Array} b
 *
 * @static
 * @memberOf comb.array
 */
function intersect(a, b) {
    var collect = [], set;
    var args = argsToArray(arguments);
    if (args.length > 1) {
        //assume we are intersections all the lists in the array
        set = args;
    } else {
        set = args[0];
    }
    if (isArray(set)) {
        var x = set.shift();
        collect = reduce(set, function (a, b) {
            return intersection(a, b);
        }, x);
    }
    return removeDuplicates(collect);
}

/**
 * Finds the powerset of an array
 *
 * @example
 *
 *  comb.array.powerSet([1,2]) => [
 *           [],
 *           [ 1 ],
 *           [ 2 ],
 *           [ 1, 2 ]
 *   ]
 *   comb.array.powerSet([1,2,3]) => [
 *           [],
 *           [ 1 ],
 *           [ 2 ],
 *           [ 1, 2 ],
 *           [ 3 ],
 *           [ 1, 3 ],
 *           [ 2, 3 ],
 *           [ 1, 2, 3 ]
 *       ]
 *   comb.array.powerSet([1,2,3,4]) => [
 *           [],
 *           [ 1 ],
 *           [ 2 ],
 *           [ 1, 2 ],
 *           [ 3 ],
 *           [ 1, 3 ],
 *           [ 2, 3 ],
 *           [ 1, 2, 3 ],
 *           [ 4 ],
 *           [ 1, 4 ],
 *           [ 2, 4 ],
 *           [ 1, 2, 4 ],
 *           [ 3, 4 ],
 *           [ 1, 3, 4 ],
 *           [ 2, 3, 4 ],
 *           [ 1, 2, 3, 4 ]
 *       ]
 *
 * @param {Array} arr the array to find the powerset of
 *
 * @static
 * @memberOf comb.array
 */
function powerSet(arr) {
    var ret = [];
    if (isArray(arr) && arr.length) {
        ret = reduce(arr, function (a, b) {
            var ret = map(a, function (c) {
                return c.concat(b);
            });
            return a.concat(ret);
        }, [
            []
        ]);
    }
    return ret;
}

/**
 * Find the cartesian product of two arrays
 *
 * @example
 *
 * comb.array.cartesian([1,2], [2,3]) => [
 *           [1,2],
 *           [1,3],
 *           [2,2],
 *           [2,3]
 *       ]
 * comb.array.cartesian([1,2], [2,3,4]) => [
 *           [1,2],
 *           [1,3],
 *           [1,4] ,
 *           [2,2],
 *           [2,3],
 *           [2,4]
 *       ]
 * comb.array.cartesian([1,2,3], [2,3,4]) => [
 *           [1,2],
 *           [1,3],
 *           [1,4] ,
 *           [2,2],
 *           [2,3],
 *           [2,4] ,
 *           [3,2],
 *           [3,3],
 *           [3,4]
 *       ]
 *
 * @param {Array} a
 * @param {Array} b
 *
 * @static
 * @memberOf comb.array
 */
function cartesian(a, b) {
    var ret = [];
    if (isArray(a) && isArray(b) && a.length && b.length) {
        ret = cross(a[0], b).concat(cartesian(a.slice(1), b));
    }
    return ret;
}

/**
 * Compacts an array removing null or undefined objects from the array.
 *
 * @example
 *
 * var x;
 * comb.array.compact([1,null,null,x,2]) => [1,2]
 * comb.array.compact([1,2]) => [1,2]
 *
 * @param {Array} arr
 * @static
 * @memberOf comb.array
 */
function compact(arr) {
    var ret = [];
    if (isArray(arr) && arr.length) {
        ret = filter(arr, function (item) {
            return !misc.isUndefinedOrNull(item);
        });
    }
    return ret;
}

/**
 * Creates a new array that is the result of the array concated the number of
 * times. If times is not specified or it equals 0 then it defaults to 1.
 * @param {Array} arr the array to multiply.
 * @param {Number} [times=1] the number of times to multiple the array.
 * @return {Array} a new array that is the result of the array multiplied the number of times specified.
 *
 * @static
 * @memberOf comb.array
 */
function multiply(arr, times) {
    times = number.isNumber(times) ? times : 1;
    if (!times) {
        //make sure times is greater than zero if it is zero then dont multiply it
        times = 1;
    }
    arr = toArray(arr || []);
    var ret = [], i = 0;
    while (++i <= times) {
        ret = ret.concat(arr);
    }
    return ret;
}

/**
 * Flatten multiple arrays into a single array
 *
 * @example
 *
 * comb.array.flatten([1,2], [2,3], [3,4]) => [1,2,2,3,3,4]
 * comb.array.flatten([1,"A"], [2,"B"], [3,"C"]) => [1,"A",2,"B",3,"C"]
 *
 * @param array
 *
 * @static
 * @memberOf comb.array
 */
function flatten(arr) {
    var set;
    var args = argsToArray(arguments);
    if (args.length > 1) {
        //assume we are intersections all the lists in the array
        set = args;
    } else {
        set = toArray(arr);
    }
    return reduce(set, function (a, b) {
        return a.concat(b);
    }, []);
}


/**
 * Plucks values from an array. Effectevily the same as using a array.map implementation. However the porperty specified supports
 * a "dot" notation to access nested properties.
 *
 * @example
 *
 *   var arr = [
 *                  {name:{first:"Fred", last:"Jones"}, age:50, roles:["a", "b", "c"]},
 *                  {name:{first:"Bob", last:"Yukon"}, age:40, roles:["b", "c"]},
 *                  {name:{first:"Alice", last:"Palace"}, age:35, roles:["c"]},
 *                  {name:{first:"Johnny", last:"P."}, age:56, roles:[]}
 *             ];
 * console.log(comb.array.pluck(arr, "name.first")); //["Fred", "Bob", "Alice", "Johnny"]
 * console.log(comb.array.pluck(arr, "age")); //[50, 40, 35, 56]
 * console.log(comb.array.pluck(arr, "roles.length")); //[3, 2, 1, 0]
 * console.log(comb.array.pluck(arr, "roles.0")); //["a", "b", "c", undefined]
 *
 * @param {Array} arr the array to pluck values from
 * @param {String} prop the property to retrieve from each item in the array
 * @return {Array} an array containing the plucked properties.
 *
 * @static
 * @memberOf comb.array
 */
function pluck(arr, prop) {
    prop = prop.split(".");
    var result = arr.slice(0);
    forEach(prop, function (prop) {
        var exec = prop.match(/(\w+)\(\)$/);
        result = map(result, function (item) {
            return exec ? item[exec[1]]() : item[prop];
        });
    });
    return result;
}

/**
 * Invokes the method specified in the scope of each item in the array. If you supply addional arguments they will
 * be applied to the function.
 *
 * ```
 *
 * function person(name, age){
 *     return {
 *         getName : function(){
 *             return name;
 *         },
 *         setName : function(newName){
 *             name = newName;
 *         },
 *
 *         getOlder : function(){
 *             age++;
 *             return this;
 *         },
 *
 *         getAge : function(){
 *             return age;
 *         }
 *     };
 * }
 *
 * var arr = [person("Bob", 40), person("Alice", 35), person("Fred", 50), person("Johnny", 56)];
 *
 * console.log(comb.array.invoke(arr, "getName")); //["Bob", "Alice", "Fred", "Johnny"]
 *
 * console.log(comb.array(arr).invoke("getOlder").invoke("getAge")); //[41, 36, 51, 57];
 *
 * ```
 *
 * @param {Array} arr the array to iterate and invoke the functions on
 * @param {String|Function} func the function to invoke, if it is a string then the function will be looked up on the
 * each item in the array and invoked
 * @param [args=null] variable number of arguments to apply to the function
 * @return {Array} the return values of the functions invoked.
 *
 * @static
 * @memberOf comb.array
 */
function invoke(arr, func, args) {
    args = argsToArray(arguments, 2);
    return map(arr, function (item) {
        var exec = isString(func) ? item[func] : func;
        return exec.apply(item, args);
    });
}

/**
 * Paritition an array.
 *
 * ```
 * var arr = [1,2,3,4,5];
 *
 * comb.array.partition(arr, 1); //[[1], [2], [3], [4], [5]]
 * comb.array.partition(arr, 2); //[[1,2], [3,4], [5]]
 * comb.array.partition(arr, 3); //[[1,2,3], [4,5]]
 *
 * comb.array.partition(arr); //[[1, 2, 3, 4, 5]]
 * comb.array.partition(arr, 0); //[[1, 2, 3, 4, 5]]
 *
 *
 *
 * ```
 *
 * @param array
 * @param partitionSize
 * @returns {Array}
 *
 * @static
 * @memberOf comb.array
 */
function partition(array, partitionSize) {
    partitionSize = partitionSize || array.length;
    var ret = [];
    for (var i = 0, l = array.length; i < l; i += partitionSize) {
        ret.push(array.slice(i, i + partitionSize));
    }
    return ret;
}


var comb = exports;

/**
 * @namespace Utilities for working with arrays.
 *
 * The `comb.array` namespace can be used to decorate arrays with additional chainable functionality.
 *
 * ```
 *
 * var arr = comb.array([1,3,2,5,4,6]);
 * console.log(arr.sum()) //21
 * console.log(arr.sort()) //[1,2,3,4,5,6]
 * console.log(arr.min()) //[1]
 * console.log(arr.max()) [6]
 *
 * ```
 *
 * @function
 * @ignoreCode
 */

comb.array = {
    toArray: toArray,
    sum: sum,
    avg: avg,
    sort: sort,
    min: min,
    max: max,
    difference: difference,
    removeDuplicates: removeDuplicates,
    unique: unique,
    rotate: rotate,
    permutations: permutations,
    zip: zip,
    transpose: transpose,
    valuesAt: valuesAt,
    union: union,
    intersect: intersect,
    powerSet: powerSet,
    cartesian: cartesian,
    compact: compact,
    multiply: multiply,
    flatten: flatten,
    pluck: pluck,
    invoke: invoke,
    forEach: forEach,
    map: map,
    filter: filter,
    reduce: reduce,
    reduceRight: reduceRight,
    some: some,
    every: every,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    partition: partition
};







