// Function to render elements inside the modal :: ADD
var renderAddElement = function(type, name, label, meta_data) {
    var elem = '';

    if (type == 'predefined-select') {
        var container = $('#input-' + name);
        // reset the selector first
        container.empty();
        container.append('<option value="" selected></option>');

        meta_data.forEach(function(v){
            container.append('<option value="' + v.value + '">' + v.key + '</option>')
        })

        $('#label-' + name).html(label);
        
    } else if (type == 'select') {
        var container = $('#input-' + name);
        // reset the selector first
        container.empty();
        container.append('<option value="" selected></option>');

        if (name == 'parent') {
            // get the source DB table to populate parent's select
            if (label == 'Divisi Induk') var source_table = 'division';
            else if (label == 'Departemen Induk') var source_table = 'department';
            else if (label == 'Section Induk') var source_table = 'section';
            else var source_table = 'sub_section';

            $.ajax({
                type: "POST",
                url: ENV.BASE_API + 'getDivisionData.php',
                dataType: 'json',
                data: {
                    table: source_table
                }
            }).done(function(res) {
                if (res.success) {
                    var data = res.data;
                    data.forEach(function(v) {
                        container.append('<option value="' + v.id + '">' + v.nama + '</option>');
                    })
                }
            });
        } else {
            if (name == 'division') {
                // populate the selector datas 
                $.ajax({
                    type: "POST",
                    url: ENV.BASE_API + 'getSelectorDataClean.php',
                    dataType: 'json',
                    data: {
                        table: name
                    }
                }).done(function(res) {
                    if (res.success) {
                        var obj = res.data;
                        obj.forEach(function(o) {
                            container.append('<option value="' + o.id + '">' + o.nama + '</option>');
                        })
                    }
                });
            } else {
                // if other than DIVISION selector, the leave it blank (onChange() event will handle it later!)
                container.append('<option value=""></option>');
            }
        }

        $('#label-' + name).html(label);

    } else {
        elem += '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div>';
    }

    return elem;
};
