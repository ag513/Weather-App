const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaW5hdi1ndW5pc2hldHR5IiwiYSI6ImNrdXBvYWtqMzBmanIycXA1bHk5YW5mcWgifQ.EMZFAMDRxbX6JvZBQxPziw&limit=1';

    request(url, function (error, body) {
        if (error) {
            callback('unable to connect to map services', undefined)
        } else if (JSON.parse(body).features.length === 0) {
            callback('cannot find given location', undefined);
        } else {
            const data = JSON.parse(body);
            callback(undefined, {
                lat: data.features[0].center[1],
                long: data.features[0].center[0],
                name: data.features[0].place_name
            })
        }
    })
}


module.exports = geocode;