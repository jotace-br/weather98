import { useEffect, useRef, useState } from 'react';
import WeatherIcon from '~/assets/Icons/WeatherIcon';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import { IDaily } from '~/types/Weather';
import formatDtToDate from '~/utils/FormatDtToDate';
import FormatTemperature from '~/utils/FormatTemperature';
import TransformUnitToChar from '~/utils/TransformUnitToChar';
interface ForecastProps {
  daily?: IDaily[];
}
export const Forecast = ({ daily }: ForecastProps) => {
  const { unit } = useWeatherSettings();
  const containerRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sensitivity = 1.8;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const delta = (e.clientX - startX) * sensitivity;
      containerRef.current!.scrollLeft = scrollLeft - delta;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  const handleMouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  return (
    <ul
      ref={containerRef}
      className='scrollable-container select-none flex gap-2 overflow-hidden pb-2'
    >
      {(daily || []).map(({ dt, temp, weather }: IDaily, index: number) => (
        <li
          key={index}
          onMouseDown={handleMouseDown}
          className='min-w-fit flex items-center gap-1 py-1.5 px-3 shadow-normal border-[1px] border-b-black border-r-black  border-t-white border-l-white'
        >
          <WeatherIcon icon={weather[0].icon} />

          <div>
            <p className='text-sm font-ms-bold text-textColor sm:text-[0.688rem]'>
              {formatDtToDate(dt)}{' '}
              <span className='font-ms-medium ml-0.5'>
                ({FormatTemperature(temp.min)} / {FormatTemperature(temp.max)}°
                {TransformUnitToChar(unit)})
              </span>
            </p>

            <p className='text-sm text-textColor sm:text-[0.688rem]'>
              {weather[0].description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
