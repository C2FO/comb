"use strict";
var floor = Math.floor, round = Math.round, min = Math.min, pow = Math.pow, ceil = Math.ceil, abs = Math.abs;

var addMap = {
    day: function addDay(date, amount) {
        return [amount, "Date", false];
    },
    weekday: function addWeekday(date, amount) {
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
            weeks = parseInt(amount / 5, 10);
        }
        if (strt === 6 && amount > 0) {
            adj = 1;
        } else if (strt === 0 && amount < 0) {
            // Orig date is Sun / negative increment
            // Jump back over Sat
            adj = -1;
        }
        // Get weekday val for the new date
        var trgt = strt + days;
        // New date is on Sat or Sun
        if ((trgt === 0 || trgt === 6) || ((trgt > 6 || trgt <= 0) && strt !== 6 && strt !== 0)) {
            adj = (amount > 0) ? 2 : -2;
        }
        // Increment by number of weeks plus leftover days plus
        // weekend adjustments
        return [(7 * weeks) + days + adj, "Date", false];
    },
    year: function addYear(date, amount) {
        return [amount, "FullYear", true];
    },
    week: function addWeek(date, amount) {
        return [amount * 7, "Date", false];
    },
    quarter: function addYear(date, amount) {
        return [amount * 3, "Month", true];
    },
    month: function addYear(date, amount) {
        return [amount, "Month", true];
    }
};

function addTransform(interval, date, amount) {
    interval = interval.replace(/s$/, "");
    if (addMap.hasOwnProperty(interval)) {
        return addMap[interval](date, amount);
    }
    return [amount, "UTC" + interval.charAt(0).toUpperCase() + interval.substring(1) + "s", false];
}


var differenceMap = {
    "quarter": function quarterDifference(date1, date2, utc) {
        var yearDiff = date2.getFullYear() - date1.getFullYear();
        var m1 = date1[utc ? "getUTCMonth" : "getMonth"]();
        var m2 = date2[utc ? "getUTCMonth" : "getMonth"]();
        // Figure out which quarter the months are in
        var q1 = floor(m1 / 3) + 1;
        var q2 = floor(m2 / 3) + 1;
        // Add quarters for any year difference between the dates
        q2 += (yearDiff * 4);
        return q2 - q1;
    },

    "weekday": function weekdayDifference(date1, date2, utc) {
        var days = differenceTransform("day", date1, date2, utc), weeks;
        var mod = days % 7;
        // Even number of weeks
        if (mod === 0) {
            days = differenceTransform("week", date1, date2, utc) * 5;
        } else {
            // Weeks plus spare change (< 7 days)
            var adj = 0, aDay = date1[utc ? "getUTCDay" : "getDay"](), bDay = date2[utc ? "getUTCDay" : "getDay"]();
            weeks = parseInt(days / 7, 10);
            // Mark the date advanced by the number of
            // round weeks (may be zero)
            var dtMark = new Date(date1);
            dtMark.setDate(dtMark[utc ? "getUTCDate" : "getDate"]() + (weeks * 7));
            var dayMark = dtMark[utc ? "getUTCDay" : "getDay"]();

            // Spare change days -- 6 or less
            if (days > 0) {
                if (aDay === 6 || bDay === 6) {
                    adj = -1;
                } else if (aDay === 0) {
                    adj = 0;
                } else if (bDay === 0 || (dayMark + mod) > 5) {
                    adj = -2;
                }
            } else if (days < 0) {
                if (aDay === 6) {
                    adj = 0;
                } else if (aDay === 0 || bDay === 0) {
                    adj = 1;
                } else if (bDay === 6 || (dayMark + mod) < 0) {
                    adj = 2;
                }
            }
            days += adj;
            days -= (weeks * 2);
        }
        return days;
    },
    year: function (date1, date2) {
        return date2.getFullYear() - date1.getFullYear();
    },
    month: function (date1, date2, utc) {
        var m1 = date1[utc ? "getUTCMonth" : "getMonth"]();
        var m2 = date2[utc ? "getUTCMonth" : "getMonth"]();
        return (m2 - m1) + ((date2.getFullYear() - date1.getFullYear()) * 12);
    },
    week: function (date1, date2, utc) {
        return round(differenceTransform("day", date1, date2, utc) / 7);
    },
    day: function (date1, date2) {
        return 1.1574074074074074e-8 * (date2.getTime() - date1.getTime());
    },
    hour: function (date1, date2) {
        return 2.7777777777777776e-7 * (date2.getTime() - date1.getTime());
    },
    minute: function (date1, date2) {
        return 0.000016666666666666667 * (date2.getTime() - date1.getTime());
    },
    second: function (date1, date2) {
        return 0.001 * (date2.getTime() - date1.getTime());
    },
    millisecond: function (date1, date2) {
        return date2.getTime() - date1.getTime();
    }
};


function differenceTransform(interval, date1, date2, utc) {
    interval = interval.replace(/s$/, "");
    return round(differenceMap[interval](date1, date2, utc));
}


exports.addTransform = addTransform;
exports.differenceTransform = differenceTransform;