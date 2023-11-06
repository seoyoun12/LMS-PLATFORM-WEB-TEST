import React from 'react'
import StatisticsLayout from './StatisticsLayout'
import MultipleLineChart from '../charts/MultipleLineChart'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { FluctuationByPeriod } from '@hooks/useStatistics'

interface Props {
  data: FluctuationByPeriod[]
}

export default function FluctuationByBusiness({ data }: Props) {
  return (
    <StatisticsLayout title="업종별 증감">
      <ChartWrapper>
        <MultipleLineChart />
      </ChartWrapper>
      <Summary>
        <Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
          <Box>핼로 월드</Box>
        </Box>
      </Summary>
    </StatisticsLayout>
  )
}

const ChartWrapper = styled(Box)`
  width: 100%;
  flex: .7;
`

const Summary = styled(Box)`
  width: 100%;
  flex: .3;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid red;
`