
# [define](./comb.html#.define)


## Instance Methods 


When defining classes in `comb` there are two root level properties you can define,  `instance` and  `static`. 

The optional instance object is used to define properties and methods on an instance of a class. 

The optional static property is used to define class level methods and properties than can be used without an instance of a class.

```
comb.define(null, {
    instance : {//Define your instance methods and properties}
    static : {//Define your static methods and properties}
});
```

Lets start of by defining the class Mammal that will be used as the parent for other classes.

```
var Mammal = comb.define({
    instance : {
 
        _type : "mammal",
        _sound : " *** ",
 
        constructor: function(options) {
            options = options || {};
            this._super(arguments);
            var type = options.type, sound = options.mammal;
            type && (this._type =  type);
            sound && (this._sound = sound);
        },
 
        speak : function() {
            return "A mammal of type " + this._type;
        }
    }
});
```

Next lets define two implementing classes, Wolf and Dog. This example is a little contrived as Dog could inherit from Wolf. 

```
var Wolf = Mammal.extend({
    instance: {
 
        _type : "wolf",
 
        _sound : "howl",
 
        speak : function() {
            return this._super(arguments) + " that " + this._sound + "s";
        },
 
        howl : function(){
            console.log("Hoooooooooooowl!")
        }
    }
});
 
var Dog = Mammal.extend({
    instance: {
 
        _type : "dog",
 
        _sound : "bark",
 
        speak : function() {
            return this._super(arguments) + ", thats domesticated";
        },
 
        woof : function(){
            console.log("Wooooooof!")
        }
    }
});
```  
`Wolf` and `Dog` inherit from `Mammal`, which means that they are both an instanceof `Mammal`. Notice that both `Wolf` and `Dog` override the `Mammal` default values `type` and `sound` with their own values. 

```
speak : function() {
     return this._super(arguments) + " that " + this._sound + "s";
}
```


`Wolf` and `Dog` also override the `speak` method, in order to invoke the parents implementation the method `_super` is invoked. `_super` traverses the inheritance chain and returns the value.  So for both `Dog` and `Wolf` they called _super and appended their own message to their parents message.

```
//1. Create a dog and make him speak
var myDog = new Dog();
myDog.woof() //prints Wooooooof!
myDog.speak();
    //=> A mammal of type dog, thats domesticated
 
//2. Create a wolf and make him speak
var myWolf = new Wolf();
myWolf.howl() //prints "Hoooooooooooowl!"
myWolf.speak();
    //=> A mammal of type wolf that howls
 
 
//3. Create a DogWolf that inherits from Dog, and mixes in Wolf
var DogWolf = comb.define([Dog, Wolf]);
var myDogWolf = new DogWolf();
myDogWolf.woof() //prints Wooooooof!
myDogWolf.howl() //prints "Hoooooooooooowl!"
myDogWolf.speak();
    //=> A mammal of type wolf, thats domesticated that howls
 
//4. Create a WolfDog that inherits from Wolf, and mixes in Dog
var WolfDog = comb.define([Wolf, Dog]);
var myWolfDog = new WolfDog();
myWolfDog.woof() //prints Wooooooof!
myWolfDog.howl() //prints "Hoooooooooooowl!"
myWolfDog.speak();
    //=> A mammal of type dog that barks, thats domesticated
```

1 and 2 : We created instances of `Dog` and `Wolf` and made them speak. Notice that the return value of the `speak()` method is the return value of `Mammal`'s speak method concatenated  with the implementing classes own message.


3 and 4 Ok, this is where it gets interesting, so lets break it down line by line.

```
var DogWolf = comb.define([Dog, Wolf]);
```

This line defines a new class aptly named `DogWolf`. The `DogWolf` class is an instanceof `Dog` but mixes in `Wolf`. What does that mean?
  
```
var myDogWolf = new DogWolf();
myDogWolf instanceof Dog //=> true
myWolfDog instanceof Wolf //=> false
```

So `Wolf` is mixed so we can get the `howl` method.  


```
myDogWolf.speak();
    //=> A mammal of type wolf, thats domesticated that howls
```

So when `myDogWolf` speaks it invokes the speak functionality of `Wolf`->`Dog`->`Mammal`. The order of inheritance is important to keep in mind when designing your classes the inheritance chain will happen in reverse, starting with the last mixin traversing the inheritance chain until either `_super` is not invoked or the parent of the super class is reached, in this case `Mammal`. 


So lets add some public properties to `Wolf` and `Dog`.

