
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, ChartOptions, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



interface Props {
  chartData: ChartData<'bar'>
  suggestMax?: number[];
}


export default function VerticalbarChart({chartData,suggestMax}: Props) {

  const options:ChartOptions<'bar'> = {
    responsive: true,
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 8,
      }
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
          },
          labelPointStyle: (context) => {
            return {
              pointStyle: 'rectRounded',
              rotation: 0,
            };
          },
        },
      },
      legend: {
        
        position: 'top' as const,
        labels: {
          font: {
            size: 18,
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 22,
            weight: 'bold',
          }
        }
      },
      y: {
        suggestedMax: suggestMax && Math.max(...suggestMax) * 1.2,
        grid: {
          display: false,
        },
        
      },
      
    }
  };
  
  return (
    <Bar data={chartData} options={options} />
  )
}
