import React from 'react'
import StatisticsLayout from './StatisticsLayout'
import HorizontalbarChart from '../charts/HorizontalbarChart'
import { Box } from '@mui/material'
import styled from '@emotion/styled'
import { AgeRangeByBusiness } from '@hooks/useStatistics'

const labels = ['버스','전세버스','특수여객','법인택시']

interface Props {
  data: AgeRangeByBusiness[]
}

export default function YearlyAgeByBusiness({ data }: Props) {
  return (
    <StatisticsLayout title="연간 업종별 연령대 통계">
      <ChartGrid>
        {
          labels.map((label, index) => (
            <Box key={label}>
            <ChartTitle>{label}</ChartTitle>
            <HorizontalbarChart chartData={undefined}  width={600} />
            </Box>
          ))
        }
        
      </ChartGrid>
    </StatisticsLayout>
  )
}

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
  
`