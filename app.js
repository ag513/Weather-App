const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


forecast(44.1545, 2.1402895, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

geocode('Manchester', (error, data) => {
    console.log('error: ', error);
    console.log('data: ', data);
})

geocode('Manchester USA', (error, data) => {
    console.log('error: ', error);
    console.log('data: ', data);
})