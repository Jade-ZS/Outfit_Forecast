import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="err-page">
      <Link to="/">
        <img
          className="home-button"
          alt="home button"
          src={require("../../assets/home-icon.png")}
        />
      </Link>
      <img
        className="raining-cloud"
        alt="raining cloud"
        src="https://i.gifer.com/X5Na.gif"
      />
      <h1>Ooopsy...</h1>
      <p>Page Not Found!</p>
    </div>
  );
}
