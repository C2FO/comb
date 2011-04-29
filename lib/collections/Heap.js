var define = require("../define").define,
        Collection = require("./Collection"),
        base = require("../base");

var padding = function(char, numSpaces) {
    var ret = [];
    for (var i = 0; i < numSpaces; i++)
        ret.push(char);
    return ret.join("");
};

module.exports = exports = define(Collection, {
    instance : {

        __getParentIndex : function(index) {
            return Math.floor((index - 1) / 2);
        },

        __getLeftChildIndex : function(index) {
            return (index * 2) + 1;
        },

        __getRightChildIndex : function(index) {
            return (index * 2) + 2;
        },

        __makeNode : function(key, value) {
            return {key : key, value : value};
        },

        constructor : function() {
            this.__heap = [];
        },

        insert : function(key, value) {
            if (!base.isString(key)) {
                var l = this.__heap.push(this.__makeNode(key, value));
                this.__upHeap(l-1);
            } else {
                throw TypeError("Invalid key");
            }
        },

        //removes the root
        remove : function(){
            var ret = undefined, heap = this.__heap, l = heap.length;
            if(l){
                ret = heap[0];
                if(l == 1){
                    heap.length = 0;
                }else{
                    heap[0] = heap.pop();
                    this.__downHeap(0);
                }
            }
            return ret ? ret.value : ret;
        },

        //removes the root
        peek : function(){
            var ret = undefined, heap = this.__heap, l = heap.length;
            if(l){
                ret = heap[0];
            }
            return ret ? ret.value : ret;
        },

        __upHeap : function(index) {
           throw Error("NOT IMPLEMENTED");
        },

        __downHeap : function(index) {
            throw Error("NOT IMPLEMENTED");
        },

        containsKey : function(key){
            return this.__heap.some(function(n){
                return n.key == key;
            })
        },

        containsValue : function(key){
            return this.__heap.some(function(n){
                return n.value == key;
            })
        },

        clear : function(){
            this.__heap.length =0;
        },

         __printNode : function(index, level) {
            //console.log(level);
            var str = [], node = this.__heap[index];
            if (node == null || node == undefined) {
                str.push(padding('\t', level));
                str.push("~");
                console.log(str.join(""));
            } else {
                this.__printNode(this.__getRightChildIndex(index), level + 1);
                str.push(padding('\t', level));
                str.push(node.key +  " : " + node.value + "\n");
                console.log(str.join(""));
                this.__printNode(this.__getLeftChildIndex(index), level + 1);
            }
        },

         print : function() {
            this.__printNode(0, 0);
        },

        getters : {

            count : function(){
                return this.__heap.length;
            },

            keys : function(){
                return this.__heap.map(function(n){return n.key;});
            },

            values : function(){
                return this.__heap.map(function(n){return n.value;});
            },

            isEmpty : function(){
                return this.__heap.length == 0;
            }
        }


    }
});