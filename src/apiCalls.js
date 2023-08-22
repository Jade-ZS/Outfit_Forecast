const apiKey = process.env.REACT_APP_API_KEY;

const fetchWeather = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f51a6bd94c6039cb545b8907194c688d`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("failed to fetch weather data");
    }
    return response.json();
  });
};

const fetchForecast = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=f51a6bd94c6039cb545b8907194c688d`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    return response.json();
  });
};

const fetchGeocode = (address) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey} `
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch geocode");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.results.length) {
        return "invalid address!";
      }
      return data.results[0].geometry.location;
    });
};

export { fetchWeather, fetchGeocode, fetchForecast };
