document.addEventListener('DOMContentLoaded', () => {
    byID('ctspan').addEventListener('click', popUpCT);
    byID('divpreview').addEventListener('click', completeTimesheet);
    byID('divsupplement').addEventListener('click', openSupplement);
    byID('endcover').addEventListener('click', closeRunCoverage);
    arrEach(docObj(".chkFTQL"), 'click', getDailyTotals);
    arrEach(docObj(".chkRC"), 'click', openRunCoverage);
});

//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage() {
    let week = byID('WeekOf').value;
    localStorage.setItem(`${week}Obj`, JSON.stringify(objThis));
}

//UPDATE THE WAY THE ROUTE NAME LOOKS
function routeNameTransform(refID) {
    let refVal = byID(refID).value;
    refVal = refVal.toUpperCase();

    let i = 0;

    let blnJ = (refVal.lastIndexOf("J") > 3) ? true : false;
    let blnL = (refVal.lastIndexOf("L") > 3) ? true : false;
    let blnQ = (refVal.lastIndexOf("Q") > 3) ? true : false;

    //Remove AM & PM
    if (refVal.lastIndexOf("AM") > 2)
        refVal = refVal.replace("AM", "");
    if (refVal.lastIndexOf("PM") > 2)
        refVal = refVal.replace("PM", "");

    refVal = refVal.trim();

    //Remove -
    if (refVal.lastIndexOf("-") > 0)
        refVal = refVal.replace("-", "");

    //Remove Q, L and J
    if (refVal.lastIndexOf("L") > 3) {
        i = refVal.lastIndexOf("L");
        refVal = refVal.substr(0, i) + refVal.substr(i + 1);
        refVal = refVal.trim();
    }
    if (refVal.lastIndexOf("Q") > 3) {
        i = refVal.lastIndexOf("Q");
        refVal = refVal.substr(0, i) + refVal.substr(i + 1);
        refVal = refVal.trim();
    }
    if (refVal.lastIndexOf("J") > 3) {
        i = refVal.lastIndexOf("J");
        refVal = refVal.substr(0, i) + refVal.substr(i + 1);
        refVal = refVal.trim();
    }

    if (refVal.lastIndexOf("V") > 3) {
        i = refVal.lastIndexOf("V");
        refVal = refVal.substr(0, i) + refVal.substr(i + 1);
        refVal = refVal.trim();
    }

    //Remove P and D for midday
    if (refID === "PSRoute1" || refID === "PSRoute2") {
        if (refVal.lastIndexOf("P") > 3) {
            i = refVal.lastIndexOf("P");
            refVal = refVal.substr(0, i) + refVal.substr(i + 1);
            refVal = refVal.trim();
        }

        if (refVal.lastIndexOf("D") > 3) {
            i = refVal.lastIndexOf("D");
            refVal = refVal.substr(0, i) + refVal.substr(i + 1);
            refVal = refVal.trim();
        }
    }

    //Let shuttle number be whatever they type in
    if ((refID === "SHRoute1" || refID === "SHRoute2") && objThis.Data.Area !== "7") {
        refVal = (blnJ) ? refVal + " J" : refVal;
        refVal = (blnQ && blnJ) ? refVal + "Q" : (blnQ && !blnJ) ? refVal + " Q" : refVal;
        refVal = (blnL && (blnJ || blnQ)) ? refVal + "L" : (blnL && !blnJ && !blnQ) ? refVal + " L" : refVal;
        byID(refID).value = refVal.toUpperCase();
        return;
    }

    //If the route length is less than 3 then they didn't completely type in the route name
    if (refVal.length < 3 && refVal !== '') {
        openPopUp('<p>Invalid route name.</p>');
        refVal = "";
    }

    let routeName = ''
    let routeNum = '';
    let count = 0;
    for (let i = refVal.length; i >= 0; i--) {
        if (isNaN(refVal.substr(i, 1)) && routeNum !== '') {
            routeName = refVal.substr(i, 1) + routeName;
        } else if (!isNaN(refVal.substr(i, 1))) {
            routeNum = refVal.substr(i, 1) + routeNum;
        }
    }
    routeNum = (routeNum.length === 1) ? "0" + routeNum : routeNum;

    if (refID !== "PSRoute1" && refID !== "PSRoute2") {
        if (routeNum.substr(0, 1) === "7") {
            routeName = routeName + "7";
            routeNum = routeNum.substr(1);
            routeNum = (routeNum.length === 1) ? "0" + routeNum : routeNum;
        }
    }

    if (routeName.indexOf("AIM") > -1 || routeName.indexOf("TSRC") > -1) {
        routeName = routeName + routeNum.substr(0, 1);
        routeNum = routeNum.substr(1);
    }


    //Rebuild route number with dash, J, L, and Q if needed
    refVal = routeName + "-" + routeNum;
    refVal = (blnJ) ? refVal + " J" : refVal;
    refVal = (blnQ && blnJ) ? refVal + "Q" : (blnQ && !blnJ) ? refVal + " Q" : refVal;
    refVal = (blnL && (blnJ || blnQ)) ? refVal + "L" : (blnL && !blnJ && !blnQ) ? refVal + " L" : refVal;

    //Set new string into element unless it's only a dash
    byID(refID).value = (refVal === "-") ? "" : refVal;
}

