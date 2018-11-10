// Terination Form Validation
var initTerminationValidation = function() {
    $('#termination-form').validate({
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
            'elem-termination_date': {
                required: true
            },
            'elem-termination_reason': {
                required: true
            }
        },
        messages: {
            'elem-termination_date': 'Pilih Tanggal',
            'elem-termination_reason': 'Isikan alasan terminasi'
        },
        submitHandler: function(form) {
            var $data = [];
            $(form).find('[id^="input-"]').filter(
                function() {
                    var elem = this;
                    // cleaning empty data [TEMP!]
                    if (elem['value'] != '') {
                        return $data.push({
                            "key": elem['id'].replace('input-', ''),
                            "value": elem['value']
                        });
                    }
                });

            // Read current profile ID
            var $id = $('#opened-profile').val();

            // Call the API!
            $.ajax({
                type: "POST",
                url: ENV.BASE_API + 'terminateEmployee.php',
                dataType: 'json',
                data: {
                    data: $data,
                    id: $id
                },
                success: function(res) {
                    if (res.status == 'err') {
                        swal("Error!", res.message, "error");
                    } else {
                        $('#modal-termination').modal('hide');
                        $.notify({
                            "icon": "fa fa-check-circle",
                            "message": "Terminasi berhasil"
                        }, {
                            "type": "success"
                        });

                        // reload the stats
                        initStat();

                        // reload the table
                        var table = $('#table-terminated').DataTable();
                        table.ajax.reload();
                    }

                }
            });
        }

    });
};
