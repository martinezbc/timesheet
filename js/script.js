/****************************************TIME PICKER****************************************/
//TIME UPDATE STARTING FUNCTION
function changeValue(operator, clicked, refElement, s) {
    "use strict";
    s = (s === undefined) ? "" : "S";
    var x = refElement.substr(-1);
    var blnPupil = (x === "A" || x === "B" || x === "C" || x === "D") ? true : false;

    var str = clicked.substr(0, 2);
    switch (str) {
        case "hr":
            setHours(operator, s);
            break;
        case "mn":
            if (blnPupil)
                setMinutesPupil(operator);
            else
                setMinutes(operator, s);
            break;
        default:
            setMeridiem(s);
    }
}
//CHANGE AM AND PM
function setMeridiem() {
    s = (s === undefined) ? "" : "S";
    var meridiemText = "",
        inputMeridiem = byID("meridiem" + s).innerHTML;
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    byID("meridiem" + s).innerHTML = meridiemText;
}
//CHANGE MINUTES BY 5
function setMinutes(operator, s) {
    s = (s === undefined) ? "" : "S";
    var minutesText = "",
        minutes = Number(byID("minutes" + s).innerHTML);
    if (operator === 1) {
        operator = 5;
    } else if (operator === 2) {
        operator = 15;
    } else if (operator === -1) {
        operator = -5;
    } else if (operator === -2) {
        operator = -15;
    }
    minutesText = minutes + operator;
    if (minutesText > 59) {
        minutesText = Number(minutesText) - 60;
        setHours(1, s);
    } else if (minutesText < 0) {
        minutesText = 60 + Number(minutesText)
        setHours(-1, s);
    }
    if (minutesText < 10) 
        minutesText = "0" + minutesText;

    byID("minutes" + s).innerHTML = minutesText;
}
//CHANGE MINUTES FOR PUPIL TIME BY 1
function setMinutesPupil(operator) {
    var minutesText = "",
        minutes = Number(byID("minutes").innerHTML);
    if (operator === 1) {
        operator = 1;
    } else if (operator === 2) {
        operator = 10;
    } else if (operator === -1) {
        operator = -1;
    } else if (operator === -2) {
        operator = -10;
    }
    minutesText = minutes + operator;
    if (minutesText < 0) {
        minutesText = 60 + Number(minutesText);
        setHours(-1, "");
    } else if (minutesText > 59) {
        minutesText = Number(minutesText) - 60;
        setHours(1, "");
    }

    if (minutesText < 10) {
        minutesText = "0" + minutesText;
    }
    byID("minutes").innerHTML = minutesText;
}
//CHANGE HOURS
function setHours(operator, s) {
    s = (s === undefined) ? "" : "S";
    var hoursText = "";
    var hours = Number(byID("hours" + s).innerHTML);
    hoursText = hours + operator;

    if (hoursText === 13) {
        hoursText = "1";
        if (operator === 2) {
            setMeridiem(s);
        }
    } else if (hoursText === 14) {
        hoursText = "2";
    } else if (hoursText === 0) {
        hoursText = "12";
    } else if (hoursText === -1 || (hoursText === 11 && operator < 0)) {
        hoursText = "11";
        setMeridiem(s);
    } else if (hoursText === 12 && operator > 0) {
        setMeridiem(s);
    } else if (hoursText === 10 && operator === -2) {
        setMeridiem(s);
    }
    byID("hours" + s).innerHTML = hoursText;
}
/****************************************TIME PICKER****************************************/
/****************************************LOCAL STORAGE****************************************/
//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage(refID, val) {
    localStorage.setItem(refID, val);
}
//FIND ITEM BY ID IN LOCAL STORAGE AND RETURN VALUE
function getStorage(refID) {
    return localStorage.getItem(refID);
}
//STORE CHECKBOX VALUE
function storeCheckboxValue(e) {
    setStorage(e.currentTarget.id, (e.currentTarget.checked) ? "1" : "0");
}
//SET RADIO SELECTION
function storeRadioValue(e) {
    setStorage(e.currentTarget.name, e.currentTarget.value);
}
//SELECT ON CHANGE EVENT
function selectOnChange(e) {
    setStorage(e.currentTarget.id, e.currentTarget.value);
}
//INPUT NUMBER AND INPUT TEXT ON CHANGE EVENT
function textboxOnChange(e) {
    var S = (getFileName() === "index2.html") ? "S" : "";
    var refID = e.currentTarget.id;
    if (refID === "Trainee" + S || refID === "EmpName" + S) {
        byID(refID).value = properCase(e.currentTarget.value);
    }
    if (S === "" && refID.indexOf("Route") > 0) {
        byID(refID).value = byID(refID).value.toUpperCase();
    }
    setStorage(refID, e.currentTarget.value);
}
/****************************************LOCAL STORAGE****************************************/
//SHORTEN DOCUMENT.GETELEMENTBYID
function byID(id) {
    return document.getElementById(id);
}
//CHANGE TO PROPER CASE
function properCase(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, function (txtVal) {
        return txtVal.toUpperCase();
    });
}
//CHECK LENGTH OF ELEMENT VALUE, IF EXCEEDING NUM THEN SHOW POP UP ERROR MESSAGE
function limitCharacters(refID, num) {
    var refVal = byID(refID).value;
    if (refVal.length > num) {
        openPopUp("<p class='varp'>Limit " + num + " characters.</p>");
        byID(refID).value = refVal.substr(0, num);
    }
}
//DATEADD FUNCTION
function addDate(date, days) {
    var copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}
