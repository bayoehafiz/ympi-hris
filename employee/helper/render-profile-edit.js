// Render elements when editing profile
var renderProfileEdit = function(data) {
    $('#modal-title').html('Ubah Data Karyawan');

    // hide/show (un)related buttons
    $('#btn-edit-profile, #btn-terminate-profile, #btn-close-profile, #btn-generate-profile').addClass('hide-me');
    $('#btn-save-profile, #btn-cancel-profile').removeClass('hide-me');

    // Reset active tabs
    $('#modal-profile ul.nav-tabs').find('li.active').removeClass('active');
    $('#modal-profile .tab-pane.active').removeClass('active');
    $('#modal-profile ul.nav-tabs').children(':first').addClass('active');
    $("#modal-profile .tab-pane:first").addClass('active');


    // Reset all containers
    $('#modal-profile div.modal-content').find('[id^=profile-]').empty();
    $('#modal-nama, #modal-kode-bagian').empty();

    // Set value in modal
    var photo_url = "../" + data.photo_url;
    $('#photo_container-edit').removeClass('hide-me');
    $('#avatar').attr('src', photo_url);

    $('#modal-nama').html('<div class="form-material form-material-primary push-20"><input class="form-control text-center font-s20" type="text" id="input-nama" name="material-color-primary" value="' + data.nama + '"></div>');

    $('#modal-nik').html('<span class="h3 text-muted">' + data.nik + '</span>');

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
    $('#profile-tgl-masuk').html(renderEditElement('datepicker', moment(data.tgl_masuk, 'YYYY-MM-DD').format('DD-MM-YYYY'), 'tgl_masuk', 'Tanggal Masuk', false));
    var containerMasaKontrak = $('#profile-masa-kontrak');
    var containerTglKeluar = $('#profile-tgl-keluar');
    if (data.status != 'Tetap') {
        if (data.status == 'Percobaan') {
            var label = 'Masa Percobaan';
            var label_2 = 'Tgl Selesai Percobaan';
            var opts = [{
                text: "1 Bulan",
                id: 1
            }, {
                text: "3 Bulan",
                id: 3
            }, {
                text: "6 Bulan",
                id: 6
            }];
        } else {
            var label = 'Masa Kontrak';
            var label_2 = 'Tgl Selesai Kontrak';
            if (data.status == 'Kontrak 1') {
                var value = 12;
                var opts = [{
                    text: "6 Bulan",
                    id: 6
                }, {
                    text: "12 Bulan",
                    id: 12
                }, {
                    text: "18 Bulan",
                    id: 18
                }, {
                    text: "2 Tahun",
                    id: 24
                }];
            } else {
                var value = 6;
                var opts = [{
                    text: "6 Bulan",
                    id: 6
                }, {
                    text: "9 Bulan",
                    id: 9
                }, {
                    text: "10 Bulan",
                    id: 10
                }, {
                    text: "11 Bulan",
                    id: 11
                }];
            }
        }

        $('#profile-masa-kontrak').html(renderAddElement('select', 'masa_kontrak', label)).promise().then(function() {
            // destroy first before reinitialize
            if ($('#input-masa_kontrak').hasClass("select2-hidden-accessible")) {
                $('#input-masa_kontrak').select2('destroy');
            }
            // reinitialize
            $('#input-masa_kontrak')
                .select2({
                    minimumResultsForSearch: -1,
                    data: opts
                })
                .val(data.masa_kontrak)
                .trigger('change.select2');
        });

        $('#profile-tgl-keluar').html(renderEditElement('datepicker', moment(data.tgl_keluar, 'YYYY-MM-DD').format('DD-MM-YYYY'), 'tgl_keluar', label, false));
    } else {
        // destroy Select2 instance if existed
        if ($('#input-masa_kontrak').hasClass("select2-hidden-accessible")) {
            $('#input-masa_kontrak').select2('destroy');
        }
        containerMasaKontrak.empty();
        containerTglKeluar.empty();
    }

    // Tab DATA PRIBADI ::
    $('#profile-tempat-lahir').html(renderEditElement('text', data.tempat_lahir, 'tempat_lahir', 'Tempat Lahir', false));
    $('#profile-tgl-lahir').html(renderEditElement('datepicker', moment(data.tgl_lahir, 'YYYY-MM-DD').format('DD-MM-YYYY'), 'tgl_lahir', 'Tanggal Lahir', false));
    $('#profile-agama').html(renderAddElement('select', 'agama', 'Agama'));
    $('#profile-jenis-kelamin').html(renderAddElement('select', 'jenis_kelamin', 'Jenis Kelamin'));
    $('#profile-alamat-lengkap').html(renderEditElement('textarea', data.alamat_lengkap, 'alamat_lengkap', 'Alamat Lengkap', false));
    $('#profile-alamat-domisili').html(renderEditElement('textarea', data.alamat_domisili, 'alamat_domisili', 'Alamat Domisili', false));
    $('#profile-status-keluarga').html(renderAddElement('select', 'status_keluarga', 'Status Keluarga'));

    // Tab DATA PENDIDIKAN ::
    $('#profile-pendidikan').html(renderAddElement('select', 'pendidikan', 'Pendidikan'));
    $('#profile-sekolah-universitas').html(renderEditElement('text', data.sekolah_universitas, 'sekolah_universitas', 'Sekolah / Universitas', false));
    $('#profile-jurusan').html(renderEditElement('text', data.jurusan, 'jurusan', 'Jurusan', false));

    // Tab DATA ADMINISTRASI ::
    $('#profile-telepon').html(renderEditElement('text', data.no_telepon, 'no_telepon', 'No. Telepon', false));
    $('#profile-no-ktp').html(renderEditElement('text', data.no_ktp, 'no_ktp', 'No. KTP', false));
    $('#profile-no-rekening').html(renderEditElement('text', data.no_rekening, 'no_rekening', 'No. Rekening', false));
    $('#profile-no-npwp').html(renderEditElement('text', data.no_npwp, 'no_npwp', 'No. NPWP', false));
    $('#profile-no-bpjstk').html(renderEditElement('text', data.no_bpjstk, 'no_bpjstk', 'No. BPJS TK', false));
    $('#profile-no-bpjskes').html(renderEditElement('text', data.no_bpjskes, 'no_bpjskes', 'No. BPJS Kes', false));
    $('#profile-no-jp').html(renderEditElement('text', data.no_jp, 'no_jp', 'No. JP', false));

    // re-initialize DatePicker
    App.initHelpers(['datepicker']);

    // Save old NIK, STATUS and TGL_MASUK on hidden input for later new NIK generation
    $('#opened-nik').val(data.nik);
    $('#opened-tgl_masuk').val(data.tgl_masuk);
    $('#opened-status').val(data.status);
    $('#opened-kode_bagian').val(data.kode_bagian);

    return true;
};
