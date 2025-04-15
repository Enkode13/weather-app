const axios = require('axios');
const apiKey = process.env.WEATHER_API_KEY;

const baseUrl = 'https://api.openweathermap.org/data/2.5';

exports.getCurrentWeather = async (location) => {
  const res = await axios.get(`${baseUrl}/weather`, {
    params: {
      q: location,
      appid: apiKey,
      units: 'metric'
    }
  });
  return res.data;
};

exports.getForecast = async (location) => {
  const res = await axios.get(`${baseUrl}/forecast`, {
    params: {
      q: location,
      appid: apiKey,
      units: 'metric'
    }
  });
  return res.data;
};
