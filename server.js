'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

//location constructor
class GetMap {
  constructor(city, data) {
    this.search_query = city;
    this.formatted_query = data.display_name;
    this.latitude = data.lat;
    this.longitude = data.lon;
  }
}

class GetWeather {
  constructor(summary, time){
    this.forecast = summary;
    this.time = new Date(time).toString().slice(0,15);
  }
}

// bring in our library;
const cors = require('cors');
// plug our library into express
app.use(cors()); // configures our cross origing resource sharing.

var error = {
  status: 500,
  responseText: "Sorry, something went wrong",
};

var weatherChecker;
app.get('/location', (request, response) => {
  weatherChecker = false;
  let cityName = request.query.city;
  let data = require('./data/geo.json');
  let location = error;
  for (let i in data){
    if (data[i].display_name.toLowerCase().includes(cityName)){
      location = new GetMap(cityName,data[i]);
      weatherChecker = true;
      break;
    }
  }
  response.status(200).send(location);
});

app.get('/weather', (request, response) => {
  if (weatherChecker === true){
    let weatherArr = [];
    let weatherData = require('./data/weather.json').data;
    for (let i in weatherData){
      let summary = weatherData[i].weather.description;
      let time = weatherData[i].datetime;
      weatherArr.push(new GetWeather(summary, time));
    }
    response.status(200).send(weatherArr);
  } else {
    response.send(error);
  }
});
app.use(errorHandler);
function errorHandler(request, response) {
  response.status(500).send('Sorry, something went wrong');
}

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

