function dateString(strDate) {
    let str = strDate.substr(0, 2) + "/" + strDate.substr(2, 2) + "/" + strDate.substr(4, 4) + " - ";
    str += strDate.substr(8, 2) + "/" + strDate.substr(10, 2) + "/" + strDate.substr(12, 4);
    return str
}

let week = localStorage.getItem('WeekOf');
objThis = JSON.parse(localStorage.getItem(week + "Obj"));

function getDateField(x) {
    switch (x.substr(0, 3)) {
        case "Sat":
            x = objThis.Data.SatDate;
            break;
        case "Sun":
            x = objThis.Data.SunDate;
            break;
        case "Mon":
            x = objThis.Data.MonDate;
            break;
        case "Tue":
            x = objThis.Data.TueDate;
            break;
        case "Wed":
            x = objThis.Data.WedDate;
            break;
        case "Thu":
            x = objThis.Data.ThuDate;
            break;
        case "Fri":
            x = objThis.Data.FriDate;
            break;
    }
    return x;
}

function removeAMPM(x) {
    return x.replace("AM", "").replace("PM", "")
}

function addPrepTime(x) {
    x = Number(x);
    x += 0.25;
    return x.toFixed(2);
}

//        document.addEventListener('DOMContentLoaded', function() {
//            try {
let pdf = jsPDF("p", "pt", "letter");

let margin = 20,
    vOffset = 0,
    hOffset = 0,
    x = "",
    i = 0;

//Page width: (8.5 * 72dpi) = 612;
//Page length: (11 * 72dpi) = 792


//********HEADER********//
let img = imgLogo;
pdf.addImage(img, "JPEG", 20, 20, 20, 20);

vOffset = margin + 15;
hOffset = 45;
pdf.setFontSize(14);
pdf.setFontStyle("bold");
pdf.text(hOffset, vOffset + 2, "TRANSPORTATION WEEKLY REPORT");

hOffset += 280;
pdf.setFontSize(10);
pdf.setFontStyle("normal");
//            pdf.text(hOffset, vOffset + 4, "Employee ID:");
//            pdf.setFontStyle("bold");
//            pdf.setFontSize(12);
//            hOffset += 62;
//            x = objThis.Data.EmpID");
//            pdf.text(hOffset, vOffset + 4, x || "");
hOffset += 38;
pdf.setFontSize(10);

hOffset += 53;
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset + 4, "Week Of:");
pdf.setFontStyle("bold");
pdf.setFontSize(12);
x = dateString(objThis.Data.WeekOf);
pdf.text(hOffset + 45, vOffset + 4, x || "");
pdf.setFontSize(10);

pdf.setDrawColor(0, 0, 0);
pdf.setLineWidth(1);
pdf.line(margin, vOffset + 7, 592, vOffset + 7);
pdf.setLineWidth(0.5);
//pdf.setLineDash([2, 2, 4, 2]);
pdf.line(margin, vOffset + 22, 592, vOffset + 22);
pdf.setLineWidth(1);
//pdf.setLineDash();

//********FIRST LINE********//
vOffset += 19;
hOffset = margin + 5;

pdf.setFontSize(10);
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset, "Area:");
pdf.setFontStyle("bold");
hOffset += 28;
pdf.setFontSize(12);
x = objThis.Data.Area;
pdf.text(hOffset, vOffset, x || "");
pdf.setFontSize(10);

hOffset += 60;
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset, "Team:");
pdf.setFontStyle("bold");
hOffset += 32;
pdf.setFontSize(12);
x = objThis.Data.Team;
pdf.text(hOffset, vOffset, x || "");
pdf.setFontSize(10);

hOffset += 60;
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset, "Name:");
pdf.setFontStyle("bold");
hOffset += 35;
pdf.setFontSize(12);
x = objThis.Data.EmpName;
pdf.text(hOffset, vOffset, x || "");
pdf.setFontSize(10);

hOffset += 270;
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset, "Vehicle:");
pdf.setFontStyle("bold");
pdf.setFontSize(12);
hOffset += 38;
x = objThis.Data.Veh1;
pdf.text(hOffset, vOffset, x || "");
pdf.setFontSize(10);

//********SECOND LINE********//
vOffset += 14;
hOffset = margin + 5;
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset, "Position:");
pdf.setFontStyle("bold");
hOffset += 45;
pdf.setFontSize(12);
x = objThis.Data.Position;
pdf.text(hOffset, vOffset, x || "");
pdf.setFontSize(10);

//OJT checkbox
hOffset += 140;
pdf.setFontStyle("normal");
x = objThis.Data.OJT;
pdf.setDrawColor(0);
pdf.setFillColor(0, 0, 0);
if (objThis.Data.OJT) {
    pdf.rect(hOffset + 1, vOffset - 9, 44, 10, 'FD');
    pdf.setTextColor(255, 255, 255);
} else {
    pdf.rect(hOffset + 1, vOffset - 9, 44, 10);
    pdf.setTextColor(0, 0, 0);
}
pdf.setFontSize(7);
pdf.setFontStyle('bold');
pdf.text(hOffset + 3, vOffset - 1.5, 'OJT Trainer');
pdf.setTextColor(0, 0, 0);
hOffset += 50;
pdf.setFontStyle("normal");
pdf.setFontSize(10);
if (x) {
    pdf.text(hOffset, vOffset, "Trainee:");
    pdf.setFontStyle("bold");
    x = objThis.Data.Trainee;
    pdf.text(hOffset + 40, vOffset, x);
}

