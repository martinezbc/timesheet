let activeID = "";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fullday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/********************EVENT LISTENERS********************/
let clickEvent = (function() {
    if ('ontouchstart' in document.documentElement === true)
        return 'touchstart';
    else
        return 'click';
})();

//Checkbox on click store into local storage
const main = document.getElementsByClassName('main')[0];
main.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox')
        setObject(e.target.id);
    else if (e.target.type === 'radio')
        storeRadioValue(e.target);
    
    const name = e.target.getAttribute('name');
    if (name ==='chkJ')
        toggleJReg(e.target);
    else if (name === 'chkOJT')
        checkOJT(e.target);
    else if (name === 'chkLV')
        checkLeave(e.target);
    else if (name === 'chkQL')
        toggleQLReg(e.target);
    else if (name === 'chkFTQL')
        getDailyTotals();
    else if (name === 'txtTime')
        openTimeSelector(e.target);
    else if (name === 'txtFT')
        openFTSelector(e.target);
    else if (name === 'chkADLV')
        toggleLeaveTime(e);

    const targetID = e.target.id;
    if (targetID === 'closeTime') {
        byID(activeID).disabled = false;
        showHide("timeModal", false);
    } else if (targetID === 'closeTimeS') {
        byID(activeID).disabled = false;
        showHide("timeModalS", false);
    } else if (targetID === 'closeFT') {
        byID(activeID).disabled = false;
        showHide("ftModal", false);
    } else if (targetID === 'closeFTS') {
        byID(activeID).disabled = false;
        showHide("ftModalS", false);
    } else if (targetID === 'endVarious') {
        showHide("variousModal", false);
    } else if (targetID === 'endVariousS') {
        showHide("variousModalS", false);
    } else if (targetID === 'endValidate') {
        showHide("validateModal", false);    
    } else if (targetID === 'endValidateS') {
        showHide("validateModalS", false);   
    } else if (targetID === 'ctspan') {
        popUpCT();
    } else if (targetID === 'goFT' || targetID === 'goFTS') {
        storeFTVal();
    } else if (targetID === 'endChanges') {
        showHide("changesModal", false);
    } else if (targetID === 'EmpInitials') {
        limitCharacters(e, 5);
    } else if (targetID === 'goTime') {
        goTime('');
    } else if (targetID === 'goTimeS') {
        goTime('S');
    }
});

main.addEventListener('change', (e) => {
    if (e.target.type === 'text' || e.target.type === 'number')
        textboxOnChange(e.target);
    else if (e.target.tagName === 'SELECT')
        setObject(e.target.id);
    
    const name = e.target.getAttribute('name');
    if (name === 'Area')
        radioAreaSelect(e.target);
    else if (name === 'Position')
        positionChange();
    else if (name === 'route')
        routeNameCheck();
    else if (name === 'selectOW')
        selectOWChange(e.target);
});

function arrayForEach(obj, event, func) {
    Array.from(obj).forEach( (e) => {
      e.addEventListener(event, func);
    });
}

//Up and Down arrow on click
arrayForEach(document.querySelectorAll('.up, .down, .up2, .down2'), 'click', timeSelectors);
arrayForEach(document.querySelectorAll('.addOW'), 'click', addOtherWork);
arrayForEach(document.querySelectorAll('.addFT'), 'click', addFieldTrip);
arrayForEach(document.querySelectorAll('.addLV'), 'click', (e) => {addLeave(e.target);});
arrayForEach(document.querySelectorAll('.fa-trash-alt'), 'click', removeOWFT);
arrayForEach(document.querySelectorAll('.ow'), 'click', popUpOW);
arrayForEach(document.querySelectorAll('.ft'), 'click', popUpFT);
arrayForEach(document.querySelectorAll('.fa-times'), 'click', clearTimeField);
arrayForEach(document.querySelectorAll("#Veh1, #Veh2, #Veh3, #Veh4"), 'keyup', (e) => {limitCharacters(e, 4)});
arrayForEach(document.querySelectorAll("#Veh1S, #Veh2S, #Veh3S, #Veh4S"), 'keyup', (e) => {limitCharacters(e, 4)});
arrayForEach(document.querySelectorAll("input[name='owdesc']"), 'keyup', limitOWDesc);

