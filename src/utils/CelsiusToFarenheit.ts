const celsiusToFarenheit = (temp?: number) => {
  if (temp) return Math.round((temp * 9) / 5 + 32);
};

export default celsiusToFarenheit;
