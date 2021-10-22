export const formatDate = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  return `${day}.${month + 1}.${year}`;
};
