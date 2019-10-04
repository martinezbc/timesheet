const objNewData = {
    EmpName: "",
    EmpInitials: "",
    Area: "",
    Team: "",
    Position: "",
    OJT: false,
    Trainee: "",
    Veh1: "",
    Veh2: "",
    Veh3: "",
    Veh4: "",
    AMRoute1: "",
    AMRoute2: "",
    AMRoute3: "",
    AMRoute4: "",
    AMRoute5: "",
    PMRoute1: "",
    PMRoute2: "",
    PMRoute3: "",
    PMRoute4: "",
    PMRoute5: "",
    PSRoute1: "",
    PSRoute2: "",
    SHRoute1: "",
    SHRoute2: "",
    LRRoute1: "",
    LRRoute2: "",
    TotalRun: "",
    TotalOther: "",
    TotalFT: "",
    TotalHW: "",
    TotalS2QL: "",
    TotalS4J: "",
    TotalS4OJT: "",
    TotalC3: "",
    TotalC1: "",
    Total1R: "",
    WeekOf: ""
};
const objNewSat = {
    SatDate: "",
    SatQL20: false,
    SatSelect20: "",
    SatDesc20: "",
    SatTime20S: "",
    SatTime20E: "",
    SatTime20: "",
    SatQL21: false,
    SatSelect21: "",
    SatDesc21: "",
    SatTime21S: "",
    SatTime21E: "",
    SatTime21: "",
    SatQL22: false,
    SatSelect22: "",
    SatDesc22: "",
    SatTime22S: "",
    SatTime22E: "",
    SatTime22: "",
    SatVoucher30: "",
    SatQL30: false,
    SatFrom30: "",
    SatTo30: "",
    SatTime30S: "",
    SatTime30E: "",
    SatTime30: "",
    SatVoucher31: "",
    SatQL31: false,
    SatFrom31: "",
    SatTo31: "",
    SatTime31S: "",
    SatTime31E: "",
    SatTime31: "",
    SatVoucher32: "",
    SatQL32: false,
    SatFrom32: "",
    SatTo32: "",
    SatTime32S: "",
    SatTime32E: "",
    SatTime32: ""
};
const objNewSun = {
    SunDate: "",
    SunQL20: false,
    SunSelect20: "",
    SunDesc20: "",
    SunTime20S: "",
    SunTime20E: "",
    SunTime20: "",
    SunQL21: false,
    SunSelect21: "",
    SunDesc21: "",
    SunTime21S: "",
    SunTime21E: "",
    SunTime21: "",
    SunQL22: false,
    SunSelect22: "",
    SunDesc22: "",
    SunTime22S: "",
    SunTime22E: "",
    SunTime22: "",
    SunVoucher30: "",
    SunQL30: false,
    SunFrom30: "",
    SunTo30: "",
    SunTime30S: "",
    SunTime30E: "",
    SunTime30: "",
    SunVoucher31: "",
    SunQL31: false,
    SunFrom31: "",
    SunTo31: "",
    SunTime31S: "",
    SunTime31E: "",
    SunTime31: "",
    SunVoucher32: "",
    SunQL32: false,
    SunFrom32: "",
    SunTo32: "",
    SunTime32S: "",
    SunTime32E: "",
    SunTime32: ""
};
const objNewMon = {
    MonDate: "",
    MonTimeA: "",
    MonTimeB: "",
    MonTimeC: "",
    MonTimeD: "",
    MonAM1Ct: "",
    MonAM2Ct: "",
    MonAM3Ct: "",
    MonAM4Ct: "",
    MonAM5Ct: "",
    MonPS1Ct: "",
    MonPS2Ct: "",
    MonSH1Ct: "",
    MonSH2Ct: "",
    MonLR1Ct: "",
    MonLR2Ct: "",
    MonPM1Ct: "",
    MonPM2Ct: "",
    MonPM3Ct: "",
    MonPM4Ct: "",
    MonPM5Ct: "",
    MonOJT11: false,
    MonQL11: false,
    MonJ11: false,
    MonTime11S: "",
    MonTime11E: "",
    MonTime11: "",
    MonOJT12: false,
    MonTime12S: "",
    MonTime12E: "",
    MonTime12: "",
    MonOJT13: false,
    MonTime13S: "",
    MonTime13E: "",
    MonTime13: "",
    MonOJT14: false,
    MonTime14S: "",
    MonTime14E: "",
    MonTime14: "",
    MonOJT15: false,
    MonTime15S: "",
    MonTime15E: "",
    MonTime15: "",
    MonOJT16: false,
    MonTime16S: "",
    MonTime16E: "",
    MonTime16: "",
    MonOJT17: false,
    MonTime17S: "",
    MonTime17E: "",
    MonTime17: "",
    MonOJT20: false,
    MonQL20: false,
    MonSelect20: "",
    MonDesc20: "",
    MonTime20S: "",
    MonTime20E: "",
    MonTime20: "",
    MonOJT21: false,
    MonQL21: false,
    MonSelect21: "",
    MonDesc21: "",
    MonTime21S: "",
    MonTime21E: "",
    MonTime21: "",
    MonOJT22: false,
    MonQL22: false,
    MonSelect22: "",
    MonDesc22: "",
    MonTime22S: "",
    MonTime22E: "",
    MonTime22: "",
    MonOJT23: false,
    MonQL23: false,
    MonSelect23: "",
    MonDesc23: "",
    MonTime23S: "",
    MonTime23E: "",
    MonTime23: "",
    MonOJT24: false,
    MonQL24: false,
    MonSelect24: "",
    MonDesc24: "",
    MonTime24S: "",
    MonTime24E: "",
    MonTime24: "",
    MonOJT25: false,
    MonQL25: false,
    MonSelect25: "",
    MonDesc25: "",
    MonTime25S: "",
    MonTime25E: "",
    MonTime25: "",
    MonOJT26: false,
    MonQL26: false,
    MonSelect26: "",
    MonDesc26: "",
    MonTime26S: "",
    MonTime26E: "",
    MonTime26: "",
    MonOJT27: false,
    MonQL27: false,
    MonSelect27: "",
    MonDesc27: "",
    MonTime27S: "",
    MonTime27E: "",
    MonTime27: "",
    MonOJT28: false,
    MonQL28: false,
    MonSelect28: "",
    MonDesc28: "",
    MonTime28S: "",
    MonTime28E: "",
    MonTime28: "",
    MonOJT29: false,
    MonQL29: false,
    MonSelect29: "",
    MonDesc29: "",
    MonTime29S: "",
    MonTime29E: "",
    MonTime29: "",
    MonVoucher30: "",
    MonOJT30: false,
    MonQL30: false,
    MonFrom30: "",
    MonTo30: "",
    MonTime30S: "",
    MonTime30E: "",
    MonTime30: "",
    MonVoucher31: "",
    MonOJT31: false,
    MonQL31: false,
    MonFrom31: "",
    MonTo31: "",
    MonTime31S: "",
    MonTime31E: "",
    MonTime31: "",
    MonVoucher32: "",
    MonOJT32: false,
    MonQL32: false,
    MonFrom32: "",
    MonTo32: "",
    MonTime32S: "",
    MonTime32E: "",
    MonTime32: "",
    MonVoucher33: "",
    MonOJT33: false,
    MonQL33: false,
    MonFrom33: "",
    MonTo33: "",
    MonTime33S: "",
    MonTime33E: "",
    MonTime33: "",
    MonVoucher34: "",
    MonOJT34: false,
    MonQL34: false,
    MonFrom34: "",
    MonTo34: "",
    MonTime34S: "",
    MonTime34E: "",
    MonTime34: "",
    MonLeaveAD: false,
    MonLeaveSelectAD: "",
    MonLeaveSelect41: "",
    MonTime41S: "",
    MonTime41E: "",
    MonTime41: "",
    MonLeaveSelect40: "",
    MonTime40S: "",
    MonTime40E: "",
    MonTime40: "",
    MonRunTotal: ""
};
const objNewTue = {
    TueDate: "",
    TueTimeA: "",
    TueTimeB: "",
    TueTimeC: "",
    TueTimeD: "",
    TueAM1Ct: "",
    TueAM2Ct: "",
    TueAM3Ct: "",
    TueAM4Ct: "",
    TueAM5Ct: "",
    TuePM1Ct: "",
    TuePM2Ct: "",
    TuePM3Ct: "",
    TuePM4Ct: "",
    TuePM5Ct: "",
    TuePS1Ct: "",
    TuePS2Ct: "",
    TueSH1Ct: "",
    TueSH2Ct: "",
    TueLR1Ct: "",
    TueLR2Ct: "",
    TueOJT11: false,
    TueQL11: false,
    TueJ11: false,
    TueTime11S: "",
    TueTime11E: "",
    TueTime11: "",
    TueOJT12: false,
    TueTime12S: "",
    TueTime12E: "",
    TueTime12: "",
    TueOJT13: false,
    TueTime13S: "",
    TueTime13E: "",
    TueTime13: "",
    TueOJT14: false,
    TueTime14S: "",
    TueTime14E: "",
    TueTime14: "",
    TueOJT15: false,
    TueTime15S: "",
    TueTime15E: "",
    TueTime15: "",
    TueOJT16: false,
    TueTime16S: "",
    TueTime16E: "",
    TueTime16: "",
    TueOJT17: false,
    TueTime17S: "",
    TueTime17E: "",
    TueTime17: "",
    TueOJT20: false,
    TueQL20: false,
    TueSelect20: "",
    TueDesc20: "",
    TueTime20S: "",
    TueTime20E: "",
    TueTime20: "",
    TueOJT21: false,
    TueQL21: false,
    TueSelect21: "",
    TueDesc21: "",
    TueTime21S: "",
    TueTime21E: "",
    TueTime21: "",
    TueOJT22: false,
    TueQL22: false,
    TueSelect22: "",
    TueDesc22: "",
    TueTime22S: "",
    TueTime22E: "",
    TueTime22: "",
    TueOJT23: false,
    TueQL23: false,
    TueSelect23: "",
    TueDesc23: "",
    TueTime23S: "",
    TueTime23E: "",
    TueTime23: "",
    TueOJT24: false,
    TueQL24: false,
    TueSelect24: "",
    TueDesc24: "",
    TueTime24S: "",
    TueTime24E: "",
    TueTime24: "",
    TueOJT25: false,
    TueQL25: false,
    TueSelect25: "",
    TueDesc25: "",
    TueTime25S: "",
    TueTime25E: "",
    TueTime25: "",
    TueOJT26: false,
    TueQL26: false,
    TueSelect26: "",
    TueDesc26: "",
    TueTime26S: "",
    TueTime26E: "",
    TueTime26: "",
    TueOJT27: false,
    TueQL27: false,
    TueSelect27: "",
    TueDesc27: "",
    TueTime27S: "",
    TueTime27E: "",
    TueTime27: "",
    TueOJT28: false,
    TueQL28: false,
    TueSelect28: "",
    TueDesc28: "",
    TueTime28S: "",
    TueTime28E: "",
    TueTime28: "",
    TueOJT29: false,
    TueQL29: false,
    TueSelect29: "",
    TueDesc29: "",
    TueTime29S: "",
    TueTime29E: "",
    TueTime29: "",
    TueVoucher30: "",
    TueOJT30: false,
    TueQL30: false,
    TueFrom30: "",
    TueTo30: "",
    TueTime30S: "",
    TueTime30E: "",
    TueTime30: "",
    TueVoucher31: "",
    TueOJT31: false,
    TueQL31: false,
    TueFrom31: "",
    TueTo31: "",
    TueTime31S: "",
    TueTime31E: "",
    TueTime31: "",
    TueVoucher32: "",
    TueOJT32: false,
    TueQL32: false,
    TueFrom32: "",
    TueTo32: "",
    TueTime32S: "",
    TueTime32E: "",
    TueTime32: "",
    TueVoucher33: "",
    TueOJT33: false,
    TueQL33: false,
    TueFrom33: "",
    TueTo33: "",
    TueTime33S: "",
    TueTime33E: "",
    TueTime33: "",
    TueVoucher34: "",
    TueOJT34: false,
    TueQL34: false,
    TueFrom34: "",
    TueTo34: "",
    TueTime34S: "",
    TueTime34E: "",
    TueTime34: "",
    TueLeaveAD: false,
    TueLeaveSelectAD: "",
    TueLeaveSelect41: "",
    TueTime41S: "",
    TueTime41E: "",
    TueTime41: "",
    TueLeaveSelect40: "",
    TueTime40S: "",
    TueTime40E: "",
    TueTime40: "",
    TueRunTotal: ""
};
const objNewWed = {
    WedDate: "",
    WedTimeA: "",
    WedTimeB: "",
    WedTimeC: "",
    WedTimeD: "",
    WedAM1Ct: "",
    WedAM2Ct: "",
    WedAM3Ct: "",
    WedAM4Ct: "",
    WedAM5Ct: "",
    WedPM1Ct: "",
    WedPM2Ct: "",
    WedPM3Ct: "",
    WedPM4Ct: "",
    WedPM5Ct: "",
    WedPS1Ct: "",
    WedPS2Ct: "",
    WedSH1Ct: "",
    WedSH2Ct: "",
    WedLR1Ct: "",
    WedLR2Ct: "",
    WedOJT11: false,
    WedQL11: false,
    WedJ11: false,
    WedTime11S: "",
    WedTime11E: "",
    WedTime11: "",
    WedOJT12: false,
    WedTime12S: "",
    WedTime12E: "",
    WedTime12: "",
    WedOJT13: false,
    WedTime13S: "",
    WedTime13E: "",
    WedTime13: "",
    WedOJT14: false,
    WedTime14S: "",
    WedTime14E: "",
    WedTime14: "",
    WedOJT15: false,
    WedTime15S: "",
    WedTime15E: "",
    WedTime15: "",
    WedOJT16: false,
    WedTime16S: "",
    WedTime16E: "",
    WedTime16: "",
    WedOJT17: false,
    WedTime17S: "",
    WedTime17E: "",
    WedTime17: "",
    WedOJT20: false,
    WedQL20: false,
    WedSelect20: "",
    WedDesc20: "",
    WedTime20S: "",
    WedTime20E: "",
    WedTime20: "",
    WedOJT21: false,
    WedQL21: false,
    WedSelect21: "",
    WedDesc21: "",
    WedTime21S: "",
    WedTime21E: "",
    WedTime21: "",
    WedOJT22: false,
    WedQL22: false,
    WedSelect22: "",
    WedDesc22: "",
    WedTime22S: "",
    WedTime22E: "",
    WedTime22: "",
    WedOJT23: false,
    WedQL23: false,
    WedSelect23: "",
    WedDesc23: "",
    WedTime23S: "",
    WedTime23E: "",
    WedTime23: "",
    WedOJT24: false,
    WedQL24: false,
    WedSelect24: "",
    WedDesc24: "",
    WedTime24S: "",
    WedTime24E: "",
    WedTime24: "",
    WedOJT25: false,
    WedQL25: false,
    WedSelect25: "",
    WedDesc25: "",
    WedTime25S: "",
    WedTime25E: "",
    WedTime25: "",
    WedOJT26: false,
    WedQL26: false,
    WedSelect26: "",
    WedDesc26: "",
    WedTime26S: "",
    WedTime26E: "",
    WedTime26: "",
    WedOJT27: false,
    WedQL27: false,
    WedSelect27: "",
    WedDesc27: "",
    WedTime27S: "",
    WedTime27E: "",
    WedTime27: "",
    WedOJT28: false,
    WedQL28: false,
    WedSelect28: "",
    WedDesc28: "",
    WedTime28S: "",
    WedTime28E: "",
    WedTime28: "",
    WedOJT29: false,
    WedQL29: false,
    WedSelect29: "",
    WedDesc29: "",
    WedTime29S: "",
    WedTime29E: "",
    WedTime29: "",
    WedVoucher30: "",
    WedOJT30: false,
    WedQL30: false,
    WedFrom30: "",
    WedTo30: "",
    WedTime30S: "",
    WedTime30E: "",
    WedTime30: "",
    WedVoucher31: "",
    WedOJT31: false,
    WedQL31: false,
    WedFrom31: "",
    WedTo31: "",
    WedTime31S: "",
    WedTime31E: "",
    WedTime31: "",
    WedVoucher32: "",
    WedOJT32: false,
    WedQL32: false,
    WedFrom32: "",
    WedTo32: "",
    WedTime32S: "",
    WedTime32E: "",
    WedTime32: "",
    WedVoucher33: "",
    WedOJT33: false,
    WedQL33: false,
    WedFrom33: "",
    WedTo33: "",
    WedTime33S: "",
    WedTime33E: "",
    WedTime33: "",
    WedVoucher34: "",
    WedOJT34: false,
    WedQL34: false,
    WedFrom34: "",
    WedTo34: "",
    WedTime34S: "",
    WedTime34E: "",
    WedTime34: "",
    WedLeaveAD: false,
    WedLeaveSelectAD: "",
    WedLeaveSelect41: "",
    WedTime41S: "",
    WedTime41E: "",
    WedTime41: "",
    WedLeaveSelect40: "",
    WedTime40S: "",
    WedTime40E: "",
    WedTime40: "",
    WedRunTotal: ""
};
const objNewThu = {
    ThuDate: "",
    ThuTimeA: "",
    ThuTimeB: "",
    ThuTimeC: "",
    ThuTimeD: "",
    ThuAM1Ct: "",
    ThuAM2Ct: "",
    ThuAM3Ct: "",
    ThuAM4Ct: "",
    ThuAM5Ct: "",
    ThuPM1Ct: "",
    ThuPM2Ct: "",
    ThuPM3Ct: "",
    ThuPM4Ct: "",
    ThuPM5Ct: "",
    ThuPS1Ct: "",
    ThuPS2Ct: "",
    ThuSH1Ct: "",
    ThuSH2Ct: "",
    ThuLR1Ct: "",
    ThuLR2Ct: "",
    ThuOJT11: false,
    ThuJ11: false,
    ThuQL11: false,
    ThuTime11S: "",
    ThuTime11E: "",
    ThuTime11: "",
    ThuOJT12: false,
    ThuTime12S: "",
    ThuTime12E: "",
    ThuTime12: "",
    ThuOJT13: false,
    ThuTime13S: "",
    ThuTime13E: "",
    ThuTime13: "",
    ThuOJT14: false,
    ThuTime14S: "",
    ThuTime14E: "",
    ThuTime14: "",
    ThuOJT15: false,
    ThuTime15S: "",
    ThuTime15E: "",
    ThuTime15: "",
    ThuOJT16: false,
    ThuTime16S: "",
    ThuTime16E: "",
    ThuTime16: "",
    ThuOJT17: false,
    ThuTime17S: "",
    ThuTime17E: "",
    ThuTime17: "",
    ThuOJT20: false,
    ThuQL20: false,
    ThuSelect20: "",
    ThuDesc20: "",
    ThuTime20S: "",
    ThuTime20E: "",
    ThuTime20: "",
    ThuOJT21: false,
    ThuQL21: false,
    ThuSelect21: "",
    ThuDesc21: "",
    ThuTime21S: "",
    ThuTime21E: "",
    ThuTime21: "",
    ThuOJT22: false,
    ThuQL22: false,
    ThuSelect22: "",
    ThuDesc22: "",
    ThuTime22S: "",
    ThuTime22E: "",
    ThuTime22: "",
    ThuOJT23: false,
    ThuQL23: false,
    ThuSelect23: "",
    ThuDesc23: "",
    ThuTime23S: "",
    ThuTime23E: "",
    ThuTime23: "",
    ThuOJT24: false,
    ThuQL24: false,
    ThuSelect24: "",
    ThuDesc24: "",
    ThuTime24S: "",
    ThuTime24E: "",
    ThuTime24: "",
    ThuOJT25: false,
    ThuQL25: false,
    ThuSelect25: "",
    ThuDesc25: "",
    ThuTime25S: "",
    ThuTime25E: "",
    ThuTime25: "",
    ThuOJT26: false,
    ThuQL26: false,
    ThuSelect26: "",
    ThuDesc26: "",
    ThuTime26S: "",
    ThuTime26E: "",
    ThuTime26: "",
    ThuOJT27: false,
    ThuQL27: false,
    ThuSelect27: "",
    ThuDesc27: "",
    ThuTime27S: "",
    ThuTime27E: "",
    ThuTime27: "",
    ThuOJT28: false,
    ThuQL28: false,
    ThuSelect28: "",
    ThuDesc28: "",
    ThuTime28S: "",
    ThuTime28E: "",
    ThuTime28: "",
    ThuOJT29: false,
    ThuQL29: false,
    ThuSelect29: "",
    ThuDesc29: "",
    ThuTime29S: "",
    ThuTime29E: "",
    ThuTime29: "",
    ThuVoucher30: "",
    ThuOJT30: false,
    ThuQL30: false,
    ThuFrom30: "",
    ThuTo30: "",
    ThuTime30S: "",
    ThuTime30E: "",
    ThuTime30: "",
    ThuVoucher31: "",
    ThuOJT31: false,
    ThuQL31: false,
    ThuFrom31: "",
    ThuTo31: "",
    ThuTime31S: "",
    ThuTime31E: "",
    ThuTime31: "",
    ThuVoucher32: "",
    ThuOJT32: false,
    ThuQL32: false,
    ThuFrom32: "",
    ThuTo32: "",
    ThuTime32S: "",
    ThuTime32E: "",
    ThuTime32: "",
    ThuVoucher33: "",
    ThuOJT33: false,
    ThuQL33: false,
    ThuFrom33: "",
    ThuTo33: "",
    ThuTime33S: "",
    ThuTime33E: "",
    ThuTime33: "",
    ThuVoucher34: "",
    ThuOJT34: false,
    ThuQL34: false,
    ThuFrom34: "",
    ThuTo34: "",
    ThuTime34S: "",
    ThuTime34E: "",
    ThuTime34: "",
    ThuLeaveAD: false,
    ThuLeaveSelectAD: "",
    ThuLeaveSelect41: "",
    ThuTime41S: "",
    ThuTime41E: "",
    ThuTime41: "",
    ThuLeaveSelect40: "",
    ThuTime40S: "",
    ThuTime40E: "",
    ThuTime40: "",
    ThuRunTotal: ""
};
const objNewFri = {
    FriDate: "",
    FriTimeA: "",
    FriTimeB: "",
    FriTimeC: "",
    FriTimeD: "",
    FriAM1Ct: "",
    FriAM2Ct: "",
    FriAM3Ct: "",
    FriAM4Ct: "",
    FriAM5Ct: "",
    FriPM1Ct: "",
    FriPM2Ct: "",
    FriPM3Ct: "",
    FriPM4Ct: "",
    FriPM5Ct: "",
    FriPS1Ct: "",
    FriPS2Ct: "",
    FriSH1Ct: "",
    FriSH2Ct: "",
    FriLR1Ct: "",
    FriLR2Ct: "",
    FriOJT11: false,
    FriJ11: false,
    FriQL11: false,
    FriTime11S: "",
    FriTime11E: "",
    FriTime11: "",
    FriOJT12: false,
    FriTime12S: "",
    FriTime12E: "",
    FriTime12: "",
    FriOJT13: false,
    FriTime13S: "",
    FriTime13E: "",
    FriTime13: "",
    FriOJT14: false,
    FriTime14S: "",
    FriTime14E: "",
    FriTime14: "",
    FriOJT15: false,
    FriTime15S: "",
    FriTime15E: "",
    FriTime15: "",
    FriOJT16: false,
    FriTime16S: "",
    FriTime16E: "",
    FriTime16: "",
    FriOJT17: false,
    FriTime17S: "",
    FriTime17E: "",
    FriTime17: "",
    FriOJT20: false,
    FriQL20: false,
    FriSelect20: "",
    FriDesc20: "",
    FriTime20S: "",
    FriTime20E: "",
    FriTime20: "",
    FriOJT21: false,
    FriQL21: false,
    FriSelect21: "",
    FriDesc21: "",
    FriTime21S: "",
    FriTime21E: "",
    FriTime21: "",
    FriOJT22: false,
    FriQL22: false,
    FriSelect22: "",
    FriDesc22: "",
    FriTime22S: "",
    FriTime22E: "",
    FriTime22: "",
    FriOJT23: false,
    FriQL23: false,
    FriSelect23: "",
    FriDesc23: "",
    FriTime23S: "",
    FriTime23E: "",
    FriTime23: "",
    FriOJT24: false,
    FriQL24: false,
    FriSelect24: "",
    FriDesc24: "",
    FriTime24S: "",
    FriTime24E: "",
    FriTime24: "",
    FriOJT25: false,
    FriQL25: false,
    FriSelect25: "",
    FriDesc25: "",
    FriTime25S: "",
    FriTime25E: "",
    FriTime25: "",
    FriOJT26: false,
    FriQL26: false,
    FriSelect26: "",
    FriDesc26: "",
    FriTime26S: "",
    FriTime26E: "",
    FriTime26: "",
    FriOJT27: false,
    FriQL27: false,
    FriSelect27: "",
    FriDesc27: "",
    FriTime27S: "",
    FriTime27E: "",
    FriTime27: "",
    FriOJT28: false,
    FriQL28: false,
    FriSelect28: "",
    FriDesc28: "",
    FriTime28S: "",
    FriTime28E: "",
    FriTime28: "",
    FriOJT29: false,
    FriQL29: false,
    FriSelect29: "",
    FriDesc29: "",
    FriTime29S: "",
    FriTime29E: "",
    FriTime29: "",
    FriVoucher30: "",
    FriOJT30: false,
    FriQL30: false,
    FriFrom30: "",
    FriTo30: "",
    FriTime30S: "",
    FriTime30E: "",
    FriTime30: "",
    FriVoucher31: "",
    FriOJT31: false,
    FriQL31: false,
    FriFrom31: "",
    FriTo31: "",
    FriTime31S: "",
    FriTime31E: "",
    FriTime31: "",
    FriVoucher32: "",
    FriOJT32: false,
    FriQL32: false,
    FriFrom32: "",
    FriTo32: "",
    FriTime32S: "",
    FriTime32E: "",
    FriTime32: "",
    FriVoucher33: "",
    FriOJT33: false,
    FriQL33: false,
    FriFrom33: "",
    FriTo33: "",
    FriTime33S: "",
    FriTime33E: "",
    FriTime33: "",
    FriVoucher34: "",
    FriOJT34: false,
    FriQL34: false,
    FriFrom34: "",
    FriTo34: "",
    FriTime34S: "",
    FriTime34E: "",
    FriTime34: "",
    FriLeaveAD: false,
    FriLeaveSelectAD: "",
    FriLeaveSelect41: "",
    FriTime41S: "",
    FriTime41E: "",
    FriTime41: "",
    FriLeaveSelect40: "",
    FriTime40S: "",
    FriTime40E: "",
    FriTime40: "",
    FriRunTotal: ""
};

const objNew = {
    Data: objNewData,
    Sat: objNewSat,
    Sun: objNewSun,
    Mon: objNewMon,
    Tue: objNewTue,
    Wed: objNewWed,
    Thu: objNewThu,
    Fri: objNewFri
};

let objTemp = {};
