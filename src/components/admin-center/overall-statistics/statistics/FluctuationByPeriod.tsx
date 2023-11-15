import StatisticsLayout from './StatisticsLayout'
import BarLineChart from '../charts/BarLineChart'
import { Period } from '@hooks/useStatistics'
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChartData } from 'chart.js';

interface Props {
  data: Period[] | null;
}

export default function FluctuationByPeriod({ data }: Props) {
  const [chartData, setChartData] = useState(null);
  const [labels, setLabels] = useState(null);
  
  useEffect(() => {
    if(!data || data.length === 0) return;
    const labels = data.map((period) => `${period.step}기`);
    const chartData:ChartData<'bar' | 'line'> = {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: '수강자 수 (막대)',
          datalabels: {
            display: false,
          },
          borderColor: '#EB5757',
          backgroundColor: '#EB5757',
          data: data.map((period) => period.studentCnt),
          
          order: 1,
          maxBarThickness: 40,
          borderRadius: 8,
        },
        {
          type: 'line',
          label: '수강자 수 (선)',
          data: data.map((period) => period.studentCnt),
          borderColor: '#F2C94C',
          backgroundColor: '#F2C94C',
          pointRadius: 8,
          order: 0
        }
      ]
    };
    setChartData(chartData);
    setLabels(labels);
  },[data])

  return (
    <StatisticsLayout title="기수별 증감">
      {
        (chartData && chartData.datasets[0].data.length > 0)
        ? <BarLineChart data={chartData} suggestMax={data.map((item) => item.studentCnt)} />
        : <Typography sx={{ fontSize: 20, fontWeight:'bold' }}>해당 조건을 만족하는 데이터가 존재하지 않습니다.</Typography>
      }
      
    </StatisticsLayout>
  )
}
