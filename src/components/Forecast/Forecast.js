import './Forecast.css';
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
          let minTemp = Math.round(item.main.temp_min);
          let maxTemp = Math.round(item.main.temp_max);

          const convertTemp = temp => {
            if (unit === 'C') {
              return temp;
            } else {
              return CtoF(temp);
            }
          };

          return (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className='daily-item'>
                    <img 
                      alt='weather icon'
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    />
                    <label className='day'>{weekdays[index]}&nbsp; </label>
                    <label className='description'>{item.weather[0].description}&nbsp; </label>
                    <label className='min-max'>
                      {convertTemp(minTemp)}&deg;{unit} 
                      {minTemp !== maxTemp && ` - ${convertTemp(maxTemp)}` + `\u{B0}${unit}`}
                    </label>
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