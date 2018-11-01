// Render elements when opening / viewing profile
var renderProfileView = function(data) {
    $('#modal-title').html('Profil Karyawan');

    // hide/show (un)related buttons
    $('#btn-edit-profile, #btn-remove-profile, #btn-close-profile').removeClass('hide-me');
    $('#btn-save-profile, #btn-cancel-profile, #btn-generate-profile').addClass('hide-me');

    // Reset active tabs
    $('ul.nav-tabs').find('li.active').removeClass('active');
    $('.tab-pane.active').removeClass('active');
    $('ul.nav-tabs').children(':first').addClass('active');
    $(".tab-pane:first").addClass('active');

    // Set value in modal
    var photo_url = "../" + data.photo_url;
    $('#photo_container').html('<img id="avatar" class="img-avatar img-avatar128 photo-avatar" src="' + photo_url + '">');

    $('#modal-nama').html(data.nama);

    if (data.status == "Tetap") var snik = '<span class="text-primary">' + data.nik + '</span>';
    else if (data.status == "Kontrak 1") var snik = '<span class="text-info">' + data.nik + '</span>';
    else var snik = '<span class="text-warning">' + data.nik + '</span>';
    $('#modal-nik').html(snik);

    var nama_kode_bagian = data.nama_kode_bagian == null ? '-' : '<span class="label label-default label-lg">Kode: ' + data.nama_kode_bagian + '</span>';
    $('#modal-kode-bagian').html(nama_kode_bagian);

    // unhide NIK element
    $('#modal-nik').removeClass('hide-me');

    // Tab DATA_KERJA ::
    // Manipulate values first
    var nama_department = data.nama_department == null ? '-' : data.nama_department;
    var nama_section = data.nama_section == null ? '-' : data.nama_section;
    var nama_sub_section = data.nama_sub_section == null ? '-' : data.nama_sub_section;
    var nama_group = data.nama_group == null ? '-' : data.nama_group;

    $('#profile-division').html('<div class="text-muted">Divisi</div>' + data.nama_division);
    $('#profile-department').html('<div class="text-muted">Departemen</div>' + nama_department);
    $('#profile-section').html('<div class="text-muted">Section</div>' + nama_section);
    $('#profile-sub-section').html('<div class="text-muted">Sub Section</div>' + nama_sub_section);
    $('#profile-group').html('<div class="text-muted">Grup</div>' + nama_group);
    $('#profile-kode-bagian').html('<div class="text-muted">Kode Bagian</div>' + nama_kode_bagian);

    var grade = data.kode_grade == null ? '-' : '[' + data.kode_grade + '] ' + data.nama_grade;
    $('#profile-grade').html('<div class="text-muted">Grade</div>' + grade);
    $('#profile-status').html('<div class="text-muted">Status Karyawan</div>' + data.status.toUpperCase());
    $('#profile-tgl-masuk').html('<div class="text-muted">Tanggal Masuk</div>' + moment(data.tgl_masuk, 'DD-MM-YYYY').format('D MMM YYYY'));
    var penugasan = data.penugasan == null ? '-' : data.nama_penugasan;
    $('#profile-penugasan').html('<div class="text-muted">Penugasan</div>' + penugasan);

    // Manipulate MASA-KERJA
    var now = moment(moment(), 'DD-MM-YYYY');
    var start = moment(data.tgl_masuk, 'DD-MM-YYYY');
    var diff = now.diff(start, 'days');
    $('#profile-masa-kerja').html('<div class="text-muted">Masa Kerja</div>' + humaniseMasaKerja(diff));

    // Tab PRIBADI::
    var tempat_lahir = !data.tempat_lahir ? '-' : data.tempat_lahir;
    $('#profile-tempat-lahir').html('<div class="text-muted">Tempat Lahir</div>' + tempat_lahir);
    if (!data.tgl_lahir) {
        $('#profile-tgl-lahir').html('<div class="text-muted">Tanggal Lahir</div>-');
    } else {
        var lahir = moment(data.tgl_lahir, 'DD-MM-YYYY');
        var usia = now.diff(lahir, 'days');
        var tgl_lahir = moment(data.tgl_lahir, 'DD-MM-YYYY').format('DD MMM YYYY') + " (" + humaniseUsia(usia) + ")";
        $('#profile-tgl-lahir').html('<div class="text-muted">Tanggal Lahir</div>' + tgl_lahir);
    }

    var agama = !data.agama ? '-' : data.agama;
    $('#profile-agama').html('<div class="text-muted">Agama</div>' + agama);
    var jenis_kelamin = !data.jenis_kelamin ? '-' : data.jenis_kelamin;
    $('#profile-jenis-kelamin').html('<div class="text-muted">Jenis Kelamin</div>' + jenis_kelamin);
    var alamat_lengkap = !data.alamat_lengkap ? '-' : data.alamat_lengkap;
    $('#profile-alamat-lengkap').html('<div class="text-muted">Alamat Lengkap</div><div style="white-space: pre;">' + alamat_lengkap + '</div>');
    var alamat_domisili = !data.alamat_domisili ? '-' : data.alamat_domisili;
    $('#profile-alamat-domisili').html('<div class="text-muted">Alamat Domisili</div><div style="white-space: pre;">' + alamat_domisili + '</div>');
    var status_keluarga = !data.status_keluarga ? '-' : data.status_keluarga;
    $('#profile-status-keluarga').html('<div class="text-muted">Status Keluarga</div>' + status_keluarga);

    // Tab PENDIDIKAN
    var pendidikan = !data.pendidikan ? '-' : data.pendidikan;
    $('#profile-pendidikan').html('<div class="text-muted">Pendidikan</div>' + pendidikan);
    var sekolah_universitas = !data.sekolah_universitas ? '-' : data.sekolah_universitas;
    $('#profile-sekolah-universitas').html('<div class="text-muted">Sekolah / Universitas</div>' + sekolah_universitas);
    var jurusan = !data.jurusan ? '-' : data.jurusan;
    $('#profile-jurusan').html('<div class="text-muted">Jurusan</div>' + jurusan);

    // Tab ADMINISTRASI
    var no_telepon = !data.no_telepon ? '-' : data.no_telepon;
    $('#profile-telepon').html('<div class="text-muted">No. Telepon</div>' + no_telepon);
    var no_ktp = !data.no_ktp ? '-' : data.no_ktp;
    $('#profile-no-ktp').html('<div class="text-muted">No. KTP</div>' + no_ktp);
    var no_rekening = !data.no_rekening ? '-' : data.no_rekening;
    $('#profile-no-rekening').html('<div class="text-muted">No. Rekening</div>' + no_rekening);
    var no_npwp = !data.no_npwp ? '-' : data.no_npwp;
    $('#profile-no-npwp').html('<div class="text-muted">No. NPWP</div>' + no_npwp);
    var no_bpjstk = !data.no_bpjstk ? '-' : data.no_bpjstk;
    $('#profile-no-bpjstk').html('<div class="text-muted">No. BPJS TK</div>' + no_bpjstk);
    var no_bpjskes = !data.no_bpjskes ? '-' : data.no_bpjskes;
    $('#profile-no-bpjskes').html('<div class="text-muted">No. BPJS Kes</div>' + no_bpjskes);
    var no_jp = !data.no_jp ? '-' : data.no_jp;
    $('#profile-no-jp').html('<div class="text-muted">No. JP</div>' + no_jp);
};
