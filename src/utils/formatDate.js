export const formatDate = (date) => {
  const month = date.getMonth()
  const year = date.getFullYear()
  const day = date.getDay();
  
  return `${day}.${month + 1}.${year}`;
}
