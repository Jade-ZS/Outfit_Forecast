import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Saves from '../Saves/Saves';
import SingleView from '../SingleView/SingleView';
import { SaveContext } from '../../SaveContext';
import { UnitContext } from '../../UnitContext';
import { CtoF } from '../../convertUnit';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const [saves, setSaves] = useState([]);
  const [unit, setUnit] = useState('C');
  const checkErr = (value) => setFetchErr(value); 
  const addSave = location => setSaves([...saves, location]);
  const deleteSave = location => {
    const updatedSaves = saves.filter(element => JSON.stringify(element) !== JSON.stringify(location))
    setSaves(updatedSaves);
  };

  return (
    <div>
      <SaveContext.Provider value={{saves, addSave, deleteSave}}>
        <UnitContext.Provider value={{unit, CtoF}}>
          <button className={`f-button ${unit === 'F' && 'clicked'}`} onClick={() => setUnit('F')}>&deg;F</button>
          <button className={`c-button ${unit === 'C' && 'clicked'}`} onClick={() => setUnit('C')}>&deg;C</button>
            <Routes>
              <Route path='/' element={<Home checkErr={checkErr} />} />
              <Route path='/Result' element={fetchErr ? <NotFound /> : <Home checkErr={checkErr}/>} />
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
