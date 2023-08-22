import './SaveButton.css';
import { SaveContext } from '../../SaveContext';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 

export default function SaveButton({isSingleView, location}) {
  const { saves, addSave, deleteSave } = useContext(SaveContext);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkIfSaved = () => saves.some(element => JSON.stringify(element) === JSON.stringify(location));
    setIsSaved(checkIfSaved());
  }, [saves, location])

  const handleSaveClick = () => isSaved ? deleteSave(location) : addSave(location);

  return (
    
<div className='button-wrapper'>
          <img 
            className={`save-button ${isSaved && 'clicked'}`}
            src='https://img.icons8.com/?size=512&id=82461&format=png'
            alt='save button'
            onClick = {handleSaveClick}
          />
          {isSingleView && <Link to='/saved'><img className='close-button' alt='close button' src={require('../../assets/close-button.png')}/></Link>}
        </div>
  );
}

SaveButton.propTypes = {
  isSingleView: PropTypes.bool,
  location: PropTypes.object, 
}