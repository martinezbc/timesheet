//WEBSITE INTERACTION SCRIPT
var d = document;
var byID = function(id) {
    return d.getElementById(id);
}

d.addEventListener('DOMContentLoaded', function() {
    //LOAD DATE RANGES INTO RADIO BUTTONS AND DISPLAY
    loadDateRange();

    //ADD THE FIELD TRIP SELECTOR FROM FIELDTRIPS.JS
    insertFTSelect();

    //START WITH LOADING DATA FROM LOCAL STORAGE
    loadLocalStorage();

    loadTeamValues(getStorage("Area"));
    loadRadioSelection();
    checkOJTData();
    checkDailyLeave();
    positionChange();
    checkOtherWorkVal();
    checkRouteValue();
}, false);

d.querySelector("input[type=checkbox]").addEventListener("click", function(e) {
    checkboxFunctions(e.target.id);
});

d.querySelector("input[type=text]").addEventListener("change", function (e) {
    inputOnChange(e.target.id);
});

d.querySelector("input[type=number]").addEventListener("change", function (e) {
    inputOnChange(e.target.id);
});

d.querySelector("input[type=radio]").addEventListener("click", function (e) {
    radioOnClick(e.target.id);
});
   
d.querySelector("select").addEventListener("change", function (e) {
    selectOnChange(e.target.id);
});
   
byID("closeTime").addEventListener("click", function () {
    byID(activeID).disabled = false;
    showHideModal("timeModal", "none"); 
});

byID("goTime").addEventListener("click", function () {
    var timetext = byID("hours").innerHTML;
    timetext += ":" + byID("minutes").innerHTML;
    timetext += " " + byID("meridiem").innerHTML;
    byID(activeID).disabled = false;
    byID(activeID).value = timetext;
    showHideModal("timeModal", "none");
    textboxUpdate(activeID);
});


