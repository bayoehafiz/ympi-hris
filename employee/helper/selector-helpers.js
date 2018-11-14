// Fn to populate modal's ajax selector (Select2)
var initSelector = function(id, parent) {
    var container = $('#input-' + id);
    if (parent != undefined) var $parent = '&parent=' + parent;
    else var $parent = '';
    container.select2({
        ajax: {
            url: ENV.BASE_API + 'getSelectorData.php?table=' + id + $parent,
            dataType: 'json',
            data: function(params) {
                var query = {
                    q: params.term
                }
                return query;
            },
            processResults: function(data) {
                return {
                    results: data
                };
            }
        },
        escapeMarkup: function(markup) { return markup; },
        templateResult: formatKode,
        templateSelection: formatKodeSelection
    });

    function formatKode(data) {
        if (data.kode === undefined) {
            return data.text;
        }
        var markup = data.kode + " (" + data.nama + ")";
        return markup;
    }

    function formatKodeSelection(data) {
        return data.kode || data.text;
    }

    return true;
};

// FN to assign value to selector based on parent
var setSelector = function(id, value) {
    var selector = $('#input-' + id);
    if (value != null) { // <- if 'value' is NOT NULL
        $.getJSON(ENV.BASE_API + 'getSelectorData.php?table=' + id)
            .success(function(val) {
                val.forEach(function(v) {
                    if (v.id == value) { // <- find the selected value
                        var option = new Option(v.text || v.kode, v.id, true, true);
                    } else {
                        var option = new Option(v.text || v.kode, v.id, false, false);
                    }
                    selector.append(option).trigger('change.select2');
                });
            });
    } else {
        selector.val(null).trigger('change.select2');
    }
}

// FN to empty modal selector
var emptySelector = function(id) {
    var selector = $('#input-' + id);
    selector.val(null).trigger('change');
    return true;
}

// Fn to hide selector container
var hideSelector = function(id) {
    var container = $('#profile-' + id.replace('_', '-'));
    if (!container.hasClass('hide-me')) container.addClass('hide-me');
    return true;
}

// Fn to unhide selector container
var unhideSelector = function(id) {
    var container = $('#profile-' + id.replace('_', '-'));
    if (container.hasClass('hide-me')) container.removeClass('hide-me');
    return true;
}

// Fn to disable selector
var disableSelector = function(id) {
    var selector = $('#input-' + id);
    var attr = selector.attr('disabled');
    if (typeof attr == typeof undefined || attr == false) {
        selector.attr('disabled', true);
    }
    return true;
}

// Fn to disable selector
var enableSelector = function(id) {
    var selector = $('#input-' + id);
    var attr = selector.attr('disabled');
    if (attr && attr !== false) {
        selector.removeAttr('disabled');
    }
    return true;
}

// 
// SELECTOR HANDLERS :::
// 
// when selectors KODE BAGIAN are changed
$(document).on('change', '#input-kode_bagian', function() {
    var val = this.value;
    $.getJSON(ENV.BASE_API + 'getKodeBagianById.php?id=' + val)
        .success(function(data) {
            var kb = data;
            setSelector('division', kb.division)
            if (kb.department == null) {
                hideSelector('department');
            } else {
                unhideSelector('department');
                setSelector('department', kb.department);
                disableSelector('department');
            }
            if (kb.section == null) {
                hideSelector('section');
            } else {
                unhideSelector('section');
                setSelector('section', kb.section);
                disableSelector('section');
            }
            if (kb.sub_section == null) {
                hideSelector('sub_section');
            } else {
                unhideSelector('sub_section');
                setSelector('sub_section', kb.sub_section);
                disableSelector('sub_section');
            }
            if (kb.group == null) {
                hideSelector('group');
            } else {
                unhideSelector('group');
                setSelector('group', kb.group);
                disableSelector('group');
            }
        });
});

$(document).on('change', '#input-division', function() {
    var val = this.value;
    emptySelector('kode_bagian');
    if (unhideSelector('department'))
        if (initSelector('department', val)) {
            setSelector('department', null);
            enableSelector('department');
        }
    if (initSelector('section'))
        hideSelector('section');
    if (initSelector('sub_section'))
        hideSelector('sub_section');
    if (initSelector('group'))
        hideSelector('group');
});

