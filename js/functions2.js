//WEBSITE INTERACTION SCRIPT
var i = 0;




document.addEventListener('DOMContentLoaded', function() {
    //LOAD DATE RANGES INTO RADIO BUTTONS AND DISPLAY
    loadDateRange();

    //START WITH LOADING DATA FROM LOCAL STORAGE
    loadLocalStorage();

    loadTeamValues();
    loadRadioSelection();
    checkOJTData();
    checkDailyLeave();
    positionChange();
    //checkOtherWorkVal();
    loadNavBar();
}, false);

const area = document.getElementsByName("area");
for (i = 0; i < area.length; i++) {
    area[i].addEventListener("click", loadTeamValues);
}

const radiobtn = document.querySelectorAll("input[type=radio]");
for (i = 0; i < radiobtn.length; i++) {
    radiobtn[i].addEventListener("click", radioOnClick);
}

function radioOnClick(e) {
    var refID = e.currentTarget.id;

    if (refID.substr(0, 4) === "area") {
        setStorage("Area", byID(refID).value);
        loadTeamValues();
    } else if (refID.substr(0, 3) === "pos") {
        setStorage("Position", byID(refID).value);
        positionChange();
    }
}

const checkbox = document.querySelectorAll("input[type=checkbox]");
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", checkboxFunctions);
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

    if (refID.indexOf("OJT") > 2) {
        checkboxOJT(refID);
    }

    getWeeklyTotals();
}

const textbox = document.querySelectorAll("input[type=text]");
for (i = 0; i < textbox.length; i++) {
    textbox[i].addEventListener("change", inputOnChange);
}

const numberbox = document.querySelectorAll("input[type=number]");
for (i = 0; i < numberbox.length; i++) {
    numberbox[i].addEventListener("change", inputOnChange);
}

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
        fixRouteName(refID);
        checkRouteValue();
    }

    setLocalStorage(refID);
    getWeeklyTotals();
}



//LOAD ALL ELEMENTS INTO LOCAL STORAGE OR SET VALUES FROM LOCAL STORAGE INTO ELEMENTS
function loadLocalStorage() {
    var refVal = "";
    var req = ["EmpName", "Area", "Team", "Position", "Veh1", "WeekOf", "EmpInitials"];

    for (var i = 0; i < req.length; i++) {
        refVal = getStorage(req[i]);
        if (refVal === null)
            refVal = "";
        setStorage(req[i], refVal);
    }

    //Loop through all text, number, and select elements. Set element value to matching ID in local storage
    var elements = document.querySelectorAll('input[type=number], input[type=text], select');
    for (i = 0; i < elements.length; i++) {
        refVal = getStorage(elements[i].id);
        if (refVal !== null)
            elements[i].value = refVal;
        else
            setStorage(elements[i].id, "");
    }

    //Loop through all checkboxes. Set element checked property to matching ID from local storage
    elements = document.querySelectorAll("input[type=checkbox]");
    for (i = 0; i < elements.length; i++) {
        refVal = getStorage(elements[i].id);

        //If no value in local storage then set to 0
        refVal = (refVal === null) ? "0" : "1";

        //Set checkbox checked property and set into local storage
        elements[i].checked = (refVal === "1") ? true : false;
        setStorage(elements[i].id, refVal);
    }
}

//GET INTEGER VALUE OF TODAY AND PASS VALUE INTO NAV BAR
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


