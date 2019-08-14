//DECLARE VARIABLES
var objThis, objThisData, objThisSat, objThisSun, objThisMon, objThisTue, objThisWed, objThisThu, objThisFri;
var activeID = "";
var routes = ["AMRoute1", "AMRoute2", "AMRoute3", "AMRoute4", "AMRoute5", "PMRoute1", "PMRoute2", "PMRoute3", "PMRoute4", "PMRoute5", "PSRoute1", "PSRoute2", "SHRoute1", "SHRoute2", "LRRoute1", "LRRoute2"];
var eventChange = new Event("change");

//INITIAL LOAD
document.addEventListener('DOMContentLoaded', function () {
    showHide("slide2", false);
    showHide("changesModal", true);
});

/********************EVENT LISTENERS********************/

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

//OJT checked
var chkOJT = document.querySelectorAll("input[name='chkOJT']");
for (i = 0; i < chkOJT.length; i++) {
    chkOJT[i].addEventListener("click", checkOJT);
}

//Leave checked
var chkLV = document.querySelectorAll("input[name='chkLV']");
for (i = 0; i < chkLV.length; i++) {
    chkLV[i].addEventListener("click", checkLeave);
}

//Position changed
var position = document.querySelectorAll("input[name='Position']");
for (i = 0; i < position.length; i++) {
    position[i].addEventListener("change", positionChange);
}

//QL checked
var chkQL = document.querySelectorAll("input[name='chkQL']");
for (i = 0; i < chkQL.length; i++) {
    chkQL[i].addEventListener("click", toggleQLReg);
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

//Open Change Week Modal
byID("chgWeek").addEventListener("click", function() {
    showHide("weekModal", true);
});

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

//If route name is updated, store name and then run loadQL
for (i = 0; i < routes.length; i++) {
    byID(routes[i]).addEventListener("change", routeNameCheck);
}

//Click on pupil counts question mark
byID("ctspan").addEventListener("click", popUpCT);

//Click on checkmark on time selector
byID("goTime").addEventListener("click", function() {
    var timetext = byID("hours").innerHTML;
    timetext += ":" + byID("minutes").innerHTML;
    timetext += " " + byID("meridiem").innerHTML;
    byID(activeID).disabled = false;
    byID(activeID).value = timetext;
    showHide("timeModal", false);
    timeCalculation(activeID);
    byID(activeID).dispatchEvent(eventChange);
});

//Click on checkmark on field trip selector
byID("goFT").addEventListener("click", storeFTVal);

//Close Tutorial Modal
byID("endChanges").addEventListener("click", function () {
    showHide("changesModal", false);
    byID("WeekOf").value = DateRange(0);
    changeWeek();
});

//Show spinner when save is clicked
byID("save").addEventListener("click", runSave);

//Veh textbox keyup
var veh = document.querySelectorAll("#Veh1, #Veh2, #Veh3, #Veh4");
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
byID("clear").addEventListener("click", function () {
    openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>');
});

//Add on Change event listening to Select Other Work
var selectOW = document.querySelectorAll("select[name='selectOW']");
for (i = 0; i < selectOW.length; i++) {
    selectOW[i].addEventListener("change", selectOWChange);
}

//Click on menu, toggle menu on and off
window.addEventListener("click", toggleMenu);
/********************EVENT LISTENERS********************/

//TOGGLE BETWEEN TUTORIAL SLIDES
function changeModalSlide(dir) {
    if (byID("slide1").classList.contains("hide")) {
        showHide("slide2", false);
        showHide("slide1", true);
    } else {
        showHide("slide2", true);
        showHide("slide1", false);
    }
}

//SELECT WEEK
function changeWeek() {
    window.setInterval(function(){
      runSave();
    }, 20000);
    if (byID("WeekOf").value === "") return;
    showHide("weekModal", false);
    byID("PayWeek").innerHTML = "Pay Week: " + dateString(byID("WeekOf").value);
    initialLoad();
}
//FIRST FUNCTION TO LOAD
function initialLoad() {
    if (byID("WeekOf").value === "") return;
    storeWeek();
    var refDate = new Date();
    var day = refDate.getDay();
    toggleDay(day);
    loadOJT();
    loadQL();
    loadLeave();
    getDailyTotals();
    getWeeklyTotals();
}
function runSave() {
    setStorage();
    showHide("save", false);
    showHide("spin", true);
    window.setTimeout(function () {
        showHide("save", true);
        showHide("spin", false);
    }, 5000);
}

//LOAD ALL ELEMENTS INTO LOCAL STORAGE AND THEN PULL VALUES
function loadLocalStorage() {
    var keyArr = 0;
    var key = "";
    var objArray = [objThisData, objThisSat, objThisSun, objThisMon, objThisTue, objThisWed, objThisThu, objThisFri];
    
    for (var j = 0; j < objArray.length; j++) {
        keyArr = Object.keys(objArray[j]);
        for (var i = 0; i < keyArr.length; i++) {
            key = keyArr[i];
            if (key === "Area" || key === "Team" || key === "Position" || key === "Total1R" || key === "WeekOf") continue;
            if (objArray[j][key] === true || objArray[j][key] === false) {
                byID(key).checked = objArray[j][key];    
            } else {
                byID(key).value = objArray[j][key];
            }        
        }
    }
    toggleOWFT();
    toggleLeave();
    loadRadioSelection();
}

//FIND STORED VALUE FOR AREA, TEAM, POSITION, WEEKOF AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    var area = objThisData.Area;
    var team = objThisData.Team;
    var pos = objThisData.Position;
    
    var i = 0;
    
    //Load area from local storage and set radio selection
    if (area !== "") {
        byID("area" + area).checked = true;
    } else {
        area = document.querySelectorAll("input[name='Area']");
        for (i = 0; i < area.length; i++)
            area[i].checked = false;
    }

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    if (team !== "" && team.substr(0, 1) === area) {
        byID("team" + team).checked = true;
    } else {
        team = document.querySelectorAll('input[name="Team"]');
        for (i = 0; i < team.length; i++)
            team[i].checked = false;
    }

    //Load position from local storage and set radio selection
    if (pos !== "") {
        pos = pos.replace(" ", "");
        byID("pos" + pos).checked = true;
    } else {
        pos = document.querySelectorAll('input[name="Position"]');
        for (i = 0; i < pos.length; i++)
            pos[i].checked = false;
    }
}

