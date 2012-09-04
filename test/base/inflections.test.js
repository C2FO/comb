"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index");

it.describe("comb/base/inflections.js",function (it) {
    var INFLECTIONS = {
        test:"tests",
        ax:"axes",
        testis:"testes",
        octopus:"octopuses",
        virus:"viruses",
        alias:"aliases",
        status:"statuses",
        bus:"buses",
        buffalo:"buffaloes",
        tomato:"tomatoes",
        datum:"data",
        bacterium:"bacteria",
        analysis:"analyses",
        basis:"bases",
        diagnosis:"diagnoses",
        parenthesis:"parentheses",
        prognosis:"prognoses",
        synopsis:"synopses",
        thesis:"theses",
        wife:"wives",
        giraffe:"giraffes",
        self:"selves",
        dwarf:"dwarves",
        hive:"hives",
        fly:"flies",
        buy:"buys",
        soliloquy:"soliloquies",
        day:"days",
        attorney:"attorneys",
        boy:"boys",
        hoax:"hoaxes",
        lunch:"lunches",
        princess:"princesses",
        matrix:"matrices",
        vertex:"vertices",
        index:"indices",
        mouse:"mice",
        louse:"lice",
        quiz:"quizzes",
        motive:"motives",
        movie:"movies",
        series:"series",
        crisis:"crises",
        person:"people",
        man:"men",
        woman:"women",
        child:"children",
        sex:"sexes",
        move:"moves"
    };
//Super of other classes

    it.should("camelize correctly", function () {
        assert.isNull(comb.camelize(null));
        assert.isUndefined(comb.camelize());
        assert.equal(comb.camelize("hello_world"), "helloWorld");
        assert.equal(comb.camelize("column_name"), "columnName");
        assert.equal(comb.camelize("columnName"), "columnName");

        assert.equal(comb("hello_world").camelize(), "helloWorld");
        assert.equal(comb("column_name").camelize(), "columnName");
        assert.equal(comb("columnName").camelize(), "columnName");
    });


    it.should("underscore correctly", function () {
        assert.isNull(comb.underscore(null));
        assert.isUndefined(comb.underscore());
        assert.equal(comb.underscore("helloWorld"), "hello_world");
        assert.equal(comb.underscore("helloWorld1"), "hello_world_1");
        assert.equal(comb.underscore("1HelloWorld"), "1_hello_world");
        assert.equal(comb.underscore("column_name"), "column_name");
        assert.equal(comb.underscore("columnName"), "column_name");

        assert.equal(comb("helloWorld").underscore(), "hello_world");
        assert.equal(comb("helloWorld1").underscore(), "hello_world_1");
        assert.equal(comb("1HelloWorld").underscore(), "1_hello_world");
        assert.equal(comb("column_name").underscore(), "column_name");
        assert.equal(comb("columnName").underscore(), "column_name");
    });

    it.should("classify correctly", function () {
        assert.isNull(comb.classify(null));
        assert.isUndefined(comb.classify());
        assert.equal(comb.classify('egg_and_hams'), "eggAndHam");
        assert.equal(comb.classify('post'), "post");
        assert.equal(comb.classify('schema.post'), "post");

        assert.equal(comb('egg_and_hams').classify(), "eggAndHam");
        assert.equal(comb('post').classify(), "post");
        assert.equal(comb('schema.post').classify(), "post");
    });


    it.should("singularize correctly", function () {
        assert.isNull(comb.singularize(null));
        assert.isUndefined(comb.singularize());
        for (var i in INFLECTIONS) {
            assert.equal(comb.singularize(INFLECTIONS[i]), i);
            assert.equal(comb(INFLECTIONS[i]).singularize(), i);
        }
    });

    it.should("pluralize correctly", function () {
        assert.isNull(comb.pluralize(null));
        assert.isUndefined(comb.pluralize());
        for (var i in INFLECTIONS) {
            assert.equal(comb.pluralize(i), INFLECTIONS[i]);
            assert.equal(comb(i).pluralize(), INFLECTIONS[i]);
        }
    });


}).as(module);

