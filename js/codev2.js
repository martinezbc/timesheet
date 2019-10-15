let activeID = "";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fullday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/********************EVENT LISTENERS********************/

function byID(refID) {
    return document.getElementById(refID);
}

function arrEach(obj, event, func) {
    Array.from(obj).forEach((e) => {
        e.addEventListener(event, func);
    });
}

function docObj(prop) {
    return document.querySelectorAll(prop);
}

arrEach(docObj("input[type=checkbox]"), 'change', (e) => {
    setObject(e.target.id)
});
arrEach(docObj("input[type=radio]"), 'change', (e) => {
    storeRadioValue(e.target)
});

arrEach(docObj("input[type=text], input[type=number]"), 'change', (e) => {
    textboxOnChange(e.target)
});

arrEach(docObj("select"), 'change', (e) => {
    setObject(e.target.id)
});

arrEach(docObj("input[name='chkJ']"), 'click', (e) => {
    toggleJReg(e.target)
});
arrEach(docObj("input[name='chkOJT']"), 'click', (e) => {
    checkOJT(e.target)
});
arrEach(docObj("input[name='chkLV']"), 'click', (e) => {
    checkLeave(e.target)
});
arrEach(docObj("input[name='chkQL']"), 'click', (e) => {
    toggleQLReg(e.target)
});
arrEach(docObj("input[name='chkFTQL']"), 'click', getDailyTotals);
arrEach(docObj("input[name='txtTime']"), 'click', (e) => {
    openTimeSelector(e.target);
});
arrEach(docObj("input[name='txtFT']"), 'click', (e) => {
    openFTSelector(e.target)
});

byID('closeTime').addEventListener('click', () => {
    byID(activeID).disabled = false;
    showHide("timeModal", false);
});
byID('closeFT').addEventListener('click', () => {
    showHide("ftModal", false);
});
byID('endVarious').addEventListener('click', () => {
    showHide("variousModal", false);
});
byID('endValidate').addEventListener('click', () => {
    showHide("validateModal", false);
});
byID('ctspan').addEventListener('click', popUpCT);

byID('goFT').addEventListener('click', storeFTVal);
byID('endChanges').addEventListener('click', () => {
    showHide("changesModal", false);
});

byID('goTime').addEventListener('click', goTime);

arrEach(docObj("input[name='Area']"), 'change', (e) => {
    radioAreaSelect(e.target)
});
arrEach(docObj("input[name='Position']"), 'change', positionChange);
arrEach(docObj("input[name='route']"), 'change', routeNameCheck);
arrEach(docObj("input[name='selectOW']"), 'change', (e) => {
    selectOWChange(e.target)
});

arrEach(docObj('input[name="chkJ"]'), 'click', (e) => {
    toggleJReg(e.target)
});
arrEach(docObj('.up, .down, .up2, .down2'), 'click', timeSelectors);
arrEach(docObj('.addOW'), 'click', addOtherWork);
arrEach(docObj('.addFT'), 'click', addFieldTrip);
arrEach(docObj('.addLV'), 'click', addLeave);
arrEach(docObj('.fa-trash-alt'), 'click', removeOWFTLV);
arrEach(docObj('.ow'), 'click', popUpOW);
arrEach(docObj('.ft'), 'click', popUpFT);
arrEach(docObj('.fa-times'), 'click', clearTimeField);
arrEach(docObj("#Veh1, #Veh2, #Veh3, #Veh4"), 'keyup', (e) => {
    limitCharacters(e, 4)
});
arrEach(docObj("input[name='owdesc']"), 'keyup', limitOWDesc);
arrEach(docObj("input[name='ftvoucher']"), 'keyup', (e) => {
    limitCharacters(e, 6)
});
byID('EmpInitials').addEventListener('keyup', (e) => {
    if (e.target.value.length > 5) {
        e.target.value = e.target.value.substr(0, 5);
    }
});

byID('divtutorial').addEventListener('click', (e) => {
    showHide("changesModal", true)
});

byID('navbtn').addEventListener('click', (e) => {
    showHide("navbtn", true)
});
byID('divpreview').addEventListener('click', completeTimesheet);
byID('divsupplement').addEventListener('click', openSupplement);
byID('clear').addEventListener('click', popUpClear);

let clickEvent = (document.ontouchstart !== null) ? 'click' : 'touchstart';

