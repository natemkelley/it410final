//console.log('commentbox');
var database = firebase.database();
var resortArray = [];


function getResortComments() {
    var resortComments = firebase.database().ref(GLOBAL_RESORT_NUM);
    console.log(GLOBAL_RESORT_NUM);

    resortComments.on('value', function (snapshot) {
        $.each(snapshot.val(), function (i, item) {
            if (resortArray.includes(i)) {
                return;
            }
            resortArray.push(i);
            displayComment(i, item);
        })
    });
}

function displayComment(i, item) {
    console.log(i);
    var row = "<tr>";
    row += "<td>" + i + "</td>";
    row += "<td>" + item.username + "</td>";
    row += "<td>" + item.comment + "</td>";
    row += "</td>";

    $('#displayComment tr:first').after(row);
}

function writeResortComments() {
    if ($("#comment").val().length < 1) {
        return;
    }
    var comment = $("#comment").val();
    var time = new Date().getTime();

    firebase.database().ref(GLOBAL_RESORT_NUM + "/" + time).set({
        username: USERNAME,
        comment: comment
    });

    $("#comment").val("");
}
