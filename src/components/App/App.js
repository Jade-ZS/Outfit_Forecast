import './App.css';
import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Saves from '../Saves/Saves';
import SingleView from '../SingleView/SingleView';
import { SaveContext } from '../../SaveContext';

function App() {

  const [saves, setSaves] = useState([]);

  // input location has to bee the lat lon obj (coord) instead of the whole weather object
  const addSave = location => {
    setSaves([...saves, location]);
    console.log('addSave: ', saves)
  }
  
  const deleteSave = location => {
    const updatedSaves = saves.filter(element => JSON.stringify(element) !== JSON.stringify(location))
    setSaves(updatedSaves);
  }

  return (
    <div>
      <SaveContext.Provider value={{saves, setSaves, addSave, deleteSave}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/saved'>
            <Route index element={<Saves />}/>
            <Route path=':id' element={<SingleView />} />
          </Route>
          {/* </ Route > */}
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </SaveContext.Provider>
    </div>
  );
}

export default App;
