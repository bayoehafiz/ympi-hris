var BasePagesEmployee = function() {
    var initEmployeePage = function() {
        $('#btn-logout').click(function() {
            sessionStorage.clear();
            location.reload();
        })
    };

    var sweetAlert = function() {
        // Init an error alert on button click
        $('.js-swal-error').on('click', function() {
            swal('Oops...', 'Sedang dalam pengembangan!', 'warning');
        });
    };

    var initTable = function() {
        var table = $('.js-dataTable-full-pagination').DataTable({
            pagingType: "full_numbers",
            columnDefs: [{ orderable: true, targets: [4] }],
            pageLength: 10,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100]
            ],
            ajax: {
                url: '/php/api/getEmployee.php',
                dataSrc: function(json) {
                    var data = json.data;
                    var resultData = [];
                    data.forEach(function(x) {
                        // Manipulate result data
                        x.namaEdt = '<a data-id="' + x.nik + '" href="#">' + x.nama + '</a>'
                        if (x.status == "Kontrak 1") x.statusEdt = '<span class="label label-danger">' + x.status + '</span>';
                        else if (x.status == "Kontrak 2") x.statusEdt = '<span class="label label-warning">' + x.status + '</span>';
                        else x.statusEdt = '<span class="label label-success">' + x.status + '</span>';

                        resultData.push(x);
                    })

                    return resultData;
                }
            },
            deferRender: true,
            columns: [
                { data: "nik" },
                { className: "font-w600", data: "namaEdt" },
                { className: "hidden-xs", data: "division" },
                { className: "hidden-xs", data: "department" },
                { className: "hidden-xs", data: "statusEdt" }
            ]
        });

        $('.js-dataTable-full-pagination tbody').on('click', 'a', function() {
            var data = table.row($(this).parents('tr')).data();
            // Set value in modal
            $('#modal-nama').html(data.nama);
            $('#modal-jabatan').html(data.jabatan);
            $('#modal-divisi').html(data.division);
            $('#profile-nik').html(data.nik);
            $('#profile-department').html(data.department);
            $('#profile-section').html(data.section);
            $('#profile-sub-section').html(data.subsection);
            $('#profile-group').html(data.group);
            $('#profile-tgl-masuk').html(moment(data.tgl_masuk).format('D MMMM YYYY'));
            $('#profile-masa-kerja').html(parseInt(data.masa_kerja_thn) +" Thn "+parseInt(data.masa_kerja_bln)+" Bln");
            $('#profile-status').html(data.statusEdt);
            $('#profile-no-ktp').html(data.ktp);
            $('#profile-tempat-lahir').html(data.tempat_lahir);
            $('#profile-tgl-lahir').html(data.tgl_lahir + " ("+parseInt(data.usia) + " Thn)");
            $('#profile-agama').html(data.agama);
            $('#profile-alamat-lengkap').html(data.alamat_lengkap);
            $('#profile-alamat-domisili').html(data.alamat_domisili);
            $('#profile-telepon').html(data.telepon);
            // button params
            $('#btn-edit-profile').attr('data-id') = data.nik;
            jQuery('#modal-profile').modal('show');
        });

        $('#btn-edit-profile').click(function(e){
            e.preventDefault;
            console.log($(this).attr('data-id'));
        })
    }

    return {
        init: function() {
            sweetAlert();
            initTable();
            initEmployeePage();
        }
    };
}();

// Initialize when page loads
jQuery(function() { BasePagesEmployee.init(); });
