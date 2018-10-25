// Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
var initValidation = function(data_type) {
    switch (data_type) {
        case 'penugasan':
            var nama = 'Penugasan';
            var rules = {
                'elem-nama': {
                    required: true,
                    minlength: 3
                }
            };
            var messages = {
                'elem-nama': {
                    required: 'Isikan Nama ' + nama,
                    minlength: 'Minimal 3 karakter'
                }
            };
            break;
        default:
            var nama = 'Grade';
            var rules = {
                'elem-nama': {
                    required: true,
                    minlength: 3
                },
                'elem-kode': {
                    required: true,
                    minlength: 3
                }
            };
            var messages = {
                'elem-nama': {
                    required: 'Isikan Nama ' + nama,
                    minlength: 'Minimal 3 karakter'
                },
                'elem-kode': {
                    required: 'Isikan Kode ' + nama,
                    minlength: 'Minimal 3 karakter'
                }
            };
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

            console.log("sending data to table " + dType);

            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/addGradeData.php',
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
                        // reload the table & stat
                        var table = $('#table-' + dType.replace('_', '-')).DataTable();
                        table.ajax.reload();
                        initStat(table);
                    }

                }
            })
        }
    });
};