//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues() {
    "use strict";
    var area = objThisData.Area;
    area = (area === null || area === "undefined") ? "" : area;

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
    if (objThisData.SatDate !== undefined)
        for (var i = 0; i < 7; i++)
            byID(days[i] + "Date").innerHTML = objThisData[days[i] + "Date"];
}

//SET EACH DAY IN MM/DD FORMAT INTO LOCAL STORAGE
function storeWeek() {
    var week = byID("WeekOf").value;
    if (localStorage.getItem(week + "Obj") === null) {
        localStorage.setItem(week + "Obj", JSON.stringify(objNew));
        objThis = objNew;
        
        //Parse JSON into objects
        parseData();
        
        //Store first day of week range in y and shortened date in ny
        var startDate = week.substr(0,2) + "/" + week.substr(2,2) + "/" + week.substr(4,4);

        //Store second day of week range in z and shortened date in nz
        var endDate = week.substr(8,2) + "/" + week.substr(10,2) + "/" + week.substr(12,4),
            satDate = new Date(startDate),
            sm, sd;

        objThisData.SatDate = startDate.substr(0, 5);
        objThisData.FriDate = endDate.substr(0, 5);

        for (var i = 4; i >= 0; i--) {
            newDay = addDate(satDate, i + 1);
            sm = newDay.getMonth() + 1;
            sd = newDay.getDate();
            sm = (sm.toString().length === 1) ? "0" + sm : sm;
            sd = (sd.toString().length === 1) ? "0" + sd : sd;
            objThisData[days[i] + "Date"] = sm + "/" + sd;
        }
    } else {
        objThis = JSON.parse(localStorage.getItem(week + "Obj"));
        
        //Parse JSON into objects
        parseData();
    }
    
    //Load data from JSON
    loadLocalStorage();
    loadStoredWeek();
}

