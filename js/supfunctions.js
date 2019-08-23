//DECLARE VARIABLES
var activeID = "";
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//INITIAL LOAD
document.addEventListener('DOMContentLoaded', function () {
    showHide("weekModalS", true);
});

/********************EVENT LISTENERS********************/
//Checkbox on click store into local storage
var checkbox = document.querySelectorAll("input[type='checkbox']");
for (var i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", function (e) {
        setObject(e.currentTarget.id);
    });
}

//Radio on change store into local storage
var radio = document.querySelectorAll("input[type='radio']");
for (var i = 0; i < radio.length; i++) {
    radio[i].addEventListener("change", storeRadioValue);
}

//Textbox on change
var textbox = document.querySelectorAll("input[type='text'], input[type='number']");
for (i = 0; i < textbox.length; i++) {
    textbox[i].addEventListener("change", textboxOnChange);
}

//Make selection on select element
var select = document.querySelectorAll("select");
for (i = 0; i < select.length; i++) {
    select[i].addEventListener("change", function (e) {
        setObject(e.currentTarget.id);
    });
}

//Area selection
var radioarea = document.querySelectorAll("input[name='AreaS']");
for (i = 0; i < radioarea.length; i++) {
    radioarea[i].addEventListener("change", radioAreaSelect);
}

//OJT checked
var chkOJT = document.querySelectorAll("input[name='chkOJTS']");
for (i = 0; i < chkOJT.length; i++) {
    chkOJT[i].addEventListener("click", checkOJT);
}

//Position changed
var position = document.querySelectorAll("input[name='SupPosition']");
for (i = 0; i < position.length; i++) {
    position[i].addEventListener("change", positionChange);
}

//QL checked
var chkQL = document.querySelectorAll("input[name='chkQLS']");
for (i = 0; i < chkQL.length; i++) {
    chkQL[i].addEventListener("click", toggleQL);
}

//All day leave checked
var chkADLV = document.querySelectorAll("input[name='chkADLV']");
for (i = 0; i < chkADLV.length; i++) {
    chkADLV[i].addEventListener("click", toggleLeaveTime);
}

//Add Other Work click
var addOW = document.querySelectorAll(".addOW");
for (i = 0; i < addOW.length; i++) {
    addOW[i].addEventListener("click", addOtherWork);
}
//Add Field Trip click
var addFT = document.querySelectorAll(".addFT");
for (i = 0; i < addFT.length; i++) {
    addFT[i].addEventListener("click", addFieldTrip);
}

//Add Leave click
var addLV = document.querySelectorAll(".addLV");
for (i = 0; i < addLV.length; i++) {
    addLV[i].addEventListener("click", addLeave);
}

//Click on Trash Alt
var faTrashAlt = document.querySelectorAll(".fa-trash-alt");
for (i = 0; i < faTrashAlt.length; i++) {
    faTrashAlt[i].addEventListener("click", removeOWFT);
}

//Click in time fields to open Time Selector
var txtTime = document.querySelectorAll("input[name='txtTime']");
for (i = 0; i < txtTime.length; i++) {
    txtTime[i].addEventListener("click", openTimeSelector);
}

//Click in time fields to open Time Selector
var txtFT = document.querySelectorAll("input[name='txtFT']");
for (i = 0; i < txtFT.length; i++) {
    txtFT[i].addEventListener("click", openFTSelector);
}

//Click on other work question mark
var ow = document.querySelectorAll(".ow");
for (i = 0; i < ow.length; i++) {
    ow[i].addEventListener("click", popUpOW);
}

//Click on field trip question mark
var ft = document.querySelectorAll(".ft");
for (i = 0; i < ft.length; i++) {
    ft[i].addEventListener("click", popUpFT);
}

//Close Time selector
byID("closeTimeS").addEventListener("click", function () {
    byID(activeID).disabled = false;
    showHide("timeModalS", false);
});

//Close Field Trip selector
byID("closeFTS").addEventListener("click", function () {
    byID(activeID).disabled = false;
    showHide("ftModalS", false);
});

//Close various modal
byID("endVariousS").addEventListener("click", function () {
    showHide("variousModalS", false);
});

