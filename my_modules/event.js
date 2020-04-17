'use strict';
exports.handler = function (error, request, response) {
  console.log(error);
  response.status(500).send(
    {
      status: 500,
      responseText: 'Sorry, something went wrong'
    });
}
