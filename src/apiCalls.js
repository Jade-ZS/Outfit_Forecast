const fetchWeather = (lat, lon) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f51a6bd94c6039cb545b8907194c688d`)
  .then(response => {
    if(!response.ok) {
      throw new Error('failed to get weather data');
    }
    return response.json();
  })
  .catch(error => console.log(error));
};

const fetchGeocode = address => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA7kBhFcd_kLf6QbyvhE1NQmcLb_knMNYQ `)
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to get geocode');
    }
    return response.json();
  })
  // .catch(err => {throw new Error('catch error')})
}

const fetchIcon = iconCode => {
  return fetch(`https://openweathermap.org/img/wn/${iconCode}@2x.png`)
  .then(response => {
    if(!response.ok) {
      throw new Error('failed to get weather icon');
    }
    return response.json();
  })
  .catch(error => console.log(error));
};

export {
  fetchWeather, 
  fetchGeocode,
  fetchIcon,
}
