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