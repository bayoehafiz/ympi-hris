// Function to render elements inside the modal :: ADD
var renderAddElement = function(type, name, label, data_object, col_size, target_table) {
    var elem = '';

    if (type == 'group') {
        // Unhide the referred element
        $('#hidden-' + name).removeClass('hide-me');
        $('#label-' + name + '_key').html(label);

        var key_container = $('#input-' + name + '_key'),
            value_container = $('#input-' + name + '_value');

        key_container.append('<option value=""></option>')
        data_object.forEach(function(val) {
            key_container.append('<option value="' + val.value + '">' + val.label + '</option>');
        });

    } else if (type == 'daterange') {
        // Unhide the referred element
        // $('#hidden-' + name).removeClass('hide-me');
        // $('#label-' + name).html(label);

        // do something here
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<input class="form-control daterangepicker" type="text" id="input-' + name + '" name="elem-' + name + '"  style="position:initial!important;">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'select') {
        // Unhide the referred element
        $('#hidden-' + name).removeClass('hide-me');
        $('#label-' + name).html(label);

        // Get data for the selector
        $.ajax({
            method: "POST",
            url: BASE_URL + '/php/api/getSelectorDataClean.php',
            dataType: 'json',
            data: {
                table: target_table
            }
        }).done(function(res) {
            if (res.success) {
                var container = $('#input-' + name);
                container.append('<option value=""></option>');
                res.data.forEach(function(val) {
                    container.append('<option value="' + val.id + '">' + val.nama + '</option>');
                });
            }
        });

    } else if (type == 'multi-select') {
        elem += '<div class="form-group push-30">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary">' +
            '<select class="form-control" id="input-' + name + '" name="elem-' + name + '" size="7" multiple>';

        data_object.forEach(function(val) {
            elem += '<option value="' + val.value + '">' + val.label + '</option>';
        })

        elem += '</select>' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '<div class="help-block text-right">&#8984;/Ctrl + klik untuk multi select</div>' +
            '</div></div></div>';

    } else if (type == 'time-picker') {
        elem += '<div class="form-group push-30">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary">' +
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
