let objThis = '';
let intDay = 0;

function DateRange(offset) {
    let start = new Date();
    let end = new Date();
    let day = start.getDay();
    let sOffset = (day - day) - (day + 1);
    sOffset = (sOffset === -7) ? 0 : sOffset;
    let eOffset = sOffset + 6;
    start.setDate(start.getDate() + (sOffset + offset));
    end.setDate(end.getDate() + (eOffset + offset));

    let sm = start.getMonth() + 1;
    let sd = start.getDate();
    let sy = start.getFullYear();
    let em = end.getMonth() + 1;
    let ed = end.getDate();
    let ey = end.getFullYear();
    sm = (sm.toString().length === 1) ? "0" + sm : sm;
    sd = (sd.toString().length === 1) ? "0" + sd : sd;
    em = (em.toString().length === 1) ? "0" + em : em;
    ed = (ed.toString().length === 1) ? "0" + ed : ed;
    return sm + sd + sy + em + ed + ey;
}

function dateString(strDate) {
    let str = strDate.substr(0, 2) + "/" + strDate.substr(2, 2) + "/" + strDate.substr(4, 4) + " - ";
    str += strDate.substr(8, 2) + "/" + strDate.substr(10, 2) + "/" + strDate.substr(12, 4);
    return str
}

//CHANGE NAV BAR VALUES DEPENDING ON THE DAY
function toggleDay(i) {
    intDay = i;
    let prev = (i - 1 < 0) ? 6 : i - 1;
    let next = (i + 1 > 6) ? 0 : i + 1;

    //Set prev, today, and next text values
    byID("today").innerHTML = days[i];
    byID("todaydate").innerHTML = objThis.Data[`${days[i]}Date`];
    byID("dayP").textContent = fullday[i] + '-' + objThis.Data[`${days[i]}Date`];
    byID("prev").innerHTML = days[prev];
    byID("prevdate").innerHTML = objThis.Data[`${days[prev]}Date`];
    byID("next").innerHTML = days[next];
    byID("nextdate").innerHTML = objThis.Data[`${days[next]}Date`];

    //togglePupilCounts(x);
}

function storeWeek() {
    const weekOf = byID('WeekOf');
    let week = weekOf.value;
    if (localStorage.getItem(`${week}Obj`) === null) {
        objThis = objNew;

        storeWeekDays(week);

        loadPrevWeek(week);
        objThis.Data.WeekOf = weekOf.value;
        localStorage.setItem(`${week}Obj`, JSON.stringify(objThis));
    } else {
        objThis = JSON.parse(localStorage.getItem(`${week}Obj`));

        storeWeekDays(week);
    }
    if (byID("today").textContent === 'today') {
        let i = new Date().getDay();
        toggleDay(i);
    } else {
        toggleDay(intDay);
    }
    //Load data from JSON
    loadLocalStorage();
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
    for (let k = 1; k < 6; k++) {
        let day = days[k];
        for (i = 11; i < 18; i += 1) {
            objThis[day][`${day}Time${i}S`] = objTemp[day][`${day}Time${i}S`];
            objThis[day][`${day}Time${i}E`] = objTemp[day][`${day}Time${i}E`];
            objThis[day][`${day}Time${i}`] = objTemp[day][`${day}Time${i}`];
        }    
    }
}

//DATEADD FUNCTION
function addDate(date, days) {
    let copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

//MOVE NAV BAR TO THE RIGHT
function moveRightNavBar() {
    let current = byID("today").textContent;
    let i = (intDay + 1 > 6) ? 0 : intDay + 1;
    toggleDay(i);
}

//MOVE NAV BAR TO THE LEFT
function moveLeftNavBar() {
    let current = byID("today").textContent;
    let i = (intDay - 1 < 0) ? 6 : intDay - 1;
    toggleDay(i);
}