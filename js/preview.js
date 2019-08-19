function print(strHTML, element) {
    document.getElementById(element).innerHTML = strHTML;
}

var strHTML = '';

strHTML = '<p><b>Week Range:</b> ' + dateString(objThisData.WeekOf) + '</p>';
print(strHTML, "divpweek");

strHTML = '<p><b>Name: </b>' + objThisData.EmpName + '</p>';
print(strHTML, "divpemp");

strHTML = '<p><b>Area: </b>' + objThisData.Area + '</p>';
print(strHTML, "divparea");

strHTML = '<p><b>Team: </b>' + objThisData.Team + '</p>';
print(strHTML, "divpteam");

strHTML = '<p><b>Position: </b>' + objThisData.Position + '</p>';
print(strHTML, "divpposition");

strHTML = '<p><b>OJT Trainer: </b>';
if (objThisData.OJT) {
    strHTML += '<input id="chkboxojt" type="checkbox" checked="checked" disabled><label for="chkboxojt">EQ/L</label>';
} else {
    strHTML += '<input id="chkboxojt" type="checkbox" disabled><label for="chkboxojt">OJT</label>';
}
strHTML += '</p>';
print(strHTML, "divpojt");

strHTML = '<p><b>Trainee: </b>' + objThisData.Trainee + '</p>';
print(strHTML, "divptrainee");

strHTML = '<p><b>Vehicle: </b>' + objThisData.Veh1 + '</p>';
print(strHTML, "divpveh1");

strHTML = '<p><b>Spares: </b>' + ((objThisData.Veh2 !== "") ? objThisData.Veh2 : "") + ((objThisData.Veh3 !== "") ? "/" + objThisData.Veh3 : "") + ((objThisData.Veh4 !== "") ? "/" + objThisData.Veh4 : "") + '</p>';
print(strHTML, "divpspares");

//********************DIV AM RUNS********************//
strHTML = '<div class="row section__header bg-medblue"><div class="col-12 bold-lg daily">Morning</div></div>';
strHTML += '<div class="row"><div class="col-sm-2"><p><b>AM: </b>' + objThisData.AMRoute1 + '</p></div>';                    
for (i = 1; i < 6; i++) {
    var obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "AM1Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>AM: </b>' + objThisData.AMRoute2 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "AM2Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>AM: </b>' + objThisData.AMRoute3 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "AM3Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>AM: </b>' + objThisData.AMRoute4 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "AM4Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>AM: </b>' + objThisData.AMRoute5 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "AM5Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + obj[days[i] + "TimeA"].replace(" AM", "") + '</p><p>' + obj[days[i] + "TimeB"].replace(" AM", "") + '</p></div>';
}
strHTML += '</div>';
print(strHTML, "divpamruns");
//********************DIV AM RUNS********************//

//********************DIV PM RUNS********************//
strHTML = '<div class="row section__header bg-medblue"><div class="col-12 bold-lg daily">Afternoon</div></div>';
strHTML += '<div class="row"><div class="col-sm-2"><p><b>PM: </b>' + objThisData.PMRoute1 + '</p></div>';                    
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "PM1Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>PM: </b>' + objThisData.PMRoute2 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "PM2Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>PM: </b>' + objThisData.PMRoute3 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "PM3Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>PM: </b>' + objThisData.PMRoute4 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "PM4Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>PM: </b>' + objThisData.PMRoute5 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "PM5Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + obj[days[i] + "TimeC"].replace(" PM", "").replace(" AM", "") + '</p><p>' + obj[days[i] + "TimeD"].replace(" AM", "").replace(" PM", "") + '</p></div>';
}
strHTML += '</div>';
print(strHTML, "divppmruns");
//********************DIV PM RUNS********************//

