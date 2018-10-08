// Function to humanise MASA_KERJA
var humaniseMasaKerja = function(diff) {
    var str = '';
    var values = [
        [' Thn', 365],
        [' Bln', 30],
        [' Hr', 1]
    ];
    for (var i = 0; i < values.length; i++) {
        var amount = Math.floor(diff / values[i][1]);
        if (amount >= 1) {
            str += amount + values[i][0] + ' ';
            diff -= amount * values[i][1];
        }
    }
    return str;
}

// Function to humanise USIA
var humaniseUsia = function(diff) {
    var str = '';
    var values = [
        [' Thn', 365]
    ];
    for (var i = 0; i < values.length; i++) {
        var amount = Math.floor(diff / values[i][1]);
        if (amount >= 1) {
            str += amount + values[i][0] + '';
            diff -= amount * values[i][1];
        }
    }
    return str;
}
