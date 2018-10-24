var BasePagesEmployee = function() {
    // Init page stat
    var initStat = function() {
        $.ajax({
            type: "GET",
            url: BASE_URL + '/php/api/getEmployeeStat.php',
            dataType: 'json',
            success: function(res) {
                var container = $('#employee-stat');
                var html = '';
                container.empty();
                if (res.success) {
                    var data = res.data;
                    var counter = 0;
                    data.forEach(function(d) {
                        if (d.status == "Kontrak 1") {
                            html += '<div class="col-md-2 col-md-offset-1 col-xs-6">' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">Kontrak 1</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                                '</div>';
                        } else if (d.status == "Kontrak 2") {
                            html += '<div class="col-md-2 col-xs-6">' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">Kontrak 2</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                                '</div>';
                        } else {
                            html += '<div class="col-md-2 col-xs-6">' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">Tetap</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                                '</div>';
                        }

                        counter += parseInt(d.total);
                    })
                    html += '<div class="col-md-2 col-xs-6">' +
                        '<div class="font-w700 text-gray-darker animated fadeIn">Total</div>' +
                        '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + counter + '</span>' +
                        '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                        '</div>';
                }
                html += '<div class="col-md-2">' +
                    '<span class="h2 font-w300 text-primary animated flipInX">' +
                    '<button type="button" class="btn btn-primary btn-circle btn-lg push-5" id="btn-add"><i class="fa fa-plus"></i></button>' +
                    '</span>' +
                    '<div class="text-muted animated fadeIn"><small>Tambah Data</small></div>' +
                    '</div>';

                container.html(html);
            }
        })
    };

    // Init main table
    var initTable = function() {
        // init style helper
        bsDataTables();

        // Table initiation
        var table = $('.js-dataTable-full').DataTable({
            order: [
                [0, "asc"]
            ],
            columnDefs: [
                { orderable: true },
                { "targets": [9], "searchable": false, "orderable": false, "visible": true }
            ],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getEmployee.php'
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-nik', data.nik);
            },
            columns: [
                { data: "nik" },
                {
                    className: "font-w600",
                    data: "nama",
                    render: function(data, type, row) {
                        return '<a data-id="' + row.nik + '" href="javascript:void(0)">' + data + '</a>';
                    }
                },
                {
                    className: "d-inline-block text-truncate",
                    data: "nama_division"
                },
                {
                    className: "d-inline-block text-truncate",
                    data: "nama_department"
                },
                {
                    className: "d-inline-block text-truncate",
                    data: "nama_section"
                },
                {
                    className: "d-inline-block text-truncate",
                    data: "nama_sub_section"
                },
                {
                    className: "d-inline-block text-truncate",
                    data: "nama_group"
                },
                {
                    data: "tgl_masuk",
                    render: function(data, type, row) {
                        return moment(data, 'DD-MM-YYYY').format('DD MMM YYYY');
                    }
                },
                {
                    className: "text-center",
                    data: "status",
                    render: function(data, type, row) {
                        var statusEdt = '';

                        if (data == "Tetap") statusEdt = '<span class="label label-primary">' + data.toUpperCase() + '</span>';
                        else if (data == "Kontrak 1") statusEdt = '<span class="label label-info">' + data.toUpperCase() + '</span>';
                        else if (data == "Kontrak 2") statusEdt = '<span class="label label-warning">' + data.toUpperCase() + '</span>';
                        else data = '<span class="label label-default">' + data + '</span>';

                        return statusEdt;
                    }
                },
                {
                    data: null,
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" id="btn-view"><i class="fa fa-eye"></i></button>' +
                            '<button class="btn btn-xs btn-default btn-edit" type="button"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default btn-remove" type="button"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            $('#modal-profile').modal('show');
            renderProfileAdd();
            $('#opened-profile').val("");
            $('#opened-nik').val("");
        });

        // When employee NAME or TABLE'S VIEW button is clicked
        $('.js-dataTable-full tbody').on('click', 'a, #btn-view', function() {
            var data = table.row($(this).parents('tr')).data();

            // Open the popup modal
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.id);
            $('#opened-nik').val(data.nik);

            renderProfileView(data);
        });

        // When TABLE'S EDIT button is clicked
        $('.js-dataTable-full tbody').on('click', '.btn-edit', function() {
            var data = table.row($(this).parents('tr')).data();

            // Open the popup modal
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.id);
            $('#opened-nik').val(data.nik);
            $('#origin').val('direct');

            renderProfileEdit(data);
        });

        // When TABLE'S DELETE button is clicked
        $('.js-dataTable-full tbody').on('click', '.btn-remove', function() {
            var data = table.row($(this).parents('tr')).data();
            swal({
                title: "Hapus data?",
                text: "Data yang dihapus tidak akan dapat dikembalikan",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Hapus!",
                cancelButtonText: "Batal",
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve) {
                        $.ajax({
                                type: "POST",
                                url: BASE_URL + "/php/api/deleteEmployee.php",
                                dataType: 'json',
                                data: {
                                    id: data.id
                                }
                            }).done(function(response) {
                                if (response.status == 'err') {
                                    swal('Error', response.message, 'error');
                                } else {
                                    swal.close();
                                    $.notify({
                                        "icon": "si si-check",
                                        "message": "Data karyawan berhasil dihapus"
                                    }, {
                                        "type": "success"
                                    });
                                    $('#modal-profile').modal('hide');

                                    // reload the stat
                                    initStat();

                                    // reload the table
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    });
                },
                allowOutsideClick: false
            });
        });

        // when modal CANCEL button clicked
        $(document).on('click', '#btn-cancel-profile', function() {
            var origin = $('#origin').val();
            if (origin == 'direct') {
                $('#modal-profile').modal('hide');
            } else {
                var nik = $('#opened-nik').val();
                var $tr = $('#table-employee').find('tr[data-nik="' + nik + '"]');
                var dataTableRow = table.row($tr[0]);
                var data = dataTableRow.data();
                renderProfileView(data);
            }
        });

        // When modal EDIT button is clicked
        $(document).on('click', '#btn-edit-profile', function() {
            var nik = $('#opened-nik').val();
            var $tr = $('#table-employee').find('tr[data-nik="' + nik + '"]');
            var dataTableRow = table.row($tr[0]);
            var data = dataTableRow.data();

            $('#modal-profile').modal('show');
            $('#origin').val('modal');

            renderProfileEdit(data);
        });

        // When modal DELETE button is clicked
        $(document).on('click', '#btn-remove-profile', function() {
            swal({
                title: "Hapus data?",
                text: "Data yang dihapus tidak akan dapat dikembalikan",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Hapus!",
                cancelButtonText: "Batal",
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve) {
                        $.ajax({
                                type: "POST",
                                url: BASE_URL + "/php/api/deleteEmployee.php",
                                dataType: 'json',
                                data: {
                                    id: $('#opened-profile').val()
                                }
                            }).done(function(response) {
                                if (response.status == 'err') {
                                    swal('Error', response.message, 'error');
                                } else {
                                    swal.close();
                                    $.notify({
                                        "icon": "si si-check",
                                        "message": "Data karyawan berhasil dihapus"
                                    }, {
                                        "type": "success"
                                    });
                                    $('#modal-profile').modal('hide');

                                    // reload the stat
                                    initStat();

                                    // reload the table
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    });
                },
                allowOutsideClick: false
            });
        })

        // When SAVE / SUBMIT button is clicked
        $(document).on('submit', '#profile-form', function(e) {
            e.preventDefault();

            var data = [];
            var tgl_masuk, status;
            $('[id^="input-"]').filter(
                function() {
                    var elem = this;
                    // cleaning empty data [TEMP!]
                    if (elem['value'] != '') {
                        var key = elem['id'].replace('input-', '');
                        if (key == 'tgl_masuk') tgl_masuk = elem['value']; // save tgl_masuk for NIK generation
                        if (key == 'status') status = elem['value']; // save status for NIK generation
                        return data.push({
                            "key": key,
                            "value": elem['value']
                        });
                    }
                });

            // Read current profile
            var cProf = $('#opened-profile').val();
            if (cProf == '') var apiUrl = BASE_URL + '/php/api/addEmployee.php';
            else var apiUrl = BASE_URL + '/php/api/updateEmployee.php';

            // theng generate new NIK
            $.when(getLatestNik()).done(function(response) {
                var year = moment(tgl_masuk, 'DD-MM-YYYY').year();
                var short_year = moment(tgl_masuk, 'DD-MM-YYYY').format('YY');
                var month = moment(tgl_masuk, 'DD-MM-YYYY').format('MM');

                // Generate latest 4 digits
                if (response.success) {
                    var existing_nik = $('#opened-nik').val();
                    if (existing_nik.length == 0) { // if freshly new data :: ADD
                        var latest = parseInt(response.data) + 1;
                    } else { // if EDIT data
                        var latest = parseInt(existing_nik.substr(existing_nik.length - 4));
                    }
                    var pin = pad(latest, 4);
                } else { // if empty database!
                    var pin = "0001";
                }

                // Generate the Year Letter
                var letter = "";
                if (status == 'Tetap') {
                    var match_obj = $letters.find(obj => {
                        return obj.year == year;
                    });
                    letter = match_obj.letter;
                } else {
                    letter = "*";
                }

                var new_nik = letter + short_year + month + pin;
                data.push({
                    "key": "nik",
                    "value": new_nik
                });

                $.ajax({
                    type: "POST",
                    url: apiUrl,
                    dataType: 'json',
                    data: {
                        data: data,
                        id: $('#opened-profile').val()
                    },
                    success: function(res) {
                        if (res.status == 'err') {
                            swal("Error!", res.message, "error");
                        } else {
                            $('#modal-profile').modal('hide');
                            $.notify({
                                "icon": "si si-check",
                                "message": "Data karyawan berhasil disimpan"
                            }, {
                                "type": "success"
                            });

                            // reload the stat
                            initStat();

                            // reload the table
                            table.ajax.reload();
                        }

                    }
                }); // end of $.ajax
            }); // end of $.when
        });

        // when modal on close
        $('#modal-profile').on('hidden.bs.modal', function() {
            $('#opened-nik, #opened-profile, #origin, #form-scope').val('');
        })
    };

    // init the page
    var initEmployeePage = function() {
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
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-users">&nbsp;&nbsp;</i>DATA KARYAWAN</h3>');
            // Set active class for related menu
            $('#menu-karyawan').addClass('active');
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

        // when button LOGOUT is clicked
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });


        // ADD PROFILE functions ::
        // 
        // when gear button clicked
        $(document).on('click', '#btn-generate-profile', function() {
            generateRandomProfile();
        });

        // when division selector changed
        $(document).on('change', '#input-kode_bagian', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
                $('#input-division, #input-department, #input-section, #input-sub_section, #input-group').val('')
                generateSelectors(valueSelected);
            } else {
                // Clearing all selectors!
                $('#input-division, #input-department, #input-section, #input-sub_section, #input-group').val('').removeAttr('disabled');
            }
        });

        // when division selector changed
        $(document).on('change', '#input-division', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating DEPARTEMEN selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'department',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-department', res.data);
                    $('#input-section, #input-sub_section, #input-group').empty();
                }
            });
        });

        // when department selector changed
        $(document).on('change', '#input-department', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating SECTION selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'section',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-section', res.data);
                    $('#input-sub_section, #input-group').empty();
                }
            });
        });

        // when section selector changed
        $(document).on('change', '#input-section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating SUB SECTION selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'sub_section',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-sub_section', res.data);
                    $('#input-group').empty();
                }
            });
        });

        // when sub-section selector changed
        $(document).on('change', '#input-sub_section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating GROUP selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'group',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-group', res.data);
                }
            });
        });
    };

    return {
        init: function() {
            initStat();
            initTable();
            initEmployeePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesEmployee.init(); });
