let range = '';

let strHTML = '<option value="">--Select Week--</option>';
for (let i = -21; i < 8; i += 7) {
    range = DateRange(i);
    strHTML += '<option value="' + range + '">' + dateString(range) + '</option>';
}

let weekof = document.getElementById("WeekOf");
weekof.innerHTML = strHTML;

function DateRange(offset) {
    let start = new Date();
    let end = new Date();
    let day = start.getDay();
    let sOffset = (day - day) - (day + 1);
    sOffset = (sOffset === -7) ? 0 : sOffset;
    let eOffset = sOffset + 6;
    start.setDate(start.getDate() + (sOffset + offset));
    end.setDate(end.getDate() + (eOffset + offset));

    let sm = start.getMonth() + 1;
    let sd = start.getDate();
    let sy = start.getFullYear();
    let em = end.getMonth() + 1;
    let ed = end.getDate();
    let ey = end.getFullYear();
    sm = (sm.toString().length === 1) ? "0" + sm : sm;
    sd = (sd.toString().length === 1) ? "0" + sd : sd;
    em = (em.toString().length === 1) ? "0" + em : em;
    ed = (ed.toString().length === 1) ? "0" + ed : ed;
    return sm + sd + sy + em + ed + ey;
}

function dateString(strDate) {
    let str = strDate.substr(0, 2) + "/" + strDate.substr(2, 2) + "/" + strDate.substr(4, 4) + " - ";
    str += strDate.substr(8, 2) + "/" + strDate.substr(10, 2) + "/" + strDate.substr(12, 4);
    return str
}

//DECLARE VARIABLES
const routes = document.querySelectorAll('input[name="route"]');
let objThis = localStorage.getItem(`${weekof.value}Obj`);

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("WeekOf") !== null) {
        weekof.value = localStorage.getItem("WeekOf");
        if (weekof.value === null || weekof.value === undefined)
            weekof.selectedIndex = 4;
        initialLoad();
    } else {
        weekof.selectedIndex = 4;
        initialLoad();
    }
});
              
weekof.addEventListener('change', initialLoad);
const copy = document.querySelectorAll('.fa-copy');
Array.from(copy).forEach( (e) => {
    e.addEventListener('click', copyRoutine);
});

//FIRST FUNCTION TO LOAD
function initialLoad() {
    if (weekof.value === "") return;
    localStorage.setItem("WeekOf", weekof.value);
    storeWeek();
    let refDate = new Date();
    let day = refDate.getDay();
    toggleDay(day);
    toggleOWFT();
    toggleLeave();
    loadOJT();
    loadQL();
    loadJ();
    loadLeave();
    getDailyTotals();
}

//LOAD ALL ELEMENTS INTO LOCAL STORAGE AND THEN PULL VALUES
function loadLocalStorage() {
    let objArray = [objThis.Data, objThis.Sat, objThis.Sun, objThis.Mon, objThis.Tue, objThis.Wed, objThis.Thu, objThis.Fri];

    for (let j = 0; j < objArray.length; j++) {
        let entries = Object.entries(objArray[j]);
        for (const [key, value] of entries) {
            if (key === "Area" || key === "Team" || key === "Position" || key === "Total1R") continue;
            if (byID(key) === null) continue;
            if (value === true || value === false) {
                byID(key).checked = value;
            } else {
                byID(key).value = value;
            }
        }
    }
    loadRadioSelection();
}

//FIND STORED VALUE FOR AREA, TEAM, POSITION, WEEKOF AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    const area = objThis.Data.Area;
    const team = objThis.Data.Team;
    let pos = objThis.Data.Position;
    //Load area from local storage and set radio selection
    for (const areas of document.querySelectorAll("input[name='Area']")) {
        areas.checked = false;
    }
    if (area !== "") byID("area" + area).checked = true;

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    for (const teams of document.querySelectorAll('input[name="Team"]')) {
        teams.checked = false;
    }
    if (team !== "" && (team.substr(0, 1) === area || area === '7')) byID("team" + team).checked = true;
    
    //Load position from local storage and set radio selection
    for (const positions of document.querySelectorAll('input[name="Position"]')) {
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
            showHide(div, true);
        else
            showHide(div, false);
    }

    if (area === "TC") {
        byID("teamTC").checked = true;
        objThis.Data.Team = "TC";
    }

}

//LOADS DATES FROM STORAGE INTO DATE TEXT FIELDS
function loadStoredWeek() {
    if (objThis.Data.SatDate !== undefined)
        for (let i = 0; i < 7; i += 1)
            byID(`${days[i]}Date`).innerHTML = objThis.Data[`${days[i]}Date`];
}

