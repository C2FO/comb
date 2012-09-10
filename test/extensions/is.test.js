var comb = require("index"),
    assert = require("assert"),
    it = require("it");

it.describe("is extension",function (it) {

    it.should("expose equality methods", function () {
        assert.isTrue(comb(1).eq(1));
        assert.isFalse(comb(1).eq(2));
        assert.isTrue(comb("hello").eq("hello"));
        assert.isFalse(comb("hello").eq("world"));
        assert.isFalse(comb(new Date(2001, 1, 1, 1, 1, 1, 111)).eq(new Date(2001, 1, 1, 1, 1, 1, 111)));
        assert.isFalse(comb({}).eq({}));
    });

    it.should("expose neq methods", function () {
        assert.isFalse(comb(1).neq(1));
        assert.isTrue(comb(1).neq(2));
        assert.isFalse(comb("hello").neq("hello"));
        assert.isTrue(comb("hello").neq("world"));
        assert.isTrue(comb(new Date(2001, 1, 1, 1, 1, 1, 111)).neq(new Date(2001, 1, 1, 1, 1, 1, 111)));
        assert.isTrue(comb({}).neq({}));
    });

    it.should("expose value of properly", function () {
        var date = new Date(2001, 1, 1, 1, 1, 1, 111),
            date2 = new Date(2001, 1, 1, 1, 1, 1, 111);
        assert.deepEqual(comb(date).valueOf(), date.valueOf());
        assert.strictEqual(comb("hello").valueOf(), "hello");
        assert.strictEqual(comb(true).valueOf(), true);
        assert.deepEqual(comb({}).valueOf(), {});
    });

    it.should("print properly", function () {
        var orig = console.log, val;
        console.log = function (arg) {
            val = arg;
        };
        comb("hello").print();
        assert.strictEqual(val, "hello");

        comb(1).print();
        assert.strictEqual(val, 1);

        comb(true).print();
        assert.strictEqual(val, true);
        console.log = orig;
    });

}).as(module);