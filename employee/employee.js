var BasePagesEmployee = function() {
    // DataTables Bootstrap integration
    var bsDataTables = function() {
        var $DataTable = jQuery.fn.dataTable;

        // Set the defaults for DataTables init
        jQuery.extend( true, $DataTable.defaults, {
            dom:
                "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-6'i><'col-sm-6'p>>",
            renderer: 'bootstrap',
            oLanguage: {
                sLengthMenu: "_MENU_",
                sInfo: "Showing <strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
                oPaginate: {
                    sPrevious: '<i class="fa fa-angle-left"></i>',
                    sNext: '<i class="fa fa-angle-right"></i>'
                }
            }
        });

        // Default class modification
        jQuery.extend($DataTable.ext.classes, {
            sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
            sFilterInput: "form-control",
            sLengthSelect: "form-control"
        });

        // Bootstrap paging button renderer
        $DataTable.ext.renderer.pageButton.bootstrap = function (settings, host, idx, buttons, page, pages) {
            var api     = new $DataTable.Api(settings);
            var classes = settings.oClasses;
            var lang    = settings.oLanguage.oPaginate;
            var btnDisplay, btnClass;

            var attach = function (container, buttons) {
                var i, ien, node, button;
                var clickHandler = function (e) {
                    e.preventDefault();
                    if (!jQuery(e.currentTarget).hasClass('disabled')) {
                        api.page(e.data.action).draw(false);
                    }
                };

                for (i = 0, ien = buttons.length; i < ien; i++) {
                    button = buttons[i];

                    if (jQuery.isArray(button)) {
                        attach(container, button);
                    }
                    else {
                        btnDisplay = '';
                        btnClass = '';

                        switch (button) {
                            case 'ellipsis':
                                btnDisplay = '&hellip;';
                                btnClass = 'disabled';
                                break;

                            case 'first':
                                btnDisplay = lang.sFirst;
                                btnClass = button + (page > 0 ? '' : ' disabled');
                                break;

                            case 'previous':
                                btnDisplay = lang.sPrevious;
                                btnClass = button + (page > 0 ? '' : ' disabled');
                                break;

                            case 'next':
                                btnDisplay = lang.sNext;
                                btnClass = button + (page < pages - 1 ? '' : ' disabled');
                                break;

                            case 'last':
                                btnDisplay = lang.sLast;
                                btnClass = button + (page < pages - 1 ? '' : ' disabled');
                                break;

                            default:
                                btnDisplay = button + 1;
                                btnClass = page === button ?
                                        'active' : '';
                                break;
                        }

                        if (btnDisplay) {
                            node = jQuery('<li>', {
                                'class': classes.sPageButton + ' ' + btnClass,
                                'aria-controls': settings.sTableId,
                                'tabindex': settings.iTabIndex,
                                'id': idx === 0 && typeof button === 'string' ?
                                        settings.sTableId + '_' + button :
                                        null
                            })
                            .append(jQuery('<a>', {
                                    'href': '#'
                                })
                                .html(btnDisplay)
                            )
                            .appendTo(container);

                            settings.oApi._fnBindAction(
                                node, {action: button}, clickHandler
                            );
                        }
                    }
                }
            };

            attach(
                jQuery(host).empty().html('<ul class="pagination"/>').children('ul'),
                buttons
            );
        };

        // TableTools Bootstrap compatibility - Required TableTools 2.1+
        if ($DataTable.TableTools) {
            // Set the classes that TableTools uses to something suitable for Bootstrap
            jQuery.extend(true, $DataTable.TableTools.classes, {
                "container": "DTTT btn-group",
                "buttons": {
                    "normal": "btn btn-default",
                    "disabled": "disabled"
                },
                "collection": {
                    "container": "DTTT_dropdown dropdown-menu",
                    "buttons": {
                        "normal": "",
                        "disabled": "disabled"
                    }
                },
                "print": {
                    "info": "DTTT_print_info"
                },
                "select": {
                    "row": "active"
                }
            });

            // Have the collection use a bootstrap compatible drop down
            jQuery.extend(true, $DataTable.TableTools.DEFAULTS.oTags, {
                "collection": {
                    "container": "ul",
                    "button": "li",
                    "liner": "a"
                }
            });
        }
    };
    
    var initEmployeePage = function() {
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });
    };

    var sweetAlert = function() {
        // Init an error alert on button click
        $('.js-swal-error').on('click', function() {
            swal('Oops...', 'Sedang dalam pengembangan!', 'warning');
        });
    };

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
                'elem-nik': {
                    required: true,
                    number: true
                },
                'elem-department': {
                    required: true
                },
                'elem-section': {
                    required: true
                },
                'elem-sub_section': {
                    required: true
                },
                'elem-group': {
                    required: true
                },
                'elem-grade': {
                    required: true
                },
                'elem-penugasan': {
                    required: true
                },
                'elem-tgl_masuk': {
                    required: true
                },
                'elem-telepon': {
                    required: true,
                    phone: true
                },
                'elem-ktp': {
                    required: true,
                    number: true
                },
                'elem-npwp': {
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
                'elem-nik': {
                    required: 'Masukkan NIK',
                    number: 'Masukkan angka saja tanpa huruf'
                },
                'elem-telepon': 'Masukkan No. Telepon',
                'elem-ktp': {
                    required: 'Masukkan No. KTP',
                    number: 'Masukkan angka saja tanpa huruf'
                },
                'elem-npwp': 'Masukkan No. NPWP',
            }
        });
    };

    var initStat = function() {
        $.ajax({
            type: "GET",
            url: BASE_URL + '/php/api/getEmployeeNumber.php',
            dataType: 'json',
            success: function(res) {
                if (res.status == 'ok') {
                    var data = res.data;
                    var counter = 0;
                    data.forEach(function(d) {
                        if (d.division == 'Finance Div') $('#total-tetap').html(d.total);
                        if (d.division == 'HRGA Div') $('#total-kontrak-1').html(d.total);
                        if (d.division == 'Production Div') $('#total-kontrak-2').html(d.total);
                        counter += parseInt(d.total);
                    })
                    $('#total-karyawan').html(counter);
                } else {
                    $('#total-tetap').html('0');
                    $('#total-kontrak-1').html('0');
                    $('#total-kontrak-2').html('0');
                    $('#total-karyawan').html('0');
                }
            }
        })
    };

    var initTable = function() {
        // Function to repopulate selector !!!
        var repopulateSelector = function(id, data) {
            var selector = $('#' + id);
            selector.empty();
            selector.append('<option></option>');
            data.forEach(function(o) {
                selector.append('<option value="' + o.id + '">' + o.nama + '</option>');
            });
        }

        // Function to render elements inside profile-modal
        var renderEditingElement = function(type, data_name, placeholder, label, disabled, object) { // type = "text", "number", "textarea". "datepicker"
            if (disabled) var disabled = ' disabled';
            else var disabled = '';

            if (type == 'textarea') {
                var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<textarea class="form-control" id="input-' + placeholder + '" name="elem-' + placeholder + '" ' + disabled + '">' + data_name + '</textarea>' +
                    '<label for="elem-' + data_name + '">' + label + '</label>' +
                    '</div></div>';
            } else if (type == 'datepicker') {
                var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<input class="js-datepicker form-control" type="text" id="input-' + placeholder + '" name="elem-' + placeholder + '" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy">' +
                    '<label for="elem-' + data_name + '">' + label + '</label>' +
                    '</div></div>';
            } else if (type == 'select') {
                var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<select class="form-control" id="input-' + placeholder + '" name="elem-' + placeholder + '" size="1">' +
                    '<option></option>';
                object.forEach(function(x) {
                    elem += '<option value="' + x.value + '">' + x.label + '</option>';
                });
                elem += '</select>' +
                    '<label for="elem-' + data_name + '">' + label + '</label>' +
                    '</div></div>';
            } else {
                var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<input class="form-control" type="' + type + '" id="input-' + placeholder + '" name="elem-' + placeholder + '" value="' + data_name + '" placeholder="' + data_name + '"' + disabled + '>' +
                    '<label for="elem-' + placeholder + '">' + label + '</label>' +
                    '</div></div>';
            }

            return elem;
        };

        // Render elements when add new data
        var renderProfileAdd = function() {
            $('#modal-title').html('Profil Karyawan - Tambah Data');

            // hide/show (un)related buttons
            $('#btn-edit-profile, #btn-remove-profile, #btn-close-profile').addClass('hide-me');
            $('#btn-save-profile, #btn-cancel-profile').removeClass('hide-me');

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

            $('#profile-status').html(renderEditingElement('select', '', 'status', 'Status Karyawan', false, [
                { value: 'Tetap', label: 'Tetap' },
                { value: 'Kontrak 1', label: 'Kontrak 1' },
                { value: 'Kontrak 2', label: 'Kontrak 2' }
            ]));

            $('#profile-nik').html(renderEditingElement('number', '', 'nik', 'NIK', false));
            $('#profile-tgl-masuk').html(renderEditingElement('datepicker', '', 'tgl_masuk', 'Tanggal Masuk', false));
            $('#profile-masa-kerja').html(''); // blank

            $('#profile-tempat-lahir').html(renderEditingElement('text', '', 'tempat_lahir', 'Tempat Lahir', false));
            $('#profile-tgl-lahir').html(renderEditingElement('datepicker', '', 'tgl_lahir', 'Tanggal Lahir', false));
            $('#profile-agama').html(renderEditingElement('select', '', 'agama', 'Agama', false, [
                { value: 'Islam', label: 'Islam' },
                { value: 'Kristen', label: 'Kristen' },
                { value: 'Katholik', label: 'Katholik' },
                { value: 'Hindu', label: 'Hindu' },
                { value: 'Buddha', label: 'Buddha' },
                { value: 'Konghucu', label: 'Konghucu' }
            ]));
            $('#profile-jenis-kelamin').html(renderEditingElement('select', '', 'jenis_kelamin', 'Jenis Kelamin', false, [
                { value: 'L', label: 'Laki-laki' },
                { value: 'P', label: 'Perempuan' }
            ]));
            $('#profile-alamat-lengkap').html(renderEditingElement('textarea', '', 'alamat_lengkap', 'Alamat Lengkap', false));
            $('#profile-alamat-domisili').html(renderEditingElement('textarea', '', 'alamat_domisili', 'Alamat Domisili', false));
            $('#profile-status-keluarga').html(renderEditingElement('select', '', 'status_keluarga', 'Status Keluarga', false, [
                { value: 'K0', label: 'K0' },
                { value: 'K1', label: 'K1' },
                { value: 'K2', label: 'K2' },
                { value: 'K3', label: 'K3' },
                { value: 'Pk1', label: 'Pk1' },
                { value: 'Pk2', label: 'Pk2' },
                { value: 'Pk3', label: 'Pk3' },
                { value: 'Tk', label: 'Tk' },
            ]));

            $('#profile-pendidikan').html(renderEditingElement('select', '', 'pendidikan', 'Pendidikan', false, [
                { value: 'S0', label: 'S0 (SD)' },
                { value: 'S1', label: 'S1 (SMP)' },
                { value: 'S2', label: 'S2 (SMA/SMK)' },
                { value: 'S3', label: 'S3 (Diploma 1)' },
                { value: 'S4', label: 'S4 (Diploma 3)' },
                { value: 'S5', label: 'S5 (Sarjana)' }
            ]));
            $('#profile-sekolah-universitas').html(renderEditingElement('text', '', 'sekolah_universitas', 'Sekolah / Universitas', false));
            $('#profile-jurusan').html(renderEditingElement('text', '', 'jurusan', 'Jurusan', false));

            $('#profile-telepon').html(renderEditingElement('text', '', 'telepon', 'No. Telepon', false));
            $('#profile-no-ktp').html(renderEditingElement('number', '', 'ktp', 'No. KTP', false));
            $('#profile-no-npwp').html(renderEditingElement('text', '', 'npwp', 'No. NPWP', false));
            $('#profile-no-bpjstk').html(renderEditingElement('text', '', 'no_bpjstk', 'No. BPJS TK', false));
            $('#profile-no-bpjskes').html(renderEditingElement('text', '', 'no_bpjskes', 'No. BPJS Kes', false));
            $('#profile-no-jp').html(renderEditingElement('text', '', 'no_jp', 'No. JP', false));

            // re-initialize DatePicker
            App.initHelpers(['datepicker']);
            initValidation();
        };
        // END of rendering add data


        // Render elements when opening / viewing profile
        var renderProfile = function(data) {
            $('#modal-title').html('Profil Karyawan');

            // hide/show (un)related buttons
            $('#btn-edit-profile, #btn-remove-profile, #btn-close-profile').removeClass('hide-me');
            $('#btn-save-profile, #btn-cancel-profile').addClass('hide-me');

            // Set value in modal
            $('#modal-nama').html(data.nama);
            $('#modal-jabatan').html(data.jabatan);
            $('#modal-divisi').html(data.division);

            $('#profile-status').html('<div class="text-muted">Status Karyawan</div>' + data.statusEdt);
            $('#profile-nik').html('<div class="text-muted">NIK</div>' + data.nik);
            $('#profile-department').html('<div class="text-muted">Departemen</div>' + data.department);
            $('#profile-section').html('<div class="text-muted">Section</div>' + data.section);
            $('#profile-sub-section').html('<div class="text-muted">Sub Section</div>' + data.subsection);
            $('#profile-group').html('<div class="text-muted">Grup</div>' + data.group);
            $('#profile-tgl-masuk').html('<div class="text-muted">Tanggal Masuk</div>' + moment(data.tgl_masuk, 'DD-mm-YYYY').format('DD MMMM YYYY'));
            $('#profile-masa-kerja').html('<div class="text-muted">Masa Kerja</div>' + parseInt(data.masa_kerja_thn) + " Thn " + parseInt(data.masa_kerja_bln) + " Bln");

            $('#profile-tempat-lahir').html('<div class="text-muted">Tempat Lahir</div>' + data.tempat_lahir);
            $('#profile-tgl-lahir').html('<div class="text-muted">Tanggal Lahir</div>' + moment(data.tgl_lahir, 'DD-mm-YYYY').format('DD MMMM YYYY') + " (" + parseInt(data.usia) + " Thn)");
            $('#profile-agama').html('<div class="text-muted">Agama</div>' + data.agama);
            $('#profile-jenis-kelamin').html('<div class="text-muted">Jenis Kelamin</div>' + data.jenis_kelamin);
            $('#profile-alamat-lengkap').html('<div class="text-muted">Alamat Lengkap</div>' + data.alamat_lengkap);
            $('#profile-alamat-domisili').html('<div class="text-muted">Alamat Domisili</div>' + data.alamat_domisili);
            $('#profile-status-keluarga').html('<div class="text-muted">Status Keluarga</div>' + data.status_keluarga);

            $('#profile-pendidikan').html('<div class="text-muted">Pendidikan</div>' + data.pendidikan);
            $('#profile-sekolah-universitas').html('<div class="text-muted">Sekolah / Universitas</div>' + data.sekolah_universitas);
            $('#profile-jurusan').html('<div class="text-muted">Jurusan</div>' + data.jurusan);

            $('#profile-telepon').html('<div class="text-muted">No. Telepon</div>' + data.telepon);
            $('#profile-no-ktp').html('<div class="text-muted">No. KTP</div>' + data.ktp);
            $('#profile-no-npwp').html('<div class="text-muted">No. NPWP</div>' + data.npwp);
            $('#profile-no-bpjstk').html('<div class="text-muted">No. BPJS TK</div>' + data.no_bpjstk);
            $('#profile-no-bpjskes').html('<div class="text-muted">No. BPJS Kes</div>' + data.no_bpjskes);
            $('#profile-no-jp').html('<div class="text-muted">No. JP</div>' + data.no_jp);
        };

        var renderProfileEdit = function(data) {
            $('#modal-title').html('Profil Karyawan - Ubah Data');

            // hide/show (un)related buttons
            $('#btn-edit-profile, #btn-remove-profile, #btn-close-profile').addClass('hide-me');
            $('#btn-save-profile, #btn-cancel-profile').removeClass('hide-me');

            // Set value in modal
            $('#modal-nama').html('<div class="form-material form-material-primary"><input class="form-control text-right font-s20" type="text" id="input-nama" name="material-color-primary" placeholder="' + data.nama + '" value="' + data.nama + '"></div>');
            $('#modal-jabatan').html(data.jabatan);
            $('#modal-divisi').html(data.division);

            $('#profile-status').html(renderEditingElement('text', data.status, 'status', 'Status Karyawan', false));
            $('#profile-nik').html(renderEditingElement('number', data.nik, 'nik', 'NIK', false));
            $('#profile-department').html(renderEditingElement('text', data.department, 'department', 'Departemen', false));
            $('#profile-section').html(renderEditingElement('text', data.section, 'section', 'Section', false));
            $('#profile-sub-section').html(renderEditingElement('text', data.subsection, 'subsection', 'Sub Section', false));
            $('#profile-group').html(renderEditingElement('text', data.group, 'group', 'Grup', false));
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

        // Table initiation
        var table = $('.js-dataTable-full-pagination').DataTable({
            order: [
                [0, "asc"]
            ],
            columnDefs: [{ orderable: true }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getEmployee.php',
                dataSrc: function(json) {
                    if (json.status == 'ok') {
                        var data = json.data;
                        var resultData = [];
                        data.forEach(function(x) {
                            // Manipulate result data
                            x.namaEdt = '<a data-id="' + x.nik + '" href="javascript:void(0)">' + x.nama + '</a>'
                            if (x.status == "Tetap") x.statusEdt = '<span class="label label-success">' + x.status + '</span>';
                            else if (x.status == "Kontrak 1") x.statusEdt = '<span class="label label-danger">' + x.status + '</span>';
                            else if (x.status == "Kontrak 2") x.statusEdt = '<span class="label label-warning">' + x.status + '</span>';
                            else x.statusEdt = '<span class="label label-default">' + x.status + '</span>';

                            resultData.push(x);
                        })
                        return resultData;
                    } else {
                        $.notify({
                            message: 'Data karyawan kosong!'
                        }, {
                            type: 'danger'
                        });
                        return [];
                    }
                }
            },
            deferRender: true,
            columns: [
                { data: "nik" },
                { className: "font-w600", data: "namaEdt" },
                { className: "hidden-xs", data: "division" },
                { className: "hidden-xs", data: "department" },
                { className: "hidden-xs", data: "statusEdt" },
                {
                    data: null,
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" id="btn-view"><i class="fa fa-eye"></i></button>' +
                            '<button class="btn btn-xs btn-default btn-edit" type="button"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default btn-remove" type="button"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });

        // When employee name is clicked
        $('.js-dataTable-full tbody').on('click', 'a, #btn-view', function() {
            var data = table.row($(this).parents('tr')).data();

            // Open the popup modal
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.nik);

            renderProfile(data);

            // Edit profile button
            $('#btn-edit-profile').click(function() {
                renderProfileEdit(data);
                $('#origin').val('modal');
            });

            // When Cancelling editing
            $('#btn-cancel-profile').on('click', function() {
                var origin = $('#origin').val();
                if (origin == 'modal') {
                    renderProfile(data);
                }
            });

            // When DELETE button is clicked
            $('#btn-remove-profile').on('click', function() {
                swal({
                    title: "Konfirmasi",
                    text: "Yakin akan menghapus data karyawan?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Hapus!",
                    cancelButtonText: "Batal",
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                        return new Promise(function(resolve) {
                            $.ajax({
                                    type: "POST",
                                    url: BASE_URL + "/php/api/deleteEmployee.php",
                                    dataType: 'json',
                                    data: {
                                        nik: $('#opened-profile').val()
                                    }
                                }).done(function(response) {
                                    if (response.status == 'err') {
                                        swal('Error', response.message, 'error');
                                    } else {
                                        swal('Selesai', response.message, 'success');
                                        $('#modal-profile').modal('hide');
                                        // reload the table
                                        table.ajax.reload();
                                    }
                                })
                                .fail(function() {
                                    swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                                });
                        });
                    },
                    allowOutsideClick: false
                })
            })
        });

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            $('#modal-profile').modal('show');
            renderProfileAdd();
            $('#opened-profile').val("");
        })

        // when CANCEL button clicked
        $(document).on('click', '#btn-cancel-profile', function() {
            var origin = $('#origin').val();
            if (origin != 'modal') {
                $('#modal-profile').modal('hide');
            }
        })

        // When EDIT button is clicked
        $(document).on('click', '.btn-edit', function() {
            var $btn = $(this);
            var $tr = $btn.closest('tr');
            var dataTableRow = table.row($tr[0]);
            var data = dataTableRow.data();
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.nik);
            renderProfileEdit(data);

            $('#origin').val('direct');
        });

        // When SAVE / SUBMIT button is clicked
        $(document).on('submit', '#profile-form', function(e) {
            e.preventDefault();

            var data = [];
            $('[id^="input-"]').filter(
                function() {
                    var elem = this;
                    // cleaning empty data [TEMP!]
                    if (elem['value'] != '') {
                        return data.push({
                            "key": elem['id'].replace('input-', ''),
                            "value": elem['value']
                        });
                    }
                });

            // Read current profile
            var cProf = $('#opened-profile').val();
            if (cProf == '') var apiUrl = BASE_URL + '/php/api/addEmployee.php';
            else var apiUrl = BASE_URL + '/php/api/updateEmployee.php';

            console.log('Sending...', data);

            // $.ajax({
            //     type: "POST",
            //     url: apiUrl,
            //     dataType: 'json',
            //     data: {
            //         obj: data,
            //         nik: $('#opened-profile').val()
            //     },
            //     success: function(res) {
            //         if (res.status == 'err') {
            //             swal("Error!", res.message, "error");
            //         } else {
            //             $('#modal-profile').modal('hide');
            //             swal("Berhasil!", "Data karyawan berhasil disimpan", "success");
            //             // reload the table
            //             table.ajax.reload();
            //         }

            //     }
            // })
        });


        // ADD PROFILE functions ::
        // when division selector changed
        $(document).on('change', '#input-division', function(e) {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating DEPARTEMEN selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'department',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.status == 'ok') repopulateSelector('input-department', res.data);
                    $('#input-section, #input-sub_section, #input-group').empty();
                }
            });
        });

        // when department selector changed
        $(document).on('change', '#input-department', function(e) {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating DEPARTEMEN selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'section',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.status == 'ok') repopulateSelector('input-section', res.data);
                    $('#input-sub_section, #input-group').empty();
                }
            });
        });

        // when section selector changed
        $(document).on('change', '#input-section', function(e) {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating DEPARTEMEN selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'sub_section',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.status == 'ok') repopulateSelector('input-sub_section', res.data);
                    $('#input-group').empty();
                }
            });
        });

        // when sub-section selector changed
        $(document).on('change', '#input-sub_section', function(e) {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating DEPARTEMEN selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'group',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.status == 'ok') repopulateSelector('input-group', res.data);
                }
            });
        });
    }

    return {
        init: function() {
            bsDataTables();
            sweetAlert();
            initStat();
            initTable();
            initEmployeePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    BasePagesEmployee.init();
});
