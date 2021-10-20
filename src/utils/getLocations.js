const request = require('request');

const getLocations = (matchString, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(matchString) + '.json?access_token=pk.eyJ1IjoiYWJoaW5hdi1ndW5pc2hldHR5IiwiYSI6ImNrdXhhNWYyMzAzOTAyeHBiaXB6NWFuZHMifQ.jNwsOQ7rJC7eKW6LPeqNfQ&limit=5'

    request({ url, json: true }, (error, { body } = {}) => {
        // console.log(body)

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const locationslist = [];
            body.features.forEach((element) => {
                locationslist.push(element.text)
            });
            callback(undefined, locationslist)
        }
    })
}

module.exports = getLocations;