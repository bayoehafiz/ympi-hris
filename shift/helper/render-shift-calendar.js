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

// Fn to render employee's calendar
var renderShiftCalendar = function(res) {
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
                                        backgroundColor: '#3498db', // <- peterriver
                                        borderColor: '#3498db',
                                        textColor: '#fff',
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
                                        backgroundColor: '#1abc9c', // <- amethyst
                                        borderColor: '#1abc9c',
                                        textColor: '#fff',
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
                                backgroundColor: '#1abc9c',
                                borderColor: '#1abc9c',
                                textColor: '#fff',
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
                            backgroundColor: '#95a5a6',
                            borderColor: '#95a5a6',
                            textColor: '#fff',
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
                                            backgroundColor: '#3498db',
                                            borderColor: '#3498db',
                                            textColor: '#fff',
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
                                            textColor: '#fff',
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
                                    textColor: '#fff',
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
                                backgroundColor: '#95a5a6',
                                borderColor: '#95a5a6',
                                textColor: '#fff',
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
                            backgroundColor: '#d26a5c',
                            borderColor: '#d26a5c',
                            textColor: '#fff',
                            allDay: true
                        };
                    })
                }

                // compiling results
                for (var key in temp) {
                    calendar_data.push(temp[key]);
                }
            }
        });
    }
    // Show error
    else {
        $('#error-block').removeClass('hide-me');
        // Remove cached events
        $('#shift-calendar').fullCalendar('removeEvents');
    }

    $('#shift-calendar').fullCalendar('removeEvents');
    $('#shift-calendar').fullCalendar('addEventSource', calendar_data);
    $('#shift-calendar').fullCalendar('gotoDate', new Date());

    // reset selector (employee search) to initial state
    $('#employee-search').val(null).trigger('change.select2');

    App.blocks('#employee-details', 'state_normal');
};
