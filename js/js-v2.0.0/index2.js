function print(strHTML, element) {
    document.getElementById(element).innerHTML = strHTML;
}
//********************DIV TEAM********************//
var strHTML = '';
strHTML += '<p><b>Team: </b></p>';
for (var j = 1; j < 5; j++) {
    strHTML += '<div class="hide" id="div' + j + 'S">';
    for (var i = 0; i < 8; i++) {
        strHTML += '<input type="radio" id="team' + j + i + 'S" name="TeamS" value="' + j + i + '");"><label for="team' + j + i + 'S">' + j + i + '</label>&nbsp;';
    }
    strHTML += '</div>';
}
strHTML += '<div class="hide" id="div7S">';
var teams = ["ACA", "ALTM", "ALTP", "AUR", "CARD", "FCPS", "FR", "IVY", "KING", "KK", "KT", "LAB", "LOU", "MATH", "PHIL", "RIV", "SCOL"];
for (i = 0; i < 17; i++) {
    strHTML += '<input type="radio" id="team' + teams[i] + 'S" name="TeamS" value="' + teams[i] + '")";><label for="team' + teams[i] + 'S">' + teams[i] + '</label>&nbsp;';
}
strHTML += '</div><div class="hide" id="divTCS"><input type="radio" id="teamTCS" name="TeamS" value="TC")";><label for="teamTCS">TC</label></div>';
print(strHTML, 'divSteam');
//********************DIV TEAM********************//

//********************DIV LEAVE********************//
strHTML = '<div class="row addLV" id="LVAddS">';
strHTML += '<p class="category"><span class="far fa-plus-square fa-lg"></span>Add Leave</p></div>';
for (j = 40; j < 45; j++) {
    strHTML += '<div class="tinycard bg-teal2 hide" id="LVDiv' + j + 'S">';
    strHTML += '<div class="row">';
    strHTML += '<div class="category col-11">Leave</div><div class="col-1 center">';
    strHTML += '<span class="fas fa-trash-alt" id="LVTrash' + j + 'S"></span></div></div>';
    strHTML += '<div class="row"><div class="col-6">';
    strHTML += '<select id="Date' + j + 'S"><option value="" id="After' + j + 'S">Select Date...</option></select>';
    strHTML += '</div><div class="col-6">';
    strHTML += '<input type="checkbox" name="chkADLV" id="LeaveAD' + j + 'S"><label for="LeaveAD' + j + 'S">All Day</label>';
    strHTML += '</div></div><div class="row"><div class="col-12">';
    strHTML += '<select name="selectLV" id="Select' + j + 'S" class="selectwidth">';
    strHTML += '<option value="">--Select leave--</option>';
    strHTML += '<option value="SICK-IND">Sick-Indv</option>';
    strHTML += '<option value="SICK-FAM">Sick-Family</option>';
    strHTML += '<option value="PERSONAL">Personal</option>';
    strHTML += '<option value="LWOP">LWOP</option>';
    strHTML += '<option value="CIVIL">Civil</option>';
    strHTML += '<option value="SICK-FMLA">FMLA</option>';
    strHTML += '<option value="SICK-INJ">Injury</option>';
    strHTML += '</select></div>';
    strHTML += '</div><div class="row"><div class="col-11">';
    strHTML += '<input type="text" name="txtTime" id="Time' + j + 'SS" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input type="text" name="txtTime" id="Time' + j + 'ES" class="timewidth" placeholder="- - : - -">&nbsp;'
    strHTML += '<input type="text" id="Time' + j + 'S" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="ClearOW' + j + 'S"></span></div></div></div>';
}
print(strHTML, 'divSLV');
//********************DIV LEAVE********************//

//********************DIV OTHER WORK********************//
strHTML = '<div class="row addOW" id="OWAddS">';
strHTML += '<p class="category"><span class="far fa-plus-square fa-lg"></span>Add Other Work</p></div>';
for (j = 20; j < 30; j++) {
    strHTML += '<div class="tinycard bg-teal2 hide" id="OWDiv' + j + 'S">';
    strHTML += '<div class="row">';
    strHTML += '<div class="category col-11">Other Work&nbsp;';
    strHTML += '<span class="fas fa-question-circle ow"></span>';
    strHTML += '</div><div class="col-1 center">';
    strHTML += '<span class="fas fa-trash-alt" id="OWTrash' + j + 'S"></span></div></div>';
    strHTML += '<div class="row"><div class="col-6">';
    strHTML += '<select id="Date' + j + 'S"><option value="" id="After' + j + 'S">Select Date...</option></select>';
    strHTML += '</div><div class="col-6">';
    strHTML += '<input type="checkbox" name="chkOJTS" id="OJT' + j + 'S" disabled><label for="OJT' + j + 'S">OJT</label>&nbsp;';
    strHTML += '<input type="checkbox" name="chkQLS" id="QL' + j + 'S" disabled><label for="QL' + j + 'S">Q/L</label>';
    strHTML += '</div></div><div class="row"><div class="col-12">';
    strHTML += '<select name="selectOW" id="Select' + j + 'S" class="selectwidth">';
    strHTML += '<option value="">--Select work--</option>';
    strHTML += '<option value="FYI">FYI</option>';
    strHTML += '<option value="OTHR">Other</option>';
    strHTML += '<option value="GT">Garage trip</option>';
    strHTML += '<option value="FUEL">Fuel</option>';
    strHTML += '<option value="RC">Run coverage</option>';
    strHTML += '<option value="Q/L">Q/L Coverage</option>';
    strHTML += '<option value="MTNG">Meeting</option>';
    strHTML += '<option value="TRNG">Training</option>';
    strHTML += '<option value="MED">Physical/Drug Test</option>';
    strHTML += '<option value="CS">Cold start team</option>';
    strHTML += '<option value="CBK">Call back</option>';
    strHTML += '</select></div>';
    strHTML += '</div><div class="row"><div class="col-12">';
    strHTML += '<input id="Desc' + j + 'S" type="text" class="descwidth" style="text-align: left;" placeholder="Additional notes...">';
    strHTML += '</div></div><div class="row"><div class="col-11">';
    strHTML += '<input type="text" name="txtTime" id="Time' + j + 'SS" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input type="text" name="txtTime" id="Time' + j + 'ES" class="timewidth" placeholder="- - : - -">&nbsp;'
    strHTML += '<input type="text" id="Time' + j + 'S" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="ClearOW' + j + 'S"></span></div></div></div>';
}
print(strHTML, 'divSOW');
//********************DIV OTHER WORK********************//

