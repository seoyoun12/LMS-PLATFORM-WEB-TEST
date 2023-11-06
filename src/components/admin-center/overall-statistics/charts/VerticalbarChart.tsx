
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, ChartOptions, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// PluginsOptions
// decimation: DecimationOptions;
// filler: FillerOptions;
// legend: LegendOptions<TType>;
// subtitle: TitleOptions;
// title: TitleOptions;
// tooltip: TooltipOptions<TType>;


// tooltip: {
//   position: 'nearest',
//   titleFont: {
//       size: 12,
//   },
//   padding: 14,
//   backgroundColor: '#25262b',
//   boxPadding: 5,
//   bodySpacing: 8,
//   usePointStyle: true,
//   bodyAlign: 'left',

//   callbacks: {
//       labelPointStyle: (context) => {
//           return {
//               pointStyle: 'rectRounded',
//               rotation: 0,
//           };
//       },
//   },
// },
export const options:ChartOptions<'bar'> = {
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
      callbacks: {
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
          size: 22,
        },
      },
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
      grid: {
        display: false,
      },
    }
  }
};


interface Props {
  chartData: ChartData<'bar'> 
}


export default function VerticalbarChart({chartData}: Props) {
  return (
    <Bar data={chartData} options={options} />
  )
}
