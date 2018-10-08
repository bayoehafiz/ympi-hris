// Function to render elements inside profile-modal
var renderEditingElement = function(type, data_name, placeholder, label, disabled, object) { // type = "text", "number", "textarea". "datepicker"
    if (disabled) var disabled = ' disabled';
    else var disabled = '';

    if (type == 'textarea') {
        var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<textarea class="form-control" id="input-' + placeholder + '" name="elem-' + placeholder + '" ' + disabled + '">' + data_name + '</textarea>' +
            '<label for="elem-' + data_name + '">' + label + '</label>' +
            '</div></div>';
    } else if (type == 'datepicker') {
        var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<input class="js-datepicker form-control" type="text" id="input-' + placeholder + '" name="elem-' + placeholder + '" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy">' +
            '<label for="elem-' + data_name + '">' + label + '</label>' +
            '</div></div>';
    } else if (type == 'select') {
        var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<select class="form-control" id="input-' + placeholder + '" name="elem-' + placeholder + '" size="1">' +
            '<option></option>';
        object.forEach(function(x) {
            elem += '<option value="' + x.value + '">' + x.label + '</option>';
        });
        elem += '</select>' +
            '<label for="elem-' + data_name + '">' + label + '</label>' +
            '</div></div>';
    } else {
        var elem = '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<input class="form-control" type="' + type + '" id="input-' + placeholder + '" name="elem-' + placeholder + '" value="' + data_name + '" placeholder="' + data_name + '"' + disabled + '>' +
            '<label for="elem-' + placeholder + '">' + label + '</label>' +
            '</div></div>';
    }

    return elem;
};
