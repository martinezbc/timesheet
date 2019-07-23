
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







//CHECK VOUCHER LENGTH, IF EXCEED 6 DIGITS THEN SHOW ERROR MESSAGE
function checkVoucherLength(refID) {
    var refVal = byID(refID).value;
    if (refVal.length !== 6) {
        openPopUp("<p class='varp'>Only input last 6 digits of voucher number.</p>");
        byID(refID).value = refVal.substr(0, 6);
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

//Daily leave checkboxes
function checkLeaveToggle (refID) {
	"use strict";
    var day = refID.substr(0, 3);
    checkAllDayLeave(day);
}