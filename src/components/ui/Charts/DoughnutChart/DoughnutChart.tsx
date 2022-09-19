import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ChartData, DefaultDataPoint } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, DoughnutController } from 'chart.js';

ChartJS.register(DoughnutController);

interface Props {
  ChartData: ChartData<'doughnut', DefaultDataPoint<'doughnut'>, unknown>;
  width?: number | string;
  height?: number | string;
  centerText?: string;
}

export function DoughnutChart({
  ChartData,
  width = '500px',
  height = '500px',
  centerText = '',
}: Props) {
  const doughnutPlugins = [
    {
      id: 'bD',
      beforeDraw: function (chart: ChartJS) {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        const fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + 'em sans-serif';
        ctx.textBaseline = 'top';
        const text = centerText;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <Chartwrap sx={{ width, height }}>
      <Chart type="doughnut" data={ChartData} plugins={doughnutPlugins} />
    </Chartwrap>
  );
}

const Chartwrap = styled(Box)``;
