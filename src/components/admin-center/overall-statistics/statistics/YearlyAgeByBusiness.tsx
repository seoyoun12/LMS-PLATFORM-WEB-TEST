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
            item.birthYear10To19,
            item.birthYear20To29,
            item.birthYear30To39,
            item.birthYear40To49,
            item.birthYear50To59,
            item.birthYear60To69,
            item.birthYear70To79,
            item.birthYear80To89,
            item.birthYear90To99,
          ],
          maxBarThickness: 10,
        },
        
      ],
    }));
    setChartDataArray(chartData);
    setLabels(labels)
  },[data])
  
  
  return (
    <StatisticsLayout title="연간 업종별 연령대 통계">
      <ChartGrid>
        
        {
          chartDataArray
          ? chartDataArray.map((chart, index) => (
            <>
            <ChartCard key={labels[index]}>
              <ChartTitle>{labels[index]}</ChartTitle>
              <HorizontalbarChart chartData={chart} width={540} height={400} />
            </ChartCard>
            </>
          ))
          : <Typography sx={{fontSize: 20, fontWeight: 'bold'}}>해당 조건을 만족하는 데이터가 존재하지 않습니다.</Typography>
        }
        
      </ChartGrid>
    </StatisticsLayout>
  )
}

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  gap: 4rem; 
  
`