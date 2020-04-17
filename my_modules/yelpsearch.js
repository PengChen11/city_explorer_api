//function to find yelp restaurants near that location
exports.restaurant = function(request,response){
  const yelp = require('yelp-fusion');
  const yelpClient = yelp.client(process.env.YELP_API_KEY);
  const yelpSearch = {
    latitude : request.query.latitude,
    longitude : request.query.longitude,
    limit : 20,
    term : 'restaurants',
  }
  yelpClient.search(yelpSearch)
    .then(yelpResponse => {
      const yelpData = yelpResponse.jsonBody.businesses;
      let yelpRestaurants = yelpData.map(item => {
        return {
          name : item.name,
          image_url: item.image_url,
          price : item.price,
          rating : item.rating,
          url : item.url,
        }
      })
      response.status(200).send(yelpRestaurants);
    })
    .catch(() => {
      errorHandler('Can\'t find Restaurants nearby', request, response);
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
