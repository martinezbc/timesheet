//JQUERY EVENTS
$(window).ready(function () {
    
    $("#clearSup").click(function () {
        openPopUp('<p>You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFieldsSup()"></span></p>', "Sup");
    });

    $("#closeTimeSup").click(function () {
        $("#" + activeID).prop("disabled", false);
        $("#timeModalSup").css("display", "none");
    });

    $("#goTimeSup").click(function () {
        var x = $(this).attr("id"),
            timeText = $("#hoursSup").text() + ":" + $("#minutesSup").text() + " " + $("#meridiemSup").text();
        $("#" + activeID).val(timeText).prop("disabled", false);
        $("#timeModalSup").css("display", "none");
        $("#" + activeID).trigger("change");
    });

    $("#goFTSup").click(function () {
        var x = $(this).attr("id"),
            ftText = "";
        if ($("#ftselectorSup").val() !== null) {
            ftText = $("#ftselectorSup").val();
        } else {
            ftText = $("#fttypeSup").val();
        }
        ftText = ftText.substr(0, 35);
        $("#" + activeID).val(ftText).prop("disabled", false);
        setStorage(activeID, ftText);
        $("#ftModalSup").css("display", "none");
    });

    $("#closeFTSup").click(function () {
        $("#" + activeID).prop("disabled", false);
        $("#ftModalSup").css("display", "none");
    });
    
    $("#closeVariousSup").click(function () {
        $("#variousModalSup").css("display", "none");
    });

    $(".spanToggleSup").click(function () {
        var x = $(this).attr("id"),
            bln = false;
        bln = spanToggleSupVal(x);

        if (bln === true) {
            $("." + x).css("display", "flex");
            $(this).addClass("fa-angle-up").removeClass("fa-angle-down");
        } else {
            if ($(this).hasClass("fa-angle-down") === true) {
                $("." + x).css("display", (x.indexOf("Pupil") > -1 || x.indexOf("Emp") > -1) ? "inline-block" : "flex");
                $(this).addClass("fa-angle-up").removeClass("fa-angle-down");
            } else {
                $("." + x).css("display", "none");
                $(this).addClass("fa-angle-down").removeClass("fa-angle-up");
            }
        }
        
    });
    
    $(".ow").click(function () {
        openPopUp("<p style='font-size:14px'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>", "Sup");
    });

    $(".ft").click(function () {
        openPopUp("<p>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p>&bull;Check lift if the trip required a lift.</p><p>&bull;The start and end time must match what was recorded on the voucher.</p>", "Sup");
    });
});

function clearFieldsSup() {
    $("#variousModalSup").css("display", "none");
    $("body").find("input:text").val("").trigger("change");
    $("body").find("input:checkbox[id*='Lift']").prop("checked", true).trigger("click");
    $("body").find("select").val("").trigger("change");
    $("#OJTSup").prop("checked", true).trigger("click");
    getSupTotals();
}

function loadSupDates () {
	"use strict";
    var x = "";
    if ($("#WeekOfSup").val() === "") {
        return;
    }
    for (var j = 0; j < 15; j++) {
        $("#SupDate" + j + " option[value!='']").each(function () {
            $(this).remove();
        });
        for (var i = 6; i > -1; i--) {
            x = getStorage(days[i] + "DateSup");
            $('<option value="' + x + '">' + x + '</option>').insertAfter("#AfterSup" + j);
        }
    }
    
    for (var j = 15; j < 20; j++) {
        $("#SupDate" + j + " option[value!='']").each(function () {
            $(this).remove();
        });
        for (var i = 6; i > 1; i--) {
            x = getStorage(days[i] + "DateSup");
            $('<option value="' + x + '">' + x + '</option>').insertAfter("#AfterSup" + j);
        }
    }
    
    for (i = 2; i < 7; i++) {
        $("#SupLV" + days[i]).text("All Day-" + getStorage(days[i] + "DateSup"));
    }
}

function checkOWFTSupVal () {
	"use strict";
    var bln = false,
        refID = "";
    
    for (var i = 0; i < 17; i++) {
        if (i < 10) {
            refID = "SupSpanOW" + i;
        } else if (i < 15) {
            refID = "SupSpanFT" + i;
        } else if (i > 14) {
            refID = "SupSpanLV" + i;
        }
        
        bln = spanToggleSupVal(refID);
        
        if (bln === true) {
            $("." + refID).css("display", "flex");
            $("#" + refID).addClass("fa-angle-up").removeClass("fa-angle-down");
        } else {
            $("." + refID).css("display", "none");
            $("#" + refID).addClass("fa-angle-down").removeClass("fa-angle-up");
        }
    }
}

