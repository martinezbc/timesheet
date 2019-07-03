//ALL ON WINDOW READY FUNCTIONS
$(window).ready(function () {
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
//        checkOtherWorkVal();
        checkRouteValue();
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
