import { Chart as ChartJS,LinearScale, CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController, ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Typography } from '@mui/material';

ChartJS.register(LinearScale,CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController);




interface Props {
  data: ChartData | null;
  suggestMax?: number[];
}

export default function BarLineChart({ data, suggestMax }: Props) {

  const options:ChartOptions = {
    responsive: true,
    plugins: {

      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#000',
        font: {
          size: 14,
          weight: 'bold',
        },
        // formatter: (value) => {
        //   return value + '기';
        // }
      },

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
            return `수강자 수: ${context.parsed.y}명`;
          }
        }
      },
      
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxPadding: 10,
          font: {
            size: 16,
          }
        }
      },
    },
    
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 18,
            weight: 'bold',
          }
        },
      },
      y: {
        suggestedMax: suggestMax && Math.max(...suggestMax) * 1.2,
        grid: {
          display: true
        }
      }
    },
    layout: {
      padding: {
        top: 50
      }
    }
};

  if(!data) {
    return (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem'}}>
          해당 조건을 만족하는 데이터가 존재하지 않습니다.</Typography>
      </Box>
      )
  } else {
    return <Chart type="bar" options={options} data={data} plugins={[ChartDataLabels]} />;
  }
  
}
