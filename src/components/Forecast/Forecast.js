import "./Forecast.css";
import { useContext } from "react";
import {
  Accordion,
  AccordionItemHeading,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { UnitContext } from "../../UnitContext";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import PropTypes from "prop-types";

export default function Forecast({ forecast }) {
  const { unit, convertTemp } = useContext(UnitContext);
  const dayInWeek = new Date().getDay();
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const following7Days = [
    ...weekdays.slice(dayInWeek, 7),
    ...weekdays.slice(0, dayInWeek),
  ];

  return (
    <div className="forecast-container">
      <label className="forecast-heading">Weather in Future 7 Days</label>
      <Accordion allowZeroExpanded allowMultipleExpanded>
        {forecast.list.slice(0, 7).map((item, index) => {
          let minTemp = item.main.temp_min;
          let maxTemp = item.main.temp_max;

          return (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather icon"
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    />
                    <label className="day">
                      {following7Days[index]}&nbsp;{" "}
                    </label>
                    <label className="description">
                      {item.weather[0].description}&nbsp;{" "}
                    </label>
                    <label className="min-max">
                      {convertTemp(minTemp)}&deg;{unit}
                      {minTemp !== maxTemp &&
                        ` - ${convertTemp(maxTemp)} \u{B0}${unit}`}
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <WeatherDetails item={item} />
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

Forecast.propTypes = {
  forecast: PropTypes.object,
};
