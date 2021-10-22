export const processData = (dataset) => {
  const newDataset = Object.entries(dataset);
  const convertedData = [];
  for (let i = 0; i < newDataset.length - 1; i++) {
    const date = new Date(newDataset[i][0]);
    const cases = newDataset[i + 1][1] - newDataset[i][1];
    convertedData.push([date, cases]);
  }

  return convertedData;
};
