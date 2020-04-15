'use strict';
// bring in the required library;
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;



class GetMap {
  constructor(city, data) {
    this.search_query = city;
    this.formatted_query = data.display_name;
    this.latitude = data.lat;
    this.longitude = data.lon;
  }
}


function getLocation (request, response) {
  const cityName = request.query.city;
  const locationKey = process.env.GEOCODE_API_KEY;
  const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${locationKey}&q=${cityName}&format=json&limit=1`
  superagent.get(locationUrl)
    .then(locationResponse => {
      const cityData = locationResponse.body;
      for (let i in cityData){
        if (cityData[i].display_name.toLowerCase().includes(cityName)){
          let location = new GetMap(cityName,cityData[i]);
          response.status(200).send(location);
        }
      }
    })
    .catch(error => {
      errorHandler("Can't find city name", request, response);
    })
}

function getWeather (request, response) {
  const weatherLat = request.query.latitude;
  const weatherLon = request.query.longitude;
  const weatherKey = process.env.WEATHER_API_KEY;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${weatherLat}&lon=${weatherLon}&key=${weatherKey}`;
  superagent.get(weatherUrl)
    .then(weatherResponse =>{
      const weatherData = weatherResponse.body.data;
      let weatherResult = weatherData.map(item => {
        return {
          forecast : item.weather.description,
          time : new Date(item.datetime).toString().slice(0,15),
        }
      });
      response.status(200).send(weatherResult);
    })
    .catch(error => {
      errorHandler("Can't find weather data for that location", request, response);
    })
}

function getTrails(request,response){
  const trailsLat = request.query.latitude;
  const trailsLon = request.query.longitude;
  const trailsKey = process.env.TRAIL_API_KEY;
  const trailsUrl = `https://www.hikingproject.com/data/get-trails?lat=${trailsLat}&lon=${trailsLon}&maxDistance=10&key=${trailsKey}`;
  superagent.get(trailsUrl)
    .then(trailsResponse => {
      const trailsData = trailsResponse.body.trails;
      let trailsResult = trailsData.map(item => {
        return {
          name : item.name,
          location : item.location,
          length : item.length,
          stars : item.stars,
          star_votes : item.starVotes,
          summary : item.summary,
          trail_url : item.url,
          conditions : item.conditionDetails,
          condition_date : item.conditionDate.slice(0,11),
          condition_time : item.conditionDate.slice(11,20),
        }
      })
      response.status(200).send(trailsResult);
    })
    .catch(error => {
      errorHandler("Can't find trail data for that location", request, response);
    })

}
function errorHandler(error, request, response) {
  console.log(error);

  response.status(500).send(
    {
      status: 500,
      responseText: 'Sorry, something went wrong'
    });
}

app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/trails', getTrails);
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

