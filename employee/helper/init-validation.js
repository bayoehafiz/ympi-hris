// Employee Form Validation
var initValidation = function() {
    // Function to send data
    var sendData = function(url, payload) {
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: payload,
            success: function(res) {
                if (res.status == 'err') {
                    swal("Error!", res.message, "error");
                } else {
                    $('#modal-profile').modal('hide');
                    $.notify({
                        "icon": "si si-check",
                        "message": "Data karyawan berhasil ditambahkan"
                    }, {
                        "type": "success"
                    });

                    // reload the stat
                    window.initStat();

                    // reinitiate table
                    var table = $('#table-employee').DataTable();
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
            'elem-no_rekening': 'Masukkan No. Rekening'
        },
        // When form on SUBMIT
        submitHandler: function(form) {
            var data = [];
            var tgl_masuk, status;
            var kode_bagian_changed = false;
            var old_kode_bagian = $('#opened-kode_bagian').val();

            // Read all FORM INPUTs
            $('[id^="input-"]').filter(function() {
                var elem = this;
                // exclude empty input
                if (elem['value'] != '') {
                    var key = elem['id'].replace('input-', '');
                    if (key == 'tgl_masuk' || key == 'tgl_keluar' || key == 'tgl_lahir') {
                        // format date into SQL format
                        elem['value'] = moment(elem['value'], 'DD-MM-YYYY').format('YYYY-MM-DD');
                        if (key == 'tgl_masuk') {
                            tgl_masuk = elem['value'] // save tgl_masuk for NIK generation
                        }
                    }

                    if (key == 'status') {
                        status = elem['value']; // save status for NIK generation
                    }

                    // if kode bagian is changed, mark it!
                    if ((key == 'kode_bagian') && (elem['value'] != old_kode_bagian)) {
                        kode_bagian_changed = true;
                    }

                    return data.push({
                        "key": key,
                        "value": elem['value']
                    });
                }
            });

            // Read current profile and decide whether it's ADD or EDIT
            var $id = $('#opened-profile').val();

            // if it is ADD
            if ($id == '') {
                var apiUrl = ENV.BASE_API + 'addEmployee.php';

                // then generate new NIK
                $.when(getLatestNik()).done(function(response) {
                    var year = moment(tgl_masuk, 'YYYY-MM-DD').year();
                    var short_year = moment(tgl_masuk, 'YYYY-MM-DD').format('YY');
                    var month = moment(tgl_masuk, 'YYYY-MM-DD').format('MM');

                    // Generate latest 4 digits
                    if (response.success) {
                        var latest = parseInt(response.data) + 1;
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
                    }
                    // else {
                    //     letter = "*";
                    // }

                    data.push({
                        "key": "pin",
                        "value": pin
                    }, {
                        "key": "nik",
                        "value": letter + short_year + month + pin
                    });

                    var payload = {
                        data: data,
                        nik: letter + short_year + month + pin // <- DON'T REMOVE THIS!!!
                    }

                    // Send the data !!!
                    sendData(apiUrl, payload);
                })

            } else { // if it is EDIT
                var apiUrl = ENV.BASE_API + 'updateEmployee.php';

                // if kode_bagian is changed
                if (kode_bagian_changed) {
                    // then call the ajax to wipe all bagians data
                    $.post(ENV.BASE_API + 'wipeEmployeeDiv.php', { id: $id });
                }

                // check if tgl_masuk is changed
                var old_tgl_masuk = $('#opened-tgl_masuk').val();
                var old_status = $('#opened-status').val();

                if ((old_tgl_masuk != tgl_masuk) || (old_status != status)) {
                    // generate new NIK
                    var year = moment(tgl_masuk, 'YYYY-MM-DD').year();
                    var short_year = moment(tgl_masuk, 'YYYY-MM-DD').format('YY');
                    var month = moment(tgl_masuk, 'YYYY-MM-DD').format('MM');
                    var pin = '';

                    // Get latest 4 digits from OLD NIK
                    var old_nik = $('#opened-nik').val();
                    if (status == 'Tetap') pin = old_nik.substring(5, 9);
                    else pin = old_nik.substring(4, 8);

                    // Generate the Year Letter
                    var letter = "";
                    if (status == 'Tetap') {
                        var match_obj = $letters.find(obj => {
                            return obj.year == year;
                        });
                        letter = match_obj.letter;
                    }
                    // else {
                    //     letter = "*";
                    // }

                    data.push({
                        "key": "pin",
                        "value": pin
                    }, {
                        "key": "nik",
                        "value": letter + short_year + month + pin
                    });
                }

                var payload = {
                    id: $id,
                    data: data
                };

                // Send the data !!!
                sendData(apiUrl, payload);

            }
        }
    });
};
