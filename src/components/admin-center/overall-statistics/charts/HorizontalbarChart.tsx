
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ChartOptions,ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useMemo } from 'react';

ChartJS.register( CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend );



interface Props {
  width?: number;
  height?: number;
  chartData: ChartData<'bar', number | number[]>;
  suggestMax?: number[];  
}

export default function HorizontalbarChart({ chartData, width, height,suggestMax }: Props) {

  const options:ChartOptions<'bar'> = useMemo(() => ({
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 8,
      }
    },
    scales: {
      x: {
        suggestedMax: suggestMax && Math.max(...suggestMax) * 1.2,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          }
        },
      },
      y: {
        
        grid: {
          display: false,
        },
        // afterDataLimits: (scale) => {
        //   scale.max += 1.25;
        //   return scale;
        // },
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          },
          autoSkip: false,
        },
      },
    },
    layout: {
      padding: {
        top: 40,
      },
    },
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
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label} : ${value}명`;
          
          }
        }
      },
      legend: {
        position: 'top' as const,
        fullSize: true,
        labels: {
          usePointStyle: true,
          boxPadding: 10,
          font: {
            size: 18,
          },
          boxWidth: 12,
          boxHeight: 12,
        }
      },
    },
  }
  ),[]);


  if(!chartData) return <div>loading...</div>

  return (
    <Wrapper  width={width ?? '100%'} height={height}>
      <Bar options={options} data={chartData}  />
    </Wrapper>
  ) 
}


const Wrapper = styled(Box)<{width?: number | string;}>`
  width: ${({ width }) => width ? width + 'px' : '100%'};
  min-height: 600px;
  height: ${({height}) => height ? height + 'px' : 'auto'};
  
`