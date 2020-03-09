function byID(refID) {
    return document.getElementById(refID);
}

/******
INSERT AREA RADIO VALUES
******/
for (let i = 1; i < 5; i++) {
    byID('divarea').innerHTML += `<input type="radio" id="area${i}" name="Area" value="${i}"><label for="area${i}">${i}</label>`;
}
byID('divarea').innerHTML += `<input type="radio" id="area7" name="Area" value="7"><label for="area7">7</label>`;
byID('divarea').innerHTML += `<input type="radio" id="areaTC" name="Area" value="TC"><label for="areaTC">TC</label>`;

/******
INSERT TEAM RADIO VALUES
******/
for (let area = 1; area < 5; area++) {
    byID('divteam').innerHTML += `<div class="hide" id="div${area}"></div>`;
    for (let i = 0; i < 8; i++) {
        byID(`div${area}`).innerHTML += `<input type="radio" id="team${area}${i}" name="Team" value="${area}${i}"><label for="team${area}${i}">${area}${i}</label>`;
    }
}
byID('divteam').innerHTML += '<div class="hide" id="div7"></div>';
const area7Teams = ['ACA', 'ALTM', 'ALTP', 'AUR', 'CARD', 'FCPS', 'FR', 'IVY', 'KING', 'KK', 'KT', 'LAB', 'LOU', 'MATH', 'PHIL', 'RIV', 'SCOL'];
for (const team of area7Teams) {
    byID('div7').innerHTML += `<input type="radio" id="team${team}" name="Team" value="${team}"><label for="team${team}">${team}</label>`;
}
byID('divteam').innerHTML += '<div class="hide" id="divTC"></div>';
byID('divTC').innerHTML += '<input type="radio" id="teamTC" name="Team" value="TC"><label for="teamTC">TC</label>';

/******
INSERT POSITION RADIO VALUES
******/
const positions = ['Driver', 'Driver Trainee', 'Sub Driver', 'Attendant', 'Unassigned Attendant', 'Attendant Trainee', 'Sub Attendant', 'Activity Driver'];
for (const position of positions) {
    byID('divposition').innerHTML += `<input type="radio" id="pos${position.replace(' ', '')}" name="Position" value="${position}"><label for="pos${position.replace(' ', '')}">${position}</label>`;
}


byID("divLV").innerHTML += insertLV(40);
byID("divLV").innerHTML += insertLV(41);
byID("divLV").innerHTML += insertLV(42);
byID("divLV").innerHTML += insertLV(43);
byID("divLV").innerHTML += insertLV(44);
function insertLV(j) {
    return `<div class="tinycard bg-teal2 hide" id="LVDiv${j}">
            <div class="row">
            <div class="category col-11">Leave</div><div class="col-1 center">
            <span class="fas fa-trash-alt" id="LVTrash${j}"></span></div></div>
            <div class="row"><div class="col-6">
            <select id="Date${j}"></select>
            </div><div class="col-6">
            <input type="checkbox" class="chkADLV" id="LeaveAD${j}"><label for="LeaveAD${j}">All Day</label>
            </div></div><div class="row"><div class="col-12">
            <select id="Select${j}" class="selectwidth selectLV">
            <option value="">--Select leave--</option>
            <option value="SICK-IND">Sick-Indv</option>
            <option value="SICK-FAM">Sick-Family</option>
            <option value="PERSONAL">Personal</option>
            <option value="LWOP">LWOP</option>
            <option value="CIVIL">Civil</option>
            <option value="SICK-FMLA">FMLA</option>
            <option value="SICK-INJ">Injury</option>
            </select></div>
            </div><div class="row"><div class="col-11">
            <input type="text" id="Time${j}S" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>&nbsp;
            <input type="text" id="Time${j}E" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>&nbsp;
            <input type="text" id="Time${j}" class="total-time nofocus" data-disable-touch-keyboard>
            </div><div class="col-1"><span class="fas fa-times" id="ClearOW${j}"></span></div></div></div>`;
}

