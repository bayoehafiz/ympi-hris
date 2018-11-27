// Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
var initValidation = function() {
    // Read current table type
    var $table = $('#hidden-active-type').val();

    switch ($table) {
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
                    minlength: 2
                }
            };
            var messages = {
                'elem-nama': {
                    required: 'Isikan Nama ' + nama,
                    minlength: 'Minimal 3 karakter'
                },
                'elem-kode': {
                    required: 'Isikan Kode ' + nama,
                    minlength: 'Minimal 2 karakter'
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

            // Read current id
            var $id = $('#hidden-opened-id').val();

            // Read the current scope (add OR edit)
            var $scope = $('#hidden-modal-scope').val();
            if ($scope == 'add') {
                var $apiUrl = ENV.BASE_API + 'addGradeData.php';
                var $payload = {
                    obj: data,
                    table: $table
                };
                var $text = 'Data berhasil ditambahkan';

            } else {
                var $apiUrl = ENV.BASE_API + 'updateGradeData.php';
                var $payload = {
                    id: $id,
                    data: data,
                    table: $table
                };
                var $text = 'Data berhasil diupdate';
            }

            $.ajax({
                type: "POST",
                url: $apiUrl,
                dataType: 'json',
                data: $payload,
                success: function(res) {
                    if (res.status == 'err') {
                        swal("Error!", res.message, "error");
                    } else {
                        $('#modal').modal('hide');
                        $.notify({
                            "icon": "fa fa-check-circle",
                            "message": $text
                        }, {
                            "type": "success"
                        })
                        // reload the table & stat
                        var table = $('#table-' + $table).DataTable();
                        table.ajax.reload();
                        // initStat(table);
                    }

                }
            })
        }
    });
};
