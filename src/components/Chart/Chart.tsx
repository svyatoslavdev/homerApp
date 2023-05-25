import { Card, CardContent, Typography } from '@mui/material';
import { generateColorFromString } from 'helpers/genarateColorFromString';
import { IBeer } from 'hooks/useTable';
import { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Cell,
} from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

interface IChart {
  data: Array<IBeer>;
  dataKey: string;
  titleKey: string;
  handler: (beer: IBeer) => void;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) =>
  active && payload && payload.length ? (
    <Card>
      <CardContent>
        <Typography>{label}</Typography>
      </CardContent>
    </Card>
  ) : null;

const DRUNK_STEPS = [
  'Merry',
  'Sloshed',
  'Drunk as a skunk',
  'Legless',
  'Out of the count ☠️',
];

export const Chart: FC<IChart> = ({
  data,
  handler,
  dataKey = '',
  titleKey = '',
}) => (
  <ResponsiveContainer width='100%' height={300}>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 4' />
      <XAxis dataKey={titleKey} />
      <YAxis />

      <YAxis
        orientation='right'
        allowDataOverflow
        domain={DRUNK_STEPS}
        type='category'
        yAxisId='2'
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar label={{ position: 'top' }} onClick={handler} dataKey={dataKey}>
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={generateColorFromString(entry.name)}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);
