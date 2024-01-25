import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface FormattedData {
  name: string;
  temp: number | string;
  feel: number | string;
  desc: string;
}

export interface GraphProps {
  data: FormattedData[] | undefined;
}

const Graph = ({ data }: GraphProps) => (
  <ResponsiveContainer width='100%' height={250}>
    <AreaChart
      width={480}
      height={250}
      data={data}
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
);

export default Graph;
