var BasePagesEmployee = function() {
    var viewData = function(id) {
        $.ajax({
            type: "POST",
            url: "/php/api/getEmployeeById.php",
            dataType: 'json',
            data: {
                id: id
            }
        }).done(function(res) {
            var data = res.data;
            renderProfileView(data);

            $('#photo-container-view').removeClass('hide-me');
            $('#photo-container-edit').addClass('hide-me');

            // Open the popup modal
            $('#modal-profile').modal({
                show: true,
                // keyboard: false,
                backdrop: 'static'
            });

            $('#opened-profile').val(data.id);
        });
    };

    var editData = function(id) {
        $.ajax({
            type: "POST",
            url: "/php/api/getEmployeeById.php",
            dataType: 'json',
            data: {
                id: id
            }
        }).done(function(res) {
            var data = res.data;
            renderProfileEdit(data);

            $('#photo-container-edit').removeClass('hide-me');
            $('#photo-container-view').addClass('hide-me');

            // Open the popup modal
            $('#modal-profile').modal({
                show: true,
                // keyboard: false,
                backdrop: 'static'
            });

            $('#opened-profile').val(data.id);
            $('#origin').val('direct');
        });
    };

    var removeData = function(id) {
        swal({
                title: "Hapus Data Karyawan?",
                text: "Data yang dihapus tidak akan dapat dikembalikan",
                type: "question",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Hapus!",
                cancelButtonText: "Batal",
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve) {
                        $.ajax({
                                type: "POST",
                                url: "/php/api/deleteEmployee.php",
                                dataType: 'json',
                                data: {
                                    id: id
                                }
                            }).done(function(response) {
                                if (response.status == 'err') {
                                    swal('Error', response.message, 'error');
                                } else {
                                    swal('Success', "Data karyawan berhasil dihapus", 'success');

                                    // reload the stat
                                    initStat();

                                    // reload the table
                                    var $table = $('#hidden-active-type').val();
                                    var table = $('#table-' + $table).DataTable();
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
            .catch(swal.noop);
    };

    // Init page stat
    var initStat = function() {
        $.ajax({
            type: "GET",
            url: BASE_URL + '/php/api/getEmployeeStat.php',
            dataType: 'json',
            success: function(res) {
                var container = $('#employee-stat');
                container.empty();

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

                    var counter = 0;
                    var data_length = data.length;
                    if (data_length > 0) {
                        html += '';
                        data.forEach(function(d) {
                            html += '<div class="col-md-2">' +
                                '<span class="h1 font-w700 text-primary animated flipInX">' + d.value.replace(/\"/g, "") + '</span>' +
                                '<div class="font-w700 text-gray-darker animated fadIn">' + d.label.replace(/\"/g, "") + '</div>' +
                                '</div>';
                            counter += parseInt(d.value.replace(/\"/g, ""));
                        });
                    }

                    html += '<div class="col-md-2 col-xs-6">' +
                        '<span class="h1 font-w700 text-primary animated flipInX" id="total-tetap">' + counter + '</span>' +
                        '<div class="font-w700 text-gray-darker animated fadeIn">Total</div>' +
                        '</div>';
                }

                html += '<div class="col-md-2 pull-right push-5-t">' +
                    '<span class="h1 font-w700 text-primary animated flipInX">' +
                    '<button type="button" class="btn btn-primary btn-circle btn-lg push-5" id="btn-add"><i class="fa fa-plus"></i></button>' +
                    '</span>' +
                    '</div>';

                container.html(html);
            }
        })
    };

    // Init table employee
    var initTableEmployee = function(filterData) {
        if (filterData != undefined) var $filter = filterData
        else var $filter = '';

        // Table initiation
        var table = $('#table-employee').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            autoWidth: false,
            order: [
                [2, "asc"]
            ],
            columnDefs: [
                { targets: 0, type: 'nik-formatted' }
            ],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getEmployee.php',
                data: {
                    scope: 'active',
                    filter: $filter
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
                        return '<a data-id="' + row.nik + '" href="javascript:void(0)">' + data + '</a>';
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
                            '<button class="btn btn-sm btn-default" type="button" id="btn-view"><i class="si si-eye"></i></button>' +
                            '<button class="btn btn-sm btn-default btn-edit" type="button"><i class="si si-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-default btn-remove" type="button"><i class="si si-trash"></i></button>' +
                            '</div>';
                    },
                    searchable: false,
                    orderable: false
                }
            ],
            fnInitComplete: function() {
                // console.log("Table loaded!");
            }
        });

        // Extend sorting Fn for NIK column
        // jQuery.extend(jQuery.fn.dataTableExt.sort, {
        //     "nik-formatted-pre": function(a) {
        //         console.log(a);
        //     },
        //     "nik-formatted-asc": function(a, b) {
        //         //
        //     },
        //     "nik-formatted-desc": function(a, b) {
        //         //
        //     }
        // });


        // TABLE ACTIONS !!!
        // 
        // When employee NAME or TABLE'S VIEW button is clicked
        $('#table-employee tbody').on('click', 'a, #btn-view', function() {
            var id = $(this).parents('tr').attr('data-id');
            viewData(id);
        });

        // When TABLE'S EDIT button is clicked
        $('#table-employee tbody').on('click', '.btn-edit', function() {
            var id = $(this).parents('tr').attr('data-id');
            editData(id);
        });

        // When table-employee DELETE button is clicked
        $('#table-employee tbody').on('click', '.btn-remove', function() {
            var id = $(this).parents('tr').attr('data-id');
            removeData(id);
        });
        // 
        // END TABLE ACTIONS
    };

    // Init table employee
    var initTableTerminated = function(filterData) {
        // Table initiation
        var table = $('#table-terminated').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            autoWidth: false,
            order: [
                [0, "asc"]
            ],
            columnDefs: [
                { targets: 0, type: 'nik-formatted' }
            ],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            processing: true,
            serverSide: true,
            serverMethod: 'post',
            ajax: {
                url: BASE_URL + '/php/api/getEmployee.php',
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
                        return '<a data-id="' + row.nik + '" href="javascript:void(0)">' + data + '</a>';
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
                            '<button class="btn btn-sm btn-default" type="button" id="btn-view-terminated"><i class="si si-eye"></i></button>' +
                            '<button class="btn btn-sm btn-default btn-remove-terminated" type="button"><i class="si si-trash"></i></button>' +
                            '</div>';
                    },
                    searchable: false,
                    orderable: false
                }
            ],
            fnInitComplete: function() {
                // console.log("Table loaded!");
            }
        });

        // TABLE ACTIONS !!!
        // 
        // When employee NAME or TABLE'S VIEW button is clicked
        $('#table-terminated tbody').on('click', 'a, #btn-view-terminated', function() {
            var id = $(this).parents('tr').attr('data-id');
            console.log('loading VIEW ' + id);
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

    // Init table filtering
    var initFilter = function(data) {
        var container = $('#filter-container');
        container.html('');

        // Populate FILTER selectors :: BY STATUS
        var data = [{
            id: 'Tetap',
            label: 'Tetap'
        }, {
            id: 'Kontrak 1',
            label: 'Kontrak 1'
        }, {
            id: 'Kontrak 2',
            label: 'Kontrak 2'
        }, {
            id: 'Percobaan',
            label: 'Percobaan'
        }];

        var bag_elems = '<div class="form-group">' +
            '<div class="form-material form-material-primary push-30 push-30-t">' +
            '<select class="form-control" id="input-filter-status" name="elem-filter-status" size="1">' +
            '<option val=""></option>';

        data.forEach(function(dt) {
            bag_elems += '<option value="' + dt.id + '">' + dt.label + '</option>';
        });

        bag_elems += '</select>' +
            '<label for="elem-filter-status">By Status</label>' +
            '</div>' +
            '</div>';

        container.append(bag_elems);

        // Populate FILTER selectors :: BY JENIS_KELAMIN
        var data = [{
            id: 'Laki-laki',
            label: 'Laki-laki'
        }, {
            id: 'Perempuan',
            label: 'Perempuan'
        }];

        var bag_elems = '<div class="form-group">' +
            '<div class="form-material form-material-primary push-30 push-30-t">' +
            '<select class="form-control" id="input-filter-jenis_kelamin" name="elem-filter-jenis_kelamin" size="1">' +
            '<option val=""></option>';

        data.forEach(function(dt) {
            bag_elems += '<option value="' + dt.id + '">' + dt.label + '</option>';
        });

        bag_elems += '</select>' +
            '<label for="elem-filter-jenis_kelamin">By Jenis Kelamin</label>' +
            '</div>' +
            '</div>';

        container.append(bag_elems);

        // Populate FILTER selectors :: BY KODE_BAGIAN
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: BASE_URL + '/php/api/getSelectorData.php',
            data: { table: 'kode_bagian' },
            success: function(res) {
                if (res.success) {
                    var bag_elems = '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-kode_bagian" name="elem-filter-kode_bagian" size="1">' +
                        '<option val=""></option>';

                    res.data.forEach(function(dt) {
                        bag_elems += '<option value="' + dt.id + '">' + dt.kode + '</option>';
                    });

                    bag_elems += '</select>' +
                        '<label for="elem-filter-kode_bagian">By Kode Bagian</label>' +
                        '</div>' +
                        '</div>';

                    container.append(bag_elems);
                }
            }
        });

        // Populate FILTER selectors :: BY DEPT/SEC/SUB SEC/GRUP
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: BASE_URL + '/php/api/getSelectorData.php',
            data: { table: 'division' },
            success: function(res) {
                if (res.success) {
                    var bag_elems = '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-division" name="elem-filter-division" size="1">' +
                        '<option val=""></option>';

                    res.data.forEach(function(dt) {
                        bag_elems += '<option value="' + dt.id + '">' + dt.nama + '</option>';
                    });

                    bag_elems += '</select>' +
                        '<label for="elem-filter-division">By Divisi</label>' +
                        '</div>' +
                        '</div>';

                    // Generate another components
                    bag_elems += '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-department" name="elem-filter-department" size="1">' +
                        '<option val=""></option>' +
                        '</select>' +
                        '<label for="elem-filter-department">By Departemen</label>' +
                        '</div>' +
                        '</div>';

                    bag_elems += '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-section" name="elem-filter-section" size="1">' +
                        '<option val=""></option>' +
                        '</select>' +
                        '<label for="elem-filter-section">By Section</label>' +
                        '</div>' +
                        '</div>';

                    bag_elems += '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-sub_section" name="elem-filter-sub_section" size="1">' +
                        '<option val=""></option>' +
                        '</select>' +
                        '<label for="elem-filter-sub_section">By Sub Section</label>' +
                        '</div>' +
                        '</div>';

                    bag_elems += '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-group" name="elem-filter-group" size="1">' +
                        '<option val=""></option>' +
                        '</select>' +
                        '<label for="elem-filter-group">By Grup</label>' +
                        '</div>' +
                        '</div>';

                    container.append(bag_elems);
                }
            }
        });

        // Populate FILTER selectors :: BY GRADE
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: BASE_URL + '/php/api/getSelectorData.php',
            data: { table: 'grade' },
            success: function(res) {
                if (res.success) {
                    var bag_elems = '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-grade" name="elem-filter-grade" size="1">' +
                        '<option val=""></option>';

                    res.data.forEach(function(dt) {
                        bag_elems += '<option value="' + dt.id + '">[' + dt.kode + '] ' + dt.nama + '</option>';
                    });

                    bag_elems += '</select>' +
                        '<label for="elem-filter-grade">By Grade</label>' +
                        '</div>' +
                        '</div>';

                    container.append(bag_elems);
                }
            }
        });

        // Populate FILTER selectors :: BY JABATAN
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: BASE_URL + '/php/api/getSelectorData.php',
            data: { table: 'penugasan' },
            success: function(res) {
                if (res.success) {
                    var bag_elems = '<div class="form-group">' +
                        '<div class="form-material form-material-primary push-30">' +
                        '<select class="form-control" id="input-filter-penugasan" name="elem-filter-penugasan" size="1">' +
                        '<option val=""></option>';

                    res.data.forEach(function(dt) {
                        bag_elems += '<option value="' + dt.id + '">' + dt.nama + '</option>';
                    });

                    bag_elems += '</select>' +
                        '<label for="elem-filter-penugasan">By Jabatan</label>' +
                        '</div>' +
                        '</div>';

                    container.append(bag_elems);
                }
            }
        });

        // Function to populate all data (regardless the parent)
        var populateAll = function(table) {
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorDataClean.php',
                dataType: 'json',
                data: {
                    table: table
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-filter-' + table, res.data);
                }
            });
        }

        // 
        // Filter selector on change functions
        // 
        // when filter kode_bagian selector changed
        $(document).on('change', '#input-filter-kode_bagian', function() {
            var val = this.value;
            if (val != '') {
                $('#input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').attr('disabled', 'disabled');
            } else {
                $('#input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').removeAttr('disabled');
            }
            $('#input-filter-division, #input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').val('');
        });

        // when filter division selector changed
        $(document).on('change', '#input-filter-division', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
                $('#input-filter-kode_bagian').val('');
                $('#input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').removeAttr('disabled');

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
                        if (res.success) repopulateSelector('input-filter-department', res.data);
                        $('#input-filter-section, #input-filter-sub_section, #input-filter-group').empty();
                    }
                });
            } else {
                $('#input-filter-kode_bagian').removeAttr('disabled');
                // $('#input-filter-department, #input-filter-section, #input-filter-sub_section, #input-filter-group').empty();
                populateAll('department');
                populateAll('section');
                populateAll('sub_section');
                populateAll('group');
            }
        });

        // when filter department selector changed
        $(document).on('change', '#input-filter-department', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
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
                        if (res.success) repopulateSelector('input-filter-section', res.data);
                        $('#input-filter-sub_section, #input-filter-group').empty();
                    }
                });
            } else {
                $('#input-filter-section, #input-filter-sub_section, #input-filter-group').empty();
            }
        });

        // when filter section selector changed
        $(document).on('change', '#input-filter-section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
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
                        if (res.success) repopulateSelector('input-filter-sub_section', res.data);
                        $('#input-filter-group').empty();
                    }
                });
            } else {
                $('#input-filter-sub_section, #input-filter-group').empty();
            }
        });

        // when filter section selector changed
        $(document).on('change', '#input-filter-sub_section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
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
                        if (res.success) repopulateSelector('input-filter-group', res.data);
                    }
                });
            } else {
                $('#input-filter-group').empty();
            }
        });

        // Button RESET / CLEAR action
        $(document).on('click', '#btn-reset-filter', function() {
            // send filters data to table & reinitiate table
            initTableEmployee('');
            // var table = $('#table-employee').DataTable();
            // table.ajax.reload();

            // reset all components
            $('[id^=input-filter-]').val('');
            $('#input-filter-kode_bagian, #input-filter-division').trigger('change');
            populateAll('department');
            populateAll('section');
            populateAll('sub_section');
            populateAll('group');
        });

        // Filter on change action
        $(document).on('change', '[id^=input-filter-]', function() {
            $('#filter-form').trigger('submit');
        });

        // FILTER SUBMIT action
        $(document).on('submit', '#filter-form', function(e) {
            e.preventDefault();

            var data = [];
            $('[id^="input-filter-"]').filter(
                function() {
                    var elem = this;
                    // cleaning empty data [TEMP!]
                    if (elem['value'] != '') {
                        var key = elem['id'].replace('input-filter-', '');
                        if (key == 'tgl_masuk') tgl_masuk = elem['value']; // save tgl_masuk for NIK generation
                        if (key == 'status') status = elem['value']; // save status for NIK generation
                        return data.push({
                            "key": key,
                            "value": elem['value']
                        });
                    }
                });

            // send filters data to table & reinitiate table
            initTableEmployee(data);
            // var table = $('#table-employee').DataTable();
            // table.ajax.reload();
        });

        // Fill all BAGIAN selectors
        populateAll('department');
        populateAll('section');
        populateAll('sub_section');
        populateAll('group');
    };

    // init the page
    var initEmployeePage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");
            // Set active class for related menu
            $('#menu-karyawan').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
            // Set the page title
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-users">&nbsp;&nbsp;</i>DATA KARYAWAN</h3>');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            console.log("Footer loaded!");
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu', function(e) {
            e.preventDefault();
            if ($(this).attr('route') != undefined) window.location = BASE_URL + $(this).attr('route');
            return false;
        });

        // when button LOGOUT is clicked
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });


        // when tabs clicked
        $(document).on('click', '.main-tabs', function() {
            var t = $(this).attr('data');
            $('#hidden-active-type').val(t);
            switch (t) {
                case 'terminated':
                    initTableTerminated();
                    break;
                default:
                    initTableEmployee();
                    initFilter();
                    break;
            }
            $('#btn-add').attr('data-type', t);
        });


        // when ADD BUTTON is clicked
        $(document).on('click', '#btn-add', function() {
            $('#photo-container-edit').removeClass('hide-me');
            $('#photo-container-view').addClass('hide-me');

            $('#modal-profile').modal({
                show: true,
                // keyboard: false,
                backdrop: 'static'
            });

            renderProfileAdd();
            $('#opened-profile').val("");
        });


        // =========================
        // MODAL ACTIONS !!!       
        // 
        // when GEAR button clicked
        $(document).on('click', '#btn-generate-profile', function() {
            generateRandomProfile();
        });

        // when modal CANCEL button clicked
        $(document).on('click', '#btn-cancel-profile', function() {
            var origin = $('#origin').val();
            if (origin == 'direct') {
                $('#modal-profile').modal('hide');
            } else {
                var id = $('#opened-profile').val();

                $.ajax({
                    type: "POST",
                    url: "/php/api/getEmployeeById.php",
                    dataType: 'json',
                    data: {
                        id: id
                    }
                }).done(function(res) {
                    var data = res.data;

                    $('#photo-container-view').removeClass('hide-me');
                    $('#photo-container-edit').addClass('hide-me');

                    renderProfileView(data);
                });
            }
        });

        // When modal EDIT button is clicked
        $(document).on('click', '#btn-edit-profile', function() {
            var id = $('#opened-profile').val();

            $.ajax({
                type: "POST",
                url: "/php/api/getEmployeeById.php",
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(res) {
                var data = res.data;
                renderProfileEdit(data);

                $('#photo-container-edit').removeClass('hide-me');
                $('#photo-container-view').addClass('hide-me');

                // Open the popup modal
                // $('#modal-profile').modal({
                //     show: true,
                //     // keyboard: false,
                //     backdrop: 'static'
                // });

                $('#origin').val('modal');
            });
        });

        // When modal TERMINATE button is clicked
        $(document).on('click', '#btn-terminate-profile', function() {
            swal({
                    title: "Peringatan!",
                    html: "Karyawan akan dipindahkan ke data \"Karyawan Non Aktif\".<br>Klik <strong>OK</strong> untuk melanjutkan.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok",
                    cancelButtonText: "Batal",
                    // preConfirm: function() {
                    //     swal.close();
                    //     $('#modal-profile').modal('hide');

                    //     // Render termination elements
                    //     $('#profile-termination_date').html('');
                    //     $('#profile-termination_date').html(renderAddElement('datepicker', 'termination_date', 'Tanggal Terminasi'));
                    //     $('#profile-termination_reason').html('');
                    //     $('#profile-termination_reason').html(renderAddElement('textarea', 'termination_reason', 'Alasan Terminasi'));

                    //     initTerminationValidation();

                    //     App.initHelpers('datepicker');

                    //     $('#modal-termination').modal({
                    //         show: true,
                    //         backdrop: 'static',
                    //         keyboard: false
                    //     });
                    // },
                    allowOutsideClick: false
                })
                .then(function(res) {
                    if (res) {
                        swal.close();
                        $('#modal-profile').modal('hide');

                        // Render termination elements
                        $('#modal-termination #profile-termination_date').html('');
                        $('#modal-termination #profile-termination_date').html(renderAddElement('datepicker', 'termination_date', 'Tanggal Terminasi', null, moment().format('DD-MM-YYYY')));
                        $('#modal-termination #profile-termination_reason').html('');
                        $('#modal-termination #profile-termination_reason').html(renderAddElement('textarea', 'termination_reason', 'Alasan Terminasi'));

                        initTerminationValidation();

                        App.initHelpers('datepicker');

                        $('#modal-termination').modal({
                            show: true,
                            backdrop: 'static',
                            keyboard: false
                        });
                    }
                })
                .catch(swal.noop);
        });


        // SELECTOR HANDLERS :::
        // when KODE_BAGIAN selector changed
        $(document).on('change', '#input-kode_bagian', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            if (valueSelected != '') {
                $('#input-division, #input-department, #input-section, #input-sub_section, #input-group').val('');
                generateSelectors(valueSelected);
            } else {
                // Clearing all selectors!
                $('#input-division, #input-department, #input-section, #input-sub_section, #input-group').val('').removeAttr('disabled');
            }
        });

        // when DIVISION selector changed
        $(document).on('change', '#input-division', function() {
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
                    if (res.success) repopulateSelector('input-department', res.data);
                    $('#input-section, #input-sub_section, #input-group').empty();
                }
            });
        });

        // when DEPARTMENT selector changed
        $(document).on('change', '#input-department', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating SECTION selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'section',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-section', res.data);
                    $('#input-sub_section, #input-group').empty();
                }
            });
        });

        // when SECTION selector changed
        $(document).on('change', '#input-section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating SUB SECTION selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'sub_section',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-sub_section', res.data);
                    $('#input-group').empty();
                }
            });
        });

        // when SUB-SECTION selector changed
        $(document).on('change', '#input-sub_section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            // fetch data for populating GROUP selector
            $.ajax({
                type: "POST",
                url: BASE_URL + '/php/api/getSelectorData.php',
                dataType: 'json',
                data: {
                    table: 'group',
                    parent: valueSelected
                },
                success: function(res) {
                    if (res.success) repopulateSelector('input-group', res.data);
                }
            });
        });

        // when STATUS KARYAWAN selector changed
        $(document).on('change', '#input-status', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            var $containerMasaKontrak = $('#profile-masa-kontrak');
            var $containerTglKeluar = $('#profile-tgl-keluar');

            if (valueSelected != 'Tetap') {
                var html = '';
                $containerMasaKontrak.empty();
                $containerTglKeluar.empty();

                if (valueSelected == 'Percobaan') {
                    var label = 'Masa Percobaan';
                    var label_2 = 'Tgl Selesai Percobaan';
                    var value = 3;
                } else {
                    var label = 'Masa Kontrak';
                    var label_2 = 'Tgl Selesai Kontrak';
                    var value = 6;
                }

                html = renderAddElement('predefined-select', 'masa_kontrak', label, [{
                    label: "3 Bulan",
                    value: 3
                }, {
                    label: "6 Bulan",
                    value: 6
                }, {
                    label: "1 Tahun",
                    value: 12
                }, {
                    label: "18 Bulan",
                    value: 18
                }, {
                    label: "2 Tahun",
                    value: 24
                }], value);
                $containerMasaKontrak.append(html);

                // by default is 3 Months contract
                if ($('#input-tgl_masuk').val() != '') var t_masuk = $('#input-tgl_masuk').val();
                else var t_masuk = moment().format('DD-MM-YYYY');
                html = renderAddElement('datepicker', 'tgl_keluar', label_2, null, moment(t_masuk, 'DD-MM-YYYY').add(value, 'M').format('DD-MM-YYYY'));
                $containerTglKeluar.append(html);

            } else {
                $containerMasaKontrak.empty();
                $containerTglKeluar.empty();
            }

            // reinitiate Datepicker plugin
            App.initHelpers(['datepicker']);
        });

        // when MASA KERJA selector changed
        $(document).on('change', '#input-masa_kontrak', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;
            if ($('#input-tgl_masuk').val() != '') var t_masuk = $('#input-tgl_masuk').val();
            else var t_masuk = moment().format('DD-MM-YYYY');
            $('#input-tgl_keluar').val(moment(t_masuk, 'DD-MM-YYYY').add(valueSelected, 'M').format('DD-MM-YYYY'));
        });

        // when MASA KERJA selector changed
        $(document).on('change', '#input-tgl_masuk', function() {
            $('#input-masa_kontrak').trigger('change');
        });
        // END SELECTOR HANDLERS :::
        // 
        // END MODAL ACTIONS !!!
        // =========================


        // When STAT NUMBER is clicked
        $(document).on('click', 'a.stat-filter', function(e) {
            e.preventDefault();
            var data = $(this).attr('data');
            $('#input-filter-status').val(data).trigger('change');
        });

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';

        // Set default hidden-active-type
        $('#hidden-active-type').val('employee');
    };

    return {
        init: function() {
            initStat();
            bsDataTables();
            initTableEmployee();
            initEmployeePage();
            initFilter();
            initUploader();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    // Core Variable
    window.BASE_URL = url('protocol') + '://' + url('hostname');
    // console.log("BASE_URL >>" + BASE_URL);

    // Main INIT
    BasePagesEmployee.init();

    $(window).load(function() {
        // Read current URL if there's any parameter given
        var params = url('?');
        if (params != undefined) {
            // console.log(params);
            $('select#input-filter-' + params.filter).val(params.value).trigger('change');
        }
    });
});
