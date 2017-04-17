# [Promises](./comb_Promise.html)

`comb` provides an async wrapper called a [promise](http://en.wikipedia.org/wiki/Futures_and_promises). Promises are a way of handling async and sync behavior by encapsulating it in a wrapper. One of the benefits of promises is that they encourage the separation of success and failure logic. Promises provide a value that can be passed around rather than providing callbacks for every async action. 

## [comb.Promise](./comb_Promise.html)

The [comb.Promise](./comb_Promise.html) is the backbone for `comb`s async utilities. 

To create a promise

```
var promise = new comb.Promise();
```

### Resolving Promises

When working with a promise you must resolve the promise in order for callbacks/errbacks to be invoked. Resolution can happen before for after callbacks/errbacks have been registered. The methods to resolve a promise are `callback`, `errback`, and `resolve`.

### callback  and errback

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

### resolve

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


### Listening for Promise Resolutions

To listen for the resolution of promises there are the following methods. For the following examples we will use the `readFile` method defined above.

### then
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

### classic

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

### chain

The chain method is used to chain promises together so they execute in order. The chain method is different from the [comb.serial](./comb.html#.serial) method in that it pipes the results from one promise into the next.

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

You can also use static values

```
new Promise().callback()
    .chain("hello")
    .chain(function(prev){
        return prev + " world!"
    }).then(function(str){
        console.log(str); //"hello world!"
    });
```

If you do not provide an `errback` for each chain then it will be propogated to the final promise.

```
new Promise().callback()
    .chain(function(){
        return new comb.Promise().errback(new Error("error"));
    })
    .chain(function(){
        return prev + " world!"
    })
    .classic(function(err, str){
        console.log(err.message); //"error"
    });
```

### Catching Errors

Chain also allows you to catch errors so you can handle them successfully.

```
new Promise().callback()
    .chain(function(){
        throw new Error("error");
    }, function(){
        return "caught error and handled";
    })
    .classic(function(err, str){
        console.log(str); //"caught error and handled"
    });
```

```
new Promise().callback()
    .chain(function(){
        throw new Error("error");
    }, function(){
        return new Promise().callback("caught error and handled");
    })
    .classic(function(err, str){
        console.log(str); //"caught error and handled"
    });
```

If you still cannot handle the error you can rethrow the error. It will handle errors thrown asynchronously or synchronously.

```
new Promise().callback()
    .chain(function(){
        throw new Error("error");
    }, function(){
        // return async error
        return new Promise().errback(new Error("error not handled"));
    })
    .classic(function(err, str){
        console.log(err.message); //"error not handled"
    });
```

```
new Promise()
    .chain(function(){
        throw new Error("error");
    }, function(){
        throw new Error("error not handled");
    })
    .classic(function(err, str){
        console.log(err.message); //"error not handled"
    });
```

## [comb.PromiseList](./comb_PromiseList.html)

A promise list is used to listen for the completion of an array of promises. You may also use [comb.when](./comb.html#.when)
with an array of promises.

```
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


## [comb.when](./comb.html#.when)

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

You can also use `comb.when` with an array of promises

```
function readFiles(){
	var files = comb.argsToArray(arguments).map(function(file){
		return readFile(file);
	});
	return comb.when(files);
}

readFiles("myFile.txt", "myFile2.txt", "myFile3.txt").then(function(files){
	files.forEach(function(data){
		console.log(data);
	});
}, errorHandler);
```

## [comb.serial](./comb.html#.serial)

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

## [comb.chain](./comb.html#.chain)

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

## [comb.wrap](./comb.html#.wrap)

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

## [comb.async.forEach](./comb_async.html#.forEach)

Loops through the results of an promise. The promise can return an array or just a single item.   
                                                                                                  
```                                                                                               
function asyncArr(){                                                                              
    var ret = new comb.Promise();                                                                 
    process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);                                         
    return ret.promise;                                                                           
}                                                                                                 
                                                                                                  
comb.async.forEach(asyncArr(), function(){                                                         
     //do something with it                                                                       
}).then(function(arr){                                                                            
     console.log(arr); //[1,2,3,4,5];                                                             
});                                                                                               
                                                                                                  
```                                                                                               
                                                                                                  
You may also return a promise from the iterator block.                                                                                                                                                                                                                          
                                                                                                  
```                                                                                               
var myNewArr = [];   

comb.async.forEach(asyncArr(), function(item, index){                                              
    var ret = new comb.Promise();                                                                 
    process.nextTick(function(){                                                                  
        myNewArr.push([item, index]);                                                             
        ret.callback();                                                                           
    });                                                                                           
    return ret.promise();                                                                         
}).then(function(){                                                                               
    console.log(myNewArr); //[[1,0], [2,1], [3,2], [4,3], [5,4]]                                   
});                                                                                               
```                                                                                                                                                                                                     

## [comb.async.map](./comb_async.html#.map)

 Loops through the results of an promise resolving with the return value of the iterator function.     
 The promise can return an array or just a single item.                                                
                                                                                                       
 ```                                                                                                   
 function asyncArr(){                                                                                  
     var ret = new comb.Promise();                                                                     
     process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);                                             
     return ret.promise;                                                                               
 }                                                                                                     
                                                                                                       
 comb.async.map(asyncArr(), function(item){                                                             
      return item * 2;                                                                                 
 }).then(function(arr){                                                                                
      console.log(arr); //[2,4,6,8,10];                                                                
 });                                                                                                   
                                                                                                       
 ```                                                                                                   
                                                                                                       
 You may also return a promise from the iterator block.                                                
                                                                                                       
 ```                                                                                                   
 comb.async.map(asyncArr(), function(item, index){                                                      
     var ret = new comb.Promise();                                                                     
     process.nextTick(function(){                                                                      
         ret.callback(item * 2);                                                                       
     });                                                                                               
     return ret.promise();                                                                             
 }).then(function(){                                                                                   
     console.log(myNewArr); //[2,4,6,8,10];                                                             
 });                                                                                                   
 ```                                                                                                                                                                                                                                                                                                                             

## [comb.async.filter](./comb_async.html#.filter)

Loops through the results of an promise resolving with the filtered array.
The promise can return an array or just a single item.                    
                                                                          
```                                                                       
function asyncArr(){                                                      
    var ret = new comb.Promise();                                         
    process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);                 
    return ret.promise;                                                   
}                                                                         
                                                                          
