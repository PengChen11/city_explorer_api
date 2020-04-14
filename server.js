'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

//location constructor
class Location {
  constructor(search, formatted, latitude, longitude) {
    this.search_query = search;
    this.formatted_query = formatted;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
let sample = {
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
};

// bring in our library;
const cors = require('cors');
// plug our library into express
app.use(cors()); // configures our cross origing resource sharing.



app.get('/location', (request, response) => {
  console.log(request.headers);
  // what happend to our response?
  response.status(200).send(sample);
});


app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
