var BasePagesDivision = function() {
    var initDivisionPage = function() {
        // Logout button
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });

        // Function to render elements inside the modal :: ADD
        var renderAddElement = function(type, name, label) {
            var elem = '';

            if (type == 'select') {
                // reset the selct elemnt first
                $('#input-parent').empty();

                // get the source DB table to populate parent's select
                if (label == 'Divisi Induk') var source_table = 'division';
                else if (label == 'Departemen Induk') var source_table = 'department';
                else if (label == 'Section Induk') var source_table = 'section';
                else var source_table = 'sub_section';

                $.ajax({
                    type: "POST",
                    url: BASE_URL + '/php/api/getDivisionData.php',
                    dataType: 'json',
                    data: {
                        table: source_table
                    }
                }).done(function(res) {
                    if (res.status == 'ok') {
                        var data = res.data;

                        $('#hidden-select').removeClass('hide-me');
                        $('#input-parent').append('<option></option>');
                        $('#label-parent').html(label);

                        data.forEach(function(v) {
                            $('#input-parent').append('<option value="' + v.id + '">' + v.nama + '</option>')
                        })
                    }
                })
            } else {
                elem += '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
                    '<label for="elem-' + name + '">' + label + '</label>' +
                    '</div></div>';
            }

            // console.log(elem);
            return elem;
        };

        // set default hidden value for ACTIVE type
        $('#hidden-active-type').val('division');

        // when tabs clicked
        $(document).on('click', '.tab-btn', function() {
            var t = $(this).attr('data');
            $('#hidden-active-type').val(t);
            switch (t) {
                case 'department':
                    initTableDepartment();
                    break;
                case 'section':
                    initTableSection();
                    break;
                case 'sub_section':
                    initTableSubSection();
                    break;
                case 'group':
                    initTableGroup();
                    break;
                default:
                    initTableDivision();
                    break;
            }
        })

        // when ADD button is clicked
        $(document).on('click', '.btn-add', function() {
            // reset the modal first!
            $('#modal-title, #generated-container').html('');
            $('#hidden-select').addClass('hide-me');

            var html = '';
            data_type = $(this).attr('data-type');
            $('#hidden-type').val(data_type);

            switch (data_type) {
                case "department":
                    html += renderAddElement('text', 'nama', 'Nama Departemen');
                    html += renderAddElement('text', 'kode', 'Kode Departemen');
                    html += renderAddElement('select', 'parent', 'Divisi Induk');
                    break;
                case "section":
                    html += renderAddElement('text', 'nama', 'Nama Section');
                    html += renderAddElement('text', 'kode', 'Kode Section');
                    html += renderAddElement('select', 'parent', 'Departemen Induk');
                    break;
                case "sub_section":
                    html += renderAddElement('text', 'nama', 'Nama Sub Section');
                    html += renderAddElement('select', 'parent', 'Section Induk');
                    break;
                case "group":
                    html += renderAddElement('text', 'nama', 'Nama Grup');
                    html += renderAddElement('select', 'parent', 'Sub Section induk');
                    break;
                default:
                    html += renderAddElement('text', 'nama', 'Nama Divisi');
                    html += renderAddElement('text', 'kode', 'Kode Divisi');
            }

            $('#modal-title').html('Tambah Data ' + data_type);
            $('#generated-container').html(html);

            // hide unrelated buttons
            $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
            $('#modal').modal('show');
        });

        // When SAVE button is clicked
        $(document).on('submit', '#form-modal', function(e) {
            e.preventDefault();

            //$('#profile-form').validate(); // <- This one is not working!

            var data = [];
            $('[id^="input-"]').filter(
                function() {
                    var elem = this;
                    // cleaning empty data [TEMP!]
                    if (elem['value'] != '') {
                        return data.push({
                            "key": elem['id'].replace('input-', ''),
                            "value": elem['value']
                        });
                    }
                });

            // Read current data type
            var dType = $('#hidden-active-type').val();

            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/addDivisionData.php',
                dataType: 'json',
                data: {
                    obj: data,
                    table: dType
                },
                success: function(res) {
                    if (res.status == 'err') {
                        swal("Error!", res.message, "error");
                    } else {
                        $('#modal').modal('hide');
                        $.notify({
                            "icon": "fa fa-check-circle",
                            "message": "Data berhasil ditambahkan"
                        }, {
                            "type": "success"
                        })
                        // reload the table
                        var table = $('#table-' + dType.replace('_', '-')).DataTable(); // in case we got "sub_section" instead of "sub-section"
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
                // 
            } else if (act == 'remove') { // remove the data
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
                                url: BASE_URL + "/php/api/deleteDivisionData.php",
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
                                    var table = $('#table-' + dType.replace("_", "-")).DataTable(); // in case we got "sub_section" instead of "sub-section"
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    },
                    allowOutsideClick: false
                })
            } else { // set active / non-active status
                var current_status = data.active;
                if (current_status == 1) {
                    var txt = "Set " + data.nama.toUpperCase() + " menjadi non-aktif?";
                } else {
                    var txt = "Set " + data.nama.toUpperCase() + " menjadi aktif?";
                }

                swal({
                    title: "Konfirmasi",
                    text: txt,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ya",
                    cancelButtonText: "Batal",
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                        var dType = $('#hidden-active-type').val();
                        $.ajax({
                                type: "POST",
                                url: BASE_URL + "/php/api/updateDivisionDataStatus.php",
                                dataType: 'json',
                                data: {
                                    id: data.id,
                                    table: dType,
                                    status: current_status
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
                                    var table = $('#table-' + dType.replace("_", "-")).DataTable(); // in case we got "sub_section" instead of "sub-section"
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

        // Lets init our first table :: Division Table
        initTableDivision();
    };

    var sweetAlert = function() {
        // Init an error alert on button click
        $('.js-swal-error').on('click', function() {
            swal('Oops...', 'Sedang dalam pengembangan!', 'warning');
        });
    };

    var initStat = function() {
        // Function for rendering division stat
        var renderStat = function(data) {
            // set the width of the column
            var html = '';
            var data_length = data.length;
            if (data_length > 0) {
                var wCounter = parseInt(12 / data_length);
                data.forEach(function(d) {
                    html += '<div class="col-xs-' + wCounter + ' col-sm-2">' +
                        '<div class="font-w700 text-gray-darker animated fadeIn">Finance</div>' +
                        '<span class="h2 font-w300 text-primary animated flipInX" id="total-finance"></span>' +
                        '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>';
                });
            }

            return html;
        }

        // Get division datas
        $.ajax({
            type: "GET",
            url: BASE_URL + '/php/api/getDivisionNumber.php',
            dataType: 'json',
            success: function(res) {
                if (res.status == 'ok') {
                    var data = res.data;
                } else {
                    var data = [];
                }
                var elem = renderStat(data)
                $('#stat-divisi').html(elem);
            }
        })
    };

    var initTableDivision = function() {
        // Table initiation
        var table = $('#table-division').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'division'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data divisi kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
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
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "kode" },
                { className: "hidden-xs text-center", data: "child" },
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
                           // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableDepartment = function() {
        // Table initiation
        var table = $('#table-department').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'department'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data department kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
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
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "kode" },
                { className: "hidden-xs text-center", data: "child"},
                { className: "hidden-xs", data: "parent"},
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
                           // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableSection = function() {
        // Table initiation
        var table = $('#table-section').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'section'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data section kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
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
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "kode" },
                { className: "hidden-xs text-center", data: "child" },
                { className: "hidden-xs", data: "parent" },
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
                           // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableSubSection = function() {
        // Table initiation
        var table = $('#table-sub-section').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'sub_section'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data sub-section kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
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
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "child", },
                { className: "hidden-xs", data: "parent" },
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
                           // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableGroup = function() {
        // Table initiation
        var table = $('#table-group').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'group'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data group kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
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
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs", data: "parent" },
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
                           // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    return {
        init: function() {
            sweetAlert();
            initStat();
            initDivisionPage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesDivision.init(); });
