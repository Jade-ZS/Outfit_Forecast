import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import Saves from "../Saves/Saves";
import SingleView from "../SingleView/SingleView";
import { SaveContext } from "../../SaveContext";
import { UnitContext } from "../../UnitContext";
import Header from "../Header/Header";

function App() {
  const CtoF = (temp) => Math.round(temp * (9 / 5) + 32);
  const [fetchErr, setFetchErr] = useState(false);
  const [saves, setSaves] = useState([]);
  const [unit, setUnit] = useState("C");
  const convertTemp = (temp) => {
    if (unit === "C") {
      return Math.round(temp);
    } else {
      return Math.round(CtoF(temp));
    }
  };
  const addSave = (location) => setSaves([...saves, location]);
  const deleteSave = (location) => {
    const updatedSaves = saves.filter(
      (element) => JSON.stringify(element) !== JSON.stringify(location)
    );
    setSaves(updatedSaves);
  };

  return (
    <div>
      <SaveContext.Provider value={{ saves, addSave, deleteSave }}>
        <UnitContext.Provider value={{ unit, setUnit, CtoF, convertTemp }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home checkErr={setFetchErr} />} />
            <Route
              path="/Result"
              element={
                fetchErr ? <NotFound /> : <Home checkErr={setFetchErr} />
              }
            />
            <Route path="/saved">
              <Route index element={<Saves />} />
              <Route path=":id" element={<SingleView />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UnitContext.Provider>
      </SaveContext.Provider>
    </div>
  );
}

export default App;
