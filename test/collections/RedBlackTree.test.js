"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    helper = require("./treeTest.helper.js"),
    Mammal = helper.Mammal,
    RedBlackTree = comb.collections.RedBlackTree;


it.describe("comb.collections.RedBlackTree", function (it) {

    var words = ["c", "ca", "b", "ba", "bb", "a", "aa", "ab", "z", "d", "f", "h", "i", "ee", "ff", "hi", "j", "ajk"];
    var wordsInOrder = [  'a', 'aa', 'ab', 'ajk', 'b', 'ba', 'bb', 'c', 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z' ];
    var wordsPreOrder = ['d', 'ba', 'aa', 'a', 'ajk', 'ab', 'b', 'c', 'bb', 'ca', 'h', 'f', 'ee', 'ff', 'i', 'hi', 'z', 'j'];
    var wordsPostOrder = [ 'a', 'ab', 'b', 'ajk', 'aa', 'bb', 'ca', 'c', 'ba', 'ee', 'ff', 'f', 'hi', 'j', 'z', 'i', 'h', 'd'];



    var mammals = [
            new Mammal({type:"bird"}),
            new Mammal({type:"dog"}),
            new Mammal({type:"rat"}),
            new Mammal({type:"zebra"}),
            new Mammal({type:"mouse"}),
            new Mammal({type:"horse"}),
            new Mammal({type:"squirrel"}),
            new Mammal({type:"groundhog"})
        ],

        mammalsInOrder = [
            new Mammal({type:"bird"}),
            new Mammal({type:"dog"}),
            new Mammal({type:"groundhog"}),
            new Mammal({type:"horse"}),
            new Mammal({type:"mouse"}),
            new Mammal({type:"rat"}),
            new Mammal({type:"squirrel"}),
            new Mammal({type:"zebra"})
        ],

        mammalsPreOrder = [
            new Mammal({type:"dog"}),
            new Mammal({type:"bird"}),
            new Mammal({type:"rat"}),
            new Mammal({type:"horse"}),
            new Mammal({type:"groundhog"}),
            new Mammal({type:"mouse"}),
            new Mammal({type:"zebra"}),
            new Mammal({type:"squirrel"})
        ],

        mammalsPostOrder = [
            new Mammal({type:"bird"}),
            new Mammal({type:"groundhog"}),
            new Mammal({type:"mouse"}),
            new Mammal({type:"horse"}),
            new Mammal({type:"squirrel"}),
            new Mammal({type:"zebra"}),
            new Mammal({type:"rat"}),
            new Mammal({type:"dog"})
        ];

    var orderedMammals = [
        [RedBlackTree.IN_ORDER, mammalsInOrder],
        [RedBlackTree.PRE_ORDER, mammalsPreOrder],
        [RedBlackTree.POST_ORDER, mammalsPostOrder]
    ];

    var expectedOutput = "\t\t\t\t~\n\t\t\tBLACK:z\n\n\t\t\t\t\t~\n\t\t\t\tRED:j\n\n\t\t\t\t\t~\n\t\tBLACK:i" +
        "\n\n\t\t\t\t~\n\t\t\tBLACK:hi\n\n\t\t\t\t~\n\tBLACK:h\n\n\t\t\t\t~\n\t\t\tBLACK:ff\n\n\t\t\t\t~" +
        "\n\t\tBLACK:f\n\n\t\t\t\t~\n\t\t\tBLACK:ee\n\n\t\t\t\t~\nBLACK:d\n\n\t\t\t\t~\n\t\t\tBLACK:ca" +
        "\n\n\t\t\t\t~\n\t\tBLACK:c\n\n\t\t\t\t~\n\t\t\tBLACK:bb\n\n\t\t\t\t~\n\tBLACK:ba" +
        "\n\n\t\t\t\t\t~\n\t\t\t\tRED:b\n\n\t\t\t\t\t~\n\t\t\tBLACK:ajk\n\n\t\t\t\t\t~\n\t\t\t\t" +
        "RED:ab\n\n\t\t\t\t\t~\n\t\tBLACK:aa\n\n\t\t\t\t~\n\t\t\tBLACK:a\n\n\t\t\t\t~";
    var orderedWords = [
        [RedBlackTree.IN_ORDER, wordsInOrder],
        [RedBlackTree.PRE_ORDER, wordsPreOrder],
        [RedBlackTree.POST_ORDER, wordsPostOrder]
    ];

    helper.setup(
        it,
        RedBlackTree,
        words,
        orderedWords,
        mammals,
        orderedMammals,
        expectedOutput);

});