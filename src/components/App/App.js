import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Saves from '../Saves/Saves';
import SingleView from '../SingleView/SingleView';

function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/saved' element={<Saves /> }/> */}
          {/* <Route path=':id' element={<SingleView />} /> */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
