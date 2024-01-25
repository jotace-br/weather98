import { Units } from '~/contexts/WeatherSettingsProvider';

const getCurrentTempName = (unit: Units) => {
  switch (unit) {
    case 'imperial':
      return 'Farenheit';
    case 'metric':
    default:
      return 'Celsius';
  }
};

export default getCurrentTempName;
