import useSWR from 'swr';
import { fetchWeather } from '../api/api';
import { Search } from '../types/Search';
import { Daily, IWeather } from '../types/Weather';
import { formatDtToDate } from '../utils/formatDtToDate';
import Loading from './Loading';

interface WeatherDisplayProps {
  selectedCity?: Search;
  units: string;
  setUnits: (unit: string) => void;
}

const DAYS_TO_RETRIEVE = 5;

const WeatherDisplay = ({
  selectedCity,
  units,
  setUnits,
}: WeatherDisplayProps) => {
  const {
    data: weatherData,
    error,
    isLoading,
  } = useSWR<IWeather | undefined>(
    `${selectedCity?.name}_weather`,
    () =>
      fetchWeather({
        selectedCity,
        lat: selectedCity?.lat,
        lon: selectedCity?.lon,
        units: units,
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 60 * 10 ** 5,
    }
  );

  if (!selectedCity && !weatherData) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <>{JSON.stringify(error)}</>;
    // return <Error error={error} />;
  }

  console.log(weatherData);

  const handleUnitsChange = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-black'>
      <h2 className='text-2xl font-bold mb-2'>{selectedCity?.name}</h2>
      <p>
        Temperature: {Math.round(Number(weatherData?.current.temp))}°
        {units.toUpperCase()}.
      </p>
      <p>
        Feels like {Math.round(weatherData?.current.feels_like || 0)}°
        {units.toUpperCase()}. {weatherData?.current.weather[0].description}.
      </p>
      <p>Pressure: {weatherData?.current.pressure}hPa</p>
      <p>
        Visibility: {(weatherData?.current.visibility || 1 / 1000).toFixed(1)}
        Km
      </p>

      <p>Description: {weatherData?.current.weather[0].description}</p>
      <p>Humidity: {weatherData?.current.humidity}%</p>
      <p>Wind Speed: {weatherData?.current.wind_speed} m/s</p>
      <button className='toggle-units-button' onClick={handleUnitsChange}>
        Toggle Units
      </button>

      <br />
      <h1>5 days forecast</h1>
      <ul>
        {(weatherData?.daily || [])
          .slice(0, DAYS_TO_RETRIEVE)
          .map(({ dt, temp, weather }: Daily, index) => (
            <li key={index}>
              <p>{formatDtToDate(dt)}</p>
              <p>
                {weather[0].icon} {temp.min} / {temp.max}°{units.toUpperCase()}
              </p>
              <p>{weather[0].description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;
