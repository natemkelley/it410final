//firebase
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);
const auth = firebase.auth();

//express
const express = require('express');
var request = require('request');
var fs = require('fs');
const https = require('https');
const app = express();

//Nate specific functions
var skiResorts = require('./nates_files/ski.json');
var api = require('./nates_files/api.js');
var convert = require('xml-js');


app.get('/resorts/:id', (request, response) => {
    var resorts = skiResorts.skiAreas;
    var resortsLength = skiResorts.skiAreas.skiArea.length;
    var param_id = request.params.id;


    for (i = 0; i < resortsLength; i++) {
        if (param_id == resorts.skiArea[i]._id) {
            response.sendfile('/public/index.html', {
                root: __dirname + '/..'
            });
            return
        }
    }

    response.send({
        error: "Could not find " + param_id + " in the resort list"
    });
})

app.get('/resortsauth/:id', (request, response) => {
    var resorts = skiResorts.skiAreas;
    var resortsLength = skiResorts.skiAreas.skiArea.length;
    var param_id = request.params.id;
    var idToken = request.query.tkn;

    if (!idToken) {
        response.sendfile('/public/login.html', {
            root: __dirname + '/..'
        });
        return;
    }

    auth.verifyIdToken(idToken)
        .then(function (decodedToken) {
            var uid = decodedToken.uid;
            console.log(uid);
            for (i = 0; i < resortsLength; i++) {
                if (param_id == resorts.skiArea[i]._id) {
                    response.sendfile('/public/index.html', {
                        root: __dirname + '/..'
                    });
                    return
                }
            }

            response.send({
                error: "Could not find " + param_id + " in the resort list"
            });
        })
        .catch(function (error) {
            console.log(error);
            response.send({
                error: "Invalid Token"
            });
        })
})

app.get('/maps/:id', (request, response) => {
    var param_id = request.params.id;
    var url = "https://skimap.org/SkiMaps/view/" + param_id + ".xml";
    console.log(url);

    https.get(url, function (result) {
        result.on('data', function (data) {
            var result1 = convert.xml2json(data, {
                compact: true,
                spaces: 4
            });
            response.send(result1);
        });
    }).on('error', function (e) {
        console.log('Got error: ' + e.message);
    });
})

app.get('/getResort', function (req, res, next) {
    var query = req.query.q;
    var result = api.compileResortList(query);

    res.status(200).json(result);
});

app.get('/getRegion', function (req, res, next) {
    var query = req.query.q;
    var result = api.compileRegions(query);

    res.status(200).json(result);
});

app.use(function (req, res, next) {
    res.send({
        error: 'Not found'
    });
    return;
});

exports.app = functions.https.onRequest(app);
