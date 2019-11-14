function getDailyTotals() {
    if (optVal !== "S") {
        const day = getDay();
        dailyRuns(day);
        dailyOther(day);
        dailyFT(day);
        dailyQL(day);
    }

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

    const sum = calculateTotal(calculateOtherTime(day));
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

function calculateOtherTime(day) {
    let sum = 0;
    let selectVal;

    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        selectVal = objThis[day][`${day}Select${i}`];
        if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
        sum += convertToMinutes(objThis[day][`${day}Time${i}`]);
    }
    return sum;
}

function calculateFieldTrip(day) {
    let sum = 0;

    for (let j = 30; j < 35; j += 1) {
        if ((day === "Sat" || day === "Sun") && j === 33) break;
        sum += Number(objThis[day][`${day}Time${j}`]);
    }
    return sum;
}

function calculateEquipment() {
    let sum = 0;

    for (const day of days) {
        
        for (let i = 11; i < 18; i++) {
            if (day === "Sat" || day === "Sun" || day === "Sup") continue;
            sum += (objThis[day][`${day}QL11`]) ? convertToMinutes(objThis[day][`${day}Time${i}`]) : 0;
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
    return sum;
}

function calculateAdmin() {
    let sum = 0;
    for (const day of days) {
        
        for (let i = 11; i < 18; i++) {
            if (day === "Sat" || day === "Sun" || day === "Sup") continue;
            sum += (objThis[day][`${day}J11`]) ? convertToMinutes(objThis[day][`${day}Time${i}`]) : 0;
        }
    }
    return sum;
}

function calculateOJT() {
    let sum = 0;
    for (const day of days) {
        for (let j = 11; j < 18; j++) {
            if (day === "Sat" || day === "Sun" || day === "Sup") continue;
            sum += (objThis[day][`${day}OJT${j}`]) ? convertToMinutes(objThis[day][`${day}Time${j}`]) : 0;
        }

        for (let j = 20; j < 30; j++) {
            sum += (objThis[day][`${day}OJT${j}`]) ? convertToMinutes(objThis[day][`${day}Time${j}`]) : 0;
        }

        for (let j = 30; j < 35; j++) {
            sum += (objThis[day][`${day}OJT${j}`]) ? (Number(objThis[day][`${day}Time${j}`]) * 60) : 0;
        }
    }
    return sum;
}

function getWeeklyTotals() {
    //Declare variables and initialize the values
    let sum = 0;

    //Clear Hours worked
    byID("TotalHW").value = "";
    setDataKeyValue("TotalHW", "");
    sumCPay();

    //CALCULATE RUN TIME
    if (optVal === "") {
        for (const day of weekdays)
                sum += calculateRunTime(day);
    }

    sum = calculateTotal(sum);
    setDataKeyValue("TotalRun", sum);
    if (optVal === "") byID("TotalRun").value = sum;

    //CALCULATE OTHER WORK
    sum = 0;
    for (const day of days) {
        sum += calculateOtherTime(day);
    }
    
    sum = calculateTotal(sum);
    setDataKeyValue("TotalOther", sum);
    byID("TotalOther").value = sum;

    //CALCULATE FIELD TRIPS
    sum = 0;
    
    for (const day of days) {
        sum += calculateFieldTrip(day);
    }
    
    sum = setToFixed(sum);
    setDataKeyValue("TotalFT", sum);
    byID("TotalFT").value = sum;

    //CALCULATE HOURS WORKED
    const key = (optVal === "") ? "Data" : "Sup";
    sum = convertToMinutes(objThis[key]["TotalRun"]) + convertToMinutes(objThis[key]["TotalOther"]);
    if (optVal === "" && objThis.Data.Area !== "TC") sum += 15;

    sum = convertTotal(sum);
    sum = (sum === "") ? 0 : Number(sum);
    sum += Number(objThis[key]["TotalFT"]);
    sum += Number(objThis[key]["TotalHW"]);
    sum = setToFixed(sum);
    setDataKeyValue("TotalHW", sum);
    byID("TotalHW").value = sum;

    //CALCULATE EQUIPMENT
    sum = calculateEquipment();
    sum = convertTotal(sum);
    setDataKeyValue("TotalS2QL", sum);
    byID("TotalS2QL").value = sum;

    //CALCULATE ADMIN
    sum = calculateAdmin();
    sum = convertTotal(sum);
    setDataKeyValue("TotalS4J", sum);
    byID("TotalS4J").value = sum;

    //CALCULATE 1R
    sum = convertToMinutes(objThis[key]["TotalRun"]) + convertToMinutes(objThis[key]["TotalOther"]);
    sum = convertTotal(sum);
    setDataKeyValue("Total1R", sum);
    byID("Total1R").value = sum;

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!objThis[key]["OJT"]) {
        setStorage();
        return;
    }

    sum = calculateOJT();
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
    
    const key = (optVal === "") ? "Data" : "Sup";

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    objThis[key]["TotalC1"] = c1;
    byID("TotalC1").value = c1;

    sum = convertTotal(sum);
    objThis[key]["TotalHW"] = sum;
    byID("TotalHW").value = sum;

    c3 = (c3 === 0) ? "" : convertTotal(c3);
    objThis[key]["TotalC3"] = c3;
    byID("TotalC3").value = c3;
}
