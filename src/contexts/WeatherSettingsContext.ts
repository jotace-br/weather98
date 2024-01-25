import { createContext } from 'react';
import {
  SelectedCity,
  UnitValues,
  Units,
} from '~/providers/WeatherSettingsProvider';
import { ISearch } from '~/types/Search';

export interface WeatherSettingsContextProps {
  selectedCity: SelectedCity;
  unit: Units;
  unitValue?: UnitValues;
  updateUnitValue?: (unitValue: UnitValues) => void;
  handleUnitChange: () => void;
  updateTemp: (value?: number) => number | undefined;
  updateSelectedCity: (city?: ISearch | null) => void;
  updateUnit: (newUnits: Units) => void;
  resetWeatherSettings: () => void;
}

const WeatherSettingsContext = createContext<
  WeatherSettingsContextProps | undefined
>(undefined);

export default WeatherSettingsContext;
