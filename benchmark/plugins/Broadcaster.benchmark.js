var comb = require("../../lib");
	Broadcaster = comb.plugins.Broadcaster,
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

var CombBroadCaster = comb.define(Broadcaster, {
			instance : {
				test : function(){
					this.broadcast("test", "hello");
				}
			}
		});

var NodeEventEmitter = function(){
	EventEmitter.call(this);
};
util.inherits(NodeEventEmitter, EventEmitter);
NodeEventEmitter.prototype.test = function(){
	this.emit("test", "hello");
};

var printStats = function(name, op, start, end) {
    console.log(name + " " + op + " TIME = %dms", (+end) - (+start));
};

var count = 10000000;
var testBroadcasts = function() {
    console.log("\nTESTING BROADCASTS %d TIMES....", count);
    var start = new Date();
	var nodeEmitter = new NodeEventEmitter();
    for (var i = 0; i < count; i++) {
        nodeEmitter.test();
    }
    var end = new Date();
    printStats("NODE", "BROADCASTS", start, end);
    start = new Date();
	var combBroadcaster = new CombBroadCaster();
    for (var i = 0; i < count; i++) {
        combBroadcaster.test();
    }
    end = new Date();
    printStats("COMB", "BROADCASTS", start, end);
};

var testListens = function(){
	console.log("\nTESTING LISTEN/UNLISTEN %d TIMES", count);
	var han;
    var start = new Date();
	var nodeEmitter = new NodeEventEmitter();
	nodeEmitter.setMaxListeners(count);
    for (var i = 0; i < count; i++) {
	    var han = function(){};
	    nodeEmitter.on("test", han);
        nodeEmitter.test();
	    nodeEmitter.removeListener("test", han);
    }
    var end = new Date();
    printStats("NODE", "BROADLISTEN/UNLISTENCASTS", start, end);
    start = new Date();
	var combBroadcaster = new CombBroadCaster();
    for (var i = 0; i < count; i++) {
	    var han = combBroadcaster.listen("test", function(){});
        combBroadcaster.test();
	    combBroadcaster.unListen(han);
    }
    end = new Date();
    printStats("COMB", "LISTEN/UNLISTEN", start, end);
};

var test = function() {
    console.log("STARTING TEST....");
    testBroadcasts();
	testListens();
};

test();

