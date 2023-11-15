
import { useEffect, useState } from 'react';
import StatisticsLayout from './StatisticsLayout'

import { AgeRangeByYearly } from '@hooks/useStatistics'
import { ChartData } from 'chart.js';
import MultipleLineChart from '../charts/MultipleLineChart';
import { Typography } from '@mui/material';
import { ConvertEnum } from '@utils/convertEnumToHangle';

interface Props {
  data: AgeRangeByYearly[]
}

const rainbowColor = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#4B0082',
  '#8F00FF',
  '#FF00FF',
  '#00FFFF',
]


export default function ComparisonAgeByYearly({ data }: Props) {
  const [chartData, setChartData] = useState<ChartData<'bar'>>(null)
  const [labels, setLabels] = useState(null);

  

  useEffect(() => {
    
    if(!data || data.length === 0) return;

    const labels = data.map((item) => item.year).reverse();
    // key: birthYear10To19: 0 ... birthYear90To99: 2
    // item {birthYear10To19:0 ... birthYear90To99:2}
    // item[key] = item['birthYear10To19'] ...
    const datasets = Object.keys(data?.[0])?.filter((key) => key !== 'year')?.map((key, index) => ({
      label: ConvertEnum(key),
      data: data.map((item) => item[key]).reverse(),
      borderColor: rainbowColor[index],
      backgroundColor: rainbowColor[index],
      fill: false,
      pointRadius: 6,
    }))

    const chartData: ChartData<'bar'> = {
      labels,
      datasets,
    }

    setChartData({
      labels: labels.reverse(),
      datasets: chartData.datasets.reverse()
    });
    setLabels(labels.reverse());
  },[data])

  
  
  return (
    <StatisticsLayout title="연도별 연령비교">
      {
        chartData
        ? <MultipleLineChart
            data={chartData}
            suggestMax={
              chartData.datasets.map(
                (dataset) => dataset.data.map(
                  d => d)).flatMap(d => d)
            }
          />
        : <Typography sx={{fontSize: 20, fontWeight: 'bold'}}>해당 조건을 만족하는 데이터가 존재하지 않습니다.</Typography>
      }
    </StatisticsLayout>
  )
}
