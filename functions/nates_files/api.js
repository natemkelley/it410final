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

exports.getMaps = function compileResortMaps(query) {
    var url = "https://skimap.org/SkiMaps/view/" + query + ".xml";

    return new Promise((resolve, reject) => {
        https.get(url, function (result) {
            result.on('data', function (data) {
                var result1 = convert.xml2json(data, {
                    compact: true,
                    spaces: 4
                });

                var preptosend = JSON.parse(result1);

                if ("skiMap" in preptosend) {} else {
                    resolve("https://media.giphy.com/media/4lSw7uVVULDhu/giphy.gif");
                    return
                }

                if ("render" in preptosend.skiMap) {
                    preptosend = preptosend.skiMap.render._attributes.url;
                    resolve(preptosend);
                } else {
                    preptosend = preptosend.skiMap.unprocessed._attributes.url;
                    resolve(preptosend);
                }
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
                resolve(replaceWithImages(compiled));
            });
        }).on('error', function (e) {
            reject('Got error: ' + e.message);
        });
    })
}

function replaceWithImages(data) {
    var json = JSON.parse(data);
    var length = json.ski_maps.length;
    var datVal = null;
    var dunzo = 0;
    var returnNow = false;
    var dummyVal = "https://media.giphy.com/media/4lSw7uVVULDhu/giphy.gif";
    
    if (json.ski_maps.length < 1) {
        json.ski_maps[0] = {"id":dummyVal};
        return json;
    }


    return new Promise((resolve, reject) => {
        for (i = 0; i < length; i++) {
            var url = "https://skimap.org/SkiMaps/view/" + json.ski_maps[i].id + ".xml";

            https.get(url, function (result, i) {
                result.on('data', function (data) {
                    var xml2json = convert.xml2json(data, {
                        compact: true,
                        spaces: 4
                    });

                    var preptosend = JSON.parse(xml2json);

                    if ("skiMap" in preptosend) {} else {
                        datVal = dummyVal;
                    }

                    if ("render" in preptosend.skiMap) {
                        preptosend = preptosend.skiMap.render._attributes.url;
                        datVal = preptosend;

                    } else {
                        preptosend = preptosend.skiMap.unprocessed._attributes.url;
                        datVal = preptosend;
                    }

                    json.ski_maps[dunzo].id = datVal;

                    checkDone();
                    console.log(datVal);

                    if (returnNow == true) {
                        resolve(json);
                    }

                });
            }).on('error', function (e) {
                reject('Got error: ' + e.message);
            });
        }
    })

    function checkDone() {
        dunzo++;
        if (dunzo == length) {
            returnNow = true;
        }
    }

}
