// Function to render elements inside the modal :: EDIT
var renderEditElement = function(type, name, label, value, col_size) {
    var elem = '';

    if (type == 'textarea') {
        elem += '<div class="col-md-' + col_size + '">' +
            '<div class="form-group">' +
            '<div class="form-material form-material-primary push-30">' +
            '<textarea class="form-control" id="input-' + name + '" name="elem-' + name + '">' + value + '</textarea>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'select') {
        elem += '<div class="col-md-' + col_size + '">' +
            '<div class="form-group">' +
            '<div class="form-material form-material-primary push-30">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="1">' +
            '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'check') {
        if (value == 1) var checked = ' checked=""';
        else var checked = '';
        elem += '<div class="col-md-' + col_size + '">' +
            '<div class="form-group">' +

            '<div class="form-material form-material-primary push-30">' +
            '<label class="css-input css-checkbox css-checkbox-primary">' +
            '<input type="checkbox" id="input-' + name + '" name="elem-' + name + '" ' + checked + '><span></span> ' + label +
            '</label>' +
            '</div></div></div>';

    } else {
        elem += '<div class="col-md-' + col_size + '">' +
            '<div class="form-group">' +
            '<div class="form-material form-material-primary push-30">' +
            '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '" value="' + value + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    }

    return elem;
};
