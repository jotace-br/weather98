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
  const [unitValue, setUnitValue] = useState<UnitValues | undefined>(undefined);

  const updateSelectedCity = (city?: ISearch | null) => {
    if (city) {
      setSelectedCity(city);
    }
  };

  const updateUnit = (newUnit: Units) => {
    setUnit(newUnit);
  };

  const updateUnitValue = (unitValue: UnitValues) => {
    setUnitValue(unitValue);
  };

  const handleUnitChange = () => {
    const onSetValue = (formatter: (param?: number) => number | undefined) => {
      setUnitValue((prevState) => {
        return {
          temperature: formatter(prevState?.temperature) ?? 0,
          feelsLike: formatter(prevState?.feelsLike) ?? 0,
        };
      });
    };

    if (unit === 'metric') {
      return onSetValue(celsiusToFarenheit);
    }
    return onSetValue(farenheitToCelsius);
  };

  const resetWeatherSettings = () => {
    setSelectedCity(null);
    setUnit('metric');
    setUnitValue(undefined);
  };

  const contextValue: WeatherSettingsContextProps = {
    selectedCity,
    unit,
    unitValue,
    updateUnitValue,
    handleUnitChange,
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
