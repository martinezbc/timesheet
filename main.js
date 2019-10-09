function byID(refID) {
    return document.getElementById(refID);
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const fulldays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/* 
EMPLOYEE DAYA 
*/

//INSERT AREA RADIO BUTTONS
const areas = ["1", "2", "3", "4", "7", "TC"];
for (const area of areas) {
    byID('divarea').innerHTML += `<input type="radio" id="area${area}" name="Area" value="${area}"><label for="area${area}">${area}</label>`;
}

//INSERT TEAM RADIO BUTTONS
for (const area of areas) {
    byID('divteam').innerHTML += `<div class="hide" id="div${area}"></div>`;
}

const teams7 = ['ACA', 'ALTM', 'ALTP', 'AUR', 'CARD', 'FCPS', 'FR', 'IVY', 'KING', 'KK', 'KT', 'LAB', 'LOU', 'MATH', 'PHIL', 'RIV', 'SCOL'];
for (let i = 1; i < 5; i++) {
    for (let j = 0; j < 8; j++) {
        let div = "div" + i;
        byID(div).innerHTML += `<input type="radio" id="team${`${i}${j}`}" name="Team" value="${`${i}${j}`}"><label for="team${`${i}${j}`}">${`${i}${j}`}</label>`;
    }
}

for (const team of teams7) {
    byID("div7").innerHTML += `<input type="radio" id="team${team}" name="Team" value="${team}"><label for="team${team}">${team}</label>`;
}

byID("divTC").innerHTML += '<input type="radio" id="teamTC" name="Team" value="TC"><label for="teamTC">TC</label>';

//INSERT POSITION RADIO BUTTONS
const positions = ['Driver', 'Driver Trainee', 'Sub Driver', 'Attendant', 'Unassigned Attendant', 'Attendant Trainee', 'Sub Attendant', 'Activity Driver'];
for (const position of positions) {
    byID("divposition").innerHTML += `<input type="radio" id="pos${position.replace(' ', '')}" name="Position" value="${position}"><label for="pos${position.replace(' ', '')}">${position}</label>`;
}

/* 
OTHER WORK
FIELD TRIPS
LEAVE
*/

//INSERT OTHER WORK CARDS
for (let i = 20; i < 25; i++) {
    byID("otherwork").innerHTML += `
                <div class="tinycard bg-teal2" id="OWDiv${i}"><div class="row"><div class="category col-11">Other Work<span class="fas fa-question-circle ow"></span></div><div class="col-1 center"><span class="fas fa-trash-alt" id="OWTrash${i}"></span></div></div><div class="row"><div class="col-auto"><input type="checkbox" class="chkOJT" id="OJT${i}"><label class="lblBtnFalse" for="OJT${i}">OJT</label><input type="checkbox" id="QL${i}" disabled><label class="lblBtnFalse" for="QL${i}">Q/L</label></div></div><div class="row"><div class="col-12"><select id="Select${i}" class="selectwidth selectOW"><option value="">--Select work--</option><option value="FYI">FYI</option><option value="OTHR">Other</option><option value="GT">Garage trip</option><option value="FUEL">Fuel</option><option value="RC">Run coverage</option><option value="Q/L">Q/L Coverage</option><option value="CPR">CPR/First Aid</option><option value="RCRT">Recertification</option><option value="MTNG">Meeting</option><option value="TRNG">Training</option><option value="MED">Physical/Drug Test</option><option value="CS">Cold start team</option><option value="ES2">2 Hr Delay - Early start</option><option value="ES0">On Time - Early start</option><option value="CBK">Call back</option></select></div></div><div class="row"><div class="col-12"><input id="Desc${i}" type="text" class="descwidth owdesc" style="text-align: left;" placeholder="Additional notes..." spellcheck="true" autocorrect="on"></div></div><div class="row"><div class="col-11"><input type="text" id="Time${i}S" class="timewidth txtTime" placeholder="- - : - -"><input type="text" id="Time${i}E" class="timewidth txtTime" placeholder="- - : - -"><input type="text" id="Time${i}" class="total-time nofocus" disabled></div>
                <div class="col-1"><span class="fas fa-times" id="ClearOW${i}"></span></div></div></div>`;
}

//INSERT FIELD TRIP CARDS
for (let i = 30; i < 35; i++) {
    byID("fieldtrip").innerHTML += `
                <div class="tinycard bg-teal3" id="FTDiv${i}">
                <div class="row">
                <div class="category col-11">Field Trip
                <span class="fas fa-question-circle ft"></span></div>
                <div class="col-1 center">
                <span class="fas fa-trash-alt" id="FTTrash${i}"></span></div></div>
                <div class="row">
                <div class="col-6">
                <input id="Voucher${i}" type="text" class="voucherwidth ftvoucher" placeholder="Voucher"></div>
                <div class="col-6 center">
                <input type="checkbox" class="chkOJT" id="OJT${i}"><label class="lblBtnFalse" for="OJT${i}">OJT</label>
                <input type="checkbox" class="chkFTQL" id="QL${i}"><label class="lblBtnFalse" for="QL${i}">Q/L</label></div></div>
                <div class="row"><div class="col-12">
                <input id="From${i}" type="text" placeholder="Origin..." style="text-align:left;" class="ftwidth txtFT"></div></div>
                <div class="row"><div class="col-12">
                <input id="To${i}" type="text" placeholder="Destination..." style="text-align:left;" class="ftwidth txtFT"></div></div>
                <div class="row"><div class="col-11">
                <input type="text" id="Time${i}S" class="timewidth txtTime" placeholder="- - : - -">
                <input type="text" id="Time${i}E" class="timewidth txtTime" placeholder="- - : - -">
                <input type="text" id="Time${i}" class="total-time nofocus" disabled></div>
                <div class="col-1">
                <span class="fas fa-times" id="ClearFT${i}"></span></div></div></div>`;
}

//INSERT ALL DAY LEAVE CARD
byID("leave").innerHTML += `
                <div class="tinycard bg-gold" id="LVDivAD"><div class="row"><div class="col-11">
                <p class="category">Leave - All Day</p></div>
                <div class="col-1"><span class="fas fa-trash-alt" id="LVTrashAD"></span></div></div><div class="row">
                <div class="col-8"><select id="LeaveSelectAD">
                <option value="">--Select Leave--</option>
                <option value="SICK-IND">Sick-Indv</option>
                <option value="SICK-FAM">Sick-Family</option>
                <option value="PERSONAL">Personal</option>
                <option value="LWOP">LWOP</option>
                <option value="CIVIL">Civil</option>
                <option value="SICK-FMLA">FMLA</option>
                <option value="SICK-INJ">Injury</option>
                </select></div>
                <div class="col-4"><input type="checkbox" class="chkLV" id="LeaveAD"><label for="LeaveAD">ALL DAY</label></div>
                </div></div>`;

//INSERT LEAVE CARDS
for (let i = 40; i < 42; i++) {
    byID("leave").innerHTML += `
                <div class="tinycard bg-gold" id="LVDiv${i}"><div class="row"><div class="col-11">
                <p class="category">Leave - ${(i === 40) ? 'AM/PM' : 'Other'}</p></div>
                <div class="col-1"><span class="fas fa-trash-alt" id="LVTrash${i}"></span></div></div><div class="row">
                <div class="col-12">
                <select id="LeaveSelect${i}">
                <option value="">--Select Leave--</option>
                <option value="SICK-IND">Sick-Indv</option>
                <option value="SICK-FAM">Sick-Family</option>
                <option value="PERSONAL">Personal</option>
                <option value="LWOP">LWOP</option>
                <option value="CIVIL">Civil</option>
                <option value="SICK-FMLA">FMLA</option>
                <option value="SICK-INJ">Injury</option>
                </select></div></div><div class="row">
                <input id="Time${i}S" type="text" class="timewidth txtTime" placeholder="- - : - -">&nbsp; 
                <input id="Time${i}E" type="text" class="timewidth txtTime" placeholder="- - : - -">&nbsp;
                <input id="Time${i}" type="text" class="total-time nofocus" disabled></div></div>`;
}

/*
INSERT DATE RANGES INTO WEEKOF FIELD
*/

byID("WeekOf").innerHTML += '<option value="">--Select Week--</option>';
for (let i = -21; i < 8; i += 7) {
    let range = DateRange(i);
    byID("WeekOf").innerHTML += `<option value="${dateString(range)}">${range}</option>`;
}

function DateRange(offset) {
    let start = new Date();
    let end = new Date();
    let options = {year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/New_York'};
    let day = start.getDay();
    let sOffset = -(day + 1) < -6 ? 0 : -(day + 1);
    let eOffset = sOffset + 6;
    start.setDate(start.getDate() + (sOffset + offset));
    end.setDate(end.getDate() + (eOffset + offset));

    return start.toLocaleDateString("en-US", options) + ' - ' + end.toLocaleDateString("en-US", options);
}

//REPLACE ALL FUNCTION
function replaceAll(text, find, replace){
  while (text.toString().indexOf(find) != -1)
      text = text.toString().replace(find, replace);
  return text;
}

//CONVERT DATE STRING INTO STRAIGHT NUMBERS ONLY
function dateString(strDate) {
    strDate = replaceAll(strDate, "/", "");
    return strDate.replace(" - ","");
}

/*
DOCUMENT LOAD EVENTS
*/
document.addEventListener('DOMContentLoaded', (event) => {
    let week = localStorage.getItem('WeekOf') || "";
    if (week === "") {
        byID("WeekOf").selectedIndex = 4;
    } else {
        byID("WeekOf").value = week;
        storeWeek();
    }
});

//GET DAY FROM LOCAL STORAGE OR CREATE A NEW WEEK IN LOCAL STORAGE
function storeWeek() {
    let week = localStorage.getItem('WeekOf') || "";
    if (week === "") return;
    
    if (localStorage.getItem(`${week}Obj`) === null) { //No object found, create new week
        objThis = objNew;
        
        storeWeekDays(week);

        loadPrevWeek(week);
        objThis.Data.WeekOf = weekof.value;
        setStorage();
    } else { //Object found, load saved JSON data
        objThis = JSON.parse(localStorage.getItem(`${week}Obj`));

        storeWeekDays(week);
    }
    //Load data from JSON
    loadStoredWeek();
    loadLocalStorage();
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
    
    let refDate = new Date();
    let day = refDate.getDay();
    toggleDay(day);
}

function addDate(date, days) {
    let copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

//CHANGE NAV BAR VALUES DEPENDING ON THE DAY
function toggleDay(x) {
    //Set prev, today, and next text values
    const prev = (x - 1 < 0) ? 6 : x - 1;
    const next = (x + 1 > 6) ? 0 : x + 1;
    byID("prev").innerHTML = `${days[prev]}-` + objThis.Data[`${days[prev]}Date`];
    byID("today").innerHTML = `${days[x]}-` + objThis.Data[`${days[x]}Date`];
    byID("next").innerHTML = `${days[next]}-` + objThis.Data[`${days[next]}Date`];
    
    const counts = document.querySelectorAll('.txtCt');
    for (count of counts)
        count.placeholder = days[x];
    
    byID("daily_title").innerHTML = fulldays[x] + ` - <span id="Date">${objThis.Data[`${days[x]}Date`]}</span>`;
    
    togglePupilCounts(x);
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
