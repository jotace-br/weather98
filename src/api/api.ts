import axios, { AxiosResponse } from 'axios';
import { allWallpapers } from '~/constants/wallpapers';
import { ISearch } from '~/types/Search';
import { IWeather } from '~/types/Weather';
const { VITE_API_KEY } = import.meta.env;

const fetcher = async <T>(url: string): Promise<T> => {
	const response: AxiosResponse<T> = await axios.get(url);
	return response.data;
};

interface FetchWeatherProps {
	selectedCity?: ISearch | null;
	lat?: string | number;
	lon?: string | number;
	unit: string;
	lang?: string;
}

export const fetchWeather = async ({
	selectedCity = undefined,
	lat,
	lon,
	unit,
	lang = 'en',
}: FetchWeatherProps): Promise<IWeather | undefined> => {
	if (!selectedCity) return;

	const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&cnt=5&exclude=minutely&appid=${VITE_API_KEY}`;
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
	const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&units=${unit}&limit=1&appid=${VITE_API_KEY}`;
	const results = await fetcher<ISearch[]>(URL);

	return results;
};

export const fetchRandomWallpaper = () => {
	// I think they blocked the API access, so using a local array of wallpapers instead
	// const URL = `https://api.plaza.one/backgrounds/random`;

	const randomIndex = Math.floor(Math.random() * allWallpapers.length);
	return allWallpapers[randomIndex];
};
