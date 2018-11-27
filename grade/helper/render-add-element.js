// Function to render elements inside the modal :: ADD
var renderAddElement = function(type, name, label, col_size) {
    var elem = '';

    if (type == 'text') {
        if (name == 'nama' || name == 'kode') var font_size = " font-s20 font-w700";
        else var font_size = "";
        elem += '<div class="form-group push-10-t">' +
            '<div class="col-md-' + col_size + ' push-20">' +
            '<div class="form-material form-material-primary">' +
            '<input class="form-control' + font_size + '" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    }

    return elem;
};
