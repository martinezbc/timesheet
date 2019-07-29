/********************TIME PICKER********************/
//TIME SELECTOR MODAL
function openTimeSelector(e) {
    var S = (getFileName() === "index2.html") ? "S" : "";
    //Set current element as activeID
    activeID = e.currentTarget.id;
    //Disabled current element
    e.currentTarget.disabled = true;
    //Check date field first
    if (S === "S" && !checkOWFTDate(e.currentTarget.id)) return;
    //Get value of element
    var refVal = byID(activeID).value;
    //If value is null then exit function
    if (refVal === null) return;
    //If pupil time element then blnPupil is true
    var blnPupil = (S === "" && activeID.substr(-1) !== "S" && activeID.substr(-1) !== "E") ? true : false;
    //if active element has data already, break time into hrs, mins, and mer and load into spans
    if (refVal !== "") {
        var hours = refVal.substr(0, refVal.indexOf(":"));
        var mins = refVal.substr(refVal.indexOf(":") + 1, 2);
        var mer = refVal.substr(-2);
        byID("hours" + S).innerHTML = hours;
        byID("minutes" + S).innerHTML = mins;
        byID("meridiem" + S).innerHTML = mer;
    } else {
        if (!blnPupil) {
            mins = round5(Number(byID("minutes" + S).innerHTML));
            if (mins < 10 && mins > -1) {
                mins = "0" + mins.toString();
            } else if (mins === 60) {
                mins = "55";
            }
            byID("minutes" + S).innerHTML = mins;
        }
    }
    showHide("timeModal" + S, true);
}
//ADD VALUE TO UP AND DOWN ARROWS IN TIME SELECTOR THEN OPEN CHANGE VALUE FUNCTION
function timeSelectors(e) {
    var S = (getFileName() === "index2.html") ? "S" : "";
    var refID = e.currentTarget.id;
    var strVal = refID.substr(2),
        operator = "";
    switch (strVal) {
        case "up" + S:
            operator = 1;
            break;
        case "down" + S:
            operator = -1;
            break;
        case "up2" + S:
            operator = 2;
            break;
        case "down2" + S:
            operator = -2;
            break;
    }
    changeValue(operator, refID, activeID, S);
}
//TIME UPDATE STARTING FUNCTION
function changeValue(operator, clicked, refElement, S) {
    "use strict";
    var S = (getFileName() === "index2.html") ? "S" : "";
    var x = refElement.substr(-1);
    var blnPupil = (x === "A" || x === "B" || x === "C" || x === "D") ? true : false;

    var str = clicked.substr(0, 2);
    switch (str) {
        case "hr":
            setHours(operator, S);
            break;
        case "mn":
            if (blnPupil)
                setMinutesPupil(operator);
            else
                setMinutes(operator, S);
            break;
        default:
            setMeridiem(S);
    }
}
//CHANGE AM AND PM
function setMeridiem() {
    S = (S === undefined) ? "" : S;
    var meridiemText = "",
        inputMeridiem = byID("meridiem" + S).innerHTML;
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    byID("meridiem" + S).innerHTML = meridiemText;
}
//CHANGE MINUTES BY 5
function setMinutes(operator, s) {
    S = (S === undefined) ? "" : S;
    var minutesText = "",
        minutes = Number(byID("minutes" + S).innerHTML);
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

    byID("minutes" + S).innerHTML = minutesText;
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
function setHours(operator, S) {
    S = (S === undefined) ? "" : S;
    var hoursText = "";
    var hours = Number(byID("hours" + S).innerHTML);
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
    byID("hours" + S).innerHTML = hoursText;
}
/********************TIME PICKER********************/
/********************LOCAL STORAGE********************/
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
/********************LOCAL STORAGE********************/
/********************FIELD TRIP SELECTOR********************/
//FIELD TRIP MODAL
function openFTSelector(e) {
    var S = (getFileName() === "index2.html") ? "S" : "";
    showHide("ftModal" + S, true);
    activeID = e.currentTarget.id;
    byID("ftselector" + S).value = "";
    byID("fttype" + S).value = "";
}

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    var S = (getFileName() === "index2.html") ? "S" : "";
    var ftText = "";
    if (byID("ftselector" + S).value !== null)
        ftText = byID("ftselector" + S).value;
    else
        ftText = byID("fttype" + S).value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    byID(activeID).disabled = false;
    setStorage(activeID, ftText);
    showHide("ftModal" + S, false);
}
/********************FIELD TRIP SELECTOR********************/
/********************TEXT UPDATES AND LIMITATIONS********************/
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
/********************TEXT UPDATES AND LIMITATIONS********************/
/********************MISCELLANEOUS FUNCTIONS********************/
//SHORTEN DOCUMENT.GETELEMENTBYID
function byID(id) {
    return document.getElementById(id);
}
//DATEADD FUNCTION
function addDate(date, days) {
    var copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}
//GET NAME OF HTML FILE
function getFileName() {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1); 
    return filename;
}
/********************MISCELLANEOUS FUNCTIONS********************/
/********************ELEMENT PROPERTY UPDATE********************/
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
//DISABLE ELEMENTS AND CHANGE BACKGROUND COLOR
function disableElement(refID, bln) {
    byID(refID).disabled = bln;
    byID(refID).style.backgroundColor = (bln) ? "lightgrey" : "white";    
}
/********************ELEMENT PROPERTY UPDATE********************/
/********************MODAL POP UP MESSAGES********************/
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
/********************MODAL POP UP MESSAGES********************/
/********************TIME CALCULATIONS********************/
//CONVERT TIME COMPLETELY TO MINUTES
function convertToMinutes(s1) {
	"use strict";
    if (s1 === "" || s1 === null || s1 === undefined)
		return 0;
    
    var h = s1.substring(0, s1.indexOf(":"));
    
    if (h === "12" && s1.indexOf("AM") > 0)
		h = 0;
    
    h = h * 60;

    var m = round5(Number(s1.substr(s1.indexOf(":") + 1, 2))),
        b = m + h;

    if (s1.indexOf("PM") > 0 && h !== 720)
		b = b + 720;

    return b;
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
    totalVal = (totalVal === "0:00") ? "" : totalVal;
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
//ROUND TO THE NEAREST 5
function round5(x) {
    "use strict";
    return Math.round(x / 5) * 5;
}
/********************TIME CALCULATIONS********************/