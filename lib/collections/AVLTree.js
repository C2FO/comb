var define = require("../define").define,
        Tree = require("./Tree"),
        base = require("../base");


var padding = function(char, numSpaces) {
    var ret = [];
    for (var i = 0; i < numSpaces; i++)
        ret.push(char);
    return ret.join("");
};
var abs = Math.abs;

var rotateSingle = function(root, dir) {
    var otherDir = dir == "left" ? "right" : "left";
    var save = root[otherDir];
    root[otherDir] = save[dir];
    save[dir] = root;
    return save;
};

var makeNode = function(data) {
    return {
        data : data,
        balance : 0,
        left : null,
        right : null
    }
};


var rotateDouble = function(root, dir) {
    var otherDir = dir == "left" ? "right" : "left";
    root[otherDir] = rotateSingle(root[otherDir], otherDir);
    return rotateSingle(root, dir);
};

var adjustBalance = function(root, dir, bal) {
    var otherDir = dir == "left" ? "right" : "left";
    var n = root[dir], nn = n[otherDir];
    if (nn.balance == 0)
        root.balance = n.balance = 0;
    else if (nn.balance == bal) {
        root.balance = -bal;
        n.balance = 0;
    }
    else { /* nn.balance == -bal */
        root.balance = 0;
        n.balance = bal;
    }
    nn.balance = 0;
};

var insertAdjustBalance = function(root, dir) {
    var otherDir = dir == "left" ? "right" : "left";

    var n = root[dir];
    var bal = dir == "left" ? -1 : +1;

    if (n.balance == bal) {
        root.balance = n.balance = 0;
        root = rotateSingle(root, otherDir);
    }
    else {
        adjustBalance(root, dir, bal);
        root = rotateDouble(root, otherDir);
    }

    return root;

};

var removeAdjustBalance = function(root, dir, done) {
    var otherDir = dir == "left" ? "right" : "left";
    var n = root[otherDir];
    var bal = dir == "left" ? -1 : 1;
    if (!n) console.log(root, dir);
    if (n.balance == -bal) {
        root.balance = n.balance = 0;
        root = rotateSingle(root, dir);
    }
    else if (n.balance == bal) {
        adjustBalance(root, otherDir, -bal);
        root = rotateDouble(root, dir);
    }
    else { /* n.balance == 0 */
        root.balance = -bal;
        n.balance = bal;
        root = rotateSingle(root, dir);
        done.done = true;
    }
    return root;
};

var insert = function(root, data, done, compare) {
    if (root == null || root == undefined)
        root = makeNode(data);
    else {
        var dir = compare(data, root.data) == -1 ? "left" : "right";
        root[dir] = insert(root[dir], data, done, compare);

        if (!done.done) {
            /* Update balance factors */
            root.balance += dir == "left" ? -1 : 1;

            /* Rebalance as necessary and terminate */
            if (root.balance == 0)
                done.done = 1;
            else if (abs(root.balance) > 1) {
                root = insertAdjustBalance(root, dir);
                done.done = 1;
            }
        }
    }

    return root;
};

var remove = function(root, data, done, compare) {
    var dir, cmp, save;
    if (root != null) {
        //Remove node
        cmp = compare(data, root.data);
        if (cmp === 0) {
            // Unlink and fix parent
            if (root.left == null || root.right == null) {
                dir = root.left == null ? "right" : "left";
                save = root[dir];
                return save;
            }
            else {
                var heir = root.left;
                while (heir.right != null) {
                    heir = heir.right;
                }
                root.data = heir.data;
                //reset and start searching
                data = heir.data;
            }
        }
        dir = compare(root.data, data) == -1 ? "right" : "left";
        root[dir] = remove(root[dir], data, done, compare);
        if (!done.done) {
            /* Update balance factors */
            root.balance += (dir == "left" ? 1 : -1);
            /* Terminate or rebalance as necessary */
            var a = abs(root.balance);
            if (a === 1)
                done.done = true;
            else if (a > 1)
                root = removeAdjustBalance(root, dir, done);
        }
    }
    return root;
};


/**
 * @class <p>An AVL tree is a self-balancing binary search tree.
 *    In an AVL tree, the heights of the two child subtrees of any node differ by at most one.
 *    Lookup, insertion, and deletion all take O(log n) time in both the average and worst cases,
 *    where n is the number of nodes in the tree prior to the operation.
 *    Insertions and deletions may require the tree to be rebalanced by one or more tree rotations.</p>
 * <p>AVL trees are more rigidly balanced than red-black trees, leading to slower insertion and removal but faster retrieval</p>
 *
 * <b>Performance</b>
 * <table>
 *     <tr><td></td><td>Best</td><td>Worst</td></tr>
 *     <tr><td>Space</td><td>O(n)</td><td>O(n)</td></tr>
 *     <tr><td>Search</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
 *     <tr><td>Delete</td><td>O(log n)</td><td>O(log n)</td></tr>
 * <table>
 * @name AVLTree
 * @augments comb.collections.Tree
 * @memberOf comb.collections
 */
module.exports = exports  = define(Tree, {
    instance : {
        /**@lends comb.collections.AVLTree.prototype*/

        insert : function(data) {
            var done = {done : false};
            this.__root = insert(this.__root, data, done, this.compare);
        },


        remove : function(data) {
            this.__root = remove(this.__root, data, {done : false}, this.compare);
        },

        __printNode : function(node, level) {
            var str = [];
            if (node == null) {
                str.push(padding('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(node.right, level + 1);
                str.push(padding('\t', level));
                str.push(node.data + ":" + node.balance + "\n");
                console.log(str.join(""));
                this.__printNode(node.left, level + 1);
            }
        }

    }
});

