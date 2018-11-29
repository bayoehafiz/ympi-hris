// Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
var initValidation = function(data_type) {
    switch (data_type) {
        case 'absence':
            var nama = 'Absensi';
            var rules = {
                'elem-jenis': {
                    required: true,
                },
                'elem-nama': {
                    required: true,
                },
                'elem-kode': {
                    required: true
                }
            }
            var messages = {
                'elem-jenis': 'Pilih Jenis Absensi',
                'elem-nama': 'Isikan Nama Absensi',
                'elem-kode': 'Isikan Kode'
            }
            break;
        default:
            var rules = {
                'elem-absence': {
                    required: true,
                },
                'elem-leave_period': {
                    required: true
                }
            }
            var messages = {
                'elem-absence': 'Pilih Jenis Cuti/Absensi',
                'elem-leave_period': 'Pilih Jangka Waktu'
            }
            break;
    }

    window.$validator = $('.js-validation-material').validate({
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
            var data = [];
            if ($('#input-potongan_cuti').length) {
                if ($('#input-potongan_cuti').is(':checked')) {
                    data.push({
                        "key": "potongan_cuti",
                        "value": 1
                    });
                } else {
                    data.push({
                        "key": "potongan_cuti",
                        "value": 0
                    });
                }
            }

            $('[id^="input-"]:not(#input-potongan_cuti)').filter(function() {
                var elem = this;
                // cleaning empty data [TEMP!]
                if (elem['value'] != '') {
                    return data.push({
                        "key": elem['id'].replace('input-', ''),
                        "value": elem['value']
                    });
                }
            });

            // Read current data-type and act-type
            if (window.modal_scope == 'add') {
                var api_url = ENV.BASE_API + 'addAbsenceData.php';
                var payload = {
                    data: data,
                    table: data_type
                };
                var msg = "Data berhasil ditambahkan";
            } else {
                var api_url = ENV.BASE_API + 'updateAbsenceData.php';
                var payload = {
                    data: data,
                    table: data_type,
                    id: window.opened_data
                };
                var msg = "Data berhasil di-update";
            }

            // Saving...
            // console.log("Saving...", payload);
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

                        if (data_type == 'absence') {
                            // reload the table
                            var table = $('#table-' + data_type).DataTable();
                            table.ajax.reload();
                        } else {
                            // reload the calendar
                            renderEmployeeDetails(window.searched_user);
                        }
                    } else {
                        swal("Error!", res.message, "error");
                    }

                }
            })
        }
    });
};
