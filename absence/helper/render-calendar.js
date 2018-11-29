// Fn to enumerate date range
var getDaysBySchema = function(startDate, endDate, schema) {
    var dates = [];
    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
    var active_days = parseInt(schema.charAt(0));
    var off_days = parseInt(schema.charAt(2));
    var counter = 1;
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        if (schema == '0d0') {
            dates.push({
                active: true,
                date: currDate.clone().toDate()
            });
        } else {
            // ACTIVE days
            if (counter <= active_days || counter > (active_days + off_days)) {
                dates.push({
                    active: true,
                    date: currDate.clone().toDate()
                });
            }
            // OFF days
            else {
                dates.push({
                    active: false,
                    date: currDate.clone().toDate()
                });
            }
            counter++;
            if (counter > (active_days + off_days)) counter = 1; // reset counter
        }
    }
    return dates;
};

var getDays = function(startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate());
    }

    return dates;
};

// Fn to render employee's calendar
var renderCalendar = function(res, absence_data) {
    var calendar_data = [];
    if (res.length > 0) {
        // hide error block
        $('#error-block').addClass('hide-me');

        // find smallest shift assigned
        var keys = res.map(function(r) {
            return r.assignation_key;
        });
        var smallest_shift = '';
        if ($.inArray('employee', keys) !== -1) smallest_shift = 'employee';
        else if ($.inArray('group', keys) !== -1) smallest_shift = 'group';
        else if ($.inArray('sub_section', keys) !== -1 && smallest_shift != 'group') smallest_shift = 'sub_section';
        else if ($.inArray('section', keys) !== -1 && smallest_shift != 'group' && smallest_shift != 'sub_section') smallest_shift = 'section';
        else if ($.inArray('department', keys) !== -1 && smallest_shift != 'group' && smallest_shift != 'sub_section' && smallest_shift != 'section') smallest_shift = 'department';
        else if (smallest_shift != 'group' && smallest_shift != 'sub_section' && smallest_shift != 'section' && smallest_shift != 'department') smallest_shift = 'division';

        var temp = [];

        // ITERATING SHIFTS
        $.each(res, function(key, data) {
            // Get date range of current SHIFT PLOT
            var days = getDaysBySchema(moment(data.date_from, 'YYYY-MM-DD').subtract(1, "days"), moment(data.date_to, 'YYYY-MM-DD').add(1, "days"), data.schema);

            // Get the array of HARI EFEKTIF of related SHIFT
            var hari_efektif = data.hari_efektif.split(',');

            // Only get the SPECIAL-SHIFT PLOT!
            if (data.assignation_key == smallest_shift && res.length > 1) {
                days.forEach(function(d) {
                    var day = d.date;

                    // if it is ACTIVE DAY (based on PLOT SCHEMA & HARI EFEKTIF array)
                    if (d.active && $.inArray(moment(day).format('dddd'), hari_efektif) !== -1) {
                        // if there is any OVERRIDING SHIFT
                        if (data.overrode_by.length > 0) {
                            data.overrode_by.forEach(function(dt) {
                                // Assign to the correct day (Hari_efektif)
                                var os_he = dt.hari_efektif.split(',');
                                if ($.inArray(moment(day).format('dddd'), os_he) !== -1) {
                                    temp[moment(day).format('YYYY-MM-DD')] = {
                                        id: dt.id,
                                        title: dt.nama,
                                        kode: dt.kode,
                                        description: '[' + data.kode + '] ' + data.nama.toUpperCase(),
                                        jam_masuk: dt.jam_masuk,
                                        jam_keluar: dt.jam_keluar,
                                        start: new Date(moment(day).format('YYYY/MM/DD')),
                                        transferable: data.transferable,
                                        backgroundColor: '#a48ad4', // <- peterriver
                                        borderColor: '#a48ad4',
                                        allDay: true
                                    };
                                } else {
                                    temp[moment(day).format('YYYY-MM-DD')] = {
                                        id: data.shift,
                                        title: data.nama_shift,
                                        kode: data.kode_shift,
                                        description: '[' + data.kode + '] ' + data.nama.toUpperCase(),
                                        jam_masuk: data.jam_masuk,
                                        jam_keluar: data.jam_keluar,
                                        start: new Date(moment(day).format('YYYY/MM/DD')),
                                        transferable: data.transferable,
                                        backgroundColor: '#a48ad4', // <- amethyst
                                        borderColor: '#a48ad4',
                                        allDay: true
                                    };
                                }
                            })

                        } else {
                            temp[moment(day).format('YYYY-MM-DD')] = {
                                id: data.shift,
                                title: data.nama_shift,
                                kode: data.kode_shift,
                                description: '[' + data.kode + '] ' + data.nama.toUpperCase(),
                                jam_masuk: data.jam_masuk,
                                jam_keluar: data.jam_keluar,
                                start: new Date(moment(day).format('YYYY/MM/DD')),
                                transferable: data.transferable,
                                backgroundColor: '#a48ad4',
                                borderColor: '#a48ad4',
                                allDay: true
                            };
                        }

                    }
                    // if it is FREE DAY
                    else {
                        temp[moment(day).format('YYYY-MM-DD')] = {
                            id: 0,
                            title: "LIBUR",
                            description: "[" + data.kode + "] " + data.nama.toUpperCase(),
                            start: new Date(moment(day).format('YYYY/MM/DD')),
                            backgroundColor: '#7f8c8d',
                            allDay: true
                        };
                    }
                });
            }

            // Get the NON-SPECIAL shift
            else {
                days.forEach(function(d) {
                    var day = d.date;
                    // fill the empty calendar day!
                    if (temp[moment(day).format('YYYY-MM-DD')] == undefined) {
                        // if it is ACTIVE DAY (based on PLOT SCHEMA & HARI EFEKTIF array)
                        if (d.active && $.inArray(moment(day).format('dddd'), hari_efektif) !== -1) {
                            // if there is any OVERRIDING SHIFT
                            if (data.overrode_by.length > 0) {
                                data.overrode_by.forEach(function(dt) { // Assign to the correct day (Hari_efektif)
                                    var os_he = dt.hari_efektif.split(',');
                                    if ($.inArray(moment(day).format('dddd'), os_he) !== -1) {
                                        temp[moment(day).format('YYYY-MM-DD')] = {
                                            id: dt.id,
                                            title: dt.nama,
                                            kode: dt.kode,
                                            description: '[' + data.kode + '] ' + data.nama.toUpperCase(),
                                            jam_masuk: dt.jam_masuk,
                                            jam_keluar: dt.jam_keluar,
                                            start: new Date(moment(day).format('YYYY/MM/DD')),
                                            transferable: data.transferable,
                                            backgroundColor: '#a48ad4',
                                            borderColor: '#a48ad4',
                                            allDay: true
                                        };
                                    } else {
                                        temp[moment(day).format('YYYY-MM-DD')] = {
                                            id: data.shift,
                                            title: data.nama_shift,
                                            kode: data.kode_shift,
                                            description: '[' + data.kode + '] ' + data.nama.toUpperCase(),
                                            jam_masuk: data.jam_masuk,
                                            jam_keluar: data.jam_keluar,
                                            start: new Date(moment(day).format('YYYY/MM/DD')),
                                            transferable: data.transferable,
                                            backgroundColor: '#a48ad4',
                                            borderColor: '#a48ad4',
                                            allDay: true
                                        };
                                    }

                                })
                            } else {
                                temp[moment(day).format('YYYY-MM-DD')] = {
                                    id: data.shift,
                                    title: data.nama_shift,
                                    kode: data.kode_shift,
                                    description: '[' + data.kode + '] ' + data.nama.toUpperCase(),
                                    jam_masuk: data.jam_masuk,
                                    jam_keluar: data.jam_keluar,
                                    start: new Date(moment(day).format('YYYY/MM/DD')),
                                    transferable: data.transferable,
                                    backgroundColor: '#a48ad4',
                                    borderColor: '#a48ad4',
                                    allDay: true
                                };
                            }

                        }
                        // if it is FREE DAY
                        else {
                            temp[moment(day).format('YYYY-MM-DD')] = {
                                id: 0,
                                title: "LIBUR",
                                description: "[" + data.kode + "] " + data.nama.toUpperCase(),
                                start: new Date(moment(day).format('YYYY/MM/DD')),
                                backgroundColor: '#7f8c8d',
                                allDay: true
                            };
                        }
                    }
                });
            }
        })
        // end of ITERATING SHIFTS

        // Get any TRANSFERRED SHIFT
        $.ajax({
            url: ENV.BASE_API + 'getTransferredShift.php?id=' + window.searched_user,
            dataType: 'json',
            async: false,
            success: function(val) {
                if (val.length > 0) {
                    $.each(val, function(key, val) {
                        // if previous shift is HARI LIBUR
                        if (val.old_shift_data == null) {
                            var $desc = "LIBUR";
                        } else {
                            var $desc = val.old_shift_data.nama.toUpperCase() + ' (' + val.old_shift_data.kode + ')';
                        }

                        temp[val.transfer_date] = {
                            id: val.id,
                            title: val.new_shift_data.nama,
                            kode: val.new_shift_data.kode,
                            description: $desc,
                            jam_masuk: val.new_shift_data.jam_masuk,
                            jam_keluar: val.new_shift_data.jam_keluar,
                            start: new Date(moment(val.transfer_date, 'YYYY-MM-DD').format('YYYY/MM/DD')),
                            transferable: 9, // <- transferred shift flag!
                            backgroundColor: '#a48ad4',
                            borderColor: '#a48ad4',
                            allDay: true
                        };
                    })
                }
            }
        });

        // Attaching any ABSENCE DAY if there any
        $.each(absence_data, function(key, val) {
            // get the day span
            var start_date = moment(val.leave_date).subtract(1, "days").format('YYYY-MM-DD');
            var end_date = moment(start_date, 'YYYY-MM-DD').add(parseInt(val.leave_period) + 1, 'days');
            var date_range = getDays(start_date, end_date);
            // iterate each ABSENCE DAY
            $.each(date_range, function(key, date) {
                // if it's FREE DAY, go to the day after END_DATE
                if (temp[moment(date).format('YYYY-MM-DD')].title == 'LIBUR') {
                    var replacement_date = '';
                    if (temp[moment(end_date).add(1, 'days').format('YYYY-MM-DD')].title == 'LIBUR') { // if END_DATE +1 id free day
                        if (temp[moment(end_date).add(2, 'days').format('YYYY-MM-DD')].title == 'LIBUR') { // if END_DATE +2 id free day
                            replacement_date = moment(end_date).add(2, 'days').format('YYYY-MM-DD'); // -1
                        } else {
                            replacement_date = moment(end_date).add(1, 'days').format('YYYY-MM-DD'); // -1
                        }
                    } else {
                        replacement_date = moment(end_date).format('YYYY-MM-DD'); // -1
                    }

                    temp[replacement_date] = {
                        id: val.id,
                        absence: true,
                        title: val.nama_absence,
                        description: (val.jenis_absence == '0') ? 'CUTI' : (val.jenis_absence == '1') ? 'IJIN' : 'LAINNYA',
                        start: new Date(replacement_date),
                        backgroundColor: '#d26a5c',
                        borderColor: '#d26a5c',
                        allDay: true
                    };
                } else {
                    temp[moment(date).format('YYYY-MM-DD')] = {
                        id: val.id,
                        absence: true,
                        title: val.nama_absence,
                        description: (val.jenis_absence == '0') ? 'CUTI' : (val.jenis_absence == '1') ? 'IJIN' : 'LAINNYA',
                        start: new Date(moment(date).format('YYYY/MM/DD')),
                        backgroundColor: '#d26a5c',
                        borderColor: '#d26a5c',
                        allDay: true
                    };
                }
            });
        })

        // compiling FINAL RESULTS !!!
        for (var key in temp) {
            calendar_data.push(temp[key]);
        }
    }
    // Show error
    else {
        $('#error-block').removeClass('hide-me');
        // Remove cached events
        $('#absence-calendar').fullCalendar('removeEvents');
    }

    $('#absence-calendar').fullCalendar('removeEvents');
    $('#absence-calendar').fullCalendar('addEventSource', calendar_data);
    $('#absence-calendar').fullCalendar('gotoDate', new Date());

    // reset selector (employee search) to initial state
    $('#employee-search').val(null).trigger('change.select2');

    App.blocks('#employee-details', 'state_normal');
};
