// JavaScript Document

//Declare variables
var fullday = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

//******************STARTING TEXTBOX FUNCTIONS******************//
//Check for overlaps and run calculation
function textboxUpdate(refID) {
	"use strict";
    checkTime(refID);
    var b = refID.substr(0, refID.length - 1),
        c = refID.substr(7,1),
        d = refID.substr(-1);
        
    if (isNaN(c)) {
        return;
    } else {
        c = b.substr(7);
    }
    
    if (refID.indexOf("Sup") > -1) {
        textboxUpdateSup(refID);
        return;
    }
    
    checkOverlap(b, d);
    if (checkAMPMTime(refID, c)) {
        return;
    }
    calculateDiff(b);
    setCalculation(refID);
    
    getDailyTotals();
    
    if (c > 7 && c < 11) {
		countOtherWork(refID);
	}
    
    if (c > 10 && c < 14) {
		countFieldTrips(refID);
	}
}

function checkAMPMTime(refID, strNum) {
    if (strNum === "1" && convertToMinutes($("#" + refID).val()) > 720) {
        openPopUp("<p>Morning run times cannot be PM time</p>","");
        $("#" + refID).val("");
        return true;
    } else if (strNum === "7" && convertToMinutes($("#" + refID).val()) < 720 && $("#" + refID).val() !== "") {
        openPopUp("<p>Late run times cannot be AM time</p>","");
        $("#" + refID).val("");
        return true;
    }
    return false;
}
function setCalculation(refID) {
    var y = refID.substr(0, refID.length - 1);
    if ($("#" + refID).val() === "") {
        $("#" + y).val("");
    }
    setStorage(y, $("#" + y).val());
}

//Check to ensure proper time format and then return corrected time
function checkTime(str1) {
	"use strict";
    var str2 = $("#" + str1).val(),
        str3 = "",
        h, m;

    str2 = str2.toUpperCase();
    if (str2.indexOf("A") > 0) {
        str3 = "AM";
    } else if (str2.indexOf("P") > 0) {
        str3 = "PM";
    }
    str2 = str2.replace("A", "");
    str2 = str2.replace("M", "");
    str2 = str2.replace("P", "");
    str2 = str2.replace(":", "");
    str2 = str2.trim();

    if (str2.length < 3 && str2 !== "") {
        openPopUp("<p>Error: Time does not have enough digits.</p>");
        str2 = "";
    } else if (str2.length === 3) {
        h = str2.substring(0, 1);
        m = str2.substring(1);
    } else if (str2.length === 4) {
        h = str2.substring(0, 2);
        m = str2.substring(2);
    } else if (str2.length > 4) {
        openPopUp("<p>Error: Time has too many/incorrect digits.</p>");
        str2 = "";
    } else {
        str2 = "";
    }

    if (str2 === "") {
        //
    } else if (str3 !== "") {
        str2 = h + ":" + m + " " + str3;
    } else {
        str2 = h + ":" + m + " AM";
    }
    $("#" + str1).val(str2);
}

function checkOverlap(s1, z) {
	"use strict";
    if ($("#" + s1 + z).val() === "") {
        return;
    }
    var thisStart = convertToMinutes($("#" + s1 + "S").val()),
        thisEnd = convertToMinutes($("#" + s1 + "E").val()),
        j = Number(s1.substr(7)),
        i = 1,
        bln = false,
        day = s1.substr(0, 3),
        newStart = "",
        newEnd = "",
        max = 15;
    
    if (day === "Sat" || day === "Sun") {
        max = 14;
        i = 8;
    }
    
    for (i; i < max; i++) {
        if (i === j) {
			i++;
		}

        newStart = convertToMinutes($("#" + day + "Time" + i + "S").val());
        newEnd = convertToMinutes($("#" + day + "Time" + i + "E").val());
        if (newStart === thisStart) {
            bln = true;
        }
        if (newStart > 0 && newEnd > 0) {
            if (thisStart > 0 && thisStart > newStart && thisStart < newEnd) {
                bln = true;
            }
            if (thisEnd > 0 && thisEnd > newStart && thisEnd < newEnd) {
                bln = true;
            }
            if (thisStart === newStart) {
                bln = true;
            }
            if (thisEnd === newEnd) {
                bln = true;
            }
            if (thisStart < newStart && thisEnd > newEnd) {
                bln = true;
            }
        }
    }
    if (bln === true) {
        openPopUp("<p>Overlap error</p>");
        $("#" + s1 + z).val("");
    }
}


