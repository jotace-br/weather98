import { Units } from '~/contexts/WeatherSettingsProvider';

const transformUnitToChar = (unit: Units) => {
  if (unit.toLowerCase() === 'metric') {
    return 'C';
  }

  return 'F';
};

export default transformUnitToChar;
