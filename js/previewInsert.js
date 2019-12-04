const week = localStorage.getItem('WeekOf');
const objThis = JSON.parse(localStorage.getItem(week + "Obj"));

//GET ELEMENT BY ID
function byID(refID) {
    return document.getElementById(refID);
}

//GO TO THE TIMESHEET
function downloadTimesheet() {
    window.open("timesheet.html", "_self");
}

//CONVERT WEEK DATE INTO READABLE STRING
function dateString(strDate) {
    var str = strDate.substr(0, 2) + "/" + strDate.substr(2, 2) + "/" + strDate.substr(4, 4) + " - ";
    str += strDate.substr(8, 2) + "/" + strDate.substr(10, 2) + "/" + strDate.substr(12, 4);
    return str
}

//SHOW OR HIDE AN ELEMENT
function showHide(refID, bln) {
    let el = byID(refID);
    //(Show the element) ? remove hide : add hide
    if (bln) {
        if (el.classList.contains("hide")) el.classList.remove("hide");
    } else {
        if (!el.classList.contains("hide")) el.classList.add("hide");
    }
}

//WINDOW ON TOUCH CLICK. SHOW HIDE MENU
window.onclick = function (event) {
    const bln = (byID("tsdropdown").classList.contains("hide")) ? true : false;

    if (event.target.id !== 'tsbtn')
        showHide("tsdropdown", false);
    else
        showHide("tsdropdown", bln);
}

//WINDOW ON TOUCH EVENT. SHOW HIDE MENU
window.ontouchstart = function (event) {
    const bln = (byID("tsdropdown").classList.contains("hide")) ? true : false;

    if (event.target.id !== 'tsbtn')
        showHide("tsdropdown", false);
    else
        showHide("tsdropdown", bln);
}

//PRINT STRING INTO ELEMENT
function print(strHTML, element) {
    element.innerHTML += strHTML;
}

//********************DIV EMP DATA********************//
print(dateString(objThis.Data.WeekOf), byID("divpweek").children[0]);
print(objThis.Data.EmpName, byID("divpemp").children[0]);
print(objThis.Data.Area, byID("divparea").children[0]);
print(objThis.Data.Team, byID("divpteam").children[0]);
print(objThis.Data.Position, byID("divpposition").children[0]);
if (objThis.Data.OJT) {
    print('<input id="chkboxojt" type="checkbox" checked="checked" disabled><label for="chkboxojt">OJT</label>', byID("divpojt").children[0]);
} else {
    print('<input id="chkboxojt" type="checkbox" disabled><label for="chkboxojt">OJT</label>', byID("divpojt").children[0]);
}
print(objThis.Data.Trainee, byID("divptrainee").children[0]);
print(objThis.Data.Veh1, byID("divpveh1").children[0]);
let strHTML = ((objThis.Data.Veh2 !== "") ? objThis.Data.Veh2 : "") + ((objThis.Data.Veh3 !== "") ? "/" + objThis.Data.Veh3 : "") + ((objThis.Data.Veh4 !== "") ? "/" + objThis.Data.Veh4 : "");
print(strHTML, byID("divpspares").children[0]);
//********************DIV EMP DATA********************//

//********************DIV AM RUNS********************//
let childdiv = byID("divpamruns");
print(objThis.Data.AMRoute1, childdiv.children[1].children[0].children[0]);
print(objThis.Data.AMRoute2, childdiv.children[2].children[0].children[0]);
print(objThis.Data.AMRoute3, childdiv.children[3].children[0].children[0]);
print(objThis.Data.AMRoute4, childdiv.children[4].children[0].children[0]);
print(objThis.Data.AMRoute5, childdiv.children[5].children[0].children[0]);
for (let i = 1; i < 6; i++) {
    let day = days[i];
    print(`${day.substr(0,1)}: ${objThis[day][`${day}AM1Ct`]}`, childdiv.children[1].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}AM2Ct`]}`, childdiv.children[2].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}AM3Ct`]}`, childdiv.children[3].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}AM4Ct`]}`, childdiv.children[4].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}AM5Ct`]}`, childdiv.children[5].children[i].children[0]);
    print(objThis[day][`${day}TimeA`].replace(' AM', '').replace(' PM', ''), childdiv.children[6].children[i].children[0]);
    print(objThis[day][`${day}TimeB`].replace(' AM', '').replace(' PM', ''), childdiv.children[6].children[i].children[1]);
}
//********************DIV AM RUNS********************//

//********************DIV PM RUNS********************//
childdiv = byID("divppmruns");
print(objThis.Data.PMRoute1, childdiv.children[1].children[0].children[0]);
print(objThis.Data.PMRoute2, childdiv.children[2].children[0].children[0]);
print(objThis.Data.PMRoute3, childdiv.children[3].children[0].children[0]);
print(objThis.Data.PMRoute4, childdiv.children[4].children[0].children[0]);
print(objThis.Data.PMRoute5, childdiv.children[5].children[0].children[0]);
for (let i = 1; i < 6; i++) {
    let day = days[i];
    print(`${day.substr(0,1)}: ${objThis[day][`${day}PM1Ct`]}`, childdiv.children[1].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}PM2Ct`]}`, childdiv.children[2].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}PM3Ct`]}`, childdiv.children[3].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}PM4Ct`]}`, childdiv.children[4].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}PM5Ct`]}`, childdiv.children[5].children[i].children[0]);
    print(objThis[day][`${day}TimeC`].replace(' AM', '').replace(' PM', ''), childdiv.children[6].children[i].children[0]);
    print(objThis[day][`${day}TimeD`].replace(' AM', '').replace(' PM', ''), childdiv.children[6].children[i].children[1]);
}
//********************DIV PM RUNS********************//