//********************DIV PM RUNS********************//
strHTML = '<div class="row section__header bg-medblue"><div class="col-12 bold-lg daily">PS / SH / LR</div></div>';
strHTML += '<div class="row"><div class="col-sm-2"><p><b>PS: </b>' + objThisData.PSRoute1 + '</p></div>';                    
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "PS1Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>PS: </b>' + objThisData.PSRoute2 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "PS2Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>SH: </b>' + objThisData.SHRoute1 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "SH1Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>SH: </b>' + objThisData.SHRoute2 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "SH2Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>LR: </b>' + objThisData.LRRoute1 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "LR1Ct"] + '</p></div>';
}
strHTML += '</div><div class="row"><div class="col-sm-2"><p><b>LR: </b>' + objThisData.LRRoute2 + '</p></div>';
for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML += '<div class="col-sm-1"><p>' + days[i].substr(0, 1) + ':&nbsp;' + obj[days[i] + "LR2Ct"] + '</p></div>';
}
strHTML += '</div>';
print(strHTML, "divppsshlr");
//********************DIV PM RUNS********************//

//********************DIV MONDAY-FRIDAY********************//
for (var i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    strHTML = '';
    strHTML += '<p class="category">' + fullday[i].toUpperCase() + ' - ' + obj[days[i] + "Date"] + '</p></div>';
    strHTML += '<div class="row">';
    if (obj[days[i] + "QL11"]) {
        strHTML += '<input id="chk'+ days[i] + 'QL" type="checkbox" checked="checked" disabled><label for="chk'+ days[i] + 'QL">Equipment/Lift</label></div>';
    } else {
        strHTML += '<input id="chk'+ days[i] + 'QL" type="checkbox" disabled><label for="chk'+ days[i] + 'QL">Equipment/Lift</label>&nbsp;';
    }
    if (obj[days[i] + "J11"]) {
        strHTML += '<input id="chk'+ days[i] + 'J" type="checkbox" checked="checked" disabled><label for="chk'+ days[i] + 'J">Admin</label></div>';
    } else {
        strHTML += '<input id="chk'+ days[i] + 'J" type="checkbox" disabled><label for="chk'+ days[i] + 'J">Admin</label></div>';
    }
    strHTML += '<div class="row"><p><b>RG:</b>&nbsp;' + obj[days[i] + "Time11S"] + ' - ' + obj[days[i] + "Time11E"] + "&nbsp;&nbsp;<u>" + obj[days[i] + "Time11"] + '</u></p></div>';
    strHTML += '<div class="row"><p><b>RG:</b>&nbsp;' + obj[days[i] + "Time12S"] + ' - ' + obj[days[i] + "Time12E"] + "&nbsp;&nbsp;<u>" + obj[days[i] + "Time12"] + '</u></p></div>';
    strHTML += '<div class="row"><p><b>PS:</b>&nbsp;' + obj[days[i] + "Time13S"] + ' - ' + obj[days[i] + "Time13E"] + "&nbsp;&nbsp;<u>" + obj[days[i] + "Time13"] + '</u></p></div>';
    strHTML += '<div class="row"><p><b>PS:</b>&nbsp;' + obj[days[i] + "Time14S"] + ' - ' + obj[days[i] + "Time14E"] + "&nbsp;&nbsp;<u>" + obj[days[i] + "Time14"] + '</u></p></div>';
    strHTML += '<div class="row"><p><b>SH:</b>&nbsp;' + obj[days[i] + "Time15S"] + ' - ' + obj[days[i] + "Time15E"] + "&nbsp;&nbsp;<u>" + obj[days[i] + "Time15"] + '</u></p></div>';
    strHTML += '<div class="row"><p><b>SH:</b>&nbsp;' + obj[days[i] + "Time16S"] + ' - ' + obj[days[i] + "Time16E"] + "&nbsp;&nbsp;<u>" + obj[days[i] + "Time16"] + '</u></p></div>';
    strHTML += '<div class="row"><p><b>LR:</b>&nbsp;' + obj[days[i] + "Time17S"] + ' - ' + obj[days[i] + "Time17E"] + "&nbsp;&nbsp;<u>" + obj[days[i] + "Time17"] + '</u></p></div>';
    strHTML += '<div class="row"><p><b>TOTAL:</b>&nbsp;' + obj[days[i] + "RunTotal"] + '</p></div></div>';
    print(strHTML, "divp" + days[i]);
}
//********************DIV MONDAY-FRIDAY********************//

