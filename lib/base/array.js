var obj = require("./object");

/**
 * Converts an arguments object to an array
 *
 * @param {Arguments} args the arguments object to convert
 *
 * @returns {Array} array version of the arguments object
 */
var argsToArray = exports.argsToArray = function(args) {
    return Array.prototype.slice.call(args);
};

var isArray = exports.isArray = function(obj) {
    return obj && obj instanceof Array;
};

var cross = function(num, cross) {
    var ret = cross.reduceRight(function(a, b) {
        if (!isArray(b)) b = [b];
        b.unshift(num)
        a.unshift(b);
        return a;
    }, []);
    return ret;
};

var permute = function(num, cross, length) {
    var ret = [];
    for (var i = 0; i < cross.length; i++) {
        ret.push([num].concat(array.rotate(cross, i)).slice(0, length));
    }
    return ret;
};


var intersection = function(a, b) {
    var ret = [];
    if (isArray(a) && isArray(b)) {
        if (a.length && b.length) {
            var aOne = a[0];
            if (b.indexOf(aOne) != -1) {
                ret = [aOne].concat(intersection(a.slice(1), b));
            } else {
                ret = intersection(a.slice(1), b);
            }
        }
    }

    return ret;
};

var array = exports.array = {
    sum : function(array) {
        return array.reduce(function(a, b) {
            return a + b
        });
    },

    removeDuplicates : function(arr) {
        if (isArray(arr)) {
            var ret = arr.reduce(function(a, b) {
                if (a.indexOf(b) == -1) {
                    return a.concat(b);
                } else {
                    return a;
                }
            }, []);
            return ret;
        }
    },

    rotate : function(arr, numberOfTimes) {
        var ret = arr.slice();
        if (typeof numberOfTimes != "number") {
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
            return array.rotate(ret, numberOfTimes);
        } else {
            return ret;
        }
    },

    permutations : function(arr, length) {
        var ret = [];
        if (isArray(arr)) {
            var copy = arr.slice(0);
            if (typeof length != "number") {
                length = arr.length;
            }
            if (!length) {
                ret = [
                    []
                ];
            } else if (length <= arr.length) {
                ret = arr.reduce(function(a, b, i) {
                    if (length > 1) {
                        var ret = permute(b, array.rotate(copy, i).slice(1), length);
                    } else {
                        ret = [
                            [b]
                        ];
                    }
                    return a.concat(ret);
                }, [])
            }
        }
        return ret;
    },

    zip : function() {
        var ret = [];
        var arrs = argsToArray(arguments);
        if (arrs.length > 1) {
            arr1 = arrs.shift();
            if (isArray(arr1)) {
                ret = arr1.reduce(function(a, b, i) {
                    var curr = [b];
                    for (var j = 0; j < arrs.length; j++) {
                        var currArr = arrs[j];
                        if (isArray(currArr) && currArr[i]) {
                            curr.push(currArr[i]);
                        } else {
                            curr.push(null);
                        }
                    }
                    a.push(curr)
                    return a;
                }, []);
            }
        }
        return ret;
    },

    transpose : function(arr) {
        var ret = [];
        if (isArray(arr) && arr.length) {
            var last;
            arr.forEach(function(a) {
                if (isArray(a) && (!last || a.length == last.length)) {
                    a.forEach(function(b, i) {
                        !ret[i] && (ret[i] = []);
                        ret[i].push(b);
                    });
                    last = a;
                }
            });
        }
        return ret;
    },

    valuesAt : function() {
        var ret = [];
        var indexes = argsToArray(arguments);
        var arr = indexes.shift(), l = arr.length;
        if (isArray(arr) && indexes.length) {
            for (var i = 0; i < indexes.length; i++) {
                ret.push(arr[indexes[i]] || null);
            }
        }
        return ret;
    },

    union : function() {
        var ret = [];
        var arrs = argsToArray(arguments);
        if (arrs.length > 1) {
            ret = array.removeDuplicates(arrs.reduce(function(a, b) {
                return a.concat(b);
            }, []));
        }
        return ret;
    },

    intersect : function(a, b) {
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
            var collect = set.reduce(function(a, b) {
                return intersection(a, b);
            }, x);
        }
        return array.removeDuplicates(collect);
    },

    powerSet : function(arr) {
        var ret = [];
        if (isArray(arr) && arr.length) {
            var ret = arr.reduce(function(a, b) {
                var ret = a.map(function(c) {
                    return c.concat(b);
                })
                return a.concat(ret);
            }, [
                []
            ]);
        }
        return ret;
    },

    cartesian : function(a, b) {
        var ret = [];
        if (isArray(a) && isArray(b) && a.length && b.length)
            ret = cross(a[0], b).concat(array.cartesian(a.slice(1), b));
        return ret;
    },

    flatten : function(array) {
        var set;
        var args = argsToArray(arguments);
        if (args.length > 1) {
            //assume we are intersections all the lists in the array
            set = args;
        } else {
            set = array;
        }
        return set.reduce(function(a, b) {
            return a.concat(b);
        }, []);
    }
};