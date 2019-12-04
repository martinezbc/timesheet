const url = window.location.pathname;
const filename = url.substring(url.lastIndexOf('/') + 1);
const optVal = (filename === "index2.html" || filename === "previewsup.html" || filename === "supplement.html") ? "Sup" : ""

const days = (optVal === "") ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["Sup"];
const fullday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdays = (optVal === "") ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : ["Sup"];

function byID(refID) {
    return document.getElementById(refID);
}

function getDailyTotals() {
    if (optVal !== "Sup") {
        const day = getDay();
        dailyRuns(day);
        dailyOther(day);
        dailyFT(day);
        dailyQL(day);
        dailyTotals(day);
    }

    getWeeklyTotals();
}

//CONVERT TIME COMPLETELY TO MINUTES
function convertToMinutes(s1) {
    "use strict";
    if (s1 === "" || s1 === null || s1 === undefined || s1 === "")return 0;
    let blnTimeFormat = s1.endsWith("AM") || s1.endsWith("PM") ? true : false;
    let blnPM = (s1.endsWith("PM")) ? true : false;
    
    let temp = s1.replace(" AM", "").replace(" PM", "");
    let time = temp.split(":");
    let hour = time[0];

    if (hour === "12" && !blnPM && blnTimeFormat) hour = 0; //If hour is 12 and it's not a PM and it IS in time format

    hour = hour * 60;

    let min = round5(Number(time[1])) + hour;

    if (blnPM && hour !== 720) min += 720;

    return min;
}
//RETURN TIME AS H:MM FORMAT
function calculateTotal(refVal) {
    "use strict";
    if (refVal === "" || refVal === null || refVal === undefined || refVal === "")
        return "";

    let hour = Math.floor(refVal / 60),
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
    let hour = Math.floor(refVal / 60),
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
//ROUND TO THE NEAREST 5
function round5(x) {
    "use strict";
    return Math.round(x / 5) * 5;
}

//TEXTBOX UPDATE FUNCTION. CHECK FOR OVERLAPPING TIME AND THEN CALCULATE TOTAL TIME
function timeCalculation(refID) {
    let num = Number(refID.substr(-3, 2));
    let day = getDay();

    //Check if field is used for pupil time, return if true
    const a = refID.substr(-1);
    if (a === "A" || a === "B" || a === "C" || a === "D") {
        setObject(refID);
        return;
    }

    if (num > 19 && num < 30) {
        if (byID(`Select${num}`).value === "") {
            openPopUp("<p>Work type must be selected first</p>");
            byID(refID).value = "";
            return;
        }
    }
    //Check for overlapping times
    checkOverlap(refID);
    
    setObject(refID);

    //Calculate the difference in time
    byID(`Time${num}`).value = (num > 29) ? convertTotal(calculateDiff(day, num)) : calculateTotal(calculateDiff(day, num));
}

//CALCULATE DIFFERENCE BETWEEN START AND END TIME
function calculateDiff(day, i) {
    //Declare variables and initialize values
    let startTime = convertToMinutes(objThis[day][`${day}Time${i}S`]);
    let endTime = convertToMinutes(objThis[day][`${day}Time${i}E`]);
    let timeDiff = 0;

    //If end time is less than start time then pop up error message
    if (startTime > 900 && (endTime < 120 && endTime !== 0)) endTime += 1440; //If start time is more than 3:00 PM and end time overlaps past midnight, add 24 hours to end time
    if ((endTime < startTime) && (endTime !== 0)) {
        openPopUp("<p>End time is less than start time</p>");
        resetTime(i);
    } else {
        if (endTime === 0) endTime = startTime;

        timeDiff = endTime - startTime;
        return timeDiff;
    }
}

//CALCULATE DAILY RUN TIME
function dailyRuns(day) {
    if (day === "Sat" || day === "Sun") return;
    const sum = calculateTotal(calculateRunTime(day));
    byID(`RunTotal`).value = sum;
}

//CALCULATE DAILY OTHER WORK TIME
function dailyOther(day) {
    const sum = calculateTotal(calculateOtherTime(day));
    byID(`OtherTotal`).value = sum;
}

//CALCULATE DAILY FIELD TRIP TIME
function dailyFT(day) {
    const sum = convertTotal(calculateFieldTrip(day));
    byID(`FTTotal`).value = sum;
}

function dailyTotals(day) {
    for (let j = 11; j < 18; j++) {
        byID(`Time${j}`).value = calculateTotal(calculateDiff(day, j));
    }
    for (let j = 20; j < 30; j++) {
        byID(`Time${j}`).value = calculateTotal(calculateDiff(day, j));
    }
    for (let j = 30; j < 35; j++) {
        byID(`Time${j}`).value = convertTotal(calculateDiff(day, j));
    }
    for (let j = 40; j < 42; j++) {
        byID(`Time${j}`).value = convertTotal(calculateDiff(day, j));
    }
}

//CALCULATE DAILY Q/L TIME
function dailyQL(day) {
    "use strict";
    let sum = 0;

    //If Q/L is checked, total up run, pac, shuttles, late run time
    if (day !== "Sat" && day !== "Sun" && byID('QL11').checked) {
        for (let i = 11; i < 18; i += 1) {
            sum += calculateDiff(day, i);
        }
    }

    //If Other Work Q/L is checked, add the time
    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 22) continue;
        sum += (byID(`QL${i}`).checked) ? calculateDiff(day, i) : 0;
    }

    //If Q/L is checked for field trips, add time
    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 32) continue;
        sum += (byID(`QL${i}`).checked) ? convertTotal(calculateDiff(day, i)) * 60 : 0;
    }
    sum = calculateTotal(sum);
    byID(`QLTotal`).value = sum;
}

