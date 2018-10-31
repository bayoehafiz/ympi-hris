// Function to render elements inside the modal :: ADD
var renderAddElement = function(type, name, label, col_size, object_data) {
    var elem = '';

    if (type == 'textarea') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<textarea class="form-control" id="input-' + name + '" name="elem-' + name + '"></textarea>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    } else if (type == 'select') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="1">' +
            '<option></option>';

        object_data.forEach(function(x) {
            elem += '<option value="' + x.value + '">' + x.label + '</option>';
        });

        elem += '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    } else if (type == 'check') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<label class="css-input css-checkbox css-checkbox-primary">' +
            '<input type="checkbox" id="input-' + name + '" name="elem-' + name + '" checked=""><span></span> ' + label +
            '</label>' +
            '</div></div></div>';
    } else {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    }

    return elem;
};
