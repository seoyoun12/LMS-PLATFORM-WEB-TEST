
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, ChartOptions } from 'chart.js';
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
        label: (context) => {
          const target = Array.from({length: verticalbarChartData.datasets[0].data.length}, () => 0);
          verticalbarChartData.datasets.forEach((dataset) =>
            dataset.data.forEach((count,index) => target[index] = target[index] + count))

          return `${context.label}: ${ Math.round(context.parsed.y / target[context.dataIndex] * 100)} %`;
        }
      }
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
//        '#5D7CFC',
//'#ff6384',
const labels = ['버스', '전세버스', '특수여객', '법인택시', '개인택시', '일반화물', '용달화물', '개별화물'];


export const verticalbarChartData = {
  labels,
  datasets: [
    {
      label: '이수자',
      backgroundColor: '#5D7CFC',
      data: [65, 59, 80, 81, 56, 55, 40, 30],
    },
    {
      label: '미이수자',
      backgroundColor: '#ff6384',
      data: [28, 48, 40, 19, 86, 27, 90, 100],
    },
  ],
};




export default function VerticalbarChart() {
  return (
    <Bar data={verticalbarChartData} options={options} />
  )
}
