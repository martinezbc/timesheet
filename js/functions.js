//JQUERY EVENTS
$(window).ready(function () {

    $('.fa-times').click(function () {
        clearTimeField($(this).attr("id"));
    });

    $('.fa-ban').click(function () {
        clearOtherField($(this).attr("id"));
    });

    $("input[type='checkbox']").click(function () {
        checkboxFunctions($(this).attr("id"));
        getWeeklyTotals();
    });

    $("input").focus(function () {
        var refID = $(this).attr("id");
        if (refID.indexOf('Time') > 0 && !$(this).hasClass("nofocus")) {
            $(this).prop('disabled', true);
            openTimeSelector(refID, (refID.indexOf("Sup") > -1) ? "Sup" : "");
        } else if (refID.indexOf('Total') > 0) {
            //do nothing
        } else if (refID.indexOf('From') > 0 || refID.indexOf('To') > 0) {
            $(this).prop('disabled', true);
            openFTSelector(refID, (refID.indexOf("Sup") > -1) ? "Sup" : "");
        }
    });

    $("select").change(function () {
        var refID = $(this).attr("id");

        setLocalStorage($(this).attr("id"));
        if (refID.indexOf("Select") === 3) {
            countOtherWork(refID);
            if ($(this).val() === "FYI") {
                otherWorkTime(refID.substr(0, 3), refID.substr(9), true);
            } else {
                otherWorkTime(refID.substr(0, 3), refID.substr(9), false);
            }
        }
    });

    $('input[type=number], input[type=text]').change(function () {
        var refID = $(this).attr("id");

        if (refID.indexOf("Time") > 0) {
            textboxUpdate(refID);
        }
        if (refID.indexOf("Voucher") > 0) {
            countFieldTrips(refID);
            checkVoucherLength(refID);
        }
        if (refID.indexOf("Route") > 0) {
            fixRouteName($(this).attr('id'));
            checkRouteValue();
        }
        setLocalStorage(refID);
        getWeeklyTotals();
    });

    $("input[id*='Desc']").keydown(function () {
        var refID = $(this).attr("id"),
            refVal = $("#" + refID).val(),
            lenVal = refVal.length,
            selectID = refID.replace("Desc", "Select");
        if (getOtherWorkVal(selectID) === "FYI" && lenVal > 65) {
            openPopUp("<p class='varp'>Restricted to 65 characters</p>", "");
            $("#" + refID).val(refVal.substr(0, 65));
        } else if (getOtherWorkVal(selectID) !== "FYI" && lenVal > 40) {
            openPopUp("<p class='varp'>Restricted to 40 characters</p>", "");
            $("#" + refID).val(refVal.substr(0, 40));
        }
    });

    $("#closeTime").click(function () {
        $("#" + activeID).prop("disabled", false);
        showHideModal("timeModal", "none");
    });
    
    $("#endValidate").click(function () {
        showHideModal('validateModal', 'none');
    });

    $("#goTime").click(function () {
        var timeText = $("#hours").text() + ":" + $("#minutes").text() + " " + $("#meridiem").text();
        $("#" + activeID).val(timeText).prop("disabled", false);
        showHideModal("timeModal", "none");
        $("#" + activeID).trigger("change");
    });

    $(".up, .down, .up2, .down2").click(function () {
        timeSelectors($(this).attr("id"));
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
    })

    $("#clear").click(function () {
        openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>', "");
    });

    $(".spanToggle").click(function () {
        var refID = $(this).attr("id"),
            bln = false;
        
        bln = spanToggleTextVal(refID);

        if (bln === true) {
            $("." + refID).css("display", "flex");
            $(this).addClass("fa-angle-up").removeClass("fa-angle-down");
        } else {
            if ($(this).hasClass("fa-angle-down") === true) {
                $("." + refID).css("display", (refID.indexOf("Pupil") > -1) ? "inline-block" : "flex");
                $(this).addClass("fa-angle-up").removeClass("fa-angle-down");
            } else {
                $("." + refID).css("display", "none");
                $(this).addClass("fa-angle-down").removeClass("fa-angle-up");
            }
        }
    });

    $(".fa-copy").click(function () {
        copyRoutine($(this).attr("id"));
    });
    
    $("#EmpID").keyup(function () {
        limitCharacters("EmpID", 6);
    });
    
    $("#Veh1, #Veh2, #Veh3, #Veh4").keyup(function () {
        limitCharacters($(this).attr("id"), 4);
    });
    
    $("#EmpID").keyup(function () {
        if (isNaN($(this).val())) {
            openPopUp("<p class='varp'>Employee ID can only contains numbers.</p>", "");
            $("#EmpID").val("");
        }
    });
    
    $("input[type=radio]").click(function () {
        var refID = $(this).attr("id");
        if (refID.substr(0,4) === "area") {
            loadTeamValues(refID.substr(4));
            setStorage("Area", refID.substr(4));
        } else if (refID.substr(0,3) === "pos" && refID.substr(-3) === "Sup") {
            setStorage("PositionSup", $("#" + refID).val());
        } else if (refID.substr(0,3) === "pos") {
            setStorage("Position", $("#" + refID).val());
            positionChange();
        }
    });
    
    $(".addOW").click(function() {
        var refID = $(this).attr('id');
        addOtherWork(refID);
    });
    
});

