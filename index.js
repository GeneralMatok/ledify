const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const html = require("./html.js");


/**
 * Calculates the full working days until the end of march from now on
 * @returns 
 */
var getWorkingDaysTillEndOfMarch = () => {

    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    function isWeekday(year, month, day) {
        var day = new Date(year, month, day).getDay();
        return day != 0 && day != 6;
    }

    function getWeekdaysInMonth(month, year) {
        var days = daysInMonth(month, year);
        var weekdays = 0;
        for (var i = 0; i < days; i++) {
            if (isWeekday(year, month, i + 1)) weekdays++;
        }
        return weekdays;
    }

    liCurrentMonth = new Date().getMonth();
    liCurrentDayInMonth = new Date().getDate();
    liCurrentYear = new Date().getFullYear();
    liDaysInMonth = daysInMonth(liCurrentMonth, liCurrentYear);

    var liTotalWorkdays = 0;
    var liMonthCounter = liCurrentMonth;
    while (liMonthCounter < 3) {
        if (liCurrentDayInMonth > 0) {

            var isWeekDay = isWeekday(liCurrentYear, liCurrentMonth, liCurrentDayInMonth++);
            if (isWeekDay) {
                liTotalWorkdays++;
            }
            if (liCurrentDayInMonth === liDaysInMonth) {
                liCurrentDayInMonth = 0;
                liMonthCounter++;
            }
        } else {
            liTotalWorkdays = liTotalWorkdays + getWeekdaysInMonth(liMonthCounter, liCurrentYear);
            liMonthCounter++;
        }

    }

    return liTotalWorkdays;
}

app.get('/', async (req, res) => {

    let today = new Date();

    var iEndMonth = 2;
    var iMonth = today.getMonth();

    var iYear = today.getFullYear();

    var oFullDays = new Date(iYear, iEndMonth, 30);


    if (iMonth == 11 && today.getDate() > 25) {
        oFullDays.setFullYear(oFullDays.getFullYear() + 1);
    }
    var one_day = 1000 * 60 * 60 * 24;

    var iFullDays = Math.ceil((oFullDays.getTime() - today.getTime()) / (one_day));

    var oResult = {
        fullDays: iFullDays,
        workdaysLeftExcluding: getWorkingDaysTillEndOfMarch()
    };
    console.log(oResult);
    res.send(await html.getHTML(oResult));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})