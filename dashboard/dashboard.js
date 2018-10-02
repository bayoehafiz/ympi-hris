var BasePagesDashboard = function() {
    var initDashboard = function() {
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        })
    };

    var sweetAlert = function() {
        // Init an error alert on button click
        jQuery('.js-swal-error').on('click', function() {
            swal('Oops...', 'Sedang dalam pengembangan!', 'warning');
        });
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