hOffset += 200;
pdf.setFontStyle("normal");
pdf.setFontSize(10);
pdf.text(hOffset, vOffset, "Spares:");
hOffset += 38;
pdf.setFontSize(12);
pdf.setFontStyle("bold");
x = objThis.Data.Veh2;
x = (objThis.Data.Veh3 !== "") ? x + " / " + objThis.Data.Veh3 : x;
x = (objThis.Data.Veh4 !== "") ? x + " / " + objThis.Data.Veh4 : x;
pdf.text(hOffset, vOffset, x || "");
pdf.setFontSize(10);
vOffset += 2;

//********ROUTE COUNTS********//
function getPupilCount1(day, type, i) {
    if (!objThis[day][`${day}RC${i}${type}`]) {
        pdf.text(hOffset, vOffset - 8, objThis[day][`${day}${type}${i}Ct`] || "");
    } else {
        pdf.setFontSize(7);
        pdf.text(hOffset, vOffset - 2, objThis[day][`${day}RC${i}${type}`], 17.8);
        pdf.setFontSize(9);
    }
}

function getPupilCount2(day, type, i) {
    if (!objThis[day][`${day}RC${i}${type}`]) {
        pdf.text(hOffset + 38, vOffset, objThis[day][`${day}${type}${i}Ct`] || "");
    } else {
        pdf.setFontSize(7);
        pdf.text(hOffset + 20, vOffset + 1, objThis[day][`${day}RC${i}${type}`], 17.8);
        pdf.setFontSize(9);
    }
}

vOffset += 12;
let routeOffset = vOffset - 9
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(0, 103, 127);
pdf.rect(margin, vOffset - 10, 572, 12, "FD");
pdf.setFontSize(9);
pdf.setTextColor(0,0,0);
hOffset += 130;
pdf.setFontStyle("bold");
pdf.setTextColor(255,255,255);
pdf.text(hOffset, vOffset, "Pupil Counts");
hOffset += 202;
pdf.text(hOffset, vOffset, "Pupil Time");
hOffset += 88;
pdf.text(hOffset, vOffset, "PAC/PS");
hOffset += 54;
pdf.text(hOffset, vOffset, "Shuttle");
hOffset += 54;
pdf.text(hOffset, vOffset, "Late Run");

vOffset += 13;
hOffset = margin;
pdf.setTextColor(0,0,0);
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(209, 241, 245);
pdf.rect(margin, vOffset - 11, 572, 13, "FD");

hOffset += 5;
pdf.setTextColor(0,0,0);
pdf.setFontSize(9);
pdf.setFontStyle("bold");
pdf.text(hOffset, vOffset, "AM");
hOffset += 22;
pdf.setFontSize(8);
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset, objThis.Data.AMRoute1 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.AMRoute2 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.AMRoute3 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.AMRoute4 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.AMRoute5 || "");
hOffset += 57.5;
pdf.setFontStyle("bold");
pdf.text(hOffset - 1, vOffset, "First Pickup");
hOffset += 57.5;
pdf.text(hOffset - 3, vOffset, "Last Drop Off");
hOffset += 54;
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset, objThis.Data.PSRoute1 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.SHRoute1 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.LRRoute1 || "");


vOffset += 13;
hOffset = margin;
pdf.setTextColor(0,0,0);
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(209, 241, 245);
pdf.rect(margin, vOffset - 11, 572, 13, "FD");
pdf.setFontSize(9);
pdf.setFontStyle("bold");
hOffset += 5;
pdf.text(hOffset, vOffset, "PM");
pdf.setFontSize(8);
pdf.setFontStyle("normal");
hOffset += 22;
pdf.text(hOffset, vOffset, objThis.Data.PMRoute1 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.PMRoute2 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.PMRoute3 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.PMRoute4 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.PMRoute5 || "");
hOffset += 57.5;
pdf.setFontStyle("bold");
pdf.text(hOffset - 1, vOffset, "First Pickup");
hOffset += 57.5;
pdf.text(hOffset - 3, vOffset, "Last Drop Off");
hOffset += 54;
pdf.setFontStyle("normal");
pdf.text(hOffset, vOffset, objThis.Data.PSRoute2 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.SHRoute2 || "");
hOffset += 54;
pdf.text(hOffset, vOffset, objThis.Data.LRRoute2 || "");

