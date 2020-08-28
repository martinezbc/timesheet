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
//const area7Teams = ['ACA', 'ALTM', 'ALTP', 'AUR', 'CARD', 'FCPS', 'FR', 'IVY', 'KING', 'KK', 'KT', 'LAB', 'LOU', 'MATH', 'PHIL', 'RIV', 'SCOL'];
//for (const team of area7Teams) {
//    byID('div7').innerHTML += `<input type="radio" id="team${team}" name="Team" value="${team}"><label for="team${team}">${team}</label>`;
//}
byID('div7').innerHTML += '<input type="radio" id="team72" name="Team" value="72"><label for="team72">72</label>';
byID('div7').innerHTML += '<input type="radio" id="team73" name="Team" value="73"><label for="team73">73</label>';
byID('divteam').innerHTML += '<div class="hide" id="divTC"></div>';
byID('divTC').innerHTML += '<input type="radio" id="teamTC" name="Team" value="TC"><label for="teamTC">TC</label>';

/******
INSERT POSITION RADIO VALUES
******/
const positions = ['Driver', 'Driver Trainee', 'Sub Driver', 'Attendant', 'Unassigned Attendant', 'Attendant Trainee', 'Sub Attendant', 'Activity Driver'];
for (const position of positions) {
    byID('divposition').innerHTML += `<input type="radio" id="pos${position.replace(' ', '')}" name="Position" value="${position}"><label for="pos${position.replace(' ', '')}">${position}</label>`;
}
/******
INSERT SCHEDULED HOURS
******/
byID('divDailyhours').innerHTML += '<input type="radio" id="hrs80" name="Dailyhours" value="8.0"><label for="hrs80">8.0</label>';
byID('divDailyhours').innerHTML += '<input type="radio" id="hrs75" name="Dailyhours" value="7.5"><label for="hrs75">7.5</label>';
byID('divDailyhours').innerHTML += '<input type="radio" id="hrs70" name="Dailyhours" value="7.0"><label for="hrs70">7.0</label>';
byID('divDailyhours').innerHTML += '<input type="radio" id="hrs65" name="Dailyhours" value="6.5"><label for="hrs65">6.5</label>';
byID('divDailyhours').innerHTML += '<input type="radio" id="hrs60" name="Dailyhours" value="6.0"><label for="hrs60">6.0</label>';
byID('divDailyhours').innerHTML += '<input type="radio" id="hrs55" name="Dailyhours" value="5.5"><label for="hrs55">5.5</label>';
byID('divDailyhours').innerHTML += '<input type="radio" id="hrs50" name="Dailyhours" value="5.0"><label for="hrs50">5.0</label>';

/******
INSERT OTHER WORK FIELDS
******/
byID("divOWAdd").innerHTML += insertOW(20);
byID("divOWAdd").innerHTML += insertOW(21);
byID("divOWAdd").innerHTML += insertOW(22);
byID("divOWAdd").innerHTML += insertOW(23);
byID("divOWAdd").innerHTML += insertOW(24);
byID("divOWAdd").innerHTML += insertOW(25);
byID("divOWAdd").innerHTML += insertOW(26);
byID("divOWAdd").innerHTML += insertOW(27);
byID("divOWAdd").innerHTML += insertOW(28);
byID("divOWAdd").innerHTML += insertOW(29);

function insertOW(i) {
    return `
        <div class="tinycard bg-teal2 hide" id="OWDiv${i}">
        <div class="row">
        <div class="category col-11">Other Work
        <span class="fas fa-question-circle ow"></span></div>
        <div class="col-1 center">
        <span class="fas fa-trash-alt" id="OWTrash${i}"></span></div></div>
        <div class="row"><div class="col-auto"><input type="checkbox" class="chkOJT" id="OJT${i}"><label class="lblBtnFalse" for="OJT${i}">OJT</label>
        <input type="checkbox" id="QL${i}" disabled>
        <label class="lblBtnFalse" for="QL${i}">Q/L</label></div></div>
        <div class="row"><div class="col-12">
        <select id="Select${i}" class="selectwidth selectOW">
        <option value="">--Select work--</option>
        <optgroup label="Work Categories">
        <option value="FYI">FYI</option>
        <option value="OTHR">Other</option>
        <option value="GT">Garage trip</option>
        <option value="FUEL">Fuel</option>
        <option value="RC">Run Coverage</option>
        <option value="Q/L">Q/L Coverage</option>
        <option value="CPR">CPR/First Aid</option>
        <option value="RCRT">Recertification</option>
        <option value="MTNG">Meeting</option>
        <option value="TRNG">Training</option>
        <option value="MNTR">Mentor</option>
        <option value="MED">Physical/Drug Test</option>
        <option value="CST">Cold Start Team</option>
        </optgroup><optgroup label="**Require Admin Approval">
        <option value="ES2">**2 Hr Delay - Early start</option>
        <option value="ES0">**On Time - Early start</option>
        <option value="CBK">**Call back</option></select>
        </optgroup></div></div>
        <div class="row"><div class="col-12">
        <input id="Desc${i}" type="text" class="descwidth owdesc" style="text-align: left;" placeholder="Additional notes..." spellcheck="true" autocorrect="on">
        </div></div>
        <div class="row"><div class="col-11">
        <input id="Time${i}S" text="text" type="text" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>
        <input id="Time${i}E" text="text" type="text" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>
        <input id="Time${i}" text="text" type="text" class="total-time txtTime" data-disable-touch-keyboard></div>
        <div class="col-1"><span class="fas fa-times" id="ClearOW${i}"></span></div></div></div>`;
}

