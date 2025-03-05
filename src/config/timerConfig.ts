const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); 
    const day = date.getDate();
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  export default formatTimestamp