//******************TIME CONVERSION******************//
function round5(x) {
	"use strict";
    return Math.round(x / 5) * 5;
}

//Convert hours and minutes to only minutes
function convertToMinutes(s1) {
	"use strict";
    if (s1 === "" || s1 === null || s1 === undefined) {
		return 0;
	}
    
    var h = s1.substring(0, s1.indexOf(":"));
    if (h === "12" && s1.indexOf("AM") > 0) {
		h = 0;
	}
    h = h * 60;
    
    var m = round5(Number(s1.substr(s1.indexOf(":") + 1, 2))),
        b = m + h;
    
    if (s1.indexOf("PM") > 0 && h !== 720) {
		b = b + 720;
	}
    
    return b;
}

function calculateDiff(refID) {
    "use strict";
	if (refID === null || refID === undefined) {
		return;
	}
    
    var startTime = convertToMinutes($("#" + refID + "S").val()),
        endTime = convertToMinutes($("#" + refID + "E").val()),
        num = refID.substr(7),
        timeDiff = 0;

    if ((endTime < startTime) && (endTime !== 0)) {
        openPopUp("<p>End time is less than start time</p>");
        $("#" + refID + "E").val("");
    } else {
        if (endTime === 0) {
			endTime = startTime;
		}
        timeDiff = endTime - startTime;
        switch (num) {
            case "11":
            case "12":
            case "13":
                $("#" + refID).val(convertTotal(timeDiff));
                break;
            default:
                $("#" + refID).val(calculateTotal(timeDiff));
                break;
        }
    }
}

//Return time to h:mm format
function calculateTotal(refVal) {
    "use strict";
	var hour = Math.floor(refVal / 60),
        min = refVal - (hour * 60),
        totalVal;
    if (min < 10) {
        totalVal = hour + ":0" + min;
    } else {
        totalVal = hour + ":" + min;
    }
    return totalVal;
}

//Return time to h.mm format
function convertTotal(refVal) {
    "use strict";
	var hour = Math.floor(refVal / 60),
        min = refVal - (hour * 60),
        totalVal;
    if (min === 0 || min === 5) {
        min = "00";
    } else if (min === 10 || min === 15 || min === 20) {
        min = "25";
    } else if (min === 25 || min === 30 || min === 35) {
        min = "50";
    } else if (min === 40 || min === 45 || min === 50) {
        min = "75";
    } else if (min === 55) {
        min = "00";
        hour = hour + 1;
    }
    totalVal = hour + "." + min;
    totalVal = setToFixed(totalVal);
    return totalVal;
}

function setToFixed(refVal) {
    refVal = Number(refVal);
    if (refVal === 0) {
        return "";
    }
    refVal = Number(refVal).toFixed(2);
    return refVal;
}

//******************CALCULATE DAILY TIMES******************//
//Regular Run Times
function dailyRuns(day) {
	"use strict";
    var m1 = convertToMinutes($("#" + day + "Time1").val()),
        m2 = convertToMinutes($("#" + day + "Time2").val()),
        m3 = convertToMinutes($("#" + day + "Time3").val()),
        m4 = convertToMinutes($("#" + day + "Time4").val()),
        m5 = convertToMinutes($("#" + day + "Time5").val()),
        m6 = convertToMinutes($("#" + day + "Time6").val()),
        m7 = convertToMinutes($("#" + day + "Time7").val()),
        totalVal = m1 + m2 + m3 + m4 + m5 + m6 + m7;
    totalVal = calculateTotal(totalVal);
    totalVal = (totalVal === "0:00") ? "" : totalVal;
    $("#" + day + "RunTotal").val(totalVal);
    setStorage(day + "RunTotal", totalVal);
}

