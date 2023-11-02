import React, { useEffect, useState } from 'react'
import StatisticsLayout from './StatisticsLayout'
import VerticalbarChart, { verticalbarChartData } from '../charts/VerticalbarChart'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'



export default function CompletedCourseForBusiness() {
  const [categoryCount, setCategoryCount] = useState([]);

// useEffect(() => {
//   const target = Array.from({length: verticalbarChartData.datasets[0].data.length}, () => 0);
//   verticalbarChartData.datasets.map((dataset) => {
//     return dataset.data.map((count,index) => {
//       return target[index] = target[index] + count
//     })
//   })
//   setCategoryCount(target)
// },[])
useEffect(() => {
  const target = verticalbarChartData.datasets.reduce((result, dataset) => {
    dataset.data.forEach((count, index) => {
      result[index] = (result[index] || 0) + count;
    });
    return result;
  }, []);
  setCategoryCount(target);
}, []);

  return (
    <StatisticsLayout title="업종별 (이수자수/ 아수율)">
      <VerticalbarChart />
      <Summary>
        <CardContainer >
        { verticalbarChartData.labels.map((label) => <TitleCard key={label}> {label} </TitleCard>) }
        </CardContainer>

        <CardContainer>
        {
          verticalbarChartData.datasets.map((item) => {
            if(item.label === '이수자') {
              return item.data.map(((data,index) => (
                <DescriptionCard key={index}>
                  <Typography>이수자</Typography>
                  <Typography>{data} <PersentageSpan>({Math.round(data / categoryCount[index] * 100).toFixed(0)}%)</PersentageSpan></Typography>
                </DescriptionCard>
              )))
            }
          })
        }
        </CardContainer>

        <CardContainer>
        {
          verticalbarChartData.datasets.map((item) => {
            if(item.label === '미이수자') {
              return item.data.map(((data,index) => (
                <DescriptionCard key={index}>
                  <Typography>미이수자</Typography>
                  <Typography>{data} <PersentageSpan>({Math.round(data / categoryCount[index] * 100).toFixed(0)}%)</PersentageSpan></Typography>
                </DescriptionCard>
              )))
            }
          })
        }
        </CardContainer>

      </Summary>
    </StatisticsLayout>
  )
}

const PersentageSpan = styled.span`
  font-size: 0.8rem;
`

const Item = styled(Box)`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  letter-spacing: 2px;
  padding: .5rem;
`;

const DescriptionCard = styled(Item)`
  color: #222;
  background-color: #fff;
  box-shadow: 0 2px 10px 1px rgba(0,0,0,.4);
`

const TitleCard = styled(Item)`
  flex: 1;
  color: #fff;
  background-color: rgb(191,49,51);
  box-shadow: 0 2px 10px 1px rgba(0,0,0,.4);
`

const CardContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
`

const Summary = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px; 
  gap: 1rem;
  padding: 1rem;
`