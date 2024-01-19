export const farenheitToCelsius = (temp) => {
  return Math.round(((temp - 32) * 5) / 9);
};

export const celsiusToFarenheit = (temp) => {
  return Math.round((temp * 9) / 5 + 32);
};
