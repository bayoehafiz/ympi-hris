// Init table filtering
window.initFilter = function(data) {
    App.blocks('#filter-block', 'state_loading');

    // Fn for initial selector population
    var initFilterSelectors = function() {
        // Populate FILTER selectors :: BY STATUS
        $('#input-filter-status').select2({
            minimumResultsForSearch: -1,
            data: [{
                    id: 'Tetap',
                    text: 'Tetap'
                },
                {
                    id: 'Kontrak 1',
                    text: 'Kontrak 1'
                },
                {
                    id: 'Kontrak 2',
                    text: 'Kontrak 2'
                },
                {
                    id: 'Percobaan',
                    text: 'Percobaan'
                }
            ]
        });

        // Populate FILTER selectors :: BY JENIS_KELAMIN
        $('#input-filter-jenis_kelamin').select2({
            minimumResultsForSearch: -1,
            data: [{
                    id: 'Laki-laki',
                    text: 'Laki-laki'
                },
                {
                    id: 'Perempuan',
                    text: 'Perempuan'
                }
            ]
        });

        // Populate other selectors
        populateFilterSelector('grade');
        populateFilterSelector('penugasan');
        populateFilterSelector('kode_bagian');
        populateFilterSelector('division');
        populateFilterSelector('department');
        populateFilterSelector('section');
        populateFilterSelector('sub_section');
        populateFilterSelector('group');
    };

    // Fn to populate ajax selctor
    var populateFilterSelector = function(target, parent) {
        if (parent != null) var $url = ENV.BASE_API + 'getSelectorData.php?table=' + target + '&parent=' + parent;
        else var $url = ENV.BASE_API + 'getSelectorData.php?table=' + target;
        var container = $('#input-filter-' + target);

        // enable it first
        if (enableFilterSelector(target)) {
            // then repopulate
            container.select2({
                ajax: {
                    url: $url,
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
                        }
                    }
                },
                escapeMarkup: function(markup) { return markup; },
                templateResult: formatKode,
                templateSelection: formatKodeSelection
            });
        }

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

    // FN to reset selector
    var resetFilterSelector = function(id) {
        var selector = $('#input-filter-' + id);
        // if not empty, then reset it
        if (selector.val() != null && selector.val() != '') {
            selector.val(null).trigger('change');
        }
        return true;
    }

    // Fn to disable selector
    var disableFilterSelector = function(id) {
        var selector = $('#input-filter-' + id);
        // if not empty, then reset it first
        if (selector.val() != null && selector.val() != '') {
            selector.val(null).trigger('change');
        }
        // then disable it
        selector.attr('disabled', true);
        return true;
    }

    // Fn to enable selector
    var enableFilterSelector = function(id) {
        var selector = $('#input-filter-' + id);
        // if not empty, then reset it first
        if (selector.val() != null && selector.val() != '') {
            selector.val(null).trigger('change');
        }
        // then enable it
        selector.removeAttr('disabled');
        return true;
    }

    // Fn to handle selector changes
    var handleFilterChange = function(id, value) {
        switch (id) {
            case 'division':
                // 1. reset kode_bagian
                resetFilterSelector('kode_bagian');
                // 2. populate department selector
                populateFilterSelector('department', value);
                // 3. disable section, sub_section, and group selectors
                disableFilterSelector('section');
                disableFilterSelector('sub_section');
                disableFilterSelector('group');
                break;
            case 'department':
                // 1. reset kode_bagian
                resetFilterSelector('kode_bagian');
                // 2. populate section selector
                populateFilterSelector('section', value);
                // 3. disable sub_section, and group selectors
                disableFilterSelector('sub_section');
                disableFilterSelector('group');
                break;
            case 'section':
                // 1. reset kode_bagian
                resetFilterSelector('kode_bagian');
                // 2. populate sub_section selector
                populateFilterSelector('sub_section', value);
                // 3. disable group selector
                disableFilterSelector('group');
                break;
            case 'sub_section':
                // 1. reset kode_bagian
                resetFilterSelector('kode_bagian');
                // 2. populate group selector
                populateFilterSelector('group', value);
                break;
            case 'group':
                // 1. reset kode_bagian
                resetFilterSelector('kode_bagian');
                break;
            case 'kode_bagian':
                // 1. Reset division selectors
                resetFilterSelector('division');
                // 2. Disable other "Bagian" selectors
                disableFilterSelector('department');
                disableFilterSelector('section');
                disableFilterSelector('sub_section');
                disableFilterSelector('group');
                break;
            default:
                break;
        }

        return true;
    }

    // Fn to submit filters
    var submitFilter = function() {
        // Get all values of filter selectors value
        var filter_data = [];
        $('[id^=input-filter-]').filter(function() {
            var elem = this;
            if (elem.value != '') {
                filter_data.push({
                    key: elem.id.replace('input-filter-', ''),
                    value: elem.value
                })
            }
        })
        // send filters data to datatable
        initTableEmployee(filter_data);
    };

    // Selector change handler
    $(document).on('change', '[id^=input-filter-]', function() {
        App.blocks('#filter-block', 'state_loading');
        var input = this.id;
        var $id = input.replace('input-filter-', '');
        var val = this.value;

        // Handle selector changes
        if (val) {
            if (handleFilterChange($id, val)) {
                submitFilter();
            }
        }
    });

    // Button RESET / CLEAR action
    $(document).on('click', '#btn-reset-filter', function() {
        App.blocks('#filter-block', 'state_loading');
        // reset components which have value in them

        $('[id^=input-filter-]').filter(function() {
            var id = this.id.replace('input-filter-', '');
            var selector = $('#input-filter-' + id);
            var is_disabled = selector.attr('disabled') ? true : false;
            if (is_disabled) {
                enableFilterSelector(id);
            } else {
                if (this.value != '') selector.val(null).trigger('change');
            }
        });

        // reset datatable
        initTableEmployee(null);
    });

    // Populate SELECTORS
    initFilterSelectors();

    // Call the sticky plugin
    $('#sticky-block').sticky({ topSpacing: 60, bottomSpacing: 100 });
};