//Close validation modal
byID("endValidateS").addEventListener("click", function () {
    showHide("validateModalS", false);
});

//Click on checkmark on time selector
byID("goTimeS").addEventListener("click", function () {
    var timetext = byID("hoursS").innerHTML;
    timetext += ":" + byID("minutesS").innerHTML;
    timetext += " " + byID("meridiemS").innerHTML;
    byID(activeID).disabled = false;
    byID(activeID).value = timetext;
    setObject(activeID);
    showHide("timeModalS", false);
    timeCalculation(activeID);
});

//Click on checkmark on field trip selector
byID("goFTS").addEventListener("click", storeFTVal);

//Veh textbox keyup
var veh = document.querySelectorAll("#Veh1S, #Veh2S, #Veh3S, #Veh4S");
for (i = 0; i < veh.length; i++) {
    veh[i].addEventListener("keyup", function (e) {
        limitCharacters(e.currentTarget.id, 4);
    });
}

//Up and Down arrow on click
var timeArrows = document.querySelectorAll(".up, .down, .up2, .down2");
for (i = 0; i < timeArrows.length; i++) {
    timeArrows[i].addEventListener("click", timeSelectors);
}

//Times on click
var faTimes = document.querySelectorAll(".fa-times");
for (i = 0; i < faTimes.length; i++) {
    faTimes[i].addEventListener("click", clearTimeField);
}

//Copy on click
var faCopy = document.querySelectorAll(".fa-copy");
for (i = 0; i < faCopy.length; i++) {
    faCopy[i].addEventListener("click", copyRoutine);
}

//Clear on click
byID("clearS").addEventListener("click", function () {
    openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>');
});

var selectOW = document.querySelectorAll("select[name='selectOW']");
for (i = 0; i < selectOW.length; i++) {
    selectOW[i].addEventListener("change", selectOWChange);
}

byID("navbtnS").addEventListener("click", function () {
    showHide("navbtnS", true);
});

//Open Change Week Modal
byID("chgWeekS").addEventListener("click", function () {
    showHide("weekModalS", true)
});
/********************EVENT LISTENERS********************/

//SELECT WEEK
function changeWeek() {
    if (byID("WeekOfS").value === "") return;
    showHide("weekModalS", false);
    byID("PayWeekS").innerHTML = "Pay Week: " + dateString(byID("WeekOfS").value);
    initialLoad();
}

function initialLoad() {
    storeWeek();
    updateWeekAll();
    var val = "";
    var keyArr = 0;
    var key = "";
    
    keyArr = Object.keys(objThis);
    for (var i = 0; i < keyArr.length; i += 1) {
        key = keyArr[i];
        if (key === "AreaS" || key === "TeamS" || key === "PositionS" || key === "Total1RS" || key === "WeekOfS") continue;
        if (byID(key) === null) continue;
        if (objThis[key] === true || objThis[key] === false) {
            byID(key).checked = objThis[key];    
        } else {
            byID(key).value = objThis[key];
        }        
    }

    loadRadioSelection();
    loadOJT();
    checkOWFT();
    loadLV();
    getWeeklyTotals();
}

//FIND STORED VALUE FOR AREA, TEAM, POSITION, WEEKOF AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    var area = objThis.AreaS;
    var team = objThis.TeamS;
    var pos = objThis.PositionS;
    
    var i = 0;
    
    //Load area from local storage and set radio selection
    if (area !== "") {
        byID("area" + area + "S").checked = true;
    } else {
        area = document.querySelectorAll("input[name='AreaS']");
        for (i = 0; i < area.length; i += 1)
            area[i].checked = false;
    }

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    if (team !== "" && team.substr(0, 1) === area) {
        byID("team" + team + "S").checked = true;
    } else {
        team = document.querySelectorAll('input[name="TeamS"]');
        for (i = 0; i < team.length; i += 1)
            team[i].checked = false;
    }

    //Load position from local storage and set radio selection
    if (pos !== "") {
        pos = pos.replace(" ", "");
        byID("pos" + pos + "S").checked = true;
    } else {
        pos = document.querySelectorAll('input[name="PositionS"]');
        for (i = 0; i < pos.length; i += 1)
            pos[i].checked = false;
    }
}

