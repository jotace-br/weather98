import { useEffect, useState } from 'react';
import { fetchWeather } from '~/api/api';
import Prompt from '~/components/Prompt/Prompt';
import CurrentWeather from '~/components/WeatherInfo/CurrentWeather';
import MoreInformation from '~/components/WeatherInfo/MoreInformation';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import useFetch from '~/hooks/UseFetch';
import { Daily } from '~/types/Weather';
import formatDtToDate from '~/utils/FormatDtToDate';
import latinize from '~/utils/Latinize';

const WeatherInfo = () => {
  const { selectedCity, unit, unitValue, updateUnitValue } =
    useWeatherSettings();
  const [prevSelectedCity, setPrevSelectedCity] = useState(selectedCity);
  const isPrevCityDiffToCurrCity =
    JSON.stringify(selectedCity) !== JSON.stringify(prevSelectedCity);

  const {
    data: weatherData,
    loading,
    error,
  } = useFetch({
    fetcher: () =>
      fetchWeather({
        selectedCity,
        lat: selectedCity?.lat,
        lon: selectedCity?.lon,
        unit,
      }),
    shouldFetch: isPrevCityDiffToCurrCity,
  });

  useEffect(() => {
    const updateUnitAndHandleChange = () => {
      if (weatherData?.current && updateUnitValue) {
        updateUnitValue({
          temperature: weatherData?.current.temp,
          feelsLike: weatherData?.current.feels_like,
        });
      }
    };

    updateUnitAndHandleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  useEffect(() => {
    setPrevSelectedCity(selectedCity);
  }, [selectedCity]);

  if (!selectedCity) {
    return;
  }

  if (loading || isPrevCityDiffToCurrCity) {
    return <>loading...</>;
  }

  return (
    <>
      <div className='mt-4 p-1 h-[75dvh] overflow-y-auto'>
        <div>
          <h2 className='text-xl text-center text-balance font-ms-bold'>
            Current weather for {latinize(selectedCity?.name)}
          </h2>

          <div>
            <section className='flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap'>
              <CurrentWeather
                icon={weatherData?.current.weather[0].icon}
                temperature={unitValue?.temperature}
                feelsLike={unitValue?.feelsLike}
                description={weatherData?.current.weather[0].description}
              />

              <MoreInformation
                pressure={weatherData?.current.pressure}
                visibility={weatherData?.current.visibility}
                humidity={weatherData?.current.humidity}
                windSpeed={weatherData?.current.wind_speed}
              />
            </section>

            <br />
            <h1>8 DAY FORECAST</h1>
            <ul>
              {(weatherData?.daily || []).map(
                ({ dt, temp, weather }: Daily, index) => (
                  <li key={index}>
                    <p>{formatDtToDate(dt)}</p>
                    <p>
                      {weather[0].icon} {temp.min} / {temp.max}°
                      {unit.toUpperCase()}
                    </p>
                    <p>{weather[0].description}</p>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {error && <Prompt message={error?.message} />}
      </div>
    </>
  );
};

export default WeatherInfo;
