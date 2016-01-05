"use strict";
var define = require("../define").define,
    Collection = require("./Collection"),
    Iterable = require("./Iterable"),
    base = require("../base"),
    multiply = base.string.multiply;

function compare(a, b) {
    var ret = 0;
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else if (!b) {
        return 1;
    }
    return ret;
}

var Tree = define([Collection, Iterable], {

    instance: {

        /**@lends comb.collections.Tree.prototype*/

        /**
         * Prints a node
         * @param node node to print
         * @param level the current level the node is at, Used for formatting
         */
        __printNode: function (node, level) {
            //console.log(level);
            var str = [];
            if (node == null || node === undefined) {
                str.push(multiply('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(node.right, level + 1);
                str.push(multiply('\t', level));
                str.push(node.data + "\n");
                console.log(str.join(""));
                this.__printNode(node.left, level + 1);
            }
        },

        /**
         * Base Class for all tree implementations
         * @constructs
         * @augments comb.collections.Collection
         * @augments comb.collections.Iterable
         * @memberOf comb.collections
         *
         * @param {Object} options options to initialize the tree
         * @param {Function} options.compare function used to compare items in a tree must return an integer
         *  <ul>
         *      </li>-1 for less than</li>
         *      </li>0 for equal</li>
         *      </li>1 for greater than</li>
         *  </ul>
         *
         */
        constructor: function (options) {
            options = options || {};
            this.compare = options.compare || compare;
            this.__root = null;
        },

        /**
         * Inserts an item into the tree
         * @param {Anything} data the item to insert
         */
        insert: function (data) {
            throw new Error("Not Implemented");
        },

        /**
         * Removes an item from the tree
         * @param {Anything} data the item to insert
         */
        remove: function (data) {
            throw new Error("Not Implemented");
        },

        /**
         * Clear all items from a tree
         */
        clear: function () {
            this.__root = null;
        },

        /**
         * Test if a tree is empty
         *
         * @return {Boolean} true if empty false otherwise
         */
        isEmpty: function () {
            return this.__root == null;
        },

        /**
         * Traverse a tree until the callback function returns false
         *
         * <p><b>Not typically used directly</b></p>
         *
         * @param {Object} node the node to start at
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         * @param {Function} callback called for each item, traversal continues until the function returns false
         *
         */
        traverseWithCondition: function (node, order, callback) {
            var cont = true;
            if (node) {
                order = order || Tree.PRE_ORDER;
                if (order === Tree.PRE_ORDER) {
                    cont = callback(node.data);
                    if (cont) {
                        cont = this.traverseWithCondition(node.left, order, callback);
                        cont && (cont = this.traverseWithCondition(node.right, order, callback));

                    }
                } else if (order === Tree.IN_ORDER) {
                    cont = this.traverseWithCondition(node.left, order, callback);
                    if (cont) {
                        cont = callback(node.data);
                        cont && (cont = this.traverseWithCondition(node.right, order, callback));
                    }
                } else if (order === Tree.POST_ORDER) {
                    cont = this.traverseWithCondition(node.left, order, callback);
                    if (cont) {
                        cont && (cont = this.traverseWithCondition(node.right, order, callback));
                        cont && (cont = callback(node.data));
                    }
                } else if (order === Tree.REVERSE_ORDER) {
                    cont = this.traverseWithCondition(node.right, order, callback);
                    if (cont) {
                        cont = callback(node.data);
                        cont && (cont = this.traverseWithCondition(node.left, order, callback));
                    }
                }
            }
            return cont;
        },

        /**
         * Traverse a tree
         *
         * <p><b>Not typically used directly</b></p>
         *
         * @param {Object} node the node to start at
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         * @param {Function} callback called for each item
         *
         */
        traverse: function (node, order, callback) {
            if (node) {
                order = order || Tree.PRE_ORDER;
                if (order === Tree.PRE_ORDER) {
                    callback(node.data);
                    this.traverse(node.left, order, callback);
                    this.traverse(node.right, order, callback);
                } else if (order === Tree.IN_ORDER) {
                    this.traverse(node.left, order, callback);
                    callback(node.data);
                    this.traverse(node.right, order, callback);
                } else if (order === Tree.POST_ORDER) {
                    this.traverse(node.left, order, callback);
                    this.traverse(node.right, order, callback);
                    callback(node.data);
                } else if (order === Tree.REVERSE_ORDER) {
                    this.traverseWithCondition(node.right, order, callback);
                    callback(node.data);
                    this.traverseWithCondition(node.left, order, callback);

                }
            }
        },

        /**
         * Loop through each item in the tree
         * @param {Function} cb called for each item in the tree
         * @param {Object} [scope=this] scope to call the function in
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         */
        forEach: function (cb, scope, order) {
            if (typeof cb !== "function") {
                throw new TypeError("cb must be a function");
            }
            order = order || Tree.IN_ORDER;
            scope = scope || this;
            this.traverse(this.__root, order, function (node) {
                cb.call(scope, node, this);
            });
        },

        /**
         * Loop through each item in the tree, collecting the value returned by the callback funciton.
         * @param {Function} cb called for each item in the tree.
         *                   Whatever the function returns is inserted into the return tree
         * @param {Object} [scope=this] scope to call the function in
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         *
         * @return {comb.collections.Tree} the tree with the mapped items
         */
        map: function (cb, scope, order) {
            if (typeof cb !== "function") {
                throw new TypeError("cb must be a function");
            }

            order = order || Tree.IN_ORDER;
            scope = scope || this;
            var ret = new this._static();
            this.traverse(this.__root, order, function (node) {
                ret.insert(cb.call(scope, node, this));
            });
            return ret;
        },

        /**
         * Filters a tree, only returning items that result in true being returned from the callback
         *
         * @param {Function} cb called for each item in the tree
         * @param {Object} [scope=this] scope to call the function in
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         *
         * @return {comb.collections.Tree} the tree with items that resulted in true being returned from the callback
         */
        filter: function (cb, scope, order) {
            if (typeof cb !== "function") {
                throw new TypeError("cb must be a function");
            }

            order = order || Tree.IN_ORDER;
            scope = scope || this;
            var ret = new this._static();
            this.traverse(this.__root, order, function (node) {
                var include = cb.call(scope, node, this);
                include && ret.insert(node);
            });
            return ret;
        },

        /**
         * Reduces a tree
         *
         * @param {Function} fun called for each item in the tree
         * @param [accumulator=First item in tree(Order dependant)] scope to call the function in
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         *
         * @return the result of the reduce function
         */
        reduce: function (fun, accumulator, order) {
            var arr = this.toArray(order);
            var args = [fun];
            if (!base.isUndefinedOrNull(accumulator)) {
                args.push(accumulator);
            }
            return arr.reduce.apply(arr, args);
        },

        /**
         * Reduces from right to left
         *
         * @param {Function} fun called for each item in the tree
         * @param [accumulator=First item in tree(Order dependant)] scope to call the function in
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         *
         * @return the result of the reduce function
         */
        reduceRight: function (fun, accumulator, order) {
            var arr = this.toArray(order);
            var args = [fun];
            if (!base.isUndefinedOrNull(accumulator)) {
                args.push(accumulator);
            }
            return arr.reduceRight.apply(arr, args);
        },

        /**
         * Determines if every item meets the condition returned by the callback.
         *
         * @param {Function} cb called for each item in the tree
         * @param {Object} [scope=this] scope to call the function in
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         *
         * @return {Boolean} True if every item passed false otherwise
         */
        every: function (cb, scope, order) {
            if (typeof cb !== "function") {
                throw new TypeError("cb must be a function");
            }

            order = order || Tree.IN_ORDER;
            scope = scope || this;
            var ret = false;
            this.traverseWithCondition(this.__root, order, function (node) {
                ret = cb.call(scope, node, this);
                return ret;
            });
            return ret;
        },

        /**
         * Determines if some item meet the condition returned by the callback. Traversal ends the first time true is found.
         *
         * @param {Function} cb called for each item in the tree
         * @param {Object} [scope=this] scope to call the function in
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         *
         * @return {Boolean} True if every item passed false otherwise
         */
        some: function (cb, scope, order) {
            if (typeof cb !== "function") {
                throw new TypeError("cb must be a function");
            }

            order = order || Tree.IN_ORDER;
            scope = scope || this;
            var ret;
            this.traverseWithCondition(this.__root, order, function (node) {
                ret = cb.call(scope, node, this);
                return !ret;
            });
            return ret;
        },

        /**
         * Converts a tree into an array based on the specified order
         *
         * @param {Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER} [order=Tree.IN_ORDER] the traversal scheme
         *
         * @return {Array} array of all items in the order specified.
         */
        toArray: function (order) {
            order = order || Tree.IN_ORDER;
            var arr = [];
            this.traverse(this.__root, order, function (node) {
                arr.push(node);
            });
            return arr;
        },


        /**
         * Determines if a value is contained in the tree
         * @param {*} value the value to find
         *
         * @return {Boolean} true if the tree contains the item false otherwise.
         */
        contains: function (value) {
            var ret = false;
            var root = this.__root;
            while (root != null) {
                var cmp = this.compare(value, root.data);
                if (cmp) {
                    root = root[(cmp === -1) ? "left" : "right"];
                } else {
                    ret = true;
                    root = null;
                }
            }
            return ret;
        },

        /**
         * Finds a value in the tree
         * @param {*} value the value to find
         *
         * @return the value of the node that matched
         */
        find: function (value) {
            var ret;
            var root = this.__root;
            while (root != null) {
                var cmp = this.compare(value, root.data);
                if (cmp) {
                    root = root[(cmp === -1) ? "left" : "right"];
                } else {
                    ret = root.data;
                    break;
                }
            }
            return ret;
        },

        /**
         * Find all values less than a value
         * @param {*} value the value to find nodes less than
         * @param {Boolean} [exclusive=false] if true the value will NOT be included in the return array
         *
         * @return {Array} the array containing all values less than
         */
        findLessThan: function (value, exclusive) {
            //find a better way!!!!
            var ret = [], compare = this.compare;
            this.traverseWithCondition(this.__root, exports.IN_ORDER, function (v) {
                var cmp = compare(value, v);
                if ((!exclusive && cmp === 0) || cmp === 1) {
                    ret.push(v);
                    return true;
                } else {
                    return false;
                }
            });
            return ret;
        },

        /**
         * Find all greater than a value
         * @param {*} value the value to find nodes greater than
         * @param {Boolean} [exclusive=false] if true the value will NOT be included in the return array
         *
         * @return {Array} the array containing all values greater than
         */
        findGreaterThan: function (value, exclusive) {
            //find a better way!!!!
            var ret = [], compare = this.compare;
            this.traverse(this.__root, exports.REVERSE_ORDER, function (v) {
                var cmp = compare(value, v);
                if ((!exclusive && cmp === 0) || cmp === -1) {
                    ret.push(v);
                    return true;
                } else {
                    return false;
                }
            });
            return ret;
        },

        /**
         * Prints a tree to the console.
         */
        print: function () {
            this.__printNode(this.__root, 0);
        }
    },

    static: {
        /** @lends comb.collections.Tree */

        /**
         * Pre Order
         */
        PRE_ORDER: "pre_order",

        /**
         * In Order
         */
        IN_ORDER: "in_order",

        /**
         * Post Order
         */
        POST_ORDER: "post_order",

        /**

         * Reverse Order
         */
        REVERSE_ORDER: "reverse_order"
    }
});
/**@ignore*/
module.exports = exports = Tree;

