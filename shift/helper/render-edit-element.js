// Function to render elements inside the modal :: EDIT
var renderEditElement = function(type, name, label, value, data_object, col_size, target_table) {
    var elem = '';

    if (type == 'group') {
        // Unhide the referred element
        $('#hidden-' + name).removeClass('hide-me');
        $('#label-' + name + '_key').html(label);

        var key_container = $('#input-' + name + '_key'),
            value_container = $('#input-' + name + '_value');

        // reset them first!
        key_container.html('');
        value_container.html('');

        // Populate data for ASSIGNATION_VALUE selector
        $.ajax({
            method: "POST",
            url: ENV.BASE_API + 'getSelectorDataClean.php',
            dataType: 'json',
            data: {
                table: value.key
            }
        }).done(function(res) {
            if (res.success) {
                // Assigning value for ASSIGNATION_KEY selector
                data_object.forEach(function(val) {
                    if (val.value == value.key)
                        key_container.append('<option value="' + val.value + '" selected>' + val.label + '</option>');
                    else
                        key_container.append('<option value="' + val.value + '">' + val.label + '</option>');
                });
                // Assigning value for ASSIGNATION_VALUE selector
                res.data.forEach(function(val) {
                    if (val.id == value.value) {
                        value_container.append('<option value="' + val.id + '" selected>' + val.nama + '</option>');
                    } else {
                        value_container.append('<option value="' + val.id + '">' + val.nama + '</option>');
                    }
                });
            }
        });

    } else if (type == 'daterange') {
        // Unhide the referred element
        // $('#hidden-' + name).removeClass('hide-me');
        // $('#label-' + name).html(label);

        // do something here
        elem += '<div class="form-group">' +
            '<div class="col-md-' + col_size + '">' +
            '<div class="form-material form-material-primary push-30">' +
            '<input class="form-control daterangepicker" type="text" id="input-' + name + '" name="elem-' + name + '"  style="position:initial!important;" value="' + moment(value.from, 'DD-MM-YYYY').format('MM/DD/YYYY') + ' - ' + moment(value.to, 'DD-MM-YYYY').format('MM/DD/YYYY') + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';

    } else if (type == 'select') {
        // Unhide the referred element
        $('#hidden-' + name).removeClass('hide-me');
        $('#label-' + name).html(label);

        var container = $('#input-' + name);

        // Reset the element first!
        container.html('');

        // Get data for the selector
        $.ajax({
            method: "POST",
            url: ENV.BASE_API + 'getSelectorDataClean.php',
            dataType: 'json',
            data: {
                table: target_table
            }
        }).done(function(res) {
            if (res.success) {
                res.data.forEach(function(val) {
                    if (val.id == value) {
                        container.append('<option value="' + val.id + '" selected>' + val.nama + '</option>');
                    } else {
                        container.append('<option value="' + val.id + '">' + val.nama + '</option>');
                    }
                });
            }
        });

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
            '<input class="js-datetimepicker form-control" type="text" id="input-' + name + '" name="elem-' + name + '" value="' + value + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else {
        if (name == 'nama' || name == 'kode') var font_size = " font-s20 font-w700";
        else var font_size = "";
        elem += '<div class="form-group"><div class="col-md-' + col_size + '"><div class="form-material form-material-primary push-30">' +
            '<input class="form-control' + font_size + '" type="' + type + '" id="input-' + name + '" name="elem-' + name + '" value="' + value + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div></div>';
    }

    return elem;
};
