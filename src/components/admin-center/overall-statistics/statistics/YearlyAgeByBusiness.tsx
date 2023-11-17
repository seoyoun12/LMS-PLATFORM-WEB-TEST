import React, { useEffect, useState } from 'react'
import StatisticsLayout from './StatisticsLayout'
import HorizontalbarChart from '../charts/HorizontalbarChart'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { AgeRangeByBusiness } from '@hooks/useStatistics'
import { ChartData } from 'chart.js'
import { ConvertEnum } from '@utils/convertEnumToHangle'

interface Props {
  data: AgeRangeByBusiness[]
}

export default function YearlyAgeByBusiness({ data }: Props) {
  

  const [chartDataArray, setChartDataArray] = useState<ChartData<'bar'>[]>(null);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    if(!data || data.length === 0) return;

    const labels = data.map((item) => ConvertEnum(item.userBusinessSubType));

    const chartData: ChartData<'bar'>[] = data.map((item) => ({
      labels: ['10년생','20년생','30년생','40년생','50년생','60년생','70년생','80년생','90년생'],
      datasets: [
        {
          label: '교육생 수',
          backgroundColor: '#5D7CFC',
          data: [
            item.age20s,
            item.age30s,
            item.age40s,
            item.age50s,
            item.age60s,
            item.age70s,
            item.age80s,
            item.age90s,          
          ],
          maxBarThickness: 10,
        },
        
      ],
    }));
    setChartDataArray(chartData);
    setLabels(labels)
  },[data])
  
  console.log(data);
  return (
    <StatisticsLayout title="연간 업종별 연령대 통계">
      <ChartGrid>
        
        {
          chartDataArray
          ? chartDataArray.map((chart, index) => (
            <ChartCard key={labels[index]}>
              <ChartTitle>{labels[index]}</ChartTitle>
              <HorizontalbarChart chartData={chart} width={540} height={400} />
            </ChartCard>
          ))
          : <InfoMessage>해당 조건을 만족하는 데이터가 존재하지 않습니다.</InfoMessage>
        }
        
      </ChartGrid>
    </StatisticsLayout>
  )
}

const InfoMessage = styled(Typography)`

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:1000px;
  text-align:center;
  font-size: 20px;
  font-weight: bold;
`

const ChartCard = styled(Box)`
  box-shadow: 0 3px 5px 3px rgba(0,0,0,0.25);
  padding: 1.25rem;
  border-radius: 1rem;
`

const ChartTitle = styled(Box)`
  
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background-color: rgb(191,49,51);
  color: #fff;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 3px 5px 3px rgba(0,0,0,0.5);
`

const ChartGrid = styled(Box)`
  position:relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  grid-gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  
  
`