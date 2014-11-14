/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            src: ['./index.js', 'lib/**/*.js', 'Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        exec: {
            installCoverage: 'cd support/jscoverage && ./configure && make && mv jscoverage node-jscoverage',
            createCoverage: 'rm -rf ./lib-cov && support/jscoverage/node-jscoverage ./lib ./lib-cov && export NODE_PATH=lib-cov:$(echo NODE_PATH) && export NODE_ENV=test && ./node_modules/it/bin/it -r dotmatrix --cov-html ./docs-md/coverage.html',
            uninstallCoverage: 'rm -f /usr/local/bin/node-jscoverage',
            cleanDocs: 'rm -rf docs/*',
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

    grunt.registerTask('test', 'run it tests with altered env', function () {
        var done = this.async();
        var env = process.env;
        env.NODE_PATH = './lib:'+env.NODE_PATH;
        env.NODE_ENV = 'test';
        grunt.util.spawn({cmd: 'grunt', args: ['it'], opts: {stdio: 'inherit', env: env}}, function (err) {
            if (err) {
                done(false);
            } else {
                done();
            }
        });
    });

    grunt.loadNpmTasks('grunt-it');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-exec');

    // Default task.
    grunt.registerTask('default', ['jshint','install_coverage', 'test_coverage', 'uninstall_coverage', 'docs']);
    grunt.registerTask('install_coverage', 'install the coverage tool', ['exec:installCoverage']);
    grunt.registerTask('uninstall_coverage', 'uninstall the coverage tool', ['exec:uninstallCoverage']);
    grunt.registerTask('test_coverage', 'generate code coverage', ['exec:createCoverage']);
    grunt.registerTask('docs', 'clean and replace docs', ['exec:cleanDocs', 'exec:createDocs']);

};
