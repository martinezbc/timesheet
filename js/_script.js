let activeID = "";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fullday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/********************EVENT LISTENERS********************/

function byID(refID) {
    return document.getElementById(refID);
}

function getDay() {
    return (optVal === "") ? byID('today').textContent.substr(0, 3) : "";
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

arrEach(docObj(".chkJ"), 'click', (e) => {
    toggleJReg(e.target)
});
arrEach(docObj(".chkOJT"), 'click', (e) => {
    checkOJT(e.target)
});
arrEach(docObj(".chkLV"), 'click', () => {
    checkLeave();
});
arrEach(docObj(".chkQL"), 'click', (e) => {
    toggleQLReg(e.target)
});
arrEach(docObj(".txtTime"), 'click', (e) => {
    openTimeSelector(e.target);
});
arrEach(docObj(".txtFT"), 'click', (e) => {
    openFTSelector(e.target)
});

byID('closeTime').addEventListener('click', () => {
    showHide(byID("timeModal"), false);
});
byID('closeFT').addEventListener('click', () => {
    showHide(byID("ftModal"), false);
});
byID('endVarious').addEventListener('click', () => {
    showHide(byID("variousModal"), false);
});
byID('endValidate').addEventListener('click', () => {
    showHide(byID("validateModal"), false);
});

byID('goFT').addEventListener('click', storeFTVal);

byID('goTime').addEventListener('click', goTime);

arrEach(docObj("input[name='Area']"), 'change', (e) => {
    radioAreaSelect(e.target)
});
arrEach(docObj("input[name='Position']"), 'change', positionChange);
arrEach(docObj(".route"), 'change', routeNameCheck);
arrEach(docObj(".selectOW"), 'change', (e) => {
    selectOWChange(e.target)
});

arrEach(docObj('.chkJ'), 'click', (e) => {
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
arrEach(docObj(".owdesc"), 'keyup', limitOWDesc);
arrEach(docObj(".ftvoucher"), 'keyup', (e) => {
    limitCharacters(e, 6)
});
byID('EmpInitials').addEventListener('keyup', (e) => {
    if (e.target.value.length > 5) {
        e.target.value = e.target.value.substr(0, 5);
    }
});


byID('navbtn').addEventListener('click', (e) => {
    showHide(byID("navbtn"), true)
});

byID('clear').addEventListener('click', popUpClear);

let clickEvent = (document.ontouchstart !== null) ? 'click' : 'touchstart';

window.addEventListener(clickEvent, (event) => {
    var bln = byID("navdropdown").classList.contains("hide") ? true : false;

    if (event.target.id !== 'navbtn') {
        showHide(byID("navdropdown"), false);
    } else {
        showHide(byID("navdropdown"), bln);
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
        let mins = time[1].substr(0, 2);
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
    showHide(byID('timeModal'), true);
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
    showHide(byID('timeModal'), false);
    timeCalculation(activeID);
}
/********************TIME PICKER********************/
/********************LOCAL STORAGE********************/
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
/********************LOCAL STORAGE********************/
/********************FIELD TRIP SELECTOR********************/
//FIELD TRIP MODAL
function openFTSelector(e) {
    showHide(byID('ftModal'), true);
    activeID = e.id;
    byID('ftselector').value = "";
    byID('fttype').value = "";
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
function showHide(e, bln) {
    //(Show the element) ? remove hide : add hide
    if (bln) {
        if (e.classList.contains("hide")) e.classList.remove("hide");
    } else {
        if (!e.classList.contains("hide")) e.classList.add("hide");
    }
}

//RESET TIME FIELDS
function resetTime(num) {
    let refID = "Time" + num;
    resetElement(`${refID}E`);
    resetElement(`${refID}S`);
    resetElement(refID);
}
//DISABLE ELEMENTS AND CHANGE BACKGROUND COLOR
function disableElement(refID, bln) {
    if (bln) resetElement(refID);
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
    showHide(byID('variousModal'), true);
}
/********************MODAL POP UP MESSAGES********************/
/********************TIME CALCULATIONS********************/
//CONVERT TIME COMPLETELY TO MINUTES
function convertToMinutes(s1) {
    "use strict";
    if (s1 === "" || s1 === null || s1 === undefined || s1 === "")
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
    if (refVal === "" || refVal === null || refVal === undefined || refVal === "")
        return "";

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

byID("WeekOf").addEventListener('change', initialLoad);
const copy = docObj('.fa-copy');
Array.from(copy).forEach((e) => {
    e.addEventListener('click', copyRoutine);
});

function clearForm() {
    for (let i = 11; i < 41; i++) {
        if (i === 18 || i === 19 || (i > 34 && i < 40)) continue;
        byID(`Time${i}S`).value = "";
        byID(`Time${i}E`).value = "";
        byID(`Time${i}`).value = "";

        if (i === 11) {
            byID(`QL${i}`).checked = false;
            byID(`J${i}`).checked = false;
        }

        if (i < 35)
            byID(`OJT${i}`).checked = false;

        if (i >= 20 && i < 30) {
            byID(`QL${i}`).checked = false;
            byID(`Select${i}`).value = "";
            byID(`Desc${i}`).value = "";
        }

        if (i >= 30 && i < 35) {
            byID(`QL${i}`).checked = false;
            byID(`Voucher${i}`).value = "";
            byID(`To${i}`).value = "";
            byID(`From${i}`).value = "";
        }

        if (i > 39)
            byID(`LeaveSelect${i}`).value = "";
    }
    byID('LeaveAD').checked = false;
    byID('LeaveSelectAD').value = ""
    byID('RunTotal').value = "";
    byID('OtherTotal').value = "";
    byID('FTTotal').value = "";
    byID('QLTotal').value = "";
}

function limitOWDesc(e) {
    let num = e.target.id.substr(-2);
    if (byID(`Select${num}`).value === "FYI")
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

    byID("prev").innerHTML = `${days[prev]}-` + objThis.Data[`${days[prev]}Date`];
    byID("today").innerHTML = `${days[x]}-` + objThis.Data[`${days[x]}Date`];
    byID("next").innerHTML = `${days[next]}-` + objThis.Data[`${days[next]}Date`];
    byID("dailyP").innerHTML = fullday[x] + "-" + objThis.Data[`${days[x]}Date`];
    togglePupilCounts(x);
    loadLocalStorage(days[x])
    getDailyTotals();
    toggleOWFT();
    toggleLeave();
    loadOJT();
    loadQL();
    loadJ();
}

//LOAD OJT AND TRAINEE DATA; DISABLE/ENABLE ALL OTHER OJT CHECKBOXES
function loadOJT() {
    setDataKeyValue("OJT", byID("OJT").checked);
    let bln = byID("OJT").checked;

    if (bln) {
        byID('Trainee').disabled = false;
        byID('Trainee').style.backgroundColor = "white";
    } else {
        byID('Trainee').disabled = true;
        byID('Trainee').style.backgroundColor = "lightgrey";
        byID('Trainee').value = ""
        setObject("Trainee");
    }

    const chkOJT = docObj(".chkOJT");
    for (const ojt of chkOJT) {
        if (ojt.id === "OJT") continue;
        if (!byID('LeaveAD').checked)
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
    const day = getDay();

    let eql = docObj(".chkQL");
    if (!byID('LeaveAD').checked) {
        byID('QL11').disabled = !bln;
    } else {
        byID('QL11').disabled = true;
    }

    if (!bln) resetElement('QL11');

    for (let j = 20; j < 30; j++) {
        if ((day === "Sat" || day === "Sun") && j > 22) continue;
        disableOWFields(`Select${j}`);
    }
}

function loadJ() {
    let bln = routeCheckJ();

    if (!byID('LeaveAD').checked)
        byID('J11').disabled = !bln;
    else
        byID('J11').disabled = true;

    if (!bln) resetElement('J11');
}

//IF Q/L 11-17 IS CHECKED, THEN CHECK ALL OF THEM
function toggleQLReg(e) {
    let bln = (e.checked) ? true : false;

    byID('QL11').checked = bln;
    setObject('QL11');
    loadQL();
}

//IF J IS CHECKED, THEN CHECK ALL OF THEM
function toggleJReg(e) {
    let bln = (e.checked) ? true : false;

    byID('J11').checked = bln;
    setObject('J11');
    loadJ();
}

//TOGGLE OW AND FT BOXES SO THAT THEY SHOW IF THEY HAVE VALUES
function toggleOWFT() {
    const day = getDay();
    for (let j = 20; j < 30; j++) {
        if ((day === "Sat" || day === "Sun") && j > 22) continue;
        let bln = (objThis[day][`${day}Select${j}`] !== "" || objThis[day][`${day}Desc${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false
        showHide(byID(`OWDiv${j}`), bln);
    }

    for (let j = 30; j < 35; j++) {
        if ((day === "Sat" || day === "Sun") && j > 32) continue;
        let bln = (objThis[day][`${day}Voucher${j}`] !== "" || objThis[day][`${day}To${j}`] !== "" || objThis[day][`${day}From${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false;
        showHide(byID(`FTDiv${j}`), bln);
    }
}

//TOGGLE LEAVE IF THERE IS LEAVE FILLED OUT
function toggleLeave() {
    toggleADLeave();
    const day = getDay();

    let bln = (objThis[day][`${day}LeaveAD`] || objThis[day][`${day}Time40`] !== "" || objThis[day][`${day}Time41`] !== "") ? true : false;

    if (day === "Sat" || day === "Sun") bln = false;
    if (bln) {
        addLeave();
    } else {
        resetLeave(day);
    }
}

//TOGGLE DAILY COUNTS IN THE PUPIL COUNTS SECTION
function togglePupilCounts(x) {
    const day = days[x];
    //Declare boolean for weekend
    let blnSS = (x === 6 || x === 0) ? true : false;
    //Declare boolean for Position
    let pos = objThis.Data.Position;

    if (pos === "Activity Driver" || pos === "Floater") {
        posAD();
        return;
    }

    let blnPos = (pos === "Driver" || pos === "Driver Trainee" || pos === "Sub Driver") ? true : false;
    showHide(byID("PupilCounts"), !blnSS);



    for (let i = 1; i < 6; i++) {
        byID(`AM${i}Ct`).placeholder = day;
        showHide(byID(`AM${i}Ct`).parentElement, blnPos);
        byID(`PM${i}Ct`).placeholder = day;
        showHide(byID(`PM${i}Ct`).parentElement, blnPos);
        if (i < 3) {
            byID(`PS${i}Ct`).placeholder = day;
            showHide(byID(`PS${i}Ct`).parentElement, blnPos);
            byID(`SH${i}Ct`).placeholder = day;
            showHide(byID(`SH${i}Ct`).parentElement, blnPos);
            byID(`LR${i}Ct`).placeholder = day;
            showHide(byID(`LR${i}Ct`).parentElement, blnPos);
        }
    }
    showHide(byID("divAMPupilTime"), blnPos);
    showHide(byID("divAMPupilTime").nextElementSibling, blnPos);
    showHide(byID("divPMPupilTime"), blnPos);
    showHide(byID("divPMPupilTime").nextElementSibling, blnPos);

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
    showHide(byID(`slide${i}`), false);
    showHide(byID(`slide${j}`), true);
}

//TOGGLE PUPIL COUNTS ON POSITION CHANGE
function positionChange(e) {
    if (optVal !== "") return;
    for (let i = 0; i < 7; i++) {
        if (getDay() === days[i]) {
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

    for (const route of routes) {
        objThis.Data[route] = "";
        resetElement(route);
    }

    const counts = docObj('.txtCt');
    for (const day of weekdays) {
        objThis[day][`${day}QL11`] = false;
        objThis[day][`${day}J11`] = false;
        for (const count of counts) {
            objThis[day][`${day}${count.id}`] = "";
        }
        objThis[day][`${day}TimeA`] = "";
        objThis[day][`${day}TimeB`] = "";
        objThis[day][`${day}TimeC`] = "";
        objThis[day][`${day}TimeD`] = "";
    }
    setStorage();
    showHide(byID("PupilCounts"), false);
}

//MOVE NAV BAR TO THE RIGHT
function moveRightNavBar() {
    let current = getDay();
    for (let i = 0; i < 7; i += 1) {
        if (current === days[i] && i < 6) {
            toggleDay(i + 1);
        } else if (current === days[i] && i === 6) {
            toggleDay(0);
        } else {
            continue;
        }
    }
}

//MOVE NAV BAR TO THE LEFT
function moveLeftNavBar() {
    let current = getDay();
    for (let i = 0; i < 7; i += 1) {
        if (current === days[i] && i > 0) {
            toggleDay(i - 1);
        } else if (current === days[i] && i === 0) {
            toggleDay(6);
        } else {
            continue;
        }
    }
}
//SET AREA SELECTION AND THEN LOAD TEAM RADIO SELECTIONS
function radioAreaSelect(e) {
    setDataKeyValue("Team", "");
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
    if (optVal === "")
        if (!countOtherWork()) return;
    let countOW = getMissingOW();
    if (countOW === 30) return;
    showHide(byID(`OWDiv${countOW}`), true);
}

//TOGGLE FIELD TRIP FIELDS
function addFieldTrip(e) {
    if (optVal === "")
        if (!countFieldTrips()) return;
    let countFT = getMissingFT();

    //Exit function if count is 5
    if (countFT === 35) return;
    showHide(byID(`FTDiv${countFT}`), true);
}

//TOGGLE OTHER WORK AND FIELD TRIP FIELDS OFF
function removeOWFTLV(e) {
    let x = e.target.id.substr(-2);
    let type = e.target.id.substr(0, 2);
    const day = getDay();

    if (type === "FT") {
        showHide(byID(`${type}Div${x}`), false);
        resetElement(`To${x}`);
        resetElement(`From${x}`);
        resetElement(`Voucher${x}`);
        resetElement(`QL${x}`);
        if (day !== "Sat" && day !== "Sun") resetElement(`OJT${x}`);
    } else if (type === "OW") {
        showHide(byID(`${type}Div${x}`), false);
        resetElement(`Select${x}`);
        resetElement(`Desc${x}`);
        byID(`QL${x}`).disabled = true;
        resetElement(`QL${x}`);
        if (day !== "Sat" && day !== "Sun") resetElement(`OJT${x}`);
    } else if (type === "LV") {
        if (optVal === "") {
            resetElement(`LeaveSelect${x}`);
        } else {
            showHide(byID(`${type}Div${x}`), false);
            resetElement(`LeaveAD${x}`)
            resetElement(`Select${x}`);
        }
    }
    
    if (x !== 'AD') {
        resetTime(x);
    } else {
        resetElement(`LeaveAD`);
        toggleADLeave();
    }
    
    if (optVal === "") {
        getDailyTotals();
    } else {
        resetElement(`Date${x}`);
        getWeeklyTotals();
    }
}

//FIGURE OUT WHICH OW FIELD IS NEXT TO SHOW
function getMissingOW() {
    const day = getDay();
    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 23) return 30;
        if (byID(`OWDiv${i}`).classList.contains("hide")) {
            return i;
        }
    }
    //If statement didnt' find a match, return 30
    return 30;
}

//FIGURE OUT WHICH FT FIELD IS NEXT TO SHOW
function getMissingFT() {
    const day = getDay();
    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 33) return 35;
        if (byID(`FTDiv${i}`).classList.contains("hide")) {
            return i;
        }
    }
    //if statement didn't find a match, return 35
    return 35;
}

//GET ALL DAY LEAVE ON EVENT CLICK
function checkLeave() {
    toggleADLeave();
    getDailyTotals();
}

//TOGGLE LEAVE AND ELEMENTS FOR ALL DAY LEAVE
function toggleADLeave() {
    let day = getDay();
    let bln = (byID('LeaveAD').checked) ? true : false;
    let i = 0;

    showHide(byID('OWAdd'), !bln);
    showHide(byID('FTAdd'), !bln);

    disableElement('J11', routeCheckJ() ? bln : true);
    disableElement('QL11', routeCheck() ? bln : true);

    if (bln) {
        //Clear Other work
        for (i = 20; i < 30; i += 1)
            byID(`OWTrash${i}`).click();

        //Clear Field Trips
        for (i = 30; i < 35; i += 1)
            byID(`FTTrash${i}`).click();
    }

    //Clear regular run time
    for (i = 11; i < 18; i += 1) {
        disableElement(`Time${i}S`, bln);
        disableElement(`Time${i}E`, bln);
        disableElement(`Time${i}`, bln);
        disableElement(`OJT${i}`, bln);
    }
    //Clear partial leave time
    for (i = 40; i < 42; i += 1) {
        disableElement(`Time${i}S`, bln);
        disableElement(`Time${i}E`, bln);
        disableElement(`Time${i}`, bln);
        disableElement(`LeaveSelect${i}`, bln);
    }

    //Clear pupil counts
    for (i = 1; i < 6; i += 1) {
        disableElement(`AM${i}Ct`, bln);
        disableElement(`PM${i}Ct`, bln);
        if (i < 3) {
            disableElement(`PS${i}Ct`, bln);
            disableElement(`SH${i}Ct`, bln);
            disableElement(`LR${i}Ct`, bln);
        }
    }
    disableElement('TimeA', bln);
    disableElement('TimeB', bln);
    disableElement('TimeC', bln);
    disableElement('TimeD', bln);
}

//CLEAR LOCAL STORAGE AND RELOAD PAGE
function clearFields() {
    if (optVal === "") 
        localStorage.removeItem(`${byID("WeekOf").value}Obj`);
    else
        localStorage.removeItem(`${byID("WeekOf").value}ObjS`);
    location.reload();
}

//ENABLE OR DISABLE QL BUTTON DEPENDING ON WHAT IS SELECTED FOR OTHER WORK
function selectOWChange(e) {
    disableOWFields(e.id);
}

function disableOWFields(refID) {
    const day = getDay();
    let refVal = byID(refID).value;
    let x = refID.substr(-2);
    let bln = (refVal === "FYI") ? true : false;
    byID(`Time${x}S`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`Time${x}E`).style.backgroundColor = (bln) ? "lightgrey" : "white";
    byID(`Time${x}`).style.backgroundColor = (bln) ? "lightgrey" : "white";

    bln = (refVal === "Q/L") ? true : false;
    byID(`QL${x}`).checked = bln;
    byID(`QL${x}`).disabled = !bln;
    if (optVal === "")
        objThis[day][`${day}QL${x}`] = bln;
    else
        objThis[`QL${x}`] = bln;

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
    showHide(byID("variousModal"), false);
    let k = 0;
    let bln = false;
    let str = "";
    let i = 0;

    for (i = 1; i < 5; i += 1) {
        k = (getDay() === days[i]) ? i : 0;
        if (k === i) break;
    }
    const day = getDay();
    k++;
    for (k; k < 6; k++) {
        let day2 = days[k];
        bln = (objThis[day2][`${day2}LeaveAD`] || objThis[day2][`${day2}Time40`] !== '' || objThis[day2][`${day2}Time41`] !== '') ? true : false;
        if (bln) continue;
        for (let j = 11; j < 18; j++) {
            objThis[day2][`${day2}Time${j}S`] = objThis[day][`${day}Time${j}S`]
            objThis[day2][`${day2}Time${j}E`] = objThis[day][`${day}Time${j}E`];
            objThis[day2][`${day2}Time${j}`] = objThis[day][`${day}Time${j}`];
        }
        str += ", " + day2;
    }
    getWeeklyTotals();
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//COPY PUPIL TIME TO OTHER DAYS
function runPupilCopyRoutine() {
    showHide(byID("variousModal"), false);
    let k = 0;
    let str = "";
    let i = 0;

    for (i = 1; i < 5; i += 1) {
        k = (getDay() === days[i]) ? i : 0;
        if (k === i) break;
    }
    const day2 = days[i];
    k++;
    for (k; k < 6; k++) {
        const day = days[k];
        const bln = (byID('LeaveAD').checked) ? true : false;
        if (bln) continue;
        objThis[day][`${day}TimeA`] = objThis[day2][`${day2}TimeA`];
        objThis[day][`${day}TimeB`] = objThis[day2][`${day2}TimeB`];
        objThis[day][`${day}TimeC`] = objThis[day2][`${day2}TimeC`];
        objThis[day][`${day}TimeD`] = objThis[day2][`${day2}TimeD`];
        str += ", " + day;
    }
    setStorage();
    str = (str !== "") ? str.substr(2) : "";
    return str;
}

//CHECK NUMBER OF OTHER WORK ENTRIES, IF MORE THAN 10 THEN GIVE POP UP ERROR MESSAGE
function countOtherWork() {
    let count = 0;

    //Loop through each day of the week
    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            if (objThis[day][`${day}Select${j}`] !== "") count++;
        }
    }

    //Result of count
    if (count >= 10) {
        openPopUp("<p class='varp'>&bull;The max number of other work duties is 10. A supplement must be made for any additional duties.</p>");
        return false;
    } else {
        return true;
    }
}

//CHECK NUMBER OF FIELD TRIP ENTRIES, IF MORE THAN 5 THEN GIVE POP UP ERROR MESSAGE
function countFieldTrips() {
    let count = 0;

    //Loop through each day of the week
    for (const day of days) {
        for (let j = 30; j < 35; j++) {
            if ((day === "Sun" || day === "Sat") && j > 32) continue;
            if (objThis[day][`${day}Voucher${j}`] !== "") count++;
        }
    }
    //Result of count
    if (count >= 5) {
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>");
        return false;
    } else {
        return true;
    }
}

/********************VALIDATION AND COMPLETION********************/
function completeTimesheet() {
    showHide(byID("navdropdown"), false);
    if (byID("WeekOf").value === "") return;
    let bln = runValidations();
    if (!bln)
        return;

    showHide(byID("validateModal"), true);
    byID("validateModal").focus();
}

function openTimesheet() {
    let emp = "";
    emp = byID("EmpInitials").value;
    emp = emp.toUpperCase();
    objThis.Data.EmpInitials = emp;

    showHide(byID("validateModal"), false);
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
            if (byID(`Time${j}`).value !== "") {
                if (byID(`LeaveSelect${j}`).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID(`LeaveSelect${j}`).value !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
            }
            if (byID('LeaveAD').checked) {
                if (byID(`LeaveSelectAD`).value === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if (byID(`LeaveSelectAD`).value !== "")
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
    if (mer === 'AM' && byID(`Time11`).value === "") return true;
    if (mer === 'PM' && byID(`Time12`).value === "") return true;

    let ct = 0;
    for (let i = 1; i < 6; i += 1)
        if (byID(`${mer}Route${i}`).value !== "") ct++;

    return (ct > 0) ? true : false;
}

function testRegCounts(day, mer) {
    if (mer === 'AM' && byID(`Time11`).value === "") return true;
    if (mer === 'PM' && byID(`Time12`).value === "") return true;

    let ct = 0;
    for (let j = 1; j < 6; j++)
        if (byID(`${mer}Route${j}`).value !== "" && byID(`${mer}${j}Ct`).value !== "") ct++;

    return (ct > 0) ? true : false;
}

function testSpecPupil(day, spec) {
    if (spec === 'PS' && byID(`Time13`).value === "" && byID(`Time14`).value === "") return true;
    if (spec === 'SH' && byID(`Time15`).value === "" && byID(`Time16`).value === "") return true;
    if (spec === 'LR' && byID(`Time17`).value === "") return true;

    let ct = 0;
    if (byID(`${spec}Route1`).value !== "") ct++;
    if (byID(`${spec}Route2`).value !== "") ct++;

    return (ct > 0) ? true : false;
}

function testSpecCounts(day, spec) {
    if (spec === 'PS' && byID(`Time13`).value === "" && byID(`Time14`).value === "") return true;
    if (spec === 'SH' && byID(`Time15`).value === "" && byID(`Time16`).value === "") return true;
    if (spec === 'LR' && byID(`Time17`).value === "") return true;

    let ct = 0;
    if (byID(`${spec}Route1`).value !== "" && byID(`${spec}1Ct`).value !== "") ct++;
    if (byID(`${spec}Route2`).value !== "" && byID(`${spec}2Ct`).value !== "") ct++;

    return (ct > 0) ? true : false;
}

function testTimeComplete() {
    let val = "";
    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 11; j < 17; j++) {
            if (byID(`Time${j}S`).value !== "" && byID(`Time${j}E`).value === "")
                val += "<p class='varp'>&bull;" + fullday[i] + ": Time not completed.</p>";
        }
    }
    return val;
}
/********************VALIDATION AND COMPLETION********************/

//Run calculations for the whole week and set the values into local storage
function setDataKeyValue(key, value) {
    if (optVal === "")
        objThis.Data[key] = value;
    else
        objThis[key] = value;
}
/********************CALCULATIONS********************/
