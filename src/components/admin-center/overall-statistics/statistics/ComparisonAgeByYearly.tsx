
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

const dummy = [
  {
  year: 2023,
  birthYear90To99: 2,
  birthYear80To89: 8,
  birthYear70To79: 42,
  birthYear60To69: 14,
  birthYear50To59: 19,
  birthYear40To49: 55,
  birthYear30To39: 12,
  birthYear20To29: 4,
  birthYear10To19: 0
  },
  {
    year: 2022,
    birthYear90To99: 44,
    birthYear80To89: 94,
    birthYear70To79: 4,
    birthYear60To69: 32,
    birthYear50To59: 84,
    birthYear40To49: 23,
    birthYear30To39: 66,
    birthYear20To29: 22,
    birthYear10To19: 41
  },
  {
    year: 2021,
    birthYear90To99: 14,
    birthYear80To89: 3,
    birthYear70To79: 22,
    birthYear60To69: 55,
    birthYear50To59: 100,
    birthYear40To49: 48,
    birthYear30To39: 21,
    birthYear20To29: 4,
    birthYear10To19: 0
  }
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
      pointRadius: 12,
    }))

    const chartData: ChartData<'bar'> = {
      labels,
      datasets,
    }

    setChartData(chartData);
    setLabels(labels);
  },[data])

  
  
  return (
    <StatisticsLayout title="연도별 연령비교">
      {
        chartData
        ? <MultipleLineChart data={chartData}
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
