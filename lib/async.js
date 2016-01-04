"use strict";
/**
 * @ignoreCode
 * @name async
 * @memberOf comb
 * @namespace utilities for working with promises.
 */


var promise = require("./promise.js"),
    when = promise.when,
    serial = promise.serial,
    PromiseList = promise.PromiseList,
    base = require("./base"),
    merge = base.merge,
    isDefined = base.isDefined,
    isNumber = base.isNumber,
    isString = base.isString,
    argsToArray = base.argsToArray,
    array = base.array,
    isArray = base.isArray,
    Promise = promise.Promise,
    isFunction = base.isFunction,
    sum = array.sum,
    avg = array.avg,
    sort = array.sort,
    min = array.min,
    max = array.max,
    map = array.map,
    forEach = array.forEach,
    difference = array.difference,
    removeDuplicates = array.removeDuplicates,
    unique = array.unique,
    rotate = array.rotate,
    permutations = array.permutations,
    zip = array.zip,
    transpose = array.transpose,
    valuesAt = array.valuesAt,
    union = array.union,
    intersect = array.intersect,
    powerSet = array.powerSet,
    cartesian = array.cartesian,
    compact = array.compact,
    multiply = array.multiply,
    flatten = array.flatten,
    invoke = array.invoke;

var nextTick;
if (typeof setImmediate === "function") {
    // In IE10, or use https://github.com/NobleJS/setImmediate
    nextTick = setImmediate;
} else {
    nextTick = function (cb) {
        process.nextTick(cb);
    };
}


function _loopResults(cb, scope, results, index, offset, limit) {
    return function () {
        return when(results.slice(offset, limit + offset).map(function (r, i) {
            var ret = new Promise();
            nextTick(function () {
                try {
                    when(cb.apply(scope || results, [r, i + offset, results])).then(function () {
                        ret.callback.apply(ret, arguments);
                    }, function () {
                        ret.errback.apply(ret, arguments);
                    });
                } catch (e) {
                    ret.errback(e);
                }
            });
            ret.both(function () {
                cb = scope = results = index = offset = limit = null;
            });
            return ret;
        }));
    };
}

function asyncLoop(promise, cb, scope, limit) {
    if (isNumber(scope)) {
        limit = scope;
        scope = null;
    }
    return when(promise).chain(function (results) {
        var loopResults = (isArray(results) ? results : [results]);
        limit = limit || loopResults.length;

        var list = [];
        for (var offset = 0, i = 0, l = loopResults.length; offset < l; offset += limit, i++) {
            list.push(_loopResults(cb, scope, loopResults, i, offset, limit));
        }
        var ret = new Promise();
        serial(list).then(function (loopResults) {
            ret.callback({loopResults: flatten(loopResults) || [], arr: results});
//            loopResults = null;
//            results = null;
        }, function (error) {
            error = compact(error);
            ret.errback(error.length === 1 ? error[0] : error);
//            loopResults = null;
//            results = null;
        });
        return ret;

    });
}

function normalizeResult(result) {
    return isArray(result) ? result : isDefined(result) ? [result] : result;
}


/**
 * Loops through the results of an promise. The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.forEach(asyncArr(), function(){
 *      //do something with it
 * }).then(function(arr){
 *      console.log(arr); //[1,2,3,4,5];
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * var myNewArr = [];
 *
 * comb.async.forEach(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         myNewArr.push([item, index]);
 *         ret.callback();
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //[[1,0], [2,1], [3,2], [4,3], [5,4]]
 * });
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved with the original array.
 * @static
 * @memberof comb.async
 * @name forEach
 */
function asyncForEach(promise, iterator, scope, limit) {
    return asyncArray(asyncLoop(promise, iterator, scope, limit).chain(function (results) {
        return results.arr;
    }));
}


/**
 * Loops through the results of an promise resolving with the return value of the iterator function.
 * The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.map(asyncArr(), function(item){
 *      return item * 2;
 * }).then(function(arr){
 *      console.log(arr); //[2,4,6,8,10];
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * comb.async.map(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         ret.callback(item * 2);
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //[2,4,6,8,10];
 * });
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved with the mapped array.
 * @static
 * @memberof comb.async
 * @name map
 */
function asyncMap(promise, iterator, scope, limit) {
    return asyncArray(asyncLoop(promise, iterator, scope, limit).chain(function (results) {
        return results.loopResults;
    }));
}


