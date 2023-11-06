import React from 'react'
import StatisticsLayout from './StatisticsLayout'
import BarLineChart from '../charts/BarLineChart'

export default function FluctuationByPeriod() {
  return (
    <StatisticsLayout title="기수별 증감">
      <BarLineChart />
    </StatisticsLayout>
  )
}
