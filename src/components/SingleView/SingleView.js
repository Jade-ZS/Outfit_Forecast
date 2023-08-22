import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SaveContext } from "../../SaveContext";
import { fetchWeather, fetchGeocode, fetchForecast } from "../../apiCalls";
import Result from "../Result/Result";
import "./SingleView.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function SingleView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { saves } = useContext(SaveContext);
  const [weather, setWeather] = useState("");
  const [forecast, setForecast] = useState();
  const selectedSavedCard = saves.filter((element) => element.id === id)[0];
  const [isLoadingSingle, setIsLoadingSingle] = useState(false);

  const parseName = (id) => {
    return id.slice(0, id.length - 2);
  };

  useEffect(() => {
    setIsLoadingSingle(true);
    const cityName = parseName(id);
    fetchGeocode(cityName)
      .then(async (geocode) => {
        return [
          await fetchWeather(geocode.lat, geocode.lng),
          await fetchForecast(geocode.lat, geocode.lng),
        ];
      })
      .then((data) => {
        setIsLoadingSingle(false);
        setWeather(data[0]);
        setForecast(data[1]);
      })
      .catch(() => navigate("/*"));
  }, [selectedSavedCard]);

  return (
    <>
      <div className="single-view">
        <Link to="/">
          <img
            className="home-button"
            alt="home button"
            src={require("../../assets/home-icon.png")}
          />
        </Link>
        {isLoadingSingle && <LoadingSpinner />}
        <Result
          forecast={forecast}
          isSingleView={true}
          weather={weather}
          isLoadingSingle={isLoadingSingle}
        />
      </div>
    </>
  );
}
