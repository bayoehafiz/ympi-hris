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
        },
        messages: {
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
            // 'elem-status': 'Pilih Status Karyawan',
            // 'elem-tgl_masuk': 'Pilih Tanggal',
            // 'elem-nik': 'Masukkan NIK',
            // 'elem-no_telepon': 'Masukkan No. Telepon',
            // 'elem-no_ktp': 'Masukkan No. KTP',
            // 'elem-no_npwp': 'Masukkan No. NPWP',
        }
    });
};
