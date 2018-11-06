// Init image uploader
var initUploader = function() {
    var $avatar = $('#avatar');
    var $image = $('#image');
    var $input = $('#photo-file');
    var $finalInput = $('#input-photo_url')
    var $profileModal = $('#modal-profile');
    var $uploadModal = $('#modal-uploader');

    $(document).on('click', '#preview-photo_url', function(e) {
        e.preventDefault();
        $('#profile-photo_url').trigger('click');
    });

    $(document).on('change', '#profile-photo_url', function(e) {
        var files = e.target.files;
        var reader;
        var file;
        var url;

        var done = function(url) {
            // console.log(url);
            $input.empty();
            $image.attr('src', url);
            $profileModal.modal('hide');
            $uploadModal.modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });
        };

        if (files && files.length > 0) {
            file = files[0];
            if (URL) {
                done(URL.createObjectURL(file));
            } else if (FileReader) {
                reader = new FileReader();
                reader.onload = function(e) {
                    done(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    })

    // When photo uploader modal is opened/closed
    $uploadModal.on('shown.bs.modal', function() {
        $image.cropper({
            aspectRatio: 1,
            viewMode: 1
        });

        // Get the Cropper.js instance after initialized
        cropper = $image.data('cropper');
        
    }).on('hidden.bs.modal', function() {
        $image.cropper('destroy');
        cropper = null;

        $profileModal.modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });
    });

    // Rotation/Zoom buttons action
    $(document).on('click', '#rotate-left', function() {
        cropper.rotate(-90);
    });
    $(document).on('click', '#rotate-right', function() {
        cropper.rotate(90);
    });
    $(document).on('click', '#zoom-in', function() {
        cropper.zoom(0.1);
    });
    $(document).on('click', '#zoom-out', function() {
        cropper.zoom(-0.1);
    });

    // When SAVE button clicked
    $(document).on('click', '#crop', function() {
        var initialAvatarURL;
        var canvas;

        if (cropper) {
            canvas = cropper.getCroppedCanvas({
                width: 360,
                height: 360,
            });

            initialAvatarURL = $avatar.attr('src');
            $avatar.attr('src', canvas.toDataURL());
            $finalInput.val(canvas.toDataURL());
            $uploadModal.modal('hide');
            $profileModal.modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });
        }
    })

}
