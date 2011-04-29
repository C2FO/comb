var define = require("../define").define,
        Tree = require("./Tree"),
        base = require("../base");

var RED = "red", BLACK = "black";

var padding = function(char, numSpaces) {
    var ret = [];
    for (var i = 0; i < numSpaces; i++)
        ret.push(char);
    return ret.join("");
};
module.exports = exports = define(Tree, {
    instance : {


        __isRed : function(node) {
            return node != null && node.red;
        },

        __makeNode : function(data, parent) {
            return {
                data : data,
                red : true,
                left : null,
                right : null
            }
        },

        insert : function(data) {
            this.__root = this.__insert(this.__root, data);
            this.__root.red = false;
        },

        __insert : function(root, data) {
            if (root == null) {
                return this.__makeNode(data, null);

            } else {
                var cmp = this.compare(data, root.data);
                if (cmp) {
                    var dir = cmp == -1 ? "left" : "right";
                    var otherDir = dir == "left" ? "right" : "left";
                    root[dir] = this.__insert(root[dir], data);
                    var node = root[dir];

                    if (this.__isRed(node)) {

                        var sibling = root[otherDir];
                        if (this.__isRed(sibling)) {

                            /* Case 1 */
                            root.red = true;
                            node.red = false;
                            sibling.red = false;
                        } else {

                            if (this.__isRed(node[dir])) {

                                root = this.__rotateSingle(root, otherDir);
                            } else if (this.__isRed(node[otherDir])) {

                                root = this.__rotateDouble(root, otherDir);
                            }
                        }

                    }
                }
            }
            return root;
        },

        __rotateSingle : function(root, dir) {
            var otherDir = dir == "left" ? "right" : "left";
            var save = root[otherDir];
            root[otherDir] = save[dir];
            save[dir] = root;
            root.red = true;
            save.red = false;
            return save;
        },

        __rotateDouble : function(root, dir) {
            var otherDir = dir == "left" ? "right" : "left";
            root[otherDir] = this.__rotateSingle(root[otherDir], otherDir);
            return this.__rotateSingle(root, dir);
        },


        __remove : function (root, data, done) {
            var compare = this.compare.bind(this),isRed = this.__isRed.bind(this);
            if (root == null) {
                done.done = true;
            } else {
                var dir;
                if (compare(data, root.data) == 0) {
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
                    }
                    else {
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
                dir = compare(data, root.data) == -1 ? "left" : "right";
                root[dir] = this.__remove(root[dir], data, done);
                !done.done && (root = this.__removeBalance(root, dir, done));
            }
            return root;
        },

        __removeBalance : function(root, dir, done) {
            var notDir = dir == "left" ? "right" : "left",
                    isRed = this.__isRed.bind(this),
                    rotateSingle = this.__rotateSingle.bind(this),
                    rotateDouble = this.__rotateDouble.bind(this);
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
                }else {
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
        },


        remove : function(data) {
            var done = {done : false};
            var root = this.__remove(this.__root, data, done);
            if (root != null)
                root.red = 0;
            this.__root = root;
        },


        __printNode : function(node, level) {
            var str = [];
            if (node == null || node == undefined) {
                str.push(padding('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(node.right, level + 1);
                str.push(padding('\t', level));
                str.push((node.red ? "RED" : "BLACK") + ":" + node.data + "\n");
                console.log(str.join(""));
                this.__printNode(node.left, level + 1);
            }
        }

    }

});