//GET DAY FROM LOCAL STORAGE OR CREATE A NEW WEEK IN LOCAL STORAGE
function storeWeek() {
    let week = weekof.value;
    if (localStorage.getItem(`${week}Obj`) === null) {
        objThis = objNew;
        
        storeWeekDays(week);

        loadPrevWeek(week);
        objThis.Data.WeekOf = weekof.value;
        setStorage();
    } else {
        objThis = JSON.parse(localStorage.getItem(`${week}Obj`));

        storeWeekDays(week);
    }
    //Load data from JSON
    loadLocalStorage();
    loadStoredWeek();
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

function limitOWDesc(e) {
    let num = e.target.id.substr(-2);
    let day = e.target.id.substr(0, 3);
    if (byID(`${day}Select${num}`).value === "FYI")
        limitCharacters(e, 60);
    else
        limitCharacters(e, 35);
}


//PULL DATA FROM PREVIOUS WEEK INTO NEW WEEK
function loadPrevWeek(week) {
    let j = byID("WeekOf").selectedIndex - 1;
    if (j < 0) return;
    //Store first day of week range in y and shortened date in ny
    let prevweek = byID("WeekOf").options[j].value;
    if (localStorage.getItem(`${prevweek}Obj`) === null) return;
    objTemp = JSON.parse(localStorage.getItem(`${prevweek}Obj`));

    let i = 0;
    let keyArr = Object.keys(objThis.Data);
    for (i = 0; i < keyArr.length; i += 1) {
        if (keyArr[i].indexOf("Date") >= 0) continue;
        objThis.Data[keyArr[i]] = objTemp.Data[keyArr[i]];
    }
    for (let k = 1; k < 6; k++) {
        let day = days[k];
        for (i = 11; i < 18; i += 1) {
            objThis[day][`${day}Time${i}S`] = objTemp[day][`${day}Time${i}S`];
            objThis[day][`${day}Time${i}E`] = objTemp[day][`${day}Time${i}E`];
            objThis[day][`${day}Time${i}`] = objTemp[day][`${day}Time${i}`];
        }    
    }
}

//SET DAYS WHEN WEEK IS CHANGED
function updateWeek() {
    storeWeek();
    let day = byID("today").innerHTML;
    day = day.substr(0, 3);
    for (let i = 0; i < 7; i += 1) {
        if (day === days[i]) {
            toggleDay(i);
            break;
        }
    }
    for (let i = 1; i < 6; i += 1) {
        let day2 = days[i];
        for (let j = 20; j < 30; j++) {
            byID(`${day2}OWTrash${j}`).click();
        }
        for (let j = 30; j < 35; j++) {
            byID(`${day2}FTTrash${j}`).click();
        }
        resetLeave(`${day2}`);
    }
}

//CHANGE NAV BAR VALUES DEPENDING ON THE DAY
function toggleDay(x) {
    "use strict";
    //Set prev, today, and next text values
    if (x > 0 && x < 6) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = `${days[x - 1]}-` + objThis.Data[`${days[x - 1]}Date`];
        byID("today").innerHTML = `${days[x]}-` + objThis.Data[`${days[x]}Date`];
        byID("next").innerHTML = `${days[x + 1]}-` + objThis.Data[`${days[x + 1]}Date`];
    } else if (x === 0) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = `${days[x + 6]}-` + objThis.Data[`${days[x + 6]}Date`];
        byID("today").innerHTML = `${days[x]}-` + objThis.Data[`${days[x]}Date`];
        byID("next").innerHTML = days[x + 1] + "-" + objThis.Data[`${days[x + 1]}Date`];
    } else if (x === 6) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = `${days[x - 1]}-` + objThis.Data[`${days[x - 1]}Date`];
        byID("today").innerHTML = `${days[x]}-` + objThis.Data[`${days[x]}Date`];
        byID("next").innerHTML = `${days[x - 6]}-` + objThis.Data[`${days[x - 6]}Date`];
    }
    //Loop through all other days and set style display to none
    for (let i = 0; i < 7; i += 1) {
        //Continue if variables match
        if (i === x) continue;
        //Add hide if element does not have it
        showHide(fullday[i], false);
    }
    togglePupilCounts(x);
}

//LOAD OJT AND TRAINEE DATA; DISABLE/ENABLE ALL OTHER OJT CHECKBOXES
function loadOJT() {
    let bln = objThis.Data.OJT;
    let day = "";

    let t = byID("Trainee");
    if (bln) {
        t.disabled = false;
        t.style.backgroundColor = "white";
    } else {
        t.disabled = true;
        t.style.backgroundColor = "lightgrey";
        resetElement("Trainee");
    }

    const chkOJT = document.querySelectorAll("input[name='chkOJT']");
    for (const ojt of chkOJT) {
        if (ojt.id === "OJT") continue;
        day = ojt.id.substr(0, 3);
        if (!byID(`${day}LeaveAD`).checked)
            ojt.disabled = !bln;
        else
            ojt.disabled = true;
        if (!bln) resetElement(ojt.id);
    }
}

//LOAD Q/L CHECKBOXES, DISABLE/ENABLE THEM IF ROUTE HAS EQ OR L
function loadQL() {
    let bln = routeCheck();
    let val = "";

    let eql = document.querySelectorAll("input[name='chkQL']");
    for (const day of days) {
        if (day === "Sat" || day === "Sun") continue;
        if (!byID(`${day}LeaveAD`).checked)
            byID(`${day}QL11`).disabled = !bln;
        else
            byID(`${day}QL11`).disabled = true;
        if (!bln) resetElement(`${day}QL11`);
    }
    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            disableOWFields(`${day}Select${j}`);
        }
    }
}

function loadJ() {
    let bln = routeCheckJ();

    for (let day of days) {
        if (day === "Sun" || day === "Sat") continue;
        if (!byID(`${day}LeaveAD`).checked)
            byID(`${day}J11`).disabled = !bln;
        else
            byID(`${day}J11`).disabled = true;
        if (!bln) resetElement(`${day}J11`);
    }
}

//LOAD LEAVE AND TOGGLE FIELDS IF ALL DAY LEAVE IS CHECKED
function loadLeave() {
    for (let i = 1; i < 6; i += 1) {
        toggleADLeave(`${days[i]}LeaveAD`);
    }
}

//IF Q/L 11-17 IS CHECKED, THEN CHECK ALL OF THEM
function toggleQLReg(e) {
    let bln = (e.checked) ? true : false;
    let day = e.id.substr(0, 3);

    byID(`${day}QL11`).checked = bln;
    setObject(`${day}QL11`);
    loadQL();
    getDailyTotals();
}

//IF J IS CHECKED, THEN CHECK ALL OF THEM
function toggleJReg(e) {
    let bln = (e.checked) ? true : false;
    let day = e.id.substr(0, 3);

    byID(`${day}J11`).checked = bln;
    setObject(`${day}J11`);
    loadJ();
    getDailyTotals();
}

