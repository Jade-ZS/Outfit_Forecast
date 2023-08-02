import './ButtonBar.css';

export default function ButtonBar({toggleCelsius, saveClicked, editClicked, toggleClick}) {

  return (
    <div className='button-bar'>
        <p 
          className={`${toggleCelsius ? 'celsius' : 'fahrenheit' }`}
          onClick={() => toggleClick('toggleCelsius')}
        >toggle</p>
        <div>
          <img 
            className={`edit-button ${editClicked && 'clicked'}`} 
            src='https://img.icons8.com/?size=512&id=95154&format=png'
            alt='edit button'
            onClick={() => toggleClick('editClicked')}/>
          <img 
            className={`save-button ${saveClicked && 'clicked'}`} 
            src='https://img.icons8.com/?size=512&id=82461&format=png'
            alt='save button'
            onClick={() => toggleClick('saveClicked')}/>
        </div>
      </div>
  )
}