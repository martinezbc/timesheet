//WEBSITE INTERACTION SCRIPT
var i = 0;

var byID = function(id) {
    return document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', function() {
    //LOAD DATE RANGES INTO RADIO BUTTONS AND DISPLAY
    loadDateRange();

    //START WITH LOADING DATA FROM LOCAL STORAGE
    loadLocalStorage();

    loadTeamValues(getStorage("Area"));
    loadRadioSelection();
    checkOJTData();
    checkDailyLeave();
    positionChange();
    checkOtherWorkVal();
    checkRouteValue();
    loadNavBar();
}, false);

const checkbox = document.querySelectorAll("input[type=checkbox]");
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", checkboxFunctions);
}

const textbox = document.querySelectorAll("input[type=text]");
for (i = 0; i < textbox.length; i++) {
    textbox[i].addEventListener("change", inputOnChange);
}

const numberbox = document.querySelectorAll("input[type=number]");
for (i = 0; i < numberbox.length; i++) {
    numberbox[i].addEventListener("change", inputOnChange);
}

const radiobtn = document.querySelectorAll("input[type=radio]");
for (i = 0; i < radiobtn.length; i++) {
    radiobtn[i].addEventListener("click", radioOnClick);
}

const select = document.querySelectorAll("select");
for (i = 0; i < select.length; i++) {
    select[i].addEventListener("change", selectOnChange);
}
   
byID("closeTime").addEventListener("click", function () {
    byID(activeID).disabled = false;
    showHideModal("timeModal", "none"); 
});

const timeArrows = document.querySelectorAll(".up, .down, .up2, .down2");
for (i = 0; i < timeArrows.length; i++) {
    timeArrows[i].addEventListener("click", timeSelectors);
}    

const faTimes = document.querySelectorAll(".fa-times");
for (i = 0; i < faTimes.length; i++) {
    faTimes[i].addEventListener("click", clearTimeField);
}

const faCopy = document.querySelectorAll(".fa-copy");
for (i = 0; i < faCopy.length; i++) {
    faCopy[i].addEventListener("click", copyRoutine);
}

const ow = document.querySelectorAll(".ow");
for (i = 0; i < ow.length; i++) {
    ow[i].addEventListener("click", popUpOW);
}

const ft = document.querySelectorAll(".ow");
for (i = 0; i < ft.length; i++) {
    ft[i].addEventListener("click", popUpFT);
}

const addOW = document.querySelectorAll(".addOW");
for (i = 0; i < addOW.length; i++) {
    addOW[i].addEventListener("click", addOtherWork);
}

const addFT = document.querySelectorAll(".addFT");
for (i = 0; i < addFT.length; i++) {
    addFT[i].addEventListener("click", addFieldTrip);
}

const addLV = document.querySelectorAll(".addLV");
for (i = 0; i < addLV.length; i++) {
    addLV[i].addEventListener("click", addLeave);
}       

byID("ctspan").addEventListener("click", popUpCT);

byID("goTime").addEventListener("click", function () {
    var timetext = byID("hours").innerHTML;
    timetext += ":" + byID("minutes").innerHTML;
    timetext += " " + byID("meridiem").innerHTML;
    byID(activeID).disabled = false;
    byID(activeID).value = timetext;
    showHideModal("timeModal", "none");
    textboxUpdate(activeID);
});

byID("goFT").addEventListener("click", function () {
    var ftText = "";
    if (byID("ftselector").value !== null)
        ftText = byID("ftselector").value;
    else
        ftText = byID("fttype").value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    byID(activeID).disabled = false;
    setStorage(activeID, ftText);
    showHideModal("ftModal", "none");
});

byID("closeFT").addEventListener("click", function () {
    byID(activeID).disabled = false;
    showHideModal("ftModal", "none");
});

byID("endVarious").addEventListener("click", function () {
    showHideModal("variousModal", "none");
});

byID("endValidate").addEventListener("click", function () {
    showHideModal("validateModal", "none");
});

byID("clear").addEventListener("click", function () {
    openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>', "");
});

byID("EmpID").addEventListener("keyup", function () {
    limitCharacters("EmpID", 6);
    
    var empID = byID("EmpID");

    if (isNaN(empID.value)) {
        openPopUp("<p class='varp'>Employee ID can only contains numbers.</p>", "");
        empID.value = "";
    }
});

byID("Veh1").addEventListener("keyup", function () {
    limitCharacters(e.id, 4);
});

byID("Veh2").addEventListener("keyup", function () {
    limitCharacters(e.id, 4);
});

byID("Veh3").addEventListener("keyup", function () {
    limitCharacters(e.id, 4);
});

byID("Veh4").addEventListener("keyup", function () {
    limitCharacters(e.id, 4);
});


//DEFINE PUBLIC VARIABLES
var activeID = "";
const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const fullday = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const routes = ["AMRoute1", "AMRoute2", "AMRoute3", "AMRoute4", "AMRoute5", "PMRoute1", "PMRoute2", "PMRoute3", "PMRoute4", "PMRoute5", "PSRoute1", "PSRoute2", "SHRoute1", "SHRoute2", "LRRoute1", "LRRoute2"];

//INPUT TYPE TEXTBOX AND TYPE NUMBER ON CHANGE EVENT
function inputOnChange(e) {
    var refID = e.currentTarget.id;
    if (refID.indexOf("Time") > 0)
        textboxUpdate(refID);

    if (refID.indexOf("Voucher") > 0) {
        countFieldTrips(refID);
        checkVoucherLength(refID);
    }

    if (refID.indexOf("Route") > 0) {
        fixRouteName(e.id);
        checkRouteValue();
    }

    setLocalStorage(refID);
    getWeeklyTotals();
}

//SELECT ON CHANGE EVENT
function selectOnChange(e) {
    var refID = e.currentTarget.id;
    setLocalStorage(e.id);
    if (refID.indexOf("Select") === 3) {
        countOtherWork(refID);
        if (byID.value === "FYI") 
            otherWorkTime(refID.substr(0, 3), refID.substr(9), true);
        else
            otherWorkTime(refID.substr(0, 3), refID.substr(9), false);
    }
}

function radioOnClick(e) {
    var refID = e.currentTarget.id;

    if (refID.substr(0, 4) === "area") {
        loadTeamValues(refID.substr(4));
        setStorage("Area", refID.substr(4));
    } else if (refID.substr(0, 3) === "pos" && refID.substr(-3) === "Sup") {
        setStorage("PositionSup", byID(refID).value);
    } else if (refID.substr(0, 3) === "pos") {
        setStorage("Position", byID(refID).value);
        positionChange();
    }
}

//CHECK VOUCHER LENGTH, IF EXCEED 6 DIGITS THEN SHOW ERROR MESSAGE
function checkVoucherLength(refID) {
    var refVal = byID(refID).value;
    if (refVal.length !== 6) {
        openPopUp("<p class='varp'>Only input last 6 digits of voucher number.</p>", "");
        byID(refID).value = refVal.substr(0, 6);
    }
}

//MAKE TEXT CORRECTIONS IF NECESSARY
function setLocalStorage(refID) {
    var refVal = byID(refID).value;

    if (refID === "EmpName" || refID === "Trainee") {
        refVal = properCase(refVal);
        byID(refID).value = refVal;
    } else if (refID.indexOf("Route") > 0) {
        refVal = refVal.toUpperCase();
        byID(refID).value = refVal;
    }

    if (refID.indexOf("Time41") > 0 || refID.indexOf("Time42") > 0)
        checkDailyLeave();
}

//CHANGE TO PROPER CASE
function properCase(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, function (txtVal) {
        return txtVal.toUpperCase();
    });
}

