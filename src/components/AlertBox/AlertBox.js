import './AlertBox.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AlertBox({close, message, handleClose}) {
  // const [close, setClose] = useState(false);

  console.log('close: ', close)
  return (
    <div className={`alert-box ${close && 'hidden'}`}>
      <div className='banner'>
        <button
          onClick={handleClose}
        >X</button>
      </div>
      <div className='content'>
        <p>{message}</p>
      </div>
    </div>
  )
}