byID("divOW").innerHTML += insertOW(20);
byID("divOW").innerHTML += insertOW(21);
byID("divOW").innerHTML += insertOW(22);
byID("divOW").innerHTML += insertOW(23);
byID("divOW").innerHTML += insertOW(24);
byID("divOW").innerHTML += insertOW(25);
byID("divOW").innerHTML += insertOW(26);
byID("divOW").innerHTML += insertOW(27);
byID("divOW").innerHTML += insertOW(28);
byID("divOW").innerHTML += insertOW(29);
function insertOW(j) {
    return `<div class="tinycard bg-teal2 hide" id="OWDiv${j}"><div class="row">
            <div class="category col-11">Other Work&nbsp;
            <span class="fas fa-question-circle ow"></span>
            </div><div class="col-1 center">
            <span class="fas fa-trash-alt" id="OWTrash${j}"></span></div></div>
            <div class="row"><div class="col-6">
            <select id="Date${j}"></select>
            </div><div class="col-6">
            <input type="checkbox" class="chkOJT" id="OJT${j}" disabled><label for="OJT${j}">OJT</label>&nbsp;
            <input type="checkbox" class="chkQL" id="QL${j}" disabled><label for="QL${j}">Q/L</label>
            </div></div><div class="row"><div class="col-12">
            <select id="Select${j}" class="selectwidth selectOW">
            <option value="">--Select work--</option>
            <option value="FYI">FYI</option>
            <option value="OTHR">Other</option>
            <option value="GT">Garage trip</option>
            <option value="FUEL">Fuel</option>
            <option value="RC">Run coverage</option>
            <option value="Q/L">Q/L Coverage</option>
            <option value="MTNG">Meeting</option>
            <option value="TRNG">Training</option>
            <option value="MNTR">Mentor</option>
            <option value="MED">Physical/Drug Test</option>
            <option value="CS">Cold start team</option>
            <option value="CBK">Call back</option>
            </select></div>
            </div><div class="row"><div class="col-12">
            <input id="Desc${j}" type="text" class="descwidth owdesc" style="text-align: left;" placeholder="Additional notes...">
            </div></div><div class="row"><div class="col-11">
            <input type="text" id="Time${j}S" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>&nbsp;
            <input type="text" id="Time${j}E" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>&nbsp;
            <input type="text" id="Time${j}" class="total-time nofocus" data-disable-touch-keyboard>
            </div><div class="col-1"><span class="fas fa-times" id="ClearOW${j}"></span></div></div></div>`;
}

byID("divFT").innerHTML += insertFT(30);
byID("divFT").innerHTML += insertFT(31);
byID("divFT").innerHTML += insertFT(32);
byID("divFT").innerHTML += insertFT(33);
byID("divFT").innerHTML += insertFT(34);
function insertFT(j) {
    return `<div class="tinycard bg-teal3 hide" id="FTDiv${j}">
            <div class="row"><div class="category col-11">Field Trip&nbsp;
            <span class="fas fa-question-circle ft"></span>
            </div><div class="col-1 center">
            <span class="fas fa-trash-alt" id="FTTrash${j}"></span></div></div>
            <div class="row"><div class="col-12">
            <select id="Date${j}"></select>
            </div></div><div class="row"><div class="col-8">
            <input id="Voucher${j}" type="text" class="voucherwidth ftvoucher" placeholder="Voucher">
            </div><div class="col-4">
            <input type="checkbox" class="chkOJT" id="OJT${j}"><label for="OJT${j}">OJT</label>&nbsp;
            <input type="checkbox" class="chkQL" id="QL${j}"><label for="QL${j}">Q/L</label>
            </div></div>
            <div class="row"><div class="col-12">
            <input  id="From${j}" type="text" placeholder="Origin..." style="text-align:left;" class="ftwidth txtFT" data-disable-touch-keyboard>
            </div></div><div class="row"><div class="col-12">
            <input id="To${j}" type="text" placeholder="Destination..." style="text-align:left;" class="ftwidth txtFT" data-disable-touch-keyboard>
            </div></div><div class="row"><div class="col-11">
            <input type="text" id="Time${j}S" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>&nbsp;
            <input type="text" id="Time${j}E" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>&nbsp;
            <input type="text" id="Time${j}" class="total-time nofocus" data-disable-touch-keyboard>
            </div><div class="col-1"><span class="fas fa-times" id="ClearFT${j}"></span></div></div></div>`;
}

const r1 = DateRange(-28);
const r2 = DateRange(-21);
const r3 = DateRange(-14);
const r4 = DateRange(-7);
const r5 = DateRange(0);

byID("WeekOf").innerHTML = '<option value="">--Select Week--</option>';
byID("WeekOf").innerHTML += `<option value="${dateString(r1)}">${r1}</option>`;
byID("WeekOf").innerHTML += `<option value="${dateString(r2)}">${r2}</option>`;
byID("WeekOf").innerHTML += `<option value="${dateString(r3)}">${r3}</option>`;
byID("WeekOf").innerHTML += `<option value="${dateString(r4)}">${r4}</option>`;
byID("WeekOf").innerHTML += `<option value="${dateString(r5)}">${r5}</option>`;

function DateRange(offset) {

    let start = new Date();
    let end = new Date();
    let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/New_York'
    };
    let day = start.getDay();
    let sOffset = -(day + 1) < -6 ? 0 : -(day + 1);
    let eOffset = sOffset + 6;
    start.setDate(start.getDate() + (sOffset + offset));
    end.setDate(end.getDate() + (eOffset + offset));

    return start.toLocaleDateString("en-US", options) + ' - ' + end.toLocaleDateString("en-US", options);
}

//REPLACE ALL FUNCTION
function replaceAll(text, find, replace) {
    while (text.toString().indexOf(find) != -1)
        text = text.toString().replace(find, replace);
    return text;
}

//CONVERT DATE STRING INTO STRAIGHT NUMBERS ONLY
function dateString(strDate) {
    strDate = replaceAll(strDate, "/", "");
    return strDate.replace(" - ", "");
}