//Other Work Times
function dailyOther(day) {
	"use strict";
    var s1 = $("#" + day + "Select8").val(),
        s2 = $("#" + day + "Select9").val(),
        s3 = $("#" + day + "Select10").val();
    var m1 = (s1 !== "CBK" && s1 !== "ES0" && s1 !== "ES2") ? convertToMinutes($("#" + day + "Time8").val()) : 0, //if C1 or C3 do not add to total
        m2 = (s2 !== "CBK" && s2 !== "ES0" && s2 !== "ES2") ? convertToMinutes($("#" + day + "Time9").val()) : 0,
        m3 = (s3 !== "CBK" && s3 !== "ES0" && s3 !== "ES2") ? convertToMinutes($("#" + day + "Time10").val()) : 0,
        r = m1 + m2 + m3,
        x = calculateTotal(r);
    x = (x === "0:00") ? "" : x;
    $("#" + day + "OtherTotal").val(x);
    setStorage(day + "OtherTotal", x);
}

//Total up Specialty Pay
function sumCPay() {
	"use strict";
    var c1 = 0,
        c3 = 0,
        i = 0,
        j = 0,
        sum = 0;

    for (i = 0; i < 7; i++) {
        for (j = 8; j < 11; j++) {
            if ($("#" + days[i] + "Select" + j).val() === "CBK") {
                c1 = c1 + 240;
                sum = sum + convertToMinutes($("#" + days[i] + "Time" + j).val());
            }
        }
    }
    c1 = (c1 === 0) ? "" : convertTotal(c1);
    setStorage("TotalC1", c1);
    $("#TotalC1").val(c1);

    for (i = 0; i < 7; i++) {
        for (j = 8; j < 11; j++) {
            if ($("#" + days[i] + "Select" + j).val() === "ES0") {
                c3 = c3 + convertToMinutes($("#" + days[i] + "Time" + j).val());
                sum = sum + convertToMinutes($("#" + days[i] + "Time" + j).val());
            }
        }
    }

    for (i = 0; i < 7; i++) {
        for (j = 8; j < 11; j++) {
            if ($("#" + days[i] + "Select" + j).val() === "ES2") {
                c3 = c3 + convertToMinutes($("#" + days[i] + "Time" + j).val()) + 120;
                sum = sum + convertToMinutes($("#" + days[i] + "Time" + j).val());
            }
        }
    }
    sum = convertTotal(sum);
    setStorage("TotalHW", sum);
    $("#TotalHW").val(sum);
    c3 = (c3 === 0) ? "" : convertTotal(c3);
    setStorage("TotalC3", c3);
    $("#TotalC3").val(c3);
}

//Field Trip Times
function dailyFT(d) {
	"use strict";
    var r = Number($("#" + d + "Time11").val()) + Number($("#" + d + "Time12").val()) + Number($("#" + d + "Time13").val());
    r = setToFixed(r);
    $("#" + d + "FTTotal").val(r);
    setStorage(d + "FTTotal", r);
}

//Lift Time
function dailyLift(d) {
	"use strict";
    var r = 0,
		i = 0;
    //If Lift 1 is checked, total up run, pac, shuttles, late run time
    if ($("#" + d + "Lift1").is(":checked")) {
        for (i = 1; i < 8; i++) {
            r = r + convertToMinutes($("#" + d + "Time" + i).val());
        }
    }
    //If Lift 8 - 10 (Other Work) is checked, add the time to r
    for (i = 8; i < 11; i++) {
        if ($("#" + d + "Lift" + i).is(":checked")) {
            r = r + convertToMinutes($("#" + d + "Time" + i).val());
        }
    }
    
    //If lift is checked for field trips, add time to r
    for (i = 11; i < 14; i++) {
        if ($("#" + d + "Lift" + i).is(":checked")) {
            r = r + (Number($("#" + d + "Time" + i).val()) * 60);
        }
    }
    var x = calculateTotal(r);
    x = (x === "0:00") ? "" : x;
    $("#" + d + "LiftTotal").val(x);
    setStorage(d + "LiftTotal", x);
}

//Daily leave checkboxes
function checkLeaveToggle (x) {
	"use strict";
    var y = x.substr(0, 3);
    checkAllDayLeave(y);
}

