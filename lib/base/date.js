var string = require("./string").string;

/**
 * @ignore
 * Based on DOJO Date Implementation
 *
 * Dojo is available under *either* the terms of the modified BSD license *or* the
 * Academic Free License version 2.1. As a recipient of Dojo, you may choose which
 * license to receive this code under (except as noted in per-module LICENSE
 * files). Some modules may not be the copyright of the Dojo Foundation. These
 * modules contain explicit declarations of copyright in both the LICENSE files in
 * the directories in which they reside and in the code itself. No external
 * contributions are allowed under licenses which are fundamentally incompatible
 * with the AFL or BSD licenses that Dojo is distributed under.
 *
 */

var floor = Math.floor, round = Math.round, min = Math.min, pow = Math.pow, ceil = Math.ceil, abs = Math.abs;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthAbbr = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
var monthLetter = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var dayAbbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dayLetter = ["S", "M", "T", "W", "T", "F", "S"];
var eraNames = ["Before Christ", "Anno Domini"];
var eraAbbr = ["BC", "AD"];
var eraLetter = ["B", "A"];


var comb = exports, date;
/**
 * Determines if obj is a Date
 *
 * @param {Anything} obj the thing to test if it is a Date
 * @memberOf comb
 * @returns {Boolean} true if it is a Date false otherwise
 */
comb.isDate = function(obj) {
    var undef;
    return (obj !== undef && typeof obj === "object" && obj instanceof Date);
};

function getDayOfYear(/*Date*/dateObject, utc) {
    // summary: gets the day of the year as represented by dateObject
    return date.difference(new Date(dateObject.getFullYear(), 0, 1, dateObject.getHours()), dateObject, null, utc) + 1; // Number
}

function getWeekOfYear(/*Date*/dateObject, /*Number*/firstDayOfWeek, utc) {
    firstDayOfWeek = firstDayOfWeek || 0;
    var fullYear = dateObject[utc ? "getUTCFullYear" : "getFullYear"]();
    var firstDayOfYear = new Date(fullYear, 0, 1).getDay(),
            adj = (firstDayOfYear - firstDayOfWeek + 7) % 7,
            week = floor((getDayOfYear(dateObject) + adj - 1) / 7);

    // if year starts on the specified day, start counting weeks at 1
    if (firstDayOfYear == firstDayOfWeek) {
        week++;
    }

    return week; // Number
}

function buildDateEXP(pattern, tokens) {
    return pattern.replace(/([a-z])\1*/ig,
            function(match) {
                // Build a simple regexp.  Avoid captures, which would ruin the tokens list
                var s,
                        c = match.charAt(0),
                        l = match.length,
                        p2 = '', p3 = '';
                p2 = '0?';
                p3 = '0{0,2}';
                switch (c) {
                    case 'y':
                        s = '\\d{2,4}';
                        break;
                    case 'M':
                        s = (l > 2) ? '\\S+?' : p2 + '[1-9]|1[0-2]';
                        break;
                    case 'D':
                        s = p2 + '[1-9]|' + p3 + '[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]';
                        break;
                    case 'd':
                        s = '[12]\\d|' + p2 + '[1-9]|3[01]';
                        break;
                    case 'w':
                        s = p2 + '[1-9]|[1-4][0-9]|5[0-3]';
                        break;
                    case 'E':
                        s = '\\S+';
                        break;
                    case 'h': //hour (1-12)
                        s = p2 + '[1-9]|1[0-2]';
                        break;
                    case 'K': //hour (1-24)
                        s = p2 + '\\d|1[01]';
                        break;
                    case 'H': //hour (0-23)
                        s = p2 + '\\d|1\\d|2[0-3]';
                        break;
                    case 'k': //hour (1-24)
                        s = p2 + '[1-9]|1\\d|2[0-4]';
                        break;
                    case 'm':
                    case 's':
                        s = '[0-5]\\d';
                        break;
                    case 'S':
                        s = '\\d{' + l + '}';
                        break;
                    case 'a':
                        var am = 'AM', pm = 'PM';

                        s = am + '|' + pm;
                        if (am != am.toLowerCase()) {
                            s += '|' + am.toLowerCase();
                        }
                        if (pm != pm.toLowerCase()) {
                            s += '|' + pm.toLowerCase();
                        }
                        s = s.replace(/\./g, "\\.");
                        break;
                    default:
                        // case 'v':
                        // case 'z':
                        // case 'Z':
                        s = ".*";
//				console.log("parse of date format, pattern=" + pattern);
                }

                if (tokens) {
                    tokens.push(match);
                }

                return "(" + s + ")"; // add capture
            }).replace(/[\xa0 ]/g, "[\\s\\xa0]"); // normalize whitespace.  Need explicit handling of \xa0 for IE.
}


