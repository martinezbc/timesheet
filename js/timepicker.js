
function setMeridiem () {
    var meridiemText = "",
        inputMeridiem = byID("meridiem").innerHTML;
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    byID("meridiem").innerHTML = meridiemText;
}

function setMinutes (operator) {
    var minutesText = "",
        minutes = Number(byID("minutes").innerHTML);
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
        setHours(1);
    } else if (minutesText < 0) {
        minutesText = 60 + Number(minutesText)
        setHours(-1);
    }
    
    if (minutesText < 10) {
        minutesText = "0" + minutesText;
    }
    byID("minutes").innerHTML = minutesText;
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

function setHours (operator) {
    var hoursText = "";
    var hours = Number(byID("hours").innerHTML);
    hoursText = hours + operator;
            
    if (hoursText === 13) {
        hoursText = "1";
        if (operator === 2) {
            setMeridiem();
        }
    } else if (hoursText === 14) {
        hoursText = "2";
    } else if (hoursText === 0) {
        hoursText = "12";
    } else if (hoursText === -1 || (hoursText === 11 && operator < 0)) {
        hoursText = "11";
        setMeridiem();
    } else if (hoursText === 12 && operator > 0) {
        setMeridiem();
    } else if (hoursText === 10 && operator === -2) {
        setMeridiem();
    }
    byID("hours").innerHTML = hoursText;
}

function changeValue (operator, clicked, refElement) {
    "use strict";
    var blnPupil = false;
    if (refElement.substr(-1) === "A" || refElement.substr(-1) === "B" || refElement.substr(-1) === "C" || refElement.substr(-1) === "D") {
        blnPupil = true;
    }
    var str = clicked.substr(0,2);
    switch (str) {
        case "hr":
            setHours(operator);
            break;
        case "mn":
            if (blnPupil) {
                setMinutesPupil(operator);
            } else {
                setMinutes(operator);
            }
            break;
        default:
            setMeridiem();
    }
}
