// Function to render elements inside the modal :: ADD
window.renderAddElement = function(type, name, label, data_object, col_size, target_table) {
    var elem = '';

    if (type == 'daterange') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + ' push-20">' +
            '<div class="form-material form-material-primary">' +
            '<input class="form-control daterangepicker" type="text" id="input-' + name + '" name="elem-' + name + '"  style="position:initial!important;">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'select') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + ' push-20">' +
            '<div class="form-material form-material-primary">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="1">' +
            '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'multiselect') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + ' push-20">' +
            '<div class="form-material form-material-primary">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" data-placeholder="Ketik utk mencari" multiple="multiple">' +
            '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'time-picker') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + ' push-20">' +
            '<div class="form-material form-material-primary">' +
            '<input class="js-datetimepicker form-control" type="text" id="input-' + name + '" name="elem-' + name + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div>' +
            '</div>' +
            '</div>';

    } else if (type == 'check') {
        var padding = (name == 'override') ? ' push-10-t' : '';
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + ' push-20' + padding + '">' +
            '<div class="form-material form-material-primary">' +
            '<label class="css-input css-checkbox css-checkbox-primary">' +
            '<input type="checkbox" id="input-' + name + '" name="elem-' + name + '"><span></span> ' + label +
            '</label>' +
            '</div>' +
            '</div>' +
            '</div>';

    } else if (type == 'multi-select') {
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + ' push-20">' +
            '<div class="form-material form-material-primary">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="7" multiple>';

        data_object.forEach(function(val) {
            elem += '<option value="' + val.value + '">' + val.label + '</option>';
        })

        elem += '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '<div class="help-block text-right">&#8984;/Ctrl + klik untuk multi select</div>' +
            '</div></div></div>';

    } else if (type == 'text') {
        if (name == 'nama') {
            var font_size = " font-s20 font-w600";
            top = ' push-10-t';
            bottom = '';
        } else if (name == 'kode') {
            var font_size = " font-s20 font-w600";
            top = '';
            bottom = ' push-10';
        }

        elem += '<div class="form-group' + top + bottom + '">' +
            '<div class="col-md-' + col_size + ' push-20">' +
            '<div class="form-material form-material-primary">' +
            '<input class="form-control' + font_size + '" type="' + type + '" id="input-' + name + '" name="elem-' + name + '" autofill="false">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else {
        elem += '<div class="col-md-' + col_size + ' push-20 push-20-t">' +
            '-' +
            '</div>';
    }

    return elem;
};
