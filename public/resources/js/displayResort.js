$(document).ready(function () {
    console.log("ready");

    $(".the-tabs li").click(function () {
        $(".container").hide();
        $('.the-tabs li').removeClass("active");
        $(this).addClass("active");
        var swag = $(".active").children("a").attr("id");
        $("." + swag).fadeIn();

    });




});

$(".getResort").on("click", "a", function () {
    alert('swag');
});

$(" li").on("click", function () {
    console.log('swag');
});
