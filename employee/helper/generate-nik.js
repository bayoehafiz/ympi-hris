var $letters = [{
    year: "1997",
    letter: "A"
}, {
    year: "1998",
    letter: "B"
}, {
    year: "1999",
    letter: "C"
}, {
    year: "2000",
    letter: "D"
}, {
    year: "2001",
    letter: "E"
}, {
    year: "2002",
    letter: "F"
}, {
    year: "2003",
    letter: "G"
}, {
    year: "2004",
    letter: "H"
}, {
    year: "2005",
    letter: "I"
}, {
    year: "2006",
    letter: "J"
}, {
    year: "2007",
    letter: "K"
}, {
    year: "2008",
    letter: "L"
}, {
    year: "2009",
    letter: "M"
}, {
    year: "2010",
    letter: "N"
}, {
    year: "2011",
    letter: "O"
}, {
    year: "2012",
    letter: "P"
}, {
    year: "2013",
    letter: "Q"
}, {
    year: "2014",
    letter: "R"
}, {
    year: "2015",
    letter: "S"
}, {
    year: "2016",
    letter: "T"
}, {
    year: "2017",
    letter: "U"
}, {
    year: "2018",
    letter: "V"
}, {
    year: "2019",
    letter: "W"
}, {
    year: "2020",
    letter: "X"
}, {
    year: "2021",
    letter: "Y"
}, {
    year: "2022",
    letter: "Z"
}]

// Function like PHP's php_pad()
var pad = function(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

// Funtion to fetch latest NIK
var getLatestNik = function(status_karyawan) {
    return $.ajax({
        type: "GET",
        url: ENV.BASE_API + "getLatestNik.php",
        dataType: "json"
    });
}
