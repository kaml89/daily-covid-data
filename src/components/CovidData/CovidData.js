import CardsContainer from "../Cards/CardsContainer";
import Chart from "../Chart/Chart";
import PropTypes from "prop-types";

const CovidData = ({ dailyData, historicalData }) => {
  return (
    <>
      <CardsContainer data={dailyData} />
      <Chart data={historicalData} />
    </>
  );
};

CovidData.propTypes = {
  dailyData: PropTypes.object.isRequired,
  historicalData: PropTypes.array.isRequired,
};

export default CovidData;
