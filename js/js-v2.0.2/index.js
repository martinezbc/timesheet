function print(strHTML, element) {
    document.getElementById(element).innerHTML = strHTML;
}
//********************DIV WEEK OF********************//
let strHTML = '';
strHTML += '<div class="col-12"><p class="bold">Pay Week:</p>';
strHTML += '<select id="WeekOf"></select></div>';
print(strHTML, 'divWeekOf');
//********************DIV WEEK OF********************//
//********************DIV TEAM********************//
strHTML = "";
strHTML += '<p class="bold">Team:<br></p>';
for (let j = 1; j < 5; j++) {
    strHTML += '<div class="hide" id="div' + j + '">';
    for (let i = 0; i < 8; i++) {
        strHTML += '<input type="radio" id="team' + j + i + '" name="Team" value="' + j + i + '"><label for="team' + j + i + '">' + j + i + '</label>&nbsp;';
    }
    strHTML += '</div>';
}
strHTML += '<div class="hide" id="div7">';
const teams = ["ACA", "ALTM", "ALTP", "AUR", "CARD", "FCPS", "FR", "IVY", "KING", "KK", "KT", "LAB", "LOU", "MATH", "PHIL", "RIV", "SCOL"];
for (let i = 0; i < 17; i++) {
    if ((i % 4) === 0 && i > 0) {
        strHTML += '<br>';
    }
    strHTML += '<input type="radio" id="team' + teams[i] + '" name="Team" value="' + teams[i] + '"><label for="team' + teams[i] + '">' + teams[i] + '</label>&nbsp;';
}
strHTML += '</div><div class="hide" id="divTC"><input type="radio" id="teamTC" name="Team" value="TC"><label for="teamTC">TC</label></div>';
print(strHTML, "divteam");
//********************DIV TEAM********************//

//********************DIV AM RUNS********************//
strHTML = '<div class="row"><div class="col-12"><p class="category">Morning Runs</p></div></div><div class="row">';
strHTML += '<div class="col-7"><p>Route Name</p></div><div class="col-5 hide" id="divAMCt"><p>Counts</p></div></div>';
                    
const plhldr = ["", "1st bell", "2nd bell", "3rd bell", "4th bell", "5th bell"];
for (let i = 1; i < 6; i++) {
    strHTML += '<div class="row"><div class="col-7">';
    strHTML += '<input type="text" id="AMRoute' + i + '" class="routewidth" placeholder="' + plhldr[i] + '">';
    strHTML += '</div><div class="col-5">';
    for (let j = 1; j < 6; j++) {
        strHTML += '<div class="hide" id="div' + days[j] + 'AM' + i + 'Ct">';
        strHTML += '<input type="number" name="txtCt" id="' + days[j] + 'AM' + i + 'Ct" class="countwidth" placeholder="' + days[j] + '"></div>';
    }
    strHTML += '</div></div>';
}
strHTML += '<div class="row hide" id="divAMPupilTime">';
strHTML += '<p class="category">Pupil Time<span id="AMPupilcopy" class="fas fa-copy"></span></p></div>';
for (let j = 1; j < 6; j++) {
    strHTML += '<div class="row hide" id="' + days[j] + 'TimeAM"><div class="col-11">';
    strHTML += '<input id="' + days[j] + 'TimeA" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[j] + 'TimeB" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[j] + 'ClearPTAM"></span></div></div>';
}
print(strHTML, "divamruns");
//********************DIV AM RUNS********************//

//********************DIV PM RUNS********************//
strHTML = '<div class="row"><div class="col-12"><p class="category">Afternoon Runs</p></div></div><div class="row">';
strHTML += '<div class="col-7"><p>Route Name</p></div><div class="col-5 hide" id="divPMCt"><p>Counts</p></div></div>';
for (let i = 1; i < 6; i++) {
    strHTML += '<div class="row"><div class="col-7">';
    strHTML += '<input type="text" id="PMRoute' + i + '" class="routewidth" placeholder="' + plhldr[i] + '">';
    strHTML += '</div><div class="col-5">';
    for (let j = 1; j < 6; j++) {
        strHTML += '<div class="hide" id="div' + days[j] + 'PM' + i + 'Ct">';
        strHTML += '<input type="number" name="txtCt" id="' + days[j] + 'PM' + i + 'Ct" class="countwidth" placeholder="' + days[j] + '"></div>';
    }
    strHTML += '</div></div>';
}
strHTML += '<div class="row hide" id="divPMPupilTime">';
strHTML += '<p class="category">Pupil Time<span id="PMPupilcopy" class="fas fa-copy"></span></p></div>';
for (let j = 1; j < 6; j++) {
    strHTML += '<div class="row hide" id="' + days[j] + 'TimePM"><div class="col-11">';
    strHTML += '<input id="' + days[j] + 'TimeC" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[j] + 'TimeD" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[j] + 'ClearPTPM"></span></div></div>';
}
print(strHTML, "divpmruns");
//********************DIV PM RUNS********************//

