const areas = ["1", "2", "3", "4", "7", "TC"];
const divarea = document.getElementById('divarea');
for (const area of areas) {
    divarea.innerHTML += `<input type="radio" id="area${area}" name="Area" value="${area}"><label for="area${area}">${area}</label>`;
}

const divteam = document.getElementById('divteam');
for (const area of areas) {
    divteam.innerHTML += `<div class="hide" id="div${area}"></div>`;
}

const teams = {teams1: ['10', '11', '12', '13', '14', '15', '16', '17'], teams2: ['20', '21', '22', '23', '24', '25', '26', '27'], teams3: ['30', '31', '32', '33', '34', '35', '36', '37'], teams4: ['40', '41', '42', '43', '44', '45', '46', '47'], teams7: ['ACA', 'ALTM', 'ALTP', 'AUR', 'CARD', 'FCPS', 'FR', 'IVY', 'KING', 'KK', 'KT', 'LAB', 'LOU', 'MATH', 'PHIL', 'RIV', 'SCOL']};
for (let i = 0; i < teams.length; i++) {
    let div = 'div' + (i < 8) ? "1" : (i > 7 && i < 15) ? "2" : (i > 14 && i < 22) ? "3" : (i > 21) ? "4" : i;
    document.getElementById(div).innerHTML += `<input type="radio" id="team${i}" name="Team" value="${i}"><label for="team${i}">${i}</label>`;
}
//        strHTML += ``;
//    }
//    strHTML += '';
//     strHTML;
//}
