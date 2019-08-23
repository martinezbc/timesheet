function print(strHTML, element) {
    document.getElementById(element).innerHTML = strHTML;
}

var strHTML = '';

strHTML = '<p><b>Week Range:</b> ' + dateString(objThis.WeekOfS) + '</p>';
print(strHTML, "divpweek");

strHTML = '<p><b>Name: </b>' + objThis.EmpNameS + '</p>';
print(strHTML, "divpemp");

strHTML = '<p><b>Area: </b>' + objThis.AreaS + '</p>';
print(strHTML, "divparea");

strHTML = '<p><b>Team: </b>' + objThis.TeamS + '</p>';
print(strHTML, "divpteam");

strHTML = '<p><b>Position: </b>' + objThis.PositionS + '</p>';
print(strHTML, "divpposition");

strHTML = '<p><b>OJT Trainer: </b>';
if (objThis.OJT) {
    strHTML += '<input id="chkboxojt" type="checkbox" checked="checked" disabled><label for="chkboxojt">OJT</label>';
} else {
    strHTML += '<input id="chkboxojt" type="checkbox" disabled><label for="chkboxojt">OJT</label>';
}
strHTML += '</p>';
print(strHTML, "divpojt");

strHTML = '<p><b>Trainee: </b>' + objThis.TraineeS + '</p>';
print(strHTML, "divptrainee");

strHTML = '<p><b>Vehicle: </b>' + objThis.Veh1S + '</p>';
print(strHTML, "divpveh1");

strHTML = '<p><b>Spares: </b>' + ((objThis.Veh2S !== "") ? objThis.Veh2S : "") + ((objThis.Veh3S !== "") ? "/" + objThis.Veh3S : "") + ((objThis.Veh4S !== "") ? "/" + objThis.Veh4S : "") + '</p>';
print(strHTML, "divpspares");

//********************DIV OTHER WORK********************//
strHTML = '';
var otherWork = ["OW0", "OW1", "OW2", "OW3", "OW4", "OW5", "OW6", "OW7", "OW8", "OW9"];
var j = 0;
for (var i = 20; i < 30; i++) {
    if (objThis["Select" + i + "S"] !== "") {
        otherWork[j] = "Time" + i + "S";
        j++;
    }
}
var strDay = "";
var blnOW = false;
var strnum = "";

for (i = 0; i < 10; i++) {
    strHTML = '';
    blnOW = (otherWork[i] !== "OW" + i) ? true : false;
    if (blnOW) {
        strnum = otherWork[i].substr(4, 2);
        strHTML += '<div class="row">';
        strHTML += '<div class="col-sm-1"><p>' + objThis["Date" + strnum + "S"] + '</p></div>';
        if (objThis["QL" + strnum + "S"]) {
            strHTML += '<div class="col-sm-1"><input id="chkboxow' + strnum + '" type="checkbox" checked="checked" disabled><label for="chkboxow' + strnum + '">Q/L</label></div>';
        } else {
            strHTML += '<div class="col-sm-1"><input id="chkboxow' + strnum + '" type="checkbox" disabled><label for="chkboxow' + strnum + '">Q/L</label></div>';
        }
        strHTML += '<div class="col-sm-6"><p><b>Type: </b>' + objThis["Select" + strnum + "S"] + " - " + objThis["Desc" + strnum + "S"] + '</p></div>';
        strHTML += '<div class="col-sm-2"><p>' + objThis["Time" + strnum + "SS"] + ' - ';
        strHTML += objThis["Time" + strnum + "ES"] + '</p></div>';
        strHTML += '<div class="col-sm-2"><u><p>' + objThis[otherWork[i]] + '</p></u></div>';
        strHTML += '</div>';
    }
    print(strHTML, "divpow" + i);
    if (blnOW) document.getElementById("divpow" + i).classList.remove("hide");
}

//********************DIV OTHER WORK********************//

//********************DIV FIELD TRIPS********************//
var otherFT = ["FT0", "FT1", "FT2", "FT3", "FT4"];
j = 0;

for (i = 30; i < 35; i++) {
    if (objThis["Time" + i + "S"] !== "") {
        otherFT[j] = "Time" + i + "S";
        j++;
    }
}

var blnFT = false;

