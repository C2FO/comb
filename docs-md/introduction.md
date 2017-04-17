# Comb

`comb` can be used as a namespace or a `function` when using comb as a `function` it decorates the passed in value with methods that can be chained togther or used stand alone. The following types are supported.

* `Boolean`
* [String](#strings)
* [Number](#numbers)
* [Array](#arrays)
* [Date](#dates)
* [Object](#objects)
* [Function](#functions)
* [Argument](#arguments)
* `RegExp`

## Notes

### Strict Equalities

When comparing primitives you should use the `eq` and `neq` methods as primitives are coverted to their Object counter parts.

```
var one = 1, 
    //converted to new Number(1)
	combOne = comb(1);

console.log(one === combOne); //false
console.log(combOne.eq(one)); //true

console.log(one !== combOne); //true
console.log(combOne.neq(one)); //false
```


### Printing values.

When using `console.log` you should convert primitive values to strings either trough the toString method or `"" + value' otherwise you will end up with the object printed instead of the expected value.

```
console.log(comb("hello")); //{ '0': 'h', '1': 'e', '2': 'l', '3': 'l', '4': 'o' }
console.log("%s", comb("hello")); //"hello"
comb("hello").print(); //"hello"
```


## Common Methods

Comb will be default decorate any value passed in with the following methods.

* `isDefined` : returns true if value `!== undefined`.
* `isUndefined` : returns true if value `=== undefined`.
* `isNull` : returns true if value `=== undefined`.
* `isUndefinedOrNull` : returns true if value `!== undefined` and `!== null`.
* `isArguments` : returns true if the value is an `Arguments` object.
* `isObject` : returns true if the value is an `Object`.
* `isHash` : returns true if the value is only and instance of `Object` (i.e. `{}`).
* `isBoolean` : retuns true if the value is a `Boolean`.
* `isDate` : returns true if the value is a `Date`.
* `isEmpty` : returns true if the value is empty (i.e. `{} || [] || "" "`).
* `isArray` : returns true if the value is an `Array`.
* `isFunction` : returns true if the value is a `function`.
* `isInstanceOf` : returns true if the value is an istance of the passed in constructor.

```
comb(new String("hello")).isInstanceOf(String)); //true
comb(new String("hello")).isInstanceOf(Number)); //false
```

* `print` : logs the actual value.
* `eq` : checks strict equality. Use this for primitives as they are casted to Objects.
* `neq` : checks strict in-equality. Use this for primitives as they are casted to Objects.
* `date` : expose date methods on the object.
* `string` : expose string methods on the object.
* `array` : expose array methods on the object.
* `args` : expose arguments methods on the object.
* `func` : expose function methods on the object.
* `number` : expose number methods on the object.
* `object` : expose object methods on the object.
* `isNumber` : returns true if the value is a number.
* `isPromiseLike` : returns true if the value is promise like. See [comb.isPromiseLike](./comb.html#.isPromiseLike)
* `isRegExp` : returns true if the value is a `RegExp`
* `isString` : returns true if the value is a `String`
* `deepEqual` : returns true if the value is deeply equal to the passed in value

```
var value = comb({a : "b", b : "c"});
value.deepEqual({a : "b", b : "c"})); //true
value.deepEqual({a : "b", c : "b"})); //false
```

<a name="arrays"></a>
## Arrays

`Array`s will be decorated with the following functions.

### `style`
Styles each string in the array.

```
//prints red green and blue in red to the terminal
comb(["red", "green","blue"]).style("red").join("\n")); 
```

### `forEach`

Chainable version of `Array.prototype.forEach` returning the original array

```
comb([1,2,3])
	.forEach(function(num){
		console.log(num);
	})
	.map(function(num){
		return num * 2;
	})
	.forEach(function(num){
		console.log(num);
	});
```

### `map`

Same as `Array.prototype.map` but the return value is decorated with all the array methods.

### `filter`

Same as `Array.prototype.filter` but the return value is decorated with all the array methods.

### `reduce`

Same as `Array.prototype.filter` but the return value is decorated by `comb`.

### `reduceRight`

Same as `Array.prototype.reduceRight` but the return value is decorated by `comb`.

### `indexOf`

Same as `Array.prototype.indexOf` but with a decorated number.

### `lastIndexOf`

Same as `Array.prototype.lastIndexOf` but with a decorated number.

### `zip`

Zips array together.

```
comb([1]).zip([2], [3]);    // [[ 1, 2, 3 ]]
comb([1, 2]).zip([2], [3]); // [[ 1, 2, 3 ], [2, null, null]]
comb([1, 2, 3]).zip(a, b);  //[[1, 4, 7],[2, 5, 8],[3, 6, 9]]
```

### `sum`

Sums an array

```
comb([1,2,3]).sum(); //6
comb([1,2,3]).sum().isNumber(); //true
```

### `avg`

Finds the average of an array of numbers.

```
comb([1,2,3]).avg(); //2
comb([1,2,3]).avg().isNumber(); //true
```

### `sort`

Sorts an array. **NOTE** This does not change the original array.

```
var arr = [3,2,1];
comb(arr).sort()); //[1,2,3]
arr); //[3,2,1]

var arr2 = [{a : 3}, {a : 2}, {a : 1}];
comb(arr).sort("a").pluck("a"); //[1,2,3]
comb(arr).pluck("a");           //[3,2,1]

```

### `min`

Finds the minimum value in an array.

```
var arr = [3,2,1];
comb(arr).min(); //1

var arr2 = [{a : 3}, {a : 2}, {a : 1}];
comb(arr).min("a"); //{a : 1}
```

### `max`

Finds the maximum value in an array.

```
var arr = [3,2,1];
comb(arr).max(); //3

var arr2 = [{a : 3}, {a : 2}, {a : 1}];
comb(arr).max("a"); //{a : 3}
```

### `difference`

Finds the difference between two arrays.

```
comb([true, false]).difference([false]); //[true]
comb([1, 2, 3]).difference([2]);        //[1, 3]
comb([1, 2, 3]).difference([2], [3]);   //[1]
comb(["a", "b", 3]).difference([3]);    //["a", "b"]
comb([a, b, c]).difference([b, c]);     //[a]
```

### `removeDuplicates`

Removes duplicates from an array.

```
comb([1, 2, 2, 3, 3, 3, 4, 4, 4]).removeDuplicates(); //[1, 2, 3, 4]
comb(["a", "b", "b"]).removeDuplicates();             // ["a", "b"]
```

### `unique`

Alias to `removeDuplicates`

```
comb([1, 2, 2, 3, 3, 3, 4, 4, 4]).unique(); // [1, 2, 3, 4]);
comb(["a", "b", "b"]).unique();            // ["a", "b"]);
```

### `rotate`

Rotates an array by `1` or the specified number of places.

```
var arr = comb(["a", "b", "c", "d"]);
arr.rotate();   // ["b", "c", "d", "a"]);
arr.rotate(2);  // ["c", "d", "a", "b"]);
arr.rotate(3);  // ["d", "a", "b", "c"]);
arr.rotate(4);  // ["a", "b", "c", "d"]);
arr.rotate(-1); // ["d", "a", "b", "c"]);
arr.rotate(-2); // ["c", "d", "a", "b"]);
arr.rotate(-3); // ["b", "c", "d", "a"]);
arr.rotate(-4); // ["a", "b", "c", "d"]);

```

### `permutations`

Finds all permutaions of the array.

```
var arr = comb([1, 2, 3]);
arr.permutations();  //[
					  //  [ 1, 2, 3 ],
                     //  [ 1, 3, 2 ],
					  //  [ 2, 3, 1 ],
					  //  [ 2, 1, 3 ],
					  //  [ 3, 1, 2 ],
					  //  [ 3, 2, 1 ]
					  // ]
            					 
arr.permutations(2); //[
					  //  [ 1, 2],
					  //  [ 1, 3],
					  //  [ 2, 3],
					  //  [ 2, 1],
					  //  [ 3, 1],
					  //  [ 3, 2]
					  //]
            					   
arr.permutations(1); //[
					  //  [1],
					  //  [2],
					  //  [3]
					  //]
```

### `transpose`

Transposes a multidimensional array.

```
comb([[1, 2, 3],[4, 5, 6]]).transpose(); //[
										  // [ 1, 4 ],
										  // [ 2, 5 ],
										  // [ 3, 6 ]
										  //]
```

### `valuesAt`

Retrieves the values at the specified locations.

```
var arr = comb(["a", "b", "c", "d"]);
arr.valuesAt(1, 2, 3);    //["b", "c", "d"]);
arr.valuesAt(1, 2, 3, 4); //["b", "c", "d", null]);
arr.valuesAt(0, 3);       //["a", "d"]);
```

### `union`

Returns the union of the value with the passed in arrays.

```
comb(["a", "b", "c"]).union(["b", "c", "d"]);  //["a", "b", "c", "d"]);
comb(["a"]).union(["b"], ["c"], ["d"], ["c"]); //["a", "b", "c", "d"]);
```

### `intersect`

Finds the intersection of arrays.

```
comb([1, 2]).intersect([2, 3], [2, 3, 5]);                   //[2]
comb([1, 2, 3]).intersect([2, 3, 4, 5], [2, 3, 5]);          //[2, 3]
comb([1, 2, 3, 4]).intersect([2, 3, 4, 5], [2, 3, 4, 5]);    //[2, 3, 4]
comb([1, 2, 3, 4, 5]).intersect([1, 2, 3, 4, 5], [1, 2, 3]); //[1, 2, 3]
        
```

### `powerSet`

Finds the powerset of an array.

```
comb([1, 2]).powerSet()); //[
						   //  [],
						   //  [ 1 ],
						   //  [ 2 ],
						   //  [ 1, 2 ]
						   //]
```								       

### `cartesian`

Finds the cartesian product of arrays.

```
comb([1, 2]).cartesian([2, 3]); //[
						         // [1, 2],
						         // [1, 3],
						         // [2, 2],
						         // [2, 3]
						         //]
```

### `compact`

Compacts an array removing `undefined` or `null`.

```
comb([1, null, undefined, x, 2]).compact(); //[1, 2]
```

### `multiply`

Duplicates the elements in an array the specified number of times.

```
comb([1, 2, 3]).multiply(2); //[1, 2, 3, 1, 2, 3]
```

### `flatten`

Flattens arrays.

```
comb([1, 2]).flatten([2, 3], [3, 4]);     //[1, 2, 2, 3, 3, 4]
comb([[1], [2], [3]]).flatten();          //[1, 2, 3]
comb([[1, 2],2]).flatten([2, 3], [3, 4]); //[[1, 2],2,2,3,3,4]

```

### `pluck`

Plucks values from each item in the array.

```
var arr = comb([                                                                          
	{name:{first:"Fred", last:"Jones"}, age:50, roles:["a", "b", "c"]},   
	{name:{first:"Bob", last:"Yukon"}, age:40, roles:["b", "c"]},         
	{name:{first:"Alice", last:"Palace"}, age:35, roles:["c"]},           
	{name:{first:"Johnny", last:"P."}, age:56, roles:[]}                  
]);                                                                         

arr.pluck("name.first"); //["Fred", "Bob", "Alice", "Johnny"] 
arr.pluck("age"); //[50, 40, 35, 56]                          
arr.pluck("roles.length"); //[3, 2, 1, 0]                     
arr.pluck("roles.0"); //["a", "b", "c", undefined]            
```

### `invoke`

Invokes the specified method on each item in the array.

```
function person(name, age){                                                                  
    return {                                                                                 
        getName : function(){                                                                
            return name;                                                                     
        },                                                                                   
        setName : function(newName){                                                         
            name = newName;                                                                  
        },                                                                                   
                                                                                             
        getOlder : function(){                                                               
            age++;                                                                           
            return this;                                                                     
        },                                                                                   
                                                                                             
        getAge : function(){                                                                 
            return age;                                                                      
        }                                                                                    
    };                                                                                       
}                                                                                            
                                                                                             
var arr = comb([person("Bob", 40), person("Alice", 35), person("Fred", 50), person("Johnny", 56)]);
                                                                                             
arr.invoke("getName"); //["Bob", "Alice", "Fred", "Johnny"]                                                                                                      
arr.invoke("getOlder").invoke("getAge"); //[41, 36, 51, 57];                                                                                                     
```
<a name="strings"></a>
## Strings

### `style`

Styles a string. See [comb.string.style](./comb_string.html#.style) for style types. 
```
//prints a red string
comb("string").style("red"))
//prints a bold green string
comb("string").style(["green", "bold"])

```

### `multiply`

Repeats the string the specified number of times.

```
comb("HELLO ").multitply(5)); ///"HELLO HELLO HELLO HELLO HELLO"
```

### `toArray`

```
comb("a|b|c|d").toArray("|"); //["a","b","c","d"]
comb("a").toArray("|");       //["a"]
comb("").toArray("|");        //[]
```

### `format`

Formats a string. See [comb.string.format](./comb_string.html#.format) for formatting flags.

```

comb("%s, %s").format(["Hello", "World"]); //"Hello, World"

comb("%[ 10]s, %[- 10]s").format(["Hello", "World"]); //"     Hello, World     ";

comb("%-!10s, %#10s, %10s and %-10s").format("apple", "orange", "bananas", "watermelons"));
     //"apple!!!!!, ####orange,    bananas and watermelon"
     
comb("%+d, %+d, %10d, %-10d, %-+#10d, %10d").format(1,-2, 1, 2, 3, 100000000000);
     //"+1, -2, 0000000001, 2000000000, +3########, 1000000000"
     
comb("%[h:mm a]D").format([date])); //7:32 PM - local -

comb("%[h:mm a]Z").format([date])); //12:32 PM - UTC

//When using object formats they must be in an array otherwise
//format will try to interpolate the properties into the string.
comb("%j").format([{a : "b"}]); //'{"a":"b"}'

comb("%1j, %4j").format([{a : "b"}, {a : "b"}]); //'{\n "a": "b"\n},\n{\n    "a": "b"\n}'

comb("{hello}, {world}").format({hello : "Hello", world : "World"); //"Hello, World";

comb("{[-s10]apple}, {[%#10]orange}, {[10]banana} and {[-10]watermelons}").format({
	apple : "apple",
	orange : "orange",
	banana : "bananas",
	watermelons : "watermelons"
}); //applesssss, ####orange,    bananas and watermelon
```

### `truncate`

Truncates a string.

```
//from the beginning
comb("abcdefg").truncate(3);      //"abc";
//from the end
comb("abcdefg").truncate(3,true); // "efg"
//omit the length
comb("abcdefg").truncate();       //"abcdefg"
```

### `pad`

Pads a string with.

```
var str = comb("STR");
str.pad(5); //"  STR"
str.pad(5, " ", true); //"STR  "
str.pad(5, "$", true); //"$$STR"
```

### `camelize`

Camelize an underscored string.

```
comb('hello_world').camelize(); // "helloWorld"
comb('column_name').camelize(); // "columnName"
comb('columnName').camelize();  // "columnName"
``` 

### `underscore`

Underscore a camelcased string.

```
comb('helloWorld').underscore(); // "hello_world"
comb('column_name').underscore(); // "column_name"
comb('columnName').underscore();  // "column_name"
``` 

### `classify`

Singularizes and camelizes the string. Also strips out all characters preceding and including a period (".").

```
comb('egg_and_hams').classify(); //"eggAndHam"
comb('post').classify();         //"post"
comb('schema.post').classify();  //"post"
```

### `pluralize`

Returns the plural form of the string.

```
comb("post").pluralize();    	       //"posts"
comb("octopus").pluralize();          //"octopi"
comb("sheep").pluralize();            //"sheep"
comb("word").pluralize(); 			   //"words"
comb("the blue mailman").pluralize(); //"the blue mailmen"
comb("CamelOctopus").pluralize();     //"CamelOctopi"
```

### `singularize`

The reverse of `pluralize` returns the singluar version of a string.

```
comb("posts").singularize()"); 			  //"post"
comb("octopi").singularize());           //"octopus"
comb("sheep").singularize());            //"sheep"
comb("words").singularize());            //"word"
comb("the blue mailmen").singularize()); //"the blue mailman"
comb("CamelOctopi").singularize());      //"CamelOctopus"
```

### `applyFirst`

Creates a function that will invoke the method with the strings name on the first argument passed in.

```                                                                                
var arr = [], push = comb("push").applyFirst(), length = comb("length").applyFirst(); 
push(arr, 1, 2,3,4);                                                              
length(arr); //4                                                     
console.log(arr); //1,2,3,4                                                                                                                                          
```
                                                                                
### `bindFirst`
Alias to apply first.

```                                                                                
var arr = [], push = comb("push").bindFirst(), length = comb("length").bindFirst(); 
push(arr, 1, 2,3,4);                                                              
length(arr); //4                                                     
console.log(arr); //1,2,3,4                                                       
                                                                                   
```

### `partial`

Creates a function that curries arguments but does not change the scope.

```
var func = comb("test2").partial("hello");
var scope = {
	test2:function (arg) {
		arg); //"hello"
		return true;
	}
};
func.call(scope); //true
```

### `parseDate`

Parses a date string. See [comb.date.parse](./comb_date.html#.parse) for formatting options.

```
var aug_11_2006 = new Date(2006, 7, 11, 0);
comb("08/11/06").parseDate("MM/dd/yy");     	               //aug_11_2006
comb("11Aug2006")parse('ddMMMyyyy'); 			               //aug_11_2006
comb("Aug2006").parse('MMMyyyy'); 				               //new Date(2006, 7, 1)
comb("Aug 11, 2006").date.parse("MMM dd, yyyy");              //aug_11_2006
comb("August 11, 2006").date.parse("MMMM dd, yyyy");          //aug_11_2006
comb("Friday, August 11, 2006").parse("EEEE, MMMM dd, yyyy"); //aug_11_2006
```

### `escape`

Escapes a string.

```
comb(".$?*|{}()[]\/+^").escape() + ""); //^"
```

### `pluck`

Inverted form of `comb.array.pluck`. 

```
var arr = [                                                                          
	{name:{first:"Fred", last:"Jones"}, age:50, roles:["a", "b", "c"]},   
	{name:{first:"Bob", last:"Yukon"}, age:40, roles:["b", "c"]},         
	{name:{first:"Alice", last:"Palace"}, age:35, roles:["c"]},           
	{name:{first:"Johnny", last:"P."}, age:56, roles:[]}                  
];                                                                         

comb("name.first").pluck(arr); //["Fred", "Bob", "Alice", "Johnny"] 
comb("age").pluck(arr); //[50, 40, 35, 56]                          
comb("roles.length").pluck(arr); //[3, 2, 1, 0]                     
comb("roles.0").pluck(arr); //["a", "b", "c", undefined] 
```

### `invoke`

Inverted of `comb.array.invoke`.

```
function person(name, age){                                                                  
    return {                                                                                 
        getName : function(){                                                                
            return name;                                                                     
        },                                                                                   
        setName : function(newName){                                                         
            name = newName;                                                                  
        },                                                                                   
                                                                                             
        getOlder : function(){                                                               
            age++;                                                                           
            return this;                                                                     
        },                                                                                   
                                                                                             
        getAge : function(){                                                                 
            return age;                                                                      
        }                                                                                    
    };                                                                                       
}                                                                                            
                                                                                             
var arr = [person("Bob", 40), person("Alice", 35), person("Fred", 50), person("Johnny", 56)];
                                                                                             
comb("getName").invoke(arr); //["Bob", "Alice", "Fred", "Johnny"]                                                                                                      
comb("getOlder").invoke(arr).invoke("getAge"); //[41, 36, 51, 57];
```

### `hitch`

Hitches a named method on an object.

```
var obj = {
	str : "hello",
	test : function(){
		return this.str;
	},
	curried : function(){
		return [this.str].concat(comb(arguments).toArray());
	}
};

var test = comb("test").hitch(obj);
var curried = comb("curried").hitch(obj, "world");
test(); // "hello"
curried("!"); //["hello", "world", "!"]
```

### `bind`

Binds a named method on an object.

```
var obj = {
	str : "hello",
	test : function(){
		return this.str;
	},
	curried : function(){
		return [this.str].concat(comb(arguments).toArray());
	}
};

var test = comb("test").bind(obj);
var curried = comb("curried").bind(obj, "world");
test(); // "hello"
curried("!"); //["hello", "world", "!"]

```

### `hitchIgnore`

Hitches a named method on an object ignoring passed in arguments.

```
var obj = {
	str : "hello",
	curried : function(){
		return [this.str].concat(comb(arguments).toArray());
	}
};

var curried = comb("curried").hitchIgnore(obj, "world");
curried("!"); //["hello", "world"]
```

### `bindIgnore`

Binds a named method on an object ignoring passed in arguments.

```
var obj = {
	str : "hello",
	curried : function(){
		return [this.str].concat(comb(arguments).toArray());
	}
};

var curried = comb("curried").bindIgnore(obj, "world");
curried("!"); //["hello", "world"]
```

### `curry`

Curries arguments the specified number of times in the specified scope.

```
var scope = {
                test:true,
                curried:function (a, b, c, d) {
				    return [this.test, a, b, c, d];
                }
            };
            
var curriedFunc = comb("curried").curry(4, scope);

curriedFunc("a")("b")("c")("d"); //[true, "a", "b", "c", "d"]
```

<a name="dates"></a>
## Dates

### `add`

Add the specified interval the specified number of times. See [comb.date.add](./comb_date.html#.add) for more arugment types.

```

var dt = comb(new Date(2009, 1, 1, 1, 1, 1, 111)),
    dateFormat = comb("format").applyFirst("yyyy-MM-dd HH:mm:ss.SSS");
dateFormat(dt.add("years", 2));        //2011-02-01 01:01:01.111
dateFormat(dt.add("months", 2));       //2009-04-01 01:01:01.111
dateFormat(dt.add("days", 2));         //2009-02-03 01:01:01.111
dateFormat(dt.add("hours", 2));        //2009-02-01 03:01:01.111
dateFormat(dt.add("minutes", 2));      //2009-02-01 01:03:01.111
dateFormat(dt.add("seconds", 2));      //2009-02-01 01:01:03.111
dateFormat(dt.add("milliseconds", 2)); //2009-02-01 01:01:01.113

```

### `compare`

compares this date to another.

```

var d1 = new Date();
d1.setHours(0);
comb(d1).compare(d1); //0

var d2 = new Date();
d2.setFullYear(2005);
d2.setHours(12);
comb(d1).compare(d2, "date") //1
comb(d1).compare(d2, "datetime") //1

comb(d2).compare(d1, "date") //-1
comb(d2).compare(d1, "datetime") //-1

```

### `difference`

Finds the difference between two dates. See [comb.date.difference](./comb_date.html#.difference).

```

comb(new Date(2005, 11, 27)).difference(new Date(2006, 11, 27), "year"); //1

```

### `format`

Formats a date with the specified formatting flags. See [comb.date.format](./comb_date.html#.format). 

```
var date = comb(new Date(2009, 1, 1, 1, 1, 1, 111))
date.format("yyyy-MM-dd HH:mm:ss.SSS"); //2011-02-01 01:01:01.111
date.format("yyyy-MM-dd"); //2011-02-01
date.format("HH:mm:ss.SSS"); //01:01:01.111
```

### `getDaysInMonth`

Returns the days in the dates month.

```
comb(new Date(2006, 1, 1)).getDaysInMonth() //28
comb(new Date(2004, 1, 1)).getDaysInMonth() //29
comb(new Date(2000, 1, 1)).getDaysInMonth() //29
comb(new Date(1900, 1, 1)).getDaysInMonth() //28
comb(new Date(1800, 1, 1)).getDaysInMonth() //28
comb(new Date(1700, 1, 1)).getDaysInMonth() //28
comb(new Date(1600, 1, 1)).getDaysInMonth() //29
```

### `getTimezoneName`
Returns the name of the timezone for the date.

### `isLeapYear`

Returns a boolean indicating if the year is leap year.

```
comb(new Date(1600, 0, 1)).isLeapYear(); //true
comb(new Date(2004, 0, 1)).isLeapYear(); //true
comb(new Date(2000, 0, 1)).isLeapYear(); //true
comb(new Date(2006, 0, 1)).isLeapYear(); //false
comb(new Date(1900, 0, 1)).isLeapYear(); //false
comb(new Date(1800, 0, 1)).isLeapYear(); //false
comb(new Date(1700, 0, 1)).isLeapYear(); //false
```

### `isWeekend`

Returns if the date falls on a weekend.

```
var thursday = comb(new Date(2006, 8, 21));
var saturday = comb(new Date(2006, 8, 23));
var sunday = comb(new Date(2006, 8, 24));
var monday = comb(new Date(2006, 8, 25));
thursday.isWeekend(); //false
saturday.isWeekend(); //true
sunday.isWeekend(); //true
monday.isWeekend(); //false
```

<a name="functions"></a>
## Functions

### `hitch`

Hitches a function to the specified scope, currying any extra arguments.

```
var add = comb(function(arg1, arg2){
	return arg1 + arg2 * this.multiplier;
}).hitch({multiplier : 2}, 2);

add(10); //24
add(11); //26
add(12); //28
```

### `bind`

Hitches a function to the specified scope, currying any extra arguments.

```
var add = comb(function(arg1, arg2){
	return arg1 + arg2 * this.multiplier;
}).bind({multiplier : 2}, 2);

add(10); //24
add(11); //26
add(12); //28
```

### `hitchIgnore`

Hitches a function to the specified scope, ignoring any extra arguments.

```
var add = comb(function(arg1, arg2){
    //arg two will always be undefined.
	return arg1 + (arg2 || 0) * this.multiplier;
}).hitchIgnore({multiplier : 2}, 2);

add(10); //4
add(11); //4
add(12); //4
```

### `bindIgnore`

Hitches a function to the specified scope, ignoring any extra arguments.

```
var add = comb(function(arg1, arg2){
    //arg two will always be undefined.
	return arg1 + (arg2 || 0) * this.multiplier;
}).bindIgnore({multiplier : 2}, 2);

add(10); //4
add(11); //4
add(12); //4
```

### `partial`

Returns a function that does not change execution scope but curries arguments.

```
var arr = [];
Object.defineProperty(arr, "pushTwo", {
    value : comb(function(arg1){
        this.push(comb(arguments).toArray());
    }).partial(2),
    enumerable : false
});

arr.pushTwo(1);
arr.pushTwo(3);
console.log(arr); //[[2,1], [2,3]]
```

### `applyFirst`

Creates a function that runs in the scope of the first arugment, and applies the rest.

```
var arr = [];

var pushTwo = comb(function(val){
    this.push(comb(arguments).toArray());
}).applyFirst(2); 

pushTwo(arr, 1);
pushTwo(arr, 2);
pushTwo(arr, 3);
console.log(arr); //[ [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]

```

### `bindFirst`

Same as apply first.

```
var arr = [];

var pushTwo = comb(function(val){
    this.push(comb(arguments).toArray());
}).bindFirst(2); 

pushTwo(arr, 1);
pushTwo(arr, 2);
pushTwo(arr, 3);
console.log(arr); //[ [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
```

### `curry`

Curries a function the specified number of times.

```
var func = comb(function (a, b, c, d) {
    return [this.test, a,b,c,d];
});
var curried = func.curry(4, {test:true});
console.log(curried("a")("b")("c")("d"));
```

### `extend`

Extends the prototype of a function.

```
var MyObj2 = comb(function (str) {
	this.str = str || "hello";
});

MyObj2.extend({
	getStr:function () {
		return this.str;
	}
});

var m2 = new MyObj2();
console.log(m2.getStr()); //"hello"
m2.str = "world";
console.log(m2.getStr()); //"world"
```
<a name="numbers"></a>

## Number

### `round`
Rounds a number. See [comb.number.round](./comb_number.html#.round)

```
comb(10.000009).round(2).print();  //10
comb(10.000009).round(5).print();  //10.00001
comb(10.0009).round(3).print();    //10.001
comb(10.0009).round(2).print();    //10
comb(10.0009).round(3).print();    //10.001
comb(10.0009).round(2, 1).print(); //11
```

### `roundCeil`

Rounds a number up. See [comb.number.roundCeil](./comb_number.html#.roundCeil)

```
comb(10.000004).roundCeil(2).print();  //10.01
comb(10.000004).roundCeil(5).print();  //10.00001
comb(10.0004).roundCeil(3).print();    //10.001
comb(10.0004).roundCeil(2).print();    //10
comb(10.0004).roundCeil(3).print();    //10.001
comb(10.0004).roundCeil(2).print();    //10.01

```

<a name="objects"></a>
## Objects

### `hitch`

Hitches a function to run in the scope of this object.

```
var scope = comb({test : "test"});

var func = scope.hitch(function(){
	return this.test;
});

func(); //"test";

```

### `hitchIgnore`

Hitches a function to run in the scope of this object, ignoring extra arguments.

```
var scope = comb({test : "test"});

var func = scope.hitchIgnore(function(){
	return [this.test].concat(comb(arguments).toArray());
});

func("hello"); //["test"];

```

### `bind`

Binds a function to run in the scope of this object.

```
var scope = comb({test : "test"});

var func = scope.bind(function(){
	return this.test;
});

func(); //"test";

```

### `bindIgnore`

Binds a function to run in the scope of this object, ignoring extra arguments.

```
var scope = comb({test : "test"});

var func = scope.bindIgnore(function(){
	return [this.test].concat(comb(arguments).toArray());
});

func("hello"); //["test"];

```

### `merge`

Merges another object into this object.

```
var obj = comb({a : "b"});
console.log(obj.merge({b : "c"})); //{a : "b", b : "c"}
console.log(obj.merge({a : "d"})); //{a : "d", b : "c"}
```

### `extend`

Merges another object into this object.

```
var obj = comb({a : "b"});
console.log(obj.extend({b : "c"})); //{a : "b", b : "c"}
console.log(obj.extend({a : "d"})); //{a : "d", b : "c"}
```

### `deepMerge`

Deeply merges another object into this object, meaning that merges in nested objects.


```
var obj = comb({test:true, a:{b:4}}), format = comb("%4j");

format.format([obj.deepMerge({test2:false, a:{c:3}})]).print();
/*
 * {
 *   "test": true,
 *   "a": {
 *       "b": 4,
 *       "c": 3
 *   },
 *   "test2": false
 * }
 */


format.format([obj.deepMerge({test3:"hello", test4:"world", a:{d:{e:2}}})]).print();
/*
 * {
 *   "test": true,
 *   "a": {
 *       "b": 4,
 *       "c": 3,
 *       "d": {
 *           "e": 2
 *       }
 *   },
 *   "test2": false,
 *   "test3": "hello",
 *   "test4": "world"
 * }
 */ 

format.format([obj.merge({a:{d:{f:{g:1}}}})]).print();
/*
 * {
 *   "test": true,
 *   "a": {
 *       "d": {
 *           "f": {
 *               "g": 1
 *           }
 *       }
 *   },
 *   "test2": false,
 *   "test3": "hello",
 *   "test4": "world"
 * }
 */
```

### `forEach`

Iterate through each key/value pair in an object.

```
var obj = {a : "b", c : "d", e : "f"};   
comb(obj).forEach(function(value, key){  
    console.log(value, key);             
});                                      
                           
```

### `filter`

Filters out key/value pairs in an object. Filters out key/value pairs that return a falsey value from the iterator.
                                                                                                                   
```                                                                                                                
var obj = {a : "b", c : "d", e : "f"};                                                                             
comb(obj).filter(function(value, key){                                                                             
    return value == "b" || key === "e";                                                                            
}); //{a : "b", e : "f"};                                                                                                                                                                                   
                                                                                                                   
```                                                                                                                

### `invert`

 Returns a new hash that is the invert of the hash.   
                                                      
 ```                                                  
 var obj = {a : "b", c : "d", e : "f"};               
 comb(obj).invert(); //{b : "a", d : "c", f : "e"}                                                         
 ```                                                  

### `values`

Returns the values of a hash.             
                                          
```                                       
var obj = {a : "b", c : "d", e : "f"};    
comb(obj).values(); //["b", "d", "f"]                                                                                          
```

### `pick`

Pick certain key/value pairs from a hash

```
var ob = {a: "a", b: "b", c: "c"};
comb(obj).pick(["a", "b"]); //{a: "a", b:'b'}
comb(obj).pick("c"); //{c: "c"};
```

### `omit`

Omit certain key/value pairs from a hash

```
var ob = {a: "a", b: "b", c: "c"};
comb(obj).omit(["a", "b"]); //{c: "c"}
comb(obj).omit("c"); //{a: "a", b: "b"};
```

### `toArray`

Converts a hash to an array.                                    
                                                                
```                                                             
var obj = {a : "b", c : "d", e : "f"};                          
comb(obj).toArray(); //[["a", "b"], ["c", "d"], ["e", "f"]]     
```

<a name="arguments"></a>
## Arguments

### `toArray`
 
Converts an arugments object to an array.

```
function getArgs(){
	return comb(arguments).toArray();
}

function getArgsSlice(slice){
	return comb(arguments).toArray(slice);
}


getArgs(1,2,3); [1,2,3]
getArgsSlice(1,2,3); [2,3]
getArgsSlice(2,2,3); [3]

```



