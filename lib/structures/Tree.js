var define = require("../define").define,
        Collection = require("./Collection"),
        base = require("../base");

var compare = function(a, b) {
    var ret = 0;
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return ret;

};

var padding = function(char, numSpaces) {
    var ret = [];
    for (var i = 0; i < numSpaces; i++)
        ret.push(char);
    return ret.join("");
};

var tree = (module.exports = exports = define(null, {
    instance : {

        __tree : null,

        constructor : function(options) {
            options = options || {};
            this.compare = options.compare || compare;
            this.__tree = [];
            this.__root = null;
        },

        getNode : function(pos) {
            if (this.__tree[pos]) {
                return {
                    data : this.__tree[pos],
                    pos : pos,
                    left : this.__getLeftPos(pos),
                    right : this.__getRightPos(pos)

                }
            } else {
                return null;
            }
        },

        __getLeftPos : function(pos) {
            return  pos * 2 + 1;
        },

        __getRightPos : function(pos) {
            return  pos * 2 + 2;
        },

        __findMinNode : function(node) {
            var left = node.left;
            while (left != null) {
                node = left;
                left = left.left;
            }
            return node;

        },

        __findMaxNode : function(node) {
            var right = node.left;
            while (right != null) {
                node = right;
                right = right.right;
            }
            return node;

        },

        insert : function(data) {
            if (this.__root == null) {
                this.__root = {
                    data : data,
                    parent : null,
                    left : null,
                    right : null
                };
            }
            var compare = this.compare;
            var root = this.__root;
            while (root != null) {
                var cmp = compare(data, root.data);
                if (cmp) {
                    var leaf = (cmp == -1) ? "left" : "right"
                    var next = root[leaf];
                    if (next == null) {
                        root[leaf] = {data : data, parent : root, left : null, right : null};
                        return;
                    } else {
                        root = next;
                    }
                } else {
                    return;
                }
            }
        },

        remove : function(data) {
            var root = this.__root;
            while (root != null) {
                var cmp = this.compare(data, root.data);
                if (cmp) {
                    root = root[(cmp == -1) ? "left" : "right"];
                } else {
                    var left = root.left, right = root.right;
                    if (left && right) {
                        var minNode = this.__findMinNode(root.right);
                        root.data = minNode.data;
                        this.__shiftNode(minNode);
                    } else if (left || right) {
                        this.__shiftNode(root, left || right);
                    } else {
                        this.__shiftNode(root);
                    }
                    root = null;
                }
            }

        },

        __shiftNode : function(node, newValue) {
            if (node && node.parent) {
                var parent = node.parent;
                if (parent.left == node) {
                    parent.left = newValue;
                } else if (parent.right == node) {
                    parent.right = newValue;
                }
            }
        },

        traverseWithCondition : function(node, order, callback) {
            var cont = true;
            if (node) {
                order = order || tree.PRE_ORDER;
                if (order === tree.PRE_ORDER) {
                    cont = callback(node.data);
                    if (cont) {
                        cont = this.traverse(node.left, order, callback);
                        cont && (cont = this.traverse(node.right, order, callback));

                    }
                } else if (order === tree.IN_ORDER) {
                    cont = this.traverse(node.left, order, callback);
                    if (cont) {
                        cont = callback(node.data);
                        cont && (cont = this.traverse(node.right, order, callback));
                    }
                } else if (order === tree.POST_ORDER) {
                    cont = this.traverse(node.left, order, callback);
                    if (cont) {
                        cont && (cont = this.traverse(node.right, order, callback));
                        cont && (cont = callback(node.data));
                    }
                }
            }
            return cont;
        },


        traverse : function(node, order, callback) {
            if (node) {
                order = order || tree.PRE_ORDER;
                if (order === tree.PRE_ORDER) {
                    callback(node.data);
                    this.traverse(node.left, order, callback);
                    this.traverse(node.right, order, callback);
                } else if (order === tree.IN_ORDER) {
                    this.traverse(node.left, order, callback);
                    callback(node.data);
                    this.traverse(node.right, order, callback);
                } else if (order === tree.POST_ORDER) {
                    this.traverse(node.left, order, callback);
                    this.traverse(node.right, order, callback);
                    callback(node.data);
                }
            }
        },

        forEach : function(cb, scope, order) {
            if (typeof cb !== "function")
                throw new TypeError();

            order = order || tree.IN_ORDER;
            scope = scope || this;
            this.traverse(this.__root, order, function(node) {
                cb.call(scope, node, this);
            });
        },

        map : function(cb, scope, order) {
            if (typeof cb !== "function")
                throw new TypeError();

            order = order || tree.IN_ORDER;
            scope = scope || this;
            var ret = new Tree();
            this.traverse(this.__root, order, function(node) {
                ret.insert(cb.call(scope, node, this));
            });
            return ret;
        },

        filter : function(cb, scope, order) {
            if (typeof cb !== "function")
                throw new TypeError();

            order = order || tree.IN_ORDER;
            scope = scope || this;
            var ret = new Tree();
            this.traverse(this.__root, order, function(node) {
                var include = cb.call(scope, node, this)
                include && ret.insert(node);
            });
            return ret;
        },

        reduce : function(fun, accumulator) {
           this.toArray().reduce(fun, accumulator);
        },

        reduceRight : function(fun, accumulator) {
            this.toArray().reduceRight(fun, accumulator);
        },

        every : function(cb, scope, order) {
            if (typeof cb !== "function")
                throw new TypeError();

            order = order || tree.IN_ORDER;
            scope = scope || this;
            var ret = new Tree();
            this.traverseWithCondition(this.__root, order, function(node) {
                return (ret = cb.call(scope, node, this));
            });
            return ret;
        },

        some : function(cb, scope, order) {
            if (typeof cb !== "function")
                throw new TypeError();

            order = order || tree.IN_ORDER;
            scope = scope || this;
            var ret = new Tree();
            this.traverseWithCondition(this.__root, order, function(node) {
                ret = cb.call(scope, node, this);
                return !ret;
            });
            return ret;
        },

        toArray : function(order) {
            order = order || tree.IN_ORDER;
            var arr = [];
            this.traverse(this.__root, order, function(node) {
                console.log(node);
                arr.push(node);
            });
            return arr;
        },


        __printNode : function(node, level) {
            var i = 0;
            //console.log(level);
            var str = [];
            if (node == null || node == undefined) {
                str.push(padding('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(node.right, level + 1);
                str.push(padding('\t', level));
                str.push(node.data + "\n");
                console.log(str.join(""));
                this.__printNode(node.left, level + 1);
            }
        },

        contains : function(value) {
            var ret = false;
            var root = this.__root;
            while (root != null) {
                var cmp = this.compare(value, root.data);
                if (cmp) {
                    root = root[(cmp == -1) ? "left" : "right"];
                } else {
                    ret = true;
                    root = null;
                }
            }
            return ret;
        },

        print : function() {
            this.__printNode(this.__root, 0);
        },


        getters : {
            root : function() {
                return this.__root;
            }
        }

    },

    static
            :
    {
        PRE_ORDER : "pre_order",
        IN_ORDER
                :
                "in_order",
        POST_ORDER
                :
                "post_order"
    }
}))
        ;