"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    Pool = comb.collections.Pool;

it.describe("comb.collections.Pool", function (it) {

    var p = new Pool();

    it.should("know its minObjects count ", function () {
        assert.equal(p.minObjects, 0);
    });

    it.should("know its free count", function () {
        assert.equal(p.freeCount, 0);
    });

    it.should("know its in use count", function () {
        assert.equal(p.inUseCount, 0);
    });

    it.should("know its total count", function () {
        assert.equal(p.count, 0);
    });

    it.should("only return 1 object", function () {
        var o = p.getObject();
        assert.isObject(o);
        assert.isUndefined(p.getObject());
        p.returnObject(o);
    });

    it.should("update the maxObjects ", function () {
        p.maxObjects = 3;
        var o = p.getObject(), o1 = p.getObject(), o2 = p.getObject();
        assert.isObject(o);
        assert.isUndefined(p.getObject());
        p.maxObjects = 1;
        p.returnObject(o2);
        p.returnObject(o1);
        p.returnObject(o);
        assert.equal(p.getObject(), o);
        p.returnObject(o);
        assert.throws(function () {
            p.maxObjects = -1;
        });
        p.maxObjects = 5;
    });

    it.should("update the minObjects ", function () {
        p.minObjects = 5;
        assert.equal(p.inUseCount, 0);
        assert.equal(p.count, 5);
        assert.equal(p.freeCount, 5);
        assert.equal(p.minObjects, 5);
    });

    it.should("throw an error when creating a with maxObjects less than minObject", function () {
        assert.throws(function () {
            new new Pool({maxObject:1, minObjects:3});
        });
    });

    it.should("return objects properly", function () {
        var p = new Pool({maxObjects:3});

        var o1 = p.getObject();
        assert.isObject(o1);
        assert.equal(p.freeCount, 0);
        assert.equal(p.inUseCount, 1);
        assert.equal(p.count, 1);
        var o2 = p.getObject()
        assert.isObject(o2);
        assert.equal(p.freeCount, 0);
        assert.equal(p.inUseCount, 2);
        assert.equal(p.count, 2);
        var o3 = p.getObject();
        assert.isObject(o3);
        assert.equal(p.freeCount, 0);
        assert.equal(p.inUseCount, 3);
        assert.equal(p.count, 3);
        assert.isUndefined(p.getObject());
        assert.equal(p.freeCount, 0);
        assert.equal(p.inUseCount, 3);
        assert.equal(p.count, 3);
        p.returnObject(o1);
        assert.equal(p.freeCount, 1);
        assert.equal(p.inUseCount, 2);
        assert.equal(p.count, 3);
        p.returnObject(o2);
        assert.equal(p.freeCount, 2);
        assert.equal(p.inUseCount, 1);
        assert.equal(p.count, 3);
        p.returnObject(o3);
        assert.equal(p.freeCount, 3);
        assert.equal(p.inUseCount, 0);
        assert.equal(p.count, 3);

    });

    it.should("allow adjusting maxObjects", function () {
        var p = new Pool();

        assert.equal(p.freeCount, 0);
        assert.equal(p.inUseCount, 0);
        assert.equal(p.count, 0);
        assert.isObject(p.getObject());
        assert.isUndefined(p.getObject());
        p.maxObjects = 3;
        assert.equal(p.freeCount, 0);
        assert.equal(p.inUseCount, 1);
        assert.equal(p.count, 1);
        assert.isObject(p.getObject());
        assert.equal(p.freeCount, 0);
        assert.equal(p.inUseCount, 2);
        assert.equal(p.count, 2);
        assert.isObject(p.getObject());
        assert.equal(p.freeCount, 0);
        assert.equal(p.inUseCount, 3);
        assert.equal(p.count, 3);

    });

    it.describe("creating a new pool maxObjects", function () {
        var p = new Pool({maxObjects:3});

        it.should("know its maxObjects count ", function () {
            assert.equal(p.maxObjects, 3);
        });

        it.should("only return 3 object", function () {
            assert.isObject(p.getObject());
            assert.isObject(p.getObject());
            assert.isObject(p.getObject());
            assert.isUndefined(p.getObject());
        });

        it.should("know its free count", function () {
            assert.equal(p.freeCount, 0);
        });

        it.should("know its in use count", function () {
            assert.equal(p.inUseCount, 3);
        });

        it.should("know its total count", function () {
            assert.equal(p.count, 3);
        });
    });
}).as(module);