"use strict";

//Define public variables
var activeID = "";
var days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
var fullday = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var routes = ["AMRoute1", "AMRoute2", "AMRoute3", "AMRoute4", "AMRoute5", "PMRoute1", "PMRoute2", "PMRoute3", "PMRoute4", "PMRoute5", "PSRoute1", "PSRoute2", "SHRoute1", "SHRoute2", "LRRoute1", "LRRoute2"];

//Determine browser the user is using
function browserDetection() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    if (isOpera) {return 'Opera';}

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox) {return 'Firefox';}

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    if (isSafari) {return 'Safari';}

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE) {return 'IE';}

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    if (isEdge) {return 'Edge';}

    // Chrome 1 - 71
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if (isChrome) {return 'Chrome';}

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;
    if (isBlink) {return 'Blink';}
    
    return 'Unknown';
}

//UPDATES POPUP WINDOW
function changesMade() {
    //openPopUp("<p class='varp'>UPDATES 5/22/19</p><p class='varp'>&bull;FINISH - PREVIEW FEATURE REPLACES FINISH IN MENU BAR. USE PREVIEW TO REVIEW ALL DATA FOR THE WEEK. THEN SELECT DOWNLOAD FROM THE MENU BAR.</p>", "");
}

//Initial function to load after window loads
function loadLocalStorage(optVal) {
    var refID = "",
        refVal = "";
    
    if (optVal === "Sup") {
        loadDateRangeSup();
    } else {
        loadDateRange();
    }
    insertFTSelect(optVal);

    $("input[type=text], input[type=number], select").each(function () {
        refID = $(this).attr("id");
        refVal = getStorage(refID);
        if (refVal === null) {
            refVal = "";
            setStorage(refID, refVal);
        }
        $(this).val(refVal);
        
        if ($(this).val() === null && $(this).attr('id') !== "Team") { //Need to replace null values with "" except for the team field which will populate further down the script
            $(this).val("");
            setStorage(refID, "");
        }
    });

    $(":checkbox").each(function () {
        refID = $(this).attr("id");
        refVal = getStorage(refID);
        if (refVal === null) {
            refVal = 0;
            setStorage(refID, refVal);
        }
        $(this).prop("checked", (refVal === "1") ? true : false);
    });
    
    if (getStorage("Area") === null) {
        setStorage("Area", "");
    }
    
    if (getStorage("Team") === null) {
        setStorage("Team", "");
    }
    
    if (getStorage("Position") === null) {
        setStorage("Position", "");
    }
    if (optVal === "") {
        loadTeamValues(getStorage("Area"), "");
        loadRadioSelection();
        checkOJTData();
        checkDailyLeave();
        positionChange();
        checkOtherWorkVal();
        checkRouteValue();
    } else {
        loadSupData();
        checkOWFTSupVal();
        checkOJTDataSup();
    }
}

//Change to proper case
function properCase(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
        return txtVal.toUpperCase();
    });
}
//******************LOAD DATE RANGES INTO DATE DROP DOWN******************//
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
        switch (getStorage("WeekOf")) {
            case r1:
                $("#week1").prop("checked","checked");
                break;
            case r2:
                $("#week2").prop("checked","checked");
                break;
            case r3:
                $("#week3").prop("checked","checked");
                break;
            default:
                break;
        }
    }
    loadStoredWeek();
}

function DateRange(newDate, day, offset) {
	"use strict";
    var start,
        end;
    if (day === 1) {
        start = newDate.addDays(-2 + offset);
        end = newDate.addDays(4 + offset);
    } else if (day === 2) {
        start = newDate.addDays(-3 + offset);
        end = newDate.addDays(3 + offset);
    } else if (day === 3) {
        start = newDate.addDays(-4 + offset);
        end = newDate.addDays(2 + offset);
    } else if (day === 4) {
        start = newDate.addDays(-5 + offset);
        end = newDate.addDays(1 + offset);
    } else if (day === 5) {
        start = newDate.addDays(-6 + offset);
        end = newDate.addDays(0 + offset);
    } else if (day === 6) {
        start = newDate.addDays(0 + offset);
        end = newDate.addDays(6 + offset);
    } else if (day === 0) {
        start = newDate.addDays(-1 + offset);
        end = newDate.addDays(5 + offset);
    }
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

Date.prototype.addDays = function (x) {
	"use strict";
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + x);
    return date;
};

