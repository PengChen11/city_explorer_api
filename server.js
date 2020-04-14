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
    this.time = String(new Date(time*1000)).slice(0,10);
  }
}

// bring in our library;
const cors = require('cors');
// plug our library into express
app.use(cors()); // configures our cross origing resource sharing.



app.get('/location', (request, response) => {
  let cityName = request.query.city;
  let data = require('./data/geo.json');
  let location = new GetMap(cityName,data[0]);
  // console.log(request);
  // console.log(location);
  response.status(200).send(location);

});

app.get('/weather', (request, response) => {
  let weatherArr = [];
  let weatherData = require('./data/darksky.json').daily.data;
  for (let data in weatherData){
    let summary = weatherData[data].summary;
    let time = weatherData[data].time;
    weatherArr.push(new GetWeather(summary, time));
  }
  response.status(200).send(weatherArr);
});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

