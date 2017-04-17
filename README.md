[![build status](https://travis-ci.org/C2FO/comb.svg?branch=master)](http://travis-ci.org/C2FO/comb)
[![Coverage Status](https://coveralls.io/repos/C2FO/comb/badge.svg?branch=master&service=github)](https://coveralls.io/github/C2FO/comb?branch=master)

# Comb


## Overview                                                                                                                                         

Framework for node that provides a one stop shop for frequently needed utilities, including:                                                       

* [OO utilties](http://c2fo.github.com/comb/define.html)                                                                                                                     
* Collections                                                                                                                                      
* [Logging](http://c2fo.github.com/comb/logging.html)                                                                                                                        
* [String &amp; date formatting](http://c2fo.github.com/comb/utilities)                                                                                                      
* [Flow control](http://c2fo.github.com/comb/promise.html)                                                                                                                   


## Installation                                                                                                                                     

`npm install comb`

### [Getting Started](http://c2fo.github.com/comb/introduction.html)

## Highlights                                                                                                                                       

* 100% test coverage!                                                                                                                              
* comb([define](http://c2fo.github.com/comb/comb.html#.define)|[singleton](http://c2fo.github.com/comb/comb.html#.singleton))                                                                          
  * The backbone of comb.                                                                                                                          
  * Options for classical inheritance models as well as mixins(pseudo multi-inheritance)                                                           
  * You can call this._super from any method. Including statically defined ones!                                                                   
  * Access to your class level properties within an instance                                                                                       
* [Logging](http://c2fo.github.com/comb/logging.html)                                                                                                                                         
  * Logger inheritance through name spaces                                                                                                         
  * Predefined [level](http://c2fo.github.com/comb/comb_logging_Level.html) level definition along with the ability to define your own.                                      
  * Multiple appenders including                                                                                                                   
     * [FileAppender](http://c2fo.github.com/comb/comb_logging_appenders_FileAppender.html) - log it to a file                                                               
     * [RollingFileAppender](http://c2fo.github.com/comb/comb_logging_appenders_RollingFileAppender.html) - log it to a file up to a customizable size then create a new one.
     * [JSONAppender](http://c2fo.github.com/comb/comb_logging_appenders_JSONAppender.html) - write it out as JSON to a file.                                                
     * [ConsoleAppender](http://c2fo.github.com/comb/comb_logging_appenders_ConsoleAppender.html)- log it to the console                                                     
  * Configurable with [files OR programatically](http://c2fo.github.com/comb/comb_logger.html#.configure)                                                                    
* Collections                                                                                                                                      
  * [RedBlackTree](http://c2fo.github.com/comb/comb_collections_RedBlackTree.html)                                                                                           
  * [AVLTree](http://c2fo.github.com/comb/comb_collections_AVLTree.html)                                                                                                     
  * [AnderssonTree](.http://c2fo.github.com/combcomb_collections_AnderssonTree.html)                                                                                         
  * [BinaryTree](http://c2fo.github.com/comb/comb_collections_BinaryTree.html)                                                                                               
  * [HashTable](http://c2fo.github.com/comb/comb_collections_HashTable.html)                                                                                                 
  * [MaxHeap](http://c2fo.github.com/comb/comb_collections_MaxHeap.html)                                                                                                     
  * [MinHeap](http://c2fo.github.com/comb/comb_collections_MinHeap.html)                                                                                                     
  * [Pool](http://c2fo.github.com/comb/comb_collections_Pool.html)                                                                                                           
  * [PriorityQueue](http://c2fo.github.com/comb/comb_collections_PriorityQueue.html)                                                                                         
  * [Queue](http://c2fo.github.com/comb/comb_collections_Queue.html)                                                                                                         
  * [Stack](http://c2fo.github.com/comb/comb_collections_Stack.html)                                                                                                         

* [Flow control](http://c2fo.github.com/comb/promise.html)                                                                                                                   
  * [Promises](http://c2fo.github.com/comb/comb_Promise.html)                                                                                                                
  * [PromiseList](http://c2fo.github.com/comb/comb_PromiseList.html)                                                                                                         
  * [comb.when](http://c2fo.github.com/comb/comb.html#.when)                                                                                                                 
  * [comb.serial](http://c2fo.github.com/comb/comb.html#.serial)                                                                                                             

## License


MIT <https://github.com/c2fo/comb/raw/master/LICENSE>

## Meta

* Code: `git clone git://github.com/c2fo/comb.git`
* JsDoc: <http://c2fo.github.com/comb>
* Website:  <http://c2fo.com> - Twitter: <http://twitter.com/c2fo> - 877.465.4045
