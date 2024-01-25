import { useEffect, useState } from 'react';
import Graph from '~/components/Graph/Graph';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import { IHourly } from '~/types/Weather';
import FormatDtToHour from '~/utils/FormatDtToHour';
import FormatTemperature from '~/utils/FormatTemperature';

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
  const { unit, recalculateTemp } = useWeatherSettings();
  const [formattedData, setFormattedData] = useState<
    FormattedData[] | undefined
  >(undefined);

  useEffect(() => {
    const transformAndUpdate = (data: IHourly): FormattedData => ({
      name: FormatDtToHour(data.dt) || '',
      temp: Number(recalculateTemp(data.temp)),
      feel: Number(recalculateTemp(data.feels_like)),
      desc: data.weather[0]?.description || 'N/A',
    });

    const transformWithoutUpdate = (hour: IHourly): FormattedData => ({
      name: FormatDtToHour(hour.dt) || '',
      temp: FormatTemperature(hour.temp),
      feel: FormatTemperature(hour.feels_like),
      desc: hour.weather[0]?.description || 'N/A',
    });

    setFormattedData((prevData) => {
      const updatedData =
        unit !== 'metric'
          ? updateTemperatureValues(hourly, transformAndUpdate)
          : updateTemperatureValues(hourly, transformWithoutUpdate);

      return updatedData !== undefined ? updatedData : prevData;
    });
  }, [hourly, unit, recalculateTemp]);

  return (
    <div className='w-full h-full shadow-inside bg-white'>
      <Graph data={formattedData} />
    </div>
  );
};

export default Hourly;
