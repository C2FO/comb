"use strict";
var vows = require('vows'),
    assert = require('assert'),
    comb = require("index"),
    Promise = comb.Promise,
    PromiseList = comb.PromiseList;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A Promise");

suite.addBatch({
    "when using addCallback ":{
        topic:function () {
            var promise = new Promise();
            promise.addCallback(comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },
        "it should callback ":function (res) {
            assert.equal(res, "hello")
        }
    },

    "when using addCallback after callback has been called":{
        topic:function () {
            var promise = new Promise();
            promise.callback("hello");
            promise.addCallback(comb.hitch(this, "callback", null));
        },
        "it should callback ":function (res) {
            assert.equal(res, "hello")
        }
    },

    "when using callback after callback has been called":{
        topic:function () {
            var promise = new Promise();
            promise.callback("hello");
            return promise;
        },
        "it should throw an error ":function (promise) {
            assert.throws(function () {
                promise.callback();
            });
        }
    },


    "when using addErrback after":{
        topic:function () {
            var promise = new Promise();
            promise.addErrback(comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "errback", "error"), 1000);
        },

        "it should errback ":function (res) {
            assert.equal(res, "error");
        }
    },

    "when using addErrback after errback has been called":{
        topic:function () {
            var promise = new Promise();
            promise.errback("error");
            promise.addErrback(comb.hitch(this, "callback", null));
        },

        "it should errback ":function (res) {
            assert.equal(res, "error");
        }
    },

    "when using errback after errback has been called":{
        topic:function () {
            var promise = new Promise();
            promise.errback("error");
            return promise;
        },

        "it should throw an error ":function (promise) {
            assert.throws(function () {
                promise.errback();
            });
        }
    },

    "when using both for an callback":{
        topic:function () {
            var promise = new Promise();
            promise.both(comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "callback", "callback"), 1000);
        },

        "it should callback ":function (res) {
            assert.equal(res, "callback");
        }
    },

    "when using both for an errback":{
        topic:function () {
            var promise = new Promise();
            promise.both(comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "errback", "error"), 1000);
        },

        "it should errback ":function (res) {
            assert.equal(res, "error");
        }
    },

    "when using both after callback has been called":{
        topic:function () {
            var promise = new Promise();
            promise.callback("callback");
            promise.both(comb.hitch(this, "callback", null));
        },

        "it should callback ":function (res) {
            assert.equal(res, "callback");
        }
    },

    "when using both after errback has been called":{
        topic:function () {
            var promise = new Promise();
            promise.errback("error");
            promise.both(comb.hitch(this, "callback", null));
        },

        "it should errback ":function (res) {
            assert.equal(res, "error");
        }
    },


    "when using then and calling back":{
        topic:function () {
            var promise = new Promise();
            promise.then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should callback ":function (res) {
            assert.equal(res, "hello")
        }
    },

    "when using then and erring back":{
        topic:function () {
            var promise = new Promise();
            promise.then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "errback", "error"), 1000);
        },
        "it should errback ":function (res) {
            assert.equal(res, "error")
        }
    },

    "when using then and calling back before a then has been registered":{
        topic:function () {
            var promise = new Promise();
            promise.callback("hello");
            promise.then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },

        "it should callback ":function (res) {
            assert.equal(res, "hello")
        }
    },

    "when using then and erring back before then has been registered":{
        topic:function () {
            var promise = new Promise();
            promise.errback("error");
            promise.then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
        },
        "it should errback ":function (res) {
            assert.equal(res, "error")
        }
    },

    "when using chain and calling back":{
        topic:function () {
            var promise = new Promise();
            promise.chain(
                function (res) {
                    var promise2 = new Promise();
                    setTimeout(comb.hitch(promise2, "callback", res + " world"), 1000);
                    return promise2;
                }, comb.hitch(this, 'callback')).chain(
                function (res) {
                    var promise3 = new Promise();
                    setTimeout(comb.hitch(promise3, "callback", res + "!"), 1000);
                    return promise3;
                }, comb.hitch(this, "callback")).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should callback after all are done ":function (res) {
            assert.equal(res, "hello world!")
        }
    },

    "when using chain and erroring back":{
        topic:function () {
            var promise = new Promise();
            promise.chain(
                function (res) {
                    var promise2 = new Promise();
                    setTimeout(comb.hitch(promise2, "callback", res + " world"), 1000);
                    return promise2;
                }, comb.hitch(this, 'callback', null)).chain(
                function () {
                    var promise3 = new Promise();
                    setTimeout(comb.hitch(promise3, "errback", "error"), 1000);
                    return promise3;
                }, comb.hitch(this, "callback"))
                .then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should errback after the third one ":function (res) {
            assert.equal(res, "error")
        }
    },

    "when using chainBoth and calling back":{
        topic:function () {
            var promise = new Promise();
            promise.chainBoth(
                function (res) {
                    var promise2 = new Promise();
                    setTimeout(comb.hitch(promise2, "errback", res + " world"), 1000);
                    return promise2;
                }).chainBoth(
                function (res) {
                    var promise3 = new Promise();
                    setTimeout(comb.hitch(promise3, "callback", res + "!"), 1000);
                    return promise3;
                }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should callback after all are done ":function (res) {
            assert.equal(res, "hello world!")
        }
    },

    "when using chainBoth and erroring back":{
        topic:function () {
            var promise = new Promise();
            promise.chainBoth(
                function (res) {
                    var promise2 = new Promise();
                    setTimeout(comb.hitch(promise2, "errback", res + " error"), 1000);
                    return promise2;
                }).chainBoth(
                function (res) {
                    var promise3 = new Promise();
                    setTimeout(comb.hitch(promise3, "callback", res + " error"), 1000);
                    return promise3;
                }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "errback", "error"), 1000);
        },

        "it should errback after the third one ":function (res) {
            assert.equal(res, "error error error")
        }
    }
});

