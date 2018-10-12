var BasePagesPosition = function() {
    // DataTables Bootstrap integration
    var bsDataTables = function() {
        var $DataTable = jQuery.fn.dataTable;

        // Set the defaults for DataTables init
        jQuery.extend(true, $DataTable.defaults, {
            dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-6'i><'col-sm-6'p>>",
            renderer: 'bootstrap',
            oLanguage: {
                sLengthMenu: "_MENU_",
                sInfo: "Showing <strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
                oPaginate: {
                    sPrevious: '<i class="fa fa-angle-left"></i>',
                    sNext: '<i class="fa fa-angle-right"></i>'
                }
            }
        });

        // Default class modification
        jQuery.extend($DataTable.ext.classes, {
            sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
            sFilterInput: "form-control",
            sLengthSelect: "form-control"
        });

        // Bootstrap paging button renderer
        $DataTable.ext.renderer.pageButton.bootstrap = function(settings, host, idx, buttons, page, pages) {
            var api = new $DataTable.Api(settings);
            var classes = settings.oClasses;
            var lang = settings.oLanguage.oPaginate;
            var btnDisplay, btnClass;

            var attach = function(container, buttons) {
                var i, ien, node, button;
                var clickHandler = function(e) {
                    e.preventDefault();
                    if (!jQuery(e.currentTarget).hasClass('disabled')) {
                        api.page(e.data.action).draw(false);
                    }
                };

                for (i = 0, ien = buttons.length; i < ien; i++) {
                    button = buttons[i];

                    if (jQuery.isArray(button)) {
                        attach(container, button);
                    } else {
                        btnDisplay = '';
                        btnClass = '';

                        switch (button) {
                            case 'ellipsis':
                                btnDisplay = '&hellip;';
                                btnClass = 'disabled';
                                break;

                            case 'first':
                                btnDisplay = lang.sFirst;
                                btnClass = button + (page > 0 ? '' : ' disabled');
                                break;

                            case 'previous':
                                btnDisplay = lang.sPrevious;
                                btnClass = button + (page > 0 ? '' : ' disabled');
                                break;

                            case 'next':
                                btnDisplay = lang.sNext;
                                btnClass = button + (page < pages - 1 ? '' : ' disabled');
                                break;

                            case 'last':
                                btnDisplay = lang.sLast;
                                btnClass = button + (page < pages - 1 ? '' : ' disabled');
                                break;

                            default:
                                btnDisplay = button + 1;
                                btnClass = page === button ?
                                    'active' : '';
                                break;
                        }

                        if (btnDisplay) {
                            node = jQuery('<li>', {
                                    'class': classes.sPageButton + ' ' + btnClass,
                                    'aria-controls': settings.sTableId,
                                    'tabindex': settings.iTabIndex,
                                    'id': idx === 0 && typeof button === 'string' ?
                                        settings.sTableId + '_' + button : null
                                })
                                .append(jQuery('<a>', {
                                        'href': '#'
                                    })
                                    .html(btnDisplay)
                                )
                                .appendTo(container);

                            settings.oApi._fnBindAction(
                                node, { action: button }, clickHandler
                            );
                        }
                    }
                }
            };

            attach(
                jQuery(host).empty().html('<ul class="pagination"/>').children('ul'),
                buttons
            );
        };

        // TableTools Bootstrap compatibility - Required TableTools 2.1+
        if ($DataTable.TableTools) {
            // Set the classes that TableTools uses to something suitable for Bootstrap
            jQuery.extend(true, $DataTable.TableTools.classes, {
                "container": "DTTT btn-group",
                "buttons": {
                    "normal": "btn btn-default",
                    "disabled": "disabled"
                },
                "collection": {
                    "container": "DTTT_dropdown dropdown-menu",
                    "buttons": {
                        "normal": "",
                        "disabled": "disabled"
                    }
                },
                "print": {
                    "info": "DTTT_print_info"
                },
                "select": {
                    "row": "active"
                }
            });

            // Have the collection use a bootstrap compatible drop down
            jQuery.extend(true, $DataTable.TableTools.DEFAULTS.oTags, {
                "collection": {
                    "container": "ul",
                    "button": "li",
                    "liner": "a"
                }
            });
        }
    };

    var initShiftPage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");

            // load the logo
            $('.logo').html('<img src="../assets/img/yamaha-logo-white.png" class="img-responsive center-block">');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
            // Set the page title
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-book-open">&nbsp;&nbsp;</i>DATA SHIFT KERJA</h3>');
            // Set active class for related menu
            $('#menu-shift-kerja').addClass('active');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            console.log("Footer loaded!");
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu, .logo', function(e) {
            e.preventDefault;
            if ($(this).attr('route') != undefined) window.location.replace(BASE_URL + $(this).attr('route'));
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
            $('#hidden-active-type').val(t);
            switch (t) {
                // case 'group_shift':
                //     $('#btn-add').attr('data', 'Group Shift');
                //     initStat('group_shift');
                //     initTableGroupShift();
                //     break;
                case 'penugasan_shift':
                    $('#btn-add').attr('data', 'Penugasan Shift');
                    initContentPenugasanShift();
                    break;
                default:
                    $('#btn-add').attr('data', 'Shift');
                    initTableShift();
                    break;
            };
        })

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            // reset the modal first!
            $('#modal-title, #generated-container').html('');
            $('#hidden-select').addClass('hide-me');

            var html = '';
            data_type = $(this).attr('data-type');
            $('#hidden-type').val(data_type);

            switch (data_type) {
                case "group_shift":
                    html += renderAddElement('text', 'nama', 'Nama Group Shift');
                    html += renderAddElement('text', 'kode', 'Kode');
                    break;
                case "penugasan_shift":
                    // html += renderAddElement('text', 'nama', 'Nama Penugasan');
                    // html += renderAddElement('text', 'kode', 'Kode');
                    break;
                default:
                    html += renderAddElement('text', 'nama', 'Nama Shift', null, 8);
                    html += renderAddElement('text', 'kode', 'Kode', null, 4);
                    html += renderAddElement('multi-select', 'hari_efektif', 'Hari Efektif', [{
                        label: 'Senin',
                        value: 'Senin'
                    }, {
                        label: 'Selasa',
                        value: 'Selasa'
                    }, {
                        label: 'Rabu',
                        value: 'Rabu'
                    }, {
                        label: 'Kamis',
                        value: 'Kamis'
                    }, {
                        label: 'Jumat',
                        value: 'Jumat'
                    }, {
                        label: 'Sabtu',
                        value: 'Sabtu'
                    }, {
                        label: 'Minggu',
                        value: 'Minggu'
                    }], 6);
                    html += renderAddElement('time-picker', 'jam_masuk', 'Jam Masuk', null, 3);
                    html += renderAddElement('time-picker', 'jam_keluar', 'Jam Keluar', null, 3);

                    html += renderAddElement('time-picker', 'awal_scan_masuk', 'Scan Masuk', null, 3);
                    html += renderAddElement('time-picker', 'akhir_scan_masuk', '', null, 3);

                    html += renderAddElement('time-picker', 'awal_scan_keluar', 'Scan Keluar', null, 3);
                    html += renderAddElement('time-picker', 'akhir_scan_keluar', '', null, 3);
                    break;
            }

            $('#modal-title').html('Tambah Data ' + data_type);
            $('#generated-container').html(html);

            // hide unrelated buttons
            $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
            $('#modal').modal('show');

            // reinitiate datetime picker
            $('.js-datetimepicker').datetimepicker({
                format: 'HH:mm'
            });
            App.initHelpers(['datetimepicker']);

            // reinitiate validation
            initValidation();

            // set the action type
            $('#act-type').val('add');
        });

        // When SAVE button is clicked
        $(document).on('submit', '#form-modal', function(e) {
            e.preventDefault();

            var data = [];
            if ($('#input-hari_efektif').length) {
                var selected = $('#input-hari_efektif').val();
                if (selected != null) {
                    array = selected + "";
                    data.push({
                        "key": "hari_efektif",
                        "value": array
                    });
                }
            }

            $('[id^="input-"]:not(#input-hari_efektif)').filter(function() {
                var elem = this;
                // cleaning empty data [TEMP!]
                if (elem['value'] != '') {
                    return data.push({
                        "key": elem['id'].replace('input-', ''),
                        "value": elem['value']
                    });
                }
            });

            // Read current data-type and act-type
            var dType = $('#hidden-active-type').val();
            var actType = $('#act-type').val();
            if (actType == 'add') {
                var api_url = BASE_URL + '/php/api/addShiftData.php';
                var data = {
                    data: data,
                    table: dType
                };
                var msg = "Data berhasil ditambahkan";
            } else {
                var api_url = BASE_URL + '/php/api/updateShiftData.php';
                var data = {
                    data: data,
                    table: dType,
                    id: $('#data-id').val()
                };
                var msg = "Data berhasil di-update";
            }

            $.ajax({
                type: "POST",
                url: api_url,
                dataType: 'json',
                data: data,
                success: function(res) {
                    if (res.status == 'err') {
                        swal("Error!", res.message, "error");
                    } else {
                        $('#modal').modal('hide');
                        $.notify({
                            "icon": "fa fa-check-circle",
                            "message": msg
                        }, {
                            "type": "success"
                        })
                        // reload the table
                        var table = $('#table-' + dType.replace('_', '-')).DataTable();
                        table.ajax.reload();
                    }

                }
            })
        });

        // When ACTION buttons clicked
        $(document).on('click', '.js-dataTable-full tbody button', function() {
            var act = $(this).attr('act');
            var active_table_id = $(this).parents("table").attr('id');
            var table = $('#' + active_table_id).DataTable();
            var data = table.row($(this).parents('tr')).data();

            // Lets decide which button is clicked:
            if (act == 'edit') { // edit the data
                // reset the modal first!
                $('#modal-title, #generated-container').html('');

                var html = '';
                data_type = $(this).attr('data-type');
                $('#hidden-type').val(data_type);

                switch (data_type) {
                    case "group_shift":
                        html += renderEditElement('text', 'nama', 'Nama Group Shift');
                        html += renderEditElement('text', 'kode', 'Kode');
                        break;
                    case "penugasan_shift":
                        // html += renderAddElement('text', 'nama', 'Nama Penugasan');
                        // html += renderAddElement('text', 'kode', 'Kode');
                        break;
                    default:
                        html += renderEditElement('text', 'nama', 'Nama Shift', data.nama, null, 8);
                        html += renderEditElement('text', 'kode', 'Kode', data.kode, null, 4);
                        html += renderEditElement('multi-select', 'hari_efektif', 'Hari Efektif', data.hari_efektif, [{
                            label: 'Senin',
                            value: 'Senin'
                        }, {
                            label: 'Selasa',
                            value: 'Selasa'
                        }, {
                            label: 'Rabu',
                            value: 'Rabu'
                        }, {
                            label: 'Kamis',
                            value: 'Kamis'
                        }, {
                            label: 'Jumat',
                            value: 'Jumat'
                        }, {
                            label: 'Sabtu',
                            value: 'Sabtu'
                        }, {
                            label: 'Minggu',
                            value: 'Minggu'
                        }], 6);

                        html += renderEditElement('time-picker', 'jam_masuk', 'Jam Masuk', data.jam_masuk, null, 3);
                        html += renderEditElement('time-picker', 'jam_keluar', 'Jam Keluar', data.jam_keluar, null, 3);

                        html += renderEditElement('time-picker', 'awal_scan_masuk', 'Scan Masuk', data.awal_scan_masuk, null, 3);
                        html += renderEditElement('time-picker', 'akhir_scan_masuk', '', data.akhir_scan_masuk, null, 3);

                        html += renderEditElement('time-picker', 'awal_scan_keluar', 'Scan Keluar', data.awal_scan_keluar, null, 3);
                        html += renderEditElement('time-picker', 'akhir_scan_keluar', '', data.akhir_scan_keluar, null, 3);
                        break;
                }

                $('#modal-title').html('Tambah Data ' + data_type);
                $('#generated-container').html(html);

                // hide unrelated buttons
                $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
                $('#modal').modal('show');

                // then assign the values into the multiple select
                if (data.hari_efektif) {
                    var value = data.hari_efektif;
                    $.each(value.split(','), function(i, e) {
                        $("#input-hari_efektif option[value='" + e + "']").prop("selected", true);
                    })
                }

                // reinitiate datetime picker
                $('.js-datetimepicker').datetimepicker({
                    format: 'HH:mm'
                });
                App.initHelpers(['datetimepicker']);

                // reinitiate validation
                initValidation();

                // set the action-type and data-id
                $('#act-type').val('edit');
                $('#data-id').val(data.id);
            } else { // remove the data
                swal({
                    title: "Konfirmasi",
                    text: "Hapus " + data.nama.toUpperCase() + " dari database?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Hapus!",
                    cancelButtonText: "Batal",
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                        var dType = $('#hidden-active-type').val();
                        $.ajax({
                                type: "POST",
                                url: BASE_URL + "/php/api/deleteShiftData.php",
                                dataType: 'json',
                                data: {
                                    id: data.id,
                                    table: dType
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
                                    var table = $('#table-' + dType).DataTable();
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    },
                    allowOutsideClick: false
                })
            }
        });

        // set default hidden value for ACTIVE type
        $('#hidden-active-type').val('shift');

        // Lets init our first table :: Shift Table
        initTableShift();
    };

    var initStat = function(type) {
        // clear the container first
        var container = $('#stat-shift');
        container.empty();
        // Get division datas
        $.ajax({
            type: "POST",
            url: BASE_URL + '/php/api/getShiftStat.php',
            dataType: 'json',
            data: {
                type: type
            },
            success: function(res) {
                var html = '';
                if (res.status == 'ok') {
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

    var initTableShift = function() {
        // Table initiation
        var table = $('#table-shift').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getShift.php',
                type: "POST",
                data: {
                    table: 'shift'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data Shift kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        var data = json.data;
                        var resultData = [];
                        data.forEach(function(x) {
                            // Manipulate result data
                            var raw_string = x.hari_efektif;
                            var splitted_string = raw_string.split(',');
                            x.hari = '';
                            splitted_string.forEach(function(s) {
                                x.hari += '<span class="label label-primary push-5-r">' + s + '</span>';
                            });

                            x.jam = x.jam_masuk + ' - ' + x.jam_keluar;
                            x.scan_masuk = x.awal_scan_masuk + ' - ' + x.akhir_scan_masuk;
                            x.scan_keluar = x.awal_scan_keluar + ' - ' + x.akhir_scan_keluar;
                            resultData.push(x);
                        })
                        return resultData;
                    }
                }
            },
            deferRender: true,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            columns: [
                { data: "updated" },
                { className: "text-center", data: "kode" },
                { className: "font-w600", data: "nama" },
                { data: "hari" },
                { className: "text-center", data: "jam" },
                { className: "text-center", data: "scan_masuk" },
                { className: "text-center", data: "scan_keluar" },
                {
                    data: null,
                    className: "text-center",
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            // '<button class="btn btn-xs btn-default" type="button" act="switch"><i class="fa fa-exchange"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    // var initTableGroupShift = function() {
    //     // Table initiation
    //     var table = $('#table-group-shift').DataTable({
    //         destroy: true, // destroy it first, if there is an active table instance
    //         pageLength: 10,
    //         lengthMenu: [
    //             [10, 20, 50, 100],
    //             [10, 20, 50, 100]
    //         ],
    //         ajax: {
    //             url: BASE_URL + '/php/api/getPosition.php',
    //             type: "POST",
    //             data: {
    //                 table: 'group_shift'
    //             },
    //             dataSrc: function(json) {
    //                 if (json.status == 'err') {
    //                     $.notify({
    //                         "icon": "fa fa-exclamation-circle",
    //                         "message": "Data Group Shift kosong"
    //                     }, {
    //                         "type": "danger"
    //                     });
    //                     return [];
    //                 } else {
    //                     return json.data;
    //                 }
    //             }
    //         },
    //         deferRender: true,
    //         order: [
    //             [0, 'desc']
    //         ],
    //         columnDefs: [{
    //             "visible": false,
    //             "targets": 0
    //         }],
    //         columns: [
    //             { data: "updated" },
    //             { className: "font-w600 ", data: "nama" },
    //             { className: "hidden-xs text-center", data: "kode" },
    //             {
    //                 className: "hidden-xs text-center",
    //                 data: "active",
    //                 render: function(data, type, row) {
    //                     if (data == 1) return '<span class="label label-success">Aktif</span>';
    //                     else return '<span class="label label-default">Non Aktif</span>';
    //                 }
    //             },
    //             {
    //                 data: null,
    //                 className: "text-center",
    //                 render: function(data, type, row) {
    //                     return '<div class="btn-group text-center">' +
    //                         '<button class="btn btn-xs btn-default" type="button" act="switch"><i class="fa fa-exchange"></i></button>' +
    //                         // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
    //                         '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
    //                         '</div>';
    //                 }
    //             }
    //         ]
    //     });
    // };

    var initContentPenugasanShift = function() {
        // render list of shift events
        $.ajax({
            type: "POST",
            url: BASE_URL + '/php/api/getShift.php',
            dataType: 'json',
            data: {
                table: 'shift'
            },
            success: function(response) {
                if (response.status != 'err') {
                    var container = $('.js-events');
                    container.empty();

                    var data = response.data;
                    data.forEach(function(d) {
                        container.append('<li>' + d.nama.toUpperCase() + ' (' + d.jam_masuk + ' - ' + d.jam_keluar + ')</li>');
                    })

                    initEvents();
                }
            }
        });

        // FullCalendar, for more examples you can check out http://fullcalendar.io/
        initCalendar();
    };

    return {
        init: function() {
            bsDataTables();
            initStat('shift');
            initShiftPage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesPosition.init(); });
