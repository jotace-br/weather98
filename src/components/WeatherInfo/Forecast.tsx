import { useEffect, useRef, useState } from 'react';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import { IDaily } from '~/types/Weather';
import formatDtToDate from '~/utils/FormatDtToDate';
import FormatTemperature from '~/utils/FormatTemperature';
import TransformUnitToChar from '~/utils/TransformUnitToChar';

export interface ForecastProps {
  daily?: IDaily[];
}

export const Forecast = ({ daily }: ForecastProps) => {
  const { unit, recalculateTemp } = useWeatherSettings();
  const [formattedDaily, setFormattedDaily] = useState<IDaily[] | undefined>(
    daily
  );
  const containerRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sensitivity = 1.8;

  useEffect(() => {
    const updateTemperatureValues = (dailyData?: IDaily[]) => {
      return (
        (dailyData?.map((data) => ({
          ...data,
          temp: {
            min: Number(recalculateTemp(data.temp.min)),
            max: Number(recalculateTemp(data.temp.max)),
          },
        })) as IDaily[]) || []
      );
    };

    setFormattedDaily((prevDaily) => {
      const updatedDaily =
        unit !== 'metric' ? updateTemperatureValues(daily) : daily || [];
      return updatedDaily ?? prevDaily;
    });
  }, [daily, unit, recalculateTemp]);

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
      {(formattedDaily ?? []).map(({ dt, temp, weather }: IDaily, index) => (
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
                ({FormatTemperature(temp.min)} / {FormatTemperature(temp.max)}°
                {TransformUnitToChar(unit)})
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
