// Function to render elements inside the modal :: ADD
var renderEditElement = function(type, name, label, value, col_size) {
    var elem = '';

    if (type == 'text') {
        if (name == 'nama' || name == 'kode') var font_size = " font-s20 font-w700";
        else var font_size = "";
        elem += '<div class="form-group push-10-t">' +
            '<div class="col-md-' + col_size + ' push-30">' +
            '<div class="form-material form-material-primary">' +
            '<input class="form-control' + font_size + '" type="' + type + '" id="input-' + name + '" name="elem-' + name + '" value="' + value + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    }

    return elem;
};
