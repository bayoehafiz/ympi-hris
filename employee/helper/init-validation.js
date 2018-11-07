// Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
var initValidation = function() {
    // Function to send data
    var sendData = function(payload) {
        $.ajax({
            type: "POST",
            url: apiUrl,
            dataType: 'json',
            data: payload,
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

                    // reinitiate table
                    table.ajax.reload();
                }

            }
        });
    }

    // Begin validation process
    $('#profile-form').validate({
        debug: true,
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
            'elem-jabatan': {
                required: true
            },
            'elem-division': {
                required: true
            },
            'elem-status': {
                required: true
            },
            'elem-grade': {
                required: true
            },
            'elem-tgl_masuk': {
                required: true
            },
            'elem-no_telepon': {
                required: true
            },
            'elem-no_ktp': {
                required: true
            },
            'elem-no_rekening': {
                required: true
            },
            'elem-no_npwp': {
                required: true
            }
        },
        messages: {
            'elem-nama': {
                required: 'Masukkan Nama Lengkap',
                minlength: 'Minimal 3 karakter'
            },
            'elem-jabatan': 'Pilih Jabatan',
            'elem-division': 'Pilih Divisi',
            'elem-department': 'Pilih Departemen',
            'elem-section': 'Pilih Section',
            'elem-sub_section': 'Pilih Sub Section',
            'elem-group': 'Pilih Grup',
            'elem-grade': 'Pilih Grade',
            'elem-penugasan': 'Pilih Penugasan',
            'elem-status': 'Pilih Status Karyawan',
            'elem-tgl_masuk': 'Pilih Tanggal',
            'elem-no_telepon': 'Masukkan No. Telepon',
            'elem-no_ktp': 'Masukkan No. KTP',
            'elem-no_rekening': 'Masukkan No. Rekening',
            'elem-no_npwp': 'Masukkan No. NPWP',
        },
        // When form on SUBMIT
        submitHandler: function(form) {
            var data = [];
            var tgl_masuk, status;

            // Read all FORM INPUTs
            $('[id^="input-"]').filter(
                function() {
                    var elem = this;
                    // exclude empty input
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

            // Read current profile and decide whether it's ADD or EDIT
            var cProf = $('#opened-profile').val();
            if (cProf == '') {
                var $act = 'add';
                var apiUrl = BASE_URL + '/php/api/addEmployee.php';
            } else {
                var $act = 'edit';
                var apiUrl = BASE_URL + '/php/api/updateEmployee.php';
            }

            // if $act is ADD
            if ($act == 'add') {
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

                    var payload = {
                        data: data,
                        new_nik: new_nik,
                        id: $('#opened-profile').val()
                    }

                    // Send the data !!!
                    sendData(payload);
                });

            } else { // if $act is EDIT
                // read current employee's data
                var current_data = table()
            }

        }
    });
};
