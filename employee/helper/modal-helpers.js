// ::
var viewData = function(id) {
    App.blocks('#modal-block', 'state_loading');
    // set modal scope
    window.modal_scope = 'view';

    $('#opened-profile').val(id);
    $('#photo-container-view').removeClass('hide-me');
    $('#photo-container-edit').addClass('hide-me');

    if ($('#origin').val() == 'modal') {
        $('#modal-profile').trigger('shown.bs.modal');
    } else {
        $('#modal-profile').modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });
    }
};

var editData = function(id) {
    App.blocks('#modal-block', 'state_loading');
    // set modal scope
    window.modal_scope = 'edit';

    $('#opened-profile').val(id);
    $('#photo-container-edit').removeClass('hide-me');
    $('#photo-container-view').addClass('hide-me');

    if ($('#origin').val() == 'modal') {
        $('#modal-profile').trigger('shown.bs.modal');
    } else {
        $('#modal-profile').modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });
    }
};

var removeData = function(id) {
    swal({
            title: "Hapus Data Karyawan?",
            text: "Data yang dihapus tidak akan dapat dikembalikan",
            type: "question",
            showCancelButton: true,
            confirmButtonClass: "btn btn-danger btn-sm text-uppercase push-5-r",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            showLoaderOnConfirm: true,
            preConfirm: function() {
                return new Promise(function(resolve) {
                    $.ajax({
                            type: "POST",
                            url: ENV.BASE_API + "deleteEmployee.php",
                            dataType: 'json',
                            data: {
                                id: id
                            }
                        }).done(function(response) {
                            if (response.status == 'err') {
                                swal('Error', response.message, 'error');
                            } else {
                                swal('Success', "Data karyawan berhasil dihapus", 'success');

                                // reload the stat
                                initStat();

                                // reload the table
                                var $table = $('#hidden-active-type').val();
                                var table = $('#table-' + $table).DataTable();
                                table.ajax.reload();
                            }
                        })
                        .fail(function() {
                            swal('Error', 'Terjadi kesalahan. Coba lagi nanti!', 'error');
                        });
                });
            },
            allowOutsideClick: false
        })
        .catch(swal.noop);
};

// Fn to destroy all Select2 instances on modal
var destroyAllModalSelectors = function() {
    $('select[id^=input-]').filter(function() {
        var is_filter = this.id.substr(6, 6) == 'filter' ? true : false;
        if (!is_filter) {
            // destroy Select2 instance if existed
            if ($(this).hasClass("select2-hidden-accessible")) {
                $(this).select2('destroy');
            }
        }
    })
    return true;
}