/**
 * @namespace Utilities for Dates
 */
comb.date = {

    /**
     * Returns the number of days in the month of a date
     *
     * @example
     *
     *  comb.date.getDaysInMonth(new Date(2006, 1, 1)) => 28
     *  comb.date.getDaysInMonth(new Date(2004, 1, 1)) => 29
     *  comb.date.getDaysInMonth(new Date(2006, 2, 1)) => 31
     *  comb.date.getDaysInMonth(new Date(2006, 3, 1)) => 30
     *  comb.date.getDaysInMonth(new Date(2006, 4, 1)) => 31
     *  comb.date.getDaysInMonth(new Date(2006, 5, 1)) => 30
     *  comb.date.getDaysInMonth(new Date(2006, 6, 1)) => 31
     * @param {Date} dateObject the date containing the month
     * @return {Number} the number of days in the month
     */
    getDaysInMonth : function(/*Date*/dateObject) {
        //	summary:
        //		Returns the number of days in the month used by dateObject
        var month = dateObject.getMonth();
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 1 && date.isLeapYear(dateObject)) {
            return 29;
        } // Number
        return days[month]; // Number
    },

    /**
     * Determines if a date is a leap year
     *
     * @example
     *
     *  comb.date.isLeapYear(new Date(1600, 0, 1)) => true
     *  comb.date.isLeapYear(new Date(2004, 0, 1)) => true
     *  comb.date.isLeapYear(new Date(2000, 0, 1)) => true
     *  comb.date.isLeapYear(new Date(2006, 0, 1)) => false
     *  comb.date.isLeapYear(new Date(1900, 0, 1)) => false
     *  comb.date.isLeapYear(new Date(1800, 0, 1)) => false
     *  comb.date.isLeapYear(new Date(1700, 0, 1)) => false
     *
     * @param {Date} dateObject
     * @returns {Boolean} true if it is a leap year false otherwise
     */
    isLeapYear : function(/*Date*/dateObject, utc) {
        var year = dateObject[utc ? "getUTCFullYear" : "getFullYear"]();
        return !(year % 400) || (!(year % 4) && !!(year % 100)); // Boolean
    },

    /**
     * Determines if a date is on a weekend
     *
     * @example
     *
     * var thursday = new Date(2006, 8, 21);
     * var saturday = new Date(2006, 8, 23);
     * var sunday = new Date(2006, 8, 24);
     * var monday = new Date(2006, 8, 25);
     * comb.date.isWeekend(thursday)) => false
     * comb.date.isWeekend(saturday) => true
     * comb.date.isWeekend(sunday) => true
     * comb.date.isWeekend(monday)) => false
     *
     * @param {Date} dateObject the date to test
     *
     * @returns {Boolean} true if the date is a weekend
     */
    isWeekend : function(/*Date?*/dateObject, utc) {
        // summary:
        //	Determines if the date falls on a weekend, according to local custom.
        var day = (dateObject || new Date())[utc ? "getUTCDay" : "getDay"]();
        return day == 0 || day == 6;
    },

    /**
     * Get the timezone of a date
     *
     * @example
     *  //just setting the strLocal to simulate the toString() of a date
     *  dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
     *  //just setting the strLocal to simulate the locale
     *  dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
     *  comb.date.getTimezoneName(dt) => 'CDT'
     *  dt.str = 'Sun Sep 17 2006 22:57:18 GMT-0500 (CDT)';
     *  dt.strLocale = 'Sun Sep 17 22:57:18 2006';
     *  comb.date.getTimezoneName(dt) => 'CDT'
     * @param dateObject the date to get the timezone from
     *
     * @returns {String} the timezone of the date
     */
    getTimezoneName : function(/*Date*/dateObject) {
        var str = dateObject.toString();
        var tz = '';
        var pos = str.indexOf('(');
        if (pos > -1) {
            tz = str.substring(++pos, str.indexOf(')'));
        }
        return tz; // String
    },


    /**
     * Compares two dates
     *
     * @example
     *
     * var d1 = new Date();
     * d1.setHours(0);
     * comb.date.compare(d1, d1) => 0
     *
     *  var d1 = new Date();
     *  d1.setHours(0);
     *  var d2 = new Date();
     *  d2.setFullYear(2005);
     *  d2.setHours(12);
     *  comb.date.compare(d1, d2, "date") => 1
     *  comb.date.compare(d1, d2, "datetime") => 1
     *
     *  var d1 = new Date();
     *  d1.setHours(0);
     *  var d2 = new Date();
     *  d2.setFullYear(2005);
     *  d2.setHours(12);
     *  comb.date.compare(d2, d1, "date"), -1);
     *  comb.date.compare(d1, d2, "time"), -1);
     *
     * @param {Date|String} date1 the date to comapare
     * @param {Date|String} [date2=new Date()] the date to compare date1 againse
     * @param {"date"|"time"|"datetime"} portion compares the portion specified
     *
     * @returns -1 if date1 is < date2 0 if date1 === date2  1 if date1 > date2
     */
    compare : function(/*Date*/date1, /*Date*/date2, /*String*/portion) {
        date1 = new Date(date1);
        date2 = new Date((date2 || new Date()));

        if (portion == "date") {
            // Ignore times and compare dates.
            date1.setHours(0, 0, 0, 0);
            date2.setHours(0, 0, 0, 0);
        } else if (portion == "time") {
            // Ignore dates and compare times.
            date1.setFullYear(0, 0, 0);
            date2.setFullYear(0, 0, 0);
        }
        var ret = 0;
        date1 > date2 && (ret = 1);
        date1 < date2 && (ret = -1);
        return ret; // int
    },


    /**
     * Adds a specified interval and amount to a date
     *
     * @example
     *  var dtA = new Date(2005, 11, 27);
     *  comb.date.add(dtA, "year", 1) => new Date(2006, 11, 27);
     *  comb.date.add(dtA, "years", 1) => new Date(2006, 11, 27);
     *
     *  dtA = new Date(2000, 0, 1);
     *  comb.date.add(dtA, "quarter", 1) => new Date(2000, 3, 1);
     *  comb.date.add(dtA, "quarters", 1) => new Date(2000, 3, 1);
     *
     *  dtA = new Date(2000, 0, 1);
     *  comb.date.add(dtA, "month", 1) => new Date(2000, 1, 1);
     *  comb.date.add(dtA, "months", 1) => new Date(2000, 1, 1);
     *
     *  dtA = new Date(2000, 0, 31);
     *  comb.date.add(dtA, "month", 1) => new Date(2000, 1, 29);
     *  comb.date.add(dtA, "months", 1) => new Date(2000, 1, 29);
     *
     *  dtA = new Date(2000, 0, 1);
     *  comb.date.add(dtA, "week", 1) => new Date(2000, 0, 8);
     *  comb.date.add(dtA, "weeks", 1) => new Date(2000, 0, 8);
     *
     *  dtA = new Date(2000, 0, 1);
     *  comb.date.add(dtA, "day", 1) => new Date(2000, 0, 2);
     *
     *  dtA = new Date(2000, 0, 1);
     *  comb.date.add(dtA, "weekday", 1) => new Date(2000, 0, 3);
     *
     *  dtA = new Date(2000, 0, 1, 11);
     *  comb.date.add(dtA, "hour", 1) => new Date(2000, 0, 1, 12);
     *
     *  dtA = new Date(2000, 11, 31, 23, 59);
     *  comb.date.add(dtA, "minute", 1) => new Date(2001, 0, 1, 0, 0);
     *
     *  dtA = new Date(2000, 11, 31, 23, 59, 59);
     *  comb.date.add(dtA, "second", 1) => new Date(2001, 0, 1, 0, 0, 0);
     *
     *  dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
     *  comb.date.add(dtA, "millisecond", 1) => new Date(2001, 0, 1, 0, 0, 0, 0);
     *
     * @param {Date} date
     * @param {String} interval the interval to add
     *  <ul>
     *      <li>day | days</li>
     *      <li>weekday | weekdays</li>
     *      <li>year | years</li>
     *      <li>week | weeks</li>
     *      <li>quarter | quarters</li>
     *      <li>months | months</li>
     *      <li>hour | hours</li>
     *      <li>minute | minutes</li>
     *      <li>second | seconds</li>
     *      <li>millisecond | milliseconds</li>
     *  </ul>
     * @param {Number} [amount=0] the amount to add
     */
    add : function(/*Date*/date, /*String*/interval, /*int*/amount) {
        amount = amount | 0
        var sum = new Date(date);
        var fixOvershoot = false;
        var property = "Date";

        //noinspection FallthroughInSwitchStatementJS
        switch (interval) {
            case "day":
            case "days" :
                break;
            case "weekday":
            case "weekdays":
                // Divide the increment time span into weekspans plus leftover days
                // e.g., 8 days is one 5-day weekspan / and two leftover days
                // Can't have zero leftover days, so numbers divisible by 5 get
                // a days value of 5, and the remaining days make up the number of weeks
                var days, weeks, mod = amount % 5, strt = date.getDay(), adj = 0;
                if (!mod) {
                    days = (amount > 0) ? 5 : -5;
                    weeks = (amount > 0) ? ((amount - 5) / 5) : ((amount + 5) / 5);
                } else {
                    days = mod;
                    weeks = parseInt(amount / 5);
                }
                if (strt == 6 && amount > 0) {
                    adj = 1;
                } else if (strt == 0 && amount < 0) {
                    // Orig date is Sun / negative increment
                    // Jump back over Sat
                    adj = -1;
                }
                // Get weekday val for the new date
                var trgt = strt + days;
                // New date is on Sat or Sun
                if (trgt == 0 || trgt == 6) {
                    adj = (amount > 0) ? 2 : -2;
                }
                // Increment by number of weeks plus leftover days plus
                // weekend adjustments
                amount = (7 * weeks) + days + adj;
                break;
            case "year":
            case "years":
                property = "FullYear";
                fixOvershoot = true;
                break;
            case "week":
            case "weeks":
                amount *= 7;
                break;
            case "quarter":
            case "quarters" :
                // Naive quarter is just three months
                amount *= 3;
            case "month":
            case "months":
                // Reset to last day of month if you overshoot
                fixOvershoot = true;
                property = "Month";
                break;
            default:
                interval = interval.replace(/s$/, "");
                property = "UTC" + interval.charAt(0).toUpperCase() + interval.substring(1) + "s";
        }

        if (property) {
            sum["set" + property](sum["get" + property]() + amount);
        }

        if (fixOvershoot && (sum.getDate() < date.getDate())) {
            sum.setDate(0);
        }

        return sum; // Date
    },

    /**
     * Finds the difference between two dates based on the specified interval
     *
     * @example
     *
     * var dtA, dtB;
     *
     * dtA = new Date(2005, 11, 27);
     * dtB = new Date(2006, 11, 27);
     * comb.date.difference(dtA, dtB, "year") => 1
     *
     * dtA = new Date(2000, 1, 29);
     * dtB = new Date(2001, 2, 1);
     * comb.date.difference(dtA, dtB, "quarter") => 4
     * comb.date.difference(dtA, dtB, "month") => 13
     *
     * dtA = new Date(2000, 1, 1);
     * dtB = new Date(2000, 1, 8);
     * comb.date.difference(dtA, dtB, "week") => 1
     *
     * dtA = new Date(2000, 1, 29);
     * dtB = new Date(2000, 2, 1);
     * comb.date.difference(dtA, dtB, "day") => 1
     *
     * dtA = new Date(2006, 7, 3);
     * dtB = new Date(2006, 7, 11);
     * comb.date.difference(dtA, dtB, "weekday") => 6
     *
     * dtA = new Date(2000, 11, 31, 23);
     * dtB = new Date(2001, 0, 1, 0);
     * comb.date.difference(dtA, dtB, "hour") => 1
     *
     * dtA = new Date(2000, 11, 31, 23, 59);
     * dtB = new Date(2001, 0, 1, 0, 0);
     * comb.date.difference(dtA, dtB, "minute") => 1
     *
     * dtA = new Date(2000, 11, 31, 23, 59, 59);
     * dtB = new Date(2001, 0, 1, 0, 0, 0);
     * comb.date.difference(dtA, dtB, "second") => 1
     *
     * dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
     * dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
     * comb.date.difference(dtA, dtB, "millisecond") => 1
     *
     *
     * @param {Date} date1
     * @param {Date} [date2 = new Date()]
     * @param {String} [interval = "day"] the intercal to find the difference of.
     *   <ul>
     *      <li>day | days</li>
     *      <li>weekday | weekdays</li>
     *      <li>year | years</li>
     *      <li>week | weeks</li>
     *      <li>quarter | quarters</li>
     *      <li>months | months</li>
     *      <li>hour | hours</li>
     *      <li>minute | minutes</li>
     *      <li>second | seconds</li>
     *      <li>millisecond | milliseconds</li>
     *  </ul>
     */
    difference : function(/*Date*/date1, /*Date?*/date2, /*String*/interval, utc) {
        date2 = date2 || new Date();
        interval = interval || "day";
        var yearDiff = date2.getFullYear() - date1.getFullYear();
        var delta = 1; // Integer return value

        switch (interval) {
            case "quarter":
            case "quarters":
                var m1 = date1[utc ? "getUTCMonth" : "getMonth"]();
                var m2 = date2[utc ? "getUTCMonth" : "getMonth"]();
                // Figure out which quarter the months are in
                var q1 = floor(m1 / 3) + 1;
                var q2 = floor(m2 / 3) + 1;
                // Add quarters for any year difference between the dates
                q2 += (yearDiff * 4);
                delta = q2 - q1;
                break;
            case "weekday":
            case "weekdays":
                var days = round(date.difference(date1, date2, "day", utc));
                var weeks = parseInt(date.difference(date1, date2, "week", utc));
                var mod = days % 7;

                // Even number of weeks
                if (mod == 0) {
                    days = weeks * 5;
                } else {
                    // Weeks plus spare change (< 7 days)
                    var adj = 0;
                    var aDay = date1[utc ? "getUTCDay" : "getDay"]();
                    var bDay = date2[utc ? "getUTCDay" : "getDay"]();

                    weeks = parseInt(days / 7);
                    mod = days % 7;
                    // Mark the date advanced by the number of
                    // round weeks (may be zero)
                    var dtMark = new Date(date1);
                    dtMark.setDate(dtMark[utc ? "getUTCDate" : "getDate"]() + (weeks * 7));
                    var dayMark = dtMark[utc ? "getUTCDay" : "getDay"]();

                    // Spare change days -- 6 or less
                    if (days > 0) {
                        switch (true) {
                            // Range starts on Sat
                            case (aDay == 6 || bDay == 6):
                                adj = -1;
                                break;
                            // Range starts on Sun
                            case aDay == 0:
                                adj = 0;
                                break;
                            // Range ends on Sun
                            case bDay == 0:
                                adj = -2;
                                break;
                            // Range contains weekend
                            case (dayMark + mod) > 5:
                                adj = -2;
                        }
                    } else if (days < 0) {
                        switch (true) {
                            // Range starts on Sat
                            case aDay == 6:
                                adj = 0;
                                break;
                            // Range starts on Sun
                            case aDay == 0:
                                adj = 1;
                                break;
                            // Range ends on Sat
                            case bDay == 6:
                                adj = 2;
                                break;
                            // Range ends on Sun
                            case bDay == 0:
                                adj = 1;
                                break;
                            // Range contains weekend
                            case (dayMark + mod) < 0:
                                adj = 2;
                        }
                    }
                    days += adj;
                    days -= (weeks * 2);
                }
                delta = days;
                break;
            case "year":
            case "years":
                delta = yearDiff;
                break;
            case "month":
            case "months":
                var m1 = date1[utc ? "getUTCMonth" : "getMonth"]();
                var m2 = date2[utc ? "getUTCMonth" : "getMonth"]();
                delta = (m2 - m1) + (yearDiff * 12);
                break;
            case "week":
            case "weeks":
                delta = parseInt(date.difference(date1, date2, "day", utc) / 7);
                break;
            case "day":
            case "days":
                delta /= 24;
            case "hour":
            case "hours":
                delta /= 60;
            case "minute":
            case "minutes":
                delta /= 60;
            case "second":
            case "seconds":
                delta /= 1000;
            case "millisecond":
            case "milliseconds":
                delta *= date2.getTime() - date1.getTime();
        }

        // Round for fractional values and DST leaps
        return round(delta); // Number (integer)
    },


    /**
     * Parses a date string into a date object
     *
     * @example
     *  var aug_11_2006 = new Date(2006, 7, 11, 0);
     *  comb.date.parse("08/11/06", "MM/dd/yy") => aug_11_2006
     *  comb.date.parse("11Aug2006", 'ddMMMyyyy') => aug_11_2006
     *  comb.date.parse("Aug2006", 'MMMyyyy') => new Date(2006, 7, 1)
     *  comb.date.parse("Aug 11, 2006", "MMM dd, yyyy") => aug_11_2006
     *  comb.date.parse("August 11, 2006", "MMMM dd, yyyy") => aug_11_2006
     *  comb.date.parse("Friday, August 11, 2006", "EEEE, MMMM dd, yyyy") => aug_11_2006
     *
     * @param {String} dateStr The string to parse
     * @param {String} format the format of the date composed of the following options
     * <ul>
     *                  <li> G    Era designator    Text    AD</li>
     *                  <li> y    Year    Year    1996; 96</li>
     *                  <li> M    Month in year    Month    July; Jul; 07</li>
     *                  <li> w    Week in year    Number    27</li>
     *                  <li> W    Week in month    Number    2</li>
     *                  <li> D    Day in year    Number    189</li>
     *                  <li> d    Day in month    Number    10</li>
     *                  <li> E    Day in week    Text    Tuesday; Tue</li>
     *                  <li> a    Am/pm marker    Text    PM</li>
     *                  <li> H    Hour in day (0-23)    Number    0</li>
     *                  <li> k    Hour in day (1-24)    Number    24</li>
     *                  <li> K    Hour in am/pm (0-11)    Number    0</li>
     *                  <li> h    Hour in am/pm (1-12)    Number    12</li>
     *                  <li> m    Minute in hour    Number    30</li>
     *                  <li> s    Second in minute    Number    55</li>
     *                  <li> S    Millisecond    Number    978</li>
     *                  <li> z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00</li>
     *                  <li> Z    Time zone    RFC 822 time zone    -0800 </li>
     * </ul>
     *
     * @returns {Date} the parsed date
     *
     *
     */
    parse : function(dateStr, format) {
        if (!format) throw new Error('format required when calling comb.date.parse');
        var tokens = [], regexp = buildDateEXP(format, tokens),
                re = new RegExp("^" + regexp + "$", "i"),
                match = re.exec(dateStr);
        if (!match) {
            return null;
        } // null

        var result = [1970,0,1,0,0,0,0],// will get converted to a Date at the end
                amPm = "",
                valid = match.every(function(v, i) {
                    if (!i) {
                        return true;
                    }
                    var token = tokens[i - 1];
                    var l = token.length;
                    switch (token.charAt(0)) {
                        case 'y':
                            if (v < 100) {
                                v = parseInt(v, 10);
                                //choose century to apply, according to a sliding window
                                //of 80 years before and 20 years after present year
                                var year = '' + new Date().getFullYear(),
                                        century = year.substring(0, 2) * 100,
                                        cutoff = min(year.substring(2, 4) + 20, 99);
                                result[0] = (v < cutoff) ? century + v : century - 100 + v;
                            } else {
                                result[0] = v;
                            }
                            break;
                        case 'M':
                            if (l > 2) {
                                var months = monthNames;
                                if (l === 3) {
                                    months = monthAbbr;
                                }
                                //Tolerate abbreviating period in month part
                                //Case-insensitive comparison
                                v = v.replace(".", "").toLowerCase();
                                months = months.map(function(s) {
                                    return s.replace(".", "").toLowerCase();
                                });
                                if ((v = months.indexOf(v)) == -1) {
                                    return false;
                                }
                            } else {
                                v--;
                            }
                            result[1] = v;
                            break;
                        case 'E':
                        case 'e':
                            var days = dayNames;
                            if (l == 3) {
                                days = dayAbbr;
                            }
                            //Case-insensitive comparison
                            v = v.toLowerCase();
                            days = days.map(function(d) {
                                return d.toLowerCase();
                            });
                            var d = days.indexOf(v);
                            if (d == -1) {
                                v = parseInt(v);
                                if(isNaN(v) || v > days.length){
                                    return false;
                                }
                            }else{
                                v = d;
                            }
                            break;
                        case 'D':
                            result[1] = 0;
                        case 'd':
                            result[2] = v;
                            break;
                        case 'a': //am/pm
                            var am = "am";
                            var pm = "pm";
                            var period = /\./g;
                            v = v.replace(period, '').toLowerCase();
                            // we might not have seen the hours field yet, so store the state and apply hour change later
                            amPm = (v == pm) ? 'p' : (v == am) ? 'a' : '';
                            break;
                        case 'k': //hour (0-11)
                            if (v == 24) {
                                v = 0;
                            }
                        // fallthrough...
                        case 'h': //hour (1-12)
                        case 'H': //hour (0-23)
                        case 'K': //hour (0-11)
                            //in the 12-hour case, adjusting for am/pm requires the 'a' part
                            //which could come before or after the hour, so we will adjust later
                            result[3] = v;
                            break;
                        case 'm': //minutes
                            result[4] = v;
                            break;
                        case 's': //seconds
                            result[5] = v;
                            break;
                        case 'S': //milliseconds
                            result[6] = v;
                    }
                    return true;
                });
        if (valid) {
            var hours = +result[3];
            //account for am/pm
            if (amPm === 'p' && hours < 12) {
                result[3] = hours + 12; //e.g., 3pm -> 15
            } else if (amPm === 'a' && hours == 12) {
                result[3] = 0; //12am -> 0
            }
            var dateObject = new Date(result[0], result[1], result[2], result[3], result[4], result[5], result[6]); // Date
            var dateToken = (tokens.indexOf('d') != -1),
                    monthToken = (tokens.indexOf('M') != -1),
                    month = result[1],
                    day = result[2],
                    dateMonth = dateObject.getMonth(),
                    dateDay = dateObject.getDate();
            if ((monthToken && dateMonth > month) || (dateToken && dateDay > day)) {
                return null;
            }
            return dateObject; // Date
        } else {
            return null;
        }
    },

    /**
     * Formats a date to the specidifed format string
     *
     * @example
     *
     * var date = new Date(2006, 7, 11, 0, 55, 12, 345);
     * comb.date.format(date, "EEEE, MMMM dd, yyyy") => "Friday, August 11, 2006"
     * comb.date.format(date, "M/dd/yy") => "8/11/06"
     * comb.date.format(date, "E") => "6"
     * comb.date.format(date, "h:m a") => "12:55 AM"
     * comb.date.format(date, 'h:m:s') => "12:55:12"
     * comb.date.format(date, 'h:m:s.SS') => "12:55:12.35"
     * comb.date.format(date, 'k:m:s.SS') => "24:55:12.35"
     * comb.date.format(date, 'H:m:s.SS') => "0:55:12.35"
     * comb.date.format(date, "ddMMyyyy") => "11082006"
     *
     * @param date the date to format
     * @param {String} format the format of the date composed of the following options
     * <ul>
     *                  <li> G    Era designator    Text    AD</li>
     *                  <li> y    Year    Year    1996; 96</li>
     *                  <li> M    Month in year    Month    July; Jul; 07</li>
     *                  <li> w    Week in year    Number    27</li>
     *                  <li> W    Week in month    Number    2</li>
     *                  <li> D    Day in year    Number    189</li>
     *                  <li> d    Day in month    Number    10</li>
     *                  <li> E    Day in week    Text    Tuesday; Tue</li>
     *                  <li> a    Am/pm marker    Text    PM</li>
     *                  <li> H    Hour in day (0-23)    Number    0</li>
     *                  <li> k    Hour in day (1-24)    Number    24</li>
     *                  <li> K    Hour in am/pm (0-11)    Number    0</li>
     *                  <li> h    Hour in am/pm (1-12)    Number    12</li>
     *                  <li> m    Minute in hour    Number    30</li>
     *                  <li> s    Second in minute    Number    55</li>
     *                  <li> S    Millisecond    Number    978</li>
     *                  <li> z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00</li>
     *                  <li> Z    Time zone    RFC 822 time zone    -0800 </li>
     * </ul>
     */
    format : function(date, format, utc) {
        utc = utc || false;
        var fullYear, month, day, d, hour, minute, second, millisecond;
        if (utc) {
            fullYear = date.getUTCFullYear(),
                    month = date.getUTCMonth(),
                    day = date.getUTCDay(),
                    d = date.getUTCDate(),
                    hour = date.getUTCHours(),
                    minute = date.getUTCMinutes(),
                    second = date.getUTCSeconds(),
                    millisecond = date.getUTCMilliseconds();
        } else {
            fullYear = date.getFullYear(),
                    month = date.getMonth(),
                    d = date.getDate(),
                    day = date.getDay(),
                    hour = date.getHours(),
                    minute = date.getMinutes(),
                    second = date.getSeconds(),
                    millisecond = date.getMilliseconds();
        }
        return format.replace(/([a-z])\1*/ig, function(match, options) {
            var s, pad, h,
                    c = match.charAt(0),
                    l = match.length;

            switch (c) {
                case 'd':
                    s = "" + d;
                case 'H':
                    !s && (s = "" + hour);
                case 'm':
                    !s && (s = "" + minute);
                case 's':
                    !s && (s = "" + second);
                    pad = true;
                    break;
                case 'G':
                    s = ((l < 4) ? eraAbbr : eraNames)[fullYear < 0 ? 0 : 1];
                    break;
                case 'y':
                    s = fullYear;
                    if (l > 1) {
                        l == 2 ? s = string.truncate("" + s, 2, true) : pad = true;
                    }
                    break;
                case 'Q':
                case 'q':
                    s = ceil((month + 1) / 3);
                    pad = true;
                    break;
                case 'M':
                    if (l < 3) {
                        s = month + 1;
                        pad = true;
                    } else {
                        s = (l == 3 ? monthAbbr : monthNames)[month];
                    }
                    break;
                case 'w':
                    s = getWeekOfYear(date, 0, utc),pad = true;
                    break;
                case 'D':
                    s = getDayOfYear(date, utc),pad = true;
                    break;
                case 'E':
                    if (l < 3) {
                        s = day + 1;
                        pad = true;
                    } else {
                        s = (l == 3 ? dayAbbr : dayNames)[day];
                    }
                    break;
                case 'a':
                    s = (hour < 12) ? 'AM' : 'PM';
                    break;
                case 'h':
                    s = (hour % 12) || 12,pad = true;
                    break;
                case 'K':
                    s = (hour % 12),pad = true;
                    break;
                case 'k':
                    s = hour || 24,pad = true;
                    break;
                case 'S':
                    s = round(millisecond * pow(10, l - 3)),pad = true;
                    break;
                case 'v':
                case 'z':
                    s = comb.date.getTimezoneName(date);
                    if (s) {
                        break;
                    }
                    l = 4;
                // fallthrough... use GMT if tz not available
                case 'Z':
                    var offset = date.getTimezoneOffset();
                    var tz = [
                        (offset >= 0 ? "-" : "+"),
                        string.pad(floor(abs(offset) / 60), 2, "0"),
                        string.pad(abs(offset) % 60, 2, "0")
                    ];
                    if (l == 4) {
                        tz.splice(0, 0, "GMT");
                        tz.splice(3, 0, ":");
                    }
                    s = tz.join("");
                    break;
//				case 'Y': case 'u': case 'W': case 'F': case 'g': case 'A': case 'e':
//					console.log(match+" modifier unimplemented");
                default:
                    s = match;
                //  throw new Error("comb.date.format: invalid pattern char: " + match);
            }
            if (pad) {
                s = string.pad(s, l, '0');
            }
            return s;
        });
    }

};

date = comb.date;