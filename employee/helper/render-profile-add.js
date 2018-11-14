// Render elements when add new data
var renderProfileAdd = function() {
    $('#modal-title').html('Profil Karyawan - Tambah Data');

    // hide/show (un)related buttons
    $('#btn-edit-profile, #btn-terminate-profile, #btn-cancel-profile').addClass('hide-me');
    $('#btn-save-profile, #btn-close-profile, #btn-generate-profile').removeClass('hide-me');

    // Reset active tabs
    $('#modal-profile ul.nav-tabs').find('li.active').removeClass('active');
    $('#modal-profile .tab-pane.active').removeClass('active');
    $('#modal-profile ul.nav-tabs').children(':first').addClass('active');
    $("#modal-profile .tab-pane:first").addClass('active');

    // Reset all containers
    $('#modal-profile div.modal-content').find('[id^=profile-]').empty();

    // Set value in modal
    $('#avatar').attr('src', "../assets/img/avatar.jpg");

    $('#modal-nama').html('<div class="form-group"><div class="form-material form-material-primary"><input class="form-control text-center font-s20" type="text" id="input-nama" name="elem-nama" placeholder="Nama Lengkap"></div></div>');

    $('#modal-nik').html("");

    // Tab DATA DIVISI ::
    $('#profile-kode-bagian').html(renderAddElement('select_ajax', 'kode_bagian', 'Kode Bagian'));
    $('#profile-division').html(renderAddElement('select_ajax', 'division', 'Divisi'));
    $('#profile-department').html(renderAddElement('select_ajax', 'department', 'Departemen'));
    $('#profile-section').html(renderAddElement('select_ajax', 'section', 'Section'));
    $('#profile-sub-section').html(renderAddElement('select_ajax', 'sub_section', 'Sub Section'));
    $('#profile-group').html(renderAddElement('select_ajax', 'group', 'Grup'));
    $('#profile-grade').html(renderAddElement('select_ajax', 'grade', 'Grade'));
    $('#profile-penugasan').html(renderAddElement('select_ajax', 'penugasan', 'Penugasan / Jabatan'));

    // Tab DATA KERJA ::
    $('#profile-status').html(renderAddElement('select', 'status', 'Status Karyawan'));
    $('#profile-tgl-masuk').html(renderAddElement('datepicker', 'tgl_masuk', 'Tanggal Masuk', null, moment().format('DD-MM-YYYY')));
    $('#profile-masa-kerja').html(''); // blank

    // Tab DATA PRIBADI ::
    $('#profile-tempat-lahir').html(renderAddElement('text', 'tempat_lahir', 'Tempat Lahir'));
    $('#profile-tgl-lahir').html(renderAddElement('datepicker', 'tgl_lahir', 'Tanggal Lahir'));
    $('#profile-agama').html(renderAddElement('select', 'agama', 'Agama'));
    $('#profile-jenis-kelamin').html(renderAddElement('select', 'jenis_kelamin', 'Jenis Kelamin'));
    $('#profile-alamat-lengkap').html(renderAddElement('textarea', 'alamat_lengkap', 'Alamat Lengkap'));
    $('#profile-alamat-domisili').html(renderAddElement('textarea', 'alamat_domisili', 'Alamat Domisili'));
    $('#profile-status-keluarga').html(renderAddElement('select', 'status_keluarga', 'Status Keluarga'));

    // Tab DATA PENDIDIKAN ::
    $('#profile-pendidikan').html(renderAddElement('select', 'pendidikan', 'Pendidikan'));
    $('#profile-sekolah-universitas').html(renderAddElement('text', 'sekolah_universitas', 'Sekolah / Universitas'));
    $('#profile-jurusan').html(renderAddElement('text', 'jurusan', 'Jurusan'));

    // Tab DATA ADMINISTRASI ::
    $('#profile-telepon').html(renderAddElement('text', 'no_telepon', 'No. Telepon'));
    $('#profile-no-rekening').html(renderAddElement('text', 'no_rekening', 'No. Rekening'));
    $('#profile-no-ktp').html(renderAddElement('number', 'no_ktp', 'No. KTP'));
    $('#profile-no-npwp').html(renderAddElement('text', 'no_npwp', 'No. NPWP'));
    $('#profile-no-bpjstk').html(renderAddElement('text', 'no_bpjstk', 'No. BPJS TK'));
    $('#profile-no-bpjskes').html(renderAddElement('text', 'no_bpjskes', 'No. BPJS Kes'));
    $('#profile-no-jp').html(renderAddElement('text', 'no_jp', 'No. JP'));

    // re-initialize DatePicker
    App.initHelpers(['datepicker']);

    return true;
};
