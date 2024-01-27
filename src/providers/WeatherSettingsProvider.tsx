import { ReactNode, useState } from 'react';
import WeatherSettingsContext, {
  WeatherSettingsContextProps,
} from '~/contexts/WeatherSettingsContext';
import { ISearch } from '~/types/Search';
import celsiusToFarenheit from '~/utils/CelsiusToFarenheit';
import farenheitToCelsius from '~/utils/FarenheitToCelsius';

export type SelectedCity = ISearch | null;
export type UnitValues = { temperature: number; feelsLike: number };
export type Units = 'metric' | 'imperial' | 'standard';

const WeatherSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
  const [unit, setUnit] = useState<Units>('metric');

  const formatter = unit === 'metric' ? farenheitToCelsius : celsiusToFarenheit;

  const updateSelectedCity = (city?: ISearch | null) => {
    if (city) {
      setSelectedCity(city);
    }
  };

  const updateUnit = (newUnit: Units) => {
    setUnit(newUnit);
  };

  const recalculateTemp = (value: number) => {
    return formatter(value);
  };

  const resetWeatherSettings = () => {
    setSelectedCity(null);
    setUnit('metric');
  };

  const contextValue: WeatherSettingsContextProps = {
    selectedCity,
    unit,
    recalculateTemp,
    updateSelectedCity,
    updateUnit,
    resetWeatherSettings,
  };

  return (
    <WeatherSettingsContext.Provider value={contextValue}>
      {children}
    </WeatherSettingsContext.Provider>
  );
};

export { WeatherSettingsProvider };
