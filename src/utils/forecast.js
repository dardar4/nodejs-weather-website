/**** Weather Api ****/

const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const latLonQuery = `${latitude},${longitude}`;
  const url = `http://api.weatherstack.com/current?access_key=a0d0cb60cb521ffe497902374bfcd63a&query=${latLonQuery}&units=m`;

  request({url, json : true}, (error, response, body) => {
      if(error){
        callback(`Unable to connect to the weather service(error was: ${error})`, undefined);
      }else if(body.error) {
        callback(body.error.info, undefined)
      } else{
        const currentWeather = body.current;
        callback(undefined, `${currentWeather.weather_descriptions[0]}. It is currently ${currentWeather.temperature} degree out. It feels like ${currentWeather.feelslike} degree`)
      }
  });
}

module.exports = forecast;
