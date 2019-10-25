//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage() {
    let week = byID('WeekOf').value;
    localStorage.setItem(`${week}ObjS`, JSON.stringify(objThis));
}
//SET ELEMENT VALUE INTO OBJECTS
function setObject(refID) {
    if (refID === 'WeekOf') return;
    const e = byID(refID);

    if (e.type === 'checkbox') {
        objThis[refID] = (e.checked) ? true : false;
    } else {
        objThis[refID] = e.value;
    }
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

    objThis[parent] = e.value;
    getWeeklyTotals();
    setStorage();
}

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    let ftText = "";
    let ftselect = byID('ftselector').value;
    if (ftselect !== null && ftselect !== "")
        ftText = byID('ftselector').value;
    else
        ftText = byID('fttype').value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    objThis[activeID] = ftText;
    showHide(byID('ftModal'), false);
    setStorage();
}

//RESET VALUE OF ELEMENT
function resetElement(refID) {
    const e = byID(refID);
    if (e.type === "checkbox") {
        objThis[refID] = false;
        e.checked = false;
    } else {
        objThis[refID] = "";
        e.value = "";
    }
}

let objThis = localStorage.getItem(`${byID("WeekOf").value}ObjS`);

document.addEventListener('DOMContentLoaded', () => {
    const readOnly = docObj('[data-disable-touch-keyboard]');
    Array.from(readOnly).forEach((e) => {
        e.readOnly = true;
    });

    if (localStorage.getItem("WeekOfS") !== null) {
        byID("WeekOf").value = localStorage.getItem("WeekOfS");
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
    localStorage.setItem("WeekOfS", byID("WeekOf").value);
    storeWeek();
    updateWeekAll();
    loadLocalStorage();
    loadRadioSelection();
}

function updateWeekAll() {    
    let strHTML = 
                `<option value="">Select Date...</option>
                <option value="${objThis.SatDate}">${objThis.SatDate}</option>
                <option value="${objThis.SunDate}">${objThis.SunDate}</option>
                <option value="${objThis.MonDate}">${objThis.MonDate}</option>
                <option value="${objThis.TueDate}">${objThis.TueDate}</option>
                <option value="${objThis.WedDate}">${objThis.WedDate}</option>
                <option value="${objThis.ThuDate}">${objThis.ThuDate}</option>
                <option value="${objThis.FriDate}">${objThis.FriDate}</option>`;

    for (let i = 20; i < 45; i++) {
        i = (i === 35) ? 40 : i;
        byID(`Date${i}`).innerHTML = strHTML;
    }
}
//LOAD ALL ELEMENTS INTO LOCAL STORAGE AND THEN PULL VALUES
function loadLocalStorage() {
    let entries = Object.entries(objThis);
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

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    let ftText = "";
    let ftselect = byID('ftselector').value;
    if (ftselect !== null && ftselect !== "")
        ftText = byID('ftselector').value;
    else
        ftText = byID('fttype').value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    objThis[activeID] = ftText;
    showHide(byID('ftModal'), false);
    setStorage();
}

//GET DAY FROM LOCAL STORAGE OR CREATE A NEW WEEK IN LOCAL STORAGE
function storeWeek() {
    let week = byID("WeekOf").value;
    if (localStorage.getItem(`${week}ObjS`) === null) {
        objThis = objNew;

        storeWeekDays(week);

        objThis.WeekOf = byID("WeekOf").value;
        setStorage();
    } else {
        objThis = JSON.parse(localStorage.getItem(`${week}ObjS`));
        storeWeekDays(week);
    }

    if (objThis.AreaS !== null) { //Add this bit to ensure the old object format is cleared from local storage
        localStorage.removeItem(`${week}ObjS`);
        objThis = objNew;
        storeWeekDays(week);

        objThis.WeekOf = byID("WeekOf").value;
        setStorage();
    }
}

function storeWeekDays(week) {
    //Store first day of week range in y and shortened date in ny
    const startDate = week.substr(0, 2) + "/" + week.substr(2, 2) + "/" + week.substr(4, 4);
    const endDate = week.substr(8, 2) + "/" + week.substr(10, 2) + "/" + week.substr(12, 4);

    let satDate = new Date(startDate);

    objThis.SatDate = startDate.substr(0, 5);
    objThis.FriDate = endDate.substr(0, 5);

    for (let i = 4; i >= 0; i--) {
        let newDay = addDate(satDate, i + 1);
        let sm = newDay.getMonth() + 1;
        let sd = newDay.getDate();
        sm = (sm.toString().length === 1) ? "0" + sm : sm;
        sd = (sd.toString().length === 1) ? "0" + sd : sd;
        objThis[`${days[i]}Date`] = sm + "/" + sd;
    }
}


//FIND STORED VALUE FOR AREA, TEAM, POSITION, WEEKOF AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    const area = objThis.Area;
    const team = objThis.Team;
    let pos = objThis.Position;
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
    const area = objThis.Area;

    let areadiv = ["div1", "div2", "div3", "div4", "div7", "divTC"];
    for (const div of areadiv) {
        if ("div" + area === div)
            showHide(byID(div), true);
        else
            showHide(byID(div), false);
    }

    if (area === "TC") {
        byID("teamTC").checked = true;
        objThis.Team = "TC";
    }
}

//LOAD OJT AND TRAINEE DATA; DISABLE/ENABLE ALL OTHER OJT CHECKBOXES
function loadOJT() {
    objThis.OJT = byID("OJT").checked;
    let bln = objThis.OJT;

    if (bln) {
        disableElement('Trainee', false);
    } else {
        disableElement('Trainee', true);
        resetElement("Trainee");
    }

    const chkOJT = docObj(".chkOJT");
    for (const ojt of chkOJT) {
        if (ojt.id === "OJT") continue;
        ojt.disabled = !bln;
        if (!bln) resetElement(ojt.id);
    }
}

//SET AREA SELECTION AND THEN LOAD TEAM RADIO SELECTIONS
function radioAreaSelect(e) {
    objThis.Team = "";
    loadTeamValues();
}

//TOGGLE OTHER WORK FIELDS
function addLeave(e) {
    let countLV = getMissingLV();
    if (countLV === 45) return;
    showHide(byID(`LVDiv${countLV}`), true);
}

function getMissingLV() {
    for (let i = 40; i < 45; i++) {
        if (byID(`LVDiv${i}`).classList.contains("hide")) {
            return i;
        }
    }
    //If statement didnt' find a match, return 45
    return 45;
}

//CHECK FOR OVERLAPPING TIME VALUES
function checkOverlap(refID) {
	"use strict";

    //Define variables
    let bln = false;
    
    //If element has no value then return
    if (byID(refID).value === "")
        return;
    
    let numVal = Number(refID.substr(-3, 2));
    if (byID(`Date${numVal}`).value === "") {
        openPopUp("<p>Date must be selected first.</p>");
        byID(refID).value = "";
        return;
    }
    
    if (byID(`Select${numVal}`).value === "") {
        openPopUp("<p>Work type must be selected first.</p>");
        byID(refID).value = "";
        return;
    }
    
    //Initialize variables
    let thisStart = (refID.substr(-2) === "S")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,6) + "S").value);
    let thisEnd = (refID.substr(-2) === "E")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,6) + "E").value);
    if (thisStart === thisEnd) {
        openPopUp("<p>Start time cannot match end time.</p>");
        byID(refID).value = "";
        return;
    }
    
    for (let v = 40; v < 45; v++) {
        if (byID(`LeaveAD${v}`).checked && byID(`Date${numVal}`).value == byID(`Date${v}`).value) {
            openPopUp("<p>All day leave was used for this day</p>");
            byID(refID).value = "";
            return;
        }
    }

    let max = 45;
    let i = 20;

    for (i; i < max; i++) {
        if (i > 34 && i < 40) continue;
        if (byID(`Date${numVal}`).value !== byID(`Date${i}`).value) continue;
        
        if (i === numVal) continue;

        //Initialize newStart and newEnd
        const newStart = convertToMinutes(byID(`Time${i}S`).value);
        //If newStart is blank then move to next i
        if (newStart === 0) continue;

        const newEnd = convertToMinutes(byID(`Time${i}E`).value);
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



//CALCULATE CALLBACK TIME
function sumCPay() {
    "use strict";
    let c1 = 0;
    let c3 = 0;
    let sum = 0;
    let selectVal;

        for (let j = 20; j < 30; j++) {
            selectVal = objThis[`Select${j}`];
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes(objThis[`Time${j}`]) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes(objThis[`Time${j}`]) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes(objThis[`Time${j}`]) : 0;
        }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    objThis.TotalC1 = c1;
    byID("TotalC1").value = c1;

    sum = convertTotal(sum);
    objThis.TotalHW = sum;
    byID("TotalHW").value = sum;

    c3 = (c3 === 0) ? "" : convertTotal(c3);
    objThis.TotalC3 = c3;
    byID("TotalC3").value = c3;
}

//CLEAR TIME FIELDS
function clearTimeField(e) {
    resetTime(e.target.id.substr(-2));
    getWeeklyTotals();
}
