function dateString(strDate) {
    let str = strDate.substr(0, 2) + "/" + strDate.substr(2, 2) + "/" + strDate.substr(4, 4) + " - ";
    str += strDate.substr(8, 2) + "/" + strDate.substr(10, 2) + "/" + strDate.substr(12, 4);
    return str
}

let week = localStorage.getItem('WeekOfS');
objThis = JSON.parse(localStorage.getItem(week + "ObjS"));

document.addEventListener('DOMContentLoaded', function () {
    try {
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
        pdf.text(hOffset, vOffset + 2, "TRANSPORTATION SUPPLEMENTAL REPORT");

        hOffset += 280;
        pdf.setFontSize(10);
        pdf.setFontStyle("normal");
        //            pdf.text(hOffset, vOffset + 4, "Employee ID:");
        //            pdf.setFontStyle("bold");
        //            pdf.setFontSize(12);
        //            hOffset += 62;
        //            x = objThis.Sup.EmpID");
        //            pdf.text(hOffset, vOffset + 4, x || "");
        hOffset += 38;
        pdf.setFontSize(10);

        hOffset += 53;
        pdf.setFontStyle("normal");
        pdf.text(hOffset, vOffset + 4, "Week Of:");
        pdf.setFontStyle("bold");
        pdf.setFontSize(12);
        x = dateString(objThis.Sup.WeekOf);
        pdf.text(hOffset + 45, vOffset + 4, x || "");
        pdf.setFontSize(10);

        pdf.setDrawColor(0, 0, 0);
        pdf.setLineWidth(1);
        pdf.line(margin, vOffset + 7, 592, vOffset + 7);
        pdf.setLineWidth(0.5);
        pdf.line(margin, vOffset + 22, 592, vOffset + 22);
        pdf.setLineWidth(1);

        //********FIRST LINE********//
        vOffset += 19;
        hOffset = margin + 5;

        pdf.setFontSize(10);
        pdf.setFontStyle("normal");
        pdf.text(hOffset, vOffset, "Area:");
        pdf.setFontStyle("bold");
        hOffset += 28;
        pdf.setFontSize(12);
        x = objThis.Sup.Area;
        pdf.text(hOffset, vOffset, x || "");
        pdf.setFontSize(10);

        hOffset += 60;
        pdf.setFontStyle("normal");
        pdf.text(hOffset, vOffset, "Team:");
        pdf.setFontStyle("bold");
        hOffset += 32;
        pdf.setFontSize(12);
        x = objThis.Sup.Team;
        pdf.text(hOffset, vOffset, x || "");
        pdf.setFontSize(10);

        hOffset += 60;
        pdf.setFontStyle("normal");
        pdf.text(hOffset, vOffset, "Name:");
        pdf.setFontStyle("bold");
        hOffset += 35;
        pdf.setFontSize(12);
        x = objThis.Sup.EmpName;
        pdf.text(hOffset, vOffset, x || "");
        pdf.setFontSize(10);

        hOffset += 270;
        pdf.setFontStyle("normal");
        pdf.text(hOffset, vOffset, "Vehicle:");
        pdf.setFontStyle("bold");
        pdf.setFontSize(12);
        hOffset += 38;
        x = objThis.Sup.Veh1;
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
        x = objThis.Sup.Position;
        pdf.text(hOffset, vOffset, x || "");
        pdf.setFontSize(10);

        //OJT checkbox
        hOffset += 140;
        pdf.setFontStyle("normal");
        x = objThis.Sup.OJT;
        pdf.setDrawColor(0);
        pdf.setFillColor(0, 0, 0);
        if (objThis.Sup.OJT) {
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
            x = objThis.Sup.Trainee;
            pdf.text(hOffset + 40, vOffset, x);
        }

        hOffset += 200;
        pdf.setFontStyle("normal");
        pdf.setFontSize(10);
        pdf.text(hOffset, vOffset, "Spares:");
        hOffset += 38;
        pdf.setFontSize(12);
        pdf.setFontStyle("bold");
        x = objThis.Sup.Veh2;
        x = (objThis.Sup.Veh3 !== "") ? x + " / " + objThis.Sup.Veh3 : x;
        x = (objThis.Sup.Veh4 !== "") ? x + " / " + objThis.Sup.Veh4 : x;
        pdf.text(hOffset, vOffset, x || "");
        pdf.setFontSize(10);
        vOffset += 2;

        vOffset += 12;
        let routeOffset = vOffset - 9
        hOffset = margin;
        pdf.setDrawColor(0, 0, 0);
        pdf.setFillColor(207, 69, 32);
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
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 57.5;
        pdf.setFontStyle("bold");
        pdf.text(hOffset - 1, vOffset, "First Pickup");
        hOffset += 57.5;
        pdf.text(hOffset - 3, vOffset, "Last Drop Off");
        hOffset += 54;
        pdf.setFontStyle("normal");
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");


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
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 57.5;
        pdf.setFontStyle("bold");
        pdf.text(hOffset - 1, vOffset, "First Pickup");
        hOffset += 57.5;
        pdf.text(hOffset - 3, vOffset, "Last Drop Off");
        hOffset += 54;
        pdf.setFontStyle("normal");
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");
        hOffset += 54;
        pdf.text(hOffset, vOffset, "");

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
        hOffset += 54;
        pdf.setDrawColor(120, 120, 120);
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
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
        hOffset += 54;
        pdf.setDrawColor(120, 120, 120);
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
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
        hOffset += 54;
        pdf.setDrawColor(120, 120, 120);
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
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
        hOffset += 54;
        pdf.setDrawColor(120, 120, 120);
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
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
        hOffset += 54;
        pdf.setDrawColor(120, 120, 120);
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 57.5;
        pdf.line(hOffset - 64.5, vOffset + 2, hOffset - 6, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 60.5, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
        hOffset += 54;
        pdf.line(hOffset - 58, vOffset + 2, hOffset - 3, vOffset - 16);
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
        pdf.setFillColor(207, 69, 32);
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
        const daily = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        for (let i = 0; i < 5; i++) {
            vOffset += 14;
            hOffset = margin;
            pdf.setDrawColor(0, 0, 0);
            if (i % 2 === 0) {
                pdf.setFillColor(210, 210, 210);
            } else {
                pdf.setFillColor(255, 255, 255);
            }
            pdf.rect(margin, vOffset - 12, 534, 14, "FD");
            pdf.setFontStyle("bold");

            hOffset += 2;
            pdf.setFontSize(9);
            x = objThis.Sup[`${daily[i]}Date`] || "";
            pdf.text(hOffset, vOffset, x || "");

            pdf.setFontStyle("normal");
            pdf.setFontSize(8);
            hOffset += 36;
            pdf.text(hOffset, vOffset, "");
            hOffset += 40;
            pdf.text(hOffset, vOffset, "");
            hOffset += 42;
            pdf.setFontSize(9);
            pdf.setFontStyle("bold");
            hOffset += 6;
            pdf.text(hOffset, vOffset, "");

            pdf.setFontStyle("normal");
            pdf.setFontSize(8);
            hOffset += 37;
            pdf.text(hOffset, vOffset, "");
            hOffset += 40;
            pdf.text(hOffset, vOffset, "");
            hOffset += 42;
            pdf.setFontSize(9);
            pdf.setFontStyle("bold");
            hOffset += 6;
            pdf.text(hOffset, vOffset, "");

            pdf.setFontStyle("normal");
            pdf.setFontSize(8);
            hOffset += 37;
            pdf.text(hOffset, vOffset, "");
            hOffset += 40;
            pdf.text(hOffset, vOffset, "");
            hOffset += 42;
            pdf.setFontSize(9);
            pdf.setFontStyle("bold");
            hOffset += 6;
            pdf.text(hOffset, vOffset, "");

            vOffset += 14;
            hOffset = margin;
            pdf.setDrawColor(0, 0, 0);
            if (i % 2 === 0) {
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
            pdf.rect(hOffset + 1, vOffset - 10, 14, 10);
            pdf.setTextColor(0, 0, 0);

            pdf.setFontSize(7);
            pdf.text(hOffset + 3, vOffset - 1.5, 'Q');
            pdf.text(hOffset + 9, vOffset - 1.5, 'L');
            pdf.setTextColor(0, 0, 0);
            pdf.setDrawColor(0);
            pdf.setFillColor(0, 0, 0);
            pdf.rect(hOffset + 18, vOffset - 10, 10, 10);
            pdf.setTextColor(0, 0, 0);
            pdf.text(hOffset + 21, vOffset - 1.5, 'J');
            pdf.setTextColor(0, 0, 0);

            pdf.setFontStyle("normal");
            pdf.setFontSize(8);
            hOffset += 36;
            pdf.text(hOffset, vOffset, "");
            hOffset += 40;
            pdf.text(hOffset, vOffset, "");
            hOffset += 42;
            pdf.setFontSize(9);
            pdf.setFontStyle("bold");
            hOffset += 6;
            pdf.text(hOffset, vOffset, "");


            pdf.setFontStyle("normal");
            pdf.setFontSize(8);
            hOffset += 37;
            pdf.text(hOffset, vOffset, "");
            hOffset += 40;
            pdf.text(hOffset, vOffset, "");
            hOffset += 42;
            pdf.setFontSize(9);
            pdf.setFontStyle("bold");
            hOffset += 6;
            pdf.text(hOffset, vOffset, "");


            pdf.setFontStyle("normal");
            pdf.setFontSize(8);
            hOffset += 37;
            pdf.text(hOffset, vOffset, "");
            hOffset += 40;
            pdf.text(hOffset, vOffset, "");
            hOffset += 42;
            pdf.setFontSize(9);
            pdf.setFontStyle("bold");
            hOffset += 6;
            pdf.text(hOffset, vOffset, "");

            pdf.setFontStyle("normal");
            pdf.setFontSize(8);
            hOffset += 37;
            pdf.text(hOffset, vOffset, "");
            hOffset += 40;
            pdf.text(hOffset, vOffset, "");
            hOffset += 42;
            pdf.setFontSize(9);
            pdf.setFontStyle("bold");
            hOffset += 6;
            pdf.text(hOffset, vOffset, "");
            if (i % 2 === 0) {
                pdf.setFillColor(210, 210, 210);
            } else {
                pdf.setFillColor(255, 255, 255);
            }
            pdf.rect(552, vOffset - 26, 40, 30, "FD");
            hOffset += 38;
            pdf.setFontSize(10);
            pdf.text(hOffset, vOffset - 8, "");
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
        pdf.text(hOffset + 5, vOffset, "");
        vOffset += 2;

        //OTHER WORK SECTION
        vOffset += 12;
        vTimeStart = vOffset - 9; //Needed for the lines used later
        hOffset = margin;
        pdf.setDrawColor(0, 0, 0);
        pdf.setFillColor(207, 69, 32);
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
        //FIND OTHER WORK DATA
        let otherWork = ["OW0", "OW1", "OW2", "OW3", "OW4", "OW5", "OW6", "OW7", "OW8", "OW9"];
        let j = 0;
        for (let k = 20; k < 30; k++) {
            if (objThis.Sup[`SupSelect${k}`] !== "") {
                otherWork[j] = `SupTime${k}`;
                j++;
            }
        }

        //FIND LEAVE TAKEN
        let leave = ["LV0", "LV1", "LV2", "LV3", "LV4", "LV5", "LV6", "LV7", "LV8", "LV9"];
        j = 0;
        for (let k = 40; k < 45; k++) {
            if (objThis.Sup[`SupTime${k}S`] !== "") {
                leave[j] = `SupTime${k}`;
                j++;
            }
            if (objThis.Sup[`SupLeaveAD${k}`]) {
                leave[j] = `SupLeaveAD${k}`;
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
                let b = otherWork[i].substr(-2);
                let c = objThis.Sup[`SupSelect${b}`] || "";
                if (c === "ES0" || c === "ES2" || c === "CBK") {
                    pdf.setDrawColor(0, 0, 0);
                    pdf.setFillColor(255, 255, 0);
                    pdf.rect(margin, vOffset - 12, 357, 14, "FD");
                }
                x = objThis.Sup[`SupDate${b}`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 28;
                pdf.setDrawColor(0);
                pdf.setFillColor(0, 0, 0);
                pdf.setFontStyle('bold');
                if (objThis.Sup[`SupQL${b}`]) {
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
                x = objThis.Sup[`SupSelect${b}`] || "";
                x += " - ";
                x += objThis.Sup[`SupDesc${b}`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 175;
                x = objThis.Sup[`${otherWork[i]}S`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 42;
                x = objThis.Sup[`${otherWork[i]}E`] || "";
                pdf.text(hOffset, vOffset, x || "");
                x = calculateTotal(calculateDiff("Sup", b));
                hOffset += 48;
                pdf.setFontStyle("bold");
                if (objThis.Sup[`SupOJT${b}`]) {
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
                let b = leave[i].substr(-2);
                x = objThis.Sup[`SupDate${b}`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 28;
                pdf.setFontSize(8);
                x = objThis.Sup[`SupSelect${b}`] || "";
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
                    x = objThis.Sup[`${leave[i]}S`] || "";
                    pdf.text(hOffset, vOffset, x || "");
                    hOffset += 40;
                    x = objThis.Sup[`${leave[i]}E`] || "";
                    pdf.text(hOffset, vOffset, x || "");
                    hOffset += 45;
                    pdf.setFontStyle("bold");
                    pdf.setFontSize(9);
                    x = convertTotal(calculateDiff("Sup", b));
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
        pdf.setFillColor(207, 69, 32);
        pdf.rect(margin, vOffset - 10, 572, 12, "FD");
        pdf.setFontStyle("bold");
        pdf.setTextColor(255,255,255);
        pdf.text(hOffset + 270, vOffset, "Field Trips");

        //FIND OTHER WORK DATA
        let fieldTrip = ["FT0", "FT1", "FT2", "FT3", "FT4"];
        j = 0;

        for (let k = 30; k < 35; k++) {
            if (objThis.Sup[`SupTime${k}S`] !== "") {
                fieldTrip[j] = `SupTime${k}`;
                j++;
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
                let b = fieldTrip[i].substr(7);
                x = objThis.Sup[`SupDate${b}`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 33;
                pdf.setDrawColor(0);
                pdf.setFillColor(0, 0, 0);
                pdf.setFontStyle('bold');
                if (objThis.Sup[`SupQL${b}`]) {
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
                x = objThis.Sup[`SupFrom${b}`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 150;
                x = objThis.Sup[`SupTo${b}`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 150;
                x = objThis.Sup[`SupVoucher${b}`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 55;
                x = objThis.Sup[`${fieldTrip[i]}S`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 55;
                x = objThis.Sup[`${fieldTrip[i]}E`] || "";
                pdf.text(hOffset, vOffset, x || "");
                hOffset += 58;
                pdf.setFontStyle("bold");
                pdf.setFontSize(10);
                x = convertTotal(calculateDiff("Sup", b));
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
        x = objThis.Sup.EmpInitials;
        pdf.text(hOffset + 45, vOffset + 8, x || "");
        pdf.setFontSize(8);
        pdf.text(hOffset, vOffset + 23, "Supervisor \nSignature:");

        vOffset += 31;
        vOffset += 16;

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
        pdf.text(hOffset, vOffset, "");
        hOffset += 57.2;
        pdf.setFontSize(14);
        x = x;
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

        x = objThis.Sup.Team;

        let y = objThis.Sup.WeekOf;
        let z = y.substr(8);
        y = y.substr(0, 8);
        x = x + "_" + y + "_" + z;

        x = x + "_" + objThis.Sup.EmpName.replace(",", "").replace(" ", "");
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
    } catch (error) {
        console.log(error.message);
    }
});