//function togglePupilCounts (day, x) {
//    //Define variables and initialize
//    var i = 0,
//        j = 0,
//        bln = false;
//    //Define constant att nodeList
//    const att = document.querySelectorAll(".att");
//    //Get Position value
//    var posVal = getStorage("Position");
//    //Exit function if the position is activity driver
//    if  (posVal === "Activity Driver") return;
//    //Loop through Monday - Friday
//    for (i = 2; i < 7; i++) {
//        //Set boolean to display/hide fields
//        bln = (days[i] === day) ? true : false;
//        if (posVal === "Attendant" || posVal === "Attendant Trainee" || posVal === "Sub Attendant") {
//            //Hide copy buttons for Saturday, Sunday, and Friday
//            if (x > 1 && x < 6) {
//                byID("AMPupilcopy").classList.remove("hide");
//                byID("PMPupilcopy").classList.remove("hide");
//            } else {
//                byID("AMPupilcopy").classList.add("hide");
//                byID("PMPupilcopy").classList.add("hide");
//            }
//            for (j = 0; j < att.length; j++) {
//                att[j].classList.remove("hide");
//            }
//        } else {
//            bln = false;
//            byID("AMPupilcopy").classList.add("hide");
//            byID("PMPupilcopy").classList.add("hide");
//            for (j = 0; j < att.length; j++) {
//                att[j].classList.add("hide");
//            }
//        }
//        if (bln) {
//          for (j = 1; j < 6; j++) {
//            byID(days[i] + "AM" + j + "Ct").classList.remove("hide");
//            byID(days[i] + "PM" + j + "Ct").classList.remove("hide");
//            if (j < 3) {
//              byID(days[i] + "PS" + j + "Ct").classList.remove("hide");
//              byID(days[i] + "SH" + j + "Ct").classList.remove("hide");
//              byID(days[i] + "LR" + j + "Ct").classList.remove("hide");
//            }
//          }
//          byID(days[i] + "TimeAM").classList.remove("hide");
//          byID(days[i] + "TimePM").classList.remove("hide");
//        } else {
//          for (j = 1; j < 6; j++) {
//            byID(days[i] + "AM" + j + "Ct").classList.add("hide");
//            byID(days[i] + "PM" + j + "Ct").classList.add("hide");
//            if (j < 3) {
//              byID(days[i] + "PS" + j + "Ct").classList.add("hide");
//              byID(days[i] + "SH" + j + "Ct").classList.add("hide");
//              byID(days[i] + "LR" + j + "Ct").classList.add("hide");
//            }
//          }
//          byID(days[i] + "TimeAM").classList.add("hide");
//          byID(days[i] + "TimePM").classList.add("hide");
//        }
//    }
//
//}




//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues() {
    "use strict";
    var area = getStorage("Area");
    if (area === null) return;
    
    var areadiv = ["div1", "div2", "div3", "div4", "div7", "divTC"];
    for (var i = 0; i < areadiv.length; i++) {
        if ("div" + area === areadiv[i]) {
            byID(areadiv[i]).classList.remove("hide");
        } else {
            if (!byID(areadiv[i]).classList.contains("hide")) byID(areadiv[i]).classList.add("hide");
        }
    }
    if (area === "TC") byID("teamTC").checked = true;
}

//IF POSITION CHANGES TO ACTIVITY DRIVER THEN REMOVE PUPILCOUNT SECTION
function positionChange() {
    var bln = (getStorage("Position") === "Activity Driver") ? false : true;
    if (!bln) {
        byID("PupilCounts").classList.add("hide");
        clearRouteFields();
    } else {
        byID("PupilCounts").classList.remove("hide");
    }
    checkRouteValue();
}

//ENABLE EQUIPMENT/LIFT CHECKBOXES IF THERE IS A ROUTE NUMBER ENDS WITH EQ OR L
function checkRouteValue() {
    var bln = false;

    //Loop through Routes and get value
    for (var i = 0; i < 10; i++) {
        var refVal = byID(routes[i]).value;
        if (refVal.substr(-2) === "EQ" || refVal.substr(-1) === "L") {
            bln = true;
            break;
        }
    }

    //Loop through EQ/L checkboxes and enable/disable them
    var elements= document.querySelectorAll(".eqpt");
    for (i = 0; i < elements[i]; i++) {
        elements[i].checked = false;
        elements[i].disabled = !bln;
    }
}