function toggleRC() {
    const day = getDay();
    let bln = false;
    
    if (day === "Sat" || day === "Sun") return;
    
    for (let i = 1; i < 6; i++) {
        bln = (objThis[day][`${day}RC${i}AM`] !== "") ? true : false;
        if (bln) break;
    }
    byID("RC11").checked = bln;
    
    bln = false;
    for (let i = 1; i < 6; i++) {
        bln = (objThis[day][`${day}RC${i}PM`] !== "") ? true : false;
        if (bln) break;
    }
    byID("RC12").checked = bln;
}

function openRunCoverage(e) {
    const refID = e.target.id;
    const day = getDay();
    const mer = (refID === "RC11") ? "AM" : "PM";
    
    showHide(byID("runcoverModal"), true);

    byID("rctitle").textContent = (refID === "RC11") ? "Morning Runs" : "Afternoon Runs";
    byID('RC1').value = objThis.Data[`${mer}Route1`] || objThis[day][`${day}RC1${mer}`] || "";
    byID('RC2').value = objThis.Data[`${mer}Route2`] || objThis[day][`${day}RC2${mer}`] || "";
    byID('RC3').value = objThis.Data[`${mer}Route3`] || objThis[day][`${day}RC3${mer}`] || "";
    byID('RC4').value = objThis.Data[`${mer}Route4`] || objThis[day][`${day}RC4${mer}`] || "";
    byID('RC5').value = objThis.Data[`${mer}Route5`] || objThis[day][`${day}RC5${mer}`] || "";
    
    byID('RC1').disabled = (byID('RC1').value === objThis.Data[`${mer}Route1`] && byID('RC1').value !== "") ? true : false;
    byID('RC2').disabled = (byID('RC2').value === objThis.Data[`${mer}Route2`] && byID('RC2').value !== "") ? true : false;
    byID('RC3').disabled = (byID('RC3').value === objThis.Data[`${mer}Route3`] && byID('RC3').value !== "") ? true : false;
    byID('RC4').disabled = (byID('RC4').value === objThis.Data[`${mer}Route4`] && byID('RC4').value !== "") ? true : false;
    byID('RC5').disabled = (byID('RC5').value === objThis.Data[`${mer}Route5`] && byID('RC5').value !== "") ? true : false;
}

function closeRunCoverage() {
    showHide(byID('runcoverModal'), false);
    const day = getDay();
    const mer = (byID("rctitle").textContent === "Morning Runs") ? "AM" : "PM";

    objThis[day][`${day}RC1${mer}`] = (byID('RC1').value === objThis.Data[`${mer}Route1`]) ? "" : byID('RC1').value;
    objThis[day][`${day}RC2${mer}`] = (byID('RC2').value === objThis.Data[`${mer}Route2`]) ? "" : byID('RC2').value;
    objThis[day][`${day}RC3${mer}`] = (byID('RC3').value === objThis.Data[`${mer}Route3`]) ? "" : byID('RC3').value;
    objThis[day][`${day}RC4${mer}`] = (byID('RC4').value === objThis.Data[`${mer}Route4`]) ? "" : byID('RC4').value;
    objThis[day][`${day}RC5${mer}`] = (byID('RC5').value === objThis.Data[`${mer}Route5`]) ? "" : byID('RC5').value;
    setStorage();
    toggleRC();
}

