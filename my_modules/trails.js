'use strict';
//function to find trails info for that location
exports.getTrails = function(request,response){
  const superagent = require('superagent');
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
    .catch(() => {
      errorHandler('Can\'t find trail data for that location', request, response);
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
