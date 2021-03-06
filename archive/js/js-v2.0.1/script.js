/********************TIME PICKER********************/
//TIME SELECTOR MODAL
function openTimeSelector(e) {
    const optVal = (getFileName() === "index2.html") ? "S" : "";
    //Set current element as activeID
    activeID = e.currentTarget.id;
    //Disabled current element
    e.currentTarget.disabled = true;
    //Check date field first
    if (optVal === "S" && !checkOWFTDate(e.currentTarget.id)) return;
    //Get value of element
    let refVal = byID(activeID).value;
    //If value is null then exit function
    if (refVal === null) return;
    //If pupil time element then blnPupil is true
    let blnPupil = (optVal === "" && activeID.substr(-1) !== "S" && activeID.substr(-1) !== "E") ? true : false;
    //if active element has data already, break time into hrs, mins, and mer and load into spans
    if (refVal !== "") {
        let hours = refVal.substr(0, refVal.indexOf(":"));
        let mins = refVal.substr(refVal.indexOf(":") + 1, 2);
        let mer = refVal.substr(-2);
        byID("hours" + optVal).innerHTML = hours;
        byID("minutes" + optVal).innerHTML = mins;
        byID("meridiem" + optVal).innerHTML = mer;
    } else {
        if (!blnPupil) {
            mins = round5(Number(byID("minutes" + optVal).innerHTML));
            if (mins < 10 && mins > -1) {
                mins = "0" + mins.toString();
            } else if (mins === 60) {
                mins = "55";
            }
            byID("minutes" + optVal).innerHTML = mins;
        }
    }
    showHide("timeModal" + optVal, true);
}
//ADD VALUE TO UP AND DOWN ARROWS IN TIME SELECTOR THEN OPEN CHANGE VALUE FUNCTION
function timeSelectors(e) {
    const optVal = (getFileName() === "index2.html") ? "S" : "";
    const refID = e.currentTarget.id;
    let strVal = refID.substr(2);
    let operator = "";
    switch (strVal) {
        case "up" + optVal:
            operator = 1;
            break;
        case "down" + optVal:
            operator = -1;
            break;
        case "up2" + optVal:
            operator = 2;
            break;
        case "down2" + optVal:
            operator = -2;
            break;
    }
    changeValue(operator, refID, activeID, optVal);
}
//TIME UPDATE STARTING FUNCTION
function changeValue(operator, clicked, refElement, optVal) {
    "use strict";
    optVal = (getFileName() === "index2.html") ? "S" : "";
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
    optVal = (optVal === undefined) ? "" : optVal;
    let meridiemText = "";
    const inputMeridiem = byID("meridiem" + optVal).innerHTML;
    if (inputMeridiem === "AM") {
        meridiemText = "PM";
    } else {
        meridiemText = "AM";
    }
    byID("meridiem" + optVal).innerHTML = meridiemText;
}
//CHANGE MINUTES BY 5
function setMinutes(operator, optVal) {
    optVal = (optVal === undefined) ? "" : optVal;
    let minutesText = "";
    const minutes = Number(byID("minutes" + optVal).innerHTML);
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

    byID("minutes" + optVal).innerHTML = minutesText;
}
//CHANGE MINUTES FOR PUPIL TIME BY 1
function setMinutesPupil(operator) {
    let minutesText = "",
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
function setHours(operator, optVal) {
    optVal = (optVal === undefined) ? "" : optVal;
    let hoursText = "";
    let hours = Number(byID("hours" + optVal).innerHTML);
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
    byID("hours" + optVal).innerHTML = hoursText;
}
/********************TIME PICKER********************/
/********************LOCAL STORAGE********************/
//SET VALUE INTO LOCAL STORAGE BY ELEMENT ID
function setStorage() {
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    let week = byID("WeekOf" + optVal).value;

    if (optVal === "") {
        let objArray = [objThisData, objThisSat, objThisSun, objThisMon, objThisTue, objThisWed, objThisThu, objThisFri];

        objThis = {Data : objThisData, Sat : objThisSat, Sun : objThisSun, Mon : objThisMon, Tue : objThisTue, Wed : objThisWed, Thu : objThisThu, Fri : objThisFri};   
    }
    
    localStorage.setItem(week + "Obj", JSON.stringify(objThis));
}
//SET ELEMENT VALUE INTO OBJECTS
function setObject(refID) {
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    if (refID === "WeekOf" + optVal) return;
    
    let obj = (optVal === "") ? getDayObj(refID.substr(0,3)) : "";
    if (byID(refID).getAttribute('type') === 'checkbox') {
        if (optVal === "") {
            obj[refID] = (byID(refID).checked) ? true : false;  
        } else {
            objThis[refID] = (byID(refID).checked) ? true : false;
        } 
    } else {
        if (optVal === "") {
            obj[refID] = byID(refID).value;
        } else {
            objThis[refID] = byID(refID).value;
        }
    }
    setStorage();
}
//SET RADIO SELECTION
function storeRadioValue(e) {
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    let parent = e.target.parentNode.id;
    if (parent !== 'divarea' + optVal && parent !== 'divposition' + optVal) {
        parent = e.target.parentNode.parentNode.id;
    }
    parent = parent.replace('div','');
    if (optVal === 'S') parent = parent.replace('S', '');
    parent = properCase(parent);
    if (optVal === 'S') parent += 'S';
    
    if (optVal === "") {
        objThisData[parent] = e.target.value;
    } else {
        objThis[parent] = e.target.value;
    }
    getWeeklyTotals();
    setStorage();
}
//INPUT NUMBER AND INPUT TEXT ON CHANGE EVENT
function textboxOnChange(e) {
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    let refID = e.currentTarget.id;
    if (refID === "Trainee" + optVal || refID === "EmpName" + optVal) {
        byID(refID).value = properCase(e.currentTarget.value);
    }
    if (refID === "EmpInitials" + optVal) {
        byID(refID).value = byID(refID).value.toUpperCase();
    }
    if (optVal === "" && refID.indexOf("Route") > 0)
        routeNameTransform(refID);
    setObject(refID);
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
    
    //Completely different setup for shuttle numbers
    if ((refID === "SHRoute1" || refID === "SHRoute2") && objThisData.Area !== "7"){
        for (let i = refVal.length; i >= 0; i--) {
            if (isNaN(refVal.substr(i,1))) {
                refVal = refVal.replace(refVal.substr(i,1),"");
            }
        }
        refVal = "S-" + refVal;
        byID(refID).value = refVal;
        return;
    }
    
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
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    showHide("ftModal" + optVal, true);
    activeID = e.currentTarget.id;
    byID("ftselector" + optVal).value = "";
    byID("fttype" + optVal).value = "";
}

//STORE SELECTION FROM FIELD TRIP MODAL
function storeFTVal() {
    let obj;
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    if (optVal === "") obj = getDayObj(activeID.substr(0,3));
    let ftText = "";
    let ftselect = byID("ftselector" + optVal).value;
    if (ftselect !== null && ftselect !== "")
        ftText = byID("ftselector" + optVal).value;
    else
        ftText = byID("fttype" + optVal).value;

    ftText = ftText.substr(0, 30);
    byID(activeID).value = ftText;
    byID(activeID).disabled = false;
    if (optVal === "") {
        obj[activeID] = ftText;
    } else {
        objThis[activeID] = ftText;
    }
    showHide("ftModal" + optVal, false);
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
    let refVal = byID(refID).value;
    if (refVal.length > num) {
        openPopUp("<p class='letp'>Limit " + num + " characters.</p>");
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
    let copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}
//GET NAME OF HTML FILE
function getFileName() {
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/')+1); 
    return filename;
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
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    let obj = "";
    
    if (byID(refID).type === "checkbox") {
        if (optVal === "") {
            obj = getDayObj(refID.substr(0,3));
            obj[refID] = false;
        } else {
            objThis[refID] = false;
        }
        byID(refID).checked = false;
    } else {
        if (optVal === "") {
            obj = getDayObj(refID.substr(0,3));
            obj[refID] = "";
        } else {
            objThis[refID] = "";
        }
        byID(refID).value = "";
    }
    
    setObject(refID);
}
//RESET TIME FIELDS
function resetTime(day, num) {
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    let refID = (optVal === "S") ? "Time" + num : day + "Time" + num;
    resetElement(refID + "E" + optVal);
    resetElement(refID + "S" + optVal);
    resetElement(refID + optVal);
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
    let optVal = (getFileName() === "index2.html") ? "S" : "";
    byID("varDiv" + optVal).innerHTML = msgVal;
    showHide("variousModal" + optVal, true);
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