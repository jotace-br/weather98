import { useEffect, useState } from 'react';
import Graph from '~/components/Graph/Graph';
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
  const [formattedData, setFormattedData] = useState<
    FormattedData[] | undefined
  >(undefined);

  useEffect(() => {
    const transformWithoutUpdate = (hour: IHourly): FormattedData => ({
      name: FormatDtToHour(hour.dt) || '',
      temp: FormatTemperature(hour.temp),
      feel: FormatTemperature(hour.feels_like),
      desc: hour.weather[0]?.description || 'N/A',
    });

    setFormattedData(updateTemperatureValues(hourly, transformWithoutUpdate));
  }, [hourly]);

  return (
    <div className='w-full h-full shadow-inside bg-white'>
      <Graph data={formattedData} />
    </div>
  );
};

export default Hourly;