$(".up, .down, .up2, .down2").click(function (e) {
    timeSelectors(this.id);
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

$(".fa-times").click(function (e) {
    clearTimeField(this.id);
});

$(".ow").click(function () {
    openPopUp("<p class='varp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>", "");
});

$(".ft").click(function () {
    openPopUp("<p class='varp'>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p class='varp'>&bull;Check lift if the trip required a lift.</p><p class='varp'>&bull;The start and end time must match what was recorded on the voucher.</p>", "");
});

$(".ct").click(function () {
    openPopUp("<p class='varp'>&bull;Only record the routes, shuttles, middays, and late runs that are specifically assigned to you.</p><p class='varp'>&bull;Special Equipment pay will only be available if one of your routes ends with an 'L' or an 'EQ'</p><p class='varp'>&bull;Any other route that is covered for another driver and is outside of your regular hours should be recorded in the other work section.</p><p class='varp'>&bull;Record the number of students transported for each route for every day that was driven.</p><p class='varp'>&bull;In the Pupil Time section, enter the first pickup time and last drop off time for both morning and afternoon runs.</p>", "");
});

byID("clear").addEventListener("click", function () {
    openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>', "");
});

$(".fa-copy").click(function () {
    copyRoutine(e.target.id);
});

byID("EmpID").addEventListener("keyup", function () {
    limitCharacters("EmpID", 6);
    
    var empID = byID("EmpID");

    if (isNaN(empID.value)) {
        openPopUp("<p class='varp'>Employee ID can only contains numbers.</p>", "");
        empID.value = "";
    }
});

$("#Veh1, #Veh2, #Veh3, #Veh4").keyup(function () {
    limitCharacters(this.id, 4);
});

$(".addOW").click(function () {
    addOtherWork(e.target.id);
});

$(".addFT").click(function () {
    addFieldTrip(e.target.id);
});

$(".addLV").click(function () {
    addLeave(e.target.id);
});

//DEFINE PUBLIC VARIABLES
var activeID = "";
var days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
var fullday = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var routes = ["AMRoute1", "AMRoute2", "AMRoute3", "AMRoute4", "AMRoute5", "PMRoute1", "PMRoute2", "PMRoute3", "PMRoute4", "PMRoute5", "PSRoute1", "PSRoute2", "SHRoute1", "SHRoute2", "LRRoute1", "LRRoute2"];

//INPUT TYPE TEXTBOX AND TYPE NUMBER ON CHANGE EVENT
function inputOnChange(refID) {
    if (refID.indexOf("Time") > 0)
        textboxUpdate(refID);

    if (refID.indexOf("Voucher") > 0) {
        countFieldTrips(refID);
        checkVoucherLength(refID);
    }

    if (refID.indexOf("Route") > 0) {
        fixRouteName(e.target.id);
        checkRouteValue();
    }

    setLocalStorage(refID);
    getWeeklyTotals();
}

//SELECT ON CHANGE EVENT
function selectOnChange(refID) {
    setLocalStorage(e.target.id);
    if (refID.indexOf("Select") === 3) {
        countOtherWork(refID);
        if (byID.value === "FYI") 
            otherWorkTime(refID.substr(0, 3), refID.substr(9), true);
        else
            otherWorkTime(refID.substr(0, 3), refID.substr(9), false);
    }
}

function radioOnClick(refID) {
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

//GO THROUGH LOCAL STORAGE AND SEE WHAT IS ALREADY STORED. LOAD STORED DATA INTO ELEMENTS
function loadLocalStorage(optVal) {
    optVal = (optVal === "undefined") ? "" : "Sup";
    var refVal = "";

    //Loop through all text, number, and select elements. Set element value to matching ID in local storage
    $("input[type=number], input[type=text], select").each(function (e) {
        if (e.target === undefined)
            return;
        
        refVal = getStorage(e.target.id);

        //Set value to element and into local storage
        if (refVal !== null)
            e.target.value = refVal;
        else
            setStorage(e.target.id, "");
    });

    //Loop through all checkboxes. Set element checked property to matching ID from local storage
    $("input[type=checkbox]").each(function (e) {
        if (e.target === undefined)
            return;
        
        refVal = getStorage(e.target.id);

        //If no value in local storage then set to 0
        refVal = (refVal === null) ? refVal = "0" : refVal = "1";

        //Set checkbox checked property and set into local storage
        e.target.checked = (refVal === "1") ? true : false;
        setStorage(e.target.id, refVal);
    });
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
    strHTML += '<input type="radio" id="week1" name="weekof" value="' + r1 + '" onclick="storeWeek($(this).attr(\'id\'));"><label for="week1">' + r1 + '</label>';
    strHTML += '<input type="radio" id="week2" name="weekof" value="' + r2 + '" onclick="storeWeek($(this).attr(\'id\'));"><label for="week2">' + r2 + '</label>';
    strHTML += '<input type="radio" id="week3" name="weekof" value="' + r3 + '" onclick="storeWeek($(this).attr(\'id\'));"><label for="week3">' + r3 + '</label>';
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
                strHTML += '<input type="radio" id="team' + area + i + '" name="team" value="' + area + i + '" onclick="setTeamSelection($(this).attr(\'id\'));"><label for="team' + area + i + '">' + area + i + '</label>';
            }
            byID("insertTeam").innerHTML = strHTML;
            break;
        case "7":
            var teams = ["ACA", "ALTM", "ALTP", "AUR", "CARD", "FCPS", "FR", "IVY", "KING", "KK", "KT", "LAB", "LOU", "MATH", "PHIL", "RIV", "SCOL"];
            strHTML += '<strong>Team:</strong><br>';
            for (i = 0; i < 17; i++) {
                strHTML += '<input type="radio" id="team' + teams[i] + '" name="team" value="' + teams[i] + '" onclick="setTeamSelection($(this).attr(\'id\'))";><label for="team' + teams[i] + '">' + teams[i] + '</label>';
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
        byID("team" + val).checked = true;

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
    if (refVal === "0")
        toggleOJT(false);
    else
        toggleOJT(true);
    getWeeklyTotals();
}

//TOGGLE OJT CHECKBOXES AND TRAINEE TEXTBOX
function toggleOJT(bln) {
    var i = 0,
        j = 0,
        blnLV = false;

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

            //If all day leave is checked, do not show OJT boxes
            if (bln) {
                byID(days[i] + "OJT" + j).disabled = false;
            } else {
                byID(days[i] + "OJT" + j).disabled = true;
                setStorage(days[i] + "OJT" + j, 0);
            }
        }
    }
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
    for (i = 2; i < 7; i++) {
        $(".eqpt").each(function () {
            this.checked = false;
            this.disabled = !bln;
        });
    }
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
    $("input[id*=" + day + "], select[id*=" + day + "]").each(function () {
        
        if (this.id === day + "LeaveSelectAD" || this.id === day + "LeaveAD") return;

        //If element does not have .nofocus then disable/enable
        if (this.classList.contains("nofocus")) {
            this.disabled = bln;
        }

        //Change element's background color
        this.style.backgroundColor = (bln) ? "lightgrey" : "white";

        //Set value into local storage
        if (bln) {
            this.value = "";
            setStorage(this.id, "");
        }
        if (this.checked && bln) {
            this.checked = false;
            setStorage(this.id, 0);
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
        j = 0;

    //Loop through days of the week
    for (i = 1; i < 6; i++) {
        $("input[id*='AM" + i + "Ct']").each(function () {
            this.value = "";
            setStorage(this.id, "");
        });
        $("input[id*='PM" + i + "Ct']").each(function () {
            this.value = "";
            setStorage(this.id, "");
        });
    }

    for (i = 1; i < 3; i++) {
        $("input[id*='PS" + i + "Ct']").each(function () {
            this.value = "";
            setStorage(e.target.id, "");
        });
        $("input[id*='SH" + i + "Ct']").each(function () {
            this.value = "";
            setStorage(this.id, "");
        });
        $("input[id*='LR" + i + "Ct']").each(function () {
            this.value = "";
            setStorage(this.id, "");
        });
    }
    $("input", $('#PupilCounts')).each(function () {
        this.value = "";
        setStorage(this.id, "");
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
            if (!byID(days[i] + "Select" + num).length > 0)
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
            if (!byID(days[i] + "Voucher" + num).length > 0)
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
            mins = round5(Number(byID("minutes").text()));
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
    optVal = optVal || "";
    showHideModal("ftModal" + optVal, "block");
    activeID = refVal;
    byID("ftselector" + optVal).value = "";
    byID("fttype" + optVal).value = "";
}

//OPEN POP UP MODAL FOR ERROR MESSAGES
function openPopUp(msgVal, optVal) {
    optVal = optVal || "";
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
function checkboxFunctions(refID) {
    if (refID.indexOf("Lift") > 0)
        checkboxEQL(refID);

    if (refID.indexOf("Leave") > 0)
        checkDailyLeave();

    if (refID === "OJT")
        checkOJTData();

    if (refID === "OJTSup")
        checkOJTDataSup();

    getWeeklyTotals();
}


function addOtherWork(refID) {
    var dayVal = refID.substr(0, 3);
    var countOW = getMissingOW(dayVal);

    //Exit function if count is 10
    if (countOW === 30) return;

    var strHTML = '<div class="tinycard bg-teal2" id="' + dayVal + 'OWDiv' + countOW + '"><div class="row"><div class="category col-11">Other Work&nbsp;<span class="fas fa-question-circle ow"></span></div><div class="col-1 center"><span class="fas fa-trash-alt" id="' + dayVal + 'OWTrash' + countOW + '" onclick="clearOtherField(e.target.id);"></span></div></div><div class="row ' + dayVal + 'LV"><div class="col-auto"><input type="checkbox" id="' + dayVal + 'OJT' + countOW + '" onclick="checkboxFunctions(e.target.id);"><label class="lblBtnFalse" for="' + dayVal + 'OJT' + countOW + '">OJT</label>&nbsp;<input type="checkbox" id="' + dayVal + 'Lift' + countOW + '" onclick="checkboxEQL(e.target.id);"><label class="lblBtnFalse" for="' + dayVal + 'Lift' + countOW + '">EQ/L</label></div></div><div class="row ' + dayVal + 'LV"><div class="col-12"><select id="' + dayVal + 'Select' + countOW + '" class="selectwidth"><option value="">--Select work--</option><option value="FYI">FYI</option><option value="OTHR">Other</option><option value="GT">Garage trip</option><option value="FUEL">Fuel</option><option value="RC">Run coverage</option><option value="EQ/L">EQ/L Coverage</option><option value="CPR">CPR/First Aid</option><option value="RCRT">Recertification</option><option value="MTNG">Meeting</option><option value="TRNG">Training</option><option value="MED">Physical/Drug Test</option><option value="CS">Cold start team</option><option value="ES2">2 Hr Delay - Early start</option><option value="ES0">On Time - Early start</option><option value="CBK">Call back</option></select></div></div><div class="row ' + dayVal + 'LV"><input name="' + dayVal + 'Desc' + countOW + '" id="' + dayVal + 'Desc' + countOW + '" type="text" class="descwidth" style="text-align: left;" placeholder="Additional notes..."></div><div class="row ' + dayVal + 'LV"><div class="col-11"><input type="text" name="' + dayVal + 'Time' + countOW + 'S" id="' + dayVal + 'Time' + countOW + 'S" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(e.target.id);">&nbsp;<input type="text" name="' + dayVal + 'Time' + countOW + 'E" id="' + dayVal + 'Time' + countOW + 'E" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(e.target.id);">&nbsp;<input type="text" name="' + dayVal + 'Time' + countOW + '" id="' + dayVal + 'Time' + countOW + '" class="total-time nofocus" disabled></div><div class="col-1"><span class="fas fa-times" id="' + dayVal + 'ClearOW' + countOW + '"></span></div></div></div>';
    byID(refID + "2").insertAdjacentHTML('beforebegin',strHTML);
}

function addFieldTrip(refID) {
    var dayVal = refID.substr(0, 3);
    var countFT = getMissingFT(dayVal);

    //Exit function if count is 5
    if (countFT === 35) return;

    var strHTML = '<div class="tinycard bg-teal3" id="' + dayVal + 'FTDiv' + countFT + '"><div class="row"><div class="category col-11">Field Trip&nbsp;<span class="fas fa-question-circle ft"></span></div><div class="col-1 center"><span class="fas fa-trash-alt" id="' + dayVal + 'FTTrash' + countFT + '" onclick="clearOtherField(e.target.id);"></span></div></div><div class="row ' + dayVal + 'LV"><div class="col-8"><input name="' + dayVal + 'Voucher' + countFT + '" id="' + dayVal + 'Voucher' + countFT + '" type="text" class="voucherwidth" placeholder="Voucher"></div><div class="col-4"><input type="checkbox" id="' + dayVal + 'Lift' + countFT + '"><label class="lblBtnFalse" for="' + dayVal + 'Lift' + countFT + '">EQ/L</label></div></div><div class="row ' + dayVal + 'LV"><div class="col-12"><input name="' + dayVal + 'From' + countFT + '" id="' + dayVal + 'From' + countFT + '" type="text" placeholder="Origin..." style="text-align:left;" class="ftwidth"></div></div><div class="row ' + dayVal + 'LV"><div class="col-12"><input name="' + dayVal + 'To' + countFT + '" id="' + dayVal + 'To' + countFT + '" type="text" placeholder="Destination..." style="text-align:left;" class="ftwidth"></div></div><div class="row ' + dayVal + 'LV"><div class="col-11"><input type="text" name="' + dayVal + 'Time' + countFT + 'S" id="' + dayVal + 'Time' + countFT + 'S" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(e.target.id);">&nbsp;<input type="text" name="' + dayVal + 'Time' + countFT + 'E" id="' + dayVal + 'Time' + countFT + 'E" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(e.target.id);">&nbsp;<input type="text" name="' + dayVal + 'Time' + countFT + '" id="' + dayVal + 'Time' + countFT + '" class="total-time nofocus" disabled></div><div class="col-1"><span class="fas fa-times" id="' + dayVal + 'ClearFT' + countFT + '"></span></div></div></div>';
    byID(refID + "2").insertAdjacentHTML('beforebegin',strHTML);
}

function getMissingOW(day) {
    for (var i = 20; i < 30; i++) {
        if (!byID(day + "OWDiv" + i).length)
            return i;
    }
}

function getMissingFT(day) {
    for (var i = 30; i < 35; i++) {
        if (!byID(day + "FTDiv" + i).length)
            return i;
    }
}

function addLeave(refID) {
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
            if (byID("LeaveAD").prop("checked")) {
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

            if (byID(days[i] + "Select" + j) === "FYI") {
                otherWorkTime(days[i], j, true);
            } else if (byID(days[i] + "Select" + i) === null) {
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
    timeEnd.disabled = bln;
    timeEnd.style.backgroundColor = (bln) ? "lightgrey" : "white";
    if (bln) {
        timeStart.value = "";
        textboxUpdate(day + "Time" + num + "S");
        timeEnd.value = "";
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
        if (byID(days[k] + "LeaveAD").prop("checked"))
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
        if (byID(days[k] + "LeaveAD").prop("checked"))
            bln = true;
    } while (bln && k < 7);

    if (k === 7)
        return;

    byID(days[k] + "TimeA").value = byID(days[i] + "TimeA").value; //.trigger("change");
    byID(days[k] + "TimeB").value = byID(days[i] + "TimeB").value; //= )).trigger("change");
    byID(days[k] + "TimeC").value = byID(days[i] + "TimeC").value; //= )).trigger("change");
    byID(days[k] + "TimeD").value = byID(days[i] + "TimeD").value;// = )).trigger("change");
}
