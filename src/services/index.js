import axios from "axios";

export const getDailyData = async () => {
  const { data: { todayCases, todayDeaths, todayRecovered } } = await axios.get(
    "https://corona.lmao.ninja/v2/countries/poland?yesterday=true&strict=true&query"
  );

  return { todayCases, todayDeaths, todayRecovered }

};

export const getHistoricalData = async () => {
  const { data } = await axios.get(
    "https://corona.lmao.ninja/v2/historical/poland?lastdays=560"
  );
  return data.timeline.cases;
};
