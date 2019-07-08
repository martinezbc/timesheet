//ALL ON WINDOW READY FUNCTIONS
$(document).ready(function () {
    //LOAD DATE RANGES INTO RADIO BUTTONS AND DISPLAY
    loadDateRange();

    //ADD THE FIELD TRIP SELECTOR FROM FIELDTRIPS.JS
    insertFTSelect();

    loadLocalStorage();

    loadTeamValues(getStorage("Area"));
    loadRadioSelection();
    checkOJTData();
    checkDailyLeave();
    positionChange();
//    checkOtherWorkVal();
    checkRouteValue();
    
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
        if ($("#ftselector").val() !== null) {
            ftText = $("#ftselector").val();
        } else {
            ftText = $("#fttype").val();
        }
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

    $(".ow").click(function () {
        openPopUp("<p class='varp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>", "");
    });

    $(".ft").click(function () {
        openPopUp("<p class='varp'>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p class='varp'>&bull;Check lift if the trip required a lift.</p><p class='varp'>&bull;The start and end time must match what was recorded on the voucher.</p>", "");
    });

    $(".ct").click(function () {
        openPopUp("<p class='varp'>&bull;Only record the routes, shuttles, middays, and late runs that are specifically assigned to you.</p><p class='varp'>&bull;Special Equipment pay will only be available if one of your routes ends with an 'L' or an 'EQ'</p><p class='varp'>&bull;Any other route that is covered for another driver and is outside of your regular hours should be recorded in the other work section.</p><p class='varp'>&bull;Record the number of students transported for each route for every day that was driven.</p><p class='varp'>&bull;In the Pupil Time section, enter the first pickup time and last drop off time for both morning and afternoon runs.</p>", "");
    });
});

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

//FIND STORED VALUE FOR AREA, TEAM AND POSITION AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    var val = getStorage("Area");
    if (val !== "") {
        $("#area" + val).prop("checked", "checked");
    }


    val = getStorage("Team");
    if (val !== "") {
        $("#team" + val).prop("checked", "checked");
    }

    val = getStorage("Position").replace(" ", "");
    if (val !== "") {
        $("#pos" + val).prop("checked", "checked");
    }
}

//GET VALUE OF OJT CHECKBOX AND THEN TOGGLE ALL OTHER OJT CHECKBOXES
function checkOJTData() {
    "use strict";
    var refVal = getStorage("OJT"),
        i = 0,
        j = 0;
    if (refVal === "0") {
        toggleOJT(false);
    } else {
        toggleOJT(true);
    }
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
    for (var i = 2; i < 7; i++) {
        toggleADLeave(days[i]);
    }
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