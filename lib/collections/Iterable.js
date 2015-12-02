"use strict";
var define = require("../define").define,
    base = require("../base");

/**
 * @ignoreCode
 * @class Base class for all collections
 * @name Iterable
 * @memberOf comb.collections
 */
define(null, {
    instance: {
        /**@lends comb.collections.Iterable.prototype*/

        /**
         * Filter items from a collection
         */
        filter: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Loop through the items in a collection
         */
        forEach: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Determine if every item in a collection meets the criteria
         */
        every: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Map every item in a collection
         */
        map: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Determing if some items in a colleciton meet the criteria
         */
        some: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Reduce a collection
         */
        reduce: function () {
            throw new Error("Not Implemented");
        },

        /**
         * Reduce a collection starting from the right most position
         */
        reduceRight: function () {
            throw new Error("Not Implemented");
        }
    }
}).as(module);
