// Function to render elements inside the modal :: ADD
var renderAddElement = function(type, name, label) {
    var elem = '';

    if (type == 'select') {
        // reset the selct elemnt first
        $('#input-parent').empty();

        // get the source DB table to populate parent's select
        if (label == 'Divisi Induk') var source_table = 'division';
        else if (label == 'Departemen Induk') var source_table = 'department';
        else if (label == 'Section Induk') var source_table = 'section';
        else var source_table = 'sub_section';

        $.ajax({
            type: "POST",
            url: BASE_URL + '/php/api/getDivisionData.php',
            dataType: 'json',
            data: {
                table: source_table
            }
        }).done(function(res) {
            if (res.success) {
                var data = res.data;

                $('#hidden-select').removeClass('hide-me');
                $('#input-parent').append('<option value="" selected></option>');
                $('#label-parent').html(label);

                data.forEach(function(v) {
                    $('#input-parent').append('<option value="' + v.id + '">' + v.nama + '</option>')
                })
            }
        })
    } else {
        elem += '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div>';
    }

    // console.log(elem);
    return elem;
};
