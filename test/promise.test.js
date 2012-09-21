"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Promise = comb.Promise,
    PromiseList = comb.PromiseList;


it.describe("The promise API",function (it) {

    it.describe("comb.Promise", function (it) {

        it.describe("Promise#addCallback and callback", function (it) {
            it.should("callback", function (next) {
                var promise = new Promise();
                promise.addCallback(function (res) {
                    assert.equal(res, "hello");
                    next();
                });

                process.nextTick(comb.hitch(promise, "callback", "hello"));
            });

            it.should("callback after callback has already been called", function (next) {
                var promise = new Promise();
                promise.callback("hello");
                promise.addCallback(function (res) {
                    assert.equal(res, "hello");
                    next();
                });

            });

            it.should("throw an error when callback is called twice", function () {
                var promise = new Promise();
                promise.callback("hello");
                assert.throws(function () {
                    promise.callback();
                });

            });
        });

        it.describe("Promise#addErrback and errback", function (it) {

            it.should("errback when using addErback and errback is called", function (next) {
                var promise = new Promise();
                promise.addErrback(function (res) {
                    assert.equal(res, "error");
                    next();
                });
                process.nextTick(comb.hitch(promise, "errback", "error"));
            });

            it.should("errback when after errback has already been called", function (next) {
                var promise = new Promise();
                promise.errback("error");
                promise.addErrback(function (res) {
                    assert.equal(res, "error");
                    next();
                });
            });

            it.should("throw an error if errback is called twice", function () {
                var promise = new Promise();
                promise.errback("error");
                assert.throws(function () {
                    promise.errback();
                });
            });

        });

        it.describe("Promise#both", function (it) {

            it.should("callback when using both and callback is called", function (next) {
                var promise = new Promise();
                promise.both(function (res) {
                    assert.equal(res, "callback");
                    next();
                });
                process.nextTick(comb.hitch(promise, "callback", "callback"), 1000);
            });

            it.should("callback when using both and errback is called", function (next) {
                var promise = new Promise();
                promise.both(function (res) {
                    assert.equal(res, "errback");
                    next();
                });
                process.nextTick(comb.hitch(promise, "errback", "errback"), 1000);
            });

            it.should("callback when using both and callback is called", function (next) {
                var promise = new Promise();
                promise.callback("callback");
                promise.both(function (res) {
                    assert.equal(res, "callback");
                    next();
                });
            });

            it.should("callback when using both and errback is called", function (next) {
                var promise = new Promise();
                promise.errback("errback");
                promise.both(function (res) {
                    assert.equal(res, "errback");
                    next();
                });
            });

            it.should("callback when using both with a promise and callback is called", function (next) {
                var promise = new Promise();
                var bothPromise = new Promise().addCallback(function (res) {
                    assert.equal(res, "callback");
                    next();
                });
                promise.callback("callback");
                promise.both(bothPromise);
            });

            it.should("callback when using both with a promise and errback is called", function (next) {
                var promise = new Promise();
                var bothPromise = new Promise().addCallback(function (res) {
                    assert.equal(res, "errback");
                    next();
                });
                promise.errback("errback");
                promise.both(bothPromise);
            });

        });


        it.describe("Promise#then", function (it) {

            it.should("callback when using then and callback is called", function (next) {
                var promise = new Promise();
                promise.then(function (res) {
                    assert.equal(res, "callback");
                    next();
                }, next);
                process.nextTick(comb.hitch(promise, "callback", "callback"), 1000);
            });

            it.should("errback when using then and errback is called", function (next) {
                var promise = new Promise();
                promise.then(next, function (res) {
                    assert.equal(res, "errback");
                    next();
                });
                process.nextTick(comb.hitch(promise, "errback", "errback"), 1000);
            });

            it.should("callback when using then with a promise", function (next) {
                var promise = new Promise();
                var thenPromise = new Promise().then(function (res) {
                    assert.equal(res, "callback");
                    next();
                }, next);
                promise.then(thenPromise);

                process.nextTick(comb.hitch(promise, "callback", "callback"), 1000);
            });

            it.should("errback when using then with a promise and errback is called", function (next) {
                var promise = new Promise();
                var thenPromise = new Promise().then(next, function (res) {
                    assert.equal(res, "errback");
                    next();
                });
                promise.then(thenPromise);
                process.nextTick(comb.hitch(promise, "errback", "errback"), 1000);
            });


            it.should("callback when using then with a promise and callback is already called", function (next) {
                var promise = new Promise();
                promise.callback("callback");
                promise.then(function (res) {
                    assert.equal(res, "callback");
                    next();
                }, next);
            });

            it.should("errback when using then and errback is called", function (next) {
                var promise = new Promise();
                promise.errback("errback");
                promise.then(next, function (res) {
                    assert.equal(res, "errback");
                    next();
                });
            });
        });

        it.describe("Promise#classic", function (it) {

            it.should("callback when using classic and callback is called", function (next) {
                var promise = new Promise();
                promise.classic(function (err, res) {
                    assert.isNull(err);
                    assert.equal(res, "callback");
                    next();
                });
                process.nextTick(comb.hitch(promise, "callback", "callback"), 1000);
            });

            it.should("errback when using classic and errback is called", function (next) {
                var promise = new Promise();
                promise.classic(function (err, res) {
                    assert.equal(err, "errback");
                    next();
                });
                process.nextTick(comb.hitch(promise, "errback", "errback"), 1000);
            });

        });

        it.describe("Promise#chain", function (it) {

            it.should("callback after all are done ", function (next) {
                var promise = new Promise();
                promise.chain(
                    function (res) {
                        var promise2 = new Promise();
                        process.nextTick(comb.hitch(promise2, "callback", res + " world"), 1000);
                        return promise2;
                    }, next).chain(
                    function (res) {
                        var promise3 = new Promise();
                        process.nextTick(comb.hitch(promise3, "callback", res + "!"), 1000);
                        return promise3;
                    }, next).then(function (res) {
                        assert.equal(res, "hello world!");
                        next();
                    }, next);
                process.nextTick(comb.hitch(promise, "callback", "hello"), 1000);
            });

            it.should("work with sync actions also", function (next) {
                var promise = new Promise();
                promise.chain(
                    function (res) {
                        return res + " world";
                    }, next).chain(
                    function (res) {
                        return res + "!";
                    }, next).then(function (res) {
                        assert.equal(res, "hello world!");
                        next();
                    }, next);
                process.nextTick(comb.hitch(promise, "callback", "hello"), 1000);
            });

            it.should("work with values", function (next) {
                var promise = new Promise();
                promise
                    .chain("hello")
                    .chain(function (res) {
                        return res + "!";
                    }).then(function (res) {
                        assert.equal(res, "hello!");
                    }).classic(next);
                process.nextTick(comb.hitch(promise, "callback", "hello"), 1000);
            });

            it.should("errback if there is an error ", function (next) {
                var promise = new Promise();
                promise.chain(
                    function (res) {
                        var promise2 = new Promise();
                        process.nextTick(comb.hitch(promise2, "callback", res + " world"), 1000);
                        return promise2;
                    }, comb.hitch(this, 'callback', null)).chain(
                    function () {
                        var promise3 = new Promise();
                        process.nextTick(comb.hitch(promise3, "errback", "error"), 1000);
                        return promise3;
                    }, comb.hitch(this, "callback"))
                    .then(next, function (res) {
                        assert.equal(res, "error");
                        next();
                    });
                process.nextTick(comb.hitch(promise, "callback", "hello"));

            });

            it.should("propagate errors if no errback ", function (next) {
                var promise = new Promise();
                promise.chain(
                    function (res) {
                        var promise2 = new Promise();
                        process.nextTick(comb.hitch(promise2, "callback", res + " world"), 1000);
                        return promise2;
                    }).chain(
                    function (res) {
                        var promise3 = new Promise();
                        process.nextTick(comb.hitch(promise3, "errback", "error in 3"), 1000);
                        return promise3;
                    }).chain(
                    function (res) {
                        var promise4 = new Promise();
                        process.nextTick(comb.hitch(promise4, "callback", res + " not called"));
                        return promise4;
                    })
                    .then(next, function (res) {
                        assert.equal(res, "error in 3");
                        next();
                    });
                process.nextTick(comb.hitch(promise, "callback", "hello"));

            });

        });

        it.describe("Promise#chainBoth", function (it) {

            it.should("callback after all are done ", function (next) {
                var promise = new Promise();
                promise.chainBoth(
                    function (res) {
                        var promise2 = new Promise();
                        process.nextTick(comb.hitch(promise2, "callback", res + " world"));
                        return promise2;
                    }, next).chainBoth(
                    function (res) {
                        var promise3 = new Promise();
                        process.nextTick(comb.hitch(promise3, "callback", res + "!"));
                        return promise3;
                    }, next).then(function (res) {
                        assert.equal(res, "hello world!");
                        next();
                    }, next);
                process.nextTick(comb.hitch(promise, "callback", "hello"));

            });

            it.should("callback after all are done with sync actions", function (next) {
                var promise = new Promise();
                promise.chainBoth(
                    function (res) {
                        return res + " world";
                    }, next).chainBoth(
                    function (res) {
                        var promise3 = new Promise();
                        process.nextTick(comb.hitch(promise3, "callback", res + "!"));
                        return promise3;
                    }, next).then(function (res) {
                        assert.equal(res, "hello world!");
                        next();
                    }, next);
                process.nextTick(comb.hitch(promise, "callback", "hello"));

            });

            it.should("errback after all are done ", function (next) {
                var promise = new Promise();
                promise.chainBoth(
                    function (res) {
                        var promise2 = new Promise();
                        process.nextTick(comb.hitch(promise2, "errback", res + " error"));
                        return promise2;
                    }).chainBoth(
                    function (res) {
                        var promise3 = new Promise();
                        process.nextTick(comb.hitch(promise3, "callback", res + " error"));
                        return promise3;
                    }).then(function (res) {
                        assert.equal(res, "error error error");
                        next();
                    }, next);
                process.nextTick(comb.hitch(promise, "errback", "error"));

            });

            it.should("catch errors in callback ", function (next) {
                var promise = new Promise();
                promise.chainBoth(
                    function (res) {
                        throw res + " error";
                    }).chainBoth(
                    function (res) {
                        var promise3 = new Promise();
                        process.nextTick(comb.hitch(promise3, "callback", res + " error"));
                        return promise3;
                    }).then(function (res) {
                        assert.equal(res, "error error error");
                        next();
                    }, next);
                process.nextTick(comb.hitch(promise, "errback", "error"));

            });

            it.should("catch errors ", function (next) {
                var promise = new Promise();
                promise.chainBoth(
                    function (res) {
                        throw res + " error";
                    }).chainBoth(
                    function (res) {
                        var promise3 = new Promise();
                        process.nextTick(comb.hitch(promise3, "callback", res + " error"));
                        return promise3;
                    }).then(function (res) {
                        assert.equal(res, "error error error");
                        next();
                    }, next);
                process.nextTick(comb.hitch(promise, "callback", "error"));

            });
        });

    });

    it.describe("comb#when", function (it) {
        it.should("honor the promise api with no callback or errback", function (next) {
            var promise = new Promise();
            comb.when(promise).then(function (res) {
                assert.equal(res, "hello");
                next();
            }, next);
            process.nextTick(comb.hitch(promise, "callback", "hello"));
        });

        it.should("honor the promise api with no callback or errback and erroring", function (next) {
            var promise = new Promise();
            comb.when(promise).then(next, function (res) {
                assert.equal(res, "error");
                next();
            });
            process.nextTick(comb.hitch(promise, "errback", "error"));
        });

        it.should("honor the promise api when callback and no errback", function (next) {
            var promise = new Promise();
            comb.when(promise,function (res) {
                assert.equal(res, "hello");
                next();
            }).addErrback(next);
            process.nextTick(comb.hitch(promise, "callback", "hello"));
        });

        it.should("honor the promise api with callback and errback", function (next) {
            var promise = new Promise();
            comb.when(promise, function (res) {
                assert.equal(res, "hello");
                next();
            }, next);
            process.nextTick(comb.hitch(promise, "callback", "hello"));
        });

        it.should("honor the promise api with callback and errback erroring", function (next) {
            var promise = new Promise();
            comb.when(promise, next, function (res) {
                assert.equal(res, "error");
                next();
            });
            process.nextTick(comb.hitch(promise, "errback", "error"));
        });

        it.should("honor the promise api with value", function (next) {
            comb.when("hello").then(function (res) {
                assert.equal(res, "hello");
                next();
            }, next);
        });


        it.should("honor the promise api with value and callback but no errback", function (next) {
            comb.when("hello",
                function (res) {
                    assert.equal(res, "hello");
                    next();
                }).addErrback(next);
        });

        it.should("honor the promise api with value and callback and errback", function (next) {
            comb.when("hello", function (res) {
                assert.equal(res, "hello");
                next();
            }, next);
        });

        it.should("honor the promise api with value and Promise but no callback and errback", function (next) {
            comb.when("hello", new Promise().callback("world")).then(function (res) {
                assert.deepEqual(res, ["hello", "world"]);
                next();
            }, next);
        });

        it.should("honor the promise api with value, Promise, callback and no errback", function (next) {
            comb.when("hello", new Promise().callback("world"),
                function (res) {
                    assert.deepEqual(res, ["hello", "world"]);
                    next();
                }).addErrback(next);
        });

        it.should("honor the promise api with value, Promise, callback and errback", function (next) {
            comb.when("hello", new Promise().callback("world"), function (res) {
                assert.deepEqual(res, ["hello", "world"]);
                next();
            }, next);
        });

        it.should("honor the promise api with value, errored Promise, and no callback or errback", function (next) {
            comb.when("hello", new Promise().errback("world")).then(next, function (res) {
                assert.isUndefined(res[0]);
                assert.equal(res[1], "world");
                next();
            });
        });


        it.should("honor the promise api with value, errored Promise, callback and no errback", function (next) {
            comb.when("hello", new Promise().errback("world"), next).addErrback(function (res) {
                assert.isUndefined(res[0]);
                assert.equal(res[1], "world");
                next();
            });
        });

        it.should("honor the promise api with value, errored Promise, callback and errback", function (next) {
            comb.when("hello", new Promise().errback("world"), next, function (res) {
                assert.isUndefined(res[0]);
                assert.equal(res[1], "world");
                next();
            });
        });

        it.should("honor the promise api with no arguments", function (next) {
            comb.when().then(comb.partial(next, null), next);
        });

        it.should("honor the promise api with just a callback", function (next) {
            comb.when(comb.partial(next, null)).addErrback(next);
        });


        it.should("honor the promise api with just a callback and errback", function (next) {
            comb.when(comb.partial(next, null), next);
        });

        it.should("accept an array of promises", function (next) {
            comb.when([
                new comb.Promise().callback("hello"),
                new comb.Promise().callback("world"),
                new comb.Promise().callback("!")
            ]).chain(function (res) {
                    assert.deepEqual(res, ["hello", "world", "!"]);
                }).classic(next);
        });

    });


    it.describe("comb#wrap", function (it) {
        var nodeCBStyle = function (cb) {
            var args = comb.argsToArray(arguments);
            cb = args.pop();
            cb.apply(this, [null].concat(args));
        };

        var nodeCBStyleError = function (cb) {
            var args = comb.argsToArray(arguments);
            cb = args.pop();
            cb.apply(this, ["ERROR"]);
        };

        it.should("wrap traditional node cb methods with a promise", function (next) {
            comb.wrap(nodeCBStyle)("HELLO WORLD").then(function (res) {
                assert.equal(res, "HELLO WORLD");
                next();
            }, next);
        });

        it.should("wrap traditional node cb methods with a promise and errback if an error is the first argument", function (next) {
            comb.wrap(nodeCBStyleError)("HELLO WORLD").then(next, function (res) {
                assert.equal(res, "ERROR");
                next();
            });
        });
    });

    it.describe("comb#serial", function (it) {

        var asyncAction = function (item, timeout, error) {
            var ret = new comb.Promise();
            setTimeout(comb.hitchIgnore(ret, error ? "errback" : "callback", item), timeout);
            return ret.promise();
        };

        var syncAction = function (item, error) {
            if (error) {
                throw "ERROR";
            } else {
                return item;
            }
        };

        it.should("execute the items serially", function (next) {
            comb.serial([
                comb.partial(asyncAction, 1, 100),
                comb.partial(syncAction, 1.5),
                comb.partial(asyncAction, 2, 90),
                comb.partial(syncAction, 2.5),
                comb.partial(asyncAction, 3, 80),
                comb.partial(syncAction, 3.5),
                comb.partial(asyncAction, 4, 70),
                comb.partial(syncAction, 4.5),
                comb.partial(asyncAction, 5, 60),
                comb.partial(syncAction, 5.5),
                comb.partial(asyncAction, 6, 50)
            ]).then(function (res) {
                    assert.deepEqual(res, [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]);
                    next();
                }, next);
        });

        it.should("catch errors", function (next) {
            comb.serial([
                comb.partial(asyncAction, 1, 100),
                comb.partial(syncAction, 1.5),
                comb.partial(asyncAction, 2, 90),
                comb.partial(syncAction, 2.5),
                comb.partial(asyncAction, 3, 80),
                comb.partial(syncAction, 3.5),
                comb.partial(asyncAction, 4, 70),
                comb.partial(syncAction, 4.5),
                comb.partial(asyncAction, 5, 60),
                comb.partial(syncAction, 5.5, true),
                comb.partial(asyncAction, 6, 50)
            ]).then(next, function (res) {
                    assert.deepEqual(res, "ERROR");
                    next();
                });
        });

        it.should("catch async errors", function (next) {
            comb.serial([
                comb.partial(asyncAction, 1, 100, true),
                comb.partial(syncAction, 1.5),
                comb.partial(asyncAction, 2, 90),
                comb.partial(syncAction, 2.5),
                comb.partial(asyncAction, 3, 80),
                comb.partial(syncAction, 3.5),
                comb.partial(asyncAction, 4, 70),
                comb.partial(syncAction, 4.5),
                comb.partial(asyncAction, 5, 60),
                comb.partial(syncAction, 5.5, true),
                comb.partial(asyncAction, 6, 50)
            ]).then(next, function (res) {
                    assert.deepEqual(res, 1);
                    next();
                });
        });

        it.should("throw an error if not called with an array", function () {
            assert.throws(function () {
                comb.serial(
                    comb.partial(asyncAction, 1, 100, true),
                    comb.partial(syncAction, 1.5),
                    comb.partial(asyncAction, 2, 90),
                    comb.partial(syncAction, 2.5),
                    comb.partial(asyncAction, 3, 80),
                    comb.partial(syncAction, 3.5),
                    comb.partial(asyncAction, 4, 70),
                    comb.partial(syncAction, 4.5),
                    comb.partial(asyncAction, 5, 60),
                    comb.partial(syncAction, 5.5, true),
                    comb.partial(asyncAction, 6, 50)
                );
            });
        });
    });

    it.describe("#comb.chain", function (it) {
        function asyncAction(add, timeout, error) {
            return function (num) {
                num = num || 0;
                var ret = new comb.Promise();
                setTimeout(function () {
                    !error ? ret.callback(num + add) : ret.errback("ERROR");
                }, timeout);
                return ret;
            }
        }

        function asyncActionMulti(add, timeout, error) {
            return function (num, prev) {
                num = num || 0;
                prev = prev || 0;
                var ret = new comb.Promise();
                setTimeout(function () {
                    !error ? ret.callback(num + add, num + prev) : ret.errback("ERROR");
                }, timeout || 0);
                return ret;
            }
        }

        function syncAction(add, error) {
            return function (num) {
                if (error) {
                    throw "ERROR";
                } else {
                    return num + add;
                }
            }
        }

        it.should("execute the items serially", function (next) {
            comb.chain([
                asyncAction(1, 100),
                syncAction(1.5),
                asyncAction(2, 90),
                syncAction(2.5),
                asyncAction(3, 80),
                syncAction(3.5),
                asyncAction(4, 70),
                syncAction(4.5),
                asyncAction(5, 60),
                syncAction(5.5),
                asyncAction(6, 50)
            ]).then(function (results, prev) {
                    assert.deepEqual(results, 38.5);
                    assert.isUndefined(prev);
                    next();
                }, next);
        });

        it.should("catch errors", function (next) {
            comb.chain([
                asyncAction(1, 100),
                syncAction(1.5),
                asyncAction(2, 90),
                syncAction(2.5),
                asyncAction(3, 80),
                syncAction(3.5),
                asyncAction(4, 70),
                syncAction(4.5),
                asyncAction(5, 60),
                syncAction(5.5, true),
                asyncAction(6, 50)
            ]).then(next, function (res) {
                    assert.deepEqual(res, "ERROR");
                    next();
                });
        });

        it.should("catch async errors", function (next) {
            comb.chain([
                asyncAction(1, 100, true),
                syncAction(1.5),
                asyncAction(2, 90),
                syncAction(2.5),
                asyncAction(3, 80),
                syncAction(3.5),
                asyncAction(4, 70),
                syncAction(4.5),
                asyncAction(5, 60),
                syncAction(5.5, true),
                asyncAction(6, 500)
            ]).then(next, function (res) {
                    assert.deepEqual(res, "ERROR");
                    next();
                });
        });

        it.should("throw an error if not called with an array", function () {
            assert.throws(function () {
                comb.chain(
                    asyncAction(1, 100, true),
                    syncAction(1.5),
                    asyncAction(2, 90),
                    syncAction(2.5),
                    asyncAction(3, 80),
                    syncAction(3.5),
                    asyncAction(4, 70),
                    syncAction(4.5),
                    asyncAction(5, 60),
                    syncAction(5.5, true),
                    asyncAction(6, 50)
                );
            });
        });

        it.should("return multiple arguments if function callback with multiple args", function (next) {
            comb.chain([
                asyncActionMulti(1, 100),
                asyncActionMulti(1.5),
                asyncActionMulti(2, 90),
                asyncActionMulti(2.5),
                asyncActionMulti(3, 80),
                asyncActionMulti(3.5),
                asyncActionMulti(4, 70),
                asyncActionMulti(4.5),
                asyncActionMulti(5, 60),
                asyncActionMulti(5.5),
                asyncActionMulti(6, 50)
            ]).then(function (num, prev) {
                    assert.equal(num, 38.5);
                    assert.equal(prev, 137.5);
                    next();
                }, next);
        });
    });

    it.describe("comb.wait",function (it) {

        it.should("wait for the promise to resolve", function (next) {
            var p = new comb.Promise();
            var waiter = comb.wait(p, function wait(arg) {
                assert.isTrue(arg);
                next();
            });
            waiter(true);
            process.nextTick(function () {
                p.resolve(null);
            });
        });

        it.should("allow multiple executions", function (next) {
            var p = new comb.Promise();
            var waiter = comb.wait(p, function wait(arg) {
                assert.isNumber(arg);
                if (arg === 2) {
                    next();
                }else{
                    waiter(2);
                }
            });
            waiter(1);
            process.nextTick(function () {
                p.resolve(null);
            });
        });

    });
}).as(module);


