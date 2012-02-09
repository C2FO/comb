0.0.8 / 2012-02-9
===
  * Added new MethodMissing plugin 
  * Bug fixes
    * Changed inflections to underscore between word boundaries and numbers and vice versa with camelize.

0.0.7 / 2012-02-04
==================
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


0.0.6 / 2011-12-29
==================
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

0.0.3 / 2011-06-23
==================
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

0.0.2 / 2011-06-11
==================

  * Added Logging
  * More robust String formatting
  * String styling
  * Updated Docs.

0.0.1 / 2011-05-19
==================

  * Initial release