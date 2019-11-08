function getDailyTotals() {
    const day = getDay();
    dailyRuns(day);
    dailyOther(day);
    dailyFT(day);
    dailyQL(day);

    getWeeklyTotals();
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

    //Calculate the difference in time
    calculateDiff(refID);

    setObject(refID);
}

//CHECK FOR OVERLAPPING TIME VALUES
function checkOverlap(refID) {
    "use strict";

    //Define variables
    let bln = false;
    let newStart;
    let newEnd;

    //If element has no value then return
    if (byID(refID).value === "")
        return;

    //Initialize variables
    let thisStart = (refID.substr(-1) === "S") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 6) + "S").value);
    let thisEnd = (refID.substr(-1) === "E") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 6) + "E").value);
    if (thisStart === thisEnd) {
        openPopUp("<p>Start time cannot match end time.</p>");
        byID(refID).value = "";
        return;
    }
    let numVal = Number(refID.substr(-3, 2));
    let day = getDay();

    let max = (day === "Sat" || day === "Sun") ? 33 : 42;
    let i = (day === "Sat" || day === "Sun") ? 20 : 11;

    for (i; i < max; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 22 && i < 30) continue;
        if ((day === "Sat" || day === "Sun") && i > 32 && i < 35) continue;
        if (i === 18 || i === 19) continue;
        if (i > 34 && i < 40) continue;
        if (i === numVal) continue;

        //Initialize newStart and newEnd
        newStart = convertToMinutes(byID(`Time${i}S`).value);
        //If newStart is blank then move to next i
        if (newStart === 0) continue;

        newEnd = convertToMinutes(byID(`Time${i}E`).value);
        if (newEnd === 0) continue;
        if (newStart > 900 && newEnd < 120) newEnd += 1440; //If start time is more than 3:00 PM and end time overlaps past midnight, add 24 hours to end time

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

//CALCULATE DIFFERENCE BETWEEN START AND END TIME
function calculateDiff(refID) {
    "use strict";
    //If refID is null or undefined then exit function
    if (refID === null || refID === undefined) return;
    let day = getDay();

    //Declare variables and initialize values
    let startTime = (refID.substr(-1) === "S") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 6) + "S").value);
    let endTime = (refID.substr(-1) === "E") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 6) + "E").value);
    let num = Number(refID.substr(-3, 2));
    let timeDiff = 0;
    let totalID = refID.substr(0, refID.length - 1);

    //If end time is less than start time then pop up error message
    if (startTime > 900 && endTime < 120) endTime += 1440; //If start time is more than 3:00 PM and end time overlaps past midnight, add 24 hours to end time
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
    objThis[day][`${day}${totalID}`] = byID(totalID).value;
}

//CALCULATE DAILY RUN TIME
function dailyRuns(day) {
    "use strict";
    if (day === "Sat" || day === "Sun") return;

    const sum = calculateTotal(calculateRunTime(day));

    byID(`RunTotal`).value = sum;
    objThis[day][`${day}RunTotal`] = sum;
}

//CALCULATE DAILY OTHER WORK TIME
function dailyOther(day) {
    "use strict";
    //Declare variables and initialize values
    let sum = 0;
    let selectVal;

    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        selectVal = byID(`Select${i}`).value;
        if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
        sum += convertToMinutes(byID(`Time${i}`).value);
    }
    sum = calculateTotal(sum);
    byID(`OtherTotal`).value = sum;
}

//CALCULATE DAILY FIELD TRIP TIME
function dailyFT(day) {
    "use strict";
    //Declare variables and initialize values
    let sum = 0;

    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 33) break;
        sum += Number(getBlankTime(`Time${i}`));
    }
    sum = setToFixed(sum);
    byID(`FTTotal`).value = sum;
}

function getBlankTime(refID) {
    return byID(refID).value === "" ? 0 : byID(refID).value;
}

//CALCULATE DAILY Q/L TIME
function dailyQL(day) {
    "use strict";
    let sum = 0;

    //If Q/L is checked, total up run, pac, shuttles, late run time
    if (day !== "Sat" && day !== "Sun" && byID('QL11').checked) {
        for (let i = 11; i < 18; i += 1) {
            sum += convertToMinutes(byID(`Time${i}`).value);
        }
    }

    //If Other Work Q/L is checked, add the time
    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 22) continue;
        sum += (byID(`QL${i}`).checked) ? convertToMinutes(byID(`Time${i}`).value) : 0;
    }

    //If Q/L is checked for field trips, add time
    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 32) continue;
        sum += (byID(`QL${i}`).checked) ? (Number(getBlankTime(`Time${i}`)) * 60) : 0;
    }
    sum = calculateTotal(sum);
    byID(`QLTotal`).value = sum;
}

function calculateRunTime(day) {
    let sum = 0;
    for (let j = 11; j < 18; j++) {
        sum += convertToMinutes(objThis[day][`${day}Time${j}`]);
    }
    return sum;
}

function calculateOtherTime(day, j) {
    const selectVal = objThis[day][`${day}Select${j}`];
    if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") return 0;
    return convertToMinutes(objThis[day][`${day}Time${j}`]);
}

function calculateOtherTime2(j) {
    const selectVal = objThis[`Select${j}`];
    if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") return 0;
    return convertToMinutes(objThis[`Time${j}`]);
}

