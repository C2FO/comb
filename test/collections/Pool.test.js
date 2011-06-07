var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib"),
        Pool = comb.collections.Pool;

var suite = vows.describe("A Pool");
suite.addBatch({
    "When creating a new Pool" : {
        topic : function() {
            return new Pool();
        },

        "it should know its free count" : function(p) {
            assert.equal(p.freeCount, 0);
        },

        "it should know its in use count" : function(p) {
            assert.equal(p.inUseCount, 0);
        },

        "it should know its total count" : function(p){
            assert.equal(p.count, 0);
        },

        "it should only return 1 object" : function(p) {
            assert.isObject(p.getObject());
            assert.isUndefined(p.getObject());
        }
    },

    "When creating a new pool maxObjects" : {
        topic : function() {
            return new Pool({maxObjects : 3});
        },

        "it should only return 3 object" : function(p) {
            assert.isObject(p.getObject());
            assert.isObject(p.getObject());
            assert.isObject(p.getObject());
            assert.isUndefined(p.getObject());
        },

        "it should know its free count" : function(p) {
            assert.equal(p.freeCount, 0);
        },

        "it should know its in use count" : function(p) {
            assert.equal(p.inUseCount, 3);
        },

         "it should know its total count" : function(p){
            assert.equal(p.count, 3);
        }
    },

    "When creating a new Pool maxObjects less than minObject" : {
        topic : function() {
            return Pool;
        },

        "it should throw an error" : function(p) {
            assert.throws(function() {
                new p({maxObject : 1, minObjects : 3});
            });
        }
    },

    "When creating a new Pool and returning object" : {
          topic : function() {
            return new Pool({maxObjects : 3});
        },

        "it should handle it correctly" : function(p){
            var o1 = p.getObject();
            assert.isObject(o1);
            assert.equal(p.freeCount, 0);
            assert.equal(p.inUseCount, 1);
            assert.equal(p.count, 1);
            var o2 = p.getObject()
            assert.isObject(o2);
            assert.equal(p.freeCount, 0);
            assert.equal(p.inUseCount, 2);
            assert.equal(p.count, 2);
            var o3 = p.getObject();
            assert.isObject(o3);
            assert.equal(p.freeCount, 0);
            assert.equal(p.inUseCount, 3);
            assert.equal(p.count, 3);
            assert.isUndefined(p.getObject());
            assert.equal(p.freeCount, 0);
            assert.equal(p.inUseCount, 3);
            assert.equal(p.count, 3);
            p.returnObject(o1);
            assert.equal(p.freeCount, 1);
            assert.equal(p.inUseCount, 2);
            assert.equal(p.count, 3);
            p.returnObject(o2);
            assert.equal(p.freeCount, 2);
            assert.equal(p.inUseCount, 1);
            assert.equal(p.count, 3);
            p.returnObject(o3);
            assert.equal(p.freeCount, 3);
            assert.equal(p.inUseCount, 0);
            assert.equal(p.count, 3);
        }
    },

    "When creating a new Pool and adjusting maxObjects" : {
        topic : function() {
            return new Pool();
        },


        "it should adjust porperly" : function(p) {
            assert.equal(p.freeCount, 0);
            assert.equal(p.inUseCount, 0);
            assert.equal(p.count, 0);
            assert.isObject(p.getObject());
            assert.isUndefined(p.getObject());
            p.maxObjects = 3;
            assert.equal(p.freeCount, 0);
            assert.equal(p.inUseCount, 1);
            assert.equal(p.count, 1);
            assert.isObject(p.getObject());
            assert.equal(p.freeCount, 0);
            assert.equal(p.inUseCount, 2);
            assert.equal(p.count, 2);
            assert.isObject(p.getObject());
            assert.equal(p.freeCount, 0);
            assert.equal(p.inUseCount, 3);
            assert.equal(p.count, 3);
        }
    }

});

suite.run({reporter : require("vows/reporters/spec")});
