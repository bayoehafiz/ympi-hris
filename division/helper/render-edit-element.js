// Function to render elements inside the modal :: EDIT
var renderEditElement = function(type, name, label, value, meta_data) {
    var populate = function($container, $table, $val) {
        $container = $($container);
        $.ajax({
            type: "POST",
            url: ENV.BASE_API + 'getSelectorDataClean.php',
            dataType: 'json',
            data: {
                table: $table
            }
        }).done(function(res) {
            if (res.success) {
                var obj = res.data;
                if ($val != null) {
                    obj.forEach(function(v) {
                        if (v.id == $val) $container.append('<option value="' + v.id + '" selected>' + v.nama + '</option>');
                        else $container.append('<option value="' + v.id + '">' + v.nama + '</option>');
                    })
                } else {
                    $container.append('<option value="" selected></option>');
                    obj.forEach(function(v) {
                        $container.append('<option value="' + v.id + '">' + v.nama + '</option>');
                    })
                }
            }
        });
    };

    var elem = '';
    if (type == 'predefined-select') {
        var container = $('#input-' + name);
        if (name == 'bagian_key') {
            // reset the selector first
            container.empty();
            meta_data.forEach(function(v) {
                if (v.value == value) container.append('<option value="' + v.value + '" selected>' + v.key + '</option>');
                else container.append('<option value="' + v.value + '">' + v.key + '</option>');
            })

            $('#label-' + name).html(label);

        } else {
            container.val(value);
        }

    } else if (type == 'select') {
        var container = $('#input-' + name);
        // reset the selector first
        container.empty();

        if (name == 'bagian_value') {

            populate('#input-' + name, value.table, value.id);

        } else if (name == 'parent') {

            // get the source DB table to populate parent's select
            if (label == 'Divisi Induk') var source_table = 'division';
            else if (label == 'Departemen Induk') var source_table = 'department';
            else if (label == 'Section Induk') var source_table = 'section';
            else var source_table = 'sub_section';

            populate('#input-' + name, source_table, value)

        } else {

            switch (name) {
                case 'department':
                    populate('#input-' + name, name, value)
                    break;
                case 'section':
                    populate('#input-' + name, name, value)
                    break;
                case 'sub_section':
                    populate('#input-' + name, name, value)
                    break;
                case 'group':
                    populate('#input-' + name, name, value)
                    break;
                default:
                    populate('#input-' + name, name, value)
                    break;
            }

        }
        container.trigger('change');
        $('#label-' + name).html(label);
    } else {
        if (name == 'nama' || name == 'kode') var font_size = " font-s20 font-w700";
        else var font_size = "";
        elem += '<div class="form-group push-50 push-20-t"><div class="form-material form-material-primary">' +
            '<input class="form-control' + font_size + '" type="' + type + '" id="input-' + name + '" name="elem-' + name + '" value="' + value + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div>';
    }

    return elem;
};
