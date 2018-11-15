// Init table employee
window.initTableTerminated = function(filterData) {
    // Table initiation
    var table = $('#table-terminated').DataTable({
        destroy: true, // destroy it first, if there is an active table instance
        autoWidth: false,
        responsive: true,
        order: [
            [0, "asc"]
        ],
        // columnDefs: [
        //     { targets: 0, type: 'nik-formatted' }
        // ],
        pageLength: 10,
        lengthMenu: [
            [10, 20, 50, 100],
            [10, 20, 50, 100]
        ],
        processing: true,
        serverSide: true,
        serverMethod: 'post',
        ajax: {
            url: ENV.BASE_API + 'getEmployee.php',
            data: {
                scope: 'inactive'
            }
        },
        deferRender: true,
        createdRow: function(row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [{
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
                    return '<a class"link-view-terminated" data-id="' + row.nik + '" href="javascript:void(0)">' + data + '</a>';
                }
            }, {
                className: "text-center",
                data: "nik"
            }, {
                className: "text-center",
                data: "termination_date",
                render: function(data, type, row) {
                    return moment(data, "DD-MM-YYYY").format("D MMM YYYY");
                }
            }, {
                className: "text-center d-inline-block text-truncate",
                data: "termination_reason"
            },
            {
                className: "text-center",
                data: null,
                render: function(data, type, row) {
                    return '<div class="btn-group text-center">' +
                        '<button class="btn btn-sm btn-default btn-view-terminated" type="button"><i class="si si-eye"></i></button>' +
                        '<button class="btn btn-sm btn-default btn-remove-terminated" type="button"><i class="si si-trash"></i></button>' +
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
            // console.log("Table Terminated loaded!");
        }
    });

    // TABLE ACTIONS !!!
    // 
    // When employee NAME or TABLE'S VIEW button is clicked
    $('#table-terminated tbody').on('click', 'a.link-view-terminated, .btn-view-terminated', function() {
        var id = $(this).parents('tr').attr('data-id');
        viewData(id);
    });

    // When table-employee DELETE button is clicked
    $('#table-terminated tbody').on('click', '.btn-remove-terminated', function() {
        var id = $(this).parents('tr').attr('data-id');
        removeData(id);
    });
    // 
    // END TABLE ACTIONS
};