comb.async.filter(asyncArr(), function(item){                              
     return item % 2;                                                     
}).then(function(arr){                                                    
     console.log(arr); //[1,3,5];                                         
});                                                                       
                                                                          
```                                                                       
                                                                          
You may also return a promise from the iterator block.                    
                                                                          
```                                                                       
comb.async.filter(asyncArr(), function(item, index){                       
    var ret = new comb.Promise();                                         
    process.nextTick(function(){                                          
        ret.callback(item % 2);                                           
    });                                                                   
    return ret.promise();                                                 
}).then(function(){                                                       
    console.log(myNewArr); //[1,3,5];                                      
})                                                                        
```                                                                       
## [comb.async.every](./comb_async.html#.every)

Loops through the results of an promise resolving with true if every item passed, false otherwise.   
The promise can return an array or just a single item.                                               
                                                                                                     
```                                                                                                  
function asyncArr(){                                                                                 
    var ret = new comb.Promise();                                                                    
    process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);                                            
    return ret.promise;                                                                              
}                                                                                                    
                                                                                                     
comb.async.every(asyncArr(), function(item){                                                          
     return item <= 5;                                                                               
}).then(function(every){                                                                             
     console.log(every); //true                                                                      
});                                                                                                  
                                                                                                     
```                                                                                                  
                                                                                                     
You may also return a promise from the iterator block.                                               
                                                                                                     
```                                                                                                  
comb.async.every(asyncArr(), function(item, index){                                                   
    var ret = new comb.Promise();                                                                    
    process.nextTick(function(){                                                                     
        ret.callback(item == 1);                                                                     
    });                                                                                              
    return ret.promise();                                                                            
}).then(function(){                                                                                  
    console.log(myNewArr); //false;                                                                   
})                                                                                                   
```                                                                                                  

## [comb.async.some](./comb_async.html#.some)

Loops through the results of an promise resolving with true if some items passed, false otherwise.      
The promise can return an array or just a single item.                                                  
                                                                                                        
```                                                                                                     
function asyncArr(){                                                                                    
    var ret = new comb.Promise();                                                                       
    process.nextTick(ret.callback.bind(ret, [1,2,3,4,5]);                                               
    return ret.promise;                                                                                 
}                                                                                                       
                                                                                                        
comb.async.some(asyncArr(), function(item){                                                              
     return item == 1;                                                                                  
}).then(function(every){                                                                                
     console.log(every); //true                                                                         
});                                                                                                     
                                                                                                        
```                                                                                                     
                                                                                                        
You may also return a promise from the iterator block.                                                  
                                                                                                        
```                                                                                                     
comb.async.some(asyncArr(), function(item, index){                                                       
    var ret = new comb.Promise();                                                                       
    process.nextTick(function(){                                                                        
        ret.callback(item > 5);                                                                         
    });                                                                                                 
    return ret.promise();                                                                               
}).then(function(){                                                                                     
    console.log(myNewArr); //false;                                                                      
})                                                                                                      
```  

## [comb.async.pluck](./comb_async.html#.pluck)

Async version of [comb.array.pluck](./comb_array.html#.pluck)
                                                                                                                             
```                                                                                                                          
var when = comb.when,                                                                                                        
    array = comb.async.array;                                                                                                
function asyncArr(){                                                                                                         
    var ret = new comb.Promise();                                                                                            
    process.nextTick(ret.callback.bind(ret, [                                                                                
                                             {name:{first:when("Fred"), last:"Jones"}, age:when(50), roles:["a", "b", "c"]}, 
                                             {name:{first:"Bob", last:"Yukon"}, age:40, roles:when(["b", "c"])},             
                                             {name:{first:"Alice", last:"Palace"}, age:when(35), roles:["c"]},               
                                             {name:{first:when("Johnny"), last:"P."}, age:56, roles:when([])}                
                                            ]);                                                                              
    return ret.promise;                                                                                                      
}                                                                                                                            
                                                                                                                             
array(asyncArr()).pluck("name.first").then(function(values){                                                                 
    console.log(values); //["Fred", "Bob", "Alice", "Johnny"]                                                                
});                                                                                                                          
                                                                                                                             
pluck(asyncArr(), "age").then(function(values){                                                                              
    console.log(values); //[50, 40, 35, 56]                                                                                  
});                                                                                                                          
                                                                                                                             
```                                                                                                                                                                                                                             


