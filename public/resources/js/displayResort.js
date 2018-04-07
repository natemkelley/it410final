var GLOBAL_RESORT_NUM = 1;

$(document).ready(function () {
    $(".the-tabs li").click(function () {
        var swag = $(this).children("a").attr("id");
        toggleTab(swag);
    });

});

function toggleTab(id) {
    $(".container").hide();
    $('.the-tabs li').removeClass("active");
    $("#" + id).parent('li').addClass("active");
    $("." + id).fadeIn();
}

function getResort(resortNum) {
    GLOBAL_RESORT_NUM = resortNum.split('/').join('-');

    toggleTab('goResort');
    $("#resortInfo").hide();
    $(".loader").show();

    var myquery = "/" + resortNum;

    $.ajax({
        url: myquery,
        dataType: "json",
        success: function (datJSON) {
            $(".loader").hide();
            $("#resortInfo").fadeIn();
            getResortComments(resortNum);
            displayResort(datJSON);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.error("Status: " + textStatus);
            console.error("Error: " + errorThrown);
        }
    });

}

function displayResort(datJSON) {
    $('#imageGallery').html("");
    $('#resortName').text(datJSON.name);
    randomizePhoto();

    var table = '<table style="width: 100%; max-width:1000px;margin-bottom:35px">';
    //console.log(datJSON)

    $.each(datJSON, function (i, item) {
        switch (i) {
            case 'id':
            case 'created':
            case 'latitude':
            case 'longitude':
            case 'open_ski_maps':
            case 'user':
            case 'ski_maps':
                return;
            case 'official_website':
                table += "<tr><th>" + i + "</th>";

                table += "<td><a>" + item + "</a></td></tr>";
            case 'regions':
                table += "<tr><th>" + i + "</th><td>";
                $.each(datJSON.regions, function (i, item) {
                    //console.log(item);
                    table += item.name + "<br>";
                })
                table += "</td></tr>";
                return;
            case 'tags':
                table += "<tr><th>" + i + "</th><td>";
                $.each(datJSON.tags, function (i, item) {
                    //console.log(item);
                    table += item.name + "<br>";
                })
                table += "</td></tr>";
                return;
        }

        var jsonIndex = i.split('_').join(' ');
        var item = item || "Unknown"

        table += "<tr><th>" + jsonIndex + "</th><td>" + item + "</td></tr>"
    });

    table += "</table>";
    $("#displayResort").html(table);

    /*ski maps*/
    var skiMaps = datJSON.ski_maps;
    var counter = 1;
    $(skiMaps).each(function (index, elem) {
        var title = datJSON.name + " " + counter;
        var imgToAdd = `<div class="col-xs-6 col-sm-4">
                <a class="lightbox" onclick=lightBox($(this)) title="` + title + `" href="#">
                        <img class="thumbnail" src="` + elem.id + `">
                    </a>
            </div>`;

        $('#imageGallery').append(imgToAdd);
        counter++;
    });
}

function randomizePhoto() {
    var bgArray = ['https://www.panoramaresort.com/assets/Tourism-Operators/images/_resampled/CroppedFocusedImageWzE4MDAsMTA4MCwieSIsMTIxXQ/PANO-W2014-medig-2369-RGB.jpg', 'https://c1.staticflickr.com/5/4635/39237323631_500b124095_b.jpg', 'http://boundforsnow.com/wp-content/uploads/2015/03/slopes_pano.jpg', 'https://www.kappl.com/website/var/tmp/image-thumbnails/70000/79931/thumb__content-slider/007pano_kappl.jpeg', 'https://i0.wp.com/www.topsnowtravel.com.au/wp-content/uploads/2017/11/pano-DS-3-cr%C3%A9dit-Soremac-Les-Carroz.jpg', 'https://usatunofficial.files.wordpress.com/2015/06/altapano-1.jpg', 'https://c1.staticflickr.com/8/7159/6757098731_710520a518_b.jpg', 'https://www.giantsridge.com/wp-content/uploads/sites/27/2017/06/Pano_H-winter-2014-ski-hill-photo-1412x557.jpg', 'https://www.powderbeds.com/pub/img/image_gallery/accommodation/237/presse_171011_000426ruitor_pano_default.15878.jpg', 'https://bustloose.com/wp-content/uploads/2017/11/Kicking-Horse-Mountain-Resort-Powder-Express-Shuttle-from-Banff.jpg', 'http://s3.amazonaws.com/medias.photodeck.com/9dbec756-970f-11e2-8ffb-81bea85420f5/DSC_4985_xgaplus.jpg', 'https://www.telegraph.co.uk/content/dam/travel/Spark/my-switzerland-skiing/sitting-on-side-of-mountain-engadin-st-moritz-xlarge.jpg', 'http://dobbernationloves.com/wp-content/uploads/2017/10/Parish-Church-of-St.-Mauritius-Zermatt-1-1.jpg', 'http://www.travel365.md/wp-content/uploads/2017/10/courchevel-1850-ski-resort-savoie-france-conde-nast-traveller-2nov15-alamy__1440x960.jpg', 'http://prod-upp-image-read.ft.com/40bfa5ec-cade-11e5-be0b-b7ece4e953a0', 'https://media.gettyimages.com/photos/matterhorn-at-night-picture-id149520728', 'https://i.pinimg.com/originals/cf/2f/ea/cf2fea4954553df6473bde3e2f0e38ab.jpg', 'https://s-media-cache-ak0.pinimg.com/originals/2d/bd/10/2dbd101d04182d4dc653eb7e5b876100.jpg', 'https://c1.staticflickr.com/9/8570/15788198263_bee742e3bd_b.jpg', 'https://images.thrillophilia.com/image/upload/s--7NzYO-YZ--/c_fill,f_auto,fl_strip_profile,h_800,q_auto,w_1300/v1/images/photos/000/060/099/original/dubai-malls-ski-dubai-inside.jpg.jpg?1453323477'];

    var bg = bgArray[Math.floor(Math.random() * bgArray.length)];
    var imageUrl = bg;
    $('.headerResort').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.28)),url(' + imageUrl + ')');
}


