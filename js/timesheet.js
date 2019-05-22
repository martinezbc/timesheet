var string = "";
var fileName = "";
var pdf = "";

function getDateField(x) {
    switch (x.substr(0, 3)) {
        case "Sat":
            x = getStorage("SatDate");
            break;
        case "Sun":
            x = getStorage("SunDate");
            break;
        case "Mon":
            x = getStorage("MonDate");
            break;
        case "Tue":
            x = getStorage("TueDate");
            break;
        case "Wed":
            x = getStorage("WedDate");
            break;
        case "Thu":
            x = getStorage("ThuDate");
            break;
        case "Fri":
            x = getStorage("FriDate");
            break;
    }
    return x;
}

function removeAMPM(x) {
    return x.replace("AM","").replace("PM","")
}

function createTimesheet() {
    pdf = jsPDF("p", "pt", "letter");
    
    var margin = 20,
        vOffset = 0,
        hOffset = 0,
        x = "";


    //********HEADER********//
    var imgData = getImageLogo();
    pdf.addImage(imgData, "JPEG", 20, 20, 20, 20);

    vOffset = margin + 15;
    hOffset = 45;
    pdf.setFontSize(14);
    pdf.setFontStyle("bold");
    pdf.text(hOffset, vOffset + 2, "TRANSPORTATION WEEKLY REPORT");

    hOffset += 300;
    pdf.setFontSize(10);
    pdf.setFontStyle("normal");
    pdf.text(hOffset, vOffset + 4, "Employee ID:");
    pdf.setFontStyle("bold");
    hOffset += 65;
    x = getStorage("EmpID");
    pdf.text(hOffset, vOffset + 4, x);

    hOffset += 50;
    pdf.setFontStyle("normal");
    pdf.text(hOffset, vOffset + 4, "Week Of:");
    pdf.setFontStyle("bold");
    x = getStorage("WeekOf");
    pdf.text(hOffset + 45, vOffset + 4, x);

    pdf.setDrawColor(80, 80, 80);
    pdf.setLineWidth(1);
    pdf.line(margin, vOffset + 7, 592, vOffset + 7);
    pdf.setLineDash([2, 2, 4, 2]);
    pdf.line(margin, vOffset + 24, 592, vOffset + 24);
    pdf.setLineDash();

    //********FIRST LINE********//
    vOffset += 20;
    hOffset = margin + 5;

    pdf.setFontSize(10);
    pdf.setFontStyle("normal");
    pdf.text(hOffset, vOffset, "Area:");
    pdf.setFontStyle("bold");
    hOffset += 28;
    x = getStorage("Area");
    pdf.text(hOffset, vOffset, x);

    hOffset += 60;
    pdf.setFontStyle("normal");
    pdf.text(hOffset, vOffset, "Team:");
    pdf.setFontStyle("bold");
    hOffset += 32;
    x = getStorage("Team");
    pdf.text(hOffset, vOffset, x);

    hOffset += 70;
    pdf.setFontStyle("normal");
    pdf.text(hOffset, vOffset, "Name:");
    pdf.setFontStyle("bold");
    hOffset += 35;
    x = getStorage("EmpLName") + ", " + getStorage("EmpFName") + " " + getStorage("EmpMI");
    pdf.text(hOffset, vOffset, x);

    hOffset += 260;
    pdf.setFontStyle("normal");
    pdf.text(hOffset, vOffset, "Vehicle:");
    pdf.setFontStyle("bold");
    hOffset += 38;
    x = getStorage("Veh1");
    pdf.text(hOffset, vOffset, x);

    vOffset += 16;
    hOffset = margin + 5;

    pdf.setFontStyle("normal");
    pdf.text(hOffset, vOffset, "Position:");
    pdf.setFontStyle("bold");
    hOffset += 45;
    x = getStorage("Position");
    pdf.text(hOffset, vOffset, x);

    //OJT checkbox
    hOffset += 140;
    pdf.setFontStyle("normal");
    x = getStorage("OJT");
    var imgCheck;
    if (x === "1") {
        imgCheck = getCheckBox();
        pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
        hOffset += 12;
        pdf.text(hOffset - 22, vOffset, "**");
        pdf.text(hOffset, vOffset, "OJT Trainer **");
    hOffset += 12;
    } else {
        imgCheck = getUncheckBox();
        pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
        hOffset += 12;
        pdf.text(hOffset, vOffset, "OJT Trainer");
    }

    hOffset += 70;
    pdf.setFontSize(8);
    pdf.setFontStyle("normal");
    if (x === "1") {
        x = getStorage("Trainee");
        pdf.text(hOffset, vOffset, "(" + x + ")");
    }

    hOffset += 160;
    pdf.setFontStyle("normal");
    pdf.setFontSize(10);
    pdf.text(hOffset, vOffset, "Spares:");
    hOffset += 38;
    pdf.setFontStyle("bold");
    x = getStorage("Veh2");
    x = (getStorage("Veh3") !== "") ? x + " / " + getStorage("Veh3") : x;
    x = (getStorage("Veh4") !== "") ? x + " / " + getStorage("Veh4") : x;
    pdf.text(hOffset, vOffset, x);

    //********ROUTE COUNTS********//
    vOffset += 13;
    var routeOffset = vOffset - 9
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(104, 210, 233);
    pdf.rect(margin, vOffset - 9, 572, 13, "FD");
    pdf.setFontSize(9);
    pdf.setTextColor(0);
    hOffset += 60;
    pdf.setFontStyle("bold");
    x = "AM Pupil Counts";
    pdf.text(hOffset, vOffset, x);
    hOffset += 200;
    x = "PM Pupil Counts";
    pdf.text(hOffset, vOffset, x);
    hOffset += 140;
    pdf.text(hOffset, vOffset, "PAC/PS - Shuttle - Late Run Counts");

    vOffset += 13;
    hOffset = margin;
    pdf.setTextColor(0);
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(209, 241, 245);
    pdf.rect(margin, vOffset - 10, 572, 13, "FD");
    pdf.setFontSize(9);
    hOffset += 3;
    pdf.text(hOffset, vOffset, "Route");
    hOffset += 45;
    pdf.text(hOffset, vOffset, "Mon");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Tue");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Wed");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Thu");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Fri");
    hOffset += 30;
    pdf.text(hOffset, vOffset, "Route");
    hOffset += 45;
    pdf.text(hOffset, vOffset, "Mon");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Tue");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Wed");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Thu");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Fri");
    hOffset += 30;
    pdf.text(hOffset, vOffset, "Route");
    hOffset += 45;
    pdf.text(hOffset, vOffset, "Mon");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Tue");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Wed");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Thu");
    hOffset += 29;
    pdf.text(hOffset, vOffset, "Fri");
    pdf.setFontStyle("normal");

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    hOffset += 3;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    x = getStorage("AMRoute1");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonAM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueAM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedAM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuAM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriAM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("PMRoute1");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonPM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TuePM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedPM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuPM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriPM1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("PSRoute1");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonPS1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TuePS1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedPS1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuPS1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriPS1Ct");
    pdf.text(hOffset, vOffset, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    hOffset += 3;
    pdf.setFontStyle("bold");
    x = getStorage("AMRoute2");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonAM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueAM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedAM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuAM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriAM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("PMRoute2");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonPM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TuePM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedPM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuPM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriPM2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("PSRoute2");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonPS2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TuePS2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedPS2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuPS2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriPS2Ct");
    pdf.text(hOffset, vOffset, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    hOffset += 3;
    pdf.setFontStyle("bold");
    x = getStorage("AMRoute3");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonAM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueAM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedAM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuAM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriAM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("PMRoute3");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonPM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TuePM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedPM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuPM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriPM3Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("SHRoute1");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonSH1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueSH1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedSH1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuSH1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriSH1Ct");
    pdf.text(hOffset, vOffset, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    hOffset += 3;
    pdf.setFontStyle("bold");
    x = getStorage("AMRoute4");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonAM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueAM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedAM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuAM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriAM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("PMRoute4");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonPM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TuePM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedPM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuPM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriPM4Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("SHRoute2");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonSH2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueSH2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedSH2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuSH2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriSH2Ct");
    pdf.text(hOffset, vOffset, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    hOffset += 3;
    pdf.setFontStyle("bold");
    x = getStorage("AMRoute5");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonAM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueAM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedAM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuAM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriAM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");
    x = getStorage("PMRoute5");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    x = getStorage("MonPM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TuePM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedPM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuPM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriPM5Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontStyle("bold");

    x = getStorage("LRRoute1");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    pdf.setFontSize(9);
    x = getStorage("MonLR1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueLR1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedLR1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuLR1Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriLR1Ct");
    pdf.text(hOffset, vOffset, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setFillColor(104, 210, 233);
    pdf.rect(margin, vOffset - 12, 45, 30, "FD");
    pdf.setFillColor(209, 241, 245);
    pdf.rect(margin + 45, vOffset - 12, 336, 30, "FD");
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    pdf.text(margin + 2, vOffset + 1, "AM Pupil\n   Time");
    pdf.setFontSize(8);
    pdf.setFontStyle("normal");
    hOffset += 48;
    x = removeAMPM(getStorage("MonTimeA"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("TueTimeA"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("WedTimeA"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("ThuTimeA"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("FriTimeA"));
    pdf.text(hOffset, vOffset, x);

    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    pdf.setFillColor(104, 210, 233);
    pdf.rect(margin + 190, vOffset - 12, 45, 30, "FD");
    pdf.text(margin + 192, vOffset + 1, "PM Pupil\n   Time")
    pdf.setFontSize(8);
    pdf.setFontStyle("normal");
    hOffset += 75;
    x = removeAMPM(getStorage("MonTimeC"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("TueTimeC"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("WedTimeC"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("ThuTimeC"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("FriTimeC"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 30;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");

    pdf.setFillColor(210, 210, 210);
    pdf.rect(hOffset - 4, vOffset - 12, 191, 15, "FD");
    x = getStorage("LRRoute2");
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    hOffset += 45;
    pdf.setFontSize(9);
    x = getStorage("MonLR2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("TueLR2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("WedLR2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("ThuLR2Ct");
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = getStorage("FriLR2Ct");
    pdf.text(hOffset, vOffset, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 48;
    x = removeAMPM(getStorage("MonTimeB"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("TueTimeB"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("WedTimeB"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("ThuTimeB"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("FriTimeB"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 75;
    x = removeAMPM(getStorage("MonTimeD"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("TueTimeD"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("WedTimeD"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("ThuTimeD"));
    pdf.text(hOffset, vOffset, x);
    hOffset += 29;
    x = removeAMPM(getStorage("FriTimeD"));
    pdf.text(hOffset, vOffset, x);

    pdf.setFillColor(255, 255, 255);
    pdf.rect(hOffset + 26, vOffset - 12, 191, 15, "FD");

    pdf.setDrawColor(80, 80, 80);
    pdf.line(65, routeOffset + 13, 65, vOffset + 6);
    pdf.line(210, routeOffset, 210, vOffset + 6);
    pdf.line(255, routeOffset + 13, 255, vOffset + 6);
    pdf.line(401, routeOffset, 401, vOffset + 6);
    pdf.line(447, routeOffset + 13, 447, vOffset + 6);

    //**REGULAR RUNS**//
    vOffset += 13;
    var vTimeStart = vOffset - 9; //Needed for the lines used later
    hOffset = margin + 15;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(104, 210, 233);
    pdf.rect(margin, vOffset - 10, 572, 13, "FD");
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    hOffset += 50;
    pdf.text(hOffset, vOffset, "Regular Runs");
    hOffset += 130;
    pdf.text(hOffset, vOffset, "PAC/Preschool");
    hOffset += 130;
    pdf.text(hOffset, vOffset, "Shuttles");
    hOffset += 130;
    pdf.text(hOffset, vOffset, "Late Run");

    vOffset += 13;
    hOffset = margin;
    pdf.setTextColor(0);
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(209, 241, 245);
    pdf.rect(margin, vOffset - 10, 572, 13, "FD");
    pdf.setFontSize(9);
    hOffset += 37;
    pdf.text(hOffset, vOffset, "Start");
    hOffset += 40;
    pdf.text(hOffset, vOffset, "End");
    hOffset += 48;
    pdf.text(hOffset, vOffset, "Total");
    hOffset += 37;
    pdf.text(hOffset, vOffset, "Start");
    hOffset += 40;
    pdf.text(hOffset, vOffset, "End");
    hOffset += 48;
    pdf.text(hOffset, vOffset, "Total");
    hOffset += 37;
    pdf.text(hOffset, vOffset, "Start");
    hOffset += 40;
    pdf.text(hOffset, vOffset, "End");
    hOffset += 48;
    pdf.text(hOffset, vOffset, "Total");
    hOffset += 37;
    pdf.text(hOffset, vOffset, "Start");
    hOffset += 40;
    pdf.text(hOffset, vOffset, "End");
    hOffset += 48;
    pdf.text(hOffset, vOffset, "Total");
    hOffset += 40;
    pdf.text(hOffset, vOffset, "Total");
    pdf.setFontStyle("normal");

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setFontStyle("bold");

    hOffset += 2;
    x = getStorage("MonDate");
    pdf.text(hOffset, vOffset, x);

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("MonTime1S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("MonTime1E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("MonTime1");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("MonOJT1") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }


    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("MonTime3S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("MonTime3E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("MonTime3");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("MonOJT3") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("MonTime5S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("MonTime5E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("MonTime5");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("MonOJT5") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }


    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("MonLift1");
    if (x === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    pdf.text(hOffset + 11, vOffset, "Lift");

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("MonTime2S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("MonTime2E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("MonTime2");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("MonOJT2") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("MonTime4S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("MonTime4E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("MonTime4");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("MonOJT4") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("MonTime6S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("MonTime6E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("MonTime6");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("MonOJT6") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("MonTime7S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("MonTime7E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("MonTime7");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("MonOJT7") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }
    pdf.setFillColor(255, 255, 255);
    pdf.rect(550, vOffset - 27, 42, 30, "FD");
    hOffset += 40;
    pdf.setFontSize(10);
    x = getStorage("MonRunTotal");
    pdf.text(hOffset, vOffset - 8, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("TueDate");
    pdf.text(hOffset, vOffset, x);

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("TueTime1S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("TueTime1E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("TueTime1");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("TueOJT1") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("TueTime3S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("TueTime3E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("TueTime3");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("TueOJT3") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("TueTime5S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("TueTime5E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("TueTime5");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("TueOJT5") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }


    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("TueLift1");
    if (x === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    pdf.text(hOffset + 11, vOffset, "Lift");

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("TueTime2S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("TueTime2E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("TueTime2");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("TueOJT2") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("TueTime4S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("TueTime4E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("TueTime4");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("TueOJT4") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("TueTime6S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("TueTime6E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("TueTime6");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("TueOJT6") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("TueTime7S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("TueTime7E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("TueTime7");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("TueOJT7") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }
    hOffset += 40;
    pdf.setFillColor(210, 210, 210);
    pdf.rect(550, vOffset - 27, 42, 30, "FD");
    pdf.setFontSize(10);
    x = getStorage("TueRunTotal");
    pdf.text(hOffset, vOffset - 8, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("WedDate");
    pdf.text(hOffset, vOffset, x);

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("WedTime1S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("WedTime1E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("WedTime1");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("WedOJT1") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("WedTime3S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("WedTime3E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("WedTime3");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("WedOJT3") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("WedTime5S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("WedTime5E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("WedTime5");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("WedOJT5") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }


    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("WedLift1");
    if (x === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    pdf.text(hOffset + 11, vOffset, "Lift");

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("WedTime2S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("WedTime2E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("WedTime2");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("WedOJT2") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("WedTime4S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("WedTime4E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("WedTime4");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("WedOJT4") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("WedTime6S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("WedTime6E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("WedTime6");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("WedOJT6") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("WedTime7S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("WedTime7E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("WedTime7");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("WedOJT7") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }
    hOffset += 40;
    pdf.setFillColor(255, 255, 255);
    pdf.rect(550, vOffset - 27, 42, 30, "FD");
    pdf.setFontSize(10);
    x = getStorage("WedRunTotal");
    pdf.text(hOffset, vOffset - 8, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("ThuDate");
    pdf.text(hOffset, vOffset, x);

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("ThuTime1S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("ThuTime1E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("ThuTime1");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("ThuOJT1") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("ThuTime3S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("ThuTime3E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("ThuTime3");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("ThuOJT3") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("ThuTime5S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("ThuTime5E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("ThuTime5");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("ThuOJT5") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }


    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("ThuLift1");
    if (x === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    pdf.text(hOffset + 11, vOffset, "Lift");

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("ThuTime2S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("ThuTime2E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("ThuTime2");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("ThuOJT2") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("ThuTime4S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("ThuTime4E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("ThuTime4");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("ThuOJT4") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("ThuTime6S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("ThuTime6E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("ThuTime6");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("ThuOJT6") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("ThuTime7S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("ThuTime7E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("ThuTime7");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("ThuOJT7") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }
    hOffset += 40;
    pdf.setFillColor(210, 210, 210);
    pdf.rect(550, vOffset - 27, 42, 30, "FD");
    pdf.setFontSize(10);
    x = getStorage("ThuRunTotal");
    pdf.text(hOffset, vOffset - 8, x);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("FriDate");
    pdf.text(hOffset, vOffset, x);

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("FriTime1S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("FriTime1E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("FriTime1");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("FriOJT1") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("FriTime3S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("FriTime3E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("FriTime3");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("FriOJT3") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("FriTime5S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("FriTime5E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("FriTime5");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("FriOJT5") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }


    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 530, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    hOffset += 2;
    x = getStorage("FriLift1");
    if (x === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    pdf.text(hOffset + 11, vOffset, "Lift");

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 35;
    x = getStorage("FriTime2S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("FriTime2E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("FriTime2");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("FriOJT2") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("FriTime4S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("FriTime4E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("FriTime4");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("FriOJT4") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("FriTime6S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("FriTime6E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("FriTime6");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("FriOJT6") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }

    pdf.setFontStyle("normal");
    pdf.setFontSize(8);
    hOffset += 37;
    x = getStorage("FriTime7S");
    pdf.text(hOffset, vOffset, x);
    hOffset += 40;
    x = getStorage("FriTime7E");
    pdf.text(hOffset, vOffset, x);
    x = getStorage("FriTime7");
    hOffset += 42;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage("FriOJT7") === "1") {
        x = "**" + x + "**";
        pdf.text(hOffset, vOffset, x);
        hOffset += 6;
    } else {
        hOffset += 6;
        pdf.text(hOffset, vOffset, x);
    }
    hOffset += 40;
    pdf.setFillColor(255, 255, 255);
    pdf.rect(550, vOffset - 27, 42, 30, "FD");
    pdf.setFontSize(10);
    x = getStorage("FriRunTotal");
    pdf.text(hOffset, vOffset - 8, x);


    pdf.setDrawColor(80, 80, 80);
    pdf.line(50, vOffset + 6, 50, vTimeStart);
    pdf.line(136, vOffset + 6, 136, vTimeStart + 12);
    pdf.line(176, vOffset + 6, 176, vTimeStart);
    pdf.line(261, vOffset + 6, 261, vTimeStart + 12);
    pdf.line(301, vOffset + 6, 301, vTimeStart);
    pdf.line(386, vOffset + 6, 386, vTimeStart + 12);
    pdf.line(426, vOffset + 6, 426, vTimeStart);
    pdf.line(510, vOffset + 6, 510, vTimeStart + 12);
    pdf.line(550, vOffset + 6, 550, vTimeStart);


    //OTHER WORK SECTION
    vOffset += 13;
    vTimeStart = vOffset - 9; //Needed for the lines used later
    hOffset = margin + 5;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(104, 210, 233);
    pdf.rect(margin, vOffset - 10, 572, 13, "FD");
    pdf.setFontSize(9);
    hOffset += 115;
    pdf.setFontStyle("bold");
    pdf.text(hOffset, vOffset, "Other Work Duties");
    hOffset += 320;
    pdf.text(hOffset, vOffset, "Leave Used");


    //FIND OTHER WORK DATA
    var days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    var otherWork = ["OW0", "OW1", "OW2", "OW3", "OW4", "OW5", "OW6", "OW7", "OW8", "OW9"];
    var j = 0;
    for (var i = 0; i < 7; i++) {
        if (getStorage(days[i] + "Select8") !== "") {
            otherWork[j] = days[i] + "Time8";
            j++;
        }
        if (getStorage(days[i] + "Select9") !== "") {
            otherWork[j] = days[i] + "Time9";
            j++;
        }
        if (getStorage(days[i] + "Select10") !== "") {
            otherWork[j] = days[i] + "Time10";
            j++;
        }
    }

    //FIND LEAVE TAKEN
    var daysm = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    var leave = ["LV0", "LV1", "LV2", "LV3", "LV4", "LV5", "LV6", "LV7", "LV8", "LV9"];
    j = 0;
    for (i = 0; i < 5; i++) {
        if (getStorage(daysm[i] + "Time14") !== "") {
            leave[j] = daysm[i] + "Time14";
            j++;
        }
        if (getStorage(daysm[i] + "Time15") !== "") {
            leave[j] = daysm[i] + "Time15";
            j++;
        }
        if (getStorage(daysm[i] + "LeaveAD") === "1") {
            leave[j] = daysm[i] + "LeaveAD";
            j++;
        }
    }

    vOffset += 13;
    hOffset = margin;
    pdf.setTextColor(0);
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(209, 241, 245);
    pdf.rect(margin, vOffset - 10, 572, 13, "FD");
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    hOffset += 5;
    pdf.text(hOffset, vOffset, "Date");
    hOffset += 32;
    pdf.text(hOffset, vOffset, "Lift");
    hOffset += 22;
    pdf.text(hOffset, vOffset, "Description");
    hOffset += 175;
    pdf.text(hOffset, vOffset, "Start");
    hOffset += 42;
    pdf.text(hOffset, vOffset, "End");
    hOffset += 45;
    pdf.text(hOffset, vOffset, "Total");
    hOffset += 40;
    pdf.text(hOffset, vOffset, "Date");
    hOffset += 28;
    pdf.text(hOffset, vOffset, "Type");
    hOffset += 48;
    pdf.text(hOffset, vOffset, "All");
    hOffset += 17;
    pdf.text(hOffset, vOffset, "Start");
    hOffset += 40;
    pdf.text(hOffset, vOffset, "End");
    hOffset += 45;
    pdf.text(hOffset, vOffset, "Total");
    pdf.setFontStyle("normal");

    var a = "",
        b = "",
        c = "";

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    var blnOW = false;
    if (otherWork[0] !== "OW0") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[0].substr(0, 3);
        b = otherWork[0].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "ES0" || c === "ES2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[0]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[0] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[0] + "E"));
    }
    x = getStorage(otherWork[0]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    var blnLV = false;
    if (leave[0] !== "LV0") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[0].substr(0, 3);
        b = leave[0].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[0]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[0].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[0].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[0] + "S"));
    }
    hOffset += 40;
    if (blnLV === true && leave[0].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[0] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[0].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[0]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[1] !== "OW1") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[1].substr(0, 3);
        b = otherWork[1].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[1]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[1] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[1] + "E"));
    }
    x = getStorage(otherWork[1]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    blnLV = false;
    if (leave[1] !== "LV1") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[1].substr(0, 3);
        b = leave[1].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[1]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[1].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[1].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[1] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[1].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[1] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[1].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[1]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[2] !== "OW2") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[2].substr(0, 3);
        b = otherWork[2].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[2]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[2] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[2] + "E"));
    }
    x = getStorage(otherWork[2]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    var blnLV = false;
    if (leave[2] !== "LV2") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[2].substr(0, 3);
        b = leave[2].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[2]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[2].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[2].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[2] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[2].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[2] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[2].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[2]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[3] !== "OW3") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[3].substr(0, 3);
        b = otherWork[3].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[3]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[3] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[3] + "E"));
    }
    x = getStorage(otherWork[3]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    blnLV = false;
    if (leave[3] !== "LV3") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[3].substr(0, 3);
        b = leave[3].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[3]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[3].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[3].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[3] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[3].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[3] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[3].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[3]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[4] !== "OW4") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[4].substr(0, 3);
        b = otherWork[4].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[4]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[4] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[4] + "E"));
    }
    x = getStorage(otherWork[4]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    blnLV = false;
    if (leave[4] !== "LV4") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[4].substr(0, 3);
        b = leave[4].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[4]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[4].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[4].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[4] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[4].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[4] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[4].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[4]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[5] !== "OW5") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[5].substr(0, 3);
        b = otherWork[5].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[5]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[5] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[5] + "E"));
    }
    x = getStorage(otherWork[5]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    blnLV = false;
    if (leave[5] !== "LV5") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[5].substr(0, 3);
        b = leave[5].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[5]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[5].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[5].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[5] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[5].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[5] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[5].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[5]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[6] !== "OW6") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[6].substr(0, 3);
        b = otherWork[6].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[6]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[6] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[6] + "E"));
    }
    x = getStorage(otherWork[6]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    blnLV = false;
    if (leave[6] !== "LV6") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[6].substr(0, 3);
        b = leave[6].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[6]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[6].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[6].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[6] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[6].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[6] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[6].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[6]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[7] !== "OW7") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[7].substr(0, 3);
        b = otherWork[7].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[7]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[7] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[7] + "E"));
    }
    x = getStorage(otherWork[7]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    blnLV = false;
    if (leave[7] !== "LV7") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[7].substr(0, 3);
        b = leave[7].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[7]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[7].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[7].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[7] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[7].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[7] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[7].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[7]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[8] !== "OW8") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[8].substr(0, 3);
        b = otherWork[8].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[8]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[8] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[8] + "E"));
    }
    x = getStorage(otherWork[8]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    blnLV = false;
    if (leave[8] !== "LV8") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[8].substr(0, 3);
        b = leave[8].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[8]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[8].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[8].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[8] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[8].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[8] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[8].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[8]));
    }
    pdf.setFontStyle("normal");

    //OTHER WORK
    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    hOffset += 5;
    blnOW = false;
    if (otherWork[9] !== "OW9") {
        blnOW = true;
    }
    if (blnOW === true) {
        a = otherWork[9].substr(0, 3);
        b = otherWork[9].substr(7);
        c = getStorage(a + "Select" + b);
        if (c === "EC0" || c === "EC2" || c === "CBK") {
            pdf.setDrawColor(80, 80, 80);
            pdf.setFillColor(255, 255, 0);
            pdf.rect(margin, vOffset - 12, 355, 15, "FD");
        }
    }
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getDateField(otherWork[9]));
    }
    hOffset += 32;
    if (blnOW === true && getStorage(a + "Lift" + b) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 21;
    pdf.setFontSize(8);
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, c + " - " + getStorage(a + "Desc" + b));
    }
    hOffset += 175;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[9] + "S"));
    }
    hOffset += 42;
    if (blnOW === true) {
        pdf.text(hOffset, vOffset, getStorage(otherWork[9] + "E"));
    }
    x = getStorage(otherWork[9]);
    hOffset += 43;
    pdf.setFontSize(9);
    pdf.setFontStyle("bold");
    if (getStorage(a + "OJT" + b) === "1") {
        x = "**" + x + "**";
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += 5;
    } else {
        hOffset += 7;
        if (blnOW === true) {
            pdf.text(hOffset, vOffset, x);
        }
        hOffset += -2;
    }
    pdf.setFontStyle("normal");
    //LEAVE
    hOffset += 38;
    blnLV = false;
    if (leave[9] !== "LV9") {
        blnLV = true;
    }
    if (blnLV === true) {
        a = leave[9].substr(0, 3);
        b = leave[9].substr(-2);
        pdf.text(hOffset, vOffset, getDateField(leave[9]));
    }
    hOffset += 28;
    pdf.setFontSize(8);
    if (blnLV === true) {
        pdf.text(hOffset, vOffset, getStorage(a + "LeaveSelect" + b));
    }
    hOffset += 50;
    if (blnLV === true && leave[9].indexOf("LeaveAD") > 0) {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 15;
    if (blnLV === true && leave[9].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[9] + "S"));
    }
    hOffset += 42;
    if (blnLV === true && leave[9].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[9] + "E"));
    }
    hOffset += 45;
    pdf.setFontStyle("bold");
    pdf.setFontSize(9);
    if (blnLV === true && leave[9].indexOf("Time") > 0) {
        pdf.text(hOffset, vOffset, getStorage(leave[9]));
    }

    vOffset += 15;
    hOffset = margin + 5;
    pdf.setTextColor(0);
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(209, 241, 245);
    pdf.rect(margin, vOffset - 12, 572, 24, "FD");
    pdf.setFontSize(8);
    pdf.setFontStyle("bold");
    pdf.text(hOffset, vOffset - 2, "FYI - Info Only; OTHR - Other; GT - Garage trip; FUEL - Fuel; RC - Run coverage; CPR - CPR/First Aid; RCRT - Recert; MTNG - Meeting; \nTRNG - Training; CS - Cold start team; MED - Physical or Drug Test; ES2 - 2 Hour Delay Early Start; ES0 - On Time Early Start; CBK - Call back");
    pdf.setFontSize(9);

    pdf.setDrawColor(80, 80, 80);
    pdf.line(335, vOffset - 12, 335, vTimeStart + 12);
    pdf.line(375, vOffset - 12, 375, vTimeStart);
    pdf.line(552, vOffset - 12, 552, vTimeStart + 12);            
    pdf.line(552, vOffset - 12, 552, vTimeStart + 12);


    pdf.setFontStyle("normal");

    //FIELD TRIP / LEAVE SECTION
    vOffset += 21;
    vTimeStart = vOffset - 9; //Needed for the lines used later
    hOffset = margin + 15;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(104, 210, 233);
    pdf.rect(margin, vOffset - 9, 572, 13, "FD");
    pdf.setFontStyle("bold");
    hOffset += 260;
    pdf.text(hOffset, vOffset, "Field Trips");

    //FIND OTHER WORK DATA
    days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    var fieldTrip = ["FT0", "FT1", "FT2", "FT3", "FT4"];
    j = 0;
    for (i = 0; i < 7; i++) {
        if (getStorage(days[i] + "Time11") !== "") {
            fieldTrip[j] = days[i] + "Time11";
            j++;
        }
        if (getStorage(days[i] + "Time12") !== "") {
            fieldTrip[j] = days[i] + "Time12";
            j++;
        }
        if (getStorage(days[i] + "Time13") !== "") {
            fieldTrip[j] = days[i] + "Time13";
            j++;
        }
    }

    vOffset += 13;
    hOffset = margin;
    pdf.setTextColor(0);
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(209, 241, 245);
    pdf.rect(margin, vOffset - 10, 572, 13, "FD");
    pdf.setFontSize(9);
    hOffset += 10;
    pdf.text(hOffset, vOffset, "Date");
    hOffset += 35;
    pdf.text(hOffset, vOffset, "Lift");
    hOffset += 25;
    pdf.text(hOffset, vOffset, "From");
    hOffset += 150;
    pdf.text(hOffset, vOffset, "To");
    hOffset += 150;
    pdf.text(hOffset, vOffset, "Voucher");
    hOffset += 55;
    pdf.text(hOffset, vOffset, "Start");
    hOffset += 55;
    pdf.text(hOffset, vOffset, "End");
    hOffset += 58;
    pdf.text(hOffset, vOffset, "Total");
    pdf.setFontStyle("normal");

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    var blnFT = false;

    hOffset += 10;
    if (fieldTrip[0] !== "FT0") {
        blnFT = true;
    }
    x = blnFT === true ? getDateField(fieldTrip[0]) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 35;
    if (getStorage(fieldTrip[0].substr(0, 3) + "Lift" + fieldTrip[0].substr(7)) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 25;
    x = blnFT === true ? getStorage(fieldTrip[0].substr(0, 3) + "From" + fieldTrip[0].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[0].substr(0, 3) + "To" + fieldTrip[0].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[0].substr(0, 3) + "Voucher" + fieldTrip[0].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[0] + "S") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[0] + "E") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 58;
    pdf.setFontStyle("bold");
    pdf.setFontSize(10);
    x = blnFT === true ? getStorage(fieldTrip[0]) : "";
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    pdf.setFontSize(9);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    var blnFT = false;

    hOffset += 10;
    if (fieldTrip[1] !== "FT1") {
        blnFT = true;
    }
    x = blnFT === true ? getDateField(fieldTrip[1]) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 35;
    if (getStorage(fieldTrip[1].substr(0, 3) + "Lift" + fieldTrip[1].substr(7)) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 25;
    x = blnFT === true ? getStorage(fieldTrip[1].substr(0, 3) + "From" + fieldTrip[1].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[1].substr(0, 3) + "To" + fieldTrip[1].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[1].substr(0, 3) + "Voucher" + fieldTrip[1].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[1] + "S") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[1] + "E") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 58;
    pdf.setFontStyle("bold");
    pdf.setFontSize(10);
    x = blnFT === true ? getStorage(fieldTrip[1]) : "";
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    pdf.setFontSize(9);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    var blnFT = false;

    hOffset += 10;
    if (fieldTrip[2] !== "FT2") {
        blnFT = true;
    }
    x = blnFT === true ? getDateField(fieldTrip[2]) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 35;
    if (getStorage(fieldTrip[2].substr(0, 3) + "Lift" + fieldTrip[2].substr(7)) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 25;
    x = blnFT === true ? getStorage(fieldTrip[2].substr(0, 3) + "From" + fieldTrip[2].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[2].substr(0, 3) + "To" + fieldTrip[2].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[2].substr(0, 3) + "Voucher" + fieldTrip[2].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[2] + "S") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[2] + "E") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 58;
    pdf.setFontStyle("bold");
    pdf.setFontSize(10);
    x = blnFT === true ? getStorage(fieldTrip[2]) : "";
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    pdf.setFontSize(9);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    var blnFT = false;

    hOffset += 10;
    if (fieldTrip[3] !== "FT3") {
        blnFT = true;
    }
    x = blnFT === true ? getDateField(fieldTrip[3]) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 35;
    if (getStorage(fieldTrip[3].substr(0, 3) + "Lift" + fieldTrip[3].substr(7)) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 25;
    x = blnFT === true ? getStorage(fieldTrip[3].substr(0, 3) + "From" + fieldTrip[3].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[3].substr(0, 3) + "To" + fieldTrip[3].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[3].substr(0, 3) + "Voucher" + fieldTrip[3].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[3] + "S") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[3] + "E") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 58;
    pdf.setFontStyle("bold");
    pdf.setFontSize(10);
    x = blnFT === true ? getStorage(fieldTrip[3]) : "";
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    pdf.setFontSize(9);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, vOffset - 12, 572, 15, "FD");
    pdf.setDrawColor(80, 80, 80);
    var blnFT = false;

    hOffset += 10;
    if (fieldTrip[4] !== "FT4") {
        blnFT = true;
    }
    x = blnFT === true ? getDateField(fieldTrip[4]) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 35;
    if (getStorage(fieldTrip[4].substr(0, 3) + "Lift" + fieldTrip[4].substr(7)) === "1") {
        imgCheck = getCheckBox();
    } else {
        imgCheck = getUncheckBox();
    }
    pdf.addImage(imgCheck, "JPEG", hOffset, vOffset - 9, 10, 10);
    hOffset += 25;
    x = blnFT === true ? getStorage(fieldTrip[4].substr(0, 3) + "From" + fieldTrip[4].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[4].substr(0, 3) + "To" + fieldTrip[4].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 150;
    x = blnFT === true ? getStorage(fieldTrip[4].substr(0, 3) + "Voucher" + fieldTrip[4].substr(7)) : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[4] + "S") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 55;
    x = blnFT === true ? getStorage(fieldTrip[4] + "E") : "";
    pdf.text(hOffset, vOffset, x);
    hOffset += 58;
    pdf.setFontStyle("bold");
    pdf.setFontSize(10);
    x = blnFT === true ? getStorage(fieldTrip[4]) : "";
    pdf.text(hOffset, vOffset, x);
    pdf.setFontStyle("normal");
    pdf.setFontSize(9);

    pdf.setDrawColor(80, 80, 80);
    pdf.line(552, vOffset + 6, 552, vTimeStart + 13);

    vOffset += 15;
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(209, 241, 245);
    pdf.rect(hOffset, vOffset - 12, 572, 28, "FD");
    pdf.setFontSize(7);
    pdf.setFontStyle("normal");
    hOffset += 2;
    x = "I certify that I have performed school duties on the vehicle with number shown above on all runs as entered hereon and if driver, I have performed daily pretrip inspection as required. \n";
    x = x + "In accordance with regulations and policies of the school board, I have accurately recorded all of the hours I worked. I understand that failure to comply with Time and Attendance \nReporting policies will be just cause for discipline up to, and including, separation from FCPS. (Regulation 4293)"
    pdf.text(hOffset, vOffset - 4, x);
    vOffset += 22;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(210, 210, 210);
    pdf.rect(margin, vOffset - 7, 265, 26, "FD");
    pdf.setFontStyle("bold");
    hOffset += 6;
    pdf.text(hOffset, vOffset, "Regular Run");
    hOffset += 65;
    pdf.text(hOffset, vOffset, "Other Work");
    hOffset += 65;
    pdf.text(hOffset, vOffset, "Field Trips");
    hOffset += 60;
    pdf.text(hOffset, vOffset, "Hours Worked");
    hOffset += 75;
    pdf.setFillColor(209, 241, 245);
    pdf.rect(285, vOffset - 7, 307, 26, "FD");
    pdf.setFontSize(9);
    pdf.text(hOffset, vOffset + 4, "Employee \nInitials: ");
    hOffset += 50;
    pdf.setFontSize(12);
    x = getStorage("EmpInitials");
    pdf.text(hOffset, vOffset + 12, x);
    pdf.setFontSize(9);
    hOffset += 50;
    pdf.text(hOffset, vOffset + 4, "Supervisor \nSignature:");

    vOffset += 14;
    hOffset = margin;
    pdf.setFontSize(14);
    hOffset += 8;
    x = getStorage("TotalRun");
    pdf.text(hOffset, vOffset, x);
    hOffset += 65;
    x = getStorage("TotalOther");
    pdf.text(hOffset, vOffset, x);
    hOffset += 65;
    x = getStorage("TotalFT");
    pdf.text(hOffset, vOffset, x);
    hOffset += 60;
    x = getStorage("TotalHW");
    pdf.text(hOffset, vOffset, x);


    vOffset += 14;
    vTimeStart = vOffset - 9; //Needed for the lines used later
    hOffset = margin;
    pdf.setDrawColor(80, 80, 80);
    pdf.setFillColor(104, 210, 233);
    pdf.rect(margin, vOffset - 9, 572, 28, "FD");
    pdf.setFontSize(9);
    hOffset += 22;
    pdf.text(hOffset, vOffset, "1R-Regular");
    hOffset += 118;
    pdf.text(hOffset, vOffset, "S4-OJT");
    hOffset += 118;
    pdf.text(hOffset, vOffset, "S2-Lift");
    hOffset += 118;
    pdf.text(hOffset, vOffset, "C3-Weather");
    hOffset += 118;
    pdf.text(hOffset, vOffset, "C1-Callback");

    vOffset += 16;
    vTimeStart = vOffset - 9; //Needed for the lines used later
    hOffset = margin;
    pdf.setFontSize(16);
    hOffset += 22;
    x = getStorage("Total1R");
    pdf.text(hOffset, vOffset, x);
    hOffset += 118;
    x = getStorage("OJT");
    if (x === "1") {
        pdf.text(hOffset, vOffset, getStorage("TotalS4"));
    }
    hOffset += 118;
    x = getStorage("TotalS2");
    pdf.text(hOffset, vOffset, x);
    hOffset += 118;
    x = getStorage("TotalC3");
    pdf.text(hOffset, vOffset, x);
    hOffset += 118;
    x = getStorage("TotalC1");
    pdf.text(hOffset, vOffset, x);


    x = getStorage("Team");

    var y = getStorage("WeekOf");
    var z = y.substr(11);
    y = y.substr(0, 8);
    z = z.replace("/", "").replace("/", "");
    y = y.replace("/", "").replace("/", "");
    x = x + "_" + y + "_" + z;

    x = x + "_" + getStorage("EmpLName");
    var n = getStorage("EmpFName");
    n = n.substr(0, 1);
    if (getStorage("EmpMI") !== "") {
        n = n + getStorage("EmpMI");
    }
    fileName = x + n;

    pdf.setProperties({
        title: fileName,
        subject: "Weekly Report",
        author: "Brittany Martinez",
        keywords: "",
        creator: "FCPS Transportation"
    });

    string = pdf.output("datauristring");
}