function getDayObj(day) {
    switch (day) {
        case "Mon":
            return objThisMon;
        case "Tue":
            return objThisTue;
        case "Wed":
            return objThisWed;
        case "Thu":
            return objThisThu;
        case "Fri":
            return objThisFri;
        case "Sat":
            return objThisSat;
        case "Sun":
            return objThisSun;
        default:
            return objThisData;
    }
}

function parseData() {
    objThisData = objThis.Data
    objThisSat = objThis.Sat;
    objThisSun = objThis.Sun;
    objThisMon = objThis.Mon;
    objThisTue = objThis.Tue;
    objThisWed = objThis.Wed;
    objThisThu = objThis.Thu;
    objThisFri = objThis.Fri;
}

//SET DAYS WHEN WEEK IS CHANGED
function updateWeek() {
    storeWeek();
    var day = byID("today").innerHTML;
    day = day.substr(0, 3);
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
        resetLeave(days[i]);
    }
}

//CHANGE NAV BAR VALUES DEPENDING ON THE DAY
function toggleDay(x) {
    "use strict";
    //Set prev, today, and next text values
    if (x > 0 && x < 6) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = days[x - 1] + "-" + objThisData[days[x - 1] + "Date"];
        byID("today").innerHTML = days[x] + "-" + objThisData[days[x] + "Date"];
        byID("next").innerHTML = days[x + 1] + "-" + objThisData[days[x + 1] + "Date"];
    } else if (x === 0) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = days[x + 6] + "-" + objThisData[days[x + 6] + "Date"];
        byID("today").innerHTML = days[x] + "-" + objThisData[days[x] + "Date"];
        byID("next").innerHTML = days[x + 1] + "-" + objThisData[days[x + 1] + "Date"];
    } else if (x === 6) {
        showHide(fullday[x], true);
        byID("prev").innerHTML = days[x - 1] + "-" + objThisData[days[x - 1] + "Date"];
        byID("today").innerHTML = days[x] + "-" + objThisData[days[x] + "Date"];
        byID("next").innerHTML = days[x - 6] + "-" + objThisData[days[x - 6] + "Date"];
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
    var bln = objThisData.OJT;

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
    
    var bln = routeCheckJ();
    var e = "";
    if (!bln) return;
    
    for (i = 1; i < 6; i++) {
        for (var j = 11; j < 18; j++) {
            e = byID(days[i] + "OJT" + j);
            e.disabled = false;
            e.click();
        }
    }
}

