const request = require('postman-request');
const geocode = require('./utils/geocode');
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


geocode('Manchester', (error, data) => {
    console.log('error: ', error);
    console.log('data: ', data);
})

geocode('Manchester USA', (error, data) => {
    console.log('error: ', error);
    console.log('data: ', data);
})