var comb = require("../../lib"),
        AnderssonTree = comb.collections.AnderssonTree;

console.log("CREATING TEST DATA....");
var words = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"].reverse();
var permuttedWords = comb.array.powerSet(words).map(
        function(w) {
            var ret = [];
            return ret.concat.apply(ret, w).join("");
        }).filter(function(a) {
    return a != ''
});

var sortedPermuttedWords = permuttedWords.slice(0).sort(function(a, b) {
    var ret = 0;
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return ret;
});

words = permuttedWords.map(function(word) {
    return {word : word, index : sortedPermuttedWords.indexOf(word)};
});


var printStats = function(name, op, start, end) {
    console.log(name + " " + op + " TIME = %dms", (+end) - (+start));
};

var testInserts = function(arr, tree) {
    var l = words.length;
    console.log("\nTESTING INSERTING %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        arr.splice(word.index, 0, word.word);
    }
    var end = new Date();
    printStats("ARRAY", "INSERTION", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        //done need index and its not used just look it up so as to not skew actual insert time
        tree.insert(word.word, word.index);
    }
    end = new Date();
    printStats("ANDERSSONTREE", "INSERTION", start, end);
};

var testLookUps = function(arr, tree) {
    var l = words.length;
    console.log("\nTESTING LOOKING UP %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        var index = arr.indexOf(word.word);
        if (index == -1) {
            console.log("INDEX ERROR");
        }
    }
    var end = new Date();
    printStats("ARRAY", "LOOK UP", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        if (!tree.contains(word.word)) {
            console.log("INDEX ERROR");
        }
    }
    end = new Date();
    printStats("ANDERSSONTREE", "LOOK UP", start, end);
};

var testDeletion = function(arr, tree) {
    var l = words.length;
    console.log("\nTESTING DELETING %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        arr.splice(word.index, 1);
    }
    var end = new Date();
    printStats("ARRAY", "DELETION", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        //done need index and its not used just look it up so as to not skew actual insert time
        tree.remove(word.word);
    }
    end = new Date();
    printStats("ANDERSSONTREE", "DELETION", start, end);
};

var test = function() {
     var testArr = [], testTree = new AnderssonTree();

    console.log("STARTING TEST....");
    testInserts(testArr, testTree);
    testLookUps(testArr, testTree);
    testDeletion(testArr, testTree);
};

test();

