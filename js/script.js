//ALL ON WINDOW READY FUNCTIONS
$(window).ready(function () {
    $(document).ready(function () {
        //LOAD DATE RANGES INTO RADIO BUTTONS AND DISPLAY
        loadDateRange();
        
        //ADD THE FIELD TRIP SELECTOR FROM FIELDTRIPS.JS
        insertFTSelect();
        
        loadLocalStorage();
        
        loadTeamValues(getStorage("Area"), "");
        loadRadioSelection();
        checkOJTData();
        checkDailyLeave();
        positionChange();
        checkOtherWorkVal();
        checkRouteValue();
    });
});

//GO THROUGH LOCAL STORAGE AND SEE WHAT IS ALREADY STORED. LOAD STORED DATA INTO ELEMENTS
function loadLocalStorage(optVal) {
    optval = (optval === "undefined") ? "" : "Sup";
    var refID = "",
        refVal = "";

    //LOOP THROUGH ALL TEXT, NUMBER, AND SELECT ELEMENTS. SET ELEMENT VALUE TO MATCHING ID IN LOCAL STORAGE
    $("input[type=text], input[type=number], select").each(function () {
        refID = $(this).attr("id");
        refVal = getStorage(refID);
        
        //IF NO VALUE IN LOCAL STORAGE, SET TO ""
        if (refVal === null) {
            refVal = "";
            setStorage(refID, refVal);
        }
        
        //SET VALUE INTO ELEMENT
        $(this).val(refVal);
    });

    //LOOP THROUGH ALL CHECKBOXES. SET ELEMENT CHECKED PROPERTY TO MATCHING ID FROM LOCAL STORAGE
    $(":checkbox").each(function () {
        refID = $(this).attr("id");
        refVal = getStorage(refID);
        
        //IF NO VALUE IN LOCAL STORAGE, SET VALUE TO 0
        if (refVal === null) {
            refVal = 0;
            setStorage(refID, refVal);
        }
        
        //SET CHECKBOX CHECKED STATE
        $(this).prop("checked", (refVal === "1") ? true : false);
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

//RETURNS A STRING WITH DATE RANGE CALCULATED USING SUPPLIED DATE AND OFFSET NUMBER
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

//DATEADD FUNCTION
Date.prototype.addDays = function (x) {
	"use strict";
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + x);
    return date;
};