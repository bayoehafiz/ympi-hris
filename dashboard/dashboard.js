var BasePagesDashboard = function() {
    var initDashboard = function() {
        // load sidebar
        $('#sidebar').load("../partials/sidebar.html", function() {
            console.log("Sidebar loaded!");
        });

        // load header-nav
        $('#header-navbar').load("../partials/header-nav.html", function() {
            console.log("Header Navigation loaded!");
            // Set the page title
            $('#header-title').html('<h3 class="push-5-t"><i class="si si-speedometer">&nbsp;&nbsp;</i>DASHBOARD</h3>');
            // Set active class for related menu
            $('#menu-dashboard').addClass('active');
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

        // Button LOGOUT action
        $(document).on("click", "#btn-logout", function() {
            sessionStorage.clear();
            location.reload();
        })
    };

    return {
        init: function() {
            initDashboard();
            sweetAlert();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesDashboard.init(); });
