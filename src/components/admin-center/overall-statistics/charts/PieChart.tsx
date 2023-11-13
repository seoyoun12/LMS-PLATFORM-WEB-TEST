
import styled from '@emotion/styled';
import { TotalUserCnt } from '@hooks/useStatistics';
import { Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'

ChartJS.defaults.font.family = 'Noto Sans KR';
ChartJS.defaults.color = '#161D2B';
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  width: number;
  height: number;
  data:TotalUserCnt
}

export default function PieChart({data, width, height }: Props) {
  const [statisticsData, setStatisticsData] = useState<ChartData<"pie">>();

  useEffect(() => {
    setStatisticsData({
      labels: ['이수자', '미이수자'],
      datasets: [
        {
          label: '이수자 현황',
          data: [data.completedCourseUserCnt, data.inCompletedCourseUserCnt],
          backgroundColor: [
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
    })
  },[data])
  return (
    <Wrapper width={width} height={height}>
      {
        statisticsData && (
          <Pie
            data={statisticsData}
            options={{
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
        )
      }
    
    </Wrapper>
  )
  
  
}

const Wrapper = styled(Box)<{width: number; height: number;}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`