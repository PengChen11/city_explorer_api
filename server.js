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


app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

