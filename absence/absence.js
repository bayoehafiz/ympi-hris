var BasePagesAbsence = function() {
    window.modal_scope = '';
    window.active_data = '';
    window.opened_data = '';
    window.searched_user = '';
    window.selected_date = '';
    window.absence_data = {};

    var initStat = function(type) {
        // clear the container first
        var container = $('#stat-absence');
        container.empty();
        // Get division datas
        $.ajax({
            type: "POST",
            url: ENV.BASE_API + 'getAbsenceStat.php',
            dataType: 'json',
            data: {
                type: type
            },
            success: function(res) {
                var html = '';
                if (res.success) {
                    var data = res.data;
                    var data_length = data.length;
                    if (data_length > 0) {
                        html += '';
                        data.forEach(function(d) {
                            if (d.kode == undefined) d.kode = d.nama;
                            html += '<div class="col-md-2">' +
                                '<div class="font-w700 text-gray-darker animated fadIn">' + d.nama + '</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div></div>';
                        });
                    }
                }

                html += '<div class="col-md-2 pull-right">' +
                    '<span class="h2 font-w300 text-primary animated flipInX">' +
                    '<button type="button" class="btn btn-primary btn-circle btn-lg push-5" id="btn-add" data-type="' + type + '"><i class="fa fa-plus"></i></button>' +
                    '</span>' +
                    '<div class="text-muted animated fadeIn"><small>Tambah Data</small></div>' +
                    '</div>';

                // append the result into container
                container.html(html);
            }
        })
    };

    var initTableAbsence = function() {
        // init table BS style
        bsDataTables();

        // Table initiation
        var table = $('#table-absence').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: ENV.BASE_API + 'getAbsence.php',
                data: {
                    table: 'absence'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                {
                    className: "text-center",
                    data: "kode",
                    render: function(data, type, row) {
                        if (row.active == '1') return '<span class="">' + data + '</span>';
                        else return '<span class="text-gray">' + data + '</span>';
                    }
                },
                {
                    className: "font-w600",
                    data: "nama",
                    render: function(data, type, row) {
                        if (row.active == '1') return '<span class="">' + data + '</span>';
                        else return '<span class="text-gray">' + data + '</span>';
                    }
                },
                {
                    className: "text-center",
                    data: "jenis",
                    render: function(data, type, row) {
                        if (data == 0) {
                            if (row.active == '1') return '<span class="">CUTI</span>';
                            else return '<span class="text-gray">CUTI</span>';
                        } else if (data == 1) {
                            if (row.active == '1') return '<span class="">IJIN</span>';
                            else return '<span class="text-gray">IJIN</span>';
                        } else {
                            if (row.active == '1') return '<span class="">LAINNYA</span>';
                            else return '<span class="text-gray">LAINNYA</span>';
                        }
                    }
                },
                {
                    className: "text-center",
                    data: "potongan_cuti",
                    render: function(data, type, row) {
                        if (data == 1) {
                            if (row.active == '1') return '<i class="si fa-lg si-check text-success font-w600"></i>';
                            else return '<i class="si fa-lg si-check text-gray font-w600"></i>';
                        } else {
                            if (row.active == '1') return '<i class="si fa-lg si-close text-danger font-w600"></i>';
                            else return '<i class="si fa-lg si-close text-gray font-w600"></i>';
                        }
                    }
                },
                {
                    data: "keterangan",
                    render: function(data, type, row) {
                        data = (data == null) ? '-' : data;
                        if (row.active == '1') return '<span class="">' + data + '</span>';
                        else return '<span class="text-gray">' + data + '</span>';
                    }
                },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success text-uppercase">Aktif</span>';
                        else return '<span class="label label-danger text-uppercase">Non Aktif</span>';
                    }
                },
                {
                    data: null,
                    className: "text-center",
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-refresh"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ],
            language: {
                emptyTable: "Tidak ada data tersedia",
                processing: "Mengambil Data... ",
                zeroRecords: "Tidak ada data ditemukan",
                info: "Menampilkan _START_ - _END_ dari total _TOTAL_ data",
                infoEmpty: "Menampilkan 0 dari total 0 data",
                search: "Cari: ",
            },
        });
    };

    var openAbsenceModal = function(uid, event) {
        window.modal_scope = 'add';
        window.selected_date = moment(event.start).format('YYYY-MM-DD');

        // Check if the date isn't in the PAST
        if (moment(event.start).isBefore(moment())) {
            swal('', "Tanggal yang dapat dipilih adalah minimal esok hari", 'error');
        } else if (event.title == 'LIBUR') {
            swal('', "Tidak dapat memilih hari libur", 'error');
        } else if (event.absence !== undefined) { // check if shift is already ON LEAVE
            swal({
                    title: "",
                    html: "Cuti/absen telah diaktifkan pada tanggal ini.<br>Klik <strong>Batalkan</strong> untuk membatalkan",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "Batalkan",
                    cancelButtonText: "Tutup",
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false
                })
                .then(function(res) {
                    if (res) {
                        $.ajax({
                                type: "POST",
                                url: ENV.BASE_API + "deleteAbsenceData.php",
                                dataType: 'json',
                                data: {
                                    id: event.id,
                                    table: 'employee_absence'
                                }
                            }).done(function(response) {
                                if (!response.success) {
                                    swal('Error', response.message, 'error');
                                } else {
                                    swal.close();
                                    $.notify({
                                        "icon": "fa fa-check-circle",
                                        "message": response.message
                                    }, {
                                        "type": "success"
                                    })

                                    // reload the calendar
                                    renderEmployeeDetails(window.searched_user);
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    }
                })
                .catch(swal.noop);
        } else {
            $('#btn-add').trigger('click');
        }
    };

    var initCalendar = function() {
        // Init calendar
        $('#absence-calendar').fullCalendar({
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            locale: 'id',
            buttonText: {
                today: "Bulan Ini"
            },
            defaultView: "month",
            validRange: function(currentDate) {
                return {
                    start: moment().subtract(3, 'months').format('YYYY-MM-DD'),
                    end: moment().add(3, 'months').format('YYYY-MM-DD')
                }
            },
            eventRender: function(event, element) {
                var html = '<div class="push-5-l push-5-t push-5-r push-5">';
                if (event.absence !== undefined) {
                    html += '<div class="h5 text-white push-5">' + event.title + '</div>' +
                        '<div class="text-white"><i class="si si-ban text-white push-5-r"></i>' + event.description + '</div>';
                } else if (event.title == "LIBUR") {
                    html += '<div class="h5 text-white push-5">' + event.title + '</div>' +
                        '<i class="si si-ban text-white"></i>';
                } else {
                    html += '<div class="h5 text-white push-5">' + event.title.toUpperCase() + ' (' + event.kode + ')</div>' +
                        '<div class="text-white"><i class="si si-clock push-5-r"></i>' + event.jam_masuk + ' - ' + event.jam_keluar + '</div>';
                }
                html += '</div>';
                element.find('.fc-title').html(html);
            },
            eventClick: function(event) {
                openAbsenceModal(window.searched_user, event);
            }
        });
    };

    var initTabEmployeeAbsence = function() {
        App.blocks('#calendar-block', 'state_loading');

        // Fn to populate modal's ajax selector (Select2)
        var initSelector = function() {
            var container = $('#employee-search');
            container.select2({
                width: '100%',
                placeholder: "Ketik Nama atau NIK..",
                ajax: {
                    url: ENV.BASE_API + 'getSelectorData.php?table=employee',
                    dataType: 'json',
                    data: function(params) {
                        var query = {
                            q: params.term,
                            page: params.page || 1
                        }
                        return query;
                    },
                    processResults: function(data, params) {
                        var page = params.page || 1;
                        return {
                            results: data,
                            pagination: {
                                // THE `10` SHOULD BE SAME AS "$resultCount FROM API, it is the number of records to fetch from table"
                                more: (data[0] !== undefined) ? (page * 10) <= data[0].total_count : 0
                            }
                        };
                        // return {
                        //     results: data
                        // };
                    }
                },
                escapeMarkup: function(markup) { return markup; },
                templateResult: formatKode,
                templateSelection: formatKodeSelection
            });

            function formatKode(data) {
                var markup = data.text + ' - ' + data.nik;
                return markup;
            }

            function formatKodeSelection(data) {
                return data.text || data.nik;
            }

            return true;
        };

        // Destroy existed Select2 instance
        if ($('#employee-search').hasClass("select2-hidden-accessible")) {
            $('#employee-search').val(null).trigger('change');
        }

        // reset employee details
        if (initSelector()) {
            // empty employee details block
            $('#employee-details-content').empty()
            if (!$('#employee-details').hasClass('hide-me')) $('#employee-details').addClass('hide-me');
        }

        // re-render calendar
        $('#absence-calendar').fullCalendar('removeEvents');
        setTimeout(function() {
            $('#absence-calendar').fullCalendar('render');
            App.blocks('#calendar-block', 'state_normal');
        }, 1000);

        // Employee Search on change
        $(document).on('change', '#employee-search', function() {
            App.blocks('#employee-details', 'state_loading');
            if (this.value != '') {
                window.searched_user = this.value; // save user ID
                renderEmployeeDetails(this.value);
            }
        })

        // read window.searched_user
        if (window.searched_user != '') {
            renderEmployeeDetails(window.searched_user);
        }

        // Sticky block
        $('#sticky-block').sticky({ topSpacing: 80, bottomSpacing: 100 });
    };

    var initAbsencePage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            // Set active class for related menu
            $('#menu-absence').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            // Set the page title
            $('#header-title').html('<i class="si si-user-unfollow push-10-r"></i>Data Absensi');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            // console.log("Footer loaded!");
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu, .logo', function(e) {
            e.preventDefault;
            if ($(this).attr('route') != undefined) window.location.replace(ENV.BASE_URL + $(this).attr('route'));
            return false;
        });

        // Logout button
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });


        // when tabs clicked
        $(document).on('click', '.tab-btn', function() {
            var t = $(this).attr('data');
            window.active_data = t;
            switch (t) {
                case 'employee_absence':
                    if (!$('#btn-add').hasClass('hide-me')) $('#btn-add').addClass('hide-me');
                    initTabEmployeeAbsence();
                    break;
                default:
                    if ($('#btn-add').hasClass('hide-me')) $('#btn-add').removeClass('hide-me');
                    initTableAbsence();
                    break;
            };
        });

        // Fn to populate NEW SHIFT selector
        var populateSelector = function(id, table) {
            var container = $('#input-' + id);
            if (container.hasClass("select2-hidden-accessible")) {
                container.empty();
            }
            container.select2({
                ajax: {
                    url: ENV.BASE_API + 'getAbsenceSelectorData.php',
                    dataType: 'json',
                    delay: 250,
                    cache: false,
                    data: function(params) {
                        var query = {
                            q: params.term || "",
                            page: params.page || 1
                        }
                        return query;
                    },
                    processResults: function(data, params) {
                        var page = params.page || 1;
                        return {
                            results: data,
                            pagination: {
                                more: (page * 10) <= data[0].total_count // <- has to be 10 (matched with API code)
                            }
                        };
                    },
                },
                escapeMarkup: function(markup) { return markup; },
                templateResult: formatKode,
                templateSelection: formatKodeSelection
            });

            function formatKode(data) {
                if (data.nama === undefined) {
                    return data.jenis;
                }
                return data.nama;
            }

            function formatKodeSelection(data) {
                if (data.nama === undefined) {
                    return (data.jenis || data.text);
                }
                return (data.nama || data.text);
            }
            return true;
        };

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            // set the action type
            window.modal_scope = 'add';

            var html = '';
            switch (window.active_data) {
                case "absence":
                    var title = 'Tambah Data Jenis Absensi';
                    html += renderAddElement('text', 'kode', 'Kode', 2);
                    html += renderAddElement('text', 'nama', 'Nama Absensi', 6);
                    html += renderAddElement('select', 'jenis', 'Jenis Absensi', 4);
                    html += renderAddElement('textarea', 'keterangan', 'Keterangan', 12);
                    html += renderAddElement('check', 'potongan_cuti', 'Potong Cuti?', 6);
                    break;
                default:
                    var title = 'Tambah Absensi Karyawan: ' + moment(window.selected_date).format('DD MMM YYYY');
                    html += renderAddElement('select', 'absence', 'Pilih Jenis Cuti/Absensi', 7);
                    html += renderAddElement('select', 'leave_period', 'Jangka Waktu', 5);
                    html += renderAddElement('textarea', 'keterangan', 'Keterangan', 12);
                    html += renderAddElement('hidden', 'employee', '', null);
                    html += renderAddElement('hidden', 'leave_date', '', null);
                    break;
            }

            // reset the modal first!
            $('#hidden-select').addClass('hide-me');
            $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
            $('#modal-title, #generated-container').empty();
            $('#modal-title').append(title);
            $('#generated-container').append(html);

            if (window.active_data == 'absence') {
                $('#input-jenis').select2({
                    minimumResultsForSearch: -1,
                    data: [{ id: 0, text: 'Cuti' }, { id: 1, text: 'Ijin' }, { id: 2, text: 'Lainnya' }]
                }).val(null).trigger('change');
            } else {
                // initiate Select2 selector
                populateSelector('absence', 'absence');
                if ($('#input-leave_period').hasClass("select2-hidden-accessible")) {
                    $('#input-leave_period').select2('destroy');
                }
                $('#input-leave_period').select2();
                // assign value to hidden inputs
                $('#input-employee').val(window.searched_user);
                $('#input-leave_date').val(window.selected_date);
            }

            $('#modal').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });

            // reinitiate validation
            initValidation(window.active_data);
        });

        // Funcion to render LEAVE_PERIOD selector datas
        var renderLeavePeriod = function(limitation) {
            var opts_data = [{ id: 1, text: '1 Hari' }, { id: 2, text: '2 Hari' }, { id: 3, text: '3 Hari' }, { id: 4, text: '4 Hari' }, { id: 5, text: '5 Hari' }, { id: 6, text: '6 Hari' }, { id: 7, text: '1 Minggu' }, { id: 14, text: '2 Minggu' }, { id: 21, text: '3 Minggu' }, { id: 30, text: '1 Bulan' }];
            if (limitation == null) {
                return opts_data;
            } else {
                var res = [];
                opts_data.forEach(function(val) {
                    if (val.id < limitation) res.push(val);
                });
                return res;
            }
        }

        // Fn to handle ABSENCE selector
        $(document).on('change', '#input-absence', function() {
            var $absence = this.value;
            var absence_data = window.absence_data;
            $.getJSON(ENV.BASE_API + 'getAbsenceDetails.php?id=' + $absence, function(d) {
                // check if POTONGAN CUTI is applied
                if (d.potongan_cuti == '0') {
                    var $opts = renderLeavePeriod(null);
                } else {
                    var $opts = renderLeavePeriod(parseInt(absence_data.absence_left));
                }
                $('#input-leave_period').empty().trigger('change');
                $('#input-leave_period').select2({
                    minimumResultsForSearch: -1,
                    data: $opts
                });
            })
        })

        // When ACTION buttons clicked
        $(document).on('click', '.js-dataTable-full tbody button', function() {
            var act = $(this).attr('act');
            var active_table_id = $(this).parents("table").attr('id');
            var table = $('#' + active_table_id).DataTable();
            var data = table.row($(this).parents('tr')).data();

            // EDIT the data
            if (act == 'edit') {
                var html = '';
                window.modal_scope = 'edit';
                window.opened_data = data.id;

                switch (window.active_data) {
                    case "absence":
                        var title = 'Ubah Data Jenis Absensi';
                        html += renderEditElement('text', 'kode', 'Kode', data.kode, 2);
                        html += renderEditElement('text', 'nama', 'Nama Absensi', data.nama, 6);
                        html += renderEditElement('select', 'jenis', 'Jenis Absensi', null, 4);
                        html += renderEditElement('textarea', 'keterangan', 'Keterangan', data.keterangan, 12);
                        html += renderEditElement('check', 'potongan_cuti', 'Potong Cuti?', data.potongan_cuti, 6);
                        break;
                    default:
                        var title = 'Ubah Absensi Karyawan';
                        break;
                }

                // hide unrelated buttons
                $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
                $('#modal-title, #generated-container').empty();
                $('#modal-title').append(title);
                $('#generated-container').append(html);

                if (window.active_data == 'absence') {
                    $('#input-jenis').select2({
                        minimumResultsForSearch: -1,
                        data: [{ id: 0, text: 'Cuti' }, { id: 1, text: 'Ijin' }, { id: 2, text: 'Lainnya' }]
                    }).val(data.jenis).trigger('change');
                }

                $('#modal').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });

                // reinitiate validation
                initValidation(window.active_data);
            }

            // SWITCH data activation status
            else if (act == 'switch') {
                if (data.active == 1) {
                    var txt = "Ubah status data <strong>" + data.jenis + "</strong> menjadi <strong>non aktif</strong>?";
                } else {
                    var txt = "Ubah status data <strong>" + data.jenis + "</strong> menjadi <strong>aktif</strong>?";
                }

                swal({
                        title: "Konfirmasi",
                        html: txt,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya",
                        cancelButtonText: "Batal",
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false
                    })
                    .then(function(res) {
                        if (res) {
                            $.ajax({
                                    type: "POST",
                                    url: ENV.BASE_API + "updateAbsenceDataStatus.php",
                                    dataType: 'json',
                                    data: {
                                        id: data.id,
                                        table: window.active_data,
                                        status: data.active
                                    }
                                }).done(function(response) {
                                    if (!response.success) {
                                        swal('Error', response.message, 'error');
                                    } else {
                                        swal.close();
                                        $.notify({
                                            "icon": "fa fa-check-circle",
                                            "message": response.message
                                        }, {
                                            "type": "success"
                                        })

                                        // reload the stat
                                        initStat(window.active_data);

                                        // reload the table
                                        var table = $('#table-' + window.active_data).DataTable();
                                        table.ajax.reload();
                                    }
                                })
                                .fail(function() {
                                    swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                                });
                        }
                    })
                    .catch(swal.noop);
            }

            // REMOVE the data
            else {
                swal({
                        title: "Konfirmasi",
                        html: "Hapus data <strong>" + data.jenis + "</strong> dari database?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Hapus!",
                        cancelButtonText: "Batal",
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false
                    })
                    .then(function(res) {
                        if (res) {
                            $.ajax({
                                    type: "POST",
                                    url: ENV.BASE_API + "deleteAbsenceData.php",
                                    dataType: 'json',
                                    data: {
                                        id: data.id,
                                        table: window.active_data
                                    }
                                }).done(function(response) {
                                    if (response.status == 'err') {
                                        swal('Error', response.message, 'error');
                                    } else {
                                        swal.close();
                                        $.notify({
                                            "icon": "fa fa-check-circle",
                                            "message": response.message
                                        }, {
                                            "type": "success"
                                        })

                                        // reload the table
                                        var table = $('#table-' + window.active_data).DataTable();
                                        table.ajax.reload();
                                    }
                                })
                                .fail(function() {
                                    swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                                });
                        }
                    })
                    .catch(swal.noop);
            }
        });

        // when modal on close
        $('#modal').on('hidden.bs.modal', function() {
            console.log('Destroying validator and resetting elements...');
            window.$validator.destroy();

            // reset all elements
            $('[id^=input-]').html('').empty();
        })

        // set default hidden value for ACTIVE DATA
        window.active_data = 'absence';

        // Lets init our first table :: Absence Table
        initTableAbsence();

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';
    };

    return {
        init: function() {
            set_base('absence');
            initStat('absence');
            initCalendar();
            initAbsencePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesAbsence.init(); });