//Only load equipment checkboxes if there is a route number has EQ in the title
function checkRouteValue() {
    var bln = false;
    for (var i = 0; i < 10; i++) {
        if ($("#" + routes[i]).val().substr(-2) === "EQ" || $("#" + routes[i]).val().substr(-1) === "L") {
            bln = true;
            break;
        }
    }
    toggleEQPT(bln);
}

function fixRouteName(refID) {
    var i = 0;
    var refVal = $("#" + refID).val();
    refVal = refVal.toUpperCase();
    refVal = refVal.replace(" ", "").replace("-","");
    
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
        refVal = refVal.replace("AM","").replace("PM","");
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

function toggleEQPT(bln) {
    for (var i = 2; i < 7; i++) {
        $(".eqpt").each(function() {
            if (bln) {
                $(this).css("display", "flex");    
            } else {
                //hide div with checkbox and label, also clear the checkboxes if they're checked and run change functions
                $(this).css("display", "none");
                $(this).find('input:checkbox').prop("checked", false).trigger("change");
            }
        });
    }
}

//Loads dates from storage into the date text fields
function loadStoredWeek() {
    var i = 0;
    if (getStorage("SatDate") !== null) {
        for (i; i < 7; i++) {
            $("#" + days[i] + "Date").text(getStorage(days[i] + "Date"));    
        }
    }
}

//Loads team values into #Team after area selection
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

function setTeamSelection(refID) {
    setStorage("Team", refID.substr(4));
}

function loadRadioSelection () {
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

//Get value of OJT checkbox and then toggle OJT checkboxes
function checkOJTData() {
    "use strict";
    var x = getStorage("OJT"),
        i = 0,
        j = 0;
    if (x === "0") {
        toggleOJT(false);
    } else {
        toggleOJT(true);
    }
}

//Toggle OJT checkboxes and Trainee textbox
function toggleOJT(bln) {
    var i = 0,
        j = 0;

    $("#OJT").prop("checked", bln);
    if (bln === true) {
        $("#Trainee").prop("disabled", false).css("background-color", "white");
    } else {
        $("#Trainee").prop("disabled", true).css("background-color", "lightgray").val("");
        setStorage("Trainee", "");
    }

    //Loop through days of the week
    for (i = 2; i < 7; i++) {
        //Loop through OJT checkboxes 1-10
        for (j = 0; j < 11; j++) {
            //If all day leave is checked, do not show OJT boxes
            if (bln === true && isADLeaveChecked(days[i]) === false) {
                $("#" + days[i] + "OJT" + j).parent().show();
            } else {
                $("#" + days[i] + "OJT" + j).prop("checked", false).parent().hide();
                setStorage(days[i] + "OJT" + j, 0);
            }
        }
    }
}

//Check if all day leave is checked
function isADLeaveChecked(day) {
    return (getStorage(day + "LeaveAD") === "0") ? false : true;
}

//Check if AM or PM leave is entered 
function isAMLeaveEntered(day) {
    return (getStorage(day + "Time14") === "") ? false : true;
}

function isPMLeaveEntered(day) {
    return (getStorage(day + "Time15") === "") ? false : true;
}

function checkDailyLeave() {
    //Loop through days of the week
    for (var i = 2; i < 7; i++) {
        toggleADLeave(days[i]);
        toggleAMPMLeave(days[i]);
    }
    checkOJTData();
    getDailyTotals();
    getWeeklyTotals();
}

function toggleADLeave(day) {
    var bln = false;

    bln = isADLeaveChecked(day);

    $("input[id*='" + day + "'], select[id*='" + day + "']").each(function () {
        if ($(this).attr("id") === day + "LeaveSelectAD" || $(this).attr("id") === day + "LeaveAD") {
            return;
        }
        if (!$(this).hasClass("nofocus")) {
            $(this).prop("disabled", bln);
        }
        $(this).css("background-color", (bln === true) ? "lightgrey" : "white");
        if (bln === true) {
            $(this).val("");
            setStorage($(this).attr("id"), "");
        }
        if ($(this).prop("checked") === true && bln === true) {
            $(this).prop("checked", false);
            setStorage($(this).attr("id"), 0);
        }
    });
}

function toggleAMPMLeave(day) {
    var blnAM = false;
    var blnPM = false;

    blnAM = isAMLeaveEntered(day);
    blnPM = isPMLeaveEntered(day);

    if (blnAM === true) {
        $("#" + day + "Time1E").val("").trigger("change");
        $("#" + day + "Time1S").val("").trigger("change");
    }

    if (blnPM === true) {
        $("#" + day + "Time2E").val("").trigger("change");
        $("#" + day + "Time2S").val("").trigger("change");
    }
}

function hidePupilCounts() {
    var bln = getJobPosition();
    if (bln === false) {
        $("#PupilCounts").hide();
        clearRouteFields();
    } else {
        $("#PupilCounts").show();
    }
}

function positionChange() {
    hidePupilCounts();
    checkRouteValue();
    loadNavBar();
}

function getJobPosition() {
    var x = getStorage("Position");
    return (x === "Activity Driver") ? false : true;
}

function clearRouteFields() {
    var i = 0,
        j = 0;

    //Loop through days of the week
    for (i = 1; i < 6; i++) {
        $("input[id*='AM" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage($(this).attr("id"), "");
        });
        $("input[id*='PM" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage($(this).attr("id"), "");
        });
    }

    for (i = 1; i < 3; i++) {
        $("input[id*='PS" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage($(this).attr("id"), "");
        });
        $("input[id*='SH" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage($(this).attr("id"), "");
        });
        $("input[id*='LR" + i + "Ct']").each(function () {
            $(this).val("");
            setStorage($(this).attr("id"), "");
        });
    }
    $("input", $('#PupilCounts')).each(function () {
        $(this).val("");
        setStorage($(this).attr("id"), "");
    });
}

