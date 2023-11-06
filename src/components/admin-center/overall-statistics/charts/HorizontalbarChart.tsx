
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ChartOptions,ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

ChartJS.register( CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend );

export const options:ChartOptions<'bar'> = {
  indexAxis: 'y' as const,
  maintainAspectRatio: false,
  elements: {
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 14,
          weight: 'bold',
        }
      }
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 18,
          weight: 'bold',
        },
      }
    },
  },
  layout: {
    padding: {
      top: 40,
    },
  },
  responsive: true,
  plugins: {
    tooltip: {
      position: 'nearest',
      titleFont: { size: 12 },
      padding: 14,
      backgroundColor: '#25262b',
      boxPadding: 5,
      bodySpacing: 8,
      usePointStyle: true,
      bodyAlign: 'left',
    },
    legend: {
      position: 'top' as const,
      fullSize: true,
      labels: {
        usePointStyle: true,
        boxPadding: 10,
        font: {
          size: 22,
        },
        boxWidth: 12,
        boxHeight: 12,
      }
    },
  },
};


interface Props {
  width?: number;
  height?: number;
  chartData: ChartData<'bar'>;

}

export default function HorizontalbarChart({ chartData, width, height }: Props) {

  if(!chartData) return <div>loading...</div>
  return (
    <Wrapper  width={width ?? '100%'}>
      <Bar options={options} data={chartData} />
    </Wrapper>
  ) 
}


const Wrapper = styled(Box)<{width?: number | string;}>`
  width: ${({ width }) => width ? width + 'px' : '100%'};
  height: ${({ height }) => height + 'px'};
`