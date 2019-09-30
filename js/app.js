const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fullday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function byID(refID) {
    return document.getElementById(refID);
}

//TOGGLE HIDE CLASS ON AND OFF BY REMOVING OR ADDING
function showHide(refID, bln) {
    let e = byID(refID);
    //(Show the element) ? remove hide : add hide
    if (bln) {
        if (e.classList.contains("hide")) e.classList.remove("hide");
    } else {
        if (!e.classList.contains("hide")) e.classList.add("hide");
    }
}

const weekOf = byID('WeekOf');
if (localStorage.getItem('WeekOf') === null) {
    weekOf.selectedIndex = 4;
    initalLoad();
} else {
    weekOf.value = localStorage.getItem('WeekOf');
    initialLoad();
}
weekOf.addEventListener('change', initialLoad);

const main = document.getElementsByClassName('main')[0];
main.addEventListener('click', (e) => {});

//FIRST FUNCTION TO LOAD
function initialLoad() {
    if (weekOf.value === "") return;
    localStorage.setItem("WeekOf", weekOf.value);
    storeWeek();
}

//LOAD ALL ELEMENTS INTO LOCAL STORAGE AND THEN PULL VALUES
function loadLocalStorage() {
    let i = 0;
    //Get the current day being displayed and then load new values onto page
    for (i; i < 7; i++) {
        if (byID('today').textContent === days[i]) break;
    }

    let entries = Object.entries(objThis.Data);
    for (const [key, value] of entries) {
        if (key === "Area" || key === "Team" || key === "Position" || key === "Total1R") continue;
        if (byID(key) === null) continue;
        if (value === true || value === false) {
            byID(key).checked = value;
        } else {
            byID(key).value = value;
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
    for (const areas of document.querySelectorAll("input[name='Area']")) {
        areas.checked = false;
    }
    if (area !== "") byID("area" + area).checked = true;

    loadTeamValues();

    //Load team from local storage and set radio selection. Only if team belongs to selected area
    for (const teams of document.querySelectorAll('input[name="Team"]')) {
        teams.checked = false;
    }
    if (team !== "" && (team.substr(0, 1) === area || area === '7')) byID("team" + team).checked = true;
    
    //Load position from local storage and set radio selection
    for (const positions of document.querySelectorAll('input[name="Position"]')) {
        positions.checked = false;
    }
    if (pos !== "") {
        pos = pos.replace(" ", "");
        byID("pos" + pos).checked = true;
    }
}

//LOADS TEAM VALUES INTO #Team USING AREA SELECTION
function loadTeamValues() {
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

//STORE WEEKLY FIELD DATA INTO OBJECT
function storeWeeklyData(e) {
    const day = days[i];
    
    //Employee data
    objThis.Data['EmpName'] = byID('EmpName').value;
    objThis.Data['WeekOf'] = byID('WeekOf').value;
    objThis.Data['Veh1'] = byID('Veh1').value;
    objThis.Data['Veh2'] = byID('Veh2').value;
    objThis.Data['Veh3'] = byID('Veh3').value;
    objThis.Data['Veh4'] = byID('Veh4').value;
    objThis.Data['Trainee'] = byID('Trainee').value;
    objThis.Data['OJT'] = (byID('OJT').checked) ? true : false;
    
    //Routes
    for (let j = 1; j < 6; j++) {
        objThis.Data[`AMRoute${j}`] = byID(`AMRoute${j}`).value;
        objThis.Data[`PMRoute${j}`] = byID(`PMRoute${j}`).value;
        if (j < 3) {
            objThis.Data[`PSRoute${j}`] = byID(`PSRoute${j}`).value;
            objThis.Data[`SHRoute${j}`] = byID(`SHRoute${j}`).value;
            objThis.Data[`LRRoute${j}`] = byID(`LRRoute${j}`).value;
        }
    }
}

//STORE DAILY FIELD DATA INTO OBJECT
function storeDailyData(e) {
    const day = days[i];
    if (i !== 0 && i !== 6) { //Only load counts and regular run time for Mon - Fri
        
        //Pupil counts
        for (let j = 1; j < 6; j++) {
            objThis[day][`AM${j}Ct`] = byID(`AM${j}Ct`).value;
            objThis[day][`PM${j}Ct`] = byID(`PM${j}Ct`).value;
            if (j < 3) {
                objThis[day][`PS${j}Ct`] = byID(`PS${j}Ct`).value;
                objThis[day][`SH${j}Ct`] = byID(`SH${j}Ct`).value;
                objThis[day][`LR${j}Ct`] = byID(`LR${j}Ct`).value;
            }
        }
        
        //Pupil time
        objThis[day]['TimeA'] = byID('TimeA').value;
        objThis[day]['TimeB'] = byID('TimeB').value;
        objThis[day]['TimeC'] = byID('TimeC').value;
        objThis[day]['TimeD'] = byID('TimeD').value;
        
        //Regular run time
        objThis[day]['QL11'] = (byID('QL11').checked) ? true : false;
        objThis[day]['J11'] = (byID('J11').checked) ? true : false;
        for (let j = 11; j < 18; j++) {
            objThis[day][`Time${j}S`] = byID(`Time${j}S`).value;
            objThis[day][`Time${j}E`] = byID(`Time${j}E`).value;
            objThis[day][`Time${j}`] = byID(`Time${j}`).value;
            objThis[day][`OJT${j}`] = (byID(`OJT${j}`).checked) ? true : false;
        }
        
        //Leave
        for (let j = 40; j < 42; j++) {
            objThis[day][`Select${j}`] = byID(`Select${j}`).value;
            objThis[day][`Time${j}S`] = byID(`Time${j}S`).value;
            objThis[day][`Time${j}E`] = byID(`Time${j}E`).value;
            objThis[day][`Time${j}`] = byID(`Time${j}`).value;
        }
        objThis[day]['LeaveAD'] = (byID('LeaveAD').checked) ? true : false;
    }
    
    //Other Work
    for (let j = 20; j < 25; j++) {
        objThis[day][`Select${j}`] = byID(`Select${j}`).value;
        objThis[day][`Desc${j}`] = byID(`Desc${j}`).value;
        objThis[day][`Time${j}S`] = byID(`Time${j}S`).value;
        objThis[day][`Time${j}E`] = byID(`Time${j}E`).value;
        objThis[day][`Time${j}`] = byID(`Time${j}`).value;
        objThis[day][`OJT${j}`] = (byID(`OJT${j}`).checked) ? true : false;
        objThis[day][`QL${j}`] = (byID(`QL${j}`).checked) ? true : false;
    }
    
    //Field Trip
    for (let j = 30; j < 35; j++) {
        objThis[day][`Voucher${j}`] = byID(`Voucher${j}`).value;
        objThis[day][`To${j}`] = byID(`To${j}`).value;
        objThis[day][`From${j}`] = byID(`From${j}`).value;
        objThis[day][`Time${j}S`] = byID(`Time${j}S`).value;
        objThis[day][`Time${j}E`] = byID(`Time${j}E`).value;
        objThis[day][`Time${j}`] = byID(`Time${j}`).value;
        objThis[day][`OJT${j}`] = (byID(`OJT${j}`).checked) ? true : false;
        objThis[day][`QL${j}`] = (byID(`QL${j}`).checked) ? true : false;
    }
}

function loadDailyData(i) {
    
}