// Event when MODAL SHOWN UP
$('#modal-profile').on('shown.bs.modal', function() {
    // As long it's not from uploader modal
    if (!window.modal_upload) {
        var scope = window.modal_scope;
        // ADD
        if (scope == 'add') {
            if (renderProfileAdd()) {
                // destroy all Select2 before populating
                if (destroyAllModalSelectors()) {
                    // populate "Bagian" selectors
                    initSelector('grade');
                    initSelector('penugasan');
                    initSelector('kode_bagian');
                    initSelector('division');
                    if (initSelector('department')) hideSelector('department');
                    if (initSelector('section')) hideSelector('section');
                    if (initSelector('sub_section')) hideSelector('sub_section');
                    if (initSelector('group')) hideSelector('group');

                    // Populate other selectors
                    $('#input-status').select2({
                        minimumResultsForSearch: -1,
                        data: [
                            { id: 'Tetap', text: 'Tetap' },
                            { id: 'Kontrak 1', text: 'Kontrak 1' },
                            { id: 'Kontrak 2', text: 'Kontrak 2' },
                            { id: 'Percobaan', text: 'Percobaan' }
                        ]
                    });
                    $('#input-agama').select2({
                        minimumResultsForSearch: -1,
                        data: [
                            { id: 'Islam', text: 'Islam' },
                            { id: 'Kristen', text: 'Kristen' },
                            { id: 'Katholik', text: 'Katholik' },
                            { id: 'Hindu', text: 'Hindu' },
                            { id: 'Buddha', text: 'Buddha' },
                            { id: 'Konghucu', text: 'Konghucu' }
                        ]
                    });
                    $('#input-jenis_kelamin').select2({
                        minimumResultsForSearch: -1,
                        data: [
                            { id: 'Laki-laki', text: 'Laki-laki' },
                            { id: 'Perempuan', text: 'Perempuan' }
                        ]
                    });
                    $('#input-status_keluarga').select2({
                        minimumResultsForSearch: -1,
                        data: [
                            { id: 'K0', text: 'K0' },
                            { id: 'K1', text: 'K1' },
                            { id: 'K2', text: 'K2' },
                            { id: 'K3', text: 'K3' },
                            { id: 'Pk1', text: 'Pk1' },
                            { id: 'Pk2', text: 'Pk2' },
                            { id: 'Pk3', text: 'Pk3' },
                            { id: 'Tk', text: 'Tk' },
                        ]
                    });
                    $('#input-pendidikan').select2({
                        minimumResultsForSearch: -1,
                        data: [
                            { id: 'S0', text: 'S0 (SD)' },
                            { id: 'S1', text: 'S1 (SMP)' },
                            { id: 'S2', text: 'S2 (SMA/SMK)' },
                            { id: 'S3', text: 'S3 (Diploma 1)' },
                            { id: 'S4', text: 'S4 (Diploma 3)' },
                            { id: 'S5', text: 'S5 (Sarjana)' }
                        ]
                    });

                    initValidation();
                    App.blocks('#modal-block', 'state_normal');
                }
            }

        } else if (scope == 'edit') { // EDIT
            var id = $('#opened-profile').val();
            $.ajax({
                type: "POST",
                url: ENV.BASE_API + "getEmployeeById.php",
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(res) {
                var data = res.data;
                if (renderProfileEdit(data)) {
                    // destroy all Select2 before populating
                    if (destroyAllModalSelectors()) {
                        // Init selectors
                        initSelector('grade');
                        initSelector('penugasan');
                        initSelector('kode_bagian');
                        initSelector('division');
                        initSelector('department');
                        initSelector('section');
                        initSelector('sub_section');
                        initSelector('group');

                        // assign values
                        setSelector('grade', parseInt(data.grade), true);
                        if (data.penugasan != null) setSelector('penugasan', data.penugasan, true);
                        if (data.kode_bagian != null) setSelector('kode_bagian', data.kode_bagian, true);
                        setSelector('division', data.division, true);
                        if (data.department != null) {
                            unhideSelector('department');
                            setSelector('department', data.department, true);
                        }
                        if (data.section != null) {
                            unhideSelector('section');
                            setSelector('section', data.section, true);
                        }
                        if (data.sub_section != null) {
                            unhideSelector('sub_section');
                            setSelector('sub_section', data.sub_section, true);
                        }
                        if (data.group != null) {
                            unhideSelector('group');
                            setSelector('group', data.group, true);
                        }


                        // Populate other selectors
                        $('#input-status').select2({
                            minimumResultsForSearch: -1,
                            data: [
                                { id: 'Tetap', text: 'Tetap' },
                                { id: 'Kontrak 1', text: 'Kontrak 1' },
                                { id: 'Kontrak 2', text: 'Kontrak 2' },
                                { id: 'Percobaan', text: 'Percobaan' }
                            ]
                        }).val(data.status).trigger('change');

                        $('#input-agama').select2({
                            minimumResultsForSearch: -1,
                            data: [
                                { id: 'Islam', text: 'Islam' },
                                { id: 'Kristen', text: 'Kristen' },
                                { id: 'Katholik', text: 'Katholik' },
                                { id: 'Hindu', text: 'Hindu' },
                                { id: 'Buddha', text: 'Buddha' },
                                { id: 'Konghucu', text: 'Konghucu' }
                            ]
                        }).val(data.agama).trigger('change');

                        $('#input-jenis_kelamin').select2({
                            minimumResultsForSearch: -1,
                            data: [
                                { id: 'Laki-laki', text: 'Laki-laki' },
                                { id: 'Perempuan', text: 'Perempuan' }
                            ]
                        }).val(data.jenis_kelamin).trigger('change');

                        $('#input-status_keluarga').select2({
                            minimumResultsForSearch: -1,
                            data: [
                                { id: 'K0', text: 'K0' },
                                { id: 'K1', text: 'K1' },
                                { id: 'K2', text: 'K2' },
                                { id: 'K3', text: 'K3' },
                                { id: 'Pk1', text: 'Pk1' },
                                { id: 'Pk2', text: 'Pk2' },
                                { id: 'Pk3', text: 'Pk3' },
                                { id: 'Tk', text: 'Tk' },
                            ]
                        }).val(data.status_keluarga).trigger('change');

                        $('#input-pendidikan').select2({
                            minimumResultsForSearch: -1,
                            data: [
                                { id: 'S0', text: 'S0 (SD)' },
                                { id: 'S1', text: 'S1 (SMP)' },
                                { id: 'S2', text: 'S2 (SMA/SMK)' },
                                { id: 'S3', text: 'S3 (Diploma 1)' },
                                { id: 'S4', text: 'S4 (Diploma 3)' },
                                { id: 'S5', text: 'S5 (Sarjana)' }
                            ]
                        }).val(data.pendidikan).trigger('change');

                        initValidation();
                        App.blocks('#modal-block', 'state_normal');
                    }
                }
            });

        } else { // VIEW
            var id = $('#opened-profile').val();
            $.ajax({
                type: "POST",
                url: ENV.BASE_API + "getEmployeeById.php",
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(res) {
                var data = res.data;
                if (renderProfileView(data)) {
                    App.blocks('#modal-block', 'state_normal');
                }
            });
        }
    } else {
        // turn off the uploder failsafe
        window.modal_upload = false;
    }
});


// =========================
// MODAL ACTIONS !!!       
// 
// BUTTON HANDLERS :::
// 
// when GEAR button clicked
$(document).on('click', '#btn-generate-profile', function() {
    generateRandomProfile();
});

// When modal EDIT button is clicked
$(document).on('click', '#btn-edit-profile', function() {
    var id = $('#opened-profile').val();
    $('#origin').val('modal');
    editData(id);
});

// when modal CANCEL button clicked
$(document).on('click', '#btn-cancel-profile', function() {
    var origin = $('#origin').val();
    if (origin == 'direct') {
        $('#modal-profile').modal('hide');
    } else {
        var id = $('#opened-profile').val();
        viewData(id);
    }
});

// When modal TERMINATE button is clicked
$(document).on('click', '#btn-terminate-profile', function() {
    swal({
            title: "Peringatan!",
            html: "Karyawan akan dipindahkan ke data <strong>Karyawan Non Aktif</strong>." +
                "<br>Klik <strong>Lanjut</strong> untuk melanjutkan.",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-danger btn-sm text-uppercase push-5-r",
            confirmButtonText: "Lanjut",
            cancelButtonText: "Batal",
            allowOutsideClick: false
        })
        .then(function(res) {
            if (res) {
                swal.close();
                $('#modal-profile').modal('hide');

                // Render termination elements
                $('#modal-termination #profile-termination_date').html('');
                $('#modal-termination #profile-termination_date').html(renderAddElement('datepicker', 'termination_date', 'Tanggal Terminasi', null, moment().format('DD-MM-YYYY')));
                $('#modal-termination #profile-termination_reason').html('');
                $('#modal-termination #profile-termination_reason').html(renderAddElement('textarea', 'termination_reason', 'Alasan Terminasi'));

                initTerminationValidation();

                App.initHelpers('datepicker');

                $('#modal-termination').modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
            }
        })
        .catch(swal.noop);
});
// END BUTTON HANDLERS :::
// 
// END MODAL ACTIONS !!!
// =========================