//TOGGLE HIDE CLASS ON AND OFF BY REMOVING OR ADDING
function showHide(refID, bln) {
    var el = byID(refID);
    //(Show the element) ? remove hide : add hide
    if (bln) {
        if (el.classList.contains("hide")) el.classList.remove("hide");
    } else {
        if (!el.classList.contains("hide")) el.classList.add("hide");
    }
}
//DISABLE ELEMENTS AND CHANGE BACKGROUND COLOR
function disableElement(refID, bln) {
    byID(refID).disabled = bln;
    byID(refID).style.backgroundColor = (bln) ? "lightgrey" : "white";    
}
//ROUND TO THE NEAREST 5
function round5(x) {
    "use strict";
    return Math.round(x / 5) * 5;
}
//RESET VALUE OF ELEMENT
function resetElement(refID) {
    if (byID(refID).type === "checkbox") {
        byID(refID).checked = false;
        setStorage(refID, "0");
    } else {
        byID(refID).value = "";
        setStorage(refID, "");
    }
}
//RESET TIME FIELDS
function resetTime(day, num) {
    var S = (getFileName() === "index2.html") ? "S" : "";
    var refID = (S === "S") ? "Time" + num : day + "Time" + num;
    resetElement(refID + "E" + S);
    resetElement(refID + "S" + S);
    resetElement(refID + S);
}
/****************************************MODAL POP UP MESSAGES****************************************/
//POP UP OW MESSAGE
function popUpOW() {
    openPopUp("<p class='varp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>");
}
//POP UP FT MESSAGE
function popUpFT() {
    openPopUp("<p class='varp'>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p class='varp'>&bull;Check lift if the trip required a lift.</p><p class='varp'>&bull;The start and end time must match what was recorded on the voucher.</p>");
}
//OPEN POP UP MODAL FOR ERROR MESSAGES
function openPopUp(msgVal) {
    var S = (getFileName() === "index2.html") ? "S" : "";
    byID("varDiv" + S).innerHTML = msgVal;
    showHide("variousModal" + S, true);
}
/****************************************MODAL POP UP MESSAGES****************************************/
//GET NAME OF HTML FILE
function getFileName() {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1); 
    return filename;
}