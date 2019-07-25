function setMeridiem () {
    s = (s === undefined) ? "" : "S";
    var meridiemText = "",
        inputMeridiem = byID("meridiem" + s).innerHTML;
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    byID("meridiem" + s).innerHTML = meridiemText;
}

function setMinutes (operator, s) {
    s = (s === undefined) ? "" : "S";
    var minutesText = "",
        minutes = Number(byID("minutes" + s).innerHTML);
    if (operator === 1) {
        operator = 5;
    } else if (operator === 2) {
        operator = 15;
    } else if (operator === -1) {
        operator = -5;
    } else if (operator === -2) {
        operator = -15;
    }
    minutesText = minutes + operator;
    if (minutesText > 59) {
        minutesText = Number(minutesText) - 60;
        setHours(1, s);
    } else if (minutesText < 0) {
        minutesText = 60 + Number(minutesText)
        setHours(-1, s);
    }

    if (minutesText < 10) {
        minutesText = "0" + minutesText;
    }
    byID("minutes" + s).innerHTML = minutesText;
}

function setMinutesPupil (operator) {
    var minutesText = "",
        minutes = Number(byID("minutes").innerHTML);
    if (operator === 1) {
        operator = 1;
    } else if (operator === 2) {
        operator = 10;
    } else if (operator === -1) {
        operator = -1;
    } else if (operator === -2) {
        operator = -10;
    }
    minutesText = minutes + operator;
    if (minutesText < 0) {
        minutesText = 60 + Number(minutesText);
        setHours(-1, "");
    } else if (minutesText > 59) {
        minutesText = Number(minutesText) - 60;
        setHours(1, "");
    }

    if (minutesText < 10) {
        minutesText = "0" + minutesText;
    }
    byID("minutes").innerHTML = minutesText;
}

function setHours (operator, s) {
    s = (s === undefined) ? "" : "S";
    var hoursText = "";
    var hours = Number(byID("hours" + s).innerHTML);
    hoursText = hours + operator;

    if (hoursText === 13) {
        hoursText = "1";
        if (operator === 2) {
            setMeridiem(s);
        }
    } else if (hoursText === 14) {
        hoursText = "2";
    } else if (hoursText === 0) {
        hoursText = "12";
    } else if (hoursText === -1 || (hoursText === 11 && operator < 0)) {
        hoursText = "11";
        setMeridiem(s);
    } else if (hoursText === 12 && operator > 0) {
        setMeridiem(s);
    } else if (hoursText === 10 && operator === -2) {
        setMeridiem(s);
    }
    byID("hours" + s).innerHTML = hoursText;
}

function changeValue (operator, clicked, refElement, s) {
    "use strict";
    s = (s === undefined) ? "" : "S";
    var x = refElement.substr(-1);
    var blnPupil = (x === "A" || x === "B" || x === "C" || x === "D") ? true : false;

    var str = clicked.substr(0,2);
    switch (str) {
        case "hr":
            setHours(operator, s);
            break;
        case "mn":
            if (blnPupil)
                setMinutesPupil(operator);
            else
                setMinutes(operator, s);
            break;
        default:
            setMeridiem(s);
    }
}