//Shorten set local storage
function setStorage(refID, val) {
    localStorage.setItem(refID, val);
}

//Shorten get local storage
function getStorage(refID) {
    return localStorage.getItem(refID);
}

function getOtherWorkVal(refID) {
    return localStorage.getItem(refID);
}

//If select equals "FYI" then disable time fields
function checkOtherWorkVal() {
    var i = 0,
        j = 8;

    for (i = 0; i < 7; i++) {
        for (j = 8; j < 11; j++) {
            if (getOtherWorkVal(days[i] + "Select" + j) === "FYI") {
                otherWorkTime(days[i], j, true);
            } else if (getOtherWorkVal(days[i] + "Select" + i) === null) {
                $("#" + days[i] + "Select" + i).val("");
            } else {
                otherWorkTime(days[i], j, false);
            }
        }
    }
}

function otherWorkTime(day, num, bln) {
    $("#" + day + "Time" + num + "S").prop("disabled", bln).css("background-color", (bln === true) ? "lightgrey" : "white");
    $("#" + day + "Time" + num + "E").prop("disabled", bln).css("background-color", (bln === true) ? "lightgrey" : "white");
    $("#" + day + "Time" + num).css("background-color", (bln === true) ? "lightgrey" : "white");
    if (bln === true) {
        $("#" + day + "Time" + num + "S").val("").trigger("change");
        $("#" + day + "Time" + num + "E").val("").trigger("change");
    }
}

