// class apicalls {

const getWeather = (lat, lon) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f51a6bd94c6039cb545b8907194c688d`)
  .then(response => {
    if(!response.ok) {
      throw new Error('failed to get weather data');
    }
    return response.json();
  })
  .catch(error => console.log(error));
};

const getGeocode = (zipcode) => {
  let queryString;
  return fetch(`http://api.openweathermap.org/geo/1.0/${queryString}${zipcode}&appid=f51a6bd94c6039cb545b8907194c688d`)
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to get geocode');
    }
    return response.json();
  })
  .catch(error => console.log(error));
};

const getIcon = iconCode => {
  return fetch(`https://openweathermap.org/img/wn/${iconCode}@2x.png`)
  .then(response => {
    if(!response.ok) {
      throw new Error('failed to get weather icon');
    }
    return response.json();
  })
  .catch(error => console.log(error));
};

// }

export {
  getWeather, 
  getGeocode,
  getIcon,
  // apiCalls
}