//TOGGLE OW AND FT BOXES SO THAT THEY SHOW IF THEY HAVE VALUES
function toggleOWFT() {
    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            let bln = (objThis[day][`${day}Select${j}`] !== "" || objThis[day][`${day}Desc${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false
            showHide(`${day}OWDiv${j}`, bln);
        }
        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            let bln = (objThis[day][`${day}Voucher${j}`] !== "" || objThis[day][`${day}To${j}`] !== "" || objThis[day][`${day}From${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false;
            showHide(`${day}FTDiv${j}`, bln);
        }
    }
}

//TOGGLE LEAVE IF THERE IS LEAVE FILLED OUT
function toggleLeave() {
    for (const day of days) {
        if (day === "Sat" || day === "Sun") continue;
        let bln = (objThis[day][`${day}LeaveAD`] || objThis[day][`${day}Time41`] !== "" || objThis[day][`${day}Time42`] !== "") ? true : false;
        if (bln)
            addLeave(byID(`${day}LVAdd`));
    }
}

//TOGGLE DAILY COUNTS IN THE PUPIL COUNTS SECTION
function togglePupilCounts(x) {
    //Declare boolean used to add or remove class
    let bln = false;
    //Declare boolean for weekend
    let blnSS = (x === 6 || x === 0) ? true : false;
    //Declare boolean for Position
    let pos = objThis.Data.Position;

    if (pos === "Activity Driver" || pos === "Floater") {
        posAD();
        return;
    }

    let blnPos = (pos === "Driver" || pos === "Driver Trainee" || pos === "Sub Driver") ? true : false;
    showHide("PupilCounts", true);

    //Loop through days array
    for (let j = 1; j < 6; j++) {
        const day = days[j];
        bln = (x === j) ? true : false;
        bln = (blnPos) ? bln : false;
        for (let i = 1; i < 6; i += 1) {
            showHide(`div${day}AM${i}Ct`, bln);
            showHide(`div${day}PM${i}Ct`, bln);
            if (i < 3) {
                showHide(`div${day}PS${i}Ct`, bln);
                showHide(`div${day}SH${i}Ct`, bln);
                showHide(`div${day}LR${i}Ct`, bln);
            }
        }
        showHide(`${day}TimeAM`, bln);
        showHide(`${day}TimePM`, bln);
    }
    showHide("divAMCt", (blnSS) ? false : blnPos);
    showHide("divPMCt", (blnSS) ? false : blnPos);
    showHide("divPSCt", (blnSS) ? false : blnPos);
    showHide("divAMPupilTime", (blnSS) ? false : blnPos);
    showHide("divPMPupilTime", (blnSS) ? false : blnPos);
}

//TOGGLE BETWEEN TUTORIAL SLIDES
function changeModalSlide(dir) {
    let j = 0;
    for (let i = 1; i < 5; i += 1) {
        if (!byID(`slide${i}`).classList.contains("hide")) break;
    }

    if (dir === 'r') {
        j = (i + 1 === 5) ? 1 : i + 1;
    } else {
        j = (i - 1 === 0) ? 4 : i - 1;
    }
    showHide(`slide${i}`, false);
    showHide(`slide${j}`, true);
}

//TOGGLE PUPIL COUNTS ON POSITION CHANGE
function positionChange(e) {
    for (let i = 0; i < 7; i++) {
        if (byID("today").innerHTML.substr(0, 3) === days[i]) {
            togglePupilCounts(i);
            break;
        }
    }
    //Reload J and QL because of Unassigned Attendants
    loadJ();
    loadQL();
}

//TOGGLE PUPIL COUNTS WHEN ACTIVITY DRIVER
function posAD() {
    for (let j = 1; j < 6; j++) {
        let day = days[j];
        if (j < 6) {
            resetElement(`AMRoute${j}`);
            resetElement(`PMRoute${j}`);
        }
        if (j < 3) {
            resetElement(`PSRoute${j}`);
            resetElement(`SHRoute${j}`);
            resetElement(`LRRoute${j}`);
        }
        for (let i = 1; i < 6; i += 1) {
            resetElement(`div${day}AM${i}Ct`);
            resetElement(`div${day}PM${i}Ct`);
            if (i < 3) {
                resetElement(`${day}PS${i}Ct`);
                resetElement(`${day}SH${i}Ct`);
                resetElement(`${day}LR${i}Ct`);
            }
        }
        resetElement(`${day}TimeA`);
        resetElement(`${day}TimeB`);
        resetElement(`${day}TimeC`);
        resetElement(`${day}TimeD`);
    }
    showHide("PupilCounts", false);
}

//MOVE NAV BAR TO THE RIGHT
function moveRightNavBar() {
    let current = byID("today").innerHTML;
    current = current.substr(0, 3);
    for (let i = 0; i < 7; i += 1) {
        if (current === days[i] && i < 6) {
            showHide(fullday[i], false);
            showHide(fullday[i + 1], true);
            toggleDay(i + 1);
        } else if (current === days[i] && i === 6) {
            showHide(fullday[i], false);
            showHide(fullday[0], true);
            toggleDay(0);
        } else {
            continue;
        }
    }
}

//MOVE NAV BAR TO THE LEFT
function moveLeftNavBar() {
    let current = byID("today").innerHTML;
    current = current.substr(0, 3);
    for (let i = 0; i < 7; i += 1) {
        if (current === days[i] && i > 0) {
            showHide(fullday[i], false);
            showHide(fullday[i - 1], true);
            toggleDay(i - 1);
        } else if (current === days[i] && i === 0) {
            showHide(fullday[i], false);
            showHide(fullday[6], true);
            toggleDay(6);
        } else {
            continue;
        }
    }
}
//SET AREA SELECTION AND THEN LOAD TEAM RADIO SELECTIONS
function radioAreaSelect(e) {
    objThis.Data.Team = "";
    loadTeamValues();
}

//OJT CHECKBOX CLICK
function checkOJT(e) {
    let refID = e.id;
    if (refID === "OJT") loadOJT();
    getDailyTotals();
}

function routeNameCheck() {
    loadQL();
    loadJ();
}

//CHECK ROUTES ENTERED TO SEE IF Q/L EXISTS
function routeCheck() {
    let bln = false;
    let val = "";
    for (let i = 0; i < routes.length; i += 1) {
        val = routes[i].value;
        if (val === null) continue; 
        bln = (val.lastIndexOf("L") > 3 || val.lastIndexOf("Q") > 3) ? true : false;
        if (bln) return bln;
    }
    if (objThis.Data.Position === "Unassigned Attendant") bln = true;
    return bln;
}

//CHECK ROUTES ENTERED TO SEE IF J EXISTS
function routeCheckJ() {
    let bln = false;
    let val = "";
    for (let i = 0; i < routes.length; i += 1) {
        val = routes[i].value;
        if (val === null) continue;
        bln = (val.lastIndexOf("J") > 3) ? true : false;
        if (bln) return bln;
    }
    if (objThis.Data.Position === "Unassigned Attendant") bln = true;
    return bln;
}

//TOGGLE OTHER WORK FIELDS
function addOtherWork(e) {
    let dayVal = e.target.id.substr(0, 3);
    let countOW = getMissingOW(dayVal);
    if (countOW === 30) return;
    showHide(`${dayVal}OWDiv${countOW}`, true);
}

//TOGGLE FIELD TRIP FIELDS
function addFieldTrip(e) {
    let dayVal = e.target.id.substr(0, 3);
    let countFT = getMissingFT(dayVal);

    //Exit function if count is 5
    if (countFT === 35) return;
    showHide(`${dayVal}FTDiv${countFT}`, true);
}

//TOGGLE OTHER WORK AND FIELD TRIP FIELDS OFF
function removeOWFT(e) {
    let x = e.target.id.substr(-2);
    let type = e.target.id.substr(3, 2);
    let dayVal = e.target.id.substr(0, 3);

    showHide(`${dayVal}${type}Div${x}`, false);
    if (type === "FT") {
        resetElement(`${dayVal}To${x}`);
        resetElement(`${dayVal}From${x}`);
        resetElement(`${dayVal}Voucher${x}`);
    } else if (type === "OW") {
        resetElement(`${dayVal}Select${x}`);
        resetElement(`${dayVal}Desc${x}`);
        if (dayVal !== "Sat" && dayVal !== "Sun")
            resetElement(`${dayVal}OJT${x}`);
        byID(`${dayVal}QL${x}`).disabled = true;
    }
    resetTime(dayVal, x);
    resetElement(`${dayVal}QL${x}`);

    getDailyTotals();
}

//CLEAR TIME FIELDS
function clearTimeField(e) {
    let day = e.target.id.substr(0, 3),
        num = e.target.id.substr(10);

    if (num === "41" || num === "42") {
        resetElement(`${day}LeaveSelect${num}`);
        resetTime(day, num);
    } else if (num === "AD") {
        resetElement(`${day}LeaveSelectAD`);
        resetElement(`${day}LeaveAD`);
    } else if (num === "AM") {
        resetElement(`${day}TimeA`);
        resetElement(`${day}TimeB`);
    } else if (num === "PM") {
        resetElement(`${day}TimeC`);
        resetElement(`${day}TimeD`);
    } else {
        resetTime(day, num);
    }
    getDailyTotals();
}

//FIGURE OUT WHICH OW FIELD IS NEXT TO SHOW
function getMissingOW(day) {
    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 23) return 30;
        if (byID(`${day}OWDiv${i}`).classList.contains("hide")) {
            return i;
        }
    }
    //If statement didnt' find a match, return 30
    return 30;
}

