import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchWeather } from '~/api/api';
import { ContentDivider } from '~/components/Divider/ContentDivider';
import {
  default as Loading,
  default as LoadingDiv,
} from '~/components/Loading/Loading';
import Prompt from '~/components/Prompt/Prompt';
import CurrentWeather from '~/components/WeatherInfo/CurrentWeather';
import { Forecast } from '~/components/WeatherInfo/Forecast';
import Hourly from '~/components/WeatherInfo/Hourly';
import MoreInformation from '~/components/WeatherInfo/MoreInformation';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import UseFetch from '~/hooks/UseFetch';
import { IWeather } from '~/types/Weather';
import latinize from '~/utils/Latinize';

const formatWeatherData = (
  data: IWeather,
  options?: {
    recalculateTemp: (value: number) => number;
  }
) => {
  const handleRecaulateTemp = (value: number) =>
    options?.recalculateTemp(value) ?? value;

  return {
    ...data,
    current: {
      ...data.current,
      temp: handleRecaulateTemp(data.current.temp),
      feels_like: handleRecaulateTemp(data.current.feels_like),
    },
    daily: [
      ...(data.daily || []).map((day) => ({
        ...day,
        temp: {
          ...day.temp,
          min: handleRecaulateTemp(day.temp.min),
          max: handleRecaulateTemp(day.temp.max),
        },
      })),
    ],
    hourly: [
      ...(data.hourly || []).map((hour) => ({
        ...hour,
        temp: handleRecaulateTemp(hour.temp),
        feels_like: handleRecaulateTemp(hour.feels_like),
      })),
    ],
  };
};

const WeatherInfo = () => {
  const { language, selectedCity, unit, recalculateTemp } =
    useWeatherSettings();
  const { t } = useTranslation();

  const [prevSelectedCity, setPrevSelectedCity] = useState(selectedCity);
  const [prevUnit, setPrevUnit] = useState(unit);

  const [formattedData, setFormattedData] = useState<IWeather | undefined>(
    undefined
  );

  const [prevLanguage, setPrevLanguage] = useState<string | null>(
    localStorage.getItem('i18nextLng')
  );
  const isPrevCityDiffToCurrCity =
    JSON.stringify(selectedCity) !== JSON.stringify(prevSelectedCity);
  const isPrevLanguageDiffToCurrLanguage = prevLanguage !== language;

  const shouldFetch =
    selectedCity &&
    (isPrevCityDiffToCurrCity || isPrevLanguageDiffToCurrLanguage);

  useEffect(() => {
    setPrevLanguage(language);
  }, [language]);

  const {
    data: weatherData,
    loading,
    error,
  } = UseFetch({
    fetcher: () =>
      fetchWeather({
        selectedCity,
        lat: selectedCity?.lat,
        lon: selectedCity?.lon,
        unit,
        lang: language,
      }),
    shouldFetch: shouldFetch || false,
  });

  useEffect(() => {
    setPrevUnit(unit);
  }, [unit]);

  useEffect(() => {
    // Update local temperatures when the unit changes
    if (unit !== prevUnit && formattedData) {
      setFormattedData(formatWeatherData(formattedData, { recalculateTemp }));
    }
  }, [unit, prevUnit, recalculateTemp, formattedData]);

  useEffect(() => {
    setPrevSelectedCity(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    // Update temperatures when weatherData changes
    if (weatherData) {
      setFormattedData(weatherData);
    }
  }, [weatherData]);

  if (!selectedCity) {
    return;
  }

  if (loading || isPrevCityDiffToCurrCity) {
    return <LoadingDiv />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='mt-4 p-1 max-h-[75dvh] overflow-y-auto'>
        <div>
          <h2 className='text-xl text-center text-balance font-ms-bold'>
            {t('weatherInfo.currentFor', {
              city: latinize(selectedCity.name),
            })}
          </h2>

          <div>
            <section className='flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap mb-4'>
              <CurrentWeather
                icon={formattedData?.current.weather[0].icon}
                temperature={formattedData?.current.temp}
                feelsLike={formattedData?.current.feels_like}
                description={formattedData?.current.weather[0].description}
              />

              <MoreInformation
                pressure={formattedData?.current.pressure}
                visibility={formattedData?.current.visibility}
                humidity={formattedData?.current.humidity}
                windSpeed={formattedData?.current.wind_speed}
              />
            </section>

            <ContentDivider
              title={t('weatherInfo.forecast', {
                totalDays: formattedData?.daily?.length ?? 0,
              })}
              tailwindStyles='mb-4'
            >
              <Forecast daily={formattedData?.daily} />
            </ContentDivider>

            <ContentDivider
              title={t('weatherInfo.hourly')}
              tailwindStyles='mb-4'
            >
              <Hourly hourly={formattedData?.hourly} />
            </ContentDivider>
          </div>
        </div>

        {error && <Prompt message={error.message} />}
      </div>
    </Suspense>
  );
};

export default WeatherInfo;