//CLEAR TIME FIELDS
function clearTimeField(e) {
    const day = getDay();
    let i = e.target.id.substr(-2);

    if (i === "41") {
        resetElement(`LeaveSelect${i}`);
        resetTime(i);
    } else if (i === "40") {
        resetElement(`LeaveSelect${i}`);
        resetTime(i);
        resetElement(`LeaveAD`);
        toggleADLeave();
    } else if (i === "AM") {
        resetElement(`TimeA`);
        resetElement('TimeB');
    } else if (i === "PM") {
        resetElement('TimeC');
        resetElement('TimeD');
    } else {
        resetTime(i);
        if (day !== "Sun" && day !== "Sat") resetElement(`OJT${i}`)
    }
    getDailyTotals();
}

//Daily leave checkboxes
function checkLeaveToggle(refID) {
    "use strict";
    const day = getDay();
    checkAllDayLeave(day);
}

//Toggle lift checkboxes on/off, set them in storage and run totals
function checkboxQL(refID) {
    const day = getDay();

    objThis[day][`${day}${refID}`] = byID(refID).checked;

    dailyQL(day);
}

//DECLARE VARIABLES
const routes = ['AMRoute1', 'AMRoute2', 'AMRoute3', 'AMRoute4', 'AMRoute5', 'PMRoute1', 'PMRoute2', 'PMRoute3', 'PMRoute4', 'PMRoute5', 'PSRoute1', 'PSRoute2', 'SHRoute1', 'SHRoute2', 'LRRoute1', 'LRRoute2'];
let objThis = localStorage.getItem(`${byID("WeekOf").value}Obj`);

document.addEventListener('DOMContentLoaded', () => {
    const readOnly = docObj('[data-disable-touch-keyboard]');
    Array.from(readOnly).forEach((e) => {
        e.readOnly = true;
    });

    if (localStorage.getItem("WeekOf") !== null) {
        byID("WeekOf").value = localStorage.getItem("WeekOf");
        if (byID("WeekOf").value === null || byID("WeekOf").value === undefined)
            byID("WeekOf").selectedIndex = 4;
        initialLoad();
    } else {
        byID("WeekOf").selectedIndex = 4;
        initialLoad();
    }
});

//FIRST FUNCTION TO LOAD
function initialLoad() {
    if (byID("WeekOf").value === "") return;
    localStorage.setItem("WeekOf", byID("WeekOf").value);
    storeWeek();
    let refDate = new Date();
    let day = refDate.getDay();
    toggleDay(day);
    loadRadioSelection();
}

//CHANGE NAV BAR VALUES DEPENDING ON THE DAY
function toggleDay(x) {
    "use strict";
    //Set prev, today, and next text values
    let prev = (x - 1 < 0) ? 6 : x - 1;
    let next = (x + 1 > 6) ? 0 : x + 1;

    byID("prev").innerHTML = `${days[prev]}-` + objThis.Data[`${days[prev]}Date`];
    byID("today").innerHTML = `${days[x]}-` + objThis.Data[`${days[x]}Date`];
    byID("next").innerHTML = `${days[next]}-` + objThis.Data[`${days[next]}Date`];
    byID("dailyP").innerHTML = fullday[x] + "-" + objThis.Data[`${days[x]}Date`];
    togglePupilCounts(x);
    loadLocalStorage(days[x])
    getDailyTotals();
    toggleOWFTLV();
    toggleRC();
    loadOJT();
    loadQL();
    loadJ();
}

//LOAD ALL ELEMENTS INTO LOCAL STORAGE AND THEN PULL VALUES
function loadLocalStorage(day) {
    //Clear all fields first
    clearForm();

    showHideWeekend(day);

    entries = Object.entries(objThis[day]);
    for (const [key, value] of entries) {
        if (key === `${day}Trainee`) { //Added this feature because resetElement added Trainee to the day objects
            delete objThis[day][key];
            continue;
        }
        const ref = key.replace(day, "");
        const e = byID(ref);
        if (e === null) continue;

        if (e.type === 'checkbox') {
            e.checked = value;
        } else {
            e.value = value;
        }
    }
}

