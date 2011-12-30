var vows = require('vows'),
    assert = require('assert'),
    comb = require("index");

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Inflection utilities");

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
suite.addBatch({
    "when camelizing a string":{
        topic:comb,

        "it should camelize correctly":function (topic) {
            assert.isNull(topic.camelize(null));
            assert.isUndefined(topic.camelize());
            assert.equal(topic.camelize("hello_world"), "helloWorld");
            assert.equal(topic.camelize("column_name"), "columnName");
            assert.equal(topic.camelize("columnName"), "columnName");
        }
    },

    "when underscoring a string":{
        topic:comb,

        "it should underscore correctly":function (topic) {
            assert.isNull(topic.underscore(null));
            assert.isUndefined(topic.underscore());
            assert.equal(topic.underscore("helloWorld"), "hello_world");
            assert.equal(topic.underscore("column_name"), "column_name");
            assert.equal(topic.underscore("columnName"), "column_name");
        }
    },

    "when classifying a string":{
        topic:comb,

        "it should underscore correctly":function (topic) {
            assert.isNull(topic.classify(null));
            assert.isUndefined(topic.classify());
            assert.equal(topic.classify('egg_and_hams'), "eggAndHam");
            assert.equal(topic.classify('post'), "post");
            assert.equal(topic.classify('schema.post'), "post");
        }
    },

    "when singularizing a string":{
        topic:comb,

        "it should singularize correctly":function (topic) {
            assert.isNull(topic.singularize(null));
            assert.isUndefined(topic.singularize());
            for(var i in INFLECTIONS){
                assert.equal(topic.singularize(INFLECTIONS[i]), i);
            }
        }
    },

    "when pluralizing a string":{
        topic:comb,

        "it should singularize correctly":function (topic) {
            assert.isNull(topic.pluralize(null));
            assert.isUndefined(topic.pluralize());
            for(var i in INFLECTIONS){
                assert.equal(topic.pluralize(i), INFLECTIONS[i]);
            }
        }
    }


});


suite.run({reporter:vows.reporter.spec}, comb.hitch(ret, "callback"));