//FIGURE OUT WHICH FT FIELD IS NEXT TO SHOW
function getMissingFT(day) {
    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 33) return 35;
        if (byID(`${day}FTDiv${i}`).classList.contains("hide")) {
            return i;
        }
    }
    //if statement didn't find a match, return 35
    return 35;
}

//SHOW THE LEAVE SECTION
function addLeave(e) {
    let refID = e.id;
    let dayVal = refID.substr(0, 3);
    if (byID(`${dayVal}Leave40`).classList.contains("hide")) {
        byID(`${dayVal}LvP`).innerHTML = '<span class="far fa-plus-square fa-lg"></span>Remove Leave';
        showHide(`${dayVal}Leave40`, true);
        showHide(`${dayVal}Leave41`, true);
        showHide(`${dayVal}Leave42`, true);
    } else {
        resetLeave(dayVal);
    }

}

//SEPARATE FUNCTION FOR RESETTING LEAVE
function resetLeave(day) {
    byID(`${day}LvP`).innerHTML = '<span class="far fa-plus-square fa-lg"></span>Add Leave';
    showHide(`${day}Leave40`, false);
    showHide(`${day}Leave41`, false);
    showHide(`${day}Leave42`, false);
    resetTime(day, 41);
    resetTime(day, 42);
    resetElement(`${day}LeaveAD`);
    toggleADLeave(`${day}LeaveAD`);
    resetElement(`${day}LeaveSelectAD`);
    resetElement(`${day}LeaveSelect41`);
    resetElement(`${day}LeaveSelect42`);
}

//GET ALL DAY LEAVE ON EVENT CLICK
function checkLeave(e) {
    toggleADLeave(e.id);
    getDailyTotals();
}