/**
 * Loops through the results of an promise resolving with the filtered array.
 * The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.filter(asyncArr(), function(item){
 *      return item % 2;
 * }).then(function(arr){
 *      console.log(arr); //[1,3,5];
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * comb.async.filter(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         ret.callback(item % 2);
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //[1,3,5];
 * })
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved with the filtered array.
 * @static
 * @memberof comb.async
 * @name filter
 */
function asyncFilter(promise, iterator, scope, limit) {
    return asyncArray(asyncLoop(promise, iterator, scope, limit).chain(function (results) {
        var loopResults = results.loopResults, resultArr = results.arr;
        return (isArray(resultArr) ? resultArr : [resultArr]).filter(function (res, i) {
            return loopResults[i];
        });
    }));
}


/**
 * Loops through the results of an promise resolving with true if every item passed, false otherwise.
 * The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.every(asyncArr(), function(item){
 *      return item <= 5;
 * }).then(function(every){
 *      console.log(every); //true
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * comb.async.every(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         ret.callback(item == 1);
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //false;
 * })
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved true if every item passed false otherwise.
 * @static
 * @memberof comb.async
 * @name every
 */
function asyncEvery(promise, iterator, scope, limit) {
    return asyncArray(asyncLoop(promise, iterator, scope, limit).chain(function (results) {
        return results.loopResults.every(function (res) {
            return !!res;
        });
    }));
}

/**
 * Loops through the results of an promise resolving with true if some items passed, false otherwise.
 * The promise can return an array or just a single item.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.some(asyncArr(), function(item){
 *      return item == 1;
 * }).then(function(every){
 *      console.log(every); //true
 * });
 *
 * ```
 *
 * You may also return a promise from the iterator block.
 *
 * ```
 * comb.async.some(asyncArr(), function(item, index){
 *     var ret = new comb.Promise();
 *     process.nextTick(function(){
 *         ret.callback(item > 5);
 *     });
 *     return ret.promise();
 * }).then(function(){
 *     console.log(myNewArr) //false;
 * })
 * ```
 *
 *
 * @param {comb.Promise|Array} promise the promise or array to loop through
 * @param {Function} iterator a function to invoke for each item
 * @param [scope] optional scope to execute the function in.
 * @return {comb.Promise} a promise that is resolved with true if some items passed false otherwise.
 * @static
 * @memberof comb.async
 * @name some
 */
function asyncSome(promise, iterator, scope, limit) {
    return asyncArray(asyncLoop(promise, iterator, scope, limit).chain(function (results) {
        return results.loopResults.some(function (res) {
            return !!res;
        });
    }));
}

/**
 * Zips results from promises into an array.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.zip(asyncArr(), asyncArr()).then(function(zipped){
 *      console.log(zipped); //[[1,1],[2,2],[3,3], [4,4], [5,5]]
 * });
 *
 * comb.async.array(asyncArr()).zip(asyncArr()).then(function(zipped){
 *      console.log(zipped); //[[1,1],[2,2],[3,3], [4,4], [5,5]]
 * });
 *
 * ```
 *
 *
 * @return {comb.Promise} an array with all the arrays zipped together.
 * @static
 * @memberof comb.async
 * @name zip
 */
function asyncZip() {
    return asyncArray(when.apply(null, argsToArray(arguments)).chain(function (result) {
        return zip.apply(array, normalizeResult(result).map(function (arg) {
            return isArray(arg) ? arg : [arg];
        }));
    }));
}

/**
 * Async version of {@link comb.array.avg}.
 *
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).avg().then(function(avg){
 *     console.log(avg); //3
 * })
 *
 * comb.async.avg(asyncArr()).then(function(avg){
 *     console.log(avg); //3
 * })
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name avg
 */
function asyncAvg(avgPromise) {
    return when(avgPromise).chain(function (result) {
        return avg.call(array, normalizeResult(result));
    });
}

/**
 * Async version of {@link comb.array.cartesian}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).cartesian([1,2,3]).then(function(avg){
 *     console.log(avg); //[ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
 * })
 *
 *  comb.async.cartesian(asyncArr(), [1,2,3]).then(function(avg){
 *     console.log(avg); //[ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
 * })
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name cartesian
 */
