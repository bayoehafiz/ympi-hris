var BasePagesGrade = function() {
    var initGradePage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");
            // Set active class for related menu
            $('#menu-grade').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
            // Set the page title
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-briefcase">&nbsp;&nbsp;</i>DATA GRADE</h3>');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            console.log("Footer loaded!");
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
                case 'penugasan':
                    initStat('penugasan');
                    initTablePenugasan();
                    break;
                default:
                    initStat('grade');
                    initTableGrade();
                    break;
            }
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
                case "penugasan":
                    html += renderAddElement('text', 'nama', 'Nama Penugasan');
                    break;
                default:
                    html += renderAddElement('text', 'nama', 'Nama Grade');
                    html += renderAddElement('text', 'kode', 'Kode');
                    break;
            }

            initValidation(data_type);

            $('#modal-title').html('Tambah Data ' + data_type);
            $('#generated-container').html(html);

            $('#hidden-modal-scope').val('add');

            // hide unrelated buttons
            $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
            $('#modal').modal('show');
        });

        // When ACTION buttons clicked
        $(document).on('click', '.js-dataTable-full tbody button', function() {
            var act = $(this).attr('act');
            var active_table_id = $(this).parents("table").attr('id');
            var table = $('#' + active_table_id).DataTable();
            var data = table.row($(this).parents('tr')).data();

            // Lets decide which button is clicked:
            if (act == 'edit') { // edit the data
                // reset the modal first!
                $('#modal-title, #generated-container').html('');
                $('#hidden-select').addClass('hide-me');

                var html = '';
                data_type = $('#hidden-active-type').val();

                switch (data_type) {
                    case "penugasan":
                        html += renderEditElement('text', 'nama', 'Nama Penugasan', data.nama);
                        break;
                    default:
                        html += renderEditElement('text', 'nama', 'Nama Grade', data.nama);
                        html += renderEditElement('text', 'kode', 'Kode', data.kode);
                        break;
                }

                // init the validation
                initValidation(data_type);

                $('#modal-title').html('Ubah Data ' + data_type);
                $('#generated-container').html(html);

                $('#hidden-modal-scope').val('edit');
                $('#hidden-opened-id').val(data.id);

                // hide unrelated buttons
                $('#btn-modal-edit, #btn-modal-remove, #btn-modal-cancel').addClass('hide-me');
                $('#modal').modal('show');

                // Show modal
                $('#modal').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });

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
                        allowOutsideClick: false
                    })
                    .then(function(res) {
                        if (res) {
                            var dType = $('#hidden-active-type').val();
                            $.ajax({
                                    type: "POST",
                                    url: ENV.BASE_API + "deleteGradeData.php",
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

                                        // reload the table & stat
                                        var table = $('#table-' + dType).DataTable();
                                        table.ajax.reload();
                                        initStat(table);
                                    }
                                })
                                .fail(function() {
                                    swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                                });
                        }
                    })
                    .catch(swal.noop);

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
                        allowOutsideClick: false
                    })
                    .then(function(res) {
                        if (res) {
                            var dType = $('#hidden-active-type').val();
                            $.ajax({
                                    type: "POST",
                                    url: ENV.BASE_API + "updateGradeDataStatus.php",
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

                                        // reload the table & stat
                                        var table = $('#table-' + dType).DataTable();
                                        table.ajax.reload();
                                        initStat(table);
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

        // when modal on close
        $('#modal').on('hidden.bs.modal', function() {
            console.log('Destroying validator and resetting elements...');
            window.$validator.destroy();

            // reset all elements
            $('[id^=input-]').html('').empty();

            // hide all hidden elements
            $('[id^=hidden-]').addClass('hide-me');
        })

        // set default hidden value for ACTIVE type
        $('#hidden-active-type').val('grade');

        // init Datatable BS style
        bsDataTables();

        // Lets init our stat & table :: Grade Table
        initStat('grade');
        initTableGrade();

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';
    };

    var initStat = function(table) {
        // Get Grade stat
        $.ajax({
            type: "POST",
            url: ENV.BASE_API + 'getGradeStat.php',
            dataType: 'json',
            data: {
                table: table
            },
            success: function(res) {
                var html = '';
                if (res.success) {
                    var data = res.data;
                    var data_length = data.length;
                    if (data_length > 0) {
                        var wCounter = parseInt(12 / data_length); // set the width of the column
                        data.forEach(function(d) {
                            if (d.kode == null)
                                var title = d.nama;
                            else
                                var title = d.kode + '<span class="text-muted">' + d.nama + '</span>';

                            html += '<div class="col-md-' + wCounter + '">' +
                                '<a href="' + ENV.BASE_URL + '/employee/?filter=' + table + '&value=' + d.id + '">' +
                                '<span class="h1 font-w700 text-primary animated fadeIn" id="total-finance" data-toggle="countTo" data-to="' + d.total + '"></span>' +
                                '<div class="h5 font-w600 text-gray-darker animated fadeIn">' + title + '</div>' +
                                '</a>' +
                                '</div>';
                        });
                    }
                }

                html += '<div class="col-md-2 pull-right push-10-t">' +
                    '<span class="h1 font-w700 text-primary animated flipInX">' +
                    '<button type="button" class="btn btn-primary btn-circle btn-lg push-5" id="btn-add" data-type="' + table + '"><i class="fa fa-plus"></i></button>' +
                    '</span>' +
                    '</div>';

                // append the result into container
                $('#stat-grade').html(html);

                // reinitiate counter plugin
                App.initHelpers('appear-countTo');
            }
        })
    };

    var initTableGrade = function() {
        // Table initiation
        var table = $('#table-grade').DataTable({
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
                url: ENV.BASE_API + 'getGrade.php',
                data: {
                    table: 'grade'
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
                { className: "hidden-xs text-center", data: "kode" },
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

    var initTablePenugasan = function() {
        // Table initiation
        var table = $('#table-penugasan').DataTable({
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
                url: ENV.BASE_API + 'getGrade.php',
                data: {
                    table: 'penugasan'
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

    return {
        init: function() {
            set_base('grade');
            bsDataTables();
            initStat();
            initGradePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesGrade.init(); });
