var comb = require("../../lib"),
    Collection = comb.collections.HashTable,
    Benchmark = require("benchmark");

var suite = new Benchmark.Suite();

var words = comb(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].reverse())
    .powerSet()
    .map(function (w) {
        return w.join("");
    }).filter(function (a) {
        return a;
    });
console.log("HashTable Benchmark");

suite
    .add("insert words into {}", function () {
        var map = {};
        for (var i = 0, l = words.length; i < l; i++) {
            var word = words[i];
            map[word] = word;
        }
    })
    .add("insert words into HashTable", function () {
        var collection = new Collection();
        for (var i = 0, l = words.length; i < l; i++) {
            var word = words[i];
            collection.put(word, word);
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
    var map = {}, collection = new Collection();
    for (var i = 0, l = words.length; i < l; i++) {
        var word = words[i];
        map[word] = word;
        collection.put(word, word);
    }

    new Benchmark.Suite()
        .add("look up words in {}", function () {
            for (var i = 0, l = words.length; i < l; i++) {
                if (!map.hasOwnProperty(words[i])) {
                    console.log("INDEX ERROR");
                }
            }
        })
        .add("look up words in HashTable", function () {
            for (var i = 0, l = words.length; i < l; i++) {
                if (!collection.contains(words[i])) {
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

