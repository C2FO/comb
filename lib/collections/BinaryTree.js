var define = require("../define").define,
        Tree = require("./Tree"),
        base = require("../base");

module.exports = exports = define(Tree, {
    instance : {

        insert : function(data) {
            if (this.__root == null) {
                return (this.__root = {
                    data : data,
                    parent : null,
                    left : null,
                    right : null
                });
            }
            var compare = this.compare;
            var root = this.__root;
            while (root != null) {
                var cmp = compare(data, root.data);
                if (cmp) {
                    var leaf = (cmp == -1) ? "left" : "right";
                    var next = root[leaf];
                    if (next == null) {
                        return (root[leaf] = {data : data, parent : root, left : null, right : null});
                    } else {
                        root = next;
                    }
                } else {
                    return;
                }
            }
        },

        remove : function(data) {
            if (this.__root != null) {
                var head = {right : this.__root}, it = head;
                var p, f = null;
                var dir = "right";
                while (it[dir] != null) {
                    p = it;
                    it = it[dir];
                    var cmp = this.compare(data, it.data);
                    if (!cmp) {
                        f = it;
                    }
                    dir = (cmp == -1 ? "left" : "right");
                }
                if (f != null) {
                    f.data = it.data;
                    p[p.right == it ? "right" : "left"] = it[it.left == null ? "right" : "left"];
                }
                this.__root = head.right;
            }

        }
    }
});
