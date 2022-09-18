import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ChartData, DefaultDataPoint } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, DoughnutController } from 'chart.js';

ChartJS.register(DoughnutController);

interface Props {
  ChartData: ChartData<'pie', DefaultDataPoint<'pie'>, unknown>;
  width?: number | string;
  height?: number | string;
  centerText?: string;
}

export function PieChart({ ChartData, width = '500px', height = '500px' }: Props) {
  return (
    <Chartwrap sx={{ width, height }}>
      <Chart type="pie" data={ChartData} />
    </Chartwrap>
  );
}

const Chartwrap = styled(Box)``;