//********************DIV PS/SH/LR********************//
strHTML = '<div class="row"><div class="col-12"><p class="category">PAC/Preschool</p></div></div><div class="row">';
strHTML += '<div class="col-7"><p>Route Name</p></div><div class="col-5 hide" id="divPSCt"><p>Counts</p></div></div>';
for (let i = 1; i < 3; i++) {
    strHTML += '<div class="row"><div class="col-7">';
    strHTML += '<input type="text" id="PSRoute' + i + '" class="routewidth" placeholder="pac/ps">';
    strHTML += '</div><div class="col-5">';
    for (let j = 1; j < 6; j++) {
        strHTML += '<div class="hide" id="div' + days[j] + 'PS' + i + 'Ct">';
        strHTML += '<input type="number" name="txtCt" id="' + days[j] + 'PS' + i + 'Ct" class="countwidth" placeholder="' + days[j] + '"></div>';
    }
    strHTML += '</div></div>';
}

strHTML += '<div class="row"><div class="col-12">';
strHTML += '<p class="category">Shuttles</p></div></div>';
for (let i = 1; i < 3; i++) {
    strHTML += '<div class="row"><div class="col-7">';
    strHTML += '<input type="text" id="SHRoute' + i + '" class="routewidth" placeholder="shuttle">';
    strHTML += '</div><div class="col-5">';
    for (let j = 1; j < 6; j++) {
        strHTML += '<div class="hide" id="div' + days[j] + 'SH' + i + 'Ct">';
        strHTML += '<input type="number" name="txtCt" id="' + days[j] + 'SH' + i + 'Ct" class="countwidth" placeholder="' + days[j] + '"></div>';
    }
    strHTML += '</div></div>';
}

strHTML += '<div class="row"><div class="col-12">';
strHTML += '<p class="category">Late Runs</p></div></div>';
for (let i = 1; i < 3; i++) {
    strHTML += '<div class="row"><div class="col-7">';
    strHTML += '<input type="text" id="LRRoute' + i + '" class="routewidth" placeholder="late run">';
    strHTML += '</div><div class="col-5">';
    for (let j = 1; j < 6; j++) {
        strHTML += '<div class="hide" id="div' + days[j] + 'LR' + i + 'Ct">';
        strHTML += '<input type="number" name="txtCt" id="' + days[j] + 'LR' + i + 'Ct" class="countwidth" placeholder="' + days[j] + '"></div>';
    }
    strHTML += '</div></div>';
}
print(strHTML, "divpsshlr");
//********************DIV PS/SH/LR********************//

