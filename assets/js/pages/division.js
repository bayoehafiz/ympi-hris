var BasePagesDivision = function() {
    var initDivisionPage = function() {
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });
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
    }

    var initTableDivision = function() {
        // Function to render elements inside the modal :: ADD
        var renderAddElement = function(type, name, label) {
            if (type == 'select') {
                var elem = '<div class="form-group"><div class="form-material form-material-primary floating push-30">' +
                    '<textarea class="form-control" id="input-' + name + '" name="elem-' + name + '"></textarea>' +
                    '<label for="elem-' + name + '">' + label + '</label>' +
                    '</div></div>';
            } else {
                var elem = '<div class="form-group"><div class="form-material form-material-primary floating push-30">' +
                    '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
                    '<label for="elem-' + name + '">' + label + '</label>' +
                    '</div></div>';
            }
            //initValidation(); // <-- not working!
            return elem;
        };

        // when ADD button is clicked
        $(document).on('click', '.btn-add', function() {
            // reset the modal first!
            $('#modal-content').html('');

            var html = '';
            data_type = $(this).attr('data');

            switch (data_type) {
                case "Departemen":
                    html += renderAddElement('input', 'nama', 'Nama Departemen');
                    html += renderAddElement('input', 'kode', 'Kode Departemen');
                    html += renderAddElement('select', 'parent', 'Divisi Induk');
                    break;
                case "Section":
                    html += renderAddElement('input', 'nama', 'Nama Section');
                    html += renderAddElement('input', 'kode', 'Kode Section');
                    html += renderAddElement('select', 'parent', 'Departemen Induk');
                    break;
                case "Sub Section":
                    html += renderAddElement('input', 'nama', 'Nama Sub Section');
                    html += renderAddElement('select', 'parent', 'Section Induk');
                    break;
                case "Grup":
                    html += renderAddElement('input', 'nama', 'Nama Grup');
                    html += renderAddElement('select', 'parent', 'Sub Section induk');
                    break;
                default:
                    html += renderAddElement('input', 'nama', 'Nama Divisi');
                    html += renderAddElement('input', 'kode', 'Kode Divisi');
            }

            $('#modal-title').html('Tambah Data ' + data_type);
            $('#modal-content').html(html);
            // hide unrelated buttons
            $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
            $('#modal').modal('show');
        })

        // Table initiation
        var table = $('#table-division').DataTable({
            order: [
                [0, "asc"]
            ],
            columnDefs: [{ orderable: true }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                dataSrc: function(response) {
                    if (response.status == 'ok') {
                        var data = response.data;
                        var resultData = [];
                        data.forEach(function(x) {
                            resultData.push(x);
                        })
                        return resultData;
                    } else {
                        $.notify({
                            "message": "Data divisi kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    }
                }
            },
            deferRender: true,
            columns: [
                { data: "id" },
                { className: "font-w600", data: "nama" },
                { className: "hidden-xs", data: "created" },
                { className: "hidden-xs", data: "updated" },
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

        // When employee name is clicked
        $('.js-dataTable-full tbody').on('click', 'a, #btn-view', function() {
            var data = table.row($(this).parents('tr')).data();

            // Open the popup modal
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.nik);

            renderProfile(data);

            // Edit profile button
            $('#btn-edit-profile').click(function() {
                renderProfileEdit(data);
                $('#origin').val('modal');
            });

            // When Cancelling editing
            $('#btn-cancel-profile').on('click', function() {
                var origin = $('#origin').val();
                if (origin == 'modal') {
                    renderProfile(data);
                }
            });

            // When DELETE button is clicked
            $('#btn-remove-profile').on('click', function() {
                swal({
                    title: "Konfirmasi",
                    text: "Yakin akan menghapus data karyawan?",
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
                                        nik: $('#opened-profile').val()
                                    }
                                }).done(function(response) {
                                    if (response.status == 'err') {
                                        swal('Error', response.message, 'error');
                                    } else {
                                        swal('Selesai', response.message, 'success');
                                        $('#modal-profile').modal('hide');
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
                })
            })
        });

        // when CANCEL button clicked
        $(document).on('click', '#btn-cancel-profile', function() {
            var origin = $('#origin').val();
            if (origin != 'modal') {
                $('#modal-profile').modal('hide');
            }
        })

        // When EDIT button is clicked
        $(document).on('click', '.btn-edit', function() {
            var $btn = $(this);
            var $tr = $btn.closest('tr');
            var dataTableRow = table.row($tr[0]);
            var data = dataTableRow.data();
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.nik);
            renderProfileEdit(data);

            $('#origin').val('direct');
        });

        // When SAVE button is clicked
        $(document).on('submit', '#profile-form', function(e) {
            e.preventDefault();

            $('#profile-form').validate(); // <- This one is not working!

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

            // Read current profile
            var cProf = $('#opened-profile').val();
            if (cProf == '') var apiUrl = BASE_URL + '/php/api/addEmployee.php';
            else var apiUrl = BASE_URL + '/php/api/updateEmployee.php';

            $.ajax({
                type: "POST",
                url: apiUrl,
                dataType: 'json',
                data: {
                    obj: data,
                    nik: $('#opened-profile').val()
                },
                success: function(res) {
                    if (res.status == 'err') {
                        swal("Error!", res.message, "error");
                    } else {
                        $('#modal-profile').modal('hide');
                        swal("Berhasil!", "Data karyawan berhasil disimpan", "success");
                        // reload the table
                        table.ajax.reload();
                    }

                }
            })
        });
    }

    return {
        init: function() {
            sweetAlert();
            initStat();
            initTableDivision();
            initDivisionPage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesDivision.init(); });
