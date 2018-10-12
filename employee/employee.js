var BasePagesEmployee = function() {
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

    // Init page stat
    var initStat = function() {
        $.ajax({
            type: "GET",
            url: BASE_URL + '/php/api/getEmployeeStat.php',
            dataType: 'json',
            success: function(res) {
                var container = $('#employee-stat');
                var html = '';
                container.empty();
                if (res.status == 'ok') {
                    var data = res.data;
                    var counter = 0;
                    data.forEach(function(d) {
                        if (d.status == "Kontrak 1") {
                            html += '<div class="col-md-2 col-md-offset-1 col-xs-6">' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">Kontrak 1</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                                '</div>';
                        } else if (d.status == "Kontrak 2") {
                            html += '<div class="col-md-2 col-xs-6">' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">Kontrak 2</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                                '</div>';
                        } else {
                            html += '<div class="col-md-2 col-xs-6">' +
                                '<div class="font-w700 text-gray-darker animated fadeIn">Tetap</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                                '</div>';
                        }

                        counter += parseInt(d.total);
                    })  
                    html += '<div class="col-md-2 col-xs-6">' +
                        '<div class="font-w700 text-gray-darker animated fadeIn">Total</div>' +
                        '<span class="h2 font-w300 text-primary animated flipInX" id="total-tetap">' + counter + '</span>' +
                        '<div class="text-muted animated fadeIn"><small>Karyawan</small></div>' +
                        '</div>';
                }
                html += '<div class="col-md-2">' +
                    '<span class="h2 font-w300 text-primary animated flipInX">' +
                    '<button type="button" class="btn btn-primary btn-circle btn-lg push-5" id="btn-add"><i class="fa fa-plus"></i></button>' +
                    '</span>' +
                    '<div class="text-muted animated fadeIn"><small>Tambah Data</small></div>' +
                    '</div>';

                container.html(html);
            }
        })
    };

    // Init main table
    var initTable = function() {
        // Table initiation
        var table = $('.js-dataTable-full').DataTable({
            order: [
                [0, "asc"]
            ],
            columnDefs: [{ orderable: true }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: BASE_URL + '/php/api/getEmployee.php',
                dataSrc: function(json) {
                    if (json.status == 'ok') {
                        var data = json.data;
                        var resultData = [];
                        data.forEach(function(x) {
                            // Manipulate result data
                            x.namaEdt = '<a data-id="' + x.nik + '" href="javascript:void(0)">' + x.nama + '</a>'
                            if (x.status == "Tetap") x.statusEdt = '<span class="label label-primary">' + x.status.toUpperCase() + '</span>';
                            else if (x.status == "Kontrak 1") x.statusEdt = '<span class="label label-info">' + x.status.toUpperCase() + '</span>';
                            else if (x.status == "Kontrak 2") x.statusEdt = '<span class="label label-warning">' + x.status.toUpperCase() + '</span>';
                            else x.statusEdt = '<span class="label label-default">' + x.status + '</span>';

                            resultData.push(x);
                        })
                        return resultData;
                    } else {
                        $.notify({
                            icon: 'fa fa-exclamation-circle',
                            message: '<strong>EMPTY DATA!</strong><br/>Klik tombol TAMBAH DATA untuk membuat data karyawan baru.'
                        }, {
                            type: 'info'
                        });
                        return [];
                    }
                }
            },
            deferRender: true,
            columns: [
                { data: "nik" },
                { className: "font-w600", data: "namaEdt" },
                { className: "hidden-xs", data: "nama_jabatan" },
                { className: "hidden-xs", data: "nama_division" },
                { className: "hidden-xs text-center", data: "statusEdt" },
                {
                    data: null,
                    render: function(data, type, row) {
                        return '<div class="btn-group text-center">' +
                            '<button class="btn btn-xs btn-default" type="button" id="btn-view"><i class="fa fa-eye"></i></button>' +
                            '<button class="btn btn-xs btn-default btn-edit" type="button"><i class="fa fa-pencil"></i></button>' +
                            '<button class="btn btn-xs btn-default btn-remove" type="button"><i class="fa fa-trash"></i></button>' +
                            '</div>';
                    }
                }
            ]
        });

        // when ADD button is clicked
        $(document).on('click', '#btn-add', function() {
            $('#modal-profile').modal('show');
            renderProfileAdd();
            $('#opened-profile').val("");
        });

        // When employee NAME or TABLE'S VIEW button is clicked
        $('.js-dataTable-full tbody').on('click', 'a, #btn-view', function() {
            var data = table.row($(this).parents('tr')).data();

            // Open the popup modal
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.id);

            renderProfileView(data);
        });

        // When TABLE'S EDIT button is clicked
        $('.js-dataTable-full tbody').on('click', '.btn-edit', function() {
            var data = table.row($(this).parents('tr')).data();

            // Open the popup modal
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.id);
            $('#origin').val('direct');

            renderProfileEdit(data);
        });

        // When TABLE'S DELETE button is clicked
        $('.js-dataTable-full tbody').on('click', '.btn-remove', function() {
            var data = table.row($(this).parents('tr')).data();
            swal({
                title: "Hapus data?",
                text: "Data yang dihapus tidak akan dapat dikembalikan",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Hapus!",
                cancelButtonText: "Batal",
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve) {
                        $.ajax({
                                type: "POST",
                                url: BASE_URL + "/php/api/deleteEmployee.php",
                                dataType: 'json',
                                data: {
                                    id: data.id
                                }
                            }).done(function(response) {
                                if (response.status == 'err') {
                                    swal('Error', response.message, 'error');
                                } else {
                                    swal.close();
                                    $.notify({
                                        "icon": "si si-check",
                                        "message": "Data karyawan berhasil dihapus"
                                    }, {
                                        "type": "success"
                                    });
                                    $('#modal-profile').modal('hide');

                                    // reload the stat
                                    initStat();

                                    // reload the table
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    });
                },
                allowOutsideClick: false
            });
        });

        // when CANCEL button clicked
        $(document).on('click', '#btn-cancel-profile', function() {
            var origin = $('#origin').val();
            if (origin == 'direct') {
                $('#modal-profile').modal('hide');
            } else {
                var profile = $('#opened-profile').val();
                $.ajax({
                        type: "POST",
                        url: BASE_URL + "/php/api/getEmployeeById.php",
                        dataType: 'json',
                        data: {
                            id: profile
                        }
                    })
                    .done(function(response) {
                        if (response.status == 'err') {
                            swal('Error', response.message, 'error');
                        } else {
                            var profile_data = response.data[0];
                            renderProfileView(profile_data);
                        }
                    })
                    .fail(function() {
                        swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                    });
            }
        });

        // When EDIT button is clicked
        $(document).on('click', '#btn-edit-profile', function() {
            var $btn = $(this);
            var $tr = $btn.closest('tr');
            var dataTableRow = table.row($tr[0]);
            var data = dataTableRow.data();
            $('#modal-profile').modal('show');
            $('#opened-profile').val(data.id);
            $('#origin').val('modal');
            renderProfileEdit(data);
        });

        // When DELETE button is clicked
        $(document).on('click', '#btn-remove-profile', function() {
            swal({
                title: "Hapus data?",
                text: "Data yang dihapus tidak akan dapat dikembalikan",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Hapus!",
                cancelButtonText: "Batal",
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve) {
                        $.ajax({
                                type: "POST",
                                url: BASE_URL + "/php/api/deleteEmployee.php",
                                dataType: 'json',
                                data: {
                                    id: $('#opened-profile').val()
                                }
                            }).done(function(response) {
                                if (response.status == 'err') {
                                    swal('Error', response.message, 'error');
                                } else {
                                    swal.close();
                                    $.notify({
                                        "icon": "si si-check",
                                        "message": "Data karyawan berhasil dihapus"
                                    }, {
                                        "type": "success"
                                    });
                                    $('#modal-profile').modal('hide');

                                    // reload the stat
                                    initStat();

                                    // reload the table
                                    table.ajax.reload();
                                }
                            })
                            .fail(function() {
                                swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                            });
                    });
                },
                allowOutsideClick: false
            });
        })

        // When SAVE / SUBMIT button is clicked
        $(document).on('submit', '#profile-form', function(e) {
            e.preventDefault();

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

            // Read current profile
            var cProf = $('#opened-profile').val();
            if (cProf == '') var apiUrl = BASE_URL + '/php/api/addEmployee.php';
            else var apiUrl = BASE_URL + '/php/api/updateEmployee.php';

            $.ajax({
                type: "POST",
                url: apiUrl,
                dataType: 'json',
                data: {
                    data: data,
                    id: $('#opened-profile').val()
                },
                success: function(res) {
                    if (res.status == 'err') {
                        swal("Error!", res.message, "error");
                    } else {
                        $('#modal-profile').modal('hide');
                        $.notify({
                            "icon": "si si-check",
                            "message": "Data karyawan berhasil disimpan"
                        }, {
                            "type": "success"
                        });

                        // reload the stat
                        initStat();

                        // reload the table
                        table.ajax.reload();
                    }

                }
            })
        });
    };

    var initEmployeePage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");

            // load the logo
            $('.logo').html('<img src="../assets/img/yamaha-logo-white.png" class="img-responsive center-block">');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
            // Set the page title
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-users">&nbsp;&nbsp;</i>DATA KARYAWAN</h3>');
            // Set active class for related menu
            $('#menu-karyawan').addClass('active');
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

        // when button LOGOUT is clicked
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        });


        // ADD PROFILE functions ::
        // 
        // when gear button clicked
        $(document).on('click', '#btn-generate-profile', function() {
            generateRandomProfile();
        });

        // when division selector changed
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
                    if (res.status == 'ok') repopulateSelector('input-department', res.data);
                    $('#input-section, #input-sub_section, #input-group').empty();
                }
            });
        });

        // when department selector changed
        $(document).on('change', '#input-department', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

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
                    if (res.status == 'ok') repopulateSelector('input-section', res.data);
                    $('#input-sub_section, #input-group').empty();
                }
            });
        });

        // when section selector changed
        $(document).on('change', '#input-section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

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
                    if (res.status == 'ok') repopulateSelector('input-sub_section', res.data);
                    $('#input-group').empty();
                }
            });
        });

        // when sub-section selector changed
        $(document).on('change', '#input-sub_section', function() {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

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
                    if (res.status == 'ok') repopulateSelector('input-group', res.data);
                }
            });
        });
    };

    return {
        init: function() {
            bsDataTables();
            initStat();
            initTable();
            initEmployeePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() {  BasePagesEmployee.init(); });
