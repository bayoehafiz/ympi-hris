// Function to render elements inside the modal :: EDIT
var renderEditElement = function(type, name, label, value, col_size) {
    var elem = '';

    if (type == 'select') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-10">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="1">' +
            '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else {
        if (name == 'nama' || name == 'kode') var font_size = " font-s20 font-w700";
        else var font_size = "";
        elem += '<div class="form-group push-20-t">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<input class="form-control' + font_size + '" type="' + type + '" id="input-' + name + '" name="elem-' + name + '" value="' + value + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    }

    return elem;
};
