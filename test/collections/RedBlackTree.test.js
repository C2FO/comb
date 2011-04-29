var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        RedBlackTree = comb.collections.RedBlackTree;


var suite = vows.describe("A RedBlackTree colleciton");

var words = ["c", "ca", "b", "ba", "bb", "a", "aa", "ab"];
var wordsInOrder = [ 'a', 'aa', 'ab', 'b', 'ba', 'bb', 'c', 'ca' ];
var wordsPreOrder = ['ba','aa','a','b','ab','c','bb','ca'];
var wordsPostOrder = [ 'a', 'ab','b','aa','bb','ca','c','ba'];

suite.addBatch({
    "when inserting strings " : {
        topic : function() {
            var tree = new RedBlackTree();
            tree.insert("c");
            tree.insert("ca");
            tree.insert("b");
            tree.insert("ba");
            tree.insert("bb");
            tree.insert("a");
            tree.insert("aa");
            tree.insert("ab");
            return tree;
        },

        "and it should contain those string" : function(tree) {
            assert.isTrue(tree.contains("c"));
            assert.isTrue(tree.contains("ca"));
            assert.isTrue(tree.contains("b"));
            assert.isTrue(tree.contains("ba"));
            assert.isTrue(tree.contains("bb"));
            assert.isTrue(tree.contains("a"));
            assert.isTrue(tree.contains("aa"));
            assert.isTrue(tree.contains("ab"));
        },

        "and return them in order" : function(tree) {
            assert.deepEqual(tree.toArray(), wordsInOrder);
        },

        "and return them in pre order" : function(tree) {
            assert.deepEqual(tree.toArray(RedBlackTree.PRE_ORDER), wordsPreOrder);
        },

        "and return them in post order" : function(tree) {
            assert.deepEqual(tree.toArray(RedBlackTree.POST_ORDER), wordsPostOrder);
        },

        "and it should loop through the items in order" : function(tree) {
            var i = 0;
            tree.forEach(function(a) {
                assert.equal(a, wordsInOrder[i++]);
            });
        },

        "and it should loop through the items in post order" : function(tree) {
            var i = 0;
            tree.forEach(function(a) {
                assert.equal(a, wordsPostOrder[i++]);
            }, null, RedBlackTree.POST_ORDER);
        },

        "and it should loop through the items in pre order" : function(tree) {
            var i = 0;
            tree.forEach(function(a) {
                assert.equal(a, wordsPreOrder[i++]);
            }, null, RedBlackTree.PRE_ORDER);
        },

        "and it map the items in order" : function(tree) {
            var mapped = tree.map(function(a) {
                return a + a;
            });
        },

        "and it map the items in post order" : function(tree) {
            var i = 0;
            var mapped = tree.map(function(a) {
                assert.equal(a, wordsPostOrder[i++]);
                return a + a;
            }, null, RedBlackTree.POST_ORDER);
        },

        "and it map the items in pre order" : function(tree) {
            var i = 0;
            var mapped = tree.map(function(a) {
                assert.equal(a, wordsPreOrder[i++]);
                return a + a;
            }, null, RedBlackTree.PRE_ORDER);
        },

        "and it should determine if every object passes" : function(tree) {
            assert.isTrue(tree.every(function(a) {
                return comb.isString(a);
            }));
            assert.isFalse(tree.every(function(a) {
                return comb.isNumber(a);
            }));

        },

        "and it should determine if some objects pass" : function(tree) {
            assert.isTrue(tree.some(function(a) {
                return a.match("a") != null;
            }));
            assert.isFalse(tree.some(function(a) {
                return a.match("z") != null;
            }));

        },

        "and reduce them in order" : function(tree) {
            var str = tree.reduce(function(a, b) {
                return a + b;
            });
            assert.deepEqual(str, wordsInOrder.join(""));
        },

        "and reduce them in pre order" : function(tree) {
            var str = tree.reduce(function(a, b) {
                return a + b;
            }, null, RedBlackTree.PRE_ORDER);
            assert.deepEqual(str, wordsPreOrder.join(""));
        },

        "and reduce them in post order" : function(tree) {
            var str = tree.reduce(function(a, b) {
                return a + b;
            }, null, RedBlackTree.POST_ORDER);
            assert.deepEqual(str, wordsPostOrder.join(""));
        },

        "and delete a string " : function(tree){
            var wordsPostOrder = [ 'a', 'ab','b','aa','bb','ca','c','ba'];
            wordsPostOrder.forEach(comb.hitch(tree, "remove"));
            words.forEach(function(w){
                assert.isFalse(tree.contains(w));
            });
            assert.isTrue(tree.isEmpty());
        }


    }
});

//Super of other classes
var Mammal = comb.define(null, {
    instance : {

        constructor: function(options) {
            options = options || {};
            this.super(arguments);
            this._type = options.type || "mammal";
        },

        toString : function() {
            return this.type;
        },

        //Define your getters
        getters : {
            type : function() {
                return this._type;
            }
        }
    },

    //Define your static methods
    static : {
        compare : function(a, b) {
            var ret = 0;
            if (a.type > b.type) {
                ret = 1;
            } else if (a.type < b.type) {
                ret = -1;
            }
            return ret;
        }
    }
});