//GO THROUGH LOCAL STORAGE AND SEE WHAT IS ALREADY STORed. LOAD STORED DATA INTO ELEMENTS
function loadLocalStorage() {
    var refVal = "";
    var req = ["EmpName", "EmpID", "Area", "Team", "Position", "Veh1", "WeekOf", "EmpInitials"];
    
    for (var i = 0; i < req.length; i++) {
        refVal = getStorage(req[i]);
        if (refVal === null)
            refVal = "";
        setStorage(req[i], refVal);
    }

    //Loop through all text, number, and select elements. Set element value to matching ID in local storage
    var elements = document.querySelectorAll('input[type=number], input[type=text], select');
    Array.prototype.forEach.call(elements, e => {
        refVal = getStorage(e.id);

        //Set value to element and into local storage
        if (refVal !== null)
            e.value = refVal;
        else
            setStorage(e.id, "");
    });

    //Loop through all checkboxes. Set element checked property to matching ID from local storage
    elements = document.querySelectorAll("input[type=checkbox]");
    Array.prototype.forEach.call(elements, e => {
        refVal = getStorage(e.id);

        //If no value in local storage then set to 0
        refVal = (refVal === null) ? "0" : "1";

        //Set checkbox checked property and set into local storage
        e.checked = (refVal === "1") ? true : false;
        setStorage(e.id, refVal);
    });
}

//POP UP OW MESSAGE
function popUpOW() {
    openPopUp("<p class='varp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>", "");
}

//POP UP FT MESSAGE
function popUpFT() {
    openPopUp("<p class='varp'>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p class='varp'>&bull;Check lift if the trip required a lift.</p><p class='varp'>&bull;The start and end time must match what was recorded on the voucher.</p>", "");
}

//POP UP CT MESSAGE
function popUpCT() {
    openPopUp("<p class='varp'>&bull;Only record the routes, shuttles, middays, and late runs that are specifically assigned to you.</p><p class='varp'>&bull;Special Equipment pay will only be available if one of your routes ends with an 'L' or an 'EQ'</p><p class='varp'>&bull;Any other route that is covered for another driver and is outside of your regular hours should be recorded in the other work section.</p><p class='varp'>&bull;Record the number of students transported for each route for every day that was driven.</p><p class='varp'>&bull;In the Pupil Time section, enter the first pickup time and last drop off time for both morning and afternoon runs.</p>", "");
}

//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage(refID, val) {
    localStorage.setItem(refID, val);
}

//FIND ITEM BY ID IN LOCAL STORAGE AND RETURN VALUE
function getStorage(refID) {
    return localStorage.getItem(refID);
}

//FIND DATE RANGES FOR PREVIOUS WEEK, CURRENT WEEK, AND WEEK AFTER. SET VALUES INTO RADIO ELEMENTS
function loadDateRange() {
    "use strict";
    var d = new Date();
    var day = d.getDay();
    var r1 = DateRange(d, day, -7);
    var r2 = DateRange(d, day, 0);
    var r3 = DateRange(d, day, 7);
    var strHTML = '<strong>Week Of:</strong><br>';
    strHTML += '<input type="radio" id="week1" name="weekof" value="' + r1 + '" onclick="storeWeek(\'week1\');"><label for="week1">' + r1 + '</label>';
    strHTML += '<input type="radio" id="week2" name="weekof" value="' + r2 + '" onclick="storeWeek(\'week2\');"><label for="week2">' + r2 + '</label>';
    strHTML += '<input type="radio" id="week3" name="weekof" value="' + r3 + '" onclick="storeWeek(\'week3\');"><label for="week3">' + r3 + '</label>';
    byID("WeekOf").innerHTML = strHTML;
    if (getStorage("WeekOf") === null) {
        setStorage("WeekOf", "");
    } else {
        //IF WEEKOF IS NOT BLANK THEN SEE IF IT MATCHES AVAILABLE RADIO FIELDS
        switch (getStorage("WeekOf")) {
            case r1:
                byID("week1").checked = true;
                break;
            case r2:
                byID("week2").checked = true;
                break;
            case r3:
                byID("week3").checked = true;
                break;
            default:
                break;
        }
    }
    loadStoredWeek();
}

//LOADS DATES FROM STORAGE INTO DATE TEXT FIELDS
function loadStoredWeek() {
    if (getStorage("SatDate") !== null)
        for (var i = 0; i < 7; i++)
            byID(days[i] + "Date").innerHTML = getStorage(days[i] + "Date");
}

//SET EACH DAY IN MM/DD FORMAT INTO LOCAL STORAGE
function storeWeek(refID, optVal) {
    //Set optVal if provided or default to ""
    optVal = optVal || "";

    //Store element value in refVal and set into local storage
    var refVal = byID(refID).value;
    setStorage("WeekOf" + optVal, refVal);

    //Store first day of week range in y and shortened date in ny
    var y = refVal.substr(0, 8),
        ny = y.substr(0, 5);

    //Store second day of week range in z and shortened date in nz
    var z = refVal.substr(11),
        nz = z.substr(0, 5),
        day = new Date(y),
        newDay, sm, sd;
    setStorage("SatDate" + optVal, ny);
    for (var i = 0; i < 6; i++) {
        newDay = day.addDays(i + 1);
        sm = newDay.getMonth() + 1;
        sd = newDay.getDate();
        sm = (sm.toString().length === 1) ? "0" + sm : sm;
        sd = (sd.toString().length === 1) ? "0" + sd : sd;
        setStorage(days[i + 1] + "Date" + optVal, sm + "/" + sd);
    }
    setStorage("FriDate" + optVal, nz);
    if (optVal === "")
        loadStoredWeek();
    else
        loadSupDates();

    loadNavBar();
}

//RETURNS A STRING WITH DATE RANGE CALCULATED USING SUPPLIED DATE AND OFFSET NUMBER
function DateRange(newDate, day, offset) {
    "use strict";
    var start,
        end,
        sOffset,
        eOffset;
    switch (day) {
        case 1:
            sOffset = -2;
            eOffset = 4;
            break;
        case 2:
            sOffset = -3;
            eOffset = 3;
            break;
        case 3:
            sOffset = -4;
            eOffset = 2;
            break;
        case 4:
            sOffset = -5;
            eOffset = 1;
            break;
        case 5:
            sOffset = -6;
            eOffset = 0;
            break;
        case 6:
            sOffset = 0;
            eOffset = 6;
            break;
        case 0:
            sOffset = -1;
            eOffset = 5;
            break;
    }
    start = newDate.addDays(sOffset + offset);
    end = newDate.addDays(eOffset + offset);

    var sm = start.getMonth() + 1,
        sd = start.getDate(),
        sy = start.getFullYear().toString().substr(-2);
    var em = end.getMonth() + 1,
        ed = end.getDate(),
        ey = end.getFullYear().toString().substr(-2);
    sm = (sm.toString().length === 1) ? "0" + sm : sm;
    sd = (sd.toString().length === 1) ? "0" + sd : sd;
    em = (em.toString().length === 1) ? "0" + em : em;
    ed = (ed.toString().length === 1) ? "0" + ed : ed;
    return sm + "/" + sd + "/" + sy + " - " + em + "/" + ed + "/" + ey;
}

//DATEADD FUNCTION
Date.prototype.addDays = function (x) {
    "use strict";
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + x);
    return date;
};

//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues(area) {
    "use strict";
    var i = 0;
    byID("insertTeam").innerHTML = '<strong>Team:</strong><br>';
    var strHTML = "";
    switch (area) {
        case "1":
        case "2":
        case "3":
        case "4":
            strHTML += '<strong>Team:</strong><br>';
            for (i = 0; i < 8; i++) {
                strHTML += '<input type="radio" id="team' + area + i + '" name="team" value="' + area + i + '" onclick="setTeamSelection(\'team' + area + i + '\');"><label for="team' + area + i + '">' + area + i + '</label>';
            }
            byID("insertTeam").innerHTML = strHTML;
            break;
        case "7":
            var teams = ["ACA", "ALTM", "ALTP", "AUR", "CARD", "FCPS", "FR", "IVY", "KING", "KK", "KT", "LAB", "LOU", "MATH", "PHIL", "RIV", "SCOL"];
            strHTML += '<strong>Team:</strong><br>';
            for (i = 0; i < 17; i++) {
                strHTML += '<input type="radio" id="team' + teams[i] + '" name="team" value="' + teams[i] + '" onclick="setTeamSelection(\'team' + teams[i] + '\')";><label for="team' + teams[i] + '">' + teams[i] + '</label>';
            }
            byID("insertTeam").innerHTML = strHTML;
            break;
        case "TC":
            byID("insertTeam").innerHTML = '<strong>Team:</strong><br><input type="radio" id="teamTC" name="team" value="TC" checked><label for="teamTC">TC</label>';
            setStorage("Team", "TC");
            break;
    }
}

