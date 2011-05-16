var define = require("../define").define,
        base = require("../base");
var Collection = define(null, {
    instance : {
        /**@lends comb.collections.Collection.prototype*/

        /**
         * Base class for all collections
         * @constructs
         */
        constructor : function(){},

        /**
         * Concats two collections
         */
        concat : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Joins two collections
         */
        join : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Slice a portion from a collection
         */
        slice : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Convert a collection to a string
         */
        toString : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Find the index of an item in a collection
         */
        indexOf : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Find the last index of an item in a collection
         */
        lastIndexOf : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Filter items from a collection
         */
        filter : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Loop through the items in a collection
         */
        forEach : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Determine if every item in a collection meets the criteria
         */
        every : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Map every item in a collection
         */
        map : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Determing if some items in a colleciton meet the criteria
         */
        some : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Reduce a collection
         */
        reduce : function(){
            throw new Error("Not Implemented");
        },

        /**
         * Reduce a collection starting from the right most position
         */
        reduceRight : function(){
            throw new Error("Not Implemented");
        }
    }
});

module.exports = exports = Collection;