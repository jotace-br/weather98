const FormatTemperature = (temperature?: string | number): string => {
  return isNaN(Number(temperature))
    ? 'N/A'
    : String(Math.round(Number(temperature)));
};

export default FormatTemperature;