```
var Wolf = Mammal.extend({
    instance:{
 
        _type:"wolf",
 
        _sound:"howl",
 
        __color:"grey",
 
        speak:function () {
            return this._super(arguments) + " that " + this._sound + "s";
        },
 
        howl:function () {
            console.log("Hoooooooooooowl!")
        },
 
        setters:{
            color:function (color) {
                if (comb.isString(color)) {
                    this.__color = color;
                    if (color === "white") {
                        this._sound = "LOUD howl";
                    }
                }else{
                    throw new TypeError("Color must be a String");
                }
            }
        },
 
        getters:{
            color:function () {
                return this.__color;
            }
        }
    }
});
 
var Dog = Mammal.extend({
    instance:{
 
        _type:"dog",
 
        _sound:"bark",
 
        __breed:null,
 
        constructor : function(opts){
           opts = opts || {};
           !comb.isUndefinedOrNull(opts.breed) 
                   && (this.breed = opts.breed);
           this._super(arguments);
        },
 
        speak:function () {
            return this._super(arguments) + ", thats domesticated";
        },
 
        woof:function () {
            console.log("Wooooooof!")
        },
 
        setters:{
            breed:function (breed) {
                if (comb.isString(breed)) {
                    this.__breed = breed;
                } else {
                    throw new TypeError("Breed must be a String");
                }
            }
        },
 
        getters:{
            breed:function () {
                return this.__breed;
            },
 
            foundOldManInWell:function () {
                return "collie" === this.__breed;
            }
        }
    }
});
```

So we added a `setter` and `getter` for  `color` to the  `Wolf` class. The advantage of adding `setters` and `getters` is that it allows you to add logic when setting/getting properties. When setting the `color` property on `Wolf` we check that it is a string and we change our sound depending on the `color` of the `Wolf`. If you supply a `getter` for a property and not a corresponding `setter` it will be read only(e.g. the `Dog`s `foundOldManInWell` property is read only), the same applies for supplying only a `setter`. Lets try the getters and setters out.


```
var myDog = new Dog({breed : "beagle"});
console.log(myDog.breed); //prints beagle
console.log(myDog.foundOldManInWell); //prints false
 
myDog.breed = "collie";
console.log(myDog.breed); //prints collie
console.log(myDog.foundOldManInWell); //prints true
try {
    myDog.breed = false;
} catch (e) {
    console.error(e); //prints [TypeError: Breed must be a String]
}
try {
    new Dog({breed : false});
} catch (e) {
    console.error(e); //prints [TypeError: Breed must be a String]
}
```

## Static Methods


As stated above  `comb.define` looks for an optional static  property on the `prototype` declaration  of a class. 


Lets modify `Mammal` to include static properties. 

```
var Mammal = comb.define({
    instance:{
 
        _type:"mammal",
        _sound:" *** ",
 
        constructor:function (options) {
            options = options || {};
            this._super(arguments);
            var myClass = this._static;
            this._type = options.type || myClass.DEFAULT_TYPE;
            this._sound = options.sound || myClass.DEFAULT_SOUND;
        },
 
        speak:function () {
            return "A mammal of type " + this._type;
        },
 
        getter : {
             type : function(){
                  return this._type;
             }
        }
    },
 
    static : {
 
        DEFAULT_TYPE : "mammal",
        DEFAULT_SOUND : " *** ",
 
        soundOff : function() {
            return "Im a mammal!!";
        }
    }
});
```

So we added two static properties to `Mammal`, `DEFAULT_TYPE` and `DEFAULT_SOUND`. These properties can be accessed by instances through the `this._static` property.  


```
constructor:function (options) {
     options = options || {};
     this._super(arguments);
     var myClass = this._static;
     this._type = options.type || myClass.DEFAULT_TYPE;
     this._type = options.sound || myClass.DEFAULT_SOUND;
}
```

So we refactored the `constructor` function to leverage the new static properties when initializing itself. One example of using this initialization method is when you have properties that you want to be able to configure and apply to all instances of a class.


```
var myMammal = new Mammal();
console.log(myMammal.type); //prints mammal
Mammal.DEFAULT_TYPE = "whale";
myMammal = new Mammal();
console.log(myMammal.type); //prints whale
```

### Inheritance In Static Functions.


One neat thing about defining classes in `comb` is that you not only get the advantages of inheritance in instance methods but static methods as well. So lets modify `Dog` and `Wolf` to take advantage of that.
  
