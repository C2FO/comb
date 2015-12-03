"use strict";
var define = require("../define").define,
    Collection = require("./Collection"),
    Iterable = require("./Iterable"),
    base = require("../base");

function hashFunction(key) {
    if (typeof key === "string") {
        return key;
    } else if (typeof key === "object") {
        return key.hashCode ? key.hashCode() : "" + key;
    } else {
        return "" + key;
    }
}

var Bucket = define(null, {

    instance: {

        constructor: function () {
            this.__entries = [];
        },

        pushValue: function (key, value) {
            this.__entries.push({key: key, value: value});
            return value;
        },

        remove: function (key) {
            var ret = null, map = this.__entries, val;
            var i = map.length - 1;
            for (; i >= 0; i--) {
                if ((val = map[i]) != null && val.key === key) {
                    map[i] = null;
                    return val.value;
                }
            }
            return ret;
        },

        "set": function (key, value) {
            var ret = null, map = this.__entries;
            var i = map.length - 1;
            for (; i >= 0; i--) {
                var val = map[i];
                if (val && key === val.key) {
                    val.value = value;
                    ret = value;
                    break;
                }
            }
            if (!ret) {
                map.push({key: key, value: value});
            }
            return ret;
        },

        find: function (key) {
            var ret = null, map = this.__entries, val;
            var i = map.length - 1;
            for (; i >= 0; i--) {
                val = map[i];
                if (val && key === val.key) {
                    ret = val.value;
                    break;
                }
            }
            return ret;
        },

        getEntrySet: function (arr) {
            var map = this.__entries, l = map.length;
            if (l) {
                for (var i = 0; i < l; i++) {
                    var e = map[i];
                    if (e) {
                        arr.push(e);
                    }
                }
            }
        },

        getKeys: function (arr) {
            var map = this.__entries, l = map.length;
            if (l) {
                for (var i = 0; i < l; i++) {
                    var e = map[i];
                    if (e) {
                        arr.push(e.key);
                    }
                }
            }
            return arr;
        },

        getValues: function (arr) {
            var map = this.__entries, l = map.length;
            if (l) {
                for (var i = 0; i < l; i++) {
                    var e = map[i];
                    if (e) {
                        arr.push(e.value);
                    }
                }
            }
            return arr;
        }
    }
});

/**
 * @ignoreCode
 * @class <p>Implementation of a HashTable for javascript.
 *    This HashTable implementation allows one to use anything as a key.
 *    </p>
 * <b>NOTE: THIS IS ~ 3 times slower than javascript native objects</b>
 *
 * <p> A use case for this collection is when one needs to store items in which the key will not be a string, or number</p>
 *
 * @name HashTable
 * @augments comb.collections.Collection
 * @memberOf comb.collections
 *
 * @property {Array} keys all keys contained in the table
 * @property {Array} values all values contained in the table
 * @property {Array} entrySet an array of objects. Each object contains a key, and value property.
 */
