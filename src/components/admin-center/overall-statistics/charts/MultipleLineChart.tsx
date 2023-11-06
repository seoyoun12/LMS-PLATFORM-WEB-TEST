import { Chart as ChartJS,LinearScale, CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController, ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LinearScale,CategoryScale,BarElement,PointElement,LineElement,Legend,Tooltip,LineController,BarController);

const labels = Array.from({length: 8}, (_, i) => `${100 + i}기`);

const data:ChartData = {
  labels: labels,
  datasets: [
    {
      type: 'line',
      label: '버스',
      
      datalabels: {
        display:true,
      },
      borderColor: '#EB5757',
      backgroundColor: '#EB5757',
      pointRadius: 8,
      data: Array.from({length: labels.length}, () => Math.floor(Math.random() * 100)),
      order: 0
    },
    {
      type: 'line',
      label: '전세버스',
      data: Array.from({length: labels.length}, () => Math.floor(Math.random() * 100)),
      borderColor: '#f09956',
      backgroundColor: '#f09956',
      pointRadius: 8,
      
      order: 1
    },
    {
      type: 'line',
      label: '특수여객',
      datalabels: {
        display:true,
      },
      borderColor: '#f5f23c',
      backgroundColor: '#f5f23c',
      pointRadius: 8,
      data: Array.from({length: labels.length}, () => Math.floor(Math.random() * 100)),
      order: 2
    },
    {
      type: 'line',
      label: '법인택시',
      datalabels: {
        display:true,
      },
      borderColor: '#57eb57',
      backgroundColor: '#57eb57',
      pointRadius: 8,
      data: Array.from({length: labels.length}, () => Math.floor(Math.random() * 100)),
      order: 3
    },
    {
      type: 'line',
      label: '개인택시',
      datalabels: {
        display:true,
      },
      borderColor: '#4362ea',
      backgroundColor: '#4362ea',
      pointRadius: 8,
      data: Array.from({length: labels.length}, () => Math.floor(Math.random() * 100)),
      order: 4
    },
    {
      type: 'line',
      label: '일반화물',
      datalabels: {
        display:true,
      },
      borderColor: '#0f0899',
      backgroundColor: '#0f0899',
      pointRadius: 8,
      data: Array.from({length: labels.length}, () => Math.floor(Math.random() * 100)),
      order: 5
    },
    {
      type: 'line',
      label: '용달화물',
      datalabels: {
        display:true,
      },
      borderColor: '#852eee',
      backgroundColor: '#852eee',
      pointRadius: 8,
      data: Array.from({length: labels.length}, () => Math.floor(Math.random() * 100)),
      order: 6
    },
    {
      type: 'line',
      label: '개별화물',
      datalabels: {
        display:true,
      },
      borderColor: '#1fd9f9',
      backgroundColor: '#1fd9f9',
      pointRadius: 8,
      data: Array.from({length: labels.length}, () => Math.floor(Math.random() * 100)),
      order: 7
    },
  ]
};
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



export default function MultipleLineChart() {
  return (
    <Chart data={data} options={options} type='line' plugins={[ChartDataLabels]} />
  )
}
