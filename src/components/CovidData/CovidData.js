import CardsContainer from '../Cards/CardsContainer';
import Chart from '../Chart/Chart';


const CovidData = ({ dailyData, historicalData }) => {
 
  return (
      <>
        <CardsContainer data={ dailyData }/>
        <Chart data={ historicalData }/>
      </>
  );
}

export default CovidData;