import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
      <ResponsiveContainer width='100%' height={250}>
        <AreaChart
          width={480}
          height={250}
          data={formattedData}
          margin={{
            top: 20,
            left: -25,
            right: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='2 2' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            stackId='1'
            dataKey='temp'
            stroke='#808080'
            fill='#808080'
          />
          <Area
            type='monotone'
            stackId='1'
            dataKey='feel'
            stroke='#121212'
            fill='#121212'
          />
          <Area
            type='monotone'
            stackId='1'
            dataKey='desc'
            stroke='#008080'
            fill='#008080'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Hourly;
