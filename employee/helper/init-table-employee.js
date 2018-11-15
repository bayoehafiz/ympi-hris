// Init table employee
window.initTableEmployee = function(filter) {
    if (!filter || filter.length > 0) var $filter = filter;
    else var $filter = '';

    // Table initiation
    var table = $('#table-employee').DataTable({
        destroy: true, // destroy it first, if there is an active table instance
        autoWidth: false,
        stateSave: true,
        order: [
            [0, "asc"]
        ],
        pageLength: 20,
        lengthMenu: [
            [20, 50, 100],
            [20, 50, 100]
        ],
        processing: true,
        serverSide: true,
        deferRender: true,
        serverMethod: 'post',
        ajax: {
            url: ENV.BASE_API + 'getEmployee.php',
            data: {
                scope: 'active', // <- to fetch ACTIVE EMPLOYEE only!
                filter: $filter
            },
        },
        createdRow: function(row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [{
                data: "updated",
                visible: false
            },
            {
                orderable: false,
                searchable: false,
                className: "text-center",
                data: "photo_url",
                render: function(data, type, row) {
                    return '<img src="../' + data + '" class="img-avatar img-avatar32" />';
                }
            }, {
                className: "font-w600",
                data: "nama",
                render: function(data, type, row) {
                    return '<a class="link-view" href="javascript:void(0)">' + data + '</a>';
                }
            }, {
                className: "text-center",
                data: "nik"
            }, {
                className: "text-center d-inline-block text-truncate",
                data: "nama_group",
                render: function(data, type, row) {
                    // Show employee's GROUP
                    if (data == null) { // if empty, show SUB_SECTION instead
                        if (row.nama_sub_section == null) { // if empty, show SECTION instead
                            if (row.nama_section == null) { // if empty, show DEPTARTMENT instead
                                if (row.nama_department == null) {
                                    if (row.nama_division == null) {
                                        return "-";
                                    }
                                    return "<small class=\"text-muted\">Divisi</small><br/>" + row.nama_division.toUpperCase();
                                }
                                return "<small class=\"text-muted\">Departemen</small><br/>" + row.nama_department.toUpperCase();
                            }
                            return "<small class=\"text-muted\">Section</small><br/>" + row.nama_section.toUpperCase();
                        }
                        return "<small class=\"text-muted\">Sub Section</small><br/>" + row.nama_sub_section.toUpperCase();
                    }
                    return "<small class=\"text-muted\">Grup</small><br/>" + data.toUpperCase();
                }
            }, {
                className: "text-center d-inline-block text-truncate",
                data: "kode_grade",
                render: function(data, type, row) {
                    if (data == null) return "-";
                    else return data + "<br/><small class=\"text-muted\">" + row.nama_grade + "</small>";
                }
            },
            {
                className: "text-center",
                data: "status",
                render: function(data, type, row) {
                    var statusEdt = '';

                    if (data == "Tetap") statusEdt = '<span class="label label-primary">' + data.toUpperCase() + '</span>';
                    else if (data == "Kontrak 1") statusEdt = '<span class="label label-warning">' + data.toUpperCase() + '</span>';
                    else if (data == "Kontrak 2") statusEdt = '<span class="label label-info">' + data.toUpperCase() + '</span>';
                    else statusEdt = '<span class="label label-default">' + data.toUpperCase() + '</span>';

                    return statusEdt;
                }
            }, {
                className: "text-center",
                data: null,
                render: function(data, type, row) {
                    return '<div class="btn-group text-center">' +
                        '<button class="btn btn-sm btn-default btn-view" type="button"><i class="si si-eye"></i></button>' +
                        '<button class="btn btn-sm btn-default btn-edit" type="button"><i class="si si-pencil"></i></button>' +
                        '<button class="btn btn-sm btn-default btn-remove" type="button"><i class="si si-trash"></i></button>' +
                        '</div>';
                },
                searchable: false,
                orderable: false
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
        fnInitComplete: function() {
            // console.log("Table Employee loaded!");
            App.blocks('#filter-block', 'state_normal');
        }
    });


    // TABLE ACTIONS !!!
    // 
    // When employee NAME or TABLE'S VIEW button is clicked
    $(document).on('click', 'a.link-view, .btn-view', function() {
        var id = $(this).parents('tr').attr('data-id');
        viewData(id);
    });

    // When TABLE'S EDIT button is clicked
    $(document).on('click', '.btn-edit', function() {
        var id = $(this).parents('tr').attr('data-id');
        $('#origin').val('direct');
        editData(id);
    });

    // When table-employee DELETE button is clicked
    $(document).on('click', '.btn-remove', function() {
        var id = $(this).parents('tr').attr('data-id');
        removeData(id);
    });
    // 
    // END TABLE ACTIONS
};