function asyncCartesian() {
    return asyncArray(when.apply(null, argsToArray(arguments)).chain(function (result) {
        return cartesian.apply(array, normalizeResult(result).map(function (arg) {
            return isArray(arg) ? arg : [arg];
        }));
    }));
}


/**
 * Async version of {@link comb.array.compact}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,null,2,null,3,null,4,null,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).compact().then(function(compacted){
 *     console.log(compacted); //[1,2,3,4,5]
 * })
 *
 * comb.async.compact(asyncArr()).then(function(compacted){
 *     console.log(compacted); //[1,2,3,4,5]
 * })
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name compact
 */
function asyncCompact(arr) {
    return asyncArray(when(arr).chain(function (result) {
        return compact.call(array, normalizeResult(result));
    }));
}


/**
 * Async version of {@link comb.array.difference}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).difference([3,4,5]).then(function(diff){
 *     console.log(diff); //[1,2]
 * })
 *
 * comb.async.difference(asyncArr(), [3,4,5]).then(function(diff){
 *     console.log(diff); //[1,2]
 * })
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name difference
 */
function asyncDifference() {
    return asyncArray(when.apply(null, argsToArray(arguments)).chain(function (result) {
        return difference.apply(array, normalizeResult(result).map(function (arg) {
            return isArray(arg) ? arg : [arg];
        }));
    }));
}

/**
 * Async version of {@link comb.array.flatten}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [[1],[2],[3],[4],[5]]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).flatten().then(function(flat){
 *     console.log(flat); //[1,2,3,4,5]
 * });
 *
 * comb.async.flatten(asyncArr()).then(function(flat){
 *     console.log(flat); //[1,2,3,4,5]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name flatten
 */
function asyncFlatten() {
    return asyncArray(when.apply(null, argsToArray(arguments)).chain(function (result) {
        return flatten.apply(array, normalizeResult(result).map(function (arg) {
            return isArray(arg) ? arg : [arg];
        }));
    }));
}


/**
 * Async version of {@link comb.array.intersect}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).intersect([3,4], [3]).then(function(intersection){
 *     console.log(intersection); //[3]
 * });
 *
 * comb.async.intersect(asyncArr(), [3,4]).then(function(intersection){
 *     console.log(intersection); //[3,4]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name intersect
 */
function asyncIntersect() {
    return asyncArray(when.apply(null, argsToArray(arguments)).chain(function (result) {
        return intersect.apply(array, normalizeResult(result).map(function (arg) {
            return isArray(arg) ? arg : [arg];
        }));
    }));
}

/**
 * Async version of {@link comb.array.max}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).max().then(function(max){
 *     console.log(max); //5
 * })
 *
 * comb.async.max(asyncArr()).then(function(max){
 *     console.log(max); //5
 * })
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name max
 */
function asyncMax() {
    var args = argsToArray(arguments), last = args.pop(), cmp = null;
    if (isFunction(last) || isString(last)) {
        cmp = last;
    } else {
        args.push(last);
    }
    return when.apply(null, args).chain(function (result) {
        return max.call(array, normalizeResult(result), cmp);
    });
}


/**
 * Async version of {@link comb.array.min}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).min().then(function(min){
 *     console.log(min) //3
 * });
 *
 * comb.async.min(asyncArr()).then(function(min){
 *     console.log(min) //3
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name min
 */
function asyncMin() {
    var args = argsToArray(arguments), last = args.pop(), cmp = null;
    if (isFunction(last) || isString(last)) {
        cmp = last;
    } else {
        args.push(last);
    }
    return when.apply(null, args).chain(function (result) {
        return min.call(array, normalizeResult(result), cmp);
    });
}

/**
 * Async version of {@link comb.array.sort}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,3,2,5,4]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).sort().then(function(sorted){
 *    console.log(sorted); //[1,2,3,4,5]
 * });
 *
 * comb.async.sort(asyncArr()).then(function(sorted){
 *    console.log(sorted); //[1,2,3,4,5]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name sort
 */
function asyncSort() {
    var args = argsToArray(arguments), last = args.pop(), cmp = null;
    if (isFunction(last) || isString(last)) {
        cmp = last;
    } else {
        args.push(last);
    }
    return asyncArray(when.apply(null, args).chain(function (result) {
        return sort.call(array, normalizeResult(result), cmp);
    }));
}

