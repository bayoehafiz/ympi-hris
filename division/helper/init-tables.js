window.initTableKodeBagian = function() {
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

window.initTableDivision = function() {
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

window.initTableDepartment = function() {
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

window.initTableSection = function() {
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

window.initTableSubSection = function() {
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

window.initTableGroup = function() {
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
