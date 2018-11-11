// Init page stat
var initStat = function() {
    $.ajax({
        type: "GET",
        url: ENV.BASE_API + 'getEmployeeStat.php',
        dataType: 'json',
        success: function(res) {
            var container = $('#employee-stat');
            container.empty();

            var html = '';
            if (res.success) {
                var data = [];
                var str = JSON.stringify(res.data[0]); // convert to String
                str = str.substring(str.indexOf('{') + 1, str.indexOf('}')); // remove Brackets
                str.split(',').forEach(function(a) { // split by Comma and make an array
                    var split = a.split(':'); // split by Colon and push into DATA
                    data.push({
                        label: split[0].toString(),
                        value: split[1]
                    })
                });

                var data_length = data.length;
                if (data_length > 0) {
                    data.forEach(function(d) {
                        if (d.label.replace(/\"/g, "") == 'Non Aktif') {
                            var text_color = 'text-danger';
                        } else {
                            var text_color = 'text-primary';
                        }

                        html += '<div class="col-md-2">' +
                            '<span class="h1 font-w700 ' + text_color + '" data-toggle="countTo" data-to="' + d.value.replace(/\"/g, "") + '"></span>' +
                            '<div class="font-w700 text-gray-darker animated fadIn">' + d.label.replace(/\"/g, "") + '</div>' +
                            '</div>';
                    });
                }
            }

            container.html(html);

            // reinitiate counter plugin
            App.initHelpers('appear-countTo');
        }
    })
};
