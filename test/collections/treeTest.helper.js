"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");

var Mammal = comb.define(null, {
    instance:{

        constructor:function (options) {
            options = options || {};
            this._super(arguments);
            this._type = options.type || "mammal";
        },

        toString:function () {
            return this.type;
        },

        //Define your getters
        getters:{
            type:function () {
                return this._type;
            }
        }
    },

    //Define your static methods
    static:{
        compare:function (a, b) {
            var ret = 0;
            if (a.type > b.type) {
                ret = 1;
            } else if (a.type < b.type) {
                ret = -1;
            }
            return ret;
        }
    }
}).as(exports, "Mammal");

exports.setup = function (it, Tree, words, orderedWords, mammals, orderedMammals, expectedPrint) {
    it.describe("inserting strings", function (it) {

            var ordered = orderedWords;

            var tree = new Tree();
            words.forEach(comb.hitch(tree, "insert"));

            it.should("find values", function () {
                assert.deepEqual(tree.find("a"), "a");
                assert.isUndefined(tree.find("askjjbfiashf"));
            });

            it.should("find values less than the value", function () {
                assert.deepEqual(tree.findLessThan("a", true), []);
                assert.deepEqual(tree.findLessThan("b", true), ["a", "aa", "ab", "ajk"]);
                assert.deepEqual(tree.findLessThan("c", true), ["a", "aa", "ab", "ajk", "b", "ba", "bb"]);
                assert.deepEqual(tree.findLessThan("ca", true), ["a", "aa", "ab", "ajk", "b", "ba", "bb", "c"]);
            });
            it.should("find values less or equal to the value", function () {
                assert.deepEqual(tree.findLessThan("a"), ["a"]);
                assert.deepEqual(tree.findLessThan("b"), ["a", "aa", "ab", "ajk", "b"]);
                assert.deepEqual(tree.findLessThan("c"), ["a", "aa", "ab", "ajk", "b", "ba", "bb", "c"]);
                assert.deepEqual(tree.findLessThan("ca"), ["a", "aa", "ab", "ajk", "b", "ba", "bb", "c", "ca"]);
            });
            it.should("find values greater than equal to the value", function () {
                assert.deepEqual(tree.findGreaterThan("a"), ["a", 'aa', 'ab', 'ajk', 'b', 'ba', 'bb', 'c', 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'].reverse());
                assert.deepEqual(tree.findGreaterThan("b"), ["b", 'ba', 'bb', 'c', 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'].reverse());
                assert.deepEqual(tree.findGreaterThan("c"), ["c", 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'].reverse());
                assert.deepEqual(tree.findGreaterThan("ca"), ["ca", 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'].reverse());
            });
            it.should("find values greater than the value", function () {
                assert.deepEqual(tree.findGreaterThan("a", true), ['aa', 'ab', 'ajk', 'b', 'ba', 'bb', 'c', 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'].reverse());
                assert.deepEqual(tree.findGreaterThan("b", true), ['ba', 'bb', 'c', 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'].reverse());
                assert.deepEqual(tree.findGreaterThan("c", true), ['ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'].reverse());
                assert.deepEqual(tree.findGreaterThan("z", true), []);
            });
            it.should("contain those string", function () {
                words.forEach(function (w) {
                    assert.isTrue(tree.contains(w));
                });
            });

            it.describe("#toArray", function (it) {
                ordered.forEach(function (order) {
                    it.should(order[0], function () {
                        assert.deepEqual(tree.toArray(order[0]), order[1]);
                    });
                });
            });
            it.describe("#forEach", function (it) {

                it.should("throw an error if cb is not defined", function () {
                    assert.throws(function () {
                        tree.forEach();
                    })
                });


                ordered.forEach(function (order) {
                    it.should(order[0], function () {
                        var i = 0;
                        tree.forEach(function (a) {
                            assert.deepEqual(a, order[1][i++]);
                        }, null, order[0]);
                    });
                });
            });

            it.describe("#map", function (it) {

                it.should("throw an error if cb is not defined", function () {
                    assert.throws(function () {
                        tree.map();
                    })
                });

                ordered.forEach(function (order) {
                    it.should(order[0], function () {
                        var i = 0;
                        tree.map(function (a) {
                            assert.deepEqual(a, order[1][i++]);
                            return a;
                        }, null, order[0]);
                    });
                });
            });

            it.describe("#filter", function (it) {

                it.should("throw an error if cb is not defined", function () {
                    assert.throws(function () {
                        tree.filter();
                    })
                });

                ordered.forEach(function (order) {
                    it.should(order[0], function () {
                        var i = 0;
                        assert.isTrue(tree.filter(
                            function (a) {
                                assert.deepEqual(a, order[1][i++]);
                                return false;
                            }, null, order[0]).isEmpty());
                        ;
                    });
                });
            });

            it.describe("#reduce", function (it) {
                ordered.forEach(function (order) {
                    it.should(order[0], function () {
                        assert.equal(tree.reduce(function (a, b) {
                            return a + b;
                        }, null, order[0]), order[1].join(""));
                    });
                });

                ordered.forEach(function (order) {
                    it.should(order[0] + "-accumulator", function () {
                        assert.equal(tree.reduce(function (a, b) {
                            return a + b;
                        }, [], order[0]), order[1].join(""));
                    });
                });
            });


            it.describe("#reduceRight", function (it) {
                ordered.forEach(function (order) {
                    it.should(order[0], function () {
                        assert.equal(tree.reduceRight(function (a, b) {
                            return a + b;
                        }, null, order[0]), order[1].slice().reverse().join(""));
                    });
                });
            });



            it.describe("#every", function (it) {

                it.should("throw an error if no cb is supplied", function () {
                    assert.throws(function () {
                        tree.every()
                    });
                });

                ordered.forEach(function (order) {
                    it.should(order[0], function () {
                        var i = 0;
                        assert.isTrue(tree.every(function (a) {
                            assert.deepEqual(a, order[1][i++]);
                            return comb.isString(a);
                        }, null, order[0]));
                        i = 0;
                        assert.isFalse(tree.every(function (a) {
                            assert.deepEqual(a, order[1][i++]);
                            return comb.isNumber(a);
                        }, null, order[0]));
                    });
                });
            });

            it.describe("#some", function (it) {

                it.should("throw an error if no cb is supplied", function () {
                    assert.throws(function () {
                        tree.some()
                    });
                });

                ordered.forEach(function (order) {
                    it.should(order[0], function () {
                        var i = 0;
                        assert.isTrue(tree.some(function (a) {
                            assert.deepEqual(a, order[1][i++]);
                            return comb.isString(a);
                        }, null, order[0]));
                        i = 0;
                        assert.isFalse(tree.some(function (a) {
                            assert.deepEqual(a, order[1][i++]);
                            return comb.isNumber(a);
                        }, null, order[0]));
                    });
                });
            });

            it.should("print the tree correctly", function () {
                var expected = expectedPrint;
                var res = [];
                var orig = console.log;
                console.log = function (str) {
                    res.push(str);
                }
                tree.print();
                console.log = orig;
                assert.equal(res.join("\n"), expected);
            });
            it.should("delete a string ", function () {
                words.forEach(comb.hitch(tree, "remove"));
                words.forEach(function (w) {
                    assert.isFalse(tree.contains(w));
                });
                assert.isTrue(tree.isEmpty());
            });
            it.should("clear", function () {
                words.forEach(comb.hitch(tree, "insert"));
                tree.clear();
            });
        }
    )
    ;

    it.describe("inserting objects with comparator", function (it) {

//Super of other classes


        var ordered = orderedMammals;
        var tree = new Tree({
            compare:Mammal.compare
        });
        mammals.forEach(comb.hitch(tree, "insert"));
        it.should("contain those objects", function () {
            assert.isTrue(mammals.every(comb.hitch(tree, "contains")));
        });
        it.describe("#toArray", function (it) {
            ordered.forEach(function (order) {
                it.should(order[0], function () {
                    assert.deepEqual(tree.toArray(order[0]), order[1]);
                });
            });
        });
        it.describe("#forEach", function (it) {
            ordered.forEach(function (order) {
                it.should(order[0], function () {
                    var i = 0;
                    tree.forEach(function (a) {
                        assert.deepEqual(a, order[1][i++]);
                    }, null, order[0]);
                });
            });
        });

        it.describe("#map", function (it) {
            ordered.forEach(function (order) {
                it.should(order[0], function () {
                    var i = 0;
                    tree.map(function (a) {
                        assert.deepEqual(a, order[1][i++]);
                        return a;
                    }, null, order[0]);
                });
            });
        });

        it.describe("#reduce", function (it) {
            ordered.forEach(function (order) {
                it.should(order[0], function () {
                    assert.equal(tree.reduce(function (a, b) {
                        return a + b;
                    }, null, order[0]), order[1].join(""));
                });
            });
        });

        it.should("#every", function () {
            assert.isTrue(tree.every(function (a) {
                return comb.isString(a.type);
            }));
            assert.isFalse(tree.every(function (a) {
                return comb.isNumber(a.type);
            }));

        });
        it.should("#some", function () {
            assert.isTrue(tree.some(function (a) {
                return a.type.match("a") != null;
            }));
            assert.isFalse(tree.some(function (a) {
                return a.type.match("1") != null;
            }));

        });
    });


}
;