window.addEventListener(clickEvent, (event) => {
    var bln = byID("navdropdown").classList.contains("hide") ? true : false;

    if (event.target.id !== 'navbtn') {
        showHide("navdropdown", false);
    } else {
        showHide("navdropdown", bln);
    }
});
/********************EVENT LISTENERS********************/
/********************TIME PICKER********************/
//TIME SELECTOR MODAL
function openTimeSelector(e) {
    activeID = e.id;
    let refVal = e.value;

    if (refVal === null || refVal === undefined) return;

    let blnPupil = (activeID.substr(-1) !== "S" && activeID.substr(-1) !== "E") ? true : false;

    if (refVal !== "") {
        let time = refVal.split(":");
        let hours = time[0];
        let mins = time[1].substr(0,2);
        let mer = time[1].substr(-2);
        byID('hours').innerHTML = hours;
        byID('minutes').innerHTML = mins;
        byID('meridiem').innerHTML = mer;
    } else {
        if (!blnPupil) {
            mins = round5(Number(byID('minutes').innerHTML));
            if (mins < 10 && mins > -1) {
                mins = "0" + mins.toString();
            } else if (mins === 60) {
                mins = "55";
            }
            byID('minutes').innerHTML = mins;
        }
    }
    showHide('timeModal', true);
}
//ADD VALUE TO UP AND DOWN ARROWS IN TIME SELECTOR THEN OPEN CHANGE VALUE FUNCTION
function timeSelectors(e) {
    const refID = e.target.id;
    let strVal = refID.substr(2);
    let operator = "";
    switch (strVal) {
        case 'up':
            operator = 1;
            break;
        case 'down':
            operator = -1;
            break;
        case 'up2':
            operator = 2;
            break;
        case 'down2':
            operator = -2;
            break;
    }
    changeValue(operator, refID, activeID);
}
//TIME UPDATE STARTING FUNCTION
function changeValue(operator, clicked, refElement) {
    "use strict";
    let x = refElement.substr(-1);
    let blnPupil = (x === "A" || x === "B" || x === "C" || x === "D") ? true : false;

    let str = clicked.substr(0, 2);
    switch (str) {
        case "hr":
            setHours(operator);
            break;
        case "mn":
            if (blnPupil)
                setMinutesPupil(operator);
            else
                setMinutes(operator);
            break;
        default:
            setMeridiem();
    }
}
//CHANGE AM AND PM
function setMeridiem() {
    let meridiemText = "";
    const inputMeridiem = byID('meridiem').innerHTML;
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    byID('meridiem').innerHTML = meridiemText;
}
//CHANGE MINUTES BY 5
function setMinutes(operator) {
    let minutesText = "";
    const minutes = Number(byID('minutes').innerHTML);
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
        setHours(1);
    } else if (minutesText < 0) {
        minutesText = 60 + Number(minutesText)
        setHours(-1);
    }
    if (minutesText < 10)
        minutesText = "0" + minutesText;

    byID('minutes').innerHTML = minutesText;
}
//CHANGE MINUTES FOR PUPIL TIME BY 1
function setMinutesPupil(operator) {
    let minutesText = "";
    let minutes = Number(byID("minutes").innerHTML);
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
function setHours(operator) {
    let hoursText = "";
    let hours = Number(byID('hours').innerHTML);
    hoursText = hours + operator;

    if (hoursText === 13) {
        hoursText = "1";
        if (operator === 2) {
            setMeridiem();
        }
    } else if (hoursText === 14) {
        hoursText = "2";
    } else if (hoursText === 0) {
        hoursText = "12";
    } else if (hoursText === -1 || (hoursText === 11 && operator < 0)) {
        hoursText = "11";
        setMeridiem();
    } else if (hoursText === 12 && operator > 0) {
        setMeridiem();
    } else if (hoursText === 10 && operator === -2) {
        setMeridiem();
    }
    byID('hours').innerHTML = hoursText;
}
//USE SELECTED TIME
function goTime() {
    let timetext = byID('hours').innerHTML;
    timetext += ":" + byID('minutes').innerHTML;
    timetext += " " + byID('meridiem').innerHTML;
    byID(activeID).value = timetext;
    byID(activeID).disabled = false;
    showHide('timeModal', false);
    timeCalculation(activeID);
    setObject(activeID);
}
/********************TIME PICKER********************/
/********************LOCAL STORAGE********************/
//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage() {
    let week = byID('WeekOf').value;

    localStorage.setItem(`${week}Obj`, JSON.stringify(objThis));
}
//SET ELEMENT VALUE INTO OBJECTS
function setObject(refID) {
    if (refID === 'WeekOf') return;
    let day = getObjDay(refID.substr(0, 3));

    if (byID(refID).getAttribute('type') === 'checkbox') {
        objThis[day][refID] = (byID(refID).checked) ? true : false;
    } else {
        objThis[day][refID] = byID(refID).value;
    }
    setStorage();
}
//SET RADIO SELECTION
function storeRadioValue(e) {
    let parent = e.parentNode.id;
    if (parent !== 'divarea' && parent !== 'divposition') {
        parent = e.parentNode.parentNode.id;
    }
    parent = parent.replace('div', '');
    parent = properCase(parent);

    objThis.Data[parent] = e.value;
    getWeeklyTotals();
    setStorage();
}
//INPUT NUMBER AND INPUT TEXT ON CHANGE EVENT
function textboxOnChange(e) {
    if (e.id === 'Trainee' || e.id === 'EmpName') {
        e.value = properCase(e.value);
    } else if (e.id === 'EmpInitials') {
        e.value = e.value.toUpperCase();
    } else if (e.id.indexOf("Route") > 0) {
        routeNameTransform(e.id);
    }

    setObject(e.id);
}
//UPDATE THE WAY THE ROUTE NAME LOOKS
function routeNameTransform(refID) {
    let refVal = byID(refID).value;
    refVal = refVal.toUpperCase();

    let i = 0;

    let blnJ = (refVal.lastIndexOf("J") > 3) ? true : false;
    let blnL = (refVal.lastIndexOf("L") > 3) ? true : false;
    let blnQ = (refVal.lastIndexOf("Q") > 3) ? true : false;

    //Remove AM & PM
    if (refVal.lastIndexOf("AM") > 2)
        refVal = refVal.replace("AM", "");
    if (refVal.lastIndexOf("PM") > 2)
        refVal = refVal.replace("PM", "");

    refVal = refVal.trim();

    //Remove -
    if (refVal.lastIndexOf("-") > 0)
        refVal = refVal.replace("-", "");

    //Remove Q, L and J
    if (refVal.lastIndexOf("L") > 3) {
        i = refVal.lastIndexOf("L");
        refVal = refVal.substr(0, i) + refVal.substr(i + 1);
        refVal = refVal.trim();
    }
    if (refVal.lastIndexOf("Q") > 3) {
        i = refVal.lastIndexOf("Q");
        refVal = refVal.substr(0, i) + refVal.substr(i + 1);
        refVal = refVal.trim();
    }
    if (refVal.lastIndexOf("J") > 3) {
        i = refVal.lastIndexOf("J");
        refVal = refVal.substr(0, i) + refVal.substr(i + 1);
        refVal = refVal.trim();
    }

    if (refVal.lastIndexOf("V") > 3) {
        i = refVal.lastIndexOf("V");
        refVal = refVal.substr(0, i) + refVal.substr(i + 1);
        refVal = refVal.trim();
    }

    //Remove P and D for midday
    if (refID === "PSRoute1" || refID === "PSRoute2") {
        if (refVal.lastIndexOf("P") > 3) {
            i = refVal.lastIndexOf("P");
            refVal = refVal.substr(0, i) + refVal.substr(i + 1);
            refVal = refVal.trim();
        }

        if (refVal.lastIndexOf("D") > 3) {
            i = refVal.lastIndexOf("D");
            refVal = refVal.substr(0, i) + refVal.substr(i + 1);
            refVal = refVal.trim();
        }
    }

    //Let shuttle number be whatever they type in
    if (refID === "SHRoute1" || refID === "SHRoute2") return;

    //If the route length is less than 3 then they didn't completely type in the route name
    if (refVal.length < 3 && refVal !== '') {
        openPopUp('<p>Invalid route name.</p>');
        refVal = "";
    }

    let routeName = ''
    let routeNum = '';
    let count = 0;
    for (let i = refVal.length; i >= 0; i--) {
        if (isNaN(refVal.substr(i, 1)) && routeNum !== '') {
            routeName = refVal.substr(i, 1) + routeName;
        } else if (!isNaN(refVal.substr(i, 1))) {
            routeNum = refVal.substr(i, 1) + routeNum;
        }
    }

    if (routeNum.substr(i, 1) === "7") {
        routeName = routeName + "7";
        routeNum = routeNum.substr(1);
    }

    if (routeName.indexOf("AIM") > -1 || routeName.indexOf("TSRC") > -1) {
        routeName = routeName + routeNum.substr(0, 1);
        routeNum = routeNum.substr(1);
    }


    //Rebuild route number with dash, J, L, and Q if needed
    refVal = routeName + "-" + routeNum;
    refVal = (blnJ) ? refVal + " J" : refVal;
    refVal = (blnQ && blnJ) ? refVal + "Q" : (blnQ && !blnJ) ? refVal + " Q" : refVal;
    refVal = (blnL && (blnJ || blnQ)) ? refVal + "L" : (blnL && !blnJ && !blnQ) ? refVal + " L" : refVal;

    //Set new string into element unless it's only a dash
    byID(refID).value = (refVal === "-") ? "" : refVal;
}
/********************LOCAL STORAGE********************/
/********************FIELD TRIP SELECTOR********************/
//FIELD TRIP MODAL
function openFTSelector(e) {
    showHide('ftModal', true);
    activeID = e.id;
    e.disabled = true;
    byID('ftselector').value = "";
    byID('fttype').value = "";
}

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    let ftText = "";
    let ftselect = byID('ftselector').value;
    if (ftselect !== null && ftselect !== "")
        ftText = byID('ftselector').value;
    else
        ftText = byID('fttype').value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    byID(activeID).disabled = false;
    objThis[activeID.substr(0, 3)][activeID] = ftText;
    showHide('ftModal', false);
}
/********************FIELD TRIP SELECTOR********************/
/********************TEXT UPDATES AND LIMITATIONS********************/
//CHANGE TO PROPER CASE
function properCase(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, (txtVal) => {
        return txtVal.toUpperCase();
    });
}
//CHECK LENGTH OF ELEMENT VALUE, IF EXCEEDING NUM THEN SHOW POP UP ERROR MESSAGE
function limitCharacters(e, num) {
    let refVal = e.target.value;
    if (refVal.length > num) {
        openPopUp("<p class='letp'>Limit " + num + " characters.</p>");
        e.target.value = refVal.substr(0, num);
    }
}
/********************TEXT UPDATES AND LIMITATIONS********************/
/********************MISCELLANEOUS FUNCTIONS********************/
//DATEADD FUNCTION
function addDate(date, days) {
    let copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}
/********************MISCELLANEOUS FUNCTIONS********************/
/********************ELEMENT PROPERTY UPDATE********************/
//TOGGLE HIDE CLASS ON AND OFF BY REMOVING OR ADDING
function showHide(refID, bln) {
    let el = byID(refID);
    //(Show the element) ? remove hide : add hide
    if (bln) {
        if (el.classList.contains("hide")) el.classList.remove("hide");
    } else {
        if (!el.classList.contains("hide")) el.classList.add("hide");
    }
}
//RESET VALUE OF ELEMENT
function resetElement(refID) {
    let day = getObjDay(refID.substr(0, 3));
    if (byID(refID).type === "checkbox") {
        if (optVal === "") {
            objThis[day][refID] = false;
        } else {
            objThis[refID] = false;
        }
        byID(refID).checked = false;
    } else {
        objThis[day][refID] = "";
        byID(refID).value = "";
    }
    setObject(refID);
}
//GET OBJ DAY OR RETURN DATA
function getObjDay(day) {
    switch (day) {
        case "Mon":
        case "Tue":
        case "Wed":
        case "Thu":
        case "Fri":
        case "Sat":
        case "Sun":
            return day;
            break;
        default:
            return 'Data';
    }
}
//RESET TIME FIELDS
function resetTime(day, num) {
    let refID = day + "Time" + num;
    resetElement(`${refID}E`);
    resetElement(`${refID}S`);
    resetElement(refID);
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
    openPopUp("<p class='letp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>");
}
//POP UP FT MESSAGE
function popUpFT() {
    openPopUp("<p class='letp'>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p class='letp'>&bull;Check lift if the trip required a lift.</p><p class='letp'>&bull;The start and end time must match what was recorded on the voucher.</p>");
}

