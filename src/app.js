const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();

const port = process.env.PORT || 8000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to use
app.use(express.static(publicDirectoryPath));

const name = "Amir Dar";

app.get('/', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        name
    });
    
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is an help message',
        title : 'Help Page',
        name
    });
    
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address is mandatory'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            const weatherObj = {
                forecast : forecastData, 
                location,
                address : req.query.address
            }
            res.send(weatherObj)
        });
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg : 'Help article not found',
        title : '404',
        name
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg : 'Page not found',
        title : '404',
        name
    });
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});