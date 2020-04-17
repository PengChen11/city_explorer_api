/* eslint-disable indent */
'use strict';
// bring in the required libraries;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const yelp = require('./my_modules/yelpsearch');
const movie = require('./my_modules/movies');
const trail = require('./my_modules/trails');
const weather = require('./my_modules/weather');
const location = require('./my_modules/location');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

//function to handle invalid request
 function fourOhFour(req,res){
  res.status(404).send('Route not found');
}

app.get('/location', location.getLocation);
app.get('/weather', weather.getWeather);
app.get('/trails', trail.getTrails);
app.get('/movies', movie.getMovies);
app.get('/yelp', yelp.restaurant);
app.use('*', fourOhFour);
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

