var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        AnderssonTree = comb.collections.AnderssonTree;


var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A AnderssonTree colleciton");

var words = ["c", "ca", "b", "ba", "bb", "a", "aa", "ab", "z", "d", "f","h", "i", "ee", "ff", "hi", "j", "ajk"];
var wordsInOrder = [  'a','aa','ab','ajk','b','ba','bb','c','ca','d','ee','f','ff','h','hi','i','j','z' ];
var wordsPreOrder = ['d','ba','aa','a','ajk','ab','b','c','bb','ca','h','f','ee','ff','i','hi','j','z'];
var wordsPostOrder = [ 'a','ab','b','ajk','aa','bb','ca','c','ba','ee','ff','f','hi','z','j','i','h','d'];

suite.addBatch({
            "when inserting strings " : {
                topic : function() {
                    var tree = new AnderssonTree();
                    words.forEach(tree.insert, tree);
                    return tree;
                },

                "and it should contain those string" : function(tree) {
                    words.forEach(function(w) {
                        assert.isTrue(tree.contains(w));
                    })
                },

                "and return them in order" : function(tree) {
                    assert.deepEqual(tree.toArray(), wordsInOrder);
                },

                "and return them in pre order" : function(tree) {
                    assert.deepEqual(tree.toArray(AnderssonTree.PRE_ORDER), wordsPreOrder);
                },

                "and return them in post order" : function(tree) {
                    assert.deepEqual(tree.toArray(AnderssonTree.POST_ORDER), wordsPostOrder);
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
                    }, null, AnderssonTree.POST_ORDER);
                },

                "and it should loop through the items in pre order" : function(tree) {
                    var i = 0;
                    tree.forEach(function(a) {
                        assert.equal(a, wordsPreOrder[i++]);
                    }, null, AnderssonTree.PRE_ORDER);
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
                    }, null, AnderssonTree.POST_ORDER);
                },

                "and it map the items in pre order" : function(tree) {
                    var i = 0;
                    var mapped = tree.map(function(a) {
                        assert.equal(a, wordsPreOrder[i++]);
                        return a + a;
                    }, null, AnderssonTree.PRE_ORDER);
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
                    }, null, AnderssonTree.PRE_ORDER);
                    assert.deepEqual(str, wordsPreOrder.join(""));
                },

                "and reduce them in post order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, null, AnderssonTree.POST_ORDER);
                    assert.deepEqual(str, wordsPostOrder.join(""));
                },

                "it should print the tree correctly" : function(tree) {
                    var expected = "\t\t\t\t\t~\n\t\t\t\tz:1\n\n\t\t\t\t\t~\n\t\t\tj:1\n\n\t\t\t\t~\n\t\ti:2\n\n\t\t\t\t~\n\t\t\thi:1\n\n\t\t\t\t~\n\th:3\n\n\t\t\t\t~\n\t\t\tff:1\n\n\t\t\t\t~\n\t\tf:2\n\n\t\t\t\t~\n\t\t\tee:1\n\n\t\t\t\t~\nd:4\n\n\t\t\t\t~\n\t\t\tca:1\n\n\t\t\t\t~\n\t\tc:2\n\n\t\t\t\t~\n\t\t\tbb:1\n\n\t\t\t\t~\n\tba:3\n\n\t\t\t\t\t~\n\t\t\t\tb:1\n\n\t\t\t\t\t~\n\t\t\tajk:2\n\n\t\t\t\t\t~\n\t\t\t\tab:1\n\n\t\t\t\t\t~\n\t\taa:2\n\n\t\t\t\t~\n\t\t\ta:1\n\n\t\t\t\t~";
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
            new Mammal({type : "horse"}),
            new Mammal({type : "dog"}),
            new Mammal({type : "bird"}),
            new Mammal({type : "groundhog"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "mouse"}),
            new Mammal({type : "squirrel"}),
            new Mammal({type : "zebra"})

        ],

        mammalsPostOrder = [
            new Mammal({type : "bird"}),
            new Mammal({type : "groundhog"}),
            new Mammal({type : "dog"}),
            new Mammal({type : "mouse"}),
            new Mammal({type : "zebra"}),
            new Mammal({type : "squirrel"}),
            new Mammal({type : "rat"}),
            new Mammal({type : "horse"})
        ];
suite.addBatch({
            "when inserting custom objects with custom comparator " : {
                topic : function() {
                    var tree = new AnderssonTree({
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
                    assert.deepEqual(tree.toArray(AnderssonTree.PRE_ORDER), mammalsPreOrder);
                },

                "and return them in post order" : function(tree) {
                    assert.deepEqual(tree.toArray(AnderssonTree.POST_ORDER), mammalsPostOrder);
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
                    }, null, AnderssonTree.POST_ORDER);
                },

                "and it should loop through the items in pre order" : function(tree) {
                    var i = 0;
                    tree.forEach(function(a) {
                        assert.deepEqual(a, mammalsPreOrder[i++]);
                    }, null, AnderssonTree.PRE_ORDER);
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
                    }, null, AnderssonTree.POST_ORDER);
                },

                "and it map the items in pre order" : function(tree) {
                    var i = 0;
                    var mapped = tree.map(function(a) {
                        assert.deepEqual(a, mammalsPreOrder[i++]);
                        return a;
                    }, null, AnderssonTree.PRE_ORDER);
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
                    }, null, AnderssonTree.PRE_ORDER);
                    assert.deepEqual(str, mammalsPreOrder.join(""));
                },

                "and reduce them in post order" : function(tree) {
                    var str = tree.reduce(function(a, b) {
                        return a + b;
                    }, null, AnderssonTree.POST_ORDER);
                    assert.deepEqual(str, mammalsPostOrder.join(""));
                }


            }
        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));