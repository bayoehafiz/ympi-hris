// Render elements when editing profile
var renderProfileEdit = function(data) {
    $('#modal-title').html('Profil Karyawan - Ubah Data');

    // hide/show (un)related buttons
    $('#btn-edit-profile, #btn-remove-profile, #btn-close-profile, #btn-generate-profile').addClass('hide-me');
    $('#btn-save-profile, #btn-cancel-profile').removeClass('hide-me');

    // Reset active tabs
    $('ul.nav-tabs').find('li.active').removeClass('active');
    $('.tab-pane.active').removeClass('active');
    $('ul.nav-tabs').children(':first').addClass('active');
    $(".tab-pane:first").addClass('active');

    // Set value in modal
    $('#modal-nama').html('<div class="form-material form-material-primary"><input class="form-control text-right font-s20" type="text" id="input-nama" name="material-color-primary" placeholder="' + data.nama + '" value="' + data.nama + '"></div>');

    // fetch data for populating JABATAN selector
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: {
            table: 'jabatan'
        },
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary">' +
                '<select class="form-control text-right" id="input-jabatan" name="elem-jabatan" size="1">' +
                '<option value="">Pilih Jabatan</option>';

            res.data.forEach(function(o) {
                if (o.id == data.jabatan) selector += '<option value="' + o.id + '" selected>' + o.nama + '</option>';
                else selector += '<option value="' + o.id + '">' + o.nama + '</option>';
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
                if (o.id == data.division) selector += '<option value="' + o.id + '" selected>' + o.nama + '</option>';
                else selector += '<option value="' + o.id + '">' + o.nama + '</option>';
            })

            selector += '</select>' +
                '</div>' +
                '</div>';

            $('#modal-divisi').html(selector);
        }
    });

    $('#profile-department').html(renderEditingElement('text', data.department, 'department', 'Departemen', false));
    $('#profile-section').html(renderEditingElement('text', data.section, 'section', 'Section', false));
    $('#profile-sub-section').html(renderEditingElement('text', data.subsection, 'subsection', 'Sub Section', false));
    $('#profile-group').html(renderEditingElement('text', data.group, 'group', 'Grup', false));

    $('#profile-status').html(renderEditingElement('text', data.status, 'status', 'Status Karyawan', false));
    $('#profile-nik').html(renderEditingElement('number', data.nik, 'nik', 'NIK', false));
    $('#profile-tgl-masuk').html(renderEditingElement('text', data.tgl_masuk, 'tgl_masuk', 'Tanggal Masuk', false));
    $('#profile-masa-kerja').html('');

    
    $('#profile-tempat-lahir').html(renderEditingElement('text', data.tempat_lahir, 'tempat_lahir', 'Tempat Lahir', false));
    $('#profile-tgl-lahir').html(renderEditingElement('text', data.tgl_lahir, 'tgl_lahir', 'Tanggal Lahir', false));
    $('#profile-agama').html(renderEditingElement('text', data.agama, 'agama', 'Agama', false));
    $('#profile-jenis-kelamin').html(renderEditingElement('text', data.jenis_kelamin, 'jenis_kelamin', 'Jenis Kelamin', false));
    $('#profile-alamat-lengkap').html(renderEditingElement('textarea', data.alamat_lengkap, 'alamat_lengkap', 'Alamat Lengkap', false));
    $('#profile-alamat-domisili').html(renderEditingElement('textarea', data.alamat_domisili, 'alamat_domisili', 'Alamat Domisili', false));
    $('#profile-status-keluarga').html(renderEditingElement('text', data.status_keluarga, 'status_keluarga', 'Status Keluarga', false));

    $('#profile-pendidikan').html(renderEditingElement('text', data.pendidikan, 'pendidikan', 'Pendidikan', false));
    $('#profile-sekolah-universitas').html(renderEditingElement('text', data.sekolah_universitas, 'sekolah_universitas', 'Sekolah / Universitas', false));
    $('#profile-jurusan').html(renderEditingElement('text', data.jurusan, 'jurusan', 'Jurusan', false));

    $('#profile-telepon').html(renderEditingElement('text', data.telepon, 'telepon', 'No. Telepon', false));
    $('#profile-no-ktp').html(renderEditingElement('number', data.ktp, 'ktp', 'No. KTP', false));
    $('#profile-no-npwp').html(renderEditingElement('text', data.npwp, 'npwp', 'No. NPWP', false));
    $('#profile-no-bpjstk').html(renderEditingElement('text', data.no_bpjstk, 'no_bpjstk', 'No. BPJS TK', false));
    $('#profile-no-bpjskes').html(renderEditingElement('text', data.no_bpjskes, 'no_bpjskes', 'No. BPJS Kes', false));
    $('#profile-no-jp').html(renderEditingElement('text', data.no_jp, 'no_jp', 'No. JP', false));
};
