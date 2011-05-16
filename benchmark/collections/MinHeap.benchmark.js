var comb = require("../../lib"),
        MinHeap = comb.collections.MinHeap;

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

var testInserts = function(map, table) {
    var l = words.length;
    console.log("\nTESTING INSERTING %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        map[i] = word;
    }
    var end = new Date();
    printStats("MAP", "INSERTION", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        //done need index and its not used just look it up so as to not skew actual insert time
        table.insert(i, word);
    }
    end = new Date();
    printStats("MinHeap", "INSERTION", start, end);
};

var testLookUps = function(map, table) {
    var l = words.length;
    console.log("\nTESTING LOOKING UP %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
        if (!map[i]) {
            console.log("LOOKUP ERROR");
        }
    }
    var end = new Date();
    printStats("MAP", "LOOK UP", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        if (!table.containsKey(i)) {
            console.log("LOOKUP ERROR");
        }
    }
    end = new Date();
    printStats("MinHeap", "LOOK UP", start, end);
};

var testDeletion = function(map, table) {
    var l = words.length;
    console.log("\nTESTING DELETING %d WORDS....", l);
    var start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        delete map[word]
    }
    var end = new Date();
    printStats("MAP", "DELETION", start, end);

    start = new Date();
    for (var i = 0; i < l; i++) {
        var word = words[i];
        //done need index and its not used just look it up so as to not skew actual insert time
        table.remove();
    }
    end = new Date();
    printStats("MinHeap", "DELETION", start, end);
};


var test = function() {
     var map = {}, table = new MinHeap();

    console.log("STARTING TEST....");
    testInserts(map, table);
    //testLookUps(map, table);
    testDeletion(map, table);
};

test();