/******
INSERT OTHER WORK FIELDS
******/
byID("divFTAdd").innerHTML += insertFT(30);
byID("divFTAdd").innerHTML += insertFT(31);
byID("divFTAdd").innerHTML += insertFT(32);
byID("divFTAdd").innerHTML += insertFT(33);
byID("divFTAdd").innerHTML += insertFT(34);

function insertFT(i) {
    return `
        <div class="tinycard bg-teal3 hide" id="FTDiv${i}">
        <div class="row">
        <div class="category col-11">Field Trip
        <span class="fas fa-question-circle ft"></span><input type="checkbox" class="btnNSD" id="NSD${i}"><label class="lblBtnFalse btnNSD" for="NSD${i}">Non-School Day</label></div>
        <div class="col-1 center">
        <span class="fas fa-trash-alt" id="FTTrash${i}"></span></div></div>
        <div class="row">
        <div class="col-6">
        <input id="Voucher${i}" type="text" class="voucherwidth ftvoucher" placeholder="Voucher"></div>
        <div class="col-6 center"><input type="checkbox" class="chkOJT" id="OJT${i}"><label class="lblBtnFalse" for="OJT${i}">OJT</label>
        <input type="checkbox" class="chkFTQL" id="QL${i}"><label class="lblBtnFalse" for="QL${i}">Q/L</label></div></div>
        <div class="row"><div class="col-12">
        <input id="From${i}" type="text" class="ftwidth txtFT" placeholder="Origin..." data-disable-touch-keyboard></div></div>
        <div class="row"><div class="col-12">
        <input id="To${i}" type="text" class="ftwidth txtFT" placeholder="Destination..." data-disable-touch-keyboard></div></div>
        <div class="row"><div class="col-11">
        <input id="Time${i}S" type="text" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>
        <input id="Time${i}E" type="text" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>
        <input id="Time${i}" type="text" class="total-time txtTime" data-disable-touch-keyboard></div>
        <div class="col-1"><span class="fas fa-times" id="ClearFT${i}"></span></div></div></div>`;
}

/******
INSERT OTHER WORK FIELDS
******/
byID("divLVAdd").innerHTML += insertLVAD();
byID("divLVAdd").innerHTML += insertLV(40);
byID("divLVAdd").innerHTML += insertLV(41);

function insertLVAD() {
    return `
        <div class="tinycard bg-gold hide" id="LVDivAD"><div class="row"><div class="col-11">
        <p class="category">Leave - All Day</p></div>
        <div class="col-1"><span class="fas fa-trash-alt" id="LVTrashAD"></span></div></div><div class="row">
        <div class="col-8"><select id="LeaveSelectAD">
        <option value="">--Select Leave--</option>
        <option value="SICK-IND">Sick-Indv</option>
        <option value="SICK-FAM">Sick-Family</option>
        <option value="PERSONAL">Personal</option>
        <option value="LWOP">LWOP</option>
        <option value="CIVIL">Civil</option>
        <option value="SICK-FMLA">FMLA</option>
        <option value="SICK-INJ">Injury</option>
        </select></div>
        <div class="col-4"><input type="checkbox" class="chkLV" id="LeaveAD"><label for="LeaveAD">ALL DAY</label></div>
        </div></div>`;
}

function insertLV(i) {
    return `
        <div class="tinycard bg-gold hide" id="LVDiv${i}"><div class="row"><div class="col-11">
        <p class="category">Leave - ${(i === 40) ? 'AM/PM' : 'Other'}</p></div>
        <div class="col-1"><span class="fas fa-trash-alt" id="LVTrash${i}"></span></div></div><div class="row">
        <div class="col-12">
        <select id="LeaveSelect${i}">
        <option value="">--Select Leave--</option>
        <option value="SICK-IND">Sick-Indv</option>
        <option value="SICK-FAM">Sick-Family</option>
        <option value="PERSONAL">Personal</option>
        <option value="LWOP">LWOP</option>
        <option value="CIVIL">Civil</option>
        <option value="SICK-FMLA">FMLA</option>
        <option value="SICK-INJ">Injury</option>
        </select></div></div><div class="row"><div class="col-12">
        <input id="Time${i}S" type="text" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>
        <input id="Time${i}E" type="text" class="timewidth txtTime" placeholder="- - : - -" data-disable-touch-keyboard>
        <input id="Time${i}" type="text" class="total-time txtTime" data-disable-touch-keyboard></div>
        </div></div>`;
}

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

byID("WeekOf").innerHTML += '<option value="">--Select Week--</option>';
for (let i = -21; i < 8; i += 7) {
    const range = DateRange(i);
    byID("WeekOf").innerHTML += `<option value="${dateString(range)}">${range}</option>`;
}
