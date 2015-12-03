"use strict";
var define = require("../define").define,
    Tree = require("./Tree"),
    base = require("../base");

/**
 *
 * @ignoreCode
 * @class <p>A Search tree that maintains the following properties</p>
 * <ul>
 *     <li>The left subtree of a node contains only nodes with keys less than the node's key.
 *     <li>The right subtree of a node contains only nodes with keys greater than the node's key.
 *     <li>Both the left and right subtrees must also be binary search trees.
 * </ul>
 *
 * <b>Performance</b>
 * <table>
 *     <tr><td></td><td>Best</td><td>Worst</td></tr>
 *     <tr><td>Space</td><td>O(n)</td><td>O(n)</td></tr>
 *     <tr><td>Search</td><td>O(log n)</td><td>O(n)</td></tr>
 *     <tr><td>Insert</td><td>O(log n)</td><td>O(n)</td></tr>
 *     <tr><td>Delete</td><td>O(log n)</td><td>O(n)</td></tr>
 * <table>
 * @name BinaryTree
 * @augments comb.collections.Tree
 * @memberOf comb.collections
 */
module.exports = exports = define(Tree, {
    instance: {
        /**@lends comb.collections.BinaryTree.prototype*/

        insert: function (data) {
            if (this.__root == null) {
                this.__root = {
                    data: data,
                    parent: null,
                    left: null,
                    right: null
                };
                return this.__root;
            }
            var compare = this.compare;
            var root = this.__root;
            while (root != null) {
                var cmp = compare(data, root.data);
                if (cmp) {
                    var leaf = (cmp === -1) ? "left" : "right";
                    var next = root[leaf];
                    if (next == null) {
                        root[leaf] = {data: data, parent: root, left: null, right: null};
                        return root[leaf];
                    } else {
                        root = next;
                    }
                } else {
                    return null;
                }
            }
        },

        remove: function (data) {
            if (this.__root != null) {
                var head = {right: this.__root}, it = head;
                var p, f = null;
                var dir = "right";
                while (it[dir] != null) {
                    p = it;
                    it = it[dir];
                    var cmp = this.compare(data, it.data);
                    if (!cmp) {
                        f = it;
                    }
                    dir = (cmp === -1 ? "left" : "right");
                }
                if (f != null) {
                    f.data = it.data;
                    p[p.right === it ? "right" : "left"] = it[it.left == null ? "right" : "left"];
                }
                this.__root = head.right;
            }

        }
    }
});


