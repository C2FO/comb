var Benchmark = require("benchmark"),
    comb = require("../index.js"),
    define = comb.define,
    sys = require("sys"),
    array = comb.array;
var suite = new Benchmark.Suite();
suite.add('prototype', (function () {
    function User(name) {
        if (name) {
            this.name = name.trim();
        }
    }

    function Admin(name) {
        User.call(this, name);
    }

    Admin.prototype = new User();
    return function () {
        var admin = new Admin('doug');
    };
}()));
suite.add('sys.inherits()', (function () {
    function User(name) {
        if (name) {
            this.name = name.trim();
        }
    }

    function Admin(name) {
        User.call(this, name);
    }

    sys.inherits(Admin, User);
    return function () {
        var admin = new Admin('doug');
    };
}()));
suite.add('comb.define', (function () {
    var User = define(null, {
        instance:{
            constructor:function (name) {
                this.name = name.trim();
            }
        }
    });
    var Admin = define(User);
    return function () {
        var admin = new Admin('doug');
    };
})());
suite.on('cycle', function (event) {
    console.log(String(event.target));
});
suite.on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    console.log('Slowest is ' + this.filter('slowest').pluck('name'));
});
suite.run();

var suite2 = new Benchmark.Suite()
    .add('prototype instance',function () {

        function User(name) {
            if (name) {
                this.name = name.trim();
            }
        }

        function Admin(name) {
            User.call(this, name);
        }

        Admin.prototype = new User();

        var admin = new Admin('doug');
    }).add('sys.inherits() instance', function () {

        function User(name) {
            this.name = name.trim();
        }

        function Admin(name) {
            User.call(this, name)
        }

        sys.inherits(Admin, User);
        var admin = new Admin('doug');
    })

    .add('comb.define instance', function () {
        var User = comb.define(null, {
            instance:{
                constructor:function (name) {
                    this.name = name.trim();
                }
            }});
        var Admin = define(User);
        var admin = new Admin('doug');
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log('Slowest is ' + this.filter('slowest').pluck('name'));
    })
    .run();

