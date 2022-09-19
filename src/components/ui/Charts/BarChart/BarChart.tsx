import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ChartData, DefaultDataPoint } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, BarController, BarElement } from 'chart.js';

ChartJS.register(BarController, BarElement);

interface Props {
  width?: number | string;
  height?: number | string;
  ChartData: ChartData<'bar', DefaultDataPoint<'bar'>, unknown>;
}

export function BarChart({ width = '500px', height = '500px', ChartData }: Props) {
  return (
    <Chartwrap sx={{ width, height }}>
      <Chart type="bar" data={ChartData} />
    </Chartwrap>
  );
}

const Chartwrap = styled(Box)``;