function calculateRunTime(day) {
    let sum = 0;
    for (let j = 11; j < 18; j++) {
        sum += calculateDiff(day, j);
    }
    return sum;
}

function calculateOtherTime(day) {
    let sum = 0;
    let selectVal;

    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        selectVal = objThis[day][`${day}Select${i}`];
        if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
        sum += calculateDiff(day, i);
    }
    return sum;
}

function calculateFieldTrip(day) {
    let sum = 0;

    for (let j = 30; j < 35; j += 1) {
        if ((day === "Sat" || day === "Sun") && j === 33) break;
        sum += calculateDiff(day, j);
    }
    return sum;
}

function calculateEquipment() {
    let sum = 0;

    for (const day of days) {

        for (let j = 11; j < 18; j++) {
            if (day === "Sat" || day === "Sun" || day === "Sup") continue;
            sum += (objThis[day][`${day}QL11`]) ? calculateDiff(day, j) : 0;
        }

        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            sum += (objThis[day][`${day}QL${j}`]) ? calculateDiff(day, j) : 0;
        }

        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            sum += (objThis[day][`${day}QL${j}`]) ? convertTotal(calculateDiff(day, j)) * 60 : 0;
        }
    }
    return sum;
}

function calculateAdmin() {
    let sum = 0;
    for (const day of days) {

        for (let i = 11; i < 18; i++) {
            if (day === "Sat" || day === "Sun" || day === "Sup") continue;
            sum += (objThis[day][`${day}J11`]) ? calculateDiff(day, i) : 0;
        }
    }
    return sum;
}

function calculateOJT() {
    let sum = 0;
    for (const day of days) {
        for (let j = 11; j < 18; j++) {
            if (day === "Sat" || day === "Sun" || day === "Sup") continue;
            sum += (objThis[day][`${day}OJT${j}`]) ? calculateDiff(day, j) : 0;
        }

        for (let j = 20; j < 30; j++) {
            sum += (objThis[day][`${day}OJT${j}`]) ? calculateDiff(day, j) : 0;
        }

        for (let j = 30; j < 35; j++) {
            sum += (objThis[day][`${day}OJT${j}`]) ? convertTotal(calculateDiff(day, j)) * 60 : 0;
        }
    }
    return sum;
}

function calculateHoursWorked() {
    let sum = 0;

    for (const day of days) {
        for (let j = 11; j < 30; j++) {
            if (j === 18 || j === 19) continue;
            if ((day === "Sat" || day === "Sun") && j === 23) continue;
            sum += calculateDiff(day, j);
        }
        
        for (let j = 30; j < 35; j++) {
            sum += convertTotal(calculateDiff(day, j)) * 60;
        }
    }
    if (optVal === "") {
        if (objThis.Data.Area !== "TC") sum += 15;
    }
    return sum;
}

function weeklyRunTime() {
    let sum = 0;
    for (const day of weekdays)
            sum += calculateRunTime(day);
    return sum;
}

function weeklyOtherTime() {
    let sum = 0;
    for (const day of days) {
        sum += calculateOtherTime(day);
    }
    return sum;
}

function weeklyFieldTripTime() {
    let sum = 0;
    for (const day of days) {
        sum += calculateFieldTrip(day);
    }
    return sum;
}

function weeklyC1Time() {
    let sum = 0;
    let selectVal;

    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j === 23) break;
            selectVal = objThis[day][`${day}Select${j}`];
            sum += (selectVal === "CBK") ? 240 : 0;
        }
    }
    return sum;
}

function weeklyC3Time() {
    let sum = 0;
    let selectVal;

    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j === 23) break;
            selectVal = objThis[day][`${day}Select${j}`];
            sum += (selectVal === "ES0") ? calculateDiff(day, j) : 0;
            sum += (selectVal === "ES2") ? calculateDiff(day, j) + 120 : 0;
        }
    }
    return sum;
}

function getWeeklyTotals() {
    //Declare variables and initialize the values
    const key = (optVal === "") ? "Data" : "Sup";

    byID("TotalC1").value = convertTotal(weeklyC1Time());

    byID("TotalC3").value = convertTotal(weeklyC3Time());

    //CALCULATE RUN TIME
    if (optVal === "") {
        const runTime = calculateTotal(weeklyRunTime());
        byID("TotalRun").value = runTime;
    }

    //CALCULATE OTHER WORK
    const otherTime = calculateTotal(weeklyOtherTime());
    byID("TotalOther").value = otherTime;

    //CALCULATE FIELD TRIPS
    const ftTime = convertTotal(weeklyFieldTripTime());
    byID("TotalFT").value = ftTime;

    //CALCULATE HOURS WORKED
    byID("TotalHW").value = convertTotal(calculateHoursWorked());

    //CALCULATE EQUIPMENT
    byID("TotalS2QL").value = convertTotal(calculateEquipment());

    //CALCULATE ADMIN
    byID("TotalS4J").value = convertTotal(calculateAdmin());

    //CALCULATE 1R
    byID("Total1R").value = convertTotal(weeklyRunTime() + weeklyOtherTime());

    //If OJT Trainer is not checked then exit function
    if (objThis[key]["OJT"]) {
        byID("TotalS4OJT").value = convertTotal(calculateOJT());    
    }
    
    //Set all data to storage
    setStorage();
}