define([Collection, Iterable], {

    instance: {
        /**@lends comb.collections.HashTable.prototype*/

        constructor: function () {
            this.__map = {};
        },

        __entrySet: function () {
            var ret = [], es = [];
            for (var i in this.__map) {
                this.__map[i].getEntrySet(ret);
            }
            return ret;
        },

        /**
         * Put a key, value pair into the table
         *
         * <b>NOTE :</b> the collection will not check if the key previously existed.
         *
         * @param {Anything} key the key to look up the object.
         * @param {Anything} value the value that corresponds to the key.
         *
         * @returns the value
         */
        put: function (key, value) {
            var hash = hashFunction(key);
            var bucket = null;
            if ((bucket = this.__map[hash]) == null) {
                bucket = (this.__map[hash] = new Bucket());
            }
            bucket.pushValue(key, value);
            return value;
        },

        /**
         * Remove a key value pair from the table.
         *
         * @param key the key of the key value pair to remove.
         *
         * @returns the removed value.
         */
        remove: function (key) {
            var hash = hashFunction(key), ret = null;
            var bucket = this.__map[hash];
            if (bucket) {
                ret = bucket.remove(key);
            }
            return ret;
        },

        /**
         * Get the value corresponding to the key.
         *
         * @param key the key used to look up the value
         *
         * @returns null if not found, or the value.
         */
        "get": function (key) {
            var hash = hashFunction(key), ret = null;
            var bucket = null;
            if ((bucket = this.__map[hash]) != null) {
                ret = bucket.find(key);
            }
            return ret;
        },

        /**
         * Set the value of a previously existing key,value pair or create a new entry.
         *
         * @param key the key to be be used
         * @param value the value to be set
         *
         * @returns the value.
         */
        "set": function (key, value) {
            var hash = hashFunction(key), ret = null, bucket = null, map = this.__map;
            if ((bucket = map[hash]) != null) {
                ret = bucket.set(key, value);
            } else {
                ret = (map[hash] = new Bucket()).pushValue(key, value);
            }
            return ret;
        },

        /**
         * Tests if the table contains a particular key
         * @param key the key to test
         *
         * @returns {Boolean} true if it exitsts false otherwise.
         */
        contains: function (key) {
            var hash = hashFunction(key), ret = false;
            var bucket = null;
            if ((bucket = this.__map[hash]) != null) {
                ret = bucket.find(key) != null;
            }
            return ret;
        },

        /**
         * Returns a new HashTable containing the values of this HashTable, and the other table.
         * </br>
         * <b> DOES NOT CHANGE THE ORIGINAL!</b>
         * @param {comb.collections.HashTable} hashTable the hash table to concat with this.
         *
         * @returns {comb.collections.HashTable} a new HashTable containing all values from both tables.
         */
        concat: function (hashTable) {
            if (hashTable instanceof this._static) {
                var ret = new this._static();
                var otherEntrySet = hashTable.entrySet.concat(this.entrySet);
                for (var i = otherEntrySet.length - 1; i >= 0; i--) {
                    var e = otherEntrySet[i];
                    ret.put(e.key, e.value);
                }
                return ret;
            } else {
                throw new TypeError("When joining hashtables the joining arg must be a HashTable");
            }
        },

        /**
         * Creates a new HashTable containg values that passed the filtering function.
         *
         * @param {Function} cb Function to callback with each item, the first aruguments is an object containing a key and value field
         * @param {Object} scope the scope to call the function.
         *
         * @returns {comb.collections.HashTable} the HashTable containing the values that passed the filter.
         */
        filter: function (cb, scope) {
            var es = this.__entrySet(), ret = new this._static();
            es = es.filter.apply(es, arguments);
            for (var i = es.length - 1; i >= 0; i--) {
                var e = es[i];
                ret.put(e.key, e.value);
            }
            return ret;
        },

        /**
         *  Loop through each value in the hashtable
         *
         *  @param {Function} cb the function to call with an object containing a key and value field
         *  @param {Object} scope the scope to call the funciton in
         */
        forEach: function (cb, scope) {
            var es = this.__entrySet(), l = es.length, f = cb.bind(scope || this);
            es.forEach.apply(es, arguments);
        },

        /**
         * Determines if every item meets the condition returned by the callback.
         *
         * @param {Function} cb Function to callback with each item, the first aruguments is an object containing a key and value field
         * @param {Object} [scope=this] scope to call the function in
         *
         * @returns {Boolean} True if every item passed false otherwise
         */
        every: function () {
            var es = this.__entrySet();
            return es.every.apply(es, arguments);
        },

        /**
         * Loop through each value in the hashtable, collecting the value returned by the callback function.
         * @param {Function} cb Function to callback with each item, the first aruguments is an object containing a key and value field
         * @param {Object} [scope=this] scope to call the function in
         *
         * @returns {Array} an array containing the mapped values.
         */
        map: function () {
            var es = this.__entrySet(), ret = new this._static();
            return es.map.apply(es, arguments);
        },

        /**
         * Determines if some items meet the condition returned by the callback.
         *
         * @param {Function} cb Function to callback with each item, the first aruguments is an object containing a key and value field
         * @param {Object} [scope=this] scope to call the function in
         *
         * @returns {Boolean} True if some items passed false otherwise
         */
        some: function () {
            var es = this.__entrySet();
            return es.some.apply(es, arguments);
        },

        /**
         * Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
         *
         * @param {Function} callback Function to execute on each value in the array.
         * @param initialValue Value to use as the first argument to the first call of the callback..
         */
        reduce: function () {
            var es = this.__entrySet();
            return es.reduce.apply(es, arguments);
        },

        /**
         * Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value.
         *
         * @param {Function} callback Function to execute on each value in the array.
         * @param initialValue Value to use as the first argument to the first call of the callback..
         */
        reduceRight: function () {
            var es = this.__entrySet();
            return es.reduceRight.apply(es, arguments);
        },

        /**
         * Clears out all items from the table.
         */
        clear: function () {
            this.__map = {};
        },

        getters: {
            keys: function () {
                var ret = [], es = [];
                for (var i in this.__map) {
                    this.__map[i].getKeys(ret);
                }
                return ret;
            },

            values: function () {
                var ret = [], es = [];
                for (var i in this.__map) {
                    this.__map[i].getValues(ret);
                }
                return ret;
            },

            entrySet: function () {
                return this.__entrySet();
            },

            isEmpty: function () {
                return this.keys.length === 0;
            }
        }
    }

}).as(module);