//********************DIV PS/SH/LR RUNS********************//
childdiv = byID("divppsshlr");
print(objThis.Data.PSRoute1, childdiv.children[1].children[0].children[0]);
print(objThis.Data.PSRoute2, childdiv.children[2].children[0].children[0]);
print(objThis.Data.SHRoute1, childdiv.children[3].children[0].children[0]);
print(objThis.Data.SHRoute2, childdiv.children[4].children[0].children[0]);
print(objThis.Data.LRRoute1, childdiv.children[5].children[0].children[0]);
print(objThis.Data.LRRoute2, childdiv.children[6].children[0].children[0]);
for (let i = 1; i < 6; i++) {
    let day = days[i];
    print(`${day.substr(0,1)}: ${objThis[day][`${day}PS1Ct`]}`, childdiv.children[1].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}PS2Ct`]}`, childdiv.children[2].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}SH1Ct`]}`, childdiv.children[3].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}SH2Ct`]}`, childdiv.children[4].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}LR1Ct`]}`, childdiv.children[5].children[i].children[0]);
    print(`${day.substr(0,1)}: ${objThis[day][`${day}LR2Ct`]}`, childdiv.children[6].children[i].children[0]);
}
//********************DIV PS/SH/LR RUNS********************//

//********************DIV MONDAY-FRIDAY********************//
for (const day of weekdays) {
    childdiv = byID(`divp${day}`);

    print(objThis.Data[`${day}Date`], childdiv.children[0]);

    if (objThis[day][`${day}QL11`])
        print(`<input id="chk${day}QL" type="checkbox" checked="checked" disabled><label for="chk${day}QL">Equipment/Lift</label>` + '&nbsp;', childdiv.children[1]);
    else
        print(`<input id="chk${day}QL" type="checkbox" disabled><label for="chk${day}QL">Equipment/Lift</label>` + '&nbsp;', childdiv.children[1]);

    if (objThis[day][`${day}J11`])
        print(`<input id="chk${day}J" type="checkbox" checked="checked" disabled><label for="chk${day}J">Admin</label>`, childdiv.children[1]);
    else
        print(`<input id="chk${day}J" type="checkbox" disabled><label for="chk${day}J">Admin</label>`, childdiv.children[1]);

    for (let i = 11; i < 18; i++) {
        print(objThis[day][`${day}Time${i}S`] + '-' + objThis[day][`${day}Time${i}E`], childdiv.children[i - 9].children[0]);
        if (objThis[day][`${day}OJT${i}`]) {
            print('&nbsp;&nbsp;<u>**' + objThis[day][`${day}Time${i}`] + '**</u>', childdiv.children[i - 9].children[0]);
        } else {
            print('&nbsp;&nbsp;<u>' + `${objThis[day][`${day}Time${i}`]}</u>`, childdiv.children[i - 9].children[0]);
        }
    }
}
//********************DIV MONDAY-FRIDAY********************//