function spanToggleSupVal(refID) {
    var day = refID.substr(0, 3),
        num = parseInt(refID.substr(9)),
        leaveArray = ["M", "T", "W", "R", "F"],
        otherArray = ["Select", "Desc", "Time"],
        tripArray = ["To", "From", "Voucher", "Time"],
        i = 0,
        bln = false;
    
    if (refID.indexOf("LV") > 0) {
        if (num === 15) {
            for (var i = 0; i < 5; i++) {
                if ($("#SupLeaveSelectAD" + leaveArray[i]).val() !== "") {
                    bln = true;
                    break;
                }        
            }
        } else {
            for (i = 15; i < 20; i++) {
                if ($("#SupLeaveSelect" + i).val() !== "") {
                    bln = true;
                    break;
                }
                if ($("#SupTime" + i).val() !== "") {
                    bln = true;
                    break;
                }
            }            
        }
    } else if (refID.indexOf("OW") > 0) {
        for (i = 0; i < 3; i++) {
            if ($("#Sup" + otherArray[i] + num).val() !== "") {
                bln = true;
                break;
            }
        }
    } else if (refID.indexOf("FT") > 0) {
        for (i = 0; i < 4; i++) {
            if ($("#Sup" + tripArray[i] + num).val() !== "") {
                bln = true;
                break;
            }
        }
    }
    return bln;
}

function loadSupData() {
    $("#AreaSup").text(getStorage("Area"));
    $("#TeamSup").text(getStorage("Team"));
    $("#EmpNameSup").text(getStorage("EmpLName") + ", " + getStorage("EmpFName") + " " + getStorage("EmpMI"));
    $("#EmpIDSup").text(getStorage("EmpID"));
    $("#PositionSup").text(getStorage("Position"));
    $("#Veh1Sup").text(getStorage("Veh1"));
    $("#Veh2Sup").val(getStorage("Veh2"));
    $("#Veh3Sup").val(getStorage("Veh3"));
    if (getStorage("OJT") === "1") {
        $("#OJTSup").prop("checked", true);
        $("#TraineeSup").val(getStorage("Trainee"));
    }
}

function checkOJTDataSup() {
    "use strict";
    var x = getStorage("OJTSup"),
        i = 0,
        j = 0;
    if (x === "0") {
        toggleOJTSup(false);
    } else {
        toggleOJTSup(true);
    }
}

//Toggle OJT checkboxes and Trainee textbox
function toggleOJTSup(bln) {
    var i = 0;

    $("#OJTSup").prop("checked", bln);
    if (bln === true) {
        $("#TraineeSup").prop("disabled", false).css("background-color", "white");
    } else {
        $("#TraineeSup").prop("disabled", true).css("background-color", "lightgray").val("");
        setStorage("TraineeSup", "");
    }

    //Loop through days of the week
    for (i = 0; i < 15; i++) {
        //If all day leave is checked, do not show OJT boxes
        if (bln === true) {
            $("#SupOJT" + i).parent().show();
        } else {
            $("#SupOJT" + i).prop("checked", false).parent().hide();
            setStorage("SupOJT" + i, 0);
        }
    }
}

function textboxUpdateSup(refID) {
	"use strict";
    //Check for overlaps and run calculation
    var b = refID.substr(0, refID.length - 1),
        c = Number(b.substr(7)),
        d = refID.substr(-1);
    
    if (!isNaN(d)) {
        return;
    }
    checkOverlapSup(c, d);
    calculateDiffSup(b);
    if ($("#" + refID).val() === "") {
        $("#" + b).val("");
        setStorage(b, "");
    }
    getSupTotals();
}

