"use strict";
var define = require("../define").define,
    base = require("../base");

/**
 * @ignoreCode
 * @class Base class for all collections
 * @name Collection
 * @memberOf comb.collections
 */
define(null, {
    instance: {
        /**@lends comb.collections.Collection.prototype*/

        /**
         * Concats two collections
         */
        concat: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Joins two collections
         */
        join: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Slice a portion from a collection
         */
        slice: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Convert a collection to a string
         */
        toString: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Find the index of an item in a collection
         */
        indexOf: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Find the last index of an item in a collection
         */
        lastIndexOf: function () {
            throw new Error("Not Implemented");
        }
    }
}).as(module);