//LOAD Q/L CHECKBOXES, DISABLE/ENABLE THEM IF ROUTE HAS EQ OR L
function loadQL() {
    var bln = routeCheck();
    var val = "";

    var eql = document.querySelectorAll("input[name='chkQL']");
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

//LOAD LEAVE AND TOGGLE FIELDS IF ALL DAY LEAVE IS CHECKED
function loadLeave() {
    for (var i = 1; i < 6; i++) {
        toggleADLeave(days[i] + "LeaveAD");
    }
}

//IF Q/L 11-17 IS CHECKED, THEN CHECK ALL OF THEM
function toggleQLReg(e) {
    var bln = (e.currentTarget.checked) ? true : false;
    var day = e.currentTarget.id.substr(0, 3);
    var obj = getDayObj(day);

    for (var j = 11; j < 18; j++) {
        byID(day + "QL" + j).checked = bln;
        obj[day + "QL" + j] = bln;
    }
    loadQL();
    getDailyTotals();
    getWeeklyTotals();
}

//TOGGLE OW AND FT BOXES SO THAT THEY SHOW IF THEY HAVE VALUES
function toggleOWFT() {
    var obj = "";
    var bln = false;
    
    for (var i = 0; i < 7; i++) {
        obj = getDayObj(days[i]);
        for (var j = 20; j < 30; j++) {
            if ((i === 0 || i === 6) && j > 22) continue;
            bln = (obj[days[i] + "Select" + j] !== "" || obj[days[i] + "Desc" + j] !== "" || obj[days[i] + "Time" + j] !== "") ? true : false
            showHide(days[i] + "OWDiv" + j, bln);
        }
        for (j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            bln = (obj[days[i] + "Voucher" + j] !== "" || obj[days[i] + "To" + j] !== "" || obj[days[i] + "From" + j] !== "" || obj[days[i] + "Time" + j] !== "") ? true : false;
            showHide(days[i] + "FTDiv" + j, bln);
        }
    }
}

//TOGGLE LEAVE IF THERE IS LEAVE FILLED OUT
function toggleLeave() {
    var bln = false;
    var obj = "";

    for (var i = 1; i < 6; i++) {
        obj = getDayObj(days[i]);
        bln = (obj[days[i] + "LeaveAD"] === "1" || obj[days[i] + "Time41"] !== "" || obj[days[i] + "Time42"] !== "") ? true : false;
        if (bln) byID(days[i] + "LVAdd").click();
    }
}

//TOGGLE DAILY COUNTS IN THE PUPIL COUNTS SECTION
function togglePupilCounts(x) {
    //Declare boolean used to add or remove class
    var bln = false;
    //Declare boolean for weekend
    var blnSS = (x === 6 || x === 0) ? true : false;
    //Declare boolean for Position
    var pos = objThisData.Position;

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
        if (byID("today").innerHTML.substr(0, 3) === days[i]) break;
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
    current = current.substr(0, 3);
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
    current = current.substr(0, 3);
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
//SET AREA SELECTION AND THEN LOAD TEAM RADIO SELECTIONS
function radioAreaSelect(e) {
    objThisData.Team = "";
    loadTeamValues();
}

//OJT CHECKBOX CLICK
function checkOJT(e) {
    var refID = e.currentTarget.id;
    if (refID === "OJT") loadOJT();
    getDailyTotals();
    getWeeklyTotals();
}

function routeNameCheck() {
    loadQL();
    loadOJT();
}

//CHECK ROUTES ENTERED TO SEE IF Q/L EXISTS
function routeCheck() {
    var bln = false;
    var val = "";
    for (var i = 0; i < routes.length; i++) {
        val = byID(routes[i]).value;
        if (val === null) continue;
        bln = (val.substr(-1) === "L" || val.substr(-1) === "Q") ? true : false;
        if (bln) return bln;
    }
    return bln;
}

//CHECK ROUTES ENTERED TO SEE IF J EXISTS
function routeCheckJ() {
    var bln = false;
    var val = "";
    for (var i = 0; i < routes.length; i++) {
        val = byID(routes[i]).value;
        if (val === null) continue;
        bln = (val.substr(-1) === "J") ? true : false;
        if (bln) return bln;
    }
    return bln;
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
    var type = refID.substr(3, 2);
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
        byID(dayVal + "QL" + x).disabled = true;
    }
    resetTime(dayVal, x);
    resetElement(dayVal + "QL" + x);

    getDailyTotals();
    getWeeklyTotals();
}

//CLEAR TIME FIELDS
function clearTimeField(e) {
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
        resetLeave(dayVal);
    }

}

//SEPARATE FUNCTION FOR RESETTING LEAVE
function resetLeave(day) {
    byID(day + "LvP").innerHTML = '<span class="far fa-plus-square fa-lg"></span>Add Leave';
    showHide(day + "Leave40", false);
    showHide(day + "Leave41", false);
    showHide(day + "Leave42", false);
    resetTime(day, 41);
    resetTime(day, 42);
    resetElement(day + "LeaveAD");
    toggleADLeave(day + "LeaveAD");
    resetElement(day + "LeaveSelectAD");
    resetElement(day + "LeaveSelect41");
    resetElement(day + "LeaveSelect42");
}

//GET ALL DAY LEAVE ON EVENT CLICK
function checkLeave(e) {
    toggleADLeave(e.currentTarget.id);
    getDailyTotals();
    getWeeklyTotals();
}

