import "./Card.css";
import PropTypes from "prop-types";

const Card = ({ label, title, data }) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2> {data}</h2>
      <h4 className="card-label">{label}</h4>
    </div>
  );
};

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.number.isRequired,
};

export default Card;
