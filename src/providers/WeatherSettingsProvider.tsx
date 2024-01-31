import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { i18n } = useTranslation();

  const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
  const [unit, setUnit] = useState<Units>('metric');
  const [language, setLanguage] = useState<string>(
    localStorage.getItem('i18nextLng') || 'en'
  );
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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng.toString());
    setLanguage(lng);
  };

  const contextValue: WeatherSettingsContextProps = {
    selectedCity,
    unit,
    language,
    recalculateTemp,
    updateSelectedCity,
    updateUnit,
    resetWeatherSettings,
    changeLanguage,
  };

  return (
    <WeatherSettingsContext.Provider value={contextValue}>
      {children}
    </WeatherSettingsContext.Provider>
  );
};

export { WeatherSettingsProvider };
