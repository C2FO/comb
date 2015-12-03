"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("../../index"),
    helper = require("./treeTest.helper.js"),
    Mammal = helper.Mammal,
    AnderssonTree = comb.collections.AnderssonTree;


it.describe("comb.collections.AnderssonTree", function (it) {
    var words = ["c", "ca", "b", "ba", "bb", "a", "aa", "ab", "z", "d", "f", "h", "i", "ee", "ff", "hi", "j", "ajk"];
    var wordsInOrder = ['a', 'aa', 'ab', 'ajk', 'b', 'ba', 'bb', 'c', 'ca', 'd', 'ee', 'f', 'ff', 'h', 'hi', 'i', 'j', 'z'];
    var wordsPreOrder = ['d', 'ba', 'aa', 'a', 'ajk', 'ab', 'b', 'c', 'bb', 'ca', 'h', 'f', 'ee', 'ff', 'i', 'hi', 'j', 'z'];
    var wordsPostOrder = ['a', 'ab', 'b', 'ajk', 'aa', 'bb', 'ca', 'c', 'ba', 'ee', 'ff', 'f', 'hi', 'z', 'j', 'i', 'h', 'd'];


    var mammals = [
            new Mammal({type: "bird"}),
            new Mammal({type: "dog"}),
            new Mammal({type: "rat"}),
            new Mammal({type: "zebra"}),
            new Mammal({type: "mouse"}),
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
            new Mammal({type: "horse"}),
            new Mammal({type: "dog"}),
            new Mammal({type: "bird"}),
            new Mammal({type: "groundhog"}),
            new Mammal({type: "rat"}),
            new Mammal({type: "mouse"}),
            new Mammal({type: "squirrel"}),
            new Mammal({type: "zebra"})

        ],

        mammalsPostOrder = [
            new Mammal({type: "bird"}),
            new Mammal({type: "groundhog"}),
            new Mammal({type: "dog"}),
            new Mammal({type: "mouse"}),
            new Mammal({type: "zebra"}),
            new Mammal({type: "squirrel"}),
            new Mammal({type: "rat"}),
            new Mammal({type: "horse"})
        ];
    var orderedMammals = [
        [AnderssonTree.IN_ORDER, mammalsInOrder],
        [AnderssonTree.PRE_ORDER, mammalsPreOrder],
        [AnderssonTree.POST_ORDER, mammalsPostOrder]
    ];


    var orderedWords = [
        [AnderssonTree.IN_ORDER, wordsInOrder],
        [AnderssonTree.PRE_ORDER, wordsPreOrder],
        [AnderssonTree.POST_ORDER, wordsPostOrder]
    ];
    helper.setup(
        it,
        AnderssonTree,
        words,
        orderedWords,
        mammals,
        orderedMammals,
        "\t\t\t\t\t~\n\t\t\t\tz:1\n\n\t\t\t\t\t~\n\t\t\tj:1\n\n\t\t\t\t~\n\t\ti:2\n\n\t\t\t\t~\n\t\t\thi:1\n\n\t\t\t\t" +
        "~\n\th:3\n\n\t\t\t\t~\n\t\t\tff:1\n\n\t\t\t\t~\n\t\tf:2\n\n\t\t\t\t~\n\t\t\tee:1\n\n\t\t\t\t" +
        "~\nd:4\n\n\t\t\t\t~\n\t\t\tca:1\n\n\t\t\t\t~\n\t\tc:2\n\n\t\t\t\t~\n\t\t\tbb:1\n\n\t\t\t\t" +
        "~\n\tba:3\n\n\t\t\t\t\t~\n\t\t\t\tb:1\n\n\t\t\t\t\t~\n\t\t\tajk:2\n\n\t\t\t\t\t~\n\t\t\t\t" +
        "ab:1\n\n\t\t\t\t\t~\n\t\taa:2\n\n\t\t\t\t~\n\t\t\ta:1\n\n\t\t\t\t~");
}).as(module);
