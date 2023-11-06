import React from 'react'
import StatisticsLayout from './StatisticsLayout'
import MultipleLineChart from '../charts/MultipleLineChart'
import { AgeRangeByYearly } from '@hooks/useStatistics'

interface Props {
  data: AgeRangeByYearly[]
}

export default function ComparisonAgeByYearly({ data }: Props) {
  return (
    <StatisticsLayout title="연도별 연령비교">
      <MultipleLineChart />
    </StatisticsLayout>
  )
}
