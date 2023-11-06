import { useEffect, useState } from 'react'
import StatisticsLayout from './StatisticsLayout'
import VerticalbarChart from '../charts/VerticalbarChart'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { FluctuationInBusinessResponse } from '@hooks/useStatistics'
import { ChartData } from 'chart.js'
import { ConvertEnum } from '@utils/convertEnumToHangle'
import { toPersent } from '@utils/toPersent'
import FluctuationBusinessCard from '../components/FluctuationBusinessCard'

interface Props {
  data: FluctuationInBusinessResponse
}

export default function FluctuationInBusiness({ data }: Props) {
  const [chartData, setChartData] = useState<ChartData<'bar'>>();
  const [labels, setLabels] = useState<string[]>([]);
  
  useEffect(() => {
    if(!data) return;
      const labels = data.statisticsTransEduCategoryResponseDtoList.map((item) => ConvertEnum(item.userBusinessSubType))
      const chartData = {
        labels,
        datasets: [
          {
            label: '이수자',
            backgroundColor: '#5D7CFC',
            // data: [1,2,3]
            data: data.statisticsTransEduCategoryResponseDtoList.map((item) => item.completedCnt),
          },
          {
            label: '미이수자',
            backgroundColor: '#ff6384',
            // data:[10,20,30]
            data: data.statisticsTransEduCategoryResponseDtoList.map((item) => item.inCompletedCnt),
          },
        ],
      };
      setLabels(labels)
      setChartData(chartData)
  },[data])

  if(!chartData) return <div>loading...</div>
  
  return (
    <StatisticsLayout title="업종별 (이수자수/ 아수율)">
      <VerticalbarChart chartData={chartData} />

      <Title sx={{marginTop: '4rem',marginBottom: '1rem'}}>
      { labels?.map((label) => <TitleCard key={label}> {label} </TitleCard>) }
      </Title>
      <CardWrapper>
        {
          chartData.datasets.map((dataset) => 
            dataset.data.map((d) => 
              dataset.label === '이수자' && <FluctuationBusinessCard key={d} d={d} label={dataset.label} motherCount={data.sumTotalCntSum} childCount={d}/>
            ))
        }
      </CardWrapper>

      <CardWrapper>
        {
          chartData.datasets.map((dataset) => 
            dataset.data.map((d) => 
              dataset.label === '미이수자' && <FluctuationBusinessCard key={d} d={d} label={dataset.label} motherCount={data.sumTotalCntSum} childCount={d} />
            ))
        }
      </CardWrapper>
    </StatisticsLayout>
  )
}

const CardWrapper = styled(Box)`
  display: flex;
  flex:1;
  width: 100%;
  gap: 1rem; 
  margin-bottom: .25rem;
`   


const TitleCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  letter-spacing: 2px;
  padding: .5rem;
  flex: 1;
  color: #fff;
  background-color: rgb(191,49,51);
  box-shadow: 0 2px 4px 1px rgba(0,0,0,.4);
`

const Title = styled(Box)`
  flex:1;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  min-width: 140px;
  gap: 1rem;
`