//TOGGLE LEAVE AND ELEMENTS FOR ALL DAY LEAVE
function toggleADLeave(refID) {
    var day = refID.substr(0, 3);
    var bln = (byID(refID).checked) ? true : false;
    var i = 0;

    showHide(day + "OWAdd", !bln);
    showHide(day + "FTAdd", !bln);
    if (bln) {
        //Clear Other work
        for (i = 20; i < 30; i++)
            byID(day + "OWTrash" + i).click();
        //Clear Field Trips
        for (i = 30; i < 35; i++)
            byID(day + "FTTrash" + i).click();
        //Clear regular run time
        for (i = 11; i < 18; i++)
            resetTime(day, i);
        //Clear partial leave time
        for (i = 41; i < 43; i++)
            resetTime(day, i);
        //Clear pupil counts
        for (i = 1; i < 6; i++) {
            resetElement(day + "AM" + i + "Ct");
            resetElement(day + "PM" + i + "Ct");
            if (i < 3) {
                resetElement(day + "PS" + i + "Ct");
                resetElement(day + "SH" + i + "Ct");
                resetElement(day + "LR" + i + "Ct");
            }
        }
        resetElement(day + "TimeA");
        resetElement(day + "TimeB");
        resetElement(day + "TimeC");
        resetElement(day + "TimeD");
    }
    for (i = 11; i < 18; i++) {
        byID(day + "Time" + i).style.backgroundColor = (bln) ? "lightgrey" : "white";
        disableElement(day + "Time" + i + "S", bln);
        disableElement(day + "Time" + i + "E", bln);
    }
    for (i = 41; i < 43; i++) {
        byID(day + "Time" + i).style.backgroundColor = (bln) ? "lightgrey" : "white";
        disableElement(day + "Time" + i + "S", bln);
        disableElement(day + "Time" + i + "E", bln);
        disableElement(day + "LeaveSelect" + i, bln);
    }
    for (i = 1; i < 6; i++) {
        disableElement(day + "AM" + i + "Ct", bln);
        disableElement(day + "PM" + i + "Ct", bln);
        if (i < 3) {
            disableElement(day + "PS" + i + "Ct", bln);
            disableElement(day + "SH" + i + "Ct", bln);
            disableElement(day + "LR" + i + "Ct", bln);
        }
    }
    disableElement(day + "TimeA", bln);
    disableElement(day + "TimeB", bln);
    disableElement(day + "TimeC", bln);
    disableElement(day + "TimeD", bln);
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

//POP UP CT MESSAGE
function popUpCT() {
    openPopUp("<p class='varp'>&bull;Only record the routes, shuttles, middays, and late runs that are specifically assigned to you.</p><p class='varp'>&bull;Special Equipment pay will only be available if one of your routes ends with an 'L' or an 'EQ'</p><p class='varp'>&bull;Any other route that is covered for another driver and is outside of your regular hours should be recorded in the other work section.</p><p class='varp'>&bull;Record the number of students transported for each route for every day that was driven.</p><p class='varp'>&bull;In the Pupil Time section, enter the first pickup time and last drop off time for both morning and afternoon runs.</p>");
}

//ENABLE OR DISABLE QL BUTTON DEPENDING ON WHAT IS SELECTED FOR OTHER WORK
function selectOWChange(e) {
    var refID = e.currentTarget.id;
    disableOWFields(refID);
}

function disableOWFields(refID) {
    var refVal = byID(refID).value;
    var day = refID.substr(0, 3);
    var x = refID.substr(9);
    var bln = (refVal === "FYI") ? true : false;
    byID(day + "Time" + x + "S").disabled = bln;
    byID(day + "Time" + x + "E").disabled = bln;
    byID(day + "Time" + x + "S").style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(day + "Time" + x + "E").style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(day + "Time" + x).style.backgroundColor = (bln) ? "lightgrey" : "white";

    bln = (refVal === "Q/L") ? true : false;
    byID(day + "QL" + x).checked = bln;
    byID(day + "QL" + x).disabled = !bln;
    var obj = getDayObj(day);
    obj[day + "QL" + x] = bln;
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
        k = (byID("today").innerHTML.substr(0, 3) === days[i]) ? i : 0;
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
        k = (byID("today").innerHTML.substr(0, 3) === days[i]) ? i : 0;
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
        for (var j = 20; j < 30; j++) {
            if ((days[i] === "Sat" || days[i] === "Sun") && j > 22) continue;
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
        for (var j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
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


/********************VALIDATION AND COMPLETION********************/
function completeTimesheet() {
    if (byID("WeekOf").value === "") return;
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
    objThisData.EmpInitials = emp;

    showHide("validateModal", false);
    if (emp !== "")
        window.open("preview.html", "_self");
}

function runValidations() {
    var val = "";

    val = testEmpData() + testOtherWork() + testFieldTrip() + testLeave() + testTimeComplete();
    if (objThisData.Area !== "TC") {
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

    //Check Area
    if (objThisData.Area === "")
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (objThisData.Team === "")
        val += "<p class='varp'>&bull;Team not selected.</p>";

    //Check employee name
    if (objThisData.EmpName === "")
        val += "<p class='varp'>&bull;Employee name not entered</p>";

    //Check position
    if (objThisData.Position === "")
        val += "<p class='varp'>&bull;Employee position not selected.</p>";

    return val;
}

function testFieldTrip() {
    var val = "";
    var d = "";
    var obj = "";
    var blnTime = false;

    //Check field trips
    for (var i = 0; i < 7; i++) {
        d = days[i];
        obj = getDayObj(d);
        for (var j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            blnTime = (obj[d + "Time" + j] !== "") ? true : false;
            if (blnTime && (obj[d + "Voucher" + j] === "" || obj[d + "From" + j] === "" || obj[d + "To" + j] === ""))
                val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: Voucher, From and To fields cannot be blank.</p>";
            
            if ((obj[d + "Voucher" + j] !== "" || obj[d + "From" + j] !== "" || obj[d + "To" + j] !== "") && !blnTime)
                val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: No time entered.</p>";
        }
    }
    return val;
}

function testOtherWork() {
    var val = "";
    var d = "";
    var obj = "";

    for (var i = 0; i < 7; i++) {
        d = days[i];
        obj = getDayObj(d);
        for (var j = 20; j < 30; j++) {
            if ((i === 0 || i === 6) && j > 22) continue;
            if (obj[d + "Time" + j] === "" && obj[d + "Select" + j] !== "" && obj[d + "Select" + j] !== "FYI") 
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: No time entered.</p>";
            
            if (obj[d + "Time" + j] !== "" && obj[d + "Select" + j] === "") 
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Category is required.</p>";
            
            if ((obj[d + "Select" + j] === "OT" || obj[d + "Select" + j] === "FYI") && obj[d + "Desc" + j] === "")
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description is required when Other or FYI selected.</p>";
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
        pos = objThisData.Position;

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
/********************VALIDATION AND COMPLETION********************/
/********************CALCULATIONS********************/
//TEXTBOX UPDATE FUNCTION. CHECK FOR OVERLAPPING TIME AND THEN CALCULATE TOTAL TIME
function timeCalculation(refID) {
    var num = Number(refID.substr(-3,2));
    var day = refID.substr(0,3);
    
    //Check if field is used for pupil time, return if true
    if (isNaN(refID.substr(7,2)))
        return;

    if (num > 19 && num < 30) {
        if (byID(day + "Select" + num).value === "") {
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
    getWeeklyTotals();

    if (refID.substr(7,2) > 19 && refID.substr(7,2) < 30) {
		countOtherWork(refID);
	}

    if (refID.substr(7,2) > 29 && refID.substr(7,2) < 35) {
		countFieldTrips(refID);
	}
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
    var thisStart = (refID.substr(-1) === "S")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "S").value);
    var thisEnd = (refID.substr(-1) === "E")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "E").value);
    if (thisStart === thisEnd) {
        openPopUp("<p>Start time cannot match end time.</p>");
        byID(refID).value = "";
        return;
    }
    var numVal = Number(refID.substr(7, 2));
    var day = refID.substr(0,3);

    var max = (day === "Sat" || day === "Sun") ? 33 : 43;
    var i = (day === "Sat" || day === "Sun") ? 20 : 11;

    for (i; i < max; i++) {
        i = (i === 18) ? 20 : i;
        i = ((day === "Sat" || day === "Sun") && i === 23) ? 30 : i;
        i = (i === 35) ? 41 : i;
        if (i === numVal) i++;
        if (i === max) break;

        //Initialize newStart and newEnd
        newStart = convertToMinutes(byID(day + "Time" + i + "S").value);
        //If newStart is blank then move to next i
        if (newStart === 0) continue;

        newEnd = convertToMinutes(byID(day + "Time" + i + "E").value);
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
    var obj = getDayObj(refID.substr(0,3));

    //Declare variables and initialize values
    var startTime = (refID.substr(-1) === "S")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "S").value);
    var endTime = (refID.substr(-1) === "E")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "E").value);
    var num = Number(refID.substr(7, 2));
    var timeDiff = 0;
    var totalID = refID.substr(0, refID.length - 1);

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
    obj[totalID] = byID(totalID).value;
}

//CALCULATE DAILY RUN TIME
function dailyRuns(day) {
	"use strict";
    if (day === "Sat" || day === "Sun") return;

    var sum = 0;
    for (var i = 11; i < 18; i++) {
        sum += convertToMinutes(byID(day + "Time" + i).value);
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "RunTotal").value = sum;
}

//CALCULATE DAILY OTHER WORK TIME
function dailyOther(day) {
	"use strict";
    //Declare variables and initialize values
    var sum = 0, selectVal;

    for (var i = 20; i < 30; i++) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        selectVal = byID(day + "Select" + i).value;
        if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2") continue;
        sum += convertToMinutes(byID(day + "Time" + i).value);
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "OtherTotal").value = sum;
}

//CALCULATE CALLBACK TIME
function sumCPay() {
	"use strict";
    var c1 = 0,
        c3 = 0,
        i = 0,
        j = 20,
        sum = 0,
        selectVal;

    for (i; i < 7; i++) {
        for (j; j < 30; j++) {
            if ((days[i] === "Sat" || days[i] === "Sun") && j === 23) break;
            selectVal = byID(days[i] + "Select" + j).value;
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes(byID(days[i] + "Time" + j).value) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;
        }
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    objThisData.TotalC1 = c1;
    byID("TotalC1").value = c1;

    sum = convertTotal(sum);
    objThisData.TotalHW = sum;
    byID("TotalHW").value = sum;

    c3 = (c3 === 0) ? "" : convertTotal(c3);
    objThisData.TotalC3 = c3;
    byID("TotalC3").value = c3;
}

//CALCULATE DAILY FIELD TRIP TIME
function dailyFT(day) {
    "use strict";
    //Declare variables and initialize values
    var sum = 0;

    for (var i = 30; i < 35; i++) {
        if ((day === "Sat" || day === "Sun") && i === 33) break;
        sum += Number(byID(day + "Time" + i).value);
    }
    sum = setToFixed(sum);
    byID(day + "FTTotal").value = sum;
}

//CALCULATE DAILY Q/L TIME
function dailyQL(day) {
	"use strict";
    var sum = 0,
		i = 0;

    //If Q/L is checked, total up run, pac, shuttles, late run time
    if (day !== "Sat" && day !== "Sun" && byID(day + "QL11").checked) {
        for (i = 11; i < 18; i++) {
            sum += convertToMinutes(byID(day + "Time" + i).value);
        }
    }

    //If Other Work Q/L is checked, add the time
    for (i = 20; i < 30; i++) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        sum += (byID(day + "QL" + i).checked) ? convertToMinutes(byID(day + "Time" + i).value) : 0;
    }

    //If Q/L is checked for field trips, add time
    for (i = 30; i < 35; i++) {
        if ((day === "Sat" || day === "Sun") && i === 33) break;
        sum += (byID(day + "QL" + i).checked) ? (Number(byID(day + "Time" + i).value) * 60) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "QLTotal").value = sum;
}

//Daily leave checkboxes
function checkLeaveToggle (refID) {
	"use strict";
    var day = refID.substr(0, 3);
    checkAllDayLeave(day);
}

//Toggle lift checkboxes on/off, set them in storage and run totals
function checkboxQL(refID) {
	"use strict";
    var blnmatch = false,
		bln = false,
		day = refID.substr(0, 3),
		i = 0,
		array = [day + "QL11", day + "QL12", day + "QL13", day + "QL14", day + "QL15", day + "QL16", day + "QL17"];
    var obj = "";

    for (i; i < 7; i++) {
        if (array[i] === refID) {
            bln = (byID(refID).checked) ? true : false;
            blnmatch = true;
            break;
        }
    }
    if (blnmatch) {
        for (i = 0; i < 7; i++) {
            obj = getDayObj(days[i]);
            byID(array[i]).prop("checked", bln);
            obj[array[i]] = bln;
        }
    } else {
        obj = getDayObj(day);
        bln = (byID(refID).checked) ? true : false;
        obj[refID] = bln;
    }

    dailyQL(day);
}

function getDailyTotals() {
    for (var i = 0; i < 7; i++) {
        dailyRuns(days[i]);
        dailyOther(days[i]);
        dailyFT(days[i]);
        dailyQL(days[i]);
    }
}

//Run calculations for the whole week and set the values into local storage
function getWeeklyTotals() {
    //Declare variables and initialize the values
    var i = 0, sum = 0, j = 0;

    //Clear Hours worked
    byID("TotalHW").value = "";
    objThisData.TotalHW = "";
    sumCPay();

    for (i = 1; i < 6; i++) {
        for (j = 11; j < 18; j++) {
            sum += convertToMinutes(byID(days[i] + "Time" + j).value);            
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    objThisData.TotalRun = sum;
    byID("TotalRun").value = sum;

    sum = 0;
    for (i = 0; i < 7; i++) {
        for (j = 20; j < 30; j++) {
            if ((i === 0 || i === 6) && j > 22) continue;
            sum += convertToMinutes(byID(days[i] + "Time" + j).value);            
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    objThisData.TotalOther = sum;
    byID("TotalOther").value = sum;

    sum = 0;
    for (i = 0; i < 7; i++) {
        for (j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            sum += Number(byID(days[i] + "Time" + j).value);
        }
    }
    sum = setToFixed(sum);
    objThisData.TotalFT = sum;
    byID("TotalFT").value = sum;


    sum = convertToMinutes(objThisData.TotalRun) + convertToMinutes(objThisData.TotalOther);
    sum = Number(convertTotal(sum));
    sum += Number(objThisData.TotalFT);
    sum += Number(byID("TotalHW").value);
    sum = setToFixed(sum);
    objThisData.TotalHW = sum;
    byID("TotalHW").value = sum;

    sum = 0;
    
    for (i = 0; i < 7; i++) {
        for (j = 11; j < 35; j++) {
            if (j === 18 || j === 19) continue;
            if ((i === 0 || i === 6) && j < 20) continue;
            if ((i === 0 || i === 6) && j > 22 && j < 30) continue;
            if ((i === 0 || i === 6) && j > 32) continue;
             sum += (byID(days[i] + "QL" + j).checked) ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;   
        }
    }
    sum = convertTotal(sum);
    objThisData.TotalS2 = sum;
    byID("TotalS2").value = sum;

    sum = convertToMinutes(objThisData.TotalRun) + convertToMinutes(objThisData.TotalOther);
    sum = convertTotal(sum);
    objThisData.Total1R = sum;

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!byID("OJT").checked)
        return;

    for (i = 1; i < 6; i++) {
        for (j = 11; j < 35; j++) {
            j = (j === 18) ? 20 : j;
            sum += (byID(days[i] + "OJT" + j).checked) ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;
        }
    }
    sum = convertTotal(sum);
    objThisData.TotalS4 = sum;
    byID("TotalS4").value = sum;
}
/********************CALCULATIONS********************/

