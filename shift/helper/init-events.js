// Init drag and drop event functionality
var initEvents = function() {
    jQuery('.js-events')
        .find('li')
        .each(function() {
            var $event = jQuery(this);

            // create an Event Object
            var $eventObject = {
                title: jQuery.trim($event.text()),
                color: $event.css('background-color')
            };

            // store the Event Object in the DOM element so we can get to it later
            jQuery(this).data('eventObject', $eventObject);

            // make the event draggable using jQuery UI
            jQuery(this).draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0
            });
        });
};
