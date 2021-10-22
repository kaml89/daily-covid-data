import Card from "./Card/Card";
import "./CardsContainer.css";
import PropTypes from "prop-types";

const CardsContainer = ({ data }) => {
  return (
    <div className="cards-container">
      <Card
        label="Number of today's cases of COVID-19"
        title="Infected"
        data={data.todayCases}
      />
      <Card
        label="Number of today's deaths caused by COVID-19"
        title="Deaths"
        data={data.todayDeaths}
      />
      <Card
        label="Number of recovered from COVID-19"
        title="Recovered"
        data={data.todayRecovered}
      />
    </div>
  );
};

CardsContainer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardsContainer;
