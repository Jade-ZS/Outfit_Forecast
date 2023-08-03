import './AlertBox.css';

export default function AlertBox({close, message, handleClose}) {
 
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