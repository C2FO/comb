function runComb() {
    var Promise = require("../lib/promise").Promise;
    var start = new Date();
    var i = -1,
        p = new Promise().callback(1);

    while (++i < 100000) {
        p = p.chain(function () {
            return i;
        });
    }
    return p.chain(function () {
        console.log("%d MB", (process.memoryUsage().rss / 1024 / 1024));
        console.log("%d ms", new Date() - start);
    });
}

function runQ() {
    var Q = require("q");
    var start = new Date();
    var i = -1,
        p = Q(1);

    while (++i < 100000) {
        p = p.then(function () {
            return i;
        });
    }
    p.then(function () {
        console.log("%d MB", (process.memoryUsage().rss / 1024 / 1024));
        console.log("%d ms", new Date() - start);
    });
}

runComb();
//runQ();

