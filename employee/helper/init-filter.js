// Init table filtering
window.initFilter = function(data) {
    App.blocks('#filter-block', 'state_loading');

    // Fn for initial selector population
    var initSelectors = function() {
        // Populate FILTER selectors :: BY STATUS
        $('#input-filter-status').select2({
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
        populateSelector('grade');
        populateSelector('penugasan');
        populateSelector('kode_bagian');
        populateSelector('division');
        populateSelector('department');
        populateSelector('section');
        populateSelector('sub_section');
        populateSelector('group');
    };

    // Fn to populate ajax selctor
    var populateSelector = function(target, parent) {
        if (parent != null) var $url = ENV.BASE_API + 'getSelectorData.php?table=' + target + '&parent=' + parent;
        else var $url = ENV.BASE_API + 'getSelectorData.php?table=' + target;
        console.log($url);
        var container = $('#input-filter-' + target);

        // enable it first, then repopulate
        if (enableSelector(target)) {
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
                        };
                    }
                }
            });
        }

        return true;
    };

    // FN to reset selector
    var resetSelector = function(id) {
        var selector = $('#input-filter-' + id);
        // if not empty, then reset it
        if (selector.val() != null && selector.val() != '') {
            selector.val(null).trigger('change');
        }
        return true;
    }

    // Fn to disable selector
    var disableSelector = function(id) {
        var selector = $('#input-filter-' + id);
        // if not empty, then reset it first
        if (selector.val() != null && selector.val() != '') {
            selector.val(null).trigger('change');
        }
        // then disable it
        selector.attr('disabled', 'disabled');
        return true;
    }

    // Fn to enable selector
    var enableSelector = function(id) {
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
    var handleChange = function(id, value) {
        switch (id) {
            case 'division':
                // 1. reset kode_bagian
                resetSelector('kode_bagian');
                // 2. populate department selector
                populateSelector('department', value);
                // 3. disable section, sub_section, and group selectors
                disableSelector('section');
                disableSelector('sub_section');
                disableSelector('group');
                break;
            case 'department':
                // 1. reset kode_bagian
                resetSelector('kode_bagian');
                // 2. populate section selector
                populateSelector('section', value);
                // 3. disable sub_section, and group selectors
                disableSelector('sub_section');
                disableSelector('group');
                break;
            case 'section':
                // 1. reset kode_bagian
                resetSelector('kode_bagian');
                // 2. populate sub_section selector
                populateSelector('sub_section', value);
                // 3. disable group selector
                disableSelector('group');
                break;
            case 'sub_section':
                // 1. reset kode_bagian
                resetSelector('kode_bagian');
                // 2. populate group selector
                populateSelector('group', value);
                break;
            case 'group':
                // 1. reset kode_bagian
                resetSelector('kode_bagian');
                break;
            case 'kode_bagian':
                // 1. Reset division selectors
                resetSelector('division');
                // 2. Disable other "Bagian" selectors
                disableSelector('department');
                disableSelector('section');
                disableSelector('sub_section');
                disableSelector('group');
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
            if (handleChange($id, val)) {
                submitFilter();
            }
        }
    });

    // Button RESET / CLEAR action
    $(document).on('click', '#btn-reset-filter', function() {
        App.blocks('#filter-block', 'state_loading');
        // reset components which have value in them
        $('[id^=input-filter-]').filter(function() {
            var $id = this.id.replace('input-filter-', '');
            if (this.value != '') $('#input-filter-' + $id).val(null).trigger('change');
        });

        // reset datatable
        initTableEmployee(null);
    });

    // Populate SELECTORS
    initSelectors();

    // Call the sticky plugin
    $('#sticky-block').sticky({ topSpacing: 60, bottomSpacing: 100 });
};
