export function buildYearBlocksFromDate(createdAt, currentDate = new Date()) {
  const blocks = [];

  const created = new Date(createdAt);
  created.setUTCHours(0, 0, 0, 0); 
  

  const startYear = created.getUTCFullYear();
  created.setUTCHours(0, 0, 0, 0);

  const currentYear = currentDate.getUTCFullYear();
  currentDate.setUTCHours(23, 59, 59, 999);

  for (let year = startYear; year <= currentYear; year++) {
    
    const from = year === startYear 
      ? new Date(created) 
      : new Date(Date.UTC(year, 0, 1)); 

    const to = year === currentYear 
      ? new Date(currentDate) 
      : new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)); 
    
    blocks.push({ from, to });

  }
  
  return blocks;
}