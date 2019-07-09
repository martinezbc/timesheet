//WEBSITE INTERACTION SCRIPT

//ALL ON WINDOW READY FUNCTIONS
$(document).ready(function () {
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

    $("input[type='checkbox']").click(function () {
        checkboxFunctions(this.id);
    });

    $("input[type='text'], input[type='number']").change(function () {
        inputOnChange(this.id);
    });

    $("input[type=radio]").click(function () {
        radioOnClick(this.id);
    });

    $("select").change(function () {
        selectOnChange(this.id);
    });

    $("#closeTime").click(function () {
        $("#" + activeID).prop("disabled", false);
        showHideModal("timeModal", "none");
    });

    $("#goTime").click(function () {
        var timeText = $("#hours").text() + ":" + $("#minutes").text() + " " + $("#meridiem").text();
        $("#" + activeID).val(timeText).prop("disabled", false);
        showHideModal("timeModal", "none");
        textboxUpdate(activeID);
    });

    $(".up, .down, .up2, .down2").click(function () {
        timeSelectors(this.id);
    });

    $("#goFT").click(function () {
        var ftText = "";
        if ($("#ftselector").val() !== null)
            ftText = $("#ftselector").val();
        else
            ftText = $("#fttype").val();

        ftText = ftText.substr(0, 30);
        $("#" + activeID).val(ftText).prop("disabled", false);
        setStorage(activeID, ftText);
        showHideModal("ftModal", "none");
    });

    $("#closeFT").click(function () {
        $("#" + activeID).prop("disabled", false);
        showHideModal("ftModal", "none");
    });

    $("#endVarious").click(function () {
        showHideModal("variousModal", "none");
    });

    $("#endValidate").click(function () {
        showHideModal('validateModal', 'none');
    });

    $('.fa-times').click(function () {
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

    $("#clear").click(function () {
        openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>', "");
    });

    $(".fa-copy").click(function () {
        copyRoutine(this.id);
    });

    $("#EmpID").keyup(function () {
        limitCharacters("EmpID", 6);

        if (isNaN($(this).val())) {
            openPopUp("<p class='varp'>Employee ID can only contains numbers.</p>", "");
            $("#EmpID").val("");
        }
    });

    $("#Veh1, #Veh2, #Veh3, #Veh4").keyup(function () {
        limitCharacters(this.id, 4);
    });

    $(".addOW").click(function () {
        addOtherWork(this.id);
    });

    $(".addFT").click(function () {
        addFieldTrip(this.id);
    });

    $(".addLV").click(function () {
        addLeave(this.id);
    });
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
        fixRouteName(this.id);
        checkRouteValue();
    }

    setLocalStorage(refID);
    getWeeklyTotals();
}

//SELECT ON CHANGE EVENT
function selectOnChange(refID) {
    setLocalStorage(this.id);
    if (refID.indexOf("Select") === 3) {
        countOtherWork(refID);
        if ($(this).val() === "FYI") 
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
        setStorage("PositionSup", $("#" + refID).val());
    } else if (refID.substr(0, 3) === "pos") {
        setStorage("Position", $("#" + refID).val());
        positionChange();
    }
}

//CHECK VOUCHER LENGTH, IF EXCEED 6 DIGITS THEN SHOW ERROR MESSAGE
function checkVoucherLength(refID) {
    refVal = $("#" + refID).val();
    if (refVal.length !== 6) {
        openPopUp("<p class='varp'>Only input last 6 digits of voucher number.</p>", "");
        $("#" + refID).val(refVal.substr(0, 6));
    }
}

//MAKE TEXT CORRECTIONS IF NECESSARY
function setLocalStorage(refID) {
    var refVal = $("#" + refID).val();

    if (refID === "EmpName" || refID === "Trainee") {
        refVal = properCase(refVal);
        $("#" + refID).val(refVal);
    } else if (refID.indexOf("Route") > 0) {
        refVal = refVal.toUpperCase();
        $("#" + refID).val(refVal);
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
    $("input[type=text], input[type=number], select").each(function () {
        refVal = getStorage(this.id);

        //If no value in local storage then set to ""
        refVal = (refVal === null) ? refVal = "" : refVal = refVal;

        //Set value to element and into local storage
        $(this).val(refVal);
        setStorage(this.id, refVal);
    });

    //Loop through all checkboxes. Set element checked property to matching ID from local storage
    $(":checkbox").each(function () {
        refVal = getStorage(this.id);

        //If no value in local storage then set to 0
        refVal = (refVal === null) ? refVal = "0" : refVal = "1";

        //Set checkbox checked property and set into local storage
        $(this).prop("checked", (refVal === "1") ? true : false);
        setStorage(this.id, refVal);
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
    $("#WeekOf").html(strHTML);
    if (getStorage("WeekOf") === null) {
        setStorage("WeekOf", "");
    } else {
        //IF WEEKOF IS NOT BLANK THEN SEE IF IT MATCHES AVAILABLE RADIO FIELDS
        switch (getStorage("WeekOf")) {
            case r1:
                $("#week1").prop("checked", "checked");
                break;
            case r2:
                $("#week2").prop("checked", "checked");
                break;
            case r3:
                $("#week3").prop("checked", "checked");
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
            $("#" + days[i] + "Date").text(getStorage(days[i] + "Date"));
}

//SET EACH DAY IN MM/DD FORMAT INTO LOCAL STORAGE
function storeWeek(refID, optVal) {
    //Set optVal if provided or default to ""
    optVal = optVal || "";

    //Store element value in refVal and set into local storage
    var refVal = $("#" + refID).val();
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
    $("#insertTeam").html('<strong>Team:</strong><br>');
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
            $("#insertTeam").html(strHTML);
            break;
        case "7":
            var teams = ["ACA", "ALTM", "ALTP", "AUR", "CARD", "FCPS", "FR", "IVY", "KING", "KK", "KT", "LAB", "LOU", "MATH", "PHIL", "RIV", "SCOL"];
            strHTML += '<strong>Team:</strong><br>';
            for (i = 0; i < 17; i++) {
                strHTML += '<input type="radio" id="team' + teams[i] + '" name="team" value="' + teams[i] + '" onclick="setTeamSelection($(this).attr(\'id\'))";><label for="team' + teams[i] + '">' + teams[i] + '</label>';
            }
            $("#insertTeam").html(strHTML);
            break;
        case "TC":
            $("#insertTeam").html('<strong>Team:</strong><br><input type="radio" id="teamTC" name="team" value="TC" checked><label for="teamTC">TC</label>');
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
    if (val !== "")
        $("#area" + val).prop("checked", "checked");


    val = getStorage("Team");
    if (val !== "")
        $("#team" + val).prop("checked", "checked");

    val = getStorage("Position").replace(" ", "");
    if (val !== "")
        $("#pos" + val).prop("checked", "checked");
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
}

//TOGGLE OJT CHECKBOXES AND TRAINEE TEXTBOX
function toggleOJT(bln) {
    var i = 0,
        j = 0,
        blnLV = false;

    //Set property of #OJT
    $("#OJT").prop("checked", bln);

    //Set property and color of #Trainee
    if (bln) {
        $("#Trainee").prop("disabled", false).css("background-color", "white");
    } else {
        $("#Trainee").prop("disabled", true).css("background-color", "lightgray").val("");
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
                $("#" + days[i] + "OJT" + j).prop("disabled", false);
            } else {
                $("#" + days[i] + "OJT" + j).prop("disabled", true);
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
        if ($("#" + routes[i]).val().substr(-2) === "EQ" || $("#" + routes[i]).val().substr(-1) === "L") {
            bln = true;
            break;
        }
    }

    //Loop through EQ/L checkboxes and enable/disable them
    for (var i = 2; i < 7; i++) {
        $(".eqpt").each(function () {
            $("#" + this.id).prop("disabled", !bln).prop("checked", false);
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
    var bln = (getStorage(days[i] + "LeaveAD") === "0") ? false : true;

    //Loop through each element for that day to toggle disabled property
    $("input[id*='" + day + "'], select[id*='" + day + "']").each(function () {
        if (this.id === day + "LeaveSelectAD" || this.id === day + "LeaveAD") return;

        //If element does not have .nofocus then disable/enable
        if (!$(this).hasClass("nofocus")) {
            $(this).prop("disabled", bln);
        }

        //Change element's background color
        $(this).css("background-color", (bln) ? "lightgrey" : "white");

        //Set value into local storage
        if (bln) {
            $(this).val("");
            setStorage(this.id, "");
        }
        if ($(this).prop("checked") && bln) {
            $(this).prop("checked", false);
            setStorage(this.id, 0);
        }
    });
}

//IF POSITION CHANGES TO ACTIVITY DRIVER THEN REMOVE PUPILCOUNT SECTION
function positionChange() {
    var bln = (x === "Activity Driver") ? false : true;
    if (!bln) {
        $("#PupilCounts").hide();
        clearRouteFields();
    } else {
        $("#PupilCounts").show();
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
            $(this).val("");
            setStorage(this.id, "");
        });
        $("input[id*='PM" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage(this.id, "");
        });
    }

    for (i = 1; i < 3; i++) {
        $("input[id*='PS" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage(this.id, "");
        });
        $("input[id*='SH" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage(this.id, "");
        });
        $("input[id*='LR" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage(this.id, "");
        });
    }
    $("input", $('#PupilCounts')).each(function () {
        $(this).val("");
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
            if (!$("#" + days[i] + "Select" + num).length > 0)
                continue;

            if ($("#" + days[i] + "Select" + num).val() !== "")
                j++;
        }
    }
    //Result of j value
    if (j > 10) {
        openPopUp("<p class='varp'>&bull;The max number of other work duties is 10. A supplement must be made for any additional duties.</p>", "");
        $("#" + refID).val("");
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
            if (!$("#" + days[i] + "Voucher" + num).length > 0)
                continue;

            if ($("#" + days[i] + "Voucher" + num).val() !== "")
                j++;
        }
    }
    //Result of j value
    if (j > 5) {
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>", "");
        $("#" + refID).val("");
        textboxUpdate(refID);
    }
}

//TOGGLE MODAL USING ELEMENT ID AND STYLE PARAMETER
function showHideModal(refID, strStyle) {
    $("#" + refID).css("display", strStyle);
}

//AUTO CORRECT ROUTE NAMES INTO PROPER FORMAT
function fixRouteName(refID) {
    var i = 0;
    var refVal = $("#" + refID).val();
    refVal = refVal.toUpperCase();
    refVal = refVal.replace(" ", "").replace("-", "");

    for (i = 0; i < refVal.length; i++) {
        if (!isNaN(refVal.substr(i, 1))) {
            if (isNaN(refVal.substr(i + 1, 1)) || i + 1 === refVal.length) {
                refVal = refVal.substr(0, i) + "0" + refVal.substr(i);
            }
            refVal = refVal.substr(0, i) + "-" + refVal.substr(i);
            break;
        }
    }
    if (refVal.indexOf("AM") > 1 || refVal.indexOf("PM") > 1) {
        refVal = refVal.replace("AM", "").replace("PM", "");
    }
    if (refVal.substr(-1) === "L" && refVal.substr(-2) !== " L") {
        refVal = refVal.substr(0, refVal.length - 1) + " L";
    }
    if (refVal.substr(-2) === "EQ" && refVal.substr(-3) !== " EQ") {
        refVal = refVal.substr(0, refVal.length - 2) + " EQ";
    }
    if (refVal.substr(-4) === "EQ L" && refVal.substr(-5) !== " EQ L") {
        refVal = refVal.substr(0, refVal.length - 4) + " EQ L";
    }
    if (refVal.substr(-4) === "L EQ" && refVal.substr(-5) !== " L EQ") {
        refVal = refVal.substr(0, refVal.length - 4) + " L EQ";
    }

    $("#" + refID).val(refVal);
}

//POP UP MODALS
//TIME SELECTOR MODAL
function openTimeSelector(refID, optVal) {
    optVal = optVal || "";
    activeID = refID;
    var refVal = $("#" + activeID).val();
    var blnPupil = false;
    if (activeID.substr(-1) === "A" || activeID.substr(-1) === "B" || activeID.substr(-1) === "C" || activeID.substr(-1) === "D")
        blnPupil = true;

    //if active element has data already, break time into hours, minutes, and meridiem and load into spans
    if (refVal !== "" && refVal !== null) {
        var hours = refVal.substr(0, refVal.indexOf(":"));
        var mins = refVal.substr(refVal.indexOf(":") + 1, 2);
        var mer = refVal.substr(-2);
        $("#hours" + optVal).text(hours);
        $("#minutes" + optVal).text(mins);
        $("#meridiem" + optVal).text(mer);
    } else {
        if (!blnPupil) {
            var mins = round5(Number($("#minutes").text()));
            if (mins < 10 && mins > -1) {
                mins = "0" + mins.toString();
            } else if (mins === 60) {
                mins = "55";
            }
            $("#minutes").text(mins);
        }
    }
    showHideModal("timeModal" + optVal, "block");
}

//FIELD TRIP MODAL
function openFTSelector(refVal, optVal) {
    optVal = optVal || "";
    showHideModal("ftModal" + optVal, "block");
    activeID = refVal;
    $("#ftselector" + optVal).val("");
    $("#fttype" + optVal).val("");
}

//OPEN POP UP MODAL FOR ERROR MESSAGES
function openPopUp(msgVal, optVal) {
    optVal = optVal || "";
    $("#varDiv" + optVal).html("");
    $("#varDiv" + optVal).html(msgVal);
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

    var strHTML = '<div class="tinycard bg-teal2" id="' + dayVal + 'OWDiv' + countOW + '"><div class="row"><div class="category col-11">Other Work&nbsp;<span class="fas fa-question-circle ow"></span></div><div class="col-1 center"><span class="fas fa-trash-alt" id="' + dayVal + 'OWTrash' + countOW + '" onclick="clearOtherField(this.id);"></span></div></div><div class="row ' + dayVal + 'LV"><div class="col-auto"><input type="checkbox" id="' + dayVal + 'OJT' + countOW + '" onclick="checkboxFunctions(this.id);"><label class="lblBtnFalse" for="' + dayVal + 'OJT' + countOW + '">OJT</label>&nbsp;<input type="checkbox" id="' + dayVal + 'Lift' + countOW + '" onclick="checkboxEQL(this.id);"><label class="lblBtnFalse" for="' + dayVal + 'Lift' + countOW + '">EQ/L</label></div></div><div class="row ' + dayVal + 'LV"><div class="col-12"><select id="' + dayVal + 'Select' + countOW + '" class="selectwidth"><option value="">--Select work--</option><option value="FYI">FYI</option><option value="OTHR">Other</option><option value="GT">Garage trip</option><option value="FUEL">Fuel</option><option value="RC">Run coverage</option><option value="EQ/L">EQ/L Coverage</option><option value="CPR">CPR/First Aid</option><option value="RCRT">Recertification</option><option value="MTNG">Meeting</option><option value="TRNG">Training</option><option value="MED">Physical/Drug Test</option><option value="CS">Cold start team</option><option value="ES2">2 Hr Delay - Early start</option><option value="ES0">On Time - Early start</option><option value="CBK">Call back</option></select></div></div><div class="row ' + dayVal + 'LV"><input name="' + dayVal + 'Desc' + countOW + '" id="' + dayVal + 'Desc' + countOW + '" type="text" class="descwidth" style="text-align: left;" placeholder="Additional notes..."></div><div class="row ' + dayVal + 'LV"><div class="col-11"><input type="text" name="' + dayVal + 'Time' + countOW + 'S" id="' + dayVal + 'Time' + countOW + 'S" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(this.id);">&nbsp;<input type="text" name="' + dayVal + 'Time' + countOW + 'E" id="' + dayVal + 'Time' + countOW + 'E" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(this.id);">&nbsp;<input type="text" name="' + dayVal + 'Time' + countOW + '" id="' + dayVal + 'Time' + countOW + '" class="total-time nofocus" disabled></div><div class="col-1"><span class="fas fa-times" id="' + dayVal + 'ClearOW' + countOW + '"></span></div></div></div>';
    $("#" + refID + "2").before(strHTML);
    $("#" + dayVal + "OWCt").text(countOW);
}

function addFieldTrip(refID) {
    var dayVal = refID.substr(0, 3);
    var countFT = getMissingFT(dayVal);

    //Exit function if count is 5
    if (countFT === 35) return;

    var strHTML = '<div class="tinycard bg-teal3" id="' + dayVal + 'FTDiv' + countFT + '"><div class="row"><div class="category col-11">Field Trip&nbsp;<span class="fas fa-question-circle ft"></span></div><div class="col-1 center"><span class="fas fa-trash-alt" id="' + dayVal + 'FTTrash' + countFT + '" onclick="clearOtherField(this.id);"></span></div></div><div class="row ' + dayVal + 'LV"><div class="col-8"><input name="' + dayVal + 'Voucher' + countFT + '" id="' + dayVal + 'Voucher' + countFT + '" type="text" class="voucherwidth" placeholder="Voucher"></div><div class="col-4"><input type="checkbox" id="' + dayVal + 'Lift' + countFT + '"><label class="lblBtnFalse" for="' + dayVal + 'Lift' + countFT + '">EQ/L</label></div></div><div class="row ' + dayVal + 'LV"><div class="col-12"><input name="' + dayVal + 'From' + countFT + '" id="' + dayVal + 'From' + countFT + '" type="text" placeholder="Origin..." style="text-align:left;" class="ftwidth"></div></div><div class="row ' + dayVal + 'LV"><div class="col-12"><input name="' + dayVal + 'To' + countFT + '" id="' + dayVal + 'To' + countFT + '" type="text" placeholder="Destination..." style="text-align:left;" class="ftwidth"></div></div><div class="row ' + dayVal + 'LV"><div class="col-11"><input type="text" name="' + dayVal + 'Time' + countFT + 'S" id="' + dayVal + 'Time' + countFT + 'S" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(this.id);">&nbsp;<input type="text" name="' + dayVal + 'Time' + countFT + 'E" id="' + dayVal + 'Time' + countFT + 'E" class="timewidth" placeholder="- - : - -" onclick="openTimeSelector(this.id);">&nbsp;<input type="text" name="' + dayVal + 'Time' + countFT + '" id="' + dayVal + 'Time' + countFT + '" class="total-time nofocus" disabled></div><div class="col-1"><span class="fas fa-times" id="' + dayVal + 'ClearFT' + countFT + '"></span></div></div></div>';
    $("#" + refID + "2").before(strHTML);
    $("#" + dayVal + "FTCt").text(countFT);
}

function getMissingOW(day) {
    for (var i = 20; i < 30; i++) {
        if (!$("#" + day + "OWDiv" + i).length)
            return i;
    }
}

function getMissingFT(day) {
    for (var i = 30; i < 35; i++) {
        if (!$("#" + day + "FTDiv" + i).length)
            return i;
    }
}

function addLeave(refID) {
    var dayVal = refID.substr(0, 3);
    $("#" + dayVal + "Leave40").css("display", "inline-block");
    $("#" + dayVal + "Leave41").css("display", "inline-block");
    $("#" + dayVal + "Leave42").css("display", "inline-block");

}

//******************VALIDATION AND COMPLETION******************//
function completeTimesheet() {
    var bln = runValidations();
    if (!bln)
        return;

    showHideModal("validateModal", "block");
    $("#EmpInitials").focus();
}

function openTimesheet() {
    var emp = "";
    emp = $("#EmpInitials").val();
    emp = emp.toUpperCase();
    setStorage("EmpInitials", emp);

    showHideModal("validateModal", "none");
    if (emp !== "")
        window.open("preview.html", "_self");
}

function runValidations() {
    var val = "";

    $('input:not([type="checkbox"]), select').each(function () {
        setStorage(this.id, $(this).val());
    });

    $('input[type="checkbox"]').each(function () {
        setStorage(this.id, ($(this).prop("checked")) ? 1 : 0);
    });

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
    var val = "",
        x = "";

    //Check field trips
    for (var i = 0; i < 7; i++) {
        x = "#" + days[i];
        for (var j = 11; j < 14; j++) {
            if ($(x + "Time" + j).val() === "") { //Time is blank
                if ($(x + "Voucher" + j).val() !== "" || $(x + "From" + j).val() !== "" || $(x + "To" + j).val() !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: No time entered.</p>";

            } else { //Time is not blank
                if ($(x + "Voucher" + j).val() === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: Voucher number cannot be blank.</p>";

                if ($(x + "From" + j).val() === "" || $(x + "To" + j).val() === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: From and To location cannot be blank.</p>";
            }
        }
    }
    return val;
}

function testOtherWork() {
    var val = "",
        x = "";

    for (var i = 0; i < 7; i++) {
        x = "#" + days[i];
        for (var j = 8; j < 11; j++) {
            if ($(x + "Time" + j).val() !== "") { //Time is not blank
                if ($(x + "Select" + j).val() === "") { //Select IS blank
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Category is required.</p>";
                }
                if (($(x + "Select" + j).val() === "OT" || $(x + "Select" + j).val() === "FYI") && $(x + "Desc" + j).val() === "") { //Other or FYI selected but description field is blank
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description is required when Other or FYI selected.</p>";
                }
                if ($(x + "Select" + j).val() === "" && $(x + "Desc" + j).val() !== "") { //Nothing selected and description field has text
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description entered without category selection.</p>";
                }
            } else { //Time is blank
                if ($(x + "Select" + j).val() !== "" || $(x + "Desc" + j).val() !== "") { //Category IS selected OR Description field is NOT blank
                    if (!$(x + "Select" + j).val() === "FYI") { //Category is NOT FYI
                        val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: No time entered.</p>";
                    }
                }
            }
        }
    }

    return val;
}

function testLeave() {
    var val = "",
        x = "";

    for (var i = 2; i < 7; i++) {
        x = "#" + days[i];
        for (var j = 14; j < 16; j++) {
            if ($(x + "Time" + j).val() !== "") {
                if ($(x + "LeaveSelect" + j).val() === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if ($(x + "LeaveSelect" + j).val() !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
            }
            if ($(x + "LeaveAD").prop("checked")) {
                if ($(x + "LeaveSelectAD").val() === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if ($(x + "LeaveSelectAD").val() !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: All day leave type selected but checkbox left unchecked.</p>";
            }
        }
    }
    return val;
}

function testStopCounts() {
    var val = "",
        pos = $("#Position").val(),
        x = "";

    //Validate stop counts
    if (pos === "Driver" || pos === "Sub Driver" || pos === "Driver Trainee") {
        for (var i = 2; i < 7; i++) {
            x = "#" + days[i];

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
        if ($("#" + day + "Time" + x).val() === "")
            continue;

        if ($("#" + mer + "Route" + j).val() === "")
            continue;

        if ($("#" + day + mer + j + "Ct").val() === "")
            return false;
    }
    return true;
}

function testRegCounts(day, x, mer) {
    if ($("#" + day + "Time" + x).val() === "")
        return true;

    for (var i = 1; i < 6; i++) {
        if ($("#" + mer + "Route" + i).val() !== "")
            return true;
    }
    return false;
}

function testSpecPupil(day, x, route, j) {

    if ($("#" + day + "Time" + x).val() === "")
        return true;

    if ($("#" + route + "Route" + j).val() === "")
        return true;

    if ($("#" + day + route + j + "Ct").val() === "")
        return false;

    return true;
}

function testSpecCounts(day, x, route, j) {

    if ($("#" + day + "Time" + x).val() === "")
        return true;

    if ($("#" + route + "Route" + j).val() !== "")
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
        if ($(day + "Time" + num).val() !== "" && $("#AMRoute" + j).val() !== "" && $(day + "AM" + j + "Ct").val() === "")
            bln = false;

        if ($(day + "Time1").val() !== "" && $("input[id*='AMRoute']").val() === "")
            bln2 = false;
    }
    if (!bln)
        val += "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";
}


function testTimeComplete() {
    var val = "";
    for (var i = 0; i < 7; i++) {
        for (var j = 1; j < 15; j++) {
            if ($("#" + days[i] + "Time" + j + "S").val() !== "" && $("#" + days[i] + "Time" + j + "E").val() === "")
                val += "<p class='varp'>&bull;" + fullday[i] + ": Time not completed.</p>";
        }
    }
    return val;
}

//CHECK LENGTH OF ELEMENT VALUE, IF EXCEEDING NUM THEN SHOW POP UP ERROR MESSAGE
function limitCharacters(refID, num) {
    var refVal = $("#" + refID).val();
    if ($("#" + refID).val().length > num) {
        openPopUp("<p class='varp'>Limit " + num + " characters.</p>", "");
        $("#" + refID).val(refVal.substr(0, num));
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

    for (var i = 0; i < 7; i++) {
        for (j = 20; j < 30; j++) {
            if (!$("#" + days[i] + "Time" + j).length > 0)
                continue;

            if ($("#" + days[i] + "Select" + j) === "FYI") {
                otherWorkTime(days[i], j, true);
            } else if ($("#" + days[i] + "Select" + i) === null) {
                $("#" + days[i] + "Select" + i).val("");
                otherWorkTime(days[i], j, false);
            } else {
                otherWorkTime(days[i], j, false);
            }
        }
    }
}

function otherWorkTime(day, num, bln) {
    $("#" + day + "Time" + num + "S").prop("disabled", bln).css("background-color", (bln) ? "lightgrey" : "white");
    $("#" + day + "Time" + num + "E").prop("disabled", bln).css("background-color", (bln) ? "lightgrey" : "white");
    $("#" + day + "Time" + num).css("background-color", (bln) ? "lightgrey" : "white");
    if (bln) {
        $("#" + day + "Time" + num + "S").val("");
        textboxUpdate(day + "Time" + num + "S");
        $("#" + day + "Time" + num + "E").val("");
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
        if ($("#" + days[k] + "LeaveAD").prop("checked"))
            bln = true;
    }
    while (bln && k < 7);
    if (k === 7)
        return;

    for (i = 1; i < 8; i++) {
        $("#" + days[k] + "Time" + i + "S").val($("#" + days[j] + "Time" + i + "S").val()).trigger("change");
        $("#" + days[k] + "Time" + i + "E").val($("#" + days[j] + "Time" + i + "E").val()).trigger("change");
    }
}

function runPupilCopyRoutine() {
    showHideModal("variousModal", "none");
    var k = 0,
        bln = false;

    for (var i = 2; i < 6; i++) {
        if ($("#" + fullday[i]).is(":visible")) {
            k = i;
            break;
        }
    }

    do {
        k++;
        bln = false;
        if ($("#" + days[k] + "LeaveAD").prop("checked"))
            bln = true;
    } while (bln && k < 7);

    if (k === 7)
        return;

    $("#" + days[k] + "TimeA").val($("#" + days[i] + "TimeA").val()).trigger("change");
    $("#" + days[k] + "TimeB").val($("#" + days[i] + "TimeB").val()).trigger("change");
    $("#" + days[k] + "TimeC").val($("#" + days[i] + "TimeC").val()).trigger("change");
    $("#" + days[k] + "TimeD").val($("#" + days[i] + "TimeD").val()).trigger("change");
}