//********************DIV OTHER WORK********************//
strHTML = '';
var otherWork = ["OW0", "OW1", "OW2", "OW3", "OW4", "OW5", "OW6", "OW7", "OW8", "OW9"];
var j = 0;
for (i = 0; i < 7; i++) {
    obj = getDayObj(days[i]);
    for (var k = 20; k < 30; k++) {
        if ((i === 0 || i === 6) && k > 22) continue;
        if (obj[days[i] + "Select" + k] !== "") {
            otherWork[j] = days[i] + "Time" + k;
            j++;
        }
    }
}
var strDay = "";
var blnOW = false;
var strnum = "";

for (i = 0; i < 10; i++) {
    strHTML = '';
    blnOW = (otherWork[i] !== "OW" + i) ? true : false;
    if (blnOW) {
        strDay = otherWork[i].substr(0, 3);
        strnum = otherWork[i].substr(7);
        if (i !== 0) {
            strHTML += '<hr class="border-grey">';
        }
        strHTML += '<div class="row">';
        strHTML += '<div class="col-sm-1"><p>' + obj[strDay + "Date"] + '</p></div>';
        if (obj[strDay + "QL" + strnum]) {
            strHTML += '<div class="col-sm-1"><input id="chkboxow" type="checkbox" checked="checked" disabled><label for="chkboxow">EQ/L</label></div>';
        } else {
            strHTML += '<div class="col-sm-1"><input id="chkboxow" type="checkbox" disabled><label for="chkboxow">EQ/L</label></div>';
        }
        strHTML += '<div class"col-sm-4"><p>Category:&nbsp;' + obj[strDay + "Select" + strnum] + " - " + obj[strDay + "Desc" + strnum] + '</p></div>';
        strHTML += '<div class="col-sm-1"><p></p></div>';
        strHTML += '<div class="col-sm-1"><p>' + obj[otherWork[i] + "S"] + '</p></div>';
        strHTML += '<div class="col-sm-1"><p>' + obj[otherWork[i] + "E"] + '</p></div>';
        strHTML += '<div class="col-sm-1"><p>' + obj[otherWork[i]] + '</p></div>';
        strHTML += '</div>';
    }
    print(strHTML, "divpow" + i);
    if (blnOW) document.getElementById("divpow" + i).classList.remove("hide");
}

//********************DIV OTHER WORK********************//

//********************DIV FIELD TRIPS********************//
var otherFT = ["FT0", "FT1", "FT2", "FT3", "FT4"];
j = 0;
for (i = 0; i < 7; i++) {
    obj = getDayObj(days[i]);
    for (k = 30; k < 35; k++) {
        if ((i === 0 || i === 6) && k > 32) continue;
        if (obj[days[i] + "Time" + k] !== "") {
            otherFT[j] = days[i] + "Time" + k;
            j++;
        }
    }
}
var blnFT = false;

for (i = 0; i < 5; i++) {
    strHTML = '';
    blnFT = (otherFT[i] !== "FT" + i) ? true : false;
    if (blnFT) {
        if (i !== 0) {
            strHTML += '<hr class="border-grey">';
        }
        strDay = otherFT[i].substr(0, 3);
        strnum = otherFT[i].substr(7);
        strHTML += '<div class="row">';
        strHTML += '<div class="col-sm-1"><p>' + obj[strDay + "Date"] + '</p></div>';
        if (obj[strDay + "QL" + strnum]) {
            strHTML += '<div class="col-sm-1"><input id="chkboxft" type="checkbox" checked="checked" disabled><label for="chkboxft">EQ/L</label></div>';
        } else {
            strHTML += '<div class="col-sm-1"><input id="chkboxft" type="checkbox" disabled><label for="chkboxft">EQ/L</label></div>';
        }
        strHTML += '<div class="col-sm-2"><p>From:&nbsp;' + obj[strDay + "From" + strnum] + '</p></div>';
        strHTML += '<div class="col-sm-2"><p>To:&nbsp;' + obj[strDay + "To" + strnum] + '</p></div>';
        strHTML += '<div class="col-sm-2"><p>Voucher:&nbsp;' + obj[strDay + "Voucher" + strnum] + '</p></div>';
        strHTML += '<div class="col-sm-1"><p>' + obj[otherFT[i] + "S"] + '</p></div>';
        strHTML += '<div class="col-sm-1"><p>' + obj[otherFT[i] + "E"] + '</p></div>';
        strHTML += '<div class="col-sm-1"><p>' + obj[otherFT[i]] + '</p></div>';
        strHTML += '</div>';
    }
    print(strHTML, "divpft" + i);
    if (blnFT) document.getElementById("divpft" + i).classList.remove("hide");
}
//********************DIV FIELD TRIPS********************//
            