//LOAD OJT AND TRAINEE DATA; DISABLE/ENABLE ALL OTHER OJT CHECKBOXES
function loadOJT() {
    setDataKeyValue("OJT", byID("OJT").checked);
    let bln = byID("OJT").checked;

    if (bln) {
        byID('Trainee').disabled = false;
        byID('Trainee').style.backgroundColor = "white";
    } else {
        byID('Trainee').disabled = true;
        byID('Trainee').style.backgroundColor = "lightgrey";
        byID('Trainee').value = ""
        setObject("Trainee");
    }

    const chkOJT = docObj(".chkOJT");
    for (const ojt of chkOJT) {
        if (ojt.id === "OJT") continue;
        if (!byID('LeaveAD').checked)
            ojt.disabled = !bln;
        else
            ojt.disabled = true;
        if (!bln) resetElement(ojt.id);
    }
}

function showHideWeekend(day) {
    const blnWeekend = (day === "Sat" || day === "Sun") ? true : false;
    showHide(byID('divLVAdd'), !blnWeekend);
    showHide(byID('divRegRuns'), !blnWeekend);
    showHide(byID('dailyCopy'), !blnWeekend);
}

function loadEmpStorage() {
    let entries = Object.entries(objThis.Data);
    for (const [key, value] of entries) {
        if (key === "Area" || key === "Team" || key === "Position" || key === "Total1R") continue;
        const e = byID(key);
        if (e === null) continue;
        if (e.type === 'checkbox') {
            e.checked = value;
        } else {
            e.value = value;
        }
    }
}

//GET DAY FROM LOCAL STORAGE OR CREATE A NEW WEEK IN LOCAL STORAGE
function storeWeek() {
    let week = byID("WeekOf").value;
    if (localStorage.getItem(`${week}Obj`) === null) {
        objThis = objNew;

        storeWeekDays(week);

        loadPrevWeek(week);
        objThis.Data.WeekOf = byID("WeekOf").value;
        setStorage();
    } else {
        objThis = JSON.parse(localStorage.getItem(`${week}Obj`));
        storeWeekDays(week);
    }

    loadEmpStorage();
}

function storeWeekDays(week) {
    //Store first day of week range in y and shortened date in ny
    const startDate = week.substr(0, 2) + "/" + week.substr(2, 2) + "/" + week.substr(4, 4);
    const endDate = week.substr(8, 2) + "/" + week.substr(10, 2) + "/" + week.substr(12, 4);

    let satDate = new Date(startDate);

    objThis.Data.SatDate = startDate.substr(0, 5);
    objThis.Data.FriDate = endDate.substr(0, 5);

    for (let i = 4; i >= 0; i--) {
        let newDay = addDate(satDate, i + 1);
        let sm = newDay.getMonth() + 1;
        let sd = newDay.getDate();
        sm = (sm.toString().length === 1) ? "0" + sm : sm;
        sd = (sd.toString().length === 1) ? "0" + sd : sd;
        objThis.Data[`${days[i]}Date`] = sm + "/" + sd;
    }
}

//OPEN SUPPLEMENT IN SAME WINDOW
function openSupplement() {
    showHide(byID("navdropdown"), false);
    window.open("index2.html", "_self");
}

//POP UP CT MESSAGE
function popUpCT() {
    openPopUp("<p class='varp'>&bull;Only record the routes, shuttles, middays, and late runs that are specifically assigned to you.</p><p class='varp'>&bull;Special Equipment pay will only be available if one of your routes ends with an 'L' or an 'EQ'</p><p class='varp'>&bull;Any other route that is covered for another driver and is outside of your regular hours should be recorded in the other work section.</p><p class='varp'>&bull;Record the number of students transported for each route for every day that was driven.</p><p class='varp'>&bull;In the Pupil Time section, enter the first pickup time and last drop off time for both morning and afternoon runs.</p>");
}

//SHOW THE LEAVE SECTION
function addLeave() {
    const day = getDay();
    let bln = (objThis[day][`${day}LeaveAD`] || objThis[day][`${day}Time40S`] !== "" || objThis[day][`${day}Time41S`] !== "") ? true : false;
    bln = (!bln && byID('LVAdd').innerHTML.endsWith("Remove Leave")) ? true : bln;
    toggleADLeave();

    byID('LVAdd').innerHTML = (!bln) ? '<span class="far fa-minus-square fa-lg"></span>Remove Leave' : '<span class="far fa-plus-square fa-lg"></span>Add Leave';
    showHide(byID('LVDivAD'), !bln);
    showHide(byID('LVDiv40'), !bln);
    showHide(byID('LVDiv41'), !bln);

    if (bln) resetLeave(day);
}

