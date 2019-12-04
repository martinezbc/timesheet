const week = localStorage.getItem('WeekOfS');
const objThis = JSON.parse(localStorage.getItem(week + "ObjS"));

//GET ELEMENT BY ID
function byID(refID) {
    return document.getElementById(refID);
}

//GO TO THE TIMESHEET
function downloadTimesheet() {
    window.open("supplement.html", "_self");
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
print(dateString(objThis.Sup.WeekOf), byID("divpweek").children[0]);
print(objThis.Sup.EmpName, byID("divpemp").children[0]);
print(objThis.Sup.Area, byID("divparea").children[0]);
print(objThis.Sup.Team, byID("divpteam").children[0]);
print(objThis.Sup.Position, byID("divpposition").children[0]);
if (objThis.Sup.OJT) {
    print('<input id="chkboxojt" type="checkbox" checked="checked" disabled><label for="chkboxojt">OJT</label>', byID("divpojt").children[0]);
} else {
    print('<input id="chkboxojt" type="checkbox" disabled><label for="chkboxojt">OJT</label>', byID("divpojt").children[0]);
}
print(objThis.Sup.Trainee, byID("divptrainee").children[0]);
print(objThis.Sup.Veh1, byID("divpveh1").children[0]);
let strHTML = ((objThis.Sup.Veh2 !== "") ? objThis.Sup.Veh2 : "") + ((objThis.Sup.Veh3 !== "") ? "/" + objThis.Sup.Veh3 : "") + ((objThis.Sup.Veh4 !== "") ? "/" + objThis.Sup.Veh4 : "");
print(strHTML, byID("divpspares").children[0]);
//********************DIV EMP DATA********************//
//********************DIV OTHER WORK********************//
let otherWork = ["OW0", "OW1", "OW2", "OW3", "OW4", "OW5", "OW6", "OW7", "OW8", "OW9"];
let j = 0;
for (let k = 20; k < 30; k++) {
    if (objThis.Sup[`SupSelect${k}`] !== "") {
        otherWork[j] = `SupTime${k}`;
        j++;
    }
}

for (let i = 0; i < 10; i++) {
    let childdiv = byID(`divpow${i}`).children[0];
    let blnOW = (otherWork[i] !== `OW${i}`) ? true : false;
    if (blnOW) {
        let strnum = otherWork[i].substr(-2);
        print(objThis.Sup[`SupDate${strnum}`], childdiv.children[0].children[0]);
        if (objThis.Sup[`SupQL${strnum}`]) {
            print(`<input id="chkboxow${strnum}" type="checkbox" checked="checked" disabled><label for="chkboxow${strnum}">Q/L</label>`, childdiv.children[1]);
        } else {
            print(`<input id="chkboxow${strnum}" type="checkbox" disabled><label for="chkboxow${strnum}">Q/L</label>`, childdiv.children[1]);
        }
        print(objThis.Sup[`SupSelect${strnum}`] + '-' + objThis.Sup[`SupDesc${strnum}`], childdiv.children[2].children[0]);
        print(objThis.Sup[`${otherWork[i]}S`] + ' - ' + objThis.Sup[`${otherWork[i]}E`], childdiv.children[3].children[0]);
        print(`<u>${objThis.Sup[otherWork[i]]}</u>`, childdiv.children[4].children[0]);
    }
    if (blnOW) showHide(`divpow${i}`, true);
}
//********************DIV OTHER WORK********************//
//********************DIV FIELD TRIPS********************//
let otherFT = ["FT0", "FT1", "FT2", "FT3", "FT4"];
j = 0;
for (let k = 30; k < 35; k++) {
    if (objThis.Sup[`SupTime${k}S`] !== "") {
        otherFT[j] = `SupTime${k}`;
        j++;
    }
}

for (let i = 0; i < 5; i++) {
    let childdiv = byID(`divpft${i}`).children[0];
    let blnFT = (otherFT[i] !== `FT${i}`) ? true : false;
    if (blnFT) {
        let strnum = otherFT[i].substr(-2);
        print(objThis.Sup[`SupDate${strnum}`], childdiv.children[0].children[0]);
        if (objThis.Sup[`SupQL${strnum}`])
            print(`<input id="chkboxft${strnum}" type="checkbox" checked="checked" disabled><label for="chkboxft${strnum}">Q/L</label>`, childdiv.children[1]);
        else
            print(`<input id="chkboxft${strnum}" type="checkbox" disabled><label for="chkboxft${strnum}">Q/L</label>`, childdiv.children[1]);
        print(objThis.Sup[`SupFrom${strnum}`], childdiv.children[2].children[0]);
        print(objThis.Sup[`SupTo${strnum}`], childdiv.children[3].children[0]);
        print(objThis.Sup[`SupVoucher${strnum}`], childdiv.children[4].children[0]);
        print(objThis.Sup[`${otherFT[i]}S`] + ' - ' + objThis.Sup[`${otherFT[i]}E`], childdiv.children[5].children[0]);
        print(`<u>${objThis.Sup[otherFT[i]]}</u>`, childdiv.children[6].children[0]);
    }
    if (blnFT) showHide(`divpft${i}`, true);
}
//********************DIV FIELD TRIPS********************//
//********************DIV LEAVE********************//
let otherLV = ["LV0", "LV1", "LV2", "LV3", "LV4"];
j = 0;
for (let k = 40; k < 45; k++) {
    if (objThis.Sup[`SupTime${k}S`] !== "") {
        otherLV[j] = `SupTime${k}`;
        j++;
    } else if (objThis.Sup[`SupLeaveAD${k}`]) {
        otherLV[j] = `SupLeaveAD${k}`;
        j++;
    }
}

for (let i = 0; i < 5; i++) {
    let childdiv = byID(`divplv${i}`).children[0];
    let blnLV = (otherLV[i] !== `LV${i}`) ? true : false;
    if (blnLV) {
        let strnum = otherLV[i].substr(-2);
        print(objThis.Sup[`SupDate${strnum}`], childdiv.children[0].children[0]);
        print(objThis.Sup[`SupSelect${strnum}`], childdiv.children[1].children[0]);
        if (otherLV[i].substr(-4,2) === "AD") {
            print(`<input id="allday${strnum}" type="checkbox" checked="checked" disabled><label for="allday${strnum}">ALL DAY</label>`, childdiv.children[2]);
        } else {
            print(`<input type="checkbox" id="allday${strnum}" disabled><label for="allday${strnum}">ALL DAY</label>`, childdiv.children[2]);
            print(objThis.Sup[otherLV[i] + "S"] + ' - ' + objThis.Sup[otherLV[i] + "E"], childdiv.children[3].children[0]);
            print(`<u>${objThis.Sup[otherLV[i]]}</u>`, childdiv.children[4].children[0]);
        }
    }
    if (blnLV) showHide(`divplv${i}`, true);
}
//********************DIV LEAVE********************//
//********************DIV TOTALS********************//
print("", byID("divptotalrun").children[0]);
print(calculateTotal(weeklyOtherTime()), byID("divptotalother").children[0]);
print(convertTotal(weeklyFieldTripTime()), byID("divptotalft").children[0]);
print(convertTotal(calculateHoursWorked()), byID("divptotalhw").children[0]);
print(convertTotal(weeklyOtherTime()), byID("divptotal1r").children[0]);
print(convertTotal(calculateOJT()), byID("divptotals4ojt").children[0]);
print(convertTotal(calculateAdmin()), byID("divptotals4j").children[0]);
print(convertTotal(calculateEquipment()), byID("divptotals2ql").children[0]);
print(convertTotal(weeklyC3Time()), byID("divptotalc3").children[0]);
print(convertTotal(weeklyC1Time()), byID("divptotalc1").children[0]);
//********************DIV TOTALS********************//
