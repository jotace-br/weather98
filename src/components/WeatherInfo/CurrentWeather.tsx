import useWeatherSettings from '~/contexts/UseWeatherSettings';
import transformUnitToChar from '~/utils/transformUnitToChar';

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

  return (
    <div className='flex flex-wrap flex-col items-center w-[50%]'>
      <img
        src={`https://openweathermap.org/img/w/${icon}.png`}
        alt='weather icon'
        width='50px'
        height='50px'
        className='object-cover w-[50px] h-[50px] sm:w-[75px] sm:h-[75px]'
      />

      <p className='flex select-all'>
        <span className='font-ms-bold text-4xl'>
          {isNaN(Number(temperature))
            ? 'N/A'
            : String(Math.round(Number(temperature)))}
        </span>
        <span className='font-ms-bold text-lg'>o</span>
        <span className='font-ms-bold text-3xl flex items-end'>
          {transformUnitToChar(unit)}
        </span>
      </p>
      <p className='text-[1rem] flex select-all'>
        <span>
          Feels like{' '}
          {isNaN(Number(feelsLike))
            ? 'N/A'
            : String(Math.round(Number(feelsLike)))}
        </span>
        <span className='text-xs'>o</span>
        <span className='flex items-end'>{transformUnitToChar(unit)}</span>
      </p>
      <p className='text-[1rem]'>{description}</p>
    </div>
  );
};

export default CurrentWeather;
