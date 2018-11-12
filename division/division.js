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
                        minlength: 2
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
                        minlength: 2
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
                        minlength: 2
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
                        minlength: 2
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
                        minlength: 2
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
                        minlength: 2
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
                var $table = $('#hidden-active-type').val();
                var $id = $('#hidden-opened-data').val();

                // Read the current scope (add OR edit)
                var $scope = $('#hidden-modal-scope').val();

                if ($scope == 'add') {
                    var $apiUrl = ENV.BASE_API + 'addDivisionData.php';
                    var $payload = {
                        obj: data,
                        table: $table
                    };
                    var $text = 'Data berhasil ditambahkan';

                } else {
                    var $apiUrl = ENV.BASE_API + 'updateDivisionData.php';
                    var $payload = {
                        id: $id,
                        data: data,
                        table: $table
                    };
                    var $text = 'Data berhasil di-update';
                }

                // Call the API!
                $.ajax({
                    type: "POST",
                    url: $apiUrl,
                    dataType: 'json',
                    data: $payload,
                    success: function(res) {
                        if (res.status == 'err') {
                            swal("Error!", res.message, "error");
                        } else {
                            $('#modal').modal('hide');
                            $.notify({
                                "icon": "fa fa-check-circle",
                                "message": $text
                            }, {
                                "type": "success"
                            })

                            // reload the stats
                            // initSidebar();
                            initStat($table);

                            // reload the table
                            var table = $('#table-' + $table.replace('_', '-')).DataTable(); // in case we got "sub_section" instead of "sub-section"
                            table.ajax.reload();
                        }

                    }
                })
            }
        });
    };

    var initStat = function(type) {
        // clear the container first
        var container = $('#stat-division');
        container.empty();

        // Get division datas
        $.ajax({
            type: "POST",
            url: ENV.BASE_API + 'getDivisionStat.php',
            dataType: 'json',
            data: {
                table: type
            },
            success: function(res) {
                var html = '';
                if (res.success) {
                    var data = res.data;
                    if (data.length > 0) {
                        html += '';

                        // Grouping the kode_bagian by `nama`
                        var temp = data;
                        data = [];
                        temp.reduce(function(res, value) {
                            if (!res[value.nama]) {
                                res[value.nama] = {
                                    id: value.id,
                                    total: 0,
                                    nama: value.nama
                                };
                                data.push(res[value.nama])
                            }
                            res[value.nama].total += parseInt(value.total);
                            return res;
                        }, {});

                        data.forEach(function(d) {
                            html += '<div>' +
                                '<a href="' + ENV.BASE_URL + '/employee/?filter=' + type + '&value=' + d.id + '">' +
                                '<span class="h1 font-w700 text-primary animated flipInX" data-toggle="countTo" data-to="' + d.total + '"></span>' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">' + d.nama + '</div>' +
                                '</div>' +
                                '</div>';
                        });
                        container.append(html);
                    }
                } else {
                    swal('Error', res.message, 'error');
                }

                // reinitiate counter plugin
                App.initHelpers(['appear-countTo']);

                // re-initialize slider plugin
                if (type == 'kode_bagian') var $dataToShow = 7;
                else var $dataToShow = 6;
                if (container.hasClass('slick-initialized')) {
                    container.slick('removeSlide', null, null, true); // remove all previous slides
                    container.slick('unslick');
                }
                container.slick({
                    autoplay: true,
                    dots: false,
                    slidesToShow: $dataToShow,
                    prevArrow: '<span class="prev"><i class="fa fa-angle-left fa-3x text-primary-lighter"></i></span>',
                    nextArrow: '<span class="next"><i class="fa fa-angle-right fa-3x text-primary-lighter"></i></span>',
                });

                // Inject data-type to btn-add
                $('#btn-add').attr('data-type', type);
            }
        });
    };

    var initSidebar = function() {
        $('#sticky-sidebar').sticky({ topSpacing: 65, bottomSpacing: 100 });
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
                url: ENV.BASE_API + 'getDivision.php',
                data: {
                    table: 'kode_bagian'
                },
                dataSrc: function(json) {
                    return json.aaData;
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                {
                    className: "font-w600 text-center",
                    data: "kode",
                    render: function(data, type, row) {
                        if (row.active == 0 && row.created == row.updated) {
                            return data + '<span class="label label-success push-10-l">BARU</span>';
                        } else {
                            return data;
                        }
                    }
                },
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
                    data: "nama_bagian"
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-refresh"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ],
            language: {
                emptyTable: "Tidak ada data tersedia",
                processing: "Mengambil Data... ",
                zeroRecords: "Tidak ada data ditemukan",
                info: "Menampilkan _START_ - _END_ dari total _TOTAL_ data",
                infoEmpty: "Menampilkan 0 dari total 0 data",
                search: "Cari: ",
            },
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
                url: ENV.BASE_API + 'getDivision.php',
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
                {
                    className: "font-w600 ",
                    data: "nama",
                    render: function(data, type, row) {
                        if (row.active == 0 && row.created == row.updated) {
                            return data + '<span class="label label-success push-10-l">BARU</span>';
                        } else {
                            return data;
                        }
                    }
                },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-refresh"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ],
            language: {
                emptyTable: "Tidak ada data tersedia",
                processing: "Mengambil Data... ",
                zeroRecords: "Tidak ada data ditemukan",
                info: "Menampilkan _START_ - _END_ dari total _TOTAL_ data",
                infoEmpty: "Menampilkan 0 dari total 0 data",
                search: "Cari: ",
            },
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
                url: ENV.BASE_API + 'getDivision.php',
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
                {
                    className: "font-w600 ",
                    data: "nama",
                    render: function(data, type, row) {
                        if (row.active == 0 && row.created == row.updated) {
                            return data + '<span class="label label-success push-10-l">BARU</span>';
                        } else {
                            return data;
                        }
                    }
                },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-refresh"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ],
            language: {
                emptyTable: "Tidak ada data tersedia",
                processing: "Mengambil Data... ",
                zeroRecords: "Tidak ada data ditemukan",
                info: "Menampilkan _START_ - _END_ dari total _TOTAL_ data",
                infoEmpty: "Menampilkan 0 dari total 0 data",
                search: "Cari: ",
            },
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
                url: ENV.BASE_API + 'getDivision.php',
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
                {
                    className: "font-w600 ",
                    data: "nama",
                    render: function(data, type, row) {
                        if (row.active == 0 && row.created == row.updated) {
                            return data + '<span class="label label-success push-10-l">BARU</span>';
                        } else {
                            return data;
                        }
                    }
                },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-refresh"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ],
            language: {
                emptyTable: "Tidak ada data tersedia",
                processing: "Mengambil Data... ",
                zeroRecords: "Tidak ada data ditemukan",
                info: "Menampilkan _START_ - _END_ dari total _TOTAL_ data",
                infoEmpty: "Menampilkan 0 dari total 0 data",
                search: "Cari: ",
            },
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
                url: ENV.BASE_API + 'getDivision.php',
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
                {
                    className: "font-w600 ",
                    data: "nama",
                    render: function(data, type, row) {
                        if (row.active == 0 && row.created == row.updated) {
                            return data + '<span class="label label-success push-10-l">BARU</span>';
                        } else {
                            return data;
                        }
                    }
                },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-refresh"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ],
            language: {
                emptyTable: "Tidak ada data tersedia",
                processing: "Mengambil Data... ",
                zeroRecords: "Tidak ada data ditemukan",
                info: "Menampilkan _START_ - _END_ dari total _TOTAL_ data",
                infoEmpty: "Menampilkan 0 dari total 0 data",
                search: "Cari: ",
            },
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
                url: ENV.BASE_API + 'getDivision.php',
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
                {
                    className: "font-w600 ",
                    data: "nama",
                    render: function(data, type, row) {
                        if (row.active == 0 && row.created == row.updated) {
                            return data + '<span class="label label-success push-10-l">BARU</span>';
                        } else {
                            return data;
                        }
                    }
                },
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
                            '<button class="btn btn-sm btn-default" type="button" act="switch"><i class="si si-refresh"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="edit"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default" type="button" act="remove"><i class="si si-trash"></i></button>' +
                            '</div>';
                    }
                }
            ],
            language: {
                emptyTable: "Tidak ada data tersedia",
                processing: "Mengambil Data... ",
                zeroRecords: "Tidak ada data ditemukan",
                info: "Menampilkan _START_ - _END_ dari total _TOTAL_ data",
                infoEmpty: "Menampilkan 0 dari total 0 data",
                search: "Cari: ",
            },
        });
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
            // reset the modal first!
            $('#modal-title, #generated-container').html('');
            $('div[id^=hidden-]').addClass('hide-me');

            var html = '';
            data_type = $('#hidden-active-type').val();

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

                // reset the modal first!
                $('#modal-title, #generated-container').html('');
                $('div[id^=hidden-]').addClass('hide-me');

                var html = '';
                data_type = $('#hidden-active-type').val();

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
                        html += renderEditElement('select', 'bagian_value', '', {
                            table: data.bagian_key,
                            id: data.bagian_value
                        });
                        break;
                }

                // init the validation
                initValidation(data_type);

                $('#modal-title').html('Ubah Data: ' + data_type);
                $('#generated-container').html(html);

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
                                    if (response.status == 'err') {
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

        // selector JENIS BAGIAN onChange() handler
        $(document).on('change', '#input-bagian_key', function() {
            var selected = this.value;

            $.ajax({
                type: "POST",
                url: ENV.BASE_API + 'getSelectorData.php',
                dataType: 'json',
                data: {
                    table: selected
                },
                success: function(res) {
                    if (res.success) {
                        $targetSelector = $('#input-bagian_value');
                        $targetSelector.empty();
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

            // clear modal scope
            $('#hidden-modal-scope, #hidden-opened-data').val('');
        })

        // set default hidden value for ACTIVE type
        $('#hidden-active-type').val('kode_bagian');

        // Default button add text
        $('#btn-add-text').text('Tambah Bagian');

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';
    };

    return {
        init: function() {
            bsDataTables();
            set_base('division');
            initStat('kode_bagian');
            initSidebar();
            initTableKodeBagian();
            initDivisionPage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesDivision.init(); });