/**
 * Async version of {@link comb.array.multiply}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).multiply(2).then(function(mult){
 *    console.log(mult); //[1,2,3,4,5,1,2,3,4,5]
 * });
 *
 * comb.async.multiply(asyncArr(),2 ).then(function(mult){
 *    console.log(mult); //[1,2,3,4,5,1,2,3,4,5]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name multiply
 */
function asyncMultiply() {
    var args = argsToArray(arguments), last = args.pop(), times = null;
    if (isNumber(last)) {
        times = last;
    } else {
        args.push(last);
    }
    return asyncArray(when.apply(null, args).chain(function (result) {
        return multiply.call(array, normalizeResult(result), times);
    }));
}

/**
 * Async version of {@link comb.array.permutations}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).permutations().then(function(permutations){
 *      console.log(permutations) //[ [ 1, 2, 3 ],
 *                                //  [ 1, 3, 2 ],
 *                                //  [ 2, 3, 1 ],
 *                                //  [ 2, 1, 3 ],
 *                                //  [ 3, 1, 2 ],
 *                                //  [ 3, 2, 1 ] ]
 * });
 *
 * comb.async.permutations(asyncArr()).then(function(permutations){
 *      console.log(permutations) //[ [ 1, 2, 3 ],
 *                                //  [ 1, 3, 2 ],
 *                                //  [ 2, 3, 1 ],
 *                                //  [ 2, 1, 3 ],
 *                                //  [ 3, 1, 2 ],
 *                                //  [ 3, 2, 1 ] ]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name permutations
 */
function asyncPermutations() {
    var args = argsToArray(arguments), last = args.pop(), times = null;
    if (isNumber(last)) {
        times = last;
    } else {
        args.push(last);
    }
    return asyncArray(when.apply(null, args).chain(function (result) {
        return permutations.call(array, normalizeResult(result), times);
    }));
}


/**
 * Async version of {@link comb.array.powerSet}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).powerSet().then(function(set){
 *      console.log(set); //[ [], [ 1 ], [ 2 ], [ 1, 2 ], [ 3 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ]
 * });
 *
 * comb.async.powerSet(asyncArr()).then(function(set){
 *      console.log(set); //[ [], [ 1 ], [ 2 ], [ 1, 2 ], [ 3 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name powerSet
 */
function asyncPowerSet(arr) {
    return asyncArray(when(arr).chain(function (result) {
        return powerSet.call(array, normalizeResult(result));
    }));
}


/**
 * Async version of {@link comb.array.removeDuplicates}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,2,3,3,3,4,4,4]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).removeDuplicates().then(function(unique){
 *      console.log(unique); // [1, 2, 3, 4]
 * });
 *
 * comb.async.removeDuplicates(asyncArray()).then(function(unique){
 *      console.log(unique); // [1, 2, 3, 4]
 * });
 * ```
 *
 * @static
 * @memberof comb.async
 * @name removeDuplicates
 */
function asyncRemoveDuplicates(arr) {
    return asyncArray(when(arr).chain(function (result) {
        return removeDuplicates.call(array, normalizeResult(result));
    }));
}


/**
 * Async version of {@link comb.array.rotate}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).rotate(2).then(function(rotated){
 *     console.log(rotated); // [ 3, 4, 5, 1, 2 ]
 * });
 *
 * comb.async.rotate(asyncArr(), 2).then(function(rotated){
 *     console.log(rotated); // [ 3, 4, 5, 1, 2 ]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name rotate
 */
function asyncRotate() {
    var args = argsToArray(arguments), last = args.pop(), times = null;
    if (isNumber(last)) {
        times = last;
    } else {
        args.push(last);
    }
    return asyncArray(when.apply(null, args).chain(function (result) {
        return rotate.call(array, normalizeResult(result), times);
    }));
}


/**
 * Async version of {@link comb.array.sum}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).sum().then(function(sum){
 *     console.log(sum) //15
 * })
 *
 * comb.async.sum(asyncArr()).then(function(sum){
 *     console.log(sum) //15
 * })
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name sum
 */
function asyncSum(arr) {
    return when(arr).chain(function (result) {
        return sum.call(array, normalizeResult(result));
    });
}


/**
 * Async version of {@link comb.array.transpose}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [[1, 2, 3], [4, 5, 6]]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).transpose().then(function(transposed){
 *     console.log(transposed); //[ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
 * });
 *
 * comb.async.transpose(asyncArr()).then(function(transposed){
 *     console.log(transposed); //[ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name transpose
 */
