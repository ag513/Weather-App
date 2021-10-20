const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const getLocations = require('./utils/getLocations')
const path = require('path');
const express = require('express');
const hbs = require('hbs');


const app = express();
const port = process.env.PORT || 3001

// define paths for express confid
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup directory for static assets
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather page',
        name: 'abhi'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'abhinav'
    });
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'this is a help page',
        name: 'abhinav'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Cannot found help',
        name: 'abhi'
    })
})

app.get('/locations', (req, res) => {
    if (!req.query.locationName) {
        return res.send({
            error: 'Please enter a location'
        })
    }
    getLocations(req.query.locationName, (error, locationsList = []) => {
        if (error) {
            return res.send({ error })
        }
        res.send(locationsList)
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter a location'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData, forecastIcon, time) => {
            if (error) {
                return res.send({ error })
            }
            let partsOfDay = ''
            const parsedTime = time.split(" ")[1].split(":")[0];

            if (parsedTime >= 5 && parsedTime <= 8) {
                partsOfDay = 'early-morning'
            } else if (parsedTime > 8 && parsedTime < 12) {
                partsOfDay = 'morning'
            } else if (parsedTime >= 12 && parsedTime <= 17) {
                partsOfDay = 'afternoon'
            } else if (parsedTime > 17 && parsedTime <= 20) {
                partsOfDay = 'evening'
            } else {
                partsOfDay = 'night'
            }

            res.send({
                forecast: forecastData,
                location,
                forecastIcon,
                partsOfDay,
                address: req.query.address,
                test: 'testing'
            });
        })
    })

})

app.get('*', (req, res) => {
    // res.send('cannot find the page')
    res.render('404', {
        errorMessage: 'This is 404  page',
        name: 'abhi'
    })
})


app.listen(port, () => {
    console.log('server running on port ' + port);
})