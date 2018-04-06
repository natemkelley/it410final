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
    toggleTab('goResort');
    $(".loader").show();

    var myquery = "/" + resortNum;

    $.ajax({
        url: myquery,
        dataType: "json",
        success: function (datJSON) {
            $(".loader").fadeOut();
            displayResults(datJSON);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.error("Status: " + textStatus);
            console.error("Error: " + errorThrown);
        }
    });

}

function displayResort(datJSON){
    console.log(datJSON);
    var name = datJSON.name;
    var nightSki = datJSON.night_skiing;
    var website = datJSON.official_website;
    var opStatus = datJSON.operating_status;
    var terrainPark = datJSON.terrain_park;
    
    //ski maps
    //tags
}
