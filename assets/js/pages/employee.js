var BasePagesEmployee = function() {
    var initEmployeePage = function() {
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
        // Init an error alert on button click
        $.ajax({
            type: "GET",
            url: BASE_URL + '/php/api/getEmployeeNumber.php',
            dataType: 'json',
            success: function(res) {
                var data = res.data;
                var counter = 0;
                data.forEach(function(d) {
                    if (d.division == 'Finance Div') $('#total-finance').html(d.total);
                    if (d.division == 'HRGA Div') $('#total-hrga').html(d.total);
                    if (d.division == 'Production Div') $('#total-production').html(d.total);
                    if (d.division == 'Prod Engineering Div') $('#total-prod-engineering').html(d.total);
                    if (d.division == 'Prod Support Div') $('#total-prod-support').html(d.total);
                    counter += parseInt(d.total);
                })
                $('#total-karyawan').html(counter);
            }
        })
    };

    var initTable = function() {
        // Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
        var initValidation = function() {
            jQuery('.js-validation-material').validate({
                ignore: [],
                errorClass: 'help-block text-right animated fadeInDown',
                errorElement: 'div',
                errorPlacement: function(error, e) {
                    jQuery(e).parents('.form-group > div').append(error);
                },
                highlight: function(e) {
                    var elem = jQuery(e);

                    elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                    elem.closest('.help-block').remove();
                },
                success: function(e) {
                    var elem = jQuery(e);

                    elem.closest('.form-group').removeClass('has-error');
                    elem.closest('.help-block').remove();
                },
                rules: {
                    'elem-nama': {
                        required: true,
                        minlength: 3
                    },
                    'input-jabatan': {
                        required: true
                    },
                    'input-divisi': {
                        required: true
                    },
                    'input-status': {
                        required: true
                    },
                    'input-nik': {
                        required: true,
                        number: true
                    },
                    'input-department': {
                        required: true
                    },
                    'input-section': {
                        required: true
                    },
                    'input-sub_section': {
                        required: true
                    },
                    'input-group': {
                        required: true
                    },
                    'input-telepon': {
                        required: true,
                        phone: true
                    },
                    'input-ktp': {
                        required: true,
                        number: true
                    },
                    'val-npwp': {
                        required: true
                    }
                },
                messages: {
                    'elem-nama': {
                        required: 'Masukkan nama lengkap',
                        minlength: 'Minimal 3 karakter'
                    },
                    'input-jabatan': 'Masukkan Jabatan',
                    'input-divisi': 'Masukkan Divisi',
                    'input-status': 'Masukkan Status Karyawan (Tetap/Kontrak 1/Kontrak 2)',
                    'input-nik': {
                        required: 'Masukkan NIK',
                        number: 'Masukkan angka saja tanpa huruf'
                    },
                    'input-department': 'Masukkan Departemen',
                    'input-section': 'Masukkan Section',
                    'input-sub_section': 'Masukkan Sub Section',
                    'input-group': 'Masukkan Grup',
                    'input-telepon': 'Masukkan No. Telepon',
                    'input-ktp': {
                        required: 'Masukkan No. KTP',
                        number: 'Masukkan angka saja tanpa huruf'
                    },
                    'input-npwp': 'Masukkan NO. NPWP',
                }
            });
        };
        var renderEditingElement = function(type, data_name, placeholder, label, disabled) { // type = "text", "number", "textarea". "datepicker"
            if (disabled) var disabled = ' disabled';
            else var disabled = '';

            if (type == 'textarea') {
                var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<textarea class="form-control" id="input-' + placeholder + '" name="elem-' + placeholder + disabled + '">' + data_name + '</textarea>' +
                    '<label for="elem-' + data_name + '">' + label + '</label>' +
                    '</div></div>';
            } else if (type == 'datepicker') {
                var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<label class="col-md-4 control-label" for="elem-' + placeholder + '">' + label + '</label>' +
                    '<div class="col-md-6">' +
                    '<input class="js-datepicker form-control" type="text" id="input-' + placeholder + '" name="elem-' + placeholder + '" data-date-format="mm/dd/yy" placeholder="' + moment(data_name, 'DD-mm-YYYY').format('MM/DD/YY') + '">' +
                    '</div>' +
                    '</div></div>'
            } else {
                var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<input class="form-control" type="' + type + '" id="input-' + placeholder + '" name="elem-' + placeholder + '" value="' + data_name + '" placeholder="' + data_name + '"' + disabled + '>' +
                    '<label for="elem-' + placeholder + '">' + label + '</label>' +
                    '</div></div>';
            }

            initValidation();

            return elem;
        };

        var renderProfile = function(data) {
            $('#modal-title').html('Profil Karyawan');

            // hide/show (un)related buttons
            $('#btn-edit-profile, #btn-remove-profile, #btn-close-profile').removeClass('hide-me');
            $('#btn-save-profile, #btn-cancel-profile').addClass('hide-me');

            // Set value in modal
            $('#modal-nama').html(data.nama);
            $('#modal-jabatan').html(data.jabatan);
            $('#modal-divisi').html(data.division);

            $('#profile-status').html('<div class="text-muted">Status Karyawan</div>' + data.statusEdt);
            $('#profile-nik').html('<div class="text-muted">NIK</div>' + data.nik);
            $('#profile-department').html('<div class="text-muted">Departemen</div>' + data.department);
            $('#profile-section').html('<div class="text-muted">Section</div>' + data.section);
            $('#profile-sub-section').html('<div class="text-muted">Sub Section</div>' + data.subsection);
            $('#profile-group').html('<div class="text-muted">Grup</div>' + data.group);
            $('#profile-tgl-masuk').html('<div class="text-muted">Tanggal Masuk</div>' + moment(data.tgl_masuk, 'DD-mm-YYYY').format('DD MMMM YYYY'));
            $('#profile-masa-kerja').html('<div class="text-muted">Masa Kerja</div>' + parseInt(data.masa_kerja_thn) + " Thn " + parseInt(data.masa_kerja_bln) + " Bln");

            $('#profile-tempat-lahir').html('<div class="text-muted">Tempat Lahir</div>' + data.tempat_lahir);
            $('#profile-tgl-lahir').html('<div class="text-muted">Tanggal Lahir</div>' + moment(data.tgl_lahir, 'DD-mm-YYYY').format('DD MMMM YYYY') + " (" + parseInt(data.usia) + " Thn)");
            $('#profile-agama').html('<div class="text-muted">Agama</div>' + data.agama);
            $('#profile-jenis-kelamin').html('<div class="text-muted">Jenis Kelamin</div>' + data.jenis_kelamin);
            $('#profile-alamat-lengkap').html('<div class="text-muted">Alamat Lengkap</div>' + data.alamat_lengkap);
            $('#profile-alamat-domisili').html('<div class="text-muted">Alamat Domisili</div>' + data.alamat_domisili);
            $('#profile-status-keluarga').html('<div class="text-muted">Status Keluarga</div>' + data.status_keluarga);

            $('#profile-pendidikan').html('<div class="text-muted">Pendidikan</div>' + data.pendidikan);
            $('#profile-sekolah-universitas').html('<div class="text-muted">Sekolah / Universitas</div>' + data.sekolah_universitas);
            $('#profile-jurusan').html('<div class="text-muted">Jurusan</div>' + data.jurusan);

            $('#profile-telepon').html('<div class="text-muted">No. Telepon</div>' + data.telepon);
            $('#profile-no-ktp').html('<div class="text-muted">No. KTP</div>' + data.ktp);
            $('#profile-no-npwp').html('<div class="text-muted">No. NPWP</div>' + data.npwp);
            $('#profile-no-bpjstk').html('<div class="text-muted">No. BPJS TK</div>' + data.no_bpjstk);
            $('#profile-no-bpjskes').html('<div class="text-muted">No. BPJS Kes</div>' + data.no_bpjskes);
            $('#profile-no-jp').html('<div class="text-muted">No. JP</div>' + data.no_jp);
        };

        var renderProfileAdd = function() {
            $('#modal-title').html('Profil Karyawan - Tambah Data');

            // hide/show (un)related buttons
            $('#btn-edit-profile, #btn-remove-profile, #btn-close-profile').addClass('hide-me');
            $('#btn-save-profile, #btn-cancel-profile').removeClass('hide-me');

            // Set value in modal
            $('#modal-nama').html('<div class="form-material form-material-primary"><input class="form-control text-right font-s20" type="text" id="input-nama" name="material-color-primary" placeholder="Nama Lengkap"></div>');
            $('#modal-jabatan').html('<div class="form-material form-material-primary"><input class="form-control text-right" type="text" id="input-jabatan" name="material-color-primary" placeholder="Jabatan"></div>');
            $('#modal-divisi').html('<div class="form-material form-material-primary"><input class="form-control text-right" type="text" id="input-division" name="material-color-primary" placeholder="Divisi"></div>');

            $('#profile-status').html(renderEditingElement('text', '', 'status', 'Status Karyawan', false));
            $('#profile-nik').html(renderEditingElement('number', '', 'nik', 'NIK', false));
            $('#profile-department').html(renderEditingElement('text', '', 'department', 'Departemen', false));
            $('#profile-section').html(renderEditingElement('text', '', 'section', 'Section', false));
            $('#profile-sub-section').html(renderEditingElement('text', '', 'subsection', 'Sub Section', false));
            $('#profile-group').html(renderEditingElement('text', '', 'group', 'Grup', false));
            $('#profile-tgl-masuk').html(renderEditingElement('text', '', 'tgl_masuk', 'Tanggal Masuk', false));
            $('#profile-masa-kerja').html('');

            $('#profile-tempat-lahir').html(renderEditingElement('text', '', 'tempat_lahir', 'Tempat Lahir', false));
            $('#profile-tgl-lahir').html(renderEditingElement('text', '', 'tgl_lahir', 'Tanggal Lahir', false));
            $('#profile-agama').html(renderEditingElement('text', '', 'agama', 'Agama', false));
            $('#profile-jenis-kelamin').html(renderEditingElement('text', '', 'jenis_kelamin', 'Jenis Kelamin', false));
            $('#profile-alamat-lengkap').html(renderEditingElement('textarea', '', 'alamat_lengkap', 'Alamat Lengkap', false));
            $('#profile-alamat-domisili').html(renderEditingElement('textarea', '', 'alamat_domisili', 'Alamat Domisili', false));
            $('#profile-status-keluarga').html(renderEditingElement('text', '', 'status_keluarga', 'Status Keluarga', false));

            $('#profile-pendidikan').html(renderEditingElement('text', '', 'pendidikan', 'Pendidikan', false));
            $('#profile-sekolah-universitas').html(renderEditingElement('text', '', 'sekolah_universitas', 'Sekolah / Universitas', false));
            $('#profile-jurusan').html(renderEditingElement('text', '', 'jurusan', 'Jurusan', false));

            $('#profile-telepon').html(renderEditingElement('text', '', 'telepon', 'No. Telepon', false));
            $('#profile-no-ktp').html(renderEditingElement('number', '', 'ktp', 'No. KTP', false));
            $('#profile-no-npwp').html(renderEditingElement('text', '', 'npwp', 'No. NPWP', false));
            $('#profile-no-bpjstk').html(renderEditingElement('text', '', 'no_bpjstk', 'No. BPJS TK', false));
            $('#profile-no-bpjskes').html(renderEditingElement('text', '', 'no_bpjskes', 'No. BPJS Kes', false));
            $('#profile-no-jp').html(renderEditingElement('text', '', 'no_jp', 'No. JP', false));
        };

        var renderProfileEdit = function(data) {
            $('#modal-title').html('Profil Karyawan - Ubah Data');

            // hide/show (un)related buttons
            $('#btn-edit-profile, #btn-remove-profile, #btn-close-profile').addClass('hide-me');
            $('#btn-save-profile, #btn-cancel-profile').removeClass('hide-me');

            // Set value in modal
            $('#modal-nama').html('<div class="form-material form-material-primary"><input class="form-control text-right font-s20" type="text" id="input-nama" name="material-color-primary" placeholder="' + data.nama + '" value="' + data.nama + '"></div>');
            $('#modal-jabatan').html(data.jabatan);
            $('#modal-divisi').html(data.division);

            $('#profile-status').html(renderEditingElement('text', data.status, 'status', 'Status Karyawan', false));
            $('#profile-nik').html(renderEditingElement('number', data.nik, 'nik', 'NIK', false));
            $('#profile-department').html(renderEditingElement('text', data.department, 'department', 'Departemen', false));
            $('#profile-section').html(renderEditingElement('text', data.section, 'section', 'Section', false));
            $('#profile-sub-section').html(renderEditingElement('text', data.subsection, 'subsection', 'Sub Section', false));
            $('#profile-group').html(renderEditingElement('text', data.group, 'group', 'Grup', false));
            $('#profile-tgl-masuk').html(renderEditingElement('text', data.tgl_masuk, 'tgl_masuk', 'Tanggal Masuk', false));
            $('#profile-masa-kerja').html('');

            $('#profile-tempat-lahir').html(renderEditingElement('text', data.tempat_lahir, 'tempat_lahir', 'Tempat Lahir', false));
            $('#profile-tgl-lahir').html(renderEditingElement('text', data.tgl_lahir, 'tgl_lahir', 'Tanggal Lahir', false));
            $('#profile-agama').html(renderEditingElement('text', data.agama, 'agama', 'Agama', false));
            $('#profile-jenis-kelamin').html(renderEditingElement('text', data.jenis_kelamin, 'jenis_kelamin', 'Jenis Kelamin', false));
            $('#profile-alamat-lengkap').html(renderEditingElement('textarea', data.alamat_lengkap, 'alamat_lengkap', 'Alamat Lengkap', false));
            $('#profile-alamat-domisili').html(renderEditingElement('textarea', data.alamat_domisili, 'alamat_domisili', 'Alamat Domisili', false));
            $('#profile-status-keluarga').html(renderEditingElement('text', data.status_keluarga, 'status_keluarga', 'Status Keluarga', false));

            $('#profile-pendidikan').html(renderEditingElement('text', data.pendidikan, 'pendidikan', 'Pendidikan', false));
            $('#profile-sekolah-universitas').html(renderEditingElement('text', data.sekolah_universitas, 'sekolah_universitas', 'Sekolah / Universitas', false));
            $('#profile-jurusan').html(renderEditingElement('text', data.jurusan, 'jurusan', 'Jurusan', false));

            $('#profile-telepon').html(renderEditingElement('text', data.telepon, 'telepon', 'No. Telepon', false));
            $('#profile-no-ktp').html(renderEditingElement('number', data.ktp, 'ktp', 'No. KTP', false));
            $('#profile-no-npwp').html(renderEditingElement('text', data.npwp, 'npwp', 'No. NPWP', false));
            $('#profile-no-bpjstk').html(renderEditingElement('text', data.no_bpjstk, 'no_bpjstk', 'No. BPJS TK', false));
            $('#profile-no-bpjskes').html(renderEditingElement('text', data.no_bpjskes, 'no_bpjskes', 'No. BPJS Kes', false));
            $('#profile-no-jp').html(renderEditingElement('text', data.no_jp, 'no_jp', 'No. JP', false));
        };

        // Table initiation
        var table = $('.js-dataTable-full').DataTable({
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
                url: BASE_URL + '/php/api/getEmployee.php',
                dataSrc: function(json) {
                    var data = json.data;
                    var resultData = [];
                    data.forEach(function(x) {
                        // Manipulate result data
                        x.namaEdt = '<a data-id="' + x.nik + '" href="javascript:void(0)">' + x.nama + '</a>'
                        if (x.status == "Tetap") x.statusEdt = '<span class="label label-success">' + x.status + '</span>';
                        else if (x.status == "Kontrak 1") x.statusEdt = '<span class="label label-danger">' + x.status + '</span>';
                        else if (x.status == "Kontrak 2") x.statusEdt = '<span class="label label-warning">' + x.status + '</span>';
                        else x.statusEdt = '<span class="label label-default">' + x.status + '</span>';

                        resultData.push(x);
                    })

                    return resultData;
                }
            },
            deferRender: true,
            columns: [
                { data: "nik" },
                { className: "font-w600", data: "namaEdt" },
                { className: "hidden-xs", data: "division" },
                { className: "hidden-xs", data: "department" },
                { className: "hidden-xs", data: "statusEdt" },
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

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            $('#modal-profile').modal('show');
            renderProfileAdd();
            $('#opened-profile').val("");
        })

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

        // When DELETE button is clicked
        $(document).on()
    }

    return {
        init: function() {
            sweetAlert();
            initStat();
            initTable();
            initEmployeePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesEmployee.init(); });
