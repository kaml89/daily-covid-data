import "./Button.css";
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className="button">
      Click
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
