// Function to render elements inside profile-modal
var renderEditElement = function(type, data_name, placeholder, label, disabled, object, selected) { // type = "text", "number", "textarea". "datepicker"
    if (disabled) var disabled = ' disabled';
    else var disabled = '';

    if (type == 'textarea') {
        var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<textarea class="form-control" id="input-' + placeholder + '" name="elem-' + placeholder + '" ' + disabled + '">' + data_name + '</textarea>' +
            '<label for="elem-' + data_name + '">' + label + '</label>' +
            '<div class="help-block text-right">Tekan [Enter] utk ganti baris</div>' +
            '</div></div>';

    } else if (type == 'datepicker') {
        var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<input class="js-datepicker form-control" type="text" id="input-' + placeholder + '" name="elem-' + placeholder + '" data-date-format="dd-mm-yyyy" value="' + data_name + '">' +
            '<label for="elem-' + data_name + '">' + label + '</label>' +
            '</div></div>';

    } else if (type == 'select') {
        var elem = '<div class="form-group push-10"><div class="form-material form-material-primary push-30">' +
            '<select class="form-control" id="input-' + data_name + '" name="elem-' + data_name + '" size="1">' +
            '</select>' +
            '<label for="elem-' + data_name + '">' + label + '</label>' +
            '</div></div>';

    } else if (type == 'select_ajax') {
        var elem = '<div class="form-group push-10"><div class="form-material form-material-primary push-30">' +
            '<select class="form-control" id="input-' + data_name + '" name="elem-' + data_name + '" size="1">' +
            '<option></option>' +
            '</select>' +
            '<label for="elem-' + data_name + '">' + label + '</label>' +
            '</div></div>';

    } else {
        var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<input class="form-control" type="' + type + '" id="input-' + placeholder + '" name="elem-' + placeholder + '" value="' + data_name + '"' + disabled + '>' +
            '<label for="elem-' + placeholder + '">' + label + '</label>' +
            '</div></div>';
    }

    return elem;
};
