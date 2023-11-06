import React from 'react'
import StatisticsLayout from './StatisticsLayout'
import MultipleLineChart from '../charts/MultipleLineChart'

export default function ComparisonAgeByYearly() {
  return (
    <StatisticsLayout title="연도별 연령비교">
      <MultipleLineChart />
    </StatisticsLayout>
  )
}
