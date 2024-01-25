import { Units } from '~/providers/WeatherSettingsProvider';

const TransformUnitToChar = (unit: Units) => {
  if (unit.toLowerCase() === 'metric') {
    return 'C';
  }

  return 'F';
};

export default TransformUnitToChar;