for (i = 0; i < 5; i++) {
    strHTML = '';
    blnFT = (otherFT[i] !== "FT" + i) ? true : false;
    if (blnFT) {
        strnum = otherFT[i].substr(4, 2);
        strHTML += '<div class="row">';
        strHTML += '<div class="col-sm-1"><p>' + objThis["Date" + strnum + "S"] + '</p></div>';
        if (objThis["QL" + strnum + "S"]) {
            strHTML += '<div class="col-sm-1"><input id="chkboxft' + strnum + '" type="checkbox" checked="checked" disabled><label for="chkboxft' + strnum + '">Q/L</label></div>';
        } else {
            strHTML += '<div class="col-sm-1"><input id="chkboxft' + strnum + '" type="checkbox" disabled><label for="chkboxft' + strnum + '">Q/L</label></div>';
        }
        strHTML += '<div class="col-sm-2"><p><b>From:&nbsp;</b>' + objThis["From" + strnum + "S"] + '</p></div>';
        strHTML += '<div class="col-sm-2"><p><b>To:&nbsp;</b>' + objThis["To" + strnum + "S"] + '</p></div>';
        strHTML += '<div class="col-sm-2"><p><b>Voucher:&nbsp;</b>' + objThis["Voucher" + strnum + "S"] + '</p></div>';
        strHTML += '<div class="col-sm-2"><p>' + objThis["Time" + strnum + "SS"] + ' - ';
        strHTML += objThis["Time" + strnum + "ES"] + '</p></div>';
        strHTML += '<div class="col-sm-2"><u><p>' + objThis[otherFT[i]] + '</p></u></div>';
        strHTML += '</div>';
    }
    print(strHTML, "divpft" + i);
    if (blnFT) document.getElementById("divpft" + i).classList.remove("hide");
}
//********************DIV FIELD TRIPS********************//

//********************DIV LEAVE********************//
var otherLV = ["LV0", "LV1", "LV2", "LV3", "LV4"];
j = 0;

for (i = 40; i < 45; i++) {
    if (objThis["Time" + i + "S"] !== "") {
        otherLV[j] = "Time" + i + "S";
        j++;
    }
    if (objThis["LeaveAD" + i + "S"]) {
        otherLV[j] = "LeaveAD" + i + "S";
        j++;
    }
}

strDay = "";
var blnLV = false;
strnum = "";

for (i = 0; i < 5; i++) {
    strHTML = '';
    blnLV = (otherLV[i] !== "LV" + i) ? true : false;
    if (blnLV) {
        strHTML += '<div class="row">';
        strnum = otherLV[i].substr(-3,2);
        strHTML += '<div class="col-sm-1"><p>' + objThis["Date" + strnum + "S"] + '</p></div>';
        strHTML += '<div class="col-sm-2"><p><b>Type: </b>' + objThis["Select" + strnum + "S"] + '</p></div>';
        if (otherLV[i].indexOf("LeaveAD") > -1) {
            strHTML += '<div class="col-sm-1"><input id="allday' + strnum + '" type="checkbox" checked="checked" disabled><label for="allday' + strnum + '">ALL DAY</label></div>';
            strHTML += '<div class="col-sm-2"></div>';
            strHTML += '<div class="col-sm-6"></div></div>';
        } else {
            strHTML += '<div class="col-sm-1"><input type="checkbox" id="allday' + strnum + '" disabled><label for="allday' + strnum + '">ALL DAY</label></div>';
            strHTML += '<div class="col-sm-2"><p>' + objThis["Time" + strnum + "SS"] + ' - ';
            strHTML += objThis["Time" + strnum + "ES"] + '</p></div>';
            strHTML += '<div class="col-sm-6"><u><p>' + objThis[otherLV[i]] + '</p></u></div></div>';
        }
    }
    print(strHTML, "divplv" + i);
    if (blnLV) document.getElementById("divplv" + i).classList.remove("hide");
}

//********************DIV LEAVE********************//

//********************DIV TOTALS********************//
print('<p class="bold-lg">REGULAR:&nbsp;' + objThis.TotalRunS + '</p>', "divptotalrun");
print('<p class="bold-lg">OTHER:&nbsp;' + objThis.TotalOtherS + '</p>', "divptotalother");
print('<p class="bold-lg">FIELD TRIP:&nbsp;' + objThis.TotalFTS + '</p>', "divptotalft");
print('<p class="bold-lg">HOURS WORKED:&nbsp;' + objThis.TotalHWS + '</p>', "divptotalhw");
print('<p class="bold-lg">1R (Regular):&nbsp;' + objThis.Total1RS + '</p>', "divptotal1r");
print('<p class="bold-lg">S4 (OJT):&nbsp;' + objThis.TotalS4S + '</p>', "divptotals4");
print('<p class="bold-lg">S2 (Equipment):&nbsp;' + objThis.TotalS2QLS + '</p>', "divptotals2ql");
print('<p class="bold-lg">S2 (Admin):&nbsp;' + objThis.TotalS2JS + '</p>', "divptotals2j");
print('<p class="bold-lg">C3 (Weather):&nbsp;' + objThis.TotalC3S + '</p>', "divptotalc3");
print('<p class="bold-lg">C1 (Callback):&nbsp;' + objThis.TotalC1S + '</p>', "divptotalc1");
//********************DIV TOTALS********************//          
