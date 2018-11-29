// Function to render elements inside the modal :: ADD
var renderAddElement = function(type, name, label, col_size, object_data) {
    var elem = '';

    if (type == 'textarea') {
        elem += '<div class="col-md-' + col_size + ' push-10">' +
            '<div class="form-group">' +
            '<div class="form-material form-material-primary">' +
            '<textarea class="form-control" id="input-' + name + '" name="elem-' + name + '"></textarea>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'select') {
        elem += '<div class="col-md-' + col_size + ' push-10">' +
            '<div class="form-group">' +
            '<div class="form-material form-material-primary">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="1"></select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'check') {
        elem += '<div class="col-md-' + col_size + ' push-10">' +
            '<div class="form-group">' +
            '<div class="form-material form-material-primary">' +
            '<label class="css-input css-checkbox css-checkbox-primary">' +
            '<input type="checkbox" id="input-' + name + '" name="elem-' + name + '" checked=""><span></span> ' + label +
            '</label>' +
            '</div></div></div>';

    } else if (type == 'hidden') {
        elem += '<input type="' + type + '" id="input-' + name + '" name="elem-' + name + '">';

    } else {
        elem += '<div class="col-md-' + col_size + ' push-10">' +
            '<div class="form-group">' +
            '<div class="form-material form-material-primary">' +
            '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    }

    return elem;
};
