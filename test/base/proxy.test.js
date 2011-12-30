var vows = require('vows'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Proxy utilities");


//create an object that can use properties or as a function through the new operator
var MyObject = comb.define(null, {
    instance:{
        hello:"hello",
        constructor:function () {
            this.args = comb.argsToArray(arguments);
        }
    }
});

//NOTE: this will not work properly for native objects like Date.
var createNewMyObject = function () {
    try {
        var p = new MyObject();
    } catch (ignore) {
        //ignore the error because its probably from missing arguments
    }
    //Now lets take care of arguments supplied!!!
    MyObject.apply(p, comb.array.flatten(["called by function wrapper"], comb.argsToArray(arguments)));
    return p;
};

var staticValue = function (value) {
    return value;
};

suite.addBatch({
    "when creating a function handler":{
        topic:comb,

        " it should create one for just function calls":function (comb) {
            //This example is redundant but its just as example :)
            var o = {world:"world"};
            var handle = comb.createFunctionWrapper(o, createNewMyObject);
            assert.equal(handle.world, "world");
            var a = handle(1);
            assert.equal(a.hello, "hello");  //=>"hello"
            assert.deepEqual(a.args, ["called by function wrapper", 1]); //=> [1];
            a = new handle(1, 2);
            assert.equal(a.hello, "hello");  //=>"hello"
            assert.deepEqual(a.args, ["called by function wrapper", 1, 2]); //=> [1];
        },

        " it should create one for just function and constructor calls":function (comb) {
            //This example is redundant but its just as example :)
            var o = {world:"world"};
            var handle = comb.createFunctionWrapper(o, staticValue, createNewMyObject);
            assert.equal(handle.world, "world");
            var a = handle(1);
            assert.equal(a, 1);
            assert.isUndefined(a.args);
            a = new handle(1, 2);
            assert.equal(a.hello, "hello");
            assert.deepEqual(a.args, ["called by function wrapper", 1, 2]);
        },

        "it should create resolve arguments properly":function (comb) {
            //This example is redundant but its just as example :)
            var o = {world:"world"};
            var handle = comb.createFunctionWrapper(o, null, createNewMyObject);
            assert.equal(handle.world, "world");
            var a = handle(1);
            assert.equal(a.hello, "hello");  //=>"hello"
            assert.deepEqual(a.args, ["called by function wrapper", 1]); //=> [1];
            a = new handle(1, 2);
            assert.equal(a.hello, "hello");  //=>"hello"
            assert.deepEqual(a.args, ["called by function wrapper", 1, 2]); //=> [1];
        },

        "it should accept a prototype argument create resolve arguments properly":function (comb) {
            //This example is redundant but its just as example :)
            var o = {};
            var handle = comb.createFunctionWrapper(o, null, createNewMyObject, MyObject);
            assert.instanceOf(handle, MyObject);
            assert.isUndefined(handle.world);
            var a = handle(1);
            assert.equal(a.hello, "hello");  //=>"hello"
            assert.deepEqual(a.args, ["called by function wrapper", 1]); //=> [1];
            a = new handle(1, 2);
            assert.equal(a.hello, "hello");  //=>"hello"
            assert.deepEqual(a.args, ["called by function wrapper", 1, 2]); //=> [1];
        }
    }
});

suite.addBatch({
    "when using comb.methodMissing":{
        topic:comb,

        "it should handle method missing calls ":function () {
            var x = {hello:function () {
                return "hello"
            }, world:"world"};
            var xHandler = comb.methodMissing(x, function (m) {
                return function () {
                    return [m].concat(comb.argsToArray(arguments));
                }
            });
            assert.equal(xHandler.hello(), "hello");
            assert.equal(xHandler.world, "world");
            assert.deepEqual(xHandler.someMethod("hello", "world"), [ 'someMethod', 'hello', 'world' ]);
        },

        "it should handle method missing calls with a defined proto ":function () {
            var xHandler = comb.methodMissing(MyObject, function (m) {
                return function () {
                    return [m].concat(comb.argsToArray(arguments));
                }
            }, MyObject);
            assert.instanceOf(xHandler, MyObject);
            assert.equal(xHandler.hello(), "hello");
            assert.equal(xHandler.world(), "world");
            assert.deepEqual(xHandler.someMethod("hello", "world"), [ 'someMethod', 'hello', 'world' ]);
        }
    }

});

suite.run({reporter:vows.reporter.spec}, comb.hitch(ret, "callback"));
