var skiResorts = require('./ski.json');
const convert = require('xml-js');
const https = require('https');

exports.compileRegions = function compileRegions(query) {
    var resorts = skiResorts.skiAreas;
    var resortsLength = skiResorts.skiAreas.skiArea.length;
    var jsonresults = [];

    var myRe = "^" + query;
    myRe = myRe.toLowerCase();


    for (i = 0; i < resortsLength; i++) {
        var name = resorts.skiArea[i].name.__cdata;
        var id = resorts.skiArea[i]._id;

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
                region: region,
                id: id
            })
        }
    }
    return jsonresults;
}

exports.compileResortList = function compileResortList(query) {
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

exports.getMaps = function compileResortList(query) {
    var url = "https://skimap.org/SkiMaps/view/" + query + ".xml";

    return new Promise((resolve, reject) => {
        https.get(url, function (result) {
            result.on('data', function (data) {
                var result1 = convert.xml2json(data, {
                    compact: true,
                    spaces: 4
                });
                resolve(result1);
            });
        }).on('error', function (e) {
            reject('Got error: ' + e.message);
        });
    })
}

exports.getResort = function compileResortList(query) {
    var url = "https://skimap.org/SkiAreas/view/" + query + ".json";

    return new Promise((resolve, reject) => {
        https.get(url, function (result) {
            result.on('data', function (data) {
                var compiled = data.toString();
                resolve(compiled);
            });
        }).on('error', function (e) {
            reject('Got error: ' + e.message);
        });
    })
}

function compileMapList(data) {
    var json = JSON.parse(data);
    console.log(json.ski_maps.length);
    
    return new Promise((resolve, reject) => {
        for (i = 0; i >= data.ski_maps.length; i++) {
            console.log(json.ski_maps[i]);
        }
    })
}

function getOneMap(data){
    
}

function checkDone() {
    done--;
    if (done === 0) console.log('DUNZO BUNZO');
}
