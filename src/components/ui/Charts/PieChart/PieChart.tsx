import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ChartData, DefaultDataPoint } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, PieController } from 'chart.js';
ChartJS.register(PieController);

interface Props {
  ChartData: ChartData<'pie', DefaultDataPoint<'pie'>, unknown>;
  width?: number | string;
  height?: number | string;
  centerText?: string;
  legend?: 'top' | 'bottom' | 'left' | 'right';
}

export function PieChart({
  ChartData,
  width = '500px',
  height = '500px',
  legend = 'top',
}: Props) {
  return (
    <Chartwrap sx={{ width, height }}>
      <Chart
        type="pie"
        data={ChartData}
        options={{ plugins: { legend: { position: legend } } }}
      />
    </Chartwrap>
  );
}

const Chartwrap = styled(Box)``;