function popUpClear() {
    openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>');
}
//OPEN POP UP MODAL FOR ERROR MESSAGES
function openPopUp(msgVal) {
    byID('varDiv').innerHTML = msgVal;
    showHide('variousModal', true);
}
/********************MODAL POP UP MESSAGES********************/
/********************TIME CALCULATIONS********************/
//CONVERT TIME COMPLETELY TO MINUTES
function convertToMinutes(s1) {
    "use strict";
    if (s1 === "" || s1 === null || s1 === undefined)
        return 0;
    let blnPM = (s1.indexOf("PM") > 0) ? true : false;
    
    s1 = s1.replace(" AM", "").replace(" PM", "");
    let time = s1.split(":");
    let hour = time[0];

    if (hour === "12" && !blnPM) hour = 0;

    hour = hour * 60;

    let min = round5(Number(time[1])) + hour;

    if (blnPM && hour !== 720) min += 720;

    return min;
}
//RETURN TIME AS H:MM FORMAT
function calculateTotal(refVal) {
    "use strict";
    let hour = Math.floor(refVal / 60),
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
    let hour = Math.floor(refVal / 60),
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

let range = '';

let strHTML = '<option value="">--Select Week--</option>';
for (let i = -21; i < 8; i += 7) {
    range = DateRange(i);
    strHTML += `<option value="${dateString(range)}">${range}</option>`;
}

;
byID("WeekOf").innerHTML = strHTML;

function DateRange(offset) {
    let start = new Date();
    let end = new Date();
    let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/New_York'
    };
    let day = start.getDay();
    let sOffset = -(day + 1) < -6 ? 0 : -(day + 1);
    let eOffset = sOffset + 6;
    start.setDate(start.getDate() + (sOffset + offset));
    end.setDate(end.getDate() + (eOffset + offset));

    return start.toLocaleDateString("en-US", options) + ' - ' + end.toLocaleDateString("en-US", options);
}

//REPLACE ALL FUNCTION
function replaceAll(text, find, replace) {
    while (text.toString().indexOf(find) != -1)
        text = text.toString().replace(find, replace);
    return text;
}

//CONVERT DATE STRING INTO STRAIGHT NUMBERS ONLY
function dateString(strDate) {
    strDate = replaceAll(strDate, "/", "");
    return strDate.replace(" - ", "");
}

//DECLARE VARIABLES
const routes = ['AMRoute1', 'AMRoute2', 'AMRoute3', 'AMRoute4', 'AMRoute5', 'PMRoute1', 'PMRoute2', 'PMRoute3', 'PMRoute4', 'PMRoute5', 'PSRoute1', 'PSRoute2', 'SHRoute1', 'SHRoute2', 'LRRoute1', 'LRRoute2'];
let objThis = localStorage.getItem(`${byID("WeekOf").value}Obj`);

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("WeekOf") !== null) {
        byID("WeekOf").value = localStorage.getItem("WeekOf");
        if (byID("WeekOf").value === null || byID("WeekOf").value === undefined)
            byID("WeekOf").selectedIndex = 4;
        initialLoad();
    } else {
        byID("WeekOf").selectedIndex = 4;
        initialLoad();
    }
});

byID("WeekOf").addEventListener('change', initialLoad);
const copy = docObj('.fa-copy');
Array.from(copy).forEach((e) => {
    e.addEventListener('click', copyRoutine);
});

//FIRST FUNCTION TO LOAD
function initialLoad() {
    if (byID("WeekOf").value === "") return;
    localStorage.setItem("WeekOf", byID("WeekOf").value);
    storeWeek();
    let refDate = new Date();
    let day = refDate.getDay();
    toggleDay(day);
    toggleOWFT();
    toggleLeave();
    loadOJT();
    loadQL();
    loadJ();
    loadLeave();
    getDailyTotals();
}

//LOAD ALL ELEMENTS INTO LOCAL STORAGE AND THEN PULL VALUES
function loadLocalStorage() {
    let objArray = [objThis.Data, objThis.Sat, objThis.Sun, objThis.Mon, objThis.Tue, objThis.Wed, objThis.Thu, objThis.Fri];

    for (let j = 0; j < objArray.length; j++) {
        let entries = Object.entries(objArray[j]);
        for (const [key, value] of entries) {
            if (key === "Area" || key === "Team" || key === "Position" || key === "Total1R") continue;
            if (byID(key) === null) continue;
            if (byID(key).tagName === 'SPAN') {
                byID(key).value === value;
            } else if (byID(key).type === 'checkbox') {
                byID(key).checked = value;
            } else {
                byID(key).value = value;
            }
        }
    }
    loadRadioSelection();
}

//FIND STORED VALUE FOR AREA, TEAM, POSITION, WEEKOF AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    const area = objThis.Data.Area;
    const team = objThis.Data.Team;
    let pos = objThis.Data.Position;
    //Load area from local storage and set radio selection
    for (const areas of docObj("input[name='Area']")) {
        areas.checked = false;
    }
    if (area !== "") byID("area" + area).checked = true;

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    for (const teams of docObj('input[name="Team"]')) {
        teams.checked = false;
    }
    if (team !== "" && (team.substr(0, 1) === area || area === '7')) byID("team" + team).checked = true;

    //Load position from local storage and set radio selection
    for (const positions of docObj('input[name="Position"]')) {
        positions.checked = false;
    }
    if (pos !== "") {
        pos = pos.replace(" ", "");
        byID("pos" + pos).checked = true;
    }
}

//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues() {
    "use strict";
    const area = objThis.Data.Area;

    let areadiv = ["div1", "div2", "div3", "div4", "div7", "divTC"];
    for (const div of areadiv) {
        if ("div" + area === div)
            showHide(div, true);
        else
            showHide(div, false);
    }

    if (area === "TC") {
        byID("teamTC").checked = true;
        objThis.Data.Team = "TC";
    }

}

//LOADS DATES FROM STORAGE INTO DATE TEXT FIELDS
function loadStoredWeek() {
    if (objThis.Data.SatDate !== undefined)
        for (let i = 0; i < 7; i += 1)
            byID(`${days[i]}Date`).innerHTML = objThis.Data[`${days[i]}Date`];
}

//GET DAY FROM LOCAL STORAGE OR CREATE A NEW WEEK IN LOCAL STORAGE
function storeWeek() {
    let week = byID("WeekOf").value;
    if (localStorage.getItem(`${week}Obj`) === null) {
        objThis = objNew;

        storeWeekDays(week);

        loadPrevWeek(week);
        objThis.Data.WeekOf = byID("WeekOf").value;
        setStorage();
    } else {
        objThis = JSON.parse(localStorage.getItem(`${week}Obj`));

        storeWeekDays(week);
    }
    //Load data from JSON
    loadLocalStorage();
    loadStoredWeek();
}

function storeWeekDays(week) {
    //Store first day of week range in y and shortened date in ny
    const startDate = week.substr(0, 2) + "/" + week.substr(2, 2) + "/" + week.substr(4, 4);
    const endDate = week.substr(8, 2) + "/" + week.substr(10, 2) + "/" + week.substr(12, 4);

    let satDate = new Date(startDate);

    objThis.Data.SatDate = startDate.substr(0, 5);
    objThis.Data.FriDate = endDate.substr(0, 5);

    for (let i = 4; i >= 0; i--) {
        let newDay = addDate(satDate, i + 1);
        let sm = newDay.getMonth() + 1;
        let sd = newDay.getDate();
        sm = (sm.toString().length === 1) ? "0" + sm : sm;
        sd = (sd.toString().length === 1) ? "0" + sd : sd;
        objThis.Data[`${days[i]}Date`] = sm + "/" + sd;
    }
}

function limitOWDesc(e) {
    let num = e.target.id.substr(-2);
    let day = e.target.id.substr(0, 3);
    if (byID(`${day}Select${num}`).value === "FYI")
        limitCharacters(e, 60);
    else
        limitCharacters(e, 35);
}


//PULL DATA FROM PREVIOUS WEEK INTO NEW WEEK
function loadPrevWeek(week) {
    let j = byID("WeekOf").selectedIndex - 1;
    if (j < 0) return;
    //Store first day of week range in y and shortened date in ny
    let prevweek = byID("WeekOf").options[j].value;
    if (localStorage.getItem(`${prevweek}Obj`) === null) return;
    objTemp = JSON.parse(localStorage.getItem(`${prevweek}Obj`));

    let i = 0;
    let keyArr = Object.keys(objThis.Data);
    for (i = 0; i < keyArr.length; i += 1) {
        if (keyArr[i].indexOf("Date") >= 0) continue;
        objThis.Data[keyArr[i]] = objTemp.Data[keyArr[i]];
    }
    for (const day of weekdays) {
        for (i = 11; i < 18; i += 1) {
            objThis[day][`${day}Time${i}S`] = objTemp[day][`${day}Time${i}S`];
            objThis[day][`${day}Time${i}E`] = objTemp[day][`${day}Time${i}E`];
            objThis[day][`${day}Time${i}`] = objTemp[day][`${day}Time${i}`];
        }
    }
}

