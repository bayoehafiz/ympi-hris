// Function to render elements inside the modal :: ADD
var renderAddElement = function(type, name, label) {
    var elem = '';

    if (type == 'select') {
        // reset the selct elemnt first
        $('#input-parent').empty();

        $.ajax({
            type: "POST",
            url: ENV.BASE_API + 'getGradeData.php',
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