function checkOverlapSup(num, z) {
	"use strict";
    if ($("#SupTime" + num + z).val() === "") {
        return;
    }
    
    if ($("#SupDate" + num).val() === "") {
        openPopUp("<p>You must select a date first.</p>","Sup");
        $("#SupTime" + num + z).val("");
        return;
    }
    var thisStart = convertToMinutes($("#SupTime" + num + "S").val()),
        thisEnd = convertToMinutes($("#SupTime" + num + "E").val()),
        i = 0,
        bln = false,
        newStart = "",
        newEnd = "",
        max = 20;
    
    for (i; i < max; i++) {
        if (i === num) {
			i++;
		}
        if ($("#SupDate" + num).val() !== $("#SupDate" + i).val()) {
            continue;
        }

        newStart = convertToMinutes($("#SupTime" + i + "S").val());
        newEnd = convertToMinutes($("#SupTime" + i + "E").val());
        if (newStart === thisStart) {
            bln = true;
            break;
        }
        if (newStart > 0 && newEnd > 0) {
            if (thisStart > 0 && thisStart > newStart && thisStart < newEnd) {
                bln = true;
                break;
            }
            if (thisEnd > 0 && thisEnd > newStart && thisEnd < newEnd) {
                bln = true;
                break;
            }
            if (thisStart === newStart) {
                bln = true;
                break;
            }
            if (thisEnd === newEnd) {
                bln = true;
                break;
            }
            if (thisStart < newStart && thisEnd > newEnd) {
                bln = true;
                break;
            }
        }
    }
    if (bln === true) {
        openPopUp("<p>Overlap error</p>","Sup");
        $("#SupTime" + num + z).val("");
    }
}

function completeTimesheetSup() {
    var bln = runValidationsSup();
    if (bln === false) {
        return;
    }
    var y = '<p>VALIDATION SUCCESSFUL</p><p>I certify that I have performed school duties on the vehicle with number shown on all runs as entered hereon and if driver, I have performed daily pretrip inspection as required. In accordance with regulations and policies of the school board, I have accurately recorded all of the hours I worked. I understand that failure to comply with Time and Attendance Reporting policies will be just cause for discipline up to, and including, separation from FCPS. (Regulation 4293)</p><p><label for="initial">Initial Below:<br><input type="text" id="EmpInitialsSup"></label><span class="close fas fa-check-circle fa-lg" id="goConfirmSup" style="color:green;" onclick="openTimesheetSup()";></span></p>';
    openPopUp(y, "Sup");
    $("#EmpInitialsSup").val("");
    setStorage("EmpInitialsSup", "");
}

function openTimesheetSup() {
    var emp = "";
    emp = $("#EmpInitialsSup").val();
    emp = emp.toUpperCase();
    setStorage("EmpInitialsSup", emp);

    $("#variousModalSup").css("display", "none");
    if (emp !== "") {
        window.open("supplement.html");
    }
}

function runValidationsSup() {
    var bln = true,
        val = "";
    
    $('input:not([type="checkbox"]), select').each(function () {
        setStorage($(this).attr("id"), $(this).val());
    });

    $('input[type="checkbox"]').each(function () {
        setStorage($(this).attr("id"), ($(this).prop("checked") === true) ? 1 : 0);
    });
    
    val = testEmpData("Sup") + testOtherWorkSup() + testFieldTripSup() + testLeaveSup();
    
    if (val !== "") {
        openPopUp(val, "Sup");
        return false;
    } else {
        return true;
    }
}

function testFieldTripSup() {
    var val = "";

    //Check field trips
    for (var i = 10; i < 15; i++) {
        if ($("#SupTime" + i) === "") { //Time is blank
            if ($("#SupVoucher" + i) !== "" || $("#SupFrom" + i) !== "" || $("#SupTo" + i) !== "") {
                val = val + "<p>&bull;Field Trip " + (i - 9) + ": No time entered.</p>";
            }
        } else { //Time is not blank
            if ($("#SupVoucher" + i) === "") {
                val = val + "<p>&bull;Field Trip " + (i - 9) + ": Voucher number cannot be blank.</p>";
            }
            if ($("#SupFrom" + i) === "" || $("#SupTo" + i) === "") {
                val = val + "<p>&bull;Field Trip " + (i - 9) + ": From and To location cannot be blank.</p>";
            }
        }
    }
    return val;
}

