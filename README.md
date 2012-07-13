#Comb


###NOTE: v0.1.1 removed proxy code out of core see [comb-proxy](http://github.com/Pollenware/comb-proxy)

##Overview

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


##Why?


If your like us its fun to find new modules to use but often wish you didn't have to sift through NPM registry or the node modules page to find what you need.

   So....

We created a library of things we use often, or commons utilities that are used by our other APIs.

##Highlights

* &gt; 99% test coverage! And we're always adding more!
* comb([define](http://pollenware.github.com/comb/comb.html#.define)|[singleton](http://pollenware.github.com/comb/comb.html#.singleton))
   * The back bone of comb.
   * Options for classical inheritance models as well as mixins(pseudo multi-inheritance)
   * You can call this._super from any method. Including statically defined ones!
   * Access to you class level properties within an instance
   * And [much more...](http://pollenware.github.com/comb/comb.html#.define)
* Logging
  * [Powerful logging API!](http://pollenware.github.com/comb_logging_Logger.html)
  * Logger inheritance through name spaces
  * [Predefined level definition along with the ability to define your own.](http://pollenware.github.com/comb/comb_logging_Level.html)
  * Multiple appenders including
     * [FileAppender](http://pollenware.github.com/comb/comb_logging_appenders_FileAppender.html) - log it to a file
     * [RollingFileAppender](http://pollenware.github.com/comb/comb_logging_appenders_RollingFileAppender.html) - log it to a file up to a customizable size then create a new one!
     * [JSONAppender](http://pollenware.github.com/comb/comb_logging_appenders_JSONAppender.html) - write it out as JSON to a file.
     * [ConsoleAppender](http://pollenware.github.com/comb/comb_logging_appenders_ConsoleAppender.html) - log it to the console
  * All appenders can be using with custom levels, separately, or all together.
  * Configurable with [files OR programatically](http://pollenware.github.com/comb/comb_logging_BasicConfigurator.html)
* Collections
  * [RedBlackTree](http://pollenware.github.com/comb/comb_collections_RedBlackTree.html), [AVLTree](http://pollenware.github.com/comb/comb_collections_AVLTree.html), [AnderssonTree](http://pollenware.github.com/comb/comb_collections_AnderssonTree.html), [BinaryTree](http://pollenware.github.com/comb/comb_collections_BinaryTree.html), [HashTable](http://pollenware.github.com/comb/comb_collections_HashTable.html), [MaxHeap](http://pollenware.github.com/comb/comb_collections_MaxHeap.html), [MinHeap](http://pollenware.github.com/comb/comb_collections_MinHeap.html), [Pool](http://pollenware.github.com/comb/comb_collections_Pool.html), [PriorityQueue](http://pollenware.github.com/comb/comb_collections_PriorityQueue.html), [Queue](http://pollenware.github.com/comb/comb_collections_Queue.html), [Stack](http://pollenware.github.com/comb/comb_collections_Stack.html)
* Flow control
  * [Promises](http://pollenware.github.com/comb/comb_Promise.html)
  * [PromiseLists](http://pollenware.github.com/comb/comb_PromiseList.html)
* [Tell me more!](http://pollenware.github.com/comb/comb.html)
 
  

##Usage


* OO system
  * [define](http://pollenware.github.com/comb/comb.html#.define)
  * [singleton](http://pollenware.github.com/comb/comb.html#.singleton)
* Collections
  * [RedBlackTree](http://pollenware.github.com/comb/comb_collections_RedBlackTree.html)
  * [AVLTree](http://pollenware.github.com/comb/comb_collections_AVLTree.html)
  * [AnderssonTree](http://pollenware.github.com/comb/comb_collections_AnderssonTree.html)
  * [BinaryTree](http://pollenware.github.com/comb/comb_collections_BinaryTree.html)
  * [HashTable](http://pollenware.github.com/comb/comb_collections_HashTable.html)
  * [MaxHeap](http://pollenware.github.com/comb/comb_collections_MaxHeap.html)
  * [MinHeap](http://pollenware.github.com/comb/comb_collections_MinHeap.html)
  * [Pool](http://pollenware.github.com/comb/comb_collections_Pool.html)
  * [PriorityQueue](http://pollenware.github.com/comb/comb_collections_PriorityQueue.html)
  * [Queue](http://pollenware.github.com/comb/comb_collections_Queue.html)
  * [Stack](http://pollenware.github.com/comb/comb_collections_Stack.html)
* Logging
  * [Logger](http://pollenware.github.com/comb/comb_logging_Logger.html)
  * [Level](http://pollenware.github.com/comb/comb_logging_Level.html)
  * Appenders
     * [Appender](http://pollenware.github.com/comb/comb_logging_appenders_Appender.html)
     * [ConsoleAppender](http://pollenware.github.com/comb/comb_logging_appenders_ConsoleAppender.html)
     * [FileAppender](http://pollenware.github.com/comb/comb_logging_appenders_FileAppender.html)
     * [JSONAppender](http://pollenware.github.com/comb/comb_logging_appenders_JSONAppender.html)
     * [RollingFileAppender](http://pollenware.github.com/comb/comb_logging_appenders_RollingFileAppender.html)
  * Configurators
     * [BasicConfigurator](http://pollenware.github.com/comb/comb_logging_BasicConfigurator.html)
     * [PropertyConfigurator](http://pollenware.github.com/comb/comb_logging_PropertyConfigurator.html)
* Plugins for objects defined with comb
  * [Broadcaster](http://pollenware.github.com/comb/comb_plugins_Broadcaster.html)
  * [Middleware ](http://pollenware.github.com/comb/comb_plugins_Middleware.html)
* [Promises](http://pollenware.github.com/comb/comb_Promise.html)
* [PromiseLists](http://pollenware.github.com/comb/comb_PromiseList.html)
* Utilities
  * [comb](http://pollenware.github.com/comb/comb.html)
  * [Array](http://pollenware.github.com/comb/comb_array.html)
  * [Date](http://pollenware.github.com/comb/comb_date.html)
  * [Number](http://pollenware.github.com/comb/comb_number.html)
  * [Regexp](http://pollenware.github.com/comb/comb_regexp.html)
  * [String](http://pollenware.github.com/comb/comb_string.html)
  * [Characters](http://pollenware.github.com/comb/comb_characters.html)

##License


MIT <https://github.com/Pollenware/comb/raw/master/LICENSE>

##Meta


* Code: `git clone git://github.com/Pollenware/comb.git`
* JsDoc: <http://pollenware.github.com/comb>
* Website:  <http://pollenware.com> - Twitter: <http://twitter.com/pollenware> - 877.465.4045
