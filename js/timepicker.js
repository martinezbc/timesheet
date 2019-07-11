
function clearTimeField (fieldID) {
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(10);
    
    if (day === "Sup") {
        clearTimeFieldSup(fieldID);
        return;
    }
    if (num === "41" || num === "42") {
        byID(day + "LeaveSelect" + num).value = "";
        setStorage(day + "LeaveSelect" + num, "");
        byID(day + "Time" + num + "E").value = "";
        byID(day + "Time" + num + "S").value = "";
    } else if (num === "AD") {
        byID(day + "LeaveSelectAD").value = "";
        setStorage(day + "LeaveSelectAD", "");
        if (byID(day + "LeaveAD").checked)
            byID(day + "LeaveAD").trigger("click");

    } else if (num === "AM") {
        byID(day + "TimeA").value = "";
        setStorage(day + "TimeA", "");
        byID(day + "TimeB").value = "";
        setStorage(day + "TimeB", "");
    } else if (num === "PM") {
        byID(day + "TimeC").value = "";
        setStorage(day + "TimeC", "");
        byID(day + "TimeD").value = "";
        setStorage(day + "TimeD", "");
    } else {
        byID(day + "Time" + num + "E").value = "";
        byID(day + "Time" + num + "S").value = "";
    }
}

function clearOtherField (fieldID) {
    "use strict";
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(10);
    
    if (day === "Sup") {
        clearOtherFieldSup(fieldID);
        return;
    }
    if (num.substr(0,1) === "3") {
        setStorage(day + "To" + num, "");
        setStorage(day + "From" + num, "");
        setStorage(day + "Voucher" + num, "");
        setStorage(day + "Lift" + num, 0);
        setStorage(day + "Time" + num + "S", "");
        setStorage(day + "Time" + num + "E", "");
        setStorage(day + "Time" + num, "");
        byID(day + "FTDiv" + num).parentNode.removeChild(day + "FTDiv" + num);
    } else if (num.substr(0,1) === "2") {
        setStorage(day + "Desc" + num, "");
        setStorage(day + "Select" + num, "");
        setStorage(day + "Lift" + num, 0);
        setStorage(day + "OJT" + num, 0);
        setStorage(day + "Time" + num + "S", "");
        setStorage(day + "Time" + num + "E", "");
        setStorage(day + "Time" + num, "");
        byID(day + "OWDiv" + num).parentNode.removeChild(day + "OWDiv" + num);
    }
}

function setMeridiem (optVal) {
    var meridiemText = "",
        inputMeridiem = byID("meridiem" + optVal).innerHTML;
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    byID("meridiem" + b).innerHTML = meridiemText;
}

function setMinutes (operator, optVal) {
    var minutesText = "",
        minutes = Number(byID("minutes" + optVal).innerHTML);
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
        setHours(1, optVal);
    } else if (minutesText < 0) {
        minutesText = 60 + Number(minutesText)
        setHours(-1, optVal);
    }
    
    if (minutesText < 10) {
        minutesText = "0" + minutesText;
    }
    byID("minutes" + optVal).innerHTML = minutesText;
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

function setHours (operator, optVal) {
    var hoursText = "";
    var hours = Number(byID("hours" + optVal).innerHTML);
    hoursText = hours + operator;
            
    if (hoursText === 13) {
        hoursText = "1";
        if (operator === 2) {
            setMeridiem(optVal);
        }
    } else if (hoursText === 14) {
        hoursText = "2";
    } else if (hoursText === 0) {
        hoursText = "12";
    } else if (hoursText === -1 || (hoursText === 11 && operator < 0)) {
        hoursText = "11";
        setMeridiem(optVal);
    } else if (hoursText === 12 && operator > 0) {
        setMeridiem(optVal);
    } else if (hoursText === 10 && operator === -2) {
        setMeridiem(optVal);
    }
    byID("hours" + optVal).innerHTML = hoursText;
}

function changeValue (operator, clicked, optVal, refElement) {
    "use strict";
    var blnPupil = false;
    if (refElement.substr(-1) === "A" || refElement.substr(-1) === "B" || refElement.substr(-1) === "C" || refElement.substr(-1) === "D") {
        blnPupil = true;
    }
    var str = clicked.substr(0,2);
    switch (str) {
        case "hr":
            setHours(operator, optVal);
            break;
        case "mn":
            if (blnPupil) {
                setMinutesPupil(operator);
            } else {
                setMinutes(operator, optVal);
            }
            break;
        default:
            setMeridiem(optVal);
    }
}
