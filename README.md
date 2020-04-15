# Project city_explorer_api

**Author**: Peng Chen
**Version**: 1.1.0 

|Number and name of feature:|lab-06 | lab-07|
|--|--|--|
|Estimate of time needed to complete:| 3h | 2h |
|Start time:| 0800 | 1000 |
|Finish time:| 1400 | 1200 |
|Actual time needed to complete: |6h | 2h|
## Overview
starting from lab 6 to 9, we will begin building an API server, which will provide data for the City Explorer Application, allowing a user to search for a location, present a Map, as well as interesting information about the area, all using data from APIs that my server will fetch and manage.
This will be a stand-alone back end which will interact with a static front end. It will request data from a total of six third-party APIs, modify the data as needed, and send the data to the client to be displayed in the browser. In labs 8 and 9, I will be persisting data in a SQL database.
## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
2020-04-14 14:00
Lab-06 is finished. Now the backend server can serve the request from front end and send back required map info and weather info. The map info and weather info are based on two json files stored on the server, so it is static. 

2020-04-15 12:00
Lab-07 is finished. Backend server is connected to 3 APIs, the location, weather and trails infomation will be automatelly updated when checking with the city's name. 

## Credits and Collaborations
on 2020-04-14 Brandon Gibbs helped me to go over the code about how to get it working. Really appreciate his help.

on 2020-04-15 code reviewed with Joseph Zabaleta for error corrections. 