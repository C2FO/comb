# Common Utilities

`comb` includes a lot of function that are used commonly when developing application. Here we'll go over a few of the most commonly used ones.

## is* functions

`comb` includes a number of `is` function to test if something is of the type.

* [isDefined](./comb.html#.isDefined) : test if the arguments is defined.
* [isUndefined](./comb.html#.isUndefined)
* [isNull](./comb.html#.isNull)
* [isUndefinedOrNull](./comb.html#.isUndefinedOrNull)
* [isArguments](./comb.html#.isArguments)
* [isObject](./comb.html#.isObject)
* [isHash](./comb.html#.isHash)
* [isBoolean](./comb.html#.isBoolean)
* [isDate](./comb.html#.isDate)
* [isEmpty](./comb.html#.isEmpty)
* [isFunction](./comb.html#.isFunction)
* [isInstanceOf](./comb.html#.isInstanceOf)
* [isNumber](./comb.html#.isNumber)
* [isPromiseLike](./comb.html#.isPromiseLike)
* [isRegExp](./comb.html#.isRegExp)
* [isString](./comb.html#.isString)

## [String utilities](./comb_string.html)

### [format](./comb_string.html#.format)

Formats a string with the specified format.                                  
                                                                               
```                                                                     
// "Hello, World";                                                                                                     
comb.string.format("%s, %s", ["Hello", "World"]);

//"     Hello, World     "
comb.string.format("%[ 10]s, %[- 10]s", ["Hello", "World"])                               
 
//"apple!!!!!, ####orange,    bananas and watermelon"
comb.string.format("%-!10s, %#10s, %10s and %-10s", "apple", "orange", "bananas", "watermelons")                 

//"+1, -2, 0000000001, 2000000000, +3########, 1000000000"             
comb.string.format("%+d, %+d, %10d, %-10d, %-+#10d, %10d", 1,-2, 1, 2, 3, 100000000000)                                         
 
//formats in local time
//7:32 PM 
comb.string.format("%[h:mm a]D", [date])

//format in UTC
//12:32 PM
comb.string.format("%[h:mm a]Z", [date])
 
//When using object formats they must be in an array otherwise                
//format will try to interpolate the properties into the string.              
 
//'{"a":"b"}'
comb.string.format("%j", [{a : "b"}])                                                     
 
//'{\n "a": "b"\n},\n{\n    "a": "b"\n}'                                                            
comb.string.format("%1j, %4j", [{a : "b"}, {a : "b"}])    

//"Hello, World"                                                                 
comb.string.format("{hello}, {world}", {hello : "Hello", world : "World")                 


//applesssss, ####orange,    bananas and watermelon      
comb.string.format("{[-s10]apple}, {[%#10]orange}, {[10]banana} and {[-10]watermelons}", {
    apple:"apple",
    orange:"orange",
    banana:"bananas",
    watermelons:"watermelons"
});                                                                     
```   

* String Formats `%[options]s`
  * `-` : left justified
  * Char : padding character **Excludes d,j,s**
  * Number : width
* Number Formats `%[options]d`
  * `-` : left justified
  * `+` : signed number
  * Char : padding character **Excludes d,j,s**
  * Number : width
* Object Formats `%[options]j`
  * Number : spacing for object properties.
* Date Options `%[format]D` or `%[format]Z`. See [comb.date.format](./comb_date.html#.format) for formatting options.   
                                                                  

### [style](./comb_string.html#.style)

Styles a string for terminal output.

```
//style a string red                      
comb.string.style('myStr', 'red');        
//style a string red and bold             
comb.string.style('myStr', ['red', bold]);
```

The style options include

* bold
* bright
* italic
* underline
* inverse
* crossedOut
* blink 
* red
* green
* yellow
* blue
* magenta
* cyan
* white
* redBackground
* greenBackground
* yellowBackground
* blueBackground
* magentaBackground
* cyanBackground
* whiteBackground
* grey
* black

### Others
* [pad](./comb_string.html#.pad)
* [toArray](./comb_string.html#.pad)
* [truncate](./comb_string.html#.pad)
* [multiply](./comb_string.html#.pad)

                                                                                           
## [Array utilities](./comb_array.html)

### [avg](./comb_array.html#.avg)

Averages an array of numbers.

```
comb.array.avg([1,2,3]); //2
```

### [compact](./comb_array.html#.compact)

Compacts an array removing `null` or `undefined` objects from the array.

```
var x;
comb.array.compact([1,null,null,x,2]) => [1,2]
comb.array.compact([1,2]) => [1,2]
```

### [difference](./comb_array.html#.difference)

Finds the difference of the two arrays.

```
comb.array.difference([1,2,3], [2,3]); //[1]
comb.array.difference(["a","b",3], [3]); //["a","b"]
```

### [flatten](./comb_array.html#.flatten)

Flatten multiple arrays into a single array

```
comb.array.flatten([1,2], [2,3], [3,4]) => [1,2,2,3,3,4]
comb.array.flatten([1,"A"], [2,"B"], [3,"C"]) => [1,"A",2,"B",3,"C"]
```

### [intersect](./comb_array.html#.compact)

Finds the intersection of arrays.

```
comb.array.intersect([1,2], [2,3], [2,3,5]) => [2]
comb.array.intersect([1,2,3], [2,3,4,5], [2,3,5]) => [2,3]
comb.array.intersect([1,2,3,4], [2,3,4,5], [2,3,4,5]) => [2,3,4]
comb.array.intersect([1,2,3,4,5], [1,2,3,4,5], [1,2,3]) => [1,2,3]
comb.array.intersect([[1,2,3,4,5],[1,2,3,4,5],[1,2,3]]) => [1,2,3]
```

### [max](./comb_array.html#.compact)

Finds that max value of an array. If a second argument is provided and it is a function it will be used as a comparator function. If the second argument is a string then it will be used as a property look up on each item.

```
comb.array.max([{a : 1}, {a : 2}, {a : -2}], "a"); //{a : 2}
comb.array.max([{a : 1}, {a : 2}, {a : -2}], function(a,b){
     return a.a - b.a
}); //{a : 2}

```

### [min](./comb_array.html#.compact)

Finds that min value of an array. If a second argument is provided and it is a function it will be used as a comparator function. If the second argument is a string then it will be used as a property look up on each item.

```
comb.array.min([{a : 1}, {a : 2}, {a : -2}], "a"); //{a : -2}
comb.array.min([{a : 1}, {a : 2}, {a : -2}], function(a,b){
     return a.a - b.a
}); //{a : -2}
```

### [sort](./comb_array.html#.compact)


Allows the sorting of an array based on a property name instead. This can also act as a sort that does not change the original array. **NOTE: this does not change the original array!**

```
comb.array.sort([{a : 1}, {a : 2}, {a : -2}], "a"); //[{a : -2}, {a : 1}, {a : 2}];
```
        

### [removeDuplicates](./comb_array.html#.removeDuplicates)

Removes duplicates from an array.

```
comb.array.removeDuplicates([1,1,1]) => [1]
comb.array.removeDuplicates([1,2,3,2]) => [1,2,3]
```

### [sum](./comb_array.html#.sum)

Finds the sum of an array

```
comb.array.sum([1,2,3]) => 6
```

### [toArray](./comb_array.html#.toArray)

Converts anything to an array. Useful if you want to covert a hash into an array.

```
comb.array.toArray({a : "b", b : "c"}) => [["a","b"], ["b","c"]];
comb.array.toArray("a") => ["a"]
comb.array.toArray(["a"]) =>  ["a"];
comb.array.toArray() => [];
comb.array.toArray("a", {a : "b"}) => ["a", ["a", "b"]];
```
### [union](./comb_array.html#.union)

Finds the union of two arrays

```
comb.array.union(['a','b','c'], ['b','c', 'd']) => ["a", "b", "c", "d"]
comb.array.union(["a"], ["b"], ["c"], ["d"], ["c"]) => ["a", "b", "c", "d"]
```

### [zip](./comb_array.html#.zip)

Zips multiple arrays into a single array.

```
var a = [ 4, 5, 6 ], b = [ 7, 8, 9 ]

comb.array.zip([1], [2], [3]) => [[ 1, 2, 3 ]]);
comb.array.zip([1,2], [2], [3]) => [[ 1, 2, 3 ],[2, null, null]]
comb.array.zip([1,2,3], a, b) => [[1, 4, 7],[2, 5, 8],[3, 6, 9]]
comb.array.zip([1,2], a, b) => [[1, 4, 7],[2, 5, 8]]
comb.array.zip(a, [1,2], [8]) => [[4,1,8],[5,2,null],[6,null,null]]
```




## [Number utilities](./comb_number.html)

### [round](./comb_number.html#.round)
Rounds a number to the specified places.

```
comb.number.round(10.000009, 2); //10
comb.number.round(10.000009, 5); //10.00001
comb.number.round(10.0009, 3); //10.001
comb.number.round(10.0009, 2); //10
comb.number.round(10.0009, 3); //10.001
```
### [roundCeil](./comb_number.html#.roundCel)

Rounds a number to the specified places, rounding up.

```
comb.number.roundCeil(10.000001, 2); //10.01
comb.number.roundCeil(10.000002, 5); //10.00001
comb.number.roundCeil(10.0003, 3); //10.001
comb.number.roundCeil(10.0004, 2); //10.01
comb.number.roundCeil(10.0005, 3); //10.001
comb.number.roundCeil(10.0002, 2); //10.01
```

## [Date utilities](./comb_date.html)

### [add](./comb_date.html#.add)

Adds a specified interval and amount to a date

```
var dtA = new Date(2005, 11, 27);
comb.date.add(dtA, "year", 1); //new Date(2006, 11, 27);
comb.date.add(dtA, "years", 1) //new Date(2006, 11, 27);

dtA = new Date(2000, 0, 1);
comb.date.add(dtA, "quarter", 1); //new Date(2000, 3, 1);
comb.date.add(dtA, "quarters", 1); //new Date(2000, 3, 1);
 
dtA = new Date(2000, 0, 1);
comb.date.add(dtA, "month", 1); //new Date(2000, 1, 1);
comb.date.add(dtA, "months", 1); //new Date(2000, 1, 1);
 
dtA = new Date(2000, 0, 31);
comb.date.add(dtA, "month", 1); //new Date(2000, 1, 29);
comb.date.add(dtA, "months", 1); //new Date(2000, 1, 29);
 
dtA = new Date(2000, 0, 1);
comb.date.add(dtA, "week", 1); //new Date(2000, 0, 8);
comb.date.add(dtA, "weeks", 1); //new Date(2000, 0, 8);
 
dtA = new Date(2000, 0, 1);
comb.date.add(dtA, "day", 1); //new Date(2000, 0, 2);

dtA = new Date(2000, 0, 1);
comb.date.add(dtA, "weekday", 1); //new Date(2000, 0, 3);
 
dtA = new Date(2000, 0, 1, 11);
comb.date.add(dtA, "hour", 1); //new Date(2000, 0, 1, 12);
 
dtA = new Date(2000, 11, 31, 23, 59);
comb.date.add(dtA, "minute", 1); //new Date(2001, 0, 1, 0, 0);
 
dtA = new Date(2000, 11, 31, 23, 59, 59);
comb.date.add(dtA, "second", 1); //new Date(2001, 0, 1, 0, 0, 0);
 
dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
comb.date.add(dtA, "millisecond", 1); //new Date(2001, 0, 1, 0, 0, 0, 0);
 ```
 
###[compare](./comb_date.html#.compare) 

Compares two dates

```
var d1 = new Date();
d1.setHours(0);
comb.date.compare(d1, d1); //0
 
var d1 = new Date();
d1.setHours(0);
var d2 = new Date();
d2.setFullYear(2005);
d2.setHours(12);
comb.date.compare(d1, d2, "date"); //1
comb.date.compare(d1, d2, "datetime"); //1
 
var d1 = new Date();
d1.setHours(0);
var d2 = new Date();
d2.setFullYear(2005);
d2.setHours(12);
comb.date.compare(d2, d1, "date"); //-1
comb.date.compare(d1, d2, "time"); //-1
```

###[difference](.comb_date.html#.difference)

Finds the difference between two dates based on the specified interval

```
var dtA, dtB;
 
dtA = new Date(2005, 11, 27);
dtB = new Date(2006, 11, 27);
comb.date.difference(dtA, dtB, "year") => 1
 
dtA = new Date(2000, 1, 29);
dtB = new Date(2001, 2, 1);
comb.date.difference(dtA, dtB, "quarter") => 4
comb.date.difference(dtA, dtB, "month") => 13
 
dtA = new Date(2000, 1, 1);
dtB = new Date(2000, 1, 8);
comb.date.difference(dtA, dtB, "week") => 1
 
dtA = new Date(2000, 1, 29);
dtB = new Date(2000, 2, 1);
comb.date.difference(dtA, dtB, "day") => 1
 
dtA = new Date(2006, 7, 3);
dtB = new Date(2006, 7, 11);
comb.date.difference(dtA, dtB, "weekday") => 6
 
dtA = new Date(2000, 11, 31, 23);
dtB = new Date(2001, 0, 1, 0);
comb.date.difference(dtA, dtB, "hour") => 1
 
dtA = new Date(2000, 11, 31, 23, 59);
dtB = new Date(2001, 0, 1, 0, 0);
comb.date.difference(dtA, dtB, "minute") => 1
 
dtA = new Date(2000, 11, 31, 23, 59, 59);
dtB = new Date(2001, 0, 1, 0, 0, 0);
comb.date.difference(dtA, dtB, "second") => 1
 
dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
comb.date.difference(dtA, dtB, "millisecond") => 1
```

###[format](./comb_date.html#.format)

Formats a date to the specidifed format string

```
var date = new Date(2006, 7, 11, 0, 55, 12, 345);

//"Friday, August 11, 2006"
comb.date.format(date, "EEEE, MMMM dd, yyyy"); 

//"8/11/06"
comb.date.format(date, "M/dd/yy"); 

//"6"
comb.date.format(date, "E"); 

//"12:55 AM"
comb.date.format(date, "h:m a"); 

//"12:55:12"
comb.date.format(date, 'h:m:s'); 

//"12:55:12.35"
comb.date.format(date, 'h:m:s.SS'); 

//"24:55:12.35"
comb.date.format(date, 'k:m:s.SS'); 

//"0:55:12.35"
comb.date.format(date, 'H:m:s.SS'); 

//"11082006"
comb.date.format(date, "ddMMyyyy"); 
```

Format specifiers include

* `G` Era designator Text AD
* `y` Year Year 1996; 96
* `M` Month in year Month July; Jul; 07
* `w` Week in year Number 27
* `W` Week in month Number 2
* `D` Day in year Number 189
* `d` Day in month Number 10
* `E` Day in week Text Tuesday; Tue
* `a` Am/pm marker Text PM
* `H` Hour in day (0-23) Number 0
* `k` Hour in day (1-24) Number 24
* `K` Hour in am/pm (0-11) Number 0
* `h` Hour in am/pm (1-12) Number 12
* `m` Minute in hour Number 30
* `s` Second in minute Number 55
* `S` Millisecond Number 978
* `z` Time zone General time zone Pacific Standard Time; PST; GMT-08:00
* `Z` Time zone RFC 822 time zone -0800

###[parse](./comb_date.html#.parse)

Parses a date string into a date object

```
var aug_11_2006 = new Date(2006, 7, 11, 0);
//all of the following will parse to aug_11_2006
 comb.date.parse("08/11/06", "MM/dd/yy");
 comb.date.parse("11Aug2006", 'ddMMMyyyy');
 comb.date.parse("Aug 11, 2006", "MMM dd, yyyy"); //aug_11_2006 
 comb.date.parse("August 11, 2006", "MMMM dd, yyyy"); //aug_11_2006
 comb.date.parse("Friday, August 11, 2006", "EEEE, MMMM dd, yyyy"); //aug_11_2006

``` 
Format specifiers include

* `G` Era designator Text AD
* `y` Year Year 1996; 96
* `M` Month in year Month July; Jul; 07
* `w` Week in year Number 27
* `W` Week in month Number 2
* `D` Day in year Number 189
* `d` Day in month Number 10
* `E` Day in week Text Tuesday; Tue
* `a` Am/pm marker Text PM
* `H` Hour in day (0-23) Number 0
* `k` Hour in day (1-24) Number 24
* `K` Hour in am/pm (0-11) Number 0
* `h` Hour in am/pm (1-12) Number 12
* `m` Minute in hour Number 30
* `s` Second in minute Number 55
* `S` Millisecond Number 978
* `z` Time zone General time zone Pacific Standard Time; PST; GMT-08:00
* `Z` Time zone RFC 822 time zone -0800 

###*ago and *FromNow

`comb` also has the following methods as a convenience to adding time to `Date.now()`

* [comb.secondsFromNow](./comb.html#.daysFromNow)
* [comb.secondsAgo](./comb.html#.daysFromNow)
* [comb.minutesFromNow](./comb.html#.daysFromNow)
* [comb.minutesAgo](./comb.html#.daysFromNow)
* [comb.hoursFromNow](./comb.html#.daysFromNow)
* [comb.hoursAgo](./comb.html#.daysFromNow)
* [comb.daysFromNow](./comb.html#.daysFromNow)
* [comb.daysAgo](./comb.html#.daysFromNow)
* [comb.monthsFromNow](./comb.html#.daysFromNow)
* [comb.monthsAgo](./comb.html#.daysFromNow)
* [comb.yearsFromNow](./comb.html#.daysFromNow)
* [comb.yearsAgo](./comb.html#.daysFromNow)




##[Object utilities](./comb.html)

###[merge](.comb.html#.merge)

Merges objects together. This method will only change the frist object passed in.

```
var myObj = {};
comb.merge(myObj, {test : true});
 
myObj.test; //true
 
comb.merge(myObj, {test : false}, {test2 : false}, {test3 : "hello", test4 : "world"});
myObj.test; //false
myObj.test2; //false
myObj.test3; //"hello"
myObj.test4; //"world"

```

###[deepMerge](.comb.html#.deepMerge)

Merges objects together only overriding properties that are different. 

```
var myObj = {my : {cool : {property1 : 1, property2 : 2}}};
comb.deepMerge(myObj, {my : {cool : {property3 : 3}}});
 
myObj.my.cool.property1; \\1
myObj.my.cool.property2; \\2
myObj.my.cool.property3; \\3
```

###[deepEqual](.comb.html#.deepEqual)

Determines if an two things are deep equal. This is a reimplementation of `assert.deepEqual` so you do not have to use a try/catch.

```
comb.deepEqual({a : 1, b : 2}, {a : 1, b : 2}); \\ true
comb.deepEqual({a : 1}, {a : 1, b : 2}); \\false
```



