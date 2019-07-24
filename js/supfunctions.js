//DECLARE VARIABLES
var activeID = "";
var eventChange = new Event("change");
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//INITIAL LOAD
document.addEventListener('DOMContentLoaded', function () {
    initialLoad();
});

/****************************************EVENT LISTENERS****************************************/
//Checkbox on click store into local storage
var checkbox = document.querySelectorAll("input[type='checkbox']");
for (var i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", storeCheckboxValue);
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
    select[i].addEventListener("change", selectOnChange);
}

//Area selection
var radioarea = document.querySelectorAll("input[name='AreaS']");
for (i = 0; i < radioarea.length; i++) {
    radioarea[i].addEventListener("change", radioAreaSelect);
}

//Week selection
byID("week1S").addEventListener("change", updateWeek);
byID("week2S").addEventListener("change", updateWeek);
byID("week3S").addEventListener("change", updateWeek);
byID("week4S").addEventListener("change", updateWeek);

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

//EQL checked
var chkEQL = document.querySelectorAll("input[name='chkEQL']");
for (i = 0; i < chkEQL.length; i++) {
    chkEQL[i].addEventListener("click", toggleEQLReg);
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
    byID(activeID).dispatchEvent(eventChange);
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

window.addEventListener("click", toggleSupMenu);
/****************************************EVENT LISTENERS****************************************/

/****************************************LOCAL STORAGE****************************************/
//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage(refID, val) {
    localStorage.setItem(refID, val);
}

//FIND ITEM BY ID IN LOCAL STORAGE AND RETURN VALUE
function getStorage(refID) {
    return localStorage.getItem(refID);
}

//STORE CHECKBOX VALUE
function storeCheckboxValue(e) {
    setStorage(e.currentTarget.id, (e.currentTarget.checked) ? "1" : "0");
}

//INPUT NUMBER AND INPUT TEXT ON CHANGE EVENT
function textboxOnChange(e) {
    var refID = e.currentTarget.id;
    if (refID === "TraineeS" || refID === "EmpNameS") {
        byID(refID).value = properCase(e.currentTarget.value);
    }
    setStorage(refID, e.currentTarget.value);
}

//SET RADIO SELECTION
function storeRadioValue(e) {
    setStorage(e.currentTarget.name, e.currentTarget.value);
}

//SELECT ON CHANGE EVENT
function selectOnChange(e) {
    var refID = e.currentTarget.id;
    setStorage(refID, e.currentTarget.value);
}
/****************************************LOCAL STORAGE****************************************/

//SHORTEN DOCUMENT.GETELEMENTBYID
function byID(id) {
    return document.getElementById(id);
}

function initialLoad() {
    var val = "";
    var elements = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < elements.length; i++) {
        val = (getStorage(elements[i].id) === null) ? "0" : getStorage(elements[i].id);
        elements[i].checked = (val === "1") ? true : false;
        setStorage(elements[i].id, val);
    }

    elements = document.querySelectorAll("input[type='text'], select");
    for (i = 0; i < elements.length; i++) {
        val = (getStorage(elements[i].id) === null) ? "" : getStorage(elements[i].id);
        elements[i].value = val;
        setStorage(elements[i].id, val);
        toggleOWFT(elements[i].id);
    }

    loadRadioSelection();
}

//FIND STORED VALUE FOR AREA, TEAM, POSITION, WEEKOF AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    //Load area from local storage and set radio selection
    if (getStorage("AreaS") === null) setStorage("AreaS", "");
    var val = getStorage("AreaS");
    if (val !== "") byID("area" + val + "S").checked = true;

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    if (getStorage("TeamS") === null) setStorage("TeamS", "");
    val = getStorage("TeamS");
    if (val !== "" && val.substr(0, 1) === getStorage("AreaS")) byID("team" + val + "S").checked = true;

    //Load position from local storage and set radio selection
    if (getStorage("PositionS") === null) setStorage("PositionS", "");
    val = getStorage("PositionS");
    if (val !== "") {
        val = val.replace(" ", "");
        byID("pos" + val + "S").checked = true;
    }

    //Load weekof from local storage and set radio selection
    if (getStorage("WeekOfS") === null) setStorage("WeekOfS", "");
    val = getStorage("WeekOfS");
    if (val !== "" && val === byID("week1S").value) {
        byID("week1S").checked = true;
        updateWeek(byID("week1S"));
    } else if (val !== "" && val === byID("week2S").value) {
        byID("week2S").checked = true;
        updateWeek(byID("week2S"));
    } else if (val !== "" && val === byID("week3S").value) {
        byID("week3S").checked = true;
        updateWeek(byID("week3S"));
    } else if (val !== "" && val === byID("week4S").value) {
        byID("week4S").checked = true;
        updateWeek(byID("week4S"));
    }
}

