import './ButtonBar.css';

export default function ButtonBar() {
  return (
    <div className='button-bar'>
        <p>toggle</p>
        <div>
          {/* <span>edit--</span> */}
          <img className='edit-button' src='https://img.icons8.com/?size=512&id=95154&format=png'/>
          {/* <span>save--</span> */}
          <img className='save-button' src='https://img.icons8.com/?size=512&id=82461&format=png'/>
        </div>
      </div>
  )
}