function testOtherWorkSup() {
    var val = "";
    
    for (var i = 0; i < 10; i++) {
        if ($("#SupTime" + i) !== "") { //Time is not blank
            if ($("#SupSelect" + i) === null) {
                val = val + "<p>&bull;Other Work " + i + ": Category is required.</p>";
            }
            if (($("#SupSelect" + i) === "OT" || $("#SupSelect" + i) === "FYI") && $("#SupDesc" + i) === "") {
                val = val + "<p>&bull;Other Work " + i + ": Description is required when Other or FYI selected.</p>";
            }
            if ($("#SupSelect" + i) === null && $("#SupDesc" + i) !== "") {
                val = val + "<p>&bull;Other Work " + i + ": Description entered without category selection.</p>";
            }
        } else { //Time is blank
            if ($("#SupSelect" + i) !== null || $("#SupDesc" + i) !== "") {
                val = val + "<p>&bull;Other Work " + i + ": No time entered.</p>";
            }
        }
    }
    
    for (var i = 0; i < 20; i++) {
        if ($("#SupTime" + i + "S").val() !== "" && $("#SupTime" + i + "E").val() === "") {
            if (i < 10) {
                val = val + "<p>&bull;Other Work " + i + ": Time not completed.</p>";
            } else if (i > 14) {
                val = val + "<p>&bull;Leave " + (i - 14) + ": Time not completed.</p>";
            } else {
                val = val + "<p>&bull;Field Trip " + (i - 9) + ": Time not completed.</p>";
            }
        }
    }

    return val;
}

function testLeaveSup() {
    var val = "";
    var lvArray = ["M", "T", "W", "R", "F"];

    for (var i = 15; i < 20; i++) {
        if ($("#SupTime" + i) !== "") {
            if ($("#SupLeaveSelect" + i) === "") {
                val = val + "<p>&bull;Leave " + (i - 14) + ": Type of leave is required.</p>";
            }
        } else {
            if ($("#SupLeaveSelect" + i) !== "") {
                val = val + "<p>&bull;Leave " + (i - 14) + ": Leave type selected but no time was entered.</p>";
            }
        }
    }
    for (var i = 0; i < 5; i++) {
        if ($("#SupLeaveAD" + lvArray[i]).prop("checked") === true) {
            if ($("#SupLeaveSelectAD" + lvArray[i]).val() === "") {
                val = val + "<p>&bull;All Day Leave " + (i + 1) + ": Type of leave is required.</p>";
            }
        } else {
            if ($("#SupLeaveSelectAD" + lvArray[i]).val() !== "") {
                val = val + "<p>&bull;All Day Leave " + (i + 1) + ": All day leave type selected but checkbox left unchecked.</p>";
            }
        }
    }
    return val;
}

function calculateDiffSup(refID) {
    "use strict";
	if (refID === null || refID === undefined) {
		return;
	}
    
    var startTime = convertToMinutes($("#" + refID + "S").val()),
        endTime = convertToMinutes($("#" + refID + "E").val()),
        num = refID.substr(7),
        timeDiff = 0;

    if ((endTime < startTime) && (endTime !== 0)) {
        openPopUp("<p>End time is less than start time</p>");
        $("#" + refID + "E").val("");
    } else {
        if (endTime === 0) {
			endTime = startTime;
		}
        timeDiff = endTime - startTime;
        if (num > 9) {
            $("#" + refID).val(convertTotal(timeDiff));
        } else {
            $("#" + refID).val(calculateTotal(timeDiff));
        }
    }
}

function clearTimeFieldSup (fieldID) {
    var num = fieldID.substr(10);
    
    if (Number(num) > 14) {
        $("#SupDate" + num).val("");
        setStorage("SupDate" + num, "");
        $("#SupLeaveSelect" + num).val("");
        setStorage("SupLeaveSelect" + num, "");
        $("#SupTime" + num + "E").val("").trigger("change");
        $("#SupTime" + num + "S").val("").trigger("change");
    } else if (num.substr(0,2) === "AD") {
        $("#SupLeaveSelect" + num).val("");
        setStorage("SupLeaveSelect" + num, "");
        if ($("#SupLeave" + num).prop("checked") === true) {
            $("#SupLeave" + num).trigger("click");
        }
    } else {
        $("#SupTime" + num + "E").val("").trigger("change");
        $("#SupTime" + num + "S").val("").trigger("change");
    }
}

function clearOtherFieldSup (fieldID) {
    "use strict";
    var num = Number(fieldID.substr(8));
    
    if (num < 10) {
        $("#SupDesc" + num).val("");
        setStorage("SupDesc" + num, "");
        $("#SupSelect" + num).val("");
        setStorage("SupSelect" + num, "");
        $("#SupLift" + num).prop("checked", false);
        setStorage("SupLift" + num, 0);
        otherWorkTime("Sup", num, false);
    } else if (num > 9 && num < 15) {
        $("#SupTo" + num).val("");
        setStorage("SupTo" + num, "");
        $("#SupFrom" + num).val("");
        setStorage("SupFrom" + num, "");
        $("#SupVoucher" + num).val("");
        setStorage("SupVoucher" + num, "");
        $("#SupLift" + num).prop("checked", false);
        setStorage("SupLift" + num, 0);
    }
    $("#SupDate" + num).val("");
    setStorage("SupDate" + num, "");
}
    
