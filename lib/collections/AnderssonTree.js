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

var nil = {level : 0, data : null};
module.exports = exports = define(Tree, {
    instance : {

        __makeNode : function(data, level) {
            return {
                data : data,
                level : level,
                left : nil,
                right : nil
            }
        },

        isEmpty : function() {
            return this.__root == nil || this.super(arguments);
        },

        __skew : function(root) {
            if (root.level != 0 && root.left.level == root.level) {
                var save = root.left;
                root.left = save.right;
                save.right = root;
                root = save;
            }
            return root;
        },
        __split : function(root) {
            if (root.level != 0 && root.right.right.level == root.level) {
                var save = root.right;
                root.right = save.left;
                save.left = root;
                root = save;
                ++root.level;
            }
            return root;
        },

        __insert : function(root, data) {
            if (root == nil) {
                root = this.__makeNode(data, 1);
            }
            else {
                var dir = this.compare(data, root.data) == -1 ? "left" : "right";
                root[dir] = this.__insert(root[dir], data);
                root = this.__skew(root);
                root = this.__split(root);
            }
            return root;
        },

        insert : function(data) {
            if (this.__root == null) this.__root = nil;
            this.__root = this.__insert(this.__root, data);
        },

        __remove : function(root, data) {
            var rLeft, rRight;
            if (root != nil) {
                var cmp = this.compare(data, root.data);
                if (cmp == 0) {
                    rLeft = root.left,rRight = root.right;
                    if (rLeft != nil && rRight != nil) {
                        var heir = rLeft;
                        while (heir.right != nil)
                            heir = heir.right;
                        root.data = heir.data;
                        root.left = this.__remove(rLeft, heir.data);
                    } else {
                        root = root[rLeft == nil ? "right" : "left"];
                    }
                } else {
                    var dir = cmp == -1 ? "left" : "right";
                    root[dir] = this.__remove(root[dir], data);
                }
            }
            if (root != nil) {
                var rLevel = root.level;
                var rLeftLevel = root.left.level, rRightLevel = root.right.level;
                if (rLeftLevel < rLevel - 1 || rRightLevel < rLevel - 1) {
                    if (rRightLevel > --root.level)
                        root.right.level = root.level;

                    root = this.__skew(root);
                    root = this.__split(root);
                }
            }
            return root;
        },

        remove : function(data) {
            this.__root = this.__remove(this.__root, data);
        },

        traverseWithCondition : function(node, order, callback) {
            var cont = true;
            if (node != nil) {
                return this.super(arguments);
            }
            return cont;
        },


        traverse : function(node, order, callback) {
            if (node != nil) {
                this.super(arguments);
            }
        },

        contains : function(value) {
            if(this.__root != nil){
                return this.super(arguments);
            }
            return false;
        },



        __printNode : function(node, level) {
            var str = [];
            if (node.data == null || node == null) {
                str.push(padding('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(node.right, level + 1);
                str.push(padding('\t', level));
                str.push(node.data + ":" + node.level + "\n");
                console.log(str.join(""));
                this.__printNode(node.left, level + 1);
            }
        }

    }

});
