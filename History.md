#0.2.1
* Added check for `getgid` when logging on non posix systems

#0.2.0 / 2012-11-20
* Added new features to comb.define
  * extend - supports direct extension `Mammal.extend({})`
  * define now accepts a hash directly istead of requiring null if there is not a super
* Added the ability to catch errors with comb.Promise#chain
  * will call nearest errback
  * allows the ability to catch errors and still be successful
  * allows one to rethrow errors
  * accepts a promise as a return value from an errback
* updated docs



#0.1.10 / 2012-11-14
* Added new properites to logger events
  * gid
  * pid
  * processTitle
  * hostname


#0.1.91 / 2012-10-01
* Added `_getSuper` to classes declared with comb.define

#0.1.9 / 2012-09-22
* Change comb.array.intersection to not use recursion
* added `comb.wait`

#0.1.8/2012-09-10
* Added travis CI build
* Updated comb.date to use maps where possible and removed switch statements to use else if
* Updated tests to run as expected each time
* Updated tests to be timezone agnostic
* Fixed console appender test

#0.1.7/2012-09-05
* comb.async
 * forEach
 * map
 * filter
 * some
 * every
 * zip
 * sum
 * avg
 * sort
 * min
 * max
 * difference
 * removeDuplicates
 * unique
 * rotate
 * permutations
 * transpose
 * valuesAt
 * union
 * intersect
 * powerSet
 * cartesian
 * compact
 * multiply
 * flatten
 * pluck
 * invoke
* new function features …
  * hitch and partial now accept property names to access
  * New method applyFirst
* Changed comb to be a function see [here](http://c2fo.github.com/comb/introduction.html)
* More tests
* Updated docs


#0.1.6/2012-08-29
* Changed comb.when to accept an array of promises as well as multi args
* Added comb.chain to pipe results from one item to another
* Updated docs and tests


#0.1.5/2012-08-26
* Changed middleware plugin to error properly

#0.1.4/2012-08-20
* added new short cut for configuring loggers
* Added changed logger.addAppender to accept a string and options to use Appender.createAppender method.
* comb.argsToArray now takes a slice argument to remove arguments.
* Added a resolve function to comb.Promise to handle node style callback resolution.
* Added a "promise" method to comb.Promise to allow for the return of an object that will not allow calling function to resolve the promise.
* Cleaned up promise using code to return the "promise" wrapper.

#0.1.3/2012-08-16
* new array methods
  * sort
  * min
  * max
  * difference
  * avg
* Logging changes
  * Added `comb.logger` as shortcut to get a logger
  * Changed appenders to register themselves for dynamic appender creation
* Updated docs   	

#0.1.2/2012-07-17
* Bug fixes
  * Changed comb.logging.PropertyConfigurator to deep merge porperties (Clone to config object)
* Added comb.array.multiply
* Updated docs to use [coddoc](https://github.comb/doug-martin/coddoc)  

#0.1.1/2012-04-20

  * Migrated all tests to use [it](http://github.com/doug-martin/it)
  * More Tests
  * Added functionality to comb.Promise/PromiseList (allowing promises as callbacks and node style callbacks for)

#0.1.0/2012-03-02

  * comb.define performance increase
  * Changed HashTable to use strict equal
  * Doc fixes

#0.0.9 /2012-02-16

  * Complete redesign of comb.define to be more flexible and efficient
     * this._super does not require and Arguments object any more to call super
  * added "use strict" to all tests
  * New Features
     * comb.serial method for executing methods that return promises serially
     * comb.wrap method for wrapping node methods that require a function callback, with a promise
     * new date helper methods
        * comb.yearsFromNow
        * comb.yearsAgo
        * comb.daysFromNow
        * comb.daysAgo
        * comb.monthsFromNow
        * comb.monthsAgo
        * comb.hoursFromNow
        * comb.hoursAgo
        * comb.minutesFromNow
        * comb.minutesAgo
        * comb.secondsFromNow
        * comb.secondsAgo
     * comb.hitchIgnore/bindIngore for binding a method to a certain scope but ignoring all passed in parameters
     * comb.number.roundCeil for round numbers up always
  * Bug Fixes
     * Fixed logging appender level setting, before the appenders level would always be overriden on initialization
     



#0.0.8 / 2012-02-9

  * Added new MethodMissing plugin 
  * Bug fixes
    * Changed inflections to underscore between word boundaries and numbers and vice versa with camelize.

#0.0.7 / 2012-02-04

  * Bug Fixes
  * Fixed issue with array.zip
  * Fixed error with date.parse and alternate characters
  * Fixed MaxCallStack exceeded error
    * Changed callback and errback to resolved listeners in a new stack using process.nextTick
    * Changed the middle ware plugin to use process.nextTick when calling next.
  * Altered  logging.Level to allow the setting of levels from external APIs
  * Fixed issue with runner.js where paths that contained spaces would not run
  * Changed comb.when to test if the arguments are "promiseLike" so multiple versions of comb will work together
  * Updated docs.


#0.0.6 / 2011-12-29

  * Bug Fixes
  * Added new Proxy methods
  * comb.executeInOrder
  * new test for isHash
  * added listener or "uncaughtException" when using logging
  * new inflections API
  * comb.when
  * new promise methods [both, chainBoth]
  * static initialization block on objects using comb.define
  * more tests

#0.0.3 / 2011-06-23

  * 100% test coverage
  * Bug fixes
  * Added Makefile
    * make install
    * make test
    * make test-coverage
    * make docs
    * make docclean
    * make benchmarks
    * make uninstall
  * Added jscoverage sub module

#0.0.2 / 2011-06-11


  * Added Logging
  * More robust String formatting
  * String styling
  * Updated Docs.

#0.0.1 / 2011-05-19


  * Initial release