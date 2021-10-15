const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const chalk = require('chalk')

geocode('Manchester', (error, data) => {
    if (error) {
        return error;
    }
    forecast(data.lat, data.long, (error, forecastData) => {
        if (error) {
            return error;
        }
        console.log('Error', error)
        console.log('location: ', data.name)
        console.log(chalk.greenBright(forecastData))
    })
})
