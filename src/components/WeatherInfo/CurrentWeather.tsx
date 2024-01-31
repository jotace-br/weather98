import { useTranslation } from 'react-i18next';
import WeatherIcon from '~/assets/Icons/WeatherIcon';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import FormatTemperature from '~/utils/FormatTemperature';
import TransformUnitToChar from '~/utils/TransformUnitToChar';
export interface CurrentWeatherProps {
  icon?: string;
  temperature?: number | string;
  feelsLike?: number | string;
  description?: string;
}

const CurrentWeather = ({
  icon,
  temperature,
  feelsLike,
  description,
}: CurrentWeatherProps) => {
  const { unit } = useWeatherSettings();
  const { t } = useTranslation();

  return (
    <div className='w-full flex flex-wrap flex-col items-center sm:w-[50%]'>
      <WeatherIcon icon={icon} />

      <p className='flex select-all'>
        <span className='font-ms-bold text-4xl'>
          {FormatTemperature(temperature)}
        </span>
        <span className='font-ms-bold text-lg'>o</span>
        <span className='font-ms-bold text-3xl flex items-end'>
          {TransformUnitToChar(unit)}
        </span>
      </p>
      <div className='w-full flex justify-center text-base text-textColor select-all'>
        <span>
          {t('weatherInfo.feelsLike', {
            temperature: FormatTemperature(feelsLike),
          })}
        </span>

        <span className='text-xs'>o</span>
        {TransformUnitToChar(unit)}
      </div>
      <p className='text-base text-textColor'>{description}</p>
    </div>
  );
};

export default CurrentWeather;
