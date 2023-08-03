import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Saves from '../Saves/Saves';
import SingleView from '../SingleView/SingleView';
import { SaveContext } from '../../SaveContext';

function App() {
  const [fetchErr, setFetchErr] = useState(false);
  const [saves, setSaves] = useState([]);
  const checkErr = (value) => setFetchErr(value); 
  const addSave = location => setSaves([...saves, location]);
  const deleteSave = location => {
    const updatedSaves = saves.filter(element => JSON.stringify(element) !== JSON.stringify(location))
    setSaves(updatedSaves);
  };

  // useEffect(() => {
  //   if(fetchErr) {
  //     setFetchErr(false);
  //   }
  // }, [fetchErr])

  return (
    <div>
      {/* {console.log('fetchErr: ', fetchErr)} */}
      <SaveContext.Provider value={{saves, addSave, deleteSave}}>
        <Routes>
          <Route path='/' element={fetchErr ? <NotFound /> : <Home checkErr={checkErr}/>} />
          <Route path='/saved'>
            <Route index element={<Saves />}/>
            <Route path=':id' element={<SingleView />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SaveContext.Provider>
    </div>
  );
}

export default App;
