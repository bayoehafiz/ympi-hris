// Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
var initValidation = function() {
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
            'elem-jabatan': {
                required: true
            },
            'elem-division': {
                required: true
            },
            'elem-status': {
                required: true
            },
            // 'elem-department': {
            //     required: true
            // },
            // 'elem-section': {
            //     required: true
            // },
            // 'elem-sub_section': {
            //     required: true
            // },
            // 'elem-group': {
            //     required: true
            // },
            'elem-grade': {
                required: true
            },
            // 'elem-penugasan': {
            //     required: true
            // },
            'elem-tgl_masuk': {
                required: true
            },
            'elem-no_telepon': {
                required: true
            },
            'elem-no_ktp': {
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
            'elem-no_npwp': 'Masukkan No. NPWP',
        }
    });
};