//********************DIV FIELD TRIP********************//
strHTML = '<div class="row addFT" id="FTAddS">';
strHTML += '<p class="category"><span class="far fa-plus-square fa-lg"></span>Add Field Trip</p></div>';
for (j = 30; j < 35; j++) {
    strHTML += '<div class="tinycard bg-teal3 hide" id="FTDiv' + j + 'S">';
    strHTML += '<div class="row"><div class="category col-11">Field Trip&nbsp;';
    strHTML += '<span class="fas fa-question-circle ft"></span>';
    strHTML += '</div><div class="col-1 center">';
    strHTML += '<span class="fas fa-trash-alt" id="FTTrash' + j + 'S"></span></div></div>';
    strHTML += '<div class="row"><div class="col-12">';
    strHTML += '<select id="Date' + j + 'S"></select>';
    strHTML += '</div></div><div class="row"><div class="col-8">';
    strHTML += '<input name="" id="Voucher' + j + 'S" type="text" class="voucherwidth" placeholder="Voucher">';
    strHTML += '</div><div class="col-4">';
    strHTML += '<input type="checkbox" name="chkOJTS" id="OJT' + j + 'S"><label for="OJT' + j + 'S">OJT</label>&nbsp;';
    strHTML += '<input type="checkbox" name="chkQLS" id="QL' + j + 'S"><label for="QL' + j + 'S">Q/L</label>';
    strHTML += '</div></div>';
    strHTML += '<div class="row"><div class="col-12">';
    strHTML += '<input name="txtFT" id="From' + j + 'S" type="text" placeholder="Origin..." style="text-align:left;" class="ftwidth">';
    strHTML += '</div></div><div class="row"><div class="col-12">';
    strHTML += '<input name="txtFT" id="To' + j + 'S" type="text" placeholder="Destination..." style="text-align:left;" class="ftwidth">';
    strHTML += '</div></div><div class="row"><div class="col-11">';
    strHTML += '<input type="text" name="txtTime" id="Time' + j + 'SS" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input type="text" name="txtTime" id="Time' + j + 'ES" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input type="text" id="Time' + j + 'S" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="ClearFT' + j + 'S"></span></div></div></div>';
}
print(strHTML, 'divSFT');
//********************DIV FIELD TRIP********************//

//********************DIV WEEKOF********************//
var r1 = DateRange(-28);
var r2 = DateRange(-21);
var r3 = DateRange(-14);
var r4 = DateRange(-7);
var r5 = DateRange(0);

var strHTML = '<option value="">--Select Week--</option>';
strHTML += '<option value="' + r1 + '">' + dateString(r1) + '</option>';
strHTML += '<option value="' + r2 + '">' + dateString(r2) + '</option>';
strHTML += '<option value="' + r3 + '">' + dateString(r3) + '</option>';
strHTML += '<option value="' + r4 + '">' + dateString(r4) + '</option>';
strHTML += '<option value="' + r5 + '">' + dateString(r5) + '</option>';

print(strHTML, "WeekOfS");

function DateRange(offset) {
    var start = new Date();
    var end = new Date();
    var day = start.getDay();
    var sOffset = (day - day) - (day + 1);
    sOffset = (sOffset === -7) ? 0 : sOffset;
    var eOffset = sOffset + 6;
    start.setDate(start.getDate() + (sOffset + offset));
    end.setDate(end.getDate() + (eOffset + offset));

    var sm = start.getMonth() + 1,
        sd = start.getDate(),
        sy = start.getFullYear();
    var em = end.getMonth() + 1,
        ed = end.getDate(),
        ey = end.getFullYear();
    sm = (sm.toString().length === 1) ? "0" + sm : sm;
    sd = (sd.toString().length === 1) ? "0" + sd : sd;
    em = (em.toString().length === 1) ? "0" + em : em;
    ed = (ed.toString().length === 1) ? "0" + ed : ed;
    return sm + sd + sy + em + ed + ey + "S";
}

function dateString(strDate) {
    var str = strDate.substr(0, 2) + "/" + strDate.substr(2, 2) + "/" + strDate.substr(4, 4) + " - ";
    str += strDate.substr(8, 2) + "/" + strDate.substr(10, 2) + "/" + strDate.substr(12, 4);
    return str
}
//********************DIV WEEKOF********************//