const header = document.getElementsByClassName('header')[0];
header.addEventListener(clickEvent, (e) => {
    if (e.target.id === 'divtutorial')
        showHide("changesModal", true);    
    else if (e.target.id === 'navbtn')
        showHide("navbtn", true);   
    else if (e.target.id === 'navbtnS')
        showHide("navbtnS", true);
    else if (e.target.id === 'divpreview')
        completeTimesheet();
    else if (e.target.id === 'divsupplement')
        openSupplement();
    else if (e.target.id === 'clear' || e.target.id === 'clearS')
        openPopUp('<p class="varp">You are about to clear all data from the timesheet. Are you sure you want to continue?&nbsp;<span class="fas fa-check-circle fa-lg" style="color:green;" onclick="clearFields()"></span></p>');
});
/********************EVENT LISTENERS********************/
/********************TIME PICKER********************/
//TIME SELECTOR MODAL
function openTimeSelector(e) {
    activeID = e.id;
    e.disabled = true;
    
    if (optVal === "S" && !checkOWFTDate(e.id)) return;
    
    let refVal = e.value;
    if (refVal === null) return;
    
    let blnPupil = (optVal === "" && activeID.substr(-1) !== "S" && activeID.substr(-1) !== "E") ? true : false;
    
    if (refVal !== "") {
        let hours = refVal.substr(0, refVal.indexOf(":"));
        let mins = refVal.substr(refVal.indexOf(":") + 1, 2);
        let mer = refVal.substr(-2);
        byID(`hours${optVal}`).innerHTML = hours;
        byID(`minutes${optVal}`).innerHTML = mins;
        byID(`meridiem${optVal}`).innerHTML = mer;
    } else {
        if (!blnPupil) {
            mins = round5(Number(byID(`minutes${optVal}`).innerHTML));
            if (mins < 10 && mins > -1) {
                mins = "0" + mins.toString();
            } else if (mins === 60) {
                mins = "55";
            }
            byID(`minutes${optVal}`).innerHTML = mins;
        }
    }
    showHide(`timeModal${optVal}`, true);
}
//ADD VALUE TO UP AND DOWN ARROWS IN TIME SELECTOR THEN OPEN CHANGE VALUE FUNCTION
function timeSelectors(e) {
    const refID = e.target.id;
    let strVal = refID.substr(2);
    let operator = "";
    switch (strVal) {
        case `up${optVal}`:
            operator = 1;
            break;
        case `down${optVal}`:
            operator = -1;
            break;
        case `up2${optVal}`:
            operator = 2;
            break;
        case `down2${optVal}`:
            operator = -2;
            break;
    }
    changeValue(operator, refID, activeID, optVal);
}
//TIME UPDATE STARTING FUNCTION
function changeValue(operator, clicked, refElement, optVal) {
    "use strict";
    let x = refElement.substr(-1);
    let blnPupil = (x === "A" || x === "B" || x === "C" || x === "D") ? true : false;

    let str = clicked.substr(0, 2);
    switch (str) {
        case "hr":
            setHours(operator, optVal);
            break;
        case "mn":
            if (blnPupil)
                setMinutesPupil(operator);
            else
                setMinutes(operator, optVal);
            break;
        default:
            setMeridiem(optVal);
    }
}
//CHANGE AM AND PM
function setMeridiem(optVal) {
    let meridiemText = "";
    const inputMeridiem = byID(`meridiem${optVal}`).innerHTML;
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    byID(`meridiem${optVal}`).innerHTML = meridiemText;
}
//CHANGE MINUTES BY 5
function setMinutes(operator, optVal) {
    let minutesText = "";
    const minutes = Number(byID(`minutes${optVal}`).innerHTML);
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
        setHours(1, optVal);
    } else if (minutesText < 0) {
        minutesText = 60 + Number(minutesText)
        setHours(-1, optVal);
    }
    if (minutesText < 10) 
        minutesText = "0" + minutesText;

    byID(`minutes${optVal}`).innerHTML = minutesText;
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
function setHours(operator, optVal) {
    let hoursText = "";
    let hours = Number(byID(`hours${optVal}`).innerHTML);
    hoursText = hours + operator;

    if (hoursText === 13) {
        hoursText = "1";
        if (operator === 2) {
            setMeridiem(optVal);
        }
    } else if (hoursText === 14) {
        hoursText = "2";
    } else if (hoursText === 0) {
        hoursText = "12";
    } else if (hoursText === -1 || (hoursText === 11 && operator < 0)) {
        hoursText = "11";
        setMeridiem(optVal);
    } else if (hoursText === 12 && operator > 0) {
        setMeridiem(optVal);
    } else if (hoursText === 10 && operator === -2) {
        setMeridiem(optVal);
    }
    byID(`hours${optVal}`).innerHTML = hoursText;
}
//USE SELECTED TIME
function goTime(optVal) {
    let timetext = byID(`hours${optVal}`).innerHTML;
    timetext += ":" + byID(`minutes${optVal}`).innerHTML;
    timetext += " " + byID(`meridiem${optVal}`).innerHTML;
    byID(activeID).disabled = false;
    byID(activeID).value = timetext;
    showHide(`timeModal${optVal}`, false);
    timeCalculation(activeID);
    setObject(activeID);
}
/********************TIME PICKER********************/
/********************LOCAL STORAGE********************/
//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage() {
    let week = byID(`WeekOf${optVal}`).value;
    
    localStorage.setItem(`${week}Obj`, JSON.stringify(objThis));
}
//SET ELEMENT VALUE INTO OBJECTS
function setObject(refID) {
    if (refID === `WeekOf${optVal}`) return;
    let day = getObjDay(refID.substr(0,3));

    if (byID(refID).getAttribute('type') === 'checkbox') {
        if (optVal === "") {
            objThis[day][refID] = (byID(refID).checked) ? true : false;  
        } else {
            objThis[refID] = (byID(refID).checked) ? true : false;
        } 
    } else {
        if (optVal === "") {
            objThis[day][refID] = byID(refID).value;
        } else {
            objThis[refID] = byID(refID).value;
        }
    }
    setStorage();
}
//SET RADIO SELECTION
function storeRadioValue(e) {
    let parent = e.parentNode.id;
    if (parent !== `divarea${optVal}` && parent !== `divposition${optVal}`) {
        parent = e.parentNode.parentNode.id;
    }
    parent = parent.replace('div','');
    if (optVal === 'S') parent = parent.replace('S', '');
    parent = properCase(parent);
    if (optVal === 'S') parent += 'S';
    
    if (optVal === "") {
        objThis.Data[parent] = e.value;
    } else {
        objThis[parent] = e.value;
    }
    getWeeklyTotals();
    setStorage();
}
//INPUT NUMBER AND INPUT TEXT ON CHANGE EVENT
function textboxOnChange(e) {
    if (e.id === `Trainee${optVal}` || e.id === `EmpName${optVal}`) {
        e.value = properCase(e.value);
    } else if (e.id === `EmpInitials${optVal}`) {
        e.value = e.value.toUpperCase();
    } else if (optVal === "" && e.id.indexOf("Route") > 0) {
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
        refVal = refVal.replace("AM","");
    if (refVal.lastIndexOf("PM") > 2)
        refVal = refVal.replace("PM","");
    
    refVal = refVal.trim();
    
    //Remove -
    if (refVal.lastIndexOf("-") > 0)
        refVal = refVal.replace("-","");
    
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
    for (let i = refVal.length; i >= 0 ; i--) {
        if (isNaN(refVal.substr(i,1)) && routeNum !== '') {
            routeName = refVal.substr(i,1) + routeName;
        } else if (!isNaN(refVal.substr(i,1))) {
            routeNum = refVal.substr(i,1) + routeNum;
        }
    }
    
    if (routeNum.substr(i, 1) === "7") {
        routeName = routeName + "7";
        routeNum = routeNum.substr(1);
    }
    
    if (routeName.indexOf("AIM") > -1 || routeName.indexOf("TSRC") > -1) {
        routeName = routeName + routeNum.substr(0,1);
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
    showHide(`ftModal${optVal}`, true);
    activeID = e.id;
    byID(`ftselector${optVal}`).value = "";
    byID(`fttype${optVal}`).value = "";
}

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    let ftText = "";
    let ftselect = byID(`ftselector${optVal}`).value;
    if (ftselect !== null && ftselect !== "")
        ftText = byID(`ftselector${optVal}`).value;
    else
        ftText = byID(`fttype${optVal}`).value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    byID(activeID).disabled = false;
    if (optVal === "") {
        objThis[activeID.substr(0,3)][activeID] = ftText;
    } else {
        objThis[activeID] = ftText;
    }
    showHide(`ftModal${optVal}`, false);
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
function limitCharacters(e, num) {
    let refVal = e.target.value;
    if (refVal.length > num) {
        openPopUp("<p class='letp'>Limit " + num + " characters.</p>");
        e.target.value = refVal.substr(0, num);
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
    let day = getObjDay(refID.substr(0,3));
    if (byID(refID).type === "checkbox") {
        if (optVal === "") {
            objThis[day][refID] = false;
        } else {
            objThis[refID] = false;
        }
        byID(refID).checked = false;
    } else {
        if (optVal === "") {
            objThis[day][refID] = "";
        } else {
            objThis[refID] = "";
        }
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
    let refID = (optVal === "S") ? "Time" + num : day + "Time" + num;
    resetElement(`${refID}E${optVal}`);
    resetElement(`${refID}S${optVal}`);
    resetElement(`${refID}${optVal}`);
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
    openPopUp("<p class='letp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, optValhuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br>&bull;2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>&bull;ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>&bull;CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>");
}
//POP UP FT MESSAGE
function popUpFT() {
    openPopUp("<p class='letp'>&bull;All field trips must include the voucher number, the original location, the destination, and the time.</p><p class='letp'>&bull;Check lift if the trip required a lift.</p><p class='letp'>&bull;The start and end time must match what was recorded on the voucher.</p>");
}
//OPEN POP UP MODAL FOR ERROR MESSAGES
function openPopUp(msgVal) {
    byID(`varDiv${optVal}`).innerHTML = msgVal;
    showHide(`variousModal${optVal}`, true);
}
/********************MODAL POP UP MESSAGES********************/
/********************TIME CALCULATIONS********************/
//CONVERT TIME COMPLETELY TO MINUTES
function convertToMinutes(s1) {
	"use strict";
    if (s1 === "" || s1 === null || s1 === undefined)
		return 0;
    
    let h = s1.substring(0, s1.indexOf(":"));
    
    if (h === "12" && s1.indexOf("AM") > 0)
		h = 0;
    
    h = h * 60;

    let m = round5(Number(s1.substr(s1.indexOf(":") + 1, 2))),
        b = m + h;

    if (s1.indexOf("PM") > 0 && h !== 720)
		b = b + 720;

    return b;
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