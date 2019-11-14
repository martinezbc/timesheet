//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage() {
    let week = byID('WeekOf').value;
    localStorage.setItem(`${week}ObjS`, JSON.stringify(objThis));
}

let objThis = localStorage.getItem(`${byID("WeekOf").value}ObjS`);

document.addEventListener('DOMContentLoaded', () => {
    const readOnly = docObj('[data-disable-touch-keyboard]');
    Array.from(readOnly).forEach((e) => {
        e.readOnly = true;
    });
    arrEach(docObj(".chkADLV"), 'click', (e) => {
        checkADLeave(e);
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
    loadOJT();
    toggleOWFT();
    toggleSupLeave();
}

function updateWeekAll() {
    let strHTML =
        `<option value="">Select Date...</option>
                <option value="${objThis.Sup.SatDate}">${objThis.Sup.SatDate}</option>
                <option value="${objThis.Sup.SunDate}">${objThis.Sup.SunDate}</option>
                <option value="${objThis.Sup.MonDate}">${objThis.Sup.MonDate}</option>
                <option value="${objThis.Sup.TueDate}">${objThis.Sup.TueDate}</option>
                <option value="${objThis.Sup.WedDate}">${objThis.Sup.WedDate}</option>
                <option value="${objThis.Sup.ThuDate}">${objThis.Sup.ThuDate}</option>
                <option value="${objThis.Sup.FriDate}">${objThis.Sup.FriDate}</option>`;

    for (let i = 20; i < 45; i++) {
        i = (i === 35) ? 40 : i;
        byID(`Date${i}`).innerHTML = strHTML;
    }
}
//LOAD ALL ELEMENTS INTO LOCAL STORAGE AND THEN PULL VALUES
function loadLocalStorage() {
    let entries = Object.entries(objThis.Sup);
    for (const [key, value] of entries) {
        if (key === "Area" || key === "Team" || key === "Position" || key === "Total1R") continue;
        const e = byID(key.replace("Sup", ""));
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
    if (localStorage.getItem(`${week}ObjS`) === null) {
        objThis = objNew;

        storeWeekDays(week);

        objThis.Sup.WeekOf = byID("WeekOf").value;
        setStorage();
    } else {
        objThis = JSON.parse(localStorage.getItem(`${week}ObjS`));
        storeWeekDays(week);
    }
}

function storeWeekDays(week) {
    //Store first day of week range in y and shortened date in ny
    const startDate = week.substr(0, 2) + "/" + week.substr(2, 2) + "/" + week.substr(4, 4);
    const endDate = week.substr(8, 2) + "/" + week.substr(10, 2) + "/" + week.substr(12, 4);

    let satDate = new Date(startDate);

    objThis.Sup.SatDate = startDate.substr(0, 5);
    objThis.Sup.FriDate = endDate.substr(0, 5);
    objThis.Sup.SunDate = createDate(satDate, 0)
    objThis.Sup.MonDate = createDate(satDate, 1)
    objThis.Sup.TueDate = createDate(satDate, 2)
    objThis.Sup.WedDate = createDate(satDate, 3)
    objThis.Sup.ThuDate = createDate(satDate, 4)
}

function createDate(satDate, i) {
    let newDay = addDate(satDate, i + 1);
    let sm = newDay.getMonth() + 1;
    let sd = newDay.getDate();
    sm = (sm.toString().length === 1) ? "0" + sm : sm;
    sd = (sd.toString().length === 1) ? "0" + sd : sd;
    return sm + "/" + sd;
}

//LOAD OJT AND TRAINEE DATA; DISABLE/ENABLE ALL OTHER OJT CHECKBOXES
function loadOJT() {
    objThis.Sup.OJT = byID("OJT").checked;
    let bln = objThis.Sup.OJT;

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

    if (numVal < 30 && byID(`Select${numVal}`).value === "") {
        openPopUp("<p>Work type must be selected first.</p>");
        byID(refID).value = "";
        return;
    }

    //Initialize variables
    let thisStart = (refID.substr(-2) === "S") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 6) + "S").value);
    let thisEnd = (refID.substr(-2) === "E") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 6) + "E").value);
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

//CLEAR TIME FIELDS
function clearTimeField(e) {
    resetTime(e.target.id.substr(-2));
    getWeeklyTotals();
}

//TOGGLE LEAVE IF THERE IS LEAVE FILLED OUT
function toggleSupLeave() {
    for (let i = 40; i < 45; i++) {
        let bln = (objThis.Sup[`SupLeaveAD${i}`]) ? true : false;
        if (bln)
            toggleADLeave(bln, i);
        else
            bln = (objThis.Sup[`SupTime${i}`] !== "") ? true : false;

        showHide(byID(`LVDiv${i}`), bln);
    }
}