//CHANGE NAV BAR VALUES DEPENDING ON THE DAY
function toggleDay(x) {
    "use strict";
    //Set prev, today, and next text values
    let prev = (x - 1 < 0) ? 6 : x - 1;
    let next = (x + 1 > 6) ? 0 : x + 1;

    showHide(fullday[x], true);
    byID("prev").innerHTML = `${days[prev]}-` + objThis.Data[`${days[prev]}Date`];
    byID("today").innerHTML = `${days[x]}-` + objThis.Data[`${days[x]}Date`];
    byID("next").innerHTML = `${days[next]}-` + objThis.Data[`${days[next]}Date`];

    //Loop through all other days and set style display to none
    for (let i = 0; i < 7; i += 1) {
        //Continue if variables match
        if (i === x) continue;
        //Add hide if element does not have it
        showHide(fullday[i], false);
    }
    togglePupilCounts(x);
}

//LOAD OJT AND TRAINEE DATA; DISABLE/ENABLE ALL OTHER OJT CHECKBOXES
function loadOJT() {
    objThis.Data.OJT = byID("OJT").checked;
    let bln = objThis.Data.OJT;
    let day = "";

    let t = byID("Trainee");
    if (bln) {
        t.disabled = false;
        t.style.backgroundColor = "white";
    } else {
        t.disabled = true;
        t.style.backgroundColor = "lightgrey";
        resetElement("Trainee");
    }

    const chkOJT = docObj("input[name='chkOJT']");
    for (const ojt of chkOJT) {
        if (ojt.id === "OJT") continue;
        day = ojt.id.substr(0, 3);
        if (!byID(`${day}LeaveAD`).checked)
            ojt.disabled = !bln;
        else
            ojt.disabled = true;
        if (!bln) resetElement(ojt.id);
    }
}

//LOAD Q/L CHECKBOXES, DISABLE/ENABLE THEM IF ROUTE HAS EQ OR L
function loadQL() {
    let bln = routeCheck();
    let val = "";

    let eql = docObj("input[name='chkQL']");
    for (const day of weekdays) {
        if (!byID(`${day}LeaveAD`).checked)
            byID(`${day}QL11`).disabled = !bln;
        else
            byID(`${day}QL11`).disabled = true;
        if (!bln) resetElement(`${day}QL11`);
    }
    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            disableOWFields(`${day}Select${j}`);
        }
    }
}

function loadJ() {
    let bln = routeCheckJ();

    for (let day of weekdays) {
        if (!byID(`${day}LeaveAD`).checked)
            byID(`${day}J11`).disabled = !bln;
        else
            byID(`${day}J11`).disabled = true;
        if (!bln) resetElement(`${day}J11`);
    }
}

//LOAD LEAVE AND TOGGLE FIELDS IF ALL DAY LEAVE IS CHECKED
function loadLeave() {
    for (const day of weekdays)
        toggleADLeave(`${day}LeaveAD`);
}

//IF Q/L 11-17 IS CHECKED, THEN CHECK ALL OF THEM
function toggleQLReg(e) {
    let bln = (e.checked) ? true : false;
    let day = e.id.substr(0, 3);

    byID(`${day}QL11`).checked = bln;
    setObject(`${day}QL11`);
    loadQL();
    getDailyTotals();
}

//IF J IS CHECKED, THEN CHECK ALL OF THEM
function toggleJReg(e) {
    let bln = (e.checked) ? true : false;
    let day = e.id.substr(0, 3);

    byID(`${day}J11`).checked = bln;
    setObject(`${day}J11`);
    loadJ();
    getDailyTotals();
}

//TOGGLE OW AND FT BOXES SO THAT THEY SHOW IF THEY HAVE VALUES
function toggleOWFT() {
    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            let bln = (objThis[day][`${day}Select${j}`] !== "" || objThis[day][`${day}Desc${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false
            showHide(`${day}OWDiv${j}`, bln);
        }
        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            let bln = (objThis[day][`${day}Voucher${j}`] !== "" || objThis[day][`${day}To${j}`] !== "" || objThis[day][`${day}From${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false;
            showHide(`${day}FTDiv${j}`, bln);
        }
    }
}

//TOGGLE LEAVE IF THERE IS LEAVE FILLED OUT
function toggleLeave() {
    for (const day of days) {
        if (day === "Sat" || day === "Sun") continue;

        let bln = (objThis[day][`${day}LeaveAD`] || objThis[day][`${day}Time40`] !== "" || objThis[day][`${day}Time41`] !== "") ? true : false;
        if (bln) {
            showHide(`${day}LVDivAD`, true);
            showHide(`${day}LVDiv40`, true);
            showHide(`${day}LVDiv41`, true);
        } else {
            resetElement(`${day}LeaveSelectAD`);
            resetElement(`${day}LeaveSelect40`);
            resetElement(`${day}LeaveSelect41`);
        }
    }
}

//TOGGLE DAILY COUNTS IN THE PUPIL COUNTS SECTION
function togglePupilCounts(x) {
    //Declare boolean used to add or remove class
    let bln = false;
    //Declare boolean for weekend
    let blnSS = (x === 6 || x === 0) ? true : false;
    //Declare boolean for Position
    let pos = objThis.Data.Position;

    if (pos === "Activity Driver" || pos === "Floater") {
        posAD();
        return;
    }

    let blnPos = (pos === "Driver" || pos === "Driver Trainee" || pos === "Sub Driver") ? true : false;
    showHide("PupilCounts", true);

    //Loop through days array
    for (let j = 1; j < 6; j++) {
        const day = days[j];
        bln = (x === j) ? true : false;
        bln = (blnPos) ? bln : false;
        for (let i = 1; i < 6; i += 1) {
            showHide(`div${day}AM${i}Ct`, bln);
            showHide(`div${day}PM${i}Ct`, bln);
            if (i < 3) {
                showHide(`div${day}PS${i}Ct`, bln);
                showHide(`div${day}SH${i}Ct`, bln);
                showHide(`div${day}LR${i}Ct`, bln);
            }
        }
        showHide(`${day}TimeAM`, bln);
        showHide(`${day}TimePM`, bln);
    }
    showHide("divAMCt", (blnSS) ? false : blnPos);
    showHide("divPMCt", (blnSS) ? false : blnPos);
    showHide("divPSCt", (blnSS) ? false : blnPos);
    showHide("divSHCt", (blnSS) ? false : blnPos);
    showHide("divLRCt", (blnSS) ? false : blnPos);
    showHide("divAMPupilTime", (blnSS) ? false : blnPos);
    showHide("divPMPupilTime", (blnSS) ? false : blnPos);
}

//TOGGLE BETWEEN TUTORIAL SLIDES
function changeModalSlide(dir) {
    let j = 0;
    let i = 0;
    for (i = 1; i < 5; i += 1) {
        if (!byID(`slide${i}`).classList.contains("hide")) break;
    }

    if (dir === 'r') {
        j = (i + 1 === 5) ? 1 : i + 1;
    } else {
        j = (i - 1 === 0) ? 4 : i - 1;
    }
    showHide(`slide${i}`, false);
    showHide(`slide${j}`, true);
}

//TOGGLE PUPIL COUNTS ON POSITION CHANGE
function positionChange(e) {
    for (let i = 0; i < 7; i++) {
        if (byID("today").innerHTML.substr(0, 3) === days[i]) {
            togglePupilCounts(i);
            break;
        }
    }
    //Reload J and QL because of Unassigned Attendants
    loadJ();
    loadQL();
}

//TOGGLE PUPIL COUNTS WHEN ACTIVITY DRIVER
function posAD() {
    const counts = document.getElementsByName('txtCt');
    for (const count of counts) {
        resetElement(count.id);
    }

    for (const route of routes) {
        resetElement(route);
    }

    for (const day of days) {
        if (day === "Sat" || day === "Sun") continue;
        resetElement(`${day}TimeA`);
        resetElement(`${day}TimeB`);
        resetElement(`${day}TimeC`);
        resetElement(`${day}TimeD`);
    }

    showHide("PupilCounts", false);
}

//MOVE NAV BAR TO THE RIGHT
function moveRightNavBar() {
    let current = byID("today").innerHTML;
    current = current.substr(0, 3);
    for (let i = 0; i < 7; i += 1) {
        if (current === days[i] && i < 6) {
            showHide(fullday[i], false);
            showHide(fullday[i + 1], true);
            toggleDay(i + 1);
        } else if (current === days[i] && i === 6) {
            showHide(fullday[i], false);
            showHide(fullday[0], true);
            toggleDay(0);
        } else {
            continue;
        }
    }
}

//MOVE NAV BAR TO THE LEFT
function moveLeftNavBar() {
    let current = byID("today").innerHTML;
    current = current.substr(0, 3);
    for (let i = 0; i < 7; i += 1) {
        if (current === days[i] && i > 0) {
            showHide(fullday[i], false);
            showHide(fullday[i - 1], true);
            toggleDay(i - 1);
        } else if (current === days[i] && i === 0) {
            showHide(fullday[i], false);
            showHide(fullday[6], true);
            toggleDay(6);
        } else {
            continue;
        }
    }
}
//SET AREA SELECTION AND THEN LOAD TEAM RADIO SELECTIONS
function radioAreaSelect(e) {
    objThis.Data.Team = "";
    loadTeamValues();
}

//OJT CHECKBOX CLICK
function checkOJT(e) {
    let refID = e.id;
    if (refID === "OJT") loadOJT();
    getDailyTotals();
}

function routeNameCheck() {
    loadQL();
    loadJ();
}

//CHECK ROUTES ENTERED TO SEE IF Q/L EXISTS
function routeCheck() {
    let bln = false;
    let val = "";
    for (const route of routes) {
        val = objThis.Data[route];
        if (val === null || val === "") continue;
        bln = (val.lastIndexOf("L") > 3 || val.lastIndexOf("Q") > 3) ? true : false;
        if (bln) return bln;
    }
    if (objThis.Data.Position === "Unassigned Attendant") bln = true;
    return bln;
}

//CHECK ROUTES ENTERED TO SEE IF J EXISTS
function routeCheckJ() {
    let bln = false;
    let val = "";
    for (const route of routes) {
        val = objThis.Data[route];
        if (val === null || val === "") continue;
        bln = (val.lastIndexOf("J") > 3) ? true : false;
        if (bln) return bln;
    }
    if (objThis.Data.Position === "Unassigned Attendant") bln = true;
    return bln;
}

//TOGGLE OTHER WORK FIELDS
function addOtherWork(e) {
    let dayVal = e.target.id.substr(0, 3);
    let countOW = getMissingOW(dayVal);
    if (countOW === 30) return;
    showHide(`${dayVal}OWDiv${countOW}`, true);
}

//TOGGLE FIELD TRIP FIELDS
function addFieldTrip(e) {
    let dayVal = e.target.id.substr(0, 3);
    let countFT = getMissingFT(dayVal);

    //Exit function if count is 5
    if (countFT === 35) return;
    showHide(`${dayVal}FTDiv${countFT}`, true);
}

//TOGGLE OTHER WORK AND FIELD TRIP FIELDS OFF
function removeOWFTLV(e) {
    let x = e.target.id.substr(-2);
    let type = e.target.id.substr(3, 2);
    let day = e.target.id.substr(0, 3);

    if (type === "FT") {
        showHide(`${day}${type}Div${x}`, false);
        resetElement(`${day}To${x}`);
        resetElement(`${day}From${x}`);
        resetElement(`${day}Voucher${x}`);
        resetElement(`${day}QL${x}`);
        if (day !== "Sat" && day !== "Sun") resetElement(`${day}OJT${x}`);
    } else if (type === "OW") {
        showHide(`${day}${type}Div${x}`, false);
        resetElement(`${day}Select${x}`);
        resetElement(`${day}Desc${x}`);
        byID(`${day}QL${x}`).disabled = true;
        resetElement(`${day}QL${x}`);
        if (day !== "Sat" && day !== "Sun") resetElement(`${day}OJT${x}`);
    } else if (type === "LV") {
        resetElement(`${day}LeaveSelect${x}`);
        if (x === 'AD') {
            resetElement(`${day}LeaveAD`);
            toggleADLeave(`${day}LeaveAD`);
        }
    }
    if (x !== 'AD') resetTime(day, x);
    getDailyTotals();
}

//CLEAR TIME FIELDS
function clearTimeField(e) {
    let day = e.target.id.substr(0, 3);
    let i = e.target.id.substr(10);

    if (i === "41") {
        resetElement(`${day}LeaveSelect${i}`);
        resetTime(day, i);
    } else if (i === "40") {
        resetElement(`${day}LeaveSelect${i}`);
        resetTime(day, i);
        resetElement(`${day}LeaveAD`);
        toggleADLeave(`${day}LeaveAD`);
    } else if (i === "AM") {
        resetElement(`${day}TimeA`);
        resetElement(`${day}TimeB`);
    } else if (i === "PM") {
        resetElement(`${day}TimeC`);
        resetElement(`${day}TimeD`);
    } else {
        resetTime(day, i);
        if (day !== "Sun" && day !== "Sat") resetElement(`${day}OJT${i}`)
    }
    getDailyTotals();
}

//FIGURE OUT WHICH OW FIELD IS NEXT TO SHOW
function getMissingOW(day) {
    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 23) return 30;
        if (byID(`${day}OWDiv${i}`).classList.contains("hide")) {
            return i;
        }
    }
    //If statement didnt' find a match, return 30
    return 30;
}