function asyncTranspose(arr) {
    return asyncArray(when(arr).chain(function (result) {
        return transpose.call(array, normalizeResult(result));
    }));
}


/**
 * Async version of {@link comb.array.union}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).union([3],[7], [9,10]).then(function(union){
 *      console.log(union); //[1,2,3,4,5,7,9,10]
 * });
 *
 * comb.async.union(asyncArr(), [3],[7], [9,10]).then(function(union){
 *      console.log(union); //[1,2,3,4,5,7,9,10]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name union
 */
function asyncUnion() {
    return asyncArray(when.apply(null, argsToArray(arguments)).chain(function (result) {
        return union.apply(array, (normalizeResult(result)).map(function (arg) {
            return isArray(arg) ? arg : [arg];
        }));
    }));
}


/**
 * Async version of {@link comb.array.unique}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,2,3,3,4,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).unique().then(function(unique){
 *     console.log(unique); //[1,2,3,4,5]
 * });
 *
 * comb.async.unique(asyncArr()).then(function(unique){
 *     console.log(unique); //[1,2,3,4,5]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name unique
 */
function asyncUnique() {
    return asyncRemoveDuplicates.apply(null, arguments);
}


/**
 * Async version of {@link comb.array.valuesAt}.
 *
 * ```
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * comb.async.array(asyncArr()).valuesAt(2,3,4).then(function(values){
 *     console.log(values); //[3,4,5]
 * });
 *
 * comb.async.valuesAt(asyncArr(), 2,3,4).then(function(values){
 *     console.log(values); //[3,4,5]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name valuesAt
 */
function asyncValuesAt(arrPromise) {
    var args = argsToArray(arguments, 1);
    return asyncArray(when(arrPromise).chain(function (result) {
        return when(valuesAt.apply(array, [normalizeResult(result)].concat(args)));
    }));
}

/**
 * Async version of {@link comb.array.pluck}.
 *
 * ```
 * var when = comb.when,
 *     array = comb.async.array;
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [
 *                                              {name:{first:when("Fred"), last:"Jones"}, age:when(50), roles:["a", "b", "c"]},
 *                                              {name:{first:"Bob", last:"Yukon"}, age:40, roles:when(["b", "c"])},
 *                                              {name:{first:"Alice", last:"Palace"}, age:when(35), roles:["c"]},
 *                                              {name:{first:when("Johnny"), last:"P."}, age:56, roles:when([])}
 *                                             ]);
 *     return ret.promise;
 * }
 *
 * array(asyncArr()).pluck("name.first").then(function(values){
 *     console.log(values); //["Fred", "Bob", "Alice", "Johnny"]
 * });
 *
 * pluck(asyncArr(), "age").then(function(values){
 *     console.log(values); //[50, 40, 35, 56]
 * });
 *
 * ```
 *
 * @static
 * @memberof comb.async
 * @name pluck
 */
function asyncPluck(arrPromise, property) {
    var args = argsToArray(arguments, 1);
    return asyncArray(when(arrPromise).chain(function (result) {
        var prop = property.split(".");
        result = normalizeResult(result);
        return asyncArray(prop).forEach(function (prop) {
            var exec = prop.match(/(\w+)\(\)$/);
            return asyncArray(result).map(function (item) {
                return exec ? item[exec[1]]() : item[prop];
            }, 1).chain(function (res) {
                    result = res;
                });
        }, 1).chain(function () {
                return result;
            });
    }));
}

/**
 *
 * Async version of {@link comb.array.invoke}.
 *
 * ```
 * function person(name, age) {
 *      return {
 *          getName:function () {
 *              return when(name);
 *          },
 *          getOlder:function () {
 *              age++;
 *              return when(this);
 *          },
 *          getAge:function () {
 *              return when(age);
 *          }
 *      };
 * }
 *
 * var arr = [when(person("Bob", 40)), when(person("Alice", 35)), when(person("Fred", 50)), when(person("Johnny", 56))];
 * console.log(comb.async.invoke(arr, "getName")); //["Bob", "Alice", "Fred", "Johnny"]
 * console.log(array(arr).invoke("getOlder").pluck("getAge")) //[41, 36, 51, 57]
 * ```
 * @static
 * @memberOf comb.async
 * @name invoke
 */