vOffset += 18;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(255, 255, 255);
pdf.rect(margin, vOffset - 16, 572, 18, "FD");
pdf.setDrawColor(0, 0, 0);
hOffset += 2;
pdf.setFontSize(9);
pdf.setFontStyle("bold");
pdf.text(hOffset, vOffset, "Mon");
pdf.setFontStyle("normal");
hOffset += 26;
getPupilCount1("Mon", "AM", 1);
getPupilCount2("Mon", "PM", 1);
hOffset += 54;
pdf.setDrawColor(120, 120, 120);
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Mon", "AM", 2);
getPupilCount2("Mon", "PM", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Mon", "AM", 3);
getPupilCount2("Mon", "PM", 3);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Mon", "AM", 4);
getPupilCount2("Mon", "PM", 4);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Mon", "AM", 5);
getPupilCount2("Mon", "PM", 5);
hOffset += 57.5;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Mon.MonTimeA.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Mon.MonTimeC.replace(" AM", "").replace(" PM", "") || "");
hOffset += 57.5;
pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Mon.MonTimeB.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Mon.MonTimeD.replace(" AM", "").replace(" PM", "") || "");
hOffset += 54;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Mon", "PS", 1);
getPupilCount2("Mon", "PS", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Mon", "SH", 1);
getPupilCount2("Mon", "SH", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Mon", "LR", 1);
getPupilCount2("Mon", "LR", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);

vOffset += 18;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(210, 210, 210);
pdf.rect(margin, vOffset - 16, 572, 18, "FD");
pdf.setDrawColor(0, 0, 0);
hOffset += 2;
pdf.setFontStyle("bold");
pdf.text(hOffset, vOffset, "Tue");
pdf.setFontStyle("normal");
hOffset += 26;
getPupilCount1("Tue", "AM", 1);
getPupilCount2("Tue", "PM", 1);
hOffset += 54;
pdf.setDrawColor(120, 120, 120);
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Tue", "AM", 2);
getPupilCount2("Tue", "PM", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Tue", "AM", 3);
getPupilCount2("Tue", "PM", 3);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Tue", "AM", 4);
getPupilCount2("Tue", "PM", 4);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Tue", "AM", 5);
getPupilCount2("Tue", "PM", 5);
hOffset += 57.5;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Tue.TueTimeA.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Tue.TueTimeC.replace(" AM", "").replace(" PM", "") || "");
hOffset += 57.5;
pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Tue.TueTimeB.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Tue.TueTimeD.replace(" AM", "").replace(" PM", "") || "");
hOffset += 54;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Tue", "PS", 1);
getPupilCount2("Tue", "PS", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Tue", "SH", 1);
getPupilCount2("Tue", "SH", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Tue", "LR", 1);
getPupilCount2("Tue", "LR", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);

vOffset += 18;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(255, 255, 255);
pdf.rect(margin, vOffset - 16, 572, 18, "FD");
pdf.setDrawColor(0, 0, 0);
hOffset += 2;
pdf.setFontStyle("bold");
pdf.text(hOffset, vOffset, "Wed");
pdf.setFontStyle("normal");
hOffset += 26;
getPupilCount1("Wed", "AM", 1);
getPupilCount2("Wed", "PM", 1);
hOffset += 54;
pdf.setDrawColor(120, 120, 120);
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Wed", "AM", 2);
getPupilCount2("Wed", "PM", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Wed", "AM", 3);
getPupilCount2("Wed", "PM", 3);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Wed", "AM", 4);
getPupilCount2("Wed", "PM", 4);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Wed", "AM", 5);
getPupilCount2("Wed", "PM", 5);
hOffset += 57.5;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Wed.WedTimeA.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Wed.WedTimeC.replace(" AM", "").replace(" PM", "") || "");
hOffset += 57.5;
pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Wed.WedTimeB.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Wed.WedTimeD.replace(" AM", "").replace(" PM", "") || "");
hOffset += 54;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Wed", "PS", 1);
getPupilCount2("Wed", "PS", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Wed", "SH", 1);
getPupilCount2("Wed", "SH", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Wed", "LR", 1);
getPupilCount2("Wed", "LR", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);

vOffset += 18;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(210, 210, 210);
pdf.rect(margin, vOffset - 16, 572, 18, "FD");
pdf.setDrawColor(0, 0, 0);
hOffset += 2;
pdf.setFontStyle("bold");
pdf.text(hOffset, vOffset, "Thu");
pdf.setFontStyle("normal");
hOffset += 26;
getPupilCount1("Thu", "AM", 1);
getPupilCount2("Thu", "PM", 1);
hOffset += 54;
pdf.setDrawColor(120, 120, 120);
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Thu", "AM", 2);
getPupilCount2("Thu", "PM", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Thu", "AM", 3);
getPupilCount2("Thu", "PM", 3);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Thu", "AM", 4);
getPupilCount2("Thu", "PM", 4);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Thu", "AM", 5);
getPupilCount2("Thu", "PM", 5);
hOffset += 57.5;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Thu.ThuTimeA.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Thu.ThuTimeC.replace(" AM", "").replace(" PM", "") || "");
hOffset += 57.5;
pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Thu.ThuTimeB.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Thu.ThuTimeD.replace(" AM", "").replace(" PM", "") || "");
hOffset += 54;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Thu", "PS", 1);
getPupilCount2("Thu", "PS", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Thu", "SH", 1);
getPupilCount2("Thu", "SH", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Thu", "LR", 1);
getPupilCount2("Thu", "LR", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);

vOffset += 18;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(255, 255, 255);
pdf.rect(margin, vOffset - 16, 572, 18, "FD");
pdf.setDrawColor(0, 0, 0);
hOffset += 2;
pdf.setFontStyle("bold");
pdf.text(hOffset, vOffset, "Fri");
pdf.setFontStyle("normal");
hOffset += 26;
getPupilCount1("Fri", "AM", 1);
getPupilCount2("Fri", "PM", 1);
hOffset += 54;
pdf.setDrawColor(120, 120, 120);
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Fri", "AM", 2);
getPupilCount2("Fri", "PM", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Fri", "AM", 3);
getPupilCount2("Fri", "PM", 3);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Fri", "AM", 4);
getPupilCount2("Fri", "PM", 4);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Fri", "AM", 5);
getPupilCount2("Fri", "PM", 5);
hOffset += 57.5;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Fri.FriTimeA.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Fri.FriTimeC.replace(" AM", "").replace(" PM", "") || "");
hOffset += 57.5;
pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
pdf.text(hOffset - 3, vOffset - 7, objThis.Fri.FriTimeB.replace(" AM", "").replace(" PM", "") || "");
pdf.text(hOffset + 25, vOffset, objThis.Fri.FriTimeD.replace(" AM", "").replace(" PM", "") || "");
hOffset += 54;
pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Fri", "PS", 1);
getPupilCount2("Fri", "PS", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Fri", "SH", 1);
getPupilCount2("Fri", "SH", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
getPupilCount1("Fri", "LR", 1);
getPupilCount2("Fri", "LR", 2);
hOffset += 54;
pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);


pdf.setDrawColor(0, 0, 0);
pdf.line(45, routeOffset + 11, 45, vOffset + 2);
pdf.line(99, routeOffset + 11, 99, vOffset + 2);
pdf.line(153, routeOffset + 11, 153, vOffset + 2);
pdf.line(207, routeOffset + 11, 207, vOffset + 2);
pdf.line(261, routeOffset + 11, 261, vOffset + 2);
pdf.line(315, routeOffset, 315, vOffset + 2);
pdf.line(372.5, routeOffset + 11, 372.5, vOffset + 2);
pdf.line(430, routeOffset, 430, vOffset + 2);
pdf.line(484, routeOffset, 484, vOffset + 2);
pdf.line(538, routeOffset, 538, vOffset + 2);
vOffset += 2;

//**REGULAR RUNS**//
vOffset += 12;
let vTimeStart = vOffset - 9; //Needed for the lines used later
hOffset = margin + 15;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(0, 103, 127);
pdf.rect(margin, vOffset - 10, 572, 12, "FD");
pdf.setFontSize(9);
pdf.setFontStyle("bold");
pdf.setTextColor(255,255,255);
hOffset += 50;
pdf.text(hOffset, vOffset, "Regular Runs");
hOffset += 130;
pdf.text(hOffset, vOffset, "PAC/Preschool");
hOffset += 130;
pdf.text(hOffset, vOffset, "Shuttles");
hOffset += 130;
pdf.text(hOffset, vOffset, "Late Run");
hOffset += 85;
pdf.text(hOffset, vOffset, "Daily");

vOffset += 13;
hOffset = margin;
pdf.setTextColor(0,0,0);
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(209, 241, 245);
pdf.rect(margin, vOffset - 11, 572, 13, "FD");
pdf.setFontSize(9);
hOffset += 38;
pdf.setTextColor(0,0,0);
pdf.text(hOffset, vOffset - 2, "Start");
hOffset += 40;
pdf.text(hOffset, vOffset - 2, "End");
hOffset += 48;
pdf.text(hOffset, vOffset - 2, "Total");
hOffset += 37;
pdf.text(hOffset, vOffset - 2, "Start");
hOffset += 40;
pdf.text(hOffset, vOffset - 2, "End");
hOffset += 48;
pdf.text(hOffset, vOffset - 2, "Total");
hOffset += 37;
pdf.text(hOffset, vOffset - 2, "Start");
hOffset += 40;
pdf.text(hOffset, vOffset - 2, "End");
hOffset += 48;
pdf.text(hOffset, vOffset - 2, "Total");
hOffset += 37;
pdf.text(hOffset, vOffset - 2, "Start");
hOffset += 40;
pdf.text(hOffset, vOffset - 2, "End");
hOffset += 48;
pdf.text(hOffset, vOffset - 2, "Total");
hOffset += 39;
pdf.text(hOffset, vOffset - 2, "Total");
pdf.setFontStyle("normal");

vOffset -= 2;
for (const day of weekdays) {
    vOffset += 14;
    hOffset = margin;
    pdf.setDrawColor(0, 0, 0);
    if (day === "Tue" || day === "Thu") {
        pdf.setFillColor(210, 210, 210);
    } else {
        pdf.setFillColor(255, 255, 255);
    }
    pdf.rect(margin, vOffset - 12, 534, 14, "FD");
    pdf.setFontStyle("bold");

    hOffset += 2;
    pdf.setFontSize(9);
    x = objThis.Data[`${day}Date`] || "";
    pdf.text(hOffset, vOffset, x || "");

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 36;
    x = objThis[day][`${day}Time11S`] || "";
    pdf.text(hOffset, vOffset, x || "");
    hOffset += 40;
    x = objThis[day][`${day}Time11E`] || "";
    pdf.text(hOffset, vOffset, x || "");
    x = calculateTotal(calculateDiff(day, 11));
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (objThis[day][`${day}OJT11`]) {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x || "");
    }


    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = objThis[day][`${day}Time13S`] || "";
    pdf.text(hOffset, vOffset, x || "");
    hOffset += 40;
    x = objThis[day][`${day}Time13E`] || "";
    pdf.text(hOffset, vOffset, x || "");
    x = calculateTotal(calculateDiff(day, 13));
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (objThis[day][`${day}OJT13`]) {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x || "");
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = objThis[day][`${day}Time15S`] || "";
    pdf.text(hOffset, vOffset, x || "");
    hOffset += 40;
    x = objThis[day][`${day}Time15E`] || "";
    pdf.text(hOffset, vOffset, x || "");
    x = calculateTotal(calculateDiff(day, 15));
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (objThis[day][`${day}OJT15`]) {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x || "");
    }

    vOffset += 14;
    hOffset = margin;
    pdf.setDrawColor(0, 0, 0);
    if (day === "Tue" || day === "Thu") {
        pdf.setFillColor(210, 210, 210);
    } else {
        pdf.setFillColor(255, 255, 255);
    }
    pdf.rect(margin, vOffset - 12, 534, 14, "FD");
    pdf.setDrawColor(0, 0, 0);
    pdf.setFontSize(7);
    pdf.setFontStyle("bold");
    hOffset += 2;
    pdf.setDrawColor(0);
    pdf.setFillColor(0, 0, 0);
    if (objThis[day][`${day}QL11`]) {
        pdf.rect(hOffset + 1, vOffset - 10, 14, 10, 'FD');
        pdf.setTextColor(255, 255, 255);
    } else {
        pdf.rect(hOffset + 1, vOffset - 10, 14, 10);
        pdf.setTextColor(0, 0, 0);
    }
    pdf.setFontSize(7);
    pdf.text(hOffset + 3, vOffset - 1.5, 'Q');
    pdf.text(hOffset + 9, vOffset - 1.5, 'L');
    pdf.setTextColor(0, 0, 0);
    pdf.setDrawColor(0);
    pdf.setFillColor(0, 0, 0);
    if (objThis[day][`${day}J11`]) {
        pdf.rect(hOffset + 18, vOffset - 10, 10, 10, 'FD');
        pdf.setTextColor(255, 255, 255);
    } else {
        pdf.rect(hOffset + 18, vOffset - 10, 10, 10);
        pdf.setTextColor(0, 0, 0);
    }
    pdf.text(hOffset + 21, vOffset - 1.5, 'J');
    pdf.setTextColor(0, 0, 0);

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 36;
    x = objThis[day][`${day}Time12S`] || "";
    pdf.text(hOffset, vOffset, x || "");
    hOffset += 40;
    x = objThis[day][`${day}Time12E`] || "";
    pdf.text(hOffset, vOffset, x || "");
    x = calculateTotal(calculateDiff(day, 12));
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (objThis[day][`${day}OJT12`]) {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x || "");
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = objThis[day][`${day}Time14S`] || "";
    pdf.text(hOffset, vOffset, x || "");
    hOffset += 40;
    x = objThis[day][`${day}Time14E`] || "";
    pdf.text(hOffset, vOffset, x || "");
    x = calculateTotal(calculateDiff(day, 14));
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (objThis[day][`${day}OJT14`]) {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x || "");
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = objThis[day][`${day}Time16S`] || "";
    pdf.text(hOffset, vOffset, x || "");
    hOffset += 40;
    x = objThis[day][`${day}Time16E`] || "";
    pdf.text(hOffset, vOffset, x || "");
    x = calculateTotal(calculateDiff(day, 16));
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (objThis[day][`${day}OJT16`]) {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x || "");
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = objThis[day][`${day}Time17S`] || "";
    pdf.text(hOffset, vOffset, x || "");
    hOffset += 40;
    x = objThis[day][`${day}Time17E`] || "";
    pdf.text(hOffset, vOffset, x || "");
    x = calculateTotal(calculateDiff(day, 17));
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (objThis[day][`${day}OJT17`]) {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x || "");
    }
    if (day === "Tue" || day === "Thu") {
        pdf.setFillColor(210, 210, 210);
    } else {
        pdf.setFillColor(255, 255, 255);
    }
    pdf.rect(552, vOffset - 26, 40, 30, "FD");
    hOffset += 38;
    pdf.setFontSize(10);
    x = calculateTotal(calculateRunTime(day));
    pdf.text(hOffset, vOffset - 8, x || "");
}

pdf.setDrawColor(0, 0, 0);
pdf.line(55, vOffset + 6, 55, vTimeStart - 1);
pdf.line(138, vOffset + 6, 138, vTimeStart + 11);
pdf.line(178, vOffset + 6, 178, vTimeStart - 1);
pdf.line(263, vOffset + 6, 263, vTimeStart + 11);
pdf.line(303, vOffset + 6, 303, vTimeStart - 1);
pdf.line(388, vOffset + 6, 388, vTimeStart + 11);
pdf.line(428, vOffset + 6, 428, vTimeStart - 1);
pdf.line(512, vOffset + 6, 512, vTimeStart + 11);
pdf.line(552, vOffset + 6, 552, vTimeStart - 1);

vOffset += 14;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(104, 210, 223);
pdf.rect(hOffset, vOffset - 12, 532, 14, "FD");
hOffset += 395;
pdf.rect(hOffset + 137, vOffset - 12, 40, 14, "FD");
pdf.setFontSize(9);
pdf.text(hOffset, vOffset - 1.5, "ASSIGNED RUNS SUB TOTAL");
hOffset += 137;
pdf.setFontSize(13);
pdf.text(hOffset + 5, vOffset, calculateTotal(weeklyRunTime()));
vOffset += 2;

//OTHER WORK SECTION
vOffset += 12;
vTimeStart = vOffset - 9; //Needed for the lines used later
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(0, 103, 127);
pdf.rect(margin, vOffset - 10, 572, 12, "FD");
pdf.setFontSize(9);
pdf.setFontStyle("bold");
pdf.setTextColor(255,255,255);
hOffset += 140;
pdf.text(hOffset, vOffset, "Other Work Duties");
pdf.text(hOffset + 300, vOffset, "Leave Used");

vOffset += 13;
hOffset = margin;
pdf.setTextColor(0,0,0);
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(209, 241, 245);
pdf.rect(margin, vOffset - 11, 572, 13, "FD");
pdf.setFontSize(9);
pdf.setFontStyle("bold");
hOffset += 5;
pdf.text(hOffset, vOffset - 2, "Date");
hOffset += 28;
pdf.text(hOffset, vOffset - 2, "Q/L");
hOffset += 26;
pdf.text(hOffset, vOffset - 2, "Description");
hOffset += 175;
pdf.text(hOffset, vOffset - 2, "Start");
hOffset += 42;
pdf.text(hOffset, vOffset - 2, "End");
hOffset += 45;
pdf.text(hOffset, vOffset - 2, "Total");
hOffset += 40;
pdf.text(hOffset, vOffset - 2, "Date");
hOffset += 28;
pdf.text(hOffset, vOffset - 2, "Type");
hOffset += 48;
pdf.text(hOffset, vOffset - 2, "All");
hOffset += 17;
pdf.text(hOffset, vOffset - 2, "Start");
hOffset += 40;
pdf.text(hOffset, vOffset - 2, "End");
hOffset += 45;
pdf.text(hOffset, vOffset - 2, "Total");
pdf.setFontStyle("normal");



//FIND OTHER WORK DATA
let otherWork = ["OW0", "OW1", "OW2", "OW3", "OW4", "OW5", "OW6", "OW7", "OW8", "OW9"];
let j = 0;
for (const day of days) {
    for (let k = 20; k < 30; k++) {
        if ((day === "Sat" || day === "Sun") && k > 22) continue;
        if (objThis[day][`${day}Select${k}`] !== "") {
            otherWork[j] = `${day}Time${k}`;
            j++;
        }
    }
}

//FIND LEAVE TAKEN
let leave = ["LV0", "LV1", "LV2", "LV3", "LV4", "LV5", "LV6", "LV7", "LV8", "LV9"];
j = 0;
for (const day of weekdays) {
    if (objThis[day][`${day}Time40S`] !== "") {
        leave[j] = `${day}Time40`;
        j++;
    }
    if (objThis[day][`${day}Time41S`] !== "") {
        leave[j] = `${day}Time41`;
        j++;
    }
    if (objThis[day][`${day}LeaveAD`]) {
        leave[j] = `${day}LeaveAD`;
        j++;
    }
}


let blnOW = false;
let blnLV = false;

vOffset -= 2;
for (let i = 0; i < 10; i++) {
    pdf.setFontStyle("normal");
    vOffset += 14;
    hOffset = margin;
    pdf.setDrawColor(0, 0, 0);
    if (i % 2 === 0) { //alternate color backgrounds
        pdf.setFillColor(255, 255, 255);
    } else {
        pdf.setFillColor(210, 210, 210);
    }
    pdf.rect(margin, vOffset - 12, 357, 14, "FD");
    hOffset += 5;
    blnOW = (otherWork[i] !== `OW${i}`) ? true : false;
    if (blnOW) {
        pdf.setFontSize(9);
        let day = otherWork[i].substr(0, 3);
        let b = otherWork[i].substr(-2);
        let c = objThis[day][`${day}Select${b}`] || "";
        if (c === "ES0" || c === "ES2" || c === "CBK") {
            pdf.setDrawColor(0, 0, 0);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 357, 14, "FD");
        }
        x = getDateField(otherWork[i]) || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 28;
        pdf.setDrawColor(0);
        pdf.setFillColor(0, 0, 0);
        pdf.setFontStyle('bold');
        if (objThis[day][`${day}QL${b}`]) {
            pdf.rect(hOffset, vOffset - 9.5, 13, 9, 'FD');
            pdf.setTextColor(255, 255, 255);
        } else {
            pdf.rect(hOffset, vOffset - 9.5, 13, 9);
            pdf.setTextColor(0, 0, 0);
        }
        pdf.setFontSize(7);
        pdf.text(hOffset + 1.5, vOffset - 2.5, 'Q');
        pdf.text(hOffset + 7.5, vOffset - 2.5, 'L');
        pdf.setTextColor(0, 0, 0);
        pdf.setFontStyle('normal');
        hOffset += 26;
        pdf.setFontSize(9);
        x = objThis[day][`${day}Select${b}`] || "";
        x += " - ";
        x += objThis[day][`${day}Desc${b}`] || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 175;
        x = objThis[day][`${otherWork[i]}S`] || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 42;
        x = objThis[day][`${otherWork[i]}E`] || "";
        pdf.text(hOffset, vOffset, x || "");
        x = calculateTotal(calculateDiff(day, b));
        hOffset += 48;
        pdf.setFontStyle("bold");
        if (objThis[day][`${day}OJT${b}`]) {
            x = "**" + x + "**";
            pdf.text(hOffset, vOffset, x || "");
            hOffset += 5;
        } else {
            hOffset += 2;
            pdf.text(hOffset, vOffset, x || "");
            hOffset += 3;
        }
    } else {
        hOffset += 324;
    }
    hOffset += 28;
    //LEAVE
    pdf.setDrawColor(0, 0, 0);
    pdf.setFontStyle("normal");
    if (i % 2 === 0) { //alternate color backgrounds
        pdf.setFillColor(255, 255, 255);
    } else {
        pdf.setFillColor(210, 210, 210);
    }
    pdf.rect(hOffset, vOffset - 12, 215, 14, "FD");

    blnLV = (leave[i] !== `LV${i}`) ? true : false;
    if (blnLV === true) {
        hOffset += 5;
        let day = leave[i].substr(0, 3);
        let b = leave[i].substr(-2);
        x = getDateField(leave[i]);
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 28;
        pdf.setFontSize(8);
        x = objThis[day][`${day}LeaveSelect${b}`] || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 50;
        if (leave[i].indexOf("LeaveAD") > 0) {
            pdf.setFontStyle('bold');
            pdf.setDrawColor(0);
            pdf.setFillColor(0, 0, 0);
            pdf.rect(hOffset - 2, vOffset - 9.5, 18, 9, 'FD');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(7);
            pdf.text(hOffset, vOffset - 2.5, 'ALL');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontStyle('normal');
        }
        hOffset += 15;
        pdf.setFontSize(9);
        if (leave[i].indexOf("Time") > 0) {
            x = objThis[day][`${leave[i]}S`] || "";
            pdf.text(hOffset, vOffset, x || "");
            hOffset += 40;
            x = objThis[day][`${leave[i]}E`] || "";
            pdf.text(hOffset, vOffset, x || "");
            hOffset += 45;
            pdf.setFontStyle("bold");
            pdf.setFontSize(9);
            x = convertTotal(calculateDiff(day, b));
            pdf.text(hOffset, vOffset, x || "");
        }
    }
}

vOffset += 14;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(104, 210, 223);
pdf.rect(hOffset, vOffset - 12, 318, 14, "FD");
hOffset += 318;
pdf.rect(hOffset, vOffset - 12, 39, 14, "FD");
pdf.setFontSize(9);
pdf.setFontStyle("bold");
pdf.text(hOffset - 160, vOffset - 1.5, "OTHER WORK DUTIES SUB TOTAL");
pdf.setFontSize(13);
pdf.text(hOffset + 3, vOffset, calculateTotal(weeklyOtherTime()));

pdf.setFillColor(209, 241, 245);
pdf.rect(hOffset + 39, vOffset - 40, 215, 42, "FD");
pdf.setFontSize(7);
pdf.setFontStyle("normal");
pdf.text(hOffset + 42, vOffset - 32, "FYI - Info Only \nOTHR - Other \nGT - Garage trip \nFUEL - Fuel \nRC - Run coverage")
pdf.text(hOffset + 104, vOffset - 32, "Q/L - Q/L coverage \nRCRT - Recert \nMTNG - Meeting \nTRNG - Training\nMNTR - Mentor")
pdf.text(hOffset + 171, vOffset - 32, "CST - Cold start team \nMED - Physical/Drug Test \nES2 - Delay Early Start \nES0 - On Time Early Start \nCBK - Call back");

pdf.line(338, vOffset, 338, vTimeStart + 12);
pdf.line(377, vOffset, 377, vTimeStart);
pdf.line(552, vOffset - 40, 552, vTimeStart);
vOffset += 2;

//FIELD TRIP
vOffset += 12;
vTimeStart = vOffset - 9; //Needed for the lines used later
hOffset = margin;
pdf.setFontStyle("normal");
pdf.setFontSize(9);
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(0, 103, 127);
pdf.rect(margin, vOffset - 10, 572, 12, "FD");
pdf.setFontStyle("bold");
pdf.setTextColor(255,255,255);
pdf.text(hOffset + 270, vOffset, "Field Trips");

//FIND OTHER WORK DATA
let fieldTrip = ["FT0", "FT1", "FT2", "FT3", "FT4"];
j = 0;
for (const day of days) {
    for (let k = 30; k < 35; k++) {
        if ((day === "Sat" || day === "Sun") && k > 32) continue;
        if (objThis[day][`${day}Time${k}S`] !== "") {
            fieldTrip[j] = `${day}Time${k}`;
            j++;
        }
    }
}

vOffset += 13;
hOffset = margin;
pdf.setTextColor(0,0,0);
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(209, 241, 245);
pdf.rect(margin, vOffset - 11, 572, 13, "FD");
pdf.setFontSize(9);
hOffset += 10;
pdf.text(hOffset, vOffset - 2, "Date");
hOffset += 30;
pdf.text(hOffset, vOffset - 2, "Q/L");
hOffset += 30;
pdf.text(hOffset, vOffset - 2, "From");
hOffset += 150;
pdf.text(hOffset, vOffset - 2, "To");
hOffset += 150;
pdf.text(hOffset, vOffset - 2, "Voucher");
hOffset += 55;
pdf.text(hOffset, vOffset - 2, "Start");
hOffset += 55;
pdf.text(hOffset, vOffset - 2, "End");
hOffset += 58;
pdf.text(hOffset, vOffset - 2, "Total");
pdf.setFontStyle("normal");

vOffset -= 2;
for (let i = 0; i < 5; i++) {
    vOffset += 14;
    hOffset = margin;
    pdf.setDrawColor(0, 0, 0);
    if (i % 2 === 0) {
        pdf.setFillColor(255, 255, 255);
    } else {
        pdf.setFillColor(210, 210, 210);
    }
    pdf.rect(margin, vOffset - 12, 572, 14, "FD");
    pdf.setDrawColor(0, 0, 0);
    let blnFT = false;

    hOffset += 10;

    blnFT = (fieldTrip[i] !== `FT${i}`) ? true : false;
    if (blnFT) {
        let day = fieldTrip[i].substr(0, 3);
        let b = fieldTrip[i].substr(7);
        if (objThis[day][`${day}NSD${b}`]) {
            pdf.setDrawColor(0, 0, 0);
            pdf.setFillColor(221, 160, 221);
            pdf.rect(margin, vOffset - 12, 572, 14, "FD");
        }
        x = getDateField(fieldTrip[i]);
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 33;
        pdf.setDrawColor(0);
        pdf.setFillColor(0, 0, 0);
        pdf.setFontStyle('bold');
        if (objThis[day][`${day}QL${b}`]) {
            pdf.rect(hOffset, vOffset - 9.5, 13, 9, 'FD');
            pdf.setTextColor(255, 255, 255);
        } else {
            pdf.rect(hOffset, vOffset - 9.5, 13, 9);
            pdf.setTextColor(0, 0, 0);
        }
        pdf.setFontSize(7);
        pdf.text(hOffset + 1.5, vOffset - 2.5, 'Q');
        pdf.text(hOffset + 7.5, vOffset - 2.5, 'L');
        pdf.setTextColor(0, 0, 0);
        pdf.setFontStyle('normal');
        pdf.setFontSize(9);
        hOffset += 27;
        x = objThis[day][`${day}From${b}`] || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 150;
        x = objThis[day][`${day}To${b}`] || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 150;
        x = objThis[day][`${day}Voucher${b}`] || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 55;
        x = objThis[day][`${fieldTrip[i]}S`] || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 55;
        x = objThis[day][`${fieldTrip[i]}E`] || "";
        pdf.text(hOffset, vOffset, x || "");
        hOffset += 58;
        pdf.setFontStyle("bold");
        pdf.setFontSize(10);
        x = convertTotal(calculateDiff(day, b));
        pdf.text(hOffset, vOffset, x || "");
        pdf.setFontStyle("normal");
        pdf.setFontSize(9);
    }
}

vOffset += 14;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(104, 210, 223);
pdf.rect(hOffset, vOffset - 12, 532, 14, "FD");
hOffset += 532;
pdf.rect(hOffset, vOffset - 12, 40, 14, "FD");
pdf.setFontSize(9);
pdf.setFontStyle("bold");
pdf.text(hOffset - 115, vOffset - 1.5, "FIELD TRIPS SUB TOTAL");
pdf.setFontSize(13);
pdf.text(hOffset + 5, vOffset, weeklyFieldTripTime());
pdf.line(552, vOffset, 552, vTimeStart + 11);
vOffset += 2;

vOffset += 12;
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(209, 241, 245);
pdf.rect(hOffset, vOffset - 10, 572, 46, "FD");
pdf.setFontSize(7.5);
pdf.setFontStyle("normal");
hOffset += 2;
x = "I certify that I have performed school duties on the vehicle with number shown above on all runs \nas entered hereon and if driver, I have performed daily pretrip inspection as required. ";
x += "In accordance \nwith regulations and policies of the school board, I have accurately recorded all of the hours I worked. \nI understand that failure to comply with Time and Attendance Reporting policies will be just cause for \ndiscipline up to, and including, separation from FCPS. (Regulation 4293)"
pdf.text(hOffset, vOffset - 2, x || "");

hOffset += 350;
pdf.setFontSize(8);
pdf.setTextColor(0,0,0);
pdf.setFontStyle("bold");

pdf.text(hOffset, vOffset - 1, "Employee \nInitials: ");
pdf.setFontSize(14);
x = objThis.Data.EmpInitials;
pdf.text(hOffset + 45, vOffset + 8, x || "");
pdf.setFontSize(8);
pdf.text(hOffset, vOffset + 23, "Supervisor \nSignature:");

vOffset += 31;
vOffset += 16;
const blnTC = (objThis.Data.Area === "TC") ? true : false;

vTimeStart = vOffset - 9; //Needed for the lines used later
hOffset = margin;
pdf.setDrawColor(0, 0, 0);
pdf.setFillColor(104, 210, 223);
pdf.rect(margin, vOffset - 9, 572, 45, "FD");
pdf.setFontSize(8);
hOffset += 3;
pdf.setFontSize(7);
pdf.setFillColor(209, 241, 245);
pdf.rect(hOffset - 3, vOffset - 9, 114.4, 45, "FD");
pdf.text(hOffset, vOffset - 1, "Assigned Runs\n+ Other Work");
hOffset += 57.2;
//pdf.text(hOffset + 3, vOffset - 1, (blnTC) ? "" : "**Timesheet \nPreparation**");
pdf.text(hOffset + 3, vOffset - 1, "");
pdf.setFontSize(8);
hOffset += 57.2;
pdf.text(hOffset, vOffset - 1, "1R: Sub Total");
hOffset += 57.2;
pdf.text(hOffset, vOffset - 1, "FT: Field Trip");
hOffset += 57.2;
pdf.setFillColor(209, 241, 245);
pdf.rect(hOffset - 3, vOffset - 9, 57.2, 45, "FD");
pdf.text(hOffset, vOffset - 1, "Time Worked");
hOffset = 306;
hOffset += 5;
pdf.text(hOffset, vOffset - 1, "S4: OJT");
hOffset += 57.2;
pdf.text(hOffset, vOffset - 1, "S4: Admin-J");
hOffset += 57.2;
pdf.text(hOffset, vOffset - 1, "S2: Q/L");
hOffset += 57.2;
pdf.text(hOffset, vOffset - 1, "C3: Weather");
hOffset += 57.2;
pdf.text(hOffset, vOffset - 1, "C1: Callback");

vOffset += 32;
vTimeStart = vOffset - 9; //Needed for the lines used later
hOffset = margin;
hOffset += 8;
pdf.setFontSize(12);
x = convertTotal(weeklyRunTime() + weeklyOtherTime());
pdf.text(hOffset, vOffset, x);
hOffset += 57.2;
//pdf.text(hOffset, vOffset, (blnTC) ? "" : "0.25");
pdf.text(hOffset, vOffset, "");
hOffset += 57.2;
pdf.setFontSize(14);
//x = (objThis.Data.Area !== "TC") ? addPrepTime(x) : x;
pdf.text(hOffset, vOffset, x);
hOffset += 57.2;
x = weeklyFieldTripTime();
pdf.text(hOffset, vOffset, x);
hOffset += 57.2;
x = convertTotal(calculateHoursWorked());
pdf.text(hOffset, vOffset, x);
hOffset = 306;
hOffset += 8;
x = convertTotal(calculateOJT());
pdf.text(hOffset, vOffset, x);
hOffset += 57.2;
x = convertTotal(calculateAdmin());
pdf.text(hOffset, vOffset, x);
hOffset += 57.2;
x = convertTotal(calculateEquipment());
pdf.text(hOffset, vOffset, x);
hOffset += 57.2;
x = convertTotal(weeklyC3Time());
pdf.text(hOffset, vOffset, x);
hOffset += 57.2;
x = convertTotal(weeklyC1Time());
pdf.text(hOffset, vOffset, x);

hOffset = margin;
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);
hOffset += 57.2;
pdf.line(hOffset, vOffset + 4, hOffset, vOffset - 41);

x = objThis.Data.Team;

let y = objThis.Data.WeekOf;
let z = y.substr(8);
y = y.substr(0, 8);
x = x + "_" + y + "_" + z;

x = x + "_" + objThis.Data.EmpName.replace(",", "").replace(" ", "");
let fileName = x;

pdf.setProperties({
    title: fileName,
    subject: "Weekly Report",
    author: "Brittany Martinez",
    keywords: "",
    creator: "FCPS Transportation"
});

let string = pdf.output('datauristring');
let iframe = document.getElementById("tsframe")
iframe.src = string;

pdf.save(fileName + ".pdf");
//            } catch (error) {
//                console.log(error.message);
//            }
//        });