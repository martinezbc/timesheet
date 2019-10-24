document.addEventListener('DOMContentLoaded', () => {
    byID('ctspan').addEventListener('click', popUpCT);
    byID('endChanges').addEventListener('click', () => {
        showHide(byID("changesModal"), false);
    });
    byID('divtutorial').addEventListener('click', (e) => {
        showHide(byID("changesModal"), true)
    });
    byID('divpreview').addEventListener('click', completeTimesheet);
    byID('divsupplement').addEventListener('click', openSupplement);
});

//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage() {
    let week = byID('WeekOf').value;
    localStorage.setItem(`${week}Obj`, JSON.stringify(objThis));
}
//SET ELEMENT VALUE INTO OBJECTS
function setObject(refID) {
    if (refID === 'WeekOf') return;
    const day = getDay();
    const e = byID(refID);

    if (e.classList.contains("data")) {
        objThis.Data[refID] = e.value;
    } else if (e.type === 'checkbox') {
        objThis[day][`${day}${refID}`] = (e.checked) ? true : false;
    } else {
        objThis[day][`${day}${refID}`] = e.value;
    }
    getDailyTotals();
    setStorage();
}
//SET RADIO SELECTION
function storeRadioValue(e) {
    let parent = e.parentNode.id;
    if (parent !== 'divarea' && parent !== 'divposition') {
        parent = e.parentNode.parentNode.id;
    }
    parent = parent.replace('div', '');
    parent = properCase(parent);

    objThis.Data[parent] = e.value;
    getWeeklyTotals();
    setStorage();
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
    if (refID === "SHRoute1" || refID === "SHRoute2") {
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

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    const day = getDay();
    let ftText = "";
    let ftselect = byID('ftselector').value;
    if (ftselect !== null && ftselect !== "")
        ftText = byID('ftselector').value;
    else
        ftText = byID('fttype').value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    objThis[day][`${day}${activeID}`] = ftText;
    showHide(byID('ftModal'), false);
    setStorage();
}

//RESET VALUE OF ELEMENT
function resetElement(refID) {
    const day = getDay();
    const e = byID(refID);
    if (e.type === "checkbox") {
        objThis[day][`${day}${refID}`] = false;
        e.checked = false;
    } else {
        objThis[day][`${day}${refID}`] = "";
        e.value = "";
    }
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


//FIND STORED VALUE FOR AREA, TEAM, POSITION, WEEKOF AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    const area = objThis.Data.Area;
    const team = objThis.Data.Team;
    let pos = objThis.Data.Position;
    //Load area from local storage and set radio selection
    for (const areas of docObj("input[name='Area']")) {
        areas.checked = false;
    }
    if (area !== "") byID("area" + area).checked = true;

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    for (const teams of docObj('input[name="Team"]')) {
        teams.checked = false;
    }
    if (team !== "" && (team.substr(0, 1) === area || area === '7')) byID("team" + team).checked = true;

    //Load position from local storage and set radio selection
    for (const positions of docObj('input[name="Position"]')) {
        positions.checked = false;
    }
    if (pos !== "") {
        pos = pos.replace(" ", "");
        byID("pos" + pos).checked = true;
    }
}

//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues() {
    "use strict";
    const area = objThis.Data.Area;

    let areadiv = ["div1", "div2", "div3", "div4", "div7", "divTC"];
    for (const div of areadiv) {
        if ("div" + area === div)
            showHide(byID(div), true);
        else
            showHide(byID(div), false);
    }

    if (area === "TC") {
        byID("teamTC").checked = true;
        objThis.Data.Team = "TC";
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

    if (!byID('LVDivAD').classList.contains('hide')) {
        resetLeave(day);
    } else {
        byID('LVAdd').innerHTML = '<span class="far fa-minus-square fa-lg"></span>Remove Leave</p>'
        showHide(byID('LVDivAD'), true);
        showHide(byID('LVDiv40'), true);
        showHide(byID('LVDiv41'), true);
    }
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

function getWeeklyTotals() {
    //Declare variables and initialize the values
    let sum = 0;

    //Clear Hours worked
    byID("TotalHW").value = "";
    setDataKeyValue("TotalHW", "");
    sumCPay();

    for (const day of weekdays) {
        for (let j = 11; j < 18; j++) {
            sum += convertToMinutes(objThis[day][`${day}Time${j}`]);
        }
    }
    sum = calculateTotal(sum);
    setDataKeyValue("TotalRun", sum);
    byID("TotalRun").value = sum;

    sum = 0;
    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            let selectVal = objThis[day][`${day}Select${j}`];
            if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
            sum += convertToMinutes(objThis[day][`${day}Time${j}`]);
        }
    }
    sum = calculateTotal(sum);
    setDataKeyValue("TotalOther", sum);
    byID("TotalOther").value = sum;

    sum = 0;
    for (const day of days) {
        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            sum += Number(objThis[day][`${day}Time${j}`]);
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