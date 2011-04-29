var comb = require("../../lib"),
        Queue = comb.collections.Queue;

console.log("CREATING TEST DATA....");
var words = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"].reverse();
var permuttedWords = comb.array.powerSet(words).map(
        function(w) {
            var ret = [];
            return ret.concat.apply(ret, w).join("");
        }).filter(function(a) {
    return a != ''
});

var words = permuttedWords.slice(0).sort(function(a, b) {
    var ret = 0;
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return ret;
});


var printStats = function(name, op, start, end) {
    console.log(name + " " + op + " TIME = %dms", (+end) - (+start));
};

var testInserts = function(arr, queue) {
    var l = words.length;
    console.log("\nTESTING INSERTING %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        arr.unshift(word);
    }
    var end = new Date();
    printStats("ARRAY", "INSERTION", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        queue.enqueue(word);
    }
    end = new Date();
    printStats("QUEUE", "INSERTION", start, end);
};

var testLookUps = function(arr, queue) {
    var l = words.length;
    console.log("\nTESTING LOOKING UP %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        if (arr.indexOf(word) == -1) {
            console.log("LOOKUP ERROR");
        }
    }
    var end = new Date();
    printStats("ARRAY", "LOOK UP", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        if (!queue.contains(word)) {
            console.log("LOOKUP ERROR");
        }
    }
    end = new Date();
    printStats("QUEUE", "LOOK UP", start, end);
};

var testDeletion = function(arr, queue) {
    var l = words.length;
    console.log("\nTESTING DELETING %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
      arr.shift();
    }
    var end = new Date();
    printStats("ARRAY", "DELETION", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        queue.dequeue();
    }
    end = new Date();
    printStats("QUEUE", "DELETION", start, end);
};


var test = function() {
     var arr = [], queue = new Queue();

    console.log("STARTING TEST....");
    testInserts(arr, queue);
    testLookUps(arr, queue);
    testDeletion(arr, queue);
};

test();

