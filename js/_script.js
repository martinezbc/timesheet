let activeID = "";

/********************EVENT LISTENERS********************/

function getDay() {
    return (optVal === "") ? byID('today').textContent.substr(0, 3) : "Sup";
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
    openPopUp("<p class='letp'>&bull;GARAGE TRIP: Scheduled/unscheduled maintenance and quick fixes performed at the garage or other location.<br>&bull;RUN COVERAGE: Routes covered for other drivers including middays, shuttles, and late runs.<br>&bull;RECERT: Recertification training<br>&bull;CPR/FIRST AID: CPR/First Aid training<br>&bull;MEETING: Any scheduled meeting such as team meetings, cold start meetings, meeting with mentor, etc.<br>&bull;TRAINING: Any other scheduled training other that First Aid, CPR, or Recert.<br>&bull;PHYSICAL/DRUG TEST: Yearly physical or random drug test<br>&bull;COLD START TEAM: Time worked for cold start team members<br><br>**REQUIRE ADMIN APPROVAL<br>**2 HOUR DELAY EARLY START: School opens on a 2 hour delay, employees called to work earlier than normally scheduled hours<br>**ON TIME EARLY START: School opens on time, employee called to work earlier than normally scheduled hours<br>**CALL BACK: Unexpectedly called back to work after business hours or on the weekend to address an emergency</p>");
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

//FIND STORED VALUE FOR AREA, TEAM, POSITION, WEEKOF AND LOAD INTO RADIO SELECTION
function loadRadioSelection() {
    const key = (optVal === "") ? "Data" : "Sup"
    const area = objThis[key]["Area"];
    const team = objThis[key]["Team"];
    let pos = objThis[key]["Position"];
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
    const key = (optVal === "") ? "Data" : "Sup"
    const area = objThis[key]["Area"];

    let areadiv = ["div1", "div2", "div3", "div4", "div7", "divTC"];
    for (const div of areadiv) {
        if ("div" + area === div)
            showHide(byID(div), true);
        else
            showHide(byID(div), false);
    }

    if (area === "TC") {
        byID("teamTC").checked = true;
        objThis[key]["Team"] = "TC";
    }
}

//LOAD Q/L CHECKBOXES, DISABLE/ENABLE THEM IF ROUTE HAS EQ OR L
function loadQL() {
    if (optVal === "") {
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
    let num = e.id.substr(-2);
    if (num < 18) {
        byID('QL11').checked = bln;
        setObject('QL11');
    }
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
function toggleOWFTLV() {
    const day = getDay();
    for (let j = 20; j < 30; j++) {
        if ((day === "Sat" || day === "Sun") && j > 22) continue;
        let bln = (objThis[day][`${day}Select${j}`] !== "" || objThis[day][`${day}Desc${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false
        byID(`Time${j}`).value = calculateTotal(calculateDiff(day, j));
        showHide(byID(`OWDiv${j}`), bln);
    }

    for (let j = 30; j < 35; j++) {
        if ((day === "Sat" || day === "Sun") && j > 32) continue;
        let bln = (objThis[day][`${day}Voucher${j}`] !== "" || objThis[day][`${day}To${j}`] !== "" || objThis[day][`${day}From${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false;
        byID(`Time${j}`).value = convertTotal(calculateDiff(day, j));
        if (day === "Sat" || day === "Sun") 
            byID(`NSD${j}`).checked = true;
        else
            byID(`NSD${j}`).checked = objThis[day][`${day}NSD${j}`];
        showHide(byID(`FTDiv${j}`), bln);
    }

    if (day !== "Sup") {
        toggleADLeave();
        let bln = (objThis[day][`${day}LeaveAD`] || objThis[day][`${day}Time40S`] !== "" || objThis[day][`${day}Time41S`] !== "") ? true : false;
        byID('LVAdd').innerHTML = (bln) ? '<span class="far fa-minus-square fa-lg"></span>Remove Leave' : '<span class="far fa-plus-square fa-lg"></span>Add Leave';
        showHide(byID('LVDivAD'), bln);
        showHide(byID('LVDiv40'), bln);
        showHide(byID('LVDiv41'), bln);
        byID(`Time40`).value = convertTotal(calculateDiff(day, 40));
        byID(`Time41`).value = convertTotal(calculateDiff(day, 41));
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

    setObject(`QL${x}`);
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

//Run calculations for the whole week and set the values into local storage
function setDataKeyValue(key, value) {
    if (optVal === "")
        objThis.Data[key] = value;
    else
        objThis.Sup[key] = value;
}
/********************CALCULATIONS********************/

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    const day = getDay();
    let ftText = "";
    let ftselect = byID('ftselector').value;
    if (ftselect !== null && ftselect !== "")
        ftText = byID('ftselector').value;
    else
        ftText = byID('fttype').value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    objThis[day][`${day}${activeID}`] = ftText;
    showHide(byID('ftModal'), false);
    setStorage();
}

//RESET VALUE OF ELEMENT
function resetElement(refID) {
    const day = getDay();
    const e = byID(refID);
    if (e.type === "checkbox") {
        objThis[day][`${day}${refID}`] = false;
        e.checked = false;
    } else {
        objThis[day][`${day}${refID}`] = "";
        e.value = "";
    }
}

//SET RADIO SELECTION
function storeRadioValue(e) {
    let parent = e.parentNode.id;
    if (parent !== 'divarea' && parent !== 'divposition') {
        parent = e.parentNode.parentNode.id;
    }
    parent = parent.replace('div', '');
    parent = properCase(parent);

    const key = (optVal === "") ? "Data" : "Sup";
    objThis[key][parent] = e.value;
    getWeeklyTotals();
    setStorage();
}

//SET ELEMENT VALUE INTO OBJECTS
function setObject(refID) {
    if (refID === 'WeekOf') return;
    const day = getDay();
    const e = byID(refID);
    const key = (optVal === "") ? "Data" : "Sup";

    if (e.classList.contains("data")) {
        objThis[key][refID] = e.value;
    } else if (refID === "OJT") {
        objThis[key][refID] = (e.checked) ? true : false;
    } else if (e.type === 'checkbox') {
        objThis[day][`${day}${refID}`] = (e.checked) ? true : false;
    } else {
        objThis[day][`${day}${refID}`] = e.value;
    }
    getDailyTotals();
    setStorage();
}

function completeTimesheet() {
    showHide(byID("navdropdown"), false);
    if (byID("WeekOf").value === "") return;
    let bln = runValidations();
    if (!bln)
        return;

    showHide(byID("validateModal"), true);
    byID("validateModal").focus();
}

function runValidations() {
    let val = "";

    val = testEmpData() + testOtherWork() + testFieldTrip() + testLeave() + testTimeComplete();
    if (optVal === "" && objThis.Data.Area !== "TC") {
        val += testStopCounts();
    }

    if (val !== "") {
        openPopUp(val);
        return false;
    } else {
        return true;
    }
}
