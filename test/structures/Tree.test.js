var vows = require('vows'),
        assert = require('assert'),
        comb = require("../../lib")
Tree = require("../../lib/structures/Tree");

var tree = new Tree();

tree.insert("c");
tree.insert("ca");
tree.insert("b");
tree.insert("ba");
tree.insert("bb");
tree.insert("a");
tree.insert("aa");
tree.insert("ab");

console.log("REMOVE APPLE");
tree.remove("apple");
tree.print();

console.log("INSERT APPLE");
tree.insert("apple");
console.log("REMOVE BAR");
tree.remove("bar");
tree.print();
console.log(tree.toArray());

tree.forEach(function(node){
    console.log(node);
});

var mappedTree = tree.map(function(node){
   return "a" + node;
});
mappedTree.print();