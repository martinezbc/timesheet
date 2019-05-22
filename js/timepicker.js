
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

function setMinutes (operator, b) {
    var minutesText = "",
        minutes = Number($("#minutes" + b).text());
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
    if (minutesText === 60) {
        minutesText = "0";
        setHours(1, b);
    } else if (minutesText === -5) {
        minutesText = "55";
        setHours(-1, b);
    } else if (minutesText === -10) {
        minutesText = "50";
        setHours(-1, b);
    } else if (minutesText === -15) {
        minutesText = "45";
        setHours(-1, b);
    } else if (minutesText === 65) {
        minutesText = "5";
        setHours(1, b);
    } else if (minutesText === 70) {
        minutesText = "10";
        setHours(1, b);
    } else if (minutesText === 75) {
        minutesText = "15";
        setHours(1, b);
    }
    
    if (minutesText < 10) {
        minutesText = "0" + minutesText;
    }
    $("#minutes" + b).text(minutesText);
}

function setHours (operator, b) {
    var hoursText = "";
    var hours = Number($("#hours" + b).text());
    hoursText = hours + operator;
            
    if (hoursText === 13) {
        hoursText = "1";
        if (operator === 2) {
            setMeridiem(b);
        }
    } else if (hoursText === 14) {
        hoursText = "2";
    } else if (hoursText === 0) {
        hoursText = "12";
    } else if (hoursText === -1 || (hoursText === 11 && operator < 0)) {
        hoursText = "11";
        setMeridiem(b);
    } else if (hoursText === 12 && operator > 0) {
        setMeridiem(b);
    } else if (hoursText === 10 && operator === -2) {
        setMeridiem(b);
    }
    $("#hours" + b).text(hoursText);
}

function changeValue (operator, clicked, optVal) {
    "use strict";
    var str = clicked.substr(0,2);
    switch (str) {
        case "hr":
            setHours(operator, optVal);
            break;
        case "mn":
            setMinutes(operator, optVal);
            break;
        default:
            setMeridiem(optVal);
    }
}
