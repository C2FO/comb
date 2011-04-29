var define = require("../define").define,
        Collection = require("./Collection"),
        base = require("../base");

var hashFunction = function (key) {
    if (typeof key == "string") {
        return key;
    } else if (typeof key == "object") {
        var h = key.hashCode ? key.hashCode() : key.toString();
        return h || String(key);
    } else {
        return String(key);
    }
};

var Bucket = define(null, {

    instance : {

        constructor : function() {
            this.__entries = [];
        },

        pushValue : function(key, value) {
            return this.set(key, value);
            return value;
        },

        remove : function(key) {
            var ret = null, map = this.__entries;
            var i = map.length - 1;
            for (; i >= 0; i--) {
                var val = map[i];
                if (val && key === val.key) {
                    map[i] = null;
                    ret = val.value;
                    break;
                }
            }
            return ret;
        },

        "set" : function(key, value) {
            var ret = null, map = this.__entries;
            var i = map.length - 1;
            for (; i >= 0; i--) {
                var val = map[i];
                if (val && key === val.key) {
                    val.value = value;
                    ret = value;
                    break;
                }
            }
            if (!ret) {
                map.push({key : key, value : value});
            }
            return ret;
        },

        find : function(key) {
            var ret = null;
            var i = this.__entries.length - 1;
            for (; i >= 0; i--) {
                var val = this.__entries[i];
                if (val && key === val.key) {
                    ret = val.value;
                    break;
                }
            }
            return ret;
        },

        getters : {
            keys : function() {
                var map = this.__entries;
                if (map.length) {
                    return map.filter(
                            function(e) {
                                return e;
                            }).map(function(m) {
                        return m.key;
                    });
                } else {
                    return [];
                }
            },

            values : function() {
                var map = this.__entries;
                if (map.length) {
                    return map.filter(
                            function(e) {
                                return e;
                            }).map(function(m) {
                        return m.value;
                    });
                } else {
                    return [];
                }
            },

            entrySet : function() {
                var map = this.__entries;
                if (map.length) {
                    return map.filter(function(e) {
                        return e;
                    });
                } else {
                    return [];
                }
            }
        }
    }
});

module.exports = exports = HashTable = define(Collection, {

    instance : {

        constructor : function() {
            this.__map = {};
        },

        put : function(key, value) {
            var hash = hashFunction(key);
            var bucket = null;
            if ((bucket = this.__map[hash]) == null) {
                bucket = (this.__map[hash] = new Bucket());
            }
            bucket.pushValue(key, value);
            return value;
        },

        remove : function(key) {
            var hash = hashFunction(key), ret = null;
            var bucket = null;
            if ((bucket = this.__map[hash]) != null) {
                ret = bucket.remove(key);
            }
            return ret;
        },

        "get" : function(key) {
            var hash = hashFunction(key), ret = null;
            var bucket = null;
            if ((bucket = this.__map[hash]) != null) {
                ret = bucket.find(key);
            }
            return ret;
        },

        "set" : function(key, value) {
            var hash = hashFunction(key), ret = null, bucket = null;
            if ((bucket = this.__map[hash]) != null) {
                ret = bucket.set(key, value);
            } else {
                ret = (this.__map[hash] = new Bucket()).pushValue(key, value);
            }
            return ret;
        },

        contains : function(key){
           var hash = hashFunction(key), ret = false;
            var bucket = null;
            if ((bucket = this.__map[hash]) != null) {
                ret = bucket.find(key) != null;
            }
            return ret;
        },

        concat : function(hashTable) {
            if (hashTable instanceof HashTable) {
                var ret = new HashTable();
                var otherEntrySet = hashTable.entrySet.concat(this.entrySet);
                for (var i = otherEntrySet.length - 1; i >= 0; i--) {
                    var e = otherEntrySet[i];
                    ret.put(e.key, e.value);
                }
                return ret;
            } else {
                throw new TypeError("When joining hashtables the joining arg must be a HashTable");
            }
        },

        filter : function(cb, scope) {
            var es = this.entrySet, ret = new HashTable();
            es = es.filter.apply(es, arguments);
            for (var i = es.length - 1; i >= 0; i--) {
                var e = es[i];
                ret.put(e.key, e.value);
            }
            return ret;
        },

        forEach : function() {
            var es = this.entrySet;
            es = es.forEach.apply(es, arguments);
        },
        every : function() {
            var es = this.entrySet;
            return es.every.apply(es, arguments);
        },
        map : function() {
            var es = this.entrySet;
            return es.map.apply(es, arguments);
        },
        some : function() {
            var es = this.entrySet;
            return es.some.apply(es, arguments);
        },
        reduce : function() {
            var es = this.entrySet;
            return es.reduce.apply(es, arguments);
        },
        reduceRight : function() {
            var es = this.entrySet;
            return es.reduceRight.apply(es, arguments);
        },

        clear : function() {
            this.__map = {};
        },

        getters : {
            keys : function() {
                var ret = [], map = this.__map;
                for (var i in map) {
                    ret = ret.concat(map[i].keys);
                }
                return ret;
            },

            values : function() {
                var ret = [];
                for (var i in this.__map) {
                    ret = ret.concat(this.__map[i].values);
                }
                return ret;
            },

            entrySet : function() {
                var ret = [];
                for (var i in this.__map) {
                    ret = ret.concat(this.__map[i].entrySet);
                }
                return ret;
            }
        }
    }

});



