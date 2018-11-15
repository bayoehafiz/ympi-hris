window.initStat = function(type) {
    // clear the container first
    var container = $('#stat-division');
    container.empty();

    // Get division datas
    $.ajax({
        type: "POST",
        url: ENV.BASE_API + 'getDivisionStat.php',
        dataType: 'json',
        data: {
            table: type
        },
        success: function(res) {
            var html = '';
            if (res.success) {
                var data = res.data;
                if (data.length > 0) {
                    html += '';

                    // Grouping the kode_bagian by `nama`
                    var temp = data;
                    data = [];
                    temp.reduce(function(res, value) {
                        if (!res[value.nama]) {
                            res[value.nama] = {
                                id: value.id,
                                total: 0,
                                nama: value.nama
                            };
                            data.push(res[value.nama])
                        }
                        res[value.nama].total += parseInt(value.total);
                        return res;
                    }, {});

                    data.forEach(function(d) {
                        html += '<div>' +
                            '<a href="' + ENV.BASE_URL + '/employee/?filter=' + type + '&value=' + d.id + '">' +
                            '<span class="h1 font-w700 text-primary animated flipInX" data-toggle="countTo" data-to="' + d.total + '"></span>' +
                            '<div class="font-w700 text-gray-darker animated fadeIn">' + d.nama + '</div>' +
                            '</div>' +
                            '</div>';
                    });
                    container.append(html);
                }
            } else {
                swal('Error', res.message, 'error');
            }

            // reinitiate counter plugin
            App.initHelpers(['appear-countTo']);

            // re-initialize slider plugin
            if (type == 'kode_bagian') var $dataToShow = 7;
            else var $dataToShow = 6;
            if (container.hasClass('slick-initialized')) {
                container.slick('removeSlide', null, null, true); // remove all previous slides
                container.slick('unslick');
            }
            container.slick({
                autoplay: true,
                dots: false,
                slidesToShow: $dataToShow,
                prevArrow: '<span class="prev"><i class="fa fa-angle-left fa-3x text-primary-lighter"></i></span>',
                nextArrow: '<span class="next"><i class="fa fa-angle-right fa-3x text-primary-lighter"></i></span>',
            });

            // Inject data-type to btn-add
            $('#btn-add').attr('data-type', type);
        }
    });
};
