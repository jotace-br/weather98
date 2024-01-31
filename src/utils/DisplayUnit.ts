import { Units } from '~/providers/WeatherSettingsProvider';

const displayUnit = (unit: Units) => {
  switch (unit) {
    case 'imperial':
      return 'Celsius';
    case 'metric':
    default:
      return 'Farenheit';
  }
};

export default displayUnit;
