const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaW5hdi1ndW5pc2hldHR5IiwiYSI6ImNrdXhhNWYyMzAzOTAyeHBiaXB6NWFuZHMifQ.jNwsOQ7rJC7eKW6LPeqNfQ&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        // console.log(body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode