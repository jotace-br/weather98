import { createContext } from 'react';
import { SelectedCity, Units } from '~/providers/WeatherSettingsProvider';
import { ISearch } from '~/types/Search';

export interface WeatherSettingsContextProps {
  selectedCity: SelectedCity;
  unit: Units;
  recalculateTemp: (value: number) => number;
  updateSelectedCity: (city?: ISearch | null) => void;
  updateUnit: (newUnits: Units) => void;
  resetWeatherSettings: () => void;
}

const WeatherSettingsContext = createContext<
  WeatherSettingsContextProps | undefined
>(undefined);

export default WeatherSettingsContext;
