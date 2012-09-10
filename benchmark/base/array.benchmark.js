var Benchmark = require("benchmark"),
    comb = require("../../index.js"),
    array = comb.array;
var suite = new Benchmark.Suite();

var arr = array.flatten(array.powerSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// add tests
suite
    .add('for loop ++i', function () {
        for (var i = 0; i < arr.length; ++i) {
            var item = arr[i];
        }
    })
    .add('for loop i++', function () {
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
        }
    })

    .add('while loop', function () {
        var i = arr.length;
        while (--i) {
            var item = arr[i];
        }
    })

    .add('for loop optimized i++', function () {
        for (var i = 0, l = arr.length; i < l; i++) {
            var item = arr[i];
        }
    })
    .add('for loop optimized ++i', function () {
        for (var i = 0, l = arr.length; i < l; ++i) {
            var item = arr[i];
        }
    })
    .add('for loop backward --i', function () {
        for (var i = arr.length - 1; i >= 0; --i) {
            var item = arr[i];
        }
    })
    .add('for loop backward i--', function () {
        for (var i = arr.length - 1; i >= 0; i--) {
            var item = arr[i];
        }
    })
    .add('arr.forEach', function () {
        arr.forEach(function (item) {
        });
    })
    .add('comb([arr]).forEach', function () {
        comb(arr).forEach(function (item) {
        });
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log('Slowest is ' + this.filter('slowest').pluck('name'));
    })
    .run();