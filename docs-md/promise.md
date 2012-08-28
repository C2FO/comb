#[Promises](./comb_Promise.html)

`comb` provides an async wrapper called a [promise](http://en.wikipedia.org/wiki/Futures_and_promises). Promises are a way of handling async and sync behavior by encapsulating it in a wrapper. One of the benefits of promises is that it encourages the separation of success and failure logic, and provides a value that can be passed around rather than providing callbacks for every async action. 

##[comb.Promise](./comb_Promise.html)

The [comb.Promise](./comb_Promise.html) is the backbone for `comb`s async utilities. 

To create a promise

```
var promise = new comb.Promise();
```

###Resolving Promises

When working with a promise you must resolve the promise in order to callbacks/errbacks to be invoked. Resolution can happen before for after callbacks/errbacks have been registered. The methods to resolve a promise are `callback`, `errback`, and `resolve`.

###callback  and errback

The callback method is used to resolve a promise as a success.

```

function readFile(file, encoding){
	var ret = new comb.Promise();
	fs.readFile(file, encoding || "utf8", function(err){
		if(err){
		    //there was an error so errback
			ret.errback(err);
		}else{
		    //resolve the promise removing the first argument
			ret.callback(comb.argsToArray(arguments, 1));
		}
	});
	//return the promise object which removes the 'callback', 'errback' and 'resolve' functions.
	return ret.promise();
}

readFile("myFile.txt").then(function(text){
	console.log(text);
}, errorHandler);

```

As you can see from above we can easily wrap the `fs.readFile` function with a promise. The advantage of this is that you can now seperate the success and error resolution paths with the `then` function. The above example just passes the error to a global error handler and your success callback does not have to worry about the error condition.

###resolve

`callback` and `errback` are great if you are working with other promise methods but as you can see from above you still have to handle the error and success path when working with node style callback. This is where the `resolve` method comes in handy.

Resolve wraps `callback` and `errback` in a single method that accepts an `error` as the first argument. If the error is undefined or null then the rest of the arguments are used to resolve the promise.

Lets rewrite the `readFile` funciton with resolve.

```

function readFile(file, encoding){
	var ret = new comb.Promise();
	fs.readFile(file, encoding || "utf8", ret.resolve.bind(ret));
	//return the promise object which removes the 'callback', 'errback' and 'resolve' functions.
	return ret.promise();
}

readFile("myFile.txt").then(function(text){
	console.log(text);
}, errorHandler);

```

After rewriting the `readFile()` method with resolve the code is a lot cleaner with only three lines and you still get the same promise API.


###Listening for Promise Resolutions.

To listen for the resolution of promises there are the following methods. For the following examples we will use the `readFile` method defined above.

###then
The `then` methods accepts two arugments a `callback` and an optional `errback`.

```
var readFilePromise = readFile("myFile.txt");

//with two callbacks
readFilePromise.then(
	function(file){
		console.log("file")
	}, 
	function(err){
		console.log(err);
	}
);

//reusing the same promise Ignoring the error case
readFilePromise.then(function(file){
	console.log(file);
});

```

You may also pass in a new promise into the `then` method.

```

var readAndConvertToUppercase = function(file, encoding){
	var ret = new comb.Promise();
	readFile("myFile.txt").then(
		function(data){
			ret.callback(data.toUpperCase());
		}, 
		//pass in the return promise as the second argument. 
		//this is the same as setting the errback to ret.errback.bind(ret);
		ret
	);
	return ret.promise();
};

//with two callbacks
readAndConvertToUppercase("myFile.txt").then(
	function(file){
		console.log("file")
	}, 
	function(err){
		console.log(err);
	}
);
```

###classic

The `classic` method can be used to register a callback with a node style callback

```

readFile("myFile.txt").classic(function(err, file){
	if(err){
		console.log(err);
	}else{
	    console.log(file);
	}
});

```

###chain

The chain method is used to chain promises together so they execute ir order. The chain method is different from the [comb.serial](./comb.html#.serial) method in that it pipes the results from one promise into the next.

In the following example we chain the results of different promise actions into a single result.

```
function asyncString(str){
    var ret = new comb.Promise();
    process.nextTick(ret.callback.bind(ret, str));
    return ret.promise();
}

asyncString("hello")
    .chain(function(results){
        return asyncString(results + " world");
    })
    .chain(function(results){
        return asyncString(results + "!");
    })
    .then(function(str){
        console.log(str); //"hello world!"
    });
```

##[comb.PromiseList](./comb_PromiseList.html)

A promise list is used to listen for the completion of an array of promises. 

```
var files = [readFile("myFile.txt"),readFile("myFile2.txt"),readFile("myFile3.txt")];

function readFiles(){
	var files = comb.argsToArray(arguments).map(function(file){
		return readFile(file);
	});
	return new comb.PromiseList(files, true).promise();
	
}

readFiles("myFile.txt", "myFile2.txt", "myFile3.txt").then(function(files){
	files.forEach(function(data){
		console.log(data);
	});
}, errorHandler);
```

##[comb.when](./comb.html#.when)

The `comb.when` function allows one to wrap a sync or async call or calls with the same API.

In the following example we created a new function that reads the files synchronoulsly. We then use the `comb.when` function to wrap both the async and sync calls in a promise.

```
function readFileSync(){
	return fs.readFileSync.apply(fs, arguments);
}

comb.when(
	readFile("myFile.txt"),
	readFileSync("myFile.txt"),
	readFile("myFile1.txt"),
	readFileSync("myFile1.txt"),
	readFile("myFile2.txt"),
	readFileSync("myFile2.txt"),
).then(function(files){
	files.forEach(function(data){
		console.log(data);
	});
}, errorHandler);

```

##[comb.serial](./comb.html#.serial)

The `comb.serial` function is useful if you need to perform a set of actions in order. The serial method takes a list of function that need to be executed in order. The return value of the functions can be anything if they are promises then the next function will not execute until the promise has resolved. The results from each function are will be the result of the returned promise. **NOTE** the results from each function are not propogated to the next.


```
var asyncAction = function(item, timeout){                                
   var ret = new comb.Promise(); 
   //bind the callback to the promise ignoring any other arguments passed in                                      
   setTimeout(ret.callback.bind(ret, item), timeout);
   return ret.promise();                                                            
};                                                                        
                                                                          
comb.serial([   
    //comb.partial returns a function that will execute asyncAction with the specified arguments
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

##[comb.chain](./comb.html#.chain)

The `comb.chain` method is similar to the `comb.serial` method except that it **does** propogate results from one function to the next. The promise returned from `comb.chain` will resolve with the result of the last action in the list.

```
function asyncAction(add, timeout) {   
	//number gathered from the previous function
     return function (num) {           
     	//will be undefined if the first function in the list.
         num = num || 0;               
         var ret = new comb.Promise(); 
         setTimeout(function () {      
              ret.callback(num + add); 
         }, timeout);                  
         return ret;                   
     }                                 
}                                      
                                       
comb.chain([                           
     asyncAction(1, 100),              
     asyncAction(2, 100),              
     asyncAction(3, 100),              
     asyncAction(4, 100),              
     asyncAction(5, 100),              
]).then(function(results){             
     console.log(results); //15        
});                                    
```

##[comb.wrap](./comb.html#.wrap)

The `comb.wrap` method is used to wrap a function that is defined with a node style callback in a promise.

Suppose we wanted to wrap all async fs methods in a promise we could do the following.

```
var fsFunctions = ["rename","truncate","chown","fchown", "lchown","chmod","fchmod","lchmod", "stat",
    "lstat","fstat", "link","symlink", "readlink","realpath","unlink", "rmdir","mkdir",
    "readdir","close", "open","utimes", "futimes","fsync", "write","read", "readFile",
    "writeFile","appendFile"];

var fsp = {};

fsFunctions.forEach(function(method){
    fsp[method] = comb.wrap(fs[method], fs);
});
```

We could then use each `fsp` method as promise returning function.

```
fsp.rename("myFile.txt", "myFile.txt.bak").then(function(){
	//do something.
});
```




