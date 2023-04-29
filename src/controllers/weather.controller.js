const axios = require("axios");

const getData = async (req, res) => {
  try {
    const { locationData } = req.body;
    console.log(req.body);
    let startingCod = {
      latitude: locationData.starting.geometry.location.lat,
      longitude: locationData.starting.geometry.location.lng,
    };
    let endingCod = {
      latitude: locationData.ending.geometry.location.lat,
      longitude: locationData.ending.geometry.location.lng,
    };
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${startingCod.latitude}&lon=${startingCod.longitude}&appid=ff1c09b9d305908876029f1181069f36`
    );
    let currentWeatherData = weather.data;
    let weatherDesc = weather.data.weather[0].description;
    if (
      weatherDesc.match(/(^|\W)rain($|\W)/) ||
      weatherDesc.match(/(^|\W)thunderstorm($|\W)/)
    ) {
      currentWeatherData.canStart = false;
    } else {
      currentWeatherData.canStart = true;
    }

    const wholeDayWeatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${startingCod.latitude}&lon=${startingCod.longitude}&appid=ff1c09b9d305908876029f1181069f36`
    );

    let endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);
    endOfDay = endOfDay.toISOString();

    let now = new Date().toISOString();

    // console.log(wholeDayWeatherData.data);
    const futureTimeAvailable = wholeDayWeatherData.data.list.filter(
      (weather) => {
        let date = new Date(weather.dt_txt).toISOString();
        if (date > now && date < endOfDay) {
          let weatherDesc = weather.weather[0].description;
          if (
            weatherDesc.match(/(^|\W)rain($|\W)/) ||
            weatherDesc.match(/(^|\W)thunderstorm($|\W)/)
          ) {
          } else {
            weather.canStart = true;
            return weather;
          }
        }
      }
    );
    return res.status(200).send({
      currentWeather: currentWeatherData,
      futureWeather: futureTimeAvailable,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = { getData };