//SEPARATE FUNCTION FOR RESETTING LEAVE
function resetLeave(day) {
    byID('LVAdd').innerHTML = '<span class="far fa-plus-square fa-lg"></span>Add Leave</p>'
    showHide(byID('LVDivAD'), false);
    showHide(byID('LVDiv40'), false);
    showHide(byID('LVDiv41'), false);
    resetTime(40);
    resetTime(41);
    resetElement('LeaveSelectAD');
    resetElement('LeaveSelect40');
    resetElement('LeaveSelect41');
    resetElement('LeaveAD');
    toggleADLeave();
}

//TOGGLE PUPIL COUNTS WHEN ACTIVITY DRIVER
function posAD() {
    for (const route of routes) {
        objThis.Data[route] = "";
        resetElement(route);
    }

    const counts = docObj('.txtCt');
    for (const day of weekdays) {
        objThis[day][`${day}QL11`] = false;
        objThis[day][`${day}J11`] = false;
        for (const count of counts) {
            objThis[day][`${day}${count.id}`] = "";
        }
        objThis[day][`${day}TimeA`] = "";
        objThis[day][`${day}TimeB`] = "";
        objThis[day][`${day}TimeC`] = "";
        objThis[day][`${day}TimeD`] = "";
    }
    setStorage();
    showHide(byID("PupilCounts"), false);
}

//COPY ROUTINE FOR REGULAR WORK HOURS
function copyRoutine(e) {
    activeID = e.target.id;
    if (e.target.id === "AMPupilcopy" || e.target.id === "PMPupilcopy") {
        let str = runPupilCopyRoutine();
        openPopUp('<p class="varp">Pupil time copied to the following day(s): ' + str + '.</p>');
    } else {
        let str = runCopyRoutine();
        openPopUp('<p class="varp">Regular work hours copied to the following day(s): ' + str + '.</p>');
    }
}

