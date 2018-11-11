var BasePagesDashboard = function() {
    var initStatByStatus = function() {

        $.getJSON(ENV.BASE_API + 'getStatByStatus.php', function(res) {
            if (res.success) {
                var data = res.data[0];

                var showNumbers = function() {
                    $('.stat-click').attr('data-state', 'number');

                    var p_percobaaan = Math.ceil((parseInt(data.total_percobaan) / parseInt(data.total)) * 100);
                    $('#percent-total-percobaan').html(data.total_percobaan);
                    $('#chart-total-percobaan').attr('data-percent', p_percobaaan);

                    var p_kontrak_1 = Math.ceil((parseInt(data.total_kontrak_1) / parseInt(data.total)) * 100);
                    $('#percent-total-kontrak_1').html(data.total_kontrak_1);
                    $('#chart-total-kontrak_1').attr('data-percent', p_kontrak_1);

                    var p_kontrak_2 = Math.ceil((parseInt(data.total_kontrak_2) / parseInt(data.total)) * 100);
                    $('#percent-total-kontrak_2').html(data.total_kontrak_2);
                    $('#chart-total-kontrak_2').attr('data-percent', p_kontrak_2);

                    var p_tetap = Math.ceil((parseInt(data.total_tetap) / parseInt(data.total)) * 100);
                    $('#percent-total-tetap').html(data.total_tetap);
                    $('#chart-total-tetap').attr('data-percent', p_tetap);
                }

                var showPercents = function() {
                    $('.stat-click').attr('data-state', 'percent');

                    var p_percobaaan = Math.ceil((parseInt(data.total_percobaan) / parseInt(data.total)) * 100);
                    $('#percent-total-percobaan').html(p_percobaaan + '%');
                    $('#chart-total-percobaan').attr('data-percent', p_percobaaan);

                    var p_kontrak_1 = Math.ceil((parseInt(data.total_kontrak_1) / parseInt(data.total)) * 100);
                    $('#percent-total-kontrak_1').html(p_kontrak_1 + '%');
                    $('#chart-total-kontrak_1').attr('data-percent', p_kontrak_1);

                    var p_kontrak_2 = Math.ceil((parseInt(data.total_kontrak_2) / parseInt(data.total)) * 100);
                    $('#percent-total-kontrak_2').html(p_kontrak_2 + '%');
                    $('#chart-total-kontrak_2').attr('data-percent', p_kontrak_2);

                    var p_tetap = Math.ceil((parseInt(data.total_tetap) / parseInt(data.total)) * 100);
                    $('#percent-total-tetap').html(p_tetap + '%');
                    $('#chart-total-tetap').attr('data-percent', p_tetap);
                }

                $('#chart-total').attr('data-to', data.total);
                showNumbers(); // initialize numbers first!

                // Initialize plugin
                App.initHelpers(['easy-pie-chart', 'appear', 'appear-countTo']);

                $(document).on('click', ".stat-click", function(e) {
                    e.preventDefault();
                    var current_state = $('.stat-click').attr('data-state');
                    if (current_state == 'number') showPercents();
                    else showNumbers();
                })
            }
        });
    };

    var initMiniStat = function() {
        $.getJSON(ENV.BASE_API + 'getStatByAktif.php', function(res) {
            if (res.success) {
                var data = res.data[0];

                $('#stat-karyawan-aktif').html(data.total_aktif);
                $('#stat-karyawan-non-aktif').html(data.total_non_aktif);

                // Initialize plugin
                // App.initHelpers(['appear', 'appear-countTo']);
            }
        });
    };

    var initChart = function(type) {
        if (type == 'bagian') {
            var $url = ENV.BASE_API + 'getStatByBagian.php';
        } else if (type == 'grade') {
            var $url = ENV.BASE_API + 'getStatByGrade.php';
        } else {
            var $url = ENV.BASE_API + 'getStatByJabatan.php';
        }

        var $cat = [];
        var $dataP = [];
        var $dataL = [];
        var $res = $.getJSON($url, function(res) {
            if (res.success) {
                var data = res.data;

                if (type != 'jabatan') {
                    // Grouping the kode_bagian by `nama`
                    var temp = data;
                    data = [];
                    temp.reduce(function(res, value) {
                        if (!res[value.nama]) {
                            res[value.nama] = {
                                // id: value.id,
                                total_p: 0,
                                total_l: 0,
                                nama: value.nama
                            };
                            data.push(res[value.nama])
                        }
                        res[value.nama].total_p += parseInt(value.total_p);
                        res[value.nama].total_l += parseInt(value.total_l);
                        return res;
                    }, {});
                }

                data.forEach(function(d) {
                    $cat.push({
                        label: d.nama
                    });

                    var percent_p = (parseInt(d.total_p) / (parseInt(d.total_p) + parseInt(d.total_l))) * 100;
                    $dataP.push({
                        value: d.total_p,
                        // color: "#ff6c9d",
                        tooltext: "Nama " + type + "<br><h4>" + d.nama + "</h4><br>Karyawan Perempuan<br><h4>" + d.total_p + " <span class='text-muted'>(" + percent_p.toFixed(2) + " %)</span></h4>"
                    });

                    var percent_l = (parseInt(d.total_l) / (parseInt(d.total_p) + parseInt(d.total_l))) * 100;
                    $dataL.push({
                        value: d.total_l,
                        // color: "#a48ad4",
                        tooltext: "Nama " + type + "<br><h4>" + d.nama + "</h4><br>Karyawan Laki-laki<br><h4>" + d.total_l + " <span class='text-muted'>(" + percent_l.toFixed(2) + " %)</span></h4>"
                    });
                });
            }
        });

        $res.then(function() {
            var $opt = {
                "caption": null,
                "xAxisName": null,
                "yAxisName": null,
                "theme": "fusion",
                "formatNumber": 0,
                "formatNumberScale": 0,
                "thousandSeparator": ".",
                "showSum": "1",
                "showYAxisValues": 0,
                "yAxisValueDecimals": 0,
                "valueFontSize": "12",
                "valueFontBold": "1",
                "valueFontColor": "#656565",
                "valueFontAlpha": "90",
                "valueBgColor": "#ffffff",
                "valueBgAlpha": "100",
                "placeValuesInside": 0,
                "labelFontSize": "15",
                "labelFontBold": "1",
                "labelFontColor": "#656565",
                "outCnvBaseFont": "Source Sans Pro",
                "outCnvBaseFontSize": "15",
                "outCnvBaseFontColor": "#333",
                "toolTipBgColor": "#f6f5f7",
            };

            $('#chart-container').insertFusionCharts({
                type: "stackedcolumn2d",
                width: "100%",
                height: "300",
                dataFormat: "json",
                dataSource: {
                    "chart": $opt,
                    "categories": [{
                        "category": $cat,
                    }],
                    "dataset": [{
                        "seriesname": "Laki-laki",
                        "color": "#a488d6",
                        "data": $dataL
                    }, {
                        "seriesname": "Perempuan",
                        "color": "#f4b858",
                        "data": $dataP
                    }]
                }
            });
        });
    };

    var initDashboard = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            // Set active class for related menu
            $('#menu-dashboard').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            // Set the page title
            $('#header-title').html('<i class="si si-speedometer push-10-r"></i>Dashboard');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            // console.log("Footer loaded!");
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu', function(e) {
            e.preventDefault;
            console.log(ENV.BASE_URL + $(this).attr('route'));
            if ($(this).attr('route') != undefined) window.location = ".." + $(this).attr('route');
            return false;
        });

        // Button LOGOUT action
        $(document).on("click", "#btn-logout", function() {
            sessionStorage.clear();
            location.reload();
        })

        // tabs TOTAL KARYAWAN on click
        $(document).on('click', '#tab-chart .chart-click', function() {
            // $('#chart-container').disposeFusionCharts();
            var t = $(this).attr('data');
            initChart(t);
        });

    };

    return {
        init: function() {
            initStatByStatus();
            // initMiniStat();
            initChart('bagian');
            initDashboard();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    set_base('dashboard');

    // Init main page
    BasePagesDashboard.init();
});