//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues() {
    "use strict";
    var area = objThis.AreaS;
    if (area === null || area === "") return;

    var areadiv = ["div1S", "div2S", "div3S", "div4S", "div7S", "divTCS"];
    for (var i = 0; i < areadiv.length; i++) {
        if ("div" + area + "S" === areadiv[i]) {
            showHide(areadiv[i], true);
        } else {
            showHide(areadiv[i], false);
        }
    }
    if (area === "TC") byID("teamTCS").checked = true;
}

//SET EACH DAY IN MM/DD FORMAT INTO LOCAL STORAGE
function storeWeek() {
    var week = byID("WeekOfS").value;
    if (localStorage.getItem(week + "Obj") === null) {
        objThis = objNew;
        
        //Store first day of week range in y and shortened date in ny
        var startDate = week.substr(0,2) + "/" + week.substr(2,2) + "/" + week.substr(4,4);

        //Store second day of week range in z and shortened date in nz
        var endDate = week.substr(8,2) + "/" + week.substr(10,2) + "/" + week.substr(12,4),
            satDate = new Date(startDate),
            sm, sd;

        objThis.SatDateS = startDate.substr(0, 5);
        objThis.FriDateS = endDate.substr(0, 5);

        for (var i = 4; i >= 0; i--) {
            newDay = addDate(satDate, i + 1);
            sm = newDay.getMonth() + 1;
            sd = newDay.getDate();
            sm = (sm.toString().length === 1) ? "0" + sm : sm;
            sd = (sd.toString().length === 1) ? "0" + sd : sd;
            objThis[days[i] + "DateS"] = sm + "/" + sd;
        }
        objThis.WeekOfS = byID("WeekOfS").value;
        setStorage();
    } else {
        objThis = JSON.parse(localStorage.getItem(week + "Obj"));
    }
}

function updateWeekAll() {
    var strHTML = "";
    var val = [];

    for (var i = 0; i < 7; i++) {
        val[i] = objThis[days[i] + "DateS"];
    }

    strHTML += '<option value="" id="After' + i + 'S">Select Date...</option>';
    strHTML += '<option value="' + val[6] + '">' + val[6] + '</option>';
    strHTML += '<option value="' + val[0] + '">' + val[0] + '</option>';
    strHTML += '<option value="' + val[1] + '">' + val[1] + '</option>';
    strHTML += '<option value="' + val[2] + '">' + val[2] + '</option>';
    strHTML += '<option value="' + val[3] + '">' + val[3] + '</option>';
    strHTML += '<option value="' + val[4] + '">' + val[4] + '</option>';
    strHTML += '<option value="' + val[5] + '">' + val[5] + '</option>';

    for (i = 20; i < 45; i++) {
        i = (i === 35) ? 40 : i;
        byID("Date" + i + "S").innerHTML = strHTML;
    }
}

