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

    // Reset all containers
    $('div.modal-content').find('[id^=profile-]').empty();

    // == SET VALUES IN MODAL ==
    // 1. Photo Profile
    var photo_url = "../" + data.photo_url;
    $('#avatar-view').attr('src', photo_url);
    // 2. Nama
    $('#modal-nama').html(data.nama);
    // 3. NIK
    if (data.status == "Tetap") var snik = '<span class="text-primary">' + data.nik + '</span>';
    else if (data.status == "Kontrak 1") var snik = '<span class="text-info">' + data.nik + '</span>';
    else var snik = '<span class="text-warning">' + data.nik + '</span>';
    $('#modal-nik').removeClass('hide-me');
    $('#modal-nik').html(snik);
    // 4. Kode Bagian
    var nama_kode_bagian = data.nama_kode_bagian == null ? '-' : '<span class="label label-default label-lg">Kode: ' + data.nama_kode_bagian + '</span>';
    $('#modal-kode-bagian').html(nama_kode_bagian);

    // :: Tab DATA_DIVISI ::
    // 5. Division, Department, Section, Sub Section and Group
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
    // 6. Grade
    var grade = data.kode_grade == null ? '-' : '[' + data.kode_grade + '] ' + data.nama_grade;
    $('#profile-grade').html('<div class="text-muted">Grade</div>' + grade);
    // 7. Penugasan
    var penugasan = data.penugasan == null ? '-' : data.nama_penugasan;
    $('#profile-penugasan').html('<div class="text-muted">Penugasan</div>' + penugasan);

    // :: Tab DATA_KERJA ::
    // 8. Status karyawan
    $('#profile-status').html('<div class="text-muted">Status Karyawan</div>' + data.status.toUpperCase());
    // 9. Tanggal masuk
    $('#profile-tgl-masuk').html('<div class="text-muted">Tanggal Masuk</div>' + moment(data.tgl_masuk, 'DD-MM-YYYY').format('D MMM YYYY'));

    // 10. Masa Kerja
    var now = moment(moment(), 'DD-MM-YYYY');
    var start = moment(data.tgl_masuk, 'DD-MM-YYYY');
    var diff = now.diff(start, 'days');
    if (data.status == 'Tetap') {
        $('#profile-masa-kerja').html('<div class="text-muted">Masa Kerja</div>' + humaniseMasaKerja(diff)); // <- Helper
    } else {
        $('#profile-masa-kerja').html('');
    }

    // 11. Masa Kontrak
    if (data.masa_kontrak != null) {
        if (data.status == 'Percobaan') {
            var kontrak_type = 'Percobaan';
        } else {
            var kontrak_type = 'Kontrak';
        }
        $('#profile-masa-kontrak').html('<div class="text-muted">Masa ' + kontrak_type + '</div>' + data.masa_kontrak + ' Bulan');
    }

    // 12. Tgl Keluar
    if (data.tgl_keluar != null) {
        var tgl_keluar = moment(data.tgl_keluar, 'DD-MM-YYYY').format('D MMM YYYY');
        $('#profile-tgl-keluar').html('<div class="text-muted">Tgl Selesai ' + kontrak_type + '</div>' + tgl_keluar);
    }

    // :: Tab PRIBADI::
    // 13. Tempat Lahir
    var tempat_lahir = !data.tempat_lahir ? '-' : data.tempat_lahir;
    $('#profile-tempat-lahir').html('<div class="text-muted">Tempat Lahir</div>' + tempat_lahir);
    // 14. Tanggal Lahir
    if (!data.tgl_lahir) {
        $('#profile-tgl-lahir').html('<div class="text-muted">Tanggal Lahir</div>-');
    } else {
        var lahir = moment(data.tgl_lahir, 'DD-MM-YYYY');
        var usia = now.diff(lahir, 'days');
        var tgl_lahir = moment(data.tgl_lahir, 'DD-MM-YYYY').format('DD MMM YYYY') + " (" + humaniseUsia(usia) + ")"; // <- Helper
        $('#profile-tgl-lahir').html('<div class="text-muted">Tanggal Lahir</div>' + tgl_lahir);
    }
    // 15. agama
    var agama = !data.agama ? '-' : data.agama;
    $('#profile-agama').html('<div class="text-muted">Agama</div>' + agama);
    // 16. jenis kelamin
    var jenis_kelamin = !data.jenis_kelamin ? '-' : data.jenis_kelamin;
    $('#profile-jenis-kelamin').html('<div class="text-muted">Jenis Kelamin</div>' + jenis_kelamin);
    // 17. alamat lengkap
    var alamat_lengkap = !data.alamat_lengkap ? '-' : data.alamat_lengkap;
    $('#profile-alamat-lengkap').html('<div class="text-muted">Alamat Lengkap</div><div style="word-wrap: break-word;">' + alamat_lengkap.replace(/-/g, ' ') + '</div>');
    // 18. alamat domisili
    var alamat_domisili = !data.alamat_domisili ? '-' : data.alamat_domisili;
    $('#profile-alamat-domisili').html('<div class="text-muted">Alamat Domisili</div><div style="word-wrap: break-word;">' + alamat_domisili.replace(/-/g, ' ') + '</div>');
    // 19. status keluarga
    var status_keluarga = !data.status_keluarga ? '-' : data.status_keluarga;
    $('#profile-status-keluarga').html('<div class="text-muted">Status Keluarga</div>' + status_keluarga);

    // :: Tab PENDIDIKAN ::
    // 20. pendidikan
    var pendidikan = !data.pendidikan ? '-' : data.pendidikan;
    $('#profile-pendidikan').html('<div class="text-muted">Pendidikan</div>' + pendidikan);
    // 21. sekolah / universitas
    var sekolah_universitas = !data.sekolah_universitas ? '-' : data.sekolah_universitas;
    $('#profile-sekolah-universitas').html('<div class="text-muted">Sekolah / Universitas</div>' + sekolah_universitas);
    // 22. jurusan
    var jurusan = !data.jurusan ? '-' : data.jurusan;
    $('#profile-jurusan').html('<div class="text-muted">Jurusan</div>' + jurusan);

    // :: Tab ADMINISTRASI ::
    // 23. no telepon
    var no_telepon = !data.no_telepon ? '-' : data.no_telepon;
    $('#profile-telepon').html('<div class="text-muted">No. Telepon</div>' + no_telepon);
    // 24. no. ktp
    var no_ktp = !data.no_ktp ? '-' : data.no_ktp;
    $('#profile-no-ktp').html('<div class="text-muted">No. KTP</div>' + no_ktp);
    // 25. no. rekening
    var no_rekening = !data.no_rekening ? '-' : data.no_rekening;
    $('#profile-no-rekening').html('<div class="text-muted">No. Rekening</div>' + no_rekening);
    // 26. no. npwp
    var no_npwp = !data.no_npwp ? '-' : data.no_npwp;
    $('#profile-no-npwp').html('<div class="text-muted">No. NPWP</div>' + no_npwp);
    // 27. no. bpjs tk
    var no_bpjstk = !data.no_bpjstk ? '-' : data.no_bpjstk;
    $('#profile-no-bpjstk').html('<div class="text-muted">No. BPJS TK</div>' + no_bpjstk);
    // 28. no. bpjs kes
    var no_bpjskes = !data.no_bpjskes ? '-' : data.no_bpjskes;
    $('#profile-no-bpjskes').html('<div class="text-muted">No. BPJS Kes</div>' + no_bpjskes);
    // 29. no. jp
    var no_jp = !data.no_jp ? '-' : data.no_jp;
    $('#profile-no-jp').html('<div class="text-muted">No. JP</div>' + no_jp);
    // == END SET VALUES ON MODAL ==
};
