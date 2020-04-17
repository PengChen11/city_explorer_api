/* eslint-disable indent */
'use strict';
// function to find the city locations.
exports.getLocation = function (request, response) {
  const pg = require('pg');
  const dbClient = new pg.Client(process.env.DATABASE_URL);
  dbClient.connect(err => {
    if (err) {
      console.error('DataBase Connection error', err.stack)
    } else {
      console.log('DataBase Connected')
    }
  });
  const superagent = require('superagent');
  const cityName = request.query.city;
  const locationKey = process.env.GEOCODE_API_KEY;
  const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${locationKey}&q=${cityName}&format=json&limit=1`
  const searchQuery = `SELECT * FROM CityLocation WHERE search_query = $1`;
  const searchValues = [cityName];
  //Go to the database search for the city location
  dbClient.query(searchQuery,searchValues)
    .then(res => {
      //if no match found, then go to the API get it, then put it in DB
      if (res.rows.length === 0){
        superagent.get(locationUrl)
        .then(locationResponse => {
          const cityData = locationResponse.body;
          let location = cityData.map(item => {
            return {
              search_query : cityName,
              formatted_query : item.display_name,
              latitude : item.lat,
              longitude : item.lon,
            }
          });
          response.status(200).send(location[0]);
          //put the city location in database
          let insertQuery = `INSERT INTO CityLocation VALUES ($1,$2,$3,$4);`
          let insertValues = [location[0].search_query,location[0].formatted_query,location[0].latitude,location[0].longitude];
          dbClient.query(insertQuery,insertValues);
        })
        .catch(() => {
          errorHandler('Can\'t find city name', request, response);
        })
      } else {
        // if the City location is stored in dabatase, then just response with that info.
        response.status(200).send(res.rows[0]);
        // dbClient.query(`CREATE TABLE IF NOT EXISTS ${cityName}_weather (
        //   forecast VARCHAR(255),
        //   time VARCHAR(255)
        // );`)
        // dbClient.query(`CREATE TABLE IF NOT EXISTS ${cityName}_trails (
        //   name VARCHAR(255),
        //   location VARCHAR(255),
        //   length VARCHAR(255),
        //   stars VARCHAR(255),
        //   star_votes VARCHAR(255),
        //   summary VARCHAR(255),
        //   trail_url VARCHAR(255),
        //   conditions VARCHAR(255),
        //   condition_date VARCHAR(255),
        //   condition_time VARCHAR(255)
        // );`)
      }
    })
    .catch( err => console.log(err.stack))
};
function errorHandler(error, request, response) {
  console.log(error);

  response.status(500).send(
    {
      status: 500,
      responseText: 'Sorry, something went wrong'
    });
}