//FUNCTION TO SET TEAM SELECTION IN LOCAL STORAGE
function setTeamSelection(refID) {
    setStorage("Team", refID.substr(4));
}

//FIND STORED VALUE FOR AREA, TEAM AND POSITION AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    var val = getStorage("Area");
    if (val !== "" && val !== null)
        byID("area" + val).checked = true;


    val = getStorage("Team");
    if (val !== "" && val !== null)
        if (document.querySelector("#team" + val).length) {
            byID("team" + val).checked = true;
        } else {
            setStorage("Team","");
        }
        

    val = getStorage("Position");
    if (val !== "" && val !== null) {
        val = val.replace(" ", "");
        byID("pos" + val).checked = true;
    }
}

//GET VALUE OF OJT CHECKBOX AND THEN TOGGLE ALL OTHER OJT CHECKBOXES
function checkOJTData() {
    "use strict";
    var refVal = getStorage("OJT"),
        i = 0,
        j = 0;
    var bln = (refVal === "0") ? false : true;
    var blnLV = false;

    //Set property of #OJT
    byID("OJT").checked = bln;
    var trainee = byID("Trainee");
    //Set property and color of #Trainee
    if (bln) {
        trainee.disabled = false
        trainee.style.backgroundColor = "white";
    } else {
        trainee.disabled = true
        trainee.style.backgroundColor = "lightgray";
        trainee.value = "";
        setStorage("Trainee", "");
    }
    
    //Loop through days of the week
    for (i = 2; i < 7; i++) {
        //Loop through OJT checkboxes 1-10
        for (j = 11; j < 18; j++) {
            //Check if All Day Leave is checked for this day
            blnLV = (getStorage(days[i] + "LeaveAD") === "0") ? false : true;

            //If all day leave is checked, disable OJT boxes
            if (blnLV) {
                byID(days[i] + "OJT" + j).disabled = false;
            } else {
                byID(days[i] + "OJT" + j).disabled = true;
                setStorage(days[i] + "OJT" + j, 0);
            }
        }
    }
    getWeeklyTotals();
}

function checkboxOJT(refID) {
    setStorage(refID, (document.getElementById(refID).checked) ? "1" : "0");
    dailyLift(refID.substr(0,3));
}

//ENABLE EQUIPMENT/LIFT CHECKBOXES IF THERE IS A ROUTE NUMBER ENDS WITH EQ OR L
function checkRouteValue() {
    var bln = false,
        i = 0;

    //Loop through Routes and get value
    for (i = 0; i < 10; i++) {
        var refVal = byID(routes[i]).value;
        if (refVal.substr(-2) === "EQ" || refVal.substr(-1) === "L") {
            bln = true;
            break;
        }
    }

    //Loop through EQ/L checkboxes and enable/disable them
    var elements= document.querySelectorAll(".eqpt");
    Array.prototype.forEach.call(elements, e => {
        e.checked = false;
        e.disabled = !bln;
    });
}

//CHECK DAILY LEAVE VALUES AND THEN DISABLE/ENABLE CHECKBOXES AND TEXTBOXES AS NECESSARY
function checkDailyLeave() {
    //Loop through days of the week
    for (var i = 2; i < 7; i++)
        toggleADLeave(days[i]);
    
    checkOJTData();
    getDailyTotals();
    getWeeklyTotals();
}

function toggleADLeave(day) {
    var bln = (getStorage(day + "LeaveAD") === "0") ? false : true;

    //Loop through each element for that day to toggle disabled property
    var elements= document.querySelectorAll("input[id*=" + day + "], select[id*=" + day + "]");
    Array.prototype.forEach.call(elements, (e) => {        
        if (e.id === day + "LeaveSelectAD" || e.id === day + "LeaveAD") return;

        //If element does not have .nofocus then disable/enable
        if (e.classList.contains("nofocus")) {
            e.disabled = bln;
        }

        //Change element's background color
        e.style.backgroundColor = (bln) ? "lightgrey" : "white";

        //Set value into local storage
        if (bln) {
            e.value = "";
            setStorage(e.id, "");
        }
        if (e.checked && bln) {
            e.checked = false;
            setStorage(e.id, 0);
        }
    });
}

//IF POSITION CHANGES TO ACTIVITY DRIVER THEN REMOVE PUPILCOUNT SECTION
function positionChange() {
    var bln = (getStorage("Position") === "Activity Driver") ? false : true;
    if (!bln) {
        byID("PupilCounts").display = "none";
        clearRouteFields();
    } else {
        byID("PupilCounts").display = "flex";
    }
    checkRouteValue();
}

//CLEAR ROUTE COUNTS AND PUPIL TIME DATA
function clearRouteFields() {
    var i = 0,
        elements= "";

    //Loop through days of the week
    for (i = 1; i < 6; i++) {
        elements= document.querySelectorAll("input[id*='AM" + i + "Ct']");
        Array.prototype.forEach.call(elements, e => {
            e.value = "";
            setStorage(e.id, "");
        });
        
        elements= document.querySelectorAll("input[id*='PM" + i + "Ct']");
        Array.prototype.forEach.call(elements, e => {
            e.value = "";
            setStorage(e.id, "");
        });
    }

    for (i = 1; i < 3; i++) {
        elements= document.querySelectorAll("input[id*='PS" + i + "Ct']");
        Array.prototype.forEach.call(elements, e => {
            e.value = "";
            setStorage(e.id, "");
        });
            
        elements= document.querySelectorAll("input[id*='SH" + i + "Ct']");
        Array.prototype.forEach.call(elements, e => {
            e.value = "";
            setStorage(e.id, "");
        });
            
        elements= document.querySelectorAll("input[id*='LR" + i + "Ct']");
        Array.prototype.forEach.call(elements, e => {
            e.value = "";
            setStorage(e.id, "");
        });
    }
    
    elements= byID("PupilCounts").getElementsByTagName("input");
    Array.prototype.forEach.call(elements, e => {
        e.value = "";
        setStorage(e.id, "");
    });
}


//CHECK NUMBER OF OTHER WORK ENTRIES, IF MORE THAN 10 THEN GIVE POP UP ERROR MESSAGE
function countOtherWork(refID) {
    var j = 0,
        i = 0,
        num = 20;

    //Loop through each day of the week
    for (i = 0; i < 7; i++) {
        for (num; num < 30; num++) {
            if (!byID(days[i] + "Select" + num))
                continue;

            if (byID(days[i] + "Select" + num).value !== "")
                j++;
        }
    }
    //Result of j value
    if (j > 10) {
        openPopUp("<p class='varp'>&bull;The max number of other work duties is 10. A supplement must be made for any additional duties.</p>", "");
        byID(refID).value = "";
        textboxUpdate(refID);
    }
}

//CHECK NUMBER OF FIELD TRIP ENTRIES, IF MORE THAN 5 THEN GIVE POP UP ERROR MESSAGE
function countFieldTrips(refID) {
    var j = 0,
        i = 0,
        num = 30;

    //Loop through each day of the week
    for (i = 0; i < 7; i++) {
        for (num; num < 35; num++) {
            if (!byID(days[i] + "Voucher" + num))
                continue;

            if (byID(days[i] + "Voucher" + num).value !== "")
                j++;
        }
    }
    //Result of j value
    if (j > 5) {
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>", "");
        byID(refID).value = "";
        textboxUpdate(refID);
    }
}

