'use strict';
//function to find movies info for that location
exports.getMovies = function(request,response){
  const superagent = require('superagent');
  const moviesKey = process.env.MOVIE_API_KEY;
  const moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${moviesKey}&page=${request.query.page}`;
  superagent.get(moviesUrl)
    .then(moviesResponse => {
      const moviesData = moviesResponse.body.results;
      let moviesResult = moviesData.map(item => {
        return {
          title : item.title,
          overview : item.overview,
          average_votes : item.vote_average,
          total_votes : item.vote_count,
          image_url : `https://image.tmdb.org/t/p/w500/${item.poster_path.slice(1)}`,
          popularity : item.popularity,
          released_on : item.release_date,
        }
      })
      response.status(200).send(moviesResult);
    })
    .catch(() => {
      errorHandler('Can\'t find movies info', request, response);
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

