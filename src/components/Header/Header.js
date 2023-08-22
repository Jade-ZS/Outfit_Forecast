import "./Header.css";
import { useContext } from "react";
import { UnitContext } from "../../UnitContext";
import moment from "moment";

export default function Header() {
  const { unit, setUnit } = useContext(UnitContext);

  return (
    <header>
      <div className="left">
        <p>Outfit Forecast</p>
        <button
          className={`f-button ${unit === "F" && "clicked"}`}
          onClick={() => setUnit("F")}
        >
          &deg;F
        </button>
        <button
          className={`c-button ${unit === "C" && "clicked"}`}
          onClick={() => setUnit("C")}
        >
          &deg;C
        </button>
      </div>
      <p>{moment().format("MMMM D, YYYY 🕰️ H:mm")}</p>
    </header>
  );
}
