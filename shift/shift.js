var BasePagesShift = function() {
    window.modal_scope = '';
    window.active_data = '';
    window.opened_data = {};
    window.searched_user = '';

    window.initStat = function() {
        // clear the container first
        var container = $('#stat-shift');
        container.empty();
        // Get division datas
        $.ajax({
            type: "GET",
            url: ENV.BASE_API + 'getShiftStat.php',
            dataType: 'json',
            // data: {
            //     type: type
            // },
            success: function(res) {
                var html = '';
                if (res.success) {
                    var data = res.data;
                    var data_length = data.length;
                    if (data_length > 0) {
                        html += '';
                        data.forEach(function(d) {
                            if (d.kode == undefined) d.kode = d.nama;
                            html += '<div class="col-md-2">' +
                                '<span class="h1 font-w700 text-primary" data-toggle="countTo" data-to="' + d.total + '"></span>' +
                                '<div class="font-w700 text-gray-darker animated fadIn">' + d.nama + '</div>' +
                                '</div>';
                        });
                    }
                }

                // append the result into container
                container.append(html);

                // reinitiate counter plugin
                App.initHelpers('appear-countTo');

                // re-initialize slider plugin
                if (container.hasClass('slick-initialized')) {
                    container.slick('removeSlide', null, null, true); // remove all previous slides
                    container.slick('unslick');
                }
                container.slick({
                    autoplay: true,
                    dots: false,
                    slidesToShow: 7,
                    prevArrow: '<span class="prev"><i class="fa fa-angle-left fa-3x text-primary-lighter"></i></span>',
                    nextArrow: '<span class="next"><i class="fa fa-angle-right fa-3x text-primary-lighter"></i></span>',
                });
            }
        })
    };

    var initTableShift = function() {
        // init table BS style
        bsDataTables();

        // Table initiation
        var table = $('#table-shift').DataTable({
            destroy: true, // destroy it first, if there is an active table instance
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            columnDefs: [{
                visible: false,
                targets: 0
            }, {
                targets: 3,
                sortable: false
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
                url: ENV.BASE_API + 'getShift.php',
                data: {
                    table: 'shift'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "text-center", data: "kode" },
                {
                    className: "font-w600",
                    data: "nama",
                    render: function(data, type, row) {
                        var add = '';
                        if (row.on_freeday == '1') {
                            add += '<span class="pull-right hidden-md"><i class="si si-cup font-w700 text-success"></i></span>';
                        }
                        if (row.override == '1') {
                            add += '<span class="pull-right hidden-md" style="padding-top: 2px;"><i class="si si-loop font-w700 text-danger"></i></span>';
                        }
                        return data + add;
                    }
                },
                {
                    className: "text-center",
                    data: "hari_efektif",
                    render: function(data, type, row) {
                        // Manipulate result data
                        var raw_string = data;
                        var final_string = '';
                        var splitted_string = raw_string.split(',');
                        if (splitted_string.length > 6) { //  <- if full days
                            if (row.active == 1) final_string += '<span class="label label-primary text-uppercase push-5-r"><i class="si si-calendar push-5-r"></i>Semua Hari</span>';
                            else final_string += '<span class="label label-default  text-uppercase push-5-r"><i class="si si-calendar push-5-r"></i>Semua Hari</span>';
                        } else {
                            splitted_string.forEach(function(s) {
                                if (row.active == 1) final_string += '<span class="label label-primary text-uppercase push-5-r">' + s + '</span>';
                                else final_string += '<span class="label label-default text-uppercase push-5-r">' + s + '</span>';
                            });
                        }
                        return final_string;
                    }
                },
                {
                    className: "text-center",
                    data: "jam_masuk",
                    render: function(data, type, row) {
                        return '<span class="font-w700">' + row.jam_masuk + ' - ' + row.jam_keluar + '</span>';
                    }
                },
                {
                    className: "text-center",
                    data: "awal_scan_masuk",
                    render: function(data, type, row) {
                        return row.awal_scan_masuk + ' - ' + row.akhir_scan_masuk;
                    }
                },
                {
                    className: "text-center",
                    data: "awal_scan_keluar",
                    render: function(data, type, row) {
                        return row.awal_scan_keluar + ' - ' + row.akhir_scan_keluar;
                    }
                },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success text-uppercase">Aktif</span>';
                        else return '<span class="label label-default text-uppercase">Non Aktif</span>';
                    }
                },
                {
                    sortable: false,
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

    var initTableGroupShift = function() {
        // Table initiation
        var table = $('#table-group-shift').DataTable({
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
                url: ENV.BASE_API + 'getShift.php',
                data: {
                    table: 'group_shift'
                }
            },
            deferRender: true,
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            columns: [
                { data: "updated" },
                { className: "hidden-xs text-center", data: "kode" },
                {
                    className: "font-w600 ",
                    data: "nama",
                    render: function(data, type, row) {
                        if (row.transferable == '1') {
                            return data + '<span class="pull-right hidden-md"><i class="si si-shuffle font-w700 text-success"></i></span>';
                        } else {
                            return data;
                        }
                    }
                },
                {
                    className: "text-center",
                    data: "nama_shift",
                    render: function(data, type, row) {
                        if (row.active == 1) return '<span class="label label-primary text-uppercase push-5-r">' + data + ' (' + row.kode_shift + ')</span>';
                        else return '<span class="label label-default text-uppercase push-5-r">' + data + ' (' + row.kode_shift + ')</span>';
                    }
                },
                {
                    sortable: false,
                    className: "text-center",
                    data: "assignation_name",
                    render: function(data, type, row, meta) {
                        var names = '';
                        data.forEach(function(dt) {
                            names += '<span class="label label-primary text-uppercase push-5-r">' + dt + '</span>';
                        })
                        return names;
                    }
                },
                {
                    className: "text-center",
                    data: "date_from",
                    render: function(data, type, row) {
                        return '<strong>' + moment(row.date_from, 'YYYY-MM-DD').format('D MMM YYYY') + '</strong> <small>s/d</small> <strong>' + moment(row.date_to, 'YYYY-MM-DD').format('D MMM YYYY') + '</strong>';
                    }
                },
                {
                    className: "hidden-xs text-center",
                    data: "active",
                    render: function(data, type, row) {
                        if (data == 1) return '<span class="label label-success text-uppercase">Aktif</span>';
                        else return '<span class="label label-default text-uppercase">Non Aktif</span>';
                    }
                },
                {
                    sortable: false,
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

    var openTransferModal = function(uid, event) {
        window.modal_scope = 'add';

        // Fn to populate NEW SHIFT selector
        var populateNewShift = function(id, shift_id, employee) {
            var container = $('#input-' + id);
            if (container.hasClass("select2-hidden-accessible")) {
                container.empty();
            }
            container.select2({
                dropdownParent: $('#new-shift-block'),
                minimumResultsForSearch: -1,
                placeholder: "Pilih Shift Baru",
                ajax: {
                    url: ENV.BASE_API + 'getShiftTransferSelector.php?o=' + shift_id + '&e=' + employee,
                    dataType: 'json',
                    delay: 250,
                    cache: false,
                    data: function(params) {
                        var query = {
                            q: params.term || "",
                            page: params.page || 1
                        }
                        return query;
                    },
                    processResults: function(data, params) {
                        var page = params.page || 1;
                        return {
                            results: data,
                            pagination: {
                                more: (page * 10) <= data[0].total_count // <- has to be 10 (matched with API code)
                            }
                        };
                    },
                },
                escapeMarkup: function(markup) { return markup; },
                templateResult: formatKode,
                templateSelection: formatKodeSelection
            });

            function formatKode(data) {
                if (data.kode === undefined && data.nik === undefined) {
                    return data.text;
                }
                var markup = data.text + " (" + (data.kode || data.nik) + ")";
                return markup;
            }

            function formatKodeSelection(data) {
                if (data.kode === undefined && data.nik === undefined) {
                    return (data.nama || data.text);
                }
                return (data.nama || data.text) + " (" + (data.kode || data.nik) + ")";
            }

            return true;
        };

        // Check if the date isn't in the PAST
        if (moment(event.start).isBefore(moment())) {
            swal('Kadaluarsa', "Shift yang dapat dipilih adalah minimal esok hari", 'error');
        } else if (event.transferable == '0') { // check if shift is TRANSFERABLE ?
            swal('Non-Transferable', "Shift ini tidak dapat ditransfer / dipindahkan", 'error');
        } else if (event.transferable == '9') { // check if shift is already TRANSFERRED
            swal({
                    title: "Already Transferred",
                    html: "Shift ini telah ditransfer<br>Klik <strong>Batalkan</strong> untuk mengambalikan shift",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "Batalkan",
                    cancelButtonText: "Tutup",
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false
                })
                .then(function(res) {
                    if (res) {
                        $.ajax({
                                type: "POST",
                                url: ENV.BASE_API + "deleteTransferredShift.php",
                                dataType: 'json',
                                data: {
                                    id: event.id
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

                                    // reload the calendar
                                    renderEmployeeDetails(window.searched_user);
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    }
                })
                .catch(swal.noop);
        } else {

            // compile old Shift data
            $('#old-shift-title, #old-shift-content').empty();
            $('#old-shift-block').css('background-color', event.backgroundColor);
            if (event.title == 'LIBUR') {
                $('#old-shift-title').append('<i class="si si-ban push-5-r font-s16"></i>' + event.title.toUpperCase());
                $('#old-shift-content').append('<div class="push-5"><small>Hari / Tanggal</small><br><span class="font-w600">' + moment(event.start).format('dddd') + ', ' + moment(event.start).format('DD MMM YYYY') + '</span></div>');
            } else {
                $('#old-shift-title').append('<i class="si si-calendar push-5-r font-s16"></i>' + event.title.toUpperCase() + ' (' + event.kode + ')');
                $('#old-shift-content').append('<div class="push-5"><small>Hari / Tanggal</small><br><span class="font-w600">' + moment(event.start).format('dddd') + ', ' + moment(event.start).format('DD MMM YYYY') + '</span></div>' +
                    '<div class="push-5"><small>Jam Kerja</small><br><span class="font-w600">' + event.jam_masuk + ' - ' + event.jam_keluar + '</span></div>');
            }

            // compile new shift data
            $('#new-shift-title, #new-shift-content').empty();
            // initiate selector
            populateNewShift('new_shift', event.id, window.searched_user);

            // Set form's hidden-input values
            $('#input-employee').val(window.searched_user);
            $('#input-old_shift').val(event.id);
            $('#input-transfer_date').val(moment(event.start).format('YYYY-MM-DD'));

            // show the modal
            $('#transfer-modal').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });

            // init validation
            initValidation('shift_transfer');
        }

        // new shift selector handler
        $('#input-new_shift').change(function() {
            var value = this.value;
            $.getJSON(ENV.BASE_API + 'getShiftDetails.php?id=' + value, function(res) {
                var container = $('#new-shift-content');
                container.empty();
                container.append('<div class="push-5"><small>Hari / Tanggal</small><br><span class="font-w600">' + moment(event.start).format('dddd') + ', ' + moment(event.start).format('DD MMM YYYY') + '</span></div>' +
                    '<div class="push-5"><small>Jam Kerja</small><br><span class="font-w600">' + res.jam_masuk + ' - ' + res.jam_keluar + '</span></div>');
            })
        })
    };

    var initCalendar = function() {
        // Init calendar
        $('#shift-calendar').fullCalendar({
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            locale: 'id',
            buttonText: {
                today: "Bulan Ini"
            },
            defaultView: "month",
            validRange: function(currentDate) {
                return {
                    start: moment().subtract(3, 'months').format('YYYY-MM-DD'),
                    end: moment().add(3, 'months').format('YYYY-MM-DD')
                }
            },
            eventRender: function(event, element) {
                if (event.title == "LIBUR") {
                    var html = '<div class="h5 text-white push-5">' + event.title + '</div>' +
                        '<i class="si si-ban text-white"></i>';
                } else {
                    if (event.transferable == "1") var transferable = '<i class="si si-shuffle"></i>';
                    else var transferable = '';

                    if (event.transferable == '9') {
                        var html = '<div class="h5 text-white push-5">' + event.title.toUpperCase() + ' (' + event.kode + ')</div>' +
                            '<div class="text-white"><i class="si si-clock push-5-r"></i>' + event.jam_masuk + ' - ' + event.jam_keluar + '</div>' +
                            '<div class="font-s12"><i class="fa fa-exchange push-5-r"></i>' + event.description + '</div>';
                    } else {
                        var html = '<div class="h5 text-white push-5">' + event.title.toUpperCase() + ' (' + event.kode + ')<span class="pull-right font-s13">' + transferable + '</span></div>' +
                            '<div class="text-white"><i class="si si-clock push-5-r"></i>' + event.jam_masuk + ' - ' + event.jam_keluar + '</div>' +
                            '<div class="font-s12"><i class="si si-calendar push-5-r"></i>' + event.description + '</div>';
                    }
                }
                element.find('.fc-title').html(html);
            },
            eventClick: function(event) {
                openTransferModal(window.searched_user, event);
            },
        });
    };

    var initTabShiftTransfer = function() {
        App.blocks('#calendar-block', 'state_loading');

        // Fn to populate modal's ajax selector (Select2)
        var initSelector = function() {
            var container = $('#employee-search');
            container.select2({
                width: '100%',
                placeholder: "Ketik Nama atau NIK..",
                ajax: {
                    url: ENV.BASE_API + 'getSelectorData.php?table=employee',
                    dataType: 'json',
                    data: function(params) {
                        var query = {
                            q: params.term,
                            page: params.page || 1
                        }
                        return query;
                    },
                    processResults: function(data, params) {
                        var page = params.page || 1;
                        return {
                            results: data,
                            pagination: {
                                // THE `10` SHOULD BE SAME AS "$resultCount FROM API, it is the number of records to fetch from table"
                                more: (data[0] !== undefined) ? (page * 10) <= data[0].total_count : 0
                            }
                        };
                        // return {
                        //     results: data
                        // };
                    }
                },
                escapeMarkup: function(markup) { return markup; },
                templateResult: formatKode,
                templateSelection: formatKodeSelection
            });

            function formatKode(data) {
                var markup = data.text + ' - ' + data.nik;
                return markup;
            }

            function formatKodeSelection(data) {
                return data.text || data.nik;
            }

            return true;
        };

        // Destroy existed Select2 instance
        if ($('#employee-search').hasClass("select2-hidden-accessible")) {
            $('#employee-search').val(null).trigger('change');
        }

        // reset employee details
        if (initSelector()) {
            // empty employee details block
            $('#employee-details-content').empty()
            if (!$('#employee-details').hasClass('hide-me')) $('#employee-details').addClass('hide-me');
        }

        // re-render calendar
        $('#shift-calendar').fullCalendar('removeEvents');
        setTimeout(function() {
            $('#shift-calendar').fullCalendar('render');
            App.blocks('#calendar-block', 'state_normal');
        }, 1000);

        // Employee Search on change
        $(document).on('change', '#employee-search', function() {
            App.blocks('#employee-details', 'state_loading');
            if (this.value != '') {
                window.searched_user = this.value; // save user ID
                renderEmployeeDetails(this.value);
            }
        })

        // Calendar's day on click
        // ==== something here ====


        // read window.searched_user
        if (window.searched_user != '') {
            renderEmployeeDetails(window.searched_user);
        }

        // Sticky block
        $('#sticky-block').sticky({ topSpacing: 80, bottomSpacing: 100 });
    };

    var initShiftPage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            // Set active class for related menu
            $('#menu-shift-kerja').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            // Set the page title
            $('#header-title').html('<i class="si si-calendar push-10-r"></i>Data Shift');
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
            var tab = $(this).attr('data');
            window.active_data = tab;
            switch (tab) {
                case 'shift':
                    if ($('#btn-add').hasClass('hide-me')) $('#btn-add').removeClass('hide-me');
                    initTableShift();
                    break;
                case 'group_shift':
                    if ($('#btn-add').hasClass('hide-me')) $('#btn-add').removeClass('hide-me');
                    initTableGroupShift();
                    break;
                case 'shift_transfer':
                    if (!$('#btn-add').hasClass('hide-me')) $('#btn-add').addClass('hide-me');
                    initTabShiftTransfer();
                    break;
                default:
                    break;
            };
        })

        // when ADD BUTTON is clicked
        $(document).on('click', '#btn-add', function() {
            App.blocks('#modal-block', 'state_loading');
            // Set modal scope
            window.modal_scope = 'add';
            // Open modal
            $('#modal').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });
        });

        // When ACTION BUTTONS is clicked
        $(document).on('click', '.js-dataTable-full tbody button', function() {
            var act = $(this).attr('act');
            var active_table_id = $(this).parents("table").attr('id');
            var table = $('#' + active_table_id).DataTable();
            var data = table.row($(this).parents('tr')).data();

            // Lets decide which button is clicked
            if (act == 'edit') { // edit the data
                App.blocks('#modal-block', 'state_loading');
                // save data to global var
                window.opened_data = data;
                // Set modal scope
                window.modal_scope = 'edit';
                // Open modal
                $('#modal').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });
            } else if (act == 'switch') { // switch the data ACTIVE status
                // For sweeetalert text message 
                if (data.nama == undefined)
                    var nama_kode = data.kode;
                else
                    var nama_kode = data.nama.toUpperCase();

                var current_status = data.active;
                if (current_status == 1) {
                    var txt = "Ubah status <strong>" + nama_kode + "</strong> menjadi <strong>Non Aktif</strong>?";
                } else {
                    var txt = "Ubah status <strong>" + nama_kode + "</strong> menjadi <strong>Aktif</strong>?";
                }

                swal({
                        title: "Konfirmasi",
                        html: txt,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya",
                        cancelButtonText: "Batal",
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false
                    })
                    .then(function(res) {
                        if (res) {
                            var dType = window.active_data;
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
                                        var table = $('#table-' + dType.replace("_", "-")).DataTable(); // in case we got "sub_section" or "kode_bagian"
                                        table.ajax.reload();
                                    }
                                })
                                .fail(function() {
                                    swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                                });
                        }
                    })
                    .catch(swal.noop);
            } else { // remove the data
                swal({
                        title: "Konfirmasi",
                        html: "Hapus <strong>" + data.nama + "</strong> dari database?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn btn-danger btn-md text-uppercase push-5-r",
                        confirmButtonText: "Hapus",
                        cancelButtonText: "Batal",
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false
                    })
                    .then(function(res) {
                        if (res) {
                            var dType = window.active_data;
                            $.ajax({
                                    type: "POST",
                                    url: ENV.BASE_API + "deleteShiftData.php",
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

                                        // reload the table
                                        var table = $('#table-' + dType.replace("_", "-")).DataTable();
                                        table.ajax.reload();
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

        // Array for DAYS
        var getDays = function() {
            return [{
                label: 'Senin',
                value: 'Senin'
            }, {
                label: 'Selasa',
                value: 'Selasa'
            }, {
                label: 'Rabu',
                value: 'Rabu'
            }, {
                label: 'Kamis',
                value: 'Kamis'
            }, {
                label: 'Jumat',
                value: 'Jumat'
            }, {
                label: 'Sabtu',
                value: 'Sabtu'
            }, {
                label: 'Minggu',
                value: 'Minggu'
            }]
        }

        // Fn to populate modal's ajax selector (Select2)
        var initModalSelector = function(id, table) {
            var container = $('#input-' + id);
            var $multiple = (id == 'assignation_value' || id == 'override_shift') ? true : false;
            var $tags = (id == 'assignation_value' || id == 'override_shift') ? true : false;
            var $token = (id == 'assignation_value' || id == 'override_shift') ? [',', ' '] : [];

            if (container.hasClass("select2-hidden-accessible")) {
                container.empty();
            }

            container.select2({
                multiple: $multiple,
                tags: $tags,
                tokenSeparators: $token,
                ajax: {
                    url: ENV.BASE_API + 'getSelectorData.php?table=' + table,
                    dataType: 'json',
                    delay: 250,
                    cache: false,
                    data: function(params) {
                        var query = {
                            q: params.term || "",
                            page: params.page || 1
                        }
                        return query;
                    },
                    processResults: function(data, params) {
                        var page = params.page || 1;
                        return {
                            results: data,
                            pagination: {
                                more: (page * 10) <= data[0].total_count // <- has to be 10 (matched with API code)
                            }
                        };
                    },
                },
                escapeMarkup: function(markup) { return markup; },
                templateResult: formatKode,
                templateSelection: formatKodeSelection
            });

            function formatKode(data) {
                if (data.kode === undefined && data.nik === undefined) {
                    return data.text;
                }
                var markup = data.text + " (" + (data.kode || data.nik) + ")";
                return markup;
            }

            function formatKodeSelection(data) {
                if (data.kode === undefined && data.nik === undefined) {
                    return (data.nama || data.text);
                }
                return (data.nama || data.text) + " (" + (data.kode || data.nik) + ")";
            }

            return true;
        };

        // FN to assign value to selector
        var setModalSelector = function(id, table, value) {
            var selector = $('#input-' + id);
            selector.empty();
            $.getJSON(ENV.BASE_API + 'getSelectorData.php?table=' + table)
                .success(function(val) {
                    val.forEach(function(v) {
                        if (v.id == value) { // <- find the selected value
                            var option = new Option(v.text || v.kode, v.id, true, true);
                        } else {
                            var option = new Option(v.text || v.kode, v.id, false, false);
                        }
                        selector.append(option).trigger('change');
                    });
                    return true;
                });
        }

        // FN to assign value to selector
        var setArrayModalSelector = function(id, table, array) {
            var selector = $('#input-' + id);
            selector.empty();
            $.getJSON(ENV.BASE_API + 'getSelectorData.php?table=' + table)
                .success(function(val) {
                    val.forEach(function(v) {
                        if (jQuery.inArray(v.id, array) !== -1) { // <- find the selected value
                            var option = new Option(v.text || v.kode, v.id, true, true);
                        } else {
                            var option = new Option(v.text || v.kode, v.id, false, false);
                        }
                        selector.append(option).trigger('change');
                    });
                    return true;
                });
        }

        // MODAL EVENTS
        $('#modal')
            .on('shown.bs.modal', function() {
                var $scope = window.modal_scope;
                var data_type = window.active_data;
                var html = '';

                // data SHIFT actions
                if (data_type == 'shift') {
                    if ($scope == 'add') { // <- ADD
                        $('#modal-title').html("Tambah Data Shift");
                        html += renderAddElement('text', 'nama', 'Nama Shift', null, 8);
                        html += renderAddElement('text', 'kode', 'Kode', null, 4);
                        html += renderAddElement('multi-select', 'hari_efektif', 'Hari Efektif', getDays(), 5);
                        html += renderAddElement('time-picker', 'jam_masuk', 'Jam Masuk', null, 3);
                        html += renderAddElement('dash', '', '', null, 1);
                        html += renderAddElement('time-picker', 'jam_keluar', 'Jam Keluar', null, 3);
                        html += renderAddElement('time-picker', 'awal_scan_masuk', 'Scan Masuk', null, 3);
                        html += renderAddElement('dash', '', '', null, 1);
                        html += renderAddElement('time-picker', 'akhir_scan_masuk', '', null, 3);
                        html += renderAddElement('time-picker', 'awal_scan_keluar', 'Scan Keluar', null, 3);
                        html += renderAddElement('dash', '', '', null, 1);
                        html += renderAddElement('time-picker', 'akhir_scan_keluar', '', null, 3);
                        html += renderAddElement('check', 'on_freeday', 'Khusus Hari libur?', null, 12);
                        html += renderAddElement('check', 'override', 'Override Shift Lain?', null, 4);
                        html += renderAddElement('multiselect', 'override_shift', 'Pilih Shift Yang Di-override', null, 8, 'padding');
                        $('#generated-container').html(html);
                        // disable OVERRIDE_SHIFT selector
                        if (initModalSelector('override_shift', 'shift')) {
                            $('#input-override_shift').closest('.form-group').addClass('hide-me');
                        }

                    } else { // <- EDIT
                        $('#modal-title').html("Ubah Data Shift");
                        var data = window.opened_data;
                        html += renderEditElement('text', 'nama', 'Nama Shift', data.nama, null, 8);
                        html += renderEditElement('text', 'kode', 'Kode', data.kode, null, 4);
                        html += renderEditElement('multi-select', 'hari_efektif', 'Hari Efektif', data.hari_efektif, getDays(), 5);
                        html += renderEditElement('time-picker', 'jam_masuk', 'Jam Masuk', data.jam_masuk, null, 3);
                        html += renderEditElement('dash', '', '', null, null, 1);
                        html += renderEditElement('time-picker', 'jam_keluar', 'Jam Keluar', data.jam_keluar, null, 3);
                        html += renderEditElement('time-picker', 'awal_scan_masuk', 'Scan Masuk', data.awal_scan_masuk, null, 3);
                        html += renderEditElement('dash', '', '', null, null, 1);
                        html += renderEditElement('time-picker', 'akhir_scan_masuk', '', data.akhir_scan_masuk, null, 3);
                        html += renderEditElement('time-picker', 'awal_scan_keluar', 'Scan Keluar', data.awal_scan_keluar, null, 3);
                        html += renderEditElement('dash', '', '', null, null, 1);
                        html += renderEditElement('time-picker', 'akhir_scan_keluar', '', data.akhir_scan_keluar, null, 3);
                        html += renderEditElement('check', 'on_freeday', 'Khusus Hari Libur?', data.on_freeday, null, 12);
                        html += renderEditElement('check', 'override', 'Override Shift Lain?', data.transferable, null, 4);
                        html += renderEditElement('multiselect', 'override_shift', 'Pilih Shift Yang Di-override', data.override_shift, null, 8, 'padding');
                        $('#generated-container').html(html);
                        // Assign HARI_EFEKTIF value
                        var edays = data.hari_efektif;
                        $.each(edays.split(','), function(i, e) {
                            $("#input-hari_efektif option[value='" + e + "']").prop("selected", true);
                        });
                        // Assign value to checkbox (#input-transferable)
                        if (data.on_freeday == 1) {
                            $('#input-on_freeday').prop('checked', true);
                        }
                        if (data.override == 1) {
                            $('#input-override').prop('checked', true); // OVERRIDE SHIFT selector
                            $('#input-override_shift').closest('.form-group').removeClass('hide-me');
                            // set values to OVERRIDE_SHIFT selector
                            if (initModalSelector('override_shift', 'shift')) {
                                var selected = data.override_shift.split(',');
                                setArrayModalSelector('override_shift', 'shift', selected);
                            }
                        } else {
                            $('#input-override').prop('checked', false);
                            $('#input-override_shift').closest('.form-group').addClass('hide-me');
                        }

                    }
                    // initiate TIME PICKER
                    $('.js-datetimepicker').datetimepicker({
                        format: 'HH:mm'
                    });
                    App.initHelpers(['datetimepicker']);
                }

                // data GROUP_SHIFT actions
                if (data_type == 'group_shift') {
                    if ($scope == 'add') { // <- ADD
                        $('#modal-title').html("Tambah Data Shift Plot");
                        html += renderAddElement('text', 'nama', 'Nama Shift Plot', null, 8);
                        html += renderAddElement('text', 'kode', 'Kode', null, 4);
                        html += renderAddElement('daterange', 'date', 'Tanggal Efektif', null, 7);
                        html += renderAddElement('select', 'shift', 'Pilih Shift', null, 5);
                        html += renderAddElement('select', 'schema', 'Skema Shift', null, 8);
                        html += renderAddElement('select', 'assignation_key', 'Pilih Bagian', null, 5);
                        html += renderAddElement('multiselect', 'assignation_value', 'Unit', null, 7);
                        html += renderAddElement('check', 'transferable', 'Ijinkan Perpindahan (Transfer) Shift?', null, 12);
                        $('#generated-container').html(html);
                        // ::
                        // populating SHIFT selector
                        initModalSelector('shift', 'shift');
                        // populate SCHEMA selector
                        $('#input-schema')
                            .select2({
                                minimumResultsForSearch: -1,
                                data: [{
                                    text: 'Tanpa Skema',
                                    id: '0d0'
                                }, {
                                    text: '3 Hari Masuk 1 Hari Libur',
                                    id: '3d1'
                                }, {
                                    text: '4 Hari Masuk 1 Hari Libur',
                                    id: '4d1'
                                }, {
                                    text: '5 Hari Masuk 1 Hari Libur',
                                    id: '5d1'
                                }, {
                                    text: '6 Hari Masuk 1 Hari Libur',
                                    id: '6d1'
                                }, {
                                    text: '5 Hari Masuk 2 Hari Libur',
                                    id: '5d2'
                                }, {
                                    text: '6 Hari Masuk 2 Hari Libur',
                                    id: '6d2'
                                }]
                            })
                            .val(null)
                            .trigger('change');
                        // populate ASSIGNATION_KEY selector
                        $('#input-assignation_key')
                            .select2({
                                minimumResultsForSearch: -1,
                                data: [{
                                    text: 'Karyawan',
                                    id: 'employee'
                                }, {
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
                            .val(null)
                            .trigger('change');
                        // initiate ASSIGNATION_VALUE without populating
                        $('#input-assignation_value').select2();
                        $('#input-assignation_value').closest('.form-group').addClass('hide-me');

                    } else { // <- EDIT
                        $('#modal-title').html("Ubah Data Shift Plot");
                        var data = window.opened_data;
                        html += renderEditElement('text', 'nama', 'Nama Shift Plot', data.nama, null, 8);
                        html += renderEditElement('text', 'kode', 'Kode', data.kode, null, 4);
                        html += renderEditElement('daterange', 'date', 'Tanggal efektif', null, null, 7);
                        html += renderEditElement('select', 'shift', 'Pilih Shift', null, null, 5);
                        html += renderEditElement('select', 'schema', 'Skema Shift', null, null, 8);
                        html += renderEditElement('select', 'assignation_key', 'Pilih Bagian', null, null, 5);
                        html += renderEditElement('multiselect', 'assignation_value', 'Unit', null, null, 7);
                        html += renderEditElement('check', 'transferable', 'Ijinkan Perpindahan (Transfer) Shift?', data.transferable, null, 12);
                        $('#generated-container').html(html);
                        // populate and set SHIFT selector
                        if (initModalSelector('shift', 'shift')) {
                            setModalSelector('shift', 'shift', data.shift);
                        }
                        // populate SCHEMA selector
                        $('#input-schema')
                            .select2({
                                minimumResultsForSearch: -1,
                                data: [{
                                    text: 'Tanpa Skema',
                                    id: '0d0'
                                }, {
                                    text: '3 Hari Masuk 1 Hari Libur',
                                    id: '3d1'
                                }, {
                                    text: '4 Hari Masuk 1 Hari Libur',
                                    id: '4d1'
                                }, {
                                    text: '5 Hari Masuk 1 Hari Libur',
                                    id: '5d1'
                                }, {
                                    text: '6 Hari Masuk 1 Hari Libur',
                                    id: '6d1'
                                }, {
                                    text: '5 Hari Masuk 2 Hari Libur',
                                    id: '5d2'
                                }, {
                                    text: '6 Hari Masuk 2 Hari Libur',
                                    id: '6d2'
                                }]
                            })
                            .val(data.schema)
                            .trigger('change');
                        // populate and set ASSIGNATION_KEY selector
                        $('#input-assignation_key')
                            .select2({
                                minimumResultsForSearch: -1,
                                data: [{
                                    text: 'Karyawan',
                                    id: 'employee'
                                }, {
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
                            .val(data.assignation_key)
                            .trigger('change');
                        // populate and set ASSIGNATION_VALUE selector
                        if (initModalSelector('assignation_value', data.assignation_key)) {
                            var selected = data.assignation_value.split(',');
                            setArrayModalSelector('assignation_value', data.assignation_key, selected);
                        }
                        // Assign value to checkbox (#input-transferable)
                        if (data.transferable == 1) {
                            $('#input-transferable').prop('checked', true);
                        } else {
                            $('#input-transferable').prop('checked', false);
                        }

                    }
                    // initiate DATE RANGE PICKER
                    $('.daterangepicker').daterangepicker({
                        "opens": 'right',
                        "minDate": moment().subtract(6, 'months').format("DD-MM-YYYY"),
                        "maxDate": moment().add(6, 'months').format("DD-MM-YYYY"),
                        "locale": {
                            "format": "DD-MM-YYYY",
                            "separator": " s/d ",
                            "applyLabel": "Terapkan",
                            "cancelLabel": "Batal",
                            "fromLabel": "Dari",
                            "toLabel": "Sampai",
                            "weekLabel": "Mg.",
                            "daysOfWeek": [
                                "Min",
                                "Sen",
                                "Sel",
                                "Rab",
                                "Kam",
                                "Jum",
                                "Sab"
                            ],
                            "monthNames": [
                                "Januari",
                                "Februari",
                                "Maret",
                                "April",
                                "Mei",
                                "Juni",
                                "Juli",
                                "Agustus",
                                "September",
                                "Oktober",
                                "November",
                                "Desember"
                            ],
                            "firstDay": 0
                        },
                    });
                    if (data === undefined) {
                        $('.daterangepicker').data('daterangepicker').setStartDate(moment().format('DD-MM-YYYY'));
                        $('.daterangepicker').data('daterangepicker').setEndDate(moment().add(1, 'months').format('DD-MM-YYYY'));
                    } else {
                        $('.daterangepicker').data('daterangepicker').setStartDate(moment(data.date_from, 'YYYY-MM-DD').format('DD-MM-YYYY'));
                        $('.daterangepicker').data('daterangepicker').setEndDate(moment(data.date_to, 'YYYY-MM-DD').format('DD-MM-YYYY'));
                    }
                }

                // when ASSIGNATION KEY selector is changed
                $(document).on('change', '#input-assignation_key', function() {
                    var val = this.value;
                    // Remove any 'hide-me' class
                    if ($('#input-assignation_value').closest('.form-group').hasClass('hide-me')) $('#input-assignation_value').closest('.form-group').removeClass('hide-me');
                    // Destroy the Select2 instance
                    initModalSelector('assignation_value', val);
                });

                // when OVERRIDE checkbox is clicked
                $(document).on('change', ':checkbox', function() {
                    if (this.id == 'input-override') {
                        var is_checked = $(this).is(':checked');
                        if (is_checked) {
                            $('#input-override_shift').closest('.form-group').removeClass('hide-me');
                            // check if OVERRIDE_SHIFT selector already has Select2 instance
                            if (!$('#input-override_shift').hasClass("select2-hidden-accessible")) {
                                initModalSelector('override_shift', 'shift');
                            }
                        } else {
                            setModalSelector('override_shift', 'shift', null);
                            $('#input-override_shift').closest('.form-group').addClass('hide-me');
                        }
                    }
                });

                // initiate VALIDATION
                if (initValidation(data_type)) {
                    App.blocks('#modal-block', 'state_normal');
                }

            })
            .on('hidden.bs.modal', function() {
                window.$validator.destroy();
                window.opened_data = '';
                // reset all elements
                $('#modal-title, #generated-container').html('');
            });


        // set default hidden value for ACTIVE type
        window.active_data = 'shift';

        // Lets init our first table :: Shift Table
        initTableShift();

        // Surpress DT warning into JS errors
        $.fn.dataTableExt.sErrMode = 'throw';
    };

    return {
        init: function() {
            set_base('shift');
            initStat();
            initCalendar();
            initShiftPage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesShift.init(); });