//********************DIV OTHER WORK********************//
let otherWork = ["OW0", "OW1", "OW2", "OW3", "OW4", "OW5", "OW6", "OW7", "OW8", "OW9"];
let j = 0;
for (const day of days) {
    for (let k = 20; k < 30; k++) {
        if ((day === "Sun" || day === "Sat") && k > 22) continue;
        if (objThis[day][`${day}Select${k}`] !== "") {
            otherWork[j] = `${day}Time${k}`;
            j++;
        }
    }
}
for (let i = 0; i < 10; i++) {
    let childdiv = byID(`divpow${i}`).children[0];
    let blnOW = (otherWork[i] !== `OW${i}`) ? true : false;
    if (blnOW) {
        let day = otherWork[i].substr(0, 3);
        let strnum = otherWork[i].substr(7);
        print(objThis.Data[`${day}Date`], childdiv.children[0].children[0]);
        if (objThis[day][`${day}QL${strnum}`]) {
            print(`<input id="chkboxow${strnum}" type="checkbox" checked="checked" disabled><label for="chkboxow${strnum}">Q/L</label>`, childdiv.children[1]);
        } else {
            print(`<input id="chkboxow${strnum}" type="checkbox" disabled><label for="chkboxow${strnum}">Q/L</label>`, childdiv.children[1]);
        }
        print(objThis[day][`${day}Select${strnum}`] + '-' + objThis[day][`${day}Desc${strnum}`], childdiv.children[2].children[0]);
        print(objThis[day][`${otherWork[i]}S`] + ' - ' + objThis[day][`${otherWork[i]}E`], childdiv.children[3].children[0]);
        print(`<u>${objThis[day][otherWork[i]]}</u>`, childdiv.children[4].children[0]);
    }
    if (blnOW) showHide(`divpow${i}`, true);
}
//********************DIV OTHER WORK********************//
//********************DIV FIELD TRIPS********************//
let otherFT = ["FT0", "FT1", "FT2", "FT3", "FT4"];
j = 0;
for (const day of days) {
    for (let k = 30; k < 35; k++) {
        if ((day === "Sun" || day === "Sat") && k > 32) continue;
        if (objThis[day][`${day}Time${k}S`] !== "") {
            otherFT[j] = `${day}Time${k}`;
            j++;
        }
    }
}
for (let i = 0; i < 5; i++) {
    let childdiv = byID(`divpft${i}`).children[0];
    let blnFT = (otherFT[i] !== `FT${i}`) ? true : false;
    if (blnFT) {
        let day = otherFT[i].substr(0, 3);
        let strnum = otherFT[i].substr(7);
        print(objThis.Data[`${day}Date`], childdiv.children[0].children[0]);
        if (objThis[day][`${day}QL${strnum}`])
            print(`<input id="chkboxft${strnum}" type="checkbox" checked="checked" disabled><label for="chkboxft${strnum}">Q/L</label>`, childdiv.children[1]);
        else
            print(`<input id="chkboxft${strnum}" type="checkbox" disabled><label for="chkboxft${strnum}">Q/L</label>`, childdiv.children[1]);
        print(objThis[day][`${day}From${strnum}`], childdiv.children[2].children[0]);
        print(objThis[day][`${day}To${strnum}`], childdiv.children[3].children[0]);
        print(objThis[day][`${day}Voucher${strnum}`], childdiv.children[4].children[0]);
        print(objThis[day][`${otherFT[i]}S`] + ' - ' + objThis[day][`${otherFT[i]}E`], childdiv.children[5].children[0]);
        print(`<u>${objThis[day][otherFT[i]]}</u>`, childdiv.children[6].children[0]);
    }
    if (blnFT) showHide(`divpft${i}`, true);
}
//********************DIV FIELD TRIPS********************//
//********************DIV LEAVE********************//
let otherLV = ["LV0", "LV1", "LV2", "LV3", "LV4", "LV5", "LV6", "LV7", "LV8", "LV9"];
j = 0;
for (const day of weekdays) {
    if (objThis[day][`${day}Time41S`] !== "") {
        otherLV[j] = `${day}Time41`;
        j++;
    }
    if (objThis[day][`${day}Time40S`] !== "" && objThis[day][`${day}Time40`] !== undefined) {
        otherLV[j] = `${day}Time40`;
        j++;
    }
    if (objThis[day][`${day}LeaveAD`]) {
        otherLV[j] = `${day}LeaveAD`;
        j++;
    }
}
for (let i = 0; i < 10; i++) {
    let childdiv = byID(`divplv${i}`).children[0];
    let blnLV = (otherLV[i] !== `LV${i}`) ? true : false;
    if (blnLV) {
        let day = otherLV[i].substr(0, 3);
        let strnum = otherLV[i].substr(-2);
        print(objThis.Data[`${day}Date`], childdiv.children[0].children[0]);
        print(objThis[day][`${day}LeaveSelect${strnum}`], childdiv.children[1].children[0]);
        if (strnum === "AD") {
            print(`<input id="allday${strnum}" type="checkbox" checked="checked" disabled><label for="allday${strnum}">ALL DAY</label>`, childdiv.children[2]);
        } else {
            print(`<input type="checkbox" id="allday${strnum}" disabled><label for="allday${strnum}">ALL DAY</label>`, childdiv.children[2]);
            print(objThis[day][otherLV[i] + "S"] + ' - ' + objThis[day][otherLV[i] + "E"], childdiv.children[3].children[0]);
            print(`<u>${objThis[day][otherLV[i]]}</u>`, childdiv.children[4].children[0]);
        }
    }
    if (blnLV) showHide(`divplv${i}`, true);
}
//********************DIV LEAVE********************//
//********************DIV TOTALS********************//
print(calculateTotal(weeklyRunTime()), byID("divptotalrun").children[0]);
print(calculateTotal(weeklyOtherTime()), byID("divptotalother").children[0]);
print(convertTotal(weeklyFieldTripTime()), byID("divptotalft").children[0]);
print(convertTotal(calculateHoursWorked()), byID("divptotalhw").children[0]);
print(convertTotal(weeklyRunTime() + weeklyOtherTime() + (objThis.Data.Area !== "TC" ? 15 : 0)), byID("divptotal1r").children[0]);
print(convertTotal(calculateOJT()), byID("divptotals4ojt").children[0]);
print(convertTotal(calculateAdmin()), byID("divptotals4j").children[0]);
print(convertTotal(calculateEquipment()), byID("divptotals2ql").children[0]);
print(convertTotal(weeklyC3Time()), byID("divptotalc3").children[0]);
print(convertTotal(weeklyC1Time()), byID("divptotalc1").children[0]);
//********************DIV TOTALS********************//
