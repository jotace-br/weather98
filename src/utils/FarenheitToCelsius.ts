const farenheitToCelsius = (temp?: number) => {
  if (temp) return Math.round(((temp - 32) * 5) / 9);
};

export default farenheitToCelsius;
