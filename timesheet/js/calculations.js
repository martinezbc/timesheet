/****************************************CALCULATIONS****************************************/

//TEXTBOX UPDATE FUNCTION. CHECK FOR OVERLAPPING TIME AND THEN CALCULATE TOTAL TIME
function timeCalculation(refID) {
    //Check if field is used for pupil time, return if true
    if (isNaN(refID.substr(7,2)))
        return;

    //Check for overlapping times
    checkOverlap(refID);

    //Calculate the difference in time
    calculateDiff(refID);

    getDailyTotals();
    getWeeklyTotals();

    if (refID.substr(7,2) > 19 && refID.substr(7,2) < 30) {
		countOtherWork(refID);
	}

    if (refID.substr(7,2) > 29 && refID.substr(7,2) < 35) {
		countFieldTrips(refID);
	}
}

//CHECK FOR OVERLAPPING TIME VALUES
function checkOverlap(refID) {
	"use strict";

    //Define variables
    var bln = false, newStart, newEnd;

    //If element has no value then return
    if (byID(refID).value === "")
        return;

    //Initialize variables
    var thisStart = (refID.substr(-1) === "S")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "S").value);
    var thisEnd = (refID.substr(-1) === "E")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "E").value);
    if (thisStart === thisEnd) {
        openPopUp("<p>Start time cannot match end time.</p>");
        byID(refID).value = "";
        return;
    }
    var numVal = Number(refID.substr(7, 2));
    var day = refID.substr(0,3);

    var max = (day === "Sat" || day === "Sun") ? 33 : 43;
    var i = (day === "Sat" || day === "Sun") ? 20 : 11;

    for (i; i < max; i++) {
        i = (i === 18) ? 20 : i;
        i = ((day === "Sat" || day === "Sun") && i === 23) ? 30 : i;
        i = (i === 35) ? 41 : i;
        if (i === numVal) i++;
        if (i === max) break;

        //Initialize newStart and newEnd
        newStart = convertToMinutes(byID(day + "Time" + i + "S").value);
        //If newStart is blank then move to next i
        if (newStart === 0) continue;
        
        newEnd = convertToMinutes(byID(day + "Time" + i + "E").value);
        if (newStart === thisStart) {
            bln = true;  
        } else if (thisStart > 0 && thisStart > newStart && thisStart < newEnd) {
            bln = true;
        } else if (thisEnd > 0 && thisEnd > newStart && thisEnd < newEnd) {
            bln = true;
        } else if (thisStart === newStart) {
            bln = true;
        } else if (thisEnd === newEnd) {
            bln = true;
        } else if (thisStart < newStart && thisEnd > newEnd) {
            bln = true;
        }
        if (bln) break;
    }

    //If bln is true then there is an overlap
    if (bln) {
        openPopUp("<p>Overlap error</p>");
        byID(refID).value = "";
    }
}

//CONVERT TIME COMPLETELY TO MINUTES
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

//CALCULATE DIFFERENCE BETWEEN START AND END TIME
function calculateDiff(refID) {
    "use strict";
    //If refID is null or undefined then exit function
	if (refID === null || refID === undefined) return;

    //Declare variables and initialize values
    var startTime = (refID.substr(-1) === "S")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "S").value);
    var endTime = (refID.substr(-1) === "E")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "E").value);
    var num = Number(refID.substr(7, 2));
    var timeDiff = 0;
    var totalID = refID.substr(0, refID.length - 1);

    //If end time is less than start time then pop up error message
    if ((endTime < startTime) && (endTime !== 0)) {
        openPopUp("<p>End time is less than start time</p>");
        byID(refID).value = "";
    } else {
        if (endTime === 0) endTime = startTime;

        timeDiff = endTime - startTime;

        if (num > 29)
            byID(totalID).value = convertTotal(timeDiff);
        else
            byID(totalID).value = calculateTotal(timeDiff);
    }
    //Set value of total into storage
    setStorage(totalID, byID(totalID).value);
}

//RETURN TIME AS H:MM FORMAT
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
    totalVal = (totalVal === "0:00") ? "" : totalVal;
    return totalVal;
}

//RETURN TIME AS H.MM FORMAT
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

//SET TO FIXED TO 2 DECIMALS SO THAT A ZERO DECIMAL WILL DISPLAY AS .00
function setToFixed(refVal) {
    refVal = Number(refVal);
    if (refVal === 0) {
        return "";
    }
    refVal = Number(refVal).toFixed(2);
    return refVal;
}

//CALCULATE DAILY RUN TIME
function dailyRuns(day) {
	"use strict";
    if (day === "Sat" || day === "Sun") return;

    var sum = 0;
    for (var i = 11; i < 18; i++) {
        sum += convertToMinutes(byID(day + "Time" + i).value);
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "RunTotal").value = sum;
    setStorage(day + "RunTotal", sum);
}

