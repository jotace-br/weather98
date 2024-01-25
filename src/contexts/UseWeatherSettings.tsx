import { useContext } from 'react';
import WeatherSettingsContext from './WeatherSettingsContext';

const useWeatherSettings = () => {
  const context = useContext(WeatherSettingsContext);

  if (!context) {
    throw new Error(
      'useWeatherSettings must be used within a WeatherSettingsProvider'
    );
  }

  return context;
};

export default useWeatherSettings;
