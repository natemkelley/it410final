
function lightBox(swag) {
    console.log(swag)
    var title = swag.attr('title');
    var src = swag.children('img').attr("src");
    // Change the line above to modify the src according to your naming convention for larger images. 
    // You could even change it to source a data attrib ;)

    var alt = swag.children('img').attr("alt") || "";
    var $img = $('<img class="center-block img-responsive" alt="' + alt + '" src="' + src + '">');
    $('#lightbox .modal-title').html(title);
    $('#lightbox .modal-body').html('<p>Loading...</p>');
    $('#lightbox').modal({
        show: true
    });

    $('#lightbox .modal-body').html($img);
}
