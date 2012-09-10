var Benchmark = require("benchmark"),
    comb = require("../../index.js"),
    array = comb.array;
var suite = new Benchmark.Suite();

var arr = array.flatten(array.powerSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

function swtch(str) {
    switch (str) {
        case "a":
            return "A";
        case "b":
            return "B";
        case "c":
            return "C";
        case "d":
            return "D";
        case "e":
            return "E";
        case "f":
            return "F";
        case "g":
            return "G";
        case "h":
            return "H";
        case "i":
            return "I";
        case "j":
            return "J";
        case "k":
            return "K";
    }
}

function ifStmt(str) {
    if (str === "a") {
        return "A";
    }
    if (str === "b") {
        return "B";
    }
    if (str === "c") {
        return "C";
    }
    if (str === "d") {
        return "D";
    }
    if (str === "e") {
        return "E";
    }
    if (str === "f") {
        return "F";
    }
    if (str === "g") {
        return "G";
    }
    if (str === "h") {
        return "H";
    }
    if (str === "i") {
        return "I";
    }
    if (str === "j") {
        return "J";
    }
    if (str === "k") {
        return "K";
    }
}

function elseIfStmt(str) {
    if (str === "a") {
        return "A";
    } else if (str === "b") {
        return "B";
    } else if (str === "c") {
        return "C";
    } else if (str === "d") {
        return "D";
    } else if (str === "e") {
        return "E";
    } else if (str === "f") {
        return "F";
    } else if (str === "g") {
        return "G";
    } else if (str === "h") {
        return "H";
    } else if (str === "i") {
        return "I";
    } else if (str === "j") {
        return "J";
    } else if (str === "k") {
        return "K";
    }
}

var map = {a:"A", b:"B", c:"C", d:"D", e:"E", f:"F", g:"G", h:"H", i:"I", j:"J", k:"K"};
function mapLookUp(str) {
    return map[str];
}

// add tests
suite
    .add("switch", function () {
        swtch("a");
        swtch("b");
        swtch("c");
        swtch("d");
        swtch("e");
        swtch("f");
        swtch("g");
        swtch("h");
        swtch("i");
        swtch("j");
        swtch("k");

    })
    .add("if", function () {
        ifStmt("a");
        ifStmt("b");
        ifStmt("c");
        ifStmt("d");
        ifStmt("e");
        ifStmt("f");
        ifStmt("g");
        ifStmt("h");
        ifStmt("i");
        ifStmt("j");
        ifStmt("k");
    })
    .add("else if", function () {
        elseIfStmt("a");
        elseIfStmt("b");
        elseIfStmt("c");
        elseIfStmt("d");
        elseIfStmt("e");
        elseIfStmt("f");
        elseIfStmt("g");
        elseIfStmt("h");
        elseIfStmt("i");
        elseIfStmt("j");
        elseIfStmt("k");
    })
    .add("map look up", function () {
        mapLookUp("a");
        mapLookUp("b");
        mapLookUp("c");
        mapLookUp("d");
        mapLookUp("e");
        mapLookUp("f");
        mapLookUp("g");
        mapLookUp("h");
        mapLookUp("i");
        mapLookUp("j");
        mapLookUp("k");
    })
//    .add('for loop ++i', function () {
//        for (var i = 0; i < arr.length; ++i) {
//            var item = arr[i];
//        }
//    })
//    .add('for loop i++', function () {
//        for (var i = 0; i < arr.length; i++) {
//            var item = arr[i];
//        }
//    })
//
//    .add('while loop', function () {
//        var i = arr.length;
//        while (--i) {
//            var item = arr[i];
//        }
//    })
//
//    .add('for loop optimized i++', function () {
//        for (var i = 0, l = arr.length; i < l; i++) {
//            var item = arr[i];
//        }
//    })
//    .add('for loop optimized ++i', function () {
//        for (var i = 0, l = arr.length; i < l; ++i) {
//            var item = arr[i];
//        }
//    })
//    .add('for loop backward --i', function () {
//        for (var i = arr.length - 1; i >= 0; --i) {
//            var item = arr[i];
//        }
//    })
//    .add('for loop backward i--', function () {
//        for (var i = arr.length - 1; i >= 0; i--) {
//            var item = arr[i];
//        }
//    })
//    .add('arr.forEach', function () {
//        arr.forEach(function (item) {
//        });
//    })
//    .add('comb([arr]).forEach', function () {
//        comb(arr).forEach(function (item) {
//        });
//    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete',function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log('Slowest is ' + this.filter('slowest').pluck('name'));
    }).run();