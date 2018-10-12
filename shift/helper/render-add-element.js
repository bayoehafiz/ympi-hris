// Function to render elements inside the modal :: ADD
var renderAddElement = function(type, name, label, data_object, col_size) {
    var elem = '';

    if (type == 'select') {
        elem += '<div class="form-group"><div class="col-md-' + col_size + '"><div class="form-material form-material-primary push-30">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="1">';

        data_object.forEach(function(val) {
            elem += '<option value="' + val.value + '">' + val.label + '</option>';
        });

        elem += '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'multi-select') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="7" multiple>';

        data_object.forEach(function(val) {
            elem += '<option value="' + val.value + '">' + val.label + '</option>';
        })

        elem += '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '<div class="help-block text-right">&#8984;/Ctrl + klik untuk multi select</div>' +
            '</div></div></div>';

    } else if (type == 'time-picker') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<input class="js-datetimepicker form-control" type="text" id="input-' + name + '" name="elem-' + name + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else {
        elem += '<div class="form-group"><div class="col-md-' + col_size + '"><div class="form-material form-material-primary push-30">' +
            '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    }

    return elem;
};