//DATEADD FUNCTION
function addDate(date, days) {
    var copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

//LOAD OJT AND TRAINEE DATA; DISABLE/ENABLE ALL OTHER OJT CHECKBOXES
function loadOJT() {
    var bln = objThis.OJTS;

    var t = byID("TraineeS");
    if (bln) {
        t.disabled = false;
        t.style.backgroundColor = "white";
    } else {
        t.disabled = true;
        t.style.backgroundColor = "lightgrey";
        resetElement("TraineeS");
    }

    var ojt = document.querySelectorAll("input[name='chkOJTS']");
    for (var i = 0; i < ojt.length; i++) {
        if (ojt[i].id === "OJTS") continue;
        if (ojt[i].checked && !bln) ojt[i].click();
        ojt[i].disabled = !bln;
    }
}

//TOGGLE OW AND FT BOXES SO THAT THEY SHOW IF THEY HAVE VALUES
function checkOWFT() {
    var val = "";
    for (var i = 20; i < 30; i++) {
        val = objThis["Date" + i + "S"];
        if (val === "") val = objThis["Select" + i + "S"];
        if (val === "") val = objThis["Desc" + i + "S"];
        if (val === "") val = objThis["Time" + i + "SS"];
        if (val === "") val = objThis["Time" + i + "ES"];
        if (val === "") val = objThis["Time" + i + "S"];
        if (val !== "") showHide("OWDiv" + i + "S", true);
    }
    
    val = "";
    for (i = 30; i < 35; i++) {
        val = objThis["Date" + i + "S"];
        if (val === "") val = objThis["Voucher" + i + "S"];
        if (val === "") val = objThis["From" + i + "S"];
        if (val === "") val = objThis["To" + i + "S"];
        if (val === "") val = objThis["Time" + i + "SS"];
        if (val === "") val = objThis["Time" + i + "ES"];
        if (val === "") val = objThis["Time" + i + "S"];
        if (val !== "") showHide("FTDiv" + i + "S", true);
    }
    
    val = "";
    for (i = 40; i < 45; i++) {
        val = objThis["Date" + i + "S"];
        if (val === "") val = objThis["LeaveAD" + i + "S"];
        if (!val) val = objThis["Time" + i + "SS"];
        if (val === "") val = objThis["Time" + i + "ES"];
        if (val === "") val = objThis["Time" + i + "S"];
        if (val !== "") showHide("LVDiv" + i + "S", true);
    }
    
}

//SET AREA SELECTION AND THEN LOAD TEAM RADIO SELECTIONS
function radioAreaSelect(e) {
    objThis.TeamS = "";
    loadTeamValues();
}

//OJT CHECKBOX CLICK
function checkOJT(e) {
    var refID = e.currentTarget.id;
    if (refID === "OJTS") loadOJT();

    getWeeklyTotals();
}

//TOGGLE OTHER WORK FIELDS
function addOtherWork() {
    var countOW = getMissingOW();
    if (countOW === 30) return;
    showHide("OWDiv" + countOW + "S", true);
}

//TOGGLE FIELD TRIP FIELDS
function addFieldTrip() {
    var countFT = getMissingFT();

    //Exit function if count is 5
    if (countFT === 35) return;
    showHide("FTDiv" + countFT + "S", true);
}

//TOGGLE OTHER WORK AND FIELD TRIP FIELDS OFF
function removeOWFT(e) {
    var refID = e.currentTarget.id;
    var x = refID.substr(-3, 2);
    var type = refID.substr(0, 2);

    showHide(type + "Div" + x + "S", false);
    if (type === "FT") {
        resetElement("Date" + x + "S");
        resetElement("To" + x + "S");
        resetElement("From" + x + "S");
        resetElement("Voucher" + x + "S");
        resetElement("QL" + x + "S");
    } else if (type === "OW") {
        resetElement("Date" + x + "S");
        resetElement("Select" + x + "S");
        resetElement("Desc" + x + "S");
        resetElement("OJT" + x + "S");
        byID("QL" + x + "S").disabled = true;
        resetElement("QL" + x + "S");
    } else if (type === "LV") {
        resetElement("Date" + x + "S");
        resetElement("LeaveAD" + x + "S");
        leaveTime("LeaveAD" + x + "S");
        resetElement("Select" + x + "S");
    }
    resetTime("", x);
    getWeeklyTotals();
}

//CLEAR TIME FIELDS
function clearTimeField(e) {
    var fieldID = e.target.id;
    var num = fieldID.substr(-3,2);

    resetTime("", num);
    getWeeklyTotals();
}

//FIGURE OUT WHICH OW FIELD IS NEXT TO SHOW
function getMissingOW() {
    for (var i = 20; i < 30; i++) {
        if (byID("OWDiv" + i + "S").classList.contains("hide")) {
            return i;
        }
    }
    //If statement didnt' find a match, return 30
    return 30;
}

//FIGURE OUT WHICH FT FIELD IS NEXT TO SHOW
function getMissingFT() {
    for (var i = 30; i < 35; i++) {
        if (byID("FTDiv" + i + "S").classList.contains("hide")) {
            return i;
        }
    }
    //if statement didn't find a match, return 35
    return 35;
}

//SHOW THE LEAVE SECTION
function addLeave() {
    var countLV = getMissingLV();
    if (countLV === 45) return;
    showHide("LVDiv" + countLV + "S", true);
}


//FIGURE OUT WHICH FT FIELD IS NEXT TO SHOW
function getMissingLV() {
    for (var i = 40; i < 45; i++) {
        if (byID("LVDiv" + i + "S").classList.contains("hide")) {
            return i;
        }
    }
    //if statement didn't find a match, return 35
    return 45;
}

//CHECK DATE HAS BEEN SELECTED BEFORE TIME HAS BEEN PUT IN
function checkOWFTDate(refID) {
    var x = refID.substr(-4,2);
    var bln = (byID("Date" + x + "S").value === "") ? false : true;
    if (!bln) {
        byID(refID).disabled = false;
        byID("Date" + x + "S").focus();
        openPopUp("<p>You must select a date first.</p>");
    }
    return bln;
}

//CLEAR LOCAL STORAGE AND RELOAD PAGE
function clearFields() {
    showHide("variousModalS", false);
    localStorage.removeItem(byID("WeekOfS").value + "Obj");
    location.reload();
}

//ENABLE OR DISABLE QL BUTTON DEPENDING ON WHAT IS SELECTED FOR OTHER WORK
function selectOWChange(e) {
    var refID = e.currentTarget.id;
    disableOWFields(refID);
    getWeeklyTotals();
}

function disableOWFields(refID) {
    var refVal = byID(refID).value;
    var x = refID.substr(-3,2);
    var bln = (refVal === "FYI") ? true : false;
    byID("Time" + x + "SS").disabled = bln;
    byID("Time" + x + "ES").disabled = bln;
    byID("Time" + x + "SS").style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID("Time" + x + "ES").style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID("Time" + x + "S").style.backgroundColor = (bln) ? "lightgrey" : "white";

    bln = (refVal === "Q/L") ? true : false;
    byID("QL" + x + "S").checked = bln;
    byID("QL" + x + "S").disabled = !bln;
    setObject("QL" + x + "S");
}

function toggleQL() {
    getWeeklyTotals();
}

//ALL DAY LEAVE CHECKED, DISABLE TIME FIELDS
function toggleLeaveTime(e) {
    var refID = e.currentTarget.id;
    leaveTime(refID);
}

function leaveTime(refID) {
    var bln = (byID(refID).checked) ? true : false;
    var x = refID.substr(-3,2);
    if (bln) resetTime("", x);
    disableElement("Time" + x + "SS", bln);
    disableElement("Time" + x + "ES", bln);
    byID("Time" + x + "S").style.backgroundColor = (bln) ? "lightgrey" : "white";
}

function loadLV() {
    for (var i = 40; i < 45; i++) {
        leaveTime("LeaveAD" + i + "S");
    }
}

/********************VALIDATION AND COMPLETION********************/
function completeTimesheet() {
    var bln = runValidations();
    if (!bln)
        return;

    showHide("validateModalS", true);
    byID("EmpInitialsS").focus();
}

function openTimesheet() {
    var emp = "";
    emp = byID("EmpInitialsS").value;
    emp = emp.toUpperCase();
    objThis.EmpInitialsS = emp;

    showHide("validateModalS", false);
    if (emp !== "")
        window.open("previewsup.html?WeekOf=" + byID("WeekOfS").value, "_self");
}

function runValidations() {
    var val = "";

    val = testEmpData() + testOtherWork() + testFieldTrip() + testLeave();

    if (val !== "") {
        openPopUp(val);
        return false;
    } else {
        return true;
    }
}

function testEmpData() {
    var val = "";

    //Check selected week
    if (objThis.WeekOfS === "")
        val = "<p class='varp'>&bull;Pay week not selected.</p>";

    //Check Area
    if (objThis.AreaS === "")
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (objThis.TeamS === "")
        val += "<p class='varp'>&bull;Team not selected.</p>";

    //Check employee name
    if (objThis.EmpNameS === "")
        val += "<p class='varp'>&bull;Employee name not entered</p>";

    //Check position
    if (objThis.PositionS === "")
        val += "<p class='varp'>&bull;Employee position not selected.</p>";

    return val;
}

function testFieldTrip() {
    var val = "";

    for (var j = 30; j < 35; j++) {
        if (byID("Time" + j + "S").value === "") { //Time is blank
            if (byID("Voucher" + j + "S").value !== "" || byID("From" + j + "S").value !== "" || byID("To" + j + "S").value !== "")
                val += "<p class='varp'>&bull; Field Trip: No time entered.</p>";

        } else { //Time is not blank
            if (byID("Voucher" + j + "S").value === "")
                val += "<p class='varp'>&bull; Field Trip: Voucher number cannot be blank.</p>";

            if (byID("From" + j + "S").value === "" || byID("To" + j + "S").value === "")
                val += "<p class='varp'>&bull; Field Trip: From and To location cannot be blank.</p>";
        }
    }
    return val;
}

function testOtherWork() {
    var val = "";

    for (var j = 20; j < 30; j++) {
        if (byID("Time" + j + "S").value !== "") { //Time is not blank
            if (byID("Select" + j + "S").value === "") { //Select IS blank
                val += "<p class='varp'>&bull; Other Work: Category is required.</p>";
            }
            if ((byID("Select" + j + "S").value === "OT" || byID("Select" + j + "S").value === "FYI") && byID("Desc" + j + "S").value === "") { //Other or FYI selected but description field is blank
                val += "<p class='varp'>&bull; Other Work: Description is required when Other or FYI selected.</p>";
            }
            if (byID("Select" + j + "S").value === "" && byID("Desc" + j + "S").value !== "") { //Nothing selected and description field has text
                val += "<p class='varp'>&bull; Other Work: Description entered without category selection.</p>";
            }
        } else { //Time is blank
            if (byID("Select" + j + "S").value !== "" || byID("Desc" + j + "S").value !== "") { //Category IS selected OR Description field is NOT blank
                if (!byID("Select" + j + "S").value === "FYI") { //Category is NOT FYI
                    val += "<p class='varp'>&bull; Other Work: No time entered.</p>";
                }
            }
        }
    }

    return val;
}

function testLeave() {
    var val = "";

//    for (var i = 1; i < 6; i++) {
//        for (var j = 41; j < 43; j++) {
//            if (byID("Time" + j + "S").value !== "") {
//                if (byID("LeaveSelect" + j + "S").value === "")
//                    val += "<p class='varp'>&bull; Leave: Type of leave is required.</p>";
//            } else {
//                if (byID("LeaveSelect" + j + "S").value !== "")
//                    val += "<p class='varp'>&bull; Leave: Leave type selected but no time was entered.</p>";
//            }
//            if (byID("LeaveAD").checked) {
//                if (byID("LeaveSelectAD").value === "")
//                    val += "<p class='varp'>&bull; Leave: Type of leave is required.</p>";
//            } else {
//                if (byID("LeaveSelectAD").value !== "")
//                    val += "<p class='varp'>&bull; Leave: All day leave type selected but checkbox left unchecked.</p>";
//            }
//        }
//    }
    return val;
}

/********************VALIDATION AND COMPLETION********************/
/********************TIME CALCULATIONS********************/
//TEXTBOX UPDATE FUNCTION. CHECK FOR OVERLAPPING TIME AND THEN CALCULATE TOTAL TIME
function timeCalculation(refID) {

    //Check for overlapping times
    checkOverlap(refID);
    //Calculate the difference in time
    calculateDiff(refID);
    //run weekly totals
    getWeeklyTotals();
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
    var thisStart = (refID.substr(-2) === "SS")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,6) + "SS").value);
    var thisEnd = (refID.substr(-2) === "ES")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,6) + "ES").value);
    if (thisStart === thisEnd) {
        openPopUp("<p>Start time cannot match end time.</p>");
        byID(refID).value = "";
        return;
    }
    var numVal = Number(refID.substr(-4, 2));

    var max = 45;
    var i = 20;

    for (i; i < max; i++) {
        if (i > 34 && i < 40) continue;
        if (byID("Date" + numVal + "S").value !== byID("Date" + i + "S").value) continue;
        if (i === numVal) continue;

        //Initialize newStart and newEnd
        newStart = convertToMinutes(byID("Time" + i + "SS").value);
        //If newStart is blank then move to next i
        if (newStart === 0) continue;

        newEnd = convertToMinutes(byID("Time" + i + "ES").value);
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

    //Declare variables and initialize values
    var startTime = (refID.substr(-2) === "SS")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,6) + "SS").value);
    var endTime = (refID.substr(-2) === "ES")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,6) + "ES").value);
    var num = Number(refID.substr(-4, 2));
    var timeDiff = 0;
    var totalID = "Time" + num + "S";

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
    setObject(totalID);
}