var mammals = [
    new Mammal({type : "bird"}),
    new Mammal({type : "dog"}),
    new Mammal({type : "rat"}),
    new Mammal({type : "zebra"}),
    new Mammal({type : "mouse"}),
    new Mammal({type : "horse"}),
    new Mammal({type : "squirrel"}),
    new Mammal({type : "groundhog"})
],

        mammalsInOrder = [
            new Mammal({type : "bird"}),
            new Mammal({type : "dog"}),
            new Mammal({type : "groundhog"}),
            new Mammal({type : "horse"}),
            new Mammal({type : "mouse"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "squirrel"}),
            new Mammal({type : "zebra"})
        ],

        mammalsPreOrder = [
            new Mammal({type : "dog"}),
            new Mammal({type : "bird"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "horse"}),
            new Mammal({type : "groundhog"}),
            new Mammal({type : "mouse"}),
            new Mammal({type : "zebra"}),
            new Mammal({type : "squirrel"})
        ],

        mammalsPostOrder = [
            new Mammal({type : "bird"}),
            new Mammal({type : "groundhog"}),
            new Mammal({type : "mouse"}),
            new Mammal({type : "horse"}),
            new Mammal({type : "squirrel"}),
            new Mammal({type : "zebra"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "dog"})
        ];
suite.addBatch({
    "when inserting custom objects with custom comparator " : {
        topic : function() {
            var tree = new RedBlackTree({
                compare : Mammal.compare
            });
            mammals.forEach(comb.hitch(tree, "insert"));
            return tree;
        },

        "and it should contain those objects" : function(tree) {
            assert.isTrue(mammals.every(comb.hitch(tree, "contains")));
        },

        "and return them in order" : function(tree) {
            assert.deepEqual(tree.toArray(), mammalsInOrder);
        },

        "and return them in pre order" : function(tree) {
            assert.deepEqual(tree.toArray(RedBlackTree.PRE_ORDER), mammalsPreOrder);
        },

        "and return them in post order" : function(tree) {
            assert.deepEqual(tree.toArray(RedBlackTree.POST_ORDER), mammalsPostOrder);
        },

        "and it should loop through the items in order" : function(tree) {
            var i = 0;
            tree.forEach(function(a) {
                assert.deepEqual(a, mammalsInOrder[i++]);
            });
        },

        "and it should loop through the items in post order" : function(tree) {
            var i = 0;
            tree.forEach(function(a) {
                assert.deepEqual(a, mammalsPostOrder[i++]);
            }, null, RedBlackTree.POST_ORDER);
        },

        "and it should loop through the items in pre order" : function(tree) {
            var i = 0;
            tree.forEach(function(a) {
                assert.deepEqual(a, mammalsPreOrder[i++]);
            }, null, RedBlackTree.PRE_ORDER);
        },

        "and it map the items in order" : function(tree) {
            var i = 0;
            var mapped = tree.map(function(a) {
                assert.deepEqual(a, mammalsInOrder[i++]);
                return a;
            });
        },

        "and it map the items in post order" : function(tree) {
            var i = 0;
            var mapped = tree.map(function(a) {
                assert.deepEqual(a, mammalsPostOrder[i++]);
                return a;
            }, null, RedBlackTree.POST_ORDER);
        },

        "and it map the items in pre order" : function(tree) {
            var i = 0;
            var mapped = tree.map(function(a) {
                assert.deepEqual(a, mammalsPreOrder[i++]);
                return a;
            }, null, RedBlackTree.PRE_ORDER);
        },

        "and it should determine if every object passes" : function(tree) {
            assert.isTrue(tree.every(function(a) {
                return comb.isString(a.type);
            }));
            assert.isFalse(tree.every(function(a) {
                return comb.isNumber(a.type);
            }));

        },

        "and it should determine if some objects pass" : function(tree) {
            assert.isTrue(tree.some(function(a) {
                return a.type.match("a") != null;
            }));
            assert.isFalse(tree.some(function(a) {
                return a.type.match("1") != null;
            }));

        },

        "and reduce them in order" : function(tree) {
            var str = tree.reduce(function(a, b) {
                return a + b;
            });
            assert.deepEqual(str, mammalsInOrder.join(""));
        },

        "and reduce them in pre order" : function(tree) {
            var str = tree.reduce(function(a, b) {
                return a + b;
            }, null, RedBlackTree.PRE_ORDER);
            assert.deepEqual(str, mammalsPreOrder.join(""));
        },

        "and reduce them in post order" : function(tree) {
            var str = tree.reduce(function(a, b) {
                return a + b;
            }, null, RedBlackTree.POST_ORDER);
            assert.deepEqual(str, mammalsPostOrder.join(""));
        }


    }
});

suite.run({reporter : require("vows/reporters/spec")});