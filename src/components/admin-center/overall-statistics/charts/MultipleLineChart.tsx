import { Chart as ChartJS,LinearScale, CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController, ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LinearScale,CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController);



interface Props {
  data: ChartData | null;
  suggestMax?: number[];
}

export default function MultipleLineChart({ data, suggestMax }: Props) {

  const options:ChartOptions = {
    responsive: true,
    plugins: {

      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#000',
        font: {
          size: 14,
          weight: 300,
        },
        
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
            return `${context.label}: ${context.parsed.y}명`;
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
    }
};
  return (
    <Chart
      data={data}
      options={options}
      type='line'
      plugins={[ChartDataLabels]}
      />
  )
}
