"use strict";
var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        AVLTree = comb.collections.AVLTree;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A AVLTree colleciton");

var words = ["c", "ca", "b", "ba", "bb", "a", "aa", "ab", "z", "d", "f","h", "i", "ee", "ff", "hi", "j", "ajk"];
var wordsInOrder = [  'a','aa','ab','ajk','b','ba','bb','c','ca','d','ee','f','ff','h','hi','i','j','z' ];
var wordsPreOrder = ['ba','aa','a','ajk','ab','b','h','d','c','bb','ca','f','ee','ff','i','hi','z','j'];
var wordsPostOrder = [ 'a','ab','b','ajk','aa','bb','ca','c','ee','ff','f','d','hi','j','z','i','h','ba'];

suite.addBatch({
            "when inserting strings " : {
                topic : function() {
                    var tree = new AVLTree();
                    words.forEach(comb.hitch(tree, "insert"));
                    return tree;
                },

                "it should find values less than the value" : function(tree) {
                    assert.deepEqual(tree.findLessThan("a", true), []);
                    assert.deepEqual(tree.findLessThan("b", true), ["a", "aa", "ab", "ajk"]);
                    assert.deepEqual(tree.findLessThan("c", true), ["a", "aa", "ab", "ajk", "b", "ba", "bb"]);
                    assert.deepEqual(tree.findLessThan("ca", true), ["a", "aa", "ab", "ajk", "b", "ba", "bb", "c"]);
                },

                "it should find values less or equal to the value" : function(tree) {
                    assert.deepEqual(tree.findLessThan("a"), ["a"]);
                    assert.deepEqual(tree.findLessThan("b"), ["a", "aa", "ab", "ajk", "b"]);
                    assert.deepEqual(tree.findLessThan("c"), ["a", "aa", "ab", "ajk", "b", "ba", "bb", "c"]);
                    assert.deepEqual(tree.findLessThan("ca"), ["a", "aa", "ab", "ajk", "b", "ba", "bb", "c", "ca"]);
                },

                "it should find values greater than equal to the value" : function(tree) {
                    assert.deepEqual(tree.findGreaterThan("a"), ["a", 'aa','ab','ajk','b','ba','bb','c','ca','d','ee','f','ff','h','hi','i','j','z'].reverse());
                    assert.deepEqual(tree.findGreaterThan("b"), ["b", 'ba','bb','c','ca','d','ee','f','ff','h','hi','i','j','z'].reverse());
                    assert.deepEqual(tree.findGreaterThan("c"), ["c", 'ca','d','ee','f','ff','h','hi','i','j','z'].reverse());
                    assert.deepEqual(tree.findGreaterThan("ca"), ["ca", 'd','ee','f','ff','h','hi','i','j','z'].reverse());
                },

                "it should find values greater than the value" : function(tree) {
                    assert.deepEqual(tree.findGreaterThan("a", true), ['aa','ab','ajk','b','ba','bb','c','ca','d','ee','f','ff','h','hi','i','j','z'].reverse());
                    assert.deepEqual(tree.findGreaterThan("b", true), ['ba','bb','c','ca','d','ee','f','ff','h','hi','i','j','z'].reverse());
                    assert.deepEqual(tree.findGreaterThan("c", true), ['ca','d','ee','f','ff','h','hi','i','j','z'].reverse());
                    assert.deepEqual(tree.findGreaterThan("z", true), []);
                },

                "and it should contain those string" : function(tree) {
                    words.forEach(function(w) {
                        assert.isTrue(tree.contains(w));
                    });
                },

                "and return them in order" : function(tree) {
                    assert.deepEqual(tree.toArray(), wordsInOrder);
                },

                "and return them in pre order" : function(tree) {
                    assert.deepEqual(tree.toArray(AVLTree.PRE_ORDER), wordsPreOrder);
                },

                "and return them in post order" : function(tree) {
                    assert.deepEqual(tree.toArray(AVLTree.POST_ORDER), wordsPostOrder);
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
                    }, null, AVLTree.POST_ORDER);
                },

                "and it should loop through the items in pre order" : function(tree) {
                    var i = 0;
                    tree.forEach(function(a) {
                        assert.equal(a, wordsPreOrder[i++]);
                    }, null, AVLTree.PRE_ORDER);
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
                    }, null, AVLTree.POST_ORDER);
                },

                "and it map the items in pre order" : function(tree) {
                    var i = 0;
                    var mapped = tree.map(function(a) {
                        assert.equal(a, wordsPreOrder[i++]);
                        return a + a;
                    }, null, AVLTree.PRE_ORDER);
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
                        return a.match("~") != null;
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
                    }, null, AVLTree.PRE_ORDER);
                    assert.deepEqual(str, wordsPreOrder.join(""));
                },

                "and reduce them in post order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, null, AVLTree.POST_ORDER);
                    assert.deepEqual(str, wordsPostOrder.join(""));
                },

                "it should print the tree correctly" : function(tree) {
                    var expected = "\t\t\t\t~\n\t\t\tz:-1\n\n\t\t\t\t\t~\n\t\t\t\tj:0\n\n\t\t\t\t\t~\n\t\ti:1\n\n\t\t\t\t~\n\t\t\thi:0\n\n\t\t\t\t~\n\th:0\n\n\t\t\t\t\t~\n\t\t\t\tff:0\n\n\t\t\t\t\t~\n\t\t\tf:0\n\n\t\t\t\t\t~\n\t\t\t\tee:0\n\n\t\t\t\t\t~\n\t\td:0\n\n\t\t\t\t\t~\n\t\t\t\tca:0\n\n\t\t\t\t\t~\n\t\t\tc:0\n\n\t\t\t\t\t~\n\t\t\t\tbb:0\n\n\t\t\t\t\t~\nba:1\n\n\t\t\t\t~\n\t\t\tb:0\n\n\t\t\t\t~\n\t\tajk:0\n\n\t\t\t\t~\n\t\t\tab:0\n\n\t\t\t\t~\n\taa:1\n\n\t\t\t~\n\t\ta:0\n\n\t\t\t~";
                    var res = [];
                    var orig = console.log;
                    console.log = function(str) {
                        res.push(str);
                    }
                    tree.print();
                    console.log = orig;
                    assert.equal(res.join("\n"), expected);
                },

                "and delete a string " : function(tree) {
                    words.forEach(comb.hitch(tree, "remove"));
                    words.forEach(function(w) {
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
                    this._super(arguments);
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
            new Mammal({type : "mouse"}),
            new Mammal({type : "dog"}),
            new Mammal({type : "bird"}),
            new Mammal({type : "horse"}),
            new Mammal({type : "groundhog"}),
            new Mammal({type : "squirrel"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "zebra"})

        ],

        mammalsPostOrder = [
            new Mammal({type : "bird"}),
            new Mammal({type : "groundhog"}),
            new Mammal({type : "horse"}),
            new Mammal({type : "dog"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "zebra"}),
            new Mammal({type : "squirrel"}),
            new Mammal({type : "mouse"})

        ];
suite.addBatch({
            "when inserting custom objects with custom comparator " : {
                topic : function() {
                    var tree = new AVLTree({
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
                    assert.deepEqual(tree.toArray(AVLTree.PRE_ORDER), mammalsPreOrder);
                },

                "and return them in post order" : function(tree) {
                    assert.deepEqual(tree.toArray(AVLTree.POST_ORDER), mammalsPostOrder);
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
                    }, null, AVLTree.POST_ORDER);
                },

                "and it should loop through the items in pre order" : function(tree) {
                    var i = 0;
                    tree.forEach(function(a) {
                        assert.deepEqual(a, mammalsPreOrder[i++]);
                    }, null, AVLTree.PRE_ORDER);
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
                    }, null, AVLTree.POST_ORDER);
                },

                "and it map the items in pre order" : function(tree) {
                    var i = 0;
                    var mapped = tree.map(function(a) {
                        assert.deepEqual(a, mammalsPreOrder[i++]);
                        return a;
                    }, null, AVLTree.PRE_ORDER);
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
                    }, null, AVLTree.PRE_ORDER);
                    assert.deepEqual(str, mammalsPreOrder.join(""));
                },

                "and reduce them in post order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, null, AVLTree.POST_ORDER);
                    assert.deepEqual(str, mammalsPostOrder.join(""));
                }


            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));