function checkADLeave(e) {
    const refID = e.target.id;
    let num = refID.substr(-2);

    const bln = e.target.checked;
    toggleADLeave(bln, num);
}

function toggleADLeave(bln, num) {
    byID(`Time${num}S`).disabled = bln;
    byID(`Time${num}S`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`Time${num}E`).disabled = bln;
    byID(`Time${num}E`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`Time${num}`).disabled = bln;
    byID(`Time${num}`).style.backgroundColor = (bln) ? "lightgrey" : "white";

    if (bln)
        resetTime(num);
}

function openTimesheet() {
    let emp = "";
    emp = byID("EmpInitials").value;
    emp = emp.toUpperCase();
    objThis.Sup.EmpInitials = emp;
    setStorage();

    showHide(byID("validateModal"), false);
    if (emp !== "") {

        //Set week value into local storage for preview and timesheet to use
        localStorage.setItem('WeekOfS', byID("WeekOf").value);
        window.open("previewsup.html", "_self");
        
    }
}

function testEmpData() {
    let val = "";

    //Check Area
    if (objThis.Sup.Area === "")
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (objThis.Sup.Team === "")
        val += "<p class='varp'>&bull;Team not selected.</p>";

    //Check employee name
    if (objThis.Sup.EmpName === "")
        val += "<p class='varp'>&bull;Employee name not entered</p>";

    //Check position
    if (objThis.Sup.Position === "")
        val += "<p class='varp'>&bull;Employee position not selected.</p>";

    return val;
}

function testFieldTrip() {
    let val = "";
    let blnTime = false;

    //Check field trips
    for (let j = 30; j < 35; j++) {
        blnTime = (objThis.Sup[`SupTime${j}`] !== "") ? true : false;
        if (blnTime && (objThis.Sup[`SupVoucher${j}`] === "" || objThis.Sup[`SupFrom${j}`] === "" || objThis.Sup[`SupTo${j}`] === ""))
            val += "<p class='varp'>&bull;Field Trip: Voucher, From and To fields cannot be blank.</p>";

        if ((objThis.Sup[`SupVoucher${j}`] !== "" || objThis.Sup[`SupFrom${j}`] !== "" || objThis.Sup[`SupTo${j}`] !== "") && !blnTime)
            val += "<p class='varp'>&bull;Field Trip: No time entered.</p>";
    }

    return val;
}

function testOtherWork() {
    let val = "";


    for (let j = 20; j < 30; j++) {
        if (objThis.Sup[`SupTime${j}`] === "" && objThis.Sup[`SupSelect${j}`] !== "" && objThis.Sup[`SupSelect${j}`] !== "FYI")
            val += "<p class='varp'>&bull;Other Work: No time entered.</p>";

        if (objThis.Sup[`SupTime${j}`] !== "" && objThis.Sup[`SupSelect${j}`] === "")
            val += "<p class='varp'>&bull;Other Work: Category is required.</p>";

        if ((objThis.Sup[`SupSelect${j}`] === "OT" || objThis.Sup[`SupSelect${j}`] === "FYI") && objThis.Sup[`SupDesc${j}`] === "")
            val += "<p class='varp'>&bull;Other Work: Description is required when Other or FYI selected.</p>";
    }
    return val;
}

function testLeave() {
    let val = "";

    for (let j = 40; j < 45; j++) {
        if (objThis.Sup[`SupTime${j}`] !== "") {
            if (objThis.Sup[`SupSelect${j}`] === "")
                val += "<p class='varp'>&bull;Leave: Type of leave is required.</p>";
        } else {
            if (!objThis.Sup[`SupLeaveAD${j}`] && objThis.Sup[`SupSelect${j}`] !== "")
                val += "<p class='varp'>&bull;Leave: Leave type selected but no time was entered.</p>";
        }
        if (objThis.Sup[`SupLeaveAD${j}`]) {
            if (objThis.Sup[`SupSelect${j}`] === "")
                val += "<p class='varp'>&bull;Leave: Type of leave is required.</p>";
        }
    }

    return val;
}

function testTimeComplete() {
    let val = "";
    for (let j = 20; j < 45; j++) {
        if (objThis.Sup[`SupTime${j}S`] !== "" && objThis.Sup[`SupTime${j}E`] === "")
            val += "<p class='varp'>&bull;: Time not completed.</p>";
    }
    return val;
}
