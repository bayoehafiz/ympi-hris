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
                        } else if (d.status == "Tetap") {
                            html += '<div class="col-md-2 col-xs-6">' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">Tetap</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                                '</div>';
                        } else {
                            html += '<div class="col-md-2 col-xs-6">' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">Percobaan</div>' +
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
    var initTable = function(filterData) {
        // Table initiation
        var table = $('.js-dataTable-full').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            order: [
                [0, "asc"]
            ],
            columnDefs: [
                { targets: 0, type: 'nik-formatted' }
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
                url: BASE_URL + '/php/api/getEmployee.php',
                data: {
                    filter: filterData
                },
                // Error handler
                dataSrc: function(res) {
                    if (res.error) {
                        swal("Error!", res.message, "error");
                        return [];
                    } else {
                        // format the Date into correct one!
                        var tableData = [];

                        res.aaData.forEach(function(val) {
                            // create TEMP variable (temporary) for ordering purpose
                            // var tmp = moment(val.tgl_masuk, 'DD-MM-YY').format('YYYYMMDD');
                            // val.tmp = tmp;

                            // validate Nama (remove special character)
                            var nama = val.nama;
                            val.nama = nama.replace(/[^\w\s]/gi, '');

                            // Tgl_masuk formatting
                            var dTglMasuk = val.tgl_masuk;
                            if (dTglMasuk.length < 10) dTglMasuk = moment(dTglMasuk, 'DD-MM-YY').format('DD-MM-YYYY');
                            val.tgl_masuk = dTglMasuk;

                            // Tgl_lahir formatting
                            var dTglLahir = val.tgl_lahir;
                            if (dTglLahir.length < 10) dTglLahir = moment(dTglLahir, 'DD-MM-YY').format('DD-MM-YYYY');
                            val.tgl_lahir = dTglLahir;

                            tableData.push(val);
                        })

                        return tableData;
                    }
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-nik', data.nik);
            },
            columns: [
                // {
                //     visible: false,
                //     searchable: false,
                //     data: "tmp"
                // },
                {
                    className: "text-center",
                    data: "nik"
                }, {
                    className: "font-w600",
                    data: "nama",
                    render: function(data, type, row) {
                        return '<a data-id="' + row.nik + '" href="javascript:void(0)">' + data + '</a>';
                    }
                }, {
                    className: "text-center d-inline-block text-truncate",
                    data: "nama_group",
                    render: function(data, type, row) {
                        // Show employee's GROUP
                        if (data == null) { // if empty, show SUB_SECTION instead
                            if (row.nama_sub_section == null) { // if empty, show SECTION instead
                                if (row.nama_section == null) { // if empty, show DEPTARTMENT instead
                                    if (row.nama_department == null) return "<small class=\"text-muted\">Divisi</small> " + row.nama_division.toUpperCase(); // if empty, show DIVISION instead
                                    return "<small class=\"text-muted\">Departemen</small> " + row.nama_department.toUpperCase();
                                }
                                return "<small class=\"text-muted\">Section</small> " + row.nama_section.toUpperCase();
                            }
                            return "<small class=\"text-muted\">Sub Section</small> " + row.nama_sub_section.toUpperCase();
                        }
                        return "<small class=\"text-muted\">Grup</small> " + data.toUpperCase();
                    }
                }, {
                    className: "text-center d-inline-block text-truncate",
                    data: "kode_grade",
                    render: function(data, type, row) {
                        if (data == null) return "-";
                        else return data + " <small class=\"text-muted\">(" + row.nama_grade + ")</small>";
                    }
                },
                // {
                //     className: "text-center",
                //     data: "tgl_masuk",
                //     render: function(data, type, row) {
                //         return moment(data, "DD-MM-YYYY").format("D MMM YYYY");
                //     }
                // }, 
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
                }, {
                    className: "text-center",
                    data: null,
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" id="btn-view"><i class="fa fa-eye"></i></button>' +
                            '<button class="btn btn-xs btn-default btn-edit" type="button"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default btn-remove" type="button"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    },
                    searchable: false,
                    orderable: false
                }
            ],
            fnInitComplete: function() {
                // console.log("Table loaded!");
            }
        });

        // Extend sorting Fn for NIK column
        jQuery.extend(jQuery.fn.dataTableExt.sort, {
            "nik-formatted-pre": function(a) {
                console.log(a);
            },
            "nik-formatted-asc": function(a, b) {
                //
            },
            "nik-formatted-desc": function(a, b) {
                //
            }
        });
    };

    // Init table filtering
    var initFilter = function(data) {
        var container = $('#filter-container');
        container.html('');

        // Populate FILTER selectors :: BY STATUS
        var data = [{
            id: 'Tetap',
            label: 'Tetap'
        }, {
            id: 'Kontrak 1',
            label: 'Kontrak 1'
        }, {
            id: 'Kontrak 2',
            label: 'Kontrak 2'
        }, {
            id: 'Percobaan',
            label: 'Percobaan'
        }];

        var bag_elems = '<div class="form-group">' +
            '<div class="form-material form-material-primary push-30 push-30-t">' +
            '<select class="form-control" id="input-filter-status" name="elem-filter-status" size="1">' +
            '<option val=""></option>';

        data.forEach(function(dt) {
            bag_elems += '<option value="' + dt.id + '">' + dt.label + '</option>';
        });

        bag_elems += '</select>' +
            '<label for="elem-filter-status">By Status</label>' +
            '</div>' +
            '</div>';

        container.append(bag_elems);

        // Populate FILTER selectors :: BY JENIS_KELAMIN
        var data = [{
            id: 'Laki-laki',
            label: 'Laki-laki'
        }, {
            id: 'Perempuan',
            label: 'Perempuan'
        }];

        var bag_elems = '<div class="form-group">' +
            '<div class="form-material form-material-primary push-30 push-30-t">' +
            '<select class="form-control" id="input-filter-jenis_kelamin" name="elem-filter-jenis_kelamin" size="1">' +
            '<option val=""></option>';

        data.forEach(function(dt) {
            bag_elems += '<option value="' + dt.id + '">' + dt.label + '</option>';
        });

        bag_elems += '</select>' +
            '<label for="elem-filter-jenis_kelamin">By Jenis Kelamin</label>' +
            '</div>' +
            '</div>';

        container.append(bag_elems);

        // Populate FILTER selectors :: BY KODE_BAGIAN
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: BASE_URL + '/php/api/getSelectorData.php',
            data: { table: 'kode_bagian' },
            success: function(res) {
                if (res.success) {
                    var bag_elems = '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-kode_bagian" name="elem-filter-kode_bagian" size="1">' +
                        '<option val=""></option>';

                    res.data.forEach(function(dt) {
                        bag_elems += '<option value="' + dt.id + '">' + dt.kode + '</option>';
                    });

                    bag_elems += '</select>' +
                        '<label for="elem-filter-kode_bagian">By Kode Bagian</label>' +
                        '</div>' +
                        '</div>';

                    container.append(bag_elems);
                }
            }
        });

        // Populate FILTER selectors :: BY DEPT/SEC/SUB SEC/GRUP
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: BASE_URL + '/php/api/getSelectorData.php',
            data: { table: 'division' },
            success: function(res) {
                if (res.success) {
                    var bag_elems = '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-division" name="elem-filter-division" size="1">' +
                        '<option val=""></option>';

                    res.data.forEach(function(dt) {
                        bag_elems += '<option value="' + dt.id + '">' + dt.nama + '</option>';
                    });

                    bag_elems += '</select>' +
                        '<label for="elem-filter-division">By Divisi</label>' +
                        '</div>' +
                        '</div>';

                    // Generate another components
                    bag_elems += '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-department" name="elem-filter-department" size="1">' +
                        '<option val=""></option>' +
                        '</select>' +
                        '<label for="elem-filter-department">By Departemen</label>' +
                        '</div>' +
                        '</div>';

                    bag_elems += '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-section" name="elem-filter-section" size="1">' +
                        '<option val=""></option>' +
                        '</select>' +
                        '<label for="elem-filter-section">By Section</label>' +
                        '</div>' +
                        '</div>';

                    bag_elems += '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-sub_section" name="elem-filter-sub_section" size="1">' +
                        '<option val=""></option>' +
                        '</select>' +
                        '<label for="elem-filter-sub_section">By Sub Section</label>' +
                        '</div>' +
                        '</div>';

                    bag_elems += '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-group" name="elem-filter-group" size="1">' +
                        '<option val=""></option>' +
                        '</select>' +
                        '<label for="elem-filter-group">By Grup</label>' +
                        '</div>' +
                        '</div>';

                    container.append(bag_elems);
                }
            }
        });

        // Populate FILTER selectors :: BY GRADE
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: BASE_URL + '/php/api/getSelectorData.php',
            data: { table: 'grade' },
            success: function(res) {
                if (res.success) {
                    var bag_elems = '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-grade" name="elem-filter-grade" size="1">' +
                        '<option val=""></option>';

                    res.data.forEach(function(dt) {
                        bag_elems += '<option value="' + dt.id + '">[' + dt.kode + '] ' + dt.nama + '</option>';
                    });

                    bag_elems += '</select>' +
                        '<label for="elem-filter-grade">By Grade</label>' +
                        '</div>' +
                        '</div>';

                    container.append(bag_elems);
                }
            }
        });

        // Populate FILTER selectors :: BY JABATAN
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: BASE_URL + '/php/api/getSelectorData.php',
            data: { table: 'penugasan' },
            success: function(res) {
                if (res.success) {
                    var bag_elems = '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-penugasan" name="elem-filter-penugasan" size="1">' +
                        '<option val=""></option>';

                    res.data.forEach(function(dt) {
                        bag_elems += '<option value="' + dt.id + '">' + dt.nama + '</option>';
                    });

                    bag_elems += '</select>' +
                        '<label for="elem-filter-penugasan">By Jabatan</label>' +
                        '</div>' +
                        '</div>';

                    container.append(bag_elems);
                }
            }
        });

        // Function to populate all data (regardless the parent)
        var populateAll = function(table) {
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorDataClean.php',
                dataType: 'json',
                data: {
                    table: table
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-filter-' + table, res.data);
                }
            });
        }

        // 
        // Filter selector on change functions
        // 
        // when filter kode_bagian selector changed
        $(document).on('change', '#input-filter-kode_bagian', function() {
            var val = this.value;
            if (val != '') {
                $('#input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').attr('disabled', 'disabled');
            } else {
                $('#input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').removeAttr('disabled');
            }
            $('#input-filter-division, #input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').val('');
        });

        // when filter division selector changed
        $(document).on('change', '#input-filter-division', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
                $('#input-filter-kode_bagian').val('');
                $('#input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').removeAttr('disabled');

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
                        if (res.success) repopulateSelector('input-filter-department', res.data);
                        $('#input-filter-section, #input-filter-sub_section, #input-filter-group').empty();
                    }
                });
            } else {
                $('#input-filter-kode_bagian').removeAttr('disabled');
                // $('#input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').empty();
                populateAll('department');
                populateAll('section');
                populateAll('sub_section');
                populateAll('group');
            }
        });

        // when filter department selector changed
        $(document).on('change', '#input-filter-department', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
                // fetch data for populating DEPARTEMEN selector
                $.ajax({
                    type: "POST",
                    url: BASE_URL + '/php/api/getSelectorData.php',
                    dataType: 'json',
                    data: {
                        table: 'section',
                        parent: valueSelected
                    },
                    success: function(res) {
                        if (res.success) repopulateSelector('input-filter-section', res.data);
                        $('#input-filter-sub_section, #input-filter-group').empty();
                    }
                });
            } else {
                $('#input-filter-section, #input-filter-sub_section, #input-filter-group').empty();
            }
        });

        // when filter section selector changed
        $(document).on('change', '#input-filter-section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
                // fetch data for populating DEPARTEMEN selector
                $.ajax({
                    type: "POST",
                    url: BASE_URL + '/php/api/getSelectorData.php',
                    dataType: 'json',
                    data: {
                        table: 'sub_section',
                        parent: valueSelected
                    },
                    success: function(res) {
                        if (res.success) repopulateSelector('input-filter-sub_section', res.data);
                        $('#input-filter-group').empty();
                    }
                });
            } else {
                $('#input-filter-sub_section, #input-filter-group').empty();
            }
        });

        // when filter section selector changed
        $(document).on('change', '#input-filter-sub_section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
                // fetch data for populating DEPARTEMEN selector
                $.ajax({
                    type: "POST",
                    url: BASE_URL + '/php/api/getSelectorData.php',
                    dataType: 'json',
                    data: {
                        table: 'group',
                        parent: valueSelected
                    },
                    success: function(res) {
                        if (res.success) repopulateSelector('input-filter-group', res.data);
                    }
                });
            } else {
                $('#input-filter-group').empty();
            }
        });

        // Button RESET action
        $(document).on('click', '#btn-reset-filter', function() {
            // send filters data to table & reinitiate table
            initTable();

            // reset all components
            $('[id^=input-filter-]').val('');
            $('#input-filter-kode_bagian, #input-filter-division').trigger('change');
            populateAll('department');
            populateAll('section');
            populateAll('sub_section');
            populateAll('group');
        });

        // Filter on change action
        $(document).on('change', '[id^=input-filter-]', function() {
            $('#filter-form').trigger('submit');
        });

        // FILTER SUBMIT action
        $(document).on('submit', '#filter-form', function(e) {
            e.preventDefault();

            var data = [];
            $('[id^="input-filter-"]').filter(
                function() {
                    var elem = this;
                    // cleaning empty data [TEMP!]
                    if (elem['value'] != '') {
                        var key = elem['id'].replace('input-filter-', '');
                        if (key == 'tgl_masuk') tgl_masuk = elem['value']; // save tgl_masuk for NIK generation
                        if (key == 'status') status = elem['value']; // save status for NIK generation
                        return data.push({
                            "key": key,
                            "value": elem['value']
                        });
                    }
                });

            // send filters data to table & reinitiate table
            initTable(data);
        })

        // Fill all BAGIAN selectors
        populateAll('department');
        populateAll('section');
        populateAll('sub_section');
        populateAll('group');
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

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            console.log("Clearing all inputs first...");
            $('[id^="input-"]').val('');
            // $('#opened-nik, #opened-profile, #origin, #form-scope').val('');

            $('#modal-profile').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });

            renderProfileAdd();
            $('#opened-profile').val("");
            $('#opened-nik').val("");
        });


        // This is OUR TABLE!
        var table = $('.js-dataTable-full').DataTable();

        // When employee NAME or TABLE'S VIEW button is clicked
        $('.js-dataTable-full tbody').on('click', 'a, #btn-view', function() {
            var nik = $(this).parents('tr').attr('data-nik');
            $.ajax({
                type: "POST",
                url: BASE_URL + "/php/api/getEmployeeById.php",
                dataType: 'json',
                data: {
                    id: nik
                }
            }).done(function(res) {
                var data = res.data;

                console.log("Clearing all inputs first...");
                $('[id^="input-"]').val('');

                // Open the popup modal
                $('#modal-profile').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });

                $('#opened-profile').val(data.id);
                $('#opened-nik').val(data.nik);
                renderProfileView(data);
            });
        });

        // When TABLE'S EDIT button is clicked
        $('.js-dataTable-full tbody').on('click', '.btn-edit', function() {
            var nik = $(this).parents('tr').attr('data-nik');

            $.ajax({
                type: "POST",
                url: BASE_URL + "/php/api/getEmployeeById.php",
                dataType: 'json',
                data: {
                    id: nik
                }
            }).done(function(res) {
                var data = res.data;

                console.log("Clearing all inputs first...");
                $('[id^="input-"]').val('');

                // Open the popup modal
                $('#modal-profile').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });

                $('#opened-profile').val(data.id);
                $('#opened-nik').val(data.nik);
                $('#origin').val('direct');

                renderProfileEdit(data);
            });
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


        //
        // MODAL ACTIONS !!!
        //
        // when modal CANCEL button clicked
        $(document).on('click', '#btn-cancel-profile', function() {
            var origin = $('#origin').val();
            if (origin == 'direct') {
                $('#modal-profile').modal('hide');
            } else {
                var nik = $('#opened-nik').val();

                $.ajax({
                    type: "POST",
                    url: BASE_URL + "/php/api/getEmployeeById.php",
                    dataType: 'json',
                    data: {
                        id: nik
                    }
                }).done(function(res) {
                    var data = res.data;

                    console.log("Clearing all inputs first...");
                    $('[id^="input-"]').val('');

                    renderProfileView(data);
                });
            }
        });

        // When modal EDIT button is clicked
        $(document).on('click', '#btn-edit-profile', function() {
            var nik = $('#opened-nik').val();

            $.ajax({
                type: "POST",
                url: BASE_URL + "/php/api/getEmployeeById.php",
                dataType: 'json',
                data: {
                    id: nik
                }
            }).done(function(res) {
                var data = res.data;

                console.log("Clearing all inputs first...");
                $('[id^="input-"]').val('');

                // Open the popup modal
                $('#modal-profile').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });

                $('#origin').val('modal');

                renderProfileEdit(data);
            });
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

            // then generate new NIK
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

                // Send the final data!!!
                $.ajax({
                    type: "POST",
                    url: apiUrl,
                    dataType: 'json',
                    data: {
                        data: data,
                        new_nik: new_nik,
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

                            // destroy the table and reinitiate it
                            table.clear();
                            table.ajax.reload();
                        }

                    }
                }); // end of $.ajax
            }); // end of $.when
        });

        // when GEAR button clicked
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

        // when modal on close
        // $('#modal-profile').on('hidden.bs.modal', function() {
        //     console.log("Clearing all inputs...");
        //     $('[id^="input-"]').val('');
        //     $('#opened-nik, #opened-profile, #origin, #form-scope').val('');
        // })

        // 
        // Eof MODAL ACTIONS !!!
        // 
    };

    return {
        init: function() {
            initStat();
            bsDataTables();
            initTable();
            initEmployeePage();
            initFilter();
            initUploader();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    BasePagesEmployee.init();
});
