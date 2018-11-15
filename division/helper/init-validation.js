// Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
window.initValidation = function(data_type) {
    switch (data_type) {
        case 'division':
            var nama = 'Divisi';
            var parent = '';
            var rules = {
                'elem-nama': {
                    required: true,
                    minlength: 2
                }
            };
            var messages = {
                'elem-nama': {
                    required: 'Isikan Nama ' + nama,
                    minlength: 'Minimal 3 karakter'
                }
            };
            break;
        case 'department':
            var nama = 'Departemen';
            var parent = 'Divisi';
            var rules = {
                'elem-nama': {
                    required: true,
                    minlength: 2
                },
                'elem-parent': {
                    required: true
                }
            };
            var messages = {
                'elem-nama': {
                    required: 'Isikan Nama ' + nama,
                    minlength: 'Minimal 3 karakter'
                },
                'elem-parent': {
                    required: 'Pilih ' + parent + ' induk'
                }
            };
            break;
        case 'section':
            var nama = 'Section';
            var parent = 'Departemen';
            var rules = {
                'elem-nama': {
                    required: true,
                    minlength: 2
                },
                'elem-parent': {
                    required: true
                }
            };
            var messages = {
                'elem-nama': {
                    required: 'Isikan Nama ' + nama,
                    minlength: 'Minimal 3 karakter'
                },
                'elem-parent': {
                    required: 'Pilih ' + parent + ' induk'
                }
            };
            break;
        case 'sub_section':
            var nama = 'Sub Section';
            var parent = 'Section';
            var rules = {
                'elem-nama': {
                    required: true,
                    minlength: 2
                },
                'elem-parent': {
                    required: true
                }
            };
            var messages = {
                'elem-nama': {
                    required: 'Isikan Nama ' + nama,
                    minlength: 'Minimal 3 karakter'
                },
                'elem-parent': {
                    required: 'Pilih ' + parent + ' induk'
                }
            };
            break;
        case 'group':
            var nama = 'Grup';
            var parent = 'Sub Section';
            var rules = {
                'elem-nama': {
                    required: true,
                    minlength: 2
                },
                'elem-parent': {
                    required: true
                }
            };
            var messages = {
                'elem-nama': {
                    required: 'Isikan Nama ' + nama,
                    minlength: 'Minimal 3 karakter'
                },
                'elem-parent': {
                    required: 'Pilih ' + parent + ' induk'
                }
            };
            break;
        default:
            var nama = 'Kode Bagian';
            var parent = '';
            var rules = {
                'elem-kode': {
                    required: true,
                    minlength: 2
                },
                'elem-bagian_key': {
                    required: true
                },
                'elem-bagian_value': {
                    required: true
                }
            };
            var messages = {
                'elem-kode': {
                    required: 'Isikan Kode',
                    minlength: 'Minimal 3 karakter'
                },
                'elem-bagian_key': {
                    required: 'Pilih Jenis Bagian'
                },
                'elem-bagian_value': {
                    required: 'Pilih *'
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
            var $table = $('#hidden-active-type').val();
            var $id = $('#hidden-opened-data').val();

            // Read the current scope (add OR edit)
            var $scope = $('#hidden-modal-scope').val();

            if ($scope == 'add') {
                var $apiUrl = ENV.BASE_API + 'addDivisionData.php';
                var $payload = {
                    obj: data,
                    table: $table
                };
                var $text = 'Data berhasil ditambahkan';

            } else {
                var $apiUrl = ENV.BASE_API + 'updateDivisionData.php';
                var $payload = {
                    id: $id,
                    data: data,
                    table: $table
                };
                var $text = 'Data berhasil di-update';
            }

            // Call the API!
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

                        // reload the stats
                        // initSidebar();
                        initStat($table);

                        // reload the table
                        var table = $('#table-' + $table.replace('_', '-')).DataTable(); // in case we got "sub_section" instead of "sub-section"
                        table.ajax.reload();
                    }

                }
            })
        }
    });

    return true;
};
