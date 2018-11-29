var BasePagesAttendance = function() {
    var syncData = function() {
        $.ajax({
            type: "GET",
            url: ENV.BASE_API + 'syncAttendanceData.php?start=' + moment().subtract(1, 'months').format('YYYY-MM-DD HH:MM:SS'),
            dataType: 'json',
            success: function(res) {
                // if (res.success) {
                console.log(res);
                // }
            }
        })
    }

    var initStat = function(type) {
        // clear the container first
        var container = $('#stat-attendance');
        container.empty();
        // Get division datas
        $.ajax({
            type: "POST",
            url: ENV.BASE_API + 'getAttendanceStat.php',
            dataType: 'json',
            data: {
                type: type
            },
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
                                '<div class="font-w700 text-gray-darker animated fadIn">' + d.nama + '</div>' +
                                '<span class="h2 font-w300 text-primary animated flipInX">' + d.total + '</span>' +
                                '<div class="text-muted animated fadeIn"><small>Karyawan</small></div></div>';
                        });
                    }
                }

                html += '<div class="col-md-2 pull-right">' +
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

    var initCalendar = function() {
        // Init calendar
        $('#calendar').fullCalendar({
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
                if (event.attendance) {
                    if (event.title == 'IN') {
                        var html  = '<span class="text-white font-w600 push-5"><i class="fa fa-arrow-circle-right text-white push-5-r"></i>' + event.description + '</span>';
                    } else {
                        var html = '<span class="text-white font-w600 push-5"><i class="fa fa-arrow-circle-left text-white push-5-r"></i>' + event.description + '</span>';
                    }
                } else {
                    var html = '<div class="push-5-l push-5-t push-5-r push-5">';
                    if (event.absence !== undefined) {
                        html += '<div class="h5 text-white push-5">' + event.title + '</div>' +
                            '<div class="text-white"><i class="si si-ban text-white push-5-r"></i>' + event.description + '</div>';
                    } else if (event.title == "LIBUR") {
                        html += '<div class="h5 text-white push-5">' + event.title + '</div>' +
                            '<i class="si si-ban text-white"></i>';
                    } else {
                        html += '<div class="h5 text-white push-5">' + event.title.toUpperCase() + ' (' + event.kode + ')</div>' +
                            '<div class="text-white"><i class="si si-clock push-5-r"></i>' + event.jam_masuk + ' - ' + event.jam_keluar + '</div>';
                    }
                    html += '</div>';
                }
                element.find('.fc-title').html(html);
            },
            eventClick: function(event) {
                openAbsenceModal(window.searched_user, event);
            }
        });
    };

    // Main page function
    var initAttendancePage = function() {
        App.blocks('#calendar-block', 'state_loading');

        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            // Set active class for related menu
            $('#menu-attendance').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            // Set the page title
            $('#header-title').html('<i class="si si-user-following push-10-r"></i>Data Presensi');
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

        // MAIN FUNCTIONS
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
        $('#calendar').fullCalendar('removeEvents');
        setTimeout(function() {
            $('#calendar').fullCalendar('render');
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

        // when modal on close
        $('#modal').on('hidden.bs.modal', function() {
            console.log('Destroying validator and resetting elements...');
            window.$validator.destroy();

            // reset all elements
            $('[id^=input-]').html('').empty();

            // hide all hidden elements
            $('[id^=hidden-]').addClass('hide-me');
        })

        // When SYNC button is clicked
        $(document).on('click', '#sync', function() {
            syncData();
        })
    };

    return {
        init: function() {
            set_base('attendance');
            // initStat('attendance');
            initCalendar();
            initAttendancePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesAttendance.init(); });