//********************DIV SATURDAY AND SUNDAY********************//
for (let i = 6; i >= 0; i -= 6) {
    strHTML = '';
    strHTML += '<div class="row"><div class="col-12">';
    strHTML += '<p class="daily">' + fullday[i].toUpperCase() + '-<span id="' + days[i] + 'Date"></span></p>';
    strHTML += '</div></div><div class="row"><div class="col-auto">';
    strHTML += '<input type="text" id="' + days[i] + 'OtherTotal" class="totalwidth nofocus" disabled>';
    strHTML += '<p class="dailytotal">other work</p>';
    strHTML += '</div><div class="col-auto">';
    strHTML += '<input type="text" id="' + days[i] + 'FTTotal" class="totalwidth nofocus" disabled>';
    strHTML += '<p class="dailytotal">field trip</p>';
    strHTML += '</div><div class="col-auto">';
    strHTML += '<input type="text" id="' + days[i] + 'QLTotal" class="totalwidth nofocus" disabled>';
    strHTML += '<p class="dailytotal">equipment</p></div></div>';
    strHTML += '<div class="row addOW" id="' + days[i] + 'OWAdd">';
    strHTML += '<p class="category"><span class="far fa-plus-square fa-lg"></span>Add Other Work</p></div>';
    for (let j = 20; j < 23; j++) {
        strHTML += '<div class="tinycard bg-teal2 hide" id="' + days[i] + 'OWDiv' + j + '">';
        strHTML += '<div class="row">';
        strHTML += '<div class="category col-11">Other Work&nbsp;';
        strHTML += '<span class="fas fa-question-circle ow"></span>';
        strHTML += '</div><div class="col-1 center">';
        strHTML += '<span class="fas fa-trash-alt" id="' + days[i] + 'OWTrash' + j + '"></span></div></div>';
        strHTML += '<div class="row ' + days[i] + 'SpanOW' + j + '"><div class="col-12">';
        strHTML += '<input type="checkbox" id="' + days[i] + 'QL' + j + '" disabled><label for="' + days[i] + 'QL' + j + '">Q/L</label>&nbsp;&nbsp;';
        strHTML += '</div></div><div class="row ' + days[i] + 'SpanOW' + j + '"><div class="col-12">';
        strHTML += '<select name="selectOW" id="' + days[i] + 'Select' + j + '" class="selectwidth">';
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
        strHTML += '</div><div class="row ' + days[i] + 'SpanOW' + j + '"><div class="col-12">';
        strHTML += '<input id="' + days[i] + 'Desc' + j + '" type="text" class="descwidth" style="text-align: left;" placeholder="Additional notes...">';
        strHTML += '</div></div><div class="row ' + days[i] + 'SpanOW' + j + '"><div class="col-11">';
        strHTML += '<input type="text" name="txtTime" id="' + days[i] + 'Time' + j + 'S" class="timewidth" placeholder="- - : - -">&nbsp;';
        strHTML += '<input type="text" name="txtTime" id="' + days[i] + 'Time' + j + 'E" class="timewidth" placeholder="- - : - -">&nbsp;'
        strHTML += '<input type="text" id="' + days[i] + 'Time' + j + '" class="total-time nofocus" disabled>';
        strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearOW' + j + '"></span></div></div></div>';
    }
    strHTML += '<hr>';
    strHTML += '<div class="row" id="' + days[i] + 'OWAdd2"></div>';
    strHTML += '<div class="row addFT" id="' + days[i] + 'FTAdd">';
    strHTML += '<p class="category"><span class="far fa-plus-square fa-lg"></span>Add Field Trip</p></div>';
    for (let j = 30; j < 33; j++) {
        strHTML += '<div class="tinycard bg-teal3 hide" id="' + days[i] + 'FTDiv' + j + '">';
        strHTML += '<div class="row"><div class="category col-11">Field Trip&nbsp;';
        strHTML += '<span class="fas fa-question-circle ft"></span>';
        strHTML += '</div><div class="col-1 center">';
        strHTML += '<span class="fas fa-trash-alt" id="' + days[i] + 'FTTrash' + j + '"></span></div></div>';
        strHTML += '<div class="row ' + days[i] + 'SpanFT' + j + '"><div class="col-8">';
        strHTML += '<input name="" id="' + days[i] + 'Voucher' + j + '" type="text" class="voucherwidth" placeholder="Voucher">';
        strHTML += '</div><div class="col-4 center">';
        strHTML += '<input type="checkbox" name="chkFTQL" id="' + days[i] + 'QL' + j + '"><label for="' + days[i] + 'QL' + j + '">Q/L</label>';
        strHTML += '</div></div>';
        strHTML += '<div class="row ' + days[i] + 'SpanFT' + j + '"><div class="col-12">';
        strHTML += '<input name="txtFT" id="' + days[i] + 'From' + j + '" type="text" placeholder="Origin..." style="text-align:left;" class="ftwidth">';
        strHTML += '</div></div><div class="row ' + days[i] + 'SpanFT' + j + '"><div class="col-12">';
        strHTML += '<input name="txtFT" id="' + days[i] + 'To' + j + '" type="text" placeholder="Destination..." style="text-align:left;" class="ftwidth">';
        strHTML += '</div></div><div class="row ' + days[i] + 'SpanFT' + j + '"><div class="col-11">';
        strHTML += '<input type="text" name="txtTime" id="' + days[i] + 'Time' + j + 'S" class="timewidth" placeholder="- - : - -">&nbsp;';
        strHTML += '<input type="text" name="txtTime" id="' + days[i] + 'Time' + j + 'E" class="timewidth" placeholder="- - : - -">&nbsp;';
        strHTML += '<input type="text" id="' + days[i] + 'Time' + j + '" class="total-time nofocus" disabled>';
        strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearFT' + j + '"></span></div></div></div>';
    }
    strHTML += '</div>';
    print(strHTML, fullday[i]);
}
//********************DIV SATURDAY AND SUNDAY********************//