//FIGURE OUT WHICH FT FIELD IS NEXT TO SHOW
function getMissingFT(day) {
    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 33) return 35;
        if (byID(`${day}FTDiv${i}`).classList.contains("hide")) {
            return i;
        }
    }
    //if statement didn't find a match, return 35
    return 35;
}

//SHOW THE LEAVE SECTION
function addLeave(e) {
    let dayVal = e.target.id.substr(0, 3);
    if (dayVal === "" || dayVal === null) return;

    if (!byID(`${dayVal}LVDivAD`).classList.contains('hide')) {
        resetLeave(dayVal);
    } else {
        byID(`${dayVal}LVAdd`).innerHTML = '<span class="far fa-minus-square fa-lg"></span>Remove Leave</p>'
        showHide(`${dayVal}LVDivAD`, true);
        showHide(`${dayVal}LVDiv40`, true);
        showHide(`${dayVal}LVDiv41`, true);
    }
}

//SEPARATE FUNCTION FOR RESETTING LEAVE
function resetLeave(day) {
    byID(`${day}LVAdd`).innerHTML = '<span class="far fa-plus-square fa-lg"></span>Add Leave</p>'
    showHide(`${day}LVDivAD`, false);
    showHide(`${day}LVDiv40`, false);
    showHide(`${day}LVDiv41`, false);
    resetTime(day, 40);
    resetTime(day, 41);
    resetElement(`${day}LeaveSelectAD`);
    resetElement(`${day}LeaveSelect40`);
    resetElement(`${day}LeaveSelect41`);
    resetElement(`${day}LeaveAD`);
    toggleADLeave(`${day}LeaveAD`);
}

//GET ALL DAY LEAVE ON EVENT CLICK
function checkLeave(e) {
    toggleADLeave(e.id);
    getDailyTotals();
}

