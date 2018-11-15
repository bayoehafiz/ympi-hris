var BasePagesDivision = function() {

    window.initSidebar = function() {
        $('#sticky-sidebar').sticky({ topSpacing: 65, bottomSpacing: 100 });
    };


    var initDivisionPage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            // Set active class for related menu
            $('#menu-divisi').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            // Set the page title
            $('#header-title').html('<i class="si si-layers push-10-r"></i>Data Divisi');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            // console.log("Footer loaded!");
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu, .logo', function(e) {
            e.preventDefault;
            if ($(this).attr('route') != undefined) window.location.replace(ENV.BASE_URL + $(this).attr('route'));
            return false;
        });

        // Logout button
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });

        // when tabs clicked
        $(document).on('click', '.tab-btn', function() {
            var t = $(this).attr('data');
            $('#hidden-active-type').val(t);
            switch (t) {
                case 'division':
                    $('#btn-add').attr('data', 'Divisi');
                    $('#btn-add-text').text('Tambah Divisi');
                    initStat('division');
                    initTableDivision();
                    break;
                case 'department':
                    $('#btn-add').attr('data', 'Departemen');
                    $('#btn-add-text').text('Tambah Departemen');
                    initStat('department');
                    initTableDepartment();
                    break;
                case 'section':
                    $('#btn-add').attr('data', 'Section');
                    $('#btn-add-text').text('Tambah Section');
                    initStat('section');
                    initTableSection();
                    break;
                case 'sub_section':
                    $('#btn-add').attr('data', 'Sub Section');
                    $('#btn-add-text').text('Tambah Sub Section');
                    initStat('sub_section');
                    initTableSubSection();
                    break;
                case 'group':
                    $('#btn-add').attr('data', 'Grup');
                    $('#btn-add-text').text('Tambah Grup');
                    initStat('group');
                    initTableGroup();
                    break;
                default:
                    $('#btn-add').attr('data', 'Kode Bagian');
                    $('#btn-add-text').text('Tambah Bagian');
                    initStat('kode_bagian');
                    initTableKodeBagian();
                    break;
            }
            $('#btn-add').attr('data-type', t);
        })

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            App.blocks('#modal-block', 'state_loading');
            // reset the modal first!
            $('#modal-title, #generated-container').html('');
            $('div[id^=hidden-]').addClass('hide-me');

            // Set modal scope
            $('#hidden-modal-scope').val('add');
            $('#modal').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });
        });

        // When ACTION buttons clicked
        $(document).on('click', '.js-dataTable-full tbody button', function() {
            var act = $(this).attr('act');
            var active_table_id = $(this).parents("table").attr('id');
            var table = $('#' + active_table_id).DataTable();
            var data = table.row($(this).parents('tr')).data();

            // Lets decide which button is clicked:
            // 
            if (act == 'edit') { // EDIT the data
                App.blocks('#modal-block', 'state_loading');
                // reset the modal first!
                $('#modal-title, #generated-container').html('');
                $('div[id^=hidden-]').addClass('hide-me');
                // Set modal scope & id
                $('#hidden-modal-scope').val('edit');
                $('#hidden-opened-data').val(data.id);

                // Show modal
                $('#modal').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });

            } else if (act == 'remove') { // REMOVE the data
                if (data.nama == undefined)
                    var nama_kode = data.kode;
                else
                    var nama_kode = data.nama.toUpperCase();

                swal({
                        title: "Konfirmasi",
                        text: "Hapus " + nama_kode + " dari database?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Hapus!",
                        cancelButtonText: "Batal",
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false
                    })
                    .then(function(res) {
                        if (res) {
                            var dType = $('#hidden-active-type').val();
                            $.ajax({
                                    type: "POST",
                                    url: ENV.BASE_API + "deleteDivisionData.php",
                                    dataType: 'json',
                                    data: {
                                        id: data.id,
                                        table: dType
                                    }
                                }).done(function(response) {
                                    if (!response.success) {
                                        swal('Error', response.message, 'error');
                                    } else {
                                        swal('Success', response.message, 'success');

                                        // reload the stat
                                        initStat(dType);
                                        initSidebar(dType);

                                        // reload the table
                                        var table = $('#table-' + dType.replace("_", "-")).DataTable(); // in case we got "sub_section" instead of "sub-section"
                                        table.ajax.reload();
                                    }
                                })
                                .fail(function() {
                                    swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                                });
                        }
                    })
                    .catch(swal.noop);

            } else { // SET ACTIVE / NON-ACTIVE status
                if (data.nama == undefined)
                    var nama_kode = data.kode;
                else
                    var nama_kode = data.nama.toUpperCase();

                var current_status = data.active;
                if (current_status == 1) {
                    var txt = "Set " + nama_kode + " menjadi non-aktif?";
                } else {
                    var txt = "Set " + nama_kode + " menjadi aktif?";
                }

                swal({
                        title: "Konfirmasi",
                        text: txt,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ya",
                        cancelButtonText: "Batal",
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false
                    })
                    .then(function(res) {
                        if (res) {
                            var dType = $('#hidden-active-type').val();
                            $.ajax({
                                    type: "POST",
                                    url: ENV.BASE_API + "updateDivisionDataStatus.php",
                                    dataType: 'json',
                                    data: {
                                        id: data.id,
                                        table: dType,
                                        status: current_status
                                    }
                                }).done(function(response) {
                                    if (!response.success) {
                                        swal('Error', response.message, 'error');
                                        return false;
                                    } else {
                                        swal.close();
                                        $.notify({
                                            "icon": "fa fa-check-circle",
                                            "message": response.message
                                        }, {
                                            "type": "success"
                                        })

                                        // reload the stat
                                        initStat(dType);
                                        initSidebar(dType);

                                        // reload the table
                                        var table = $('#table-' + dType.replace("_", "-")).DataTable(); // in case we got "sub_section" or "kode_bagian"
                                        table.ajax.reload();

                                        return true;
                                    }
                                })
                                .fail(function() {
                                    swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                                });
                        }

                    })
                    .catch(swal.noop);
            }
        });

        // Function to populate Select2 AJAX
        function populateSelector(id, table, parent) {
            var selector = $('#input-' + id);
            selector.empty();
            $.getJSON(ENV.BASE_API + 'getSelectorData.php?table=' + table).success(function(val) {
                val.forEach(function(v) {
                    var option = new Option(v.text || v.kode, v.id, false, false);
                    selector.append(option).trigger('change');
                });
            });
        }

        // Function to assign value to Select2 AJAX
        function setSelector(id, table, value) {
            var selector = $('#input-' + id);
            selector.empty();
            $.getJSON(ENV.BASE_API + 'getSelectorData.php?table=' + table).success(function(val) {
                val.forEach(function(v) {
                    if (v.id == value) { // <- find the selected value
                        var option = new Option(v.text || v.kode, v.id, true, true);
                    } else {
                        var option = new Option(v.text || v.kode, v.id, false, false);
                    }
                    selector.append(option).trigger('change');
                });
            });
        }

        // selector JENIS BAGIAN onChange() handler
        $(document).on('change', '#input-bagian_key', function() {
            var selected = this.value;
            populateSelector('bagian_value', selected);
        });

        // MODAL EVENTS ::
        $('#modal')
            .on('shown.bs.modal', function() {
                var data_type = $('#hidden-active-type').val();
                var modal_scope = $('#hidden-modal-scope').val();
                var title = '',
                    html = '';

                if (modal_scope == 'add') { // ADD
                    switch (data_type) {
                        case "division":
                            title = 'Tambah Data Divisi';
                            html += renderAddElement('text', 'nama', 'Nama Divisi', 8);
                            break;
                        case "department":
                            title = 'Tambah Data Departemen';
                            html += renderAddElement('text', 'nama', 'Nama Departemen', 8);
                            html += renderAddElement('select', 'parent', 'Divisi Induk', 6);
                            break;
                        case "section":
                            title = 'Tambah Data Section';
                            html += renderAddElement('text', 'nama', 'Nama Section', 8);
                            html += renderAddElement('select', 'parent', 'Departemen Induk', 6);
                            break;
                        case "sub_section":
                            title = 'Tambah Data Sub Section';
                            html += renderAddElement('text', 'nama', 'Nama Sub Section', 8);
                            html += renderAddElement('select', 'parent', 'Section Induk', 6);
                            break;
                        case "group":
                            title = 'Tambah Data Grup';
                            html += renderAddElement('text', 'nama', 'Nama Grup', 8);
                            html += renderAddElement('select', 'parent', 'Sub Section induk', 6);
                            break;
                        default: // <- Kode Bagian
                            title = 'Tambah Data Kode Bagian';
                            html += renderAddElement('text', 'kode', 'Kode Bagian', 8);
                            html += renderAddElement('select', 'bagian_key', 'Jenis Bagian', 6);
                            html += renderAddElement('select', 'bagian_value', '', 6);
                            break;
                    }

                    // set modal title
                    $('#modal-title').html(title);
                    // Append generated elements
                    $('#generated-container').html(html);

                    // Destroy any Select2 instances first
                    $('[id^=input-]').filter(function() {
                        if ($(this).hasClass("select2-hidden-accessible")) $(this).select2('destroy');
                    });

                    // Inject Select2 into selectors
                    if (data_type == 'kode_bagian') {
                        // Initiate Select2 plugin elements
                        $('#input-bagian_key').select2({
                            minimumResultsForSearch: -1,
                            data: [{
                                text: 'Divisi',
                                id: 'division'
                            }, {
                                text: 'Departemen',
                                id: 'department'
                            }, {
                                text: 'Section',
                                id: 'section'
                            }, {
                                text: 'Sub Section',
                                id: 'sub_section'
                            }, {
                                text: 'Grup',
                                id: 'group'
                            }]
                        }).val(null).trigger('change');

                        $('#input-bagian_value').select2();
                    } else {
                        $('#input-parent').select2();
                        if (data_type == 'department') var target = 'division';
                        else if (data_type == 'section') var target = 'department';
                        else if (data_type == 'sub_section') var target = 'section';
                        else if (data_type == 'group') var target = 'sub_section';
                        else var target = null;
                        populateSelector('parent', target);
                    }

                } else { // EDIT
                    var id = $('#hidden-opened-data').val();
                    // fetch data
                    $.getJSON(ENV.BASE_API + 'getDivisionById.php?table=' + data_type + '&id=' + id, function(data) {
                        // console.log(data);
                        switch (data_type) {
                            case "division":
                                title = 'Ubah Data Divisi';
                                html += renderEditElement('text', 'nama', 'Nama Divisi', data.nama, 8);
                                break;
                            case "department":
                                title = 'Ubah Data Departemen';
                                html += renderEditElement('text', 'nama', 'Nama Departemen', data.nama, 8);
                                html += renderEditElement('select', 'parent', 'Divisi Induk', null, 6);
                                break;
                            case "section":
                                title = 'Ubah Data Section';
                                html += renderEditElement('text', 'nama', 'Nama Section', data.nama, 8);
                                html += renderEditElement('select', 'parent', 'Departemen Induk', null, 6);
                                break;
                            case "sub_section":
                                title = 'Ubah Data Sub Section';
                                html += renderEditElement('text', 'nama', 'Nama Sub Section', data.nama, 8);
                                html += renderEditElement('select', 'parent', 'Section Induk', null, 6);
                                break;
                            case "group":
                                title = 'Ubah Data Grup';
                                html += renderEditElement('text', 'nama', 'Nama Grup', data.nama, 8);
                                html += renderEditElement('select', 'parent', 'Sub Section induk', null, 6);
                                break;
                            default:
                                title = 'Ubah Data Kode Bagian';
                                html += renderEditElement('text', 'kode', 'Kode Bagian', data.kode, 8);
                                html += renderEditElement('predefined-select', 'bagian_key', 'Jenis Bagian', null, 6);
                                html += renderEditElement('select', 'bagian_value', '', null, 6);
                                break;
                        }

                        // set modal title
                        $('#modal-title').html(title);
                        // Append generated elements
                        $('#generated-container').html(html);

                        // Destroy any Select2 instances first
                        $('[id^=input-]').filter(function() {
                            if ($(this).hasClass("select2-hidden-accessible")) $(this).select2('destroy');
                        });

                        // Inject Select2 into selectors
                        if (data_type == 'kode_bagian') {
                            // Initiate Select2 plugin elements
                            $('#input-bagian_key')
                                .select2({
                                    minimumResultsForSearch: -1,
                                    data: [{
                                        text: 'Divisi',
                                        id: 'division'
                                    }, {
                                        text: 'Departemen',
                                        id: 'department'
                                    }, {
                                        text: 'Section',
                                        id: 'section'
                                    }, {
                                        text: 'Sub Section',
                                        id: 'sub_section'
                                    }, {
                                        text: 'Grup',
                                        id: 'group'
                                    }]
                                })
                                .val(data.bagian_key)
                                .trigger('change.select2');

                            if ($('#input-bagian_value').select2()) {
                                setSelector('bagian_value', data.bagian_key, data.bagian_value);
                            }
                        } else {
                            $('#input-parent').select2();
                            if (data_type == 'department') var target = 'division';
                            else if (data_type == 'section') var target = 'department';
                            else if (data_type == 'sub_section') var target = 'section';
                            else if (data_type == 'group') var target = 'sub_section';
                            else var target = null;
                            setSelector('parent', target, data.parent);
                        }
                    });
                }

                // init the validation
                if (initValidation(data_type)) {
                    // then stop the loader
                    App.blocks('#modal-block', 'state_normal');
                }
            })
            .on('hidden.bs.modal', function() {
                // reset all elements
                $('[id^=input-]').empty();
                // hide all hidden elements
                $('[id^=hidden-]').addClass('hide-me');
                // clear modal scope
                $('#hidden-modal-scope, #hidden-opened-data').val('');
            });

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';

        // PAGE INITIATION VALUES :
        // set default hidden value for ACTIVE type
        $('#hidden-active-type').val('kode_bagian');
        // Default button add text
        $('#btn-add-text').text('Tambah Bagian');
        // Load initial Stat & Table
        initStat('kode_bagian');
        initTableKodeBagian();
    };

    return {
        init: function() {
            bsDataTables();
            set_base('division');
            initSidebar();
            initDivisionPage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesDivision.init(); });
