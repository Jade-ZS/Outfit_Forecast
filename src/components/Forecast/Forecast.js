import './Forecast.css';
import { fetchForecast } from '../../apiCalls';
import { useState } from 'react';
import { Accordion, AccordionItemHeading, AccordionItem, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';


export default function Forecast({forecast}) {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return (
    <div className='forecast-container'>
      <p>forecast section</p>
      <label>Daily</label>
      <Accordion allowZeroExpanded>
        {forecast.list.slice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-item'>
                  <img 
                    alt='weather icon'
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  />
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel></AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}