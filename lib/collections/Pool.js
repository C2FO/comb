"use strict";
var define = require("../define").define,
    Collection = require("./Collection"),
    Queue = require("./Queue"),
    base = require("../base");

/**
 * @class Base class for a pool.
 *
 * @name Pool
 * @memberOf comb.collections
 *
 * @property {Number} count the total number of objects in the pool, including free and in use objects.
 * @property {Number} freeCount the number of free objects in this pool.
 * @property {Number} inUseCount the number of objects in use in this pool.
 * @property {Number} [minObjects=0] the minimum number of objects this pool should contain.
 * @property {Number} [maxObjects=1] the maximum number of objects this pool should contain
 * @ignoreCode
 */
exports = module.exports = define(null, {
    instance: {
        /**@lends comb.collections.Pool.prototype*/

        __minObjects: 0,

        __maxObjects: 1,

        constructor: function (options) {
            options = options || {};
            this.__freeObjects = new Queue();
            this.__inUseObjects = [];
            this.__minObjects = options.minObjects || 0;
            this.__maxObjects = options.maxObjects || 1;
            this.minObjects = this.__minObjects;
            this.maxObjects = this.__maxObjects;
        },

        /**
         * Retrieves an object from this pool.
         * `
         * @return {*} an object to contained in this pool
         */
        getObject: function () {
            var ret;
            if (this.count <= this.__maxObjects && this.freeCount > 0) {
                ret = this.__freeObjects.dequeue();
                this.__inUseObjects.push(ret);
            } else if (this.count < this.__maxObjects) {
                ret = this.createObject();
                this.__inUseObjects.push(ret);
            }
            return ret;
        },

        /**
         * Returns an object to this pool. The object is validated before it is returned to the pool,
         * if the validation fails then it is removed from the pool;
         * @param {*} obj the object to return to the pool
         */
        returnObject: function (obj) {
            var index;
            if (this.validate(obj) && this.count <= this.__maxObjects && (index = this.__inUseObjects.indexOf(obj)) > -1) {
                this.__freeObjects.enqueue(obj);
                this.__inUseObjects.splice(index, 1);
            } else {
                this.removeObject(obj);
            }
        },

        /**
         * Removes an object from the pool, this can be overriden to provide any
         * teardown of objects that needs to take place.
         *
         * @param {*} obj the object that needs to be removed.
         *
         * @return {*} the object removed.
         */
        removeObject: function (obj) {
            var index;
            if (this.__freeObjects.contains(obj)) {
                this.__freeObjects.remove(obj);
            } else if ((index = this.__inUseObjects.indexOf(obj)) > -1) {
                this.__inUseObjects.splice(index, 1);
            }
            //otherwise its not contained in this pool;
            return obj;
        },

        /**
         * Validates an object in this pool.
         * </br>
         * <b>THIS SHOULD BE OVERRIDDEN TO VALIDATE</b>
         *
         * @param {*} obj the object to validate.
         */
        validate: function (obj) {
            return true;
        },

        /**
         * Creates a new object for this pool.
         * * </br>
         * <b>THIS SHOULD BE OVERRIDDEN TO ADD THE CORRECT TYPE OF OBJECT</b>
         *
         * @return {Object} be default just creates an object.
         */
        createObject: function () {
            return {};
        },

        setters: {
            minObjects: function (l) {

                if (l <= this.__maxObjects) {
                    this.__minObjects = l;
                    var i;
                    if ((i = this.count) < l) {
                        while (i++ < l) {
                            this.__freeObjects.enqueue(this.createObject());
                        }
                    }
                } else {
                    throw "comb.collections.Pool : minObjects cannot be greater than maxObjects.";
                }
            },
            maxObjects: function (l) {
                if (l >= this.__minObjects) {
                    this.__maxObjects = l;
                    var i = this.count, j = this.freeCount, fo = this.__freeObjects;
                    while (i > l && j >= 0) {
                        this.removeObject(fo.dequeue());
                        j--;
                        i--;
                    }
                } else {
                    throw "comb.collections.Pool : maxObjects cannot be less than maxObjects.";
                }

            }
        },

        getters: {
            freeCount: function () {
                return this.__freeObjects.count;
            },
            inUseCount: function () {
                return this.__inUseObjects.length;
            },
            count: function () {
                return this.__freeObjects.count + this.__inUseObjects.length;

            },

            minObjects: function () {
                return this.__minObjects;
            },
            maxObjects: function () {
                return this.__maxObjects;
            }
        }
    }
});