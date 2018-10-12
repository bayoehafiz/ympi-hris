// Render elements when add new data
var renderProfileAdd = function() {
    $('#modal-title').html('Profil Karyawan - Tambah Data');

    // hide/show (un)related buttons
    $('#btn-edit-profile, #btn-remove-profile, #btn-cancel-profile').addClass('hide-me');
    $('#btn-save-profile, #btn-close-profile, #btn-generate-profile').removeClass('hide-me');

    // Reset active tabs
    $('ul.nav-tabs').find('li.active').removeClass('active');
    $('.tab-pane.active').removeClass('active');
    $('ul.nav-tabs').children(':first').addClass('active');
    $(".tab-pane:first").addClass('active');

    // Set value in modal
    $('#modal-nama').html('<div class="form-group"><div class="form-material form-material-primary"><input class="form-control text-center font-s20" type="text" id="input-nama" name="elem-nama" placeholder="Nama Lengkap"></div></div>');

    // fetch data for populating JABATAN selector
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: {
            table: 'jabatan'
        },
        success: function(res) {
            console.log(res);
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary">' +
                '<select class="form-control text-right" id="input-jabatan" name="elem-jabatan" size="1">' +
                '<option value="">Pilih Jabatan</option>';

            res.data.forEach(function(o) {
                selector += '<option value="' + o.id + '">' + o.nama + '</option>';
            })

            selector += '</select>' +
                '</div>' +
                '</div>';

            $('#modal-jabatan').html(selector);
        }
    });

    // fetch data for populating DIVISI selector
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: {
            table: 'division'
        },
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary">' +
                '<select class="form-control text-right" id="input-division" name="elem-division" size="1">' +
                '<option value="">Pilih Divisi</option>';

            res.data.forEach(function(o) {
                selector += '<option value="' + o.id + '">' + o.nama + '</option>';
            })

            selector += '</select>' +
                '</div>' +
                '</div>';

            $('#modal-divisi').html(selector);
        }
    });

    $('#profile-department').html('<div class="form-group">' +
        '<div class="form-material form-material-primary push-30">' +
        '<select class="form-control" id="input-department" name="elem-department" size="1">' +
        '</select>' +
        '<label for="elem-department">Departemen</label>' +
        '</div>' +
        '</div>');

    $('#profile-section').html('<div class="form-group">' +
        '<div class="form-material form-material-primary push-30">' +
        '<select class="form-control" id="input-section" name="elem-section" size="1">' +
        '</select>' +
        '<label for="elem-section">Section</label>' +
        '</div>' +
        '</div>');

    $('#profile-sub-section').html('<div class="form-group">' +
        '<div class="form-material form-material-primary push-30">' +
        '<select class="form-control" id="input-sub_section" name="elem-sub_section" size="1">' +
        '</select>' +
        '<label for="elem-sub-section">Sub Section</label>' +
        '</div>' +
        '</div>');

    $('#profile-group').html('<div class="form-group">' +
        '<div class="form-material form-material-primary push-30">' +
        '<select class="form-control" id="input-group" name="elem-group" size="1">' +
        '</select>' +
        '<label for="elem-group">Grup</label>' +
        '</div>' +
        '</div>');

    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: {
            table: 'grade'
        },
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary push-30">' +
                '<select class="form-control" id="input-grade" name="elem-grade" size="1">' +
                '<option></option>';

            res.data.forEach(function(o) {
                selector += '<option value="' + o.id + '">[' + o.kode + '] ' + o.nama + '</option>';
            })

            selector += '</select>' +
                '<label for="elem-grade">Grade</label>' +
                '</div>' +
                '</div>';

            $('#profile-grade').html(selector);
        }
    });

    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: {
            table: 'penugasan'
        },
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary push-30">' +
                '<select class="form-control" id="input-penugasan" name="elem-penugasan" size="1">' +
                '<option></option>';

            res.data.forEach(function(o) {
                selector += '<option value="' + o.id + '">' + o.nama + '</option>';
            })

            selector += '</select>' +
                '<label for="elem-penugasan">Penugasan</label>' +
                '</div>' +
                '</div>';

            $('#profile-penugasan').html(selector);
        }
    });

    $('#profile-status').html(renderAddElement('select', '', 'status', 'Status Karyawan', false, [
        { value: 'Tetap', label: 'Tetap' },
        { value: 'Kontrak 1', label: 'Kontrak 1' },
        { value: 'Kontrak 2', label: 'Kontrak 2' }
    ]));

    $('#profile-nik').html(renderAddElement('text', '', 'nik', 'NIK', false));
    $('#profile-tgl-masuk').html(renderAddElement('datepicker', '', 'tgl_masuk', 'Tanggal Masuk', false));
    $('#profile-masa-kerja').html(''); // blank

    $('#profile-tempat-lahir').html(renderAddElement('text', '', 'tempat_lahir', 'Tempat Lahir', false));
    $('#profile-tgl-lahir').html(renderAddElement('datepicker', '', 'tgl_lahir', 'Tanggal Lahir', false));
    $('#profile-agama').html(renderAddElement('select', '', 'agama', 'Agama', false, [
        { value: 'Islam', label: 'Islam' },
        { value: 'Kristen', label: 'Kristen' },
        { value: 'Katholik', label: 'Katholik' },
        { value: 'Hindu', label: 'Hindu' },
        { value: 'Buddha', label: 'Buddha' },
        { value: 'Konghucu', label: 'Konghucu' }
    ]));
    $('#profile-jenis-kelamin').html(renderAddElement('select', '', 'jenis_kelamin', 'Jenis Kelamin', false, [
        { value: 'Laki-laki', label: 'Laki-laki' },
        { value: 'Perempuan', label: 'Perempuan' }
    ]));
    $('#profile-alamat-lengkap').html(renderAddElement('textarea', '', 'alamat_lengkap', 'Alamat Lengkap', false));
    $('#profile-alamat-domisili').html(renderAddElement('textarea', '', 'alamat_domisili', 'Alamat Domisili', false));
    $('#profile-status-keluarga').html(renderAddElement('select', '', 'status_keluarga', 'Status Keluarga', false, [
        { value: 'K0', label: 'K0' },
        { value: 'K1', label: 'K1' },
        { value: 'K2', label: 'K2' },
        { value: 'K3', label: 'K3' },
        { value: 'Pk1', label: 'Pk1' },
        { value: 'Pk2', label: 'Pk2' },
        { value: 'Pk3', label: 'Pk3' },
        { value: 'Tk', label: 'Tk' },
    ]));

    $('#profile-pendidikan').html(renderAddElement('select', '', 'pendidikan', 'Pendidikan', false, [
        { value: 'S0', label: 'S0 (SD)' },
        { value: 'S1', label: 'S1 (SMP)' },
        { value: 'S2', label: 'S2 (SMA/SMK)' },
        { value: 'S3', label: 'S3 (Diploma 1)' },
        { value: 'S4', label: 'S4 (Diploma 3)' },
        { value: 'S5', label: 'S5 (Sarjana)' }
    ]));
    $('#profile-sekolah-universitas').html(renderAddElement('text', '', 'sekolah_universitas', 'Sekolah / Universitas', false));
    $('#profile-jurusan').html(renderAddElement('text', '', 'jurusan', 'Jurusan', false));

    $('#profile-telepon').html(renderAddElement('text', '', 'no_telepon', 'No. Telepon', false));
    $('#profile-no-ktp').html(renderAddElement('number', '', 'no_ktp', 'No. KTP', false));
    $('#profile-no-npwp').html(renderAddElement('text', '', 'no_npwp', 'No. NPWP', false));
    $('#profile-no-bpjstk').html(renderAddElement('text', '', 'no_bpjstk', 'No. BPJS TK', false));
    $('#profile-no-bpjskes').html(renderAddElement('text', '', 'no_bpjskes', 'No. BPJS Kes', false));
    $('#profile-no-jp').html(renderAddElement('text', '', 'no_jp', 'No. JP', false));

    // re-initialize DatePicker
    App.initHelpers(['datepicker']);
    initValidation();
};

