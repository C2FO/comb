"use strict";
var define = require("../define").define,
    Tree = require("./Tree"),
    base = require("../base"),
    multiply = base.string.multiply,
    RED = "red",
    BLACK = "black",
    RedBlackTree;

function isRed(node) {
    return node != null && node.red;
}

function makeNode(data) {
    return {
        data: data,
        red: true,
        left: null,
        right: null
    };
}

var insert = function (root, data, compare) {
    if (root == null) {
        return makeNode(data, null);

    } else {
        var cmp = compare(data, root.data);
        if (cmp) {
            var dir = cmp === -1 ? "left" : "right";
            var otherDir = dir === "left" ? "right" : "left";
            root[dir] = insert(root[dir], data, compare);
            var node = root[dir];

            if (isRed(node)) {

                var sibling = root[otherDir];
                if (isRed(sibling)) {
                    /* Case 1 */
                    root.red = true;
                    node.red = false;
                    sibling.red = false;
                } else {
                    if (isRed(node[dir])) {
                        root = rotateSingle(root, otherDir);
                    } else if (isRed(node[otherDir])) {

                        root = rotateDouble(root, otherDir);
                    }
                }

            }
        }
    }
    return root;
};

function rotateSingle(root, dir) {
    var otherDir = dir === "left" ? "right" : "left";
    var save = root[otherDir];
    root[otherDir] = save[dir];
    save[dir] = root;
    root.red = true;
    save.red = false;
    return save;
}

function rotateDouble(root, dir) {
    var otherDir = dir === "left" ? "right" : "left";
    root[otherDir] = rotateSingle(root[otherDir], otherDir);
    return rotateSingle(root, dir);
}


function remove(root, data, done, compare) {
    if (root == null) {
        done.done = true;
    } else {
        var dir;
        if (compare(data, root.data) === 0) {
            if (root.left == null || root.right == null) {
                var save = root[root.left == null ? "right" : "left"];
                /* Case 0 */
                if (isRed(root)) {
                    done.done = true;
                } else if (isRed(save)) {
                    save.red = false;
                    done.done = true;
                }
                return save;
            } else {
                var heir = root.right, p;
                while (heir.left != null) {
                    p = heir;
                    heir = heir.left;
                }
                p && (p.left = null);
                root.data = heir.data;
                data = heir.data;
            }
        }
        dir = compare(data, root.data) === -1 ? "left" : "right";
        root[dir] = remove(root[dir], data, done, compare);
        !done.done && (root = removeBalance(root, dir, done));
    }
    return root;
}

function removeBalance(root, dir, done) {
    var notDir = dir === "left" ? "right" : "left";
    var p = root, s = p[notDir];
    if (isRed(s)) {
        root = rotateSingle(root, dir);
        s = p[notDir];
    }
    if (s != null) {
        if (!isRed(s.left) && !isRed(s.right)) {
            isRed(p) && (done.done = true);
            p.red = 0;
            s.red = 1;
        } else {
            var save = p.red, newRoot = ( root === p );
            p = (isRed(s[notDir]) ? rotateSingle : rotateDouble)(p, dir);
            p.red = save;
            p.left.red = p.right.red = 0;
            if (newRoot) {
                root = p;
            } else {
                root[dir] = p;
            }
            done.done = true;
        }
    }
    return root;
}

/**
 * @class <p>A RedBlack tree is a form of a self balancing binary tree.</p>
 *
 * <b>Performance</b>
 * <table>
 *     <tr><td></td><td>Best</td><td>Worst</td></tr>
 *     <tr><td>Space</td><td>O(n)</td><td>O(n)</td></tr>
 *     <tr><td>Search</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Delete</td><td>O(log n)</td><td>O(log n)</td></tr>
 * <table>
 *     @name RedBlackTree
 * @augments comb.collections.Tree
 * @memberOf comb.collections
 * @ignoreCode
 */
module.exports = exports = define(Tree, {
    instance: {
        /**@lends comb.collections.RedBlackTree.prototype*/
        insert: function (data) {
            this.__root = insert(this.__root, data, this.compare);
            this.__root.red = false;
        },

        remove: function (data) {
            var done = {done: false};
            var root = remove(this.__root, data, done, this.compare);
            if (root != null) {
                root.red = 0;
            }
            this.__root = root;
        },


        __printNode: function (node, level) {
            var str = [];
            if (node == null || node === undefined) {
                str.push(multiply('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(node.right, level + 1);
                str.push(multiply('\t', level));
                str.push((node.red ? "RED" : "BLACK") + ":" + node.data + "\n");
                console.log(str.join(""));
                this.__printNode(node.left, level + 1);
            }
        }

    }
});