//TOGGLE LEAVE AND ELEMENTS FOR ALL DAY LEAVE
function toggleADLeave(refID) {
    let day = refID.substr(0, 3);
    let bln = (byID(refID).checked) ? true : false;
    let i = 0;

    showHide(`${day}OWAdd`, !bln);
    showHide(`${day}FTAdd`, !bln);
    if (bln) {
        //Uncheck Admin
        byID(`${day}J11`).checked = false;

        //Uncheck Equipment
        byID(`${day}QL11`).checked = false;

        //Clear Other work
        for (i = 20; i < 30; i += 1)
            byID(`${day}OWTrash${i}`).click();

        //Clear Field Trips
        for (i = 30; i < 35; i += 1)
            byID(`${day}FTTrash${i}`).click();

        //Clear regular run time
        for (i = 11; i < 18; i += 1) {
            resetTime(day, i);
            byID(`${day}OJT${i}`).checked = false;
        }
        //Clear partial leave time
        for (i = 40; i < 42; i += 1)
            resetTime(day, i);

        //Clear pupil counts
        for (i = 1; i < 6; i += 1) {
            resetElement(`${day}AM${i}Ct`);
            resetElement(`${day}PM${i}Ct`);
            if (i < 3) {
                resetElement(`${day}PS${i}Ct`);
                resetElement(`${day}SH${i}Ct`);
                resetElement(`${day}LR${i}Ct`);
            }
        }
        resetElement(`${day}TimeA`);
        resetElement(`${day}TimeB`);
        resetElement(`${day}TimeC`);
        resetElement(`${day}TimeD`);
    }
    if (routeCheckJ())
        byID(`${day}J11`).disabled = bln;
    else
        byID(`${day}J11`).disabled = true;

    if (routeCheck())
        byID(`${day}QL11`).disabled = bln;
    else
        byID(`${day}QL11`).disabled = true;

    for (i = 11; i < 18; i += 1) {
        byID(`${day}Time${i}`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        byID(`${day}Time${i}S`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        byID(`${day}Time${i}E`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        if (byID("OJT").checked)
            byID(`${day}OJT${i}`).disabled = bln;
        else
            byID(`${day}OJT${i}`).disabled = true;
    }
    for (i = 40; i < 42; i += 1) {
        byID(`${day}Time${i}`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        byID(`${day}Time${i}S`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        byID(`${day}Time${i}E`).style.backgroundColor = (bln) ? "lightgrey" : "white";
        disableElement(`${day}LeaveSelect${i}`, bln);
    }
    for (i = 1; i < 6; i += 1) {
        disableElement(`${day}AM${i}Ct`, bln);
        disableElement(`${day}PM${i}Ct`, bln);
        if (i < 3) {
            disableElement(`${day}PS${i}Ct`, bln);
            disableElement(`${day}SH${i}Ct`, bln);
            disableElement(`${day}LR${i}Ct`, bln);
        }
    }
    byID(`${day}TimeA`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}TimeB`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}TimeC`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}TimeD`).style.backgroundColor = (bln) ? "lightgrey" : "white";
}

//CLEAR LOCAL STORAGE AND RELOAD PAGE
function clearFields() {
    localStorage.removeItem(`${byID("WeekOf").value}Obj`);
    location.reload();
}

//OPEN SUPPLEMENT IN SAME WINDOW
function openSupplement() {
    showHide("navdropdown", false);
    window.open("index2.html", "_self");
}

//POP UP CT MESSAGE
function popUpCT() {
    openPopUp("<p class='varp'>&bull;Only record the routes, shuttles, middays, and late runs that are specifically assigned to you.</p><p class='varp'>&bull;Special Equipment pay will only be available if one of your routes ends with an 'L' or an 'EQ'</p><p class='varp'>&bull;Any other route that is covered for another driver and is outside of your regular hours should be recorded in the other work section.</p><p class='varp'>&bull;Record the number of students transported for each route for every day that was driven.</p><p class='varp'>&bull;In the Pupil Time section, enter the first pickup time and last drop off time for both morning and afternoon runs.</p>");
}

//ENABLE OR DISABLE QL BUTTON DEPENDING ON WHAT IS SELECTED FOR OTHER WORK
function selectOWChange(e) {
    disableOWFields(e.id);
}

function disableOWFields(refID) {
    let refVal = byID(refID).value;
    let day = refID.substr(0, 3);
    let x = refID.substr(9);
    let bln = (refVal === "FYI") ? true : false;
    byID(`${day}Time${x}S`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}Time${x}E`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`${day}Time${x}`).style.backgroundColor = (bln) ? "lightgrey" : "white";

    bln = (refVal === "Q/L") ? true : false;
    byID(`${day}QL${x}`).checked = bln;
    byID(`${day}QL${x}`).disabled = !bln;
    objThis[day][`${day}QL${x}`] = bln;
}

//COPY ROUTINE FOR REGULAR WORK HOURS
function copyRoutine(e) {
    activeID = e.target.id;
    if (e.target.id === "AMPupilcopy" || e.target.id === "PMPupilcopy") {
        let str = runPupilCopyRoutine();
        openPopUp('<p class="varp">Pupil time copied to the following day(s): ' + str + '.</p>');
    } else {
        let str = runCopyRoutine();
        openPopUp('<p class="varp">Regular work hours copied to the following day(s): ' + str + '.</p>');
    }
}

//COPY REGULAR RUN TIME TO OTHER DAYS
function runCopyRoutine() {
    showHide("variousModal", false);
    let k = 0;
    let bln = false;
    let str = "";
    let i = 0;

    for (i = 1; i < 5; i += 1) {
        k = (byID("today").innerHTML.substr(0, 3) === days[i]) ? i : 0;
        if (k === i) break;
    }

    k++;
    for (k; k < 6; k++) {
        let day = days[k];
        bln = (byID(`${day}LeaveAD`).checked || byID(`${day}Time40`).value !== '' || byID(`${day}Time41`).value !== '') ? true : false;
        if (bln) continue;
        for (let j = 11; j < 18; j++) {
            byID(`${day}Time${j}S`).value = byID(`${days[i]}Time${j}S`).value;
            setObject(`${day}Time${j}S`);
            byID(`${day}Time${j}E`).value = byID(`${days[i]}Time${j}E`).value;
            setObject(`${day}Time${j}E`);
            timeCalculation(`${day}Time${j}E`);
        }
        str += ", " + days[k];
    }
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//COPY PUPIL TIME TO OTHER DAYS
function runPupilCopyRoutine() {
    showHide("variousModal", false);
    let k = 0;
    let str = "";
    let i = 0;

    for (i = 1; i < 5; i += 1) {
        k = (byID("today").innerHTML.substr(0, 3) === days[i]) ? i : 0;
        if (k === i) break;
    }
    const day2 = days[i];
    k++;
    for (k; k < 6; k++) {
        const day = days[k];
        const bln = (byID(`${day}LeaveAD`).checked) ? true : false;
        if (bln) continue;
        byID(`${day}TimeA`).value = byID(`${day2}TimeA`).value;
        setObject(`${day}TimeA`);
        byID(`${day}TimeB`).value = byID(`${day2}TimeB`).value;
        setObject(`${day}TimeB`);
        byID(`${day}TimeC`).value = byID(`${day2}TimeC`).value;
        setObject(`${day}TimeC`);
        byID(`${day}TimeD`).value = byID(`${day2}TimeD`).value;
        setObject(`${day}TimeD`);
        str += ", " + day;
    }
    setStorage();
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//CHECK NUMBER OF OTHER WORK ENTRIES, IF MORE THAN 10 THEN GIVE POP UP ERROR MESSAGE
function countOtherWork(refID) {
    let count = 0;

    //Loop through each day of the week
    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            if (byID(`${day}Select${j}`).value !== "") count++;
        }
    }

    //Result of count
    if (count > 10) {
        openPopUp("<p class='varp'>&bull;The max number of other work duties is 10. A supplement must be made for any additional duties.</p>");
        byID(refID).value = "";
    }
}

//CHECK NUMBER OF FIELD TRIP ENTRIES, IF MORE THAN 5 THEN GIVE POP UP ERROR MESSAGE
function countFieldTrips(refID) {
    let count = 0;

    //Loop through each day of the week
    for (let i = 0; i < 7; i += 1) {
        for (let j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            if (byID(`${days[i]}Voucher${j}`).value !== "") count++;
        }
    }
    //Result of count
    if (count > 5) {
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>");
        byID(refID).value = "";
    }
}

/********************VALIDATION AND COMPLETION********************/
function completeTimesheet() {
    showHide("navdropdown", false);
    if (byID("WeekOf").value === "") return;
    let bln = runValidations();
    if (!bln)
        return;

    showHide("validateModal", true);
    byID("validateModal").focus();
}

function openTimesheet() {
    let emp = "";
    emp = byID("EmpInitials").value;
    emp = emp.toUpperCase();
    objThis.Data.EmpInitials = emp;

    showHide("validateModal", false);
    if (emp !== "") {
        getDailyTotals();

        //Set week value into local storage for preview and timesheet to use
        localStorage.setItem('WeekOf', byID("WeekOf").value);
        window.open("preview.html", "_self");
    }
}

function runValidations() {
    let val = "";

    val = testEmpData() + testOtherWork() + testFieldTrip() + testLeave() + testTimeComplete();
    if (objThis.Data.Area !== "TC") {
        val += testStopCounts();
    }

    if (val !== "") {
        openPopUp(val);
        return false;
    } else {
        return true;
    }
}

function testEmpData() {
    let val = "";

    //Check Area
    if (objThis.Data.Area === "")
        val += "<p class='varp'>&bull;Area not selected.</p>";

    //Check Team
    if (objThis.Data.Team === "")
        val += "<p class='varp'>&bull;Team not selected.</p>";

    //Check employee name
    if (objThis.Data.EmpName === "")
        val += "<p class='varp'>&bull;Employee name not entered</p>";

    //Check position
    if (objThis.Data.Position === "")
        val += "<p class='varp'>&bull;Employee position not selected.</p>";

    return val;
}

function testFieldTrip() {
    let val = "";
    let blnTime = false;

    //Check field trips
    for (let i = 0; i < 7; i += 1) {
        day = days[i];
        for (let j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            blnTime = (objThis[day][`${day}Time${j}`] !== "") ? true : false;
            if (blnTime && (objThis[day][`${day}Voucher${j}`] === "" || objThis[day][`${day}From${j}`] === "" || objThis[day][`${day}To${j}`] === ""))
                val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: Voucher, From and To fields cannot be blank.</p>";

            if ((objThis[day][`${day}Voucher${j}`] !== "" || objThis[day][`${day}From${j}`] !== "" || objThis[day][`${day}To${j}`] !== "") && !blnTime)
                val += "<p class='varp'>&bull;" + fullday[i] + "-Field Trip: No time entered.</p>";
        }
    }
    return val;
}

function testOtherWork() {
    let val = "";

    for (let i = 0; i < 7; i += 1) {
        let day = days[i];
        for (let j = 20; j < 30; j++) {
            if ((i === 0 || i === 6) && j > 22) continue;
            if (objThis[day][`${day}Time${j}`] === "" && objThis[day][`${day}Select${j}`] !== "" && objThis[day][`${day}Select${j}`] !== "FYI")
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: No time entered.</p>";

            if (objThis[day][`${day}Time${j}`] !== "" && objThis[day][`${day}Select${j}`] === "")
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Category is required.</p>";

            if ((objThis[day][`${day}Select${j}`] === "OT" || objThis[day][`${day}Select${j}`] === "FYI") && objThis[day][`${day}Desc${j}`] === "")
                val += "<p class='varp'>&bull;" + fullday[i] + "-Other Work: Description is required when Other or FYI selected.</p>";
        }
    }
    return val;
}

function testLeave() {
    let val = "";

    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 40; j < 42; j++) {
            if (byID(`${day}Time${j}`).value !== "") {
                if (byID(`${day}LeaveSelect${j}`).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID(`${day}LeaveSelect${j}`).value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
            }
            if (byID(`${day}LeaveAD`).checked) {
                if (byID(`${day}LeaveSelectAD`).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID(`${day}LeaveSelectAD`).value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: All day leave type selected but checkbox left unchecked.</p>";
            }
        }
    }
    return val;
}

function testStopCounts() {
    let val = "";
    let pos = objThis.Data.Position;

    if (objThis.Data.Area === "TC") return val;
    //Validate stop counts
    if (pos === "Driver" || pos === "Sub Driver" || pos === "Driver Trainee") {
        for (let i = 1; i < 6; i += 1) {
            let day = days[i];

            if (!testRegCounts(day, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM pupil counts not completed.</p>";

            if (!testRegPupil(day, "AM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": AM time entered with no routes specified.</p>";

            if (!testRegCounts(day, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM pupil counts not completed.</p>";

            if (!testRegPupil(day, "PM"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PM time entered with no routes specified.</p>";

            if (!testSpecCounts(day, "PS"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS pupil counts not completed.</p>";

            if (!testSpecPupil(day, "PS"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": PAC/PS time entered with no routes specified.</p>";

            if (!testSpecCounts(day, "SH"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle pupil counts not completed.</p>";

            if (!testSpecPupil(day, "SH"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Shuttle time entered with no shuttle specified.</p>";

            if (!testSpecCounts(day, "LR"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run pupil counts not completed.</p>";

            if (!testSpecPupil(day, "LR"))
                val += "<p class='varp'>&bull;" + fullday[i] + ": Late run time entered with no route specified.</p>";
        }
    }
    return val;
}

function testRegPupil(day, mer) {
    if (mer === 'AM' && byID(`${day}Time11`).value === "") return true;
    if (mer === 'PM' && byID(`${day}Time12`).value === "") return true;

    let ct = 0;
    for (let i = 1; i < 6; i += 1)
        if (byID(`${mer}Route${i}`).value !== "") ct++;

    return (ct > 0) ? true : false;
}

function testRegCounts(day, mer) {
    if (mer === 'AM' && byID(`${day}Time11`).value === "") return true;
    if (mer === 'PM' && byID(`${day}Time12`).value === "") return true;

    let ct = 0;
    for (let j = 1; j < 6; j++)
        if (byID(`${mer}Route${j}`).value !== "" && byID(`${day}${mer}${j}Ct`).value !== "") ct++;

    return (ct > 0) ? true : false;
}

function testSpecPupil(day, spec) {
    if (spec === 'PS' && byID(`${day}Time13`).value === "" && byID(`${day}Time14`).value === "") return true;
    if (spec === 'SH' && byID(`${day}Time15`).value === "" && byID(`${day}Time16`).value === "") return true;
    if (spec === 'LR' && byID(`${day}Time17`).value === "") return true;

    let ct = 0;
    if (byID(`${spec}Route1`).value !== "") ct++;
    if (byID(`${spec}Route2`).value !== "") ct++;

    return (ct > 0) ? true : false;
}

function testSpecCounts(day, spec) {
    if (spec === 'PS' && byID(`${day}Time13`).value === "" && byID(`${day}Time14`).value === "") return true;
    if (spec === 'SH' && byID(`${day}Time15`).value === "" && byID(`${day}Time16`).value === "") return true;
    if (spec === 'LR' && byID(`${day}Time17`).value === "") return true;

    let ct = 0;
    if (byID(`${spec}Route1`).value !== "" && byID(`${day}${spec}1Ct`).value !== "") ct++;
    if (byID(`${spec}Route2`).value !== "" && byID(`${day}${spec}2Ct`).value !== "") ct++;

    return (ct > 0) ? true : false;
}

function testTimeComplete() {
    let val = "";
    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 11; j < 17; j++) {
            if (byID(`${day}Time${j}S`).value !== "" && byID(`${day}Time${j}E`).value === "")
                val += "<p class='varp'>&bull;" + fullday[i] + ": Time not completed.</p>";
        }
    }
    return val;
}
/********************VALIDATION AND COMPLETION********************/
/********************CALCULATIONS********************/
//TEXTBOX UPDATE FUNCTION. CHECK FOR OVERLAPPING TIME AND THEN CALCULATE TOTAL TIME
function timeCalculation(refID) {
    let num = Number(refID.substr(-3, 2));
    let day = refID.substr(0, 3);

    //Check if field is used for pupil time, return if true
    if (isNaN(refID.substr(7, 2)))
        return;

    if (num > 19 && num < 30) {
        if (byID(`${day}Select${num}`).value === "") {
            openPopUp("<p>Work type must be selected first</p>");
            byID(refID).value = "";
            return;
        }
    }
    //Check for overlapping times
    checkOverlap(refID);

    //Calculate the difference in time
    calculateDiff(refID);

    objThis[day][refID] = byID(refID).value;
    getDailyTotals();
    setStorage();

    if (refID.substr(7, 2) > 19 && refID.substr(7, 2) < 30) {
        countOtherWork(refID);
    }

    if (refID.substr(7, 2) > 29 && refID.substr(7, 2) < 35) {
        countFieldTrips(refID);
    }
}

//CHECK FOR OVERLAPPING TIME VALUES
function checkOverlap(refID) {
    "use strict";

    //Define variables
    let bln = false;
    let newStart;
    let newEnd;

    //If element has no value then return
    if (byID(refID).value === "")
        return;

    //Initialize variables
    let thisStart = (refID.substr(-1) === "S") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 9) + "S").value);
    let thisEnd = (refID.substr(-1) === "E") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 9) + "E").value);
    if (thisStart === thisEnd) {
        openPopUp("<p>Start time cannot match end time.</p>");
        byID(refID).value = "";
        return;
    }
    let numVal = Number(refID.substr(7, 2));
    let day = refID.substr(0, 3);

    let max = (day === "Sat" || day === "Sun") ? 33 : 42;
    let i = (day === "Sat" || day === "Sun") ? 20 : 11;

    for (i; i < max; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 22 && i < 30) continue;
        if ((day === "Sat" || day === "Sun") && i > 32 && i < 35) continue;
        if (i === 18 || i === 19) continue;
        if (i > 34 && i < 40) continue;
        if (i === numVal) continue;

        //Initialize newStart and newEnd
        newStart = convertToMinutes(byID(`${day}Time${i}S`).value);
        //If newStart is blank then move to next i
        if (newStart === 0) continue;

        newEnd = convertToMinutes(byID(`${day}Time${i}E`).value);
        if (newEnd === 0) continue;
        if (newStart > 900 && newEnd < 120) newEnd += 1440; //If start time is more than 3:00 PM and end time overlaps past midnight, add 24 hours to end time

        if (newStart === thisStart) {
            bln = true;
        } else if (thisStart > 0 && thisStart > newStart && thisStart < newEnd) {
            bln = true;
        } else if (thisEnd > 0 && thisEnd > newStart && thisEnd < newEnd) {
            bln = true;
        } else if (thisStart === newStart) {
            bln = true;
        } else if (thisEnd === newEnd) {
            bln = true;
        } else if (thisStart < newStart && thisEnd > newEnd) {
            bln = true;
        }
        if (bln) break;
    }

    //If bln is true then there is an overlap
    if (bln) {
        openPopUp("<p>Overlap error</p>");
        byID(refID).value = "";
    }
}

//CALCULATE DIFFERENCE BETWEEN START AND END TIME
function calculateDiff(refID) {
    "use strict";
    //If refID is null or undefined then exit function
    if (refID === null || refID === undefined) return;
    let day = refID.substr(0, 3);

    //Declare variables and initialize values
    let startTime = (refID.substr(-1) === "S") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 9) + "S").value);
    let endTime = (refID.substr(-1) === "E") ? convertToMinutes(byID(refID).value) : convertToMinutes(byID(refID.substr(0, 9) + "E").value);
    let num = Number(refID.substr(7, 2));
    let timeDiff = 0;
    let totalID = refID.substr(0, refID.length - 1);

    //If end time is less than start time then pop up error message
    if (startTime > 900 && endTime < 120) endTime += 1440; //If start time is more than 3:00 PM and end time overlaps past midnight, add 24 hours to end time
    if ((endTime < startTime) && (endTime !== 0)) {
        openPopUp("<p>End time is less than start time</p>");
        byID(refID).value = "";
    } else {
        if (endTime === 0) endTime = startTime;

        timeDiff = endTime - startTime;

        if (num > 29)
            byID(totalID).value = convertTotal(timeDiff);
        else
            byID(totalID).value = calculateTotal(timeDiff);
    }
    //Set value of total into storage
    objThis[day][totalID] = byID(totalID).value;
}

//CALCULATE DAILY RUN TIME
function dailyRuns(day) {
    "use strict";
    if (day === "Sat" || day === "Sun") return;

    let sum = convertToMinutes(byID(`${day}Time11`).value);
    sum += convertToMinutes(byID(`${day}Time12`).value);
    sum += convertToMinutes(byID(`${day}Time13`).value);
    sum += convertToMinutes(byID(`${day}Time14`).value);
    sum += convertToMinutes(byID(`${day}Time15`).value);
    sum += convertToMinutes(byID(`${day}Time16`).value);
    sum += convertToMinutes(byID(`${day}Time17`).value);

    sum = calculateTotal(sum);
    sum = (sum === "") ? "" : sum;
    byID(`${day}RunTotal`).value = sum;
    objThis[day][`${day}RunTotal`] = sum;
}

//CALCULATE DAILY OTHER WORK TIME
function dailyOther(day) {
    "use strict";
    //Declare variables and initialize values
    let sum = 0;
    let selectVal;

    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 23) break;
        selectVal = byID(`${day}Select${i}`).value;
        if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
        sum += convertToMinutes(byID(`${day}Time${i}`).value);
    }
    sum = calculateTotal(sum);
    sum = (sum === "") ? "" : sum;
    byID(`${day}OtherTotal`).value = sum;
}

//CALCULATE CALLBACK TIME
function sumCPay() {
    "use strict";
    let c1 = 0;
    let c3 = 0;
    let sum = 0;
    let selectVal;

    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j === 23) break;
            selectVal = byID(`${day}Select${j}`).value;
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes(byID(`${day}Time${j}`).value) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
        }
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    objThis.Data.TotalC1 = c1;
    byID("TotalC1").value = c1;

    sum = convertTotal(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.TotalHW = sum;
    byID("TotalHW").value = sum;

    c3 = (c3 === 0) ? "" : convertTotal(c3);
    c3 = (c3 === "") ? "" : c3;
    objThis.Data.TotalC3 = c3;
    byID("TotalC3").value = c3;
}

//CALCULATE DAILY FIELD TRIP TIME
function dailyFT(day) {
    "use strict";
    //Declare variables and initialize values
    let sum = 0;

    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 33) break;
        sum += Number(byID(`${day}Time${i}`).value);
    }
    sum = setToFixed(sum);
    sum = (sum === "") ? "" : sum;
    byID(`${day}FTTotal`).value = sum;
}

//CALCULATE DAILY Q/L TIME
function dailyQL(day) {
    "use strict";
    let sum = 0;

    //If Q/L is checked, total up run, pac, shuttles, late run time
    if (day !== "Sat" && day !== "Sun" && byID(`${day}QL11`).checked) {
        for (let i = 11; i < 18; i += 1) {
            sum += convertToMinutes(byID(`${day}Time${i}`).value);
        }
    }

    //If Other Work Q/L is checked, add the time
    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 22) continue;
        sum += (byID(`${day}QL${i}`).checked) ? convertToMinutes(byID(`${day}Time${i}`).value) : 0;
    }

    //If Q/L is checked for field trips, add time
    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 32) continue;
        sum += (byID(`${day}QL${i}`).checked) ? (Number(byID(`${day}Time${i}`).value) * 60) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "") ? "" : sum;
    byID(`${day}QLTotal`).value = sum;
}