//CLEAR ROUTE COUNTS AND PUPIL TIME DATA
function clearRouteFields() {
    var i = 0,
        j = 0,
        elements= "";

    //Loop through days of the week
    for (i = 1; i < 6; i++) {
        elements= document.querySelectorAll("input[id*='AM" + i + "Ct']");
        for (j = 0; j < elements.length; j++) {
            elements[j].value = "";
            setStorage(elements[j].id, "");
        }

        elements= document.querySelectorAll("input[id*='PM" + i + "Ct']");
        for (j = 0; j < elements.length; j++) {
            elements[j].value = "";
            setStorage(elements[j].id, "");
        }
    }

    for (i = 1; i < 3; i++) {
        elements= document.querySelectorAll("input[id*='PS" + i + "Ct']");
        for (j = 0; j < elements.length; j++) {
            elements[j].value = "";
            setStorage(elements[j].id, "");
        }

        elements= document.querySelectorAll("input[id*='SH" + i + "Ct']");
        for (j = 0; j < elements.length; j++) {
            elements[j].value = "";
            setStorage(elements[j].id, "");
        }

        elements= document.querySelectorAll("input[id*='LR" + i + "Ct']");
        for (j = 0; j < elements.length; j++) {
            elements[j].value = "";
            setStorage(elements[j].id, "");
        }
    }

    elements= byID("PupilCounts").getElementsByTagName("input");
    for (j = 0; j < elements.length; j++) {
        elements[j].value = "";
        setStorage(elements[j].id, "");
    }
}





//CLEAR TIME FIELDS
function clearTimeField (e) {
    var fieldID = e.target.id;
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(10);

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
function clearOtherField (fieldID) {
    "use strict";
    var day = fieldID.substr(0, 3),
        num = fieldID.substr(10);

    if (num.substr(0,1) === "3") {
        setStorage(day + "To" + num, "");
        setStorage(day + "From" + num, "");
        setStorage(day + "Voucher" + num, "");
        setStorage(day + "Lift" + num, 0);
        setStorage(day + "Time" + num + "S", "");
        setStorage(day + "Time" + num + "E", "");
        setStorage(day + "Time" + num, "");
        byID(day + "FTDiv" + num).classList.add("hide");
    } else if (num.substr(0,1) === "2") {
        setStorage(day + "Desc" + num, "");
        setStorage(day + "Select" + num, "");
        setStorage(day + "Lift" + num, 0);
        setStorage(day + "OJT" + num, 0);
        setStorage(day + "Time" + num + "S", "");
        setStorage(day + "Time" + num + "E", "");
        setStorage(day + "Time" + num, "");
        byID(day + "OWDiv" + num).classList.add("hide");
    }
}

//CHECK VOUCHER LENGTH, IF EXCEED 6 DIGITS THEN SHOW ERROR MESSAGE
function checkVoucherLength(refID) {
    var refVal = byID(refID).value;
    if (refVal.length !== 6) {
        openPopUp("<p class='varp'>Only input last 6 digits of voucher number.</p>");
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



//FUNCTION TO SET TEAM SELECTION IN LOCAL STORAGE
function setTeamSelection(refID) {
    setStorage("Team", refID.substr(4));
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
    for (var i = 0; i < elements.length; i++) {
        if (elements[i] === day + "LeaveSelectAD" || elements[i].id === day + "LeaveAD") continue;

        //If element does not have .nofocus then disable/enable
        if (elements[i].classList.contains("nofocus")) {
            elements[i].disabled = bln;
        }

        //Change element's background color
        elements[i].style.backgroundColor = (bln) ? "lightgrey" : "white";

        //Set value into local storage
        if (bln) {
            elements[i].value = "";
            setStorage(elements[i].id, "");
        }
        if (elements[i].checked && bln) {
            elements[i].checked = false;
            setStorage(elements[i].id, 0);
        }
    }
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
        openPopUp("<p class='varp'>&bull;The max number of other work duties is 10. A supplement must be made for any additional duties.</p>");
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
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>");
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

        /* When the user clicks on the button,
        toggle between hiding and showing the dropdown content */
        function myFunction() {
            document.getElementById("navdropdown").classList.toggle("show");
        }

        // Close the dropdown if the user clicks outside of it
        window.onclick = function(e) {
            var refID = e.target.id;
            if (refID !== 'navbtn') {
                if (e.target.classList.contains('show')) {
                    e.target.classList.toggle("show");
                }
            }
        }
        window.ontouchstart = function(event) {
            var refID = e.target.id;
            if (refID !== 'navbtn') {
                if (e.target.classList.contains('show')) {
                    e.target.classList.toggle("show");
                }
            }
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





/*          *** CALCULATIONS ***       */

//TEXTBOX UPDATE FUNCTION. CHECK FOR OVERLAPPING TIME AND THEN CALCULATE TOTAL TIME
function textboxUpdate(refID) {

    //Check if field is used for pupil time, return if true
    if (isNaN(refID.substr(7,2)))
        return;

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