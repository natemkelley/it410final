var database = firebase.database();
var resortArray = [];

function getResortComments() {
    $("#displayComment td").remove();

    var resortComments = firebase.database().ref(GLOBAL_RESORT_NUM);
    resortArray = [];

    resortComments.on('value', function (snapshot) {
        console.log(snapshot.val());
        $.each(snapshot.val(), function (i, item) {
            if (resortArray.includes(i)) {
                return;
            }
            resortArray.push(i);
            displayComment(i, item);
        })
    });
}

function writeResortComments() {
    if ($("#comment").val().length < 1) {
        return;
    }
    var comment = $("#comment").val();
    var date = new Date();
    var id = date.getTime();

    var dateString = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    firebase.database().ref(GLOBAL_RESORT_NUM + "/" + id).set({
        username: USERNAME,
        comment: comment,
        date: dateString
    });

    $("#comment").val("");
}

function displayComment(i, item) {
    var row = "<tr>";
    row += "<td>" + item.username + "</td>";
    row += "<td>" + item.date + "</td>";
    row += "<td>" + item.comment + "</td>";
    row += "</td>";

    $('#displayComment tr:first').after(row);
}