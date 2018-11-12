var BasePagesEmployee = function() {
    var viewData = function(id) {
        // Fetch respected data
        $.ajax({
            type: "POST",
            url: ENV.BASE_API + "getEmployeeById.php",
            dataType: 'json',
            data: {
                id: id
            }
        }).done(function(res) {
            var data = res.data;
            renderProfileView(data);

            $('#photo-container-view').removeClass('hide-me');
            $('#photo-container-edit').addClass('hide-me');

            // Open the popup modal
            $('#modal-profile').modal({
                show: true,
                // keyboard: false,
                backdrop: 'static'
            });

            $('#opened-profile').val(data.id);
        });
    };

    var editData = function(id) {
        $.ajax({
            type: "POST",
            url: ENV.BASE_API + "getEmployeeById.php",
            dataType: 'json',
            data: {
                id: id
            }
        }).done(function(res) {
            var data = res.data;
            renderProfileEdit(data);

            $('#photo-container-edit').removeClass('hide-me');
            $('#photo-container-view').addClass('hide-me');

            // Open the popup modal
            $('#modal-profile').modal({
                show: true,
                // keyboard: false,
                backdrop: 'static'
            });

            $('#opened-profile').val(data.id);
            $('#origin').val('direct');
        });
    };

    var removeData = function(id) {
        swal({
                title: "Hapus Data Karyawan?",
                text: "Data yang dihapus tidak akan dapat dikembalikan",
                type: "question",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Hapus!",
                cancelButtonText: "Batal",
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve) {
                        $.ajax({
                                type: "POST",
                                url: ENV.BASE_API + "deleteEmployee.php",
                                dataType: 'json',
                                data: {
                                    id: id
                                }
                            }).done(function(response) {
                                if (response.status == 'err') {
                                    swal('Error', response.message, 'error');
                                } else {
                                    swal('Success', "Data karyawan berhasil dihapus", 'success');

                                    // reload the stat
                                    initStat();

                                    // reload the table
                                    var $table = $('#hidden-active-type').val();
                                    var table = $('#table-' + $table).DataTable();
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    });
                },
                allowOutsideClick: false
            })
            .catch(swal.noop);
    };

    // Init table employee
    window.initTableEmployee = function(filter) {
        if (!filter || filter.length > 0) var $filter = filter;
        else var $filter = '';

        // Table initiation
        var table = $('#table-employee').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            autoWidth: false,
            stateSave: true,
            responsive: true,
            order: [
                [0, "asc"]
            ],
            pageLength: 20,
            lengthMenu: [
                [20, 50, 100],
                [20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            deferRender: true,
            serverMethod: 'post',
            ajax: {
                url: ENV.BASE_API + 'getEmployee.php',
                data: {
                    scope: 'active', // <- to fetch ACTIVE EMPLOYEE only!
                    filter: $filter
                },
            },
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [{
                    data: "updated",
                    visible: false
                },
                {
                    orderable: false,
                    searchable: false,
                    className: "text-center",
                    data: "photo_url",
                    render: function(data, type, row) {
                        return '<img src="../' + data + '" class="img-avatar img-avatar32" />';
                    }
                }, {
                    className: "font-w600",
                    data: "nama",
                    render: function(data, type, row) {
                        return '<a href="javascript:void(0)">' + data + '</a>';
                    }
                }, {
                    className: "text-center",
                    data: "nik"
                }, {
                    className: "text-center d-inline-block text-truncate",
                    data: "nama_group",
                    render: function(data, type, row) {
                        // Show employee's GROUP
                        if (data == null) { // if empty, show SUB_SECTION instead
                            if (row.nama_sub_section == null) { // if empty, show SECTION instead
                                if (row.nama_section == null) { // if empty, show DEPTARTMENT instead
                                    if (row.nama_department == null) {
                                        if (row.nama_division == null) {
                                            return "-";
                                        }
                                        return "<small class=\"text-muted\">Divisi</small><br/>" + row.nama_division.toUpperCase();
                                    }
                                    return "<small class=\"text-muted\">Departemen</small><br/>" + row.nama_department.toUpperCase();
                                }
                                return "<small class=\"text-muted\">Section</small><br/>" + row.nama_section.toUpperCase();
                            }
                            return "<small class=\"text-muted\">Sub Section</small><br/>" + row.nama_sub_section.toUpperCase();
                        }
                        return "<small class=\"text-muted\">Grup</small><br/>" + data.toUpperCase();
                    }
                }, {
                    className: "text-center d-inline-block text-truncate",
                    data: "kode_grade",
                    render: function(data, type, row) {
                        if (data == null) return "-";
                        else return data + "<br/><small class=\"text-muted\">" + row.nama_grade + "</small>";
                    }
                },
                {
                    className: "text-center",
                    data: "status",
                    render: function(data, type, row) {
                        var statusEdt = '';

                        if (data == "Tetap") statusEdt = '<span class="label label-primary">' + data.toUpperCase() + '</span>';
                        else if (data == "Kontrak 1") statusEdt = '<span class="label label-warning">' + data.toUpperCase() + '</span>';
                        else if (data == "Kontrak 2") statusEdt = '<span class="label label-info">' + data.toUpperCase() + '</span>';
                        else statusEdt = '<span class="label label-default">' + data.toUpperCase() + '</span>';

                        return statusEdt;
                    }
                }, {
                    className: "text-center",
                    data: null,
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-sm btn-default" type="button" id="btn-view"><i class="si si-eye"></i></button>' +
                            '<button class="btn btn-sm btn-default btn-edit" type="button"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default btn-remove" type="button"><i class="si si-trash"></i></button>' +
                            '</div>';
                    },
                    searchable: false,
                    orderable: false
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
            fnInitComplete: function() {
                // console.log("Table Employee loaded!");
                App.blocks('#filter-block', 'state_normal');
            }
        });

        // jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        //     "formatted-num-pre": function(a) {
        //         a = (a === "-" || a === "") ? 0 : a.replace(/[^\d\-\.]/g, "");
        //         console.log(parseFloat(a));
        //         return parseFloat(a);
        //     },
        //     "formatted-num-asc": function(a, b) {
        //         return a - b;
        //     },
        //     "formatted-num-desc": function(a, b) {
        //         return b - a;
        //     }
        // });



        // TABLE ACTIONS !!!
        // 
        // When employee NAME or TABLE'S VIEW button is clicked
        $('#table-employee tbody').on('click', 'a, #btn-view', function() {
            var id = $(this).parents('tr').attr('data-id');
            viewData(id);
        });

        // When TABLE'S EDIT button is clicked
        $('#table-employee tbody').on('click', '.btn-edit', function() {
            var id = $(this).parents('tr').attr('data-id');
            editData(id);
        });

        // When table-employee DELETE button is clicked
        $('#table-employee tbody').on('click', '.btn-remove', function() {
            var id = $(this).parents('tr').attr('data-id');
            removeData(id);
        });
        // 
        // END TABLE ACTIONS
    };

    // Init table employee
    window.initTableTerminated = function(filterData) {
        // Table initiation
        var table = $('#table-terminated').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            autoWidth: false,
            responsive: true,
            order: [
                [0, "asc"]
            ],
            // columnDefs: [
            //     { targets: 0, type: 'nik-formatted' }
            // ],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: ENV.BASE_API + 'getEmployee.php',
                data: {
                    scope: 'inactive'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [{
                    orderable: false,
                    searchable: false,
                    className: "text-center",
                    data: "photo_url",
                    render: function(data, type, row) {
                        return '<img src="../' + data + '" class="img-avatar img-avatar32" />';
                    }
                }, {
                    className: "font-w600",
                    data: "nama",
                    render: function(data, type, row) {
                        return '<a data-id="' + row.nik + '" href="javascript:void(0)">' + data + '</a>';
                    }
                }, {
                    className: "text-center",
                    data: "nik"
                }, {
                    className: "text-center",
                    data: "termination_date",
                    render: function(data, type, row) {
                        return moment(data, "DD-MM-YYYY").format("D MMM YYYY");
                    }
                }, {
                    className: "text-center d-inline-block text-truncate",
                    data: "termination_reason"
                },
                {
                    className: "text-center",
                    data: null,
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-sm btn-default" type="button" id="btn-view-terminated"><i class="si si-eye"></i></button>' +
                            '<button class="btn btn-sm btn-default btn-remove-terminated" type="button"><i class="si si-trash"></i></button>' +
                            '</div>';
                    },
                    searchable: false,
                    orderable: false
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
            fnInitComplete: function() {
                // console.log("Table Terminated loaded!");
            }
        });

        // TABLE ACTIONS !!!
        // 
        // When employee NAME or TABLE'S VIEW button is clicked
        $('#table-terminated tbody').on('click', 'a, #btn-view-terminated', function() {
            var id = $(this).parents('tr').attr('data-id');
            viewData(id);
        });

        // When table-employee DELETE button is clicked
        $('#table-terminated tbody').on('click', '.btn-remove-terminated', function() {
            var id = $(this).parents('tr').attr('data-id');
            removeData(id);
        });
        // 
        // END TABLE ACTIONS
    };

    // init the page
    var initEmployeePage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            // Set active class for related menu
            $('#menu-karyawan').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            // Set the page title
            $('#header-title').html('<i class="si si-users push-10-r"></i>Data Karyawan');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            // 
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu', function(e) {
            e.preventDefault();
            if ($(this).attr('route') != undefined) window.location = ENV.BASE_URL + $(this).attr('route');
            return false;
        });

        // when button LOGOUT is clicked
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });


        // when tabs clicked
        $(document).on('click', '.main-tabs', function() {
            var t = $(this).attr('data');
            $('#hidden-active-type').val(t);
            switch (t) {
                case 'terminated':
                    window.initTableTerminated();
                    break;
                default:
                    window.initTableEmployee();
                    window.initFilter();
                    break;
            }
            $('#btn-add').attr('data-type', t);
        });


        // when ADD BUTTON is clicked
        $(document).on('click', '#btn-add', function() {
            $('#photo-container-edit').removeClass('hide-me');
            $('#photo-container-view').addClass('hide-me');
            $('#opened-profile').val("");

            if (renderProfileAdd()) {
                $('#modal-profile').modal({
                    show: true,
                    // keyboard: false,
                    backdrop: 'static'
                });

                $('select#[id^=input-]').select2();
            }
        });


        // =========================
        // MODAL ACTIONS !!!       
        // 
        // when GEAR button clicked
        $(document).on('click', '#btn-generate-profile', function() {
            generateRandomProfile();
        });

        // when modal CANCEL button clicked
        $(document).on('click', '#btn-cancel-profile', function() {
            var origin = $('#origin').val();
            if (origin == 'direct') {
                $('#modal-profile').modal('hide');
            } else {
                var id = $('#opened-profile').val();

                $.ajax({
                    type: "POST",
                    url: ENV.BASE_API + "getEmployeeById.php",
                    dataType: 'json',
                    data: {
                        id: id
                    }
                }).done(function(res) {
                    var data = res.data;

                    $('#photo-container-view').removeClass('hide-me');
                    $('#photo-container-edit').addClass('hide-me');

                    renderProfileView(data);
                });
            }
        });

        // When modal EDIT button is clicked
        $(document).on('click', '#btn-edit-profile', function() {
            var id = $('#opened-profile').val();

            $.ajax({
                type: "POST",
                url: ENV.BASE_API + "getEmployeeById.php",
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(res) {
                var data = res.data;
                renderProfileEdit(data);

                $('#photo-container-edit').removeClass('hide-me');
                $('#photo-container-view').addClass('hide-me');

                // Open the popup modal
                // $('#modal-profile').modal({
                //     show: true,
                //     // keyboard: false,
                //     backdrop: 'static'
                // });

                $('#origin').val('modal');
            });
        });

        // When modal TERMINATE button is clicked
        $(document).on('click', '#btn-terminate-profile', function() {
            swal({
                    title: "Peringatan!",
                    html: "Karyawan akan dipindahkan ke data \"Karyawan Non Aktif\".<br>Klik <strong>OK</strong> untuk melanjutkan.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok",
                    cancelButtonText: "Batal",
                    allowOutsideClick: false
                })
                .then(function(res) {
                    if (res) {
                        swal.close();
                        $('#modal-profile').modal('hide');

                        // Render termination elements
                        $('#modal-termination #profile-termination_date').html('');
                        $('#modal-termination #profile-termination_date').html(renderAddElement('datepicker', 'termination_date', 'Tanggal Terminasi', null, moment().format('DD-MM-YYYY')));
                        $('#modal-termination #profile-termination_reason').html('');
                        $('#modal-termination #profile-termination_reason').html(renderAddElement('textarea', 'termination_reason', 'Alasan Terminasi'));

                        initTerminationValidation();

                        App.initHelpers('datepicker');

                        $('#modal-termination').modal({
                            show: true,
                            backdrop: 'static',
                            keyboard: false
                        });
                    }
                })
                .catch(swal.noop);
        });


        // SELECTOR HANDLERS :::
        // when KODE_BAGIAN selector changed
        $(document).on('change', '#input-kode_bagian', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
                $('#input-division, #input-department, #input-section, #input-sub_section, #input-group').val('');
                generateSelectors(valueSelected);
            } else {
                // Clearing all selectors!
                $('#input-division, #input-department, #input-section, #input-sub_section, #input-group').val('').removeAttr('disabled');
            }
        });

        // when DIVISION selector changed
        $(document).on('change', '#input-division', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating DEPARTEMEN selector
            $.ajax({
                type: "POST",
                url: ENV.BASE_API + 'getSelectorData.php',
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

        // when DEPARTMENT selector changed
        $(document).on('change', '#input-department', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating SECTION selector
            $.ajax({
                type: "POST",
                url: ENV.BASE_API + 'getSelectorData.php',
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

        // when SECTION selector changed
        $(document).on('change', '#input-section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating SUB SECTION selector
            $.ajax({
                type: "POST",
                url: ENV.BASE_API + 'getSelectorData.php',
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

        // when SUB-SECTION selector changed
        $(document).on('change', '#input-sub_section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating GROUP selector
            $.ajax({
                type: "POST",
                url: ENV.BASE_API + 'getSelectorData.php',
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

        // when STATUS KARYAWAN selector changed
        $(document).on('change', '#input-status', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            var $containerMasaKontrak = $('#profile-masa-kontrak');
            var $containerTglKeluar = $('#profile-tgl-keluar');

            if (valueSelected != 'Tetap') {
                var html = '';
                $containerMasaKontrak.empty();
                $containerTglKeluar.empty();

                // Set default value for MASA_KONTRAK
                if (valueSelected == 'Percobaan') {
                    var label = 'Masa Percobaan';
                    var label_2 = 'Tgl Selesai Percobaan';
                    var value = 3;
                } else {
                    var label = 'Masa Kontrak';
                    var label_2 = 'Tgl Selesai Kontrak';

                    if (valueSelected == 'Kontrak 1') var value = 12;
                    else var value = 24;
                }

                html = renderAddElement('predefined-select', 'masa_kontrak', label, [{
                    label: "3 Bulan",
                    value: 3
                }, {
                    label: "6 Bulan",
                    value: 6
                }, {
                    label: "1 Tahun",
                    value: 12
                }, {
                    label: "18 Bulan",
                    value: 18
                }, {
                    label: "2 Tahun",
                    value: 24
                }], value);
                $containerMasaKontrak.append(html);

                // by default is 3 Months contract
                if ($('#input-tgl_masuk').val() != '') var t_masuk = $('#input-tgl_masuk').val();
                else var t_masuk = moment().format('DD-MM-YYYY');
                html = renderAddElement('datepicker', 'tgl_keluar', label_2, null, moment(t_masuk, 'DD-MM-YYYY').add(value, 'M').format('DD-MM-YYYY'));
                $containerTglKeluar.append(html);

            } else {
                $containerMasaKontrak.empty();
                $containerTglKeluar.empty();
            }

            // reinitiate Datepicker plugin
            App.initHelpers(['datepicker']);
        });

        // when MASA KERJA selector changed
        $(document).on('change', '#input-masa_kontrak', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;
            if ($('#input-tgl_masuk').val() != '') var t_masuk = $('#input-tgl_masuk').val();
            else var t_masuk = moment().format('DD-MM-YYYY');

            $('#input-tgl_keluar').val(moment(t_masuk, 'DD-MM-YYYY').add(valueSelected, 'M').format('DD-MM-YYYY'));
        });

        // when MASA KERJA selector changed
        $(document).on('change', '#input-tgl_masuk', function() {
            $('#input-masa_kontrak').trigger('change');
        });
        // END SELECTOR HANDLERS :::
        // 
        // END MODAL ACTIONS !!!
        // =========================


        // When STAT NUMBER is clicked
        $(document).on('click', 'a.stat-filter', function(e) {
            e.preventDefault();
            var data = $(this).attr('data');
            $('#input-filter-status').val(data).trigger('change');
        });

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';

        // Set default hidden-active-type
        $('#hidden-active-type').val('employee');
    };

    return {
        init: function() {
            set_base('employee');
            bsDataTables();
            initStat();
            window.initTableEmployee();
            window.initFilter();
            initEmployeePage();
            initUploader();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    // Main INIT
    BasePagesEmployee.init();

    $(window).on('load', function() {
        // Read current URL if there's any parameter given
        var params = url('?');
        if (params != undefined) {
            // console.log(params);
            $('select#input-filter-' + params.filter).val(params.value).trigger('change');
        }
    });
});
