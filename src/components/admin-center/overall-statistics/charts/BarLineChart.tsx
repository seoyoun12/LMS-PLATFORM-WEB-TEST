import { Chart as ChartJS,LinearScale, CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController, ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LinearScale,CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController);

const labels = Array.from({length: 20}, (_, i) => `${100 + i}기`);

const data:ChartData = {
  labels: labels,
  datasets: [
    {
      type: 'bar',
      label: '수강자 수 (막대)',
      datalabels: {
        display: false,
      },
      borderColor: '#EB5757',
      backgroundColor: '#EB5757',
      data: [65, 59, 44, 40, 52, 24, 40, 30, 20, 10, 14, 18, 24, 30, 20, 44, 64, 72, 70, 19],
      
      order: 1
    },
    {
      type: 'line',
      label: '수강자 수 (선)',
      data: [65, 59, 44, 40, 52, 24, 40, 30, 20, 10, 14, 18, 24, 30, 20, 44, 64, 72, 70, 19],
      borderColor: '#F2C94C',
      backgroundColor: '#F2C94C',
      pointRadius: 8,
      order: 0
    }
  ]
};
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
        formatter: (value) => {
          return value + '명';
        }
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
        grid: {
          display: true
        }
      }
    }
};

export default function BarLineChart() {
  return <Chart type="bar" options={options} data={data} plugins={[ChartDataLabels]} />;
}
