"use strict";
var define = require("../define").define,
    Tree = require("./Tree"),
    base = require("../base"),
    multiply = base.string.multiply,
    RED = "red",
    BLACK = "black",
    nil = {level: 0, data: null};

/**
 *
 * @ignoreCode
 * @class <p>Andersson Trees are a version of a balanced Binary tree, while similar to RedBlack Trees the balancing is not as strict.</p>
 *
 * <b>Performance</b>
 * <table>
 *     <tr><td></td><td>Best</td><td>Worst</td></tr>
 *     <tr><td>space</td><td>O(n)</td><td>O(n)</td></tr>
 *     <tr><td>Search</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Delete</td><td>O(log n)</td><td>O(log n)</td></tr>
 * <table>
 * @name AnderssonTree
 * @augments comb.collections.Tree
 * @memberOf comb.collections
 */


module.exports = exports = define(Tree, {

    instance: {
        /**@lends comb.collections.AnderssonTree.prototype*/

        isEmpty: function () {
            return this.__root === nil || this._super(arguments);
        },

        insert: function (data) {
            if (this.__root == null) {
                this.__root = nil;
            }
            this.__root = insert(this.__root, data, this.compare);
        },

        remove: function (data) {
            this.__root = remove(this.__root, data, this.compare);
        },


        traverseWithCondition: function (node, order, callback) {
            var cont = true;
            if (node !== nil) {
                return this._super(arguments);
            }
            return cont;
        },


        traverse: function (node, order, callback) {
            if (node !== nil) {
                this._super(arguments);
            }
        },

        contains: function (value) {
            if (this.__root !== nil) {
                return this._super(arguments);
            }
            return false;
        },

        __printNode: function (node, level) {
            var str = [];
            if (node.data == null || node == null) {
                str.push(multiply('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(node.right, level + 1);
                str.push(multiply('\t', level));
                str.push(node.data + ":" + node.level + "\n");
                console.log(str.join(""));
                this.__printNode(node.left, level + 1);
            }
        }

    }

});

function makeNode(data, level) {
    return {
        data: data,
        level: level,
        left: nil,
        right: nil
    };
}

function skew(root) {
    if (root.level !== 0 && root.left.level === root.level) {
        var save = root.left;
        root.left = save.right;
        save.right = root;
        root = save;
    }
    return root;
}

function split(root) {
    if (root.level !== 0 && root.right.right.level === root.level) {
        var save = root.right;
        root.right = save.left;
        save.left = root;
        root = save;
        ++root.level;
    }
    return root;
}

function insert(root, data, compare) {
    if (root === nil) {
        root = makeNode(data, 1);
    }
    else {
        var dir = compare(data, root.data) === -1 ? "left" : "right";
        root[dir] = insert(root[dir], data, compare);
        root = skew(root);
        root = split(root);
    }
    return root;
}

function remove(root, data, compare) {
    var rLeft, rRight;
    if (root !== nil) {
        var cmp = compare(data, root.data);
        if (cmp === 0) {
            rLeft = root.left, rRight = root.right;
            if (rLeft !== nil && rRight !== nil) {
                var heir = rLeft;
                while (heir.right !== nil) {
                    heir = heir.right;
                }
                root.data = heir.data;
                root.left = remove(rLeft, heir.data, compare);
            } else {
                root = root[rLeft === nil ? "right" : "left"];
            }
        } else {
            var dir = cmp === -1 ? "left" : "right";
            root[dir] = remove(root[dir], data, compare);
        }
    }
    if (root !== nil) {
        var rLevel = root.level;
        var rLeftLevel = root.left.level, rRightLevel = root.right.level;
        if (rLeftLevel < rLevel - 1 || rRightLevel < rLevel - 1) {
            if (rRightLevel > --root.level) {
                root.right.level = root.level;
            }

            root = skew(root);
            root = split(root);
        }
    }
    return root;
}

