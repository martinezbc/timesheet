let range = '';
$(document).ready(() => {
    let strHTML = '<option value="">--Select Week--</option>';
    for (let i = -21; i < 8; i += 7) {
        range = DateRange(i);
        strHTML += `<option value="${dateString(range)}">${range}</option>`;
    }
    $("#WeekOf").html(strHTML);
});


function DateRange(offset) {
    let start = new Date();
    let end = new Date();
    let options = {year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/New_York'};
    let day = start.getDay();
    let sOffset = -(day + 1) < -6 ? 0 : -(day + 1);
    let eOffset = sOffset + 6;
    start.setDate(start.getDate() + (sOffset + offset));
    end.setDate(end.getDate() + (eOffset + offset));

    return start.toLocaleDateString("en-US", options) + ' - ' + end.toLocaleDateString("en-US", options);
}

//REPLACE ALL FUNCTION
function replaceAll(text, find, replace){
  while (text.toString().indexOf(find) != -1)
      text = text.toString().replace(find, replace);
  return text;
}

//CONVERT DATE STRING INTO STRAIGHT NUMBERS ONLY
function dateString(strDate) {
    strDate = replaceAll(strDate, "/", "");
    return strDate.replace(" - ","");
}

//DECLARE VARIABLES
const routes = $('input[name="route"]');
let objThis = localStorage.getItem(`${$("#WeekOf").val()}Obj`);

$(document).ready(() => {
    if (localStorage.getItem("WeekOf") !== null) {
        $("#WeekOf").val(localStorage.getItem("WeekOf"));
        if ($("#WeekOf").val() === null || $("#WeekOf").val() === undefined)
            $("#WeekOf").prop('selectedIndex', 4);
        initialLoad();
    } else {
        $("#WeekOf").prop('selectedIndex', 4);
        initialLoad();
    }
});
              
$("#WeekOf").on('change', initialLoad);

//FIRST FUNCTION TO LOAD
function initialLoad() {
    if ($("#WeekOf").val() === "" || $("#WeekOf").val() === null) return;
    localStorage.setItem("WeekOf", $("#WeekOf").val());
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
            if ($("#" + key).val() === null) continue;
            if (value === true || value === false) {
                $("#" + key).prop('checked', value);
            } else {
                $("#" + key).val(value);
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
    $('input[name="Area"]').each((index, el) => {$(el).prop('checked', false)});
    if (area !== "") $("#area" + area).prop('checked', true);

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    $('input[name="Team"]').each((index, el) => {$(el).prop('checked', false)});
    if (team !== "" && (team.substr(0, 1) === area || area === '7')) $("#team" + team).prop('checked', true);
    
    //Load position from local storage and set radio selection
    $('input[name="Position"]').each((index, el) => {$(el).prop('checked', false)});
    if (pos !== "") {
        pos = pos.replace(" ", "");
        $("#pos" + pos).prop('checked', true);
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
        $("teamTC").prop('checked') = true;
        objThis.Data.Team = "TC";
    }

}

//LOADS DATES FROM STORAGE INTO DATE TEXT FIELDS
function loadStoredWeek() {
    if (objThis.Data.SatDate !== undefined)
        for (let i = 0; i < 7; i += 1)
            $(`#${days[i]}Date`).html(objThis.Data[`${days[i]}Date`]);
}

//GET DAY FROM LOCAL STORAGE OR CREATE A NEW WEEK IN LOCAL STORAGE
function storeWeek() {
    let week = $("#WeekOf").val();
    if (localStorage.getItem(`${week}Obj`) === null) {
        objThis = objNew;
        
        storeWeekDays(week);

        loadPrevWeek(week);
        objThis.Data.WeekOf = week;
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
    if ($(`#${day}Select${num}`).val() === "FYI")
        limitCharacters(e, 60);
    else
        limitCharacters(e, 35);
}


//PULL DATA FROM PREVIOUS WEEK INTO NEW WEEK
function loadPrevWeek(week) {
    let j = $("#WeekOf").prop('selectedIndex') - 1;
    if (j < 0) return;
    //Store first day of week range in y and shortened date in ny
    let prevweek = $("#WeekOf").prop('selectedIndex', j).val();
    if (localStorage.getItem(`${prevweek}Obj`) === null) return;
    objTemp = JSON.parse(localStorage.getItem(`${prevweek}Obj`));

    let i = 0;
    let keyArr = Object.keys(objThis.Data);
    for (i = 0; i < keyArr.length; i += 1) {
        if (keyArr[i].indexOf("Date") >= 0) continue;
        objThis.Data[keyArr[i]] = objTemp.Data[keyArr[i]];
    }
    for (let k = 1; k < 6; k++) {
        let day = days[k];
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
    if (x > 0 && x < 6) {
        showHide(fullday[x], true);
        $("#prev").html(`${days[x - 1]}-` + objThis.Data[`${days[x - 1]}Date`]);
        $("#today").html(`${days[x]}-` + objThis.Data[`${days[x]}Date`]);
        $("#next").html(`${days[x + 1]}-` + objThis.Data[`${days[x + 1]}Date`]);
    } else if (x === 0) {
        showHide(fullday[x], true);
        $("#prev").html(`${days[x + 6]}-` + objThis.Data[`${days[x + 6]}Date`]);
        $("#today").html(`${days[x]}-` + objThis.Data[`${days[x]}Date`]);
        $("#next").html(days[x + 1] + "-" + objThis.Data[`${days[x + 1]}Date`]);
    } else if (x === 6) {
        showHide(fullday[x], true);
        $("#prev").html(`${days[x - 1]}-` + objThis.Data[`${days[x - 1]}Date`]);
        $("#today").html(`${days[x]}-` + objThis.Data[`${days[x]}Date`]);
        $("#next").html(`${days[x - 6]}-` + objThis.Data[`${days[x - 6]}Date`]);
    }
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
    let bln = objThis.Data.OJT;
    let day = "";

    if (bln) {
        $("#Trainee").prop('disabled', false).css('backgroundColor', "white");
    } else {
        $("#Trainee").prop('disabled', true).css('backgroundColor', "lightgrey");
        resetElement("Trainee");
    }

    $("input[name='chkOJT']").each((index, el) => {
        let refID = $(el).attr('id');
        if (refID === "OJT" || refID === undefined) return;
        day = refID.substr(0, 3);
        
        if (!$(`#${day}LeaveAD`).prop('checked'))
            $(el).prop('disabled', !bln);
        else
            $(el).prop('disabled', true);
        
        if (!bln) resetElement(refID);
    });
}

//LOAD Q/L CHECKBOXES, DISABLE/ENABLE THEM IF ROUTE HAS EQ OR L
function loadQL() {
    let bln = routeCheck();
    let val = "";

    $.each(days, (i, day) => {
        if (day === "Sat" || day === "Sun") return;
        if (!$(`#${day}LeaveAD`).prop('checked'))
            $(`#${day}QL11`).prop('disabled', !bln);
        else
            $(`#${day}QL11`).prop('disabled', true);
        
        if (!bln) resetElement(`${day}QL11`);
    });
        
    $.each(days, (i, day) => {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) return;
            disableOWFields(`${day}Select${j}`);
        }
    });
}

function loadJ() {
    let bln = routeCheckJ();

    $.each(days, (i, day) => {
        if (day === "Sun" || day === "Sat") return;
        if (!$(`#${day}LeaveAD`).prop('checked'))
            $(`#${day}J11`).prop('disabled', !bln);
        else
            $(`#${day}J11`).prop('disabled', true);
        
        if (!bln) resetElement(`${day}J11`);
    });
}

//LOAD LEAVE AND TOGGLE FIELDS IF ALL DAY LEAVE IS CHECKED
function loadLeave() {
    $.each(days, (i, day) => {
        if (day === "Sun" || day === "Sat") return;
        toggleADLeave(`${day}LeaveAD`);
    });
}

//IF Q/L 11-17 IS CHECKED, THEN CHECK ALL OF THEM
function toggleQLReg(e) {
    let bln = $(e).prop('checked') ? true : false;
    let day = $(e).attr('id').substr(0, 3);

    $(`#${day}QL11`).prop('checked', bln);
    setObject(`${day}QL11`);
    loadQL();
    getDailyTotals();
}

//IF J IS CHECKED, THEN CHECK ALL OF THEM
function toggleJReg(e) {
    let bln = $(e).prop('checked') ? true : false;
    let day = $(e).attr('id').substr(0, 3);

    $(`#${day}J11`).prop('checked', bln);
    setObject(`${day}J11`);
    loadJ();
    getDailyTotals();
}

//TOGGLE OW AND FT BOXES SO THAT THEY SHOW IF THEY HAVE VALUES
function toggleOWFT() {
    $.each(days, (i, day) => {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) return;
            let bln = (objThis[day][`${day}Select${j}`] !== "" || objThis[day][`${day}Desc${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false
            showHide(`${day}OWDiv${j}`, bln);
        }
        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) return;
            let bln = (objThis[day][`${day}Voucher${j}`] !== "" || objThis[day][`${day}To${j}`] !== "" || objThis[day][`${day}From${j}`] !== "" || objThis[day][`${day}Time${j}`] !== "") ? true : false;
            showHide(`${day}FTDiv${j}`, bln);
        }
    });
}

//TOGGLE LEAVE IF THERE IS LEAVE FILLED OUT
function toggleLeave() {
    $.each(days, (i, day) => {
        if (day === "Sat" || day === "Sun") return;
                
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
    });
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
        if (!$(`#slide${i}`).hasClass("hide")) break;
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
        if ($("#today").html().substr(0, 3) === days[i]) {
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
    $('.txtCt').each((index, el) => {
        resetElement($(el).attr('id'));
    });
    
    $('.route').each((index, el) => {
        resetElement($(el).attr('id'));
    });
    
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
    let current = $("#today").html();
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
    let current = $("#today").html();
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
    $("input[name='route']").each((index, el) => {
        if ($(el).val() === null || $(el).val() === undefined) return; 
        bln = ($(el).val().lastIndexOf("L") > 3 || $(el).val().lastIndexOf("Q") > 3) ? true : false;
        if (bln) return bln;
    });
    if (objThis.Data.Position === "Unassigned Attendant") bln = true;
    return bln;
}

//CHECK ROUTES ENTERED TO SEE IF J EXISTS
function routeCheckJ() {
    let bln = false;
    let val = "";
    $("input[name='route']").each((index, el) => {
        if ($(el).val() === null || $(el).val() === undefined) return; 
        bln = ($(el).val().lastIndexOf("J") > 3) ? true : false;
        if (bln) return bln;
    });
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
        $(`#${day}QL${x}`).prop('disabled', true);
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
        if ($(`#${day}OWDiv${i}`).classList.contains("hide")) {
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
        if ($(`#${day}FTDiv${i}`).classList.contains("hide")) {
            return i;
        }
    }
    //if statement didn't find a match, return 35
    return 35;
}

//SHOW THE LEAVE SECTION
function addLeave(e) {
    let dayVal = e.target.id.substr(0, 3);
    
    if (!$(`#${dayVal}LVDivAD`).classList.contains('hide')) {
        resetLeave(dayVal);
    } else {
        $(`#${dayVal}LVAdd`).innerHTML = '<span class="far fa-minus-square fa-lg"></span>Remove Leave</p>'
        showHide(`${dayVal}LVDivAD`, true);
        showHide(`${dayVal}LVDiv40`, true);
        showHide(`${dayVal}LVDiv41`, true);
    }
}

//SEPARATE FUNCTION FOR RESETTING LEAVE
function resetLeave(day) {
    $(`#${day}LVAdd`).innerHTML = '<span class="far fa-plus-square fa-lg"></span>Add Leave</p>'
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
    let bln = ($("#" + refID).prop('checked')) ? true : false;
    let i = 0;

    showHide(`${day}OWAdd`, !bln);
    showHide(`${day}FTAdd`, !bln);
    if (bln) {
        //Uncheck Admin
        $(`#${day}J11`).prop('checked') = false;
        
        //Uncheck Equipment
        $(`#${day}QL11`).prop('checked') = false;
        
        //Clear Other work
        for (i = 20; i < 30; i += 1)
            $(`#${day}OWTrash${i}`).click();
        
        //Clear Field Trips
        for (i = 30; i < 35; i += 1)
            $(`#${day}FTTrash${i}`).click();
        
        //Clear regular run time
        for (i = 11; i < 18; i += 1) {
            resetTime(day, i);
            $(`#${day}OJT${i}`).prop('checked') = false;
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
        $(`#${day}J11`).prop('disabled', bln);
    else
        $(`#${day}J11`).prop('disabled', true);

    if (routeCheck())
        $(`#${day}QL11`).prop('disabled', bln);
    else
        $(`#${day}QL11`).prop('disabled', true);

    for (i = 11; i < 18; i += 1) {
        $(`#${day}Time${i}`).css("backgroundColor", (bln) ? "lightgrey" : "white");
        $(`#${day}Time${i}S`).css("backgroundColor", (bln) ? "lightgrey" : "white");
        $(`#${day}Time${i}E`).css("backgroundColor", (bln) ? "lightgrey" : "white");
        if ($("#OJT").prop('checked'))
            $(`#${day}OJT${i}`).prop('disabled', bln);
        else
            $(`#${day}OJT${i}`).prop('disabled', true);
    }
    for (i = 40; i < 42; i += 1) {
        $(`#${day}Time${i}`).css("backgroundColor", (bln) ? "lightgrey" : "white");
        $(`#${day}Time${i}S`).css("backgroundColor", (bln) ? "lightgrey" : "white");
        $(`#${day}Time${i}E`).css("backgroundColor", (bln) ? "lightgrey" : "white");
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
    $(`#${day}TimeA`).css("backgroundColor", (bln) ? "lightgrey" : "white");
    $(`#${day}TimeB`).css("backgroundColor", (bln) ? "lightgrey" : "white");
    $(`#${day}TimeC`).css("backgroundColor", (bln) ? "lightgrey" : "white");
    $(`#${day}TimeD`).css("backgroundColor", (bln) ? "lightgrey" : "white");
}

//CLEAR LOCAL STORAGE AND RELOAD PAGE
function clearFields() {
    localStorage.removeItem(`${$("#WeekOf").val()}Obj`);
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
    let refVal = $("#" + refID).val();
    let day = refID.substr(0, 3);
    let x = refID.substr(9);
    let bln = (refVal === "FYI") ? true : false;
    $(`#${day}Time${x}S`).css("backgroundColor", (bln) ? "lightgrey" : "white");
    $(`#${day}Time${x}E`).css("backgroundColor", (bln) ? "lightgrey" : "white");
    $(`#${day}Time${x}`).css("backgroundColor", (bln) ? "lightgrey" : "white");

    bln = (refVal === "Q/L") ? true : false;
    $(`#${day}QL${x}`).prop('checked', bln).prop('disabled', !bln);
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
        k = ($("#today").innerHTML.substr(0, 3) === days[i]) ? i : 0;
        if (k === i) break;
    }

    k++;
    for (k; k < 6; k++) {
        let day = days[k];
        bln = ($(`#${day}LeaveAD`).prop('checked') || $(`#${day}Time40`).val() !== '' || $(`#${day}Time41`).val() !== '') ? true : false;
        if (bln) continue;
        for (let j = 11; j < 18; j++) {
            $(`#${day}Time${j}S`).val($(`#${days[i]}Time${j}S`).val());
            setObject(`${day}Time${j}S`);
            $(`#${day}Time${j}E`).val($(`#${days[i]}Time${j}E`).val());
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
        k = ($("#today").html().substr(0, 3) === days[i]) ? i : 0;
        if (k === i) break;
    }
    const day2 = days[i];
    k++;
    for (k; k < 6; k++) {
        const day = days[k];
        const bln = ($(`#${day}LeaveAD`).prop('checked')) ? true : false;
        if (bln) continue;
        $(`#${day}TimeA`).val($(`#${day2}TimeA`).val());
        setObject(`${day}TimeA`);
        $(`#${day}TimeB`).val($(`#${day2}TimeB`).val());
        setObject(`${day}TimeB`);
        $(`#${day}TimeC`).val($(`#${day2}TimeC`).val());
        setObject(`${day}TimeC`);
        $(`#${day}TimeD`).val($(`#${day2}TimeD`).val());
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
            if ($(`#${day}Select${j}`).val() !== "") count++;
        }
    }

    //Result of count
    if (count > 10) {
        openPopUp("<p class='varp'>&bull;The max number of other work duties is 10. A supplement must be made for any additional duties.</p>");
        $("#" + refID).val("");
    }
}

//CHECK NUMBER OF FIELD TRIP ENTRIES, IF MORE THAN 5 THEN GIVE POP UP ERROR MESSAGE
function countFieldTrips(refID) {
    let count = 0;

    //Loop through each day of the week
    for (let i = 0; i < 7; i += 1) {
        for (let j = 30; j < 35; j++) {
            if ((i === 0 || i === 6) && j > 32) continue;
            if ($(`#${days[i]}Voucher${j}`).val() !== "") count++;
        }
    }
    //Result of count
    if (count > 5) {
        openPopUp("<p class='varp'>&bull;The max number of field trips is 5. A supplement must be made for any field trips.</p>");
        $("#" + refID).val("");
    }
}

/********************VALIDATION AND COMPLETION********************/
function completeTimesheet() {
    showHide("navdropdown", false);
    if ($("#WeekOf").val() === "") return;
    let bln = runValidations();
    if (!bln)
        return;

    showHide("validateModal", true);
    $("#validateModal").focus();
}

function openTimesheet() {
    let emp = "";
    emp = $("#EmpInitials").val();
    emp = emp.toUpperCase();
    objThis.Data.EmpInitials = emp;

    showHide("validateModal", false);
    if (emp !== "") {
        getDailyTotals();

        //Set week value into local storage for preview and timesheet to use
        localStorage.setItem('WeekOf', $("#WeekOf").val());
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
            if ($(`#${day}Time${j}`).val() !== "") {
                if ($(`#${day}LeaveSelect${j}`).val() === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if ($(`#${day}LeaveSelect${j}`).val() !== "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Leave type selected but no time was entered.</p>";
            }
            if ($(`#${day}LeaveAD`).prop('checked')) {
                if ($(`#${day}LeaveSelectAD`).val() === "")
                    val += "<p class='varp'>&bull;" + fullday[i] + "-Leave: Type of leave is required.</p>";
            } else {
                if ($(`#${day}LeaveSelectAD`).val() !== "")
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
    if (mer === 'AM' && $(`#${day}Time11`).val() === "") return true;
    if (mer === 'PM' && $(`#${day}Time12`).val() === "") return true;    

    let ct = 0;
    for (let i = 1; i < 6; i += 1)
        if ($(`#${mer}Route${i}`).val() !== "") ct ++;
    
    return (ct > 0) ? true : false;
}

function testRegCounts(day, mer) {
    if (mer === 'AM' && $(`#${day}Time11`).val() === "") return true;
    if (mer === 'PM' && $(`#${day}Time12`).val() === "") return true;
    
    let ct = 0;
    for (let j = 1; j < 6; j++)
        if ($(`#${mer}Route${j}`).val() !== "" && $(`#${day}${mer}${j}Ct`).val() !== "") ct++;
    
    return (ct > 0) ? true : false;
}

function testSpecPupil(day, spec) {
    if (spec === 'PS' && $(`#${day}Time13`).val() === "" && $(`#${day}Time14`).val() === "") return true;
    if (spec === 'SH' && $(`#${day}Time15`).val() === "" && $(`#${day}Time16`).val() === "") return true;
    if (spec === 'LR' && $(`#${day}Time17`).val() === "") return true;

    let ct = 0;
    if ($(`#${spec}Route1`).val() !== "") ct ++;
    if ($(`#${spec}Route2`).val() !== "") ct ++;
    
    return (ct > 0) ? true : false;
}

function testSpecCounts(day, spec) {
    if (spec === 'PS' && $(`#${day}Time13`).val() === "" && $(`#${day}Time14`).val() === "") return true;
    if (spec === 'SH' && $(`#${day}Time15`).val() === "" && $(`#${day}Time16`).val() === "") return true;
    if (spec === 'LR' && $(`#${day}Time17`).val() === "") return true;

    let ct = 0;
    if ($(`#${spec}Route1`).val() !== "" && $(`#${day}${spec}1Ct`).val() !== "") ct++;
    if ($(`#${spec}Route2`).val() !== "" && $(`#${day}${spec}2Ct`).val() !== "") ct++;
    
    return (ct > 0) ? true : false;
}

function testTimeComplete() {
    let val = "";
    for (let i = 1; i < 6; i += 1) {
        let day = days[i];
        for (let j = 11; j < 17; j++) {
            if ($(`#${day}Time${j}S`).val() !== "" && $(`#${day}Time${j}E`).val() === "")
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
        if ($(`#${day}Select${num}`).val() === "") {
            openPopUp("<p>Work type must be selected first</p>");
            $("#" + refID).val("");
            return;
        }
    }
    //Check for overlapping times
    checkOverlap(refID);

    //Calculate the difference in time
    calculateDiff(refID);

    getDailyTotals();

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
    if ($("#" + refID).val() === "")
        return;

    //Initialize variables
    let thisStart = (refID.substr(-1) === "S") ? convertToMinutes($("#" + refID).val()) : convertToMinutes($(refID.substr(0, 9) + "S").val());
    let thisEnd = (refID.substr(-1) === "E") ? convertToMinutes($("#" + refID).val()) : convertToMinutes($(refID.substr(0, 9) + "E").val());
    if (thisStart === thisEnd) {
        openPopUp("<p>Start time cannot match end time.</p>");
        $("#" + refID).val("");
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
        newStart = convertToMinutes($(`#${day}Time${i}S`).val());
        //If newStart is blank then move to next i
        if (newStart === 0) continue;

        newEnd = convertToMinutes($(`#${day}Time${i}E`).val());
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
        $("#" + refID).val("");
    }
}

//CALCULATE DIFFERENCE BETWEEN START AND END TIME
function calculateDiff(refID) {
    "use strict";
    //If refID is null or undefined then exit function
    if (refID === null || refID === undefined) return;
    let day = refID.substr(0, 3);

    //Declare variables and initialize values
    let startTime = (refID.substr(-1) === "S") ? convertToMinutes($("#" + refID).val()) : convertToMinutes($(refID.substr(0, 9) + "S").val());
    let endTime = (refID.substr(-1) === "E") ? convertToMinutes($("#" + refID).val()) : convertToMinutes($(refID.substr(0, 9) + "E").val());
    let num = Number(refID.substr(7, 2));
    let timeDiff = 0;
    let totalID = refID.substr(0, refID.length - 1);

    //If end time is less than start time then pop up error message
    if (startTime > 900 && endTime < 120) endTime += 1440; //If start time is more than 3:00 PM and end time overlaps past midnight, add 24 hours to end time
    if ((endTime < startTime) && (endTime !== 0)) {
        openPopUp("<p>End time is less than start time</p>");
        $("#" + refID).val("");
    } else {
        if (endTime === 0) endTime = startTime;

        timeDiff = endTime - startTime;

        if (num > 29)
            $(totalID).val(convertTotal(timeDiff));
        else
            $(totalID).val(calculateTotal(timeDiff));
    }
    //Set value of total into storage
    objThis[day][totalID] = $(totalID).val();
}

//CALCULATE DAILY RUN TIME
function dailyRuns(day) {
    "use strict";
    if (day === "Sat" || day === "Sun") return;

    let sum = 0;
    for (let i = 11; i < 18; i += 1) {
        sum += convertToMinutes($(`#${day}Time${i}`).val());
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    $(`#${day}RunTotal`).val(sum);
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
        selectVal = $(`#${day}Select${i}`).val();
        if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
        sum += convertToMinutes($(`#${day}Time${i}`).val());
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    $(`#${day}OtherTotal`).val(sum);
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
            selectVal = $(`#${day}Select${j}`).val();
            c1 += (selectVal === "CBK") ? 240 : 0;
            c3 += (selectVal === "ES0") ? convertToMinutes($(`#${day}Time${j}`).val()) : 0;
            c3 += (selectVal === "ES2") ? convertToMinutes($(`#${day}Time${j}`).val()) + 120 : 0;
            sum += (selectVal === "CBK" || selectVal === "ES2" || selectVal === "ES0") ? convertToMinutes($(`#${day}Time${j}`).val()) : 0;
        }
    }

    c1 = (c1 === 0) ? "" : convertTotal(c1);
    objThis.Data.TotalC1 = c1;
    $("#TotalC1").val(c1);

    sum = convertTotal(sum);
    objThis.Data.TotalHW = sum;
    $("#TotalHW").val(sum);

    c3 = (c3 === 0) ? "" : convertTotal(c3);
    objThis.Data.TotalC3 = c3;
    $("#TotalC3").val(c3);
}

//CALCULATE DAILY FIELD TRIP TIME
function dailyFT(day) {
    "use strict";
    //Declare variables and initialize values
    let sum = 0;

    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i === 33) break;
        sum += Number($(`#${day}Time${i}`).val());
    }
    sum = setToFixed(sum);
    $(`#${day}FTTotal`).val(sum);
}

//CALCULATE DAILY Q/L TIME
function dailyQL(day) {
    "use strict";
    let sum = 0;

    //If Q/L is checked, total up run, pac, shuttles, late run time
    if (day !== "Sat" && day !== "Sun" && $(`#${day}QL11`).prop('checked')) {
        for (let i = 11; i < 18; i += 1) {
            sum += convertToMinutes($(`#${day}Time${i}`).val());
        }
    }

    //If Other Work Q/L is checked, add the time
    for (let i = 20; i < 30; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 22) continue;
        sum += ($(`#${day}QL${i}`).prop('checked')) ? convertToMinutes($(`#${day}Time${i}`).val()) : 0;
    }

    //If Q/L is checked for field trips, add time
    for (let i = 30; i < 35; i += 1) {
        if ((day === "Sat" || day === "Sun") && i > 32) continue;
        sum += ($(`#${day}QL${i}`).prop('checked')) ? (Number($(`#${day}Time${i}`).val()) * 60) : 0;
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    $(`#${day}QLTotal`).val(sum);
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

    objThis[day][refID] = $("#" + refID).prop('checked');
    
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
    $("#TotalHW").val("");
    objThis.Data.TotalHW = "";
    sumCPay();

    for (const day of days) {
        if (day === "Sat" || day === "Sun") continue;
        for (let j = 11; j < 18; j++) {
            sum += convertToMinutes($(`#${day}Time${j}`).val());
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    objThis.Data.TotalRun = sum;
    $("#TotalRun").val(sum);

    sum = 0;
    for (const day of days) {
        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            let selectVal = $(`#${day}Select${j}`).val();
            if (selectVal === "CBK" || selectVal === "ES0" || selectVal === "ES2" || selectVal === "") continue;
            sum += convertToMinutes($(`#${day}Time${j}`).val());
        }
    }
    sum = calculateTotal(sum);
    sum = (sum === "0:00") ? "" : sum;
    objThis.Data.TotalOther = sum;
    $("#TotalOther").val(sum);

    sum = 0;
    for (const day of days) {
        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            sum += Number($(`#${day}Time${j}`).val());
        }
    }
    sum = setToFixed(sum);
    objThis.Data.TotalFT = sum;
    $("#TotalFT").val(sum);


    sum = convertToMinutes(objThis.Data.TotalRun) + convertToMinutes(objThis.Data.TotalOther);
    sum = Number(convertTotal(sum));
    sum += Number(objThis.Data.TotalFT);
    sum += Number($("#TotalHW").val());
    sum = setToFixed(sum);
    objThis.Data.TotalHW = sum;
    $("#TotalHW").val(sum);

    sum = 0;
    for (const day of days) {
        if (day !== "Sun" && day !== "Sat" && $(`#${day}QL11`).prop('checked')) {
            sum += convertToMinutes($(`#${day}Time11`).val());
            sum += convertToMinutes($(`#${day}Time12`).val());
            sum += convertToMinutes($(`#${day}Time13`).val());
            sum += convertToMinutes($(`#${day}Time14`).val());
            sum += convertToMinutes($(`#${day}Time15`).val());
            sum += convertToMinutes($(`#${day}Time16`).val());
            sum += convertToMinutes($(`#${day}Time17`).val());
        }

        for (let j = 20; j < 30; j++) {
            if ((day === "Sat" || day === "Sun") && j > 22) continue;
            sum += ($(`#${day}QL${j}`).prop('checked')) ? convertToMinutes($(`#${day}Time${j}`).val()) : 0;
        }

        for (let j = 30; j < 35; j++) {
            if ((day === "Sat" || day === "Sun") && j > 32) continue;
            sum += ($(`#${day}QL${j}`).prop('checked')) ? (Number($(`#${day}Time${j}`).val()) * 60) : 0;
        }
    }
    sum = convertTotal(sum);
    objThis.Data.TotalS2QL = sum;
    $("#TotalS2QL").val(sum);

    sum = 0;
    for (const day of days) {
        if (day !== "Sun" && day !== "Sat" && $(`#${day}J11`).prop('checked')) {
            sum += convertToMinutes($(`#${day}Time11`).val());
            sum += convertToMinutes($(`#${day}Time12`).val());
            sum += convertToMinutes($(`#${day}Time13`).val());
            sum += convertToMinutes($(`#${day}Time14`).val());
            sum += convertToMinutes($(`#${day}Time15`).val());
            sum += convertToMinutes($(`#${day}Time16`).val());
            sum += convertToMinutes($(`#${day}Time17`).val());
        }
    }
    sum = convertTotal(sum);
    objThis.Data.TotalS4J = sum;
    $("#TotalS4J").val(sum);

    sum = convertToMinutes(objThis.Data.TotalRun) + convertToMinutes(objThis.Data.TotalOther);
    sum += (objThis.Data.Area === "TC") ? 0 : 15;
    sum = convertTotal(sum);
    objThis.Data.Total1R = sum;
    $("#Total1R").val(sum);

    sum = 0;
    //If OJT Trainer is not checked then exit function
    if (!$("#OJT").prop('checked'))
        return;

    for (const day of days) {
        if (day === "Sun" || day === "Sat") continue;
        for (let j = 11; j < 30; j++) {
            if (j === 18 || j === 19) continue;
            sum += ($(`#${day}OJT${j}`).prop('checked')) ? convertToMinutes($(`#${day}Time${j}`).val()) : 0;
        }
        for (let j = 30; j < 35; j++) {
            sum += ($(`#${day}OJT${j}`).prop('checked')) ? (Number($(`#${day}Time${j}`).val()) * 60) : 0;
        }
    }
    sum = convertTotal(sum);
    objThis.Data.TotalS4OJT = sum;
    $("#TotalS4OJT").val(sum);
    setStorage();
}
/********************CALCULATIONS********************/