//********************DIV MONDAY - FRIDAY********************//
let $id;
for (let i = 1; i < 6; i++) {
    strHTML = '';
    strHTML += '<div class="row">';
    strHTML += '<div class="col-auto">';
    strHTML += '<p class="daily">' + (fullday[i].toUpperCase()) + '-<span id="' + days[i] + 'Date"></span></p>';
    strHTML += '</div><div class="col-auto">'
    strHTML += '<span id="' + days[i] + 'copy" class="fas fa-copy font-medblue fa-lg"></span>';
    strHTML += '<p class="copyfont">copy</p>';
    strHTML += '</div></div>';
    strHTML += '<div class="row">';
    strHTML += '<div class="col-auto">';
    strHTML += '<input type="text" id="' + days[i] + 'RunTotal" class="totalwidth nofocus" disabled>';
    strHTML += '<p class="dailytotal">run time</p>';
    strHTML += '</div>';
    strHTML += '<div class="col-auto">';
    strHTML += '<input type="text" id="' + days[i] + 'OtherTotal" class="totalwidth nofocus" disabled>';
    strHTML += '<p class="dailytotal">other work</p>';
    strHTML += '</div>';
    strHTML += '<div class="col-auto">';
    strHTML += '<input type="text" id="' + days[i] + 'FTTotal" class="totalwidth nofocus" disabled>';
    strHTML += '<p class="dailytotal">field trip</p>';
    strHTML += '</div><div class="col-auto">';
    strHTML += '<input type="text" id="' + days[i] + 'QLTotal" class="totalwidth nofocus" disabled>';
    strHTML += '<p class="dailytotal">equipment</p>';
    strHTML += '</div></div>';
    strHTML += '<div class="row addLV" id="' + days[i] + 'LVAdd">';
    strHTML += '<p class="category" id="' + days[i] + 'LvP"><span class="far fa-plus-square fa-lg"></span>Add Leave</p>';
    strHTML += '</div>';
    strHTML += '<div class="tinycard bg-gold hide" id="' + days[i] + 'Leave40">';
    strHTML += '<div class="row"><div class="col-12">';
    strHTML += '<p class="category">Leave</p>';
    strHTML += '</div></div>';
    strHTML += '<div class="row">';
    strHTML += '<div class="col-4">';
    strHTML += '<input type="checkbox" name="chkLV" id="' + days[i] + 'LeaveAD"><label for="' + days[i] + 'LeaveAD">ALL DAY</label>';
    strHTML += '</div><div class="col-8">';
    strHTML += '<select id="' + days[i] + 'LeaveSelectAD">';
    strHTML += '<option value="">--Select Leave--</option>';
    strHTML += '<option value="SICK-IND">Sick-Indv</option>';
    strHTML += '<option value="SICK-FAM">Sick-Family</option>';
    strHTML += '<option value="PERSONAL">Personal</option>';
    strHTML += '<option value="LWOP">LWOP</option>';
    strHTML += '<option value="CIVIL">Civil</option>';
    strHTML += '<option value="SICK-FMLA">FMLA</option>';
    strHTML += '<option value="SICK-INJ">Injury</option>';
    strHTML += '</select></div></div></div>';
    strHTML += '<div class="tinycard bg-gold hide" id="' + days[i] + 'Leave41">';
    strHTML += '<div class="row"><div class="col-4">';
    strHTML += '<p class="category">Leave</p>';
    strHTML += '</div><div class="col-8">';
    strHTML += '<select id="' + days[i] + 'LeaveSelect41">';
    strHTML += '<option value="">--Select Leave--</option>';
    strHTML += '<option value="SICK-IND">Sick-Indv</option>';
    strHTML += '<option value="SICK-FAM">Sick-Family</option>';
    strHTML += '<option value="PERSONAL">Personal</option>';
    strHTML += '<option value="LWOP">LWOP</option>';
    strHTML += '<option value="CIVIL">Civil</option>';
    strHTML += '<option value="SICK-FMLA">FMLA</option>';
    strHTML += '<option value="SICK-INJ">Injury</option>';
    strHTML += '</select></div></div>';
    strHTML += '<div class="row"><div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time41S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time41E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time41" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearLV41"></span>';
    strHTML += '</div></div></div>';
    strHTML += '<div class="tinycard bg-gold hide" id="' + days[i] + 'Leave42">';
    strHTML += '<div class="row"><div class="col-4"><p class="category">Leave</p>';
    strHTML += '</div><div class="col-8">';
    strHTML += '<select id="' + days[i] + 'LeaveSelect42">';
    strHTML += '<option value="">--Select Leave--</option>';
    strHTML += '<option value="SICK-IND">Sick-Indv</option>';
    strHTML += '<option value="SICK-FAM">Sick-Family</option>';
    strHTML += '<option value="PERSONAL">Personal</option>';
    strHTML += '<option value="LWOP">LWOP</option>';
    strHTML += '<option value="CIVIL">Civil</option>';
    strHTML += '<option value="SICK-FMLA">FMLA</option>';
    strHTML += '<option value="SICK-INJ">Injury</option>';
    strHTML += '</select></div></div>';
    strHTML += '<div class="row"><div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time42S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time42E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time42" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearLV42"></span>';
    strHTML += '</div></div></div><hr>';
    strHTML += '<div class="row"><input name="chkQL" type="checkbox" id="' + days[i] + 'QL11"><label for="' + days[i] + 'QL11">Equipment/Lift (Q/L)</label>&nbsp;';
    strHTML += '<input type="checkbox" name="chkJ" id="' + days[i] + 'J11"><label for="' + days[i] + 'J11">Admin (J)</label></div>';
    strHTML += '<div class="tinycard bg-teal1">';
    strHTML += '<div class="row"><div class="col-10">';
    strHTML += '<p class="category">Morning Runs</p></div><div class="col-2">';
    strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT11"><label for="' + days[i] + 'OJT11">OJT</label>&nbsp;';
    strHTML += '</div></div><div class="row"><div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time11S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time11E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time11" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearRG11"></span>';
    strHTML += '</div></div></div><div class="tinycard bg-teal1">';
    strHTML += '<div class="row"><div class="col-10">';
    strHTML += '<p class="category">Afternoon Runs</p></div>';
    strHTML += '<div class="col-2">';
    strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT12"><label for="' + days[i] + 'OJT12">OJT</label>&nbsp;';
    strHTML += '</div></div><div class="row"><div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time12S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time12E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time12" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearRG12"></span>';
    strHTML += '</div></div></div><div class="tinycard bg-teal1">';
    strHTML += '<div class="row"><div class="col-10">';
    strHTML += '<p class="category">PAC/Preschool</p>';
    strHTML += '</div><div class="col-2">';
    strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT13"><label for="' + days[i] + 'OJT13">OJT</label>&nbsp;';
    strHTML += '</div></div><div class="row"><div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time13S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time13E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time13" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearRG13"></span></div>';
    strHTML += '</div></div><div class="tinycard bg-teal1">';
    strHTML += '<div class="row"><div class="col-10">';
    strHTML += '<p class="category">PAC/Preschool</p>';
    strHTML += '</div><div class="col-2">';
    strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT14"><label for="' + days[i] + 'OJT14">OJT</label>&nbsp;';
    strHTML += '</div></div><div class="row">';
    strHTML += '<div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time14S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time14E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time14" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearRG14"></span></div>';
    strHTML += '</div></div><div class="tinycard bg-teal1">';
    strHTML += '<div class="row"><div class="col-10">';
    strHTML += '<p class="category">Shuttle</p></div><div class="col-2">';
    strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT15"><label for="' + days[i] + 'OJT15">OJT</label>&nbsp;';
    strHTML += '</div></div><div class="row">';
    strHTML += '<div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time15S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time15E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time15" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearRG15"></span></div>';
    strHTML += '</div></div><div class="tinycard bg-teal1"><div class="row"><div class="col-10">';
    strHTML += '<p class="category">Shuttle</p>';
    strHTML += '</div><div class="col-2">';
    strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT16"><label for="' + days[i] + 'OJT16">OJT</label>&nbsp;';
    strHTML += '</div></div><div class="row"><div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time16S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time16E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time16" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearRG16"></span></div>';
    strHTML += '</div></div><div class="tinycard bg-teal1"><div class="row"><div class="col-10">';
    strHTML += '<p class="category">Late Run</p></div><div class="col-2">';
    strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT17"><label for="' + days[i] + 'OJT17">OJT</label>&nbsp;';
    strHTML += '</div></div><div class="row"><div class="col-11">';
    strHTML += '<input id="' + days[i] + 'Time17S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time17E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -">&nbsp;';
    strHTML += '<input id="' + days[i] + 'Time17" type="text" class="total-time nofocus" disabled>';
    strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearRG17"></span></div>';
    strHTML += '</div></div><hr><div class="row addOW" id="' + days[i] + 'OWAdd">';
    strHTML += '<p class="category"><span class="far fa-plus-square fa-lg"></span>Add Other Work</p></div>';
    for (let j = 20; j < 30; j++) {
        strHTML += '<div class="tinycard bg-teal2 hide" id="' + days[i] + 'OWDiv' + j + '">';
        strHTML += '<div class="row">';
        strHTML += '<div class="category col-11">Other Work&nbsp;';
        strHTML += '<span class="fas fa-question-circle ow"></span>';
        strHTML += '</div><div class="col-1 center">';
        strHTML += '<span class="fas fa-trash-alt" id="' + days[i] + 'OWTrash' + j + '"></span>';
        strHTML += '</div></div><div class="row"><div class="col-auto">';
        strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT' + j + '">';
        strHTML += '<label class="lblBtnFalse" for="' + days[i] + 'OJT' + j + '">OJT</label>&nbsp;';
        strHTML += '<input type="checkbox" id="' + days[i] + 'QL' + j + '" disabled>';
        strHTML += '<label class="lblBtnFalse" for="' + days[i] + 'QL' + j + '">Q/L</label>';
        strHTML += '</div></div><div class="row"><div class="col-12">';
        strHTML += '<select name="selectOW" id="' + days[i] + 'Select' + j + '" class="selectwidth">';
        strHTML += '<option value="">--Select work--</option>';
        strHTML += '<option value="FYI">FYI</option>';
        strHTML += '<option value="OTHR">Other</option>';
        strHTML += '<option value="GT">Garage trip</option>';
        strHTML += '<option value="FUEL">Fuel</option>';
        strHTML += '<option value="RC">Run coverage</option>';
        strHTML += '<option value="Q/L">Q/L Coverage</option>';
        strHTML += '<option value="CPR">CPR/First Aid</option>';
        strHTML += '<option value="RCRT">Recertification</option>';
        strHTML += '<option value="MTNG">Meeting</option>';
        strHTML += '<option value="TRNG">Training</option>';
        strHTML += '<option value="MED">Physical/Drug Test</option>';
        strHTML += '<option value="CS">Cold start team</option>';
        strHTML += '<option value="ES2">2 Hr Delay - Early start</option>';
        strHTML += '<option value="ES0">On Time - Early start</option>';
        strHTML += '<option value="CBK">Call back</option>';
        strHTML += '</select></div></div>';
        strHTML += '<div class="row"><div class="col-12">';
        strHTML += '<input id="' + days[i] + 'Desc' + j + '" type="text" name="owdesc" class="descwidth" style="text-align: left;" placeholder="Additional notes...">';
        strHTML += '</div></div><div class="row"><div class="col-11">';
        strHTML += '<input type="text" name="txtTime" id="' + days[i] + 'Time' + j + 'S" class="timewidth" placeholder="- - : - -">&nbsp;';
        strHTML += '<input type="text" name="txtTime" id="' + days[i] + 'Time' + j + 'E" class="timewidth" placeholder="- - : - -">&nbsp;';
        strHTML += '<input type="text" id="' + days[i] + 'Time' + j + '" class="total-time nofocus" disabled>';
        strHTML += '</div><div class="col-1"><span class="fas fa-times" id="' + days[i] + 'ClearOW' + j + '"></span></div></div></div>';
    }
    strHTML += '<div class="row" id="' + days[i] + 'OWAdd2"></div><hr>';
    strHTML += '<div class="row addFT" id="' + days[i] + 'FTAdd">';
    strHTML += '<p class="category"><span class="far fa-plus-square fa-lg"></span>Add Field Trip</p></div>';
    for (let j = 30; j < 35; j++) {
        strHTML += '<div class="tinycard bg-teal3 hide" id="' + days[i] + 'FTDiv' + j + '">';
        strHTML += '<div class="row"><div class="category col-11">Field Trip&nbsp;';
        strHTML += '<span class="fas fa-question-circle ft"></span>';
        strHTML += '</div><div class="col-1 center">';
        strHTML += '<span class="fas fa-trash-alt" id="' + days[i] + 'FTTrash' + j + '"></span>';
        strHTML += '</div></div><div class="row"><div class="col-6">';
        strHTML += '<input id="' + days[i] + 'Voucher' + j + '" type="text" class="voucherwidth" placeholder="Voucher">';
        strHTML += '</div><div class="col-6 center">';
        strHTML += '<input type="checkbox" name="chkOJT" id="' + days[i] + 'OJT' + j + '"><label class="lblBtnFalse" for="' + days[i] + 'OJT' + j + '">OJT</label>&nbsp;'
        strHTML += '<input type="checkbox" name="chkFTQL" id="' + days[i] + 'QL' + j + '"><label class="lblBtnFalse" for="' + days[i] + 'QL' + j + '">Q/L</label></div></div>';
        strHTML += '<div class="row"><div class="col-12">';
        strHTML += '<input id="' + days[i] + 'From' + j + '" type="text" name="txtFT" placeholder="Origin..." style="text-align:left;" class="ftwidth">';
        strHTML += '</div></div><div class="row"><div class="col-12">';
        strHTML += '<input id="' + days[i] + 'To' + j + '" type="text" name="txtFT" placeholder="Destination..." style="text-align:left;" class="ftwidth">';
        strHTML += '</div></div><div class="row"><div class="col-11">';
        strHTML += '<input type="text" name="txtTime" id="' + days[i] + 'Time' + j + 'S" class="timewidth" placeholder="- - : - -">&nbsp;';
        strHTML += '<input type="text" name="txtTime" id="' + days[i] + 'Time' + j + 'E" class="timewidth" placeholder="- - : - -">&nbsp;';
        strHTML += '<input type="text" id="' + days[i] + 'Time' + j + '" class="total-time nofocus" disabled>';
        strHTML += '</div><div class="col-1">';
        strHTML += '<span class="fas fa-times" id="' + days[i] + 'ClearFT' + j + '"></span>';
        strHTML += '</div></div></div>';
    }
    strHTML += '<div class="row" id="' + days[i] + 'FTAdd2"></div></div>';
    print(strHTML, fullday[i]);
}
//********************DIV MONDAY - FRIDAY********************//

//********************DIV WEEKOF********************//
let range = '';

strHTML = '<option value="">--Select Week--</option>';
for (let i = -21; i < 8; i += 7) {
    range = DateRange(i);
    strHTML += '<option value="' + range + '">' + dateString(range) + '</option>';
}

print(strHTML, "WeekOf");

function DateRange(offset) {
    let start = new Date();
    let end = new Date();
    let day = start.getDay();
    let sOffset = (day - day) - (day + 1);
    sOffset = (sOffset === -7) ? 0 : sOffset;
    let eOffset = sOffset + 6;
    start.setDate(start.getDate() + (sOffset + offset));
    end.setDate(end.getDate() + (eOffset + offset));

    let sm = start.getMonth() + 1,
        sd = start.getDate(),
        sy = start.getFullYear();
    let em = end.getMonth() + 1,
        ed = end.getDate(),
        ey = end.getFullYear();
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
//********************DIV WEEKOF********************//