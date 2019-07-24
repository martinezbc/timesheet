//DECLARE VARIABLES
var activeID = "";
var routes = ["AMRoute1", "AMRoute2", "AMRoute3", "AMRoute4", "AMRoute5", "PMRoute1", "PMRoute2", "PMRoute3", "PMRoute4", "PMRoute5", "PSRoute1", "PSRoute2", "SHRoute1", "SHRoute2", "LRRoute1", "LRRoute2"];
var eventChange = new Event("change");

//INITIAL LOAD
document.addEventListener('DOMContentLoaded', function() {
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
var radioarea = document.querySelectorAll("input[name='Area']");
for (i = 0; i < radioarea.length; i++) {
    radioarea[i].addEventListener("change", radioAreaSelect);
}

//Week selection
byID("week1").addEventListener("change", updateWeek);
byID("week2").addEventListener("change", updateWeek);

//OJT checked
var chkOJT = document.querySelectorAll("input[name='chkOJT']");
for (i = 0; i < chkOJT.length; i++) {
    chkOJT[i].addEventListener("click", checkOJT);
}

//Position changed
var position = document.querySelectorAll("input[name='Position']");
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

//Click in count fields to open Pupil Counter
var txtCount = document.querySelectorAll("input[name='txtCT']");
for (i = 0; i < txtCount.length; i++) {
    txtCount[i].addEventListener("click", openPupilCounter);
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
byID("closeTime").addEventListener("click", function () {
    byID(activeID).disabled = false;
    showHide("timeModal", false);
});

//Close Field Trip selector
byID("closeFT").addEventListener("click", function () {
    byID(activeID).disabled = false;
    showHide("ftModal", false);
});

//Close various modal
byID("endVarious").addEventListener("click", function () {
    showHide("variousModal", false);
});

//Close validation modal
byID("endValidate").addEventListener("click", function () {
    showHide("validateModal", false);
});

//If route name is updated, store name and then run loadEQL
for (i = 0; i < routes.length; i++) {
    byID(routes[i]).addEventListener("change", loadEQL);
}

//Click on pupil counts question mark
byID("ctspan").addEventListener("click", popUpCT);

//Click on checkmark on time selector
byID("goTime").addEventListener("click", function () {
    var timetext = byID("hours").innerHTML;
    timetext += ":" + byID("minutes").innerHTML;
    timetext += " " + byID("meridiem").innerHTML;
    byID(activeID).disabled = false;
    byID(activeID).value = timetext;
    byID(activeID).dispatchEvent(eventChange);
    showHide("timeModal", false);
    timeCalculation(activeID);
});

//Click on checkmark on field trip selector
byID("goFT").addEventListener("click", storeFTVal);

//Veh textbox keyup
var veh = document.querySelectorAll("#Veh1, #Veh2, #Veh3, #Veh4");
for (i = 0; i < veh.length; i++) {
    veh[i].addEventListener("keyup", function(e) {
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
byID("clear").addEventListener("click", function () {
    openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>');
});

var selectOW = document.querySelectorAll("select[name='selectOW']");
for (i = 0; i < selectOW.length; i++) {
    selectOW[i].addEventListener("change", selectOWChange);
}

//Click on menu, toggle menu on and off
window.addEventListener("click", toggleMenu);
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
    if (refID === "Trainee" || refID === "EmpName") {
        byID(refID).value = properCase(e.currentTarget.value);
    }
    if (refID.indexOf("Route") > 0) {
        byID(refID).value = byID(refID).value.toUpperCase();
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

//FIRST FUNCTION TO LOAD
function initialLoad() {
    loadLocalStorage();
    var refDate = new Date();
    var day = refDate.getDay();
    toggleDay(day);
    loadOJT();
    loadEQL();
}

//LOAD ALL ELEMENTS INTO LOCAL STORAGE AND THEN PULL VALUES
function loadLocalStorage() {
    var val = "";
    var elements = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < elements.length; i++) {
        val = (getStorage(elements[i].id) === null) ? "0" : getStorage(elements[i].id);
        elements[i].checked = (val === "1") ? true : false;
        setStorage(elements[i].id, val);
    }

    elements = document.querySelectorAll("input[type='text'], input[type='number'], select");
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
    if (getStorage("Area") === null) setStorage("Area", "");
    var val = getStorage("Area");
    if (val !== "") byID("area" + val).checked = true;

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    if (getStorage("Team") === null) setStorage("Team", "");
    val = getStorage("Team");
    if (val !== "" && val.substr(0,1) === getStorage("Area")) byID("team" + val).checked = true;

    //Load position from local storage and set radio selection
    if (getStorage("Position") === null) setStorage("Position", "");
    val = getStorage("Position");
    if (val !== "") {
        val = val.replace(" ", "");
        byID("pos" + val).checked = true;
    }

    //Load weekof from local storage and set radio selection
    if (getStorage("WeekOf") === null) setStorage("WeekOf", "");
    val = getStorage("WeekOf");
    if (val !== "" && val === byID("week1").value) {
        byID("week1").checked = true;
        storeWeek("week1");
    } else {
        byID("week2").checked = true;
        setStorage("WeekOf", byID("week2").value);
        storeWeek("week2");
    }
}

//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues() {
    "use strict";
    var area = getStorage("Area");
    if (area === null || area === "") return;

    var areadiv = ["div1", "div2", "div3", "div4", "div7", "divTC"];
    for (var i = 0; i < areadiv.length; i++) {
        if ("div" + area === areadiv[i]) {
            showHide(areadiv[i], true);
        } else {
            showHide(areadiv[i], false);
        }
    }
    if (area === "TC") byID("teamTC").checked = true;
}

//LOADS DATES FROM STORAGE INTO DATE TEXT FIELDS
function loadStoredWeek() {
    if (getStorage("SatDate") !== null)
        for (var i = 0; i < 7; i++)
            byID(days[i] + "Date").innerHTML = getStorage(days[i] + "Date");
}

//SET EACH DAY IN MM/DD FORMAT INTO LOCAL STORAGE
function storeWeek(refID) {
    //Store element value in refVal and set into local storage
    var refVal = byID(refID).value;

    //Store first day of week range in y and shortened date in ny
    var startDate = refVal.substr(0, 10);

    //Store second day of week range in z and shortened date in nz
    var endDate = refVal.substr(13),
        satDate = new Date(startDate), sm, sd;

    setStorage("SatDate", startDate.substr(0,5));
    setStorage("FriDate", endDate.substr(0,5));

    for (var i = 4; i >= 0; i--) {
        newDay = addDate(satDate, i + 1);
        sm = newDay.getMonth() + 1;
        sd = newDay.getDate();
        sm = (sm.toString().length === 1) ? "0" + sm : sm;
        sd = (sd.toString().length === 1) ? "0" + sd : sd;
        setStorage(days[i] + "Date", sm + "/" + sd);
    }

    loadStoredWeek();
}

//SET DAYS WHEN WEEK IS CHANGED
function updateWeek(e) {
    var refID = e.currentTarget.id;
    storeWeek(refID);
    var day = byID("today").innerHTML;
    day = day.substr(0,3);
    for (var i = 0; i < 7; i++) {
        if (day === days[i]) {
            toggleDay(i);
            break;
        }
    }
    for (i = 1; i < 6; i++) {
        for (var j = 20; j < 30; j++) {
            byID(days[i] + "OWTrash" + j).click();
        }
        for (j = 30; j < 35; j++) {
            byID(days[i] + "FTTrash" + j).click();
        }
    }
}

//DATEADD FUNCTION
function addDate(date, days) {
  var copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

//CHANGE NAV BAR VALUES DEPENDING ON THE DAY
function toggleDay(x) {
    "use strict";
    //Set prev, today, and next text values
    if (x > 0 && x < 6) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = days[x - 1] + "-" + getStorage(days[x - 1] + "Date");
        byID("today").innerHTML = days[x] + "-" + getStorage(days[x] + "Date");
        byID("next").innerHTML = days[x + 1] + "-" + getStorage(days[x + 1] + "Date");
    } else if (x === 0) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = days[x + 6] + "-" + getStorage(days[x + 6] + "Date");
        byID("today").innerHTML = days[x] + "-" + getStorage(days[x] + "Date");
        byID("next").innerHTML = days[x + 1] + "-" + getStorage(days[x + 1] + "Date");
    } else if (x === 6) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = days[x - 1] + "-" + getStorage(days[x - 1] + "Date");
        byID("today").innerHTML = days[x] + "-" + getStorage(days[x] + "Date");
        byID("next").innerHTML = days[x - 6] + "-" + getStorage(days[x - 6] + "Date");
    }
    //Loop through all other days and set style display to none
    for (var i = 0; i < 7; i++) {
        //Continue if variables match
        if (i === x) continue;
        //Add hide if element does not have it
        showHide(fullday[i], false);
    }
    togglePupilCounts(x);
}

//LOAD OJT AND TRAINEE DATA; DISABLE/ENABLE ALL OTHER OJT CHECKBOXES
function loadOJT() {
    var val = getStorage("OJT");
    if (val === null) return;
    var bln = (val === "1") ? true : false;

    var t = byID("Trainee");
    if (bln) {
        t.disabled = false;
        t.style.backgroundColor = "white";
    } else {
        t.disabled = true;
        t.style.backgroundColor = "lightgrey";
        resetElement("Trainee");
    }

    var ojt = document.querySelectorAll("input[name='chkOJT']");
    for (var i = 0; i < ojt.length; i++) {
        if (ojt[i].id === "OJT") continue;
        if (ojt[i].checked && !bln) ojt[i].click();
        ojt[i].disabled = !bln;
    }
}

//LOAD EQ/L CHECKBOXES, DISABLE/ENABLE THEM IF ROUTE HAS EQ OR L
function loadEQL() {
    var bln = routeCheck();
    var val = "";

    var eql = document.querySelectorAll("input[name='chkEQL']");
    for (var i = 0; i < eql.length; i++) {
        if (eql[i].checked && !bln) eql[i].click();
        eql[i].disabled = !bln;
    }
    for (i = 0; i < 7; i++) {
        for (var j = 20; j < 30; j++) {
            if ((days[i] === "Sat" || days[i] === "Sun") && j > 22) continue;
            disableOWFields(days[i] + "Select" + j);
        }
    }
}

//IF EQ/L 11-17 IS CHECKED, THEN CHECK ALL OF THEM
function toggleEQLReg(e) {
    var bln = (e.currentTarget.checked) ? true : false;
    var day = e.currentTarget.id.substr(0,3);

    for (var j = 11; j < 18; j++) {
        byID(day + "Lift" + j).checked = bln;
        setStorage(day + "Lift" + j, (bln) ? "1" : "0");
    }
    loadEQL();
    getDailyTotals();
    getWeeklyTotals();
}

//TOGGLE OW AND FT BOXES SO THAT THEY SHOW IF THEY HAVE VALUES
function toggleOWFT(refID) {
    var day = refID.substr(0,3);
    var num = "";
    if (refID.substr(3,5) === "Time3") {
        num = refID.substr(7,2);
        if (byID(refID).value !== "") showHide(day + "FTDiv" + num, true);
    } else if (refID.substr(3,7) === "Select2") {
        num = refID.substr(9,2);
        if (byID(refID).value !== "") showHide(day + "OWDiv" + num, true);
    }
}

//TOGGLE DAILY COUNTS IN THE PUPIL COUNTS SECTION
function togglePupilCounts(x) {
    //Declare boolean used to add or remove class
    var bln = false;
    //Declare boolean for weekend
    var blnSS = (x === 6 || x === 0) ? true : false;
    //Declare boolean for Position
    var pos = getStorage("Position");

    if (pos === "Activity Driver") {
        posAD();
        return;
    }

    var blnPos = (pos === "Driver" || pos === "Driver Trainee" || pos === "Sub Driver") ? true : false;
    showHide("PupilCounts", true);

    //Loop through days array
    for (var j = 1; j < 6; j++) {
        bln = (x === j) ? true : false;
        bln = (blnPos) ? bln : false;
        for (var i = 1; i < 6; i++) {
            showHide("div" + days[j] + "AM" + i + "Ct", bln);
            showHide("div" + days[j] + "PM" + i + "Ct", bln);
            if (i < 3) {
                showHide("div" + days[j] + "PS" + i + "Ct", bln);
                showHide("div" + days[j] + "SH" + i + "Ct", bln);
                showHide("div" + days[j] + "LR" + i + "Ct", bln);
            }
        }
        showHide(days[j] + "TimeAM", bln);
        showHide(days[j] + "TimePM", bln);
    }
    showHide("divAMCt", (blnSS) ? false : blnPos);
    showHide("divPMCt", (blnSS) ? false : blnPos);
    showHide("divPSCt", (blnSS) ? false : blnPos);
    showHide("divAMPupilTime", (blnSS) ? false : blnPos);
    showHide("divPMPupilTime", (blnSS) ? false : blnPos);
}

//TOGGLE PUPIL COUNTS ON POSITION CHANGE
function positionChange(e) {
    for (var i = 0; i < 7; i++) {
        if (byID("today").innerHTML.substr(0,3) === days[i]) break;
    }
    togglePupilCounts(i);
}

//TOGGLE PUPIL COUNTS WHEN ACTIVITY DRIVER
function posAD() {
    for (var j = 1; j < 6; j++) {
        if (j < 6) {
            resetElement("AMRoute" + j);
            resetElement("PMRoute" + j);
        }
        if (j < 3) {
            resetElement("PSRoute" + j);
            resetElement("SHRoute" + j);
            resetElement("LRRoute" + j);
        }
        for (var i = 1; i < 6; i++) {
            resetElement("div" + days[j] + "AM" + i + "Ct");
            resetElement("div" + days[j] + "PM" + i + "Ct");
            if (i < 3) {
                resetElement(days[j] + "PS" + i + "Ct");
                resetElement(days[j] + "SH" + i + "Ct");
                resetElement(days[j] + "LR" + i + "Ct");
            }
        }
        resetElement(days[j] + "TimeA");
        resetElement(days[j] + "TimeB");
        resetElement(days[j] + "TimeC");
        resetElement(days[j] + "TimeD");
    }
    showHide("PupilCounts", false);
}

//MOVE NAV BAR TO THE RIGHT
function moveRightNavBar() {
    var current = byID("today").innerHTML;
    current = current.substr(0,3);
    for (var i = 0; i < 7; i++) {
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
	var current = byID("today").innerHTML;
    current = current.substr(0,3);
    for (var i = 0; i < 7; i++) {
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
    setStorage("Team", "");
    loadTeamValues();
}

//OJT CHECKBOX CLICK
function checkOJT(e) {
    var refID = e.currentTarget.id;
    if (refID === "OJT") loadOJT();
    getDailyTotals();
    getWeeklyTotals();
}

//CHECK ROUTES ENTERED TO SEE IF EQ/L EXISTS
function routeCheck() {
    var bln = false;
    var val = "";
    for (var i = 0; i < routes.length; i++) {
        val = byID(routes[i]).value;
        if (val === null) continue;
        bln = (val.substr(-1) === "L" || val.substr(-2) === "EQ") ? true : false;
        if (bln) return bln;
    }
    return bln;
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
    var dayVal = refID.substr(0, 3);
    var countOW = getMissingOW(dayVal);
    if (countOW === 30) return;
    showHide(dayVal + "OWDiv" + countOW, true);
}

//TOGGLE FIELD TRIP FIELDS
function addFieldTrip(e) {
    var refID = e.currentTarget.id;
    var dayVal = refID.substr(0, 3);
    var countFT = getMissingFT(dayVal);

    //Exit function if count is 5
    if (countFT === 35) return;
    showHide(dayVal + "FTDiv" + countFT, true);
}

//TOGGLE OTHER WORK AND FIELD TRIP FIELDS OFF
function removeOWFT(e) {
    var refID = e.currentTarget.id;
    var x = refID.substr(-2);
    var type = refID.substr(3,2);
    var dayVal = refID.substr(0, 3);

    showHide(dayVal + type + "Div" + x, false);
    if (type === "FT") {
        resetElement(dayVal + "To" + x);
        resetElement(dayVal + "From" + x);
        resetElement(dayVal + "Voucher" + x);
    } else if (type === "OW") {
        resetElement(dayVal + "Select" + x);
        resetElement(dayVal + "Desc" + x);
        if (dayVal !== "Sat" && dayVal !== "Sun")
            resetElement(dayVal + "OJT" + x);
        byID(dayVal + "Lift" + x).disabled = true;
    }
    resetTime(dayVal, x);
    resetElement(dayVal + "Lift" + x);

    getDailyTotals();
    getWeeklyTotals();
}

//CLEAR TIME FIELDS
function clearTimeField (e) {
    var fieldID = e.target.id;
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(10);

    if (num === "41" || num === "42") {
        resetElement(day + "LeaveSelect" + num);
        resetTime(day, num);
    } else if (num === "AD") {
        resetElement(day + "LeaveSelectAD");
        resetElement(day + "LeaveAD");
    } else if (num === "AM") {
        resetElement(day + "TimeA");
        resetElement(day + "TimeB");
    } else if (num === "PM") {
        resetElement(day + "TimeC");
        resetElement(day + "TimeD");
    } else {
        resetTime(day, num);
    }
    getDailyTotals();
    getWeeklyTotals();
}

//FIGURE OUT WHICH OW FIELD IS NEXT TO SHOW
function getMissingOW(day) {
    for (var i = 20; i < 30; i++) {
        if ((day === "Sat" || day === "Sun") && i === 23) return 30;
        if (byID(day + "OWDiv" + i).classList.contains("hide")) {
            return i;
          }
    }
    //If statement didnt' find a match, return 30
    return 30;
}

//FIGURE OUT WHICH FT FIELD IS NEXT TO SHOW
function getMissingFT(day) {
    for (var i = 30; i < 35; i++) {
        if ((day === "Sat" || day === "Sun") && i === 33) return 35;
        if (byID(day + "FTDiv" + i).classList.contains("hide")) {
            return i;
          }
    }
    //if statement didn't find a match, return 35
    return 35;
}

//SHOW THE LEAVE SECTION
function addLeave(e) {
    var refID = e.currentTarget.id;
    var dayVal = refID.substr(0, 3);
    if (byID(dayVal + "Leave40").classList.contains("hide")) {
        byID(dayVal + "LvP").innerHTML = '<span class="far fa-plus-square fa-lg"></span>Remove Leave';
        showHide(dayVal + "Leave40", true);
        showHide(dayVal + "Leave41", true);
        showHide(dayVal + "Leave42", true);
    } else {
        byID(dayVal + "LvP").innerHTML = '<span class="far fa-plus-square fa-lg"></span>Add Leave';
        showHide(dayVal + "Leave40", false);
        showHide(dayVal + "Leave41", false);
        showHide(dayVal + "Leave42", false);
    }

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
    //If pupil time element then blnPupil is true
    var blnPupil = (activeID.substr(-1) !== "S" && activeID.substr(-1) !== "E") ? true : false;

    //if active element has data already, break time into hrs, mins, and mer and load into spans
    if (refVal !== "") {
        var hours = refVal.substr(0, refVal.indexOf(":"));
        var mins = refVal.substr(refVal.indexOf(":") + 1, 2);
        var mer = refVal.substr(-2);
        byID("hours").innerHTML = hours;
        byID("minutes").innerHTML = mins;
        byID("meridiem").innerHTML = mer;
    } else {
        if (!blnPupil) {
            mins = round5(Number(byID("minutes").innerHTML));
            if (mins < 10 && mins > -1) {
                mins = "0" + mins.toString();
            } else if (mins === 60) {
                mins = "55";
            }
            byID("minutes").innerHTML = mins;
        }
    }
    showHide("timeModal", true);
}

//ADD VALUE TO UP AND DOWN ARROWS IN TIME SELECTOR THEN OPEN CHANGE VALUE FUNCTION
function timeSelectors(e) {
    var refID = e.currentTarget.id;
    var strVal = refID.substr(2),
        operator = "";
    switch (strVal) {
        case "up":
            operator = 1;
            break;
        case "down":
            operator = -1;
            break;
        case "up2":
            operator = 2;
            break;
        case "down2":
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
    showHide("ftModal", true);
    activeID = e.currentTarget.id;
    byID("ftselector").value = "";
    byID("fttype").value = "";
}

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    var ftText = "";
    if (byID("ftselector").value !== null)
        ftText = byID("ftselector").value;
    else
        ftText = byID("fttype").value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    byID(activeID).disabled = false;
    setStorage(activeID, ftText);
    showHide("ftModal", false);
}

//FIELD TRIP MODAL
function openPupilCounter(e) {
    activeID = e.currentTarget.id;
    e.currentTarget.disabled = true;
    showHide("countModal", true);
}

//CLEAR LOCAL STORAGE AND RELOAD PAGE
function clearFields() {
    window.localStorage.clear();
    location.reload();
}

//OPEN SUPPLEMENT IN SAME WINDOW
function openSupplement() {
    window.open("index2.html", "_self");
}

//POP UP OW MESSAGE
function popUpOW() {
    openPopUp("<p class='varp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>");
}

//POP UP FT MESSAGE
function popUpFT() {
    openPopUp("<p class='varp'>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p class='varp'>&bull;Check lift if the trip required a lift.</p><p class='varp'>&bull;The start and end time must match what was recorded on the voucher.</p>");
}

//POP UP CT MESSAGE
function popUpCT() {
    openPopUp("<p class='varp'>&bull;Only record the routes, shuttles, middays, and late runs that are specifically assigned to you.</p><p class='varp'>&bull;Special Equipment pay will only be available if one of your routes ends with an 'L' or an 'EQ'</p><p class='varp'>&bull;Any other route that is covered for another driver and is outside of your regular hours should be recorded in the other work section.</p><p class='varp'>&bull;Record the number of students transported for each route for every day that was driven.</p><p class='varp'>&bull;In the Pupil Time section, enter the first pickup time and last drop off time for both morning and afternoon runs.</p>");
}

//OPEN POP UP MODAL FOR ERROR MESSAGES
function openPopUp(msgVal) {
    byID("varDiv").innerHTML = msgVal;
    showHide("variousModal", true);
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
function resetTime(day, num) {
    var refID = day + "Time" + num;
    resetElement(refID + "E");
    resetElement(refID + "S");
    resetElement(refID);
}

//ENABLE OR DISABLE EQL BUTTON DEPENDING ON WHAT IS SELECTED FOR OTHER WORK
function selectOWChange(e) {
    var refID = e.currentTarget.id;
    disableOWFields(refID);
}

function disableOWFields(refID) {
    var refVal = byID(refID).value;
    var day = refID.substr(0,3);
    var x = refID.substr(9);
    var bln = (refVal === "FYI") ? true : false;
    byID(day + "Time" + x + "S").disabled = bln;
    byID(day + "Time" + x + "E").disabled = bln;
    byID(day + "Time" + x + "S").style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(day + "Time" + x + "E").style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(day + "Time" + x).style.backgroundColor = (bln) ? "lightgrey" : "white";

    bln = (refVal === "EQ/L") ? true : false;
    byID(day + "Lift" + x).checked = bln;
    byID(day + "Lift" + x).disabled = !bln;
    setStorage(day + "Lift" + x, (bln) ? "1" : "0");
}

//COPY ROUTINE FOR REGULAR WORK HOURS
function copyRoutine(e) {
    var refID = e.currentTarget.id;
    activeID = refID;
    var str = "";
    if (refID === "AMPupilcopy" || refID === "PMPupilcopy") {
        str = runPupilCopyRoutine();
        openPopUp('<p class="varp">Pupil time copied to the following day(s): ' + str + '.</p>');
    } else {
        str = runCopyRoutine();
        openPopUp('<p class="varp">Regular work hours copied to the following day(s): ' + str + '.</p>');
    }
}

//COPY REGULAR RUN TIME TO OTHER DAYS
function runCopyRoutine() {
    showHide("variousModal", false);
    var k = 0,
        bln = false;
    var str = "";

    for (var i = 1; i < 5; i++) {
        k = (byID("today").innerHTML.substr(0,3) === days[i]) ? i : 0;
        if (k === i) break;
    }

    k++;
    for (k; k < 6; k++) {
        bln = (byID(days[k] + "LeaveAD").checked) ? true : false;
        if (bln) continue;
        for (var j = 11; j < 18; j++) {
            byID(days[k] + "Time" + j + "S").value = byID(days[i] + "Time" + j + "S").value;
            byID(days[k] + "Time" + j + "S").dispatchEvent(eventChange);
            byID(days[k] + "Time" + j + "E").value = byID(days[i] + "Time" + j + "E").value;
            byID(days[k] + "Time" + j + "E").dispatchEvent(eventChange);
            timeCalculation(days[k] + "Time" + j + "E");
        }
        str += ", " + days[k];
    }
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//COPY PUPIL TIME TO OTHER DAYS
function runPupilCopyRoutine() {
    showHide("variousModal", false);
    var k = 0,
        bln = false,
        str = "";

    for (var i = 1; i < 5; i++) {
        k = (byID("today").innerHTML.substr(0,3) === days[i]) ? i : 0;
        if (k === i) break;
    }

    k++;
    for (k; k < 6; k++) {
        bln = (byID(days[k] + "LeaveAD").checked) ? true : false;
        if (bln) continue;
        byID(days[k] + "TimeA").value = byID(days[i] + "TimeA").value;
        byID(days[k] + "TimeB").value = byID(days[i] + "TimeB").value;
        byID(days[k] + "TimeC").value = byID(days[i] + "TimeC").value;
        byID(days[k] + "TimeD").value = byID(days[i] + "TimeD").value;
        str += ", " + days[k];
    }
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//CHECK NUMBER OF OTHER WORK ENTRIES, IF MORE THAN 10 THEN GIVE POP UP ERROR MESSAGE
function countOtherWork(refID) {
    var count = 0;

    //Loop through each day of the week
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 30; j++) {
            if ((days[i] === "Sat" || days[i] === "Sun") && j === 23) break;
            if (byID(days[i] + "Select" + j).value !== "") count++;
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
    var count = 0;

    //Loop through each day of the week
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 35; j++) {
            if ((days[i] === "Sat" || days[i] === "Sun") && j === 33) break;
            if (byID(days[i] + "Voucher" + j).value !== "") count++;
        }
    }
    //Result of count
    if (count > 5) {
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>");
        byID(refID).value = "";
    }
}

//TOGGLE MENU ON AND OFF ON CLICK
function toggleMenu(e) {
    //Get ID of whatever triggered click event
    var refID = e.target.id;
    
    //Is nav dropdown hiding?
    var bln = (byID("navdropdown").classList.contains("hide")) ? true : false;
    
    if (refID !== "navbtn") {
        showHide("navdropdown", false);
    } else {
        showHide("navdropdown", bln);
    }
}


/****************************************VALIDATION AND COMPLETION****************************************/
function completeTimesheet() {
    var bln = runValidations();
    if (!bln)
        return;

    showHide("validateModal", true);
    byID("EmpInitials").focus();
}

function openTimesheet() {
    var emp = "";
    emp = byID("EmpInitials").value;
    emp = emp.toUpperCase();
    setStorage("EmpInitials", emp);

    showHide("validateModal", false);
    if (emp !== "")
        window.open("preview.html", "_self");
}

function runValidations() {
    var val = "";

    val = testEmpData() + testOtherWork() + testFieldTrip() + testLeave() + testTimeComplete();
    if (getStorage("Area") !== "TC") {
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
    var val = "";

    //Check selected week
    if (getStorage("WeekOf") === "")
        val = "<p class='varp'>&bull;Pay week not selected.</p>";

    //Check Area
    if (getStorage("Area") === "")
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (getStorage("Team") === "")
        val += "<p class='varp'>&bull;Team not selected.</p>";

    //Check employee name
    if (getStorage("EmpName") === "")
        val += "<p class='varp'>&bull;Employee name not entered</p>";

    //Check position
    if (getStorage("Position") === "")
        val += "<p class='varp'>&bull;Employee position not selected.</p>";

    return val;
}

function testFieldTrip() {
    var val = "";

    //Check field trips
    for (var i = 0; i < 7; i++) {
        for (var j = 30; j < 35; j++) {
            if ((days[i] === "Sat" || days[i] === "Sun") && j > 32) break;
            if (byID(days[i] + "Time" + j).value === "") { //Time is blank
                if (byID(days[i] + "Voucher" + j).value !== "" || byID(days[i] + "From" + j).value !== "" || byID(days[i] + "To" + j).value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: No time entered.</p>";

            } else { //Time is not blank
                if (byID(days[i] + "Voucher" + j).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: Voucher number cannot be blank.</p>";

                if (byID(days[i] + "From" + j).value === "" || byID(days[i] + "To" + j).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: From and To location cannot be blank.</p>";
            }
        }
    }
    return val;
}

function testOtherWork() {
    var val = "";

    for (var i = 0; i < 7; i++) {
        for (var j = 20; j < 30; j++) {
            if ((days[i] === "Sat" || days[i] === "Sun") && j > 22) break;
            if (byID(days[i] + "Time" + j).value !== "") { //Time is not blank
                if (byID(days[i] + "Select" + j).value === "") { //Select IS blank
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Category is required.</p>";
                }
                if ((byID(days[i] + "Select" + j).value === "OT" || byID(days[i] + "Select" + j).value === "FYI") && byID(days[i] + "Desc" + j).value === "") { //Other or FYI selected but description field is blank
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description is required when Other or FYI selected.</p>";
                }
                if (byID(days[i] + "Select" + j).value === "" && byID(days[i] + "Desc" + j).value !== "") { //Nothing selected and description field has text
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description entered without category selection.</p>";
                }
            } else { //Time is blank
                if (byID(days[i] + "Select" + j).value !== "" || byID(days[i] + "Desc" + j).value !== "") { //Category IS selected OR Description field is NOT blank
                    if (!byID(days[i] + "Select" + j).value === "FYI") { //Category is NOT FYI
                        val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: No time entered.</p>";
                    }
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
            if (byID(days[i] + "Time" + j).value !== "") {
                if (byID(days[i] + "LeaveSelect" + j).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID(days[i] + "LeaveSelect" + j).value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
            }
            if (byID(days[i] + "LeaveAD").checked) {
                if (byID(days[i] + "LeaveSelectAD").value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID(days[i] + "LeaveSelectAD").value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: All day leave type selected but checkbox left unchecked.</p>";
            }
        }
    }
    return val;
}

function testStopCounts() {
    var val = "",
        pos = getStorage("Position");

    //Validate stop counts
    if (pos === "Driver" || pos === "Sub Driver" || pos === "Driver Trainee") {
        for (var i = 1; i < 6; i++) {

            if (!testRegPupil(days[i], 11, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";

            if (!testRegCounts(days[i], 11, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM time entered with no routes specified.</p>";

            if (!testRegPupil(days[i], 12, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM pupil counts not completed.</p>";

            if (!testRegCounts(days[i], 12, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM time entered with no routes specified.</p>";

            if (!testSpecPupil(days[i], 13, "PS", 1) || !testSpecPupil(days[i], 14, "PS", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS pupil counts not completed.</p>";

            if (!testSpecCounts(days[i], 13, "PS", 1) || !testSpecCounts(days[i], 14, "PS", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS time entered with no routes specified.</p>";

            if (!testSpecPupil(days[i], 15, "SH", 1) || !testSpecPupil(days[i], 16, "SH", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle pupil counts not completed.</p>";

            if (!testSpecCounts(days[i], 15, "SH", 1) || !testSpecCounts(days[i], 16, "SH", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle time entered with no shuttle specified.</p>";


            if (!testSpecPupil(days[i], 17, "LR", 1) || !testSpecPupil(days[i], 17, "LR", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run pupil counts not completed.</p>";

            if (!testSpecCounts(days[i], 17, "LR", 1) && !testSpecCounts(days[i], 17, "LR", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run time entered with no route specified.</p>";
        }
    }
    return val;
}

function testRegPupil(day, x, mer) {
    for (var j = 1; j < 6; j++) {
        if (byID(day + "Time" + x).value === "")
            continue;

        if (byID(mer + "Route" + j).value === "")
            continue;

        if (byID(day + mer + j + "Ct").value === "")
            return false;
    }
    return true;
}

function testRegCounts(day, x, mer) {
    if (byID(day + "Time" + x).value === "")
        return true;

    for (var i = 1; i < 6; i++) {
        if (byID(mer + "Route" + i).value !== "")
            return true;
    }
    return false;
}

function testSpecPupil(day, x, route, j) {

    if (byID(day + "Time" + x).value === "")
        return true;

    if (byID(route + "Route" + j).value === "")
        return true;

    if (byID(day + route + j + "Ct").value === "")
        return false;

    return true;
}

function testSpecCounts(day, x, route, j) {

    if (byID(day + "Time" + x).value === "")
        return true;

    if (byID(route + "Route" + j).value !== "")
        return true;

    return false;
}



function testAMPMRoute(day, num) {
    var bln = true,
        bln2 = true,
        val = "",
        i = 0,
        j = 0;

    for (j = 1; j < 6; j++) {
        if (byID(day + "Time" + num).value !== "" && byID("AMRoute" + j).value !== "" && byID(day + "AM" + j + "Ct").value === "")
            bln = false;

        if (byID(day + "Time1").value !== "" && byID("input[id*='AMRoute']").value === "")
            bln2 = false;
    }
    if (!bln)
        val += "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";
}


function testTimeComplete() {
    var val = "";
    for (var i = 1; i < 6; i++) {
        for (var j = 11; j < 17; j++) {
            if (byID(days[i] + "Time" + j + "S").value !== "" && byID(days[i] + "Time" + j + "E").value === "")
                val += "<p class='varp'>&bull;" + fullday[i] + ": Time not completed.</p>";
        }
    }
    return val;
}
/****************************************ALIDATION AND COMPLETION****************************************/