//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues() {
    "use strict";
    var area = getStorage("AreaS");
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
function storeWeek(refID) {
    //Store element value in refVal and set into local storage
    var refVal = byID(refID).value;

    //Store first day of week range in y and shortened date in ny
    var startDate = refVal.substr(0, 10);

    //Store second day of week range in z and shortened date in nz
    var endDate = refVal.substr(13),
        satDate = new Date(startDate),
        sm, sd;

    setStorage("SatDateS", startDate.substr(0, 5));
    setStorage("FriDateS", endDate.substr(0, 5));

    for (var i = 4; i >= 0; i--) {
        newDay = addDate(satDate, i + 1);
        sm = newDay.getMonth() + 1;
        sd = newDay.getDate();
        sm = (sm.toString().length === 1) ? "0" + sm : sm;
        sd = (sd.toString().length === 1) ? "0" + sd : sd;
        setStorage(days[i] + "Date" + "S", sm + "/" + sd);
    }
}

//SET DAYS WHEN WEEK IS CHANGED
function updateWeek(e) {
    var refID = (e.target === undefined) ? e.id : e.currentTarget.id;
    storeWeek(refID);
    var strHTML = "";
    var val = [];

    for (var i = 0; i < 7; i++) {
        val[i] = getStorage(days[i] + "DateS");
    }

    strHTML += '<option value="" id="After' + i + 'S">Select Date...</option>';
    strHTML += '<option value="' + val[6] + '">' + val[6] + '</option>';
    strHTML += '<option value="' + val[0] + '">' + val[0] + '</option>';
    strHTML += '<option value="' + val[1] + '">' + val[1] + '</option>';
    strHTML += '<option value="' + val[2] + '">' + val[2] + '</option>';
    strHTML += '<option value="' + val[3] + '">' + val[3] + '</option>';
    strHTML += '<option value="' + val[4] + '">' + val[4] + '</option>';
    strHTML += '<option value="' + val[5] + '">' + val[5] + '</option>';

    for (i = 20; i < 35; i++) {
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
    var val = getStorage("OJTS");
    if (val === null) return;
    var bln = (val === "1") ? true : false;

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
function toggleOWFT(refID) {
    var num = "";
    if (refID.substr(3, 5) === "Time3") {
        num = refID.substr(7, 2);
        if (byID(refID).value !== "") showHide("FTDiv" + num, true);
    } else if (refID.substr(3, 7) === "Select2") {
        num = refID.substr(9, 2);
        if (byID(refID).value !== "") showHide("OWDiv" + num, true);
    }
}

//TOGGLE HIDE CLASS ON AND OFF BY REMOVING OR ADDING
function showHide(refID, bln) {
    var el = byID(refID);
    //(Show the element) ? remove hide : add hide
    if (bln) {
        if (el.classList.contains("hide")) el.classList.remove("hide");
    } else {
        if (!el.classList.contains("hide")) el.classList.add("hide");
    }
}

//SET AREA SELECTION AND THEN LOAD TEAM RADIO SELECTIONS
function radioAreaSelect(e) {
    setStorage("TeamS", "");
    loadTeamValues();
}

//OJT CHECKBOX CLICK
function checkOJT(e) {
    var refID = e.currentTarget.id;
    if (refID === "OJTS") loadOJT();

    getWeeklyTotalsS();
}

//CHANGE TO PROPER CASE
function properCase(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, function (txtVal) {
        return txtVal.toUpperCase();
    });
}

//CHECK LENGTH OF ELEMENT VALUE, IF EXCEEDING NUM THEN SHOW POP UP ERROR MESSAGE
function limitCharacters(refID, num) {
    var refVal = byID(refID).value;
    if (refVal.length > num) {
        openPopUp("<p class='varp'>Limit " + num + " characters.</p>");
        byID(refID).value = refVal.substr(0, num);
    }
}

//TOGGLE OTHER WORK FIELDS
function addOtherWork(e) {
    var refID = e.currentTarget.id;
    var countOW = getMissingOW();
    if (countOW === 30) return;
    showHide("OWDiv" + countOW + "S", true);
}

//TOGGLE FIELD TRIP FIELDS
function addFieldTrip(e) {
    var refID = e.currentTarget.id;
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
        resetElement("To" + x + "S");
        resetElement("From" + x + "S");
        resetElement("Voucher" + x + "S");
    } else if (type === "OW") {
        resetElement("Select" + x + "S");
        resetElement("Desc" + x + "S");
        resetElement("OJT" + x + "S");
        byID("Lift" + x + "S").disabled = true;
    }
    resetTime(x);
    resetElement("Lift" + x + "S");


    getWeeklyTotalsS();
}

