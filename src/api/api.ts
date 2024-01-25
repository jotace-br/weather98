import axios, { AxiosResponse } from 'axios';
import { ISearch } from '~/types/Search';
import { Wallpaper } from '~/types/Wallpaper';
import { IWeather } from '~/types/Weather';
const { VITE_API_KEY, VITE_API_URL } = import.meta.env;

const fetcher = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(url);
  return response.data;
};

interface FetchWeatherProps {
  selectedCity?: ISearch | null;
  lat?: string | number;
  lon?: string | number;
  unit: string;
}

export const fetchWeather = async ({
  selectedCity = undefined,
  lat,
  lon,
  unit,
}: FetchWeatherProps): Promise<IWeather | undefined> => {
  if (!selectedCity) return;

  const URL = `${VITE_API_URL}/onecall?lat=${lat}&lon=${lon}&units=${unit}&cnt=5&exclude=minutely&appid=${VITE_API_KEY}`;
  const result = await fetcher<IWeather>(URL);

  return result;
};

interface FetchCitiesOptionsProps {
  city: string;
  unit: string;
}

export const fetchCitiesOptions = async ({
  city,
  unit,
}: FetchCitiesOptionsProps) => {
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=${unit}&limit=1&appid=${VITE_API_KEY}`;
  const results = await fetcher<ISearch[]>(URL);

  return results;
};

export const fetchRandomWallpaper = async () => {
  const URL = `https://api.plaza.one/backgrounds/random`;

  const results = await fetcher<Wallpaper>(URL);
  return results;
};
