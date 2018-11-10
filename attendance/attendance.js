var BasePagesAttendance = function() {
    var initAttendancePage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");
            // Set active class for related menu
            $('#menu-attendance').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
            // Set the page title
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-ban">&nbsp;&nbsp;</i>DATA ABSENSI</h3>');
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
                case 'employee_attendance':
                    $('#btn-add').attr('data', 'Absensi Karyawan');
                    // initTableEmployeeAttendance();
                    break;
                default:
                    $('#btn-add').attr('data', 'Absensi');
                    initTableAttendance();
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
                case "attendance":
                    html += renderAddElement('text', 'kode', 'Kode', 4);
                    html += renderAddElement('text', 'jenis', 'Jenis Absensi / Cuti', 8);
                    html += renderAddElement('textarea', 'keterangan', 'Keterangan', 12);
                    html += renderAddElement('check', 'potongan_cuti', 'Potongan Cuti?', 6);
                    break;
                default:
                    break;
            }

            $('#modal-title').html('Tambah Data: ' + data_type);
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
            initValidation(data_type);

            // set the action type
            $('#act-type').val('add');
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
                data_type = $(this).attr('data-active-type');
                $('#hidden-type').val(data_type);
                console.log(data_type);

                switch (data_type) {
                    case "attendance":
                        html += renderEditElement('text', 'kode', 'Kode', data.kode, 4);
                        html += renderEditElement('text', 'jenis', 'Jenis Absensi / Cuti', data.jenis, 8);
                        html += renderEditElement('textarea', 'keterangan', 'Keterangan', data.keterangan, 12);
                        html += renderEditElement('check', 'potongan_cuti', 'Potongan Cuti?', data.potongan_cuti, 6);
                        break;
                    default:
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
                initValidation(data_type);

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
                                url: BASE_URL + "/php/api/deleteAttendanceData.php",
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

        // when modal on close
        $('#modal').on('hidden.bs.modal', function() {
            console.log('Destroying validator and resetting elements...');
            window.$validator.destroy();

            // reset all elements
            $('[id^=input-]').html('').empty();

            // hide all hidden elements
            $('[id^=hidden-]').addClass('hide-me');
        })

        // set default hidden value for ACTIVE type
        $('#hidden-active-type').val('attendance');

        // Lets init our first table :: Attendance Table
        initTableAttendance();

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';
    };

    var initStat = function(type) {
        // clear the container first
        var container = $('#stat-attendance');
        container.empty();
        // Get division datas
        $.ajax({
            type: "POST",
            url: BASE_URL + '/php/api/getAttendanceStat.php',
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

    var initTableAttendance = function() {
        // init table BS style
        bsDataTables();

        // Table initiation
        var table = $('#table-attendance').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
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
                url: BASE_URL + '/php/api/getAttendance.php',
                data: {
                    table: 'attendance'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "text-center", data: "kode" },
                { className: "font-w600", data: "jenis" },
                {
                    className: "text-center",
                    data: "potongan_cuti",
                    render: function(data, type, row) {
                        if (data == 1) return '<i class="fa fa-lg fa-check text-success"></i>';
                        else return '<i class="fa fa-lg fa-close text-muted"></i>'
                    }
                },
                { data: "keterangan" },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success">Aktif</span>';
                        else return '<span class="label label-default">Non Aktif</span>';
                    }
                },
                {
                    data: null,
                    className: "text-center",
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" act="switch"><i class="fa fa-exchange"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    return {
        init: function() {
            initStat('attendance');
            initAttendancePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    // BASE_URL generator
    var $URL = document.URL;
    if (url('1', $URL) != 'attendance') {
        window.BASE_URL = url('protocol', $URL) + '://' + url('hostname', $URL) + '/' + url('1', $URL);
    } else {
        window.BASE_URL = url('protocol', $URL) + '://' + url('hostname', $URL);
    }

    BasePagesAttendance.init();
});
