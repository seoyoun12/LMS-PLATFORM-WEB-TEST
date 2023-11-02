
import styled from '@emotion/styled';
import { Box } from '@mui/material';
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
        '#ff6384',
      ],
      borderColor: [
        '#355bf2',
        '#06d4a4',
      ],
      borderWidth: 1,
    },
    
  ],
};

interface Props {
  width: number;
  height: number;
}

export default function PieChart({ width, height }: Props) {

  return (
    <Wrapper width={width} height={height}>
    <Pie data={data}  options={{
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18,
            },
          },
        },
      }
    }}
    />
    </Wrapper>
  )
  
  
}

const Wrapper = styled(Box)<{width: number; height: number;}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`