//TOGGLE LEAVE AND ELEMENTS FOR ALL DAY LEAVE
function toggleADLeave(refID) {
    let day = refID.substr(0, 3);
    let bln = (byID(refID).checked) ? true : false;
    let i = 0;

    showHide(`${day}OWAdd`, !bln);
    showHide(`${day}FTAdd`, !bln);
    if (bln) {
        //Uncheck Admin
        byID(`${day}J11`).checked = false;
        
        //Uncheck Equipment
        byID(`${day}QL11`).checked = false;
        
        //Clear Other work
        for (i = 20; i < 30; i += 1)
            byID(`${day}OWTrash${i}`).click();
        
        //Clear Field Trips
        for (i = 30; i < 35; i += 1)
            byID(`${day}FTTrash${i}`).click();
        
        //Clear regular run time
        for (i = 11; i < 18; i += 1) {
            resetTime(day, i);
            byID(`${day}OJT${i}`).checked = false;
        }
        //Clear partial leave time
        for (i = 41; i < 43; i += 1)
            resetTime(day, i);
        
        //Clear pupil counts
        for (i = 1; i < 6; i += 1) {
            resetElement(`${day}AM${i}Ct`);
            resetElement(`${day}PM${i}Ct`);
            if (i < 3) {
                resetElement(`${day}PS${i}Ct`);
                resetElement(`${day}SH${i}Ct`);
                resetElement(`${day}LR${i}Ct`);
            }
        }
        resetElement(`${day}TimeA`);
        resetElement(`${day}TimeB`);
        resetElement(`${day}TimeC`);
        resetElement(`${day}TimeD`);
    }
    if (routeCheckJ())
        byID(`${day}J11`).disabled = bln;
    else
        byID(`${day}J11`).disabled = true;

    if (routeCheck())
        byID(`${day}QL11`).disabled = bln;
    else
        byID(`${day}QL11`).disabled = true;

    for (i = 11; i < 18; i += 1) {
        byID(`${day}Time${i}`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        byID(`${day}Time${i}S`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        byID(`${day}Time${i}E`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        if (byID("OJT").checked)
            byID(`${day}OJT${i}`).disabled = bln;
        else
            byID(`${day}OJT${i}`).disabled = true;
    }
    for (i = 41; i < 43; i += 1) {
        byID(`${day}Time${i}`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        byID(`${day}Time${i}S`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        byID(`${day}Time${i}E`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        disableElement(`${day}LeaveSelect${i}`, bln);
    }
    for (i = 1; i < 6; i += 1) {
        disableElement(`${day}AM${i}Ct`, bln);
        disableElement(`${day}PM${i}Ct`, bln);
        if (i < 3) {
            disableElement(`${day}PS${i}Ct`, bln);
            disableElement(`${day}SH${i}Ct`, bln);
            disableElement(`${day}LR${i}Ct`, bln);
        }
    }
    byID(`${day}TimeA`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}TimeB`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}TimeC`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}TimeD`).style.backgroundColor = (bln) ? "lightgrey" : "white";
}

//CLEAR LOCAL STORAGE AND RELOAD PAGE
function clearFields() {
    localStorage.removeItem(`${weekof.value}Obj`);
    location.reload();
}

//OPEN SUPPLEMENT IN SAME WINDOW
function openSupplement() {
    showHide("navdropdown", false);
    window.open("index2.html", "_self");
}

//POP UP CT MESSAGE
function popUpCT() {
    openPopUp("<p class='varp'>&bull;Only record the routes, shuttles, middays, and late runs that are specifically assigned to you.</p><p class='varp'>&bull;Special Equipment pay will only be available if one of your routes ends with an 'L' or an 'EQ'</p><p class='varp'>&bull;Any other route that is covered for another driver and is outside of your regular hours should be recorded in the other work section.</p><p class='varp'>&bull;Record the number of students transported for each route for every day that was driven.</p><p class='varp'>&bull;In the Pupil Time section, enter the first pickup time and last drop off time for both morning and afternoon runs.</p>");
}

//ENABLE OR DISABLE QL BUTTON DEPENDING ON WHAT IS SELECTED FOR OTHER WORK
function selectOWChange(e) {
    let refID = e.target.id;
    disableOWFields(refID);
}

function disableOWFields(refID) {
    let refVal = byID(refID).value;
    let day = refID.substr(0, 3);
    let x = refID.substr(9);
    let bln = (refVal === "FYI") ? true : false;
    byID(`${day}Time${x}S`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}Time${x}E`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}Time${x}`).style.backgroundColor = (bln) ? "lightgrey" : "white";

    bln = (refVal === "Q/L") ? true : false;
    byID(`${day}QL${x}`).checked = bln;
    byID(`${day}QL${x}`).disabled = !bln;
    objThis[day][`${day}QL${x}`] = bln;
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
    showHide("variousModal", false);
    let k = 0;
    let bln = false;
    let str = "";
    let i = 0;

    for (i = 1; i < 5; i += 1) {
        k = (byID("today").innerHTML.substr(0, 3) === days[i]) ? i : 0;
        if (k === i) break;
    }

    k++;
    for (k; k < 6; k++) {
        let day = days[k];
        bln = (byID(`${day}LeaveAD`).checked || byID(`${day}Time41`).value !== '' || byID(`${day}Time42`).value !== '') ? true : false;
        if (bln) continue;
        for (let j = 11; j < 18; j++) {
            byID(`${day}Time${j}S`).value = byID(`${days[i]}Time${j}S`).value;
            setObject(`${day}Time${j}S`);
            byID(`${day}Time${j}E`).value = byID(`${days[i]}Time${j}E`).value;
            setObject(`${day}Time${j}E`);
            timeCalculation(`${day}Time${j}E`);
        }
        str += ", " + days[k];
    }
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//COPY PUPIL TIME TO OTHER DAYS
function runPupilCopyRoutine() {
    showHide("variousModal", false);
    let k = 0;
    let str = "";
    let i = 0;

    for (i = 1; i < 5; i += 1) {
        k = (byID("today").innerHTML.substr(0, 3) === days[i]) ? i : 0;
        if (k === i) break;
    }
    const day2 = days[i];
    k++;
    for (k; k < 6; k++) {
        const day = days[k];
        const bln = (byID(`${day}LeaveAD`).checked) ? true : false;
        if (bln) continue;
        byID(`${day}TimeA`).value = byID(`${day2}TimeA`).value;
        setObject(`${day}TimeA`);
        byID(`${day}TimeB`).value = byID(`${day2}TimeB`).value;
        setObject(`${day}TimeB`);
        byID(`${day}TimeC`).value = byID(`${day2}TimeC`).value;
        setObject(`${day}TimeC`);
        byID(`${day}TimeD`).value = byID(`${day2}TimeD`).value;
        setObject(`${day}TimeD`);
        str += ", " + day;
    }
    setStorage();
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//CHECK NUMBER OF OTHER WORK ENTRIES, IF MORE THAN 10 THEN GIVE POP UP ERROR MESSAGE
function countOtherWork(refID) {
    let count = 0;

    //Loop through each day of the week
    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            if (byID(`${day}Select${j}`).value !== "") count++;
        }
    }

    //Result of count
    if (count > 10) {
        openPopUp("<p class='varp'>&bull;The max number of other work duties is 10. A supplement must be made for any additional duties.</p>");
        byID(refID).value = "";
    }
}

//CHECK NUMBER OF FIELD TRIP ENTRIES, IF MORE THAN 5 THEN GIVE POP UP ERROR MESSAGE
function countFieldTrips(refID) {
    let count = 0;

    //Loop through each day of the week
    for (let i = 0; i < 7; i += 1) {
        for (let j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            if (byID(`${days[i]}Voucher${j}`).value !== "") count++;
        }
    }
    //Result of count
    if (count > 5) {
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>");
        byID(refID).value = "";
    }
}

/********************VALIDATION AND COMPLETION********************/
function completeTimesheet() {
    showHide("navdropdown", false);
    if (weekof.value === "") return;
    let bln = runValidations();
    if (!bln)
        return;

    showHide("validateModal", true);
    byID("validateModal").focus();
}

function openTimesheet() {
    let emp = "";
    emp = byID("EmpInitials").value;
    emp = emp.toUpperCase();
    objThis.Data.EmpInitials = emp;

    showHide("validateModal", false);
    if (emp !== "") {
        getDailyTotals();

        //Set week value into local storage for preview and timesheet to use
        localStorage.setItem('WeekOf', weekof.value);
        window.open("preview.html", "_self");
    }
}

function runValidations() {
    let val = "";

    val = testEmpData() + testOtherWork() + testFieldTrip() + testLeave() + testTimeComplete();
    if (objThis.Data.Area !== "TC") {
        val += testStopCounts();
    }


    if (val !== "") {
        openPopUp(val);
        return false;
    } else {
        return true;
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
        day = days[i];
        for (let j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            blnTime = (objThis[day][`${day}Time${j}`] !== "") ? true : false;
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
            if (objThis[day][`${day}Time${j}`] === "" && objThis[day][`${day}Select${j}`] !== "" && objThis[day][`${day}Select${j}`] !== "FYI")
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: No time entered.</p>";

            if (objThis[day][`${day}Time${j}`] !== "" && objThis[day][`${day}Select${j}`] === "")
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
        for (let j = 41; j < 43; j++) {
            if (byID(`${day}Time${j}`).value !== "") {
                if (byID(`${day}LeaveSelect${j}`).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID(`${day}LeaveSelect${j}`).value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
            }
            if (byID(`${day}LeaveAD`).checked) {
                if (byID(`${day}LeaveSelectAD`).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID(`${day}LeaveSelectAD`).value !== "")
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

            if (!testRegPupil(day, 11, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";

            if (!testRegCounts(day, 11, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM time entered with no routes specified.</p>";

            if (!testRegPupil(day, 12, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM pupil counts not completed.</p>";

            if (!testRegCounts(day, 12, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM time entered with no routes specified.</p>";

            if (!testSpecPupil(day, 13, "PS", 1) || !testSpecPupil(day, 14, "PS", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS pupil counts not completed.</p>";

            if (!testSpecCounts(day, 13, "PS", 1) || !testSpecCounts(day, 14, "PS", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS time entered with no routes specified.</p>";

            if (!testSpecPupil(day, 15, "SH", 1) || !testSpecPupil(day, 16, "SH", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle pupil counts not completed.</p>";

            if (!testSpecCounts(day, 15, "SH", 1) || !testSpecCounts(day, 16, "SH", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle time entered with no shuttle specified.</p>";


            if (!testSpecPupil(day, 17, "LR", 1) || !testSpecPupil(day, 17, "LR", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run pupil counts not completed.</p>";

            if (!testSpecCounts(day, 17, "LR", 1) && !testSpecCounts(day, 17, "LR", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run time entered with no route specified.</p>";
        }
    }
    return val;
}

function testRegPupil(day, x, mer) {
    for (let j = 1; j < 6; j++) {
        if (byID(`${day}Time${x}`).value === "")
            continue;

        if (byID(`${mer}Route${j}`).value === "")
            continue;

        if (byID(`${day}${mer}${j}Ct`).value === "")
            return false;
    }
    return true;
}

function testRegCounts(day, x, mer) {
    if (byID(`${day}Time${x}`).value === "")
        return true;

    for (let i = 1; i < 6; i += 1) {
        if (byID(`${mer}Route${i}`).value !== "")
            return true;
    }
    return false;
}

function testSpecPupil(day, x, route, j) {

    if (byID(`${day}Time${x}`).value === "")
        return true;

    if (byID(`${route}Route${j}`).value === "")
        return true;

    if (byID(`${day}${route}${j}Ct`).value === "")
        return false;

    return true;
}

function testSpecCounts(day, x, route, j) {

    if (byID(`${day}Time${x}`).value === "")
        return true;

    if (byID(`${route}Route${j}`).value !== "")
        return true;

    return false;
}



function testAMPMRoute(day, num) {
    let bln = true;
    let bln2 = true;
    let val = "";

    for (let j = 1; j < 6; j++) {
        if (byID(`${day}Time${num}`).value !== "" && byID(`AMRoute${j}`).value !== "" && byID(`${day}AM${j}Ct`).value === "")
            bln = false;

        if (byID(`${day}Time1`).value !== "" && byID("input[id*='AMRoute']").value === "")
            bln2 = false;
    }
    if (!bln)
        val += "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";
}


function testTimeComplete() {
    let val = "";
    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 11; j < 17; j++) {
            if (byID(`${day}Time${j}S`).value !== "" && byID(`${day}Time${j}E`).value === "")
                val += "<p class='varp'>&bull;" + fullday[i] + ": Time not completed.</p>";
        }
    }
    return val;
}
/********************VALIDATION AND COMPLETION********************/
/********************CALCULATIONS********************/
//TEXTBOX UPDATE FUNCTION. CHECK FOR OVERLAPPING TIME AND THEN CALCULATE TOTAL TIME
function timeCalculation(refID) {
    let num = Number(refID.substr(-3, 2));
    let day = refID.substr(0, 3);

    //Check if field is used for pupil time, return if true
    if (isNaN(refID.substr(7, 2)))
        return;

    if (num > 19 && num < 30) {
        if (byID(`${day}Select${num}`).value === "") {
            openPopUp("<p>Work type must be selected first</p>");
            byID(refID).value = "";
            return;
        }
    }
    //Check for overlapping times
    checkOverlap(refID);

    //Calculate the difference in time
    calculateDiff(refID);

    getDailyTotals();

    if (refID.substr(7, 2) > 19 && refID.substr(7, 2) < 30) {
        countOtherWork(refID);
    }

    if (refID.substr(7, 2) > 29 && refID.substr(7, 2) < 35) {
        countFieldTrips(refID);
    }
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
    let thisStart = (refID.substr(-1) === "S") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 9) + "S").value);
    let thisEnd = (refID.substr(-1) === "E") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 9) + "E").value);
    if (thisStart === thisEnd) {
        openPopUp("<p>Start time cannot match end time.</p>");
        byID(refID).value = "";
        return;
    }
    let numVal = Number(refID.substr(7, 2));
    let day = refID.substr(0, 3);

    let max = (day === "Sat" || day === "Sun") ? 33 : 43;
    let i = (day === "Sat" || day === "Sun") ? 20 : 11;

    for (i; i < max; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 22 && i < 30) continue;
        if ((day === "Sat" || day === "Sun") && i > 32 && i < 35) continue;
        if (i === 18 || i === 19) continue;
        if (i > 34 && i < 41) continue;
        if (i === numVal) continue;

        //Initialize newStart and newEnd
        newStart = convertToMinutes(byID(`${day}Time${i}S`).value);
        //If newStart is blank then move to next i
        if (newStart === 0) continue;

        newEnd = convertToMinutes(byID(`${day}Time${i}E`).value);
        if (newEnd === 0) continue;

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
    let day = refID.substr(0, 3);

    //Declare variables and initialize values
    let startTime = (refID.substr(-1) === "S") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 9) + "S").value);
    let endTime = (refID.substr(-1) === "E") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 9) + "E").value);
    let num = Number(refID.substr(7, 2));
    let timeDiff = 0;
    let totalID = refID.substr(0, refID.length - 1);

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
    objThis[day][totalID] = byID(totalID).value;
}

//CALCULATE DAILY RUN TIME
function dailyRuns(day) {
    "use strict";
    if (day === "Sat" || day === "Sun") return;

    let sum = 0;
    for (let i = 11; i < 18; i += 1) {
        sum += convertToMinutes(byID(`${day}Time${i}`).value);
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(`${day}RunTotal`).value = sum;
    setObject(`${day}RunTotal`);
}

//CALCULATE DAILY OTHER WORK TIME
function dailyOther(day) {
    "use strict";
    //Declare variables and initialize values
    let sum = 0;
    let selectVal;

    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        selectVal = byID(`${day}Select${i}`).value;
        if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
        sum += convertToMinutes(byID(`${day}Time${i}`).value);
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(`${day}OtherTotal`).value = sum;
}

//CALCULATE CALLBACK TIME
function sumCPay() {
    "use strict";
    let c1 = 0;
    let c3 = 0;
    let sum = 0;
    let selectVal;

    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j === 23) break;
            selectVal = byID(`${day}Select${j}`).value;
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes(byID(`${day}Time${j}`).value) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
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

//CALCULATE DAILY FIELD TRIP TIME
function dailyFT(day) {
    "use strict";
    //Declare variables and initialize values
    let sum = 0;

    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 33) break;
        sum += Number(byID(`${day}Time${i}`).value);
    }
    sum = setToFixed(sum);
    byID(`${day}FTTotal`).value = sum;
}

//CALCULATE DAILY Q/L TIME
function dailyQL(day) {
    "use strict";
    let sum = 0;

    //If Q/L is checked, total up run, pac, shuttles, late run time
    if (day !== "Sat" && day !== "Sun" && byID(`${day}QL11`).checked) {
        for (let i = 11; i < 18; i += 1) {
            sum += convertToMinutes(byID(`${day}Time${i}`).value);
        }
    }

    //If Other Work Q/L is checked, add the time
    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 22) continue;
        sum += (byID(`${day}QL${i}`).checked) ? convertToMinutes(byID(`${day}Time${i}`).value) : 0;
    }

    //If Q/L is checked for field trips, add time
    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 32) continue;
        sum += (byID(`${day}QL${i}`).checked) ? (Number(byID(`${day}Time${i}`).value) * 60) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(`${day}QLTotal`).value = sum;
}

//Daily leave checkboxes
function checkLeaveToggle(refID) {
    "use strict";
    let day = refID.substr(0, 3);
    checkAllDayLeave(day);
}

//Toggle lift checkboxes on/off, set them in storage and run totals
function checkboxQL(refID) {
    "use strict";
    let blnmatch = false;
    let bln = false;
    let day = refID.substr(0, 3);
    let array = [`${day}QL11`, `${day}QL12`, `${day}QL13`, `${day}QL14`, `${day}QL15`, `${day}QL16`, `${day}QL17`];

    for (let i = 0; i < 7; i += 1) {
        if (array[i] === refID) {
            bln = (byID(refID).checked) ? true : false;
            blnmatch = true;
            break;
        }
    }
    if (blnmatch) {
        for (let i = 0; i < 7; i += 1) {
            byID(array[i]).prop("checked", bln);
            objThis[day][array[i]] = bln;
        }
    } else {
        bln = (byID(refID).checked) ? true : false;
        objThis[day][refID] = bln;
    }

    dailyQL(day);
}

function getDailyTotals() {
    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        dailyRuns(day);
        dailyOther(day);
        dailyFT(day);
        dailyQL(day);
    }
    getWeeklyTotals();
}

//Run calculations for the whole week and set the values into local storage
function getWeeklyTotals() {
    //Declare variables and initialize the values
    let sum = 0;

    //Clear Hours worked
    byID("TotalHW").value = "";
    objThis.Data.TotalHW = "";
    sumCPay();

    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 11; j < 18; j++) {
            sum += convertToMinutes(byID(`${day}Time${j}`).value);
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    objThis.Data.TotalRun = sum;
    byID("TotalRun").value = sum;

    sum = 0;
    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        for (let j = 20; j < 30; j++) {
            if ((i === 0 || i === 6) && j > 22) continue;
            let selectVal = byID(`${day}Select${j}`).value;
            if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
            sum += convertToMinutes(byID(`${day}Time${j}`).value);
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    objThis.Data.TotalOther = sum;
    byID("TotalOther").value = sum;

    sum = 0;
    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        for (let j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            sum += Number(byID(`${day}Time${j}`).value);
        }
    }
    sum = setToFixed(sum);
    objThis.Data.TotalFT = sum;
    byID("TotalFT").value = sum;


    sum = convertToMinutes(objThis.Data.TotalRun) + convertToMinutes(objThis.Data.TotalOther);
    sum = Number(convertTotal(sum));
    sum += Number(objThis.Data.TotalFT);
    sum += Number(byID("TotalHW").value);
    sum = setToFixed(sum);
    objThis.Data.TotalHW = sum;
    byID("TotalHW").value = sum;

    sum = 0;
    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        if (i > 0 && i < 6 && byID(`${day}QL11`).checked) {
            sum += convertToMinutes(byID(`${day}Time11`).value);
            sum += convertToMinutes(byID(`${day}Time12`).value);
            sum += convertToMinutes(byID(`${day}Time13`).value);
            sum += convertToMinutes(byID(`${day}Time14`).value);
            sum += convertToMinutes(byID(`${day}Time15`).value);
            sum += convertToMinutes(byID(`${day}Time16`).value);
            sum += convertToMinutes(byID(`${day}Time17`).value);
        }

        for (let j = 20; j < 30; j++) {
            if ((i === 0 || i === 6) && j > 22) continue;
            sum += (byID(`${day}QL${j}`).checked) ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
        }

        for (let j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            sum += (byID(`${day}QL${j}`).checked) ? (Number(byID(`${day}Time${j}`).value) * 60) : 0;
        }
    }
    sum = convertTotal(sum);
    objThis.Data.TotalS2QL = sum;
    byID("TotalS2QL").value = sum;

    sum = 0;
    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        if (byID(`${day}J11`).checked) {
            sum += convertToMinutes(byID(`${day}Time11`).value);
            sum += convertToMinutes(byID(`${day}Time12`).value);
            sum += convertToMinutes(byID(`${day}Time13`).value);
            sum += convertToMinutes(byID(`${day}Time14`).value);
            sum += convertToMinutes(byID(`${day}Time15`).value);
            sum += convertToMinutes(byID(`${day}Time16`).value);
            sum += convertToMinutes(byID(`${day}Time17`).value);
        }
    }
    sum = convertTotal(sum);
    objThis.Data.TotalS4J = sum;
    byID("TotalS4J").value = sum;

    sum = convertToMinutes(objThis.Data.TotalRun) + convertToMinutes(objThis.Data.TotalOther);
    sum += (objThis.Data.Area === "TC") ? 0 : 15;
    sum = convertTotal(sum);
    objThis.Data.Total1R = sum;
    byID("Total1R").value = sum;

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!byID("OJT").checked)
        return;

    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 11; j < 30; j++) {
            if (j === 18 || j === 19) continue;
            sum += (byID(`${day}OJT${j}`).checked) ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
        }
        for (let j = 30; j < 35; j++) {
            sum += (byID(`${day}OJT${j}`).checked) ? (Number(byID(`${day}Time${j}`).value) * 60) : 0;
        }
    }
    sum = convertTotal(sum);
    objThis.Data.TotalS4OJT = sum;
    byID("TotalS4OJT").value = sum;
    setStorage();
}
/********************CALCULATIONS********************/
