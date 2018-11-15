var BasePagesEmployee = function() {
    // failsafe for modal scope type: "add", "edit" or "view"
    window.modal_scope = '';
    // failsafe for uploader modal
    window.modal_upload = false;

    // init the page
    var initEmployeePage = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            // Set active class for related menu
            $('#menu-karyawan').addClass('active');
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            // Set the page title
            $('#header-title').html('<i class="si si-users push-10-r"></i>Data Karyawan');
        });

        // load footer
        $('#page-footer').load("../partials/footer.html", function() {
            // 
        });

        // when menu button is clicked
        $(document).on('click', '.nav-menu', function(e) {
            e.preventDefault();
            if ($(this).attr('route') != undefined) window.location = ENV.BASE_URL + $(this).attr('route');
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
                    $('#floating-btn').addClass('hide');
                    window.initTableTerminated();
                    break;
                default:
                    if ($('#floating-btn').hasClass('hide')) $('#floating-btn').removeClass('hide');
                    window.initTableEmployee();
                    window.initFilter();
                    break;
            }
            $('#btn-add').attr('data-type', t);
        });

        // when ADD BUTTON is clicked
        $(document).on('click', '#btn-add', function() {
            App.blocks('#modal-block', 'state_loading');
            // set modal scope
            window.modal_scope = 'add';
            $('#photo-container-edit').removeClass('hide-me');
            $('#photo-container-view').addClass('hide-me');
            $('#opened-profile').val("");
            $('#modal-profile').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });
        });

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
            set_base('employee');
            bsDataTables();
            initStat();
            window.initTableEmployee();
            window.initFilter();
            initEmployeePage();
            initUploader();
        }
    };
}();

// Initialize when page loads
jQuery(function() {
    // Main INIT
    BasePagesEmployee.init();

    $(window).on('load', function() {
        // Read current URL if there's any parameter given
        var params = url('?');
        if (params != undefined) {
            // console.log(params);
            $('select#input-filter-' + params.filter).val(params.value).trigger('change');
        }
    });
});
