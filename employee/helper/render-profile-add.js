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

    // Reset all containers
    $('div.modal-content').find('[id^=profile-]').empty();

    // Set value in modal
    $('#avatar').attr('src', "../assets/img/avatars/avatar.jpg");

    $('#modal-nama').html('<div class="form-group"><div class="form-material form-material-primary"><input class="form-control text-center font-s20" type="text" id="input-nama" name="elem-nama" placeholder="Nama Lengkap"></div></div>');

    $('#modal-nik').html("");

    // fetch data for populating KODE BAGIAN selector
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: {
            table: 'kode_bagian'
        },
        success: function(res) {
            if (res.success) {
                var selector = '<div class="form-group">' +
                    '<div class="form-material form-material-primary push-30">' +
                    '<select class="form-control text-right" id="input-kode_bagian" name="elem-kode_bagian" size="1">' +
                    '<option value="" class="text-muted">Kode Bagian</option>';
                res.data.forEach(function(o) {
                    selector += '<option value="' + o.id + '">' + o.kode + '</option>';
                })

                selector += '</select>' +
                    '</div>' +
                    '</div>';

                $('#modal-kode-bagian').html(selector);
            }
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
                '<div class="form-material form-material-primary push-30">' +
                '<select class="form-control text-right" id="input-division" name="elem-division" size="1">' +
                '<option value=""></option>';

            res.data.forEach(function(o) {
                selector += '<option value="' + o.id + '">' + o.nama + '</option>';
            })

            selector += '</select>' +
                '<label for="elem-division">Divisi</label>' +
                '</div>' +
                '</div>';

            $('#profile-division').html(selector);
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

    $('#profile-status').html(renderAddElement('select', 'status', 'Status Karyawan', [
        { value: 'Tetap', label: 'Tetap' },
        { value: 'Kontrak 1', label: 'Kontrak 1' },
        { value: 'Kontrak 2', label: 'Kontrak 2' },
        { value: 'Percobaan', label: 'Percobaan' }
    ]));

    $('#profile-tgl-masuk').html(renderAddElement('datepicker', 'tgl_masuk', 'Tanggal Masuk', null, moment().format('DD-MM-YYYY')));
    $('#profile-masa-kerja').html(''); // blank

    $('#profile-tempat-lahir').html(renderAddElement('text', 'tempat_lahir', 'Tempat Lahir'));
    $('#profile-tgl-lahir').html(renderAddElement('datepicker', 'tgl_lahir', 'Tanggal Lahir'));
    $('#profile-agama').html(renderAddElement('select', 'agama', 'Agama', [
        { value: 'Islam', label: 'Islam' },
        { value: 'Kristen', label: 'Kristen' },
        { value: 'Katholik', label: 'Katholik' },
        { value: 'Hindu', label: 'Hindu' },
        { value: 'Buddha', label: 'Buddha' },
        { value: 'Konghucu', label: 'Konghucu' }
    ]));
    $('#profile-jenis-kelamin').html(renderAddElement('select', 'jenis_kelamin', 'Jenis Kelamin', [
        { value: 'Laki-laki', label: 'Laki-laki' },
        { value: 'Perempuan', label: 'Perempuan' }
    ]));
    $('#profile-alamat-lengkap').html(renderAddElement('textarea', 'alamat_lengkap', 'Alamat Lengkap'));
    $('#profile-alamat-domisili').html(renderAddElement('textarea', 'alamat_domisili', 'Alamat Domisili'));
    $('#profile-status-keluarga').html(renderAddElement('select', 'status_keluarga', 'Status Keluarga', [
        { value: 'K0', label: 'K0' },
        { value: 'K1', label: 'K1' },
        { value: 'K2', label: 'K2' },
        { value: 'K3', label: 'K3' },
        { value: 'Pk1', label: 'Pk1' },
        { value: 'Pk2', label: 'Pk2' },
        { value: 'Pk3', label: 'Pk3' },
        { value: 'Tk', label: 'Tk' },
    ]));

    $('#profile-pendidikan').html(renderAddElement('select', 'pendidikan', 'Pendidikan', [
        { value: 'S0', label: 'S0 (SD)' },
        { value: 'S1', label: 'S1 (SMP)' },
        { value: 'S2', label: 'S2 (SMA/SMK)' },
        { value: 'S3', label: 'S3 (Diploma 1)' },
        { value: 'S4', label: 'S4 (Diploma 3)' },
        { value: 'S5', label: 'S5 (Sarjana)' }
    ]));
    $('#profile-sekolah-universitas').html(renderAddElement('text', 'sekolah_universitas', 'Sekolah / Universitas'));
    $('#profile-jurusan').html(renderAddElement('text', 'jurusan', 'Jurusan'));

    $('#profile-telepon').html(renderAddElement('text', 'no_telepon', 'No. Telepon'));
    $('#profile-no-rekening').html(renderAddElement('text', 'no_rekening', 'No. Rekening'));
    $('#profile-no-ktp').html(renderAddElement('number', 'no_ktp', 'No. KTP'));
    $('#profile-no-npwp').html(renderAddElement('text', 'no_npwp', 'No. NPWP'));
    $('#profile-no-bpjstk').html(renderAddElement('text', 'no_bpjstk', 'No. BPJS TK'));
    $('#profile-no-bpjskes').html(renderAddElement('text', 'no_bpjskes', 'No. BPJS Kes'));
    $('#profile-no-jp').html(renderAddElement('text', 'no_jp', 'No. JP'));

    // re-initialize DatePicker
    App.initHelpers(['datepicker']);
    initValidation();
};
