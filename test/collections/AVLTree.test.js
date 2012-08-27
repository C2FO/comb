"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    helper = require("./treeTest.helper.js"),
    Mammal = helper.Mammal,
    AVLTree = comb.collections.AVLTree;


it.describe("comb.collections.AVLTree", function (it) {

    var words = ["c", "ca", "b", "ba", "bb", "a", "aa", "ab", "z", "d", "f", "h", "i", "ee", "ff", "hi", "j", "ajk"];
    var wordsInOrder = [  'a', 'aa', 'ab', 'ajk', 'b', 'ba', 'bb', 'c', 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z' ];
    var wordsPreOrder = ['ba', 'aa', 'a', 'ajk', 'ab', 'b', 'h', 'd', 'c', 'bb', 'ca', 'f', 'ee', 'ff', 'i', 'hi', 'z', 'j'];
    var wordsPostOrder = [ 'a', 'ab', 'b', 'ajk', 'aa', 'bb', 'ca', 'c', 'ee', 'ff', 'f', 'd', 'hi', 'j', 'z', 'i', 'h', 'ba'];


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
            new Mammal({type:"mouse"}),
            new Mammal({type:"dog"}),
            new Mammal({type:"bird"}),
            new Mammal({type:"horse"}),
            new Mammal({type:"groundhog"}),
            new Mammal({type:"squirrel"}),
            new Mammal({type:"rat"}),
            new Mammal({type:"zebra"})

        ],

        mammalsPostOrder = [
            new Mammal({type:"bird"}),
            new Mammal({type:"groundhog"}),
            new Mammal({type:"horse"}),
            new Mammal({type:"dog"}),
            new Mammal({type:"rat"}),
            new Mammal({type:"zebra"}),
            new Mammal({type:"squirrel"}),
            new Mammal({type:"mouse"})

        ];
    var orderedMammals = [
        [AVLTree.IN_ORDER, mammalsInOrder],
        [AVLTree.PRE_ORDER, mammalsPreOrder],
        [AVLTree.POST_ORDER, mammalsPostOrder]
    ]


    var expectedOutput = "\t\t\t\t~\n\t\t\tz:-1\n\n\t\t\t\t\t~\n\t\t\t\tj:0\n\n\t\t\t\t\t~\n\t\ti:1\n\n\t\t\t\t~\n\t\t\t" +
        "hi:0\n\n\t\t\t\t~\n\th:0\n\n\t\t\t\t\t~\n\t\t\t\tff:0\n\n\t\t\t\t\t~\n\t\t\tf:0\n\n\t\t\t\t\t~\n\t\t\t\t" +
        "ee:0\n\n\t\t\t\t\t~\n\t\td:0\n\n\t\t\t\t\t~\n\t\t\t\tca:0\n\n\t\t\t\t\t~\n\t\t\tc:0\n\n\t\t\t\t\t~\n\t\t\t\t" +
        "bb:0\n\n\t\t\t\t\t~\nba:1\n\n\t\t\t\t~\n\t\t\tb:0\n\n\t\t\t\t~\n\t\tajk:0\n\n\t\t\t\t~\n\t\t\tab:0\n\n\t\t\t\t~\n\t" +
        "aa:1\n\n\t\t\t~\n\t\ta:0\n\n\t\t\t~";

    var orderedWords = [
        [AVLTree.IN_ORDER, wordsInOrder],
        [AVLTree.PRE_ORDER, wordsPreOrder],
        [AVLTree.POST_ORDER, wordsPostOrder]
    ]


    helper.setup(
        it,
        AVLTree,
        words,
        orderedWords,
        mammals,
        orderedMammals,
        expectedOutput);

}).as(module);