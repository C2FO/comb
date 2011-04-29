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

        constructor : function(options) {
            options = options || {};
            this.compare = options.compare || compare;
            this.__root = null;
        },

        insert : function(data) {
            throw new Error("Not Implemented");
        },

        remove : function(data) {
            throw new Error("Not Implemented");
        },

        clear : function(){
            this.__root = null;
        },

        isEmpty : function(){
            return this.__root == null;
        },

        traverseWithCondition : function(node, order, callback) {
            var cont = true;
            if (node) {
                order = order || tree.PRE_ORDER;
                if (order === tree.PRE_ORDER) {
                    cont = callback(node.data);
                    if (cont) {
                        cont = this.traverseWithCondition(node.left, order, callback);
                        cont && (cont = this.traverseWithCondition(node.right, order, callback));

                    }
                } else if (order === tree.IN_ORDER) {
                    cont = this.traverseWithCondition(node.left, order, callback);
                    if (cont) {
                        cont = callback(node.data);
                        cont && (cont = this.traverseWithCondition(node.right, order, callback));
                    }
                } else if (order === tree.POST_ORDER) {
                    cont = this.traverseWithCondition(node.left, order, callback);
                    if (cont) {
                        cont && (cont = this.traverseWithCondition(node.right, order, callback));
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
            var construct = this.constructor;
            var ret = new construct();
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
            var construct = this.constructor;
            var ret = new construct();
            this.traverse(this.__root, order, function(node) {
                var include = cb.call(scope, node, this);
                include && ret.insert(node);
            });
            return ret;
        },

        reduce : function(fun, accumulator, order) {
            var arr = this.toArray(order);
            var args = [fun];
            if (accumulator) {
                args.push(accumulator);
            }
            return arr.reduce.apply(arr, args);
        },

        reduceRight : function(fun, accumulator, order) {
            var arr = this.toArray(order);
            var args = [fun];
            if (accumulator) {
                args.push(accumulator);
            }
            return arr.reduceRight.apply(arr, args);
        },

        every : function(cb, scope, order) {
            if (typeof cb !== "function")
                throw new TypeError();

            order = order || tree.IN_ORDER;
            scope = scope || this;
            var ret = false;
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
            var ret;
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
                arr.push(node);
            });
            return arr;
        },


        __printNode : function(node, level) {
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

    static :{
        PRE_ORDER : "pre_order",
        IN_ORDER : "in_order",
        POST_ORDER:"post_order"
    }
}))
