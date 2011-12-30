Comb
=========

Overview
--------

Framework for node that provides a one stop shop for frequently needed utilities, including:

* OO utilties
* Collections 
* Logging
* String & date formatting
* Proxy
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

Highlights
---------
* > 99% test coverage! And we're always adding more!
* [Full api documentation with examples!](http://pollenware.github.com/comb/symbols/comb.html)
* comb([define](http://pollenware.github.com/comb/symbols/comb.html#.define)|[singleton](http://pollenware.github.com/comb/symbols/comb.html#.singleton))
   * The back bone of comb.
   * Options for classical inheritance models as well as mixins(pseudo multi-inheritance)
   * You can call this._super from any method. Including statically defined ones!
   * Access to you class level properties within an instance
   * And [much more...](http://pollenware.github.com/comb/symbols/comb.html#.define)
* Logging
  * [Powerful logging API!](http://pollenware.github.com/comb/symbols/comb.logging.Logger.html)
  * Logger inheritance through name spaces
  * [Predefined level definition along with the ability to define your own.](http://pollenware.github.com/comb/symbols/comb.logging.Level.html)
  * Multiple appenders including
     * [FileAppender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.FileAppender.html) - log it to a file
     * [RollingFileAppender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.RollingFileAppender.html) - log it to a file up to a customizable size then create a new one!
     * [JSONAppender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.JSONAppender.html) - write it out as JSON to a file.
     * [ConsoleAppender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.ConsoleAppender.html) - log it to the console
  * All appenders can be using with custom levels, separately, or all together.
  * Configurable with [files OR programatically](http://pollenware.github.com/comb/symbols/comb.logging.BasicConfigurator.html)
* Collections
  * [RedBlackTree](http://pollenware.github.com/comb/symbols/comb.collections.RedBlackTree.html), [AVLTree](http://pollenware.github.com/comb/symbols/comb.collections.AVLTree.html), [AnderssonTree](http://pollenware.github.com/comb/symbols/comb.collections.AnderssonTree.html), [BinaryTree](http://pollenware.github.com/comb/symbols/comb.collections.BinaryTree.html), [HashTable](http://pollenware.github.com/comb/symbols/comb.collections.HashTable.html), [MaxHeap](http://pollenware.github.com/comb/symbols/comb.collections.MaxHeap.html), [MinHeap](http://pollenware.github.com/comb/symbols/comb.collections.MinHeap.html), [Pool](http://pollenware.github.com/comb/symbols/comb.collections.Pool.html), [PriorityQueue](http://pollenware.github.com/comb/symbols/comb.collections.PriorityQueue.html), [Queue](http://pollenware.github.com/comb/symbols/comb.collections.Queue.html), [Stack](http://pollenware.github.com/comb/symbols/comb.collections.Stack.html)
* Flow control
  * [Promises](http://pollenware.github.com/comb/symbols/comb.Promise.html)
  * [PromiseLists](http://pollenware.github.com/comb/symbols/comb.PromiseList.html)
  * [executeInOrder](http://pollenware.github.com/comb/symbols/comb.html#.executeInOrder)
     * Allows you to program asynchronous functions synchronously.
* Proxy helpers
  * [methodMissing](http://pollenware.github.com/comb/symbols/comb.html#.methodMissing) - handle those pesky 'has no method exception's
  * [functionWrapper](http://pollenware.github.com/comb/symbols/comb.html#.createFunctionWrapper) - wrap an object so you can use it as a function
  * [handlerProxy](http://pollenware.github.com/comb/symbols/comb.html#.handlerProxy) - create a proxy for an object
* [Tell me more!](http://pollenware.github.com/comb/symbols/comb.html)
 
  

Usage
-----

* OO system
  * [define](http://pollenware.github.com/comb/symbols/comb.html#.define)
  * [singleton](http://pollenware.github.com/comb/symbols/comb.html#.singleton)
* Collections
  * [RedBlackTree](http://pollenware.github.com/comb/symbols/comb.collections.RedBlackTree.html)
  * [AVLTree](http://pollenware.github.com/comb/symbols/comb.collections.AVLTree.html)
  * [AnderssonTree](http://pollenware.github.com/comb/symbols/comb.collections.AnderssonTree.html)
  * [BinaryTree](http://pollenware.github.com/comb/symbols/comb.collections.BinaryTree.html)
  * [HashTable](http://pollenware.github.com/comb/symbols/comb.collections.HashTable.html)
  * [MaxHeap](http://pollenware.github.com/comb/symbols/comb.collections.MaxHeap.html)
  * [MinHeap](http://pollenware.github.com/comb/symbols/comb.collections.MinHeap.html)
  * [Pool](http://pollenware.github.com/comb/symbols/comb.collections.Pool.html)
  * [PriorityQueue](http://pollenware.github.com/comb/symbols/comb.collections.PriorityQueue.html)
  * [Queue](http://pollenware.github.com/comb/symbols/comb.collections.Queue.html)
  * [Stack](http://pollenware.github.com/comb/symbols/comb.collections.Stack.html)
* Logging
  * [Logger](http://pollenware.github.com/comb/symbols/comb.logging.Logger.html)
  * [Level](http://pollenware.github.com/comb/symbols/comb.logging.Level.html)
  * Appenders
     * [Appender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.Appender.html)
     * [ConsoleAppender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.ConsoleAppender.html)
     * [FileAppender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.FileAppender.html)
     * [JSONAppender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.JSONAppender.html)
     * [RollingFileAppender](http://pollenware.github.com/comb/symbols/comb.logging.appenders.RollingFileAppender.html)
  * Configurators
     * [BasicConfigurator](http://pollenware.github.com/comb/symbols/comb.logging.BasicConfigurator.html)
     * [PropertyConfigurator](http://pollenware.github.com/comb/symbols/comb.logging.PropertyConfigurator.html)
* Plugins for objects defined with comb
  * [Broadcaster](http://pollenware.github.com/comb/symbols/comb.plugins.Broadcaster.html)
  * [Middleware ](http://pollenware.github.com/comb/symbols/comb.plugins.Middleware.html)
* [Promises](http://pollenware.github.com/comb/symbols/comb.Promise.html)
* [PromiseLists](http://pollenware.github.com/comb/symbols/comb.PromiseList.html)
* Utilities
  * [comb](http://pollenware.github.com/comb/symbols/comb.html)
  * [Array](http://pollenware.github.com/comb/symbols/comb.array.html)
  * [Date](http://pollenware.github.com/comb/symbols/comb.date.html)
  * [Number](http://pollenware.github.com/comb/symbols/comb.number.html)
  * [Regexp](http://pollenware.github.com/comb/symbols/comb.regexp.html)
  * [String](http://pollenware.github.com/comb/symbols/comb.string.html)
  * [Characters](http://pollenware.github.com/comb/symbols/comb.characters.html)

License
-------

MIT <https://github.com/Pollenware/comb/raw/master/LICENSE>

Meta
----

* Code: `git clone git://github.com/pollenware/comb.git`
* JsDoc: <http://pollenware.github.com/comb>
* Website:  <http://pollenware.com> - Twitter: <http://twitter.com/pollenware> - 877.465.4045