function getWeeklyTotals() {
    //Declare variables and initialize the values
    let sum = 0;

    //Clear Hours worked
    byID("TotalHW").value = "";
    setDataKeyValue("TotalHW", "");
    sumCPay();

    if (optVal === "") {
        for (const day of weekdays)
            sum += calculateRunTime(day);

        sum = calculateTotal(sum);
        setDataKeyValue("TotalRun", sum);
        byID("TotalRun").value = sum;
    }

    sum = 0;
    for (let j = 20; j < 30; j++) {
        for (const day of days) {
            if (day === "Mon" && optVal !== "") break;
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            sum += (optVal === "") ? calculateOtherTime(day, j) : calculateOtherTime2(j);
        }
    }

    sum = calculateTotal(sum);
    setDataKeyValue("TotalOther", sum);
    byID("TotalOther").value = sum;

    sum = 0;
    for (let j = 30; j < 35; j++) {
        for (const day of days) {
            if (day === "Mon" && optVal !== "") break;
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            sum += (optVal === "") ? Number(objThis[day][`${day}Time${j}`]) : Number(objThis[`Time${j}`]);
        }
    }
    sum = setToFixed(sum);
    setDataKeyValue("TotalFT", sum);
    byID("TotalFT").value = sum;


    sum = convertToMinutes(objThis.Data.TotalRun) + convertToMinutes(objThis.Data.TotalOther);
    sum = convertTotal(sum);
    sum = (sum === "") ? 0 : Number(sum);
    sum += Number(objThis.Data.TotalFT);
    sum += Number(byID("TotalHW").value);
    sum = setToFixed(sum);
    setDataKeyValue("TotalHW", sum);
    byID("TotalHW").value = sum;

    sum = 0;
    for (const day of weekdays) {
        if (objThis[day][`${day}QL11`]) {
            sum += convertToMinutes(objThis[day][`${day}Time11`]);
            sum += convertToMinutes(objThis[day][`${day}Time12`]);
            sum += convertToMinutes(objThis[day][`${day}Time13`]);
            sum += convertToMinutes(objThis[day][`${day}Time14`]);
            sum += convertToMinutes(objThis[day][`${day}Time15`]);
            sum += convertToMinutes(objThis[day][`${day}Time16`]);
            sum += convertToMinutes(objThis[day][`${day}Time17`]);
        }

        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            sum += (objThis[day][`${day}QL${j}`]) ? convertToMinutes(objThis[day][`${day}Time${j}`]) : 0;
        }

        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            sum += (objThis[day][`${day}QL${j}`]) ? (Number(objThis[day][`${day}Time${j}`]) * 60) : 0;
        }
    }
    sum = convertTotal(sum);
    setDataKeyValue("TotalS2QL", sum);
    byID("TotalS2QL").value = sum;

    sum = 0;
    for (const day of weekdays) {
        if (objThis[day][`${day}J11`]) {
            sum += convertToMinutes(objThis[day][`${day}Time11`]);
            sum += convertToMinutes(objThis[day][`${day}Time12`]);
            sum += convertToMinutes(objThis[day][`${day}Time13`]);
            sum += convertToMinutes(objThis[day][`${day}Time14`]);
            sum += convertToMinutes(objThis[day][`${day}Time15`]);
            sum += convertToMinutes(objThis[day][`${day}Time16`]);
            sum += convertToMinutes(objThis[day][`${day}Time17`]);
        }
    }
    sum = convertTotal(sum);
    setDataKeyValue("TotalS4J", sum);
    byID("TotalS4J").value = sum;

    sum = convertToMinutes(objThis.Data.TotalRun) + convertToMinutes(objThis.Data.TotalOther);
    sum += (objThis.Data.Area === "TC") ? 0 : 15;
    sum = convertTotal(sum);
    setDataKeyValue("Total1R", sum);
    byID("Total1R").value = sum;

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!objThis.Data.OJT) {
        setStorage();
        return;
    }

    for (const day of weekdays) {
        for (let j = 11; j < 18; j++) {
            sum += (objThis[day][`${day}OJT${j}`]) ? convertToMinutes(objThis[day][`${day}Time${j}`]) : 0;
        }

        for (let j = 20; j < 30; j++) {
            sum += (objThis[day][`${day}OJT${j}`]) ? convertToMinutes(objThis[day][`${day}Time${j}`]) : 0;
        }

        for (let j = 30; j < 35; j++) {
            sum += (objThis[day][`${day}OJT${j}`]) ? (Number(objThis[day][`${day}Time${j}`]) * 60) : 0;
        }
    }
    sum = convertTotal(sum);
    setDataKeyValue("TotalS4OJT", sum);
    byID("TotalS4OJT").value = sum;
    setStorage();
}
//CALCULATE CALLBACK TIME
function sumCPay() {
    "use strict";
    let c1 = 0;
    let c3 = 0;
    let sum = 0;
    let selectVal;

    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j === 23) break;
            selectVal = objThis[day][`${day}Select${j}`];
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes(objThis[day][`${day}Time${j}`]) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes(objThis[day][`${day}Time${j}`]) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes(objThis[day][`${day}Time${j}`]) : 0;
        }
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    objThis.Data.TotalC1 = c1;
    byID("TotalC1").value = c1;

    sum = convertTotal(sum);
    objThis.Data.TotalHW = sum;
    byID("TotalHW").value = sum;

    c3 = (c3 === 0) ? "" : convertTotal(c3);
    objThis.Data.TotalC3 = c3;
    byID("TotalC3").value = c3;
}
