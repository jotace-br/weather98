import { useEffect, useState } from 'react';
import Graph from '~/components/Graph/Graph';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import { Hourly as IHourly } from '~/types/Weather';
import formatDtToHour from '~/utils/formatDtToHour';
import formatTemperature from '~/utils/formatTemperature';

export interface HourlyProps {
  hourly?: IHourly[];
}

interface FormattedData {
  name: string;
  temp: number | string;
  feel: number | string;
  desc: string;
}

const updateTemperatureValues = (
  hourlyData: IHourly[] | undefined,
  transformFn: (data: IHourly) => FormattedData
): FormattedData[] => hourlyData?.map((data) => transformFn(data)) || [];

const Hourly = ({ hourly }: HourlyProps) => {
  const { unit, updateTemp } = useWeatherSettings();
  const [formattedData, setFormattedData] = useState<
    FormattedData[] | undefined
  >(undefined);

  useEffect(() => {
    const transformAndUpdate = (data: IHourly): FormattedData => ({
      name: formatDtToHour(data.dt) || '',
      temp: Number(updateTemp(data.temp)),
      feel: Number(updateTemp(data.feels_like)),
      desc: data.weather[0]?.description || 'N/A',
    });

    const transformWithoutUpdate = (hour: IHourly): FormattedData => ({
      name: formatDtToHour(hour.dt) || '',
      temp: formatTemperature(hour.temp),
      feel: formatTemperature(hour.feels_like),
      desc: hour.weather[0]?.description || 'N/A',
    });

    setFormattedData((prevData) => {
      const updatedData =
        unit !== 'metric'
          ? updateTemperatureValues(hourly, transformAndUpdate)
          : updateTemperatureValues(hourly, transformWithoutUpdate);

      return updatedData !== undefined ? updatedData : prevData;
    });
  }, [hourly, unit, updateTemp]);

  return (
    <div className='w-full h-full shadow-inside bg-white'>
      <Graph data={formattedData} />
    </div>
  );
};

export default Hourly;
