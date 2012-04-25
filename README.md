/usr/local/bin/node /Users/doug/git/downdoc/index.js
<a name="top"></a>

Comb
=========

##NOTE: v0.1.1 removed proxy code out of core see [comb-proxy](http://github.com/Pollenware/comb-proxy)

Overview
--------

Framework for node that provides a one stop shop for frequently needed utilities, including:

* OO utilties
* Collections 
* Logging
* String & date formatting
* Flow control
* Date Management

See Usage for more details.

## Installation

    npm install comb


Why?
----

If your like us its fun to find new modules to use but often wish you didn't have to sift through NPM registry or the node modules page to find what you need.

   So....

We created a library of things we use often, or commons utilities that are used by our other APIs.
##Namespaces



  * [comb](#comb)

  * [comb.array](#comb_array)

  * [comb.characters](#comb_characters)

  * [comb.collections](#comb_collections)

  * [comb.date](#comb_date)

  * [comb.logging](#comb_logging)

  * [comb.logging.appenders](#comb_logging_appenders)

  * [comb.number](#comb_number)

  * [comb.plugins](#comb_plugins)

  * [comb.regexp](#comb_regexp)

  * [comb.string](#comb_string)



##Classes



  * [comb.Promise](#comb_Promise)

  * [comb.PromiseList](#comb_PromiseList)

  * [comb.collections.AVLTree](#comb_collections_AVLTree)

  * [comb.collections.AnderssonTree](#comb_collections_AnderssonTree)

  * [comb.collections.BinaryTree](#comb_collections_BinaryTree)

  * [comb.collections.Collection](#comb_collections_Collection)

  * [comb.collections.HashTable](#comb_collections_HashTable)

  * [comb.collections.Heap](#comb_collections_Heap)

  * [comb.collections.Iterable](#comb_collections_Iterable)

  * [comb.collections.MaxHeap](#comb_collections_MaxHeap)

  * [comb.collections.MinHeap](#comb_collections_MinHeap)

  * [comb.collections.Pool](#comb_collections_Pool)

  * [comb.collections.PriorityQueue](#comb_collections_PriorityQueue)

  * [comb.collections.Queue](#comb_collections_Queue)

  * [comb.collections.RedBlackTree](#comb_collections_RedBlackTree)

  * [comb.collections.Stack](#comb_collections_Stack)

  * [comb.collections.Tree](#comb_collections_Tree)

  * [comb.logging.BasicConfigurator](#comb_logging_BasicConfigurator)

  * [comb.logging.Level](#comb_logging_Level)

  * [comb.logging.Logger](#comb_logging_Logger)

  * [comb.logging.PropertyConfigurator](#comb_logging_PropertyConfigurator)

  * [comb.logging.appenders.Appender](#comb_logging_appenders_Appender)

  * [comb.logging.appenders.ConsoleAppender](#comb_logging_appenders_ConsoleAppender)

  * [comb.logging.appenders.FileAppender](#comb_logging_appenders_FileAppender)

  * [comb.logging.appenders.JSONAppender](#comb_logging_appenders_JSONAppender)

  * [comb.logging.appenders.RollingFileAppender](#comb_logging_appenders_RollingFileAppender)

  * [comb.plugins.Broadcaster](#comb_plugins_Broadcaster)

  * [comb.plugins.Middleware](#comb_plugins_Middleware)


<a name="comb"></a>
##comb

[Top](#top)

Utilities for javascript, optimized for the server environment.


  * [argsToArray](#comb_argsToArray)

  * [bind](#comb_bind)

  * [bindIgnore](#comb_bindIgnore)

  * [broadcast](#comb_broadcast)

  * [camelize](#comb_camelize)

  * [classify](#comb_classify)

  * [connect](#comb_connect)

  * [curry](#comb_curry)

  * [daysAgo](#comb_daysAgo)

  * [daysFromNow](#comb_daysFromNow)

  * [deepEqual](#comb_deepEqual)

  * [deepMerge](#comb_deepMerge)

  * [define](#comb_define)

  * [disconnect](#comb_disconnect)

  * [extend](#comb_extend)

  * [hitch](#comb_hitch)

  * [hitchIgnore](#comb_hitchIgnore)

  * [hoursAgo](#comb_hoursAgo)

  * [hoursFromNow](#comb_hoursFromNow)

  * [isArguments](#comb_isArguments)

  * [isBoolean](#comb_isBoolean)

  * [isDate](#comb_isDate)

  * [isDefined](#comb_isDefined)

  * [isEmpty](#comb_isEmpty)

  * [isFunction](#comb_isFunction)

  * [isHash](#comb_isHash)

  * [isInstanceOf](#comb_isInstanceOf)

  * [isNull](#comb_isNull)

  * [isNumber](#comb_isNumber)

  * [isObject](#comb_isObject)

  * [isPromiseLike](#comb_isPromiseLike)

  * [isUndefined](#comb_isUndefined)

  * [isUndefinedOrNull](#comb_isUndefinedOrNull)

  * [listen](#comb_listen)

  * [listenForExit](#comb_listenForExit)

  * [merge](#comb_merge)

  * [minutesAgo](#comb_minutesAgo)

  * [minutesFromNow](#comb_minutesFromNow)

  * [monthsAgo](#comb_monthsAgo)

  * [monthsFromNow](#comb_monthsFromNow)

  * [partial](#comb_partial)

  * [pluralize](#comb_pluralize)

  * [secondsAgo](#comb_secondsAgo)

  * [secondsFromNow](#comb_secondsFromNow)

  * [serial](#comb_serial)

  * [singleton](#comb_singleton)

  * [singularize](#comb_singularize)

  * [unListen](#comb_unListen)

  * [underscore](#comb_underscore)

  * [when](#comb_when)

  * [wrap](#comb_wrap)

  * [yearsAgo](#comb_yearsAgo)

  * [yearsFromNow](#comb_yearsFromNow)


  
<a name="comb_argsToArray"></a>

###*argsToArray*



---
*Defined base/misc.js* [Top](#top)


Converts an arguments object to an array
        
     
*Arguments*

        
 * _args_ `Arguments` : the arguments object to convert
        
     
     
*Returns*

        
 * `Array` array version of the arguments object
        
     

*Source*

```javascript
comb.argsToArray = function (args) {
```

  
<a name="comb_bind"></a>

###*bind*



---
*Defined base/functions.js* [Top](#top)



        
     
*Arguments*

        
 * _scope_ `Object` : the scope to bind the callback to
        
 * _method_ `String|Function` : the method to callback
        
 * _args?_  : optional args to pass to the callback
        
     
     
*Returns*

        
 * `Function` the hitched function
        
     

*Source*

```javascript
comb.hitch
```

  
<a name="comb_bindIgnore"></a>

###*bindIgnore*



---
*Defined base/functions.js* [Top](#top)



        
     
*Arguments*

        
 * _scope_ `Object` : the scope to bind the callback to
        
 * _method_ `String|Function` : the method to callback
        
 * _args?_  : optional args to pass to the callback
        
     
     
*Returns*

        
 * `Function` the hitched function
        
     

*Source*

```javascript
comb.hitchIgnore
```

  
<a name="comb_broadcast"></a>

###*broadcast*



---
*Defined base/broadcast.js* [Top](#top)


Broadcasts an event to all listeners
 NOTE : the function takes a variable number of arguments
        i.e. all arguments after the topic will be passed to the listeners
        
*Example*

```javascript
comb.broadcast("hello", "hello world");
 //the args "hello" and "world" will be passed to any listener of the topic
 //"hello"
 comb.broadcast("hello", "hello", "world");


```

     
*Arguments*

        
 * _topic_ `String` : the topic to brodcast
        
 * _params_  : the information to bradcast
        
     
     

*Source*

```javascript
function (){
   var args = Array.prototype.slice.call(arguments);
   var topic = args.splice(0, 1)[0];
   if (topic) {
       var list = listeners[topic];
   	if (list) {
   		for (var i = list.length - 1; i >= 0; i--) {
   			var han = list[i], cb = han.cb;
   			if (cb) {
   				cb.apply(this, args);
   			}
   		}
   	}
   }
   			
}
```

  
<a name="comb_camelize"></a>

###*camelize*



---
*Defined base/inflections.js* [Top](#top)


Converts a string to camelcase
        
*Example*

```javascript
comb.camelize('hello_world') => helloWorld
  comb.camelize('column_name') => columnName
  comb.camelize('columnName') => columnName
  comb.camelize(null) => null
  comb.camelize() => undefined


```

     
*Arguments*

        
 * _str_ `String` : the string to camelize
        
     
     
*Returns*

        
 * `String` the camelized version of the string
        
     

*Source*

```javascript
function (str){
   var ret = str;
   if (!misc.isUndefinedOrNull(str)) {
       ret = str.replace(CAMELIZE_CONVERT_REGEXP, function (a, b) {
           return b.toUpperCase();
       });
   }
   return ret;
}
```

  
<a name="comb_classify"></a>

###*classify*



---
*Defined base/inflections.js* [Top](#top)


Singularizes and camelizes the string.  Also strips out all characters preceding
 and including a period (".").
        
*Example*

```javascript
comb.classify('egg_and_hams') => "eggAndHam"
   comb.classify('post') => "post"
   comb.classify('schema.post') => "post"


```

     
*Arguments*

        
 * _str_ `String` : the string to classify
        
     
     
*Returns*

        
 * `String` the classified version of the string
        
     

*Source*

```javascript
function (str){
   var ret = str;
   if (!misc.isUndefinedOrNull(str)) {
       ret = comb.camelize(comb.singularize(str.replace(/.*\./g, '')));
   }
   return ret;
}
```

  
<a name="comb_connect"></a>

###*connect*



---
*Defined base/broadcast.js* [Top](#top)


Function to listen when other functions are called
        
*Example*

```javascript
comb.connect(obj, "event", myfunc);
  comb.connect(obj, "event", "log", console);


```

     
*Arguments*

        
 * _obj_ `Object` : the object in which the method you are connection to resides
        
 * _method_ `String` : the name of the method to connect to
        
 * _cb_ `Function` : the function to callback
        
 * _scope?_ `Object` : the scope to call the specified cb in
        
     
     
*Returns*

        
 * `Array` handle to pass to [comb.disconnect](#comb_disconnect)
        
     

*Source*

```javascript
function (obj,method,cb,scope){
   var index;
   if (typeof method != "string") throw new Error("When calling connect the method must be string");
   if (!func.isFunction(cb)) throw new Error("When calling connect callback must be a string");
   var scope = obj || global, listeners, newMethod;
   if (typeof scope[method] == "function") {
   	listeners = scope[method].__listeners;
   	if (!listeners) {
   		newMethod = wrapper();
   		newMethod.func = obj[method];
   		listeners = (newMethod.__listeners = []);
   		scope[method] = newMethod;
   	}
   	index = listeners.push(cb);
   } else {
   	throw new Error("unknow method " + method + " in object " + obj);
   }
   return [obj, method, index];
   			
}
```

  
<a name="comb_curry"></a>

###*curry*



---
*Defined base/functions.js* [Top](#top)


Curries a function
        
*Example*

```javascript
var curried = comb.curry(4, function(a,b,c,d){
     return [a,b,c,d].join(",");
 }
  curried("a");
  curried("b");
  curried("c");
  curried("d") => "a,b,c,d"

  //OR

  curried("a")("b")("c")("d") => "a,b,c,d"



```

     
*Arguments*

        
 * _depth_ `Number` : the number of args you expect
        
 * _cb_ `Function` : the function to call once all args are gathered
        
 * _scope?_ `Object` : what scope to call the function in
        
     
     
*Returns*

        
 * `Function` the curried version of the function
        
     

*Source*

```javascript
function (depth,cb,scope){
   var f;
   if (scope) {
       f = comb.hitch(scope, cb);
   } else {
       f = cb;
   }
   if (depth) {
       var len = depth - 1;
       for (var i = len; i >= 0; i--) {
           f = curry(f, i == len);
       }
   }
   return f;
}
```

  
<a name="comb_daysAgo"></a>

###*daysAgo*



---
*Defined base/date.js* [Top](#top)


Subtracts the specified days/s from the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of days to subtract
        
     
     
*Returns*

        
 * `Date` a date with the number of days subtracted
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "days", -val);
}
```

  
<a name="comb_daysFromNow"></a>

###*daysFromNow*



---
*Defined base/date.js* [Top](#top)


Adds the specified days/s to the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of days to add
        
     
     
*Returns*

        
 * `Date` a date with the number of days added
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "days", val);
}
```

  
<a name="comb_deepEqual"></a>

###*deepEqual*



---
*Defined base/object.js* [Top](#top)


Determines if an two things are deep equal.
        
*Example*

```javascript
comb.deepEqual({a : 1, b : 2}, {a : 1, b : 2}) => true
 comb.deepEqual({a : 1}, {a : 1, b : 2}) => false


```

     
*Arguments*

        
 * _o1_  : the first thing to compare
        
 * _o3_  : the second thing to compare
        
     
     
*Returns*

        
 * `Boolean` 
        
     

*Source*

```javascript
function (o1,o2){
   return  _deepEqual(o1, o2);
}
```

  
<a name="comb_deepMerge"></a>

###*deepMerge*



---
*Defined base/object.js* [Top](#top)


Merges objects together only overriding properties that are different.
 NOTE: this function takes a variable number of objects to merge
        
*Example*

```javascript
var myObj = {my : {cool : {property1 : 1, property2 : 2}}};
 comb.deepMerge(myObj, {my : {cool : {property3 : 3}}});

 myObj.my.cool.property1 => 1
 myObj.my.cool.property2 => 2
 myObj.my.cool.property3 => 3



```

     
*Arguments*

        
 * _obj_ `Object` : the object to merge into
        
 * _props_ `Object` : variable number of objects to merge into the obj
        
     
     
*Returns*

        
 * `Object` the merged object
        
     

*Source*

```javascript
function (obj,props){
   if (!obj) {
       obj = {};
   }
   for (var i = 1, l = arguments.length; i &lt; l; i++) {
       deepMerge(obj, arguments[i]);
   }
   return obj; // Object
}
```

  
<a name="comb_define"></a>

###*define*



---
*Defined define.js* [Top](#top)


Defines a new class to be used

 <p>
     Class methods
     <ul>
         <li>as(module | bject, name): exports the object to module or the object with the name</li>
         <li>mixin(mixin) : mixes in an object</li>
     </ul>
     </br>
     Instance methods
     <ul>
         <li>_super(args): calls the super of the current method, args can be an Argument object
         or an array of anything you wan to supply as arguments.</li>
     </ul>
     </br>
     Instance properties
     <ul>
         <li>_static: use to reference class properties and methods</li>
     </ul>

 </p>
        
*Example*

```javascript
//Class without a super class
 var Mammal = comb.define(null, {
      instance : {

          constructor: function(options) {
              options = options || {};
              this._super(arguments);
              this._type = options.type || "mammal";
          },

          speak : function() {
              return  "A mammal of type " + this._type + " sounds like";
          },

          //Define your getters
          getters : {
              type : function() {
                  return this._type;
              }
          },

           //Define your setters
          setters : {
              type : function(t) {
                  this._type = t;
              }
          }
      },

      //Define your static methods
      static : {
          soundOff : function() {
              return "Im a mammal!!";
          }
      }
 });

 //Show singular inheritance
var Wolf = comb.define(Mammal, {
   instance: {
       constructor: function(options) {
          options = options || {};
          //You can call your super constructor, or you may not
          //call it to prevent the super initializing parameters
          this._super(arguments);
          this._sound = "growl";
          this._color = options.color || "grey";
      },

      speak : function() {
          //override my super classes speak
          //Should return "A mammal of type mammal sounds like a growl"
          return this._super(arguments) + " a " + this._sound;
      },

      //add new getters for sound and color
      getters : {

          color : function() {
              return this._color;
          },

          sound : function() {
              return this._sound;
          }
      },

      setters : {

          //NOTE color is read only except on initialization

          sound : function(s) {
              this._sound = s;
          }
      }

  },

  static : {
      //override my satic soundOff
      soundOff : function() {
          //You can even call super in your statics!!!
          //should return "I'm a mammal!! that growls"
          return this._super(arguments) + " that growls";
      }
  }
});


 //Typical hierarchical inheritance
 // Mammal->Wolf->Dog
 var Dog = comb.define(Wolf, {
    instance: {
        constructor: function(options) {
            options = options || {};
            this._super(arguments);
            //override Wolfs initialization of sound to woof.
            this._sound = "woof";

        },

        speak : function() {
            //Should return "A mammal of type mammal sounds like a growl thats domesticated"
            return this._super(arguments) + " thats domesticated";
        }
    },

    static : {
        soundOff : function() {
            //should return "I'm a mammal!! that growls but now barks"
            return this._super(arguments) + " but now barks";
        }
    }
});



 dog instanceof Wolf => true
 dog instanceof Mammal => true
 dog.speak() => "A mammal of type mammal sounds like a woof thats domesticated"
 dog.type => "mammal"
 dog.color => "gold"
 dog.sound => "woof"
 Dog.soundOff() => "Im a mammal!! that growls but now barks"

 // Mammal->Wolf->Dog->Breed
var Breed = comb.define(Dog, {
    instance: {

        //initialize outside of constructor
        _pitch : "high",

        constructor: function(options) {
            options = options || {};
            this._super(arguments);
            this.breed = options.breed || "lab";
        },

        speak : function() {
            //Should return "A mammal of type mammal sounds like a
            //growl thats domesticated with a high pitch!"
            return this._super(arguments) + " with a " + this._pitch + " pitch!";
        },

        getters : {
            pitch : function() {
                return this._pitch;
            }
        }
    },

    static : {
        soundOff : function() {
            //should return "I'M A MAMMAL!! THAT GROWLS BUT NOW BARKS!"
            return this._super(arguments).toUpperCase() + "!";
        }
    }
 });


 var breed = new Breed({color : "gold", type : "lab"}),



 breed instanceof Dog => true
 breed instanceof Wolf => true
 breed instanceof Mammal => true
 breed.speak() => "A mammal of type lab sounds like a woof "
                  + "thats domesticated with a high pitch!"
 breed.type => "lab"
 breed.color => "gold"
 breed.sound => "woof"
 breed.soundOff() => "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!"


  //Example of multiple inheritance
  //NOTE proto is optional

  //Mammal is super class
  //Wolf Dog and Breed inject functionality into the prototype
 var Lab = comb.define([Mammal, Wolf, Dog, Breed]);

 var lab = new Lab();
 lab instanceof Wolf => false
 lab instanceof Dog => false
 lab instanceof Breed => false
 lab instanceof Mammal => true
 lab.speak() => "A mammal of type mammal sounds like a"
                + " woof thats domesticated with a high pitch!"
 Lab.soundOff() => "IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!"

```

     
*Arguments*

        
 * _super_ `Array|Class` : the supers of this class
        
 * _proto?_ `Object` : the object used to define this class
        
 * _proto.instance?_ `Object` : the instance methods of the class
        
 * _proto.instance.getters?_ `Object` : the getters for the class
        
 * _proto.instance.setters?_ `Object` : the setters for the class
        
 * _proto.static?_ `Object` : the Class level methods of this class
        
 * _proto.static.getters?_ `Object` : static getters for the object
        
 * _proto.static.setters?_ `Object` : static setters for the object
        
     
     
*Returns*

        
 * `Object` the constructor of the class to be used with new keyword
        
     

*Source*

```javascript
function (sup,proto){
   var child = function () {
       this.constructor.apply(this, arguments);
   };
   __define(child, sup, proto);
   return child.init() || child;
}
```

  
<a name="comb_disconnect"></a>

###*disconnect*



---
*Defined base/broadcast.js* [Top](#top)


Disconnects a listener to a function
        
     
*Arguments*

        
 * _handle_ `handle` : handle returned from comb.connect
        
     
     

*Source*

```javascript
function (handle){
   if (handle && handle.length == 3) {
   	var obj = handle[0], method = handle[1], cb = handle[2];
   	if (typeof method != "string") throw "comb.disconnect : When calling disconnect the method must be string";
   	var scope = obj || global, ls;
   	if (typeof scope[method] == "function") {
   		ls = scope[method].__listeners;
   		if (ls && cb-- > 0) {
   			//we dont want to splice it because our indexing will get off
   			ls[cb] = null;
   		}
   	} else {
   		throw new Error("unknown method " + method + " in object " + obj);
   	}
   } else {
   	throw "comb.disconnect : invalid handle"
   }
   			
}
```

  
<a name="comb_extend"></a>

###*extend*



---
*Defined base/object.js* [Top](#top)


Extends the prototype of an object if it exists otherwise it extends the object.
        
*Example*

```javascript
var MyObj = function(){};
  MyObj.prototype.test = true;
  comb.extend(MyObj, {test2 : false, test3 : "hello", test4 : "world"});

  var myObj = new MyObj();

  myObj.test => true
  myObj.test2 => false
  myObj.test3 => "hello"
  myObj.test4 => "world"

  var myObj2 = {};
  myObj2.test = true;
  comb.extend(myObj2, {test2 : false, test3 : "hello", test4 : "world"});

  myObj2.test => true
  myObj2.test2 => false
  myObj2.test3 => "hello"
  myObj2.test4 => "world"



```

     
*Arguments*

        
 * _parent_ `Object` : the parent object to extend
        
 * _extend_ `Object` : the extension object to mixin to the parent
        
     
     
*Returns*

        
 * `Object` returns the extended object
        
     

*Source*

```javascript
function (parent,extend){
   var proto = parent.prototype || parent;
   return exports.merge(proto, extend);
}
```

  
<a name="comb_hitch"></a>

###*hitch*



---
*Defined base/functions.js* [Top](#top)


Binds a method to a particular scope
        
     
*Arguments*

        
 * _scope_ `Object` : the scope to bind the callback to
        
 * _method_ `String|Function` : the method to callback
        
 * _args?_  : optional args to pass to the callback
        
     
     
*Returns*

        
 * `Function` the hitched function
        
     

*Source*

```javascript
function (scope,method,args){
   var args = Array.prototype.slice.call(arguments).slice(2);
   if (typeof method == "string") {
       method = scope[method];
   }
   if (method) {
       return function () {
           var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
           return method.apply(scope, scopeArgs);
       };
   } else {
       throw new Error(method + "Method not defined");
   }
}
```

  
<a name="comb_hitchIgnore"></a>

###*hitchIgnore*



---
*Defined base/functions.js* [Top](#top)


Binds a method to a particular scope ignoring any new arguments passed
 into the functuion. This useful if you want to force particular arguments and
 ignore any new ones
        
     
*Arguments*

        
 * _scope_ `Object` : the scope to bind the callback to
        
 * _method_ `String|Function` : the method to callback
        
 * _args?_  : optional args to pass to the callback
        
     
     
*Returns*

        
 * `Function` the hitched function
        
     

*Source*

```javascript
function (scope,method,args){
   var args = Array.prototype.slice.call(arguments).slice(2);
   if (typeof method == "string") {
       method = scope[method];
   }
   if (method) {
       return function () {
           return method.apply(scope, args);
       };
   } else {
       throw new Error(method + "Method not defined");
   }
}
```

  
<a name="comb_hoursAgo"></a>

###*hoursAgo*



---
*Defined base/date.js* [Top](#top)


Subtracts the specified hour/s from the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of hours to subtract
        
     
     
*Returns*

        
 * `Date` a date with the number of hours subtracted
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "hours", -val);
}
```

  
<a name="comb_hoursFromNow"></a>

###*hoursFromNow*



---
*Defined base/date.js* [Top](#top)


Adds the specified hour/s to the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of hours to add
        
     
     
*Returns*

        
 * `Date` a date with the number of hours added
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "hours", val);
}
```

  
<a name="comb_isArguments"></a>

###*isArguments*



---
*Defined base/misc.js* [Top](#top)


Determines if obj is an Arguments object;
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is null
        
     
     
*Returns*

        
 * `Boolean` true if it is an Arguments Object false otherwise
        
     

*Source*

```javascript
function (object){
   return !comb.isUndefinedOrNull(object) && Object.prototype.toString.call(object) == '[object Arguments]';
}
```

  
<a name="comb_isBoolean"></a>

###*isBoolean*



---
*Defined base/misc.js* [Top](#top)


Determines if obj is a boolean
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is a boolean
        
     
     
*Returns*

        
 * `Boolean` true if it is a boolean false otherwise
        
     

*Source*

```javascript
function (obj){
   var undef, type = typeof obj;
   return obj != undef && type == "boolean" || type == "Boolean";
}
```

  
<a name="comb_isDate"></a>

###*isDate*



---
*Defined base/date.js* [Top](#top)


Determines if obj is a Date
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is a Date
        
     
     
*Returns*

        
 * `Boolean` true if it is a Date false otherwise
        
     

*Source*

```javascript
function (obj){
   var undef;
   return (obj !== undef && typeof obj === "object" && obj instanceof Date);
}
```

  
<a name="comb_isDefined"></a>

###*isDefined*



---
*Defined base/misc.js* [Top](#top)


Determins if the obj is not undefined
        
     
*Arguments*

        
 * _obj_  : the thing to test if it is not undefined
        
     
     
*Returns*

        
 * `Boolean` true if it is defined false otherwise
        
     

*Source*

```javascript
function (obj){
   return !comb.isUndefined(obj);
}
```

  
<a name="comb_isEmpty"></a>

###*isEmpty*



---
*Defined base/object.js* [Top](#top)


Determines if an object is empty
        
*Example*

```javascript
comb.isEmpty({}) => true
 comb.isEmpty({a : 1}) => false


```

     
*Arguments*

        
 * _object_  : the object to test
        
     
     
*Returns*

        
 * `Boolean` true if the object is empty;
        
     

*Source*

```javascript
function (object){
   if (comb.isObject(object)) {
       for (var i in object) {
           if (object.hasOwnProperty(i)) {
               return false;
           }
       }
   }
   return true;
}
```

  
<a name="comb_isFunction"></a>

###*isFunction*



---
*Defined base/functions.js* [Top](#top)


Determines if something is a function
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is a function
        
     
     
*Returns*

        
 * `Boolean` true if the obj is a function false otherwise
        
     

*Source*

```javascript
function (obj){
   return typeof obj == "function";
}
```

  
<a name="comb_isHash"></a>

###*isHash*



---
*Defined base/object.js* [Top](#top)


Determins if an object is just a hash and not a qualified Object such as number
        
*Example*

```javascript
comb.isHash({}) => true
    comb.isHash({1 : 2, a : "b"}) => true
    comb.isHash(new Date()) => false
    comb.isHash(new String()) => false
    comb.isHash(new Number()) => false
    comb.isHash(new Boolean()) => false
    comb.isHash() => false
    comb.isHash("") => false
    comb.isHash(1) => false
    comb.isHash(false) => false
    comb.isHash(true) => false

```

     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is a hash
        
     
     
*Returns*

        
 * `Boolean` true if it is a hash false otherwise
        
     

*Source*

```javascript
function (obj){
   var ret = comb.isObject(obj);
   return ret && obj.constructor === Object;
}
```

  
<a name="comb_isInstanceOf"></a>

###*isInstanceOf*



---
*Defined base/misc.js* [Top](#top)


Determines if obj is an instance of a particular class
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it and instnace of a class
        
 * _Clazz_ `Object` : used to determine if the object is an instance of
        
     
     
*Returns*

        
 * `Boolean` true if it is an instance of the clazz false otherwise
        
     

*Source*

```javascript
function (obj,clazz){
   return argsToArray(arguments).slice(1).some(function (c) {
       return isInstance(obj, c);
   });
}
```

  
<a name="comb_isNull"></a>

###*isNull*



---
*Defined base/misc.js* [Top](#top)


Determines if obj is null
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is null
        
     
     
*Returns*

        
 * `Boolean` true if it is null false otherwise
        
     

*Source*

```javascript
function (obj){
   var undef;
   return obj !== undef && obj == null;
}
```

  
<a name="comb_isNumber"></a>

###*isNumber*



---
*Defined base/number.js* [Top](#top)


Determines if obj is a number
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is a Number
        
     
     
*Returns*

        
 * `Boolean` true if it is a number false otherwise
        
     

*Source*

```javascript
function (obj){
   var undef;
   return obj !== undef && obj != null && (typeof obj == "number" || obj instanceof Number);
}
```

  
<a name="comb_isObject"></a>

###*isObject*



---
*Defined base/object.js* [Top](#top)


Determines if obj is an object
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is an object
        
     
     
*Returns*

        
 * `Boolean` true if it is an object false otherwise
        
     

*Source*

```javascript
function (obj){
   var undef;
   return obj != null && obj != undef && typeof obj == "object";
}
```

  
<a name="comb_isPromiseLike"></a>

###*isPromiseLike*



---
*Defined promise.js* [Top](#top)


Tests if an object is like a promise (i.e. it contains then, addCallback, addErrback)
        
     
*Arguments*

        
 * _obj_  : object to test
        
     
     

*Source*

```javascript
function (obj){
   return !base.isUndefinedOrNull(obj) && (base.isInstanceOf(obj, Promise) || (base.isFunction(obj.then)
       && base.isFunction(obj.addCallback) && base.isFunction(obj.addErrback)));
       
}
```

  
<a name="comb_isUndefined"></a>

###*isUndefined*



---
*Defined base/misc.js* [Top](#top)


Determines if obj is undefined
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is undefined
        
     
     
*Returns*

        
 * `Boolean` true if it is undefined false otherwise
        
     

*Source*

```javascript
function (obj){
   var undef;
   return obj !== null && obj === undef;
}
```

  
<a name="comb_isUndefinedOrNull"></a>

###*isUndefinedOrNull*



---
*Defined base/misc.js* [Top](#top)


Determines if obj is undefined or null
        
     
*Arguments*

        
 * _obj_ `Anything` : the thing to test if it is undefined or null
        
     
     
*Returns*

        
 * `Boolean` true if it is undefined or null false otherwise
        
     

*Source*

```javascript
function (obj){
   return comb.isUndefined(obj) || comb.isNull(obj);
}
```

  
<a name="comb_listen"></a>

###*listen*



---
*Defined base/broadcast.js* [Top](#top)


Listen for the broadcast of certain events
        
*Example*

```javascript
comb.listen("hello", function(arg1, arg2){
     console.log(arg1);
     console.log(arg2);
  });


```

     
*Arguments*

        
 * _topic_ `String` : the topic to listen for
        
 * _callback_ `Function` : the funciton to call when the topic is published
        
     
     
*Returns*

        
 *  a handle to pass to [comb.unListen](#comb_unListen)
        
     

*Source*

```javascript
function (topic,callback){
   if (!func.isFunction(callback)) throw new Error("callback must be a function");
   var handle = {
   	topic : topic,
   	cb : callback,
   	pos : null
   };
   var list = listeners[topic];
   if (!list) {
   	list = (listeners[topic] = []);
   }
   list.push(handle);
   handle.pos = list.length - 1;
   return handle;
   			
}
```

  
<a name="comb_listenForExit"></a>

###*listenForExit*



---
*Defined base/misc.js* [Top](#top)


Adds listeners to process.exit with out having to change setMaxListeners useful if you
 are writing a library and do not want to change core setting.
        
     
*Arguments*

        
 * _cb_ `Funciton` : funciton to call when process is exiting
        
     
     

*Source*

```javascript
function (cb){
   setupListener();
   listeners.push(cb);
       
}
```

  
<a name="comb_merge"></a>

###*merge*



---
*Defined base/object.js* [Top](#top)


Merges objects together
 NOTE: this function takes a variable number of objects to merge
        
*Example*

```javascript
var myObj = {};
 comb.merge(myObj, {test : true});

 myObj.test => true

 comb.merge(myObj, {test : false}, {test2 : false}, {test3 : "hello", test4 : "world"});
 myObj.test => false
 myObj.test2 => false
 myObj.test3 => "hello"
 myObj.test4 => "world"



```

     
*Arguments*

        
 * _obj_ `Object` : the object to merge into
        
 * _props_ `Object` : variable number of objects to merge into the obj
        
     
     
*Returns*

        
 * `Object` the merged object
        
     

*Source*

```javascript
function (obj,props){
   if (!obj) {
       obj = {};
   }
   for (var i = 1, l = arguments.length; i &lt; l; i++) {
       merge(obj, arguments[i]);
   }
   return obj; // Object
}
```

  
<a name="comb_minutesAgo"></a>

###*minutesAgo*



---
*Defined base/date.js* [Top](#top)


Subtracts the specified minutes/s from the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of minutes to subtract
        
     
     
*Returns*

        
 * `Date` a date with the number of minutes subtracted
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "minutes", -val);
}
```

  
<a name="comb_minutesFromNow"></a>

###*minutesFromNow*



---
*Defined base/date.js* [Top](#top)


Adds the specified minutes/s to the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of minutes to add
        
     
     
*Returns*

        
 * `Date` a date with the number of minutes added
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "minutes", val);
}
```

  
<a name="comb_monthsAgo"></a>

###*monthsAgo*



---
*Defined base/date.js* [Top](#top)


Subtracts the specified month/s from the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of months to subtract
        
     
     
*Returns*

        
 * `Date` a date with the number of monts subtracted
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "months", -val);
}
```

  
<a name="comb_monthsFromNow"></a>

###*monthsFromNow*



---
*Defined base/date.js* [Top](#top)


Adds the specified month/s to the current date.
        
*Example*

```javascript
//assuming that current month is february
 comb.yearsFromNow(2); //yyyy-04-dd hh:MM:ss


```

     
*Arguments*

        
 * _val_ `Number` : the number of months to add
        
     
     
*Returns*

        
 * `Date` a date with the number of years added
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "months", val);
}
```

  
<a name="comb_partial"></a>

###*partial*



---
*Defined base/functions.js* [Top](#top)


Allows the passing of additional arguments to a function when it is called
 especially useful for callbacks that you want to provide additional parameters to
        
     
*Arguments*

        
 * _method_ `String|Function` : the method to callback
        
 * _args?_ `Anything` : variable number of arguments to pass
        
     
     
*Returns*

        
 * `Function` partially hitched function
        
     

*Source*

```javascript
function (method,args){
   var args = Array.prototype.slice.call(arguments).slice(1);
   if (typeof method == "function") {
       return function () {
           var scopeArgs = args.concat(Array.prototype.slice.call(arguments));
           return method.apply(this, scopeArgs);
       };
   } else {
       throw new Error(method + "Method not defined");
   }
}
```

  
<a name="comb_pluralize"></a>

###*pluralize*



---
*Defined base/inflections.js* [Top](#top)


Returns the plural form of the word in the string.
        
*Example*

```javascript
comb.pluralize("post") => "posts"
  comb.pluralize("octopus") => "octopi"
  comb.pluralize("sheep") => "sheep"
  comb.pluralize("words") => "words"
  comb.pluralize("the blue mailman") => "the blue mailmen"
  comb.pluralize("CamelOctopus") => "CamelOctopi"


```

     
*Arguments*

        
 * _str_ `String` : the string to pluralize
        
     
     
*Returns*

        
 * `String` the pluralized version of the string
        
     

*Source*

```javascript
function (str){
   var ret = str;
   if (!misc.isUndefinedOrNull(str)) {
       if (UNCOUNTABLES.indexOf(str) == -1) {
           for (var i in PLURALS) {
               var s = PLURALS[i], rule = s[0], replacement = s[1];
               if ((ret = ret.replace(rule, replacement)) != str) {
                   break;
               }
           }
       }
   }
   return ret;
}
```

  
<a name="comb_secondsAgo"></a>

###*secondsAgo*



---
*Defined base/date.js* [Top](#top)


Subtracts the specified seconds/s from the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of seconds to subtract
        
     
     
*Returns*

        
 * `Date` a date with the number of seconds subtracted
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "seconds", -val);
}
```

  
<a name="comb_secondsFromNow"></a>

###*secondsFromNow*



---
*Defined base/date.js* [Top](#top)


Adds the specified second/s to the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of seconds to add
        
     
     
*Returns*

        
 * `Date` a date with the number of seconds added
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "seconds", val);
}
```

  
<a name="comb_serial"></a>

###*serial*



---
*Defined promise.js* [Top](#top)


Executes a list of items in a serial manner. If the list contains promises then each promise
 will be executed in a serial manner, if the list contains non async items then the next item in the list
 is called.
        
*Example*

```javascript
var asyncAction = function(item, timeout){
    var ret = new comb.Promise();
    setTimeout(comb.hitchIgnore(ret, "callback", item), timeout);
    return ret;
 };

 comb.serial([
     comb.partial(asyncAction, 1, 1000),
     comb.partial(asyncAction, 2, 900),
     comb.partial(asyncAction, 3, 800),
     comb.partial(asyncAction, 4, 700),
     comb.partial(asyncAction, 5, 600),
     comb.partial(asyncAction, 6, 500)
 ]).then(function(results){
     console.log(results); // [1,2,3,4,5,6];
 });




```

     
*Arguments*

        
 * _list_  : 
        
 * _callback_  : 
        
 * _errback_  : 
        
     
     

*Source*

```javascript
function (list,callback,errback){
   var ret = new Promise();
   if (base.isArray(list)) {
       callNext(list, 0, [], false, ret)
   } else {
       throw new Error("When calling comb.serial the first argument must be an array");
   }
   ret.then(callback, errback);
   return ret;
       
}
```

  
<a name="comb_singleton"></a>

###*singleton*



---
*Defined define.js* [Top](#top)


Defines a singleton instance of a Class.
 See [define](#define) for params.
        
*Example*

```javascript
 var MyLab = comb.singleton([Mammal, Wolf, Dog, Breed]);
  var myLab1 = new MyLab();
  myLab1.type = "collie"
  var myLab2 = new MyLab();
  myLab1 === myLab2 => true
  myLab1.type => "collie"
  myLab2.type => "collie"
 
```

     
*Arguments*

        
 * _sup_  : 
        
 * _proto_  : 
        
     
     

*Source*

```javascript
function (sup,proto){
   var retInstance;
   var child = function () {
       if (!retInstance) {
           this.constructor.apply(this, arguments);
           retInstance = this;
       }
       return retInstance;
   };
   __define(child, sup, proto);
   return  child.init() || child;
}
```

  
<a name="comb_singularize"></a>

###*singularize*



---
*Defined base/inflections.js* [Top](#top)


The reverse of pluralize, returns the singular form of a word in a string.
        
*Example*

```javascript
comb.singularize("posts") => "post"
   comb.singularize("octopi")=> "octopus"
   comb.singularize("sheep") => "sheep"
   comb.singularize("word") => "word"
   comb.singularize("the blue mailmen") => "the blue mailman"
   comb.singularize("CamelOctopi") => "CamelOctopus"


```

     
*Arguments*

        
 * _str_ `String` : the string to singularize
        
     
     
*Returns*

        
 * `String` the singularized version of the string
        
     

*Source*

```javascript
function (str){
   var ret = str;
   if (!misc.isUndefinedOrNull(str)) {
       if (UNCOUNTABLES.indexOf(str) == -1) {
           for (var i in SINGULARS) {
               var s = SINGULARS[i], rule = s[0], replacement = s[1];
               if ((ret = ret.replace(rule, replacement)) != str) {
                   break;
               }
           }
       }
   }
   return ret;
}
```

  
<a name="comb_unListen"></a>

###*unListen*



---
*Defined base/broadcast.js* [Top](#top)


Disconnects a listener
        
     
*Arguments*

        
 * _handle_  : a handle returned from [comb.listen](#comb_listen)
        
     
     

*Source*

```javascript
function (handle){
   if (handle) {
   	var topic = handle.topic, list = listeners[topic];
   	if (list) {
   		for (var i = list.length - 1; i >= 0; i--) {
   			if (list[i] == handle) {
   				list.splice(i, 1);
   			}
   		}
   		if (!list.length) {
   			delete listeners[topic];
   		}
   	}
   }
   			
}
```

  
<a name="comb_underscore"></a>

###*underscore*



---
*Defined base/inflections.js* [Top](#top)


The reverse of camelize. Makes an underscored form from the expression in the string.
        
*Example*

```javascript
comb.underscore('helloWorld') => hello_world
  comb.underscore('column_name') => column_name
  comb.underscore('columnName') => column_name
  comb.underscore(null) => null
  comb.underscore() => undefined

```

     
*Arguments*

        
 * _str_ `String` : The string to underscore
        
     
     
*Returns*

        
 * `String` the underscored version of the string
        
     

*Source*

```javascript
function (str){
   var ret = str;
   if (!misc.isUndefinedOrNull(str)) {
       ret = str.replace(UNDERSCORE_CONVERT_REGEXP1, UNDERSCORE_CONVERT_REPLACE)
           .replace(UNDERSCORE_CONVERT_REGEXP2, UNDERSCORE_CONVERT_REPLACE)
           .replace(DASH, UNDERSCORE).toLowerCase();
   }
   return ret;
}
```

  
<a name="comb_when"></a>

###*when*



---
*Defined promise.js* [Top](#top)


Waits for promise and non promise values to resolve and fires callback or errback appropriately.
        
*Example*

```javascript
var a = "hello";
  var b = new comb.Promise().callback(world);
  comb.when(a, b) => called back with ["hello", "world"];


```

     
*Arguments*

        
 * _args_ `Anything...` : variable number of arguments to wait for
        
 * _cb_ `Function` : the callback function
        
 * _eb_ `Function` : the errback function
        
     
     
*Returns*

        
 * `comb.Promise` a promise that is fired when all values have resolved
        
     

*Source*

```javascript
function (args,cb,eb){
   var args = base.argsToArray(arguments), p;
   eb = base.isFunction(args[args.length - 1]) ? args.pop() : null;
   cb = base.isFunction(args[args.length - 1]) ? args.pop() : null;
   if (eb && !cb) {
       cb = eb;
       eb = null;
   }
   if (!args.length) {
       p = new Promise().callback(args);
   } else if (args.length == 1) {
       args = args.pop();
       p = exports.isPromiseLike(args) ? args : new Promise().callback(args);
   } else {
       var p = new PromiseList(args.map(function (a) {
           return exports.isPromiseLike(a) ? a : new Promise().callback(a);
       }), true);
   }
   if (cb) {
       p.addCallback(cb);
   }
   if (eb) {
       p.addErrback(eb);
   }
   return p;
       
}
```

  
<a name="comb_wrap"></a>

###*wrap*



---
*Defined promise.js* [Top](#top)


Wraps traditional node style functions with a promise.
        
*Example*

```javascript
var fs = require("fs");
 var readFile = comb.wrap(fs.readFile, fs);
 readFile(__dirname + "/test.json").then(
      function(buffer){
          console.log(contents);
      },
      funciton(err){

      }  console.error(err);
 );



```

     
*Arguments*

        
 * _fn_ `Function` : function to wrap
        
 * _scope_ `Object` : scope to call the function in
        
     
     
*Returns*

        
 * `Funciton` a wrapped function
        
     

*Source*

```javascript
function (fn,scope){
   return function () {
       var ret = new Promise();
       var args = base.argsToArray(arguments);
       args.push(function (err, res) {
           var args = base.argsToArray(arguments);
           if (err) {
               ret.errback(err);
           } else {
               args.shift();
               ret.callback.apply(ret, args);
           }
       });
       fn.apply(scope || this, args);
       return ret;
   }
       
}
```

  
<a name="comb_yearsAgo"></a>

###*yearsAgo*



---
*Defined base/date.js* [Top](#top)


Subtracts the specified year/s from the current date.
        
     
*Arguments*

        
 * _val_ `Number` : the number of years to subtract
        
     
     
*Returns*

        
 * `Date` a date with the number of years subtracted
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "years", -val);
}
```

  
<a name="comb_yearsFromNow"></a>

###*yearsFromNow*



---
*Defined base/date.js* [Top](#top)


Adds the specified year/s to the current date.
        
*Example*

```javascript
//assuming that current year is 2012
 comb.yearsFromNow(1); //2013-mm-dd hh:MM:ss


```

     
*Arguments*

        
 * _val_ `Number` : the number of years to add
        
     
     
*Returns*

        
 * `Date` a date with the number of years added
        
     

*Source*

```javascript
function (val){
   return date.add(new Date(), "years", val);
}
```

  

<a name="comb_array"></a>
##comb.array

[Top](#top)

Utilities for Arrays


  * [cartesian](#comb_array_cartesian)

  * [compact](#comb_array_compact)

  * [flatten](#comb_array_flatten)

  * [intersect](#comb_array_intersect)

  * [permutations](#comb_array_permutations)

  * [powerSet](#comb_array_powerSet)

  * [removeDuplicates](#comb_array_removeDuplicates)

  * [rotate](#comb_array_rotate)

  * [sum](#comb_array_sum)

  * [toArray](#comb_array_toArray)

  * [transpose](#comb_array_transpose)

  * [union](#comb_array_union)

  * [valuesAt](#comb_array_valuesAt)

  * [zip](#comb_array_zip)


  
<a name="comb_array_cartesian"></a>

###*cartesian*



---
*Defined base/array.js* [Top](#top)


Find the cartesian product of two arrays
        
*Example*

```javascript
comb.array.cartesian([1,2], [2,3]) => [
           [1,2],
           [1,3],
           [2,2],
           [2,3]
       ]
 comb.array.cartesian([1,2], [2,3,4]) => [
           [1,2],
           [1,3],
           [1,4] ,
           [2,2],
           [2,3],
           [2,4]
       ]
 comb.array.cartesian([1,2,3], [2,3,4]) => [
           [1,2],
           [1,3],
           [1,4] ,
           [2,2],
           [2,3],
           [2,4] ,
           [3,2],
           [3,3],
           [3,4]
       ]


```

     
*Arguments*

        
 * _a_ `Array` : 
        
 * _b_ `Array` : 
        
     
     

*Source*

```javascript
function (a,b){
   var ret = [];
   if (isArray(a) && isArray(b) && a.length && b.length)
       ret = cross(a[0], b).concat(array.cartesian(a.slice(1), b));
   return ret;
       
}
```

  
<a name="comb_array_compact"></a>

###*compact*



---
*Defined base/array.js* [Top](#top)


Compacts an array removing null or undefined objects from the array.
        
*Example*

```javascript
var x;
 comb.array.compact([1,null,null,x,2]) => [1,2]
 comb.array.compact([1,2]) => [1,2]


```

     
*Arguments*

        
 * _arr_ `Array` : 
        
     
     

*Source*

```javascript
function (arr){
   var ret = [];
   if (isArray(arr) && arr.length) {
       ret = arr.filter(function (item) {
           return !misc.isUndefinedOrNull(item);
       })
   }
   return ret;
       
}
```

  
<a name="comb_array_flatten"></a>

###*flatten*



---
*Defined base/array.js* [Top](#top)


Flatten multiple arrays into a single array
        
*Example*

```javascript
comb.array.flatten([1,2], [2,3], [3,4]) => [1,2,2,3,3,4]
 comb.array.flatten([1,"A"], [2,"B"], [3,"C"]) => [1,"A",2,"B",3,"C"]


```

     
*Arguments*

        
 * _array_  : 
        
     
     

*Source*

```javascript
function (arr){
   var set;
   var args = argsToArray(arguments);
   if (args.length > 1) {
       //assume we are intersections all the lists in the array
       set = args;
   } else {
       set = array.toArray(arr);
   }
   return set.reduce(function (a, b) {
       return a.concat(b);
   }, []);
       
}
```

  
<a name="comb_array_intersect"></a>

###*intersect*



---
*Defined base/array.js* [Top](#top)


Finds the intersection of arrays
 NOTE : this function accepts an arbitrary number of arrays
        
*Example*

```javascript
comb.array.intersect([1,2], [2,3], [2,3,5]) => [2]
 comb.array.intersect([1,2,3], [2,3,4,5], [2,3,5]) => [2,3]
 comb.array.intersect([1,2,3,4], [2,3,4,5], [2,3,4,5]) => [2,3,4]
 comb.array.intersect([1,2,3,4,5], [1,2,3,4,5], [1,2,3]) => [1,2,3]
 comb.array.intersect([[1,2,3,4,5],[1,2,3,4,5],[1,2,3]]) => [1,2,3]


```

     
*Arguments*

        
 * _a_ `Array` : 
        
 * _b_ `Array` : 
        
     
     

*Source*

```javascript
function (a,b){
   var collect = [], set;
   var args = argsToArray(arguments);
   if (args.length > 1) {
       //assume we are intersections all the lists in the array
       set = args;
   } else {
       set = args[0];
   }
   if (isArray(set)) {
       var x = set.shift();
       var collect = set.reduce(function (a, b) {
           return intersection(a, b);
       }, x);
   }
   return array.removeDuplicates(collect);
       
}
```

  
<a name="comb_array_permutations"></a>

###*permutations*



---
*Defined base/array.js* [Top](#top)


Finds all permutations of an array
        
*Example*

```javascript
var arr = [1,2,3];
 comb.array.permutations(arr)    => [[ 1, 2, 3 ],[ 1, 3, 2 ],[ 2, 3, 1 ],
                                     [ 2, 1, 3 ],[ 3, 1, 2 ],[ 3, 2, 1 ]]
 comb.array.permutations(arr, 2) => [[ 1, 2],[ 1, 3],[ 2, 3],[ 2, 1],[ 3, 1],[ 3, 2]]
 comb.array.permutations(arr, 1) => [[1],[2],[3]]
 comb.array.permutations(arr, 0) => [[]]
 comb.array.permutations(arr, 4) => []


```

     
*Arguments*

        
 * _arr_ `Array` : the array to permute.
        
 * _length_ `Number` : the number of elements to permute.
        
     
     

*Source*

```javascript
function (arr,length){
   var ret = [];
   if (isArray(arr)) {
       var copy = arr.slice(0);
       if (typeof length != "number") {
           length = arr.length;
       }
       if (!length) {
           ret = [
               []
           ];
       } else if (length &lt;= arr.length) {
           ret = arr.reduce(function (a, b, i) {
               if (length > 1) {
                   var ret = permute(b, array.rotate(copy, i).slice(1), length);
               } else {
                   ret = [
                       [b]
                   ];
               }
               return a.concat(ret);
           }, [])
       }
   }
   return ret;
       
}
```

  
<a name="comb_array_powerSet"></a>

###*powerSet*



---
*Defined base/array.js* [Top](#top)


Finds the powerset of an array
        
*Example*

```javascript
comb.array.powerSet([1,2]) => [
           [],
           [ 1 ],
           [ 2 ],
           [ 1, 2 ]
   ]
   comb.array.powerSet([1,2,3]) => [
           [],
           [ 1 ],
           [ 2 ],
           [ 1, 2 ],
           [ 3 ],
           [ 1, 3 ],
           [ 2, 3 ],
           [ 1, 2, 3 ]
       ]
   comb.array.powerSet([1,2,3,4]) => [
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
       ]


```

     
*Arguments*

        
 * _arr_ `Array` : the array to find the powerset of
        
     
     

*Source*

```javascript
function (arr){
   var ret = [];
   if (isArray(arr) && arr.length) {
       var ret = arr.reduce(function (a, b) {
           var ret = a.map(function (c) {
               return c.concat(b);
           })
           return a.concat(ret);
       }, [
           []
       ]);
   }
   return ret;
       
}
```

  
<a name="comb_array_removeDuplicates"></a>

###*removeDuplicates*



---
*Defined base/array.js* [Top](#top)


Removes duplicates from an array
        
*Example*

```javascript
comb.array.removeDuplicates([1,1,1]) => [1]
 comb.array.removeDuplicates([1,2,3,2]) => [1,2,3]


```

     
*Arguments*

        
 * _array_ `Aray` : the array of elements to remove duplicates from
        
     
     

*Source*

```javascript
function (arr){
   if (isArray(arr)) {
       var ret = arr.reduce(function (a, b) {
           if (a.indexOf(b) == -1) {
               return a.concat(b);
           } else {
               return a;
           }
       }, []);
       return ret;
   }
       
}
```

  
<a name="comb_array_rotate"></a>

###*rotate*



---
*Defined base/array.js* [Top](#top)


Rotates an array the number of specified positions
        
*Example*

```javascript
var arr = ["a", "b", "c", "d"];
 comb.array.rotate(arr)     => ["b", "c", "d", "a"]
 comb.array.rotate(arr, 2)  => ["c", "d", "a", "b"]);
 comb.array.rotate(arr, 3)  => ["d", "a", "b", "c"]);
 comb.array.rotate(arr, 4)  => ["a", "b", "c", "d"]);
 comb.array.rotate(arr, -1) => ["d", "a", "b", "c"]);
 comb.array.rotate(arr, -2) => ["c", "d", "a", "b"]);
 comb.array.rotate(arr, -3) => ["b", "c", "d", "a"]);
 comb.array.rotate(arr, -4) => ["a", "b", "c", "d"]);


```

     
*Arguments*

        
 * _array_ `Array` : the array of elements to remove duplicates from
        
 * _numberOfTimes_ `Number` : the number of times to rotate the array
        
     
     

*Source*

```javascript
function (arr,numberOfTimes){
   var ret = arr.slice();
   if (typeof numberOfTimes != "number") {
       numberOfTimes = 1;
   }
   if (numberOfTimes && isArray(arr)) {
       if (numberOfTimes > 0) {
           ret.push(ret.shift());
           numberOfTimes--;
       } else {
           ret.unshift(ret.pop());
           numberOfTimes++;
       }
       return array.rotate(ret, numberOfTimes);
   } else {
       return ret;
   }
       
}
```

  
<a name="comb_array_sum"></a>

###*sum*



---
*Defined base/array.js* [Top](#top)


Sums all items in an array
        
*Example*

```javascript
comb.array.sum([1,2,3]) => 6
  comb.array.sum(["A","B","C"]) => "ABC";
  var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
  comb.array.sum([d1,d2,d3]) => "Wed Dec 31 1969 18:00:01 GMT-0600 (CST)"
                              + "Wed Dec 31 1969"  18:00:02 GMT-0600 (CST)"
                              + "Wed Dec 31 1969 18:00:03 GMT-0600 (CST)"
  comb.array.sum([{},{},{}]) => "[object Object][object Object][object Object]";


```

     
*Arguments*

        
 * _array_ `Number[]` : the array of numbers to sum
        
     
     

*Source*

```javascript
function (array){
   array = array || [];
   if (array.length) {
       return array.reduce(function (a, b) {
           return a + b;
       });
   } else {
       return 0;
   }
       
}
```

  
<a name="comb_array_toArray"></a>

###*toArray*



---
*Defined base/array.js* [Top](#top)


converts anything to an array
        
*Example*

```javascript
comb.array.toArray({a : "b", b : "c"}) => [["a","b"], ["b","c"]];
  comb.array.toArray("a") => ["a"]
  comb.array.toArray(["a"]) =>  ["a"];
  comb.array.toArray() => [];
  comb.array.toArray("a", {a : "b"}) => ["a", ["a", "b"]];
     
```

     
*Arguments*

        
 * _o_  : 
        
     
     

*Source*

```javascript
function (o){
   var ret = [];
   if (o != null) {
       var args = argsToArray(arguments);
       if (args.length == 1) {
           if (isArray(o)) {
               ret = o;
           } else if (obj.isHash(o)) {
               for (var i in o) {
                   if (o.hasOwnProperty(i)) {
                       ret.push([i, o[i]]);
                   }
               }
           } else {
               ret.push(o);
           }
       } else {
           args.forEach(function (a) {
               ret = ret.concat(array.toArray(a));
           })
       }
   }
   return ret;
       
}
```

  
<a name="comb_array_transpose"></a>

###*transpose*



---
*Defined base/array.js* [Top](#top)


Transposes an array of arrays
        
*Example*

```javascript
comb.array.transpose([[1,2,3], [4,5,6]]) => [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
 comb.array.transpose([[1,2], [3,4], [5,6]]) => [ [ 1, 3, 5 ], [ 2, 4, 6 ] ]
 comb.array.transpose([[1], [3,4], [5,6]]) => [[1]])


```

     
*Arguments*

        
 * _arr_ `Array[Array[]]` : Array of arrays
        
     
     

*Source*

```javascript
function (arr){
   var ret = [];
   if (isArray(arr) && arr.length) {
       var last;
       arr.forEach(function (a) {
           if (isArray(a) && (!last || a.length == last.length)) {
               a.forEach(function (b, i) {
                   !ret[i] && (ret[i] = []);
                   ret[i].push(b);
               });
               last = a;
           }
       });
   }
   return ret;
       
}
```

  
<a name="comb_array_union"></a>

###*union*



---
*Defined base/array.js* [Top](#top)


Union a variable number of arrays together
        
*Example*

```javascript
comb.array.union(['a','b','c'], ['b','c', 'd']) => ["a", "b", "c", "d"]
 comb.array.union(["a"], ["b"], ["c"], ["d"], ["c"]) => ["a", "b", "c", "d"]


```

     
*Arguments*

        
 * _arrs_  : variable number of arrays to union
        
     
     

*Source*

```javascript
function (){
   var ret = [];
   var arrs = argsToArray(arguments);
   if (arrs.length > 1) {
       ret = array.removeDuplicates(arrs.reduce(function (a, b) {
           return a.concat(b);
       }, []));
   }
   return ret;
       
}
```

  
<a name="comb_array_valuesAt"></a>

###*valuesAt*



---
*Defined base/array.js* [Top](#top)


Retrieves values at specified indexes in the array
        
*Example*

```javascript
var arr =["a", "b", "c", "d"]
   comb.array.valuesAt(arr, 1,2,3) => ["b", "c", "d"];
   comb.array.valuesAt(arr, 1,2,3, 4) => ["b", "c", "d", null];
   comb.array.valuesAt(arr, 0,3) => ["a", "d"];

  
```

     
*Arguments*

        
 * _arr_ `Array` : the array to retrieve values from
        
 * _indexes_ `Number` : variable number of indexes to retrieve
        
     
     

*Source*

```javascript
function (arr,indexes){
   var ret = [];
   var indexes = argsToArray(arguments);
   var arr = indexes.shift(), l = arr.length;
   if (isArray(arr) && indexes.length) {
       for (var i = 0; i &lt; indexes.length; i++) {
           ret.push(arr[indexes[i]] || null);
       }
   }
   return ret;
       
}
```

  
<a name="comb_array_zip"></a>

###*zip*



---
*Defined base/array.js* [Top](#top)


Zips to arrays together
        
*Example*

```javascript
var a = [ 4, 5, 6 ], b = [ 7, 8, 9 ]
  comb.array.zip([1], [2], [3]) => [[ 1, 2, 3 ]]);
  comb.array.zip([1,2], [2], [3]) => [[ 1, 2, 3 ],[2, null, null]]
  comb.array.zip([1,2,3], a, b) => [[1, 4, 7],[2, 5, 8],[3, 6, 9]]
  comb.array.zip([1,2], a, b) => [[1, 4, 7],[2, 5, 8]]
  comb.array.zip(a, [1,2], [8]) => [[4,1,8],[5,2,null],[6,null,null]]


```

     
*Arguments*

        
 * _arrays_  : variable number of arrays to zip together
        
     
     

*Source*

```javascript
function (){
   var ret = [];
   var arrs = argsToArray(arguments);
   if (arrs.length > 1) {
       var arr1 = arrs.shift();
       if (isArray(arr1)) {
           ret = arr1.reduce(function (a, b, i) {
               var curr = [b];
               for (var j = 0; j &lt; arrs.length; j++) {
                   var currArr = arrs[j];
                   if (isArray(currArr) && !misc.isUndefined(currArr[i])) {
                       curr.push(currArr[i]);
                   } else {
                       curr.push(null);
                   }
               }
               a.push(curr)
               return a;
           }, []);
       }
   }
   return ret;
       
}
```

  

<a name="comb_characters"></a>
##comb.characters

[Top](#top)

comb characters
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td><em>ALPHA</em></td><td>"α"</td><td>α</td><tr><tr><td><em>APPROX</em></td><td>"≈"</td><td>≈</td><tr><tr><td><em>A_E_LOWER</em></td><td>"æ"</td><td>æ</td><tr><tr><td><em>A_E_UPPER</em></td><td>"Æ"</td><td>Æ</td><tr><tr><td><em>A_LOWER_ACCENT</em></td><td>"á"</td><td>á</td><tr><tr><td><em>A_LOWER_CIRCLE_OVER</em></td><td>"å"</td><td>å</td><tr><tr><td><em>A_LOWER_CIRCUMFLEX</em></td><td>"â"</td><td>â</td><tr><tr><td><em>A_LOWER_GRAVE_ACCENT</em></td><td>"à"</td><td>à</td><tr><tr><td><em>A_LOWER_UMLAUT</em></td><td>"ä"</td><td>ä</td><tr><tr><td><em>A_SUPER</em></td><td>"ª"</td><td>ª</td><tr><tr><td><em>A_UPPER_CIRCLE</em></td><td>"Å"</td><td>Å</td><tr><tr><td><em>A_UPPER_UMLAUT</em></td><td>"Ä"</td><td>Ä</td><tr><tr><td><em>BECAUSE</em></td><td>"⌡"</td><td>⌡</td><tr><tr><td><em>BETA</em></td><td>"β"</td><td>β</td><tr><tr><td><em>BOLD_DOT</em></td><td>"∙"</td><td>∙</td><tr><tr><td><em>CENTS</em></td><td>"¢"</td><td>¢</td><tr><tr><td><em>CHECK</em></td><td>"√"</td><td>√</td><tr><tr><td><em>CHI_LOWER</em></td><td>"φ"</td><td>φ</td><tr><tr><td><em>CHI_UPPER</em></td><td>"χ"</td><td>χ</td><tr><tr><td><em>CIRCLE</em></td><td>"○"</td><td>○</td><tr><tr><td><em>CLOVE</em></td><td>"♣"</td><td>♣</td><tr><tr><td><em>COPYRIGHT</em></td><td>"©"</td><td>©</td><tr><tr><td><em>CUBED</em></td><td>"³"</td><td>³</td><tr><tr><td><em>CURRENCY</em></td><td>"¤"</td><td>¤</td><tr><tr><td><em>C_CEDILLA</em></td><td>"Ç"</td><td>Ç</td><tr><tr><td><em>C_LOWER_CIRCUMFLEX</em></td><td>"ç"</td><td>ç</td><tr><tr><td><em>DARK_SHADED_BOX</em></td><td>"▓"</td><td>▓</td><tr><tr><td><em>DEFINITION</em></td><td>"≡"</td><td>≡</td><tr><tr><td><em>DEGREE</em></td><td>"°"</td><td>°</td><tr><tr><td><em>DELTA</em></td><td>"δ"</td><td>δ</td><tr><tr><td><em>DIAMOND</em></td><td>"♦"</td><td>♦</td><tr><tr><td><em>DIVIDE</em></td><td>"÷"</td><td>÷</td><tr><tr><td><em>DOESNOT_EXIST</em></td><td>"∄"</td><td>∄</td><tr><tr><td><em>DOT</em></td><td>"•"</td><td>•</td><tr><tr><td><em>DOT_SMALL</em></td><td>"·"</td><td>·</td><tr><tr><td><em>DOUBLE_EIGHT_NOTE</em></td><td>"♫"</td><td>♫</td><tr><tr><td><em>DOUBLE_LEFT</em></td><td>"«"</td><td>«</td><tr><tr><td><em>DOUBLE_RIGHT</em></td><td>"»"</td><td>»</td><tr><tr><td><em>DOWN_ARROW</em></td><td>"↓"</td><td>↓</td><tr><tr><td><em>DOWN_TRIANGLE</em></td><td>"▼"</td><td>▼</td><tr><tr><td><em>EIGHT_NOTE</em></td><td>"♪"</td><td>♪</td><tr><tr><td><em>EPSILON</em></td><td>"ε"</td><td>ε</td><tr><tr><td><em>ESZETT</em></td><td>"ß"</td><td>ß</td><tr><tr><td><em>ETA</em></td><td>"η"</td><td>η</td><tr><tr><td><em>EXCLUSIVE_OR</em></td><td>"⊕"</td><td>⊕</td><tr><tr><td><em>EXISTS</em></td><td>"∃"</td><td>∃</td><tr><tr><td><em>E_ACCENT</em></td><td>"é"</td><td>é</td><tr><tr><td><em>E_LOWER_CIRCUMFLEX</em></td><td>"ê"</td><td>ê</td><tr><tr><td><em>E_LOWER_GRAVE_ACCENT</em></td><td>"è"</td><td>è</td><tr><tr><td><em>E_LOWER_UMLAUT</em></td><td>"ë"</td><td>ë</td><tr><tr><td><em>E_UPPER_ACCENT</em></td><td>"É"</td><td>É</td><tr><tr><td><em>FEMALE</em></td><td>"♀"</td><td>♀</td><tr><tr><td><em>FILLED_SQUARE_CIRCLE</em></td><td>"◙"</td><td>◙</td><tr><tr><td><em>FOR_ALL</em></td><td>"∀"</td><td>∀</td><tr><tr><td><em>FUNCTION</em></td><td>"ƒ"</td><td>ƒ</td><tr><tr><td><em>GAMMA</em></td><td>"γ"</td><td>γ</td><tr><tr><td><em>GT_EQ</em></td><td>"≥"</td><td>≥</td><tr><tr><td><em>HEART</em></td><td>"♥"</td><td>♥</td><tr><tr><td><em>HOUSE</em></td><td>"⌂"</td><td>⌂</td><tr><tr><td><em>INFINITY</em></td><td>"∞"</td><td>∞</td><tr><tr><td><em>INTERSECTION</em></td><td>"∩"</td><td>∩</td><tr><tr><td><em>IOTA</em></td><td>"ι"</td><td>ι</td><tr><tr><td><em>ITALIC_X</em></td><td>"✗"</td><td>✗</td><tr><tr><td><em>I_LOWER_ACCENT</em></td><td>"í"</td><td>í</td><tr><tr><td><em>I_LOWER_CIRCUMFLEX</em></td><td>"î"</td><td>î</td><tr><tr><td><em>I_LOWER_GRAVE_ACCENT</em></td><td>"ì"</td><td>ì</td><tr><tr><td><em>I_LOWER_UMLAUT</em></td><td>"ï"</td><td>ï</td><tr><tr><td><em>KAPPA</em></td><td>"κ"</td><td>κ</td><tr><tr><td><em>LAMBDA</em></td><td>"λ"</td><td>λ</td><tr><tr><td><em>LEFT_ARROW</em></td><td>"←"</td><td>←</td><tr><tr><td><em>LEFT_RIGHT_ARROW</em></td><td>"↔"</td><td>↔</td><tr><tr><td><em>LIGHT_SHADED_BOX</em></td><td>"░"</td><td>░</td><tr><tr><td><em>LT_EQ</em></td><td>"≤"</td><td>≤</td><tr><tr><td><em>MALE</em></td><td>"♂"</td><td>♂</td><tr><tr><td><em>MAZE_DOUBLE_BOTTOM_T</em></td><td>"╩"</td><td>╩</td><tr><tr><td><em>MAZE_DOUBLE_CROSS</em></td><td>"╬"</td><td>╬</td><tr><tr><td><em>MAZE_DOUBLE_HORIZONTAL</em></td><td>"═"</td><td>═</td><tr><tr><td><em>MAZE_DOUBLE_LEFT_BOTTOM</em></td><td>"╚"</td><td>╚</td><tr><tr><td><em>MAZE_DOUBLE_LEFT_CENTER</em></td><td>"╣"</td><td>╣</td><tr><tr><td><em>MAZE_DOUBLE_LEFT_T</em></td><td>"╠"</td><td>╠</td><tr><tr><td><em>MAZE_DOUBLE_LEFT_TOP</em></td><td>"╔"</td><td>╔</td><tr><tr><td><em>MAZE_DOUBLE_RIGHT_BOTTOM</em></td><td>"╝"</td><td>╝</td><tr><tr><td><em>MAZE_DOUBLE_RIGHT_TOP</em></td><td>"╗"</td><td>╗</td><tr><tr><td><em>MAZE_DOUBLE_TOP_T</em></td><td>"╦"</td><td>╦</td><tr><tr><td><em>MAZE_DOUBLE_VERTICAL</em></td><td>"║"</td><td>║</td><tr><tr><td><em>MAZE_SINGLE_BOTTOM_DOUBLECENTER_T</em></td><td>"╨"</td><td>╨</td><tr><tr><td><em>MAZE_SINGLE_BOTTOM_DOUBLE_T</em></td><td>"╧"</td><td>╧</td><tr><tr><td><em>MAZE_SINGLE_BOTTOM_T</em></td><td>"┴"</td><td>┴</td><tr><tr><td><em>MAZE_SINGLE_CENTER</em></td><td>"┼"</td><td>┼</td><tr><tr><td><em>MAZE_SINGLE_DOUBLECENTER_CENTER</em></td><td>"╫"</td><td>╫</td><tr><tr><td><em>MAZE_SINGLE_DOUBLECROSS_CENTER</em></td><td>"╪"</td><td>╪</td><tr><tr><td><em>MAZE_SINGLE_HORIZONTAL_LINE</em></td><td>"─"</td><td>─</td><tr><tr><td><em>MAZE_SINGLE_LEFT_BOTTOM_SMALL</em></td><td>"└"</td><td>└</td><tr><tr><td><em>MAZE_SINGLE_LEFT_CENTER</em></td><td>"╟"</td><td>╟</td><tr><tr><td><em>MAZE_SINGLE_LEFT_DOUBLEBOTTOM_TOP</em></td><td>"╓"</td><td>╓</td><tr><tr><td><em>MAZE_SINGLE_LEFT_DOUBLERIGHT_BOTTOM</em></td><td>"╘"</td><td>╘</td><tr><tr><td><em>MAZE_SINGLE_LEFT_DOUBLERIGHT_TOP</em></td><td>"╒"</td><td>╒</td><tr><tr><td><em>MAZE_SINGLE_LEFT_DOUBLETOP_BOTTOM</em></td><td>"╙"</td><td>╙</td><tr><tr><td><em>MAZE_SINGLE_LEFT_DOUBLE_T</em></td><td>"╞"</td><td>╞</td><tr><tr><td><em>MAZE_SINGLE_LEFT_T</em></td><td>"├"</td><td>├</td><tr><tr><td><em>MAZE_SINGLE_LEFT_TOP</em></td><td>"Γ"</td><td>Γ</td><tr><tr><td><em>MAZE_SINGLE_LEFT_TOP_SMALL</em></td><td>"┌"</td><td>┌</td><tr><tr><td><em>MAZE_SINGLE_RIGHT_BOTTOM</em></td><td>"╜"</td><td>╜</td><tr><tr><td><em>MAZE_SINGLE_RIGHT_BOTTOM_SMALL</em></td><td>"┘"</td><td>┘</td><tr><tr><td><em>MAZE_SINGLE_RIGHT_DOUBLEBOTTOM_TOP</em></td><td>"╖"</td><td>╖</td><tr><tr><td><em>MAZE_SINGLE_RIGHT_DOUBLECENTER_T</em></td><td>"╡"</td><td>╡</td><tr><tr><td><em>MAZE_SINGLE_RIGHT_DOUBLELEFT_TOP</em></td><td>"╕"</td><td>╕</td><tr><tr><td><em>MAZE_SINGLE_RIGHT_DOUBLE_BL</em></td><td>"╛"</td><td>╛</td><tr><tr><td><em>MAZE_SINGLE_RIGHT_DOUBLE_T</em></td><td>"╢"</td><td>╢</td><tr><tr><td><em>MAZE_SINGLE_RIGHT_TOP</em></td><td>"┐"</td><td>┐</td><tr><tr><td><em>MAZE_SINGLE_TOP_DOUBLECENTER_T</em></td><td>"╥"</td><td>╥</td><tr><tr><td><em>MAZE_SINGLE_TOP_DOUBLE_T</em></td><td>"╤"</td><td>╤</td><tr><tr><td><em>MAZE_SINGLE_TOP_T</em></td><td>"┬"</td><td>┬</td><tr><tr><td><em>MAZE__SINGLE_RIGHT_T</em></td><td>"┤"</td><td>┤</td><tr><tr><td><em>MEDIUM_SHADED_BOX</em></td><td>"▒"</td><td>▒</td><tr><tr><td><em>MU</em></td><td>"µ"</td><td>µ</td><tr><tr><td><em>NEGATION</em></td><td>"¬"</td><td>¬</td><tr><tr><td><em>NU</em></td><td>"ν"</td><td>ν</td><tr><tr><td><em>N_LOWER_TILDE</em></td><td>"ñ"</td><td>ñ</td><tr><tr><td><em>N_UPPER_TILDE</em></td><td>"Ñ"</td><td>Ñ</td><tr><tr><td><em>OMEGA</em></td><td>"Ω"</td><td>Ω</td><tr><tr><td><em>OMICRON</em></td><td>"ο"</td><td>ο</td><tr><tr><td><em>ONE_FOURTH</em></td><td>"¼"</td><td>¼</td><tr><tr><td><em>ONE_HALF</em></td><td>"½"</td><td>½</td><tr><tr><td><em>O_LOWER_ACCENT</em></td><td>"ó"</td><td>ó</td><tr><tr><td><em>O_LOWER_CIRCUMFLEX</em></td><td>"ô"</td><td>ô</td><tr><tr><td><em>O_LOWER_GRAVE_ACCENT</em></td><td>"ò"</td><td>ò</td><tr><tr><td><em>O_LOWER_UMLAUT</em></td><td>"ö"</td><td>ö</td><tr><tr><td><em>O_SUPER</em></td><td>"º"</td><td>º</td><tr><tr><td><em>O_UPPER_UMLAUT</em></td><td>"Ö"</td><td>Ö</td><tr><tr><td><em>PERMILE</em></td><td>"‰"</td><td>‰</td><tr><tr><td><em>PHI_LOWER</em></td><td>"φ"</td><td>φ</td><tr><tr><td><em>PHI_UPPER</em></td><td>"Φ"</td><td>Φ</td><tr><tr><td><em>PI</em></td><td>"π"</td><td>π</td><tr><tr><td><em>PILCROW</em></td><td>"¶"</td><td>¶</td><tr><tr><td><em>PLAY</em></td><td>"►"</td><td>►</td><tr><tr><td><em>PLUS_MINUS</em></td><td>"±"</td><td>±</td><tr><tr><td><em>POUND</em></td><td>"£"</td><td>£</td><tr><tr><td><em>PSI</em></td><td>"ψ"</td><td>ψ</td><tr><tr><td><em>PTS</em></td><td>"₧"</td><td>₧</td><tr><tr><td><em>REGISTERED_TM</em></td><td>"®"</td><td>®</td><tr><tr><td><em>REWIND</em></td><td>"◄"</td><td>◄</td><tr><tr><td><em>RHO</em></td><td>"ρ"</td><td>ρ</td><tr><tr><td><em>RIGHT_ANGLE</em></td><td>"∟"</td><td>∟</td><tr><tr><td><em>RIGHT_ARROW</em></td><td>"→"</td><td>→</td><tr><tr><td><em>SECTION</em></td><td>"§"</td><td>§</td><tr><tr><td><em>SIDEWAYS_L</em></td><td>"⌐"</td><td>⌐</td><tr><tr><td><em>SIGMA_LOWER</em></td><td>"σ"</td><td>σ</td><tr><tr><td><em>SIGMA_UPPER</em></td><td>"Σ"</td><td>Σ</td><tr><tr><td><em>SINCE</em></td><td>"∵"</td><td>∵</td><tr><tr><td><em>SMALL_UP_DOWN</em></td><td>"↨"</td><td>↨</td><tr><tr><td><em>SMILEY</em></td><td>"☺"</td><td>☺</td><tr><tr><td><em>SOLID_BOX</em></td><td>"■"</td><td>■</td><tr><tr><td><em>SOLID_RECTANGLE</em></td><td>"█"</td><td>█</td><tr><tr><td><em>SOLID_SMALL_RECTANGLE_BOTTOM</em></td><td>"▄"</td><td>▄</td><tr><tr><td><em>SOLID_SMALL_RECTANGLE_TOP</em></td><td>"▀"</td><td>▀</td><tr><tr><td><em>SOLID_SMILEY</em></td><td>"☻"</td><td>☻</td><tr><tr><td><em>SPADE</em></td><td>"♠"</td><td>♠</td><tr><tr><td><em>SQUARED</em></td><td>"²"</td><td>²</td><tr><tr><td><em>SQUARE_CIRCLE</em></td><td>"◘"</td><td>◘</td><tr><tr><td><em>SUN</em></td><td>"☼"</td><td>☼</td><tr><tr><td><em>SUPER_N</em></td><td>"ⁿ"</td><td>ⁿ</td><tr><tr><td><em>TAU</em></td><td>"τ"</td><td>τ</td><tr><tr><td><em>THEREFORE</em></td><td>"⌠"</td><td>⌠</td><tr><tr><td><em>THETA</em></td><td>"Θ"</td><td>Θ</td><tr><tr><td><em>THICK_LEFT_VERTICAL</em></td><td>"▌"</td><td>▌</td><tr><tr><td><em>THICK_MINUS</em></td><td>"▬"</td><td>▬</td><tr><tr><td><em>THICK_RIGHT_VERTICAL</em></td><td>"▐"</td><td>▐</td><tr><tr><td><em>TRADEMARK</em></td><td>"™"</td><td>™</td><tr><tr><td><em>TRIANGLE</em></td><td>"▲"</td><td>▲</td><tr><tr><td><em>UPSIDEDOWN_EXCLAMATION</em></td><td>"¡"</td><td>¡</td><tr><tr><td><em>UPSIDEDOWN_QUESTION</em></td><td>"¿"</td><td>¿</td><tr><tr><td><em>UPSILON</em></td><td>"υ"</td><td>υ</td><tr><tr><td><em>UP_ARROW</em></td><td>"↑"</td><td>↑</td><tr><tr><td><em>UP_DOWN</em></td><td>"↕"</td><td>↕</td><tr><tr><td><em>U_LOWER_ACCENT</em></td><td>"ú"</td><td>ú</td><tr><tr><td><em>U_LOWER_CIRCUMFLEX</em></td><td>"û"</td><td>û</td><tr><tr><td><em>U_LOWER_GRAVE_ACCENT</em></td><td>"ù"</td><td>ù</td><tr><tr><td><em>U_UMLAUT</em></td><td>"ü"</td><td>ü</td><tr><tr><td><em>U_UPPER_UMLAUT</em></td><td>"Ü"</td><td>Ü</td><tr><tr><td><em>VERTICAL_LINE</em></td><td>"│"</td><td>│</td><tr><tr><td><em>XI</em></td><td>"ξ"</td><td>ξ</td><tr><tr><td><em>YEN</em></td><td>"¥"</td><td>¥</td><tr><tr><td><em>Y_LOWER_UMLAUT</em></td><td>"ÿ"</td><td>ÿ</td><tr><tr><td><em>ZETA</em></td><td>"ζ"</td><td>ζ</td><tr></table>


  

<a name="comb_collections"></a>
##comb.collections

[Top](#top)

Various collections



  

<a name="comb_date"></a>
##comb.date

[Top](#top)

Utilities for Dates


  * [add](#comb_date_add)

  * [compare](#comb_date_compare)

  * [difference](#comb_date_difference)

  * [format](#comb_date_format)

  * [getDaysInMonth](#comb_date_getDaysInMonth)

  * [getTimezoneName](#comb_date_getTimezoneName)

  * [isLeapYear](#comb_date_isLeapYear)

  * [isWeekend](#comb_date_isWeekend)

  * [parse](#comb_date_parse)


  
<a name="comb_date_add"></a>

###*add*



---
*Defined base/date.js* [Top](#top)


Adds a specified interval and amount to a date
        
*Example*

```javascript
var dtA = new Date(2005, 11, 27);
  comb.date.add(dtA, "year", 1) => new Date(2006, 11, 27);
  comb.date.add(dtA, "years", 1) => new Date(2006, 11, 27);

  dtA = new Date(2000, 0, 1);
  comb.date.add(dtA, "quarter", 1) => new Date(2000, 3, 1);
  comb.date.add(dtA, "quarters", 1) => new Date(2000, 3, 1);

  dtA = new Date(2000, 0, 1);
  comb.date.add(dtA, "month", 1) => new Date(2000, 1, 1);
  comb.date.add(dtA, "months", 1) => new Date(2000, 1, 1);

  dtA = new Date(2000, 0, 31);
  comb.date.add(dtA, "month", 1) => new Date(2000, 1, 29);
  comb.date.add(dtA, "months", 1) => new Date(2000, 1, 29);

  dtA = new Date(2000, 0, 1);
  comb.date.add(dtA, "week", 1) => new Date(2000, 0, 8);
  comb.date.add(dtA, "weeks", 1) => new Date(2000, 0, 8);

  dtA = new Date(2000, 0, 1);
  comb.date.add(dtA, "day", 1) => new Date(2000, 0, 2);

  dtA = new Date(2000, 0, 1);
  comb.date.add(dtA, "weekday", 1) => new Date(2000, 0, 3);

  dtA = new Date(2000, 0, 1, 11);
  comb.date.add(dtA, "hour", 1) => new Date(2000, 0, 1, 12);

  dtA = new Date(2000, 11, 31, 23, 59);
  comb.date.add(dtA, "minute", 1) => new Date(2001, 0, 1, 0, 0);

  dtA = new Date(2000, 11, 31, 23, 59, 59);
  comb.date.add(dtA, "second", 1) => new Date(2001, 0, 1, 0, 0, 0);

  dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
  comb.date.add(dtA, "millisecond", 1) => new Date(2001, 0, 1, 0, 0, 0, 0);


```

     
*Arguments*

        
 * _date_ `Date` : 
        
 * _interval_ `String` : the interval to add   <ul>       <li>day | days</li>       <li>weekday | weekdays</li>       <li>year | years</li>       <li>week | weeks</li>       <li>quarter | quarters</li>       <li>months | months</li>       <li>hour | hours</li>       <li>minute | minutes</li>       <li>second | seconds</li>       <li>millisecond | milliseconds</li>   </ul>
        
 * _[amount=0]_ `Number` : the amount to add
        
     
     

*Source*

```javascript
function (/*Date*/date,/*String*/interval,/*int*/amount){
   amount = amount | 0
   var sum = new Date(date);
   var fixOvershoot = false;
   var property = "Date";
   //noinspection FallthroughInSwitchStatementJS
   switch (interval) {
       case "day":
       case "days" :
           break;
       case "weekday":
       case "weekdays":
           // Divide the increment time span into weekspans plus leftover days
           // e.g., 8 days is one 5-day weekspan / and two leftover days
           // Can't have zero leftover days, so numbers divisible by 5 get
           // a days value of 5, and the remaining days make up the number of weeks
           var days, weeks, mod = amount % 5, strt = date.getDay(), adj = 0;
           if (!mod) {
               days = (amount > 0) ? 5 : -5;
               weeks = (amount > 0) ? ((amount - 5) / 5) : ((amount + 5) / 5);
           } else {
               days = mod;
               weeks = parseInt(amount / 5);
           }
           if (strt == 6 && amount > 0) {
               adj = 1;
           } else if (strt == 0 && amount &lt; 0) {
               // Orig date is Sun / negative increment
               // Jump back over Sat
               adj = -1;
           }
           // Get weekday val for the new date
           var trgt = strt + days;
           // New date is on Sat or Sun
           if (trgt == 0 || trgt == 6) {
               adj = (amount > 0) ? 2 : -2;
           }
           // Increment by number of weeks plus leftover days plus
           // weekend adjustments
           amount = (7 * weeks) + days + adj;
           break;
       case "year":
       case "years":
           property = "FullYear";
           fixOvershoot = true;
           break;
       case "week":
       case "weeks":
           amount *= 7;
           break;
       case "quarter":
       case "quarters" :
           // Naive quarter is just three months
           amount *= 3;
       case "month":
       case "months":
           // Reset to last day of month if you overshoot
           fixOvershoot = true;
           property = "Month";
           break;
       default:
           interval = interval.replace(/s$/, "");
           property = "UTC" + interval.charAt(0).toUpperCase() + interval.substring(1) + "s";
   }
   if (property) {
       sum["set" + property](sum["get" + property]() + amount);
   }
   if (fixOvershoot && (sum.getDate() &lt; date.getDate())) {
       sum.setDate(0);
   }
   return sum; // Date
       
}
```

  
<a name="comb_date_compare"></a>

###*compare*



---
*Defined base/date.js* [Top](#top)


Compares two dates
        
*Example*

```javascript
var d1 = new Date();
 d1.setHours(0);
 comb.date.compare(d1, d1) => 0

  var d1 = new Date();
  d1.setHours(0);
  var d2 = new Date();
  d2.setFullYear(2005);
  d2.setHours(12);
  comb.date.compare(d1, d2, "date") => 1
  comb.date.compare(d1, d2, "datetime") => 1

  var d1 = new Date();
  d1.setHours(0);
  var d2 = new Date();
  d2.setFullYear(2005);
  d2.setHours(12);
  comb.date.compare(d2, d1, "date"), -1);
  comb.date.compare(d1, d2, "time"), -1);


```

     
*Arguments*

        
 * _date1_ `Date|String` : the date to comapare
        
 * _[date2=new Date()]_ `Date|String` : the date to compare date1 againse
        
 * _portion_ `"date"|"time"|"datetime"` : compares the portion specified
        
     
     
*Returns*

        
 *  -1 if date1 is < date2 0 if date1 === date2  1 if date1 > date2
        
     

*Source*

```javascript
function (/*Date*/date1,/*Date*/date2,/*String*/portion){
   date1 = new Date(date1);
   date2 = new Date((date2 || new Date()));
   if (portion == "date") {
       // Ignore times and compare dates.
       date1.setHours(0, 0, 0, 0);
       date2.setHours(0, 0, 0, 0);
   } else if (portion == "time") {
       // Ignore dates and compare times.
       date1.setFullYear(0, 0, 0);
       date2.setFullYear(0, 0, 0);
   }
   var ret = 0;
   date1 > date2 && (ret = 1);
   date1 &lt; date2 && (ret = -1);
   return ret; // int
       
}
```

  
<a name="comb_date_difference"></a>

###*difference*



---
*Defined base/date.js* [Top](#top)


Finds the difference between two dates based on the specified interval
        
*Example*

```javascript
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

     
*Arguments*

        
 * _date1_ `Date` : 
        
 * _[date2 = new Date()]_ `Date` : 
        
 * _[interval = &quot;day&quot;]_ `String` : the intercal to find the difference of.
   <ul>
      <li>day | days</li>
      <li>weekday | weekdays</li>
      <li>year | years</li>
      <li>week | weeks</li>
      <li>quarter | quarters</li>
      <li>months | months</li>
      <li>hour | hours</li>
      <li>minute | minutes</li>
      <li>second | seconds</li>
      <li>millisecond | milliseconds</li>
  </ul>
        
     
     

*Source*

```javascript
function (/*Date*/date1,/*Date?*/date2,/*String*/interval,utc){
   date2 = date2 || new Date();
   interval = interval || "day";
   var yearDiff = date2.getFullYear() - date1.getFullYear();
   var delta = 1; // Integer return value
   switch (interval) {
       case "quarter":
       case "quarters":
           var m1 = date1[utc ? "getUTCMonth" : "getMonth"]();
           var m2 = date2[utc ? "getUTCMonth" : "getMonth"]();
           // Figure out which quarter the months are in
           var q1 = floor(m1 / 3) + 1;
           var q2 = floor(m2 / 3) + 1;
           // Add quarters for any year difference between the dates
           q2 += (yearDiff * 4);
           delta = q2 - q1;
           break;
       case "weekday":
       case "weekdays":
           var days = round(date.difference(date1, date2, "day", utc));
           var weeks = parseInt(date.difference(date1, date2, "week", utc));
           var mod = days % 7;
           // Even number of weeks
           if (mod == 0) {
               days = weeks * 5;
           } else {
               // Weeks plus spare change (&lt; 7 days)
               var adj = 0;
               var aDay = date1[utc ? "getUTCDay" : "getDay"]();
               var bDay = date2[utc ? "getUTCDay" : "getDay"]();
               weeks = parseInt(days / 7);
               mod = days % 7;
               // Mark the date advanced by the number of
               // round weeks (may be zero)
               var dtMark = new Date(date1);
               dtMark.setDate(dtMark[utc ? "getUTCDate" : "getDate"]() + (weeks * 7));
               var dayMark = dtMark[utc ? "getUTCDay" : "getDay"]();
               // Spare change days -- 6 or less
               if (days > 0) {
                   switch (true) {
                       // Range starts on Sat
                       case (aDay == 6 || bDay == 6):
                           adj = -1;
                           break;
                       // Range starts on Sun
                       case aDay == 0:
                           adj = 0;
                           break;
                       // Range ends on Sun
                       case bDay == 0:
                           adj = -2;
                           break;
                       // Range contains weekend
                       case (dayMark + mod) > 5:
                           adj = -2;
                   }
               } else if (days &lt; 0) {
                   switch (true) {
                       // Range starts on Sat
                       case aDay == 6:
                           adj = 0;
                           break;
                       // Range starts on Sun
                       case aDay == 0:
                           adj = 1;
                           break;
                       // Range ends on Sat
                       case bDay == 6:
                           adj = 2;
                           break;
                       // Range ends on Sun
                       case bDay == 0:
                           adj = 1;
                           break;
                       // Range contains weekend
                       case (dayMark + mod) &lt; 0:
                           adj = 2;
                   }
               }
               days += adj;
               days -= (weeks * 2);
           }
           delta = days;
           break;
       case "year":
       case "years":
           delta = yearDiff;
           break;
       case "month":
       case "months":
           var m1 = date1[utc ? "getUTCMonth" : "getMonth"]();
           var m2 = date2[utc ? "getUTCMonth" : "getMonth"]();
           delta = (m2 - m1) + (yearDiff * 12);
           break;
       case "week":
       case "weeks":
           delta = parseInt(date.difference(date1, date2, "day", utc) / 7);
           break;
       case "day":
       case "days":
           delta /= 24;
       case "hour":
       case "hours":
           delta /= 60;
       case "minute":
       case "minutes":
           delta /= 60;
       case "second":
       case "seconds":
           delta /= 1000;
       case "millisecond":
       case "milliseconds":
           delta *= date2.getTime() - date1.getTime();
   }
   // Round for fractional values and DST leaps
   return round(delta); // Number (integer)
       
}
```

  
<a name="comb_date_format"></a>

###*format*



---
*Defined base/date.js* [Top](#top)


Formats a date to the specidifed format string
        
*Example*

```javascript
var date = new Date(2006, 7, 11, 0, 55, 12, 345);
 comb.date.format(date, "EEEE, MMMM dd, yyyy") => "Friday, August 11, 2006"
 comb.date.format(date, "M/dd/yy") => "8/11/06"
 comb.date.format(date, "E") => "6"
 comb.date.format(date, "h:m a") => "12:55 AM"
 comb.date.format(date, 'h:m:s') => "12:55:12"
 comb.date.format(date, 'h:m:s.SS') => "12:55:12.35"
 comb.date.format(date, 'k:m:s.SS') => "24:55:12.35"
 comb.date.format(date, 'H:m:s.SS') => "0:55:12.35"
 comb.date.format(date, "ddMMyyyy") => "11082006"


```

     
*Arguments*

        
 * _date_  : the date to format
        
 * _format_ `String` : the format of the date composed of the following options  <ul>                   <li> G    Era designator    Text    AD</li>                   <li> y    Year    Year    1996; 96</li>                   <li> M    Month in year    Month    July; Jul; 07</li>                   <li> w    Week in year    Number    27</li>                   <li> W    Week in month    Number    2</li>                   <li> D    Day in year    Number    189</li>                   <li> d    Day in month    Number    10</li>                   <li> E    Day in week    Text    Tuesday; Tue</li>                   <li> a    Am/pm marker    Text    PM</li>                   <li> H    Hour in day (0-23)    Number    0</li>                   <li> k    Hour in day (1-24)    Number    24</li>                   <li> K    Hour in am/pm (0-11)    Number    0</li>                   <li> h    Hour in am/pm (1-12)    Number    12</li>                   <li> m    Minute in hour    Number    30</li>                   <li> s    Second in minute    Number    55</li>                   <li> S    Millisecond    Number    978</li>                   <li> z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00</li>                   <li> Z    Time zone    RFC 822 time zone    -0800 </li>  </ul>
        
     
     

*Source*

```javascript
function (date,format,utc){
   utc = utc || false;
   var fullYear, month, day, d, hour, minute, second, millisecond;
   if (utc) {
       fullYear = date.getUTCFullYear(),
           month = date.getUTCMonth(),
           day = date.getUTCDay(),
           d = date.getUTCDate(),
           hour = date.getUTCHours(),
           minute = date.getUTCMinutes(),
           second = date.getUTCSeconds(),
           millisecond = date.getUTCMilliseconds();
   } else {
       fullYear = date.getFullYear(),
           month = date.getMonth(),
           d = date.getDate(),
           day = date.getDay(),
           hour = date.getHours(),
           minute = date.getMinutes(),
           second = date.getSeconds(),
           millisecond = date.getMilliseconds();
   }
   return format.replace(/([a-z])\1*/ig, function (match, options) {
       var s, pad, h,
           c = match.charAt(0),
           l = match.length;
       switch (c) {
           case 'd':
               s = "" + d;
           case 'H':
               !s && (s = "" + hour);
           case 'm':
               !s && (s = "" + minute);
           case 's':
               !s && (s = "" + second);
               pad = true;
               break;
           case 'G':
               s = ((l &lt; 4) ? eraAbbr : eraNames)[fullYear &lt; 0 ? 0 : 1];
               break;
           case 'y':
               s = fullYear;
               if (l > 1) {
                   l == 2 ? s = string.truncate("" + s, 2, true) : pad = true;
               }
               break;
           case 'Q':
           case 'q':
               s = ceil((month + 1) / 3);
               pad = true;
               break;
           case 'M':
               if (l &lt; 3) {
                   s = month + 1;
                   pad = true;
               } else {
                   s = (l == 3 ? monthAbbr : monthNames)[month];
               }
               break;
           case 'w':
               s = getWeekOfYear(date, 0, utc), pad = true;
               break;
           case 'D':
               s = getDayOfYear(date, utc), pad = true;
               break;
           case 'E':
               if (l &lt; 3) {
                   s = day + 1;
                   pad = true;
               } else {
                   s = (l == 3 ? dayAbbr : dayNames)[day];
               }
               break;
           case 'a':
               s = (hour &lt; 12) ? 'AM' : 'PM';
               break;
           case 'h':
               s = (hour % 12) || 12, pad = true;
               break;
           case 'K':
               s = (hour % 12), pad = true;
               break;
           case 'k':
               s = hour || 24, pad = true;
               break;
           case 'S':
               s = round(millisecond * pow(10, l - 3)), pad = true;
               break;
           case 'v':
           case 'z':
               s = comb.date.getTimezoneName(date);
               if (s) {
                   break;
               }
               l = 4;
           // fallthrough... use GMT if tz not available
           case 'Z':
               var offset = date.getTimezoneOffset();
               var tz = [
                   (offset >= 0 ? "-" : "+"),
                   string.pad(floor(abs(offset) / 60), 2, "0"),
                   string.pad(abs(offset) % 60, 2, "0")
               ];
               if (l == 4) {
                   tz.splice(0, 0, "GMT");
                   tz.splice(3, 0, ":");
               }
               s = tz.join("");
               break;
   //				case 'Y': case 'u': case 'W': case 'F': case 'g': case 'A': case 'e':
   //					console.log(match+" modifier unimplemented");
           default:
               s = match;
           //  throw new Error("comb.date.format: invalid pattern char: " + match);
       }
       if (pad) {
           s = string.pad(s, l, '0');
       }
       return s;
   });
       
}
```

  
<a name="comb_date_getDaysInMonth"></a>

###*getDaysInMonth*



---
*Defined base/date.js* [Top](#top)


Returns the number of days in the month of a date
        
*Example*

```javascript
comb.date.getDaysInMonth(new Date(2006, 1, 1)) => 28
  comb.date.getDaysInMonth(new Date(2004, 1, 1)) => 29
  comb.date.getDaysInMonth(new Date(2006, 2, 1)) => 31
  comb.date.getDaysInMonth(new Date(2006, 3, 1)) => 30
  comb.date.getDaysInMonth(new Date(2006, 4, 1)) => 31
  comb.date.getDaysInMonth(new Date(2006, 5, 1)) => 30
  comb.date.getDaysInMonth(new Date(2006, 6, 1)) => 31

```

     
*Arguments*

        
 * _dateObject_ `Date` : the date containing the month
        
     
     
*Returns*

        
 * `Number` the number of days in the month
        
     

*Source*

```javascript
function (/*Date*/dateObject){
   //	summary:
   //		Returns the number of days in the month used by dateObject
   var month = dateObject.getMonth();
   var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   if (month == 1 && date.isLeapYear(dateObject)) {
       return 29;
   } // Number
   return days[month]; // Number
       
}
```

  
<a name="comb_date_getTimezoneName"></a>

###*getTimezoneName*



---
*Defined base/date.js* [Top](#top)


Get the timezone of a date
        
*Example*

```javascript
//just setting the strLocal to simulate the toString() of a date
  dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
  //just setting the strLocal to simulate the locale
  dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
  comb.date.getTimezoneName(dt) => 'CDT'
  dt.str = 'Sun Sep 17 2006 22:57:18 GMT-0500 (CDT)';
  dt.strLocale = 'Sun Sep 17 22:57:18 2006';
  comb.date.getTimezoneName(dt) => 'CDT'

```

     
*Arguments*

        
 * _dateObject_  : the date to get the timezone from
        
     
     
*Returns*

        
 * `String` the timezone of the date
        
     

*Source*

```javascript
function (/*Date*/dateObject){
   var str = dateObject.toString();
   var tz = '';
   var pos = str.indexOf('(');
   if (pos > -1) {
       tz = str.substring(++pos, str.indexOf(')'));
   }
   return tz; // String
       
}
```

  
<a name="comb_date_isLeapYear"></a>

###*isLeapYear*



---
*Defined base/date.js* [Top](#top)


Determines if a date is a leap year
        
*Example*

```javascript
comb.date.isLeapYear(new Date(1600, 0, 1)) => true
  comb.date.isLeapYear(new Date(2004, 0, 1)) => true
  comb.date.isLeapYear(new Date(2000, 0, 1)) => true
  comb.date.isLeapYear(new Date(2006, 0, 1)) => false
  comb.date.isLeapYear(new Date(1900, 0, 1)) => false
  comb.date.isLeapYear(new Date(1800, 0, 1)) => false
  comb.date.isLeapYear(new Date(1700, 0, 1)) => false


```

     
*Arguments*

        
 * _dateObject_ `Date` : 
        
     
     
*Returns*

        
 * `Boolean` true if it is a leap year false otherwise
        
     

*Source*

```javascript
function (/*Date*/dateObject,utc){
   var year = dateObject[utc ? "getUTCFullYear" : "getFullYear"]();
   return !(year % 400) || (!(year % 4) && !!(year % 100)); // Boolean
       
}
```

  
<a name="comb_date_isWeekend"></a>

###*isWeekend*



---
*Defined base/date.js* [Top](#top)


Determines if a date is on a weekend
        
*Example*

```javascript
var thursday = new Date(2006, 8, 21);
 var saturday = new Date(2006, 8, 23);
 var sunday = new Date(2006, 8, 24);
 var monday = new Date(2006, 8, 25);
 comb.date.isWeekend(thursday)) => false
 comb.date.isWeekend(saturday) => true
 comb.date.isWeekend(sunday) => true
 comb.date.isWeekend(monday)) => false


```

     
*Arguments*

        
 * _dateObject_ `Date` : the date to test
        
     
     
*Returns*

        
 * `Boolean` true if the date is a weekend
        
     

*Source*

```javascript
function (/*Date?*/dateObject,utc){
   // summary:
   //	Determines if the date falls on a weekend, according to local custom.
   var day = (dateObject || new Date())[utc ? "getUTCDay" : "getDay"]();
   return day == 0 || day == 6;
       
}
```

  
<a name="comb_date_parse"></a>

###*parse*



---
*Defined base/date.js* [Top](#top)


Parses a date string into a date object
        
*Example*

```javascript
var aug_11_2006 = new Date(2006, 7, 11, 0);
  comb.date.parse("08/11/06", "MM/dd/yy") => aug_11_2006
  comb.date.parse("11Aug2006", 'ddMMMyyyy') => aug_11_2006
  comb.date.parse("Aug2006", 'MMMyyyy') => new Date(2006, 7, 1)
  comb.date.parse("Aug 11, 2006", "MMM dd, yyyy") => aug_11_2006
  comb.date.parse("August 11, 2006", "MMMM dd, yyyy") => aug_11_2006
  comb.date.parse("Friday, August 11, 2006", "EEEE, MMMM dd, yyyy") => aug_11_2006


```

     
*Arguments*

        
 * _dateStr_ `String` : The string to parse
        
 * _format_ `String` : the format of the date composed of the following options  <ul>                   <li> G    Era designator    Text    AD</li>                   <li> y    Year    Year    1996; 96</li>                   <li> M    Month in year    Month    July; Jul; 07</li>                   <li> w    Week in year    Number    27</li>                   <li> W    Week in month    Number    2</li>                   <li> D    Day in year    Number    189</li>                   <li> d    Day in month    Number    10</li>                   <li> E    Day in week    Text    Tuesday; Tue</li>                   <li> a    Am/pm marker    Text    PM</li>                   <li> H    Hour in day (0-23)    Number    0</li>                   <li> k    Hour in day (1-24)    Number    24</li>                   <li> K    Hour in am/pm (0-11)    Number    0</li>                   <li> h    Hour in am/pm (1-12)    Number    12</li>                   <li> m    Minute in hour    Number    30</li>                   <li> s    Second in minute    Number    55</li>                   <li> S    Millisecond    Number    978</li>                   <li> z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00</li>                   <li> Z    Time zone    RFC 822 time zone    -0800 </li>  </ul>
        
     
     
*Returns*

        
 * `Date` the parsed date
        
     

*Source*

```javascript
function (dateStr,format){
   if (!format) throw new Error('format required when calling comb.date.parse');
   var tokens = [], regexp = buildDateEXP(format, tokens),
       re = new RegExp("^" + regexp + "$", "i"),
       match = re.exec(dateStr);
   if (!match) {
       return null;
   } // null
   var result = [1970, 0, 1, 0, 0, 0, 0], // will get converted to a Date at the end
       amPm = "",
       valid = match.every(function (v, i) {
           if (!i) {
               return true;
           }
           var token = tokens[i - 1];
           var l = token.length;
           switch (token.charAt(0)) {
               case 'y':
                   if (v &lt; 100) {
                       v = parseInt(v, 10);
                       //choose century to apply, according to a sliding window
                       //of 80 years before and 20 years after present year
                       var year = '' + new Date().getFullYear(),
                           century = year.substring(0, 2) * 100,
                           cutoff = min(year.substring(2, 4) + 20, 99);
                       result[0] = (v &lt; cutoff) ? century + v : century - 100 + v;
                   } else {
                       result[0] = v;
                   }
                   break;
               case 'M':
                   if (l > 2) {
                       var months = monthNames;
                       if (l === 3) {
                           months = monthAbbr;
                       }
                       //Tolerate abbreviating period in month part
                       //Case-insensitive comparison
                       v = v.replace(".", "").toLowerCase();
                       months = months.map(function (s) {
                           return s.replace(".", "").toLowerCase();
                       });
                       if ((v = months.indexOf(v)) == -1) {
                           return false;
                       }
                   } else {
                       v--;
                   }
                   result[1] = v;
                   break;
               case 'E':
               case 'e':
                   var days = dayNames;
                   if (l == 3) {
                       days = dayAbbr;
                   }
                   //Case-insensitive comparison
                   v = v.toLowerCase();
                   days = days.map(function (d) {
                       return d.toLowerCase();
                   });
                   var d = days.indexOf(v);
                   if (d == -1) {
                       v = parseInt(v);
                       if (isNaN(v) || v > days.length) {
                           return false;
                       }
                   } else {
                       v = d;
                   }
                   break;
               case 'D':
                   result[1] = 0;
               case 'd':
                   result[2] = v;
                   break;
               case 'a': //am/pm
                   var am = "am";
                   var pm = "pm";
                   var period = /\./g;
                   v = v.replace(period, '').toLowerCase();
                   // we might not have seen the hours field yet, so store the state and apply hour change later
                   amPm = (v == pm) ? 'p' : (v == am) ? 'a' : '';
                   break;
               case 'k': //hour (0-11)
                   if (v == 24) {
                       v = 0;
                   }
               // fallthrough...
               case 'h': //hour (1-12)
               case 'H': //hour (0-23)
               case 'K': //hour (0-11)
                   //in the 12-hour case, adjusting for am/pm requires the 'a' part
                   //which could come before or after the hour, so we will adjust later
                   result[3] = v;
                   break;
               case 'm': //minutes
                   result[4] = v;
                   break;
               case 's': //seconds
                   result[5] = v;
                   break;
               case 'S': //milliseconds
                   result[6] = v;
                   break;
           }
           return true;
       });
   if (valid) {
       var hours = +result[3];
       //account for am/pm
       if (amPm === 'p' && hours &lt; 12) {
           result[3] = hours + 12; //e.g., 3pm -> 15
       } else if (amPm === 'a' && hours == 12) {
           result[3] = 0; //12am -> 0
       }
       var dateObject = new Date(result[0], result[1], result[2], result[3], result[4], result[5], result[6]); // Date
       var dateToken = (tokens.indexOf('d') != -1),
           monthToken = (tokens.indexOf('M') != -1),
           month = result[1],
           day = result[2],
           dateMonth = dateObject.getMonth(),
           dateDay = dateObject.getDate();
       if ((monthToken && dateMonth > month) || (dateToken && dateDay > day)) {
           return null;
       }
       return dateObject; // Date
   } else {
       return null;
   }
       
}
```

  

<a name="comb_logging"></a>
##comb.logging

[Top](#top)

logging package



  

<a name="comb_logging_appenders"></a>
##comb.logging.appenders

[Top](#top)

appenders for logging



  

<a name="comb_number"></a>
##comb.number

[Top](#top)

Utilities for numbers


  * [round](#comb_number_round)

  * [roundCeil](#comb_number_roundCeil)


  
<a name="comb_number_round"></a>

###*round*



---
*Defined base/number.js* [Top](#top)


Rounds a number to the specified places.
        
     
*Arguments*

        
 * _num_ `Number` : the number to round.
        
 * _places_ `Number` : the number of places to round to.
        
     
     

*Source*

```javascript
function (number,places,increment){
   increment = increment || 1e-20;
   var factor = 10 / (10 * (increment || 10));
   return (Math.ceil(factor * +number) / factor).toFixed(places) * 1; // Number
       
}
```

  
<a name="comb_number_roundCeil"></a>

###*roundCeil*



---
*Defined base/number.js* [Top](#top)


Rounds a number to the specified places, rounding up.
        
     
*Arguments*

        
 * _num_ `Number` : the number to round.
        
 * _places_ `Number` : the number of places to round to.
        
     
     

*Source*

```javascript
function (number,places){
   return Math.ceil(number * Math.pow(10, places))/Math.pow(10, places);
       
}
```

  

<a name="comb_plugins"></a>
##comb.plugins

[Top](#top)

plugins for classes using [comb.define](#comb_define)



  

<a name="comb_regexp"></a>
##comb.regexp

[Top](#top)

Regeular expression utilities


  * [escapeString](#comb_regexp_escapeString)


  
<a name="comb_regexp_escapeString"></a>

###*escapeString*



---
*Defined base/regexp.js* [Top](#top)


Escapes a string
        
     
*Arguments*

        
 * _str_ `String` : the string to escape
        
 * _except?_ `String` : characters to ignore
        
     
     
*Returns*

        
 * `String` the escaped string
        
     

*Source*

```javascript
function (/*String*/str,/*String?*/except){
   return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch) {
       if (except && except.indexOf(ch) != -1) {
           return ch;
       }
       return "\\" + ch;
   }); // String
       
}
```

  

<a name="comb_string"></a>
##comb.string

[Top](#top)

String utilities


  * [format](#comb_string_format)

  * [multiply](#comb_string_multiply)

  * [pad](#comb_string_pad)

  * [style](#comb_string_style)

  * [toArray](#comb_string_toArray)

  * [truncate](#comb_string_truncate)


  
<a name="comb_string_format"></a>

###*format*



---
*Defined base/string.js* [Top](#top)


Formats a string with the specified format
        
*Example*

```javascript
var format = comb.string.format;

  format("%s, %s", ["Hello", "World"]) => "Hello, World";
  format("%[ 10]s, %[- 10]s", ["Hello", "World"])
      => "     Hello, World     ";
  format("%-!10s, %#10s, %10s and %-10s",
                          "apple", "orange", "bananas", "watermelons")
      => "apple!!!!!, ####orange,    bananas and watermelon"
  format("%+d, %+d, %10d, %-10d, %-+#10d, %10d",
                          1,-2, 1, 2, 3, 100000000000)
      => "+1, -2, 0000000001, 2000000000, +3########, 1000000000"
  format("%[h:mm a]D", [date]) => 7:32 PM - local -
  format("%[h:mm a]Z", [date]) => 12:32 PM - UTC
  //When using object formats they must be in an array otherwise
  //format will try to interpolate the properties into the string.
  format("%j", [{a : "b"}])
      => '{"a":"b"}'
  format("%1j, %4j", [{a : "b"}, {a : "b"}])
      => '{\n "a": "b"\n},\n{\n    "a": "b"\n}'
  format("{hello}, {world}", {hello : "Hello", world : "World")
      => "Hello, World";
  format({[-s10]apple}, {[%#10]orange}, {[10]banana} and {[-10]watermelons}",
                      {
                          apple : "apple",
                          orange : "orange",
                          banana : "bananas",
                          watermelons : "watermelons"
        });
      => applesssss, ####orange,    bananas and watermelon


```

     
*Arguments*

        
 * _str_ `String` : the string to format, if you want to use a spacing character as padding (other than \\s) then put your format in brackets.   <ol>       <li>String Formats %[options]s</li>           <ul>               <li>- : left justified</li>               <li>Char : padding character <b>Excludes d,j,s</b></li>               <li>Number : width</li>           </ul>       </li>       <li>Number Formats %[options]d</li>           <ul>               <li>- : left justified</li>               <li>+ : signed number</li>               <li>Char : padding character <b>Excludes d,j,s</b></li>               <li>Number : width</li>           </ul>       </li>       <li>Object Formats %[options]j</li>           <ul>               <li>Number : spacing for object properties.</li>           </ul>       </li>   </ol>
        
 * _obj_ `Object|Array|Arguments...` : the parameters to replace in the string                                     if an array is passed then the array is used sequentially                                     if an object is passed then the object keys are used                                     if a variable number of args are passed then they are used like an array
        
     
     
*Returns*

        
 * `String` the formatted string
        
     

*Source*

```javascript
function (str,obj){
   !date && (date = require("./date"));
   if (obj instanceof Array) {
       var i = 0, len = obj.length;
       //find the matches
       return str.replace(FORMAT_REGEX, function (m, format, type) {
           var replacer, ret;
           if (i &lt; len) {
               replacer = obj[i++];
           } else {
               //we are out of things to replace with so
               //just return the match?
               return m;
           }
           if (m == "%s" || m == "%d" || m == "%D") {
               //fast path!
               ret = replacer;
           } else if (m == "%Z") {
               ret = replacer.toUTCString();
           } else if (m == "%j") {
               try {
                   ret = JSON.stringify(replacer);
               } catch (e) {
                   throw new Error("comb.string.format : Unable to parse json from ", replacer);
               }
           } else {
               format = format.replace(/^\[|\]$/g, "");
               switch (type) {
                   case "s":
                       ret = formatString(replacer, format);
                       break;
                   case "d":
                       ret = formatNumber(replacer, format);
                       break;
                   case "j":
                       ret = formatObject(replacer, format);
                       break;
                   case "D":
                       ret = date.date.format(replacer, format);
                       break;
                   case "Z":
                       ret = date.date.format(replacer, format, true);
                       break;
               }
           }
           return ret;
       });
   } else if (typeof obj == "object") {
       return str.replace(INTERP_REGEX, function (m, format, value) {
           value = obj[value];
           if (!misc.isUndefined(value)) {
               if (format) {
                   if (comb.isString(value)) {
                       return formatString(value, format);
                   } else if (typeof value == "number") {
                       return formatNumber(value, format);
                   } else if (date.isDate(value)) {
                       return date.date.format(value, format);
                   } else if (typeof value == "object") {
                       return formatObject(value, format);
                   }
               } else {
                   return "" + value;
               }
           }
           return m;
       });
   } else {
       var args = Array.prototype.slice.call(arguments).slice(1);
       return exports.string.format(str, args);
   }
       
}
```

  
<a name="comb_string_multiply"></a>

###*multiply*



---
*Defined base/string.js* [Top](#top)


Returns a string duplicated n times;
        
*Example*

```javascript
comb.string.multiply("HELLO", 5) => "HELLOHELLOHELLOHELLOHELLO"



```

     
*Arguments*

        
 * _str_ `String` : the string to multiply
        
 * _times_ `Number` : the number of times to multiply it by
        
     
     
*Returns*

        
 * `String` a string that is the original string multiplied. If times is zero or omitted then the
 return will be an empty string.
        
     

*Source*

```javascript
function (str,times){
   var ret = [];
   if (times) {
       for (var i = 0; i &lt; times; i++) {
           ret.push(str);
       }
   }
   return ret.join("");
       
}
```

  
<a name="comb_string_pad"></a>

###*pad*



---
*Defined base/string.js* [Top](#top)


Pads a string
        
*Example*

```javascript
comb.string.pad("STR", 5, " ", true) => "STR  "
 comb.string.pad("STR", 5, "$") => "$$STR"


```

     
*Arguments*

        
 * _string_ `String` : the string to pad
        
 * _length_ `Number` : the length of the string when padded
        
 * _[ch= &quot; &quot;]_ `String` : character to pad the string with
        
 * _[end=false]_ `Boolean` : if true then the padding is added to the end
        
     
     
*Returns*

        
 * `String` the padded string
        
     

*Source*

```javascript
function (string,length,ch,end){
   string = "" + string; //check for numbers
   ch = ch || " ";
   var strLen = string.length;
   while (strLen &lt; length) {
       if (end) {
           string += ch;
       } else {
           string = ch + string;
       }
       strLen++;
   }
   return string;
       
}
```

  
<a name="comb_string_style"></a>

###*style*



---
*Defined base/string.js* [Top](#top)


Styles a string according to the specified styles.
        
*Example*

```javascript
//style a string red
 comb.string.style('myStr', 'red');
 //style a string red and bold
 comb.string.style('myStr', ['red', bold]);


```

     
*Arguments*

        
 * _str_ `String` : The string to style.
        
 * _styles_ `String|Array` : the style or styles to apply to a string.           options include :           <ul>              <li>bold</li>              <li>bright</li>              <li>italic</li>              <li>underline</li>              <li>inverse</li>              <li>crossedOut</li>              <li>blink</li>              <li>red</li>              <li>green</li>              <li>yellow</li>              <li>blue</li>              <li>magenta</li>              <li>cyan</li>              <li>white</li>              <li>redBackground</li>              <li>greenBackground</li>              <li>yellowBackground</li>              <li>blueBackground</li>              <li>magentaBackground</li>              <li>cyanBackground</li>              <li>whiteBackground</li>              <li>grey</li>              <li>black</li>            </ul>
        
     
     

*Source*

```javascript
function (str,options){
   var ret = str;
   if (options) {
       if (ret instanceof Array) {
           ret = ret.map(function (s) {
               return comb.string.style(s, options);
           })
       } else if (options instanceof Array) {
           options.forEach(function (option) {
               ret = comb.string.style(ret, option);
           });
       } else if (options in styles) {
           ret = '\x1B[' + styles[options] + 'm' + str + '\x1B[0m';
       }
   }
   return ret;
       
}
```

  
<a name="comb_string_toArray"></a>

###*toArray*



---
*Defined base/string.js* [Top](#top)


Converts a string to an array
        
*Example*

```javascript
comb.string.toArray("a|b|c|d", "|") => ["a","b","c","d"]
 comb.string.toArray("a", "|") => ["a"]
 comb.string.toArray("", "|") => []


```

     
*Arguments*

        
 * _str_ `String` : the string to parse
        
 * _delimeter_ `String` : the delimeter to use
        
     
     

*Source*

```javascript
function (testStr,delim){
   var ret = [];
   if (testStr) {
       if (testStr.indexOf(delim) > 0) return testStr.replace(/\s+/g, "").split(delim);
       else return [testStr];
   }
   return ret;
       
}
```

  
<a name="comb_string_truncate"></a>

###*truncate*



---
*Defined base/string.js* [Top](#top)


Truncates a string to the specified length.
        
*Example*

```javascript
//from the beginning
 comb.string.truncate("abcdefg", 3) => "abc";
 //from the end
 comb.string.truncate("abcdefg", 3,true) => "efg"
 //omit the length
 comb.string.truncate("abcdefg") => "abcdefg"


```

     
*Arguments*

        
 * _string_ `String` : the string to truncate
        
 * _[length = -1]_ `Number` : the max length of the string, if the string is
                              shorter than the length then the string is returned.
        
 * _[end=false]_ `Boolean` : truncate starting at the end of the string
        
     
     
*Returns*

        
 * `String` the truncated string.
        
     

*Source*

```javascript
function (string,length,end){
   var ret = string;
   if (comb.isString(ret)) {
       if (string.length > length) {
           if (end) {
               var l = string.length;
               ret = string.substring(l - length, l);
           } else {
               ret = string.substring(0, length);
           }
       }
   } else {
       ret = comb.string.truncate("" + ret, length);
   }
   return ret;
       
}
```

  



<a name="comb_Promise"></a>
##comb.Promise

[Top](#top)

Promise object used for handling a thread

        
*Example*

```javascript
var myFunc = function(){
              var promise = new Promise();
              //callback the promise after 10 Secs
              setTimeout(hitch(promise, "callback"), 10000);
              return promise;
          }
          var myFunc2 = function(){
              var promises =[];
              for(var i = 0; i < 10; i++){
                  promises.push(myFunc);
              }
              //create a new promise list with all 10 promises
              return new PromiseList(promises);
          }

          myFunc.then(do something...)
          myFunc.addCallback(do something...)
          myFunc.chain(myfunc).then(do something...)
          myFunc.chain(myfunc).addCallback(do something...)

          myFunc2.then(do something...)
          myFunc2.addCallback(do something...)
          myFunc2.chain(myfunc).then(do something...)
          myFunc2.chain(myfunc).addCallback(do something...)

```










*Instance*

  * [addCallback](#comb_Promise_prototype_addCallback)

  * [addErrback](#comb_Promise_prototype_addErrback)

  * [both](#comb_Promise_prototype_both)

  * [callback](#comb_Promise_prototype_callback)

  * [chain](#comb_Promise_prototype_chain)

  * [chainBoth](#comb_Promise_prototype_chainBoth)

  * [classic](#comb_Promise_prototype_classic)

  * [errback](#comb_Promise_prototype_errback)

  * [then](#comb_Promise_prototype_then)


###Constructor

*Defined promise.js* [Top](#top)

     


*Source*

```javascript
function (){
   this.__errorCbs = [];
   this.__cbs = [];
           
}
```


  

  
<a name="comb_Promise_prototype_addCallback"></a>
###addCallback

---
*Defined promise.js* [Top](#top)

Add a callback to the callback chain of the promise
        
     
*Arguments*

        
 * _cb_ `Function|comb.Promise` : the function or promise to callback when the promise is resolved.
        
     
     
*Returns*

        
 * `comb.Promise` this promise for chaining
        
     

*Source*

```javascript
function (cb){
   if (cb) {
       if (exports.isPromiseLike(cb)) {
           cb = hitch(cb, "callback");
       }
       if (this.__fired && this.__results) {
           cb.apply(this, this.__results);
       } else {
           this.__cbs.push(cb);
       }
   }
   return this;
           
}
```

  
<a name="comb_Promise_prototype_addErrback"></a>
###addErrback

---
*Defined promise.js* [Top](#top)

Add a callback to the errback chain of the promise
        
     
*Arguments*

        
 * _cb_ `Function|comb.Promise` : the function or promise to callback when the promise errors
        
     
     
*Returns*

        
 * `comb.Promise` this promise for chaining
        
     

*Source*

```javascript
function (cb){
   if (cb) {
       if (exports.isPromiseLike(cb)) {
           cb = hitch(cb, "errback");
       }
       if (this.__fired && this.__error) {
           cb.apply(this, this.__error);
       } else {
           this.__errorCbs.push(cb);
       }
   }
   return this;
           
}
```

  
<a name="comb_Promise_prototype_both"></a>
###both

---
*Defined promise.js* [Top](#top)

Adds a callback or promise to be resolved for both success
 and error.
        
     
*Arguments*

        
 * _cb_ `Function|comb.Promise` : callback or promise to be resolved for both success  and error.
        
     
     
*Returns*

        
 * `comb.Promise` this promise for chaining
        
     

*Source*

```javascript
function (cb){
   this.addCallback(cb);
   if (exports.isPromiseLike(cb)) {
       this.addErrback(hitch(cb, "callback"));
   } else {
       this.addErrback(cb);
   }
   return this;
           
}
```

  
<a name="comb_Promise_prototype_callback"></a>
###callback

---
*Defined promise.js* [Top](#top)

When called all functions registered as callbacks are called with the passed in results.
        
     
*Arguments*

        
 * _args_ `*` : variable number of results to pass back to listeners of the promise
        
     
     

*Source*

```javascript
function (args){
   args = base.argsToArray(arguments);
   if (this.__fired) {
       throw new Error("Already fired!");
   }
   this.__results = args;
   this.__resolve();
   return this;
           
}
```

  
<a name="comb_Promise_prototype_chain"></a>
###chain

---
*Defined promise.js* [Top](#top)

Call to chaining of promises
        
     
*Arguments*

        
 * _callback_  : method to call that returns a promise to call after this one completes.
        
 * _errback_  : method to call if this promise errors.
        
     
     
*Returns*

        
 * `comb.Promise` A new that wraps the promise for chaining
        
     

*Source*

```javascript
function (callback,errback){
   var promise = new Promise();
   this.addCallback(function (results) {
       callback.call(this, results).then(promise);
   });
   this.addErrback(errback);
   return promise;
           
}
```

  
<a name="comb_Promise_prototype_chainBoth"></a>
###chainBoth

---
*Defined promise.js* [Top](#top)

Applies the same function that returns a promise to both the callback and errback.
        
     
*Arguments*

        
 * _callback_ `Function` : function to call. This function must return a Promise
        
     
     
*Returns*

        
 * `comb.Promise` a promise to continue chaining or to resolve with.
        
     

*Source*

```javascript
function (callback){
   var p = this.chain(callback);
   this.addErrback(function (results) {
       callback.call(this, results).then(p);
   });
   return p;
           
}
```

  
<a name="comb_Promise_prototype_classic"></a>
###classic

---
*Defined promise.js* [Top](#top)

Call this function as a classic node callback where the first argument
 will be an error, or null if no error occured. The other arugments will
 be the result from the promise.
        
*Example*

```javascript
promise.classic(function(err, res){
      if(err){
          console.log(err);
      }else{
          console.log(res);
      }
 });


```

     
*Arguments*

        
 * _cb_  : callback where the first argument  will be an error, or null if no error occured. The other arugments will  be the result from the promise.
        
     
     
*Returns*

        
 * `comb.Promise` the promise to chain
        
     

*Source*

```javascript
function (cb){
   if ("function" === typeof cb) {
       this.addErrback(function (err) {
           cb(err);
       });
       this.addCallback(function () {
           cb.apply(this, [null].concat(base.argsToArray(arguments)));
       });
   }
   return this;
           
}
```

  
<a name="comb_Promise_prototype_errback"></a>
###errback

---
*Defined promise.js* [Top](#top)

When called all functions registered as errbacks are called with the passed in error(s)
        
     
*Arguments*

        
 * _args_ `*` : number of errors to pass back to listeners of the promise
        
     
     

*Source*

```javascript
function (args){
   if (this.__fired) {
       throw args || new Error("Already fired");
   }
   this.__error = base.argsToArray(arguments);
   this.__resolve();
   return this;
           
}
```

  
<a name="comb_Promise_prototype_then"></a>
###then

---
*Defined promise.js* [Top](#top)

Call to specify action to take after promise completes or errors
        
     
*Arguments*

        
 * _[callback=null]_ `Function` : function to call after the promise completes successfully
        
 * _[errback=null]_ `Function` : function to call if the promise errors
        
     
     
*Returns*

        
 * `comb.Promise` this promise for chaining
        
     

*Source*

```javascript
function (callback,errback){
   if (exports.isPromiseLike(callback)) {
       this.addCallback(callback);
       this.addErrback(callback);
   } else {
       this.addCallback(callback);
       this.addErrback(errback);
   }
   return this;
           
}
```

  

<a name="comb_PromiseList"></a>
##comb.PromiseList

[Top](#top)

PromiseList object used for handling a list of Promises

        
*Example*

```javascript
var myFunc = function(){
              var promise = new Promise();
              //callback the promise after 10 Secs
              setTimeout(hitch(promise, "callback"), 10000);
              return promise;
          }
          var myFunc2 = function(){
              var promises =[];
              for(var i = 0; i < 10; i++){
                  promises.push(myFunc);
              }
              //create a new promise list with all 10 promises
              return new PromiseList(promises);
          }
          var pl = new comb.PromiseList([myFunc(), myFunc2()]);
          pl.then(do something...)
          pl.addCallback(do something...)
          pl.chain(myfunc).then(do something...)
          pl.chain(myfunc).addCallback(do something...)


```



*Extends*

  * [comb.Promise](#comb_Promise)









###Constructor

*Defined promise.js* [Top](#top)

     
*Arguments*

        
 * _[defs=[]]_ `comb.Promise[]` : the list of promises
        
     


*Source*

```javascript
function (defs,normalizeResults){
   this.__errors = [];
   this.__results = [];
   this.normalizeResults = base.isBoolean(normalizeResults) ? normalizeResults : false;
   this._super(arguments);
   if (defs && defs.length) {
       this.__defLength = defs.length;
       defs.forEach(this.__addPromise, this);
   } else {
       this.__resolve();
   }
           
}
```


  

  

<a name="comb_collections_AVLTree"></a>
##comb.collections.AVLTree

[Top](#top)

<p><p>An AVL tree is a self-balancing binary search tree.
    In an AVL tree, the heights of the two child subtrees of any node differ by at most one.
    Lookup, insertion, and deletion all take O(log n) time in both the average and worst cases,
    where n is the number of nodes in the tree prior to the operation.
    Insertions and deletions may require the tree to be rebalanced by one or more tree rotations.</p>
 <p>AVL trees are more rigidly balanced than red-black trees, leading to slower insertion and removal but faster retrieval</p>

 <b>Performance</b>
 <table>
     <tr><td></td><td>Best</td><td>Worst</td></tr>
     <tr><td>Space</td><td>O(n)</td><td>O(n)</td></tr>
     <tr><td>Search</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Delete</td><td>O(log n)</td><td>O(log n)</td></tr>
 <table></p>

        


*Extends*

  * [comb.collections.Tree](#comb_collections_Tree)









*Instance*

  * [insert](#comb_collections_AVLTree_prototype_insert)


###Constructor

*Defined collections/AVLTree.js* [Top](#top)

     



  

  
<a name="comb_collections_AVLTree_prototype_insert"></a>
###insert

---
*Defined collections/AVLTree.js* [Top](#top)


        
     
*Arguments*

        
 * _data_  : 
        
     
     

*Source*

```javascript
function (data){
   var done = {done : false};
   this.__root = insert(this.__root, data, done, this.compare);
           
}
```

  

<a name="comb_collections_AnderssonTree"></a>
##comb.collections.AnderssonTree

[Top](#top)

<p><p>Andersson Trees are a version of a balanced Binary tree, while similar to RedBlack Trees the balancing is not as strict.</p>

 <b>Performance</b>
 <table>
     <tr><td></td><td>Best</td><td>Worst</td></tr>
     <tr><td>space</td><td>O(n)</td><td>O(n)</td></tr>
     <tr><td>Search</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Delete</td><td>O(log n)</td><td>O(log n)</td></tr>
 <table> </p>

        


*Extends*

  * [comb.collections.Tree](#comb_collections_Tree)









*Instance*

  * [isEmpty](#comb_collections_AnderssonTree_prototype_isEmpty)


###Constructor

*Defined collections/AnderssonTree.js* [Top](#top)

     



  

  
<a name="comb_collections_AnderssonTree_prototype_isEmpty"></a>
###isEmpty

---
*Defined collections/AnderssonTree.js* [Top](#top)


        
     
     

*Source*

```javascript
function (){
   return this.__root == nil || this._super(arguments);
           
}
```

  

<a name="comb_collections_BinaryTree"></a>
##comb.collections.BinaryTree

[Top](#top)

<p><p>A Search tree that maintains the following properties</p>
 <ul>
     <li>The left subtree of a node contains only nodes with keys less than the node's key.
     <li>The right subtree of a node contains only nodes with keys greater than the node's key.
     <li>Both the left and right subtrees must also be binary search trees.
 </ul>

 <b>Performance</b>
 <table>
     <tr><td></td><td>Best</td><td>Worst</td></tr>
     <tr><td>Space</td><td>O(n)</td><td>O(n)</td></tr>
     <tr><td>Search</td><td>O(log n)</td><td>O(n)</td></tr>
     <tr><td>Insert</td><td>O(log n)</td><td>O(n)</td></tr>
     <tr><td>Delete</td><td>O(log n)</td><td>O(n)</td></tr>
 <table>
     </p>

        


*Extends*

  * [comb.collections.Tree](#comb_collections_Tree)









*Instance*

  * [insert](#comb_collections_BinaryTree_prototype_insert)


###Constructor

*Defined collections/BinaryTree.js* [Top](#top)

     



  

  
<a name="comb_collections_BinaryTree_prototype_insert"></a>
###insert

---
*Defined collections/BinaryTree.js* [Top](#top)


        
     
*Arguments*

        
 * _data_  : 
        
     
     

*Source*

```javascript
function (data){
   if (this.__root == null) {
       return (this.__root = {
           data : data,
           parent : null,
           left : null,
           right : null
       });
   }
   var compare = this.compare;
   var root = this.__root;
   while (root != null) {
       var cmp = compare(data, root.data);
       if (cmp) {
           var leaf = (cmp == -1) ? "left" : "right";
           var next = root[leaf];
           if (next == null) {
               return (root[leaf] = {data : data, parent : root, left : null, right : null});
           } else {
               root = next;
           }
       } else {
           return;
       }
   }
           
}
```

  

<a name="comb_collections_Collection"></a>
##comb.collections.Collection

[Top](#top)

Base class for all collections

        









*Instance*

  * [concat](#comb_collections_Collection_prototype_concat)

  * [indexOf](#comb_collections_Collection_prototype_indexOf)

  * [join](#comb_collections_Collection_prototype_join)

  * [lastIndexOf](#comb_collections_Collection_prototype_lastIndexOf)

  * [slice](#comb_collections_Collection_prototype_slice)

  * [toString](#comb_collections_Collection_prototype_toString)


###Constructor

*Defined collections/Collection.js* [Top](#top)

     



  

  
<a name="comb_collections_Collection_prototype_concat"></a>
###concat

---
*Defined collections/Collection.js* [Top](#top)

Concats two collections
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
   				
}
```

  
<a name="comb_collections_Collection_prototype_indexOf"></a>
###indexOf

---
*Defined collections/Collection.js* [Top](#top)

Find the index of an item in a collection
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
   				
}
```

  
<a name="comb_collections_Collection_prototype_join"></a>
###join

---
*Defined collections/Collection.js* [Top](#top)

Joins two collections
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
   				
}
```

  
<a name="comb_collections_Collection_prototype_lastIndexOf"></a>
###lastIndexOf

---
*Defined collections/Collection.js* [Top](#top)

Find the last index of an item in a collection
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
   				
}
```

  
<a name="comb_collections_Collection_prototype_slice"></a>
###slice

---
*Defined collections/Collection.js* [Top](#top)

Slice a portion from a collection
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
   				
}
```

  
<a name="comb_collections_Collection_prototype_toString"></a>
###toString

---
*Defined collections/Collection.js* [Top](#top)

Convert a collection to a string
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
   				
}
```

  

<a name="comb_collections_HashTable"></a>
##comb.collections.HashTable

[Top](#top)

<p>Implementation of a HashTable for javascript.
    This HashTable implementation allows one to use anything as a key.
    </p>
 <b>NOTE: THIS IS ~ 3 times slower than javascript native objects</b>

 <p> A use case for this collection is when one needs to store items in which the key will not be a string, or number</p>

        


*Extends*

  * [comb.collections.Collection](#comb_collections_Collection)





*Instance Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td>entrySet</td><td></td><td>an array of objects. Each object contains a key, and value property.</td><tr><tr><td>keys</td><td></td><td>all keys contained in the table</td><tr><tr><td>values</td><td></td><td>all values contained in the table</td><tr></table>





*Instance*

  * [clear](#comb_collections_HashTable_prototype_clear)

  * [concat](#comb_collections_HashTable_prototype_concat)

  * [contains](#comb_collections_HashTable_prototype_contains)

  * [every](#comb_collections_HashTable_prototype_every)

  * [filter](#comb_collections_HashTable_prototype_filter)

  * [forEach](#comb_collections_HashTable_prototype_forEach)

  * [get](#comb_collections_HashTable_prototype_get)

  * [map](#comb_collections_HashTable_prototype_map)

  * [put](#comb_collections_HashTable_prototype_put)

  * [reduce](#comb_collections_HashTable_prototype_reduce)

  * [reduceRight](#comb_collections_HashTable_prototype_reduceRight)

  * [remove](#comb_collections_HashTable_prototype_remove)

  * [set](#comb_collections_HashTable_prototype_set)

  * [some](#comb_collections_HashTable_prototype_some)


###Constructor

*Defined collections/HashTable.js* [Top](#top)

     


*Source*

```javascript
function (){
   this.__map = {};
           
}
```


  

  
<a name="comb_collections_HashTable_prototype_clear"></a>
###clear

---
*Defined collections/HashTable.js* [Top](#top)

Clears out all items from the table.
        
     
     

*Source*

```javascript
function (){
   this.__map = {};
           
}
```

  
<a name="comb_collections_HashTable_prototype_concat"></a>
###concat

---
*Defined collections/HashTable.js* [Top](#top)

Returns a new HashTable containing the values of this HashTable, and the other table.
 </br>
 <b> DOES NOT CHANGE THE ORIGINAL!</b>
        
     
*Arguments*

        
 * _hashTable_ `comb.collections.HashTable` : the hash table to concat with this.
        
     
     
*Returns*

        
 * `comb.collections.HashTable` a new HashTable containing all values from both tables.
        
     

*Source*

```javascript
function (hashTable){
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
           
}
```

  
<a name="comb_collections_HashTable_prototype_contains"></a>
###contains

---
*Defined collections/HashTable.js* [Top](#top)

Tests if the table contains a particular key
        
     
*Arguments*

        
 * _key_  : the key to test
        
     
     
*Returns*

        
 * `Boolean` true if it exitsts false otherwise.
        
     

*Source*

```javascript
function (key){
   var hash = hashFunction(key), ret = false;
   var bucket = null;
   if ((bucket = this.__map[hash]) != null) {
       ret = bucket.find(key) != null;
   }
   return ret;
           
}
```

  
<a name="comb_collections_HashTable_prototype_every"></a>
###every

---
*Defined collections/HashTable.js* [Top](#top)

Determines if every item meets the condition returned by the callback.
        
     
*Arguments*

        
 * _cb_ `Function` : Function to callback with each item, the first aruguments is an object containing a key and value field
        
 * _[scope=this]_ `Object` : scope to call the function in
        
     
     
*Returns*

        
 * `Boolean` True if every item passed false otherwise
        
     

*Source*

```javascript
function (){
   var es = this.__entrySet();
   return es.every.apply(es, arguments);
           
}
```

  
<a name="comb_collections_HashTable_prototype_filter"></a>
###filter

---
*Defined collections/HashTable.js* [Top](#top)

Creates a new HashTable containg values that passed the filtering function.
        
     
*Arguments*

        
 * _cb_ `Function` : Function to callback with each item, the first aruguments is an object containing a key and value field
        
 * _scope_ `Object` : the scope to call the function.
        
     
     
*Returns*

        
 * `comb.collections.HashTable` the HashTable containing the values that passed the filter.
        
     

*Source*

```javascript
function (cb,scope){
   var es = this.__entrySet(), ret = new HashTable();
   es = es.filter.apply(es, arguments);
   for (var i = es.length - 1; i >= 0; i--) {
       var e = es[i];
       ret.put(e.key, e.value);
   }
   return ret;
           
}
```

  
<a name="comb_collections_HashTable_prototype_forEach"></a>
###forEach

---
*Defined collections/HashTable.js* [Top](#top)

Loop through each value in the hashtable
        
     
*Arguments*

        
 * _cb_ `Function` : the function to call with an object containing a key and value field
        
 * _scope_ `Object` : the scope to call the funciton in
        
     
     

*Source*

```javascript
function (cb,scope){
   var es = this.__entrySet(), l = es.length, f = cb.bind(scope || this);
   es.forEach.apply(es, arguments);
           
}
```

  
<a name="comb_collections_HashTable_prototype_get"></a>
###get

---
*Defined collections/HashTable.js* [Top](#top)

Get the value corresponding to the key.
        
     
*Arguments*

        
 * _key_  : the key used to look up the value
        
     
     
*Returns*

        
 *  null if not found, or the value.
        
     

*Source*

```javascript
function (key){
   var hash = hashFunction(key), ret = null;
   var bucket = null;
   if ((bucket = this.__map[hash]) != null) {
       ret = bucket.find(key);
   }
   return ret;
           
}
```

  
<a name="comb_collections_HashTable_prototype_map"></a>
###map

---
*Defined collections/HashTable.js* [Top](#top)

Loop through each value in the hashtable, collecting the value returned by the callback function.
        
     
*Arguments*

        
 * _cb_ `Function` : Function to callback with each item, the first aruguments is an object containing a key and value field
        
 * _[scope=this]_ `Object` : scope to call the function in
        
     
     
*Returns*

        
 * `Array` an array containing the mapped values.
        
     

*Source*

```javascript
function (){
   var es = this.__entrySet(), ret = new HashTable();
   return es.map.apply(es, arguments);
           
}
```

  
<a name="comb_collections_HashTable_prototype_put"></a>
###put

---
*Defined collections/HashTable.js* [Top](#top)

Put a key, value pair into the table

 <b>NOTE :</b> the collection will not check if the key previously existed.
        
     
*Arguments*

        
 * _key_ `Anything` : the key to look up the object.
        
 * _value_ `Anything` : the value that corresponds to the key.
        
     
     
*Returns*

        
 *  the value
        
     

*Source*

```javascript
function (key,value){
   var hash = hashFunction(key);
   var bucket = null;
   if ((bucket = this.__map[hash]) == null) {
       bucket = (this.__map[hash] = new Bucket());
   }
   bucket.pushValue(key, value);
   return value;
           
}
```

  
<a name="comb_collections_HashTable_prototype_reduce"></a>
###reduce

---
*Defined collections/HashTable.js* [Top](#top)

Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
        
     
*Arguments*

        
 * _callback_ `Function` : Function to execute on each value in the array.
        
 * _initialValue_  : Value to use as the first argument to the first call of the callback..
        
     
     

*Source*

```javascript
function (){
   var es = this.__entrySet();
   return es.reduce.apply(es, arguments);
           
}
```

  
<a name="comb_collections_HashTable_prototype_reduceRight"></a>
###reduceRight

---
*Defined collections/HashTable.js* [Top](#top)

Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value.
        
     
*Arguments*

        
 * _callback_ `Function` : Function to execute on each value in the array.
        
 * _initialValue_  : Value to use as the first argument to the first call of the callback..
        
     
     

*Source*

```javascript
function (){
   var es = this.__entrySet();
   return es.reduceRight.apply(es, arguments);
           
}
```

  
<a name="comb_collections_HashTable_prototype_remove"></a>
###remove

---
*Defined collections/HashTable.js* [Top](#top)

Remove a key value pair from the table.
        
     
*Arguments*

        
 * _key_  : the key of the key value pair to remove.
        
     
     
*Returns*

        
 *  the removed value.
        
     

*Source*

```javascript
function (key){
   var hash = hashFunction(key), ret = null;
   var bucket = this.__map[hash];
   if (bucket) {
       ret = bucket.remove(key);
   }
   return ret;
           
}
```

  
<a name="comb_collections_HashTable_prototype_set"></a>
###set

---
*Defined collections/HashTable.js* [Top](#top)

Set the value of a previously existing key,value pair or create a new entry.
        
     
*Arguments*

        
 * _key_  : the key to be be used
        
 * _value_  : the value to be set
        
     
     
*Returns*

        
 *  the value.
        
     

*Source*

```javascript
function (key,value){
   var hash = hashFunction(key), ret = null, bucket = null, map = this.__map;
   if ((bucket = map[hash]) != null) {
       ret = bucket.set(key, value);
   } else {
       ret = (map[hash] = new Bucket()).pushValue(key, value);
   }
   return ret;
           
}
```

  
<a name="comb_collections_HashTable_prototype_some"></a>
###some

---
*Defined collections/HashTable.js* [Top](#top)

Determines if some items meet the condition returned by the callback.
        
     
*Arguments*

        
 * _cb_ `Function` : Function to callback with each item, the first aruguments is an object containing a key and value field
        
 * _[scope=this]_ `Object` : scope to call the function in
        
     
     
*Returns*

        
 * `Boolean` True if some items passed false otherwise
        
     

*Source*

```javascript
function (){
   var es = this.__entrySet();
   return es.some.apply(es, arguments);
           
}
```

  

<a name="comb_collections_Heap"></a>
##comb.collections.Heap

[Top](#top)

Base class for Heap Implementations.

        


*Extends*

  * [comb.collections.Collection](#comb_collections_Collection)





*Instance Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td>count</td><td></td><td>the current number of elements.</td><tr><tr><td>isEmpty</td><td></td><td>true if the Heap is empty.</td><tr><tr><td>keys</td><td></td><td>the keys of all items in the heap.</td><tr><tr><td>values</td><td></td><td>the values contained in the heap.</td><tr></table>





*Instance*

  * [clear](#comb_collections_Heap_prototype_clear)

  * [containsKey](#comb_collections_Heap_prototype_containsKey)

  * [containsValue](#comb_collections_Heap_prototype_containsValue)

  * [insert](#comb_collections_Heap_prototype_insert)

  * [peek](#comb_collections_Heap_prototype_peek)

  * [peekKey](#comb_collections_Heap_prototype_peekKey)

  * [print](#comb_collections_Heap_prototype_print)

  * [remove](#comb_collections_Heap_prototype_remove)


###Constructor

*Defined collections/Heap.js* [Top](#top)

     


*Source*

```javascript
function (){
   this.__heap = [];
           
}
```


  

  
<a name="comb_collections_Heap_prototype_clear"></a>
###clear

---
*Defined collections/Heap.js* [Top](#top)

Empty the heap.
        
     
     

*Source*

```javascript
function (){
   this.__heap.length = 0;
           
}
```

  
<a name="comb_collections_Heap_prototype_containsKey"></a>
###containsKey

---
*Defined collections/Heap.js* [Top](#top)

Determine if the heap contains a particular key.
        
     
*Arguments*

        
 * _key_  : key to test.
        
     
     
*Returns*

        
 * `Boolean` true if the key is contained in this heap.
        
     

*Source*

```javascript
function (key){
   var heap = this.__heap;
   for (var i = heap.length - 1; i >= 0; i--) {
       if (heap[i].key == key) {
           return true;
       }
   }
   return false;
           
}
```

  
<a name="comb_collections_Heap_prototype_containsValue"></a>
###containsValue

---
*Defined collections/Heap.js* [Top](#top)

Determine if the heap contains a particular value.
        
     
*Arguments*

        
 * _value_  : value to test.
        
     
     
*Returns*

        
 * `Boolean` true if the value is contained in this heap.
        
     

*Source*

```javascript
function (value){
   var heap = this.__heap;
   for (var i = heap.length - 1; i >= 0; i--) {
       if (heap[i].value == value) {
           return true;
       }
   }
   return false;
           
}
```

  
<a name="comb_collections_Heap_prototype_insert"></a>
###insert

---
*Defined collections/Heap.js* [Top](#top)

Insert a key value into the key
        
     
*Arguments*

        
 * _key_  : 
        
 * _value_  : 
        
     
     

*Source*

```javascript
function (key,value){
   if (!base.isString(key)) {
       var l = this.__heap.push(this.__makeNode(key, value));
       this.__upHeap(l - 1);
   } else {
       throw TypeError("Invalid key");
   }
           
}
```

  
<a name="comb_collections_Heap_prototype_peek"></a>
###peek

---
*Defined collections/Heap.js* [Top](#top)

Gets he value of the root node with out removing it.
        
     
     
*Returns*

        
 *  the value of the root
        
     

*Source*

```javascript
function (){
   var ret = undefined, heap = this.__heap, l = heap.length;
   if (l) {
       ret = heap[0];
   }
   return ret ? ret.value : ret;
           
}
```

  
<a name="comb_collections_Heap_prototype_peekKey"></a>
###peekKey

---
*Defined collections/Heap.js* [Top](#top)

Gets the key of the root node without removing it.
        
     
     
*Returns*

        
 *  the key of the root
        
     

*Source*

```javascript
function (){
   var ret = undefined, heap = this.__heap, l = heap.length;
   if (l) {
       ret = heap[0];
   }
   return ret ? ret.key : ret;
           
}
```

  
<a name="comb_collections_Heap_prototype_print"></a>
###print

---
*Defined collections/Heap.js* [Top](#top)

Print the heap.
        
     
     

*Source*

```javascript
function (){
   this.__printNode(0, 0);
           
}
```

  
<a name="comb_collections_Heap_prototype_remove"></a>
###remove

---
*Defined collections/Heap.js* [Top](#top)

Removes the root from the heap
        
     
     
*Returns*

        
 *  the value of the root
        
     

*Source*

```javascript
function (){
   var ret = undefined, heap = this.__heap, l = heap.length;
   if (l) {
       ret = heap[0];
       if (l == 1) {
           heap.length = 0;
       } else {
           heap[0] = heap.pop();
           this.__downHeap(0);
       }
   }
   return ret ? ret.value : ret;
           
}
```

  

<a name="comb_collections_Iterable"></a>
##comb.collections.Iterable

[Top](#top)

Base class for all collections

        









*Instance*

  * [every](#comb_collections_Iterable_prototype_every)

  * [filter](#comb_collections_Iterable_prototype_filter)

  * [forEach](#comb_collections_Iterable_prototype_forEach)

  * [map](#comb_collections_Iterable_prototype_map)

  * [reduce](#comb_collections_Iterable_prototype_reduce)

  * [reduceRight](#comb_collections_Iterable_prototype_reduceRight)

  * [some](#comb_collections_Iterable_prototype_some)


###Constructor

*Defined collections/Iterable.js* [Top](#top)

     



  

  
<a name="comb_collections_Iterable_prototype_every"></a>
###every

---
*Defined collections/Iterable.js* [Top](#top)

Determine if every item in a collection meets the criteria
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
           
}
```

  
<a name="comb_collections_Iterable_prototype_filter"></a>
###filter

---
*Defined collections/Iterable.js* [Top](#top)

Filter items from a collection
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
           
}
```

  
<a name="comb_collections_Iterable_prototype_forEach"></a>
###forEach

---
*Defined collections/Iterable.js* [Top](#top)

Loop through the items in a collection
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
           
}
```

  
<a name="comb_collections_Iterable_prototype_map"></a>
###map

---
*Defined collections/Iterable.js* [Top](#top)

Map every item in a collection
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
           
}
```

  
<a name="comb_collections_Iterable_prototype_reduce"></a>
###reduce

---
*Defined collections/Iterable.js* [Top](#top)

Reduce a collection
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
           
}
```

  
<a name="comb_collections_Iterable_prototype_reduceRight"></a>
###reduceRight

---
*Defined collections/Iterable.js* [Top](#top)

Reduce a collection starting from the right most position
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
           
}
```

  
<a name="comb_collections_Iterable_prototype_some"></a>
###some

---
*Defined collections/Iterable.js* [Top](#top)

Determing if some items in a colleciton meet the criteria
        
     
     

*Source*

```javascript
function (){
   throw new Error("Not Implemented");
           
}
```

  

<a name="comb_collections_MaxHeap"></a>
##comb.collections.MaxHeap

[Top](#top)

<p><p> Max Heap implementation, lowest value in heap is always at the root.</p>
 </br>
 <b>Performance</b>
 <table>
     <tr><td></td><td>Best</td><td>Worst</td></tr>
     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Remove</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Peek</td><td>O(1)</td><td>O(1)</td></tr>
     <tr><td>Contains</td><td>O(n)</td><td>O(n)</td></tr>
 <table></p>

        


*Extends*

  * [comb.collections.Heap](#comb_collections_Heap)









###Constructor

*Defined collections/MaxHeap.js* [Top](#top)

     



  

  

<a name="comb_collections_MinHeap"></a>
##comb.collections.MinHeap

[Top](#top)

<p><p> Min Heap implementation, lowest value in heap is always at the root.</p>
 </br>
 <b>Performance</b>
 <table>
     <tr><td></td><td>Best</td><td>Worst</td></tr>
     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Remove</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Peek</td><td>O(1)</td><td>O(1)</td></tr>
     <tr><td>Contains</td><td>O(n)</td><td>O(n)</td></tr>
 <table></p>

        


*Extends*

  * [comb.collections.Heap](#comb_collections_Heap)









###Constructor

*Defined collections/MinHeap.js* [Top](#top)

     



  

  

<a name="comb_collections_Pool"></a>
##comb.collections.Pool

[Top](#top)

Base class for a pool.

        





*Instance Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td>count</td><td></td><td>the total number of objects in the pool, including free and in use objects.</td><tr><tr><td>freeCount</td><td></td><td>the number of free objects in this pool.</td><tr><tr><td>inUseCount</td><td></td><td>the number of objects in use in this pool.</td><tr><tr><td>maxObjects</td><td>1</td><td>the maximum number of objects this pool should contain</td><tr><tr><td>minObjects</td><td>0</td><td>the minimum number of objects this pool should contain.</td><tr></table>





*Instance*

  * [createObject](#comb_collections_Pool_prototype_createObject)

  * [getObject](#comb_collections_Pool_prototype_getObject)

  * [removeObject](#comb_collections_Pool_prototype_removeObject)

  * [returnObject](#comb_collections_Pool_prototype_returnObject)

  * [validate](#comb_collections_Pool_prototype_validate)


###Constructor

*Defined collections/Pool.js* [Top](#top)

     
*Arguments*

        
 * _options_  : 
        
     


*Source*

```javascript
function (options){
   options = options || {};
   this.__freeObjects = new Queue();
   this.__inUseObjects = [];
   this.__minObjects = options.minObjects || 0;
   this.__maxObjects = options.maxObjects || 1;
   this.minObjects = this.__minObjects;
   this.maxObjects = this.__maxObjects;
           
}
```


  

  
<a name="comb_collections_Pool_prototype_createObject"></a>
###createObject

---
*Defined collections/Pool.js* [Top](#top)

Creates a new object for this pool.
 * </br>
 <b>THIS SHOULD BE OVERRIDDEN TO ADD THE CORRECT TYPE OF OBJECT</b>
        
     
     
*Returns*

        
 * `Object` be default just creates an object.
        
     

*Source*

```javascript
function (){
   return {};
           
}
```

  
<a name="comb_collections_Pool_prototype_getObject"></a>
###getObject

---
*Defined collections/Pool.js* [Top](#top)

Retrieves an object from this pool.
 `
        
     
     
*Returns*

        
 * `*` an object to contained in this pool
        
     

*Source*

```javascript
function (){
   var ret = undefined;
   if (this.freeCount > 0) {
       ret = this.__freeObjects.dequeue();
       this.__inUseObjects.push(ret);
   } else if (this.__maxObjects > this.count) {
       ret = this.createObject();
       this.__inUseObjects.push(ret);
   }
   return ret;
           
}
```

  
<a name="comb_collections_Pool_prototype_removeObject"></a>
###removeObject

---
*Defined collections/Pool.js* [Top](#top)

Removes an object from the pool, this can be overriden to provide any
 teardown of objects that needs to take place.
        
     
*Arguments*

        
 * _obj_ `*` : the object that needs to be removed.
        
     
     
*Returns*

        
 * `*` the object removed.
        
     

*Source*

```javascript
function (obj){
   var index;
   if (this.__freeObjects.contains(obj)) {
       this.__freeObjects.remove(obj);
   } else if ((index = this.__inUseObjects.indexOf(obj)) > -1) {
       this.__inUseObjects.splice(index, 1);
   }
   //otherwise its not contained in this pool;
   return obj;
           
}
```

  
<a name="comb_collections_Pool_prototype_returnObject"></a>
###returnObject

---
*Defined collections/Pool.js* [Top](#top)

Returns an object to this pool. The object is validated before it is returned to the pool,
 if the validation fails then it is removed from the pool;
        
     
*Arguments*

        
 * _obj_ `*` : the object to return to the pool
        
     
     

*Source*

```javascript
function (obj){
   if (this.validate(obj) && this.count &lt;= this.__maxObjects) {
       this.__freeObjects.enqueue(obj);
       var index;
       if ((index = this.__inUseObjects.indexOf(obj)) > -1)
           this.__inUseObjects.splice(index, 1);
   } else {
       this.removeObject(obj);
   }
           
}
```

  
<a name="comb_collections_Pool_prototype_validate"></a>
###validate

---
*Defined collections/Pool.js* [Top](#top)

Validates an object in this pool.
 </br>
 <b>THIS SHOULD BE OVERRIDDEN TO VALIDATE</b>
        
     
*Arguments*

        
 * _obj_ `*` : the object to validate.
        
     
     

*Source*

```javascript
function (obj){
   return true;
           
}
```

  

<a name="comb_collections_PriorityQueue"></a>
##comb.collections.PriorityQueue

[Top](#top)

PriorityQueue Implementation where the value with the highest priority moves to the front
        Priority starts at 0, and the greatest value being the lowest priority;

        


*Extends*

  * [comb.collections.MinHeap](#comb_collections_MinHeap)









*Instance*

  * [dequeue](#comb_collections_PriorityQueue_prototype_dequeue)

  * [enqueue](#comb_collections_PriorityQueue_prototype_enqueue)


###Constructor

*Defined collections/PriorityQueue.js* [Top](#top)

     



  

  
<a name="comb_collections_PriorityQueue_prototype_dequeue"></a>
###dequeue

---
*Defined collections/PriorityQueue.js* [Top](#top)

Removes the item with the highest priority from the queue
        
     
     
*Returns*

        
 *  the value of the item
        
     

*Source*

```javascript
function (){
   return this.remove();
           
}
```

  
<a name="comb_collections_PriorityQueue_prototype_enqueue"></a>
###enqueue

---
*Defined collections/PriorityQueue.js* [Top](#top)

Adds the value with the specified priority to the queue
        
     
*Arguments*

        
 * _priority_ `Number` : the priority of the item       </br>       <b>0 = Highest, n = lowest</b>
        
 * _value_  : 
        
     
     

*Source*

```javascript
function (priority,value){
   return this.insert(priority, value);
           
}
```

  

<a name="comb_collections_Queue"></a>
##comb.collections.Queue

[Top](#top)

<p>FIFO Data structure</p>

        


*Extends*

  * [comb.collections.Collection](#comb_collections_Collection)





*Instance Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td>count</td><td></td><td>the current number of elements in this queue</td><tr><tr><td>isEmpty</td><td></td><td>true if this queue is empty</td><tr><tr><td>values</td><td></td><td>a copy of the values contained in this queue</td><tr></table>





*Instance*

  * [clear](#comb_collections_Queue_prototype_clear)

  * [contains](#comb_collections_Queue_prototype_contains)

  * [dequeue](#comb_collections_Queue_prototype_dequeue)

  * [enqueue](#comb_collections_Queue_prototype_enqueue)

  * [peek](#comb_collections_Queue_prototype_peek)

  * [remove](#comb_collections_Queue_prototype_remove)


###Constructor

*Defined collections/Queue.js* [Top](#top)

     


*Source*

```javascript
function (){
   this.__queue = [];
   this.__next = 0;
   this.__last = 0;
           
}
```


  

  
<a name="comb_collections_Queue_prototype_clear"></a>
###clear

---
*Defined collections/Queue.js* [Top](#top)

Removes all items from this queue
        
     
     

*Source*

```javascript
function (){
   this.__queue.length = 0;
   this.__next = 0;
   this.__last = 0;
           
}
```

  
<a name="comb_collections_Queue_prototype_contains"></a>
###contains

---
*Defined collections/Queue.js* [Top](#top)

Determine if this queue contains the element
        
     
*Arguments*

        
 * _obj_ `*` : the object to find
        
     
     
*Returns*

        
 * `Boolean` true if this queue contains the element
        
     

*Source*

```javascript
function (obj){
   return this.__queue.indexOf(obj) != -1;
           
}
```

  
<a name="comb_collections_Queue_prototype_dequeue"></a>
###dequeue

---
*Defined collections/Queue.js* [Top](#top)

Removes first item from the head of the queue
        
     
     
*Returns*

        
 * `*` The element removed from this queue. Returns undefined if the queue is empty.
        
     

*Source*

```javascript
function (){
   var ret = undefined,next = this.__next, queue;
   if (next != this.__last) {
       queue = this.__queue;
       ret = queue[next];
       queue[this.__next++] = undefined;
   }
   return ret;
           
}
```

  
<a name="comb_collections_Queue_prototype_enqueue"></a>
###enqueue

---
*Defined collections/Queue.js* [Top](#top)

Add data to this queue
        
     
*Arguments*

        
 * _data_ `*` : element to add
        
     
     

*Source*

```javascript
function (data){
   this.__queue[this.__last++] = data;
           
}
```

  
<a name="comb_collections_Queue_prototype_peek"></a>
###peek

---
*Defined collections/Queue.js* [Top](#top)

Retrieves the item at the head of the queue without removing it
        
     
     
*Returns*

        
 * `*` The element at the head of the queue. Returns undefined if the queue is empty.
        
     

*Source*

```javascript
function (){
   var ret = undefined, next = this.__next;
   if (next != this.__last) {
       ret = this.__queue[next];
   }
   return ret;
           
}
```

  
<a name="comb_collections_Queue_prototype_remove"></a>
###remove

---
*Defined collections/Queue.js* [Top](#top)

Removes an element from this queue.
        
     
*Arguments*

        
 * _obj_ `*` : the data to remove.
        
     
     
*Returns*

        
 * `Boolean` true if the element was removed, false otherwise.
        
     

*Source*

```javascript
function (obj){
   var index = this.__queue.indexOf(obj), ret = false;
   if (index != -1) {
       if (index == this.__next) {
           this.dequeue();
       } else {
           this.__queue.splice(index, 1);
           this.__last--;
       }
       ret = true;
   }
   return ret;
           
}
```

  

<a name="comb_collections_RedBlackTree"></a>
##comb.collections.RedBlackTree

[Top](#top)

<p>
     <p>A RedBlack tree is a form of a self balancing binary tree.</p>

 <b>Performance</b>
 <table>
     <tr><td></td><td>Best</td><td>Worst</td></tr>
     <tr><td>Space</td><td>O(n)</td><td>O(n)</td></tr>
     <tr><td>Search</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Insert</td><td>O(log n)</td><td>O(log n)</td></tr>
     <tr><td>Delete</td><td>O(log n)</td><td>O(log n)</td></tr>
 <table>
     </p>

        


*Extends*

  * [comb.collections.Tree](#comb_collections_Tree)









*Instance*

  * [insert](#comb_collections_RedBlackTree_prototype_insert)


###Constructor

*Defined collections/RedBlackTree.js* [Top](#top)

     



  

  
<a name="comb_collections_RedBlackTree_prototype_insert"></a>
###insert

---
*Defined collections/RedBlackTree.js* [Top](#top)


        
     
*Arguments*

        
 * _data_  : 
        
     
     

*Source*

```javascript
function (data){
   this.__root = insert(this.__root, data, this.compare);
   this.__root.red = false;
           
}
```

  

<a name="comb_collections_Stack"></a>
##comb.collections.Stack

[Top](#top)

<p>LIFO Data structure</p>

        


*Extends*

  * [comb.collections.Collection](#comb_collections_Collection)





*Instance Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td>count</td><td></td><td>the current number of elements in this queue</td><tr><tr><td>isEmpty</td><td></td><td>true if this queue is empty</td><tr><tr><td>values</td><td></td><td>a copy of the values contained in this queue</td><tr></table>





*Instance*

  * [clear](#comb_collections_Stack_prototype_clear)

  * [contains](#comb_collections_Stack_prototype_contains)

  * [peek](#comb_collections_Stack_prototype_peek)

  * [pop](#comb_collections_Stack_prototype_pop)

  * [push](#comb_collections_Stack_prototype_push)

  * [remove](#comb_collections_Stack_prototype_remove)


###Constructor

*Defined collections/Stack.js* [Top](#top)

     


*Source*

```javascript
function (){
   this.__stack = [];
   this.__next = -1;
           
}
```


  

  
<a name="comb_collections_Stack_prototype_clear"></a>
###clear

---
*Defined collections/Stack.js* [Top](#top)

Removes all items from this stack.
        
     
     

*Source*

```javascript
function (){
   this.__stack.length = 0;
   this.__next = -1;
           
}
```

  
<a name="comb_collections_Stack_prototype_contains"></a>
###contains

---
*Defined collections/Stack.js* [Top](#top)

Determine if this stack contains the element
        
     
*Arguments*

        
 * _obj_ `*` : the object to find
        
     
     
*Returns*

        
 * `Boolean` true if this stack contains the element
        
     

*Source*

```javascript
function (obj){
   return this.__stack.indexOf(obj) != -1;
           
}
```

  
<a name="comb_collections_Stack_prototype_peek"></a>
###peek

---
*Defined collections/Stack.js* [Top](#top)

Retrieves the item at the tail of the stack without removing it
        
     
     
*Returns*

        
 * `*` The element at the tail of the stack. Returns undefined if the stack is empty.
        
     

*Source*

```javascript
function (){
   var ret = undefined,next = this.__next;
   if (next >= 0) {
       ret = this.__stack[next];
   }
   return ret;
           
}
```

  
<a name="comb_collections_Stack_prototype_pop"></a>
###pop

---
*Defined collections/Stack.js* [Top](#top)

Removes the tail of this static
        
     
     
*Returns*

        
 * `*` the data at the tail of this stack
        
     

*Source*

```javascript
function (){
   var ret = undefined, stack, next = this.__next;
   if (next >= 0) {
       stack = this.__stack;
       ret = stack[next];
       stack[this.__next--] = undefined;
   }
   return ret;
           
}
```

  
<a name="comb_collections_Stack_prototype_push"></a>
###push

---
*Defined collections/Stack.js* [Top](#top)

Add an item to the tail of this stack
        
     
*Arguments*

        
 * _data_ `*` : item to qppend to this stack
        
     
     

*Source*

```javascript
function (data){
   this.__stack[++this.__next] = data;
           
}
```

  
<a name="comb_collections_Stack_prototype_remove"></a>
###remove

---
*Defined collections/Stack.js* [Top](#top)

Removes an element from this stack.
        
     
*Arguments*

        
 * _obj_ `*` : the data to remove.
        
     
     
*Returns*

        
 * `Boolean` true if the element was removed, false otherwise.
        
     

*Source*

```javascript
function (obj){
   var index = this.__stack.indexOf(obj), ret = false;
   if (index != -1) {
       if (index == this.__next) {
           this.pop();
       } else {
           this.__stack.splice(index, 1);
           this.__next--;
       }
       ret = true;
   }
   return ret;
           
}
```

  

<a name="comb_collections_Tree"></a>
##comb.collections.Tree

[Top](#top)

Base Class for all tree implementations

        


*Extends*

  * [comb.collections.Collection](#comb_collections_Collection)

  * [comb.collections.Iterable](#comb_collections_Iterable)




*Static Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td><em>IN_ORDER</em></td><td>"in_order"</td><td>In Order</td><tr><tr><td><em>POST_ORDER</em></td><td>"post_order"</td><td>Post Order</td><tr><tr><td><em>PRE_ORDER</em></td><td>"pre_order"</td><td>Pre Order</td><tr><tr><td><em>REVERSE_ORDER</em></td><td>"reverse_order"</td><td>Reverse Order</td><tr></table>






*Instance*

  * [clear](#comb_collections_Tree_prototype_clear)

  * [contains](#comb_collections_Tree_prototype_contains)

  * [every](#comb_collections_Tree_prototype_every)

  * [filter](#comb_collections_Tree_prototype_filter)

  * [find](#comb_collections_Tree_prototype_find)

  * [findGreaterThan](#comb_collections_Tree_prototype_findGreaterThan)

  * [findLessThan](#comb_collections_Tree_prototype_findLessThan)

  * [forEach](#comb_collections_Tree_prototype_forEach)

  * [insert](#comb_collections_Tree_prototype_insert)

  * [isEmpty](#comb_collections_Tree_prototype_isEmpty)

  * [map](#comb_collections_Tree_prototype_map)

  * [print](#comb_collections_Tree_prototype_print)

  * [reduce](#comb_collections_Tree_prototype_reduce)

  * [reduceRight](#comb_collections_Tree_prototype_reduceRight)

  * [remove](#comb_collections_Tree_prototype_remove)

  * [some](#comb_collections_Tree_prototype_some)

  * [toArray](#comb_collections_Tree_prototype_toArray)

  * [traverse](#comb_collections_Tree_prototype_traverse)

  * [traverseWithCondition](#comb_collections_Tree_prototype_traverseWithCondition)


###Constructor

*Defined collections/Tree.js* [Top](#top)

     
*Arguments*

        
 * _options_ `Object` : options to initialize the tree
        
 * _options.compare_ `Function` : function used to compare items in a tree must return an integer   <ul>       </li>-1 for less than</li>       </li>0 for equal</li>       </li>1 for greater than</li>   </ul>
        
     


*Source*

```javascript
function (options){
   options = options || {};
   this.compare = options.compare || compare;
   this.__root = null;
           
}
```


  

  
<a name="comb_collections_Tree_prototype_clear"></a>
###clear

---
*Defined collections/Tree.js* [Top](#top)

Clear all items from a tree
        
     
     

*Source*

```javascript
function (){
   this.__root = null;
           
}
```

  
<a name="comb_collections_Tree_prototype_contains"></a>
###contains

---
*Defined collections/Tree.js* [Top](#top)

Determines if a value is contained in the tree
        
     
*Arguments*

        
 * _value_ `*` : the value to find
        
     
     
*Returns*

        
 * `Boolean` true if the tree contains the item false otherwise.
        
     

*Source*

```javascript
function (value){
   var ret = false;
   var root = this.__root;
   while (root != null) {
       var cmp = this.compare(value, root.data);
       if (cmp) {
           root = root[(cmp == -1) ? "left" : "right"];
       } else {
           ret = true;
           root = null;
       }
   }
   return ret;
           
}
```

  
<a name="comb_collections_Tree_prototype_every"></a>
###every

---
*Defined collections/Tree.js* [Top](#top)

Determines if every item meets the condition returned by the callback.
        
     
*Arguments*

        
 * _cb_ `Function` : called for each item in the tree
        
 * _[scope=this]_ `Object` : scope to call the function in
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
     
     
*Returns*

        
 * `Boolean` True if every item passed false otherwise
        
     

*Source*

```javascript
function (cb,scope,order){
   if (typeof cb !== "function")
       throw new TypeError();
   order = order || Tree.IN_ORDER;
   scope = scope || this;
   var ret = false;
   this.traverseWithCondition(this.__root, order, function(node) {
       return (ret = cb.call(scope, node, this));
   });
   return ret;
           
}
```

  
<a name="comb_collections_Tree_prototype_filter"></a>
###filter

---
*Defined collections/Tree.js* [Top](#top)

Filters a tree, only returning items that result in true being returned from the callback
        
     
*Arguments*

        
 * _cb_ `Function` : called for each item in the tree
        
 * _[scope=this]_ `Object` : scope to call the function in
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
     
     
*Returns*

        
 * `comb.collections.Tree` the tree with items that resulted in true being returned from the callback
        
     

*Source*

```javascript
function (cb,scope,order){
   if (typeof cb !== "function")
       throw new TypeError();
   order = order || Tree.IN_ORDER;
   scope = scope || this;
   var ret = new this._static();
   this.traverse(this.__root, order, function(node) {
       var include = cb.call(scope, node, this);
       include && ret.insert(node);
   });
   return ret;
           
}
```

  
<a name="comb_collections_Tree_prototype_find"></a>
###find

---
*Defined collections/Tree.js* [Top](#top)

Finds a value in the tree
        
     
*Arguments*

        
 * _value_ `*` : the value to find
        
     
     
*Returns*

        
 *  the value of the node that matched
        
     

*Source*

```javascript
function (value){
   var ret;
   var root = this.__root;
   while (root != null) {
       var cmp = this.compare(value, root.data);
       if (cmp) {
           root = root[(cmp == -1) ? "left" : "right"];
       } else {
           ret = root.data;
           break;
       }
   }
   return ret;
           
}
```

  
<a name="comb_collections_Tree_prototype_findGreaterThan"></a>
###findGreaterThan

---
*Defined collections/Tree.js* [Top](#top)

Find all greater than a value
        
     
*Arguments*

        
 * _value_ `*` : the value to find nodes greater than
        
 * _[exclusive=false]_ `Boolean` : if true the value will NOT be included in the return array
        
     
     
*Returns*

        
 * `Array` the array containing all values greater than
        
     

*Source*

```javascript
function (value,exclusive){
   //find a better way!!!!
   var ret = [], compare = this.compare;
   this.traverse(this.__root, exports.REVERSE_ORDER, function(v) {
       var cmp = compare(value, v);
       if ((!exclusive && cmp == 0) || cmp == -1) {
           ret.push(v);
           return true;
       } else {
           return false;
       }
   });
   return ret;
           
}
```

  
<a name="comb_collections_Tree_prototype_findLessThan"></a>
###findLessThan

---
*Defined collections/Tree.js* [Top](#top)

Find all values less than a value
        
     
*Arguments*

        
 * _value_ `*` : the value to find nodes less than
        
 * _[exclusive=false]_ `Boolean` : if true the value will NOT be included in the return array
        
     
     
*Returns*

        
 * `Array` the array containing all values less than
        
     

*Source*

```javascript
function (value,exclusive){
   //find a better way!!!!
   var ret = [], compare = this.compare;
   this.traverseWithCondition(this.__root, exports.IN_ORDER, function(v) {
       var cmp = compare(value, v);
       if ((!exclusive && cmp == 0) || cmp == 1) {
           ret.push(v);
           return true;
       } else {
           return false;
       }
   });
   return ret;
           
}
```

  
<a name="comb_collections_Tree_prototype_forEach"></a>
###forEach

---
*Defined collections/Tree.js* [Top](#top)

Loop through each item in the tree
        
     
*Arguments*

        
 * _cb_ `Function` : called for each item in the tree
        
 * _[scope=this]_ `Object` : scope to call the function in
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
     
     

*Source*

```javascript
function (cb,scope,order){
   if (typeof cb !== "function")
       throw new TypeError();
   order = order || Tree.IN_ORDER;
   scope = scope || this;
   this.traverse(this.__root, order, function(node) {
       cb.call(scope, node, this);
   });
           
}
```

  
<a name="comb_collections_Tree_prototype_insert"></a>
###insert

---
*Defined collections/Tree.js* [Top](#top)

Inserts an item into the tree
        
     
*Arguments*

        
 * _data_ `Anything` : the item to insert
        
     
     

*Source*

```javascript
function (data){
   throw new Error("Not Implemented");
           
}
```

  
<a name="comb_collections_Tree_prototype_isEmpty"></a>
###isEmpty

---
*Defined collections/Tree.js* [Top](#top)

Test if a tree is empty
        
     
     
*Returns*

        
 * `Boolean` true if empty false otherwise
        
     

*Source*

```javascript
function (){
   return this.__root == null;
           
}
```

  
<a name="comb_collections_Tree_prototype_map"></a>
###map

---
*Defined collections/Tree.js* [Top](#top)

Loop through each item in the tree, collecting the value returned by the callback funciton.
        
     
*Arguments*

        
 * _cb_ `Function` : called for each item in the tree.                    Whatever the function returns is inserted into the return tree
        
 * _[scope=this]_ `Object` : scope to call the function in
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
     
     
*Returns*

        
 * `comb.collections.Tree` the tree with the mapped items
        
     

*Source*

```javascript
function (cb,scope,order){
   if (typeof cb !== "function")
       throw new TypeError();
   order = order || Tree.IN_ORDER;
   scope = scope || this;
   var construct = this._static;
   var ret = new this._static();
   this.traverse(this.__root, order, function(node) {
       ret.insert(cb.call(scope, node, this));
   });
   return ret;
           
}
```

  
<a name="comb_collections_Tree_prototype_print"></a>
###print

---
*Defined collections/Tree.js* [Top](#top)

Prints a tree to the console.
        
     
     

*Source*

```javascript
function (){
   this.__printNode(this.__root, 0);
           
}
```

  
<a name="comb_collections_Tree_prototype_reduce"></a>
###reduce

---
*Defined collections/Tree.js* [Top](#top)

Reduces a tree
        
     
*Arguments*

        
 * _fun_ `Function` : called for each item in the tree
        
 * _[accumulator=First item in tree(Order dependant)]_  : scope to call the function in
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
     
     
*Returns*

        
 *  the result of the reduce function
        
     

*Source*

```javascript
function (fun,accumulator,order){
   var arr = this.toArray(order);
   var args = [fun];
   !base.isUndefinedOrNull(accumulator) && args.push(accumulator)
   return arr.reduce.apply(arr, args);
           
}
```

  
<a name="comb_collections_Tree_prototype_reduceRight"></a>
###reduceRight

---
*Defined collections/Tree.js* [Top](#top)

Reduces from right to left
        
     
*Arguments*

        
 * _fun_ `Function` : called for each item in the tree
        
 * _[accumulator=First item in tree(Order dependant)]_  : scope to call the function in
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
     
     
*Returns*

        
 *  the result of the reduce function
        
     

*Source*

```javascript
function (fun,accumulator,order){
   var arr = this.toArray(order);
   var args = [fun];
   !base.isUndefinedOrNull(accumulator) && args.push(accumulator)
   return arr.reduceRight.apply(arr, args);
           
}
```

  
<a name="comb_collections_Tree_prototype_remove"></a>
###remove

---
*Defined collections/Tree.js* [Top](#top)

Removes an item from the tree
        
     
*Arguments*

        
 * _data_ `Anything` : the item to insert
        
     
     

*Source*

```javascript
function (data){
   throw new Error("Not Implemented");
           
}
```

  
<a name="comb_collections_Tree_prototype_some"></a>
###some

---
*Defined collections/Tree.js* [Top](#top)

Determines if some item meet the condition returned by the callback. Traversal ends the first time true is found.
        
     
*Arguments*

        
 * _cb_ `Function` : called for each item in the tree
        
 * _[scope=this]_ `Object` : scope to call the function in
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
     
     
*Returns*

        
 * `Boolean` True if every item passed false otherwise
        
     

*Source*

```javascript
function (cb,scope,order){
   if (typeof cb !== "function")
       throw new TypeError();
   order = order || Tree.IN_ORDER;
   scope = scope || this;
   var ret;
   this.traverseWithCondition(this.__root, order, function(node) {
       ret = cb.call(scope, node, this);
       return !ret;
   });
   return ret;
           
}
```

  
<a name="comb_collections_Tree_prototype_toArray"></a>
###toArray

---
*Defined collections/Tree.js* [Top](#top)

Converts a tree into an array based on the specified order
        
     
*Arguments*

        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
     
     
*Returns*

        
 * `Array` array of all items in the order specified.
        
     

*Source*

```javascript
function (order){
   order = order || Tree.IN_ORDER;
   var arr = [];
   this.traverse(this.__root, order, function(node) {
       arr.push(node);
   });
   return arr;
           
}
```

  
<a name="comb_collections_Tree_prototype_traverse"></a>
###traverse

---
*Defined collections/Tree.js* [Top](#top)

Traverse a tree

 <p><b>Not typically used directly</b></p>
        
     
*Arguments*

        
 * _node_ `Object` : the node to start at
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
 * _callback_ `Function` : called for each item
        
     
     

*Source*

```javascript
function (node,order,callback){
   if (node) {
       order = order || Tree.PRE_ORDER;
       if (order === Tree.PRE_ORDER) {
           callback(node.data);
           this.traverse(node.left, order, callback);
           this.traverse(node.right, order, callback);
       } else if (order === Tree.IN_ORDER) {
           this.traverse(node.left, order, callback);
           callback(node.data);
           this.traverse(node.right, order, callback);
       } else if (order === Tree.POST_ORDER) {
           this.traverse(node.left, order, callback);
           this.traverse(node.right, order, callback);
           callback(node.data);
       } else if (order === Tree.REVERSE_ORDER) {
           this.traverseWithCondition(node.right, order, callback);
           callback(node.data);
           this.traverseWithCondition(node.left, order, callback);
       }
   }
           
}
```

  
<a name="comb_collections_Tree_prototype_traverseWithCondition"></a>
###traverseWithCondition

---
*Defined collections/Tree.js* [Top](#top)

Traverse a tree until the callback function returns false

 <p><b>Not typically used directly</b></p>
        
     
*Arguments*

        
 * _node_ `Object` : the node to start at
        
 * _[order=Tree.IN_ORDER]_ `Tree.PRE_ORDER|Tree.POST_ORDER|Tree.IN_ORDER|Tree.REVERSE_ORDER` : the traversal scheme
        
 * _callback_ `Function` : called for each item, traversal continues until the function returns false
        
     
     

*Source*

```javascript
function (node,order,callback){
   var cont = true;
   if (node) {
       order = order || Tree.PRE_ORDER;
       if (order === Tree.PRE_ORDER) {
           cont = callback(node.data);
           if (cont) {
               cont = this.traverseWithCondition(node.left, order, callback);
               cont && (cont = this.traverseWithCondition(node.right, order, callback));
           }
       } else if (order === Tree.IN_ORDER) {
           cont = this.traverseWithCondition(node.left, order, callback);
           if (cont) {
               cont = callback(node.data);
               cont && (cont = this.traverseWithCondition(node.right, order, callback));
           }
       } else if (order === Tree.POST_ORDER) {
           cont = this.traverseWithCondition(node.left, order, callback);
           if (cont) {
               cont && (cont = this.traverseWithCondition(node.right, order, callback));
               cont && (cont = callback(node.data));
           }
       } else if (order === Tree.REVERSE_ORDER) {
           cont = this.traverseWithCondition(node.right, order, callback);
           if (cont) {
               cont = callback(node.data);
               cont && (cont = this.traverseWithCondition(node.left, order, callback));
           }
       }
   }
   return cont;
           
}
```

  

<a name="comb_logging_BasicConfigurator"></a>
##comb.logging.BasicConfigurator

[Top](#top)

default configurator for logging

        









*Instance*

  * [configure](#comb_logging_BasicConfigurator_prototype_configure)

  * [constructor](#comb_logging_BasicConfigurator_prototype_constructor)


###Constructor

*Defined logging/config.js* [Top](#top)

     


*Source*

```javascript
(exports.BasicConfigurator = define(null, {
```


  

  
<a name="comb_logging_BasicConfigurator_prototype_configure"></a>
###configure

---
*Defined logging/config.js* [Top](#top)

Configure logging.
        
     
*Arguments*

        
 * _[appender=null]_ `comb.logging.Appender` : appender to add to the root logger, by default a console logger is added.
        
     
     

*Source*

```javascript
function (appender){
   var rootLogger = Logger.getRootLogger();
   rootLogger.removeAllAppenders();
   if (base.isInstanceOf(appender, appenders.Appender)) {
       rootLogger.addAppender(appender);
   } else {
       rootLogger.addAppender(new appenders.ConsoleAppender());
   }
   checkProcessUncaughtException();
           
}
```

  
<a name="comb_logging_BasicConfigurator_prototype_constructor"></a>
###constructor

---
*Defined logging/config.js* [Top](#top)


        
     
     

*Source*

```javascript
function (){
   if (!Logger) {
       logging = require("./index").logging;
       Logger = logging.Logger;
       Level = logging.Level;
       appenders = logging.appenders;
   }
           
}
```

  

<a name="comb_logging_Level"></a>
##comb.logging.Level

[Top](#top)

Level class used to describe logging levels. The levels determine what types of events are logged to the appenders
  for example the if Level.ALL is used then all event will be logged, however if Level.INFO was used then <b>ONLY</b>
  INFO, WARN, ERROR, and FATAL events will be logged. To turn off logging for a logger use Level.OFF.

 <p><b>Not typically instantiated directly, but through staticly defined levels</b></p>

        
*Example*

```javascript
 //Levels in ascending order
 comb.logging.Level.ALL
 comb.logging.Level.DEBUG
 comb.logging.Level.TRACE
 comb.logging.Level.INFO
 comb.logging.Level.WARN
 comb.logging.Level.ERROR
 comb.logging.Level.FATAL
 comb.logging.Level.OFF

 //or
 Level.getLevel("INFO");


```





*Static Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td><em>ALL</em></td><td>null</td><td>Level to allow logging of all events.</td><tr><tr><td><em>DEBUG</em></td><td>null</td><td>Logs only events debug or greater.</td><tr><tr><td><em>ERROR</em></td><td>null</td><td>Error or fatal events</td><tr><tr><td><em>FATAL</em></td><td>null</td><td>Only fatal events</td><tr><tr><td><em>INFO</em></td><td>null</td><td>Only info, or error related events</td><tr><tr><td><em>OFF</em></td><td>null</td><td>No events will be logged.</td><tr><tr><td><em>TRACE</em></td><td>null</td><td>Like debug but provides a finer level of detail</td><tr><tr><td><em>WARN</em></td><td>null</td><td>Only warn or error related events</td><tr></table>


*Instance Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td>level</td><td></td><td>the numerical representation of this level.</td><tr><tr><td>name</td><td></td><td>the name of level.</td><tr></table>



*Static*

  * [addLevel](#comb_logging_Level_addLevel)

  * [toLevel](#comb_logging_Level_toLevel)




*Instance*

  * [constructor](#comb_logging_Level_prototype_constructor)

  * [equals](#comb_logging_Level_prototype_equals)

  * [isGreaterOrEqualToo](#comb_logging_Level_prototype_isGreaterOrEqualToo)


###Constructor

*Defined logging/level.js* [Top](#top)

     


*Source*

```javascript
(exports = module.exports = define(null, {
```


  
<a name="comb_logging_Level_addLevel"></a>
###*addLevel*

---
*Defined logging/level.js* [Top](#top)

Adds a new level to the Level object.
        
*Example*

```javascript
logger = Logger.getLogger("my.logger");

 //create the custom level
 Level.addLevel("custom_Level", 20);

 //now set the level on a logger
 logger.level = Level.CUSTOM_LEVEL;


```

     
*Arguments*

        
 * _label_ `string` : the label of the level, <b>Note:</b> the label will be coverted to uppercase.
        
 * _level_ `number` : the level of the level
        
     
     
*Returns*

        
 * `undefined|comb.logging.Level` the level that was created.
        
     

*Source*

```javascript
function (label,level){
   var ret;
   if (base.isString(label) && base.isNumber(level)) {
       label = label.toUpperCase();
       LEVELS_REVERSE[level] = label;
       LEVELS[label] = level;
       ret = (this[label] = new Level(level, label));
   }
   return ret;
           
}
```

  
<a name="comb_logging_Level_toLevel"></a>
###*toLevel*

---
*Defined logging/level.js* [Top](#top)

Converts a numerical or string representation of a level, if a default level is provided,
 then if a level cannot be determined then the default level is used.
        
     
*Arguments*

        
 * _level_ `Number|String|comb.logging.Level` : the level to try to convert
        
 * _defaultLevel?_ `comb.logging.Level` : default level to use if one cannot be determined,
        
     
     
*Returns*

        
 * `comb.logging.Level|null` returns a level if one can be determined null otherwise.
        
     

*Source*

```javascript
function (level,defaultLevel){
   var ret = null;
   var args = base.argsToArray(arguments);
   if (args.length === 1) {
       var level = args[0];
       if (base.isNumber(level)) {
           var strLevel = LEVELS_REVERSE[level];
           ret = Level[strLevel];
       } else if (base.isString(level)) {
           ret = Level[level.toUpperCase()];
       } else {
           ret = level;
       }
   } else {
       ret = (Level.toLevel(args[0]) || args[1]);
   }
   return ret;
           
}
```

  

  
<a name="comb_logging_Level_prototype_constructor"></a>
###constructor

---
*Defined logging/level.js* [Top](#top)


        
     
*Arguments*

        
 * _level_  : 
        
 * _name_  : 
        
     
     

*Source*

```javascript
function (level,name){
   this.level = level;
   this.name = name;
           
}
```

  
<a name="comb_logging_Level_prototype_equals"></a>
###equals

---
*Defined logging/level.js* [Top](#top)

Determing if this level is equal to another level based off of the numerical rank.
        
     
*Arguments*

        
 * _level_ `comb.logging.Level` : the level to compare
        
     
     
*Returns*

        
 * `Boolean` true if this is equal to that false otherwise.
        
     

*Source*

```javascript
function (level){
   return level.level == this.level;
           
}
```

  
<a name="comb_logging_Level_prototype_isGreaterOrEqualToo"></a>
###isGreaterOrEqualToo

---
*Defined logging/level.js* [Top](#top)

Determing if this level is >= another level
        
     
*Arguments*

        
 * _level_ `comb.logging.Level` : the level to test against
        
     
     
*Returns*

        
 * `Boolean` true if this is >= false otherwise.
        
     

*Source*

```javascript
function (level){
   var ret = false;
   if (level && base.isNumber(level.level)) {
       if (this.level >= level.level) {
           ret = true;
       }
   }
   return ret;
           
}
```

  

<a name="comb_logging_Logger"></a>
##comb.logging.Logger

[Top](#top)

This class is the entry point for all logging actions in comb.
 <p><b>Logger should be retrieved by calling Logger.getLogger() NOT through the new keyword</b></p>
 <p>
 All loggers in comb follow a heirarchy of inheritance based on a dot notation.
 <pre class="code">
      rootLogger - ""
              /         \
           "my"      "myOther"
           /               \
     "my.logger"       "myOther.logger"
        /                     \
   "my.logger.Log"        "myOther.logger.Log"

 </pre>
 In the above Tree the rootLogger is the base for all logger. my and myOther inherit from rootLogger
 my.logger inherits from my, and myOther.logger inherits from myOther. The logs do not have to be retrieved in
 order. If I set rootLogger to ERROR level and added a console appender to it the appender and level will be
 added to all logs. However if I set my to INFO level and add a fileAppender to it the level and appender will
 only be added to logs in "my" subtree. If you set my.logger to not be additive then levels, and appenders will not
 propogate down to the rest of the tree.

 </p>

 <p>For information on levels see [comb.logging.Level](#comb_logging_Level).</p>
 <p>For information on appenders see
          <ul>
              <li>[comb.logging.appenders.Appender](#comb_logging_appenders_Appender)</li>
              <li>[comb.logging.appenders.ConsoleAppender](#comb_logging_appenders_ConsoleAppender)</li>
              <li>[comb.logging.appenders.FileAppender](#comb_logging_appenders_FileAppender)</li>
              <li>[comb.logging.appenders.JSONAppender](#comb_logging_appenders_JSONAppender)</li>
              <li>[comb.logging.appenders.RollingFileAppender](#comb_logging_appenders_RollingFileAppender)</li>
          </ul>
 </p>
 <p>For information on configurators see [comb.logging.BasicConfigurator](#comb_logging_BasicConfigurator) or [comb.logging.PropertyConfigurator](#comb_logging_PropertyConfigurator).</p>

        
*Example*

```javascript
 var logging = comb.logging,
     Logger = logging.Logger,
     appenders = logging.appenders,
     Level = logging.Level;

 //configure you logging environement

 var bc = logging.BasicConfigurator();
 //add console appender to all loggers
 bc.configure();
 //add a file appender to all loggers
 bc.configure(new appenders.FileAppender({file : "/var/log/myLog.log"}));

 //Retreiving a logger.
 var combLogger = Logger.getLogger("comb");
 var combCollectionLogger = Logger.getLogger("comb.collections");
 var treeLogger = Logger.getLogger("comb.collections.Tree");

 //set my treeLogger to DEBUG Level
 treeLogger.level = Level.DEBUG;
 //add a JSON appender to tree logger just for fun!
 treeLogger.addAppender(new appenders.JSONAppender({file : "/var/log/myTreeLogger.json"}));

 //NOW USE THEM



```






*Instance Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td>additive</td><td></td><td>set to false to prevent changes to this logger from propogating down.</td><tr><tr><td>appenders</td><td></td><td>list of appenders this logger currently contains.</td><tr><tr><td>fullName</td><td></td><td>the full path name of this Logger.</td><tr><tr><td>isDebug</td><td></td><td>true if this Loggers level is DEBUG</td><tr><tr><td>isError</td><td></td><td>true if this Loggers level is ERROR</td><tr><tr><td>isFatal</td><td></td><td>true if this Loggers level is FATAL</td><tr><tr><td>isInfo</td><td></td><td>true if this Loggers level is INFO</td><tr><tr><td>isOff</td><td></td><td>true if this Loggers level is OFF</td><tr><tr><td>isTrace</td><td></td><td>true if this Loggers level is TRACE</td><tr><tr><td>isWarn</td><td></td><td>true if this Loggers level is WARN</td><tr><tr><td>level</td><td></td><td>the level of this Logger</td><tr><tr><td>name</td><td></td><td>the name of this logger this <b>does not</b> include the dot notated name</td><tr><tr><td>subLoggers</td><td></td><td>all loggers this logger is the parent of.</td><tr></table>



*Static*

  * [getLogger](#comb_logging_Logger_getLogger)

  * [getRootLogger](#comb_logging_Logger_getRootLogger)




*Instance*

  * [addAppender](#comb_logging_Logger_prototype_addAppender)

  * [addAppenders](#comb_logging_Logger_prototype_addAppenders)

  * [constructor](#comb_logging_Logger_prototype_constructor)

  * [debug](#comb_logging_Logger_prototype_debug)

  * [error](#comb_logging_Logger_prototype_error)

  * [fatal](#comb_logging_Logger_prototype_fatal)

  * [getAppender](#comb_logging_Logger_prototype_getAppender)

  * [info](#comb_logging_Logger_prototype_info)

  * [isAppenderAttached](#comb_logging_Logger_prototype_isAppenderAttached)

  * [log](#comb_logging_Logger_prototype_log)

  * [removeAllAppenders](#comb_logging_Logger_prototype_removeAllAppenders)

  * [removeAppender](#comb_logging_Logger_prototype_removeAppender)

  * [removeAppenders](#comb_logging_Logger_prototype_removeAppenders)

  * [trace](#comb_logging_Logger_prototype_trace)

  * [warn](#comb_logging_Logger_prototype_warn)


###Constructor

*Defined logging/index.js* [Top](#top)

     


*Source*

```javascript
(logging.Logger = define.define(null, {
```


  
<a name="comb_logging_Logger_getLogger"></a>
###*getLogger*

---
*Defined logging/index.js* [Top](#top)

Retrieves/Creates a logger based on the name passed in
        
     
*Arguments*

        
 * _name_ `String` : the name of the logger
        
     
     

*Source*

```javascript
function (name){
   return rootTree.getLogger(name);
           
}
```

  
<a name="comb_logging_Logger_getRootLogger"></a>
###*getRootLogger*

---
*Defined logging/index.js* [Top](#top)

Return the root of all loggers
        
     
     

*Source*

```javascript
function (){
   return rootTree.getRootLogger();
           
}
```

  

  
<a name="comb_logging_Logger_prototype_addAppender"></a>
###addAppender

---
*Defined logging/index.js* [Top](#top)

Add an appender to this logger. If this is additive then the appender is added to all subloggers.
        
     
*Arguments*

        
 * _appender_ `comb.logging.Appender` : the appender to add.
        
     
     

*Source*

```javascript
function (appender){
   if (!base.isUndefinedOrNull(appender)) {
       var name = appender.name;
       if (!(name in this.__appenders)) {
           this.__appenders[name] = appender;
           if (!appender.level) {
               appender.level = this.level;
           }
           this._tree.addAppender(appender);
       }
   }
           
}
```

  
<a name="comb_logging_Logger_prototype_addAppenders"></a>
###addAppenders

---
*Defined logging/index.js* [Top](#top)

Short cut to add a list of appenders to this Logger
        
     
*Arguments*

        
 * _appenders_ `Array<comb.logging.Appender>` : 
        
     
     

*Source*

```javascript
function (appenders){
   appenders.forEach(base.hitch(this, "addAppender"));
           
}
```

  
<a name="comb_logging_Logger_prototype_constructor"></a>
###constructor

---
*Defined logging/index.js* [Top](#top)


        
     
*Arguments*

        
 * _name_  : 
        
 * _parent_  : 
        
     
     

*Source*

```javascript
function (name,parent){
   this.__additive = true;
   this.__name = name;
   this._parent = parent;
   this._tree = new LoggerTree(this);
   this.fullName = this._tree.name;
   if (!parent || !parent.additive) {
       this.level = Level.ALL;
   } else {
       this.level = parent.level;
   }
   this.__appenders = {};
           
}
```

  
<a name="comb_logging_Logger_prototype_debug"></a>
###debug

---
*Defined logging/index.js* [Top](#top)

Log an debug level message
        
     
*Arguments*

        
 * _message_ `String` : the message to log.
        
     
     

*Source*

```javascript
function (message){
   this.log(Level.DEBUG, message);
           
}
```

  
<a name="comb_logging_Logger_prototype_error"></a>
###error

---
*Defined logging/index.js* [Top](#top)

Log an error level message
        
     
*Arguments*

        
 * _message_ `String` : the message to log.
        
     
     

*Source*

```javascript
function (message){
   this.log(Level.ERROR, message);
           
}
```

  
<a name="comb_logging_Logger_prototype_fatal"></a>
###fatal

---
*Defined logging/index.js* [Top](#top)

Log an fatal level message
        
     
*Arguments*

        
 * _message_ `String` : the message to log.
        
     
     

*Source*

```javascript
function (message){
   this.log(Level.FATAL, message);
           
}
```

  
<a name="comb_logging_Logger_prototype_getAppender"></a>
###getAppender

---
*Defined logging/index.js* [Top](#top)

Gets an appender from this logger
        
     
*Arguments*

        
 * _name_ `String` : the name of the appender.
        
     
     
*Returns*

        
 * `comb.logging.Appender|undefined` returns the appender with the specified name or
                                          undefined if it is not found.
        
     

*Source*

```javascript
function (name){
   var ret;
   if (name in this.__appenders) {
       ret = this.__appenders[name];
   }
   return ret;
           
}
```

  
<a name="comb_logging_Logger_prototype_info"></a>
###info

---
*Defined logging/index.js* [Top](#top)

Log an info level message
        
     
*Arguments*

        
 * _message_ `String` : the message to log.
        
     
     

*Source*

```javascript
function (message){
   this.log(Level.INFO, message);
           
}
```

  
<a name="comb_logging_Logger_prototype_isAppenderAttached"></a>
###isAppenderAttached

---
*Defined logging/index.js* [Top](#top)

Determines if an appender is attached.
        
     
*Arguments*

        
 * _name_ `String` : the name of the appender.
        
     
     

*Source*

```javascript
function (name){
   return (name in this.__appenders);
           
}
```

  
<a name="comb_logging_Logger_prototype_log"></a>
###log

---
*Defined logging/index.js* [Top](#top)

Log a message
        
     
*Arguments*

        
 * _level_ `comb.logging.Level` : the level the message is
        
 * _message_ `String` : the message to log.
        
     
     

*Source*

```javascript
function (level,message){
   if (level.isGreaterOrEqualToo(this.level)) {
       if (Level.TRACE.equals(level)) {
           var err = new Error;
           err.name = "Trace";
           err.message = message || '';
           Error.captureStackTrace(err, arguments.callee);
           message = err.stack;
       } else if (Level.ERROR.equals(level) && base.isInstanceOf(message, Error)) {
           message = message.stack;
       }
       var type = level.name.toLowerCase(), appenders = this.__appenders;
       var event = {
           level:level,
           levelName:level.name,
           message:message,
           timeStamp:new Date(),
           name:this.fullName
       };
       for (var i in appenders) {
           appenders[i].append(event);
       }
   }
           
}
```

  
<a name="comb_logging_Logger_prototype_removeAllAppenders"></a>
###removeAllAppenders

---
*Defined logging/index.js* [Top](#top)

Removes all appenders from this logger and sub loggers if this Logger is additive.
        
     
     

*Source*

```javascript
function (){
   for (var i in this.__appenders) {
       this.removeAppender(i);
   }
           
}
```

  
<a name="comb_logging_Logger_prototype_removeAppender"></a>
###removeAppender

---
*Defined logging/index.js* [Top](#top)

Removes and appender from this logger.
        
     
*Arguments*

        
 * _name_ `String` : the name of the appender
        
     
     

*Source*

```javascript
function (name){
   if (name in this.__appenders) {
       delete this.__appenders[name];
       this._tree.removeAppender(name);
   }
           
}
```

  
<a name="comb_logging_Logger_prototype_removeAppenders"></a>
###removeAppenders

---
*Defined logging/index.js* [Top](#top)

Removes a list of appenders from this logger.
        
     
*Arguments*

        
 * _appenders_ `Array<String>` : a list of names of appenders to remove
        
     
     

*Source*

```javascript
function (appenders){
   appenders.forEach(this.removeAppender, this);
           
}
```

  
<a name="comb_logging_Logger_prototype_trace"></a>
###trace

---
*Defined logging/index.js* [Top](#top)

Log an trace level message
        
     
*Arguments*

        
 * _message_ `String` : the message to log.
        
     
     

*Source*

```javascript
function (message){
   this.log(Level.TRACE, message);
           
}
```

  
<a name="comb_logging_Logger_prototype_warn"></a>
###warn

---
*Defined logging/index.js* [Top](#top)

Log an warn level message
        
     
*Arguments*

        
 * _message_ `String` : the message to log.
        
     
     

*Source*

```javascript
function (message){
   this.log(Level.WARN, message);
           
}
```

  

<a name="comb_logging_PropertyConfigurator"></a>
##comb.logging.PropertyConfigurator

[Top](#top)

Configures comb.Logger with the properties or properties contained within a file

        
*Example*

```javascript
 var propertyConfigurator = new comb.logging.PropertyConfigurator();

 propertyConfigurator.configure("/location/of/combLogger.json");

 //or

 var config = {
     "my.logger" : {
         level : "INFO",
         appenders : [
             {
                 //default file appender
                 type : "FileAppender",
                 file : "/var/log/myApp.log",
             },
             {
                 //default JSON appender
                 type : "JSONAppender",
                 file : "/var/log/myApp.JSON",
             },
             {
                 type : "FileAppender",
                  //override default patter
                 pattern : "{[EEEE, MMMM dd, yyyy h:m a]timeStamp} {[5]level}"
                          + " {[- 5]levelName} {[-20]name} : {message}",
                 //location of my log file
                 file : "/var/log/myApp-errors.log",
                 //override name so it will get added to the log
                 name : "errorFileAppender",
                 //overwrite each time
                 overwrite : true,
                 //explicity set the appender to only accept errors
                 level : "ERROR"
             },
             {
                 type : "JSONAppender",
                 file : "/var/log/myApp-error.json",
                 //explicity set the appender to only accept errors
                 level : "ERROR"
             }
         ]
     }
     //repeat for more loggers

     propertyConfigurator.configure(config);
 }


```



*Extends*

  * [comb.logging.BasicConfigurator](#comb_logging_BasicConfigurator)









*Instance*

  * [configure](#comb_logging_PropertyConfigurator_prototype_configure)


###Constructor

*Defined logging/config.js* [Top](#top)

     


*Source*

```javascript
define(BasicConfigurator, {
```


  

  
<a name="comb_logging_PropertyConfigurator_prototype_configure"></a>
###configure

---
*Defined logging/config.js* [Top](#top)

Call to configure logging
        
*Example*

```javascript
//Example configuration
  {
     "my.logger" : {
         level : "INFO",
         appenders : [
             {
                 //default file appender
                 type : "FileAppender",
                 file : "/var/log/myApp.log",
             },
             {
                 //default JSON appender
                 type : "JSONAppender",
                 file : "/var/log/myApp.JSON",
             },
             {
                 type : "FileAppender",
                  //override default patter
                 pattern : "{[EEEE, MMMM dd, yyyy h:m a]timeStamp} {[5]level}"
                          + " {[- 5]levelName} {[-20]name} : {message}",
                 //location of my log file
                 file : "/var/log/myApp-errors.log",
                 //override name so it will get added to the log
                 name : "errorFileAppender",
                 //overwrite each time
                 overwrite : true,
                 //explicity set the appender to only accept errors
                 level : "ERROR"
             },
             {
                 type : "JSONAppender",
                 file : "/var/log/myApp-error.json",
                 //explicity set the appender to only accept errors
                 level : "ERROR"
             }
         ]
     }


```

     
*Arguments*

        
 * _properties_ `Object|String` : Object containing configuration or string containing a file name with the configuration.
        
     
     

*Source*

```javascript
function (properties){
   var rootLogger = Logger.getRootLogger();
   rootLogger.removeAllAppenders();
   if (base.isHash(properties)) {
       parseProperties(properties);
   } else {
       fs.readFile(properties, function (err, res) {
           if (err) {
               throw err;
           } else {
               try {
                   parseProperties(JSON.parse(res));
               } catch (e) {
                   throw e;
               }
           }
       });
   }
           
}
```

  

<a name="comb_logging_appenders_Appender"></a>
##comb.logging.appenders.Appender

[Top](#top)

Base class for all appenders

        





*Instance Properties*
<table><tr><td>Property</td><td>Default Value</td><td>Description</td></tr><tr><td>level</td><td></td><td>the level of this Appender.</td><tr><tr><td>name</td><td></td><td>the name of this Appender.</td><tr><tr><td>pattern</td><td></td><td>the pattern for this Appender.</td><tr></table>





*Instance*

  * [append](#comb_logging_appenders_Appender_prototype_append)

  * [constructor](#comb_logging_appenders_Appender_prototype_constructor)


###Constructor

*Defined logging/appenders/appender.js* [Top](#top)

     


*Source*

```javascript
(exports = module.exports = define(null, {
```


  

  
<a name="comb_logging_appenders_Appender_prototype_append"></a>
###append

---
*Defined logging/appenders/appender.js* [Top](#top)

Appends a message to a log.
 <b>This method is abstract and must be implemented in subclasses</b>
        
     
*Arguments*

        
 * _event_ `Object` : the logging event to log.
        
 * _event.timeStamp_ `Date` : the timeStamp of the event.
        
 * _level_ `comb.logging.Level` : the level of the event.
        
 * _name_ `String` : the name of the logger the event was emitted from.
        
 * _message_ `String` : the message that is being logged.
        
     
     

*Source*

```javascript
function (event){
   throw new Error("abstract method");
   				
}
```

  
<a name="comb_logging_appenders_Appender_prototype_constructor"></a>
###constructor

---
*Defined logging/appenders/appender.js* [Top](#top)


        
     
*Arguments*

        
 * _options_  : 
        
     
     

*Source*

```javascript
function (options){
   options = options || {};
   this.name = options.name || "appender";
   this.pattern = options.pattern || "[{[yyyy-MM-ddTHH:mm:ss:SSS (z)]timeStamp}] {[- 5]levelName} {[-20]name} - {message}";
   var level = options.level;
   if(options.level && (level = Level.toLevel(level))){
   	this.__level = level;
   }
   				
}
```

  

<a name="comb_logging_appenders_ConsoleAppender"></a>
##comb.logging.appenders.ConsoleAppender

[Top](#top)

Appends messages to the console.

        


*Extends*

  * [comb.logging.appenders.Appender](#comb_logging_appenders_Appender)









###Constructor

*Defined logging/appenders/consoleAppender.js* [Top](#top)

     



  

  

<a name="comb_logging_appenders_FileAppender"></a>
##comb.logging.appenders.FileAppender

[Top](#top)

Appends messages to a file.

 <pre class="code">
      var fileAppender = new comb.logging.appenders.FileAppender({
                                       file : "/var/log/myLog.log"
                                      });
 </pre>

        


*Extends*

  * [comb.logging.appenders.Appender](#comb_logging_appenders_Appender)









###Constructor

*Defined logging/appenders/fileAppender.js* [Top](#top)

     



  

  

<a name="comb_logging_appenders_JSONAppender"></a>
##comb.logging.appenders.JSONAppender

[Top](#top)

Appends messages to a file in JSON format. The messages are logged to an array in a JSON file
 <b>The file is always overwritten</b>

 <pre class="code">
 //example log.json
 [
    {
      "timestamp" : "Wed Jun 08 2011 11:16:20 GMT-0500 (CDT)",
      "level" : "INFO",
      "name" : "comb",
      "message" :  "INFO MESSAGE!!!!"
    }
  ]

</pre>

        


*Extends*

  * [comb.logging.appenders.FileAppender](#comb_logging_appenders_FileAppender)









###Constructor

*Defined logging/appenders/jsonAppender.js* [Top](#top)

     



  

  

<a name="comb_logging_appenders_RollingFileAppender"></a>
##comb.logging.appenders.RollingFileAppender

[Top](#top)

Appends messages to a file. Rolls files over when a size limit has been reached. Once the max file size has
 been reached it is rolled over to a file called <logName>.log.n where n is a number.

 <p>Example. RollingFileAppender is current writing to myLog.log, the log reaches is max size to it is
 renamed to myLog.log.1 and a new myLog.log is created.</p>

 <p>If maxBackupIndex is reached then the log at that index is deleted. If maxBackupIndex is set to 0 then no log is
 rolled over.</p>

        


*Extends*

  * [comb.logging.appenders.FileAppender](#comb_logging_appenders_FileAppender)









###Constructor

*Defined logging/appenders/rollingFileAppender.js* [Top](#top)

     



  

  

<a name="comb_plugins_Broadcaster"></a>
##comb.plugins.Broadcaster

[Top](#top)

Plugin to allow a class to easily broadcast events

        
*Example*

```javascript
var Mammal = define(comb.plugins.Broadcaster, {
   instance : {

      constructor: function(options) {
          options = options || {};
          this._super(arguments);
          this._type = options.type || "mammal";
      },

      speak : function() {
          var str = "A mammal of type " + this._type + " sounds like";
          this.broadcast("speak", str);
          this.onSpeak(str);
          return str;
      },

      onSpeak : function(){}
    }
 });


 var m = new Mammal({color : "gold"});
 m.listen("speak", function(str){
      //called back from the broadcast event
       console.log(str);
 });
 m.speak();


```










*Instance*

  * [broadcast](#comb_plugins_Broadcaster_prototype_broadcast)

  * [listen](#comb_plugins_Broadcaster_prototype_listen)

  * [unListen](#comb_plugins_Broadcaster_prototype_unListen)


###Constructor

*Defined plugins/Broadcaster.js* [Top](#top)

     


*Source*

```javascript
function (){
   this.__listeners = {};
   				
}
```


  

  
<a name="comb_plugins_Broadcaster_prototype_broadcast"></a>
###broadcast

---
*Defined plugins/Broadcaster.js* [Top](#top)

Broadcasts an event from an object
        
     
*Arguments*

        
 * _name_  : the name of the event to broadcast
        
 * _args?_ `Object|String|Function|Date|Number` : variable number of arguments to pass to listeners, can be anything
        
     
     

*Source*

```javascript
function (topic,args){
   var args = Array.prototype.slice.call(arguments, 0), topic = args.shift();
   if (topic && topic in this.__listeners) {
   	var list = this.__listeners[topic], i = list.length - 1;
   	while (i >= 0) {
   		list[i--].cb.apply(this, args);
   	}
   }
   				
}
```

  
<a name="comb_plugins_Broadcaster_prototype_listen"></a>
###listen

---
*Defined plugins/Broadcaster.js* [Top](#top)

Listens to a broadcasted event
 Simimlar to [comb.listen](#comb_listen)
        
     
*Arguments*

        
 * _topic_ `String` : the topic to listen to
        
 * _callback_ `Function` : the function to callback on event publish
        
     
     
*Returns*

        
 * `Array` handle to disconnect a topic
        
     

*Source*

```javascript
function (topic,callback){
   if (!func.isFunction(callback)) throw new Error("callback must be a function");
   var handle = {
   	topic : topic,
   	cb : callback
   };
   var list = this.__listeners[topic];
   if (!list) {
   	list = (this.__listeners[topic] = [handle]);
   	handle.pos = 0;
   } else {
   	handle.pos = list.push(handle);
   }
   return handle;
   				
}
```

  
<a name="comb_plugins_Broadcaster_prototype_unListen"></a>
###unListen

---
*Defined plugins/Broadcaster.js* [Top](#top)

Disconnects a listener
 Similar to [comb.unListen](#comb_unListen)
        
     
*Arguments*

        
 * _handle_  : disconnect a handle returned from Broadcaster.listen
        
     
     

*Source*

```javascript
function (handle){
   if (handle) {
   	var topic = handle.topic;
   	if (topic in this.__listeners) {
   		var listeners = this.__listeners, list = listeners[topic];
   		if (list) {
   			for (var i = list.length - 1; i >= 0; i--) {
   				if (list[i] == handle) {
   					list.splice(i, 1);
   					break;
   				}
   			}
   		}
   	}
   }
   				
}
```

  

<a name="comb_plugins_Middleware"></a>
##comb.plugins.Middleware

[Top](#top)

Plugin to enable middleware on a class

        
*Example*

```javascript
 var Mammal = define(comb.plugins.Middleware, {
  instance : {

    constructor: function(options) {
        options = options || {};
        this.super(arguments);
        this._type = options.type || "mammal";
    },

    speak : function() {
        var ret = new comb.Promise();
        this._hook("pre", "speak")
                .then(comb.hitch(this, "_hook", "post", "speak"), hitch(ret, "errback"))
                .then(comb.hitch(ret, "callback"), comb.hitch(ret, "errback"));
        return ret;
    }
  }
});

  Mammal.pre('speak', function(next){
     //do something meaningful
     next();
  });
  var m = new Mammal({color : "gold"});
  m.speak();


```








*Static*

  * [post](#comb_plugins_Middleware_post)

  * [pre](#comb_plugins_Middleware_pre)




*Instance*

  * [_hook](#comb_plugins_Middleware_prototype__hook)

  * [post](#comb_plugins_Middleware_prototype_post)

  * [pre](#comb_plugins_Middleware_prototype_pre)


###Constructor

*Defined plugins/Middleware.js* [Top](#top)

     


*Source*

```javascript
function (){
   this.__hooks = obj.merge({}, this.__hooks);
   this._super(arguments);
           
}
```


  
<a name="comb_plugins_Middleware_post"></a>
###*post*

---
*Defined plugins/Middleware.js* [Top](#top)

<p>Use to listen to after an event has occurred i.e. post save</p>

<b>NOTE:</b></br>
 <ul>
     <li>You must call next in order for the middleware chain to complete</li>
      <li>This connects to events on ALL instances of an object</li>
      <li>Hooks are called in the order they are received!</li>
      <li>When connecting your callback will be called in the scope of the class</br>if you want a certain scope use [comb.hitch](#comb_hitch)</li>
  </ul>
        
*Example*

```javascript
Class.post("save", function(next){
               ...
               //you must call next
          });
 
```

     
*Arguments*

        
 * _name_  : 
        
 * _cb_  : 
        
     
     

*Source*

```javascript
function (name,cb){
   var hooks = this.prototype.__hooks;
   var hook = hooks.post[name];
   if (!hook) {
       hook = hooks.post[name] = [];
   }
   hook.push(cb);
           
}
```

  
<a name="comb_plugins_Middleware_pre"></a>
###*pre*

---
*Defined plugins/Middleware.js* [Top](#top)

<p> Use to listen to after an event has occurred i.e. post save</p>

 <b>NOTE:</b></br>
 <ul>
     <li>You must call next in order for the middleware chain to complete</li>
      <li>This connects to events on ALL instances of an object</li>
      <li>Hooks are called in the order they are received!</li>
      <li>When connecting your callback will be called in the scope of the class</br>if you want a certain scope use [comb.hitch](#comb_hitch)</li>
  </ul>
        
*Example*

```javascript
Class.pre("save", function(next){
               ...
               //you must call next
          });
 
```

     
*Arguments*

        
 * _name_  : 
        
 * _cb_  : 
        
     
     

*Source*

```javascript
function (name,cb){
   var hooks = this.prototype.__hooks;
   var hook = hooks.pre[name];
   if (!hook) {
       hook = hooks.pre[name] = [];
   }
   hook.push(cb);
           
}
```

  

  
<a name="comb_plugins_Middleware_prototype__hook"></a>
###_hook

---
*Defined plugins/Middleware.js* [Top](#top)

<p>Protected!</p>

 <p>Call to initiate middleware for the topic</p>
 <p><b>NOTE:</b> this function takes a variable number of arguments
       whatever comes after the op param will be passed into
       the listening function, with the last argument to the listenting
       function being the next function</p>
        
     
*Arguments*

        
 * _state_ `"pre"|"post"` : the state in which the hook should be called
        
 * _op_ `String` : the operation that is being acted upong
        
 * _args_  : arguments to be passed into the listening functions.
        
     
     
*Returns*

        
 * `comb.Promise` a promise to use after middleware chain completes
        
     

*Source*

```javascript
function (state,op,args){
   args = args || [];
   var promise = new Promise();
   var funcs, length;
   if (this.__hooks[state] && (funcs = this.__hooks[state][op]) != null && (length = funcs.length) > 0) {
       var count = 0;
       var next = func.hitch(this, function () {
           process.nextTick(func.hitch(this, function () {
               //if Ive looped through all of them callback
               if (count == length) {
                   promise.callback();
               } else {
                   //call next
                   var nextArgs = args.slice(0);
                   nextArgs.unshift(next);
                   funcs[count++].apply(this, nextArgs);
               }
           }));
       });
       next();
   } else {
       promise.callback();
   }
   return promise;
           
}
```

  
<a name="comb_plugins_Middleware_prototype_post"></a>
###post

---
*Defined plugins/Middleware.js* [Top](#top)

<p>Use to listen to after an event has occurred i.e. post save</p>
 <b>NOTE:</b></br>
 <ul>
     <li>You must call next in order for the middleware chain to complete</li>
      <li>This connects to events on the instance of an object, NOT all instances!</li>
      <li>Hooks are called in the order they are received!</li>
      <li>When connecting your callback will be called in the scope of the class</br>if you want a certain scope use [comb.hitch](#comb_hitch)</li>
  </ul>
        
*Example*

```javascript
instance.post("save", function(next){
                //do something...
                 //you have to call next!!!!!
                 next();
          });
 
```

     
*Arguments*

        
 * _fun_  : 
        
 * _callback_  : 
        
     
     

*Source*

```javascript
function (fun,callback){
   var hook = this.__hooks.post[fun];
   //if I havent initialized it create it;
   if (hook == undefined) {
       hook = this.__hooks.post[fun] = [];
   }
   hook.push(callback);
           
}
```

  
<a name="comb_plugins_Middleware_prototype_pre"></a>
###pre

---
*Defined plugins/Middleware.js* [Top](#top)

Use to listen to before an event occurred i.e. pre save

 <b>NOTE:</b></br>
 <ul>
     <li>You must call next in order for the middleware chain to complete</li>
      <li>This connects to events on the instance of an object, not all instances!</li>
      <li>Hooks are called in the order they are received!</li>
      <li> When connecting your callback will be called in the scope of the class</br>if you want a certain scope use [comb.hitch](#comb_hitch)</li>
  </ul>
        
*Example*

```javascript
instance.pre("save", function(args,...., next){
          //do something...
          //you have to call next!!!!!
          next();
      });

 
```

     
*Arguments*

        
 * _fun_  : 
        
 * _callback_  : 
        
     
     

*Source*

```javascript
function (fun,callback){
   var hook = this.__hooks.pre[fun];
   if (!hook) {
       hook = this.__hooks.pre[fun] = [];
   }
   hook.push(callback);
           
}
```

  

License
-------

MIT <https://github.com/Pollenware/comb/raw/master/LICENSE>

Meta
----

* Code: `git clone git://github.com/pollenware/comb.git`
* JsDoc: <http://pollenware.github.com/comb>
* Website:  <http://pollenware.com> - Twitter: <http://twitter.com/pollenware> - 877.465.4045



Process finished with exit code 0
