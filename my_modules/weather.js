'use strict';
//function to find weather infomation for that location
exports.getWeather = function(request, response) {
  const superagent = require('superagent');
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
    .catch(() => {
      errorHandler('Can\'t find weather data for that location', request, response);
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