//CALCULATE DAILY OTHER WORK TIME
function supOther() {
	"use strict";
    //Declare variables and initialize values
    var sum = 0, selectVal;

    for (var i = 20; i < 30; i++) {
        selectVal = byID("Select" + i + "S").value;
        sum += (selectVal !== "CBK" && selectVal !== "ES0" && selectVal !== "ES2") ? convertToMinutes(byID("Time" + i + "S").value) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    return sum;
}

//CALCULATE CALLBACK TIME
function sumCPay() {
	"use strict";
    var c1 = 0,
        c3 = 0,
        sum = 0,
        selectVal;

    for (var i = 20; i < 30; i++) {
        selectVal = byID("Select" + i + "S").value;
        c1 += (selectVal === "CBK") ? 240 : 0;
        c3 += (selectVal === "ES0") ? convertToMinutes(byID("Time" + i + "S").value) : 0;
        c3 += (selectVal === "ES2") ? convertToMinutes(byID("Time" + i + "S").value) + 120 : 0;
        sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes(byID("Time" + i + "S").value) : 0;
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    objThis.TotalC1S = c1;
    byID("TotalC1S").value = c1;

    sum = convertTotal(sum);
    objThis.TotalHWS = sum;
    byID("TotalHWS").value = sum;

    c3 = (c3 === 0) ? "" : convertTotal(c3);
    objThis.TotalC3S = c3;
    byID("TotalC3S").value = c3;
}

//CALCULATE DAILY FIELD TRIP TIME
function supFT() {
    "use strict";
    //Declare variables and initialize values
    var sum = 0;

    for (var i = 30; i < 35; i++) {
        sum += Number(byID("Time" + i + "S").value);
    }
    sum = setToFixed(sum);
    return sum;
}

//CALCULATE DAILY Q/L TIME
function supQL() {
	"use strict";
    var sum = 0;

    for (var i = 20; i < 30; i++) {
        sum += (byID("QL" + i + "S").checked) ? convertToMinutes(byID("Time" + i + "S").value) : 0;
    }   
    for (i = 30; i < 35; i++) {
        sum += (byID("QL" + i + "S").checked) ? (Number(byID("Time" + i + "S").value) * 60) : 0;
    }
    sum = convertTotal(sum);
    sum = setToFixed(sum);
    return sum;
}

//Run calculations for the whole week and set the values into local storage
function getWeeklyTotals() {
    //Declare variables and initialize the values
    var sum = 0,
        j = 0;

    //Clear Hours worked
    byID("TotalHWS").value = "";
    objThis.TotalHWS = "";
    sumCPay();

    sum = supOther();
    objThis.TotalOtherS = sum;
    byID("TotalOtherS").value = sum;

    sum = supFT();
    objThis.TotalFTS = sum;
    byID("TotalFTS").value = sum;

    sum = convertToMinutes(objThis.TotalOtherS);
    sum = Number(convertTotal(sum));
    sum += Number(objThis.TotalFTS);
    sum += Number(byID("TotalHWS").value);
    sum = setToFixed(sum);
    objThis.TotalHWS = sum;
    byID("TotalHWS").value = sum;

    sum = supQL();    
    objThis.TotalS2QLS = sum;
    byID("TotalS2QLS").value = sum;

    sum = convertToMinutes(objThis.TotalOtherS);
    sum = convertTotal(sum);
    objThis.Total1RS = sum;

    sum = 0;
    for (j = 20; j < 30; j++) {
        sum += (byID("OJT" + j + "S").checked) ? convertToMinutes(byID("Time" + j + "S").value) : 0;
    }
     for (j = 30; j < 35; j++) {
        sum += (byID("OJT" + j + "S").checked) ? (Number(byID("Time" + j + "S").value) * 60) : 0;
    }
    sum = convertTotal(sum);
    objThis.TotalS4S = sum;
    byID("TotalS4S").value = sum;
    setStorage();
}
    
//********************TIME CALCULATIONS********************//