const functions = require('firebase-functions');
const express = require('express');
var request = require('request');
var fs = require('fs');
const https = require('https');
const app = express();

//Nate specific functions
var skiResorts = require('./nates_files/ski.json');
var api = require('./nates_files/api.js');

app.get('/resorts/:id', (request, response) => {
    var resorts = skiResorts.skiAreas;
    var resortsLength = skiResorts.skiAreas.skiArea.length;
    var param_id = request.params.id;

    for (i = 0; i < resortsLength; i++) {
        if (param_id == resorts.skiArea[i]._id) {
            response.send(param_id);
            return
        }
    }

    response.send({
        error: "Could not find " + param_id + " in the resort list"
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


