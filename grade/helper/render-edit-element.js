// Function to render elements inside the modal :: ADD
var renderEditElement = function(type, name, label, value) {
    var elem = '';

    if (type == 'select') {
        // reset the selct elemnt first
        $('#input-parent').empty();

        $.ajax({
            type: "POST",
            url: BASE_URL + '/php/api/getGradeData.php',
            dataType: 'json',
            data: {
                table: source_table
            }
        }).done(function(res) {
            if (res.success) {
                var data = res.data;

                $('#hidden-select').removeClass('hide-me');
                $('#input-parent').append('<option></option>');
                $('#label-parent').html(label);

                data.forEach(function(v) {
                    if (v.id == value) $('#input-parent').append('<option value="' + v.id + '" selected>' + v.nama + '</option>');
                    else $('#input-parent').append('<option value="' + v.id + '">' + v.nama + '</option>');
                })
            }
        })
    } else {
        elem += '<div class="form-group"><div class="form-material form-material-primary push-30">' +
            '<input class="form-control" type="' + type + '" id="input-' + name + '" name="elem-' + name + '" value="' + value + '">' +
            '<label for="elem-' + name + '">' + label + '</label>' +
            '</div></div>';
    }

    // console.log(elem);
    return elem;
};