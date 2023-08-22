import { Link } from "react-router-dom";
import "./SearchBar.css";
import PropTypes from "prop-types";

export default function SearchBar({
  close,
  keyword,
  handleChange,
  handleKeyDown,
  handleSubmit,
  submitRef,
}) {
  return (
    <div className="search-container">
      <Link
        to="/saved"
        onClick={(e) => {
          !close && e.preventDefault();
        }}
      >
        <img
          className={`view-saved-button ${!close && "noHover"}`}
          src={require("../../assets/view-saved.png")}
          alt="view-saved button"
        />
      </Link>
      <div className="search-bar">
        <input
          disabled={!close}
          className="search-input"
          value={keyword}
          placeholder="search by city, address or zipcode"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Link to="/result">
          <input
            disabled={!close}
            ref={submitRef}
            type="submit"
            value="submit"
            onClick={handleSubmit}
          />
        </Link>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  close: PropTypes.bool,
  keyword: PropTypes.string,
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitRef: PropTypes.func,
};