//********************DIV LEAVE********************//
var otherLV = ["LV0", "LV1", "LV2", "LV3", "LV4", "LV5", "LV6", "LV7", "LV8", "LV9"];
j = 0;

for (i = 1; i < 6; i++) {
    obj = getDayObj(days[i]);
    if (obj[days[i] + "Time41"] !== "") {
        otherLV[j] = days[i] + "Time41";
        j++;
    }
    if (obj[days[i] + "Time42"] !== "") {
        otherLV[j] = days[i] + "Time42";
        j++;
    }
    if (obj[days[i] + "LeaveAD"] === "1") {
        otherLV[j] = days[i] + "LeaveAD";
        j++;
    }
}
var strDay = "";
var blnLV = false;
var strnum = "";

for (i = 0; i < 10; i++) {
    strHTML = '';
    blnLV = (otherLV[i] !== "LV" + i) ? true : false;
    if (blnLV) {
        if (i !== 0) {
            strHTML += '<hr class="border-grey">';
        }
        strHTML += '<div class="row">';
        strDay = otherLV[i].substr(0, 3);
        strnum = otherLV[i].substr(-2);
        strHTML += '<div class="col-sm-1"><p>' + obj[strDay + "Date"] + '</p></div>';
        strHTML += '<div class="col-sm-2"><p>' + obj[strDay + "LeaveSelect" + strnum] + '</p></div>';
        if (strnum === "AD") {
            strHTML += '<div class="col-sm-1"><input id="allday" type="checkbox" checked="checked" disabled><label for="allday">ALL DAY</label></div>';
            strHTML += '<div class="col-sm-1"></div>';
            strHTML += '<div class="col-sm-1"></div>';
            strHTML += '<div class="col-sm-1"></div></div>';
        } else {
            strHTML += '<div class="col-sm-1"><p>All Day<input type="checkbox" disabled></p></div>';
            strHTML += '<div class="col-sm-1"><p>' + obj[otherLV[i] + "S"] + '</p></div>';
            strHTML += '<div class="col-sm-1"><p>' + obj[otherLV[i] + "E"] + '</p></div>';
            strHTML += '<div class="col-sm-1"><p>' + obj[otherLV[i]] + '</p></div></div>';
        }
    }
    print(strHTML, "divplv" + i);
    if (blnLV) document.getElementById("divplv" + i).classList.remove("hide");
}

//********************DIV LEAVE********************//

//********************DIV TOTALS********************//
print('<p class="bold-lg">REGULAR:&nbsp;' + objThisData.TotalRun + '</p>', "divptotalrun");
print('<p class="bold-lg">OTHER:&nbsp;' + objThisData.TotalOther + '</p>', "divptotalother");
print('<p class="bold-lg">FIELD TRIP:&nbsp;' + objThisData.TotalFT + '</p>', "divptotalft");
print('<p class="bold-lg">HOURS WORKED:&nbsp;' + objThisData.TotalHW + '</p>', "divptotalhw");
print('<p class="bold-lg">1R (Regular):&nbsp;' + objThisData.Total1R + '</p>', "divptotal1r");
print('<p class="bold-lg">S4 (OJT):&nbsp;' + objThisData.TotalS4 + '</p>', "divptotals4");
print('<p class="bold-lg">S2 (Equipment):&nbsp;' + objThisData.TotalS2QL + '</p>', "divptotals2ql");
print('<p class="bold-lg">S2 (Admin):&nbsp;' + objThisData.TotalS2J + '</p>', "divptotals2j");
print('<p class="bold-lg">C3 (Weather):&nbsp;' + objThisData.TotalC3 + '</p>', "divptotalc3");
print('<p class="bold-lg">C1 (Callback):&nbsp;' + objThisData.TotalC1 + '</p>', "divptotalc1");
//********************DIV TOTALS********************//          