$(document).on('change', '#input-department', function() {
    var val = this.value;
    emptySelector('kode_bagian');
    if (unhideSelector('section'))
        if (initSelector('section', val)) {
            setSelector('section', null);
            enableSelector('section');
        }
    if (emptySelector('sub_section')) hideSelector('sub_section');
    if (emptySelector('group')) hideSelector('group');
});

$(document).on('change', '#input-section', function() {
    var val = this.value;
    emptySelector('kode_bagian');
    if (unhideSelector('sub_section'))
        if (initSelector('sub_section', val)) {
            setSelector('sub_section', null);
            enableSelector('sub_section');
        }
    if (emptySelector('group')) hideSelector('group');
});

$(document).on('change', '#input-sub_section', function() {
    var val = this.value;
    emptySelector('kode_bagian');
    if (unhideSelector('group'))
        if (initSelector('group', val)) {
            setSelector('group', null);
            enableSelector('group');
        }
});

// when selector STATUS KARYAWAN changed
$(document).on('change', '#input-status', function() {
    var val = this.value;
    var containerMasaKontrak = $('#profile-masa-kontrak');
    var containerTglKeluar = $('#profile-tgl-keluar');

    if (val != 'Tetap') {
        containerMasaKontrak.empty(); // <- [important!] to destroy select2 instance
        containerTglKeluar.empty();

        // Set default value for MASA_KONTRAK
        if (val == 'Percobaan') {
            var label = 'Masa Percobaan';
            var label_2 = 'Tgl Selesai Percobaan';
            var value = 3;
            var opts = [{
                text: "1 Bulan",
                id: 1
            }, {
                text: "3 Bulan",
                id: 3
            }, {
                text: "6 Bulan",
                id: 6
            }];
        } else {
            var label = 'Masa Kontrak';
            var label_2 = 'Tgl Selesai Kontrak';
            if (val == 'Kontrak 1') {
                var value = 12;
                var opts = [{
                    text: "6 Bulan",
                    id: 6
                }, {
                    text: "12 Bulan",
                    id: 12
                }, {
                    text: "18 Bulan",
                    id: 18
                }, {
                    text: "2 Tahun",
                    id: 24
                }];
            } else {
                var value = 6;
                var opts = [{
                    text: "6 Bulan",
                    id: 6
                }, {
                    text: "9 Bulan",
                    id: 9
                }, {
                    text: "10 Bulan",
                    id: 10
                }, {
                    text: "11 Bulan",
                    id: 11
                }];
            }
        }

        // Create element and inject Select2
        containerMasaKontrak.html(renderAddElement('select', 'masa_kontrak', label)).promise().then(function() {
            // destroy first before reinitialize
            if ($('#input-masa_kontrak').hasClass("select2-hidden-accessible")) {
                $('#input-masa_kontrak').select2('destroy');
            }
            // reinitialize
            $('#input-masa_kontrak')
                .select2({
                    minimumResultsForSearch: -1,
                    data: opts
                })
                .val(value)
                .trigger('change');
            // Then set default value
            // $('#input-masa_kontrak').select2()
        });

        // set tgl_keluar by default value
        if ($('#input-tgl_masuk').val() != '')
            var t_masuk = $('#input-tgl_masuk').val();
        else
            var t_masuk = moment().format('DD-MM-YYYY');

        html = renderAddElement('datepicker', 'tgl_keluar', label_2, null, moment(t_masuk, 'DD-MM-YYYY').add(value, 'M').format('DD-MM-YYYY'));
        containerTglKeluar.append(html);

    } else {
        // destroy Select2 instance if existed
        if ($('#input-masa_kontrak').hasClass("select2-hidden-accessible")) {
            $('#input-masa_kontrak').select2('destroy');
        }
        containerMasaKontrak.empty();
        containerTglKeluar.empty();
    }

    // reinitiate Datepicker plugin
    App.initHelpers(['datepicker']);
});

// when MASA KERJA selector changed
$(document).on('change', '#input-masa_kontrak', function() {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    if ($('#input-tgl_masuk').val() != '') var t_masuk = $('#input-tgl_masuk').val();
    else var t_masuk = moment().format('DD-MM-YYYY');

    $('#input-tgl_keluar').val(moment(t_masuk, 'DD-MM-YYYY').add(valueSelected, 'M').format('DD-MM-YYYY'));
});

// when MASA KERJA selector changed
$(document).on('change', '#input-tgl_masuk', function() {
    $('#input-masa_kontrak').trigger('change');
});
// END SELECTOR HANDLERS :::
