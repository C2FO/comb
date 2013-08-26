"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Promise = comb.Promise,
    PromiseList = comb.PromiseList;

it.describe("comb.PromiseList",function (it) {


    it.should("should callback after all have fired ", function (next) {

        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        setTimeout(comb.hitch(promise, "callback", "hello"), 100);
        setTimeout(comb.hitch(promise2, "callback", "world"), 150);
        setTimeout(comb.hitch(promise3, "callback", "!"), 200);
        new PromiseList([promise, promise2, promise3]).then(function (res) {
            var expected = ["hello", "world", "!"];
            res.forEach(function (r, i) {
                assert.equal(r[1], expected[i]);
            });
            next();
        }, next);
    });

    it.should("callback immediately if no promises are provided", function (next) {
        new PromiseList().then(function (res) {
            assert.deepEqual(res, []);
            next();
        }, next);
    });

    it.should("callback immediately if and empty array is provided", function (next) {
        new PromiseList([]).then(function (res) {
            assert.deepEqual(res, []);
            next();
        }, next);
    });

    it.should("callback if provided promises that have already fired", function (next) {
        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        promise.callback("hello");
        promise2.callback("world");
        promise3.callback("!");
        new PromiseList([promise, promise2, promise3]).then(function (res) {
            var expected = ["hello", "world", "!"];
            res.forEach(function (r, i) {
                assert.equal(r[1], expected[i]);
            });
            next();
        }, next);
    });

    it.should("errback if provided promises that have already fired and one errored back", function (next) {
        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        promise.callback("hello");
        promise2.callback("world");
        promise3.errback("error");
        var pl = new PromiseList([promise, promise2, promise3]);
        process.nextTick(function () {
            pl.then(next, function (res) {
                res.forEach(function (res) {
                    assert.equal(res[1], "error");
                });
                next();
            });
        });
    });

    it.should("throw an error if callback is called after firing", function (next) {
        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        promise.callback("hello");
        promise2.callback("world");
        promise3.callback("!");
        var pl = new PromiseList([promise, promise2, promise3])
        pl.addCallback(function () {
            assert.throws(function () {
                pl.callback();
            });
        });
        return pl;
    });

    it.should("throw an error if errback is called after firing", function (next) {
        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        promise.callback("hello");
        promise2.callback("world");
        promise3.callback("!");
        var pl = new PromiseList([promise, promise2, promise3])
        pl.addCallback(function () {
            assert.throws(function () {
                pl.errback();
            });
        });
        return pl;
    });

    it.should("handle the ordering of results if resolved out of order", function (next) {
        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        setTimeout(comb.hitch(promise, "callback", "hello"), 200);
        setTimeout(comb.hitch(promise2, "callback", "world"), 150);
        setTimeout(comb.hitch(promise3, "callback", "!"), 100);
        new PromiseList([promise, promise2, promise3]).then(function (res) {
            var expected = ["hello", "world", "!"];
            res.forEach(function (res, i) {
                assert.equal(res[1], expected[i]);
            });
            next();
        }, next);
    });

    it.should("normalize results", function (next) {
        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        setTimeout(comb.hitch(promise, "callback", "hello"), 200);
        setTimeout(comb.hitch(promise2, "callback", "world"), 150);
        setTimeout(comb.hitch(promise3, "callback", "!"), 100);
        new PromiseList([promise, promise2, promise3], true).then(function (res) {
            assert.deepEqual(res, ["hello", "world", "!"]);
            next();
        }, next);
    });

    it.should("accept a promise as a callback", function (next) {
        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        process.nextTick(comb.hitch(promise, "callback", "hello"));
        process.nextTick(comb.hitch(promise2, "callback", "world"));
        process.nextTick(comb.hitch(promise3, "callback", "!"));
        var p2 = new Promise();
        p2.then(function (res) {
            assert.deepEqual(res, ["hello", "world", "!"]);
            next();
        });
        new PromiseList([promise, promise2, promise3], true).addCallback(p2).addErrback(next);
    });

    it.should("accept a promise as a errback", function (next) {
        var promise = new Promise(), promise2 = new Promise(), promise3 = new Promise();
        process.nextTick(comb.hitch(promise, "callback", "hello"));
        process.nextTick(comb.hitch(promise2, "callback", "world"));
        process.nextTick(comb.hitch(promise3, "errback", "error"));
        var p2 = new Promise();
        p2.then(next, function (res) {
            assert.equal(res[2], "error");
            next();
        });
        new PromiseList([promise, promise2, promise3], true).addCallback(next).addErrback(p2);
    });

}).as(module);