//CALCULATE DAILY OTHER WORK TIME
function dailyOther(day) {
	"use strict";
    //Declare variables and initialize values
    var sum = 0, selectVal;

    for (var i = 20; i < 30; i++) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        selectVal = byID(day + "Select" + i).value;
        sum += (selectVal !== "CBK" && selectVal !== "ES0" && selectVal !== "ES2") ? convertToMinutes(byID(day + "Time" + i).value) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "OtherTotal").value = sum;
    setStorage(day + "OtherTotal", sum);
}

//CALCULATE CALLBACK TIME
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
            if ((days[i] === "Sat" || days[i] === "Sun") && j === 23) break;
            selectVal = byID(days[i] + "Select" + j).value;
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes(byID(days[i] + "Time" + j).value) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;
        }
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    setStorage("TotalC1", c1);
    byID("TotalC1").value = c1;

    sum = convertTotal(sum);
    setStorage("TotalHW", sum);
    byID("TotalHW").value = sum;

    c3 = (c3 === 0) ? "" : convertTotal(c3);
    setStorage("TotalC3", c3);
    byID("TotalC3").value = c3;
}

//CALCULATE DAILY FIELD TRIP TIME
function dailyFT(day) {
    "use strict";
    //Declare variables and initialize values
    var sum = 0;

    for (var i = 30; i < 35; i++) {
        if ((day === "Sat" || day === "Sun") && i === 33) break;
        sum += Number(byID(day + "Time" + i).value);
    }
    sum = setToFixed(sum);
    byID(day + "FTTotal").value = sum;
    setStorage(day + "FTTotal", sum);
}

//CALCULATE DAILY EQ/L TIME
function dailyLift(day) {
	"use strict";
    var sum = 0,
		i = 0;

    //If EQ/L is checked, total up run, pac, shuttles, late run time
    if (day !== "Sat" && day !== "Sun" && byID(day + "Lift11").checked) {
        for (i = 11; i < 18; i++) {
            sum += convertToMinutes(byID(day + "Time" + i).value);
        }
    }
    
    //If Other Work EQ/L is checked, add the time
    for (i = 20; i < 30; i++) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        sum += (byID(day + "Lift" + i).checked) ? convertToMinutes(byID(day + "Time" + i).value) : 0;
    }

    //If EQ/L is checked for field trips, add time
    for (i = 30; i < 35; i++) {
        if ((day === "Sat" || day === "Sun") && i === 33) break;
        sum += (byID(day + "Lift" + i).checked) ? (Number(byID(day + "Time" + i).value) * 60) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "LiftTotal").value = sum;
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
            bln = (byID(refID).checked) ? true : false;
            blnmatch = true;
            break;
        }
    }
    if (blnmatch) {
        for (i = 0; i < 7; i++) {
            byID(array[i]).prop("checked", bln);
            setStorage(array[i], (bln) ? "1" : "0");
        }
    } else {
        bln = (byID(refID).checked) ? true : false;
        setStorage(refID, (bln) ? "1" : "0");
    }

    dailyLift(day);
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
    byID("TotalHW").value = "";
    setStorage("TotalHW", "");
    sumCPay();

    for (i = 1; i < 6; i++) {
        sum += convertToMinutes(getStorage(days[i] + "RunTotal"));
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    setStorage("TotalRun", sum);
    byID("TotalRun").value = sum;

    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += convertToMinutes(getStorage(days[i] + "OtherTotal"));
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    setStorage("TotalOther", sum);
    byID("TotalOther").value = sum;

    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += Number(getStorage(days[i] + "FTTotal"));
    }
    sum = setToFixed(sum);
    setStorage("TotalFT", sum);
    byID("TotalFT").value = sum;


    sum = convertToMinutes(getStorage("TotalRun")) + convertToMinutes(getStorage("TotalOther"));
    sum = Number(convertTotal(sum));
    sum += Number(getStorage("TotalFT"));
    sum += Number(byID("TotalHW").value);
    sum = setToFixed(sum);
    setStorage("TotalHW", sum);
    byID("TotalHW").value = sum;

    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += convertToMinutes(getStorage(days[i] + "LiftTotal"));
    }
    sum = convertTotal(sum);
    setStorage("TotalS2", sum);
    byID("TotalS2").value = sum;

    sum = convertToMinutes(getStorage("TotalRun")) + convertToMinutes(getStorage("TotalOther"));
    sum = convertTotal(sum);
    setStorage("Total1R", sum);

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!byID("OJT").checked)
        return;

    for (i = 1; i < 6; i++) {
        for (j = 11; j < 35; j++) {
            j = (j === 18) ? 20 : j;
            sum += (byID(days[i] + "OJT" + j).checked) ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;
        }
    }
    sum = convertTotal(sum);
    setStorage("TotalS4", sum);
    byID("TotalS4").value = sum;
}
/****************************************CALCULATIONS****************************************/