suite.addBatch({
    "when using comb.when with a promise and no callback or errback":{
        topic:function () {
            var promise = new Promise();
            comb.when(promise).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should still honor the promise api":function (res) {
            assert.equal(res, "hello");
        }
    },

    "when using comb.when with a promise and no callback or errback and erroring":{
        topic:function () {
            var promise = new Promise();
            comb.when(promise).then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "errback", "error"), 1000);
        },

        "it should still honor the promise api":function (res) {
            assert.equal(res, "error");
        }
    },

    "when using comb.when with a promise and callback and no errback":{
        topic:function () {
            var promise = new Promise();
            comb.when(promise, comb.hitch(this, "callback", null)).addErrback(comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should still honor the promise api":function (res) {
            assert.equal(res, "hello");
        }
    },

    "when using comb.when with a promise and callback and errback":{
        topic:function () {
            var promise = new Promise();
            comb.when(promise, comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            setTimeout(comb.hitch(promise, "callback", "hello"), 1000);
        },

        "it should still honor the promise api":function (res) {
            assert.equal(res, "hello");
        }
    },

    "when using comb.when with a promise and callback and errback and erroring":{
        topic:function () {
            var promise = new Promise();
            comb.when(promise, comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
            setTimeout(comb.hitch(promise, "errback", "error"), 1000);
        },

        "it should still honor the promise api":function (res) {
            assert.equal(res, "error");
        }
    },

    "when using comb.when with a value and no callback or errback":{
        topic:function () {
            comb.when("hello").then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.equal(res, "hello");
        }
    },


    "when using comb.when with a value and callback and no errback":{
        topic:function () {
            comb.when("hello", comb.hitch(this, "callback", null)).addErrback(comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.equal(res, "hello");
        }
    },

    "when using comb.when with  a value and callback and errback":{
        topic:function () {
            comb.when("hello", comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.equal(res, "hello");
        }
    },

    /////
    "when using comb.when with a promise and value and no callback or errback":{
        topic:function () {
            comb.when("hello", new Promise().callback("world")).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.deepEqual(res, ["hello", "world"]);
        }
    },


    "when using comb.when with a promise and value and callback and no errback":{
        topic:function () {
            comb.when("hello", new Promise().callback("world"), comb.hitch(this, "callback", null)).addErrback(comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.deepEqual(res, ["hello", "world"]);
        }
    },

    "when using comb.when with  a promise and value and callback and errback":{
        topic:function () {
            comb.when("hello", new Promise().callback("world"), comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.deepEqual(res, ["hello", "world"]);
        }
    },

    "when using comb.when with a promise and value and no callback or errback and erroring":{
        topic:function () {
            comb.when("hello", new Promise().errback("world")).then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
        },

        "it should still honor the promise api":function (res) {
            assert.isUndefined(res[0]);
            assert.equal(res[1], "world");
        }
    },


    "when using comb.when with a promise and value and callback and no errback and erroring":{
        topic:function () {
            comb.when("hello", new Promise().errback("world"), comb.hitch(this, "callback")).addErrback(comb.hitch(this, "callback", null));
        },

        "it should still honor the promise api":function (res) {
            assert.isUndefined(res[0]);
            assert.equal(res[1], "world");
        }
    },

    "when using comb.when with  a promise and value and callback and errback and erroring":{
        topic:function () {
            comb.when("hello", new Promise().errback("world"), comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
        },

        "it should still honor the promise api":function (res) {
            assert.isUndefined(res[0]);
            assert.equal(res[1], "world");
        }
    },

    ////

    "when using comb.when with no arguments and no callback or errback":{
        topic:function () {
            comb.when().then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.deepEqual(res, []);
        }
    },


    "when using comb.when with no arguments and value and callback and no errback":{
        topic:function () {
            comb.when(comb.hitch(this, "callback", null)).addErrback(comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.deepEqual(res, []);
        }
    },

    "when using comb.when with no arguments and value and callback and errback":{
        topic:function () {
            comb.when(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },

        "it should still honor the promise api":function (res) {
            assert.deepEqual(res, []);
        }
    }
});

var staticValueFunction = function (value) {
    return comb.argsToArray(arguments).join(" ");
};

var promiseValueFunction = function (value) {
    var ret = new comb.Promise();
    setTimeout(comb.hitch(ret, "callback", comb.argsToArray(arguments).join(" ")), 100);
    return ret;
};

var hash = {
    staticValueFunction:staticValueFunction,
    promiseValueFunction:promiseValueFunction
};

var TestClass = comb.define(null, {
    instance:{

        publicValue:"publicValue",

        __privateValue:"privateValue",

        constructor:function (count) {
            this._instanceCount = count || 0;
        },

        hello:function () {
            return "hello" + this._instanceCount;
        },

        helloPromise:function () {
            return promiseValueFunction("hello" + this._instanceCount);
        },

        world:function () {
            return "world" + this._instanceCount;
        },

        worldPromise:function () {
            return promiseValueFunction("world" + this._instanceCount);
        },

        setters:{
            pseudoPublicValue:function (value) {
                return this.__privateValue = value;
            }
        },

        getters:{
            pseudoPublicValue:function () {
                return this.__privateValue;
            }
        }
    },

    static:{

        publicValue:"publicValue",

        __privateValue:"privateValue",

        hello:function () {
            return "hello";
        },

        helloPromise:function () {
            return promiseValueFunction("hello");
        },

        world:function () {
            return "world";
        },

        worldPromise:function () {
            return promiseValueFunction("world");
        },

        setters:{
            pseudoPublicValue:function (value) {
                return this.__privateValue = value;
            }
        },

        getters:{
            pseudoPublicValue:function () {
                return this.__privateValue;
            }
        }
    }
});

suite.addBatch({

    "when using comb.executeInOrder":{

        topic:comb,

        " and not passing in a function":{
            topic:function (comb) {
                comb.executeInOrder().then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it not return anything":function (val) {
                assert.isUndefined(val);
            }
        },

        " and not passing any objects to proxy":{
            topic:function (comb) {
                comb.executeInOrder(
                    function () {
                        return "hello world";
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should return the return value":function (val) {
                assert.equal(val, "hello world");
            }
        },

        " with functions that return static values":{
            topic:function (comb) {
                comb.executeInOrder(staticValueFunction,
                    function (staticValueFunction) {
                        return staticValueFunction("hello", staticValueFunction("world"));
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should execute in order":function (val) {
                assert.equal(val, "hello world");
            }
        },

        " with promises":{
            topic:function (comb) {
                comb.executeInOrder(promiseValueFunction,
                    function (promiseValueFunction) {
                        return promiseValueFunction("hello", promiseValueFunction("world"));
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should execute in order":function (val) {
                assert.equal(val, "hello world");
            }
        },

        " with functions that return static values and promises":{
            topic:function (comb) {
                comb.executeInOrder(staticValueFunction, promiseValueFunction,
                    function (staticValueFunction, promiseValueFunction) {
                        return [
                            staticValueFunction("hello", promiseValueFunction("world")),
                            promiseValueFunction("hello1", staticValueFunction("world1")),
                            staticValueFunction("hello2", staticValueFunction("world2")),
                            promiseValueFunction("hello3", promiseValueFunction("world3"))
                        ];
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should execute in order":function (val) {
                assert.deepEqual(val, [
                    "hello world",
                    "hello1 world1",
                    "hello2 world2",
                    "hello3 world3"
                ]);
            }
        },

        " with an object that return static values and promises":{
            topic:function (comb) {
                comb.executeInOrder(hash,
                    function (hash) {
                        return [
                            hash.staticValueFunction("hello", hash.promiseValueFunction("world")),
                            hash.promiseValueFunction("hello1", hash.staticValueFunction("world1")),
                            hash.staticValueFunction("hello2", hash.staticValueFunction("world2")),
                            hash.promiseValueFunction("hello3", hash.promiseValueFunction("world3"))
                        ];
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should execute in order":function (val) {
                assert.deepEqual(val, [
                    "hello world",
                    "hello1 world1",
                    "hello2 world2",
                    "hello3 world3"
                ]);
            }
        },

        " with objects class methods":{
            topic:function (comb) {
                comb.executeInOrder(TestClass,
                    function (TestClass) {
                        return [TestClass.hello(), TestClass.worldPromise()];
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should execute in order":function (val) {
                assert.deepEqual(val, ["hello", "world"]);
            }
        },

        " with objects instance methods":{
            topic:function (comb) {
                comb.executeInOrder(TestClass,
                    function (TestClass) {
                        var testClass = new TestClass(1);
                        return [testClass.hello(), testClass.worldPromise()];
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should execute in order":function (val) {
                assert.deepEqual(val, ["hello1", "world1"]);
            }
        },

        " with objects class values":{
            topic:function (comb) {
                comb.executeInOrder(TestClass,
                    function (TestClass) {
                        var ret = [];
                        ret.push(TestClass.publicValue);
                        ret.push(TestClass.pseudoPublicValue);
                        TestClass.publicValue = "hi!!!";
                        ret.push(TestClass.publicValue);
                        TestClass.pseudoPublicValue = "hello!!!!";
                        ret.push(TestClass.pseudoPublicValue);
                        return ret;
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should execute in order":function (val) {
                assert.deepEqual(val, ["publicValue", "privateValue", "hi!!!", "hello!!!!"]);
            }
        },

        " with objects instance values":{
            topic:function (comb) {
                comb.executeInOrder(TestClass,
                    function (TestClass) {
                        var ret = [];
                        var testClass = new TestClass(1);
                        ret.push(testClass.publicValue);
                        ret.push(testClass.pseudoPublicValue);
                        testClass.publicValue = "hi!!!";
                        ret.push(testClass.publicValue);
                        testClass.pseudoPublicValue = "hello!!!!";
                        ret.push(testClass.pseudoPublicValue);
                        return ret;
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should execute in order":function (val) {
                assert.deepEqual(val, ["publicValue", "privateValue", "hi!!!", "hello!!!!"]);
            }
        },

        " with objects class and not returning anything":{
            topic:function (comb) {
                var testClass = new TestClass(1);
                comb.executeInOrder(testClass,
                    function (testClass) {
                        testClass.publicValue;
                        testClass.pseudoPublicValue;
                        testClass.publicValue = "hi!!!";
                        testClass.pseudoPublicValue = "hello!!!!";
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should returned all proxied values":function (val) {
                assert.deepEqual(val, ["publicValue", "privateValue", "hi!!!", "hello!!!!"]);
            }
        },

        " and returning an array":{
            topic:function (comb) {
                var testClass = new TestClass(1);
                comb.executeInOrder(testClass,
                    function (testClass) {
                        var ret = [];
                        ret.push(testClass.publicValue);
                        ret.push(testClass.pseudoPublicValue);
                        testClass.publicValue = "hi!!!";
                        ret.push(testClass.publicValue);
                        testClass.pseudoPublicValue = "hello!!!!";
                        ret.push(testClass.pseudoPublicValue);
                        return ret;
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should return the array with the resolved values":function (val) {
                assert.deepEqual(val, ["publicValue", "privateValue", "hi!!!", "hello!!!!"]);
            }
        },

        " and returning a hash":{
            topic:function (comb) {
                comb.executeInOrder(TestClass,
                    function (TestClass) {
                        var ret = {};
                        var testClass = new TestClass(1);
                        ret.publicValue = testClass.publicValue;
                        ret.psuedoPublicValue = testClass.pseudoPublicValue;
                        testClass.publicValue = "hi!!!";
                        ret.publicValue2 = testClass.publicValue;
                        testClass.pseudoPublicValue = "hello!!!!";
                        ret.pseudoPublicValue2 = testClass.pseudoPublicValue;
                        return ret;
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should return the hash with the resolved values":function (val) {
                assert.equal(val.publicValue, "publicValue");
                assert.equal(val.psuedoPublicValue, "privateValue");
                assert.equal(val.publicValue2, "hi!!!");
                assert.equal(val.pseudoPublicValue2, "hello!!!!");
            }
        },

        " and returning a static value":{
            topic:function (comb) {
                comb.executeInOrder(TestClass,
                    function (TestClass) {
                        var ret = {};
                        var testClass = new TestClass(1);
                        ret.publicValue = testClass.publicValue;
                        ret.psuedoPublicValue = testClass.pseudoPublicValue;
                        testClass.publicValue = "hi!!!";
                        ret.publicValue2 = testClass.publicValue;
                        testClass.pseudoPublicValue = "hello!!!!";
                        ret.pseudoPublicValue2 = testClass.pseudoPublicValue;
                        return true;
                    }).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
            },

            " it should return the value":function (val) {
                assert.isTrue(val);
            }
        },

        " and causing a runtime exception":{
            topic:function (comb) {
                comb.executeInOrder(TestClass,
                    function (TestClass) {
                        var testClass = new TestClass(1);
                        return testClass.bye();
                    }).then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
            },

            "it should errback with the error":function (val) {
                assert.equal(val.type, "undefined_method");
            }
        },

        " it should support certain object methods object properties properly":function (comb) {
            var x = {hello:"hello", world:"world"};
            comb.executeInOrder(x,
                function (x) {
                    delete x.hello;
                    return x;
                }).then(function (newX) {
                    assert.isUndefined(newX.hello);
                    assert.deepEqual(x, newX);
                }, function (err) {
                    assert.equal(err.message, "Cannot delete");
                })
        },

        " it throw an error the objects keys":function (comb) {
            var x = {hello:"hello", world:"world"};
            comb.executeInOrder(x,
                function (x) {
                    Object.keys(x);
                }).then(comb.hitch(assert, "fail"), function (err) {
                    assert.equal(err.message, "enumerate is not supported");
                });
            comb.executeInOrder(x,
                function (x) {
                    Object.keys(x);
                }).then(comb.hitch(assert, "fail"), function (err) {
                    assert.equal(err.message, "enumerate is not supported");
                });
        }


    }

});


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

suite.addBatch({

    "comb.wrap":{
        topic:function () {
            comb.wrap(nodeCBStyle)("HELLO WORLD").then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));
        },

        "should wrap traditional node cb methods with a promise":function (res) {
            assert.equal(res, "HELLO WORLD");
        }
    }

});

suite.addBatch({

    "comb.wrap":{
        topic:function () {
            comb.wrap(nodeCBStyleError)("HELLO WORLD").then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));
        },

        "should errback if an error is the first argument":function (res) {
            assert.equal(res, "ERROR");
        }
    }

});

var asyncAction = function (item, timeout, error) {
    var ret = new comb.Promise();
    setTimeout(comb.hitchIgnore(ret, error ? "errback" : "callback", item), timeout);
    return ret;
};

var syncAction = function (item, error) {
    if (error)
        throw "ERROR";
    else
        return item;
};

suite.addBatch({

    "comb.serial":{
        topic:function () {
            comb.serial([
                comb.partial(asyncAction, 1, 1000),
                comb.partial(syncAction, 1.5),
                comb.partial(asyncAction, 2, 900),
                comb.partial(syncAction, 2.5),
                comb.partial(asyncAction, 3, 800),
                comb.partial(syncAction, 3.5),
                comb.partial(asyncAction, 4, 700),
                comb.partial(syncAction, 4.5),
                comb.partial(asyncAction, 5, 600),
                comb.partial(syncAction, 5.5),
                comb.partial(asyncAction, 6, 500)
            ]).then(comb.hitch(this, "callback", null), comb.hitch(this, "callback"));

        },

        "should execute the items serially":function (res) {
            assert.deepEqual(res, [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]);
        }
    }

});

suite.addBatch({

    "comb.serial":{
        topic:function () {
            comb.serial([
                comb.partial(asyncAction, 1, 1000),
                comb.partial(syncAction, 1.5),
                comb.partial(asyncAction, 2, 900),
                comb.partial(syncAction, 2.5),
                comb.partial(asyncAction, 3, 800),
                comb.partial(syncAction, 3.5),
                comb.partial(asyncAction, 4, 700),
                comb.partial(syncAction, 4.5),
                comb.partial(asyncAction, 5, 600),
                comb.partial(syncAction, 5.5, true),
                comb.partial(asyncAction, 6, 500)
            ]).then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));

        },

        "should catch errors":function (res) {
            assert.deepEqual(res, "ERROR");
        }
    }

});

suite.addBatch({

    "comb.serial":{
        topic:function () {
            comb.serial([
                comb.partial(asyncAction, 1, 1000, true),
                comb.partial(syncAction, 1.5),
                comb.partial(asyncAction, 2, 900),
                comb.partial(syncAction, 2.5),
                comb.partial(asyncAction, 3, 800),
                comb.partial(syncAction, 3.5),
                comb.partial(asyncAction, 4, 700),
                comb.partial(syncAction, 4.5),
                comb.partial(asyncAction, 5, 600),
                comb.partial(syncAction, 5.5, true),
                comb.partial(asyncAction, 6, 500)
            ]).then(comb.hitch(this, "callback"), comb.hitch(this, "callback", null));

        },

        "should catch async errors":function (res) {
            assert.deepEqual(res, 1);
        },

        "should throw an error if not called with an array":function () {
            assert.throws(function () {
                comb.serial(
                    comb.partial(asyncAction, 1, 1000, true),
                    comb.partial(syncAction, 1.5),
                    comb.partial(asyncAction, 2, 900),
                    comb.partial(syncAction, 2.5),
                    comb.partial(asyncAction, 3, 800),
                    comb.partial(syncAction, 3.5),
                    comb.partial(asyncAction, 4, 700),
                    comb.partial(syncAction, 4.5),
                    comb.partial(asyncAction, 5, 600),
                    comb.partial(syncAction, 5.5, true),
                    comb.partial(asyncAction, 6, 500)
                )
            });
        }
    }

});


suite.run({reporter:vows.reporter.spec}, comb.hitch(ret, "callback"));