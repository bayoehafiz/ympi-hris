/*
 *  Document   : base_pages_dashboard.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Dashboard Page
 */

var BasePagesDashboard = function() {
    // Chart.js Chart, for more examples you can check out http://www.chartjs.org/docs
    var initDashboard = function() {
        $('#btn-logout').click(function(){
            sessionStorage.clear();
            location.reload();
        })
    };

    var sweetAlert = function(){
        // Init an error alert on button click
        jQuery('.js-swal-error').on('click', function(){
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
