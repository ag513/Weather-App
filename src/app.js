const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path');
const express = require('express');
const hbs = require('hbs');


const app = express();

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

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
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


app.listen(3001, () => {
    console.log('server running on port 3001');
})