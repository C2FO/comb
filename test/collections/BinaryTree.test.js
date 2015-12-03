"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("../../index"),
    helper = require("./treeTest.helper.js"),
    Mammal = helper.Mammal,
    BinaryTree = comb.collections.BinaryTree;


it.describe("comb.collections.BinaryTree", function (it) {

    var words = ["c", "ca", "b", "ba", "bb", "a", "a", "aa", "ab", "z", "d", "f", "h", "i", "ee", "ff", "hi", "j", "ajk"];
    var wordsInOrder = ['a', 'aa', 'ab', 'ajk', 'b', 'ba', 'bb', 'c', 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'];
    var wordsPreOrder = ["c", "b", "a", "aa", "ab", "ajk", "ba", "bb", "ca", "z", "d", "f", "ee", "h", "ff", "i", "hi", "j"];
    var wordsPostOrder = ["ajk", "ab", "aa", "a", "bb", "ba", "b", "ee", "ff", "hi", "j", "i", "h", "f", "d", "z", "ca", "c"];

    var mammals = [
            new Mammal({type: "bird"}),
            new Mammal({type: "dog"}),
            new Mammal({type: "rat"}),
            new Mammal({type: "mouse"}),
            new Mammal({type: "zebra"}),
            new Mammal({type: "horse"}),
            new Mammal({type: "squirrel"}),
            new Mammal({type: "groundhog"})
        ],

        mammalsInOrder = [
            new Mammal({type: "bird"}),
            new Mammal({type: "dog"}),
            new Mammal({type: "groundhog"}),
            new Mammal({type: "horse"}),
            new Mammal({type: "mouse"}),
            new Mammal({type: "rat"}),
            new Mammal({type: "squirrel"}),
            new Mammal({type: "zebra"})
        ],

        mammalsPreOrder = [
            new Mammal({type: "bird"}),
            new Mammal({type: "dog"}),
            new Mammal({type: "rat"}),
            new Mammal({type: "mouse"}),
            new Mammal({type: "horse"}),
            new Mammal({type: "groundhog"}),
            new Mammal({type: "zebra"}),
            new Mammal({type: "squirrel"})
        ],

        mammalsPostOrder = [
            new Mammal({type: "groundhog"}),
            new Mammal({type: "horse"}),
            new Mammal({type: "mouse"}),
            new Mammal({type: "squirrel"}),
            new Mammal({type: "zebra"}),
            new Mammal({type: "rat"}),
            new Mammal({type: "dog"}),
            new Mammal({type: "bird"})
        ];

    var expectedOutput = "\t\t\t~\n\t\tz\n\n\t\t\t\t\t\t\t\t~\n\t\t\t\t\t\t\tj\n\n\t\t\t\t\t\t\t\t~\n\t\t\t\t\t\t" +
        "i\n\n\t\t\t\t\t\t\t\t~\n\t\t\t\t\t\t\thi\n\n\t\t\t\t\t\t\t\t~\n\t\t\t\t\th\n\n\t\t\t\t\t\t\t~\n\t\t\t\t\t\t" +
        "ff\n\n\t\t\t\t\t\t\t~\n\t\t\t\tf\n\n\t\t\t\t\t\t~\n\t\t\t\t\tee\n\n\t\t\t\t\t\t~\n\t\t\td\n\n\t\t\t\t~\n\t" +
        "ca\n\n\t\t~\nc\n\n\t\t\t\t~\n\t\t\tbb\n\n\t\t\t\t~\n\t\tba\n\n\t\t\t~\n\tb\n\n\t\t\t\t\t\t~\n\t\t\t\t\t" +
        "ajk\n\n\t\t\t\t\t\t~\n\t\t\t\tab\n\n\t\t\t\t\t~\n\t\t\taa\n\n\t\t\t\t~\n\t\ta\n\n\t\t\t~";
    var orderedWords = [
        [BinaryTree.IN_ORDER, wordsInOrder],
        [BinaryTree.PRE_ORDER, wordsPreOrder],
        [BinaryTree.POST_ORDER, wordsPostOrder]
    ];
    var orderedMammals = [
        [BinaryTree.IN_ORDER, mammalsInOrder],
        [BinaryTree.PRE_ORDER, mammalsPreOrder],
        [BinaryTree.POST_ORDER, mammalsPostOrder]
    ];


    helper.setup(
        it,
        BinaryTree,
        words,
        orderedWords,
        mammals,
        orderedMammals,
        expectedOutput);


}).as(module);



