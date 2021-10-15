const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const chalk = require('chalk')


const location = process.argv[2]


if (!location) {
    console.log('enter a location');
} else {
    geocode(location, (error, { lat, long, name }) => {
        if (error) {
            return error;
        }
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return error;
            }
            console.log('Error', error)
            console.log('location: ', name)
            console.log(chalk.greenBright(forecastData))
        })
    })


}