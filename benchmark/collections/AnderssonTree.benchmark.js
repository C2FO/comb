var comb = require("../../lib"),
    Tree = comb.collections.AnderssonTree,
    Benchmark = require("benchmark");

var suite = new Benchmark.Suite();

var words = comb(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].reverse())
    .powerSet()
    .map(function (w) {
        return w.join("");
    }).filter(function (a) {
        return a;
    });
console.log("AnderssonTree Benchmark");

suite
    .add("insert words in order in array", function () {
        var arr = [];
        for (var i = 0, l = words.length; i < l; i++) {
            arr.push(words[i]);
            arr.sort();
        }
    })
    .add("insert words into AnderssonTree", function () {
        var tree = new Tree();
        for (var i = 0, l = words.length; i < l; i++) {
            tree.insert(words[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log('Slowest is ' + this.filter('slowest').pluck('name'));
    })
    .run();

(function () {
    var arr = [], tree = new Tree();
    for (var i = 0, l = words.length; i < l; i++) {
        var word = words[i];
        arr.push(word);
        tree.insert(word);
    }
    arr.sort();

    new Benchmark.Suite()
        .add("look up words in array", function () {
            for (var i = 0, l = words.length; i < l; i++) {
                var index = arr.indexOf(words[i]);
                if (index === -1) {
                    console.log("INDEX ERROR");
                }
            }
        })
        .add("look up words in AnderssonTree", function () {
            for (var i = 0, l = words.length; i < l; i++) {
                if (!tree.contains(words[i])) {
                    console.log("INDEX ERROR");
                }
            }
        })
        .on('cycle', function (event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').pluck('name'));
            console.log('Slowest is ' + this.filter('slowest').pluck('name'));
        })
        .run();

    new Benchmark.Suite()
        .add("remove words from array", function () {

        });

})();

