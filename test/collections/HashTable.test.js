"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    HashTable = comb.collections.HashTable;

it.describe("comb.collections.HashTable", function (it) {
    var entrySet = [
        {key:1000, value:"entry1"},
        {key:1001, value:"entry2"},
        {key:{}, value:"entry3"},
        {key:{}, value:"entry4"},
        {key:"key", value:"entry5"},
        {key:"key2", value:"entry6"},
        {key:new Date(), value:"entry7"},
        {key:new Date(1999, 11, 12), value:"entry8"}
    ];

    var key1, key2, d1, d2;


    it.describe("objects as keys", function (it) {
        var table = new HashTable();

        it.should("find the correct values", function () {
            key1 = new Object(), key2 = {};
            table.set(key1, "key1");
            table.put(key2, "key2");
            assert.equal(table.get(key1), "key1");
            assert.equal(table.get(key2), "key2");
            assert.deepEqual(table.keys, [key1, key2]);
            assert.deepEqual(table.values, ["key1", "key2"]);
        });

        it.should("set the value ", function () {
            table.set(key1, "key2");
            table.set(key2, "key1");
            assert.equal(table.get(key1), "key2");
            assert.equal(table.get(key2), "key1");
        });

        it.should("remove values", function () {
            var key1 = new Object(), key2 = {};
            table.put(key1, "key1");
            table.put(key2, "key2");
            assert.isTrue(table.contains(key1));
            table.remove(key1);
            assert.isFalse(table.contains(key1));
            assert.isNull(table.get(key1));
            assert.equal(table.get(key2), "key2");
        });
    });

    it.describe("strings as keys ", function (it) {
        var table = new HashTable();

        it.should("find the correct values", function () {
            table.set("key1", "key1");
            table.put("key2", "key2");
            assert.equal(table.get("key1"), "key1");
            assert.equal(table.get("key2"), "key2");
            assert.deepEqual(table.keys, ["key1", "key2"]);
            assert.deepEqual(table.values, ["key1", "key2"]);
        });

        it.should("set the value", function () {
            table.set("key1", "key2");
            table.set("key2", "key1");
            assert.equal(table.get("key1"), "key2");
            assert.equal(table.get("key2"), "key1");
        });

        it.should("remove strings keys ", function () {
            var table = new HashTable();


            table.put("key1", "key1");
            table.put("key2", "key2");
            assert.isTrue(table.contains("key1"));
            table.remove("key1");
            assert.isFalse(table.contains("key1"));
            assert.isNull(table.get("key1"));
            assert.equal(table.get("key2"), "key2");
        });
    });

    it.describe("dates as keys ", function (it) {
        var table = new HashTable();

        it.should("find the correct values", function () {
            d1 = new Date(), d2 = new Date(1999, 11, 12);
            table.set(d1, "key1");
            table.put(d2, "key2");
            assert.equal(table.get(d1), "key1");
            assert.equal(table.get(d2), "key2");
            assert.deepEqual(table.keys, [d1, d2]);
            assert.deepEqual(table.values, ["key1", "key2"]);
        });

        it.should("set value", function () {
            table.set(d1, "key2");
            table.set(d2, "key1");
            assert.equal(table.get(d1), "key2");
            assert.equal(table.get(d2), "key1");
        });

        it.should("remove dates keys ", function () {
            var table = new HashTable();
            var d1 = new Date(), d2 = new Date(1999, 11, 12);
            table.put(d1, "key1");
            table.put(d2, "key2");
            assert.isTrue(table.contains(d1));
            table.remove(d1);
            assert.isFalse(table.contains(d1));
            assert.isNull(table.get(d1));
            assert.equal(table.get(d2), "key2");
        });


    });

    it.describe("numbers as keys ", function (it) {
        var table = new HashTable();

        it.should("find the correct values", function () {
            table.put(1, "key1");
            table.put(2, "key2");
            assert.equal(table.get(1), "key1");
            assert.equal(table.get(2), "key2");
            assert.deepEqual(table.keys, [1, 2]);
            assert.deepEqual(table.values, ["key1", "key2"]);
        });

        it.should("remove numbers keys ", function () {
            var table = new HashTable();
            table.put(1, "key1");
            table.put(2, "key2");
            assert.isTrue(table.contains(1));
            table.remove(1);
            assert.isFalse(table.contains(1));
            assert.isNull(table.get(1));
            assert.equal(table.get(2), "key2");
        });

    });


    it.should("concat", function () {
        var h1 = new HashTable(), h2 = new HashTable();
        h1.set(1, 2);
        h1.set(2, 3);
        h2.set(3, 4);
        h2.set(4, 5);
        var table = h1.concat(h2);
        assert.equal(table.get(1), 2);
        assert.equal(table.get(2), 3);
        assert.equal(table.get(3), 4);
        assert.equal(table.get(4), 5);
        assert.throws(function () {
            table.concat([]);
        });
    });

    it.describe("iterating over values ", function (it) {
        var table = new HashTable();
        entrySet.forEach(function (es) {
            table.put(es.key, es.value);
        });


        it.should("#forEach", function () {
            table.forEach(function (entry, i) {
                assert.deepEqual(entry.key, entrySet[i].key);
                assert.deepEqual(entry.value, entrySet[i].value);
            });
        });

        it.should("#map", function () {
            var ret = table.map(function (entry, i) {
                assert.deepEqual(entry.key, entrySet[i].key);
                assert.deepEqual(entry.value, entrySet[i].value);
                return i;
            });
            ret.forEach(function (i, j) {
                assert.equal(i, j);
            })
        });

        it.should("#filter", function () {
            var ret = table.filter(function (entry, i) {
                return i % 2;
            });
            assert.lengthOf(ret.entrySet, 4);
        });

        it.should("#some", function () {
            assert.isFalse(table.some(function (entry, i) {
                return !entry;
            }));
            assert.isTrue(table.some(function (entry, i) {
                return entry;
            }));
        });

        it.should("#every", function () {
            assert.isFalse(table.every(function (entry, i) {
                return !entry;
            }));
            assert.isTrue(table.every(function (entry, i) {
                return entry;
            }));
        });

        it.should("#reduce", function () {
            var ret = table.reduce(function (a, b) {
                return a + b.value;
            }, "");
            assert.equal(ret, "entry1entry2entry3entry4entry5entry6entry7entry8");

        });

        it.should("#reduceRight", function () {
            var ret = table.reduceRight(function (a, b) {
                return a + b.value;
            }, "");
            assert.equal(ret, "entry8entry7entry6entry5entry4entry3entry2entry1");

        });


        it.should("#clear", function () {
            entrySet.forEach(function (es) {
                table.remove(es.key);
            });
            assert.lengthOf(table.entrySet, 0);
            assert.lengthOf(table.keys, 0);
            assert.lengthOf(table.values, 0);
            assert.isTrue(table.isEmpty);
            assert.isNull(table.remove("key"));
            assert.isNull(table.remove("key"));
            entrySet.forEach(function (es) {
                table.set(es.key, es.value);
            });
            table.clear();
            assert.lengthOf(table.entrySet, 0);
            assert.lengthOf(table.keys, 0);
            assert.lengthOf(table.values, 0);
            assert.isTrue(table.isEmpty);
            assert.isNull(table.remove("key"));
            assert.isNull(table.remove("key"));
        });

    });

}).as(module);

