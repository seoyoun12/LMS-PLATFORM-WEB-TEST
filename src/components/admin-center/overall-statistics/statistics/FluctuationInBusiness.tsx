import { useEffect, useState } from 'react'
import StatisticsLayout from './StatisticsLayout'
import VerticalbarChart from '../charts/VerticalbarChart'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { FluctuationInBusinessResponse } from '@hooks/useStatistics'
import { ChartData } from 'chart.js'
import { ConvertEnum } from '@utils/convertEnumToHangle'
import FluctuationBusinessCard from '../components/FluctuationBusinessCard'

interface Props {
  data: FluctuationInBusinessResponse
}

export default function FluctuationInBusiness({ data }: Props) {
  const [chartData, setChartData] = useState<ChartData<'bar'>>();
  const [labels, setLabels] = useState<string[]>([]);
  
  useEffect(() => {
    if(!data || data.statisticsTransEduCategoryResponseDtoList.length === 0) return;
      const labels = data.statisticsTransEduCategoryResponseDtoList.map((item) => ConvertEnum(item.userBusinessSubType))
      const chartData:ChartData<'bar'> = {
        labels,
        datasets: [
          {
            label: '이수자',
            backgroundColor: '#5D7CFC',
            // data: [1,2,3]
            data: data.statisticsTransEduCategoryResponseDtoList.map((item) => item.completedCnt),
            maxBarThickness: 60,
            
          },
          {
            label: '미이수자',
            backgroundColor: '#ff6384',
            // data:[10,20,30]
            data: data.statisticsTransEduCategoryResponseDtoList.map((item) => item.inCompletedCnt),
            maxBarThickness: 60,
            
          },
        ],
      };
      setLabels(labels)
      setChartData(chartData)
  },[data])

    
  
  return (
    <StatisticsLayout title="업종별 (이수자수/ 아수율)">
    {
      (chartData && data?.sumTotalCntSum > 0)
      ? <>
      <Box sx={{margin: '0 auto', width:'80%'}}>
      <VerticalbarChart chartData={chartData} suggestMax={data?.statisticsTransEduCategoryResponseDtoList.map((item) => item.totalCnt)} />
      </Box>

      <Title sx={{marginTop: '4rem',marginBottom: '1rem'}}>
      { labels?.map((label) => <TitleCard key={label}> {label} </TitleCard>) }
      </Title>

      <CategoryListWrapper sx={{display:'flex',width:'100%',gap:'1rem'}}>
      {
        data?.statisticsTransEduCategoryResponseDtoList.map((item) =>(
          <Card key={item.userBusinessSubType} >
            <FluctuationBusinessCard
              d={item.completedCnt}
              label='이수자'
              motherCount={item.totalCnt}
              childCount={item.completedCnt}
            />
            <FluctuationBusinessCard
              d={item.inCompletedCnt}
              label='미이수자'
              motherCount={item.totalCnt}
              childCount={item.inCompletedCnt}
            />
          </Card>
        ))}
        </CategoryListWrapper>
        </>
        : <Typography sx={{ fontSize: 20, fontWeight:'bold' }}>해당 조건을 만족하는 데이터가 존재하지 않습니다.</Typography>
        }
      </StatisticsLayout>
  )
}

const CategoryListWrapper = styled(Box)`
  width: 100%;
  display:flex;
  gap: 1rem;
`

const Card = styled(Box)`
  display: flex;
  flex-direction: column;
  flex:1;
  gap: .5rem;
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