//Toggle lift checkboxes on/off, set them in storage and run totals
function checkRunTimeLift(x) {
	"use strict";
    var blnmatch = false,
		bln = false,
		y = x.substr(0, 3),
		i = 0,
		array = [y + "Lift1", y + "Lift2", y + "Lift3", y + "Lift4", y + "Lift5", y + "Lift6", y + "Lift7"];

    for (i; i < 7; i++) {
        if (array[i] === x) {
            bln = ($("#" + x).prop("checked") === true) ? true : false;
            blnmatch = true;
        }
    }
    if (blnmatch === true) {
        for (i = 0; i < 7; i++) {
            $("#" + array[i]).prop("checked", bln);
            setStorage(array[i], (bln === true) ? "1" : "0");
        }
    } else {
        bln = ($("#" + x).prop("checked") === true) ? true : false;
        setStorage(x, (bln === true) ? "1" : "0");
    }

    dailyLift(y);
    getWeeklyTotals();
}

//Load nav bar, figure out which day it is and then set that day as visible
function loadNavBar() {
	"use strict";
    var d = new Date(),
		day = d.getDay();
    if (day === 6) {
        day = 0;
    } else {
        day = day + 1;
    }
    toggleDay(day);
}

//On span click, make next day visible and hide other days
function moveRightNavBar() {
	"use strict";
    for (var i = 0; i < 6; i++) {
        if ($("#" + fullday[i]).is(":visible")) {
            $("#" + fullday[i]).hide();
            toggleDay(i + 1);
            break;
        }
    }
}

//On span click, make previous day visible and hide other days
function moveLeftNavBar() {
	"use strict";
    for (var i = 1; i < 7; i++) {
        if ($("#" + fullday[i]).is(":visible")) {
            $("#" + fullday[i]).hide();
            toggleDay(i - 1);
            break;
        }
    }
}

function checkSpanVal (day) {
	"use strict";
    var bln = false,
        elemID = "",
        spanArray = ["SpanLV", "SpanOW8", "SpanOW9", "SpanOW10", "SpanFT11", "SpanFT12", "SpanFT13"];
    
    for (var i = 0; i < 7; i++) {
        elemID = day + spanArray[i];
        bln = spanToggleTextVal(elemID);
        
        if (bln === true) {
            $("." + elemID).css("display", "flex");
            $("#" + elemID).addClass("fa-angle-up").removeClass("fa-angle-down");
        } else {
            $("." + elemID).css("display", "none");
            $("#" + elemID).addClass("fa-angle-down").removeClass("fa-angle-up");
        }
    }
}

function togglePupilCounts (day) {
    var i = 0,
        j = 0,
        bln = false;
    
    for (i = 2; i < 7; i++) {
        bln = false;
        if (days[i] === day) {
            bln = true;
        }
        for (j = 1; j < 6; j++) {
            $("#" + days[i] + "AM" + j + "Ct").css("display", (bln === true) ? "flex" : "none");
            $("#" + days[i] + "PM" + j + "Ct").css("display", (bln === true) ? "flex" : "none");
        }
        for (j = 1; j < 3; j++) {
            $("#" + days[i] + "PS" + j + "Ct").css("display", (bln === true) ? "flex" : "none");
            $("#" + days[i] + "SH" + j + "Ct").css("display", (bln === true) ? "flex" : "none");
            $("#" + days[i] + "LR" + j + "Ct").css("display", (bln === true) ? "flex" : "none");
        }
        $("#" + days[i] + "TimeAM").css("display", (bln === true) ? "flex" : "none");
        $("#" + days[i] + "TimePM").css("display", (bln === true) ? "flex" : "none");
    }
}


//Function for nav bar to show day and change text for arrows
function toggleDay(x) {
	"use strict";
    if (x > 0 && x < 6) {
        $("#" + fullday[x]).show();
        checkSpanVal(days[x]);
        $("#prev").text(fullday[x - 1]);
        $("#today").text(fullday[x]);
        $("#next").text(fullday[x + 1]);
    } else if (x === 0) {
        $("#" + fullday[x]).show();
        checkSpanVal(days[x]);
        $("#prev").text("");
        $("#today").text(fullday[x]);
        $("#next").text(fullday[x + 1]);
    } else if (x === 6) {
        $("#" + fullday[x]).show();
        checkSpanVal(days[x]);
        $("#prev").text(fullday[x - 1]);
        $("#today").text(fullday[x]);
        $("#next").text("");
    }
    togglePupilCounts(days[x]);
    if (x > 1 && x < 6) {
        $("#AMPupilcopy").show();
        $("#PMPupilcopy").show();
    } else {
        $("#AMPupilcopy").hide();
        $("#PMPupilcopy").hide();
    }
}

