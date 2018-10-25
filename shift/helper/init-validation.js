// Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
var initValidation = function(type) {
    if (type == 'shift') {
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
            }
        }

        var messages = {
            'elem-nama': {
                required: 'Masukkan Nama',
                minlength: 'Minimal 3 karakter'
            },
            'elem-kode': 'Masukkan Kode',
            'elem-hari_efektif': 'Pilih minimal 1 hari efektif',
            'elem-jam_masuk': 'Isikan jam masuk',
            'elem-jam_keluar': 'Isikan jam keluar',
            'elem-awal_scan_masuk': 'Isikan jam awal scan masuk',
            'elem-akhir_scan_masuk': 'Isikan jam akhir scan masuk',
            'elem-awal_scan_keluar': 'Isikan jam awal scan keluar',
            'elem-akhir_scan_keluar': 'Isikan jam akhir scan keluar'
        }

    } else {
        var rules = {
            'elem-nama': {
                required: true,
                minlength: 3
            },
            'elem-kode': {
                required: true
            },
            'elem-shift': {
                required: true
            },
            'elem-assignation_key': {
                required: true
            },
            'elem-date': {
                required: true
            }
        }

        var messages = {
            'elem-nama': {
                required: 'Masukkan Nama',
                minlength: 'Minimal 3 karakter'
            },
            'elem-kode': 'Masukkan Kode',
            'elem-shift': 'Pilih Shift',
            'elem-assignation_key': 'Pilih Dept/Sect/Sub Sect/Grup',
            'elem-date': 'Pilih Tanggal Efektif'
        }
    }

    // Run the plugin
    window.$validator = $('.js-validation-material').validate({ // save it in global var to call it later
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
        rules: rules,
        messages: messages,
        submitHandler: function(form) {
            // begin processing the data
            var data = [];
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

            $('[id^="input-"]:not(#input-hari_efektif)').filter(function() {
                var elem = this;
                // cleaning empty data [TEMP!]
                if (elem['value'] != '') {
                    if (elem['id'] == "input-date") {
                        var $str = elem['value'];
                        var $arr = $str.split(" - ");

                        data.push({
                            "key": "date_from",
                            "value": moment($arr[0], 'MM/DD/YYYY').format('DD-MM-YYYY')
                        });

                        data.push({
                            "key": "date_to",
                            "value": moment($arr[1], 'MM/DD/YYYY').format('DD-MM-YYYY')
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

            // Read current data-type and act-type
            var dType = $('#hidden-active-type').val(); // target table
            var actType = $('#act-type').val();
            if (actType == 'add') { // if ADDING NEW DATA
                var api_url = BASE_URL + '/php/api/addShiftData.php';

                // add random color for drag & drop shifts
                // data.push({
                //     key: "color",
                //     value: generateColor()
                // })

                var payload = {
                    data: data,
                    table: dType
                };

                var msg = "Data berhasil ditambahkan";

            } else { // if EDITING EXISTING DATA
                var api_url = BASE_URL + '/php/api/updateShiftData.php';
                var payload = {
                    data: data,
                    table: dType,
                    id: $('#data-id').val()
                };

                var msg = "Data berhasil di-update";
            }

            // Saving...
            console.log("Saving...", payload);
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
                        // reload the table
                        var table = $('#table-' + dType.replace('_', '-')).DataTable();
                        table.ajax.reload();
                    } else {
                        swal("Error!", res.message, "error");
                    }

                }
            })
        }
    });
};
