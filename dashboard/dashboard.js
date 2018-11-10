var BasePagesDashboard = function() {
    var initStatByStatus = function() {
        $.getJSON(BASE_URL + '/php/api/getStatByStatus.php', function(res) {
            if (res.success) {
                var data = res.data[0];

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

                $('#chart-total').attr('data-to', data.total);

                // Initialize plugin
                App.initHelpers(['easy-pie-chart', 'appear', 'appear-countTo']);

                $(document).on('click', ".stat-click", function(e) {
                    e.preventDefault();
                    console.log('Im clicked!');
                })
            }
        });
    };

    var initMiniStat = function() {
        $.getJSON(BASE_URL + '/php/api/getStatByAktif.php', function(res) {
            if (res.success) {
                var data = res.data[0];

                $('#stat-karyawan-aktif').html(data.total_aktif);
                $('#stat-karyawan-non-aktif').html(data.total_non_aktif);

                // Initialize plugin
                // App.initHelpers(['appear', 'appear-countTo']);

                $(document).on('click', ".mini-stat-click", function(e) {
                    e.preventDefault();
                    console.log('Im clicked!');
                })
            }
        });
    };

    var initChart = function(type) {
        if (type == 'bagian') {
            var $url = BASE_URL + '/php/api/getStatByBagian.php';
        } else if (type == 'grade') {
            var $url = BASE_URL + '/php/api/getStatByGrade.php';
        } else {
            var $url = BASE_URL + '/php/api/getStatByJabatan.php';
        }

        var $cat = [];
        var $data = [];
        var $res = $.getJSON($url, function(res) {
            if (res.success) {
                res.data.forEach(function(d) {
                    $cat.push({
                        label: d.nama
                    });
                    $data.push({
                        value: d.total,
                        color: "#a48ad4",
                        tooltext: "Nama " + type + ": <strong>" + d.nama + "</strong><br>Jml. Karyawan: <strong>" + d.total + "</strong>"
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
                "labelFontSize": "14",
                // "labelFontBold": "1",
                "showValues": "1",
                "valueFontSize": "20",
                "valueFontBold": "1",
                "valueFontColor": "#a48ad4",
                "numvisibleplot": "8",
                "theme": "fusion",
                "lineThickness": "3",
                "flatScrollBars": "1",
                "scrollheight": "10",
                "showHoverEffect": "1"
            };

            $('#chart-container').insertFusionCharts({
                type: "scrollcolumn2d",
                width: "100%",
                height: "300",
                dataFormat: "json",
                dataSource: {
                    "chart": $opt,
                    "categories": [{
                        "category": $cat,
                    }],
                    "dataset": [{
                        "data": $data
                    }]
                }
            });
        });
    };

    var initDashboard = function() {
        // Core Variable
        window.BASE_URL = url('protocol') + '://' + url('hostname');

        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");
            // Set active class for related menu
            $('#menu-dashboard').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
            // Set the page title
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-speedometer">&nbsp;&nbsp;</i>DASHBOARD</h3>');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            console.log("Footer loaded!");
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu', function(e) {
            e.preventDefault;
            console.log(BASE_URL + $(this).attr('route'));
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
            initMiniStat();
            initChart('bagian');
            initDashboard();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    // BASE_URL generator
    var $URL = document.URL;
    if (url('1', $URL) != 'dashboard') {
        window.BASE_URL = url('protocol', $URL) + '://' + url('hostname', $URL) + '/' + url('1', $URL);
    } else {
        window.BASE_URL = url('protocol', $URL) + '://' + url('hostname', $URL);
    }


    // Init main page
    BasePagesDashboard.init();
});
