const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c68b7ea2ba8518addfb9fbac098ac94&query=' + lat + ',' + long;
    request(url, function (error, body) {
        const data = JSON.parse(body);
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (data.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, data.current.weather_descriptions[0] + ', Its currently ' + data.current.temperature + ' degrees out but it feels like ' + data.current.feelslike + ' degrees')
        }
    })
}


module.exports = forecast;