//COPY REGULAR RUN TIME TO OTHER DAYS
function runCopyRoutine() {
    showHide(byID("variousModal"), false);
    let k = 0;
    let bln = false;
    let str = "";
    let i = 0;

    for (i = 1; i < 5; i += 1) {
        k = (getDay() === days[i]) ? i : 0;
        if (k === i) break;
    }
    const day = getDay();
    k++;
    for (k; k < 6; k++) {
        let day2 = days[k];
        bln = (objThis[day2][`${day2}LeaveAD`] || objThis[day2][`${day2}Time40`] !== '' || objThis[day2][`${day2}Time41`] !== '') ? true : false;
        if (bln) continue;
        for (let j = 11; j < 18; j++) {
            objThis[day2][`${day2}Time${j}S`] = objThis[day][`${day}Time${j}S`]
            objThis[day2][`${day2}Time${j}E`] = objThis[day][`${day}Time${j}E`];
            objThis[day2][`${day2}Time${j}`] = objThis[day][`${day}Time${j}`];
        }
        dailyRuns(day2);
        str += ", " + day2;
    }
    getWeeklyTotals();
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//COPY PUPIL TIME TO OTHER DAYS
function runPupilCopyRoutine() {
    showHide(byID("variousModal"), false);
    let k = 0;
    let str = "";
    let i = 0;

    for (i = 1; i < 5; i += 1) {
        k = (getDay() === days[i]) ? i : 0;
        if (k === i) break;
    }
    const day2 = days[i];
    k++;
    for (k; k < 6; k++) {
        const day = days[k];
        const bln = (byID('LeaveAD').checked) ? true : false;
        if (bln) continue;
        objThis[day][`${day}TimeA`] = objThis[day2][`${day2}TimeA`];
        objThis[day][`${day}TimeB`] = objThis[day2][`${day2}TimeB`];
        objThis[day][`${day}TimeC`] = objThis[day2][`${day2}TimeC`];
        objThis[day][`${day}TimeD`] = objThis[day2][`${day2}TimeD`];
        str += ", " + day;
    }
    setStorage();
    str = (str !== "") ? str.substr(2) : "";
    return str;
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

//GET ALL DAY LEAVE ON EVENT CLICK
function checkLeave() {
    toggleADLeave();
    getDailyTotals();
}

//TOGGLE LEAVE AND ELEMENTS FOR ALL DAY LEAVE
function toggleADLeave() {
    let day = getDay();
    let bln = (byID('LeaveAD').checked) ? true : false;
    let i = 0;

    showHide(byID('OWAdd'), !bln);
    showHide(byID('FTAdd'), !bln);

    disableElement('J11', routeCheckJ() ? bln : true);
    disableElement('QL11', routeCheck() ? bln : true);

    if (bln) {
        //Clear Other work
        for (i = 20; i < 30; i += 1)
            byID(`OWTrash${i}`).click();

        //Clear Field Trips
        for (i = 30; i < 35; i += 1)
            byID(`FTTrash${i}`).click();
    }

    //Clear regular run time
    for (i = 11; i < 18; i += 1) {
        disableElement(`Time${i}S`, bln);
        disableElement(`Time${i}E`, bln);
        disableElement(`Time${i}`, bln);
        disableElement(`OJT${i}`, byID('OJT').checked ? bln : true);
    }
    //Clear partial leave time
    for (i = 40; i < 42; i += 1) {
        disableElement(`Time${i}S`, bln);
        disableElement(`Time${i}E`, bln);
        disableElement(`Time${i}`, bln);
        disableElement(`LeaveSelect${i}`, bln);
    }

    //Clear pupil counts
    for (i = 1; i < 6; i += 1) {
        disableElement(`AM${i}Ct`, bln);
        disableElement(`PM${i}Ct`, bln);
        if (i < 3) {
            disableElement(`PS${i}Ct`, bln);
            disableElement(`SH${i}Ct`, bln);
            disableElement(`LR${i}Ct`, bln);
        }
    }
    disableElement('TimeA', bln);
    disableElement('TimeB', bln);
    disableElement('TimeC', bln);
    disableElement('TimeD', bln);
}

function openTimesheet() {
    let emp = "";
    emp = byID("EmpInitials").value;
    emp = emp.toUpperCase();
    objThis.Data.EmpInitials = emp;
    setObject("EmpInitials");
    showHide(byID("validateModal"), false);

    if (emp !== "") {
        //Set week value into local storage for preview and timesheet to use
        localStorage.setItem('WeekOf', byID("WeekOf").value);
        window.open("preview.html", "_self");
    }
}

function testEmpData() {
    let val = "";

    //Check Area
    if (objThis.Data.Area === "")
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (objThis.Data.Team === "")
        val += "<p class='varp'>&bull;Team not selected.</p>";

    //Check employee name
    if (objThis.Data.EmpName === "")
        val += "<p class='varp'>&bull;Employee name not entered</p>";

    //Check position
    if (objThis.Data.Position === "")
        val += "<p class='varp'>&bull;Employee position not selected.</p>";

    return val;
}

function testFieldTrip() {
    let val = "";
    let blnTime = false;

    //Check field trips
    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        for (let j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            blnTime = (objThis[day][`${day}Time${j}S`] !== "") ? true : false;
            if (blnTime && (objThis[day][`${day}Voucher${j}`] === "" || objThis[day][`${day}From${j}`] === "" || objThis[day][`${day}To${j}`] === ""))
                val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: Voucher, From and To fields cannot be blank.</p>";

            if ((objThis[day][`${day}Voucher${j}`] !== "" || objThis[day][`${day}From${j}`] !== "" || objThis[day][`${day}To${j}`] !== "") && !blnTime)
                val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: No time entered.</p>";
        }
    }
    return val;
}

function testOtherWork() {
    let val = "";

    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        for (let j = 20; j < 30; j++) {
            if ((i === 0 || i === 6) && j > 22) continue;
            if (objThis[day][`${day}Time${j}S`] === "" && objThis[day][`${day}Select${j}`] !== "" && objThis[day][`${day}Select${j}`] !== "FYI")
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: No time entered.</p>";

            if (objThis[day][`${day}Time${j}S`] !== "" && objThis[day][`${day}Select${j}`] === "")
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Category is required.</p>";

            if ((objThis[day][`${day}Select${j}`] === "OT" || objThis[day][`${day}Select${j}`] === "FYI") && objThis[day][`${day}Desc${j}`] === "")
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description is required when Other or FYI selected.</p>";
        }
    }
    return val;
}

