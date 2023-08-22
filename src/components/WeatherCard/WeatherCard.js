import "./WeatherCard.css";
import PropTypes from "prop-types";
import { UnitContext } from "../../UnitContext";
import { useContext, useState } from "react";
import WeatherDetails from "../WeatherDetails/WeatherDetails";

export default function WeatherCard({ weather }) {
  const { unit, convertTemp } = useContext(UnitContext);

  const front = (
    <div className="front city">
      <div className="city-name">
        <span>{weather.name}</span>
        <sup>{weather.sys.country}</sup>
      </div>
      <div className="city-temp">
        {convertTemp(weather.main.temp)}
        <sup>&deg;{`${unit}`}</sup>
      </div>
      <div className="info">
        <img
          className="city-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        ></img>
        <p>{weather.weather[0].description}</p>
      </div>
    </div>
  );

  const back = (
    <div className="back">
      <WeatherDetails item={weather} />
    </div>
  );

  return (
    <div className={`weather-card`}>
      <div className="flip-card-inner">
        {front}
        {back}
      </div>
    </div>
  );
}

WeatherCard.propTypes = {
  weather: PropTypes.object,
};
