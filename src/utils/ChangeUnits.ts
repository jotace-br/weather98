import { Units } from '~/providers/WeatherSettingsProvider';

const changeUnit = (unit: Units) => {
  switch (unit) {
    case 'imperial':
      return 'metric';
    case 'metric':
    default:
      return 'imperial';
  }
};

export default changeUnit;
