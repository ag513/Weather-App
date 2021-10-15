const request = require('postman-request');
// const url = 'http://api.weatherstack.com/current?access_key=5c68b7ea2ba8518addfb9fbac098ac94&query=53.2953821,2.1402895&units=f';


// request(url, function (error, response, body) {
//     const data = JSON.parse(body);
//     if (error) {
//         console.log('unable to connect to weather services!');
//     } else if (data.error) {
//         console.log('unable to find locations');
//     } else {
//         console.log(data.current.weather_descriptions[0] + ' Its currently ' + data.current.temperature + ' degrees out but it feels like ' + data.current.feelslike + ' degrees');
//     }
// })

// const geolocURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Newyork.json?access_token=pk.eyJ1IjoiYWJoaW5hdi1ndW5pc2hldHR5IiwiYSI6ImNrdXBvYWtqMzBmanIycXA1bHk5YW5mcWgifQ.EMZFAMDRxbX6JvZBQxPziw&limit=1';

// request(geolocURL, function (error, response, body) {
//     if (error) {
//         console.log('unable to connect to map services');
//     } else if (JSON.parse(body).features.length <= 0) {
//         console.log('cannot find given location');
//     }
//     else {
//         const data = JSON.parse(body);
//         console.log('Latitude: ' + data.features[0].center[0])
//         console.log('Longitude: ' + data.features[0].center[1])
//     }
// })

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWJoaW5hdi1ndW5pc2hldHR5IiwiYSI6ImNrdXBvYWtqMzBmanIycXA1bHk5YW5mcWgifQ.EMZFAMDRxbX6JvZBQxPziw&limit=1';

    request(url, function (error, response, body) {
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


geocode('warangal', (error, data) => {
    console.log('error: ', error);
    console.log('data: ', data);
})