//TOGGLE MODAL USING ELEMENT ID AND STYLE PARAMETER
function showHideModal(refID, strStyle) {
    byID(refID).style.display = strStyle;
}

//AUTO CORRECT ROUTE NAMES INTO PROPER FORMAT
function fixRouteName(refID) {
    var i = 0;
    var refVal = byID(refID).value;
    refVal = refVal.toUpperCase();
    refVal = refVal.replace(" ", "").replace("-", "");

    for (i = 0; i < refVal.length; i++) {
        if (!isNaN(refVal.substr(i, 1))) {
            if (isNaN(refVal.substr(i + 1, 1)) || i + 1 === refVal.length) 
                refVal = refVal.substr(0, i) + "0" + refVal.substr(i);
            
            refVal = refVal.substr(0, i) + "-" + refVal.substr(i);
            break;
        }
    }
    if (refVal.indexOf("AM") > 1 || refVal.indexOf("PM") > 1) 
        refVal = refVal.replace("AM", "").replace("PM", "");
    
    if (refVal.substr(-1) === "L" && refVal.substr(-2) !== " L") 
        refVal = refVal.substr(0, refVal.length - 1) + " L";
    
    if (refVal.substr(-2) === "EQ" && refVal.substr(-3) !== " EQ") 
        refVal = refVal.substr(0, refVal.length - 2) + " EQ";
    
    if (refVal.substr(-4) === "EQ L" && refVal.substr(-5) !== " EQ L") 
        refVal = refVal.substr(0, refVal.length - 4) + " EQ L";
    
    if (refVal.substr(-4) === "L EQ" && refVal.substr(-5) !== " L EQ")
        refVal = refVal.substr(0, refVal.length - 4) + " L EQ";
    

    byID(refID).value = refVal;
}

