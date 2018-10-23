// Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
var initValidation = function(data_type) {
    switch (data_type) {
        case 'department':
            var nama = 'Departemen';
            var parent = 'Divisi';
            break;
        case 'section':
            var nama = 'Section';
            var parent = 'Departemen';
            break;
        case 'sub_section':
            var nama = 'Sub Section';
            var parent = 'Section';
            break;
        case 'group':
            var nama = 'Grup';
            var parent = 'Sub Section';
            break;
        default:
            var nama = 'Divisi';
            var parent = '';
            break;
    }

    $('.js-validation-material').validate({
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
            'elem-kode': {
                required: true
            },
            'elem-parent': {
                required: true
            }
        },
        messages: {
            'elem-nama': {
                required: 'Isikan Nama ' + nama,
                minlength: 'Minimal 3 karakter'
            },
            'elem-kode': 'Isikan Kode ' + nama,
            'elem-parent': 'Pilih ' + parent + ' induk'
        }
    });
};
