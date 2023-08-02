import './ButtonBar.css';
import { useState } from 'react';

export default function ButtonBar({clickSave, clickEdit}) {
  
  return (
    
    <div className='button-bar'>
        <p>toggle</p>
        <div>
          <img 
            className={`edit-button`} 
            src='https://img.icons8.com/?size=512&id=95154&format=png'
            alt='edit button'/>
          <img 
            className={`save-button`} 
            src='https://img.icons8.com/?size=512&id=82461&format=png'
            alt='save button'/>
        </div>
      </div>
  )
}