import StatisticsLayout from './StatisticsLayout'
import BarLineChart from '../charts/BarLineChart'
import { Period } from '@hooks/useStatistics'

interface Props {
  data: Period[]
}

export default function FluctuationByPeriod({ data }: Props) {
  return (
    <StatisticsLayout title="기수별 증감">
      <BarLineChart />
    </StatisticsLayout>
  )
}
