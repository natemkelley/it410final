$(document).ready(function () {
    $("#resortField").keyup(function () {
        if ($("#resortField").val().length >= 1) {
            var myquery = "/getResort?q=" + $("#resortField").val();

            $.ajax({
                url: myquery,
                dataType: "json",
                success: function (datJSON) {
                    displayResults(datJSON);
                }
            });
        }
    });

    $("#regionField").keyup(function () {
        if ($("#regionField").val().length >= 0) {
            var myquery = "/getRegion?q=" + $("#regionField").val();

            $.ajax({
                url: myquery,
                dataType: "json",
                success: function (datJSON) {
                    displayResults(datJSON);
                }
            });
        }
    });
});

function displayResults(data) {
    console.log(data);
    var tkn = localStorage.getItem('idToken');

    var table = '<table style="width: 100%; max-width:1000px;">';
    table += "<colgroup><col style='width: 40%;'><col style='width: 25%;'><col style='width: 35%;'></colgroup>"
    table += "<tr><th>Name</th><th>Region</th><th>Official Website</th></tr>";

    $.each(data, function (i, item) {
        if (tkn == null) {
            table += "<tr><td><a class='getResort'  id='resorts/" + data[i].id + "'> " + data[i].name + "</a></td>";
        } else {
            table += "<tr><td><a class='getResort' id='resorts/" + data[i].id /*+ "?tkn=" + tkn*/ + "'> " + data[i].name + "</a></td>";
        }

        table += "<td>" + data[i].region + "</td>";

        if (data[i].website !== "#") {
            var website = data[i].website;
            table += "<td><a href='" + website + "'>" + website + "</a></td></tr>";
        } else {
            table += "<td>" + "-" + "</td></tr>";
        }
    });

    table += "</table>";

    $("#txtHint").html(table);
}
