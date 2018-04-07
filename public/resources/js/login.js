// Initialize Firebase
var config = {
    apiKey: "AIzaSyDVLKV7d3vRqBG4ytmZg6CB29EVKYIH6fg",
    authDomain: "it410-92a24.firebaseapp.com",
    databaseURL: "https://it410-92a24.firebaseio.com",
    projectId: "it410-92a24",
    storageBucket: "it410-92a24.appspot.com",
    messagingSenderId: "181931576056"
};
firebase.initializeApp(config);

const reg = $('#register');
const signIn = $('#signIn');
const signOut = $('#signOut');
const googleSign = $('#googleSignIn');
var USERNAME = "-"

$(reg).click(function (event) {
    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();

    event.preventDefault();
    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise
        .catch(event => console.log(event.message));
});

$(signIn).click(function (event) {
    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();

    console.log(email + " " + password)

    event.preventDefault();
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(event => console.log(event.message));
});

$(signOut).click(function (event) {
    firebase.auth().signOut();
});

$(googleSign).click(function (event) {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error)
        })
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        setUserName(firebaseUser);
        displayNameLogin(firebaseUser);
        getIDToken();
    } else {
        displayNoNameLogin();
    }
});

function displayNameLogin(firebaseUser) {
    //signIn.hide();
    signOut.removeClass('hide').fadeIn();
    //googleSign.addClass('hide');
    //$("#register").addClass('hide');
    $(".form-signin").addClass('hide');


    if (firebaseUser.displayName) {
        $('#loginDisplay').html('<span class="glyphicon glyphicon-log-in" style="margin-right:5px;"></span>' + firebaseUser.displayName);

    } else {
        $('#loginDisplay').html('<span class="glyphicon glyphicon-log-in" style="margin-right:5px;"></span>' + firebaseUser.email);
    }

}

function displayNoNameLogin() {
    console.log('not logged');
    signOut.addClass('hide');
    $(".form-signin").removeClass('hide').fadeIn();

    $('#loginDisplay').html('<span class="glyphicon glyphicon-log-in" style="margin-right:5px;"></span>' + "Login/Register");
    localStorage.removeItem('idToken');
}

function getIDToken() {
    firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        //console.log(idToken);
        localStorage.setItem('idToken', idToken);
    }).catch(function (error) {
        console.error(error);
    })
}

function setUserName(firebaseUser) {
    if (firebaseUser.displayName != "") {
        USERNAME = firebaseUser.displayName;
    } else {
        USERNAME = firebaseUser.email
    }
}
