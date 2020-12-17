/**** Geocoding Api ****/

const request = require('request');

const geoCode = (address, callback) => {
    const encodeAddress = encodeURIComponent(address);
    const url  = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeAddress}.json?access_token=pk.eyJ1IjoiZGFyZGFyIiwiYSI6ImNraWlxbmlwbjBqOWUyc3BiYmZwdnZ3YWgifQ.tJe7imxgTwrKpLsyeGjIQA&limit=1`;

    request({url, json : true}, (error, response, body) => {
        if(error){
            callback(`Unable to connect to the map box location service (error was: ${error})`, undefined);
        }
        else if (body.features.length === 0){
            callback(`location is not valid (${address})`, undefined);
        }
        else{
            const feature = body.features[0];
            callback(undefined, {
                latitude : feature.center[1],
                longitude : feature.center[0],
                location : feature.place_name
            })
        }
    })
}

module.exports = geoCode;