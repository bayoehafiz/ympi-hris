var BasePagesDivision = function() {
    // Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidation = function(data_type) {
        switch (data_type) {
            case 'division':
                var nama = 'Divisi';
                var parent = '';
                var rules = {
                    'elem-nama': {
                        required: true,
                        minlength: 3
                    }
                };
                var messages = {
                    'elem-nama': {
                        required: 'Isikan Nama ' + nama,
                        minlength: 'Minimal 3 karakter'
                    }
                };
                break;
            case 'department':
                var nama = 'Departemen';
                var parent = 'Divisi';
                var rules = {
                    'elem-nama': {
                        required: true,
                        minlength: 3
                    },
                    'elem-parent': {
                        required: true
                    }
                };
                var messages = {
                    'elem-nama': {
                        required: 'Isikan Nama ' + nama,
                        minlength: 'Minimal 3 karakter'
                    },
                    'elem-parent': {
                        required: 'Pilih ' + parent + ' induk'
                    }
                };
                break;
            case 'section':
                var nama = 'Section';
                var parent = 'Departemen';
                var rules = {
                    'elem-nama': {
                        required: true,
                        minlength: 3
                    },
                    'elem-parent': {
                        required: true
                    }
                };
                var messages = {
                    'elem-nama': {
                        required: 'Isikan Nama ' + nama,
                        minlength: 'Minimal 3 karakter'
                    },
                    'elem-parent': {
                        required: 'Pilih ' + parent + ' induk'
                    }
                };
                break;
            case 'sub_section':
                var nama = 'Sub Section';
                var parent = 'Section';
                var rules = {
                    'elem-nama': {
                        required: true,
                        minlength: 3
                    },
                    'elem-parent': {
                        required: true
                    }
                };
                var messages = {
                    'elem-nama': {
                        required: 'Isikan Nama ' + nama,
                        minlength: 'Minimal 3 karakter'
                    },
                    'elem-parent': {
                        required: 'Pilih ' + parent + ' induk'
                    }
                };
                break;
            case 'group':
                var nama = 'Grup';
                var parent = 'Sub Section';
                var rules = {
                    'elem-nama': {
                        required: true,
                        minlength: 3
                    },
                    'elem-parent': {
                        required: true
                    }
                };
                var messages = {
                    'elem-nama': {
                        required: 'Isikan Nama ' + nama,
                        minlength: 'Minimal 3 karakter'
                    },
                    'elem-parent': {
                        required: 'Pilih ' + parent + ' induk'
                    }
                };
                break;
            default:
                var nama = 'Kode Bagian';
                var parent = '';
                var rules = {
                    'elem-kode': {
                        required: true,
                        minlength: 3
                    },
                    'elem-bagian_key': {
                        required: true
                    },
                    'elem-bagian_value': {
                        required: true
                    }
                };
                var messages = {
                    'elem-kode': {
                        required: 'Isikan Kode',
                        minlength: 'Minimal 3 karakter'
                    },
                    'elem-bagian_key': {
                        required: 'Pilih Jenis Bagian'
                    },
                    'elem-bagian_value': {
                        required: 'Pilih *'
                    }
                };
                break;
        }

        window.$validator = $('.js-validation-material').validate({
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
            rules: rules,
            messages: messages,
            submitHandler: function(form) {
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
                            initSidebar();
                            initStat();

                            // reload the table
                            var table = $('#table-' + dType.replace('_', '-')).DataTable(); // in case we got "sub_section" instead of "sub-section"
                            table.ajax.reload();
                        }

                    }
                })
            }
        });
    };

    var initStat = function() {
        // clear the container first
        var container = $('#stat-divisi');
        container.empty();
        // Get division datas
        $.ajax({
            type: "POST",
            url: BASE_URL + '/php/api/getDivisionStat.php',
            dataType: 'json',
            data: {
                table: 'kode_bagian'
            },
            success: function(res) {
                var html = '';
                if (res.success) {
                    var data = [];
                    var str = JSON.stringify(res.data[0]); // convert to String
                    str = str.substring(str.indexOf('{') + 1, str.indexOf('}')); // remove Brackets
                    str.split(',').forEach(function(a) { // split by Comma and make an array
                        var split = a.split(':'); // split by Colon and push into DATA
                        data.push({
                            label: split[0].toString(),
                            value: split[1]
                        })
                    });

                    var data_length = data.length;
                    if (data_length > 0) {
                        html += '';
                        data.forEach(function(d) {
                            html += '<div class="col-md-2">' +
                                '<span class="h1 font-w700 text-primary animated flipInX">' + d.value.replace(/\"/g, "") + '</span>' +
                                '<div class="font-w700 text-gray-darker animated fadIn">' + d.label.replace(/\"/g, "") + '</div>' +
                                '</div>';
                        });
                    }
                }

                html += '<div class="col-md-2 pull-right push-5-t">' +
                    '<span class="h1 font-w700 text-primary animated flipInX">' +
                    '<button type="button" class="btn btn-primary btn-circle btn-lg push-5" id="btn-add" data-type="kode_bagian"><i class="fa fa-plus"></i></button>' +
                    '</span>' +
                    // '<div class="text-muted animated fadeIn"><small>Tambah Data</small></div>' +
                    '</div>';

                // append the result into container
                container.html(html);
            }
        });
    };

    var initSidebar = function(type) {
        var container = $('#sidebar-data-' + type);
        container.empty();
        // Get division datas
        $.ajax({
            type: "POST",
            url: BASE_URL + '/php/api/getDivisionTableStat.php',
            dataType: 'json',
            data: {
                table: type
            },
            success: function(res) {
                var html = '';
                if (res.success) {
                    var data = res.data;
                    var data_length = data.length;
                    if (data_length > 0) {
                        var counter = 0;
                        data.forEach(function(d) {
                            if (d.total != 0) {
                                counter++;
                                if (d.kode == undefined) d.kode = d.nama;

                                if (d.active == 0) {
                                    var text_color_1 = " text-muted";
                                    var text_color_2 = " text-muted";
                                    var hotlink_o = '';
                                    var hotlink_c = '';
                                    var $a = d.total;
                                    var $b = d.kode;
                                } else {
                                    var text_color_1 = " text-muted";
                                    var text_color_2 = "";
                                    var hotlink_o = '<a href="' + BASE_URL + '/employee/?filter=' + type + '&value=' + d.id + '">';
                                    var hotlink_c = '</a>';
                                    var $a = d.total;
                                    var $b = d.kode;
                                }

                                html += '<div class="block-content push-10">' +
                                    hotlink_o +
                                    '<div class="h3 font-w600' + text_color_2 + '">' + $a + '</div>' +
                                    '<div class="h5 text-muted push-5-t' + text_color_1 + '">' + $b + '</div>' +
                                    hotlink_c +
                                    '</div>';
                            }
                        });
                    }
                }

                // if there's no data to show at all!
                if (html == '') {
                    html += '<div class="alert alert-warning push-20-t">' +
                        '<h3 class="font-w300 push-5"><i class="si si-info"></i></h3>' +
                        '<p>Tidak ada data untuk ditampilkan!</p>' +
                        '</div>';
                }

                // append the result into container
                container.append(html);
            }
        });
    };

    var initTableKodeBagian = function() {
        // Table initiation
        var table = $('#table-kode-bagian').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                data: {
                    table: 'kode_bagian'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "font-w600 text-center", data: "kode" },
                {
                    className: "text-center",
                    data: 'bagian_key',
                    render: function(data, type, row) {
                        switch (data) {
                            case 'division':
                                var jenis_bagian = 'Divisi';
                                break;
                            case 'department':
                                var jenis_bagian = 'Departemen';
                                break;
                            case 'section':
                                var jenis_bagian = 'Section';
                                break;
                            case 'sub_section':
                                var jenis_bagian = 'Sub Section';
                                break;
                            default:
                                var jenis_bagian = 'Grup';
                                break;
                        }
                        return jenis_bagian;
                    }
                },
                {
                    className: "text-center",
                    data: 'bagian_value',
                    // render: function(data, type, row) {
                    //     $.ajax({
                    //         type: "POST",
                    //         url: BASE_URL + "/php/api/getDivisionName.php",
                    //         dataType: 'json',
                    //         data: {
                    //             table: row.bagian_key,
                    //             id: parseInt(data)
                    //         }
                    //     }).done(function(res) {
                    //         console.log(res.data[0].nama);
                    //         var nama_bagian;
                    //         if (res.success) nama_bagian = res.data[0].nama;
                    //         else nama_bagian = '-';
                    //         return nama_bagian;
                    //     })
                    // }
                },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-power"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initTableDivision = function() {
        // Table initiation
        var table = $('#table-division').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                data: {
                    table: 'division'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-power"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
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
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                data: {
                    table: 'department'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "child" },
                { className: "hidden-xs", data: "parent_name" },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-power"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
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
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                data: {
                    table: 'section'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "child" },
                { className: "hidden-xs", data: "parent_name" },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-power"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
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
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                data: {
                    table: 'sub_section'
                },
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs text-center", data: "child", },
                { className: "hidden-xs", data: "parent_name" },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-power"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
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
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                "visible": false,
                "targets": 0
            }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getDivision.php',
                data: {
                    table: 'group'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "font-w600 ", data: "nama" },
                { className: "hidden-xs", data: "parent_name" },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-power"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });
    };

    var initDivisionPage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");
            // Set active class for related menu
            $('#menu-divisi').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
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

        // when tabs clicked
        $(document).on('click', '.tab-btn', function() {
            var t = $(this).attr('data');
            $('#hidden-active-type').val(t);
            switch (t) {
                case 'division':
                    $('#btn-add').attr('data', 'Divisi');
                    initSidebar('division');
                    initTableDivision();
                    break;
                case 'department':
                    $('#btn-add').attr('data', 'Departemen');
                    initSidebar('department');
                    initTableDepartment();
                    break;
                case 'section':
                    $('#btn-add').attr('data', 'Section');
                    initSidebar('section');
                    initTableSection();
                    break;
                case 'sub_section':
                    $('#btn-add').attr('data', 'Sub Section');
                    initSidebar('sub_section');
                    initTableSubSection();
                    break;
                case 'group':
                    $('#btn-add').attr('data', 'Grup');
                    initSidebar('group');
                    initTableGroup();
                    break;
                default:
                    $('#btn-add').attr('data', 'Kode Bagian');
                    initSidebar('kode_bagian');
                    initTableKodeBagian();
                    break;
            }
            $('#btn-add').attr('data-type', t);
        })

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            // reset the modal first!
            $('#modal-title, #generated-container').html('');
            $('div[id^=hidden-]').addClass('hide-me');

            var html = '';
            data_type = $('#hidden-active-type').val();
            $('#hidden-type').val(data_type);

            switch (data_type) {
                case "division":
                    html += renderAddElement('text', 'nama', 'Nama Divisi');
                    break;
                case "department":
                    $('#hidden-parent').removeClass('hide-me');
                    html += renderAddElement('text', 'nama', 'Nama Departemen');
                    html += renderAddElement('select', 'parent', 'Divisi Induk');
                    break;
                case "section":
                    $('#hidden-parent').removeClass('hide-me');
                    html += renderAddElement('text', 'nama', 'Nama Section');
                    html += renderAddElement('select', 'parent', 'Departemen Induk');
                    break;
                case "sub_section":
                    $('#hidden-parent').removeClass('hide-me');
                    html += renderAddElement('text', 'nama', 'Nama Sub Section');
                    html += renderAddElement('select', 'parent', 'Section Induk');
                    break;
                case "group":
                    $('#hidden-parent').removeClass('hide-me');
                    html += renderAddElement('text', 'nama', 'Nama Grup');
                    html += renderAddElement('select', 'parent', 'Sub Section induk');
                    break;
                default:
                    $('#hidden-bagian_key, #hidden-bagian_value').removeClass('hide-me');
                    html += renderAddElement('text', 'kode', 'Kode Bagian');
                    html += renderAddElement('predefined-select', 'bagian_key', 'Jenis Bagian', [{
                        key: 'Divisi',
                        value: 'division'
                    }, {
                        key: 'Departemen',
                        value: 'department'
                    }, {
                        key: 'Section',
                        value: 'section'
                    }, {
                        key: 'Sub Section',
                        value: 'sub_section'
                    }, {
                        key: 'Grup',
                        value: 'group'
                    }]);
                    break;
            }

            // init the validation
            initValidation(data_type);

            $('#modal-title').html('Tambah Data: ' + data_type);
            $('#generated-container').html(html);

            // hide unrelated buttons
            $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
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
            // console.log(data);

            // Lets decide which button is clicked:
            if (act == 'edit') { // EDIT the data
                // reset the modal first!
                $('#modal-title, #generated-container').html('');
                $('div[id^=hidden-]').addClass('hide-me');

                var html = '';
                data_type = $('#hidden-active-type').val();
                $('#hidden-type').val(data_type);

                switch (data_type) {
                    case "division":
                        html += renderEditElement('text', 'nama', 'Nama Divisi', data.nama);
                        break;
                    case "department":
                        console.log(data);
                        $('#hidden-parent').removeClass('hide-me');
                        html += renderEditElement('text', 'nama', 'Nama Departemen', data.nama);
                        html += renderEditElement('select', 'parent', 'Divisi Induk', data.parent);
                        break;
                    case "section":
                        $('#hidden-parent').removeClass('hide-me');
                        html += renderEditElement('text', 'nama', 'Nama Section', data.nama);
                        html += renderEditElement('select', 'parent', 'Departemen Induk', data.parent);
                        break;
                    case "sub_section":
                        $('#hidden-parent').removeClass('hide-me');
                        html += renderEditElement('text', 'nama', 'Nama Sub Section', data.nama);
                        html += renderEditElement('select', 'parent', 'Section Induk', data.parent);
                        break;
                    case "group":
                        $('#hidden-parent').removeClass('hide-me');
                        html += renderEditElement('text', 'nama', 'Nama Grup', data.nama);
                        html += renderEditElement('select', 'parent', 'Sub Section induk', data.parent);
                        break;
                    default:
                        $('#hidden-bagian_key, #hidden-bagian_value').removeClass('hide-me');
                        html += renderEditElement('text', 'kode', 'Kode Bagian', data.kode);
                        html += renderEditElement('predefined-select', 'bagian_key', 'Jenis Bagian', data.bagian_key, [{
                            key: 'Divisi',
                            value: 'division'
                        }, {
                            key: 'Departemen',
                            value: 'department'
                        }, {
                            key: 'Section',
                            value: 'section'
                        }, {
                            key: 'Sub Section',
                            value: 'sub_section'
                        }, {
                            key: 'Grup',
                            value: 'group'
                        }]);
                        html += renderEditElement('predefined-select', 'bagian_value', '', data.bagian_value);
                        break;
                }

                // init the validation
                initValidation(data_type);

                $('#modal-title').html('Tambah Data: ' + data_type);
                $('#generated-container').html(html);

                // hide unrelated buttons
                $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
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
                                    initStat();
                                    initSidebar(dType);

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
                                if (!response.success) {
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
                                    initStat();
                                    initSidebar(dType);

                                    // reload the table
                                    var table = $('#table-' + dType.replace("_", "-")).DataTable(); // in case we got "sub_section" or "kode_bagian"
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

        // selector JENIS BAGIAN onChange() handler
        $(document).on('change', '#input-bagian_key', function() {
            var selected = this.value;

            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: selected
                },
                success: function(res) {
                    if (res.success) {
                        $targetSelector = $('#input-bagian_value');
                        res.data.forEach(function(v) {
                            $targetSelector.append('<option value="' + v.id + '">' + v.nama + '</option>');
                        })
                    }
                }
            });
        });

        // when modal on close
        $('#modal').on('hidden.bs.modal', function() {
            console.log('Destroying validator and resetting elements...');
            window.$validator.destroy();

            // reset all elements
            $('[id^=input-]').empty();

            // hide all hidden elements
            $('[id^=hidden-]').addClass('hide-me');
        })

        // set default hidden value for ACTIVE type
        $('#hidden-active-type').val('kode_bagian');

        // init the Datatables BS style
        bsDataTables();

        // Lets init our first table :: Kode Bagian Table
        initTableKodeBagian();

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';
    };

    return {
        init: function() {
            initStat();
            initSidebar('kode_bagian');
            initDivisionPage();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    // Core Variable
    window.BASE_URL = url('protocol') + '://' + url('hostname');

    BasePagesDivision.init();
});
