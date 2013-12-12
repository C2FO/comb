"use strict";
var it = require('it'),
    assert = require('assert'),
    comb = require("index"),
    define = comb.define,
    hitch = comb.hitch;


it.describe("comb.date",function (it) {

// Create a fake Date object with toString and toLocaleString
// results manually set to simulate tests for multiple browsers
    var FakeDate = function (str, strLocale, timzezoneOffset) {
        this.str = str || '';
        this.strLocale = strLocale || '';
        this.timezoneOffset = timzezoneOffset || 0;
        this.getFullYear = function () {
        };
        this.getMonth = function () {
        };
        this.getDate = function () {
        };
        this.getDay = function () {
        };
        this.getHours = function () {
        };
        this.getMinutes = function () {
        };
        this.getMilliseconds = function () {
        };
        this.getSeconds = function () {
        };
        this.getUTCFullYear = function () {
        };
        this.getUTCMonth = function () {
        };
        this.getUTCDate = function () {
        };
        this.getUTCDay = function () {
        };
        this.getUTCHours = function () {
        };
        this.getUTCMinutes = function () {
        };
        this.getUTCMilliseconds = function () {
        };
        this.getUTCSeconds = function () {
        };
        this.getTimezoneOffset = function () {
            return this.timezoneOffset;
        };
        this.toString = function () {
            return this.str;
        };
        this.toLocaleString = function () {
            return this.strLocale;
        };
    };

    var dt = new FakeDate();
//Super of other classes

    it.should("test if something is a date", function () {
        var undef;
        assert.isTrue(comb.isDate(new Date()));
        assert.isTrue(comb(new Date()).isDate());
        assert.isFalse(comb.isDate(undef));
        assert.isFalse(comb.isDate(undefined));
        assert.isFalse(comb.isDate({}));
        assert.isFalse(comb.isDate(String("")));
        assert.isFalse(comb.isDate(""));
        assert.isFalse(comb.isDate(true));
        assert.isFalse(comb.isDate(false));
        assert.isFalse(comb.isDate(1));
    });

    it.should("test properly", function () {
        var thursday = new Date(2006, 8, 21);
        var saturday = new Date(2006, 8, 23);
        var sunday = new Date(2006, 8, 24);
        var monday = new Date(2006, 8, 25);
        assert.isFalse(comb.date.isWeekend(thursday));
        assert.isTrue(comb.date.isWeekend(saturday));
        assert.isTrue(comb.date.isWeekend(sunday));
        assert.isFalse(comb.date.isWeekend(monday));
    });

    it.describe("#format", function (it) {
        var date = comb(new Date(2006, 7, 11, 0, 55, 12, 345));

        it.should("format EEEE, MMMM dd, yyyy to Friday, August 11, 2006 ", function () {
            assert.equal(date.format("EEEE, MMMM dd, yyyy"), "Friday, August 11, 2006");
        });

        it.should("format EEEE, MMMM dd, yyyy G to Friday, August 11, 2006 AD ", function () {
            assert.equal(date.format("EEEE, MMMM dd, yyyy G"), "Friday, August 11, 2006 AD");
        });

        it.should("format EEEE, MMMM dd, yyyy GGGG to Friday, August 11, 2006 Anno Domini ", function () {
            assert.equal(date.format("EEEE, MMMM dd, yyyy GGGG"), "Friday, August 11, 2006 Anno Domini");
        });

        it.should("format M/dd/yy  to 8/11/06 ", function () {
            assert.equal(date.format("M/dd/yy"), "8/11/06");
        });

        it.should("format E  to 6 ", function () {
            assert.equal(date.format("E"), "6");
        });

        it.should("format h:m a  to 12:55 AM ", function () {
            assert.equal(date.format("h:m a"), "12:55 AM");
        });

        it.should("format H:m:s  to 12:55:12", function () {
            assert.equal(date.format('h:m:s'), "12:55:12");
        });

        it.should("format h:m:s.SS  to 12:55:12.35 ", function () {
            assert.equal(date.format('h:m:s.SS'), ((date.getHours() % 12) || 12) + ":55:12.35");
        });

        it.should("format k:m:s.SS to 24:55:12.35 ", function () {
            assert.equal(date.format('k:m:s.SS'), (date.getHours() || 24) + ":55:12.35");
        });

        it.should("format K:m:s.SS to 0:55:12.35 ", function () {
            assert.equal(date.format('K:m:s.SS'), "0:55:12.35");
        });

        it.should("format H:m:s.SS to 0:55:12.35 ", function () {
            assert.equal(date.format('H:m:s.SS'), "0:55:12.35");
        });


        it.should("format ddMMyyyy to 11082006 ", function () {
            assert.equal(date.format("ddMMyyyy"), "11082006");
        });

        it.should("format q to 6 ", function () {
            assert.equal(date.format("q"), "3");
        });

        it.should("format w, q formatted to 32, 6 ", function () {
            assert.equal(date.format("w, q"), "32, 3");
        });

        it.should("format D w, q to 223 32, 6 ", function () {
            assert.equal(date.format("D w, q"), "223 32, 3");
        });

        it.should("format z to CDT ", function () {
            dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
            dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
            assert.equal(comb.date.format(dt, "z"), "CDT");
        });

        it.should("format z to GMT-05:00", function () {
            dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500';
            dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM';
            dt.timezoneOffset = 300;
            assert.equal(comb.date.format(dt, "z"), "GMT-05:00");
        });

        it.should("format zY to GMT-05:00", function () {
            dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500';
            dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM';
            dt.timezoneOffset = 300;
            assert.equal(comb.date.format(dt, "zY"), "GMT-05:00Y");
        });


        it.should("EEEE, MMMM dd, yyyy to Friday, August 11, 2006 ", function () {
            assert.equal(date.format("EEEE, MMMM dd, yyyy", true), "Friday, August 11, 2006");
        });

        it.should("EEEE, MMMM dd, yyyy G to Friday, August 11, 2006 AD ", function () {
            assert.equal(date.format("EEEE, MMMM dd, yyyy G", true), "Friday, August 11, 2006 AD");
        });

        it.should("EEEE, MMMM dd, yyyy GGGG to Friday, August 11, 2006 Anno Domini ", function () {
            assert.equal(date.format("EEEE, MMMM dd, yyyy GGGG", true), "Friday, August 11, 2006 Anno Domini");
        });

        it.should("M/dd/yy to 8/11/06 ", function () {
            assert.equal(date.format("M/dd/yy", true), "8/11/06");
        });

        it.should("E to 6 ", function () {
            assert.equal(date.format("E", true), "6");
        });

        it.should("h:m a to 5:55 AM ", function () {
            assert.equal(date.format("h:m a", true), ((date.getUTCHours() % 12) || 12) + ":55 AM");
        });

        it.should("H:m:s to 6:55:12", function () {
            assert.equal(date.format('h:m:s', true), ((date.getUTCHours() % 12) || 12) + ":55:12");
        });

        it.should("h:m:s.SS to 6:55:12.35 ", function () {
            assert.equal(date.format('h:m:s.SS', true), ((date.getUTCHours() % 12) || 12) + ":55:12.35");
        });

        it.should("k:m:s.SS to 6:55:12.35 ", function () {
            assert.equal(date.format('k:m:s.SS', true), (date.getUTCHours() || 24) + ":55:12.35");
        });

        it.should("K:m:s.SS to 5:55:12.35 ", function () {
            assert.equal(date.format('K:m:s.SS', true), date.getUTCHours() + ":55:12.35");
        });

        it.should("H:m:s.SS to 5:55:12.35 ", function () {
            assert.equal(date.format('H:m:s.SS', true), date.getUTCHours() + ":55:12.35");
        });


        it.should("ddMMyyyy to 11082006 ", function () {
            assert.equal(date.format("ddMMyyyy", true), "11082006");
        });

        it.should("q to 6 ", function () {
            assert.equal(date.format("q", true), "3");
        });

        it.should("w, q formatted to 32, 6 ", function () {
            assert.equal(date.format("w, q", true), "32, 3");
        });

        it.should("D w, q to 223 32, 6 ", function () {
            assert.equal(date.format("D w, q", true), "223 32, 3");
        });

        it.should("z to CDT ", function () {
            dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
            dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
            assert.equal(comb.date.format(dt, "z", true), "CDT");
        });

        it.should("z to GMT-00:00", function () {
            dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0000';
            dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM';
            dt.timezoneOffset = 0;
            assert.equal(comb.date.format(dt, "z", true), "GMT-00:00");
        });

        it.should("zY to GMT-00:00", function () {
            dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0000';
            dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM';
            dt.timezoneOffset = 0;
            assert.equal(comb.date.format(dt, "zY", true), "GMT-00:00Y");
        });

    });

    it.describe("#parse", function (it) {

        it.should("not parse ''", function () {
            assert.isNull(comb.date.parse("", "MM/dd/yy"));
        });

        it.should("throw an error if format is not specified", function () {
            assert.throws(function () {
                comb.date.parse("", "");
            });
            assert.throws(function () {
                comb.date.parse("");
            });
        });

        it.describe("namespaced", function (it) {

            it.should("parse 08/11/06", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("08/11/06", "MM/dd/yy"), aug_11_2006);
            });

            it.should("not parse 13/11/06", function () {
                assert.isNull(comb.date.parse("13/11/06", "MM/dd/yy"));
            });

            it.should("not parse 02/31/06", function () {
                assert.isNull(comb.date.parse("02/31/06", "M/dd/yy"));
            });


            it.should("parse 8/11/06", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("8/11/06", "M/dd/yy"), aug_11_2006);
            });

            it.should("parse 8/11/2006", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("8/11/2006", "M/dd/yyyy"), aug_11_2006);
            });

            it.should("parse 11Aug2006", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("11Aug2006", 'ddMMMyyyy'), aug_11_2006);
            });

            it.should("not parse 11Ag2006", function () {
                assert.isNull(comb.date.parse("11Ag2006", 'ddMMMyyyy'));
            });

            it.should("parse Aug2006", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("Aug2006", 'MMMyyyy'), new Date(2006, 7, 1));
            });

            it.should("parse Aug 11, 2006", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("Aug 11, 2006", "MMM dd, yyyy"), aug_11_2006);
            });

            it.should("parse August 11, 06", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("August 11, 2006", "MMMM dd, yyyy"), aug_11_2006);
            });

            it.should("parse Friday, August 11, 06", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("Friday, August 11, 2006", "EEEE, MMMM dd, yyyy"), aug_11_2006);
            });

            it.should("parse format date : 6, August 11, 2006 with format : E, MMMM dd, yyyy", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("6, August 11, 2006", "E, MMMM dd, yyyy"), aug_11_2006);
            });


            it.should("parse format date : Friday, August 11, 2006 AD with format : EEEE, MMMM dd, yyyy G", function () {
                var date = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("Friday, August 11, 2006 AD", "EEEE, MMMM dd, yyyy G"), date);
            });

            it.should("parse format date : Friday, August 11, 2006 Anno Domini with format : EEEE, MMMM dd, yyyy GGGG", function () {
                var date = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("Friday, August 11, 2006 Anno Domini", "EEEE, MMMM dd, yyyy GGGG"), date);
            });

            it.should("parse format date : Fri, August 11, 2006 Anno Domini with format : EEE, MMMM dd, yyyy GGGG", function () {
                var date = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb.date.parse("Fri, August 11, 2006 Anno Domini", "EEE, MMMM dd, yyyy GGGG"), date);
            });

            it.should("not parse format date : Fr, August 11, 2006 Anno Domini with format : EEE, MMMM dd, yyyy GGGG", function () {
                var date = new Date(2006, 7, 11, 0);
                assert.isNull(comb.date.parse("Fr, August 11, 2006 Anno Domini", "EEE, MMMM dd, yyyy GGGG"));
            });


            it.should("parse format date : 12:55 AM with format : h:m: a", function () {
                var date = new Date(1970, 0, 1, 0, 55);
                assert.deepEqual(comb.date.parse("12:55 AM", "h:m a"), date);
            });

            it.should("parse format date : 12:55 PM with format : h:m: a", function () {
                var date = new Date(1970, 0, 1, 13, 55);
                assert.deepEqual(comb.date.parse("1:55 PM", "h:m a"), date);
            });

            it.should("not parse format date : 13:55 AM with format : h:m: a", function () {
                assert.isNull(comb.date.parse("13:55 AM", "h:m a"));
            });

            it.should("parse format date : 12:55:12 with format : h:m:s", function () {
                var date = new Date(1970, 0, 1, 12, 55, 12);
                assert.deepEqual(comb.date.parse("12:55:12", 'h:m:s'), date);
            });

            it.should("parse format date : 12:55:12.35 with format : h:m:s.SS", function () {
                var date = new Date(1970, 0, 1, 12, 55, 12, 35);
                assert.deepEqual(comb.date.parse("12:55:12.35", 'h:m:s.SS'), date);
            });

            it.should("parse format date : 24:55:12.35 with format : k:m:s.SS", function () {
                var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                assert.deepEqual(comb.date.parse("24:55:12.35", 'k:m:s.SS'), date);
            });

            it.should("parse format date :  0:55:12.35 with format : K:m:s.SS", function () {
                var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                assert.deepEqual(comb.date.parse("0:55:12.35", 'K:m:s.SS'), date);
            });

            it.should("not parse format date :  24:55:12.35 with format : K:m:s.SS", function () {
                assert.isNull(comb.date.parse("24:55:12.35", 'K:m:s.SS'));
            });

            it.should("parse format date : 0:55:12.35 with format : H:m:s.SS", function () {
                var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                assert.deepEqual(comb.date.parse("0:55:12.35", 'H:m:s.SS'), date);
            });

            it.should("parse format date : 223 32, 6 with format: D w, q", function () {
                var date = new Date(1970, 7, 11);
                assert.deepEqual(comb.date.parse("223 32, 3", "D w, q"), date);
            });

            it.should("parse format date : 223T32,T6 with format: DTw,Tq", function () {
                var date = new Date(1970, 7, 11);
                assert.deepEqual(comb.date.parse("223T32,T3", "DTw,Tq"), date);
            });

        });

        it.describe("extension", function (it) {

            it.should("parse 08/11/06", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("08/11/06").parseDate("MM/dd/yy"), aug_11_2006);
            });

            it.should("not parse 13/11/06", function () {
                assert.isNull(comb("13/11/06").parseDate("MM/dd/yy"));
            });

            it.should("not parse 02/31/06", function () {
                assert.isNull(comb("02/31/06").parseDate("M/dd/yy"));
            });


            it.should("parse 8/11/06", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("8/11/06").parseDate("M/dd/yy"), aug_11_2006);
            });

            it.should("parse 8/11/2006", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("8/11/2006").parseDate("M/dd/yyyy"), aug_11_2006);
            });

            it.should("parse 11Aug2006", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("11Aug2006").parseDate('ddMMMyyyy'), aug_11_2006);
            });

            it.should("not parse 11Ag2006", function () {
                assert.isNull(comb("11Ag2006").parseDate('ddMMMyyyy'));
            });

            it.should("parse Aug2006", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("Aug2006").parseDate('MMMyyyy'), new Date(2006, 7, 1));
            });

            it.should("parse Aug 11, 2006", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("Aug 11, 2006").parseDate("MMM dd, yyyy"), aug_11_2006);
            });

            it.should("parse August 11, 06", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("August 11, 2006").parseDate("MMMM dd, yyyy"), aug_11_2006);
            });

            it.should("parse Friday, August 11, 06", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("Friday, August 11, 2006").parseDate("EEEE, MMMM dd, yyyy"), aug_11_2006);
            });

            it.should("parse format date : 6, August 11, 2006 with format : E, MMMM dd, yyyy", function () {
                var aug_11_2006 = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("6, August 11, 2006").parseDate("E, MMMM dd, yyyy"), aug_11_2006);
            });


            it.should("parse format date : Friday, August 11, 2006 AD with format : EEEE, MMMM dd, yyyy G", function () {
                var date = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("Friday, August 11, 2006 AD").parseDate("EEEE, MMMM dd, yyyy G"), date);
            });

            it.should("parse format date : Friday, August 11, 2006 Anno Domini with format : EEEE, MMMM dd, yyyy GGGG", function () {
                var date = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("Friday, August 11, 2006 Anno Domini").parseDate("EEEE, MMMM dd, yyyy GGGG"), date);
            });

            it.should("parse format date : Fri, August 11, 2006 Anno Domini with format : EEE, MMMM dd, yyyy GGGG", function () {
                var date = new Date(2006, 7, 11, 0);
                assert.deepEqual(comb("Fri, August 11, 2006 Anno Domini").parseDate("EEE, MMMM dd, yyyy GGGG"), date);
            });

            it.should("not parse format date : Fr, August 11, 2006 Anno Domini with format : EEE, MMMM dd, yyyy GGGG", function () {
                var date = new Date(2006, 7, 11, 0);
                assert.isNull(comb("Fr, August 11, 2006 Anno Domini").parseDate("EEE, MMMM dd, yyyy GGGG"));
            });


            it.should("parse format date : 12:55 AM with format : h:m: a", function () {
                var date = new Date(1970, 0, 1, 0, 55);
                assert.deepEqual(comb("12:55 AM").parseDate("h:m a"), date);
            });

            it.should("parse format date : 12:55 PM with format : h:m: a", function () {
                var date = new Date(1970, 0, 1, 13, 55);
                assert.deepEqual(comb("1:55 PM").parseDate("h:m a"), date);
            });

            it.should("not parse format date : 13:55 AM with format : h:m: a", function () {
                assert.isNull(comb("13:55 AM").parseDate("h:m a"));
            });

            it.should("parse format date : 12:55:12 with format : h:m:s", function () {
                var date = new Date(1970, 0, 1, 12, 55, 12);
                assert.deepEqual(comb("12:55:12").parseDate('h:m:s'), date);
            });

            it.should("parse format date : 12:55:12.35 with format : h:m:s.SS", function () {
                var date = new Date(1970, 0, 1, 12, 55, 12, 35);
                assert.deepEqual(comb("12:55:12.35").parseDate('h:m:s.SS'), date);
            });

            it.should("parse format date : 24:55:12.35 with format : k:m:s.SS", function () {
                var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                assert.deepEqual(comb("24:55:12.35").parseDate('k:m:s.SS'), date);
            });

            it.should("parse format date :  0:55:12.35 with format : K:m:s.SS", function () {
                var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                assert.deepEqual(comb("0:55:12.35").parseDate('K:m:s.SS'), date);
            });

            it.should("not parse format date :  24:55:12.35 with format : K:m:s.SS", function () {
                assert.isNull(comb("24:55:12.35").parseDate('K:m:s.SS'));
            });

            it.should("parse format date : 0:55:12.35 with format : H:m:s.SS", function () {
                var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                assert.deepEqual(comb("0:55:12.35").parseDate('H:m:s.SS'), date);
            });

            it.should("parse format date : 223 32, 6 with format: D w, q", function () {
                var date = new Date(1970, 7, 11);
                assert.deepEqual(comb("223 32, 3").parseDate("D w, q"), date);
            });

            it.should("parse format date : 223T32,T6 with format: DTw,Tq", function () {
                var date = new Date(1970, 7, 11);
                assert.deepEqual(comb("223T32,T3").parseDate("DTw,Tq"), date);
            });

        });
    });

    it.describe("#getDaysInMonth", function (it) {

        it.describe("namespaced", function (it) {
            it.should("detrmine the number of days in january", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 0, 1)), 31);
            });

            it.should("detrmine the number of days in february", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 1, 1)), 28);
                assert.equal(comb.date.getDaysInMonth(new Date(2004, 1, 1)), 29);
                assert.equal(comb.date.getDaysInMonth(new Date(2000, 1, 1)), 29);
                assert.equal(comb.date.getDaysInMonth(new Date(1900, 1, 1)), 28);
                assert.equal(comb.date.getDaysInMonth(new Date(1800, 1, 1)), 28);
                assert.equal(comb.date.getDaysInMonth(new Date(1700, 1, 1)), 28);
                assert.equal(comb.date.getDaysInMonth(new Date(1600, 1, 1)), 29);
            });

            it.should("detrmine the number of days in march", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 2, 1)), 31);
            });

            it.should("detrmine the number of days in april", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 3, 1)), 30);
            });

            it.should("detrmine the number of days in may", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 4, 1)), 31);
            });

            it.should("detrmine the number of days in june", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 5, 1)), 30);
            });

            it.should("detrmine the number of days in july", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 6, 1)), 31);
            });

            it.should("detrmine the number of days in august", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 7, 1)), 31);
            });

            it.should("detrmine the number of days in september", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 8, 1)), 30);
            });

            it.should("detrmine the number of days in october", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 9, 1)), 31);
            });

            it.should("detrmine the number of days in november", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 10, 1)), 30);
            });

            it.should("detrmine the number of days in december", function () {
                assert.equal(comb.date.getDaysInMonth(new Date(2006, 11, 1)), 31);
            });
        });

        it.describe("extension", function (it) {
            it.should("detrmine the number of days in january", function () {
                assert.equal(comb(new Date(2006, 0, 1)).getDaysInMonth(), 31);
            });

            it.should("detrmine the number of days in february", function () {
                assert.equal(comb(new Date(2006, 1, 1)).getDaysInMonth(), 28);
                assert.equal(comb(new Date(2004, 1, 1)).getDaysInMonth(), 29);
                assert.equal(comb(new Date(2000, 1, 1)).getDaysInMonth(), 29);
                assert.equal(comb(new Date(1900, 1, 1)).getDaysInMonth(), 28);
                assert.equal(comb(new Date(1800, 1, 1)).getDaysInMonth(), 28);
                assert.equal(comb(new Date(1700, 1, 1)).getDaysInMonth(), 28);
                assert.equal(comb(new Date(1600, 1, 1)).getDaysInMonth(), 29);
            });

            it.should("detrmine the number of days in march", function () {
                assert.equal(comb(new Date(2006, 2, 1)).getDaysInMonth(), 31);
            });

            it.should("detrmine the number of days in april", function () {
                assert.equal(comb(new Date(2006, 3, 1)).getDaysInMonth(), 30);
            });

            it.should("detrmine the number of days in may", function () {
                assert.equal(comb(new Date(2006, 4, 1)).getDaysInMonth(), 31);
            });

            it.should("detrmine the number of days in june", function () {
                assert.equal(comb(new Date(2006, 5, 1)).getDaysInMonth(), 30);
            });

            it.should("detrmine the number of days in july", function () {
                assert.equal(comb(new Date(2006, 6, 1)).getDaysInMonth(), 31);
            });

            it.should("detrmine the number of days in august", function () {
                assert.equal(comb(new Date(2006, 7, 1)).getDaysInMonth(), 31);
            });

            it.should("detrmine the number of days in september", function () {
                assert.equal(comb(new Date(2006, 8, 1)).getDaysInMonth(), 30);
            });

            it.should("detrmine the number of days in october", function () {
                assert.equal(comb(new Date(2006, 9, 1)).getDaysInMonth(), 31);
            });

            it.should("detrmine the number of days in november", function () {
                assert.equal(comb(new Date(2006, 10, 1)).getDaysInMonth(), 30);
            });

            it.should("detrmine the number of days in december", function () {
                assert.equal(comb(new Date(2006, 11, 1)).getDaysInMonth(), 31);
            });
        });
    });

    it.describe("#isLeapYear", function (it) {

        it.describe("namespaced", function (it) {
            it.should("be true", function () {
                assert.isTrue(comb.date.isLeapYear(new Date(1600, 0, 1)));
                assert.isTrue(comb.date.isLeapYear(new Date(2004, 0, 1)));
                assert.isTrue(comb.date.isLeapYear(new Date(2000, 0, 1)));
            });

            it.should("be false", function () {
                assert.isFalse(comb.date.isLeapYear(new Date(2006, 0, 1)));
                assert.isFalse(comb.date.isLeapYear(new Date(1900, 0, 1)));
                assert.isFalse(comb.date.isLeapYear(new Date(1800, 0, 1)));
                assert.isFalse(comb.date.isLeapYear(new Date(1700, 0, 1)));
            });
        });

        it.describe("extension", function (it) {
            it.should("be true", function () {
                assert.isTrue(comb(new Date(1600, 0, 1)).isLeapYear());
                assert.isTrue(comb(new Date(2004, 0, 1)).isLeapYear());
                assert.isTrue(comb(new Date(2000, 0, 1)).isLeapYear());
            });

            it.should("be false", function () {
                assert.isFalse(comb(new Date(2006, 0, 1)).isLeapYear());
                assert.isFalse(comb(new Date(1900, 0, 1)).isLeapYear());
                assert.isFalse(comb(new Date(1800, 0, 1)).isLeapYear());
                assert.isFalse(comb(new Date(1700, 0, 1)).isLeapYear());
            });
        });

    });

    it.describe("#getTimezoneName", function (it) {

        it.describe("namespace", function () {
            it.should("return CDT", function () {
                dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
                dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
                assert.equal(comb.date.getTimezoneName(dt), 'CDT');
                dt.str = 'Sun Sep 17 2006 22:57:18 GMT-0500 (CDT)';
                dt.strLocale = 'Sun Sep 17 22:57:18 2006';
                assert.equal(comb.date.getTimezoneName(dt), 'CDT');
            });
        });

        it.describe("extension", function () {
            it.should("return CDT", function () {
                dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
                dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
                assert.equal(comb(dt).date().getTimezoneName(), 'CDT');
                dt.str = 'Sun Sep 17 2006 22:57:18 GMT-0500 (CDT)';
                dt.strLocale = 'Sun Sep 17 22:57:18 2006';
                assert.equal(comb(dt).date().getTimezoneName(), 'CDT');
            });
        });
    });

    it.describe("#compare", function (it) {


        it.describe("namespaced", function (it) {
            it.should("be 0 ", function () {
                var d1 = new Date();
                d1.setHours(0);
                assert.equal(comb.date.compare(d1, d1), 0);
            });

            it.should("be 1", function () {
                var d1 = new Date();
                d1.setHours(0);
                var d2 = new Date();
                d2.setFullYear(2005);
                d2.setHours(12);
                assert.equal(comb.date.compare(d1, d2, "date"), 1);
                assert.equal(comb.date.compare(d1, d2, "datetime"), 1);
            });

            it.should("be -1 ", function () {
                var d1 = new Date();
                d1.setHours(0);
                var d2 = new Date();
                d2.setFullYear(2005);
                d2.setHours(12);
                assert.equal(comb.date.compare(d2, d1, "date"), -1);
                assert.equal(comb.date.compare(d1, d2, "time"), -1);
            });

        });

        it.describe("extension", function (it) {
            it.should("be 0 ", function () {
                var d1 = new Date();
                d1.setHours(0);
                assert.equal(comb(d1).compare(d1), 0);
            });

            it.should("be 1", function () {
                var d1 = new Date();
                d1.setHours(0);
                var d2 = new Date();
                d2.setFullYear(2005);
                d2.setHours(12);
                assert.equal(comb(d1).compare(d2, "date"), 1);
                assert.equal(comb(d1).compare(d2, "datetime"), 1);
            });

            it.should("be -1 ", function () {
                var d1 = new Date();
                d1.setHours(0);
                var d2 = new Date();
                d2.setFullYear(2005);
                d2.setHours(12);
                assert.equal(comb(d2).compare(d1, "date"), -1);
                assert.equal(comb(d1).compare(d2, "time"), -1);
            });

        });
    });

    it.describe("#add", function (it) {

        it.describe("namespaced", function (it) {

            it.describe("when adding years", function () {

                it.should("add 1 year", function () {
                    var dtA = new Date(2005, 11, 27);
                    var dtB = new Date(2006, 11, 27);
                    assert.deepEqual(comb.date.add(dtA, "year", 1), dtB);
                    assert.deepEqual(comb.date.add(dtA, "years", 1), dtB);
                });

                it.should("add -1 years", function () {
                    var dtA = new Date(2005, 11, 27);
                    var dtB = new Date(2004, 11, 27);
                    assert.deepEqual(comb.date.add(dtA, "year", -1), dtB);
                    assert.deepEqual(comb.date.add(dtA, "years", -1), dtB);
                });

                it.should("add 5 years", function () {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2005, 1, 28);
                    assert.deepEqual(comb.date.add(dtA, "year", 5), dtB);
                    assert.deepEqual(comb.date.add(dtA, "years", 5), dtB);

                });

                it.should("add 30 years", function () {
                    var dtA = new Date(1900, 11, 31);
                    var dtB = new Date(1930, 11, 31);
                    assert.deepEqual(comb.date.add(dtA, "year", 30), dtB);
                    assert.deepEqual(comb.date.add(dtA, "years", 30), dtB);
                });

                it.should("add 35 years", function () {
                    var dtA = new Date(1995, 11, 31);
                    var dtB = new Date(2030, 11, 31);
                    assert.deepEqual(comb.date.add(dtA, "year", 35), dtB);
                    assert.deepEqual(comb.date.add(dtA, "years", 35), dtB);

                });

            });

            it.describe("when adding quarters to a date", function (it) {


                it.should("add 1 quarter", function () {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 3, 1);
                    assert.deepEqual(comb.date.add(dtA, "quarter", 1), dtB);
                    assert.deepEqual(comb.date.add(dtA, "quarters", 1), dtB);
                });

                it.should("add 3 quarters", function () {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2000, 7, 29);
                    assert.deepEqual(comb.date.add(dtA, "quarter", 2), dtB);
                    assert.deepEqual(comb.date.add(dtA, "quarters", 2), dtB);
                });

                it.should("add 4 quarters", function () {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2001, 1, 28);
                    assert.deepEqual(comb.date.add(dtA, "quarter", 4), dtB);
                    assert.deepEqual(comb.date.add(dtA, "quarters", 4), dtB);

                });
            });

            it.describe("when adding months to a date", function (it) {

                it.should("add 1 month", function () {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 1, 1);
                    assert.deepEqual(comb.date.add(dtA, "month", 1), dtB);
                    assert.deepEqual(comb.date.add(dtA, "months", 1), dtB);
                    dtA = new Date(2000, 0, 31);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(comb.date.add(dtA, "month", 1), dtB);
                    assert.deepEqual(comb.date.add(dtA, "months", 1), dtB);
                });

                it.should("add 4 months", function () {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2001, 1, 28);
                    assert.deepEqual(comb.date.add(dtA, "month", 12), dtB);
                    assert.deepEqual(comb.date.add(dtA, "months", 12), dtB);

                });
            });

            it.describe("when adding weeks to a date", function (it) {


                it.should("add 1 week", function () {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 0, 8);
                    assert.deepEqual(comb.date.add(dtA, "week", 1), dtB);
                    assert.deepEqual(comb.date.add(dtA, "weeks", 1), dtB);
                });
            });


            it.describe("when adding days to a date", function (it) {


                it.should("add days", function () {
                    var interv = "day";
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 0, 2);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2001, 0, 1);
                    dtB = new Date(2002, 0, 1);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 365));

                    dtA = new Date(2000, 0, 1);
                    dtB = new Date(2001, 0, 1);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 366));

                    dtA = new Date(2000, 1, 28);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2001, 1, 28);
                    dtB = new Date(2001, 2, 1);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2000, 2, 1);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -1));

                    dtA = new Date(2001, 2, 1);
                    dtB = new Date(2001, 1, 28);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -1));

                    dtA = new Date(2000, 0, 1);
                    dtB = new Date(1999, 11, 31);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -1));
                });
            });

            it.describe("when adding weekdays to a date", function (it) {

                it.should("add weekdays", function () {
                    var interv = "weekday";
                    // Sat, Jan 1
                    var dtA = new Date(2000, 0, 1);
                    // Should be Mon, Jan 3
                    var dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Mon, Jan 3
                    dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Fri, Jan 7
                    dtB = new Date(2000, 0, 7);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 5));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Mon, Jan 10
                    dtB = new Date(2000, 0, 10);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 6));

                    // Mon, Jan 3
                    dtA = new Date(2000, 0, 3);
                    // Should be Mon, Jan 17
                    dtB = new Date(2000, 0, 17);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 10));

                    dtA = new Date(2013, 11, 19, 0, 0, 0); //Thu Dec 19
                    //Should be Tue Dec 24
                    dtB = new Date(2013, 11, 24, 0, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 3));

                    dtA = new Date(2013, 11, 20, 0, 0, 0); //Fri Dec 20
                    //Should be Mon Dec 23
                    dtB = new Date(2013, 11, 24, 0, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 2));

                    dtA = new Date(2013, 11, 17, 0, 0, 0); //Tue Dec 19
                    //Should be Thu Dec 12
                    dtB = new Date(2013, 11, 12, 0, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -3));

                    dtA = new Date(2013, 11, 17, 0, 0, 0); //Tue Dec 17
                    //Should be Fri Dec 13
                    dtB = new Date(2013, 11, 13, 0, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -2));

                    dtA = new Date(2013, 11, 16, 0, 0, 0); //Mon Dec 16
                    //Should be Thu Dec 12
                    dtB = new Date(2013, 11, 12, 0, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -2));

                    dtA = new Date(2013, 11, 16, 0, 0, 0); //Mon Dec 16
                    //Should be Thu Dec 12
                    dtB = new Date(2013, 11, 13, 0, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -1));

                    // Sat, Jan 8
                    dtA = new Date(2000, 0, 8);
                    // Should be Mon, Jan 3
                    dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -5));

                    // Sun, Jan 9
                    dtA = new Date(2000, 0, 9);
                    // Should be Wed, Jan 5
                    dtB = new Date(2000, 0, 5);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -3));

                    // Sun, Jan 23
                    dtA = new Date(2000, 0, 23);
                    // Should be Fri, Jan 7
                    dtB = new Date(2000, 0, 7);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, -11));
                });
            });

            it.describe("when adding hours to a date", function (it) {

                it.should("add hours", function () {
                    var interv = "hour";
                    var dtA = new Date(2000, 0, 1, 11);
                    var dtB = new Date(2000, 0, 1, 12);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2001, 9, 28, 0);
                    dtB = new Date(dtA.getTime() + (60 * 60 * 1000));
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2001, 9, 28, 23);
                    dtB = new Date(2001, 9, 29, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2001, 11, 31, 23);
                    dtB = new Date(2002, 0, 1, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                });
            });

            it.describe("when adding minutes to a date", function (it) {


                it.should("add minutes", function () {
                    var interv = "minute";
                    var dtA = new Date(2000, 11, 31, 23, 59);
                    var dtB = new Date(2001, 0, 1, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2000, 11, 27, 12, 2);
                    dtB = new Date(2000, 11, 27, 13, 2);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 60));

                });
            });

            it.describe("when adding seconds to a date", function (it) {


                it.should("add seconds", function () {
                    var interv = "second";
                    var dtA = new Date(2000, 11, 31, 23, 59, 59);
                    var dtB = new Date(2001, 0, 1, 0, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2000, 11, 27, 8, 10, 59);
                    dtB = new Date(2000, 11, 27, 8, 11, 59);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 60));

                });
            });

            it.describe("when adding milliseconds to a date", function (it) {


                it.should("add milliseconds", function () {
                    var interv = "millisecond";

                    var dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                    var dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1));

                    dtA = new Date(2000, 11, 27, 8, 10, 53, 2);
                    dtB = new Date(2000, 11, 27, 8, 10, 54, 2);
                    assert.deepEqual(dtB, comb.date.add(dtA, interv, 1000));

                });
            });

        });

        it.describe("extension", function (it) {

            it.describe("when adding years", function () {

                it.should("add 1 year", function () {
                    var dtA = new Date(2005, 11, 27);
                    var dtB = new Date(2006, 11, 27);
                    assert.deepEqual(comb(dtA).add("year", 1), dtB);
                    assert.deepEqual(comb(dtA).add("years", 1), dtB);
                });

                it.should("add -1 years", function () {
                    var dtA = new Date(2005, 11, 27);
                    var dtB = new Date(2004, 11, 27);
                    assert.deepEqual(comb(dtA).add("year", -1), dtB);
                    assert.deepEqual(comb(dtA).add("years", -1), dtB);
                });

                it.should("add 5 years", function () {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2005, 1, 28);
                    assert.deepEqual(comb(dtA).add("year", 5), dtB);
                    assert.deepEqual(comb(dtA).add("years", 5), dtB);

                });

                it.should("add 30 years", function () {
                    var dtA = new Date(1900, 11, 31);
                    var dtB = new Date(1930, 11, 31);
                    assert.deepEqual(comb(dtA).add("year", 30), dtB);
                    assert.deepEqual(comb(dtA).add("years", 30), dtB);
                });

                it.should("add 35 years", function () {
                    var dtA = new Date(1995, 11, 31);
                    var dtB = new Date(2030, 11, 31);
                    assert.deepEqual(comb(dtA).add("year", 35), dtB);
                    assert.deepEqual(comb(dtA).add("years", 35), dtB);

                });

            });

            it.describe("when adding quarters to a date", function (it) {


                it.should("add 1 quarter", function () {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 3, 1);
                    assert.deepEqual(comb(dtA).add("quarter", 1), dtB);
                    assert.deepEqual(comb(dtA).add("quarters", 1), dtB);
                });

                it.should("add 3 quarters", function () {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2000, 7, 29);
                    assert.deepEqual(comb(dtA).add("quarter", 2), dtB);
                    assert.deepEqual(comb(dtA).add("quarters", 2), dtB);
                });

                it.should("add 4 quarters", function () {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2001, 1, 28);
                    assert.deepEqual(comb(dtA).add("quarter", 4), dtB);
                    assert.deepEqual(comb(dtA).add("quarters", 4), dtB);

                });
            });

            it.describe("when adding months to a date", function (it) {

                it.should("add 1 month", function () {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 1, 1);
                    assert.deepEqual(comb(dtA).add("month", 1), dtB);
                    assert.deepEqual(comb(dtA).add("months", 1), dtB);
                    dtA = new Date(2000, 0, 31);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(comb(dtA).add("month", 1), dtB);
                    assert.deepEqual(comb(dtA).add("months", 1), dtB);
                });

                it.should("add 4 months", function () {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2001, 1, 28);
                    assert.deepEqual(comb(dtA).add("month", 12), dtB);
                    assert.deepEqual(comb(dtA).add("months", 12), dtB);

                });
            });

            it.describe("when adding weeks to a date", function (it) {


                it.should("add 1 week", function () {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 0, 8);
                    assert.deepEqual(comb(dtA).add("week", 1), dtB);
                    assert.deepEqual(comb(dtA).add("weeks", 1), dtB);
                });
            });


            it.describe("when adding days to a date", function (it) {


                it.should("add days", function () {
                    var interv = "day";
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 0, 2);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    dtA = new Date(2001, 0, 1);
                    dtB = new Date(2002, 0, 1);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 365));

                    dtA = new Date(2000, 0, 1);
                    dtB = new Date(2001, 0, 1);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 366));

                    dtA = new Date(2000, 1, 28);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    dtA = new Date(2001, 1, 28);
                    dtB = new Date(2001, 2, 1);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    dtA = new Date(2000, 2, 1);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(dtB, comb(dtA).add(interv, -1));

                    dtA = new Date(2001, 2, 1);
                    dtB = new Date(2001, 1, 28);
                    assert.deepEqual(dtB, comb(dtA).add(interv, -1));

                    dtA = new Date(2000, 0, 1);
                    dtB = new Date(1999, 11, 31);
                    assert.deepEqual(dtB, comb(dtA).add(interv, -1));
                });
            });

            it.describe("when adding weekdays to a date", function (it) {

                it.should("add weekdays", function () {
                    var interv = "weekday";
                    // Sat, Jan 1
                    var dtA = new Date(2000, 0, 1);
                    // Should be Mon, Jan 3
                    var dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Mon, Jan 3
                    dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Fri, Jan 7
                    dtB = new Date(2000, 0, 7);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 5));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Mon, Jan 10
                    dtB = new Date(2000, 0, 10);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 6));

                    // Mon, Jan 3
                    dtA = new Date(2000, 0, 3);
                    // Should be Mon, Jan 17
                    dtB = new Date(2000, 0, 17);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 10));

                    // Sat, Jan 8
                    dtA = new Date(2000, 0, 8);
                    // Should be Mon, Jan 3
                    dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, comb(dtA).add(interv, -5));

                    // Sun, Jan 9
                    dtA = new Date(2000, 0, 9);
                    // Should be Wed, Jan 5
                    dtB = new Date(2000, 0, 5);
                    assert.deepEqual(dtB, comb(dtA).add(interv, -3));

                    // Sun, Jan 23
                    dtA = new Date(2000, 0, 23);
                    // Should be Fri, Jan 7
                    dtB = new Date(2000, 0, 7);
                    assert.deepEqual(dtB, comb(dtA).add(interv, -11));
                });
            });

            it.describe("when adding hours to a date", function (it) {

                it.should("add hours", function () {
                    var interv = "hour";
                    var dtA = new Date(2000, 0, 1, 11);
                    var dtB = new Date(2000, 0, 1, 12);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    dtA = new Date(2001, 9, 28, 0);
                    dtB = new Date(dtA.getTime() + (60 * 60 * 1000));
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    dtA = new Date(2001, 9, 28, 23);
                    dtB = new Date(2001, 9, 29, 0);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    dtA = new Date(2001, 11, 31, 23);
                    dtB = new Date(2002, 0, 1, 0);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                });
            });

            it.describe("when adding minutes to a date", function (it) {


                it.should("add minutes", function () {
                    var interv = "minute";
                    var dtA = new Date(2000, 11, 31, 23, 59);
                    var dtB = new Date(2001, 0, 1, 0, 0);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    dtA = new Date(2000, 11, 27, 12, 2);
                    dtB = new Date(2000, 11, 27, 13, 2);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 60));

                });
            });

            it.describe("when adding seconds to a date", function (it) {


                it.should("add seconds", function () {
                    var interv = "second";
                    var dtA = new Date(2000, 11, 31, 23, 59, 59);
                    var dtB = new Date(2001, 0, 1, 0, 0, 0);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 1));

                    dtA = new Date(2000, 11, 27, 8, 10, 59);
                    dtB = new Date(2000, 11, 27, 8, 11, 59);
                    assert.deepEqual(dtB, comb(dtA).add(interv, 60));

                });
            });

            it.describe("when adding milliseconds to a date", function (it) {


                it.should("add milliseconds", function () {
                    var interv = "millisecond";

                    var dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                    var dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                    assert.deepEqual(comb(dtA).add(interv, 1), dtB);

                    dtA = new Date(2000, 11, 27, 8, 10, 53, 2);
                    dtB = new Date(2000, 11, 27, 8, 10, 54, 2);
                    assert.deepEqual(comb(dtA).add(interv, 1000), dtB);

                });
            });

        });
    });

    it.describe("when finding the difference", function (it) {

        it.describe("namespaced", function (it) {
            it.should("find the difference", function () {
                var dtA = null; // First date to compare
                var dtB = null; // Second date to compare
                var interv = ''; // Interval to compare on (e.g., year, month)

                interv = "year";
                dtA = new Date(2005, 11, 27);
                dtB = new Date(2006, 11, 27);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 11, 31);
                dtB = new Date(2001, 0, 1);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                interv = "quarter";
                dtA = new Date(2000, 1, 29);
                dtB = new Date(2001, 2, 1);
                assert.deepEqual(4, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 11, 1);
                dtB = new Date(2001, 0, 1);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                interv = "month";
                dtA = new Date(2000, 1, 29);
                dtB = new Date(2001, 2, 1);
                assert.deepEqual(13, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 11, 1);
                dtB = new Date(2001, 0, 1);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                interv = "week";
                dtA = new Date(2000, 1, 1);
                dtB = new Date(2000, 1, 8);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 1, 28);
                dtB = new Date(2000, 2, 6);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 2, 6);
                dtB = new Date(2000, 1, 28);
                assert.deepEqual(-1, comb.date.difference(dtA, dtB, interv));

                interv = "day";
                dtA = new Date(2000, 1, 29);
                dtB = new Date(2000, 2, 1);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 11, 31);
                dtB = new Date(2001, 0, 1);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                // DST leap -- check for rounding err
                // This is dependent on US calendar, but
                // shouldn't break in other locales
                dtA = new Date(2005, 3, 3);
                dtB = new Date(2005, 3, 4);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                interv = "weekday";
                dtA = new Date(2006, 7, 3);
                dtB = new Date(2006, 7, 11);
                assert.deepEqual(6, comb.date.difference(dtA, dtB, interv));

                // Positive diffs
                dtA = new Date(2006, 7, 4);
                dtB = new Date(2006, 7, 11);
                assert.deepEqual(5, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 5);
                dtB = new Date(2006, 7, 11);
                assert.deepEqual(5, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 6);
                dtB = new Date(2006, 7, 11);
                assert.deepEqual(5, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 11);
                assert.deepEqual(4, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 13);
                assert.deepEqual(4, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 14);
                assert.deepEqual(5, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 15);
                assert.deepEqual(6, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 28);
                assert.deepEqual(15, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 2, 2);
                dtB = new Date(2006, 2, 28);
                assert.deepEqual(18, comb.date.difference(dtA, dtB, interv));

                // Negative diffs
                dtA = new Date(2006, 7, 11);
                dtB = new Date(2006, 7, 4);
                assert.deepEqual(-5, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 11);
                dtB = new Date(2006, 7, 5);
                assert.deepEqual(-4, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 11);
                dtB = new Date(2006, 7, 6);
                assert.deepEqual(-4, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 11);
                dtB = new Date(2006, 7, 7);
                assert.deepEqual(-4, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 13);
                dtB = new Date(2006, 7, 7);
                assert.deepEqual(-5, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 14);
                dtB = new Date(2006, 7, 7);
                assert.deepEqual(-5, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 15);
                dtB = new Date(2006, 7, 7);
                assert.deepEqual(-6, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 7, 28);
                dtB = new Date(2006, 7, 7);
                assert.deepEqual(-15, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2006, 2, 28);
                dtB = new Date(2006, 2, 2);
                assert.deepEqual(-18, comb.date.difference(dtA, dtB, interv));

                // Two days on the same weekend -- no weekday diff
                dtA = new Date(2006, 7, 5);
                dtB = new Date(2006, 7, 6);
                assert.deepEqual(0, comb.date.difference(dtA, dtB, interv));

                interv = "hour";
                dtA = new Date(2000, 11, 31, 23);
                dtB = new Date(2001, 0, 1, 0);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 11, 31, 12);
                dtB = new Date(2001, 0, 1, 0);
                assert.deepEqual(12, comb.date.difference(dtA, dtB, interv));

                interv = "minute";
                dtA = new Date(2000, 11, 31, 23, 59);
                dtB = new Date(2001, 0, 1, 0, 0);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 1, 28, 23, 59);
                dtB = new Date(2000, 1, 29, 0, 0);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                interv = "second";
                dtA = new Date(2000, 11, 31, 23, 59, 59);
                dtB = new Date(2001, 0, 1, 0, 0, 0);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                interv = "millisecond";
                dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                assert.deepEqual(1, comb.date.difference(dtA, dtB, interv));

                dtA = new Date(2000, 11, 31, 23, 59, 59, 0);
                dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                assert.deepEqual(1000, comb.date.difference(dtA, dtB, interv));
            });
        });
        it.describe("extension", function (it) {
            it.should("find the difference", function () {
                var dtA = null; // First date to compare
                var dtB = null; // Second date to compare
                var interv = ''; // Interval to compare on (e.g., year, month)

                interv = "year";
                dtA = new Date(2005, 11, 27);
                dtB = new Date(2006, 11, 27);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 11, 31);
                dtB = new Date(2001, 0, 1);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                interv = "quarter";
                dtA = new Date(2000, 1, 29);
                dtB = new Date(2001, 2, 1);
                assert.equal(4, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 11, 1);
                dtB = new Date(2001, 0, 1);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                interv = "month";
                dtA = new Date(2000, 1, 29);
                dtB = new Date(2001, 2, 1);
                assert.equal(13, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 11, 1);
                dtB = new Date(2001, 0, 1);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                interv = "week";
                dtA = new Date(2000, 1, 1);
                dtB = new Date(2000, 1, 8);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 1, 28);
                dtB = new Date(2000, 2, 6);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 2, 6);
                dtB = new Date(2000, 1, 28);
                assert.equal(-1, comb(dtA).difference(dtB, interv));

                interv = "day";
                dtA = new Date(2000, 1, 29);
                dtB = new Date(2000, 2, 1);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 11, 31);
                dtB = new Date(2001, 0, 1);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                // DST leap -- check for rounding err
                // This is dependent on US calendar, but
                // shouldn't break in other locales
                dtA = new Date(2005, 3, 3);
                dtB = new Date(2005, 3, 4);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                interv = "weekday";
                dtA = new Date(2006, 7, 3);
                dtB = new Date(2006, 7, 11);
                assert.equal(6, comb(dtA).difference(dtB, interv));

                // Positive diffs
                dtA = new Date(2006, 7, 4);
                dtB = new Date(2006, 7, 11);
                assert.equal(5, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 5);
                dtB = new Date(2006, 7, 11);
                assert.equal(5, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 6);
                dtB = new Date(2006, 7, 11);
                assert.equal(5, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 11);
                assert.equal(4, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 13);
                assert.equal(4, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 14);
                assert.equal(5, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 15);
                assert.equal(6, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 7);
                dtB = new Date(2006, 7, 28);
                assert.equal(15, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 2, 2);
                dtB = new Date(2006, 2, 28);
                assert.equal(18, comb(dtA).difference(dtB, interv));

                // Negative diffs
                dtA = new Date(2006, 7, 11);
                dtB = new Date(2006, 7, 4);
                assert.equal(-5, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 11);
                dtB = new Date(2006, 7, 5);
                assert.equal(-4, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 11);
                dtB = new Date(2006, 7, 6);
                assert.equal(-4, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 11);
                dtB = new Date(2006, 7, 7);
                assert.equal(-4, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 13);
                dtB = new Date(2006, 7, 7);
                assert.equal(-5, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 14);
                dtB = new Date(2006, 7, 7);
                assert.equal(-5, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 15);
                dtB = new Date(2006, 7, 7);
                assert.equal(-6, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 7, 28);
                dtB = new Date(2006, 7, 7);
                assert.equal(-15, comb(dtA).difference(dtB, interv));

                dtA = new Date(2006, 2, 28);
                dtB = new Date(2006, 2, 2);
                assert.equal(-18, comb(dtA).difference(dtB, interv));

                // Two days on the same weekend -- no weekday diff
                dtA = new Date(2006, 7, 5);
                dtB = new Date(2006, 7, 6);
                assert.equal(0, comb(dtA).difference(dtB, interv));

                interv = "hour";
                dtA = new Date(2000, 11, 31, 23);
                dtB = new Date(2001, 0, 1, 0);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 11, 31, 12);
                dtB = new Date(2001, 0, 1, 0);
                assert.equal(12, comb(dtA).difference(dtB, interv));

                interv = "minute";
                dtA = new Date(2000, 11, 31, 23, 59);
                dtB = new Date(2001, 0, 1, 0, 0);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 1, 28, 23, 59);
                dtB = new Date(2000, 1, 29, 0, 0);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                interv = "second";
                dtA = new Date(2000, 11, 31, 23, 59, 59);
                dtB = new Date(2001, 0, 1, 0, 0, 0);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                interv = "millisecond";
                dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                assert.equal(1, comb(dtA).difference(dtB, interv));

                dtA = new Date(2000, 11, 31, 23, 59, 59, 0);
                dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                assert.equal(1000, comb(dtA).difference(dtB, interv));
            });
        });
    });

    it.describe("when finding the diff/add", function (it) {


        it.describe("find the diff/add", function (it) {
            it.should("namespaced", function () {
                var dtA = null; // First date to compare
                var dtB = null; // Second date to compare
                var interv = ''; // Interval to compare on (e.g., year, month)
                interv = "year";
                dtA = new Date(2005, 11, 27);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2005, 11, 27);
                dtB = comb.date.add(dtA, interv, -1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), -1);

                dtA = new Date(2000, 1, 29);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2000, 1, 29);
                dtB = comb.date.add(dtA, interv, 5);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 5);

                dtA = new Date(1900, 11, 31);
                dtB = comb.date.add(dtA, interv, 30);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 30);

                dtA = new Date(1995, 11, 31);
                dtB = comb.date.add(dtA, interv, 35);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 35);

                interv = "quarter";
                dtA = new Date(2000, 0, 1);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2000, 1, 29);
                dtB = comb.date.add(dtA, interv, 2);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 2);

                dtA = new Date(2000, 1, 29);
                dtB = comb.date.add(dtA, interv, 4);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 4);

                interv = "month";
                dtA = new Date(2000, 0, 1);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2000, 0, 31);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2000, 1, 29);
                dtB = comb.date.add(dtA, interv, 12);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 12);

                interv = "week";
                dtA = new Date(2000, 0, 1);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                interv = "day";
                dtA = new Date(2000, 0, 1);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2001, 0, 1);
                dtB = comb.date.add(dtA, interv, 365);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 365);

                dtA = new Date(2000, 0, 1);
                dtB = comb.date.add(dtA, interv, 366);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 366);

                dtA = new Date(2000, 1, 28);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2001, 1, 28);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2000, 2, 1);
                dtB = comb.date.add(dtA, interv, -1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), -1);

                dtA = new Date(2001, 2, 1);
                dtB = comb.date.add(dtA, interv, -1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), -1);

                dtA = new Date(2000, 0, 1);
                dtB = comb.date.add(dtA, interv, -1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), -1);
                interv = "weekday";
                // Sat, Jan 1
                dtA = new Date(2000, 0, 1);
                // Should be Mon, Jan 3
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                // Sun, Jan 2
                dtA = new Date(2000, 0, 2);
                // Should be Mon, Jan 3
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                // Sun, Jan 2
                dtA = new Date(2000, 0, 2);
                // Should be Fri, Jan 7
                dtB = comb.date.add(dtA, interv, 5);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 5);

                // Sun, Jan 2
                dtA = new Date(2000, 0, 2);
                // Should be Mon, Jan 10
                dtB = comb.date.add(dtA, interv, 6);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 6);

                // Mon, Jan 3
                dtA = new Date(2000, 0, 3);
                // Should be Mon, Jan 17
                dtB = comb.date.add(dtA, interv, 10);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 10);

                // Sat, Jan 8
                dtA = new Date(2000, 0, 8);
                // Should be Mon, Jan 3
                dtB = comb.date.add(dtA, interv, -5);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), -5);

                // Sun, Jan 9
                dtA = new Date(2000, 0, 9);
                // Should be Wed, Jan 5
                dtB = comb.date.add(dtA, interv, -3);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), -3);

                // Sun, Jan 23
                dtA = new Date(2000, 0, 23);
                // Should be Fri, Jan 7
                dtB = comb.date.add(dtA, interv, -11);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), -11);

                interv = "hour";
                dtA = new Date(2000, 0, 1, 11);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2001, 9, 28, 0);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2001, 9, 28, 23);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2001, 11, 31, 23);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                interv = "minute";
                dtA = new Date(2000, 11, 31, 23, 59);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2000, 11, 27, 12, 2);
                dtB = comb.date.add(dtA, interv, 60);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 60);

                interv = "second";
                dtA = new Date(2000, 11, 31, 23, 59, 59);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2000, 11, 27, 8, 10, 59);
                dtB = comb.date.add(dtA, interv, 60);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 60);

                interv = "millisecond";

                dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                dtB = comb.date.add(dtA, interv, 1);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1);

                dtA = new Date(2000, 11, 27, 8, 10, 53, 2);
                dtB = comb.date.add(dtA, interv, 1000);
                assert.deepEqual(comb.date.difference(dtA, dtB, interv), 1000);
            });
            it.should("extension", function () {
                var dtA = null; // First date to compare
                var dtB = null; // Second date to compare
                var interv = ''; // Interval to compare on (e.g., year, month)
                interv = "year";
                dtA = new Date(2005, 11, 27);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2005, 11, 27);
                dtB = comb(dtA).add(interv, -1);
                assert.equal(comb(dtA).difference(dtB, interv), -1);

                dtA = new Date(2000, 1, 29);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2000, 1, 29);
                dtB = comb(dtA).add(interv, 5);
                assert.equal(comb(dtA).difference(dtB, interv), 5);

                dtA = new Date(1900, 11, 31);
                dtB = comb(dtA).add(interv, 30);
                assert.equal(comb(dtA).difference(dtB, interv), 30);

                dtA = new Date(1995, 11, 31);
                dtB = comb(dtA).add(interv, 35);
                assert.equal(comb(dtA).difference(dtB, interv), 35);

                interv = "quarter";
                dtA = new Date(2000, 0, 1);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2000, 1, 29);
                dtB = comb(dtA).add(interv, 2);
                assert.equal(comb(dtA).difference(dtB, interv), 2);

                dtA = new Date(2000, 1, 29);
                dtB = comb(dtA).add(interv, 4);
                assert.equal(comb(dtA).difference(dtB, interv), 4);

                interv = "month";
                dtA = new Date(2000, 0, 1);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2000, 0, 31);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2000, 1, 29);
                dtB = comb(dtA).add(interv, 12);
                assert.equal(comb(dtA).difference(dtB, interv), 12);

                interv = "week";
                dtA = new Date(2000, 0, 1);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                interv = "day";
                dtA = new Date(2000, 0, 1);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2001, 0, 1);
                dtB = comb(dtA).add(interv, 365);
                assert.equal(comb(dtA).difference(dtB, interv), 365);

                dtA = new Date(2000, 0, 1);
                dtB = comb(dtA).add(interv, 366);
                assert.equal(comb(dtA).difference(dtB, interv), 366);

                dtA = new Date(2000, 1, 28);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2001, 1, 28);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2000, 2, 1);
                dtB = comb(dtA).add(interv, -1);
                assert.equal(comb(dtA).difference(dtB, interv), -1);

                dtA = new Date(2001, 2, 1);
                dtB = comb(dtA).add(interv, -1);
                assert.equal(comb(dtA).difference(dtB, interv), -1);

                dtA = new Date(2000, 0, 1);
                dtB = comb(dtA).add(interv, -1);
                assert.equal(comb(dtA).difference(dtB, interv), -1);
                interv = "weekday";
                // Sat, Jan 1
                dtA = new Date(2000, 0, 1);
                // Should be Mon, Jan 3
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                // Sun, Jan 2
                dtA = new Date(2000, 0, 2);
                // Should be Mon, Jan 3
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                // Sun, Jan 2
                dtA = new Date(2000, 0, 2);
                // Should be Fri, Jan 7
                dtB = comb(dtA).add(interv, 5);
                assert.equal(comb(dtA).difference(dtB, interv), 5);

                // Sun, Jan 2
                dtA = new Date(2000, 0, 2);
                // Should be Mon, Jan 10
                dtB = comb(dtA).add(interv, 6);
                assert.equal(comb(dtA).difference(dtB, interv), 6);

                // Mon, Jan 3
                dtA = new Date(2000, 0, 3);
                // Should be Mon, Jan 17
                dtB = comb(dtA).add(interv, 10);
                assert.equal(comb(dtA).difference(dtB, interv), 10);

                // Sat, Jan 8
                dtA = new Date(2000, 0, 8);
                // Should be Mon, Jan 3
                dtB = comb(dtA).add(interv, -5);
                assert.equal(comb(dtA).difference(dtB, interv), -5);

                // Sun, Jan 9
                dtA = new Date(2000, 0, 9);
                // Should be Wed, Jan 5
                dtB = comb(dtA).add(interv, -3);
                assert.equal(comb(dtA).difference(dtB, interv), -3);

                // Sun, Jan 23
                dtA = new Date(2000, 0, 23);
                // Should be Fri, Jan 7
                dtB = comb(dtA).add(interv, -11);
                assert.equal(comb(dtA).difference(dtB, interv), -11);

                interv = "hour";
                dtA = new Date(2000, 0, 1, 11);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2001, 9, 28, 0);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2001, 9, 28, 23);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2001, 11, 31, 23);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                interv = "minute";
                dtA = new Date(2000, 11, 31, 23, 59);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2000, 11, 27, 12, 2);
                dtB = comb(dtA).add(interv, 60);
                assert.equal(comb(dtA).difference(dtB, interv), 60);

                interv = "second";
                dtA = new Date(2000, 11, 31, 23, 59, 59);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2000, 11, 27, 8, 10, 59);
                dtB = comb(dtA).add(interv, 60);
                assert.equal(comb(dtA).difference(dtB, interv), 60);

                interv = "millisecond";

                dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                dtB = comb(dtA).add(interv, 1);
                assert.equal(comb(dtA).difference(dtB, interv), 1);

                dtA = new Date(2000, 11, 27, 8, 10, 53, 2);
                dtB = comb(dtA).add(interv, 1000);
                assert.equal(comb(dtA).difference(dtB, interv), 1000);
            });
        });


    });

    it.describe("when using convenice methods *fromNow *ago", function (it) {

        it.should("add/subtract", function () {
            assert.deepEqual(comb.yearsFromNow(2).getFullYear(), comb.date.add(new Date(), "year", 2).getFullYear());
            assert.deepEqual(comb(comb.yearsAgo(2)).getFullYear(), comb.date.add(new Date(), "year", -2).getFullYear());


            assert.deepEqual(comb.monthsFromNow(2).getMonth(), comb.date.add(new Date(), "month", 2).getMonth());
            assert.deepEqual(comb.monthsAgo(2).getMonth(), comb.date.add(new Date(), "month", -2).getMonth());


            assert.deepEqual(comb.daysFromNow(2).getDate(), comb.date.add(new Date(), "day", 2).getDate());
            assert.deepEqual(comb.daysAgo(2).getDate(), comb.date.add(new Date(), "day", -2).getDate());

            assert.deepEqual(comb.hoursFromNow(2).getHours(), comb.date.add(new Date(), "hour", 2).getHours());
            assert.deepEqual(comb.hoursAgo(2).getHours(), comb.date.add(new Date(), "hour", -2).getHours());

            assert.deepEqual(comb.minutesFromNow(2).getMinutes(), comb.date.add(new Date(), "minute", 2).getMinutes());
            assert.deepEqual(comb.minutesAgo(2).getMinutes(), comb.date.add(new Date(), "minute", -2).getMinutes());

            assert.deepEqual(comb.secondsFromNow(2).getSeconds(), comb.date.add(new Date(), "second", 2).getSeconds());
            assert.deepEqual(comb.secondsAgo(2).getSeconds(), comb.date.add(new Date(), "second", -2).getSeconds());
        });
    });
}).as(module);