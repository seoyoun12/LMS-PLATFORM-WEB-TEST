
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options:ChartOptions<'bar'> = {
  indexAxis: 'y' as const,
  maintainAspectRatio: false,
  elements: {
  },

  scales: {
    x: {
      grid: {
        display: true,
      },
      ticks: {
        font: {
          size: 22,
          weight: 'bold',
        }
      }
    },
    y: {
      grid: {
        display: true,
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
    padding: 10,
    
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
      position: 'right' as const,
      fullSize: true,
      labels: {
        font: {
          size: 22,
        },
      }
    },
    
    
  },
};

export const labels = ['천안','공주','보령','아산','서산','논산','계룡','당진','금산','부여','서천','청양','홍성','예산','태안','세종','서울','부산','대구','인천','광주','대전','울산','경기','강원','충북','전북','전남','경북','경남','제주'];

export const data:ChartData<'bar'> = {
  labels,
  datasets: [
    {
      label: '이수자',
      data: Array.from({length:31}, () => Math.floor(Math.random() * 100)),
      borderColor: "rgba(0,0,0,0)",
      
      backgroundColor: '#5D7CFC',
      borderRadius: 10,
      categoryPercentage: 0.8
    },
    {
      label: '미이수자',
      data: Array.from({length:31}, () => Math.floor(Math.random() * 100)),
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: '#ff6384',
      
      borderRadius: 10,
      categoryPercentage: 0.8
    },
  ],
};


export default function HorizontalbarChart() {
  return (
    <Wrapper height={1600}>
      <Bar options={options} data={data} />
    </Wrapper>
  ) 
}


const Wrapper = styled(Box)<{width?: number; height: number;}>`
  width: ${({ width }) => width ? width + 'px' : '100%'};
  height: ${({ height }) => height + 'px'};
`