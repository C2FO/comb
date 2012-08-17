var base = require("./base");

/**
 * @projectName comb
 *
 * @github https://github.com/Pollenware/comb
 *
 * @includeDoc [Define] ../docs-md/define.md
 * @includeDoc [Logging] ../docs-md/logging.md
 *
 *
 * @header
 *
 * <h1>Comb</h1>
 *
 * <h2>Overview</h2>
 *
 * <p>Framework for node that provides a one stop shop for frequently needed utilities, including:</p>
 *
 * <ul>
 * <li>OO utilties</li>
 * <li>Collections</li>
 * <li>Logging</li>
 * <li>String &amp; date formatting</li>
 * <li>Flow control</li>
 * <li>Date Management</li>
 * </ul>
 *
 *
 * <p>See Usage for more details.</p>
 *
 * <h2>Installation</h2>
 *
 * <pre><code>npm install comb
 * </code></pre>
 *
 * <h2>Why?</h2>
 *
 * <p>If your like us its fun to find new modules to use but often wish you didn&rsquo;t have to sift through NPM registry
 * or the node modules page to find what you need.</p>
 *
 * <p> So&hellip;.</p>
 *
 * <p>We created a library of things we use often, or commons utilities that are used by our other APIs.</p>
 *
 * <h2>Highlights</h2>
 *
 * <ul>
 * <li>&gt; 99% test coverage! And we&rsquo;re always adding more!</li>
 * <li>comb(<a href="./comb.html#.define">define</a>|<a
 * href="./comb.html#.singleton">singleton</a>)
 *
 * <ul>
 * <li>The back bone of comb.</li>
 * <li>Options for classical inheritance models as well as mixins(pseudo multi-inheritance)</li>
 * <li>You can call this._super from any method. Including statically defined ones!</li>
 * <li>Access to you class level properties within an instance</li>
 * <li>And <a href="./comb.html#.define">much more&hellip;</a></li>
 * </ul>
 * </li>
 * <li>Logging
 *
 * <ul>
 * <li><a href="http://pollenware.github.com/comb_logging_Logger.html">Powerful logging API!</a></li>
 * <li>Logger inheritance through name spaces</li>
 * <li><a href="./comb_logging_Level.html">Predefined level definition along
 * with the ability to define your own.</a></li>
 * <li>Multiple appenders including
 *
 * <ul>
 * <li><a href="./comb_logging_appenders_FileAppender.html">FileAppender</a>
 * - log it to a file
 * </li>
 * <li><a href="./comb_logging_appenders_RollingFileAppender.html">RollingFileAppender</a>
 * - log it to a file up to a customizable size then create a new one!
 * </li>
 * <li><a href="./comb_logging_appenders_JSONAppender.html">JSONAppender</a>
 * - write it out as JSON to a file.
 * </li>
 * <li><a href="./comb_logging_appenders_ConsoleAppender.html">ConsoleAppender</a>
 * - log it to the console
 * </li>
 * </ul>
 * </li>
 * <li>All appenders can be using with custom levels, separately, or all together.</li>
 * <li>Configurable with <a href="./comb_logging_BasicConfigurator.html">files
 * OR programatically</a></li>
 * </ul>
 * </li>
 * <li>Collections
 *
 * <ul>
 * <li><a href="./comb_collections_RedBlackTree.html">RedBlackTree</a>, <a
 * href="./comb_collections_AVLTree.html">AVLTree</a>, <a
 * href="./comb_collections_AnderssonTree.html">AnderssonTree</a>, <a
 * href="./comb_collections_BinaryTree.html">BinaryTree</a>, <a
 * href="./comb_collections_HashTable.html">HashTable</a>, <a
 * href="./comb_collections_MaxHeap.html">MaxHeap</a>, <a
 * href="./comb_collections_MinHeap.html">MinHeap</a>, <a
 * href="./comb_collections_Pool.html">Pool</a>, <a
 * href="./comb_collections_PriorityQueue.html">PriorityQueue</a>, <a
 * href="./comb_collections_Queue.html">Queue</a>, <a
 * href="./comb_collections_Stack.html">Stack</a></li>
 * </ul>
 * </li>
 * <li>Flow control
 *
 * <ul>
 * <li><a href="./comb_Promise.html">Promises</a></li>
 * <li><a href="./comb.PromiseList.html">PromiseLists</a></li>
 * </ul>
 * </li>
 * <li><a href="./comb.html">Tell me more!</a></li>
 * </ul>
 *
 *
 * <h2>Usage</h2>
 *
 * <ul>
 * <li>OO system
 *
 * <ul>
 * <li><a href="./comb.html#.define">define</a></li>
 * <li><a href="./comb.html#.singleton">singleton</a></li>
 * </ul>
 * </li>
 * <li>Collections
 *
 * <ul>
 * <li><a href="./comb_collections_RedBlackTree.html">RedBlackTree</a></li>
 * <li><a href="./comb_collections_AVLTree.html">AVLTree</a></li>
 * <li><a href="./comb_collections_AnderssonTree.html">AnderssonTree</a></li>
 * <li><a href="./comb_collections_BinaryTree.html">BinaryTree</a></li>
 * <li><a href="./comb_collections_HashTable.html">HashTable</a></li>
 * <li><a href="./comb_collections_MaxHeap.html">MaxHeap</a></li>
 * <li><a href="./comb_collections_MinHeap.html">MinHeap</a></li>
 * <li><a href="./comb_collections_Pool.html">Pool</a></li>
 * <li><a href="./comb_collections_PriorityQueue.html">PriorityQueue</a></li>
 * <li><a href="./comb_collections_Queue.html">Queue</a></li>
 * <li><a href="./comb_collections_Stack.html">Stack</a></li>
 * </ul>
 * </li>
 * <li>Logging
 *
 * <ul>
 * <li><a href="./comb_logging_Logger.html">Logger</a></li>
 * <li><a href="./comb_logging_Level.html">Level</a></li>
 * <li>Appenders
 *
 * <ul>
 * <li><a href="./comb_logging_appenders_Appender.html">Appender</a>
 * </li>
 * <li><a href="./comb_logging_appenders_ConsoleAppender.html">ConsoleAppender</a>
 * </li>
 * <li><a href="./comb_logging_appenders_FileAppender.html">FileAppender</a>
 * </li>
 * <li><a href="./comb_logging_appenders_JSONAppender.html">JSONAppender</a>
 * </li>
 * <li><a href="./comb_logging_appenders_RollingFileAppender.html">RollingFileAppender</a>
 * </li>
 * </ul>
 * </li>
 * <li>Configurators
 *
 * <ul>
 * <li><a href="./comb_logging_BasicConfigurator.html">BasicConfigurator</a>
 * </li>
 * <li><a href="./comb_logging_PropertyConfigurator.html">PropertyConfigurator</a>
 * </li>
 * </ul>
 * </li>
 * </ul>
 * </li>
 * <li>Plugins for objects defined with comb
 *
 * <ul>
 * <li><a href="./comb_plugins_Broadcaster.html">Broadcaster</a></li>
 * <li><a href="./comb_plugins_Middleware.html">Middleware </a></li>
 * </ul>
 * </li>
 * <li><a href="./comb.Promise.html">Promises</a></li>
 * <li><a href="./comb.PromiseList.html">PromiseLists</a></li>
 * <li>Utilities
 *
 * <ul>
 * <li><a href="./comb.html">comb</a></li>
 * <li><a href="./comb_array.html">Array</a></li>
 * <li><a href="./comb_date.html">Date</a></li>
 * <li><a href="./comb_number.html">Number</a></li>
 * <li><a href="./comb_regexp.html">Regexp</a></li>
 * <li><a href="./comb_string.html">String</a></li>
 * <li><a href="./comb_characters.html">Characters</a></li>
 * </ul>
 * </li>
 * </ul>
 *
 *
 * <h2>License</h2>
 *
 * <p>MIT <a href="https://github.com/Pollenware/comb/raw/master/LICENSE">https://github.com/Pollenware/comb/raw/master/LICENSE</a>
 * </p>
 *
 * <h2>Meta</h2>
 *
 * <ul>
 * <li>Code: <code>git clone git://github.com/Pollenware/comb.git</code></li>
 * <li>JsDoc: <a href="http://pollenware.github.com/comb">http://pollenware.github.com/comb</a></li>
 * <li>Website: <a href="http://pollenware.com">http://pollenware.com</a> - Twitter: <a
 * href="http://twitter.com/pollenware">http://twitter.com/pollenware</a> - 877.465.4045
 * </li>
 * </ul>
 *
 */

/**
 * Utilities for javascript, optimized for the server environment.
 *
 *
 * @namespace
 */
var comb = exports;
base.merge(exports, base, require("./define"), require("./promise"), require("./plugins"), require("./collections"), require("./logging"));


comb.definePlugin = function (obj) {
    if (comb.isHash(obj)) {
        comb.deepMerge(comb, obj);
    }
    return comb;
};



