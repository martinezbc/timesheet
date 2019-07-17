//WEBSITE INTERACTION SCRIPT
var i = 0;

var byID = function(id) {
    return document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', function() {
    //LOAD DATE RANGES INTO RADIO BUTTONS AND DISPLAY
    loadDateRange();

    //START WITH LOADING DATA FROM LOCAL STORAGE
    loadLocalStorage();

    loadTeamValues(getStorage("Area"));
    loadRadioSelection();
    checkOJTData();
    checkDailyLeave();
    positionChange();
    //checkOtherWorkVal();
    loadNavBar();
}, false);