//POP UP MODALS
//TIME SELECTOR MODAL
function openTimeSelector(refID, optVal) {
    optVal = optVal || "";
    activeID = refID;
    var refVal = byID(activeID).value;
    var blnPupil = false;
    if (activeID.substr(-1) === "A" || activeID.substr(-1) === "B" || activeID.substr(-1) === "C" || activeID.substr(-1) === "D")
        blnPupil = true;

    //if active element has data already, break time into hours, minutes, and meridiem and load into spans
    if (refVal !== "" && refVal !== null) {
        var hours = refVal.substr(0, refVal.indexOf(":"));
        var mins = refVal.substr(refVal.indexOf(":") + 1, 2);
        var mer = refVal.substr(-2);
        byID("hours" + optVal).innerHTML = hours;
        byID("minutes" + optVal).innerHTML = mins;
        byID("meridiem" + optVal).innerHTML = mer;
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
    showHideModal("timeModal" + optVal, "block");
}

//FIELD TRIP MODAL
function openFTSelector(refVal, optVal) {
    optVal = (optVal === undefined) ? "" : "Sup";
    showHideModal("ftModal" + optVal, "block");
    activeID = refVal;
    byID("ftselector" + optVal).value = "";
    byID("fttype" + optVal).value = "";
}

//OPEN POP UP MODAL FOR ERROR MESSAGES
function openPopUp(msgVal, optVal) {
    optVal = (optVal === undefined) ? "" : "Sup";
    byID("varDiv" + optVal).innerHTML = "";
    byID("varDiv" + optVal).innerHTML = msgVal;
    showHideModal("variousModal" + optVal, "block");
}

//ADD VALUE TO UP AND DOWN ARROWS IN TIME SELECTOR THEN OPEN CHANGE VALUE FUNCTION
function timeSelectors(refID) {
    var strVal = refID.substr(2),
        operator = "",
        optVal = "";
    if (strVal.indexOf("Sup") > 0) {
        strVal = strVal.replace("Sup", "");
        optVal = "Sup";
    }
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
    changeValue(operator, refID, optVal, activeID);
}

//******************CHECKBOXES******************//
function checkboxFunctions(e) {
    var refID = e.currentTarget.id;

    setStorage(refID, (e.target.checked) ? "1" : "0");

    if (refID.indexOf("Lift") > 0) {
        checkboxEQL(refID);
    }

    if (refID.indexOf("Leave") > 0) {
        checkDailyLeave();
    }

    if (refID === "OJT") {
        checkOJTData();
    }

    if (refID === "OJTSup") {
        checkOJTDataSup();
    }
    
    if (refID.indexOf("OJT") > 2) {
        checkboxOJT(refID);
    }

    getWeeklyTotals();
}


function addOtherWork(e) {
    var refID = e.currentTarget.id;
    var dayVal = refID.substr(0, 3);
    var countOW = getMissingOW(dayVal);

    //Exit function if count is 10
    if (countOW === 30) return;
    var $id = [dayVal + 'OWDiv' + countOW, dayVal + 'OWTrash' + countOW, dayVal + 'OJT' + countOW, dayVal + 'Lift' + countOW, dayVal + 'Select' + countOW, dayVal + 'Desc' + countOW, dayVal + 'Time' + countOW + 'S', dayVal + 'Time' + countOW + 'E', dayVal + 'Time' + countOW, dayVal + 'ClearOW' + countOW];

    var strHTML = '<div class="tinycard bg-teal2" id="' + $id[0] + '">';
    strHTML += '<div class="row">';
    strHTML += '<div class="category col-11">Other Work&nbsp;';
    strHTML += '<span class="fas fa-question-circle ow"></span>';
    strHTML += '</div><div class="col-1 center">';
    strHTML += '<span class="fas fa-trash-alt" id="' + $id[1] + '" onclick="clearOtherField(this.id);"></span>';
    strHTML += '</div></div><div class="row ' + dayVal + 'LV"><div class="col-auto">';
    strHTML += '<input type="checkbox" id="' + $id[2] + '" onclick="checkboxOJT(this.id);">';
    strHTML += '<label class="lblBtnFalse" for="' + $id[2] + '">OJT</label>&nbsp;';
    strHTML += '<input type="checkbox" id="' + $id[3] + '" onclick="checkboxEQL(this.id);">';
    strHTML += '<label class="lblBtnFalse" for="' + $id[3] + '">EQ/L</label>';
    strHTML += '</div></div><div class="row ' + dayVal + 'LV"><div class="col-12">';
    strHTML += '<select id="' + $id[4] + '" class="selectwidth">';
    strHTML += '<option value="">--Select work--</option>';
    strHTML += '<option value="FYI">FYI</option>';
    strHTML += '<option value="OTHR">Other</option>';
    strHTML += '<option value="GT">Garage trip</option>';
    strHTML += '<option value="FUEL">Fuel</option>';
    strHTML += '<option value="RC">Run coverage</option>';
    strHTML += '<option value="EQ/L">EQ/L Coverage</option>';
    strHTML += '<option value="CPR">CPR/First Aid</option>';
    strHTML += '<option value="RCRT">Recertification</option>';
    strHTML += '<option value="MTNG">Meeting</option>';
    strHTML += '<option value="TRNG">Training</option>';
    strHTML += '<option value="MED">Physical/Drug Test</option>';
    strHTML += '<option value="CS">Cold start team</option>';
    strHTML += '<option value="ES2">2 Hr Delay - Early start</option>';
    strHTML += '<option value="ES0">On Time - Early start</option>';
    strHTML += '<option value="CBK">Call back</option>';
    strHTML += '</select></div></div>';
    strHTML += '<div class="row ' + dayVal + 'LV">';
    strHTML += '<input id="' + $id[5] + '" type="text" class="descwidth" style="text-align: left;" placeholder="Additional notes...">';
    strHTML += '</div><div class="row ' + dayVal + 'LV"><div class="col-11">';
    strHTML += '<input type="text" id="' + $id[6] + '" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(this.id);">&nbsp;';
    strHTML += '<input type="text" id="' + $id[7] + '" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(this.id);">&nbsp;';
    strHTML += '<input type="text" id="' + $id[8] + '" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + $id[9] + '"></span></div></div></div>';
    byID(refID + "2").insertAdjacentHTML('beforebegin',strHTML);
}

function addFieldTrip(e) {
    var refID = e.currentTarget.id;
    var dayVal = refID.substr(0, 3);
    var countFT = getMissingFT(dayVal);

    var $id = [dayVal + 'FTDiv' + countFT, dayVal + 'FTTrash' + countFT, dayVal + 'Lift' + countFT, dayVal + 'Voucher' + countFT, dayVal + 'To' + countFT, dayVal + 'From' + countFT, dayVal + 'Time' + countFT + 'S', dayVal + 'Time' + countFT + 'E', dayVal + 'Time' + countFT, dayVal + 'ClearFT' + countFT];

    //Exit function if count is 5
    if (countFT === 35) return;

    var strHTML = '<div class="tinycard bg-teal3" id="' + $id[0] + '">';
    strHTML += '<div class="row"><div class="category col-11">Field Trip&nbsp;';
    strHTML += '<span class="fas fa-question-circle ft"></span>';
    strHTML += '</div><div class="col-1 center">';
    strHTML += '<span class="fas fa-trash-alt" id="' + $id[1] + '" onclick="clearOtherField(this.id);"></span>';
    strHTML += '</div></div><div class="row ' + dayVal + 'LV"><div class="col-8">';
    strHTML += '<input id="' + $id[3] + '" type="text" class="voucherwidth" placeholder="Voucher">';
    strHTML += '</div><div class="col-4">';
    strHTML += '<input type="checkbox" id="' + $id[2] + '" onclick="checkboxEQL(this.id)">';
    strHTML += '<label class="lblBtnFalse" for="' + $id[2] + '">EQ/L</label>';
    strHTML += '</div></div><div class="row ' + dayVal + 'LV"><div class="col-12">';
    strHTML += '<input id="' + $id[5] + '" type="text" placeholder="Origin..." style="text-align:left;" class="ftwidth" onclick="openFTSelector(this.id)">';
    strHTML += '</div></div><div class="row ' + dayVal + 'LV"><div class="col-12">';
    strHTML += '<input id="' + $id[4] + '" type="text" placeholder="Destination..." style="text-align:left;" class="ftwidth" onclick="openFTSelector(this.id)">';
    strHTML += '</div></div><div class="row ' + dayVal + 'LV"><div class="col-11">';
    strHTML += '<input type="text" id="' + $id[6] + '" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(this.id);">&nbsp;';
    strHTML += '<input type="text" id="' + $id[7] + '" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(this.id);">&nbsp;';
    strHTML += '<input type="text" id="' + $id[8] + '" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1">';
    strHTML += '<span class="fas fa-times" id="' + $id[9] + '"></span>';
    strHTML += '</div></div></div>';
    byID(refID + "2").insertAdjacentHTML('beforebegin',strHTML);
}

function getMissingOW(day) {
    for (var i = 20; i < 30; i++) {
        if (!byID(day + "OWDiv" + i))
            return i;
    }
}

function getMissingFT(day) {
    for (var i = 30; i < 35; i++) {
        if (!byID(day + "FTDiv" + i))
            return i;
    }
}

function addLeave(e) {
    var refID = e.currentTarget.id;
    var dayVal = refID.substr(0, 3);
    byID(dayVal + "Leave40").style.display = "inline-block";
    byID(dayVal + "Leave41").style.display = "inline-block";
    byID(dayVal + "Leave42").style.display = "inline-block";

}

//******************VALIDATION AND COMPLETION******************//
function completeTimesheet() {
    var bln = runValidations();
    if (!bln)
        return;

    showHideModal("validateModal", "block");
    byID("EmpInitials").focus();
}

function openTimesheet() {
    var emp = "";
    emp = byID("EmpInitials").value;
    emp = emp.toUpperCase();
    setStorage("EmpInitials", emp);

    showHideModal("validateModal", "none");
    if (emp !== "")
        window.open("preview.html", "_self");
}

function runValidations() {
    var val = "";

    if (getStorage("Area") === "TC") //Remove some validations for training center
        val = testEmpDataTC() + testOtherWork() + testFieldTrip() + testLeave() + testTimeComplete();
    else
        val = testEmpData("") + testOtherWork() + testFieldTrip() + testLeave() + testStopCounts() + testTimeComplete();


    if (val !== "") {
        openPopUp(val, '');
        return false;
    } else {
        return true;
    }
}

function testEmpData(optVal) {
    var val = "";

    //Check selected week
    if (getStorage("WeekOf" + optVal) === "")
        val = "<p class='varp'>&bull;Pay week not selected.</p>";

    //Check Area
    if (getStorage("Area" + optVal) === "")
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (getStorage("Team" + optVal) === "")
        val += "<p class='varp'>&bull;Team not selected.</p>";

    //Check employee name
    if (getStorage("EmpName" + optVal) === "")
        val += "<p class='varp'>&bull;Employee name not entered</p>";

    //Check employee ID
    if (getStorage("EmpID" + optVal) === "")
        val += "<p class='varp'>&bull;Employee ID not entered.</p>";

    //Check position
    if (getStorage("Position" + optVal) === "")
        val += "<p class='varp'>&bull;Employee position not selected.</p>";

    //Check vehicle1
    if (getStorage("Veh1" + optVal) === "")
        val += "<p class='varp'>&bull;Assigned vehicle not entered.</p>";

    return val;
}

function testEmpDataTC() {
    var val = "";

    //Check selected week
    if (getStorage("WeekOf") === "")
        val = "<p class='varp'>&bull;Pay week not selected.</p>";

    //Check Area
    if (getStorage("Area") === "" || getStorage("Area") === null)
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (getStorage("Team") === "" || getStorage("Team") === null)
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
        for (var j = 11; j < 14; j++) {
            if (byID("Time" + j).value === "") { //Time is blank
                if (byID("Voucher" + j).value !== "" || byID("From" + j).value !== "" || byID("To" + j).value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: No time entered.</p>";

            } else { //Time is not blank
                if (byID("Voucher" + j).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: Voucher number cannot be blank.</p>";

                if (byID("From" + j).value === "" || byID("To" + j).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: From and To location cannot be blank.</p>";
            }
        }
    }
    return val;
}

function testOtherWork() {
    var val = "";

    for (var i = 0; i < 7; i++) {
        for (var j = 8; j < 11; j++) {
            if (byID("Time" + j).value !== "") { //Time is not blank
                if (byID("Select" + j).value === "") { //Select IS blank
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Category is required.</p>";
                }
                if ((byID("Select" + j).value === "OT" || byID("Select" + j).value === "FYI") && byID("Desc" + j).value === "") { //Other or FYI selected but description field is blank
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description is required when Other or FYI selected.</p>";
                }
                if (byID("Select" + j).value === "" && byID("Desc" + j).value !== "") { //Nothing selected and description field has text
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description entered without category selection.</p>";
                }
            } else { //Time is blank
                if (byID("Select" + j).value !== "" || byID("Desc" + j).value !== "") { //Category IS selected OR Description field is NOT blank
                    if (!byID("Select" + j).value === "FYI") { //Category is NOT FYI
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

    for (var i = 2; i < 7; i++) {
        for (var j = 14; j < 16; j++) {
            if (byID("Time" + j).value !== "") {
                if (byID("LeaveSelect" + j).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID("LeaveSelect" + j).value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
            }
            if (byID("LeaveAD").checked) {
                if (byID("LeaveSelectAD").value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID("LeaveSelectAD").value !== "")
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
        for (var i = 2; i < 7; i++) {

            if (!testRegPupil(days[i], 1, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";

            if (!testRegCounts(days[i], 1, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM time entered with no routes specified.</p>";

            if (!testRegPupil(days[i], 2, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM pupil counts not completed.</p>";

            if (!testRegCounts(days[i], 2, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM time entered with no routes specified.</p>";

            if (!testSpecPupil(days[i], 3, "PS", 1) || !testSpecPupil(days[i], 4, "PS", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS pupil counts not completed.</p>";

            if (!testSpecCounts(days[i], 3, "PS", 1) || !testSpecCounts(days[i], 4, "PS", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS time entered with no routes specified.</p>";

            if (!testSpecPupil(days[i], 5, "SH", 1) || !testSpecPupil(days[i], 6, "SH", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle pupil counts not completed.</p>";

            if (!testSpecCounts(days[i], 5, "SH", 1) || !testSpecCounts(days[i], 6, "SH", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle time entered with no shuttle specified.</p>";


            if (!testSpecPupil(days[i], 7, "LR", 1) || !testSpecPupil(days[i], 7, "LR", 2))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run pupil counts not completed.</p>";

            if (!testSpecCounts(days[i], 7, "LR", 1) && !testSpecCounts(days[i], 7, "LR", 2))
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
    for (var i = 0; i < 7; i++) {
        for (var j = 1; j < 15; j++) {
            if (byID(days[i] + "Time" + j + "S").value !== "" && byID(days[i] + "Time" + j + "E").value === "")
                val += "<p class='varp'>&bull;" + fullday[i] + ": Time not completed.</p>";
        }
    }
    return val;
}

//CHECK LENGTH OF ELEMENT VALUE, IF EXCEEDING NUM THEN SHOW POP UP ERROR MESSAGE
function limitCharacters(refID, num) {
    var refVal = byID(refID).value;
    if (refVal.length > num) {
        openPopUp("<p class='varp'>Limit " + num + " characters.</p>", "");
        byID(refID).value = refVal.substr(0, num);
    }
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

//IF SELECT EQUALS FYI THEN DISABLE TIME FIELDS
function checkOtherWorkVal() {
    var i = 0,
        j = 8;

    for (i = 0; i < 7; i++) {
        for (j = 20; j < 30; j++) {
            if (!byID(days[i] + "Time" + j))
                continue;

            if (byID(days[i] + "Select" + j).value === "FYI") {
                otherWorkTime(days[i], j, true);
            } else if (byID(days[i] + "Select" + i).value === null) {
                byID(days[i] + "Select" + i).value = "";
                otherWorkTime(days[i], j, false);
            } else {
                otherWorkTime(days[i], j, false);
            }
        }
    }
}

function otherWorkTime(day, num, bln) {
    var timeStart = byID(day + "Time" + num + "S"),
        timeEnd = byID(day + "Time" + num + "E");
    
    timeStart.disabled = bln;
    timeStart.style.backgroundColor = (bln) ? "lightgrey" : "white";
    timeend.disabled = bln;
    timeend.style.backgroundColor = (bln) ? "lightgrey" : "white";
    if (bln) {
        timeStart.value = "";
        textboxUpdate(day + "Time" + num + "S");
        timeend.value = "";
        textboxUpdate(day + "Time" + num + "E");
    }
}

//COPY ROUTINE FOR REGULAR WORK HOURS
function copyRoutine(refID) {
    activeID = refID;
    if (refID === "AMPupilcopy" || refID === "PMPupilcopy")
        openPopUp('<p class="varp">Do you want to copy the pupil time onto the next day?<span class="close fas fa-check-circle fa-lg" id="goPupilCopy" style="color:green;" onclick="runPupilCopyRoutine()";></span></p>', '');
    else
        openPopUp('<p class="varp">Do you want to copy all regular work hours onto the next day?<span class="close fas fa-check-circle fa-lg" id="goCopy" style="color:green;" onclick="runCopyRoutine()";></span></p>', '');
}

function runCopyRoutine() {
    showHideModal("variousModal", "none");
    var j = 0,
        k = 0,
        bln = false,
        i = 0;

    for (i = 2; i < 6; i++) {
        if (activeID.substr(0, 3) === days[i])
            j = i;
    }
    k = j;
    do {
        k++;
        bln = false;
        if (byID(days[k] + "LeaveAD").checked)
            bln = true;
    }
    while (bln && k < 7);
    if (k === 7)
        return;

    for (i = 1; i < 8; i++) {
        byID(days[k] + "Time" + i + "S").value = byID(days[j] + "Time" + i + "S").value; //= )).trigger("change");
        byID(days[k] + "Time" + i + "E").value = byID(days[j] + "Time" + i + "E").value; //= )).trigger("change");
    }
}

function runPupilCopyRoutine() {
    showHideModal("variousModal", "none");
    var k = 0,
        bln = false;

    for (var i = 2; i < 6; i++) {
        if (byID(fullday[i]).is(":visible")) {
            k = i;
            break;
        }
    }

    do {
        k++;
        bln = false;
        if (byID(days[k] + "LeaveAD").checked)
            bln = true;
    } while (bln && k < 7);

    if (k === 7)
        return;

    byID(days[k] + "TimeA").value = byID(days[i] + "TimeA").value; //.trigger("change");
    byID(days[k] + "TimeB").value = byID(days[i] + "TimeB").value; //= )).trigger("change");
    byID(days[k] + "TimeC").value = byID(days[i] + "TimeC").value; //= )).trigger("change");
    byID(days[k] + "TimeD").value = byID(days[i] + "TimeD").value;// = )).trigger("change");
}

/*          *** CALCULATIONS ***       */

//TEXTBOX UPDATE FUNCTION. CHECK FOR OVERLAPPING TIME AND THEN CALCULATE TOTAL TIME
function textboxUpdate(refID) {
  
    //Check if field is used for pupil time, return if true
    if (isNaN(refID.substr(7,2)))
        return;
    
    if (refID.indexOf("Sup") > -1) {
        textboxUpdateSup(refID);
        return;
    }
    
    //Check for overlapping times
    checkOverlap(refID);
    
    //Calculate the difference in time
    calculateDiff(refID);
    
    getDailyTotals();
    
    if (refID.substr(7,2) > 19 && refID.substr(7,2) < 30) {
		countOtherWork(refID);
	}
    
    if (refID.substr(7,2) > 29 && refID.substr(7,2) < 35) {
		countFieldTrips(refID);
	}
    setLocalStorage(refID);
}

//CHECK FOR OVERLAPPING TIME VALUES
function checkOverlap(refID) {
	"use strict";
    
    //Define variables
    var thisStart, thisEnd, numVal, bln = false, day, newStart, newEnd, i = 11, max = 43;
    
    //If element has no value then return
    if (byID(refID).value === "") 
        return;
    
    //Initialize variables
    thisStart = (refID.substr(-1) === "S")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "S").value);
    thisEnd = (refID.substr(-1) === "E")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "E").value);
    numVal = Number(refID.substr(7, 2));
    day = refID.substr(0,3);
    
    if (day === "Sat" || day === "Sun") {
        max = 35;
        i = 20;
    }
    
    for (i; i < max; i++) {
        if (i === numVal)
            i++;
        
        //If the timefield does not exist then move to next i
        if (!byID(day + "Time" + i)) 
            continue;
        
        //Initialize newStart and newEnd
        newStart = convertToMinutes(byID(day + "Time" + i + "S").value);
        newEnd = convertToMinutes(byID(day + "Time" + i + "E").value);
        
        //If both newStart and newEnd are blank then move to next i
        if (newStart === 0 && newEnd === 0) 
            continue;
        
        if (newStart === thisStart) 
            bln = true;
       
        if (thisStart > 0 && thisStart > newStart && thisStart < newEnd)
            bln = true;
                
        if (thisEnd > 0 && thisEnd > newStart && thisEnd < newEnd)
            bln = true;

        if (thisStart === newStart) 
            bln = true;

        if (thisEnd === newEnd) 
            bln = true;

        if (thisStart < newStart && thisEnd > newEnd) 
            bln = true;
    }
    
    //If bln is true then there is an overlap
    if (bln) {
        openPopUp("<p>Overlap error</p>");
        byID(refID).value = "";
    }
}

//ROUND TO THE NEAREST 5
function round5(x) {
	"use strict";
    return Math.round(x / 5) * 5;
}

//CONVERT TIME COMPLETELY TO MINUTES
function convertToMinutes(s1) {
	"use strict";
    if (s1 === "" || s1 === null || s1 === undefined) {
		return 0;
	}
    
    var h = s1.substring(0, s1.indexOf(":"));
    if (h === "12" && s1.indexOf("AM") > 0) {
		h = 0;
	}
    h = h * 60;
    
    var m = round5(Number(s1.substr(s1.indexOf(":") + 1, 2))),
        b = m + h;
    
    if (s1.indexOf("PM") > 0 && h !== 720) {
		b = b + 720;
	}
    
    return b;
}

//CALCULATE DIFFERENCE BETWEEN START AND END TIME
function calculateDiff(refID) {
    "use strict";
    //If refID is null or undefined then exit function
	if (refID === null || refID === undefined)
        return;
    
    //Declare variables and initialize values
    var startTime = (refID.substr(-1) === "S")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "S").value),
        endTime = (refID.substr(-1) === "E")  ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0,9) + "E").value),
        num = Number(refID.substr(7, 2)),
        timeDiff = 0,
        totalID = refID.substr(0, refID.length - 1);

    //If end time is less than start time then pop up error message
    if ((endTime < startTime) && (endTime !== 0)) {
        openPopUp("<p>End time is less than start time</p>");
        byID(refID).value = "";
    } else {
        if (endTime === 0) 
            endTime = startTime;

        timeDiff = endTime - startTime;
        
        if (num > 29)
            byID(totalID).value = convertTotal(timeDiff);
        else
            byID(totalID).value = calculateTotal(timeDiff);
    }
    //Set value of total into storage
    setStorage(totalID, byID(totalID).value);
}

//RETURN TIME AS H:MM FORMAT
function calculateTotal(refVal) {
    "use strict";
	var hour = Math.floor(refVal / 60),
        min = refVal - (hour * 60),
        totalVal;
    if (min < 10) {
        totalVal = hour + ":0" + min;
    } else {
        totalVal = hour + ":" + min;
    }
    return totalVal;
}

//RETURN TIME AS H.MM FORMAT
function convertTotal(refVal) {
    "use strict";
	var hour = Math.floor(refVal / 60),
        min = refVal - (hour * 60),
        totalVal;
    if (min === 0 || min === 5) {
        min = "00";
    } else if (min === 10 || min === 15 || min === 20) {
        min = "25";
    } else if (min === 25 || min === 30 || min === 35) {
        min = "50";
    } else if (min === 40 || min === 45 || min === 50) {
        min = "75";
    } else if (min === 55) {
        min = "00";
        hour = hour + 1;
    }
    totalVal = hour + "." + min;
    totalVal = setToFixed(totalVal);
    return totalVal;
}

//SET TO FIXED TO 2 DECIMALS SO THAT A ZERO DECIMAL WILL DISPLAY AS .00
function setToFixed(refVal) {
    refVal = Number(refVal);
    if (refVal === 0) {
        return "";
    }
    refVal = Number(refVal).toFixed(2);
    return refVal;
}

//CALCULATE DAILY RUN TIME
function dailyRuns(day) {
	"use strict";
    if (day === "Sat" || day === "Sun")
        return;
    
    var sum = 0;
    for (var i = 11; i < 18; i++) {
        sum += convertToMinutes(byID(day + "Time" + i).value);
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "RunTotal").value = sum;
    setStorage(day + "RunTotal", sum);
}

//Other Work Times
function dailyOther(day) {
	"use strict";
    //Declare variables and initialize values
    var sum = 0, selectVal;
    
    for (var i = 20; i < 30; i++) {
        if (!byID(day + "Time" + i))
            continue;
        
        selectVal = byID(day + "Select" + i).value;
        sum += (selectVal !== "CBK" && selectVal !== "ES0" && selectVal !== "ES2") ? convertToMinutes(byID(day + "Time" + i).value) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "OtherTotal").value = sum;
    setStorage(day + "OtherTotal", sum);
}

//Total up Specialty Pay
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
            if (!byID(days[i] + "Time" + j))
                continue;

            selectVal = byID(days[i] + "Select" + j).value;
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes(byID(days[i] + "Time" + j).value) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes(byID(days[i] + "Time" + j).value) : 0;
        }
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    setStorage("TotalC1", c1);
    byID("TotalC1").value = c1;

    sum = convertTotal(sum);
    setStorage("TotalHW", sum);
    byID("TotalHW").value = sum;
    
    c3 = (c3 === 0) ? "" : convertTotal(c3);
    setStorage("TotalC3", c3);
    byID("TotalC3").value = c3;
}

//Field Trip Times
function dailyFT(day) {
    "use strict";
    //Declare variables and initialize values
    var sum = 0;
    
    for (var i = 30; i < 35; i++) {
        if (!byID(day + "Time" + i))
            continue;
        
        sum += Number(byID(day + "Time" + i).value);
    }
    sum = setToFixed(sum);
    byID(day + "FTTotal").value = sum;
    setStorage(day + "FTTotal", sum);
}

//Lift Time
function dailyLift(day) {
	"use strict";
    var sum = 0,
		i = 0;
    
    if (day === "Sat" || day === "Sun")
        return;
    
    //If EQ/L is checked, total up run, pac, shuttles, late run time
    if (byID(day + "Lift11").checked) {
        for (i = 11; i < 18; i++) {
            sum += convertToMinutes(byID(day + "Time" + i).value);
        }
    }
    //If Other Work EQ/L is checked, add the time
    for (i = 20; i < 30; i++) {
        if (!byID(day + "Time" + i))
            continue;
        
        if (byID(day + "Lift" + i).checked) 
            sum += convertToMinutes(byID(day + "Time" + i).value);
    }
    
    //If EQ/L is checked for field trips, add time
    for (i = 30; i < 35; i++) {
        if (!byID(day + "Time" + i))
            continue;
        
        if (byID(day + "Lift" + i).checked) 
            sum += (Number(byID(day + "Time" + i).value) * 60);
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    byID(day + "LiftTotal").value = sum;
    setStorage(day + "LiftTotal", sum);
}

//Daily leave checkboxes
function checkLeaveToggle (refID) {
	"use strict";
    var day = refID.substr(0, 3);
    checkAllDayLeave(day);
}

//Toggle lift checkboxes on/off, set them in storage and run totals
function checkboxEQL(refID) {
	"use strict";
    var blnmatch = false,
		bln = false,
		day = refID.substr(0, 3),
		i = 0,
		array = [day + "Lift11", day + "Lift12", day + "Lift13", day + "Lift14", day + "Lift15", day + "Lift16", day + "Lift17"];

    for (i; i < 7; i++) {
        if (array[i] === refID) {
            bln = (byID(refID).checked) ? true : false;
            blnmatch = true;
            break;
        }
    }
    if (blnmatch) {
        for (i = 0; i < 7; i++) {
            byID(array[i]).prop("checked", bln);
            setStorage(array[i], (bln) ? "1" : "0");
        }
    } else {
        bln = (byID(refID).checked) ? true : false;
        setStorage(refID, (bln) ? "1" : "0");
    }

    dailyLift(day);
}

//Load nav bar, figure out which day it is and then set that day as visible
function loadNavBar() {
	"use strict";
    var d = new Date(),
		day = d.getDay();
    if (day === 6) {
        day = 0;
    } else {
        day = day + 1;
    }
    toggleDay(day);
}

//On span click, make next day visible and hide other days
function moveRightNavBar() {
	"use strict";
    var i = 0;
    for (i = 0; i < 7; i++) {
        if (byID(fullday[i]).is(":visible")) {
            byID(fullday[i]).hide();
            if (i === 6) {
                toggleDay(i - 6);
            } else {
                toggleDay(i + 1);
            }
            break;
        }
    }
    
}

//On span click, make previous day visible and hide other days
function moveLeftNavBar() {
	"use strict";
    for (var i = 0; i < 7; i++) {
        if (byID(fullday[i]).is(":visible")) {
            byID(fullday[i]).hide();
            if (i === 0) {
                toggleDay(i + 6);
            } else {
                toggleDay(i - 1);
            }
            break;
        }
    }
}

function togglePupilCounts (day, intDay) {
    var i = 0,
        j = 0,
        bln = false;
    const att = document.querySelector(".att");
    
    for (i = 2; i < 7; i++) {
        bln = false;
        if (days[i] === day) {
            bln = true;
        }
        if (getStorage("Position").indexOf("Driver") >= 0) {
            if (intDay > 1 && intDay < 6) {
                byID("AMPupilcopy").style.display = "flex";
                byID("PMPupilcopy").style.display = "flex";
            } else {
                byID("AMPupilcopy").style.display = "none";
                byID("PMPupilcopy").style.display = "none";
            }
            Array.prototype.forEach.call(att, e => {
                e.style.display = "flex";
            });
        } else {
            bln = false;
            byID("AMPupilcopy").style.display = "none";
            byID("PMPupilcopy").style.display = "none";
            Array.prototype.forEach.call(att, e => {
                e.style.display = "none";
            });
        }
        for (j = 1; j < 6; j++) {
            byID(days[i] + "AM" + j + "Ct").style.display = (bln) ? "flex" : "none";
            byID(days[i] + "PM" + j + "Ct").style.display = (bln) ? "flex" : "none";
        }
        for (j = 1; j < 3; j++) {
            byID(days[i] + "PS" + j + "Ct").style.display = (bln) ? "flex" : "none";
            byID(days[i] + "SH" + j + "Ct").style.display = (bln) ? "flex" : "none";
            byID(days[i] + "LR" + j + "Ct").style.display = (bln) ? "flex" : "none";
        }
        byID(days[i] + "TimeAM").style.display = (bln) ? "flex" : "none";
        byID(days[i] + "TimePM").style.display = (bln) ? "flex" : "none";
    }
    
}


//Function for nav bar to show day and change text for arrows
function toggleDay(x) {
	"use strict";
    if (x > 0 && x < 6) {
        byID(fullday[x]).style.display = "inline-block";
        byID("prev").innerHTML = days[x - 1] + "-" + getStorage(days[x - 1] + "Date");
        byID("today").innerHTML = days[x] + "-" + getStorage(days[x] + "Date");
        byID("next").innerHTML = days[x + 1] + "-" + getStorage(days[x + 1] + "Date");
    } else if (x === 0) {
        byID(fullday[x]).style.display = "inline-block";
        byID("prev").innerHTML = days[x + 6] + "-" + getStorage(days[x + 6] + "Date");
        byID("today").innerHTML = days[x] + "-" + getStorage(days[x] + "Date");
        byID("next").innerHTML = days[x + 1] + "-" + getStorage(days[x + 1] + "Date");
    } else if (x === 6) {
        byID(fullday[x]).style.display = "inline-block";
        byID("prev").innerHTML = days[x - 1] + "-" + getStorage(days[x - 1] + "Date");
        byID("today").innerHTML = days[x] + "-" + getStorage(days[x] + "Date");
        byID("next").innerHTML = days[x - 6] + "-" + getStorage(days[x - 6] + "Date");
    }
    togglePupilCounts(days[x], x);
}

function getDailyTotals() {
    for (var i = 0; i < 7; i++) {
        dailyRuns(days[i]);
        dailyOther(days[i]);
        dailyFT(days[i]);
        dailyLift(days[i]);
    }
}

//Run calculations for the whole week and set the values into local storage
function getWeeklyTotals() {
    //Declare variables and initialize the values
    var i = 0, sum = 0, j = 0;
    
    //Clear Hours worked
    byID("TotalHW").value = "";
    setStorage("TotalHW", "");
    sumCPay();

    for (i = 2; i < 7; i++) {
        sum += convertToMinutes(getStorage(days[i] + "RunTotal"));
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    setStorage("TotalRun", sum);
    byID("TotalRun").value = sum;

    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += convertToMinutes(getStorage(days[i] + "OtherTotal"));
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    setStorage("TotalOther", sum);
    byID("TotalOther").value = sum;
    
    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += Number(getStorage(days[i] + "FTTotal"));
    }
    sum = setToFixed(sum);
    setStorage("TotalFT", sum);
    byID("TotalFT").value = sum;

    
    sum = convertToMinutes(getStorage("TotalRun")) + convertToMinutes(getStorage("TotalOther"));
    sum = Number(convertTotal(sum));
    sum += Number(getStorage("TotalFT"));
    sum += Number(byID("TotalHW").value);
    sum = setToFixed(sum);
    setStorage("TotalHW", sum);
    byID("TotalHW").value = sum;

    sum = 0;
    for (i = 0; i < 7; i++) {
        sum += convertToMinutes(getStorage(days[i] + "LiftTotal"));
    }
    sum = convertTotal(sum);
    setStorage("TotalS2", sum);
    byID("TotalS2").value = sum;

    sum = convertToMinutes(getStorage("TotalRun")) + convertToMinutes(getStorage("TotalOther"));
    sum = convertTotal(sum);
    setStorage("Total1R", sum);

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!byID("OJT").checked) 
        return;
    
    for (i = 2; i < 7; i++) {
        for (j = 11; j < 30; j++) {
            if (!byID(days[i] + "Time" + j))
                continue;

            if (byID(days[i] + "OJT" + j).checked)
                sum += convertToMinutes(byID(days[i] + "Time" + j).value);
        }
    }
    sum = convertTotal(sum);
    setStorage("TotalS4", sum);
    byID("TotalS4").value = sum;
}

//CLEAR TIME FIELDS
function clearTimeField (e) {
    var fieldID = e.target.id;
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(10);
    
    if (day === "Sup") {
        clearTimeFieldSup(fieldID);
        return;
    }
    if (num === "41" || num === "42") {
        byID(day + "LeaveSelect" + num).value = "";
        setStorage(day + "LeaveSelect" + num, "");
        byID(day + "Time" + num + "E").value = "";
        byID(day + "Time" + num + "S").value = "";
    } else if (num === "AD") {
        byID(day + "LeaveSelectAD").value = "";
        setStorage(day + "LeaveSelectAD", "");
        if (byID(day + "LeaveAD").checked)
            byID(day + "LeaveAD").trigger("click");

    } else if (num === "AM") {
        byID(day + "TimeA").value = "";
        setStorage(day + "TimeA", "");
        byID(day + "TimeB").value = "";
        setStorage(day + "TimeB", "");
    } else if (num === "PM") {
        byID(day + "TimeC").value = "";
        setStorage(day + "TimeC", "");
        byID(day + "TimeD").value = "";
        setStorage(day + "TimeD", "");
    } else {
        byID(day + "Time" + num + "E").value = "";
        byID(day + "Time" + num + "S").value = "";
    }
}

//CLEAR OTHER WORK FIELDS OR FIELD TRIP FIELDS
function clearOtherField (e) {
    var fieldID = e.target.id;
    "use strict";
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(10);
    
    if (day === "Sup") {
        clearOtherFieldSup(fieldID);
        return;
    }
    if (num.substr(0,1) === "3") {
        setStorage(day + "To" + num, "");
        setStorage(day + "From" + num, "");
        setStorage(day + "Voucher" + num, "");
        setStorage(day + "Lift" + num, 0);
        setStorage(day + "Time" + num + "S", "");
        setStorage(day + "Time" + num + "E", "");
        setStorage(day + "Time" + num, "");
        byID(day + "FTDiv" + num).parentNode.removeChild(day + "FTDiv" + num);
    } else if (num.substr(0,1) === "2") {
        setStorage(day + "Desc" + num, "");
        setStorage(day + "Select" + num, "");
        setStorage(day + "Lift" + num, 0);
        setStorage(day + "OJT" + num, 0);
        setStorage(day + "Time" + num + "S", "");
        setStorage(day + "Time" + num + "E", "");
        setStorage(day + "Time" + num, "");
        byID(day + "OWDiv" + num).parentNode.removeChild(day + "OWDiv" + num);
    }
}