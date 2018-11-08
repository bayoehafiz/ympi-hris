// Function to generate all division selectors based on KODE BAGIAN
var generateSelectors = function(selected) {
    $.ajax({
        type: "POST",
        url: BASE_URL + '/php/api/getKodeBagianById.php',
        dataType: 'json',
        data: {
            id: selected
        },
        success: function(res) {
            if (res.success) {
                var data = res.data[0];

                // set value for SELECTORS
                $('#input-division').val(data.division).trigger('change').attr('disabled', 'disabled');

                // fetch data for assigning DEPARTEMEN selector's value
                if (data.department != null) {
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + '/php/api/getSelectorData.php',
                        dataType: 'json',
                        data: {
                            table: 'department',
                            parent: data.division
                        },
                        success: function(res) {
                            if (res.success) repopulateSelector('input-department', res.data);
                            $('#input-department').val(data.department).attr('disabled', 'disabled');

                            // fetch data for assigning SECTION selector's value
                            if (data.section != null) {
                                $.ajax({
                                    type: "POST",
                                    url: BASE_URL + '/php/api/getSelectorData.php',
                                    dataType: 'json',
                                    data: {
                                        table: 'section',
                                        parent: data.department
                                    },
                                    success: function(res) {
                                        if (res.success) repopulateSelector('input-section', res.data);
                                        $('#input-section').val(data.section).attr('disabled', 'disabled');

                                        // fetch data for assigning SUB SECTION selector's value
                                        if (data.sub_section != null) {
                                            $.ajax({
                                                type: "POST",
                                                url: BASE_URL + '/php/api/getSelectorData.php',
                                                dataType: 'json',
                                                data: {
                                                    table: 'sub_section',
                                                    parent: data.section
                                                },
                                                success: function(res) {
                                                    if (res.success) repopulateSelector('input-sub_section', res.data);
                                                    $('#input-sub_section').val(data.sub_section).attr('disabled', 'disabled');

                                                    // fetch data for assigning GROUP selector's value
                                                    if (data.group != null) {
                                                        $.ajax({
                                                            type: "POST",
                                                            url: BASE_URL + '/php/api/getSelectorData.php',
                                                            dataType: 'json',
                                                            data: {
                                                                table: 'group',
                                                                parent: data.sub_section
                                                            },
                                                            success: function(res) {
                                                                if (res.success) repopulateSelector('input-group', res.data);
                                                                $('#input-group').val(data.group).attr('disabled', 'disabled');
                                                            }
                                                        });
                                                    } else {
                                                        $('#input-group').val('');
                                                    }
                                                    // END Group selector
                                                }
                                            });
                                        } else {
                                            $('#input-sub_section').val('');
                                        }
                                        // END Sub Section selector
                                    }
                                });
                            } else {
                                $('#input-section').val('');
                            }
                            // End section selector
                        }
                    });
                } else {
                    $('#input-department').val('');
                }
                // End department selector
            }
        }
    });
}
