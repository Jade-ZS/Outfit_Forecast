import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Saves from '../Saves/Saves';
import SingleView from '../SingleView/SingleView';
import { SaveContext } from '../../SaveContext';
import { UnitContext } from '../../UnitContext';

function App() {
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
        <UnitContext.Provider value={{unit, setUnit}}>
          <button className='f-button'>F</button>
          <button className='c-button'>C</button>
          <Routes>
            <Route path='/' element={<Home checkErr={checkErr}/>} />
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
