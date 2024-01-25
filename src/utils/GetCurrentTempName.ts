import { Units } from '~/providers/WeatherSettingsProvider';

const GetCurrentTempName = (unit: Units) => {
  switch (unit) {
    case 'imperial':
      return 'Farenheit';
    case 'metric':
    default:
      return 'Celsius';
  }
};

export default GetCurrentTempName;