function asyncInvoke(arrPromise) {
    var args = argsToArray(arguments, 1);
    return asyncArray(when(arrPromise).chain(function (result) {
        return when(invoke.apply(array, [normalizeResult(result)].concat(args)));
    }));
}

var asyncExports = (exports.async = {
    array: asyncArray,
    forEach: asyncForEach,
    map: asyncMap,
    filter: asyncFilter,
    every: asyncEvery,
    some: asyncSome,
    zip: asyncZip,
    sum: asyncSum,
    avg: asyncAvg,
    sort: asyncSort,
    min: asyncMin,
    max: asyncMax,
    difference: asyncDifference,
    removeDuplicates: asyncRemoveDuplicates,
    unique: asyncUnique,
    rotate: asyncRotate,
    permutations: asyncPermutations,
    transpose: asyncTranspose,
    valuesAt: asyncValuesAt,
    union: asyncUnion,
    intersect: asyncIntersect,
    powerSet: asyncPowerSet,
    cartesian: asyncCartesian,
    compact: asyncCompact,
    multiply: asyncMultiply,
    flatten: asyncFlatten,
    pluck: asyncPluck,
    invoke: asyncInvoke
});

var methods = ["forEach", "map", "filter", "some", "every", "zip", "sum", "avg", "sort", "min", "max", "difference", "removeDuplicates", "unique", "rotate",
    "permutations", "transpose", "valuesAt", "union", "intersect", "powerSet", "cartesian", "compact",
    "multiply", "flatten", "pluck", "invoke"];


/**
 * Exposes array methods on a {@link comb.Promise}.
 *
 * The methods added are.
 *
 * * forEach : See {@link comb.async.forEach}.
 * * map : See {@link comb.async.map}.
 * * filter : See {@link comb.async.filter}.
 * * some : See {@link comb.async.some}.
 * * every : See {@link comb.async.every}.
 * * zip : See {@link comb.async.zip}.
 * * sum : See {@link comb.async.sum}.
 * * avg : See {@link comb.async.avg}.
 * * sort : See {@link comb.async.sort}.
 * * min : See {@link comb.async.min}.
 * * max : See {@link comb.async.max}.
 * * difference : See {@link comb.async.difference}.
 * * removeDuplicates : See {@link comb.async.removeDuplicates}.
 * * unique : See {@link comb.async.unique}.
 * * rotate : See {@link comb.async.rotate}.
 * * permutations : See {@link comb.async.permutations}.
 * * transpose : See {@link comb.async.transpose}.
 * * valuesAt : See {@link comb.async.valuesAt}.
 * * union : See {@link comb.async.union}.
 * * intersect : See {@link comb.async.intersect}.
 * * powerSet : See {@link comb.async.powerSet}.
 * * cartesian : See {@link comb.async.cartesian}.
 * * compact : See {@link comb.async.compact}.
 * * multiply : See {@link comb.async.multiply}.
 * * flatten : See {@link comb.async.flatten}.
 * * pluck : See {@link comb.async.pluck}.
 * * invoke : See {@link comb.async.invoke}.
 *
 * When using this method each of the methods are chainable so you can combine actions.
 *
 * ```
 * var array = comb.async.array;
 * function asyncArr(){
 *     var ret = new comb.Promise();
 *     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);
 *     return ret.promise;
 * }
 *
 * array(asyncArr())
 *      .map(function (num, i) {
 *          return num * (i + 1);
 *      }).filter(function (num) {
 *          return num % 2;
 *      }).avg().then(function(avg){
 *          console.log(avg); //11.666666666666666
 *      });
 * ```
 * @param {comb.Promise|[]} p the promise or array to use.
 *
 * @static
 * @memberof comb.async
 * @name array
 */
function asyncArray(p) {
    var ret;
    if (!p || !p.__isArrayAsync__) {
        ret = merge(when(p), {
            promise: function () {
                return asyncArray(this);
            }
        });
        forEach(methods, function (m) {
            var func = asyncExports[m];
            ret[m] = function () {
                var args = argsToArray(arguments), mRet = new Promise();
                nextTick(function () {
                    func.apply(null, [ret].concat(args)).then(mRet);
                });
                return asyncArray(mRet);
            };
        });
        ret.__isArrayAsync__ = true;
    } else {
        ret = p;
    }
    p = null;
    return ret;
}





