import axios, { AxiosResponse } from 'axios';
import { Search } from '../types/Search';
import { IWeather } from '../types/Weather';
const { VITE_API_KEY, VITE_API_URL } = import.meta.env;

const fetcher = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(url);
  return response.data;
};

interface FetchWeatherProps {
  selectedCity?: Search;
  lat?: string | number;
  lon?: string | number;
  units: string;
}

export const fetchWeather = async ({
  selectedCity = undefined,
  lat,
  lon,
  units,
}: FetchWeatherProps): Promise<IWeather | undefined> => {
  if (!selectedCity) return;

  const URL = `${VITE_API_URL}/onecall?lat=${lat}&lon=${lon}&units=${units}&cnt=5&exclude=minutely&appid=${VITE_API_KEY}`;
  const result = await fetcher<IWeather>(URL);

  return result;
};

interface FetchCitiesOptionsProps {
  city: string;
  units: string;
}

export const fetchCitiesOptions = async ({
  city,
  units,
}: FetchCitiesOptionsProps) => {
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=${units}&limit=3&appid=${VITE_API_KEY}`;
  const results = await fetcher<Search[]>(URL);

  return results;
};
