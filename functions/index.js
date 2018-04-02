const functions = require('firebase-functions');
const express = require('express');
var request = require('request');
var fs = require('fs');
const https = require('https');
const app = express();

var skiResorts = require('./nates_files/ski.json');


app.get('/timestamp', (request, response) => {
    var date = new Date();
    response.send(date);
});

app.get('/getResort', function (req, res, next) {
    var query = req.query.q;
    var result = compileResortList(query);

    res.status(200).json(result);
});

app.get('/getRegion', function (req, res, next) {
    var query = req.query.q;
    var result = compileRegions(query);

    res.status(200).json(result);
});

exports.app = functions.https.onRequest(app);



function compileRegions(query) {
    var resorts = skiResorts.skiAreas;
    var resortsLength = skiResorts.skiAreas.skiArea.length;
    var jsonresults = [];

    var myRe = "^" + query;
    myRe = myRe.toLowerCase();


    for (i = 0; i < resortsLength; i++) {
        var name = resorts.skiArea[i].name.__cdata;
        var region = "undefined";
        var region_lower = "undefined";

        var website = "#";

        if (resorts.skiArea[i].regions) {
            region = resorts.skiArea[i].regions.region[0].__cdata;
            region_lower = region.toLowerCase();
        }

        if (resorts.skiArea[i].officialWebsite) {
            website = resorts.skiArea[i].officialWebsite.__cdata
        }

        if (region_lower.match(myRe)) {
            jsonresults.push({
                name: name,
                website: website,
                region: region
            })
        }
    }
    return jsonresults;
}

function compileResortList(query) {
    var resorts = skiResorts.skiAreas;
    var resortsLength = skiResorts.skiAreas.skiArea.length;
    var jsonresults = [];
    
    var myRe = "^" + query;
    myRe = myRe.toLowerCase();

    for (i = 0; i < resortsLength; i++) {
        var name = resorts.skiArea[i].name.__cdata;
        var name_lower = name.toLowerCase();
        var id = resorts.skiArea[i]._id;
        var region = "undefined";
        var website = "#";

        if (resorts.skiArea[i].regions) {
            region = resorts.skiArea[i].regions.region[0].__cdata;
        }

        if (resorts.skiArea[i].officialWebsite) {
            website = resorts.skiArea[i].officialWebsite.__cdata;
        }

        if (name_lower.match(myRe)) {
            jsonresults.push({
                name: name,
                website: website,
                region: region, 
                id: id
            })
        }
    }
    return jsonresults;
}
