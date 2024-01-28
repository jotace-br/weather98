import axios from 'axios';
import { Mock, afterEach, describe, expect, test, vitest } from 'vitest';
import {
  fetchCitiesOptions,
  fetchRandomWallpaper,
  fetchWeather,
} from '~/api/api';
import { IWallpaper } from '~/types/Wallpaper';
import { searchData, weatherData } from './weather.consts';

vitest.mock('axios');

describe('API Functions', () => {
  afterEach(() => {
    vitest.resetAllMocks();
  });

  test('fetchWeather should return weather data', async () => {
    const mockResponse = { data: weatherData };

    (axios.get as Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchWeather({
      selectedCity: searchData[0],
      lat: 52.5170365,
      lon: 13.3888599,
      unit: 'metric',
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org/data/3.0/onecall')
    );
    expect(result).toEqual(weatherData);
  });

  test('fetchCitiesOptions should return search results', async () => {
    const mockResponse = { data: searchData };

    (axios.get as Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchCitiesOptions({
      city: 'Berlin',
      unit: 'metric',
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org/geo/1.0/direct')
    );
    expect(result).toEqual(searchData);
  });

  test('fetchRandomWallpaper should return a random wallpaper', async () => {
    const mockData: IWallpaper = {
      id: 50,
      filename: '50.gif',
      author: '',
      author_link: '',
      source: '',
      source_link: '',
      is_updated: 1,
      num: '50',
      src: 'https://gif.plaza.one/50.gif',
      video_src: 'https://gif.plaza.one/mp4/50.mp4',
    };
    const mockResponse = { data: mockData };

    (axios.get as Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchRandomWallpaper();

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('api.plaza.one/backgrounds/random')
    );
    expect(result).toEqual(mockData);
  });

  test('fetchCitiesOptions should handle error for wrong city', async () => {
    const errorMessage =
      'Location Unavailable. Please retry with valid city name.';
    (axios.get as Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Call the function with a wrong city
    const result = await fetchCitiesOptions({
      city: 'NonExistentCity',
      unit: 'metric',
    }).catch((error) => error);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org/geo/1.0/direct')
    );
    expect(result.message).toBe(errorMessage);
  });
});
