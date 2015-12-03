"use strict";
/*global module:false*/
module.exports = function (grunt) {

    // Automatic module definition loading. Significantly speeds up build cycles
    require('jit-grunt')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    var DEFAULT_COVERAGE_ARGS = ["cover", "-x", "Gruntfile.js", "--report", "none", "--print", "none", "--include-pid", "grunt", "--", "it"],
        path = require("path");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        comb: {
            paths: {
                root: './',
                lib: './lib',
                test: './test'
            }
        },

        jshint: {
            src: [
                "./index.js",
                "<%= comb.paths.lib %>/**/*.js",
                "<%= comb.paths.test %>/**/*.js",
                "Gruntfile.js"
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        exec: {
            sendToCoveralls: "cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
            removeCoverage: "rm -rf ./coverage",
            removeDocs: "rm -rf docs/*",
            createDocs: 'coddoc -f multi-html -d ./lib --dir ./docs'
        },

        it: {
            all: {
                src: 'test/**/*.test.js',
                options: {
                    timeout: 3000, // not fully supported yet
                    reporter: 'tap'
                }
            }
        }
    });

    grunt.registerTask("benchmarks", "runs benchmarks", function () {
        var done = this.async();
        require("./benchmark/benchmark")()
            .then(function () {
                done(true);
            })
            .catch(function (err) {
                console.log(err.stack || err);
                done(false);

            });
    });

    grunt.registerTask("spawn-test-coverage", "spawn tests with coverage", function () {
        var done = this.async();
        var env = process.env;
        grunt.util.spawn({
            cmd: "./node_modules/istanbul/lib/cli.js",
            args: DEFAULT_COVERAGE_ARGS,
            opts: {stdio: 'inherit', env: env}
        }, function (err) {
            if (err) {
                console.log(err);
                done(false);
            } else {
                done();
            }
        });
    });


    grunt.registerTask("process-coverage", "process coverage obects", function () {
        var files = grunt.file.expand("./coverage/coverage*.json"),
            istanbul = require('istanbul'),
            collector = new istanbul.Collector(),
            reporter = new istanbul.Reporter(),
            sync = false,
            done = this.async();

        files.forEach(function (file) {
            collector.add(grunt.file.readJSON(file));
        });

        reporter.add('text');
        reporter.addAll(['lcovonly']);
        reporter.write(collector, sync, function (err) {
            if (err) {
                console.error(err.stack);
                return done(false);
            }
            console.log('All reports generated');
            done();
        });
    });

    grunt.registerTask('default', ['jshint', "test", "test-coverage", "docs"]);

    grunt.registerTask('test', ['it']);

    grunt.registerTask('coveralls', ['exec:removeCoverage', 'spawn-test-coverage', 'process-coverage', 'exec:sendToCoveralls', 'exec:removeCoverage']);
    grunt.registerTask('test-coverage', ['exec:removeCoverage', 'spawn-test-coverage', 'process-coverage', 'exec:removeCoverage']);


    grunt.registerTask("docs", ["exec:removeDocs", "exec:createDocs"]);
};