```
var Wolf = Mammal.extend({
    instance:{
 
        _type:"wolf",
 
        _sound:"howl",
 
        __color:"grey",
 
        speak:function () {
            return this._super(arguments) + " that " + this._sound + "s";
        },
 
        howl:function () {
            console.log("Hoooooooooooowl!")
        },
 
        setters:{
            color:function (color) {
                if (comb.isString(color)) {
                    this.__color = color;
                    if (color === "white") {
                        this._sound = "LOUD howl";
                    }
                } else {
                    throw new TypeError("Color must be a String");
                }
            }
        },
 
        getters:{
            color:function () {
                return this.__color;
            }
        }
    },
 
    static:{
 
        soundOff:function () {
            return comb.string.format("%s, %s", this._super(arguments), "I'm a Wolf");
        }
 
    }
});
 
var Dog = Mammal.extend({
    instance:{
 
        _type:"dog",
 
        _sound:"bark",
 
        __breed:null,
 
        constructor:function (opts) {
            opts = opts || {};
            !comb.isUndefinedOrNull(opts.breed) && (this.breed = opts.breed);
            this._super(arguments);
        },
 
        speak:function () {
            return this._super(arguments) + ", thats domesticated";
        },
 
        woof:function () {
            console.log("Wooooooof!")
        },
 
        setters:{
            breed:function (breed) {
                if (comb.isString(breed)) {
                    this.__breed = breed;
                } else {
                    throw new TypeError("Breed must be a String");
                }
            }
        },
 
        getters:{
            breed:function () {
                return this.__breed;
            },
 
            foundOldManInWell:function () {
                return "collie" === this.__breed;
            }
        }
    },
 
    static:{
 
        soundOff:function () {
            return comb.string.format("%s, %s", this._super(arguments), "I'm a Dog");
        }
 
    }
});
```
When executing soundOff. 

```
console.log(Mammal.soundOff());
console.log(Wolf.soundOff());
console.log(Dog.soundOff());
console.log(DogWolf.soundOff());
console.log(WolfDog.soundOff());
```

As you can see inheritance within the static methods follows the same order as it does within  the instance methods.


### Static Getters and Setters


Getters and setters are declared the same way in a static declaration as they are in an instance declaration.


### Getting an Instance of my self.


One nuance about prototypal inheritance is that the scope in which a function is called is not consistent. For example, lets add a reproduce method to `Mammal`.

```
var Mammal = comb.define({
    instance:{
 
        _type:"mammal",
        _sound:" *** ",
 
        constructor:function (options) {
            options = options || {};
            this._super(arguments);
            var myClass = this._static;
            this._type = options.type || myClass.DEFAULT_TYPE;
            this._sound = options.sound || myClass.DEFAULT_SOUND;
        },
 
        speak:function () {
            return "A mammal of type " + this._type;
        },
         
        reproduce : function(){
           return new Mammal(); 
        },
 
        getters:{
            type:function () {
                return this._type;
            }
        }
    },
 
    static:{
 
        DEFAULT_TYPE:"mammal",
        DEFAULT_SOUND:" *** ",
 
        soundOff:function () {
            return comb.string.format("Im a %s!!", this.DEFAULT_TYPE);
        }
    }
});
```

This is great except that it will only work for instances of `Mammal` if we created a `Dog` and asked it to reproduce it would return a `Mammal` and **not** a`Dog`. Solution, change reproduce to:

```
reproduce : function(){
     return new this._static();
}
```


This guarantees that you create an instance of your type. The same applies if you want to check if something is an instance of your current type. For example lets add a sameSpecies method to `Mammal`.

```
sameSpecies : function(obj){
     return obj instanceof this._static; 
}
```

This comes in handy when dealing with multiple inheritance, and wanting to check if an object is of the same concrete class.

### Static initialization

`comb.define` also provides a mechanism for initializing when creating a class. `init` will be called on creation of any class.

```
var Mammal = comb.define({
    instance:{
 
        _type:"mammal",
        _sound:" *** ",
 
        constructor:function (options) {
            options = options || {};
            this._super(arguments);
            var myClass = this._static;
            this._type = options.type || myClass.DEFAULT_TYPE;
            this._sound = options.sound || myClass.DEFAULT_SOUND;
        },
 
        speak:function () {
            return "A mammal of type " + this._type;
        },
         
        reproduce : function(){
           return new Mammal(); 
        },
 
        getters:{
            type:function () {
                return this._type;
            }
        }
    },
 
    static:{
  
        soundOff:function () {
            return comb.string.format("Im a %s!!", this.DEFAULT_TYPE);
        },
        
        init : function(){
                this.DEFAULT_TYPE = "mammal";
		        this.DEFAULT_SOUND = " *** ";
        }
    }
});
```

Here we moved the DEFAULT_TYPE and DEFAULT_SOUND initializtion to the `init` method. 
 
