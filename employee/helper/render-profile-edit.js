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

    // hide NIK element
    $('#modal-nik').addClass('hide-me');

    // Set value in modal
    $('#modal-nama').html('<div class="form-material form-material-primary push-20"><input class="form-control text-right font-s20" type="text" id="input-nama" name="material-color-primary" placeholder="' + data.nama + '" value="' + data.nama + '"></div>');

    // fetch data for populating KODE BAGIAN selector
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: {
            table: 'kode_bagian'
        },
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary push-30 text-right">' +
                '<select class="form-control" id="input-kode_bagian" name="elem-kode_bagian" size="1">' +
                '<option value="">Kode Bagian</option>';

            res.data.forEach(function(o) {
                if (o.id == data.kode_bagian) selector += '<option value="' + o.id + '" selected>' + o.kode + '</option>';
                else selector += '<option value="' + o.id + '">' + o.kode + '</option>';
            })

            selector += '</select>' +
                '</div>' +
                '</div>';

            $('#modal-kode-bagian').html(selector);
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
                '<option value="">Pilih Divisi</option>';

            res.data.forEach(function(o) {
                if (o.id == data.division) selector += '<option value="' + o.id + '" selected>' + o.nama + '</option>';
                else selector += '<option value="' + o.id + '">' + o.nama + '</option>';
            })

            selector += '</select>' +
                '<label for="elem-division">Divisi</label>' +
                '</div>' +
                '</div>';

            $('#profile-division').html(selector);

            // Disable selector if kode_bagian not null
            if (data.kode_bagian != null) {
                $('#input-division').attr('disabled', 'disabled');
            }
        }
    });

    // fetch data for populating DEPARTMENT selector
    if (data.department != null) var dataObj = { table: 'department', parent: data.division };
    else var dataObj = { table: 'department' };
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: dataObj,
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary push-30">' +
                '<select class="form-control text-right" id="input-department" name="elem-department" size="1">';

            if (res.success) {
                if (data.department != null) { // if employee has a department
                    selector += '<option value=""></option>';
                    var odata = res.data;
                    odata.forEach(function(o) {
                        if (o.id == data.department) selector += '<option value="' + o.id + '" selected>' + o.nama + '</option>';
                        else selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                    })
                } else { // if employee has no department
                    selector += '<option value="" selected></option>';
                    res.data.forEach(function(o) {
                        selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                    })
                }
            }

            selector += '</select>' +
                '<label for="elem-department">Departemen</label>' +
                '</div>' +
                '</div>';

            $('#profile-department').html(selector);

            // Disable selector if kode_bagian not null
            if (data.kode_bagian != null) {
                $('#input-department').attr('disabled', 'disabled');
            }
        }
    });


    // fetch data for populating SECTION selector
    if (data.section != null) var dataObj = { table: 'section', parent: data.department };
    else var dataObj = { table: 'section' };
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: dataObj,
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary push-30">' +
                '<select class="form-control text-right" id="input-section" name="elem-section" size="1">';

            if (res.success) {
                if (data.section != null) { // if employee has no section
                    selector += '<option value=""></option>';
                    var odata = res.data;
                    odata.forEach(function(o) {
                        if (o.id == data.section) selector += '<option value="' + o.id + '" selected>' + o.nama + '</option>';
                        else selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                    })
                } else { // if employee has a section
                    selector += '<option value="" selected></option>';
                    res.data.forEach(function(o) {
                        selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                    })
                }
            }

            selector += '</select>' +
                '<label for="elem-section">Section</label>' +
                '</div>' +
                '</div>';

            $('#profile-section').html(selector);

            // Disable selector if kode_bagian not null
            if (data.kode_bagian != null) {
                $('#input-section').attr('disabled', 'disabled');
            }
        }
    });

    // fetch data for populating SUB SECTION selector
    if (data.sub_section != null) var dataObj = { table: 'sub_section', parent: data.section };
    else var dataObj = { table: 'sub_section' };
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: dataObj,
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary push-30">' +
                '<select class="form-control text-right" id="input-sub_section" name="elem-sub_section" size="1">';

            if (res.success) {
                if (data.sub_section != null) { // if employee has a sub_section
                    selector += '<option value=""></option>';
                    var odata = res.data;
                    odata.forEach(function(o) {
                        if (o.id == data.sub_section) selector += '<option value="' + o.id + '" selected>' + o.nama + '</option>';
                        else selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                    })
                } else { // if employee has no sectsub_sectionion
                    selector += '<option value="" selected></option>';
                    res.data.forEach(function(o) {
                        selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                    })
                }
            }

            selector += '</select>' +
                '<label for="elem-sub-section">Sub Section</label>' +
                '</div>' +
                '</div>';

            $('#profile-sub-section').html(selector);

            // Disable selector if kode_bagian not null
            if (data.kode_bagian != null) {
                $('#input-sub_section').attr('disabled', 'disabled');
            }
        }
    });

    // fetch data for populating GRUP selector
    if (data.group != null) var dataObj = { table: 'group', parent: data.sub_section };
    else var dataObj = { table: 'group' };
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getSelectorData.php',
        dataType: 'json',
        data: dataObj,
        success: function(res) {
            var selector = '<div class="form-group">' +
                '<div class="form-material form-material-primary push-30">' +
                '<select class="form-control text-right" id="input-group" name="elem-group" size="1">';

            if (res.success) {
                if (data.group != null) { // if employee has a group
                    selector += '<option value=""></option>';
                    var odata = res.data;
                    odata.forEach(function(o) {
                        if (o.id == data.group) selector += '<option value="' + o.id + '" selected>' + o.nama + '</option>';
                        else selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                    })
                } else { // if employee has no group
                    selector += '<option value="" selected></option>';
                    res.data.forEach(function(o) {
                        selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                    })
                }
            }

            selector += '</select>' +
                '<label for="elem-group">Grup</label>' +
                '</div>' +
                '</div>';

            $('#profile-group').html(selector);

            // Disable selector if kode_bagian not null
            if (data.kode_bagian != null) {
                $('#input-group').attr('disabled', 'disabled');
            }
        }
    });

    // fetch data for populating GRADE selector
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
                '<select class="form-control text-right" id="input-grade" name="elem-grade" size="1">';

            if (data.grade != null) { // if employee has no section
                selector += '<option value=""></option>';
                var odata = res.data;
                odata.forEach(function(o) {
                    if (o.id == data.grade) selector += '<option value="' + o.id + '" selected>[' + o.kode + '] ' + o.nama + '</option>';
                    else selector += '<option value="' + o.id + '">[' + o.kode + '] ' + o.nama + '</option>';
                })
            } else { // if employee has a section
                selector += '<option value="" selected></option>';
                res.data.forEach(function(o) {
                    selector += '<option value="' + o.id + '">[' + o.kode + '] ' + o.nama + '</option>';
                })
            }

            selector += '</select>' +
                '<label for="elem-grade">Grade</label>' +
                '</div>' +
                '</div>';

            $('#profile-grade').html(selector);
        }
    });

    // fetch data for populating PENUGASAN selector
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
                '<select class="form-control text-right" id="input-penugasan" name="elem-penugasan" size="1">';

            if (data.penugasan != null) { // if employee has no section
                selector += '<option value=""></option>';
                res.data.forEach(function(o) {
                    if (o.id == data.penugasan) selector += '<option value="' + o.id + '" selected>' + o.nama + '</option>';
                    else selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                })
            } else { // if employee has a section
                selector += '<option value="" selected></option>';
                res.data.forEach(function(o) {
                    selector += '<option value="' + o.id + '">' + o.nama + '</option>';
                })
            }

            selector += '</select>' +
                '<label for="elem-penugasan">Penugasan</label>' +
                '</div>' +
                '</div>';

            $('#profile-penugasan').html(selector);
        }
    });

    $('#profile-status').html(renderEditElement('select', '', 'status', 'Status Karyawan', false, [
        { value: 'Tetap', label: 'Tetap' },
        { value: 'Kontrak 1', label: 'Kontrak 1' },
        { value: 'Kontrak 2', label: 'Kontrak 2' }
    ], data.status));

    $('#profile-nik').html(renderEditElement('text', data.nik, 'nik', 'NIK', false));
    $('#profile-tgl-masuk').html(renderEditElement('datepicker', data.tgl_masuk, 'tgl_masuk', 'Tanggal Masuk', false));
    $('#profile-masa-kerja').html(''); // leave it blank


    $('#profile-tempat-lahir').html(renderEditElement('text', data.tempat_lahir, 'tempat_lahir', 'Tempat Lahir', false));
    $('#profile-tgl-lahir').html(renderEditElement('datepicker', data.tgl_lahir, 'tgl_lahir', 'Tanggal Lahir', false));

    $('#profile-agama').html(renderEditElement('select', '', 'agama', 'Agama', false, [
        { value: 'Islam', label: 'Islam' },
        { value: 'Kristen', label: 'Kristen' },
        { value: 'Katholik', label: 'Katholik' },
        { value: 'Hindu', label: 'Hindu' },
        { value: 'Buddha', label: 'Buddha' },
        { value: 'Konghucu', label: 'Konghucu' }
    ], data.agama));

    $('#profile-jenis-kelamin').html(renderEditElement('select', '', 'jenis_kelamin', 'Jenis Kelamin', false, [
        { value: 'Laki-laki', label: 'Laki-laki' },
        { value: 'Perempuan', label: 'Perempuan' }
    ], data.jenis_kelamin));

    $('#profile-alamat-lengkap').html(renderEditElement('textarea', data.alamat_lengkap, 'alamat_lengkap', 'Alamat Lengkap', false));
    $('#profile-alamat-domisili').html(renderEditElement('textarea', data.alamat_domisili, 'alamat_domisili', 'Alamat Domisili', false));
    $('#profile-status-keluarga').html(renderEditElement('select', '', 'status_keluarga', 'Status Keluarga', false, [
        { value: 'K0', label: 'K0' },
        { value: 'K1', label: 'K1' },
        { value: 'K2', label: 'K2' },
        { value: 'K3', label: 'K3' },
        { value: 'Pk1', label: 'Pk1' },
        { value: 'Pk2', label: 'Pk2' },
        { value: 'Pk3', label: 'Pk3' },
        { value: 'Tk', label: 'Tk' },
    ], data.status_keluarga));

    $('#profile-pendidikan').html(renderEditElement('select', '', 'pendidikan', 'Pendidikan', false, [
        { value: 'S0', label: 'S0 (SD)' },
        { value: 'S1', label: 'S1 (SMP)' },
        { value: 'S2', label: 'S2 (SMA/SMK)' },
        { value: 'S3', label: 'S3 (Diploma 1)' },
        { value: 'S4', label: 'S4 (Diploma 3)' },
        { value: 'S5', label: 'S5 (Sarjana)' }
    ], data.pendidikan));

    $('#profile-sekolah-universitas').html(renderEditElement('text', data.sekolah_universitas, 'sekolah_universitas', 'Sekolah / Universitas', false));
    $('#profile-jurusan').html(renderEditElement('text', data.jurusan, 'jurusan', 'Jurusan', false));

    $('#profile-telepon').html(renderEditElement('text', data.no_telepon, 'no_telepon', 'No. Telepon', false));
    $('#profile-no-ktp').html(renderEditElement('text', data.no_ktp, 'no_ktp', 'No. KTP', false));
    $('#profile-no-rekening').html(renderEditElement('text', data.no_rekening, 'no_rekening', 'No. Rekening', false));
    $('#profile-no-npwp').html(renderEditElement('text', data.no_npwp, 'no_npwp', 'No. NPWP', false));
    $('#profile-no-bpjstk').html(renderEditElement('text', data.no_bpjstk, 'no_bpjstk', 'No. BPJS TK', false));
    $('#profile-no-bpjskes').html(renderEditElement('text', data.no_bpjskes, 'no_bpjskes', 'No. BPJS Kes', false));
    $('#profile-no-jp').html(renderEditElement('text', data.no_jp, 'no_jp', 'No. JP', false));

    // re-initialize DatePicker
    App.initHelpers(['datepicker']);
    initValidation();
};
