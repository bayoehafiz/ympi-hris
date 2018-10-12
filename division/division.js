var BasePagesDivision = function() {
    // DataTables Bootstrap integration
    var bsDataTables = function() {
        var $DataTable = jQuery.fn.dataTable;

        // Set the defaults for DataTables init
        jQuery.extend(true, $DataTable.defaults, {
            dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
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
        $DataTable.ext.renderer.pageButton.bootstrap = function(settings, host, idx, buttons, page, pages) {
            var api = new $DataTable.Api(settings);
            var classes = settings.oClasses;
            var lang = settings.oLanguage.oPaginate;
            var btnDisplay, btnClass;

            var attach = function(container, buttons) {
                var i, ien, node, button;
                var clickHandler = function(e) {
                    e.preventDefault();
                    if (!jQuery(e.currentTarget).hasClass('disabled')) {
                        api.page(e.data.action).draw(false);
                    }
                };

                for (i = 0, ien = buttons.length; i < ien; i++) {
                    button = buttons[i];

                    if (jQuery.isArray(button)) {
                        attach(container, button);
                    } else {
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
                                        settings.sTableId + '_' + button : null
                                })
                                .append(jQuery('<a>', {
                                        'href': '#'
                                    })
                                    .html(btnDisplay)
                                )
                                .appendTo(container);

                            settings.oApi._fnBindAction(
                                node, { action: button }, clickHandler
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

    var initDivisionPage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
            // Set active class for related menu
            $('#menu-divisi').addClass('active');
            // Set the page title
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-layers">&nbsp;&nbsp;</i>DATA DIVISI</h3>');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            console.log("Footer loaded!");
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu, .logo', function(e) {
            e.preventDefault;
            if ($(this).attr('route') != undefined) window.location.replace(BASE_URL + $(this).attr('route'));
            return false;
        });

        // Logout button
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });

        // set default hidden value for ACTIVE type
        $('#hidden-active-type').val('division');

        // Function to render elements inside the modal :: ADD
        var renderAddElement = function(type, name, label) {
            var elem = '';

            if (type == 'select') {
                // reset the selct elemnt first
                $('#input-parent').empty();

                // get the source DB table to populate parent's select
                if (label == 'Divisi Induk') var source_table = 'division';
                else if (label == 'Departemen Induk') var source_table = 'department';
                else if (label == 'Section Induk') var source_table = 'section';
                else var source_table = 'sub_section';

                $.ajax({
                    type: "POST",
                    url: BASE_URL + '/php/api/getDivisionData.php',
                    dataType: 'json',
                    data: {
                        table: source_table
                    }
                }).done(function(res) {
                    if (res.status == 'ok') {
                        var data = res.data;

                        $('#hidden-select').removeClass('hide-me');
                        $('#input-parent').append('<option></option>');
                        $('#label-parent').html(label);

                        data.forEach(function(v) {
                            $('#input-parent').append('<option value="' + v.id + '">' + v.nama + '</option>')
                        })
                    }
                })
            } else {
                elem += '<div class="form-group"><div class="form-material form-material-primary push-30">' +
                    '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
                    '<label for="elem-' + name + '">' + label + '</label>' +
                    '</div></div>';
            }

            // console.log(elem);
            return elem;
        };

        // when tabs clicked
        $(document).on('click', '.tab-btn', function() {
            var t = $(this).attr('data');
            $('#hidden-active-type').val(t);
            switch (t) {
                case 'department':
                    $('#btn-add').attr('data', 'Departemen');
                    initStat('department');
                    initTableDepartment();
                    break;
                case 'section':
                    $('#btn-add').attr('data', 'Section');
                    initStat('section');
                    initTableSection();
                    break;
                case 'sub_section':
                    $('#btn-add').attr('data', 'Sub Section');
                    initStat('sub_section');
                    initTableSubSection();
                    break;
                case 'group':
                    $('#btn-add').attr('data', 'Grup');
                    initStat('group');
                    initTableGroup();
                    break;
                default:
                    $('#btn-add').attr('data', 'Divisi');
                    initStat('division');
                    initTableDivision();
                    break;
            }
            $('#btn-add').attr('data-type', t);
        })

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            // reset the modal first!
            $('#modal-title, #generated-container').html('');
            $('#hidden-select').addClass('hide-me');

            var html = '';
            data_type = $(this).attr('data-type');
            $('#hidden-type').val(data_type);

            switch (data_type) {
                case "department":
                    html += renderAddElement('text', 'nama', 'Nama Departemen');
                    html += renderAddElement('text', 'kode', 'Kode Departemen');
                    html += renderAddElement('select', 'parent', 'Divisi Induk');
                    break;
                case "section":
                    html += renderAddElement('text', 'nama', 'Nama Section');
                    html += renderAddElement('text', 'kode', 'Kode Section');
                    html += renderAddElement('select', 'parent', 'Departemen Induk');
                    break;
                case "sub_section":
                    html += renderAddElement('text', 'nama', 'Nama Sub Section');
                    html += renderAddElement('select', 'parent', 'Section Induk');
                    break;
                case "group":
                    html += renderAddElement('text', 'nama', 'Nama Grup');
                    html += renderAddElement('select', 'parent', 'Sub Section induk');
                    break;
                default:
                    html += renderAddElement('text', 'nama', 'Nama Divisi');
                    html += renderAddElement('text', 'kode', 'Kode Divisi');
            }

            $('#modal-title').html('Tambah Data: ' + data_type);
            $('#generated-container').html(html);

            // hide unrelated buttons
            $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
            $('#modal').modal('show');
        });

        // When SAVE button is clicked
        $(document).on('submit', '#form-modal', function(e) {
            e.preventDefault();

            //$('#profile-form').validate(); // <- This one is not working!

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

            // Read current data type
            var dType = $('#hidden-active-type').val();

            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/addDivisionData.php',
                dataType: 'json',
                data: {
                    obj: data,
                    table: dType
                },
                success: function(res) {
                    if (res.status == 'err') {
                        swal("Error!", res.message, "error");
                    } else {
                        $('#modal').modal('hide');
                        $.notify({
                            "icon": "fa fa-check-circle",
                            "message": "Data berhasil ditambahkan"
                        }, {
                            "type": "success"
                        })

                        // reload the stat
                        initStat(dType);

                        // reload the table
                        var table = $('#table-' + dType.replace('_', '-')).DataTable(); // in case we got "sub_section" instead of "sub-section"
                        table.ajax.reload();
                    }

                }
            })
        });

        // When ACTION buttons clicked
        $(document).on('click', '.js-dataTable-full tbody button', function() {
            var act = $(this).attr('act');
            var active_table_id = $(this).parents("table").attr('id');
            var table = $('#' + active_table_id).DataTable();
            var data = table.row($(this).parents('tr')).data();

            // Lets decide which button is clicked:
            if (act == 'edit') { // edit the data
                // 
            } else if (act == 'remove') { // remove the data
                swal({
                    title: "Konfirmasi",
                    text: "Hapus " + data.nama.toUpperCase() + " dari database?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Hapus!",
                    cancelButtonText: "Batal",
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                        var dType = $('#hidden-active-type').val();
                        $.ajax({
                                type: "POST",
                                url: BASE_URL + "/php/api/deleteDivisionData.php",
                                dataType: 'json',
                                data: {
                                    id: data.id,
                                    table: dType
                                }
                            }).done(function(response) {
                                if (response.status == 'err') {
                                    swal('Error', response.message, 'error');
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

                                    // reload the table
                                    var table = $('#table-' + dType.replace("_", "-")).DataTable(); // in case we got "sub_section" instead of "sub-section"
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    },
                    allowOutsideClick: false
                })
            } else { // set active / non-active status
                var current_status = data.active;
                if (current_status == 1) {
                    var txt = "Set " + data.nama.toUpperCase() + " menjadi non-aktif?";
                } else {
                    var txt = "Set " + data.nama.toUpperCase() + " menjadi aktif?";
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
                    preConfirm: function() {
                        var dType = $('#hidden-active-type').val();
                        $.ajax({
                                type: "POST",
                                url: BASE_URL + "/php/api/updateDivisionDataStatus.php",
                                dataType: 'json',
                                data: {
                                    id: data.id,
                                    table: dType,
                                    status: current_status
                                }
                            }).done(function(response) {
                                if (response.status == 'err') {
                                    swal('Error', response.message, 'error');
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

                                    // reload the table
                                    var table = $('#table-' + dType.replace("_", "-")).DataTable(); // in case we got "sub_section" instead of "sub-section"
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    },
                    allowOutsideClick: false
                })
            }
        });

        // Lets init our first table :: Division Table
        initTableDivision();
    };

    var initStat = function(type) {
        // clear the container first
        var container = $('#stat-divisi');
        container.empty();
        // Get division datas
        $.ajax({
            type: "POST",
            url: BASE_URL + '/php/api/getDivisionStat.php',
            dataType: 'json',
            data: {
                table: type
            },
            success: function(res) {
                var html = '';
                if (res.status == 'ok') {
                    var data = res.data;
                    var data_length = data.length;
                    if (data_length > 0) {
                        html += '';
                        data.forEach(function(d) {
                            if (d.kode == undefined) d.kode = d.nama;
                            html += '<div class="col-md-2">' +
                                '<div class="font-w700 text-gray-darker animated fadIn">' + d.kode + '</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div></div>';
                        });
                    }
                }

                html += '<div class="col-md-2">' +
                    '<span class="h2 font-w300 text-primary animated flipInX">' +
                    '<button type="button" class="btn btn-primary btn-circle btn-lg push-5" id="btn-add" data-type="' + type + '"><i class="fa fa-plus"></i></button>' +
                    '</span>' +
                    '<div class="text-muted animated fadeIn"><small>Tambah Data</small></div>' +
                    '</div>';

                // append the result into container
                container.html(html);
            }
        })
    };

    var initTableDivision = function() {
        // Table initiation
        var table = $('#table-division').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'division'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data divisi kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
                    }
                }
            },
            cache: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "kode" },
                { className: "hidden-xs text-center", data: "child" },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success">Aktif</span>';
                        else return '<span class="label label-default">Non Aktif</span>';
                    }
                },
                {
                    data: null,
                    className: "text-center",
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" act="switch"><i class="fa fa-exchange"></i></button>' +
                            // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableDepartment = function() {
        // Table initiation
        var table = $('#table-department').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'department'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data department kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
                    }
                }
            },
            cache: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "kode" },
                { className: "hidden-xs text-center", data: "child" },
                { className: "hidden-xs", data: "parent" },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success">Aktif</span>';
                        else return '<span class="label label-default">Non Aktif</span>';
                    }
                },
                {
                    data: null,
                    className: "text-center",
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" act="switch"><i class="fa fa-exchange"></i></button>' +
                            // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableSection = function() {
        // Table initiation
        var table = $('#table-section').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'section'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data section kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
                    }
                }
            },
            cache: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "kode" },
                { className: "hidden-xs text-center", data: "child" },
                { className: "hidden-xs", data: "parent" },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success">Aktif</span>';
                        else return '<span class="label label-default">Non Aktif</span>';
                    }
                },
                {
                    data: null,
                    className: "text-center",
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" act="switch"><i class="fa fa-exchange"></i></button>' +
                            // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableSubSection = function() {
        // Table initiation
        var table = $('#table-sub-section').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'sub_section'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data sub-section kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
                    }
                }
            },
            cache: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "child", },
                { className: "hidden-xs", data: "parent" },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success">Aktif</span>';
                        else return '<span class="label label-default">Non Aktif</span>';
                    }
                },
                {
                    data: null,
                    className: "text-center",
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" act="switch"><i class="fa fa-exchange"></i></button>' +
                            // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableGroup = function() {
        // Table initiation
        var table = $('#table-group').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                type: "POST",
                data: {
                    table: 'group'
                },
                dataSrc: function(json) {
                    if (json.status == 'err') {
                        $.notify({
                            "icon": "fa fa-exclamation-circle",
                            "message": "Data group kosong"
                        }, {
                            "type": "danger"
                        });
                        return [];
                    } else {
                        return json.data;
                    }
                }
            },
            cache: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs", data: "parent" },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success">Aktif</span>';
                        else return '<span class="label label-default">Non Aktif</span>';
                    }
                },
                {
                    data: null,
                    className: "text-center",
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" act="switch"><i class="fa fa-exchange"></i></button>' +
                            // '<button class="btn btn-xs btn-default" type="button" act="edit"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default" type="button" act="remove"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    return {
        init: function() {
            bsDataTables();
            initStat('division');
            initDivisionPage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesDivision.init(); });
