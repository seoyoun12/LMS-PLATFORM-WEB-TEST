
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.defaults.font.family = 'Noto Sans KR';
ChartJS.defaults.color = '#161D2B';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['이수자', '미이수자'],
  
  datasets: [
    {
      label: '이수자 현황',
      data: [7000, 3000],
      backgroundColor: [
        // '#5D7CFC',
        '#5D7CFC',
        '#83dcf5',
      ],
      borderColor: [
        '#355bf2',
        '#06d4a4',
      ],
      borderWidth: 4,
    },
    
  ],
};

export default function PieChart() {

  return <Pie data={data}  options={{
    plugins: {
      
      legend: {
        labels: {
          font: {
            size: 18,
          },
        },
      },
    }
  }}  />
}
