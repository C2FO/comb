"use strict";
var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        BinaryTree = comb.collections.BinaryTree;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A BinaryTree colleciton");

suite.addBatch({
            "when inserting strings " : {
                topic : function() {
                    var tree = new BinaryTree();
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
                    assert.isFalse(tree.contains("ac"));
                },

                "and it should find items contained in it " : function(tree) {
                    assert.equal(tree.find("c"), "c");
                    assert.equal(tree.find("ca"), "ca");
                    assert.equal(tree.find("b"), "b");
                    assert.equal(tree.find("ba"), "ba");
                    assert.equal(tree.find("bb"), "bb");
                    assert.equal(tree.find("a"), "a");
                    assert.equal(tree.find("aa"), "aa");
                    assert.equal(tree.find("ab"), "ab");
                    assert.isUndefined(tree.find("ac"));
                },

                "and should not insert a duplicate item " : function(tree) {
                    assert.isUndefined(tree.insert("c"));
                },

                "and return them in order" : function(tree) {
                    assert.deepEqual(tree.toArray(), [ 'a', 'aa', 'ab', 'b', 'ba', 'bb', 'c', 'ca' ]);
                },

                "and return them in pre order" : function(tree) {
                    assert.deepEqual(tree.toArray(BinaryTree.PRE_ORDER), ['c', 'b','a', "aa", "ab", 'ba', 'bb', 'ca' ]);
                },

                "and return them in post order" : function(tree) {
                    assert.deepEqual(tree.toArray(BinaryTree.POST_ORDER), ['ab', 'aa','a', "bb", "ba", 'b', 'ca', 'c' ]);
                },

                "and it should loop through the items in order" : function(tree) {
                    var arr = [ 'a', 'aa', 'ab', 'b', 'ba', 'bb', 'c', 'ca' ], i = 0;
                    tree.forEach(function(a) {
                        assert.equal(a, arr[i++]);
                    });
                },

                "and it should loop through the items in post order" : function(tree) {
                    var arr = ['ab', 'aa','a', "bb", "ba", 'b', 'ca', 'c' ], i = 0;
                    tree.forEach(function(a) {
                        assert.equal(a, arr[i++]);
                    }, null, BinaryTree.POST_ORDER);
                },

                "and it should loop through the items in pre order" : function(tree) {
                    var arr = ['c', 'b','a', "aa", "ab", 'ba', 'bb', 'ca' ], i = 0;
                    tree.forEach(function(a) {
                        assert.equal(a, arr[i++]);
                    }, null, BinaryTree.PRE_ORDER);
                },

                "and it should throw an error a callback is not provided to forEach" : function(tree) {
                    assert.throws(tree.forEach);
                },

                "and it map the items in order" : function(tree) {
                    var mapped = tree.map(function(a) {
                        return a + a;
                    });
                    assert.deepEqual(mapped.toArray(), [ 'aa', 'aaaa', 'abab', 'baba', 'bb', 'bbbb', 'caca', 'cc' ]);
                },

                "and it map the items in post order" : function(tree) {
                    var arr = ['ab', 'aa','a', "bb", "ba", 'b', 'ca', 'c' ], i = 0;
                    var mapped = tree.map(function(a) {
                        assert.equal(a, arr[i++]);
                        return a + a;
                    }, null, BinaryTree.POST_ORDER);
                    assert.deepEqual(mapped.toArray(), [ 'aa', 'aaaa', 'abab', 'baba', 'bb', 'bbbb', 'caca', 'cc' ]);
                },

                "and it map the items in pre order" : function(tree) {
                    var arr = ['c', 'b','a', "aa", "ab", 'ba', 'bb', 'ca' ], i = 0;
                    var mapped = tree.map(function(a) {
                        assert.equal(a, arr[i++]);
                        return a + a;
                    }, null, BinaryTree.PRE_ORDER);
                    assert.deepEqual(mapped.toArray(), [ 'aa', 'aaaa', 'abab', 'baba', 'bb', 'bbbb', 'caca', 'cc' ]);
                },

                "and it should throw an error a callback is not provided to map" : function(tree) {
                    assert.throws(tree.map);
                },

                "and it filter the items in order" : function(tree) {
                    var arr = [ 'a', 'aa', 'ab', 'b', 'ba', 'bb', 'c', 'ca' ], i = 0;
                    var mapped = tree.filter(function(a) {
                        assert.equal(a, arr[i++]);
                        return a == "c";
                    });
                    assert.deepEqual(mapped.toArray(), [ "c" ]);
                },

                "and it filter the items in post order" : function(tree) {
                    var arr = ['ab', 'aa','a', "bb", "ba", 'b', 'ca', 'c' ], i = 0;
                    var mapped = tree.filter(function(a) {
                        assert.equal(a, arr[i++]);
                        return a == "c";
                    }, null, BinaryTree.POST_ORDER);
                    assert.deepEqual(mapped.toArray(), ["c"]);
                },

                "and it filter the items in pre order" : function(tree) {
                    var arr = ['c', 'b','a', "aa", "ab", 'ba', 'bb', 'ca' ], i = 0;
                    var mapped = tree.filter(function(a) {
                        assert.equal(a, arr[i++]);
                        return a == "c";
                    }, null, BinaryTree.PRE_ORDER);
                    assert.deepEqual(mapped.toArray(), ["c"]);
                },

                "and it should throw an error a callback is not provided to filter" : function(tree) {
                    assert.throws(tree.filter);
                },

                "and it should determine if every object passes" : function(tree) {
                    assert.isTrue(tree.every(function(a) {
                        return comb.isString(a);
                    }));
                    assert.isTrue(tree.every(function(a) {
                        return comb.isString(a);
                    }, null, BinaryTree.POST_ORDER));
                    assert.isTrue(tree.every(function(a) {
                        return comb.isString(a);
                    }, null, BinaryTree.PRE_ORDER));
                    assert.isFalse(tree.every(function(a) {
                        return comb.isNumber(a);
                    }));
                    assert.isFalse(tree.every(function(a) {
                        return comb.isNumber(a);
                    }, null, BinaryTree.POST_ORDER));
                    assert.isFalse(tree.every(function(a) {
                        return comb.isNumber(a);
                    }, null, BinaryTree.PRE_ORDER));
                },

                "and it should throw an error a callback is not provided to every" : function(tree) {
                    assert.throws(tree.every);
                },

                "and it should determine if some objects pass" : function(tree) {
                    assert.isTrue(tree.some(function(a) {
                        return a.match("a") != null;
                    }));
                    assert.isTrue(tree.some(function(a) {
                        return a.match("a") != null;
                    }, null, BinaryTree.POST_ORDER));
                    assert.isTrue(tree.some(function(a) {
                        return a.match("a") != null;
                    }, null, BinaryTree.PRE_ORDER));
                    assert.isFalse(tree.some(function(a) {
                        return a.match("z") != null;
                    }));
                    assert.isFalse(tree.some(function(a) {
                        return a.match("z") != null;
                    }, null, BinaryTree.POST_ORDER));
                    assert.isFalse(tree.some(function(a) {
                        return a.match("z") != null;
                    }, null, BinaryTree.PRE_ORDER));

                },

                "and it should throw an error a callback is not provided to some" : function(tree) {
                    assert.throws(tree.some);
                },

                "and reduce them in order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, "");
                    assert.deepEqual(str, [ 'a', 'aa', 'ab', 'b', 'ba', 'bb', 'c', 'ca' ].join(""));
                },

                "and reduce them in pre order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, null, BinaryTree.PRE_ORDER);
                    assert.deepEqual(str, ['c', 'b','a', "aa", "ab", 'ba', 'bb', 'ca' ].join(""));
                },

                "and reduce them in post order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, null, BinaryTree.POST_ORDER);
                    assert.deepEqual(str, ['ab', 'aa','a', "bb", "ba", 'b', 'ca', 'c' ].join(""));
                },

                "and reduceRight them in order" : function(tree) {
                    var str = tree.reduceRight(function(a, b) {
                        return a + b;
                    }, "");
                    assert.deepEqual(str, [ 'a', 'aa', 'ab', 'b', 'ba', 'bb', 'c', 'ca' ].reverse().join(""));
                },

                "and reduceRight them in pre order" : function(tree) {
                    var str = tree.reduceRight(function(a, b) {
                        return a + b;
                    }, null, BinaryTree.PRE_ORDER);
                    assert.deepEqual(str, ['c', 'b','a', "aa", "ab", 'ba', 'bb', 'ca' ].reverse().join(""));
                },

                "and reduceRight them in post order" : function(tree) {
                    var str = tree.reduceRight(function(a, b) {
                        return a + b;
                    }, null, BinaryTree.POST_ORDER);
                    assert.deepEqual(str, ['ab', 'aa','a', "bb", "ba", 'b', 'ca', 'c' ].reverse().join(""));
                },

                "it should print the tree correctly" : function(tree) {
                    var expected = "\t\t~\n\tca\n\n\t\t~\nc\n\n\t\t\t\t~\n\t\t\tbb\n\n\t\t\t\t~\n\t\tba\n\n\t\t\t~\n\tb\n\n\t\t\t\t\t~\n\t\t\t\tab\n\n\t\t\t\t\t~\n\t\t\taa\n\n\t\t\t\t~\n\t\ta\n\n\t\t\t~";
                    var res = [];
                    var orig = console.log;
                    console.log = function(str) {
                        res.push(str);
                    };
                    tree.print();
                    console.log = orig;
                    assert.equal(res.join("\n"), expected);
                },

                "and remove words " : function(tree) {
                    var words = [ 'a', 'aa', 'ab', 'b', 'ba', 'bb', 'c', 'ca' ];
                    words.forEach(comb.hitch(tree, "remove"));
                    tree.print();
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
                    if (a._type > b._type) {
                        ret = 1;
                    } else if (a._type < b._type) {
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
    new Mammal({type : "mouse"}),
    new Mammal({type : "zebra"}),
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
            new Mammal({type : "bird"}),
            new Mammal({type : "dog"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "mouse"}),
            new Mammal({type : "horse"}),
            new Mammal({type : "groundhog"}),
            new Mammal({type : "zebra"}),
            new Mammal({type : "squirrel"})
        ],

        mammalsPostOrder = [
            new Mammal({type : "groundhog"}),
            new Mammal({type : "horse"}),
            new Mammal({type : "mouse"}),
            new Mammal({type : "squirrel"}),
            new Mammal({type : "zebra"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "dog"}),
            new Mammal({type : "bird"})
        ];
suite.addBatch({
            "when inserting custom objects with custom comparator " : {
                topic : function() {
                    var tree = new BinaryTree({
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
                    assert.deepEqual(tree.toArray(BinaryTree.PRE_ORDER), mammalsPreOrder);
                },

                "and return them in post order" : function(tree) {
                    assert.deepEqual(tree.toArray(BinaryTree.POST_ORDER), mammalsPostOrder);
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
                    }, null, BinaryTree.POST_ORDER);
                },

                "and it should loop through the items in pre order" : function(tree) {
                    var i = 0;
                    tree.forEach(function(a) {
                        assert.deepEqual(a, mammalsPreOrder[i++]);
                    }, null, BinaryTree.PRE_ORDER);
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
                    }, null, BinaryTree.POST_ORDER);
                },

                "and it map the items in pre order" : function(tree) {
                    var i = 0;
                    var mapped = tree.map(function(a) {
                        assert.deepEqual(a, mammalsPreOrder[i++]);
                        return a;
                    }, null, BinaryTree.PRE_ORDER);
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
                    assert.deepEqual(str, "birddoggroundhoghorsemouseratsquirrelzebra");
                },

                "and reduce them in pre order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, null, BinaryTree.PRE_ORDER);
                    assert.deepEqual(str, "birddogratmousehorsegroundhogzebrasquirrel");
                },

                "and reduce them in post order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, null, BinaryTree.POST_ORDER);
                    assert.deepEqual(str, "groundhoghorsemousesquirrelzebraratdogbird");
                },

                "and it should clear all items" : function(tree) {
                    tree.clear();
                    assert.deepEqual(tree.toArray(), []);
                }

            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));