//CLEAR TIME FIELDS
function clearTimeField(e) {
    var fieldID = e.target.id;
    var num = fieldID.substr(-3,2);

    resetTime(num);
    getWeeklyTotalsS();
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
function addLeave(e) {
//    var refID = e.currentTarget.id;
//    var dayVal = refID.substr(0, 3);
//    if (byID(dayVal + "Leave40").classList.contains("hide")) {
//        byID(dayVal + "LvP").innerHTML = '<span class="far fa-plus-square fa-lg"></span>Remove Leave';
//        showHide(dayVal + "Leave40", true);
//        showHide(dayVal + "Leave41", true);
//        showHide(dayVal + "Leave42", true);
//    } else {
//        byID(dayVal + "LvP").innerHTML = '<span class="far fa-plus-square fa-lg"></span>Add Leave';
//        showHide(dayVal + "Leave40", false);
//        showHide(dayVal + "Leave41", false);
//        showHide(dayVal + "Leave42", false);
//    }

}

//TIME SELECTOR MODAL
function openTimeSelector(e) {
    //Set current element as activeID
    activeID = e.currentTarget.id;
    //Disabled current element
    e.currentTarget.disabled = true;
    //Get value of element
    var refVal = byID(activeID).value;
    //If value is null then exit function
    if (refVal === null) return;

    //if active element has data already, break time into hrs, mins, and mer and load into spans
    if (refVal !== "") {
        var hours = refVal.substr(0, refVal.indexOf(":"));
        var mins = refVal.substr(refVal.indexOf(":") + 1, 2);
        var mer = refVal.substr(-2);
        byID("hoursS").innerHTML = hours;
        byID("minutesS").innerHTML = mins;
        byID("meridiemS").innerHTML = mer;
    } else {
        mins = round5(Number(byID("minutesS").innerHTML));
        if (mins < 10 && mins > -1) {
            mins = "0" + mins.toString();
        } else if (mins === 60) {
            mins = "55";
        }
        byID("minutesS").innerHTML = mins;
    }
    showHide("timeModalS", true);
}

//ADD VALUE TO UP AND DOWN ARROWS IN TIME SELECTOR THEN OPEN CHANGE VALUE FUNCTION
function timeSelectors(e) {
    var refID = e.currentTarget.id;
    var strVal = refID.substr(2),
        operator = "";
    switch (strVal) {
        case "upS":
            operator = 1;
            break;
        case "downS":
            operator = -1;
            break;
        case "up2S":
            operator = 2;
            break;
        case "down2S":
            operator = -2;
            break;
    }
    changeValue(operator, refID, activeID);
}

//ROUND TO THE NEAREST 5
function round5(x) {
    "use strict";
    return Math.round(x / 5) * 5;
}

//FIELD TRIP MODAL
function openFTSelector(e) {
    showHide("ftModalS", true);
    activeID = e.currentTarget.id;
    byID("ftselectorS").value = "";
    byID("fttypeS").value = "";
}

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    var ftText = "";
    if (byID("ftselectorS").value !== null)
        ftText = byID("ftselectorS").value;
    else
        ftText = byID("fttypeS").value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    byID(activeID).disabled = false;
    setStorage(activeID, ftText);
    showHide("ftModalS", false);
}

//CLEAR LOCAL STORAGE AND RELOAD PAGE
function clearFields() {
    window.localStorage.clear();
    location.reload();
}

//POP UP OW MESSAGE
function popUpOW() {
    openPopUp("<p class='varp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>");
}

//POP UP FT MESSAGE
function popUpFT() {
    openPopUp("<p class='varp'>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p class='varp'>&bull;Check lift if the trip required a lift.</p><p class='varp'>&bull;The start and end time must match what was recorded on the voucher.</p>");
}

//OPEN POP UP MODAL FOR ERROR MESSAGES
function openPopUp(msgVal) {
    byID("varDivS").innerHTML = msgVal;
    showHide("variousModalS", true);
}

//RESET VALUE OF ELEMENT
function resetElement(refID) {
    if (byID(refID).type === "checkbox") {
        byID(refID).checked = false;
        setStorage(refID, "0");
    } else {
        byID(refID).value = "";
        setStorage(refID, "");
    }
}

//RESET TIME FIELDS
function resetTime(num) {
    var refID = "Time" + num;
    resetElement(refID + "ES");
    resetElement(refID + "SS");
    resetElement(refID + "S");
}

