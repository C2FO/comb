var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        define = comb.define,
        hitch = comb.hitch,
        Broadcaster = comb;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("Array utilities");
//Super of other classes
suite.addBatch({
    "when summing arrays " :{
        topic : comb.array,

        "it should covert values to arrays" : function(topic){
              assert.deepEqual(topic.toArray(), []);
            assert.deepEqual(topic.toArray(1), [1]);
            assert.deepEqual(topic.toArray([1]), [1]);
            assert.deepEqual(topic.toArray({a : "b", c : "c"}), [["a", "b"],["c", "c"]]);
            assert.deepEqual(topic.toArray("a", {a : "b"}), ["a",["a", "b"]]);
            var date = new Date();
            assert.deepEqual(topic.toArray(date), [date]);
            assert.deepEqual(topic.toArray(true), [true]);
            assert.deepEqual(topic.toArray(false), [false]);
        },

        "is should sum properly" : function(topic) {
            assert.equal(topic.sum(), 0);
            assert.equal(topic.sum([]), 0);
            assert.equal(topic.sum([1,2,3]), 6);
            assert.equal(topic.sum(["A","B","C"]), "ABC");
            var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
            assert.equal(topic.sum([d1,d2,d3]), d1.toString() + d2.toString() + d3.toString());
            assert.equal(topic.sum([
                {},
                {},
                {}
            ]), "[object Object][object Object][object Object]");
        },

        "is should flatten properly" : function(topic) {
            assert.deepEqual(topic.flatten([1,2,3]), [1,2,3]);
            assert.deepEqual(topic.flatten([1,2], [2,3], [3,4]), [1,2,2,3,3,4]);
            assert.deepEqual(topic.flatten([1,"A"], [2,"B"], [3,"C"]), [1,"A",2,"B",3,"C"]);
        },

        "is should intersect properly" : function(topic) {
            assert.deepEqual(topic.intersect([1,2], [2,3], [2,3,5]), [2]);
            assert.deepEqual(topic.intersect([1,2,3], [2,3,4,5], [2,3,5]), [2,3]);
            assert.deepEqual(topic.intersect([1,2,3,4], [2,3,4,5], [2,3,4,5]), [2,3,4]);
            assert.deepEqual(topic.intersect([1,2,3,4,5], [1,2,3,4,5], [1,2,3]), [1,2,3]);
            assert.deepEqual(topic.intersect([
                [1,2,3,4,5],
                [1,2,3,4,5],
                [1,2,3]
            ]), [1,2,3]);
        },


        "is should find the powerset" : function(topic) {
            assert.deepEqual(topic.powerSet([1,2]), [
                [],
                [ 1 ],
                [ 2 ],
                [ 1, 2 ]
            ]);
            assert.deepEqual(topic.powerSet([1,2,3]), [
                [],
                [ 1 ],
                [ 2 ],
                [ 1, 2 ],
                [ 3 ],
                [ 1, 3 ],
                [ 2, 3 ],
                [ 1, 2, 3 ]
            ]);
            assert.deepEqual(topic.powerSet([1,2,3,4]), [
                [],
                [ 1 ],
                [ 2 ],
                [ 1, 2 ],
                [ 3 ],
                [ 1, 3 ],
                [ 2, 3 ],
                [ 1, 2, 3 ],
                [ 4 ],
                [ 1, 4 ],
                [ 2, 4 ],
                [ 1, 2, 4 ],
                [ 3, 4 ],
                [ 1, 3, 4 ],
                [ 2, 3, 4 ],
                [ 1, 2, 3, 4 ]
            ]);
        },

        "is should find the cartesian product" : function(topic) {
            assert.deepEqual(topic.cartesian([1,2], [2,3]), [
                [1,2],
                [1,3],
                [2,2],
                [2,3]
            ]);
            assert.deepEqual(topic.cartesian([1,2], [2,3,4]), [
                [1,2],
                [1,3],
                [1,4] ,
                [2,2],
                [2,3],
                [2,4]
            ]);
            assert.deepEqual(topic.cartesian([1,2,3], [2,3,4]), [
                [1,2],
                [1,3],
                [1,4] ,
                [2,2],
                [2,3],
                [2,4] ,
                [3,2],
                [3,3],
                [3,4]
            ]);
        },

        "it should rotate an array " : function(topic) {
            var arr = ["a", "b", "c", "d"];
            assert.deepEqual(topic.rotate(arr), ["b", "c", "d", "a"]);
            assert.deepEqual(topic.rotate(arr, 2), ["c", "d", "a", "b"]);
            assert.deepEqual(topic.rotate(arr, 3), ["d", "a", "b", "c"]);
            assert.deepEqual(topic.rotate(arr, 4), ["a", "b", "c", "d"]);
            assert.deepEqual(topic.rotate(arr, -1), ["d", "a", "b", "c"]);
            assert.deepEqual(topic.rotate(arr, -2), ["c", "d", "a", "b"]);
            assert.deepEqual(topic.rotate(arr, -3), ["b", "c", "d", "a"]);
            assert.deepEqual(topic.rotate(arr, -4), ["a", "b", "c", "d"]);
        },

        "it should find permutations of an array " : function(topic) {
            var arr = [1,2,3];
            assert.deepEqual(topic.permutations(arr), [
                [ 1, 2, 3 ],
                [ 1, 3, 2 ],
                [ 2, 3, 1 ],
                [ 2, 1, 3 ],
                [ 3, 1, 2 ],
                [ 3, 2, 1 ]

            ]);
            assert.deepEqual(topic.permutations(arr, 2), [
                [ 1, 2],
                [ 1, 3],
                [ 2, 3],
                [ 2, 1],
                [ 3, 1],
                [ 3, 2]
            ]);
            assert.deepEqual(topic.permutations(arr, 1), [
                [1],
                [2],
                [3]
            ]);
            assert.deepEqual(topic.permutations(arr, 0), [
                []
            ]);
            assert.deepEqual(topic.permutations(arr, 4), []);
        },

        "it should zip an arrays " : function(topic) {
            var arr1 = [1, 2], arr2 = [2], arr3 = [3];
            assert.deepEqual(topic.zip([1], [2], [3]), [
                [ 1, 2, 3 ]
            ]);
            assert.deepEqual(topic.zip([1,2], [2], [3]), [
                [ 1, 2, 3 ],
                [2, null, null]
            ]);
            var a = [ 4, 5, 6 ]
            var b = [ 7, 8, 9 ]
            assert.deepEqual(topic.zip([1,2,3], a, b), [
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9]
            ]);
            assert.deepEqual(topic.zip([1,2], a, b), [
                [1, 4, 7],
                [2, 5, 8]
            ]);
            assert.deepEqual(topic.zip(a, [1,2], [8]), [
                [4,1,8],
                [5,2,null],
                [6,null,null]
            ]);
        },

        "it should union arrays" : function(topic){
            assert.deepEqual(topic.union(["a","b","c"], ["b","c", "d"]), ["a", "b", "c", "d"]);
            assert.deepEqual(topic.union(["a"], ["b"], ["c"], ["d"], ["c"]), ["a", "b", "c", "d"]);
        },

        "it should find values at particular indexes" : function(topic){
            var arr =["a", "b", "c", "d"]
            assert.deepEqual(topic.valuesAt(arr, 1,2,3), ["b", "c", "d"]);
            assert.deepEqual(topic.valuesAt(arr, 1,2,3, 4), ["b", "c", "d", null]);
            assert.deepEqual(topic.valuesAt(arr, 0,3), ["a", "d"]);
        },

        "it should transpose an array of arrays" : function(topic){
            assert.deepEqual(topic.transpose([[1,2,3], [4,5,6]]), [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]);
            assert.deepEqual(topic.transpose([[1,2], [3,4], [5,6]]), [ [ 1, 3, 5 ], [ 2, 4, 6 ] ]);
            assert.deepEqual(topic.transpose([[1], [3,4], [5,6]]), [[1]]);
        }
    }
});


suite.run({reporter : require("vows/reporters/spec")}, comb.hitch(ret,"callback"));