function testLeave() {
    let val = "";

    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 40; j < 42; j++) {
            if (objThis[day][`${day}Time${j}S`] !== "") {
                if (objThis[day][`${day}LeaveSelect${j}`] === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (objThis[day][`${day}LeaveSelect${j}`] !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
            }
            if (objThis[day][`${day}LeaveAD`]) {
                if (objThis[day][`${day}LeaveSelectAD`] === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (objThis[day][`${day}LeaveSelectAD`] !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: All day leave type selected but checkbox left unchecked.</p>";
            }
        }
    }
    return val;
}

function testStopCounts() {
    let val = "";
    let pos = objThis.Data.Position;

    if (objThis.Data.Area === "TC") return val;
    //Validate stop counts
    if (pos === "Driver" || pos === "Sub Driver" || pos === "Driver Trainee") {
        for (let i = 1; i < 6; i += 1) {
            let day = days[i];

            if (!testRegCounts(day, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";

            if (!testRegPupil(day, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM time entered with no routes specified.</p>";

            if (!testRegCounts(day, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM pupil counts not completed.</p>";

            if (!testRegPupil(day, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM time entered with no routes specified.</p>";

            if (!testSpecCounts(day, "PS"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS pupil counts not completed.</p>";

            if (!testSpecPupil(day, "PS"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS time entered with no routes specified.</p>";

            if (!testSpecCounts(day, "SH"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle pupil counts not completed.</p>";

            if (!testSpecPupil(day, "SH"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle time entered with no shuttle specified.</p>";

            if (!testSpecCounts(day, "LR"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run pupil counts not completed.</p>";

            if (!testSpecPupil(day, "LR"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run time entered with no route specified.</p>";
        }
    }
    return val;
}

function testRegPupil(day, mer) {
    if (mer === 'AM' && objThis[day][`${day}Time11S`] === "") return true;
    if (mer === 'PM' && objThis[day][`${day}Time12S`] === "") return true;

    let ct = 0;
    for (let i = 1; i < 6; i += 1)
        if (objThis[day][`${day}${mer}${i}Ct`] !== "") ct++;

    return (ct > 0) ? true : false;
}

function testRegCounts(day, mer) {
    if (mer === 'AM' && objThis[day][`${day}Time11S`] === "") return true;
    if (mer === 'PM' && objThis[day][`${day}Time12S`] === "") return true;

    let ct = 0;
    for (let j = 1; j < 6; j++)
        if (objThis.Data[`${mer}Route${j}`] !== "" && objThis[day][`${day}${mer}${j}Ct`] !== "") ct++;

    return (ct > 0) ? true : false;
}

function testSpecPupil(day, spec) {
    if (spec === 'PS' && objThis[day][`${day}Time13S`] === "" && objThis[day][`${day}Time14S`] === "") return true;
    if (spec === 'SH' && objThis[day][`${day}Time15S`] === "" && objThis[day][`${day}Time16S`] === "") return true;
    if (spec === 'LR' && objThis[day][`${day}Time17S`] === "") return true;

    let ct = 0;
    if (objThis.Data[`${spec}Route1`] !== "") ct++;
    if (objThis.Data[`${spec}Route2`] !== "") ct++;

    return (ct > 0) ? true : false;
}

function testSpecCounts(day, spec) {
    if (spec === 'PS' && objThis[day][`${day}Time13S`] === "" && objThis[day][`${day}Time14S`] === "") return true;
    if (spec === 'SH' && objThis[day][`${day}Time15S`] === "" && objThis[day][`${day}Time16S`] === "") return true;
    if (spec === 'LR' && objThis[day][`${day}Time17S`] === "") return true;

    let ct = 0;
    if (objThis.Data[`${spec}Route1`] !== "" && objThis[day][`${day}${spec}1Ct`] !== "") ct++;
    if (objThis.Data[`${spec}Route2`] !== "" && objThis[day][`${day}${spec}2Ct`] !== "") ct++;

    return (ct > 0) ? true : false;
}

function testTimeComplete() {
    let val = "";
    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 11; j < 17; j++) {
            if (objThis[day][`${day}Time${j}S`] !== "" && objThis[day][`${day}Time${j}E`] === "")
                val += "<p class='varp'>&bull;" + fullday[i] + ": Time not completed.</p>";
        }
    }
    return val;
}
