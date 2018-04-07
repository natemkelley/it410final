//console.log('commentbox');
var database = firebase.database();


function getResortComments(resortID) {
    console.log(resortID);
    console.log(USERNAME);
    /*
    var resortComments = firebase.database().ref(resortID);
    resortComments.on('value', function (snapshot) {
        console.log(snapshot)
    });*/
}

function writeResortComments() {
    if ($("#comment").val().length < 1) {
        return;
    }
    var comment = $("#comment").val();
    var resortNum = GLOBAL_RESORT_NUM.split('/').join('-');
    var time = new Date().getTime();

    firebase.database().ref(resortNum+"/"+time).set({
        username: USERNAME,
        comment: comment
    });
    
    $("#comment").val("");
}
