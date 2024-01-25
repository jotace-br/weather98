import { useEffect, useRef, useState } from 'react';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import { Daily } from '~/types/Weather';
import formatDtToDate from '~/utils/FormatDtToDate';
import formatTemperature from '~/utils/formatTemperature';
import transformUnitToChar from '~/utils/transformUnitToChar';

export interface ForecastProps {
  daily?: Daily[];
}

export const Forecast = ({ daily }: ForecastProps) => {
  const { unit, updateTemp } = useWeatherSettings();
  const [formattedDaily, setFormattedDaily] = useState<Daily[] | undefined>(
    daily
  );
  const containerRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sensitivity = 1.8;

  useEffect(() => {
    const updateTemperatureValues = (dailyData?: Daily[]): Daily[] => {
      return (
        (dailyData?.map((data) => ({
          ...data,
          temp: {
            min: Number(updateTemp(data.temp.min)),
            max: Number(updateTemp(data.temp.max)),
          },
        })) as Daily[]) || []
      );
    };

    setFormattedDaily((prevDaily) => {
      const updatedDaily =
        unit !== 'metric' ? updateTemperatureValues(daily) : daily || [];
      return updatedDaily ?? prevDaily;
    });
  }, [daily, unit, updateTemp]);

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
      {(formattedDaily ?? []).map(({ dt, temp, weather }: Daily, index) => (
        <li
          key={index}
          onMouseDown={handleMouseDown}
          className='min-w-fit flex items-center gap-2 py-1.5 px-3 shadow-normal border-[1px] border-b-black border-r-black  border-t-white border-l-white'
        >
          <img
            src={`https://openweathermap.org/img/w/${weather[0].icon}.png`}
            alt='weather icon'
            width='32px'
            height='32px'
            className='w-[32px] h-[32px] object-cover'
          />

          <div>
            <p className='font-ms-bold text-textColor font-[0.688rem]'>
              {formatDtToDate(dt)}{' '}
              <span className='font-ms-medium ml-0.5'>
                ({formatTemperature(temp.min)} / {formatTemperature(temp.max)}°
                {transformUnitToChar(unit)})
              </span>
            </p>

            <p className='text-textColor font-[0.688rem]'>
              {weather[0].description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
