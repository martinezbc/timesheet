
function clearTimeField (fieldID) {
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(10);
    
    if (day === "Sup") {
        clearTimeFieldSup(fieldID);
        return;
    }
    if (num === "14" || num === "15") {
        $("#" + day + "LeaveSelect" + num).val("");
        setStorage(day + "LeaveSelect" + num, "");
        $("#" + day + "Time" + num + "E").val("").trigger("change");
        $("#" + day + "Time" + num + "S").val("").trigger("change");
    } else if (num === "AD") {
        $("#" + day + "LeaveSelectAD").val("");
        setStorage(day + "LeaveSelectAD", "");
        if ($("#" + day + "LeaveAD").prop("checked") === true) {
            $("#" + day + "LeaveAD").trigger("click");
        }
    } else if (num === "AM") {
        $("#" + day + "TimeA").val("");
        setStorage(day + "TimeA", "");
        $("#" + day + "TimeB").val("");
        setStorage(day + "TimeB", "");
    } else if (num === "PM") {
        $("#" + day + "TimeC").val("");
        setStorage(day + "TimeC", "");
        $("#" + day + "TimeD").val("");
        setStorage(day + "TimeD", "");
    } else {
        $("#" + day + "Time" + num + "E").val("").trigger("change");
        $("#" + day + "Time" + num + "S").val("").trigger("change");
    }
}

function clearOtherField (fieldID) {
    "use strict";
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(8);
    
    if (day === "Sup") {
        clearOtherFieldSup(fieldID);
        return;
    }
    if (num === "11" || num === "12" || num === "13") {
        $("#" + day + "To" + num).val("");
        setStorage(day + "To" + num, "");
        $("#" + day + "From" + num).val("");
        setStorage(day + "From" + num, "");
        $("#" + day + "Voucher" + num).val("");
        setStorage(day + "Voucher" + num, "");
        $("#" + day + "Lift" + num).prop("checked", false);
        setStorage(day + "Lift" + num, 0);
    } else if (num === "8" || num === "9" || num === "10") {
        $("#" + day + "Desc" + num).val("");
        setStorage(day + "Desc" + num, "");
        $("#" + day + "Select" + num).val("");
        setStorage(day + "Select" + num, "");
        $("#" + day + "Lift" + num).prop("checked", false);
        setStorage(day + "Lift" + num, 0);
        otherWorkTime(day, num, false);
    }
}

function setMeridiem (b) {
    var meridiemText = "",
        inputMeridiem = $("#meridiem" + b).text();
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    $("#meridiem" + b).text(meridiemText);
}

function setMinutes (operator, optVal) {
    var minutesText = "",
        minutes = Number($("#minutes" + optVal).text());
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
    $("#minutes" + optVal).text(minutesText);
}

function setMinutesPupil (operator) {
    var minutesText = "",
        minutes = Number($("#minutes").text());
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
    $("#minutes").text(minutesText);
}

function setHours (operator, optVal) {
    var hoursText = "";
    var hours = Number($("#hours" + optVal).text());
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
    $("#hours" + optVal).text(hoursText);
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
