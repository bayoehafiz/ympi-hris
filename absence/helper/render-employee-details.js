// Fn to render employee's calendar
var renderEmployeeDetails = function(id) {
    if ($('#employee-details').hasClass('hide-me')) $('#employee-details').removeClass('hide-me');
    $.getJSON(ENV.BASE_API + "getAbsenceByEmployee.php?id=" + id, function(res) {
        var data = res.employee;
        // Employee details container
        var container = $('#employee-details-content');
        container.empty();
        container.append('<div class="block-content nopadding push-10">' +
            '<div class="font-s16">' + data.nik + '</div>' +
            '<div class="h3 font-w600 push-10">' + data.nama + '</div>' +
            '<div class="push-5"><span class="text-muted"><small>Grade</small></span><br>' + data.kode_grade + ' (' + data.nama_grade + ')</div>' +
            '<div class="push-20"><span class="text-muted"><small>Status</small></span><br>' + data.status + '</div>' +
            '</div>');

        // Calculate LEAVE DATA
        window.absence_data = {};
        var e_month = moment(data.tgl_masuk, 'YYYY-MM-DD').format('MM-DD');
        var current_year = moment().format('YYYY');
        var reset_month = current_year + '-' + e_month;
        if (moment(reset_month, 'YYYY-MM-DD').isBefore(moment())) {
            var $start = reset_month;
            var $end = moment(reset_month, 'YYYY-MM-DD').add(1, 'years').format('YYYY-MM-DD');
        } else {
            var $start = moment(reset_month, 'YYYY-MM-DD').subtract(1, 'years').format('YYYY-MM-DD');
            var $end = reset_month;
        }
        var absence_data = res.absence;
        var absence_count = 0;
        if (absence_data.length > 0) {
            // sanitate absence datas within current valid year
            $.each(absence_data, function(key, ad) {
                var leave_start_date = moment(ad.leave_date, 'YYYY-MM-DD');
                var leave_end_date = leave_start_date.add(ad.leave_period, 'days');
                if ((!leave_start_date.isBefore(moment($start, 'YYYY-MM-DD'))) && (leave_end_date.isBefore(moment($end, 'YYYY-MM-DD')))) {
                    if (ad.potongan_cuti == '1') absence_count += parseInt(ad.leave_period);
                }
            })
        }
        var absence_left = 14 - absence_count;

        container.append('<div class="block-content nopadding push-10">' +
            '<div class="push-5"><span class="text-muted push-10-r">Cuti Terpakai</span><span class="font-s20 font-w700 text-danger">' + absence_count + '</span> Hari</div>' +
            '<div class="push-5"><span class="text-muted push-10-r">Cuti Tersisa</span><span class="font-s20 font-w700 text-success">' + absence_left + '</span> Hari</div>' +
            '<div class="push-5"><span class="text-muted push-10-r">Tgl Habis Cuti</span>' + moment($end, 'YYYY-MM-DD').format('DD MMMM YYYY') + '</div>' +
            '</div>');

        window.absence_data = {
            period_start: $start,
            period_end: $end,
            absence_count: absence_count,
            absence_left: absence_left
        }

        var shifts = [];
        // compile plots first
        $.each(res.shift, function(key, val) {
            if (res.shift[key].length > 0) res.shift[key].forEach(function(v) { shifts.push(v); });
        })
        // then send data to calendar
        renderCalendar(shifts, res.absence);
    });
};
