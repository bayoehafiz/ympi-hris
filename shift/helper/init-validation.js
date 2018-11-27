// Init form validation
var initValidation = function(type) {
    if (type == 'shift') {
        var container = $('#form-modal');
        var rules = {
            'elem-nama': {
                required: true,
                minlength: 3
            },
            'elem-kode': {
                required: true
            },
            'elem-hari_efektif': {
                required: true
            },
            'elem-jam_masuk': {
                required: true
            },
            'elem-jam_keluar': {
                required: true,
            },
            'elem-awal_scan_masuk': {
                required: true
            },
            'elem-akhir_scan_masuk': {
                required: true
            },
            'elem-awal_scan_keluar': {
                required: true
            },
            'elem-akhir_scan_keluar': {
                required: true
            },
            'elem-override_shift': {
                required: "#input-override:checked"
            }
        }

        var messages = {
            'elem-nama': {
                required: 'Masukkan Nama',
                minlength: 'Minimal 3 karakter'
            },
            'elem-kode': 'Masukkan Kode',
            'elem-hari_efektif': 'Pilih minimal 1 hari',
            'elem-jam_masuk': 'Isikan jam masuk',
            'elem-jam_keluar': 'Isikan jam keluar',
            'elem-awal_scan_masuk': 'Isikan jam',
            'elem-akhir_scan_masuk': 'Isikan jam',
            'elem-awal_scan_keluar': 'Isikan jam',
            'elem-akhir_scan_keluar': 'Isikan jam',
            'elem-override_shift': 'Pilih Shift Yang Di-override'
        }
    } else if (type == 'group_shift') {
        var container = $('#form-modal');
        var rules = {
            'elem-nama': {
                required: true,
                minlength: 3
            },
            'elem-kode': {
                required: true
            },
            'elem-date': {
                required: true
            },
            'elem-shift': {
                required: true
            },
            'elem-schema': {
                required: true
            },
            'elem-assignation_key': {
                required: true
            },
            'elem-assignation_value': {
                required: function(element) {
                    return $("#input-assignation_key").val() != null || $("#input-assignation_key").val() != '';
                }
            }
        }

        var messages = {
            'elem-nama': {
                required: 'Masukkan Nama',
                minlength: 'Minimal 3 karakter'
            },
            'elem-kode': 'Masukkan Kode',
            'elem-shift': 'Pilih Shift',
            'elem-date': 'Pilih Tanggal Efektif',
            'elem-schema': 'Pilih Skema',
            'elem-assignation_key': 'Pilih Jenis Bagian',
            'elem-assignation_value': 'Pilih Unit'
        }

    } else {
        var container = $('#form-transfer-modal');
        var rules = {
            'elem-new_shift': {
                required: true
            }
        }
        var messages = {
            'elem-new_shift': 'Pilih Shift'
        }
    }

    // Run the plugin
    window.$validator = container.validate({ // save it in global var to call it later
        // debug: true,
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
        rules: rules,
        messages: messages,
        submitHandler: function(form) {
            // begin processing the data
            var data = [];

            // Compiling input HARI_EFEKTIF value
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

            // Compiling TRANSFERABLE chackbox value
            if ($('#input-transferable').length) {
                if ($('#input-transferable').prop('checked')) {
                    data.push({
                        "key": "transferable",
                        "value": 1
                    });
                } else {
                    data.push({
                        "key": "transferable",
                        "value": 0
                    });
                }
            }

            // Compiling OVERRIDE chackbox value
            if ($('#input-on_freeday').length) {
                if ($('#input-on_freeday').prop('checked')) {
                    data.push({
                        "key": "on_freeday",
                        "value": 1
                    });
                } else {
                    data.push({
                        "key": "on_freeday",
                        "value": 0
                    });
                }
            }

            // Compiling OVERRIDE chackbox value
            if ($('#input-override').length) {
                if ($('#input-override').prop('checked')) {
                    data.push({
                        "key": "override",
                        "value": 1
                    });
                } else {
                    data.push({
                        "key": "override",
                        "value": 0
                    });
                }
            }

            // compiling OVERRIDE_SHIFT values
            if ($('#input-override').prop('checked') && $('#input-override_shift').length) {
                var values = $('#input-override_shift').val();
                data.push({
                    "key": "override_shift",
                    "value": values.toString()
                });
            }

            // compiling ASSIGNATION_VALUE values
            if ($('#input-assignation_value').length) {
                var values = $('#input-assignation_value').val();
                if (values != null) {
                    data.push({
                        "key": "assignation_value",
                        "value": values.toString()
                    });
                }
            }

            // Compiling input values
            $('[id^="input-"]:not(#input-hari_efektif, #input-transferable, #input-on_freeday, #input-override, #input-override_shift, #input-assignation_value)').filter(function() {
                var elem = this;
                // cleaning empty data [TEMP!]
                if (elem['value'] != '') {
                    if (elem['id'] == "input-date") {
                        var $str = elem['value'];
                        var $arr = $str.split(" s/d ");

                        data.push({
                            "key": "date_from",
                            "value": moment($arr[0], 'DD-MM-YYYY').format('YYYY-MM-DD')
                        });

                        data.push({
                            "key": "date_to",
                            "value": moment($arr[1], 'DD-MM-YYYY').format('YYYY-MM-DD')
                        });

                        return data;
                    } else {
                        return data.push({
                            "key": elem['id'].replace('input-', ''),
                            "value": elem['value']
                        });
                    }
                }
            });

            // Read current act-type
            var act = window.modal_scope;
            if (act == 'add') { // if ADDING
                var api_url = ENV.BASE_API + 'addShiftData.php';
                var payload = {
                    data: data,
                    table: type
                };
                if (type == 'shift_transfer') var msg = "Shift berhasil ditransfer";
                else var msg = "Data berhasil ditambahkan";

            } else { // if EDITING
                var api_url = ENV.BASE_API + 'updateShiftData.php';
                var payload = {
                    data: data,
                    table: type,
                    id: window.opened_data.id
                };
                var msg = "Data berhasil di-update";
            }

            // Saving...
            // console.log("Sending...", api_url, payload);
            $.ajax({
                method: "POST",
                url: api_url,
                dataType: 'json',
                data: payload,
                success: function(res) {
                    if (res.success) {
                        $('#modal').modal('hide');
                        $.notify({
                            "icon": "fa fa-check-circle",
                            "message": msg
                        }, {
                            "type": "success"
                        })

                        // init stat
                        if (window.active_data == 'group_shift') window.initStat();

                        // reload the calendar
                        if (type == 'shift_transfer') {
                            renderEmployeeDetails(window.searched_user);
                            $('#transfer-modal').modal('hide');
                        }
                        // reload the table
                        else {
                            var table = $('#table-' + type.replace('_', '-')).DataTable();
                            table.ajax.reload();
                        }
                    } else {
                        swal("Error!", res.message, "error");
                    }

                }
            });
        }
    });

    return true;
};
