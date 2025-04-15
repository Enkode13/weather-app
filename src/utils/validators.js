exports.validateLocation = (location) => {
  return typeof location === 'string' && location.trim().length > 0;
};

exports.validateDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return !isNaN(startDate) && !isNaN(endDate) && startDate <= endDate;
};
