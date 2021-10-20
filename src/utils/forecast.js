const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c68b7ea2ba8518addfb9fbac098ac94&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ', Its currently ' + body.current.temperature + ' degrees out but it feels like ' + body.current.feelslike + ' degrees', body.current.weather_icons[0], body.location.localtime)
        }
    })
}

module.exports = forecast