//Gives value to time selector arrow buttons, sends value to change the time
function timeSelectors(refID) {
    var strVal = refID.substr(2),
        operator = "",
        optVal = "";
    if (strVal.indexOf("Sup") > 0) {
        strVal = strVal.replace("Sup","");
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

//Open supplement page in another tab
function openSupplement() {
    window.open("index2.html", "_self");
}

//Clear local storage and reload page
function clearFields() {
    window.localStorage.clear();
    location.reload();
}

//Check number of other work entries and limit to 10
function countOtherWork(refID) {
    var j = 0,
        i = 0;

    //Loop through each day of the week
    for (i = 0; i < 7; i++) {
        if (getStorage(days[i] + "Select8") !== "") {
            j++;
        }
        if (getStorage(days[i] + "Select9") !== "") {
            j++;
        }
        if (getStorage(days[i] + "Select10") !== "") {
            j++;
        }
    }
    //Result of j value
    if (j > 10) {
        openPopUp("<p class='varp'>&bull;The max number of other work duties is 10. A supplement must be made for any additional duties.</p>", "");
        $("#" + refID).val("").trigger("change");
    }
}

//Check number of field trip entries and limit to 5
function countFieldTrips(refID) {
    var j = 0,
        i = 0;

    //Loop through each day of the week
    for (i = 0; i < 7; i++) {
        if (getStorage(days[i] + "Voucher11") !== "") {
            j++;
        }
        if (getStorage(days[i] + "Voucher12") !== "") {
            j++;
        }
        if (getStorage(days[i] + "Voucher13") !== "") {
            j++;
        }
    }
    //Result of j value
    if (j > 5) {
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>", "");
        $("#" + refID).val("").trigger("change");
    }
}

//POP UP MODALS
//Time selector Modal
function openTimeSelector(refID, optVal) {
    optVal = optVal || "";
    activeID = refID;
    var refVal = $("#" + activeID).val();
    var blnPupil = false;
    if (activeID.substr(-1) === "A" || activeID.substr(-1) === "B" || activeID.substr(-1) === "C" || activeID.substr(-1) === "D") {
        blnPupil = true;
    }

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

// Field trip Modal
function openFTSelector(refVal, optVal) {
    optVal = optVal || "";
    showHideModal("ftModal" + optVal, "block");
    activeID = refVal;
    $("#ftselector" + optVal).val("");
    $("#fttype" + optVal).val("");
}

function openPopUp(msgVal, optVal) {
    optVal = optVal || "";
    $("#varDiv" + optVal).html("");
    $("#varDiv" + optVal).html(msgVal);
    showHideModal("variousModal" + optVal, "block");
}

//Copy routine for regular work hours
function copyRoutine(refID) {
    activeID = refID;
    if (refID === "AMPupilcopy" || refID === "PMPupilcopy") {
        openPopUp('<p class="varp">Do you want to copy the pupil time onto the next day?<span class="close fas fa-check-circle fa-lg" id="goPupilCopy" style="color:green;" onclick="runPupilCopyRoutine()";></span></p>', '');    
    } else {
        openPopUp('<p class="varp">Do you want to copy all regular work hours onto the next day?<span class="close fas fa-check-circle fa-lg" id="goCopy" style="color:green;" onclick="runCopyRoutine()";></span></p>', '');    
    }
}

function runCopyRoutine() {
    showHideModal("variousModal", "none");
    var j = 0,
        k = 0,
        bln = false,
        i = 0;

    for (i = 2; i < 6; i++) {
        if (activeID.substr(0, 3) === days[i]) {
            j = i;
        }
    }
    k = j;
    do {
        k++;
        bln = false;
        if ($("#" + days[k] + "LeaveAD").prop("checked") === true) {
            bln = true;
        }
    }
    while (bln === true && k < 7);
    if (k === 7) {
        return;
    }
    for (i = 1; i < 8; i++) {
        $("#" + days[k] + "Time" + i + "S").val($("#" + days[j] + "Time" + i + "S").val()).trigger("change");
        $("#" + days[k] + "Time" + i + "E").val($("#" + days[j] + "Time" + i + "E").val()).trigger("change");
    }
}

function runPupilCopyRoutine() {
    showHideModal("variousModal", "none");
    var i = 0,
        k = 0,
        bln = false;

    for (i = 2; i < 6; i++) {
        if ($("#" + fullday[i]).is(":visible")) {
            k = i;
            break;
        }
    }
    
    do {
        k++;
        bln = false;
        if ($("#" + days[k] + "LeaveAD").prop("checked") === true) {
            bln = true;
        }
    }
    while (bln === true && k < 7);
    
    if (k === 7) {
        return;
    }
     $("#" + days[k] + "TimeA").val($("#" + days[i] + "TimeA").val()).trigger("change");
     $("#" + days[k] + "TimeB").val($("#" + days[i] + "TimeB").val()).trigger("change");
     $("#" + days[k] + "TimeC").val($("#" + days[i] + "TimeC").val()).trigger("change");
     $("#" + days[k] + "TimeD").val($("#" + days[i] + "TimeD").val()).trigger("change");
}


function spanToggleTextVal(refID) {
    var day = refID.substr(0, 3),
        num = refID.substr(9),
        leaveArray = ["LeaveSelectAD", "LeaveSelect14", "LeaveSelect15", "Time14", "Time15"],
        otherArray = ["Select", "Desc", "Time"],
        tripArray = ["To", "From", "Voucher", "Time"],
        i = 0,
        bln = false;

    if (refID.indexOf("LV") > 0) {
        for (i; i < 5; i++) {
            if ($("#" + day + leaveArray[i]).val() !== "") {
                bln = true;
                break;
            }
        }
    } else if (refID.indexOf("OW") > 0) {
        for (i = 0; i < 3; i++) {
            if ($("#" + day + otherArray[i] + num).val() !== "") {
                bln = true;
                break;
            }
        }
    } else if (refID.indexOf("FT") > 0) {
        for (i = 0; i < 4; i++) {
            if ($("#" + day + tripArray[i] + num).val() !== "") {
                bln = true;
                break;
            }
        }
    }
    return bln;
}

function showHideModal(refID, strStyle) {
    $("#" + refID).css("display", strStyle);
}

//******************VALIDATION AND COMPLETION******************//
function completeTimesheet() {
    var bln = runValidations();
    if (bln === false) {
        return;
    }
    showHideModal("validateModal", "block");
    $("#EmpInitials").focus();
}

function limitCharacters(refID, num) {
    var refVal = $("#" + refID).val();
    if ($("#" + refID).val().length > num) {
        openPopUp("<p class='varp'>Limit " + num + " characters.</p>","");
        $("#" + refID).val(refVal.substr(0, num));
    }
}

function openTimesheet() {
    var emp = "";
    emp = $("#EmpInitials").val();
    emp = emp.toUpperCase();
    setStorage("EmpInitials", emp);

    showHideModal("validateModal", "none");
    if (emp !== "") {
        window.open("preview.html", "_self");
    }
}

function runValidations() {
    var val = "";

    $('input:not([type="checkbox"]), select').each(function () {
        setStorage($(this).attr("id"), $(this).val());
    });

    $('input[type="checkbox"]').each(function () {
        setStorage($(this).attr("id"), ($(this).prop("checked") === true) ? 1 : 0);
    });
    
    if (getStorage("Area") === "TC") { //Remove some validations for training center
        val = testEmpDataTC() + testOtherWork() + testFieldTrip() + testLeave() + testTimeComplete();
    } else {
        val = testEmpData("") + testOtherWork() + testFieldTrip() + testLeave() + testStopCounts() + testTimeComplete();
    }
    

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
    if (getStorage("WeekOf" + optVal) === "") {
        val = "<p class='varp'>&bull;Pay week not selected.</p>";
    }

    //Check Area
    if (getStorage("Area" + optVal) === "") {
        val = val + "<p class='varp'>&bull;Area not selected.</p>";
    }

    //Check Team
    if (getStorage("Team" + optVal) === "") {
        val = val + "<p class='varp'>&bull;Team not selected.</p>";
    }

    //Check employee name
    if (getStorage("EmpName" + optVal) === "") {
        val = val + "<p class='varp'>&bull;Employee name not entered</p>";
    }

    //Check employee ID
    if (getStorage("EmpID" + optVal) === "") {
        val = val + "<p class='varp'>&bull;Employee ID not entered.</p>";
    }

    //Check position
    if (getStorage("Position" + optVal) === "") {
        val = val + "<p class='varp'>&bull;Employee position not selected.</p>";
    }
    
    //Check vehicle1
    if (getStorage("Veh1" + optVal) === "") {
        val = val + "<p class='varp'>&bull;Assigned vehicle not entered.</p>";
    }

    return val;
}

function testEmpDataTC() {
    var val = "";

    //Check selected week
    if (getStorage("WeekOf") === "") {
        val = "<p class='varp'>&bull;Pay week not selected.</p>";
    }

    //Check Area
    if (getStorage("Area") === "" || getStorage("Area") === null) {
        val = val + "<p class='varp'>&bull;Area not selected.</p>";
    }

    //Check Team
    if (getStorage("Team") === "" || getStorage("Team") === null) {
        val = val + "<p class='varp'>&bull;Team not selected.</p>";
    }

    //Check employee name
    if (getStorage("EmpName") === "") {
        val = val + "<p class='varp'>&bull;Employee name not entered</p>";
    }
    
    //Check position
    if (getStorage("Position") === "") {
        val = val + "<p class='varp'>&bull;Employee position not selected.</p>";
    }
    
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
                if ($(x + "Voucher" + j).val() !== "" || $(x + "From" + j).val() !== "" || $(x + "To" + j).val() !== "") {
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: No time entered.</p>";
                }
            } else { //Time is not blank
                if ($(x + "Voucher" + j).val() === "") {
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: Voucher number cannot be blank.</p>";
                }
                if ($(x + "From" + j).val() === "" || $(x + "To" + j).val() === "") {
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: From and To location cannot be blank.</p>";
                }
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
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Category is required.</p>";
                }
                if (($(x + "Select" + j).val() === "OT" || $(x + "Select" + j).val() === "FYI") && $(x + "Desc" + j).val() === "") { //Other or FYI selected but description field is blank
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description is required when Other or FYI selected.</p>";
                }
                if ($(x + "Select" + j).val() === "" && $(x + "Desc" + j).val() !== "") { //Nothing selected and description field has text
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description entered without category selection.</p>";
                }
            } else { //Time is blank
                if ($(x + "Select" + j).val() !== "" || $(x + "Desc" + j).val() !== "") { //Category IS selected OR Description field is NOT blank
                    if (!$(x + "Select" + j).val() === "FYI") { //Category is NOT FYI
                        val = val + "<p class='varp'>&bull;" + fullday[i] + "-Other Work: No time entered.</p>";
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
                if ($(x + "LeaveSelect" + j).val() === "") {
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
                }
            } else {
                if ($(x + "LeaveSelect" + j).val() !== "") {
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
                }
            }
            if ($(x + "LeaveAD").prop("checked") === true) {
                if ($(x + "LeaveSelectAD").val() === "") {
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
                }
            } else {
                if ($(x + "LeaveSelectAD").val() !== "") {
                    val = val + "<p class='varp'>&bull;" + fullday[i] + "-Leave: All day leave type selected but checkbox left unchecked.</p>";
                }
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

            if (testRegPupil(days[i], 1, "AM") === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";
            }
            if (testRegCounts(days[i], 1, "AM") === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": AM time entered with no routes specified.</p>";
            }

            if (testRegPupil(days[i], 2, "PM") === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": PM pupil counts not completed.</p>";
            }
            if (testRegCounts(days[i], 2, "PM") === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": PM time entered with no routes specified.</p>";
            }

            if (testSpecPupil(days[i], 3, "PS", 1) === false || testSpecPupil(days[i], 4, "PS", 2) === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS pupil counts not completed.</p>";
            }
            if (testSpecCounts(days[i], 3, "PS", 1) === false || testSpecCounts(days[i], 4, "PS", 2) === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS time entered with no routes specified.</p>";
            }

            if (testSpecPupil(days[i], 5, "SH", 1) === false || testSpecPupil(days[i], 6, "SH", 2) === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": Shuttle pupil counts not completed.</p>";
            }
            if (testSpecCounts(days[i], 5, "SH", 1) === false || testSpecCounts(days[i], 6, "SH", 2) === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": Shuttle time entered with no shuttle specified.</p>";
            }

            if (testSpecPupil(days[i], 7, "LR", 1) === false || testSpecPupil(days[i], 7, "LR", 2) === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": Late run pupil counts not completed.</p>";
            }
            if (testSpecCounts(days[i], 7, "LR", 1) === false && testSpecCounts(days[i], 7, "LR", 2) === false) {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": Late run time entered with no route specified.</p>";
            }
        }
    }
    return val;
}

function testRegPupil(day, x, mer) {
    for (var j = 1; j < 6; j++) {
        if ($("#" + day + "Time" + x).val() === "") {
            continue;
        }
        if ($("#" + mer + "Route" + j).val() === "") {
            continue;
        }
        if ($("#" + day + mer + j + "Ct").val() === "") {
            return false;
        }
    }
    return true;
}

function testRegCounts(day, x, mer) {

    if ($("#" + day + "Time" + x).val() === "") {
        return true;
    }
    for (var i = 1; i < 6; i++) {
        if ($("#" + mer + "Route" + i).val() !== "") {
            return true;
        }
    }
    return false;
}

function testSpecPupil(day, x, route, j) {

    if ($("#" + day + "Time" + x).val() === "") {
        return true;
    }
    if ($("#" + route + "Route" + j).val() === "") {
        return true;
    }
    if ($("#" + day + route + j + "Ct").val() === "") {
        return false;
    }
    return true;
}

function testSpecCounts(day, x, route, j) {

    if ($("#" + day + "Time" + x).val() === "") {
        return true;
    }
    if ($("#" + route + "Route" + j).val() !== "") {
        return true;
    }

    return false;
}



function testAMPMRoute(day, num) {
    var bln = true,
        bln2 = true,
        val = "",
        i = 0,
        j = 0;

    for (j = 1; j < 6; j++) {
        if ($(day + "Time" + num).val() !== "" && $("#AMRoute" + j).val() !== "" && $(day + "AM" + j + "Ct").val() === "") {
            bln = false;
        }

        if ($(day + "Time1").val() !== "" && $("input[id*='AMRoute']").val() === "") {
            bln2 = false;
        }
    }
    if (bln === false) {
        val = val + "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";
    }
}


function testTimeComplete() {
    var val = "";
    for (var i = 0; i < 7; i++) {
        for (var j = 1; j < 15; j++) {
            if ($("#" + days[i] + "Time" + j + "S").val() !== "" && $("#" + days[i] + "Time" + j + "E").val() === "") {
                val = val + "<p class='varp'>&bull;" + fullday[i] + ": Time not completed.</p>";
            }
        }
    }
    return val;
}

//******************CHECKBOXES******************//
function checkboxFunctions(refID) {
    var z = 0;

    if ($("#" + refID).prop("checked") === true) {
        z = 1;
    }
    setStorage(refID, z);

    if (refID.indexOf("Lift") > 0) {
        checkRunTimeLift(refID);
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
}

//******************SET INTO LOCAL STORAGE******************//
function setLocalStorage(refID) {
    var y = $("#" + refID).val(),
        x = "";

    if (refID === "EmpName" || refID === "Trainee") {
        y = properCase(y);
        $("#" + refID).val(y);
    } else if (refID.indexOf("Route") > 0) {
        y = y.toUpperCase();
        $("#" + refID).val(y);
    }

    if ($("#" + refID).val() === null) {
        setStorage(refID, "");
    } else {
        setStorage(refID, y);
    }

    if (refID.indexOf("Time14") > 0 || refID.indexOf("Time15") > 0) {
        checkDailyLeave();
    }
}

//STORE WEEK DATA INTO STORAGE



//Set each day in mm/dd format in local storage
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
    if (optVal === "") {
        loadStoredWeek();
    } else {
        loadSupDates();
    }
    loadNavBar();
}

//CHECK VOUCHER LENGTH
//Store element value in refVal
//Check length of refVal
//If length is more than 6 then display popup message and use substring function to include first 6 digits.
function checkVoucherLength(refID) {
    refVal = $("#" + refID).val();
    if (refVal.length !== 6) {
        openPopUp("<p class='varp'>Only input last 6 digits of voucher number.</p>", "");
        $("#" + refID).val(refVal.substr(0, 6));
    }
}

function addOtherWork(refID) {
    var dayVal = refID.substr(0,3);
    var countOW = Number($("#" + dayVal + "OWCt").text());
    var strHTML = '<div class="tinycard bg-teal2"><div class="row"><div class="col-8"><p class="category">Other Work</p></div><div class="col-2 right"><span class="fas fa-question-circle ow"></span></div><div class="col-2 right"><span class="fas fa-angle-up spanToggle" id="' + dayVal + 'SpanOW8"></span></div></div><div class="row ' + dayVal + 'LV ' + dayVal + 'SpanOW8"><div class="col-auto"><label for="' + dayVal + 'Lift8"><input type="checkbox" id="' + dayVal + 'Lift8">EQ/L</label></div><div class="col-auto"><label for="' + dayVal + 'OJT8"><input type="checkbox" id="' + dayVal + 'OJT8">OJT</label></div></div><div class="row ' + dayVal + 'LV ' + dayVal + 'SpanOW8"><div class="col-11"><select id="' + dayVal + 'Select8" class="selectwidth"><option value="">--Select work--</option><option value="FYI">FYI</option><option value="OTHR">Other</option><option value="GT">Garage trip</option><option value="FUEL">Fuel</option><option value="RC">Run coverage</option><option value="EQ/L">EQ/L Coverage</option><option value="CPR">CPR/First Aid</option><option value="RCRT">Recertification</option><option value="MTNG">Meeting</option><option value="TRNG">Training</option><option value="MED">Physical/Drug Test</option><option value="CS">Cold start team</option><option value="ES2">2 Hr Delay - Early start</option><option value="ES0">On Time - Early start</option><option value="CBK">Call back</option></select></div><div class="col-1"><span class="fas fa-ban" id="' + dayVal + 'BanOW8"></span></div></div><div class="row ' + dayVal + 'LV ' + dayVal + 'SpanOW8"><input name="' + dayVal + 'Desc8" id="' + dayVal + 'Desc8" type="text" class="descwidth" style="text-align: left;" placeholder="Additional notes..."></div><div class="row ' + dayVal + 'LV ' + dayVal + 'SpanOW8"><div class="col-11"><input type="text" name="' + dayVal + 'Time8S" id="' + dayVal + 'Time8S" class="timewidth" placeholder="- - : - -">&nbsp;<input type="text" name="' + dayVal + 'Time8E" id="' + dayVal + 'Time8E" class="timewidth" placeholder="- - : - -">&nbsp;<input type="text" name="' + dayVal + 'Time8" id="' + dayVal + 'Time8" class="total-time nofocus" disabled></div><div class="col-1"><span class="fas fa-times" id="' + dayVal + 'ClearOW8"></span></div></div></div>';
    $("#" + refID + "2").before(strHTML);
    $("#" + dayVal + "OWCt").text();
}
