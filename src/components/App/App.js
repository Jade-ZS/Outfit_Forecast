import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Saves from '../Saves/Saves';
import SingleView from '../SingleView/SingleView';
import { SaveContext } from '../../SaveContext';
import { UnitContext } from '../../UnitContext';

function App() {
  const CtoF = temp => Math.round(temp * (9/5) + 32);
  const [fetchErr, setFetchErr] = useState(false);
  const [saves, setSaves] = useState([]);
  const [unit, setUnit] = useState('C');
  const addSave = location => setSaves([...saves, location]);
  const deleteSave = location => {
    const updatedSaves = saves.filter(element => JSON.stringify(element) !== JSON.stringify(location))
    setSaves(updatedSaves);
  };
  const [currentLat, setCurrentLat] = useState('');
  const [currentLng, setCurrentLng] = useState('');
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLat(position.coords.latitude);
        setCurrentLng(position.coords.longitude);
      }, e => {
        console.log(e)
      })
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, [])
 

  return (
    <div>
      <SaveContext.Provider value={{saves, addSave, deleteSave}}>
        <UnitContext.Provider value={{unit, CtoF}}>
          <header>
            <p>Outfit Forecast</p>
          </header>
          <button className={`f-button ${unit === 'F' && 'clicked'}`} onClick={() => setUnit('F')}>&deg;F</button>
          <button className={`c-button ${unit === 'C' && 'clicked'}`} onClick={() => setUnit('C')}>&deg;C</button>
          <button onClick={getCurrentLocation}>location</button>
          <p>lat: {currentLat}</p>
          <p>lng: {currentLng}</p>
            <Routes>
              <Route path='/' element={<Home checkErr={setFetchErr} currentLat={currentLat} currentLng={currentLng}/>} />
              <Route path='/Result' element={fetchErr ? <NotFound /> : <Home checkErr={setFetchErr} />} />
              <Route path='/saved'>
                <Route index element={<Saves />}/>
                <Route path=':id' element={<SingleView />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
        </UnitContext.Provider>
      </SaveContext.Provider>
    </div>
  );
}

export default App;
