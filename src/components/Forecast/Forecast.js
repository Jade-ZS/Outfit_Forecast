import './Forecast.css';
import { fetchForecast } from '../../apiCalls';
import { useContext } from 'react';
import { Accordion, AccordionItemHeading, AccordionItem, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import { UnitContext } from '../../UnitContext';

export default function Forecast({forecast}) {
  const { unit, CtoF } = useContext(UnitContext);
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return (
    <div className='forecast-container'>
      <p>forecast section</p>
      <label>Daily</label>
      <Accordion allowZeroExpanded>
        {forecast.list.slice(0, 7).map((item, index) => {
          let min_temp = Math.round(item.main.temp_min);
          return (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-item'>
                  <img 
                    alt='weather icon'
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  />
                  <label className='day'>{weekdays[index]}</label>
                  <label classname='description'>{item.weather[0].description}</label>
                  <label className='min-max'>{unit === 'C' ? min_temp : CtoF(min_temp)}&deg;{unit}</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel></AccordionItemPanel>
          </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  )
}