function sumCPaySup() {
	"use strict";
    var c1 = 0,
        c3 = 0,
        i = 0,
        sum = 0;

    for (i = 0; i < 10; i++) {
        if ($("#SupSelect" + i).val() === "CBK" && $("#SupTime" + i).val() !== "") {
            c1 = c1 + 240;
            sum = sum + convertToMinutes($("#SupTime" + i).val());
        }
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    setStorage("TotalC1Sup", c1);
    $("#TotalC1Sup").val(c1);

    for (i = 0; i < 10; i++) {
        if ($("#SupSelect" + i).val() === "ES0" && $("#SupTime" + i).val() !== "") {
            c3 = c3 + convertToMinutes($("#SupTime" + i).val());
            sum = sum + convertToMinutes($("#SupTime" + i).val());
        }
    }

    for (i = 0; i < 10; i++) {
        if ($("#SupSelect" + i).val() === "ES2" && $("#SupTime" + i).val() !== "") {
            c3 = c3 + convertToMinutes($("#SupTime" + i).val()) + 120;
            sum = sum + convertToMinutes($("#SupTime" + i).val());
        }
    }
    sum = convertTotal(sum);
    c3 = (c3 === 0) ? "" : convertTotal(c3);
    setStorage("TotalC3Sup", c3);
    $("#TotalC3Sup").val(c3);
    setStorage("TotalHWSup", sum);
    $("#TotalHWSup").val(sum);
}

function getSupTotals() {
    var i = 0,
        sum = 0;
    
    //Clear hours worked so it can recalculate
    $("#TotalHWSup").val("");
    setStorage("TotalHWSup", "");
    
    //Calculate other work
    for (i; i < 10; i++) {
        if ($("#SupSelect" + i).val() === "ES2" || $("#SupSelect" + i).val() === "ES0" || $("#SupSelect" + i).val() === "CBK") {
            continue;
        } else {
            sum = sum + convertToMinutes($("#SupTime" + i).val());
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    $("#TotalOtherSup").val(sum);
    setStorage("TotalOtherSup", sum);
    
    //Calculate field trip
    sum = 0;
    for (i = 10; i < 15; i++) {
        sum = sum + Number($("#SupTime" + i).val());
    }
    sum = setToFixed(sum);
    $("#TotalFTSup").val(sum);
    setStorage("TotalFTSup", sum);
    
    //Add time to 1R
    sum = convertTotal(convertToMinutes($("#TotalOtherSup").val()))
    $("#Total1RSup").val(sum);
    setStorage("Total1RSup", sum);
    
    //Calculate Lift S2
    sum = 0;
    for (i = 0; i < 10; i++) {
        if ($("#SupLift" + i).prop("checked")) {
            sum = sum + convertToMinutes($("#SupTime" + i).val());
        }
    }
    sum = convertTotal(sum);
    for (i = 10; i < 15; i++) {
        if ($("#SupLift" + i).prop("checked")) {
            sum = sum + parseFloat($("#SupTime" + i).val());
        }
    }
    sum = (sum === "") ? "" : setToFixed(sum);
    $("#TotalS2Sup").val(sum);
    setStorage("TotalS2Sup", sum);
    
    //Calculate OJT S4
    sum = 0;
    for (i = 0; i < 10; i++) {
        if ($("#SupOJT" + i).prop("checked")) {
            sum = sum + convertToMinutes($("#SupTime" + i).val());
        }
    }
    sum = convertTotal(sum);
    for (i = 10; i < 15; i++) {
        if ($("#SupOJT" + i).prop("checked")) {
            sum = sum + parseFloat($("#SupTime" + i).val());
        }
    }
    sum = (sum === "") ? "" : setToFixed(sum);
    $("#TotalS4Sup").val(sum);
    setStorage("TotalS4Sup", sum);
    
    //Calculate C1 & C3
    sumCPaySup();
    
    //Calculate hours worked
    sum = Number($("#TotalHWSup").val()) + Number(convertTotal(convertToMinutes($("#TotalOtherSup").val()))) + Number($("#TotalFTSup").val());
    sum = setToFixed(sum);
    $("#TotalHWSup").val(sum);
    setStorage("TotalHWSup", sum);
}