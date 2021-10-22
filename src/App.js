import { useState } from "react";
import { getDailyData, getHistoricalData } from "./services/index";
import { processData } from "./utils/processData";
import Button from "./components/Button/Button";
import CovidData from "./components/CovidData/CovidData";
import "./styles.css";
import { Spinner } from "theme-ui";

export default function App() {
  const [dailyData, setDailyData] = useState({});
  const [historicalData, setHistoricalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCovidData, setShowCovidData] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const dailyData = await getDailyData();
    const historicalData = await getHistoricalData();
    setDailyData(dailyData);
    setHistoricalData(processData(historicalData));
    setIsLoading(false);
  };

  const handleClick = async () => {
    await fetchData();
    setShowCovidData(true);
  };

  return (
    <div className="App">
      {!showCovidData ? (
        <div className="main">
          <h2> Show current COVID situation in Poland</h2>
          {isLoading ? <Spinner /> : <Button onClick={handleClick} />}
        </div>
      ) : (
        <CovidData dailyData={dailyData} historicalData={historicalData} />
      )}
    </div>
  );
}