function getDailyTotals() {
    var i = 0;
    
    for (i; i < 7; i++) {
        dailyRuns(days[i]);
        dailyOther(days[i]);
        dailyFT(days[i]);
        dailyLift(days[i]);
    }
}

//Run calculations for the whole week and set the values into local storage
function getWeeklyTotals() {
    "use strict";
	sumCPay();
    
    //Clear Hours worked
    $("#TotalHW").val("");
    setStorage("TotalHW", "");
    sumCPay();

    var a, b, c, d, e, f, g, t;
    a = convertToMinutes(getStorage("MonRunTotal"));
    b = convertToMinutes(getStorage("TueRunTotal"));
    c = convertToMinutes(getStorage("WedRunTotal"));
    d = convertToMinutes(getStorage("ThuRunTotal"));
    e = convertToMinutes(getStorage("FriRunTotal"));
    t = calculateTotal(a + b + c + d + e);
    t = (t === "0:00") ? "" : t;
    setStorage("TotalRun", t);
    $("#TotalRun").val(t);

    a = convertToMinutes(getStorage("MonOtherTotal"));
    b = convertToMinutes(getStorage("TueOtherTotal"));
    c = convertToMinutes(getStorage("WedOtherTotal"));
    d = convertToMinutes(getStorage("ThuOtherTotal"));
    e = convertToMinutes(getStorage("FriOtherTotal"));
    f = convertToMinutes(getStorage("SatOtherTotal"));
    g = convertToMinutes(getStorage("SunOtherTotal"));
    t = calculateTotal(a + b + c + d + e + f + g);
    t = (t === "0:00") ? "" : t;
    setStorage("TotalOther", t);
    $("#TotalOther").val(t);

    a = Number(getStorage("MonFTTotal"));
    b = Number(getStorage("TueFTTotal"));
    c = Number(getStorage("WedFTTotal"));
    d = Number(getStorage("ThuFTTotal"));
    e = Number(getStorage("FriFTTotal"));
    f = Number(getStorage("SatFTTotal"));
    g = Number(getStorage("SunFTTotal"));
    t = a + b + c + d + e + f + g;
    t = setToFixed(t);
    setStorage("TotalFT", t);
    $("#TotalFT").val(t);

    a = convertToMinutes(getStorage("TotalRun"));
    b = convertToMinutes(getStorage("TotalOther"));
    t = a + b;
    t = Number(convertTotal(t));
    c = Number(getStorage("TotalFT"));
    t = t + c;
    t = t + Number($("#TotalHW").val());
    t = setToFixed(t);
    setStorage("TotalHW", t);
    $("#TotalHW").val(t);

    a = convertToMinutes(getStorage("MonLiftTotal"));
    b = convertToMinutes(getStorage("TueLiftTotal"));
    c = convertToMinutes(getStorage("WedLiftTotal"));
    d = convertToMinutes(getStorage("ThuLiftTotal"));
    e = convertToMinutes(getStorage("FriLiftTotal"));
    f = convertToMinutes(getStorage("SatLiftTotal"));
    g = convertToMinutes(getStorage("SunLiftTotal"));
    t = a + b + c + d + e + f + g;
    t = convertTotal(t);
    setStorage("TotalS2", t);
    $("#TotalS2").val(t);

    a = convertToMinutes(getStorage("TotalRun"));
    b = convertToMinutes(getStorage("TotalOther"));
    t = convertTotal(a + b);
    setStorage("Total1R", t);
    $("#Total1R").val(t);

    if ($("#OJT").prop("checked") === true) {
        var i = 0,
            j = 0;
        t = 0;
        for (i = 2; i < 7; i++) {
            for (j = 1; j < 11; j++) {
                if (getStorage(days[i] + "OJT" + j) === "1") {
                    t = t + convertToMinutes($("#" + days[i] + "Time" + j).val());
                }
            }
        }
    } else {
        t = 0;
    }
    t = convertTotal(t);
    setStorage("TotalS4", t);
    $("#TotalS4").val(t);
}
