//console.log('commentbox');
var database = firebase.database();


function getResortComments() {
    var resortComments = firebase.database().ref(GLOBAL_RESORT_NUM);
    console.log(GLOBAL_RESORT_NUM);
    
    resortComments.on('value', function (snapshot) {
        console.log(snapshot.val())
    });
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
