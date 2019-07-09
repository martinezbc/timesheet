// JavaScript Document

//Declare variables
var fullday = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

//******************STARTING TEXTBOX FUNCTIONS******************//
//Check for overlaps and run calculation
function textboxUpdate(refID) {
  
    //Check if field is used for pupil time, return if true
    if (isNaN(refID.substr(7,2)))
        return;
    
    if (refID.indexOf("Sup") > -1) {
        textboxUpdateSup(refID);
        return;
    }
    
    //Check for overlapping times
    checkOverlap(refID);
    
    //Calculate the difference in time
    calculateDiff(refID);
    
    getDailyTotals();
    
    if (refID.substr(7,2) > 19 && refID.substr(7,2) < 30) {
		countOtherWork(refID);
	}
    
    if (refID.substr(7,2) > 29 && refID.substr(7,2) < 35) {
		countFieldTrips(refID);
	}
    setLocalStorage(refID);
}

//CHECK FOR OVERLAPPING TIME VALUES
function checkOverlap(refID) {
	"use strict";
    
    //Define variables
    var thisStart, thisEnd, numVal, bln = false, day, newStart, newEnd, i = 11, max = 43;
    
    //If element has no value then return
    if ($("#" + refID).val() === "") 
        return;
    
    //Initialize variables
    thisStart = (refID.substr(-1) === "S")  ? convertToMinutes($("#" + refID).val()) : convertToMinutes($("#" + refID.substr(0,9) + "S").val());
    thisEnd = (refID.substr(-1) === "E")  ? convertToMinutes($("#" + refID).val()) : convertToMinutes($("#" + refID.substr(0,9) + "E").val());
    numVal = Number(refID.substr(7, 2));
    day = refID.substr(0,3);
    
    if (day === "Sat" || day === "Sun") {
        max = 35;
        i = 20;
    }
    
    for (i; i < max; i++) {
        if (i === numVal)
            i++;
        
        //If the timefield does not exist then move to next i
        if (!$("#" + day + "Time" + i).length > 0) 
            continue;
        
        //Initialize newStart and newEnd
        newStart = convertToMinutes($("#" + day + "Time" + i + "S").val());
        newEnd = convertToMinutes($("#" + day + "Time" + i + "E").val());
        
        //If both newStart and newEnd are blank then move to next i
        if (newStart === 0 && newEnd === 0) 
            continue;
        
        if (newStart === thisStart) 
            bln = true;
       
        if (thisStart > 0 && thisStart > newStart && thisStart < newEnd)
            bln = true;
                
        if (thisEnd > 0 && thisEnd > newStart && thisEnd < newEnd)
            bln = true;

        if (thisStart === newStart) 
            bln = true;

        if (thisEnd === newEnd) 
            bln = true;

        if (thisStart < newStart && thisEnd > newEnd) 
            bln = true;
    }
    
    //If bln is true then there is an overlap
    if (bln) {
        openPopUp("<p>Overlap error</p>");
        $("#" + refID).val("");
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
    //If refID is null or undefined then exit function
	if (refID === null || refID === undefined)
        return;
    
    //Declare variables and initialize values
    var startTime = (refID.substr(-1) === "S")  ? convertToMinutes($("#" + refID).val()) : convertToMinutes($("#" + refID.substr(0,9) + "S").val()),
        endTime = (refID.substr(-1) === "E")  ? convertToMinutes($("#" + refID).val()) : convertToMinutes($("#" + refID.substr(0,9) + "E").val()),
        num = Number(refID.substr(7, 2)),
        timeDiff = 0,
        totalID = refID.substr(0, refID.length - 1);

    //If end time is less than start time then pop up error message
    if ((endTime < startTime) && (endTime !== 0)) {
        openPopUp("<p>End time is less than start time</p>");
        $("#" + refID).val("");
    } else {
        if (endTime === 0) 
            endTime = startTime;

        timeDiff = endTime - startTime;
        
        if (num > 29)
            $("#" + totalID).val(convertTotal(timeDiff));
        else
            $("#" + totalID).val(calculateTotal(timeDiff));
    }
    //Set value of total into storage
    setStorage(totalID, $("#" + totalID).val());
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
    var m1 = convertToMinutes($("#" + day + "Time11").val()),
        m2 = convertToMinutes($("#" + day + "Time12").val()),
        m3 = convertToMinutes($("#" + day + "Time13").val()),
        m4 = convertToMinutes($("#" + day + "Time14").val()),
        m5 = convertToMinutes($("#" + day + "Time15").val()),
        m6 = convertToMinutes($("#" + day + "Time16").val()),
        m7 = convertToMinutes($("#" + day + "Time17").val()),
        totalVal = m1 + m2 + m3 + m4 + m5 + m6 + m7;
    totalVal = calculateTotal(totalVal);
    totalVal = (totalVal === "0:00") ? "" : totalVal;
    $("#" + day + "RunTotal").val(totalVal);
    setStorage(day + "RunTotal", totalVal);
}

//Other Work Times
function dailyOther(day) {
	"use strict";
    //Declare variables and initialize values
    var sum = 0, selectVal;
    
    for (var i = 20; i < 30; i++) {
        if (!$("#" + day + "Time" + i).length > 0)
            continue;
        
        selectVal = $("#" + day + "Select" + i).val();
        sum += (selectVal !== "CBK" && selectVal !== "ES0" && selectVal !== "ES2") ? convertToMinutes($("#" + day + "Time" + i).val()) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    $("#" + day + "OtherTotal").val(sum);
    setStorage(day + "OtherTotal", sum);
}

//Total up Specialty Pay
function sumCPay() {
	"use strict";
    var c1 = 0,
        c3 = 0,
        i = 0,
        j = 20,
        sum = 0,
        selectVal;
    
    for (i; i < 7; i++) {
        for (j; j < 30; j++) {
            if (!$("#" + days[i] + "Time" + j).length > 0)
                continue;

            selectVal = $("#" + days[i] + "Select" + j).val();
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes($("#" + days[i] + "Time" + j).val()) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes($("#" + days[i] + "Time" + j).val()) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes($("#" + days[i] + "Time" + j).val()) : 0;
        }
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    setStorage("TotalC1", c1);
    $("#TotalC1").val(c1);

    sum = convertTotal(sum);
    setStorage("TotalHW", sum);
    $("#TotalHW").val(sum);
    
    c3 = (c3 === 0) ? "" : convertTotal(c3);
    setStorage("TotalC3", c3);
    $("#TotalC3").val(c3);
}

//Field Trip Times
function dailyFT(day) {
    "use strict";
    //Declare variables and initialize values
    var sum = 0;
    
    for (var i = 30; i < 35; i++) {
        if (!$("#" + day + "Time" + i).length > 0)
            continue;
        
        sum += Number($("#" + day + "Time" + i).val());
    }
    sum = setToFixed(sum);
    $("#" + day + "FTTotal").val(sum);
    setStorage(day + "FTTotal", sum);
}

//Lift Time
function dailyLift(day) {
	"use strict";
    var sum = 0,
		i = 0;
    
    //If EQ/L is checked, total up run, pac, shuttles, late run time
    if ($("#" + day + "Lift11").is(":checked")) {
        for (i = 11; i < 18; i++) {
            sum += convertToMinutes($("#" + day + "Time" + i).val());
        }
    }
    //If Other Work EQ/L is checked, add the time
    for (i = 20; i < 30; i++) {
        if (!$("#" + day + "Time" + i).length > 0)
            continue;
        
        if ($("#" + day + "Lift" + i).is(":checked")) 
            sum += convertToMinutes($("#" + day + "Time" + i).val());
    }
    
    //If EQ/L is checked for field trips, add time
    for (i = 30; i < 35; i++) {
        if (!$("#" + day + "Time" + i).length > 0)
            continue;
        
        if ($("#" + day + "Lift" + i).is(":checked")) 
            sum += (Number($("#" + day + "Time" + i).val()) * 60);
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    $("#" + day + "LiftTotal").val(sum);
    setStorage(day + "LiftTotal", sum);
}

//Daily leave checkboxes
function checkLeaveToggle (refID) {
	"use strict";
    var day = refID.substr(0, 3);
    checkAllDayLeave(day);
}

//Toggle lift checkboxes on/off, set them in storage and run totals
function checkboxEQL(refID) {
	"use strict";
    var blnmatch = false,
		bln = false,
		day = refID.substr(0, 3),
		i = 0,
		array = [day + "Lift11", day + "Lift12", day + "Lift13", day + "Lift14", day + "Lift15", day + "Lift16", day + "Lift17"];

    for (i; i < 7; i++) {
        if (array[i] === refID) {
            bln = ($("#" + refID).prop("checked")) ? true : false;
            blnmatch = true;
            break;
        }
    }
    if (blnmatch) {
        for (i = 0; i < 7; i++) {
            $("#" + array[i]).prop("checked", bln);
            setStorage(array[i], (bln) ? "1" : "0");
        }
    } else {
        bln = ($("#" + refID).prop("checked")) ? true : false;
        setStorage(refID, (bln) ? "1" : "0");
    }

    dailyLift(day);
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
    var i = 0;
    for (i = 0; i < 7; i++) {
        if ($("#" + fullday[i]).is(":visible")) {
            $("#" + fullday[i]).hide();
            if (i === 6) {
                toggleDay(i - 6);
            } else {
                toggleDay(i + 1);
            }
            break;
        }
    }
    
}

//On span click, make previous day visible and hide other days
function moveLeftNavBar() {
	"use strict";
    for (var i = 0; i < 7; i++) {
        if ($("#" + fullday[i]).is(":visible")) {
            $("#" + fullday[i]).hide();
            if (i === 0) {
                toggleDay(i + 6);
            } else {
                toggleDay(i - 1);
            }
            break;
        }
    }
}

function togglePupilCounts (day, intDay) {
    var i = 0,
        j = 0,
        bln = false;
    
    for (i = 2; i < 7; i++) {
        bln = false;
        if (days[i] === day) {
            bln = true;
        }
        if (getStorage("Position").indexOf("Driver") >= 0) {
            if (intDay > 1 && intDay < 6) {
                $("#AMPupilcopy").show();
                $("#PMPupilcopy").show();
            } else {
                $("#AMPupilcopy").hide();
                $("#PMPupilcopy").hide();
            }
            $(".att").each(function() {
                $(this).css("display", "flex");
            });
        } else {
            bln = false;
            $("#AMPupilcopy").hide();
            $("#PMPupilcopy").hide();
            $(".att").each(function() {
                $(this).css("display", "none");
            });
        }
        for (j = 1; j < 6; j++) {
            $("#" + days[i] + "AM" + j + "Ct").css("display", (bln) ? "flex" : "none");
            $("#" + days[i] + "PM" + j + "Ct").css("display", (bln) ? "flex" : "none");
        }
        for (j = 1; j < 3; j++) {
            $("#" + days[i] + "PS" + j + "Ct").css("display", (bln) ? "flex" : "none");
            $("#" + days[i] + "SH" + j + "Ct").css("display", (bln) ? "flex" : "none");
            $("#" + days[i] + "LR" + j + "Ct").css("display", (bln) ? "flex" : "none");
        }
        $("#" + days[i] + "TimeAM").css("display", (bln) ? "flex" : "none");
        $("#" + days[i] + "TimePM").css("display", (bln) ? "flex" : "none");
    }
    
}


//Function for nav bar to show day and change text for arrows
function toggleDay(x) {
	"use strict";
    var obj = "";
    if (x > 0 && x < 6) {
        $("#" + fullday[x]).show();
        $("#prev").text(days[x - 1] + "-" + getStorage(days[x - 1] + "Date"));
        $("#today").text(days[x] + "-" + getStorage(days[x] + "Date"));
        $("#next").text(days[x + 1] + "-" + getStorage(days[x + 1] + "Date"));
    } else if (x === 0) {
        $("#" + fullday[x]).show();
        $("#prev").text(days[x + 6] + "-" + getStorage(days[x + 6] + "Date"));
        $("#today").text(days[x] + "-" + getStorage(days[x] + "Date"));
        $("#next").text(days[x + 1] + "-" + getStorage(days[x + 1] + "Date"));
    } else if (x === 6) {
        $("#" + fullday[x]).show();
        $("#prev").text(days[x - 1] + "-" + getStorage(days[x - 1] + "Date"));
        $("#today").text(days[x] + "-" + getStorage(days[x] + "Date"));
        $("#next").text(days[x - 6] + "-" + getStorage(days[x - 6] + "Date"));
    }
    togglePupilCounts(days[x], x);
}

function getDailyTotals() {
    for (var i = 0; i < 7; i++) {
        dailyRuns(days[i]);
        dailyOther(days[i]);
        dailyFT(days[i]);
        dailyLift(days[i]);
    }
}

//Run calculations for the whole week and set the values into local storage
function getWeeklyTotals() {
    //Declare variables and initialize the values
    var i = 0, sum = 0, j = 0;
    
    //Clear Hours worked
    $("#TotalHW").val("");
    setStorage("TotalHW", "");
    sumCPay();

    for (i = 2; i < 7; i++) {
        sum += convertToMinutes(getStorage(days[i] + "RunTotal"));
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    setStorage("TotalRun", sum);
    $("#TotalRun").val(sum);

    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += convertToMinutes(getStorage(days[i] + "OtherTotal"));
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    setStorage("TotalOther", sum);
    $("#TotalOther").val(sum);
    
    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += Number(getStorage(days[i] + "FTTotal"));
    }
    sum = setToFixed(sum);
    setStorage("TotalFT", sum);
    $("#TotalFT").val(sum);

    
    sum = convertToMinutes(getStorage("TotalRun")) + convertToMinutes(getStorage("TotalOther"));
    sum = Number(convertTotal(sum));
    sum += Number(getStorage("TotalFT"));
    sum += Number($("#TotalHW").val());
    sum = setToFixed(sum);
    setStorage("TotalHW", sum);
    $("#TotalHW").val(sum);

    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += convertToMinutes(getStorage(days[i] + "LiftTotal"));
    }
    sum = convertTotal(sum);
    setStorage("TotalS2", sum);
    $("#TotalS2").val(sum);

    sum = convertToMinutes(getStorage("TotalRun")) + convertToMinutes(getStorage("TotalOther"));
    sum = convertTotal(sum);
    setStorage("Total1R", sum);
    $("#Total1R").val(sum);

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!$("#OJT").prop("checked")) 
        return;
    
    for (i = 2; i < 7; i++) {
        for (j = 11; j < 30; j++) {
            if (!$("#" + days[i] + "Time" + j).length > 0)
                continue;

            if ($("#" + days[i] + "OJT" + j).prop("checked"))
                sum += convertToMinutes($("#" + days[i] + "Time" + j).val());
        }
    }
    sum = convertTotal(sum);
    setStorage("TotalS4", sum);
    $("#TotalS4").val(sum);
}
