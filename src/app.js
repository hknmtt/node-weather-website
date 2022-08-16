import path from 'path';

import express from 'express';
import hbs from 'hbs';

import * as geocode from './utils/geocode.js';
import * as forecast from './utils/forecast.js';

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Matheus Antonio'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Matheus Antonio'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Matheus Antonio'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must specify an address!'
        });
    };
    // res.send({
    //     address: req.query.address,
    //     location: "Palhoça, SC, Brazil",
    //     forecast: "15 degrees"
    // });

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if (error) {
            return res.send({ error });
        };

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            };

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    };
    console.log(req.query);
    res.send({
        product: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Matheus Antonio',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Matheus Antonio',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});