//Daily leave checkboxes
function checkLeaveToggle(refID) {
    "use strict";
    let day = refID.substr(0, 3);
    checkAllDayLeave(day);
}

//Toggle lift checkboxes on/off, set them in storage and run totals
function checkboxQL(refID) {
    let day = refID.substr(0, 3);

    objThis[day][refID] = byID(refID).checked;

    dailyQL(day);
}

function getDailyTotals() {
    for (const day of days) {
        dailyRuns(day);
        dailyOther(day);
        dailyFT(day);
        dailyQL(day);
    }
    getWeeklyTotals();
}

//Run calculations for the whole week and set the values into local storage
function getWeeklyTotals() {
    //Declare variables and initialize the values
    let sum = 0;

    //Clear Hours worked
    byID("TotalHW").value = "";
    objThis.Data.TotalHW = "";
    sumCPay();

    for (const day of weekdays) {
        for (let j = 11; j < 18; j++) {
            sum += convertToMinutes(byID(`${day}Time${j}`).value);
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.TotalRun = sum;
    byID("TotalRun").value = sum;

    sum = 0;
    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            let selectVal = byID(`${day}Select${j}`).value;
            if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
            sum += convertToMinutes(byID(`${day}Time${j}`).value);
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.TotalOther = sum;
    byID("TotalOther").value = sum;

    sum = 0;
    for (const day of days) {
        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            sum += Number(byID(`${day}Time${j}`).value);
        }
    }
    sum = setToFixed(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.TotalFT = sum;
    byID("TotalFT").value = sum;


    sum = convertToMinutes(objThis.Data.TotalRun) + convertToMinutes(objThis.Data.TotalOther);
    sum = Number(convertTotal(sum));
    sum += Number(objThis.Data.TotalFT);
    sum += Number(byID("TotalHW").value);
    sum = setToFixed(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.TotalHW = sum;
    byID("TotalHW").value = sum;

    sum = 0;
    for (const day of weekdays) {
        if (byID(`${day}QL11`).checked) {
            sum += convertToMinutes(byID(`${day}Time11`).value);
            sum += convertToMinutes(byID(`${day}Time12`).value);
            sum += convertToMinutes(byID(`${day}Time13`).value);
            sum += convertToMinutes(byID(`${day}Time14`).value);
            sum += convertToMinutes(byID(`${day}Time15`).value);
            sum += convertToMinutes(byID(`${day}Time16`).value);
            sum += convertToMinutes(byID(`${day}Time17`).value);
        }

        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            sum += (byID(`${day}QL${j}`).checked) ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
        }

        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            sum += (byID(`${day}QL${j}`).checked) ? (Number(byID(`${day}Time${j}`).value) * 60) : 0;
        }
    }
    sum = convertTotal(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.TotalS2QL = sum;
    byID("TotalS2QL").value = sum;

    sum = 0;
    for (const day of weekdays) {
        if (byID(`${day}J11`).checked) {
            sum += convertToMinutes(byID(`${day}Time11`).value);
            sum += convertToMinutes(byID(`${day}Time12`).value);
            sum += convertToMinutes(byID(`${day}Time13`).value);
            sum += convertToMinutes(byID(`${day}Time14`).value);
            sum += convertToMinutes(byID(`${day}Time15`).value);
            sum += convertToMinutes(byID(`${day}Time16`).value);
            sum += convertToMinutes(byID(`${day}Time17`).value);
        }
    }
    sum = convertTotal(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.TotalS4J = sum;
    byID("TotalS4J").value = sum;

    sum = convertToMinutes(objThis.Data.TotalRun) + convertToMinutes(objThis.Data.TotalOther);
    sum += (objThis.Data.Area === "TC") ? 0 : 15;
    sum = convertTotal(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.Total1R = sum;
    byID("Total1R").value = sum;

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!byID("OJT").checked) {
        setStorage();
        return;
    }

    for (const day of weekdays) {
        for (let j = 11; j < 18; j++) {
            sum += (byID(`${day}OJT${j}`).checked) ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
        }

        for (let j = 20; j < 30; j++) {
            sum += (byID(`${day}OJT${j}`).checked) ? convertToMinutes(byID(`${day}Time${j}`).value) : 0;
        }

        for (let j = 30; j < 35; j++) {
            sum += (byID(`${day}OJT${j}`).checked) ? (Number(byID(`${day}Time${j}`).value) * 60) : 0;
        }
    }
    sum = convertTotal(sum);
    sum = (sum === "") ? "" : sum;
    objThis.Data.TotalS4OJT = sum;
    byID("TotalS4OJT").value = sum;
    setStorage();
}
/********************CALCULATIONS********************/