//ENABLE OR DISABLE EQL BUTTON DEPENDING ON WHAT IS SELECTED FOR OTHER WORK
function selectOWChange(e) {
    var refID = e.currentTarget.id;
    disableOWFields(refID);
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

    bln = (refVal === "EQ/L") ? true : false;
    byID("Lift" + x + "S").checked = bln;
    byID("Lift" + x + "S").disabled = !bln;
    setStorage("Lift" + x + "S", (bln) ? "1" : "0");
}

//TOGGLE MENU ON AND OFF ON CLICK
function toggleSupMenu(e) {
    //Get ID of whatever triggered click event
    var refID = e.target.id;

    //Is nav dropdown hiding?
    var bln = (byID("navdropdownS").classList.contains("hide")) ? true : false;

    if (refID !== "navbtnS") {
        showHide("navdropdownS", false);
    } else {
        showHide("navdropdownS", bln);
    }
}

/****************************************VALIDATION AND COMPLETION****************************************/
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
    setStorage("EmpInitialsS", emp);

    showHide("validateModalS", false);
    if (emp !== "")
        window.open("suppreview.html", "_self");
}

function runValidations() {
    var val = "";

    val = testEmpData() + testOtherWork() + testFieldTrip() + testLeave() + testTimeComplete();


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
    if (getStorage("WeekOfS") === "")
        val = "<p class='varp'>&bull;Pay week not selected.</p>";

    //Check Area
    if (getStorage("AreaS") === "")
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (getStorage("TeamS") === "")
        val += "<p class='varp'>&bull;Team not selected.</p>";

    //Check employee name
    if (getStorage("EmpNameS") === "")
        val += "<p class='varp'>&bull;Employee name not entered</p>";

    //Check position
    if (getStorage("PositionS") === "")
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

    for (var i = 1; i < 6; i++) {
        for (var j = 41; j < 43; j++) {
            if (byID("Time" + j + "S").value !== "") {
                if (byID("LeaveSelect" + j + "S").value === "")
                    val += "<p class='varp'>&bull; Leave: Type of leave is required.</p>";
            } else {
                if (byID("LeaveSelect" + j + "S").value !== "")
                    val += "<p class='varp'>&bull; Leave: Leave type selected but no time was entered.</p>";
            }
            if (byID("LeaveAD").checked) {
                if (byID("LeaveSelectAD").value === "")
                    val += "<p class='varp'>&bull; Leave: Type of leave is required.</p>";
            } else {
                if (byID("LeaveSelectAD").value !== "")
                    val += "<p class='varp'>&bull; Leave: All day leave type selected but checkbox left unchecked.</p>";
            }
        }
    }
    return val;
}

/****************************************VALIDATION AND COMPLETION****************************************/

//Run calculations for the whole week and set the values into local storage
function getWeeklyTotalsS() {
    //Declare variables and initialize the values
    var i = 0,
        sum = 0,
        j = 0;

    //Clear Hours worked
    byID("TotalHW").value = "";
    setStorage("TotalHW", "");
    sumCPay();

    for (j = 20; j < 30; j++) {
        sum += convertToMinutes(getStorage("Time" + j + "S"));
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    setStorage("TotalOther", sum);
    byID("TotalOther").value = sum;

    sum = 0;
    for (j = 30; j < 35; j++) {
        sum += Number(getStorage("Time" + j + "S"));
    }
    sum = setToFixed(sum);
    setStorage("TotalFT", sum);
    byID("TotalFT").value = sum;


    sum = convertToMinutes(getStorage("TotalOther"));
    sum = Number(convertTotal(sum));
    sum += Number(getStorage("TotalFT"));
    sum += Number(byID("TotalHW").value);
    sum = setToFixed(sum);
    setStorage("TotalHW", sum);
    byID("TotalHW").value = sum;

    sum = 0;
    for (j = 20; j < 35; j++) {
        sum += (byID("Lift" + j + "S").checked) ? convertToMinutes(byID("Time" + j + "S").value) : 0;
    }
    sum = convertTotal(sum);
    setStorage("TotalS2", sum);
    byID("TotalS2").value = sum;

    sum = convertToMinutes(getStorage("TotalOther"));
    sum = convertTotal(sum);
    setStorage("Total1R", sum);

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!byID("OJT").checked) return;

    for (j = 20; j < 35; j++) {
        sum += (byID("OJT" + j + "S").checked) ? convertToMinutes(byID("Time" + j + "S").value) : 0;
    }
    sum = convertTotal(sum);
    setStorage("TotalS4", sum);
    byID("TotalS4").value = sum;
}
