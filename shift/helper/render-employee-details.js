// Fn to render employee's calendar
var renderEmployeeDetails = function(id) {
    if ($('#employee-details').hasClass('hide-me')) $('#employee-details').removeClass('hide-me');
    $.getJSON(ENV.BASE_API + "getShiftByEmployee.php?id=" + id, function(res) {
        var data = res.employee;
        // Employee details container
        var container = $('#employee-details-content');
        container.empty();
        container.append('<div class="block-content nopadding push-10">' +
            '<div class="font-s16">' + data.nik + '</div>' +
            '<div class="h3 font-w600 push-10">' + data.nama + '</div>' +
            '<div class="push-5"><span class="text-muted"><small>Grade</small></span><br>' + data.kode_grade + ' (' + data.nama_grade + ')</div>' +
            '<div class="push-5"><span class="text-muted"><small>Jabatan/Penugasan</small></span><br>' + data.nama_penugasan + '</div>' +
            '<div class="push-5"><span class="text-muted"><small>Kode Bagian</small></span><br>' + data.nama_kode_bagian + '</div>' +
            '<div class="push-5"><span class="text-muted"><small>Divisi</small></span><br>' + data.nama_division + '</div>' +
            '<div class="push-5"><span class="text-muted"><small>Departemen</small></span><br>' + data.nama_department + '</div>' +
            '<div class="push-5"><span class="text-muted"><small>Section</small></span><br>' + data.nama_section + '</div>' +
            '<div class="push-5"><span class="text-muted"><small>Sub Section</small></span><br>' + data.nama_sub_section + '</div>' +
            '<div class="push-5"><span class="text-muted"><small>Grup</small></span><br>' + data.nama_group + '</div>' +
            '</div>');

        // Shift-plot details container
        var shifts = [];
        // compile plots first
        $.each(res.shift, function(key, val) {
            if (res.shift[key].length > 0) res.shift[key].forEach(function(v) { shifts.push(v); });
        })
        // then send data to calendar
        renderShiftCalendar(shifts);
    });
};
