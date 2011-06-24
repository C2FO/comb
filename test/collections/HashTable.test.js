var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        HashTable = comb.collections.HashTable;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A HashTable colleciton");
var entrySet = [
    {key  : 1000, value : "entry1"},
    {key  : 1001, value : "entry2"},
    {key  : {}, value : "entry3"},
    {key  : {}, value : "entry4"},
    {key  : "key", value : "entry5"},
    {key  : "key2", value : "entry6"},
    {key  : new Date(), value : "entry7"},
    {key  : new Date(1999, 11, 12), value : "entry8"}
];

var key1, key2, d1, d2;
suite.addBatch({

            "when using objects as keys " : {
                topic : new HashTable(),

                "it should find the correct values" : function(table) {
                    key1 = new Object(),key2 = {};
                    table.set(key1, "key1");
                    table.put(key2, "key2");
                    assert.equal(table.get(key1), "key1");
                    assert.equal(table.get(key2), "key2");
                    assert.deepEqual(table.keys, [key1, key2]);
                    assert.deepEqual(table.values, ["key1", "key2"]);
                },

                "is should set the value " : function(table) {
                    table.set(key1, "key2");
                    table.set(key2, "key1");
                    assert.equal(table.get(key1), "key2");
                    assert.equal(table.get(key2), "key1");
                }
            },

            "when using strings as keys " : {
                topic : new HashTable(),

                "it should find the correct values" : function(table) {
                    table.set("key1", "key1");
                    table.put("key2", "key2");
                    assert.equal(table.get("key1"), "key1");
                    assert.equal(table.get("key2"), "key2");
                    assert.deepEqual(table.keys, ["key1", "key2"]);
                    assert.deepEqual(table.values, ["key1", "key2"]);
                },

                "it should set the value" : function(table) {
                    table.set("key1", "key2");
                    table.set("key2", "key1");
                    assert.equal(table.get("key1"), "key2");
                    assert.equal(table.get("key2"), "key1");
                }
            },

            "when using dates as keys " : {
                topic : new HashTable(),

                "it should find the correct values" : function(table) {
                    d1 = new Date(),d2 = new Date(1999, 11, 12);
                    table.set(d1, "key1");
                    table.put(d2, "key2");
                    assert.equal(table.get(d1), "key1");
                    assert.equal(table.get(d2), "key2");
                    assert.deepEqual(table.keys, [d1, d2]);
                    assert.deepEqual(table.values, ["key1", "key2"]);
                },

                "it should set value" : function(table) {
                    table.set(d1, "key2");
                    table.set(d2, "key1");
                    assert.equal(table.get(d1), "key2");
                    assert.equal(table.get(d2), "key1");
                }
            },

            "when using numbers as keys " : {
                topic : new HashTable(),

                "it should find the correct values" : function(table) {
                    table.put(1, "key1");
                    table.put(2, "key2");
                    assert.equal(table.get(1), "key1");
                    assert.equal(table.get(2), "key2");
                    assert.deepEqual(table.keys, [1, 2]);
                    assert.deepEqual(table.values, ["key1", "key2"]);
                }
            },

            "when removing objects keys " : {
                topic : new HashTable(),

                "it should find the correct values" : function(table) {
                    var key1 = new Object(), key2 = {};
                    table.put(key1, "key1");
                    table.put(key2, "key2");
                    assert.isTrue(table.contains(key1));
                    table.remove(key1);
                    assert.isFalse(table.contains(key1));
                    assert.isNull(table.get(key1));
                    assert.equal(table.get(key2), "key2");
                }
            },

            "when removing strings keys " : {
                topic : new HashTable(),

                "it should find the correct values" : function(table) {
                    table.put("key1", "key1");
                    table.put("key2", "key2");
                    assert.isTrue(table.contains("key1"));
                    table.remove("key1");
                    assert.isFalse(table.contains("key1"));
                    assert.isNull(table.get("key1"));
                    assert.equal(table.get("key2"), "key2");
                }
            },

            "when removing dates keys " : {
                topic : new HashTable(),

                "it should find the correct values" : function(table) {
                    var d1 = new Date(), d2 = new Date(1999, 11, 12);
                    table.put(d1, "key1");
                    table.put(d2, "key2");
                    assert.isTrue(table.contains(d1));
                    table.remove(d1);
                    assert.isFalse(table.contains(d1));
                    assert.isNull(table.get(d1));
                    assert.equal(table.get(d2), "key2");
                }
            },

            "when removing numbers keys " : {
                topic : new HashTable(),

                "it should find the correct values" : function(table) {
                    table.put(1, "key1");
                    table.put(2, "key2");
                    assert.isTrue(table.contains(1));
                    table.remove(1);
                    assert.isFalse(table.contains(1));
                    assert.isNull(table.get(1));
                    assert.equal(table.get(2), "key2");
                }
            },

            "when concating hashtables " : {
                topic : function() {
                    var h1 = new HashTable(), h2 = new HashTable();
                    h1.set(1, 2);
                    h1.set(2, 3);
                    h2.set(3, 4);
                    h2.set(4, 5);
                    return h1.concat(h2);
                },

                "they should be concated" : function(table) {
                    assert.equal(table.get(1), 2);
                    assert.equal(table.get(2), 3);
                    assert.equal(table.get(3), 4);
                    assert.equal(table.get(4), 5);
                },

                "it should throw an error when concating with something other than a hashTable" : function(table){
                    assert.throws(function(){
                        table.concat([]);
                    });
                }
            },

            "when iterating over values " : {
                topic : function() {
                    var ret = new HashTable();
                    entrySet.forEach(function(es) {
                        ret.put(es.key, es.value);
                    });
                    return ret;
                },

                "it should forEach each value" : function(table) {
                    table.forEach(function(entry, i) {
                        assert.deepEqual(entry.key, entrySet[i].key);
                        assert.deepEqual(entry.value, entrySet[i].value);
                    });
                },

                "it should map each value" : function(table) {
                    var ret = table.map(function(entry, i) {
                        assert.deepEqual(entry.key, entrySet[i].key);
                        assert.deepEqual(entry.value, entrySet[i].value);
                        return i;
                    });
                    ret.forEach(function(i, j) {
                        assert.equal(i, j);
                    })
                },

                "it should map filter each value" : function(table) {
                    var ret = table.filter(function(entry, i) {
                        return i % 2;
                    });
                    assert.length(ret.entrySet, 4);
                },

                "it should some the values" : function(table) {
                    assert.isFalse(table.some(function(entry, i) {
                        return !entry;
                    }));
                    assert.isTrue(table.some(function(entry, i) {
                        return entry;
                    }));
                },

                "it should every the values" : function(table) {
                    assert.isFalse(table.every(function(entry, i) {
                        return !entry;
                    }));
                    assert.isTrue(table.every(function(entry, i) {
                        return entry;
                    }));
                },

                "it should reduce the values" : function(table) {
                    var ret = table.reduce(function(a, b) {
                        return a + b.value;
                    }, "");
                    assert.equal(ret, "entry1entry2entry3entry4entry5entry6entry7entry8");

                },

                "it should reduce right the values" : function(table) {
                    var ret = table.reduceRight(function(a, b) {
                        return a + b.value;
                    }, "");
                    assert.equal(ret, "entry8entry7entry6entry5entry4entry3entry2entry1");

                },

                "it should clear all the values" : function(table) {
                    entrySet.forEach(function(es) {
                        table.remove(es.key);
                    });
                    assert.length(table.entrySet, 0);
                    assert.length(table.keys, 0);
                    assert.length(table.values, 0);
                    assert.isTrue(table.isEmpty);
                    assert.isNull(table.remove("key"));
                    assert.isNull(table.remove("key"));
                    entrySet.forEach(function(es) {
                        table.set(es.key, es.value);
                    });
                    table.clear();
                    assert.length(table.entrySet, 0);
                    assert.length(table.keys, 0);
                    assert.length(table.values, 0);
                    assert.isTrue(table.isEmpty);
                    assert.isNull(table.remove("key"));
                    assert.isNull(table.remove("key"));
                }
            }

        });

suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret, "callback"));