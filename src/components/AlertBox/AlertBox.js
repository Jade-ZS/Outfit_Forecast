import './AlertBox.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AlertBox({message}) {
  const [close, setClose] = useState(false);

  return (
    <div className={`alert-box ${close && 'hidden'}`}>
      <div className='banner'>
        <button
          onClick={() => setClose(true)}
        >X</button>
      </div>
      <div className='content'>
        <p>{message}</p>
      </div>
    </div>
  )
}