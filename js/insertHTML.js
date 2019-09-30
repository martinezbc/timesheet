function insertOtherWork(i) {
    return `<div class="tinycard bg-teal2 hide" id="OWDiv${i}">
            <div class="row">
            <div class="category col-11">Other Work
            <span class="fas fa-question-circle ow"></span>
            </div>
            <div class="col-1 center">
            <span class="fas fa-trash-alt" id="OWTrash${i}"></span>
            </div>
            </div>
            <div class="row">
            <div class="col-auto">
            <input type="checkbox" name="chkOJT" id="OJT${i}">
            <label class="lblBtnFalse" for="OJT${i}">OJT</label>&nbsp;
            <input type="checkbox" id="QL${i}" disabled>
            <label class="lblBtnFalse" for="QL${i}">Q/L</label>
            </div>
            </div>
            <div class="row">
            <div class="col-12">
            <select name="selectOW" id="Select${i}" class="selectwidth">
            <option value="">--Select work--</option>
            <option value="FYI">FYI</option>
            <option value="OTHR">Other</option>
            <option value="GT">Garage trip</option>
            <option value="FUEL">Fuel</option>
            <option value="RC">Run coverage</option>
            <option value="Q/L">Q/L Coverage</option>
            <option value="CPR">CPR/First Aid</option>
            <option value="RCRT">Recertification</option>
            <option value="MTNG">Meeting</option>
            <option value="TRNG">Training</option>
            <option value="MED">Physical/Drug Test</option>
            <option value="CS">Cold start team</option>
            <option value="ES2">2 Hr Delay - Early start</option>
            <option value="ES0">On Time - Early start</option>
            <option value="CBK">Call back</option>
            </select>
            </div>
            </div>
            <div class="row">
            <div class="col-12">
            <input id="Desc${i}" type="text" name="owdesc" class="descwidth" style="text-align: left;" placeholder="Additional notes...">
            </div>
            </div>
            <div class="row">
            <div class="col-11">
            <input type="text" name="txtTime" id="Time${i}S" class="timewidth" placeholder="- - : - -" disabled>&nbsp;
            <input type="text" name="txtTime" id="Time${i}E" class="timewidth" placeholder="- - : - -" disabled>&nbsp;
            <input type="text" id="Time${i}" class="total-time nofocus" disabled>
            </div>
            <div class="col-1"><span class="fas fa-times" id="ClearOW${i}"></span></div>
            </div>
            </div>`;
}

function insertLeave(i) {
    let strHTML = `
        <div class="tinycard bg-gold hide" id="Leave${i}">
        <div class="row">
        <div class="col-12">
        <p class="category">Leave</p>
        </div>
        </div>
        <div class="row">
        <div class="col-3">`;
    if (i === 40) {
        strHTML += `<input type="checkbox" name="chkLV" id="LeaveAD"><label for="LeaveAD">ALL DAY</label>`;
    }
    strHTML += `
        </div>
        <div class="col-8 right">
        <select id="LeaveSelect${i}">
        <option value="">--Select Leave--</option>
        <option value="SICK-IND">Sick-Indv</option>
        <option value="SICK-FAM">Sick-Family</option>
        <option value="PERSONAL">Personal</option>
        <option value="LWOP">LWOP</option>
        <option value="CIVIL">Civil</option>
        <option value="SICK-FMLA">FMLA</option>
        <option value="SICK-INJ">Injury</option>
        </select>
        </div>
        <div class="col-1">
        </div>
        </div>
        <div class="row">
        <div class="col-11">
        <input id="Time${i}S" type="text" name="txtTime" class="timewidth" placeholder="- - : - -" disabled>&nbsp;
        <input id="Time${i}E" type="text" name="txtTime" class="timewidth" placeholder="- - : - -" disabled>&nbsp;
        <input id="Time${i}" type="text" class="total-time nofocus" disabled>
        </div>
        <div class="col-1"><span class="fas fa-times" id="ClearLV${i}"></span>
        </div>
        </div>
        </div>`;
    return strHTML;
}

function insertFieldTrip(i) {
    return `
        <div class="tinycard bg-teal3 hide" id="FTDiv${i}">
        <div class="row">
        <div class="category col-11">Field Trip&nbsp;
        <span class="fas fa-question-circle ft"></span>
        </div>
        <div class="col-1 center">
        <span class="fas fa-trash-alt" id="FTTrash${i}"></span>
        </div>
        </div>
        <div class="row">
        <div class="col-6">
        <input id="Voucher${i}" type="text" class="voucherwidth" placeholder="Voucher" name="ftvoucher">
        </div>
        <div class="col-6 center">
        <input type="checkbox" name="chkOJT" id="OJT${i}"><label class="lblBtnFalse" for="OJT${i}">OJT</label>&nbsp;
        <input type="checkbox" name="chkFTQL" id="QL${i}"><label class="lblBtnFalse" for="QL${i}">Q/L</label></div>
        </div>
        <div class="row">
        <div class="col-12">
        <input id="From${i}" type="text" name="txtFT" placeholder="Origin..." style="text-align:left;" class="ftwidth" disabled>
        </div>
        </div>
        <div class="row">
        <div class="col-12">
        <input id="To${i}" type="text" name="txtFT" placeholder="Destination..." style="text-align:left;" class="ftwidth" disabled>
        </div>
        </div>
        <div class="row">
        <div class="col-11">
        <input type="text" name="txtTime" id="Time${i}S" class="timewidth" placeholder="- - : - -" disabled>&nbsp;
        <input type="text" name="txtTime" id="Time${i}E" class="timewidth" placeholder="- - : - -" disabled>&nbsp;
        <input type="text" id="Time${i}" class="total-time nofocus" disabled>
        </div>
        <div class="col-1">
        <span class="fas fa-times" id="ClearFT${i}"></span>
        </div>
        </div>
        </div>`;
}