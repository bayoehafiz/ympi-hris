var repopulateSelector = function(id, data) {
    var selector = $('#' + id);
    selector.empty();
    data.forEach(function(o) {
        selector.append('<option value="' + o.id + '">' + o.nama + '</option>');
    });
};
