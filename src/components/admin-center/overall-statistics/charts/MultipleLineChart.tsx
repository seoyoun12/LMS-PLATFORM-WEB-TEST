import { Chart as ChartJS,LinearScale, CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController, ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LinearScale,CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController);

const options:ChartOptions = {
    responsive: true,
    plugins: {

      // datalabels: {
      //   anchor: 'end',
      //   align: 'end',
      //   color: '#000',
      //   font: {
      //     size: 14,
      //     weight: 'bold',
      //   },
      //   formatter: (value) => {
      //     return value + '명';
      //   }
      // },

      // tooltip: {
      //   position: 'nearest',
      //   titleFont: { size: 12 },
      //   padding: 14,
      //   backgroundColor: '#25262b',
      //   boxPadding: 5,
      //   bodySpacing: 8,
      //   usePointStyle: true,
      //   bodyAlign: 'left',
      //   callbacks: {
      //     label: (context) => {
      //       return `${context.label}: ${context.parsed.y}명`;
      //     }
      //   }
      // },
    
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
        grid: {
          display: true
        }
      }
    }
};

interface Props {
  data: ChartData | null;
}

export default function MultipleLineChart({ data }: Props) {

  return (
    <Chart
      data={data}
      options={options}
      type='line'
      plugins={[ChartDataLabels]}
      />
  )
}
