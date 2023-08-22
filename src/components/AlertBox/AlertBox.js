import "./AlertBox.css";
import PropTypes from "prop-types";

export default function AlertBox({ close, message, handleClose }) {
  return (
    <div className={`alert-box ${close && "hidden"}`}>
      <div className="banner">
        <button onClick={handleClose}>X</button>
      </div>
      <div className="content">
        <p>{message}</p>
      </div>
    </div>
  );
}

AlertBox.propTypes = {
  close: PropTypes.bool,
  message: PropTypes.string,
  handleClose: PropTypes.func,
};
